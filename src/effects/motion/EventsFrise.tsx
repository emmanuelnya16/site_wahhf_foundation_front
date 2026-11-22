import { RefObject } from 'react';
import { gsap, MQ, useGSAP } from '../../lib/gsap';

/**
 * Lot 7.9 : frise du déroulé (page Événements). Le remplissage forêt suit le défilement de la liste, comme la
 * référence (scaleY de 0 à 1, origine en haut) : il commence quand le haut de la liste passe le milieu de l'écran et
 * se termine quand son bas y arrive. Seul transform s'anime.
 * Mouvement réduit : rien n'est créé, la frise reste pleine (CSS).
 */
export default function EventsFrise({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useGSAP(
    () => {
      const root = scope.current;
      const fill = root?.querySelector<HTMLElement>('.ev-frise-rempli');
      const list = root?.querySelector<HTMLElement>('.ev-frise-liste');
      if (!fill || !list) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: list, start: 'top center', end: 'bottom center', scrub: true, invalidateOnRefresh: true },
          }
        );
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
