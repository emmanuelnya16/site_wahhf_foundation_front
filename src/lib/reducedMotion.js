/**
 * « Réduire les animations » (prefers-reduced-motion).
 * Utilisé par chaque effet GSAP (retour immédiat si actif) et par Lenis (désactivé si actif).
 * Côté Motion, <MotionConfig reducedMotion="user"> s'en charge automatiquement.
 */

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/** @returns {boolean} true si l'utilisateur a demandé à réduire les animations. */
export function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Prévient quand le réglage change pendant la visite.
 * @param {(reduced: boolean) => void} callback
 * @returns {() => void} fonction de désabonnement
 */
export function onReducedMotionChange(callback) {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {};
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  const handler = (event) => callback(event.matches);
  query.addEventListener('change', handler);
  return () => query.removeEventListener('change', handler);
}
