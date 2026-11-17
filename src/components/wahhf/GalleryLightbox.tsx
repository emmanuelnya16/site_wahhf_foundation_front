import { CSSProperties, KeyboardEvent, RefObject, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDialog } from '../../lib/useDialog';
import { albumPlaceDate, GALLERY_ALBUMS, GalleryItem, GalleryPhoto } from '../../data/gallery';
import { EASE_SCREEN } from '../../lib/motionTokens';

/**
 * Fenêtre et changement d'élément : fondu de 0,3 s, sans glissement (contrat, annexe B, ligne 38). Le geste
 * « glisser » pour changer de photo reste. Mouvement réduit : tout change d'un coup (contrat §10, fondus instantanés).
 */
const FADE = { duration: 0.3, ease: EASE_SCREEN };
const NONE = { duration: 0 };

const fade: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export interface GalleryLightboxProps {
  items: GalleryItem[];
  /** Index affiché, ou null quand la visionneuse est fermée */
  index: number | null;
  onChange: (index: number | null) => void;
  /** Vignette qui a ouvert la visionneuse : elle reprend le focus à la fermeture */
  returnFocusRef: RefObject<HTMLElement | null>;
  /** Nom de transition partagée posé sur la photo affichée, pendant l'ouverture depuis la vignette (GalleryGrid) */
  sharedName?: string;
  /** false : ouverture sans fondu (la transition partagée s'en charge) */
  appear?: boolean;
}

/** Libellé exact du bouton précédent ou suivant (GAL-07) : « Photo suivante », « Vidéo précédente »… */
const navLabel = (item: GalleryItem | undefined, dir: 'précédente' | 'suivante') => `${item?.kind === 'video' ? 'Vidéo' : 'Photo'} ${dir}`;

/** Taille réservée avant le chargement : la photo tient dans l'écran, à ses proportions (rien ne saute à l'arrivée). */
const photoBox = (item: GalleryPhoto): CSSProperties => ({
  aspectRatio: `${item.w} / ${item.h}`,
  width: `min(100%, ${item.w}px, calc((100svh - 11rem) * ${(item.w / item.h).toFixed(4)}))`,
});

/**
 * Photo de la visionneuse (GAL-07) : la vignette de 480 px sert d'image d'attente (fond de l'image) pendant le
 * téléchargement ; en cas d'échec, un message le dit, la légende reste.
 */
function LightboxPhoto({ item, sharedName }: { item: GalleryPhoto; sharedName?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative" style={photoBox(item)}>
      <img
        src={item.src}
        srcSet={item.srcSet}
        sizes="(min-width: 1024px) 1000px, 100vw"
        alt={item.alt}
        width={item.w}
        height={item.h}
        draggable={false}
        onError={() => setFailed(true)}
        style={{
          backgroundImage: failed ? undefined : `url("${item.thumb}")`,
          viewTransitionName: sharedName,
        }}
        className="block w-full h-full bg-cover bg-center rounded-inner select-none"
      />
      {failed && (
        <p role="status" className="absolute inset-0 flex items-center justify-center p-6 text-center text-body text-text-on-inverse bg-humus rounded-inner">
          Cette photo n’a pas pu être chargée. Vérifiez votre connexion, puis rouvrez-la.
        </p>
      )}
    </div>
  );
}

/**
 * Visionneuse plein écran de la galerie : Échap ferme, focus gardé dedans puis rendu à la vignette,
 * page figée dessous ; ← → (clavier), boutons précédent/suivant, glisser du doigt sur les photos.
 * Les vidéos ne se chargent qu'au clic sur Lecture (preload="none") et ne sont jamais agrandies au-delà de leur taille
 * réelle (GAL-04, en attendant les originaux). Couleurs du contrat sur nuit (on-inverse), sur un voile humus.
 */
export default function GalleryLightbox({ items, index, onChange, returnFocusRef, sharedName, appear = true }: GalleryLightboxProps) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const transition = reduce ? NONE : FADE;
  const titleId = useId();

  useDialog(open, dialogRef, () => onChange(null), { initialFocusRef: closeRef, returnFocusRef });

  const go = (step: number) => {
    if (index === null || items.length < 2) return;
    onChange((index + step + items.length) % items.length);
  };

  // Les photos voisines sont préchargées : le passage à la suivante est immédiat
  useEffect(() => {
    if (index === null) return;
    for (const i of [index - 1, index + 1]) {
      const next = items[(i + items.length) % items.length];
      if (next?.kind === 'photo') {
        const img = new Image();
        img.sizes = '(min-width: 1024px) 1000px, 100vw';
        img.srcset = next.srcSet;
        img.src = next.src;
      }
    }
  }, [index, items]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    // Sur le lecteur vidéo, les flèches servent à avancer/reculer dans la vidéo
    if ((e.target as HTMLElement).tagName === 'VIDEO') return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  const item = index !== null ? items[index] : null;
  const album = item ? GALLERY_ALBUMS.find((a) => a.id === item.album) : undefined;
  const placeDate = albumPlaceDate(album);
  const prev = index !== null ? items[(index - 1 + items.length) % items.length] : undefined;
  const next = index !== null ? items[(index + 1) % items.length] : undefined;
  const navButton =
    'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-pill bg-nuit/85 border border-border-on-inverse text-text-on-inverse flex items-center justify-center cursor-pointer transition-colors duration-(--dur-fast) hover:bg-action-on-inverse hover:text-on-action-on-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-on-inverse';

  return (
    <AnimatePresence>
      {item && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          data-lenis-prevent
          onKeyDown={onKeyDown}
          initial={appear ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          className="fixed inset-0 z-(--z-modal) bg-humus/95 text-text-on-inverse flex flex-col outline-none"
        >
          <div className="flex items-start justify-between gap-4 px-4 sm:px-8 pt-4 sm:pt-6">
            <div className="min-w-0">
              <h2 id={titleId} className="text-body font-semibold">
                {album?.title}
              </h2>
              {placeDate && <p className="text-meta text-text-secondary-on-inverse">{placeDate}</p>}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span aria-hidden="true" className="text-meta tabular-nums text-text-secondary-on-inverse">
                {index + 1} / {items.length}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => onChange(null)}
                aria-label="Fermer la galerie"
                className="w-11 h-11 rounded-pill bg-action-on-inverse text-on-action-on-inverse hover:bg-action-on-inverse-hover flex items-center justify-center cursor-pointer transition-colors duration-(--dur-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-on-inverse"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-20 py-4 overflow-hidden">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.figure
                key={item.id}
                variants={fade}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
                drag={item.kind === 'photo' && items.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="m-0 flex w-full items-center justify-center max-w-full max-h-full touch-pan-y"
              >
                {item.kind === 'photo' ? (
                  <LightboxPhoto item={item} sharedName={sharedName} />
                ) : (
                  <video
                    src={item.src}
                    poster={item.poster}
                    controls
                    playsInline
                    preload="none"
                    width={item.w}
                    height={item.h}
                    aria-label={item.alt}
                    style={{ maxWidth: `min(100%, ${item.w}px)` }}
                    className="block w-full h-auto max-h-[calc(100svh-11rem)] rounded-inner bg-black"
                  />
                )}
              </motion.figure>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label={navLabel(prev, 'précédente')} className={`${navButton} left-2 sm:left-6`}>
                  <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label={navLabel(next, 'suivante')} className={`${navButton} right-2 sm:right-6`}>
                  <ChevronRight className="w-5 h-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          <p aria-live="polite" className="px-4 sm:px-8 pb-5 sm:pb-8 text-center text-meta text-text-on-inverse min-h-[3.5rem]">
            <span className="sr-only">
              {index + 1} sur {items.length} :{' '}
            </span>
            {item.caption}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
