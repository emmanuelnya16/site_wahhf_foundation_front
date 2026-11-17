import { useEffect, useState } from 'react';

/**
 * « Après le premier affichage » (contrat §10, garde-fou de performance) : GSAP, ScrollTrigger et Lenis ne se
 * chargent qu'une fois la page affichée et ses ressources reçues (événement load, image du hero comprise), puis au
 * premier moment libre du navigateur. Ils ne concurrencent donc jamais l'élément LCP.
 * Plafond de 5 s après le début du chargement : sur un réseau très lent, les effets arrivent quand même, et le
 * contenu reste visible tant qu'ils ne sont pas là (l'état final de chaque effet est celui du HTML).
 */
let ready: Promise<void> | null = null;

export function afterFirstDisplay(): Promise<void> {
  if (ready) return ready;
  ready = new Promise<void>((resolve) => {
    if (typeof window === 'undefined') return;
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback;
      if (idle) idle(() => resolve(), { timeout: 1000 });
      else setTimeout(resolve, 150);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    setTimeout(finish, Math.max(0, 5000 - performance.now()));
  });
  return ready;
}

/** true une fois le premier affichage passé (voir afterFirstDisplay). */
export function useAfterFirstDisplay(): boolean {
  const [isReady, setReady] = useState(false);
  useEffect(() => {
    let active = true;
    afterFirstDisplay().then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);
  return isReady;
}

/**
 * Pont vers ScrollTrigger sans l'importer : le code chargé dès le départ (Layout, changement de langue) peut demander
 * un recalcul des positions ; rien ne se passe tant que GSAP n'est pas chargé.
 */
let refreshScroll: (() => void) | null = null;

export function registerScrollRefresh(fn: () => void) {
  refreshScroll = fn;
}

export function requestScrollRefresh() {
  refreshScroll?.();
}
