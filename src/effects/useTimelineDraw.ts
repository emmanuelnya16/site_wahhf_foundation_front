import { RefObject } from 'react';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/reducedMotion';

/**
 * Frise : la ligne [data-timeline-line] se dessine au défilement (scaleY, scrub, linéaire),
 * et chaque jalon [data-milestone] apparaît une seule fois quand la tête de la ligne l'atteint
 * (même repère : 70 % de la hauteur de l'écran).
 * Une seule transformation scrubée : léger, donc conservé aussi sur téléphone.
 * Réduire les animations : retour immédiat, ligne pleine et jalons visibles.
 */
export function useTimelineDraw(scopeRef: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion() || !scopeRef.current) return;
      const root = scopeRef.current;
      const line = root.querySelector<HTMLElement>('[data-timeline-line]');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: root, start: 'top 70%', end: 'bottom 70%', scrub: true },
          }
        );
      }
      gsap.utils.toArray<HTMLElement>('[data-milestone]', root).forEach((milestone) => {
        gsap.fromTo(
          milestone,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power4.out',
            scrollTrigger: { trigger: milestone, start: 'top 70%', once: true },
          }
        );
      });
    },
    { scope: scopeRef }
  );
}
