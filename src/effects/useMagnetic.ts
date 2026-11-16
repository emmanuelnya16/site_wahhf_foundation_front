import { RefObject } from 'react';
import { gsap, useGSAP, MQ, GSAP_EASE } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/reducedMotion';

/**
 * Effet magnétique léger : le bouton suit un peu le pointeur (8 px max), puis revient
 * doucement à sa place (0,4 s, power3.out, sans rebond).
 * Ordinateur à la souris uniquement (gsap.matchMedia), jamais avec « réduire les animations ».
 * gsap.quickTo réutilise une seule animation par axe (pas de nouvelle animation à chaque mouvement).
 */
export function useMagnetic<T extends HTMLElement>(ref: RefObject<T | null>, enabled: boolean) {
  useGSAP(
    () => {
      if (!enabled || prefersReducedMotion() || !ref.current) return;
      const el = ref.current;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: GSAP_EASE.follow });
        const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: GSAP_EASE.follow });
        let rect = el.getBoundingClientRect();

        const onEnter = () => {
          rect = el.getBoundingClientRect();
        };
        const onMove = (event: PointerEvent) => {
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          xTo(gsap.utils.clamp(-8, 8, dx * 0.2));
          yTo(gsap.utils.clamp(-6, 6, dy * 0.3));
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        el.addEventListener('pointerenter', onEnter);
        el.addEventListener('pointermove', onMove);
        el.addEventListener('pointerleave', onLeave);
        return () => {
          el.removeEventListener('pointerenter', onEnter);
          el.removeEventListener('pointermove', onMove);
          el.removeEventListener('pointerleave', onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: ref, dependencies: [enabled] }
  );
}
