import type { MouseEvent as ReactMouseEvent } from 'react';
import type Lenis from 'lenis';

/**
 * Point d'entrée unique pour tout défilement programmé du site.
 * Si Lenis est actif (ordinateur, animations autorisées), on passe par lui ;
 * sinon (réduire les animations, avant le démarrage) on utilise le défilement natif, instantané.
 */

/**
 * Hauteur réservée au header fixe, lue dans --header-offset (src/index.css) : une seule source de vérité.
 * 96 px (6rem) si la variable est absente ou illisible.
 */
export function headerOffset(): number {
  if (typeof document === 'undefined') return 96;
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--header-offset').trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return 96;
  return raw.endsWith('rem') ? value * parseFloat(getComputedStyle(root).fontSize) : value;
}

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
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset();
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
 * Le focus suit le défilement vers une ancre (revue du groupe 7.4) : sans cela, la touche Tab suivante repartait du
 * lien activé, ou du haut de la page, loin de l'endroit où le lien avait mené. Le focus va au premier titre de la cible
 * (h1 à h3 ; la cible elle-même si c'est un titre), sinon à la cible, avec tabIndex -1 si elle n'est pas focalisable,
 * sans défilement de plus. Rien si le focus est déjà dans la cible (Nos actions le donne lui-même au titre du domaine).
 */
export function focusAnchorTarget(el: HTMLElement) {
  const current = document.activeElement;
  if (current && current !== document.body && el.contains(current)) return;
  const target = el.matches('h1, h2, h3') ? el : (el.querySelector<HTMLElement>('h1, h2, h3') ?? el);
  if (!target.hasAttribute('tabindex') && !target.matches('a[href], button, input, select, textarea, summary')) target.tabIndex = -1;
  target.focus({ preventScroll: true });
}

/**
 * Lien vers une ancre de la même page (bouton « Choisir un pays » de la page Accompagnement, groupe 7.4) : défilement
 * jusqu'à l'ancre (fluide avec Lenis, qui a déjà pris le clic), focus sur son titre, adresse en #id sans nouvelle entrée
 * d'historique. Sans lui, sur téléphone, un second appui sur le même lien ne faisait plus défiler (l'adresse ne changeait
 * plus, Layout ne voyait aucune navigation).
 *   <SecondaryButton to="#pays" onClick={(e) => followAnchorLink(e, 'pays')}>Choisir un pays</SecondaryButton>
 */
export function followAnchorLink(event: ReactMouseEvent<HTMLElement>, id: string) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(id);
  if (!target) return;
  if (!event.defaultPrevented) {
    event.preventDefault();
    scrollToElement(target);
  }
  focusAnchorTarget(target);
  const { pathname, search } = window.location;
  window.history.replaceState(window.history.state, '', `${pathname}${search}#${id}`);
}

/**
 * Fait défiler jusqu'à l'élément #id, puis lui donne le focus (focusAnchorTarget). Les pages étant chargées à la
 * demande, l'élément peut apparaître quelques images plus tard : on le cherche pendant ~1,5 s au maximum.
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
      // Focus à l'image suivante : après une navigation native vers l'ancre (lien <a href="#…"> sans Lenis, adresse
      // modifiée à la main), le navigateur retire le focus juste après l'événement popstate ; donné plus tôt, il serait
      // perdu (constaté sous Chrome, Académie #test-niveau sur téléphone).
      frame = requestAnimationFrame(() => focusAnchorTarget(el));
      return;
    }
    if (tries++ < 90) frame = requestAnimationFrame(attempt);
  };
  attempt();
  return () => cancelAnimationFrame(frame);
}
