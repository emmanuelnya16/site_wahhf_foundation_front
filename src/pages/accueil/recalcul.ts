import { gsap, ScrollTrigger } from '../../lib/gsap';

/**
 * Pendant un recalcul de ScrollTrigger (fenêtre ou page qui change de hauteur), les timelines repassent un instant par
 * zéro. Une scène qui joue des animations en passant un repère (panneau, photo) les rejouerait : elle ignore ce moment,
 * puis se remet à jour une fois le recalcul fini. Renvoie l'état et le nettoyage.
 */
export function suivreRecalculs(apres: () => void) {
  let enCours = false;
  const debut = () => {
    enCours = true;
  };
  const fin = () => {
    gsap.delayedCall(0.05, () => {
      enCours = false;
      apres();
    });
  };
  let actif = true;
  ScrollTrigger.addEventListener('refreshInit', debut);
  ScrollTrigger.addEventListener('refresh', fin);
  return {
    enCours: () => enCours || !actif,
    arreter: () => {
      actif = false;
      ScrollTrigger.removeEventListener('refreshInit', debut);
      ScrollTrigger.removeEventListener('refresh', fin);
    },
  };
}
