import { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import StaggerGroup from '../../effects/StaggerGroup';
import { formatDuration, GalleryItem } from '../../data/gallery';
import GalleryLightbox from './GalleryLightbox';

interface GalleryGridProps {
  items: GalleryItem[];
  /** Première vignette mise en avant (2 × 2) à partir de la tablette */
  featureFirst?: boolean;
  /** Colonnes de la grille (classes Tailwind) */
  cols?: string;
  className?: string;
}

/**
 * Grille de vignettes (ratio 4:3 réservé, chargement différé) qui ouvre la visionneuse.
 * Apparition décalée douce (StaggerGroup, opacité) ; zoom lent au survol (souris seulement).
 * Chaque vignette est un bouton : son nom accessible est le texte alternatif de l'image.
 */
export default function GalleryGrid({
  items,
  featureFirst = false,
  cols = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  className = '',
}: GalleryGridProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <StaggerGroup className={`grid ${cols} gap-3 sm:gap-4 ${className}`}>
        {items.map((item, i) => {
          const featured = featureFirst && i === 0;
          const thumb = item.kind === 'photo' ? item.src : item.poster;
          return (
            <button
              key={item.id}
              type="button"
              onClick={(e) => {
                openerRef.current = e.currentTarget;
                setOpenIndex(i);
              }}
              className={`group relative block w-full overflow-hidden rounded-2xl bg-[#0F3D2E]/10 dark:bg-[#F5F1E8]/10 cursor-zoom-in focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3D2E] dark:focus-visible:outline-[#E8A317] ${
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
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {item.kind === 'video' && (
                <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-[#0B1F18]/25">
                  <span className="w-12 h-12 rounded-full bg-[#E8A317] text-[#1B1B18] flex items-center justify-center shadow-lg">
                    <Play className="w-5 h-5 translate-x-px" fill="currentColor" />
                  </span>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-[#0B1F18]/85 text-[#F5F1E8] text-[11px] font-semibold tabular-nums">
                    {formatDuration(item.duration)}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </StaggerGroup>

      <GalleryLightbox items={items} index={openIndex} onChange={setOpenIndex} returnFocusRef={openerRef} />
    </>
  );
}
