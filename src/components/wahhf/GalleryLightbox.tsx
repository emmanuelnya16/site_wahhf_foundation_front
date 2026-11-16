import { KeyboardEvent, RefObject, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, Variants } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useDialog } from '../../lib/useDialog';
import { GALLERY_ALBUMS, GalleryItem } from '../../data/gallery';
import { EASE_SCREEN } from '../../lib/motionTokens';

/** Changement d'écran : 0,6 s, courbe EASE_SCREEN (src/lib/motionTokens.ts). */
const SCREEN = { duration: 0.6, ease: EASE_SCREEN };

// Passage d'une image à l'autre : léger glissement + fondu.
// « Réduire les animations » : décalage nul (MotionConfig poserait sinon le décalage d'un coup,
// sans animation, sur l'image qui sort), il reste le fondu.
const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (dir: number) => ({ opacity: 0, x: dir * -48 }),
};

interface GalleryLightboxProps {
  items: GalleryItem[];
  /** Index affiché, ou null quand la visionneuse est fermée */
  index: number | null;
  onChange: (index: number | null) => void;
  /** Vignette qui a ouvert la visionneuse : elle reprend le focus à la fermeture */
  returnFocusRef: RefObject<HTMLElement | null>;
}

/**
 * Visionneuse plein écran de la galerie : Échap ferme, focus gardé dedans puis rendu à la vignette,
 * page figée dessous ; ← → (clavier), boutons précédent/suivant, glisser du doigt sur les photos.
 * Les vidéos ne se chargent qu'au clic sur Lecture (preload="none").
 */
export default function GalleryLightbox({ items, index, onChange, returnFocusRef }: GalleryLightboxProps) {
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [dir, setDir] = useState(1);
  const reduce = useReducedMotion();
  const slideDir = reduce ? 0 : dir;
  const titleId = useId();

  useDialog(open, dialogRef, () => onChange(null), { initialFocusRef: closeRef, returnFocusRef });

  const go = (step: number) => {
    if (index === null || items.length < 2) return;
    setDir(step);
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
  const navButton =
    'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-pill bg-foret/85 border border-or/40 text-creme flex items-center justify-center cursor-pointer transition-colors duration-(--dur-fast) hover:bg-or hover:text-encre focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme';

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={SCREEN}
          className="fixed inset-0 z-(--z-modal) bg-nuit/95 text-creme flex flex-col outline-none"
        >
          <div className="flex items-start justify-between gap-4 px-4 sm:px-8 pt-4 sm:pt-6">
            <div className="min-w-0">
              <h2 id={titleId} className="font-serif text-lg sm:text-xl leading-snug">
                {album?.title}
              </h2>
              <p className="text-xs text-creme/75">{album?.meta}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span aria-hidden="true" className="text-sm tabular-nums text-creme/85">
                {index + 1} / {items.length}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={() => onChange(null)}
                aria-label="Fermer la galerie"
                className="w-11 h-11 rounded-pill bg-or text-encre flex items-center justify-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-20 py-4 overflow-hidden">
            <AnimatePresence initial={false} custom={slideDir} mode="popLayout">
              <motion.figure
                key={item.id}
                custom={slideDir}
                variants={slide}
                initial="enter"
                animate="center"
                exit="exit"
                transition={SCREEN}
                drag={item.kind === 'photo' && items.length > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.25}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) go(1);
                  else if (info.offset.x > 80) go(-1);
                }}
                className="m-0 flex items-center justify-center max-w-full max-h-full touch-pan-y"
              >
                {item.kind === 'photo' ? (
                  <img
                    src={item.src}
                    srcSet={item.srcSet}
                    sizes="(min-width: 1024px) 1000px, 100vw"
                    alt={item.alt}
                    width={item.w}
                    height={item.h}
                    draggable={false}
                    className="block w-auto h-auto max-w-full max-h-[calc(100svh-11rem)] rounded-inner select-none"
                  />
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
                    className="block w-full max-w-[min(100%,960px)] h-auto max-h-[calc(100svh-11rem)] rounded-inner bg-black"
                  />
                )}
              </motion.figure>
            </AnimatePresence>

            {items.length > 1 && (
              <>
                <button type="button" onClick={() => go(-1)} aria-label="Photo précédente" className={`${navButton} left-2 sm:left-6`}>
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Photo suivante" className={`${navButton} right-2 sm:right-6`}>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          <p aria-live="polite" className="px-4 sm:px-8 pb-5 sm:pb-8 text-center text-sm text-creme/90 min-h-[3.5rem]">
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
