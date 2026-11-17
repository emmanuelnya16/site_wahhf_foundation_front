import { RefObject } from 'react';
import { gsap, MQ, ScrollTrigger, useGSAP, GSAP_EASE, DURATION, APPEAR_RISE, APPEAR_START } from '../../lib/gsap';

/**
 * Pages sans apparition (contrat §10) : formulaires, pages légales, page Arnaques, pages historiques.
 * Ailleurs, un formulaire ou un bloc marqué data-no-reveal (test de niveau) n'a pas d'apparition non plus.
 */
const EXCLUDED = [
  /^\/candidater\/?$/,
  /^\/contact\/?$/,
  /^\/faire-un-don\/?$/,
  /^\/(mentions-legales|confidentialite|transparence)\/?$/,
  /^\/accompagnement\/eviter-les-arnaques\/?$/,
  /^\/(le-groupe|structure|poles|tarifs|methode|fondateurs|vkibusiness)\/?$/,
];

/**
 * Apparitions groupées (contrat §10, lot 7) : listes, cartes de collection (actualités, pays, guides), photos, et les
 * titres des sections 2 et 3 de l'accueil, tous marqués data-reveal (TextListItem, CardLink, GalleryGrid,
 * ScrollExpand, SectionHeader revealTitle).
 * - Fondu et montée de 24 px, 0,7 s, power2.out, une seule fois, groupés par ScrollTrigger.batch (0,08 s de décalage
 *   dans un même groupe).
 * - Déclenchement : le HAUT de chaque élément atteint 85 % de la hauteur de l'écran (ANIM-02), jamais une fraction de
 *   la surface d'un groupe.
 * - Seuls les éléments encore SOUS l'écran (hors de la vue) à l'arrivée de GSAP sont masqués : rien de ce qui est déjà
 *   visible, même dans le bas de l'écran, ne disparaît. Les pages et les blocs chargés plus tard sont pris au passage
 *   (MutationObserver).
 * - Un élément encore masqué qui reçoit le focus s'affiche aussitôt. À l'impression, tout est visible (index.css).
 * - Tout ce qui est créé plus tard (masquages, déclencheurs, fondus) passe par le contexte de gsap.matchMedia
 *   (self.add) : un changement de page ou le passage en mouvement réduit les annule et rend tout visible.
 * - Mouvement réduit : rien n'est masqué. Téléphone : apparitions gardées (légères).
 * Monté une fois dans Layout, sur <main> ; relancé à chaque page.
 */
export default function RevealBatch({ scope, pathname }: { scope: RefObject<HTMLElement | null>; pathname: string }) {
  useGSAP(
    () => {
      const main = scope.current;
      if (!main || EXCLUDED.some((re) => re.test(pathname))) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, (self) => {
        const seen = new WeakSet<Element>();
        const hidden = new Set<Element>();

        // self.add('nom', fn) : fonction appelée plus tard, dont les animations sont rattachées au contexte
        const show = self.add('show', (els: Element[]) => {
          els.forEach((el) => hidden.delete(el));
          gsap.to(els, {
            opacity: 1,
            y: 0,
            duration: DURATION.appear,
            ease: GSAP_EASE.soft,
            stagger: 0.08,
            overwrite: true,
            clearProps: 'opacity,transform',
          });
        }) as unknown as (els: Element[]) => void;

        const scan = self.add('scan', () => {
          const fresh = gsap.utils.toArray<HTMLElement>('[data-reveal]', main).filter((el) => {
            if (seen.has(el)) return false;
            seen.add(el);
            if (el.closest('form, [data-no-reveal], [data-expand="on"]')) return false;
            if (!el.getClientRects().length) return false;
            return el.getBoundingClientRect().top >= window.innerHeight;
          });
          if (!fresh.length) return;
          gsap.set(fresh, { opacity: 0, y: APPEAR_RISE });
          fresh.forEach((el) => hidden.add(el));
          ScrollTrigger.batch(fresh, { start: APPEAR_START, once: true, onEnter: (batch) => show(batch as Element[]) });
        }) as unknown as () => void;

        // Après le défilement en haut de la nouvelle page (Layout) : deux images plus tard
        let frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(scan);
        });
        let pending = 0;
        const observer = new MutationObserver(() => {
          window.clearTimeout(pending);
          pending = window.setTimeout(scan, 80);
        });
        observer.observe(main, { childList: true, subtree: true });

        const reveal = self.add('reveal', (el: Element) => {
          hidden.delete(el);
          gsap.killTweensOf(el);
          gsap.set(el, { opacity: 1, y: 0, clearProps: 'opacity,transform' });
        }) as unknown as (el: Element) => void;
        const onFocus = (event: FocusEvent) => {
          const el = (event.target as Element | null)?.closest?.('[data-reveal]');
          if (el && hidden.has(el)) reveal(el);
        };
        main.addEventListener('focusin', onFocus);

        return () => {
          cancelAnimationFrame(frame);
          window.clearTimeout(pending);
          observer.disconnect();
          main.removeEventListener('focusin', onFocus);
        };
      });
      return () => mm.revert();
    },
    { scope, dependencies: [pathname], revertOnUpdate: true }
  );
  return null;
}
