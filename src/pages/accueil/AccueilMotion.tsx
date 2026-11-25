import { useEffect, useRef, type RefObject } from 'react';
import { gsap, MQ, ScrollTrigger, useGSAP } from '../../lib/gsap';

const FIL_ID = 'accueil-fil';

/**
 * Mouvement lié au défilement de la page Accueil (lot 11.2), chargé après le premier affichage, avec le GSAP du site :
 * - [data-ac-defile="n"] : parallaxe douce, de n px sous sa place à n px au-dessus (négatif : sens inverse) pendant que
 *   sa section traverse l'écran ; transform seulement, ordinateur à la souris (contrat §10) ;
 * - .ac-fil-trace : le masque du fil en pointillés se dessine au défilement.
 * Mouvement réduit : rien (gsap.matchMedia) ; sans GSAP, tout est déjà en place dans le HTML.
 * Bouton pause : tout se fige où il est, le fil s'affiche en entier.
 */
export default function AccueilMotion({ scope, paused }: { scope: RefObject<HTMLElement | null>; paused: boolean }) {
  const triggers = useRef<ScrollTrigger[]>([]);
  const pausedRef = useRef(paused);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.computer, () => {
        const created: ScrollTrigger[] = [];
        gsap.utils.toArray<HTMLElement>('[data-ac-defile]', root).forEach((el) => {
          const shift = Number(el.dataset.acDefile);
          const tween = gsap.fromTo(
            el,
            { y: shift },
            { y: -shift, ease: 'none', scrollTrigger: { trigger: el.closest('section'), start: 'top bottom', end: 'bottom top', scrub: true } }
          );
          if (tween.scrollTrigger) created.push(tween.scrollTrigger);
        });
        const trace = root.querySelector<SVGPathElement>('.ac-fil-trace');
        if (trace) {
          const tween = gsap.fromTo(
            trace,
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, ease: 'none', scrollTrigger: { id: FIL_ID, trigger: trace.closest('.ac-qsn-images'), start: 'top 45%', end: 'bottom 62%', scrub: 0.6 } }
          );
          if (tween.scrollTrigger) created.push(tween.scrollTrigger);
        }
        triggers.current = created;
        if (pausedRef.current) freeze(created);
        return () => {
          triggers.current = [];
        };
      });
      return () => mm.revert();
    },
    { scope }
  );

  useEffect(() => {
    pausedRef.current = paused;
    if (paused) freeze(triggers.current);
    else triggers.current.forEach((trigger) => trigger.enable(false));
  }, [paused]);

  return null;
}

/** Fige la parallaxe où elle est ; le fil, qui n'a de sens que complet, s'affiche en entier */
function freeze(list: ScrollTrigger[]) {
  list.forEach((trigger) => {
    trigger.disable(false);
    if (trigger.vars.id === FIL_ID) trigger.animation?.progress(1);
  });
}
