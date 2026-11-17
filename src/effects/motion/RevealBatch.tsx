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
 * - Seuls les éléments encore sous cette ligne à l'arrivée de GSAP sont masqués : rien de ce qui est déjà à l'écran ne
 *   disparaît. Les pages et les blocs chargés plus tard sont pris au passage (MutationObserver).
 * - Un élément encore masqué qui reçoit le focus s'affiche aussitôt.
 * - Mouvement réduit : rien n'est masqué (gsap.matchMedia). Téléphone : apparitions gardées (légères).
 * Monté une fois dans Layout, sur <main> ; relancé à chaque page.
 */
export default function RevealBatch({ scope, pathname }: { scope: RefObject<HTMLElement | null>; pathname: string }) {
  useGSAP(
    () => {
      const main = scope.current;
      if (!main || EXCLUDED.some((re) => re.test(pathname))) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        const seen = new WeakSet<Element>();
        const hidden = new Set<Element>();

        const show = (els: Element[]) => {
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
        };

        const scan = () => {
          const line = window.innerHeight * 0.85;
          const fresh = gsap.utils.toArray<HTMLElement>('[data-reveal]', main).filter((el) => {
            if (seen.has(el)) return false;
            seen.add(el);
            if (el.closest('form, [data-no-reveal], [data-expand="on"]')) return false;
            if (!el.getClientRects().length) return false;
            return el.getBoundingClientRect().top > line;
          });
          if (!fresh.length) return;
          gsap.set(fresh, { opacity: 0, y: APPEAR_RISE });
          fresh.forEach((el) => hidden.add(el));
          ScrollTrigger.batch(fresh, { start: APPEAR_START, once: true, onEnter: (batch) => show(batch as Element[]) });
        };

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

        const onFocus = (event: FocusEvent) => {
          const el = (event.target as Element | null)?.closest?.('[data-reveal]');
          if (!el || !hidden.has(el)) return;
          hidden.delete(el);
          gsap.killTweensOf(el);
          gsap.set(el, { opacity: 1, y: 0, clearProps: 'opacity,transform' });
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
