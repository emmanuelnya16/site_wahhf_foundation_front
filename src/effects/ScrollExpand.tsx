import { ReactNode, useRef } from 'react';
import { AfterFirstDisplay, ScrollExpandMotion } from './DeferredMotion';

interface ScrollExpandProps {
  /** Le média, marqué data-expand-media : une photo (img) ou, plus tard, une boucle vidéo (video). */
  media: ReactNode;
  /** Légende et lien, sous le média ; posés sur lui à la fin de l'ouverture (ordinateur). */
  caption: ReactNode;
  /** Fin de l'ouverture : 'container' (72 rem, rayon 20 px) tant que le média est trop petit, 'screen' en HD. */
  fit?: 'container' | 'screen';
  className?: string;
}

/**
 * Scroll Expand (contrat §10, moment 3 : « Sur le terrain », lot 7). Inspiré du composant ScrollExpand de React Bits
 * (clip-path inset, zoom du média, voile progressif, texte qui arrive à la fin), codé avec GSAP ScrollTrigger.
 *
 * - Ordinateur à souris, 1 024 × 700 px au moins (ScrollExpandMotion, chargé après le premier affichage) : la scène
 *   passe en mode « on » (data-expand, styles .expand-* dans src/index.css) et s'épingle sous l'en-tête. La photo,
 *   d'abord dans un cadre arrondi au centre (environ 42 % × 58 % de l'écran), s'ouvre au défilement pendant qu'elle
 *   passe de 1,2 à 1 ; un voile nuit monte par le bas ; à la fin, la légende et le lien apparaissent. L'ouverture
 *   s'arrête à la largeur du container (fit 'container', rayon 20 px) tant que le média est trop petit pour le plein
 *   écran (photo de 986 px), et va jusqu'au plein écran avec un média HD (fit 'screen', décision du 17/11).
 * - Ailleurs (téléphone, tactile, petit écran, mouvement réduit) : photo normale dans son cadre, légende dessous ;
 *   apparition en fondu avec les autres photos (data-reveal), sauf en mouvement réduit.
 * L'ancre (id de la section) reste sur la section : c'est cette scène intérieure qui est épinglée.
 */
export default function ScrollExpand({ media, caption, fit = 'container', className = '' }: ScrollExpandProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={stageRef} data-expand-fit={fit} className={`expand-stage ${className}`}>
        <div className="container-page">
          <figure>
            <div className="expand-frame" data-reveal="">
              {media}
              <div className="expand-veil" aria-hidden="true" />
            </div>
            <figcaption className="expand-caption">{caption}</figcaption>
          </figure>
        </div>
      </div>
      <AfterFirstDisplay>
        <ScrollExpandMotion scope={stageRef} />
      </AfterFirstDisplay>
    </>
  );
}
