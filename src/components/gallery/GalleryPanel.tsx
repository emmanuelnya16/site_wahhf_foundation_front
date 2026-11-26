import type { CSSProperties, KeyboardEvent, PointerEvent, Ref } from 'react';
import { Link } from 'react-router-dom';
import type { CatalogPhoto } from '../../data/photos';
import Photo from '../wahhf/Photo';

export interface GalleryPanelData {
  id: string;
  title: string;
  /** Période ou lieu, sous le titre */
  meta: string;
  /** Deux lignes au plus (28 caractères de large) */
  description: string;
  photo: CatalogPhoto;
  /** Lien facultatif sous la description (ex. l'album de la galerie) */
  link?: { to: string; label: string };
}

type Props = {
  panel: GalleryPanelData;
  index: number;
  open: boolean;
  /** Le panneau suit le panneau ouvert (il se place après lui) */
  after: boolean;
  sizes: string;
  textId: string;
  buttonRef: Ref<HTMLButtonElement>;
  onOpen: () => void;
  onFocusOpen: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onPointerEnter: (event: PointerEvent<HTMLLIElement>) => void;
  onPointerLeave: () => void;
};

/** Cadrage du catalogue (« center 55% », « 35% 40% »…) → fractions 0 à 1, pour centrer la tranche montrée par une bande. */
function focusFractions(focus: string): { fx: number; fy: number } {
  const value = (token: string | undefined) => {
    if (!token || token === 'center') return 0.5;
    if (token === 'left' || token === 'top') return 0;
    if (token === 'right' || token === 'bottom') return 1;
    const n = parseFloat(token);
    return Number.isFinite(n) ? Math.min(1, Math.max(0, n / 100)) : 0.5;
  };
  const [x, y] = focus.trim().split(/\s+/);
  return { fx: value(x), fy: value(y ?? x) };
}

/**
 * Un panneau de l'accordéon (lot 7.6).
 * - La photo remplit le cadre arrondi, recadrée autour du centre d'intérêt du catalogue : rien ne zoome ni ne saute
 *   pendant l'élargissement.
 * - Le bouton couvre tout le panneau ; son nom est le titre, en texte masqué visuellement (les bandes n'en affichent
 *   pas). aria-expanded dit si le panneau est ouvert, aria-controls désigne son texte.
 * - Le texte (titre, période, description) est frère du bouton, jamais dedans ; panneau réduit : inert et aria-hidden.
 * - Position et taille calculées en CSS à partir de --i et --after (src/index.css) : transform, pas de flux.
 * - data-reveal="clip" : découverte du bas vers le haut à l'arrivée (RevealBatch, ordinateur seulement).
 */
export default function GalleryPanel({ panel, index, open, after, sizes, textId, buttonRef, onOpen, onFocusOpen, onKeyDown, onPointerEnter, onPointerLeave }: Props) {
  const { fx, fy } = focusFractions(panel.photo.focus);
  const vars = { '--i': index, '--after': after ? 1 : 0, '--fx': fx, '--fy': fy } as CSSProperties;
  return (
    <li
      className="xg-panel"
      style={vars}
      data-open={open || undefined}
      data-reveal="clip"
      data-reveal-radius="1.5rem"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <div className="xg-frame">
        <div className="xg-media">
          <Photo photo={panel.photo} sizes={sizes} fit="cover" radius="none" />
        </div>
        {/* Téléphone : le titre en petit sur la bande réduite, pour savoir où toucher (le bouton porte déjà le nom) */}
        <span className="xg-strip" aria-hidden="true">
          {panel.title}
        </span>
        <button
          ref={buttonRef}
          type="button"
          className="xg-button"
          aria-expanded={open}
          aria-controls={textId}
          onClick={onOpen}
          onFocus={(event) => {
            // Focus au clavier seulement : un appui au doigt passe par le clic
            if (event.currentTarget.matches(':focus-visible')) onFocusOpen();
          }}
          onKeyDown={onKeyDown}
        >
          <span className="sr-only">{panel.title}</span>
        </button>
        <div id={textId} className="xg-text" inert={!open} aria-hidden={open ? undefined : true}>
          <h3 className="xg-title">{panel.title}</h3>
          {panel.meta && <p className="xg-meta">{panel.meta}</p>}
          <p className="xg-description">{panel.description}</p>
          {panel.link && (
            <Link
              to={panel.link.to}
              className="mt-1 inline-flex min-h-11 items-center text-body text-link-on-inverse underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              {panel.link.label}
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}
