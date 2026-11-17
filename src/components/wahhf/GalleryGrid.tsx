import { ComponentType, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { Play } from 'lucide-react';
import { formatDuration, GalleryItem } from '../../data/gallery';
import ChunkErrorBoundary from './ChunkErrorBoundary';
import { cn } from '../../lib/utils';
import type { FillLayout } from './galleryLayout';
import type { GalleryLightboxProps } from './GalleryLightbox';

// Visionneuse chargée au premier clic (avec Motion complet, pour le glisser) : rien de plus au premier affichage.
// Chargée à la main (et non par React.lazy) pour qu'elle soit prête quand la transition partagée photographie le
// nouvel état. Le téléchargement commence dès qu'une vignette est survolée ou reçoit le focus.
type Lightbox = ComponentType<GalleryLightboxProps>;
let lightboxModule: Promise<Lightbox> | null = null;
const loadLightbox = () => {
  lightboxModule ??= import('./GalleryLightbox').then((m) => m.default);
  lightboxModule.catch(() => {
    lightboxModule = null; // un nouvel essai au prochain clic
  });
  return lightboxModule;
};

/** Nom de la transition partagée (index.css, ::view-transition-group(galerie-media)). */
export const SHARED_NAME = 'galerie-media';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void | Promise<void>) => { finished: Promise<void> };
};

/** Échec de téléchargement de la visionneuse : le message et « Réessayer » de ChunkErrorBoundary. */
function LoadFailure(): never {
  throw new Error('Visionneuse de la galerie : fichier non téléchargé');
}

interface GalleryGridProps {
  items: GalleryItem[];
  /** Première vignette mise en avant (2 × 2) à partir de la tablette */
  featureFirst?: boolean;
  /** Colonnes de la grille (classes Tailwind) ; ignoré avec `fill` */
  cols?: string;
  className?: string;
  /** false : vignettes affichées d'un coup, sans apparition. Par défaut : apparition au défilement (contrat §10). */
  reveal?: boolean;
  /**
   * Grille « sans trou » (page Galerie, GAL-03) : mise en page calculée par fillLayout() (src/components/wahhf/
   * galleryLayout.ts, chargé avec la page Galerie seulement) : colonnes adaptées au nombre d'éléments, rangées toutes
   * complètes, largeur plafonnée pour qu'aucune photo ne s'affiche plus grande que la moitié de sa taille réelle
   * (contrat §5, densité 2).
   */
  fill?: FillLayout;
  /**
   * Ouverture depuis la vignette cliquée (page Galerie, groupe 7.3) : la photo s'agrandit de sa place dans la grille
   * jusqu'à la visionneuse (View Transitions API, 0,6 s), pendant que le fond apparaît en fondu (0,3 s). Navigateur
   * sans View Transitions, mouvement réduit, ou visionneuse pas encore téléchargée : ouverture simple.
   */
  openFromThumb?: boolean;
}

/**
 * Grille de vignettes (ratio 4:3 réservé, chargement différé) qui ouvre la visionneuse.
 * Lot 7 (contrat §10) : chaque vignette porte data-reveal ; les apparitions groupées (fondu et montée de 24 px,
 * src/effects/motion/RevealBatch.tsx) remplacent l'ancienne apparition décalée de Motion (StaggerGroup, gardé dans
 * src/effects). Aucun zoom au survol.
 * Chaque vignette est un bouton : son nom accessible est le texte alternatif de l'image.
 */
export default function GalleryGrid({
  items,
  featureFirst = false,
  cols = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  className = '',
  reveal = true,
  fill,
  openFromThumb = false,
}: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // La visionneuse reste montée après sa première ouverture (fondu de fermeture)
  const [LightboxView, setLightboxView] = useState<{ Component: Lightbox } | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  // Nom de transition posé sur la photo de la visionneuse pendant l'ouverture partagée
  const [sharedIndex, setSharedIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const layout = fill ?? null;

  const open = (i: number, button: HTMLButtonElement) => {
    openerRef.current = button;
    const doc = document as ViewTransitionDocument;
    const shared =
      openFromThumb && !!doc.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    loadLightbox()
      .then(async (Component) => {
        if (!shared) {
          setLightboxView((current) => current ?? { Component });
          setOpenIndex(i);
          return;
        }
        // La grande photo est demandée avant la transition (0,35 s au plus) : sinon la visionneuse s'ouvrirait sur
        // son image d'attente (la vignette de 480 px)
        const item = items[i];
        if (item.kind === 'photo') {
          const img = new Image();
          img.sizes = '(min-width: 1024px) 1000px, 100vw';
          img.srcset = item.srcSet;
          img.src = item.src;
          await Promise.race([img.decode().catch(() => {}), new Promise((r) => setTimeout(r, 350))]);
        }
        const thumb = button.querySelector('img');
        if (thumb) thumb.style.viewTransitionName = SHARED_NAME;
        const root = document.documentElement;
        root.classList.add('vt-galerie');
        const transition = doc.startViewTransition!(() => {
          if (thumb) thumb.style.viewTransitionName = '';
          flushSync(() => {
            setLightboxView((current) => current ?? { Component });
            setSharedIndex(i);
            setOpenIndex(i);
          });
        });
        transition.finished.finally(() => {
          root.classList.remove('vt-galerie');
          setSharedIndex(null);
        });
      })
      .catch(() => setLoadFailed(true));
  };

  return (
    <>
      <div
        className={fill ? cn('@container w-full max-w-(--max-base) md:max-w-(--max-md) lg:max-w-(--max-lg)', className) : undefined}
        style={layout?.style}
      >
        <div className={fill ? 'gallery-fill' : `grid ${cols} gap-3 sm:gap-4 ${className}`}>
          {items.map((item, i) => {
            const featured = !fill && featureFirst && i === 0;
            const large = layout ? layout.isLarge(i) : featured;
            const thumb = item.kind === 'photo' ? item.src : item.poster;
            return (
              <button
                key={item.id}
                type="button"
                data-reveal={reveal || undefined}
                onPointerEnter={() => void loadLightbox().catch(() => {})}
                onFocus={() => void loadLightbox().catch(() => {})}
                onClick={(e) => open(i, e.currentTarget)}
                style={layout?.itemStyle(i)}
                className={cn(
                  'relative block w-full overflow-hidden rounded-inner bg-surface-section cursor-zoom-in',
                  fill
                    ? 'h-full'
                    : featured
                      ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto md:h-full'
                      : 'aspect-[4/3]'
                )}
              >
                <span className="sr-only">{item.kind === 'video' ? 'Lire la vidéo : ' : 'Agrandir la photo : '}</span>
                <img
                  src={thumb}
                  srcSet={item.kind === 'photo' ? item.srcSet : undefined}
                  sizes={
                    large
                      ? '(min-width: 1024px) 610px, (min-width: 768px) 66vw, 100vw'
                      : '(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw'
                  }
                  alt={item.alt}
                  width={item.w}
                  height={item.h}
                  loading="lazy"
                  decoding="async"
                  style={item.focus ? { objectPosition: item.focus } : undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {item.kind === 'video' && (
                  <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-humus/25">
                    <span className="w-12 h-12 rounded-pill bg-action-on-inverse text-on-action-on-inverse flex items-center justify-center">
                      <Play className="w-5 h-5 translate-x-px" fill="currentColor" />
                    </span>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-pill bg-humus/85 text-brume-voilee text-meta tabular-nums">
                      {formatDuration(item.duration)}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Échec de téléchargement de la visionneuse : « Réessayer » sous la grille, la page reste en place */}
      {loadFailed && !LightboxView && (
        <ChunkErrorBoundary className="mt-4">
          <LoadFailure />
        </ChunkErrorBoundary>
      )}
      {LightboxView && (
        <LightboxView.Component
          items={items}
          index={openIndex}
          onChange={setOpenIndex}
          returnFocusRef={openerRef}
          sharedName={sharedIndex !== null && sharedIndex === openIndex ? SHARED_NAME : undefined}
          appear={sharedIndex === null}
        />
      )}
    </>
  );
}
