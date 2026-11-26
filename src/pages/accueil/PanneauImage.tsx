import type { CSSProperties, KeyboardEvent, PointerEvent, Ref } from 'react';
import { Link } from 'react-router-dom';
import Photo from '../../components/wahhf/Photo';
import type { CatalogPhoto } from '../../data/photos';

export interface PanneauImageData {
  id: string;
  title: string;
  meta: string;
  description: string;
  photo: CatalogPhoto;
  album: { to: string; label: string };
  /** Titre court sous le point du fil (Apprendre, Chanter…) */
  court: string;
}

type Props = {
  panneau: PanneauImageData;
  index: number;
  dernier: boolean;
  open: boolean;
  after: boolean;
  textId: string;
  buttonRef: Ref<HTMLButtonElement>;
  onOpen: () => void;
  onFocusOpen: () => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  onPointerEnter: (event: PointerEvent<HTMLLIElement>) => void;
  onPointerLeave: () => void;
};

const SIZES = '(min-width: 1024px) and (pointer: fine) min(60vw, 45rem), 100vw';
const pad2 = (n: number) => String(n).padStart(2, '0');

/** Cadrage du catalogue (« center 55% ») → fractions 0 à 1, comme l'accordéon de / (GalleryPanel) */
function fractions(focus: string) {
  const valeur = (token: string | undefined) => {
    if (!token || token === 'center') return 0.5;
    if (token === 'left' || token === 'top') return 0;
    if (token === 'right' || token === 'bottom') return 1;
    const n = parseFloat(token);
    return Number.isFinite(n) ? Math.min(1, Math.max(0, n / 100)) : 0.5;
  };
  const [x, y] = focus.trim().split(/\s+/);
  return { fx: valeur(x), fy: valeur(y ?? x) };
}

/** Petit sommet (triangle aux coins arrondis) : le dernier point du fil, « jusqu'au sommet » */
function Sommet() {
  return (
    <svg className="ac-img-sommet" viewBox="0 0 24 22" aria-hidden="true" focusable="false">
      <path d="M10.3 2.6a2 2 0 0 1 3.4 0l9 15.4A2 2 0 0 1 21 21H3a2 2 0 0 1-1.7-3z" />
    </svg>
  );
}

/**
 * Un panneau de « En images » (lot 11.8), variante de GalleryPanel (src/components/gallery, inchangé) : même bouton
 * (aria-expanded, aria-controls, nom = titre), même texte frère du bouton, inert quand le panneau est réduit. En plus :
 * - la bande fermée montre son numéro et son titre (à la verticale sur ordinateur) ;
 * - la légende du panneau ouvert est dans une carte coin feuille ;
 * - son étape du fil (point, trait vers l'étape précédente, titre court) : décor, aria-hidden, ouvre le panneau au clic.
 */
export default function PanneauImage({ panneau, index, dernier, open, after, textId, buttonRef, onOpen, onFocusOpen, onKeyDown, onPointerEnter, onPointerLeave }: Props) {
  const { fx, fy } = fractions(panneau.photo.focus);
  const numero = pad2(index + 1);
  const vars = { '--i': index, '--after': after ? 1 : 0, '--fx': fx, '--fy': fy } as CSSProperties;
  return (
    <li className="ac-img-panneau" style={vars} data-open={open || undefined} data-after={after || undefined} onPointerEnter={onPointerEnter} onPointerLeave={onPointerLeave}>
      <div className="ac-img-cadre">
        <div className="ac-img-media">
          <Photo photo={panneau.photo} sizes={SIZES} fit="cover" radius="none" />
        </div>
        <span className="ac-img-bande" aria-hidden="true">
          <span className="ac-img-vertical">{panneau.title}</span>
          <b className="ac-img-num">{numero}</b>
        </span>
        <button
          ref={buttonRef}
          type="button"
          className="ac-img-bouton"
          aria-expanded={open}
          aria-controls={textId}
          onClick={onOpen}
          onFocus={(event) => {
            // Focus au clavier seulement : un appui au doigt passe par le clic
            if (event.currentTarget.matches(':focus-visible')) onFocusOpen();
          }}
          onKeyDown={onKeyDown}
        >
          <span className="sr-only">{panneau.title}</span>
        </button>
        <div id={textId} className="ac-img-texte" inert={!open} aria-hidden={open ? undefined : true}>
          <div className="ac-img-carte">
            <p className="ac-img-meta">
              <b className="ac-img-carte-num" aria-hidden="true">
                {numero}
              </b>
              {panneau.meta && <span>{panneau.meta}</span>}
            </p>
            <h3 className="ac-img-titre">{panneau.title}</h3>
            <p className="ac-img-description">{panneau.description}</p>
            <Link to={panneau.album.to} className="ac-img-album">
              {panneau.album.label}
            </Link>
          </div>
        </div>
      </div>
      {/* Le fil : décor pour le clavier et les lecteurs d'écran ; au clic ou au toucher, il ouvre le panneau */}
      <span className="ac-img-etape" aria-hidden="true" onClick={onOpen}>
        <span className="ac-img-trait">
          <span className="ac-img-trait-plein" />
        </span>
        <span className="ac-img-pt">{dernier ? <Sommet /> : <span className="ac-img-pt-num">{numero}</span>}</span>
        <span className="ac-img-court">{panneau.court}</span>
      </span>
    </li>
  );
}
