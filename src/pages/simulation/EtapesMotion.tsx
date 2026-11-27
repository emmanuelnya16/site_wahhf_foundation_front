import type { RefObject } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '../../lib/gsap';

/**
 * Le fil des 5 étapes, tracé au défilement (lot 13, étape 4). Chargé à l'approche de la section (Etapes.tsx), jamais au
 * départ ni en mouvement réduit. Le trait soleil s'allonge avec le défilement (horizontal dès 1 024 px, vertical
 * dessous) ; chaque point s'allume en soleil quand le trait l'atteint, et s'éteint si l'on remonte.
 * Bouton pause : rien n'est piloté, le fil est entier et les points allumés (l'état sans mouvement).
 */
export default function EtapesMotion({ scope, paused }: { scope: RefObject<HTMLElement | null>; paused: boolean }) {
  useGSAP(
    () => {
      const zone = scope.current;
      const trace = zone?.querySelector<HTMLElement>('.sim-fil-trace');
      const fil = zone?.querySelector<HTMLElement>('.sim-fil');
      const points = Array.from(zone?.querySelectorAll<HTMLElement>('.sim-point') ?? []);
      if (!zone || !trace || !fil || !points.length || paused) return;

      const mm = gsap.matchMedia();
      mm.add({ horizontal: '(min-width: 1024px)', ok: '(prefers-reduced-motion: no-preference)' }, (ctx) => {
        const { horizontal, ok } = ctx.conditions as { horizontal: boolean; ok: boolean };
        if (!ok) return;
        // Position de chaque point le long du fil (0 à 1), relevée à chaque recalcul de ScrollTrigger
        let reperes: number[] = [];
        const mesurer = () => {
          const f = fil.getBoundingClientRect();
          reperes = points.map((point) => {
            const p = point.getBoundingClientRect();
            const centre = horizontal ? p.left + p.width / 2 - f.left : p.top + p.height / 2 - f.top;
            return gsap.utils.clamp(0, 1, centre / (horizontal ? f.width : f.height));
          });
        };
        const allumer = (progression: number) => {
          points.forEach((point, i) => point.classList.toggle('is-atteint', progression >= reperes[i] - 0.005));
        };

        zone.classList.add('is-pilote');
        // GSAP appelle onUpdate dès la création (rendu immédiat) : le trait n'existe pas encore à ce moment-là
        let tween: gsap.core.Tween | null = null;
        const suivre = () => tween && allumer(tween.progress());
        tween = gsap.fromTo(
          trace,
          horizontal ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(horizontal ? { scaleX: 1 } : { scaleY: 1 }),
            ease: 'none',
            // Les points suivent le trait tel qu'il est dessiné (avec le léger retard du scrub), pas la barre de défilement
            onUpdate: suivre,
            scrollTrigger: {
              trigger: zone,
              start: horizontal ? 'top 70%' : 'top 65%',
              end: horizontal ? 'top 30%' : 'bottom 65%',
              scrub: 0.4,
              onRefresh: () => {
                mesurer();
                suivre();
              },
            },
          }
        );
        mesurer();
        suivre();

        return () => {
          zone.classList.remove('is-pilote');
          points.forEach((point) => point.classList.remove('is-atteint'));
        };
      });
      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope, dependencies: [paused], revertOnUpdate: true }
  );
  return null;
}
