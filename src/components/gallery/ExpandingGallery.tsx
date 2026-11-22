import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { useMediaQuery } from '../../lib/useMediaQuery';
import GalleryPanel, { type GalleryPanelData } from './GalleryPanel';

/** Bureau : 1 024 px et plus, à la souris. Ailleurs, les bandes s'empilent et s'ouvrent au toucher. */
const DESKTOP = '(min-width: 1024px) and (pointer: fine)';
/** Intention de survol : la bande s'ouvre si la souris y reste 100 ms (un simple passage ne déclenche rien). */
const HOVER_INTENT_MS = 100;

/**
 * Accordéon d'images (lot 7.6), piloté par données : exactement un panneau ouvert, le premier au départ.
 * - Bureau : rangée de bandes ; ouverture au survol (100 ms d'intention), au focus clavier et au clic. Quand la souris
 *   quitte la galerie, le dernier panneau survolé reste ouvert.
 * - Téléphone et tablette : bandes empilées, ouverture au toucher.
 * - Clavier : Tab d'un bouton à l'autre ; flèches, Début et Fin déplacent le focus et ouvrent le panneau ; Entrée et
 *   Espace ouvrent.
 * - Aucun défilement automatique. Les transitions sont en CSS (src/index.css, « Accordéon d'images »), pas de GSAP.
 */
export default function ExpandingGallery({ panels, sizes, className }: { panels: GalleryPanelData[]; sizes: string; className?: string }) {
  const [openIndex, setOpenIndex] = useState(0);
  const desktop = useMediaQuery(DESKTOP);
  const baseId = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const intent = useRef<number | undefined>(undefined);

  const cancelIntent = () => window.clearTimeout(intent.current);
  useEffect(() => cancelIntent, []);

  const onPointerEnter = (index: number) => (event: PointerEvent<HTMLLIElement>) => {
    if (!desktop || event.pointerType !== 'mouse') return;
    cancelIntent();
    intent.current = window.setTimeout(() => setOpenIndex(index), HOVER_INTENT_MS);
  };

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = panels.length - 1;
    const next =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? Math.min(index + 1, last)
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? Math.max(index - 1, 0)
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? last
              : null;
    if (next === null) return;
    event.preventDefault();
    setOpenIndex(next);
    buttons.current[next]?.focus();
  };

  return (
    <ul className={['xg', className].filter(Boolean).join(' ')} style={{ '--xg-n': panels.length } as CSSProperties}>
      {panels.map((panel, index) => (
        <GalleryPanel
          key={panel.id}
          panel={panel}
          index={index}
          open={index === openIndex}
          after={index > openIndex}
          sizes={sizes}
          textId={`${baseId}-${panel.id}`}
          buttonRef={(el) => {
            buttons.current[index] = el;
          }}
          onOpen={() => {
            cancelIntent();
            setOpenIndex(index);
          }}
          onFocusOpen={() => setOpenIndex(index)}
          onKeyDown={onKeyDown(index)}
          onPointerEnter={onPointerEnter(index)}
          onPointerLeave={cancelIntent}
        />
      ))}
    </ul>
  );
}
