import { ReactNode, useRef } from 'react';
import { AfterFirstDisplay, ScrollExpandMotion } from './DeferredMotion';

interface ScrollExpandProps {
  /** Le média, marqué data-expand-media : une photo (img) ou, plus tard, une boucle vidéo (video). */
  media: ReactNode;
  /** Légende et lien, sous le média ; posés sur lui à la fin de l'ouverture (ordinateur). */
  caption: ReactNode;
  className?: string;
}

/**
 * Scroll Expand (contrat §10, moment 3 : « Sur le terrain », lot 7). Inspiré du composant ScrollExpand de React Bits
 * (clip-path inset, zoom du média, voile progressif, texte qui arrive à la fin), codé avec GSAP ScrollTrigger.
 *
 * - Ordinateur à souris, 1 024 × 700 px au moins (ScrollExpandMotion, chargé après le premier affichage) : la scène
 *   passe en mode « on » (data-expand, styles .expand-* dans src/index.css) et s'épingle sous l'en-tête. La photo,
 *   d'abord dans un cadre arrondi au centre (environ 42 % × 58 % de l'écran), s'ouvre en plein écran au défilement
 *   pendant qu'elle passe de 1,2 à 1 ; un voile nuit monte par le bas ; à la fin, la légende et le lien apparaissent.
 * - Ailleurs (téléphone, tactile, petit écran, mouvement réduit) : photo normale dans son cadre, légende dessous ;
 *   apparition en fondu avec les autres photos (data-reveal), sauf en mouvement réduit.
 * L'ancre (id de la section) reste sur la section : c'est cette scène intérieure qui est épinglée.
 */
export default function ScrollExpand({ media, caption, className = '' }: ScrollExpandProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div ref={stageRef} className={`expand-stage ${className}`}>
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
