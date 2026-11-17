import { RefObject } from 'react';
import { gsap, MQ, useGSAP } from '../../lib/gsap';

/** Opacité d'un numéro d'étape que le trait n'a pas encore atteint (comme les niveaux de FilScrub) */
const DIM = 0.35;

/**
 * Le fil des étapes de l'accompagnement se dessine au fil du défilement (groupe 7.4, contrat §6 et §10 ; FilSteps.tsx).
 * Ordinateur à souris seulement : chaque trait entre deux numéros s'allonge du haut vers le bas (scaleY), et le numéro
 * suivant s'allume quand le trait l'atteint. Lié au défilement : sans courbe, lissage de 0,5 s, du moment où le haut de
 * la liste atteint 85 % de l'écran jusqu'à ce que son bas atteigne 70 %. Transform et opacité seulement ; les titres et
 * les textes des étapes ne bougent pas.
 * - Liste déjà à l'écran quand GSAP arrive : rien n'est masqué, le fil reste tracé.
 * - Un lien d'étape qui reçoit le focus avant la fin : le fil est tracé et tous les numéros allumés aussitôt.
 * - Téléphone, tactile, mouvement réduit : fil tracé, numéros allumés (état du HTML).
 * Repères posés par FilSteps : [data-fil-steps], [data-fil-steps-seg], [data-fil-steps-dot].
 */
export default function FilStepsScrub({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useGSAP(
    () => {
      const list = scope.current?.querySelector<HTMLElement>('[data-fil-steps]');
      if (!list) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.computer, () => {
        if (list.getBoundingClientRect().top < window.innerHeight * 0.85) return;
        const items = gsap.utils.toArray<HTMLElement>(list.children);
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: list, start: 'top 85%', end: 'bottom 70%', scrub: 0.5, invalidateOnRefresh: true },
        });
        items.forEach((li, i) => {
          const seg = li.querySelector('[data-fil-steps-seg]');
          const next = items[i + 1]?.querySelector('[data-fil-steps-dot]');
          if (!seg) return;
          tl.fromTo(seg, { scaleY: 0, transformOrigin: 'center top' }, { scaleY: 1, duration: 1 }, i);
          if (next) tl.fromTo(next, { opacity: DIM }, { opacity: 1, duration: 0.15 }, i + 0.9);
        });

        // Clavier : une étape atteinte au Tab avant le trait, tout s'affiche
        const reveal = () => {
          if (tl.progress() >= 1) return;
          tl.scrollTrigger?.kill();
          tl.progress(1);
        };
        list.addEventListener('focusin', reveal);
        return () => list.removeEventListener('focusin', reveal);
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
