import type Lenis from 'lenis';

/**
 * Point d'entrée unique pour tout défilement programmé du site.
 * Si Lenis est actif (ordinateur, animations autorisées), on passe par lui ;
 * sinon (réduire les animations, avant le démarrage) on utilise le défilement natif, instantané.
 */

/** Hauteur réservée au header fixe (doit rester égale à --header-offset dans index.css). */
export const HEADER_OFFSET = 96;

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTop({ immediate = false }: { immediate?: boolean } = {}) {
  if (lenisInstance) {
    lenisInstance.resize();
    lenisInstance.scrollTo(0, { immediate, force: true });
    return;
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
}

export function scrollToElement(el: HTMLElement, { immediate = false }: { immediate?: boolean } = {}) {
  if (lenisInstance) {
    // Lenis retire déjà scroll-padding-top (= hauteur du header) : pas de décalage en plus.
    // resize() : la page vient peut-être d'être chargée, Lenis doit connaître sa nouvelle hauteur.
    lenisInstance.resize();
    lenisInstance.scrollTo(el, { immediate, force: true });
    return;
  }
  const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'instant' as ScrollBehavior });
}

/** Défile jusqu'à une position verticale précise (ex. étape d'une galerie épinglée). */
export function scrollToPosition(y: number, { immediate = false }: { immediate?: boolean } = {}) {
  if (lenisInstance) {
    lenisInstance.scrollTo(y, { immediate, force: true });
    return;
  }
  window.scrollTo({ top: y, left: 0, behavior: 'instant' as ScrollBehavior });
}

/**
 * Fait défiler jusqu'à l'élément #id. Les pages étant chargées à la demande, l'élément peut
 * apparaître quelques images plus tard : on le cherche pendant ~1,5 s au maximum.
 */
export function scrollToHash(hash: string, { immediate = true }: { immediate?: boolean } = {}) {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  if (!id) return () => {};
  let frame = 0;
  let tries = 0;
  const attempt = () => {
    const el = document.getElementById(id);
    if (el) {
      scrollToElement(el, { immediate });
      return;
    }
    if (tries++ < 90) frame = requestAnimationFrame(attempt);
  };
  attempt();
  return () => cancelAnimationFrame(frame);
}
