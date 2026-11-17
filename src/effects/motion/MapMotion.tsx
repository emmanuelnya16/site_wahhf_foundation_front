import { RefObject } from 'react';
import { gsap, MQ, ScrollTrigger, useGSAP, GSAP_EASE, DURATION } from '../../lib/gsap';
import { CAMEROON_REGIONS_LIST } from '../../data/regions';

/** Cascade des régions : de la côte (sud) vers le nord, selon la latitude des chefs-lieux. */
const CASCADE_ORDER = [...CAMEROON_REGIONS_LIST].sort((a, b) => a.coordinates[1] - b.coordinates[1]).map((r) => r.id);
const STEP = 0.07;

type State = 'off' | 'armed' | 'hidden' | 'done';

/**
 * Carte de présence (contrat §10, moment 5, lot 7 ; accueil et Notre impact) :
 * 1. quand la carte du Cameroun entre à l'écran (son haut à 75 %), les 10 régions apparaissent en cascade douce, de
 *    la côte vers le nord (opacité, 0,8 s chacune, power2.out, 0,07 s de décalage) ;
 * 2. puis l'arc « Depuis le Cameroun » de la mini-carte d'Europe se trace une fois (1,2 s, power3.inOut) : un masque
 *    circulaire centré sur le départ grandit (transform seulement) et découvre l'arc depuis le Cameroun. Sur téléphone,
 *    où la mini-carte est plus bas, l'arc se trace quand elle entre à son tour. Il change ensuite de pays d'un coup.
 * Les cartes arrivent après coup (chargées à l'approche) : leurs éléments sont masqués dès leur arrivée, seulement si
 * la carte est encore sous 85 % de l'écran ; déjà visible, elle reste telle quelle. Un élément de carte qui reçoit le
 * focus (région, pays) : tout s'affiche aussitôt. Mouvement réduit : rien (gsap.matchMedia). Ce qui est fait plus tard
 * (masquage à l'arrivée des cartes, cascade, arc) passe par le contexte de gsap.matchMedia (self.add) : le passage en
 * mouvement réduit ou le départ de la page l'annule, et tout redevient visible.
 * Repères : [data-map="cameroun"], [data-map="europe"] (PresenceSection), [data-cascade] (CameroonMap),
 * [data-arc-mask] (EuropeMiniMap).
 */
export default function MapMotion({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useGSAP(
    () => {
      const root = scope.current;
      const cameroon = root?.querySelector<HTMLElement>('[data-map="cameroun"]');
      const europe = root?.querySelector<HTMLElement>('[data-map="europe"]');
      if (!root || !cameroon || !europe) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, (self) => {
        const below = (el: HTMLElement) => el.getBoundingClientRect().top > window.innerHeight * 0.85;
        const state: Record<'regions' | 'arc', State> = {
          regions: below(cameroon) ? 'armed' : 'off',
          arc: below(europe) ? 'armed' : 'off',
        };
        if (state.regions === 'off' && state.arc === 'off') return;

        const regionEls = () => gsap.utils.toArray<SVGElement>('[data-cascade]', cameroon);
        const arcMask = () => europe.querySelector<SVGCircleElement>('[data-arc-mask]');

        // self.add('nom', fn) : fonctions appelées plus tard, dont les animations sont rattachées au contexte.
        // Masquer les éléments des cartes dès qu'ils arrivent dans la page (avant que la carte n'entre à l'écran)
        const prepare = self.add('prepare', () => {
          const regions = regionEls();
          if (state.regions === 'armed' && regions.length) {
            gsap.set(regions, { opacity: 0 });
            state.regions = 'hidden';
          }
          const mask = arcMask();
          if (state.arc === 'armed' && mask) {
            gsap.set(mask, { scale: 0, svgOrigin: `${mask.getAttribute('cx')} ${mask.getAttribute('cy')}` });
            state.arc = 'hidden';
          }
        }) as unknown as () => void;
        prepare();
        const observer = new MutationObserver(prepare);
        observer.observe(root, { childList: true, subtree: true });

        let regionsStart = -1;
        const playRegions = self.add('playRegions', () => {
          if (state.regions !== 'hidden') {
            state.regions = 'done';
            return;
          }
          state.regions = 'done';
          regionsStart = performance.now();
          const regions = regionEls();
          CASCADE_ORDER.forEach((id, i) => {
            const group = regions.filter((el) => el.getAttribute('data-cascade') === id);
            gsap.to(group, { opacity: 1, duration: 0.8, delay: 0.1 + i * STEP, ease: GSAP_EASE.soft });
          });
        }) as unknown as () => void;
        const playArc = self.add('playArc', () => {
          if (state.arc !== 'hidden') {
            state.arc = 'done';
            return;
          }
          state.arc = 'done';
          // « Puis » : l'arc attend la fin de la cascade si elle vient de commencer (carte côte à côte, ordinateur)
          const elapsed = regionsStart < 0 ? Infinity : (performance.now() - regionsStart) / 1000;
          gsap.to(arcMask(), { scale: 1, duration: DURATION.draw, ease: GSAP_EASE.draw, delay: Math.max(0.1, 0.9 - elapsed) });
        }) as unknown as () => void;
        ScrollTrigger.create({ trigger: cameroon, start: 'top 75%', once: true, onEnter: playRegions });
        ScrollTrigger.create({ trigger: europe, start: 'top 75%', once: true, onEnter: playArc });

        // Clavier : une région ou un pays atteint avant la fin, tout s'affiche
        const revealAll = self.add('revealAll', () => {
          const regions = regionEls();
          const mask = arcMask();
          gsap.killTweensOf(regions);
          gsap.set(regions, { opacity: 1 });
          if (mask) {
            gsap.killTweensOf(mask);
            gsap.set(mask, { scale: 1 });
          }
          state.regions = 'done';
          state.arc = 'done';
        }) as unknown as () => void;
        root.addEventListener('focusin', revealAll);
        return () => {
          observer.disconnect();
          root.removeEventListener('focusin', revealAll);
        };
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
