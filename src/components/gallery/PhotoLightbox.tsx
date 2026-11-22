import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type RefObject } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { CatalogPhoto } from '../../data/photos';
import { lockScroll, unlockScroll } from '../../lib/scrollLock';
import { useTranslation } from 'react-i18next';
import Photo from '../wahhf/Photo';
import { photoAlt } from '../../lib/photoText';

/** Nom de la transition partagée vignette → visionneuse (mêmes règles CSS que la galerie du groupe 7.3). */
export const LIGHTBOX_SHARED_NAME = 'galerie-media';

const SIZES = '(min-width: 1024px) 1600px, 100vw';

/** La photo tient dans l'écran, à ses proportions, jamais plus grande que sa taille réelle (rien ne saute à l'arrivée). */
const photoBox = (photo: CatalogPhoto): CSSProperties => ({
  aspectRatio: `${photo.width} / ${photo.height}`,
  width: `min(100%, ${photo.width}px, calc((100svh - 12rem) * ${(photo.width / photo.height).toFixed(4)}))`,
});

/** Demande les photos voisines à l'avance (AVIF, comme <picture>), pour que « suivante » s'affiche aussitôt. */
function preload(photo: CatalogPhoto | undefined) {
  if (!photo) return;
  const img = new Image();
  img.sizes = SIZES;
  img.srcset = photo.sources.avif;
}

function LightboxImage({ photo, shared }: { photo: CatalogPhoto; shared: boolean }) {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [photo.id]);
  return (
    <div className="relative" style={photoBox(photo)}>
      <Photo
        key={photo.id}
        photo={photo}
        sizes={SIZES}
        priority
        radius="inner"
        fit="cover"
        className="select-none"
        style={shared ? { viewTransitionName: LIGHTBOX_SHARED_NAME } : undefined}
        imgAttributes={{ 'data-lightbox-photo': '' }}
        onError={() => setFailed(true)}
      />
      {failed && (
        <p role="status" className="absolute inset-0 flex items-center justify-center rounded-inner bg-humus p-6 text-center text-body text-text-on-inverse">
          {t('ui.photos.loadError')}
        </p>
      )}
    </div>
  );
}

/**
 * Visionneuse de la galerie (lot 7.6) : <dialog> ouvert par showModal() (focus gardé dedans, page inerte dessous,
 * Échap ferme), sans bibliothèque. Photo de 1 600 px au plus, légende = texte alternatif, compteur « 3 / 52 » dans
 * l'album ; boutons précédent et suivant, flèches du clavier, glisser du doigt sur téléphone. À la fermeture, le focus
 * revient à la vignette d'origine.
 */
export default function PhotoLightbox({
  photos,
  index,
  onChange,
  onClose,
  openerRef,
  shared = false,
}: {
  photos: CatalogPhoto[];
  /** Photo affichée (rang dans l'album), ou null : fermée */
  index: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
  /** Vignette qui a ouvert la visionneuse : elle reprend le focus */
  openerRef: RefObject<HTMLElement | null>;
  /** Pendant l'ouverture depuis la vignette : la photo porte le nom de la transition partagée */
  shared?: boolean;
}) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const open = index !== null;

  // Ouverture et fermeture synchrones avec le rendu (la transition partagée photographie l'état ouvert)
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      lockScroll();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    if (index === null) return;
    preload(photos[(index + 1) % photos.length]);
    preload(photos[(index - 1 + photos.length) % photos.length]);
  }, [index, photos]);

  const go = (step: number) => {
    if (index === null || photos.length < 2) return;
    onChange((index + step + photos.length) % photos.length);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      go(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      go(-1);
    }
  };

  // Glisser du doigt : au moins 50 px, plus horizontal que vertical
  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType !== 'mouse') swipe.current = { x: event.clientX, y: event.clientY };
  };
  const onPointerUp = (event: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start) return;
    const dx = event.clientX - start.x;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(event.clientY - start.y)) go(dx < 0 ? 1 : -1);
  };

  const photo = index !== null ? photos[index] : null;
  const navButton =
    'absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-pill border border-border-on-inverse bg-nuit/85 text-text-on-inverse transition-colors duration-(--dur-fast) hover:bg-action-on-inverse hover:text-on-action-on-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-on-inverse';

  return (
    <dialog
      ref={dialogRef}
      aria-label={t('ui.photos.viewer')}
      data-lenis-prevent
      className="photo-lightbox"
      onKeyDown={onKeyDown}
      onClose={() => {
        unlockScroll();
        onClose();
        openerRef.current?.focus({ preventScroll: true });
      }}
    >
      {photo && index !== null && (
        <div className="flex h-full flex-col gap-4 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 text-text-on-inverse">
            <p className="text-meta tabular-nums" aria-hidden="true">
              {index + 1}&nbsp;/&nbsp;{photos.length}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-pill border border-border-on-inverse text-text-on-inverse transition-colors duration-(--dur-fast) hover:bg-action-on-inverse hover:text-on-action-on-inverse focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-action-on-inverse"
            >
              <X aria-hidden="true" className="h-5 w-5" />
              <span className="sr-only">{t('ui.photos.closeViewer')}</span>
            </button>
          </div>

          <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
            <div className="relative flex w-full flex-1 items-center justify-center touch-pan-y" onPointerDown={onPointerDown} onPointerUp={onPointerUp}>
              <LightboxImage photo={photo} shared={shared} />
              {photos.length > 1 && (
                <>
                  <button type="button" onClick={() => go(-1)} className={`${navButton} left-0`}>
                    <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                    <span className="sr-only">{t('ui.photos.prev')}</span>
                  </button>
                  <button type="button" onClick={() => go(1)} className={`${navButton} right-0`}>
                    <ChevronRight aria-hidden="true" className="h-5 w-5" />
                    <span className="sr-only">{t('ui.photos.next')}</span>
                  </button>
                </>
              )}
            </div>
            {/* Légende = texte alternatif ; annoncée à chaque changement, avec la position dans l'album */}
            <figcaption aria-live="polite" className="max-w-[65ch] text-center text-body text-text-on-inverse">
              <span className="sr-only">
                {t('ui.photos.position', { n: index + 1, total: photos.length })}{' '}
              </span>
              {photoAlt(photo)}
            </figcaption>
          </figure>
        </div>
      )}
    </dialog>
  );
}
