import { flushSync } from 'react-dom';
import { prefersReducedMotion } from '../lib/reducedMotion';

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

/**
 * Bascule clair/sombre en fondu enchaîné de toute la page (View Transitions API, 0,5 s, voir index.css).
 * Les 1 430 couleurs du site restent écrites en dur : le navigateur photographie l'ancien et le nouvel
 * état et les fond l'un dans l'autre. Aucun flash : le nouvel état est rendu avant l'affichage.
 * Repli SANS animation : navigateur sans View Transitions, ou « réduire les animations ».
 * Pendant la bascule, les transitions CSS de couleur sont coupées (classe .theme-switching),
 * sinon la photo du nouvel état serait prise à mi-transition.
 */
export function switchTheme(apply: () => void) {
  const doc = document as ViewTransitionDocument;
  const root = document.documentElement;
  root.classList.add('theme-switching');
  const done = () => root.classList.remove('theme-switching');

  if (!doc.startViewTransition || prefersReducedMotion()) {
    apply();
    requestAnimationFrame(() => requestAnimationFrame(done));
    return;
  }

  const transition = doc.startViewTransition(() => {
    // Le rendu React (icône soleil/lune) doit être terminé dans le rappel pour figurer sur la photo
    flushSync(apply);
  });
  transition.finished.finally(done);
}
