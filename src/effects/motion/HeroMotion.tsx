import { RefObject } from 'react';
import { gsap, MQ, useGSAP } from '../../lib/gsap';

/**
 * Hero de l'accueil au défilement (contrat §10, moment 1 bis, lot 7) : ordinateur à souris seulement.
 * - La vidéo (ou l'image d'attente) [data-hero-media] descend de 8 % de la hauteur du hero pendant que le hero quitte
 *   l'écran : elle défile un peu moins vite que la page (parallaxe de 8 % au plus). Le bord du haut qui se découvre
 *   reste toujours au-dessus de l'écran ou sous l'en-tête opaque : jamais visible.
 * - Le voile s'assombrit doucement : un calque nuit [data-hero-dim] passe de 0 à 40 % (le contraste ne fait que monter).
 * Lié au défilement : sans courbe et sans lissage (scrub immédiat) : avec un retard, l'image pourrait rester décalée
 * quand on remonte vite et laisser voir une bande vide en haut du hero. Transform et opacité seulement.
 * Téléphone, tactile, mouvement réduit : rien (gsap.matchMedia).
 */
export default function HeroMotion({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useGSAP(
    () => {
      const hero = scope.current;
      const media = hero?.querySelector<HTMLElement>('[data-hero-media]');
      const dim = hero?.querySelector<HTMLElement>('[data-hero-dim]');
      if (!hero || !media || !dim) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.computer, () => {
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: hero, start: 0, end: 'bottom top', scrub: true, invalidateOnRefresh: true },
          })
          .fromTo(media, { y: 0 }, { y: () => hero.offsetHeight * 0.08 }, 0)
          .fromTo(dim, { opacity: 0 }, { opacity: 0.4 }, 0);
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
