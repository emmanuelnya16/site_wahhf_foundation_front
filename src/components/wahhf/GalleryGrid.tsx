import { lazy, Suspense, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { formatDuration, GalleryItem } from '../../data/gallery';
import ChunkErrorBoundary from './ChunkErrorBoundary';

// Visionneuse chargée au premier clic (avec Motion complet, pour le glisser) : rien de plus au premier affichage.
const GalleryLightbox = lazy(() => import('./GalleryLightbox'));

interface GalleryGridProps {
  items: GalleryItem[];
  /** Première vignette mise en avant (2 × 2) à partir de la tablette */
  featureFirst?: boolean;
  /** Colonnes de la grille (classes Tailwind) */
  cols?: string;
  className?: string;
  /** false : vignettes affichées d'un coup, sans apparition. Par défaut : apparition au défilement (contrat §10). */
  reveal?: boolean;
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
}: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // La visionneuse reste montée après sa première ouverture (fondu de fermeture)
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <div className={`grid ${cols} gap-3 sm:gap-4 ${className}`}>
        {items.map((item, i) => {
          const featured = featureFirst && i === 0;
          const thumb = item.kind === 'photo' ? item.src : item.poster;
          return (
            <button
              key={item.id}
              type="button"
              data-reveal={reveal || undefined}
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setLightboxLoaded(true);
                setOpenIndex(i);
              }}
              className={`relative block w-full overflow-hidden rounded-inner bg-surface-section cursor-zoom-in ${
                featured ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto md:h-full' : 'aspect-[4/3]'
              }`}
            >
              <span className="sr-only">{item.kind === 'video' ? 'Lire la vidéo : ' : 'Agrandir la photo : '}</span>
              <img
                src={thumb}
                srcSet={item.kind === 'photo' ? item.srcSet : undefined}
                sizes={
                  featured
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
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-v1-nuit/25">
                  <span className="w-12 h-12 rounded-pill bg-or text-v1-encre flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 translate-x-px" fill="currentColor" />
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-pill bg-v1-nuit/85 text-creme text-[11px] font-semibold tabular-nums">
                    {formatDuration(item.duration)}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Échec de téléchargement de la visionneuse : « Réessayer » sous la grille, la page reste en place */}
      {lightboxLoaded && (
        <ChunkErrorBoundary className="mt-4">
          <Suspense fallback={null}>
            <GalleryLightbox items={items} index={openIndex} onChange={setOpenIndex} returnFocusRef={openerRef} />
          </Suspense>
        </ChunkErrorBoundary>
      )}
    </>
  );
}
