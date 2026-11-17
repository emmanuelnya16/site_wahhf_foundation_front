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
  /** Apparition d'un bloc ou d'une ligne (avant le lot 7 ; gardé pour le code de src/effects) */
  reveal: 'power4.out',
  /** Lot 7, contrat §10 : apparitions, fondus courts (CSS : --ease-power2-out) */
  soft: 'power2.out',
  /** Lot 7 : déplacements posés, titre du hero (CSS : --ease-power3-out) */
  glide: 'power3.out',
  /** Lot 7 : tracés qui démarrent et finissent doucement, fil et arc (CSS : --ease-power3-inout) */
  draw: 'power3.inOut',
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
  /** Lot 7 : apparition d'une ligne de liste, d'une carte, d'une photo (contrat §10) */
  appear: 0.7,
  /** Lot 7 : tracé d'un fil ou d'un arc */
  draw: 1.2,
} as const;

/** Lot 7 : montée des apparitions, en pixels (contrat §10) */
export const APPEAR_RISE = 24;
/** Lot 7 : seuil des apparitions : le haut de l'élément atteint 85 % de la hauteur de l'écran (ANIM-02) */
export const APPEAR_START = 'top 85%';
