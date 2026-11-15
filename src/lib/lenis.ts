import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap, ScrollTrigger } from './gsap';
import { prefersReducedMotion, onReducedMotionChange } from './reducedMotion';
import { scrollToElement, setLenis } from './scroll';

/**
 * Défilement fluide Lenis, branché sur ScrollTrigger via le ticker GSAP.
 * - Désactivé si « réduire les animations » (et coupé/relancé si le réglage change en cours de visite).
 * - Tactile : défilement natif (syncTouch: false, valeur par défaut de Lenis).
 * - Ancres de la même page (#mission…) : Lenis les fait défiler en tenant compte du header fixe.
 */
function createLenis() {
  const lenis = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    // Ancres gérées ci-dessous (anchorClick) : le gestionnaire intégré de Lenis s'exécute après
    // la navigation du routeur et croirait qu'un lien vers une autre page vise la page courante.
    anchors: false,
  });

  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Ancres de la même page (#mission, #test-niveau…) : défilement fluide par Lenis, sans saut natif.
  // Écouté en phase de capture, donc AVANT le routeur : on compare bien à la page courante.
  const anchorClick = (event: MouseEvent) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
    const link = (event.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
    if (!link || link.target === '_blank') return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.hash.length < 2) return;
    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!target) return;
    event.preventDefault();
    scrollToElement(target);
  };
  document.addEventListener('click', anchorClick, true);

  setLenis(lenis);
  return () => {
    document.removeEventListener('click', anchorClick, true);
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis.destroy();
    setLenis(null);
  };
}

/** Démarre Lenis (sauf réduire les animations). Renvoie la fonction d'arrêt. */
export function startSmoothScroll() {
  let stop: (() => void) | null = prefersReducedMotion() ? null : createLenis();
  const unsubscribe = onReducedMotionChange((reduced) => {
    if (reduced && stop) {
      stop();
      stop = null;
    } else if (!reduced && !stop) {
      stop = createLenis();
    }
    ScrollTrigger.refresh();
  });
  return () => {
    unsubscribe();
    stop?.();
  };
}
