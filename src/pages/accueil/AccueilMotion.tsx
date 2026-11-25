import { useEffect, useRef, type RefObject } from 'react';
import { gsap, MQ, ScrollTrigger, useGSAP } from '../../lib/gsap';

/** Part du passage de la section 2 à l'écran où le fil se dessine (début et fin) */
const FIL = [0.35, 0.61] as const;

/**
 * Mouvement de la page Accueil sur ordinateur à la souris (lots 11.2 et 11.3), chargé après le premier affichage, avec
 * le GSAP du site ; ailleurs, AccueilPage ne le charge pas.
 * - [data-ac-defile="n"] : parallaxe douce au défilement, de n px sous sa place à n px au-dessus (négatif : sens
 *   inverse) pendant que sa section traverse l'écran. Un seul ScrollTrigger par section, transform seulement.
 * - .ac-fil-trace : le masque du fil en pointillés se dessine, dans la même timeline que sa section.
 * - [data-parallaxe="n"] : dans le hero, n px au plus en suivant la souris (Observer de ScrollTrigger, quickTo) ; aucune
 *   mesure de mise en page pendant le mouvement.
 * Mouvement réduit : rien (gsap.matchMedia) ; sans GSAP, tout est déjà en place dans le HTML.
 * Bouton pause : tout se fige où il est, le fil s'affiche en entier, le hero ne suit plus la souris.
 */
export default function AccueilMotion({ scope, paused }: { scope: RefObject<HTMLElement | null>; paused: boolean }) {
  const pausedRef = useRef(paused);
  const apply = useRef<((stop: boolean) => void) | null>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.computer, () => {
        const triggers: ScrollTrigger[] = [];
        let fil: gsap.core.Tween | null = null;
        const sections = new Set(gsap.utils.toArray<HTMLElement>('[data-ac-defile]', root).map((el) => el.closest('section')!));
        sections.forEach((section) => {
          const tl = gsap.timeline({
            defaults: { ease: 'none', duration: 1 },
            scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: true },
          });
          section.querySelectorAll<HTMLElement>('[data-ac-defile]').forEach((el) => {
            const shift = Number(el.dataset.acDefile);
            tl.fromTo(el, { y: shift }, { y: -shift }, 0);
          });
          const trace = section.querySelector<SVGPathElement>('.ac-fil-trace');
          if (trace) {
            fil = gsap.fromTo(trace, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', duration: FIL[1] - FIL[0] });
            tl.add(fil, FIL[0]);
          }
          if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
        });

        const hero = root.querySelector<HTMLElement>('.ac-hero');
        const layers = hero
          ? gsap.utils.toArray<HTMLElement>('[data-parallaxe]', hero).map((el) => ({
              depth: Number(el.dataset.parallaxe),
              x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3.out' }),
              y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3.out' }),
            }))
          : [];
        const move = (x: number, y: number) =>
          layers.forEach((layer) => {
            layer.x(x * layer.depth);
            layer.y(y * layer.depth);
          });
        const range = gsap.utils.clamp(-1, 1);
        const pointer = hero
          ? ScrollTrigger.observe({
              target: hero,
              type: 'pointer',
              onMove: (self) => move(range(((self.x ?? 0) / window.innerWidth) * 2 - 1), range(((self.y ?? 0) / window.innerHeight) * 2 - 1)),
              onHoverEnd: () => move(0, 0),
            })
          : null;

        apply.current = (stop) => {
          if (stop) {
            triggers.forEach((trigger) => trigger.disable(false));
            fil?.progress(1);
            pointer?.disable();
            move(0, 0);
          } else {
            triggers.forEach((trigger) => trigger.enable(false));
            pointer?.enable();
          }
        };
        if (pausedRef.current) apply.current(true);
        return () => {
          pointer?.kill();
          apply.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope }
  );

  useEffect(() => {
    if (pausedRef.current === paused) return;
    pausedRef.current = paused;
    apply.current?.(paused);
  }, [paused]);

  return null;
}
