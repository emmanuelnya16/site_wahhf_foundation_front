import { RefObject } from 'react';
import { gsap, MQ, useGSAP } from '../../lib/gsap';

/** Opacité d'un niveau que le trait n'a pas encore atteint */
const DIM = 0.35;

/**
 * Le fil A1 → C1 se dessine au fil du défilement (contrat §10 : accueil, section Mobilité & Langues ; Académie).
 * Ordinateur à souris seulement : chaque segment du trait s'allonge (scaleX), et chaque niveau (point et libellé)
 * s'allume quand le trait l'atteint. Lié au défilement : sans courbe, lissage de 0,5 s, du moment où le haut du fil
 * atteint 85 % de l'écran jusqu'à 40 %. Transform et opacité seulement.
 * - Fil déjà à l'écran quand GSAP arrive : rien n'est masqué, il reste tracé.
 * - Un libellé (lien) qui reçoit le focus avant la fin : le fil est tracé et tous les niveaux allumés aussitôt.
 * - Téléphone, tactile, mouvement réduit : fil tracé, niveaux allumés (état du HTML).
 * Lit les repères posés par Fil.tsx : [data-fil="horizontal"], [data-fil-seg], [data-fil-dot], [data-fil-label].
 * `dim` (revue du groupe 7.3) : ce qui s'atténue avant d'être atteint. Par défaut le point et le libellé (niveaux A1 à
 * C1, libellés courts) ; '[data-fil-dot]' pour une frise dont les libellés sont des paragraphes (Qui sommes-nous) : le
 * texte reste toujours à pleine opacité, lisible (contraste AA), seul le point s'allume.
 */
export default function FilScrub({
  scope,
  dim = '[data-fil-dot], [data-fil-label]',
}: {
  scope: RefObject<HTMLElement | null>;
  dim?: string;
}) {
  useGSAP(
    () => {
      const fil = scope.current?.querySelector<HTMLElement>('[data-fil="horizontal"]');
      if (!fil) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.computer, () => {
        if (fil.getBoundingClientRect().top < window.innerHeight * 0.85) return;
        const steps = gsap.utils.toArray<HTMLElement>(fil.children);
        const segs = gsap.utils.toArray<HTMLElement>('[data-fil-seg]', fil);
        const parts = (li: HTMLElement) => li.querySelectorAll(dim);

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: fil, start: 'top 85%', end: 'top 40%', scrub: 0.5, invalidateOnRefresh: true },
        });
        segs.forEach((seg, i) => {
          // Depuis le niveau précédent (à gauche), comme un trait qu'on tire
          tl.fromTo(seg, { scaleX: 0, transformOrigin: 'left center' }, { scaleX: 1, duration: 1 }, i);
          const next = steps[i + 1];
          if (next) tl.fromTo(parts(next), { opacity: DIM }, { opacity: 1, duration: 0.15 }, i + 0.9);
        });

        // Clavier : un niveau atteint au Tab avant le trait, tout s'affiche
        const reveal = () => {
          if (tl.progress() >= 1) return;
          tl.scrollTrigger?.kill();
          tl.progress(1);
        };
        fil.addEventListener('focusin', reveal);
        return () => fil.removeEventListener('focusin', reveal);
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
