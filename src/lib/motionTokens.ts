/**
 * Mouvement : courbes et durées partagées par Motion, GSAP et le CSS.
 * Les mêmes valeurs existent dans src/index.css (--ease-reveal, --ease-screen, --dur-fast, --dur-screen,
 * --dur-reveal) : une valeur changée ici doit l'être aussi là-bas.
 */

/** Apparitions et survols doux (CSS : --ease-reveal). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Rideau, menu, changement d'écran (CSS : --ease-screen). */
export const EASE_SCREEN = [0.76, 0, 0.24, 1] as const;

/** Équivalents GSAP, qui n'accepte pas de tableau de Bézier sans le plugin CustomEase. */
export const GSAP_EASE = {
  /** Apparition d'un bloc ou d'une ligne */
  reveal: 'power4.out',
  /** Suivi de la souris (bouton magnétique) */
  follow: 'power3.out',
  /** Animation liée au défilement : aucune courbe */
  scrub: 'none',
} as const;

/** Durées en secondes (CSS : --dur-fast, --dur-screen, --dur-reveal). */
export const DURATION = {
  /** Survols, retours visuels */
  fast: 0.3,
  /** Rideau, menu, fenêtre */
  screen: 0.7,
  /** Apparition d'un bloc */
  reveal: 0.9,
} as const;
