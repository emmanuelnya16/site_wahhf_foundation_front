import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { registerScrollRefresh } from './afterFirstDisplay';

/**
 * Enregistrement UNIQUE des plugins communs. Tous les effets importent gsap depuis ce module.
 * Lot 7 (contrat §10) : ce module n'est jamais importé par le code chargé au départ. Il arrive avec les effets,
 * par import(), après le premier affichage (src/effects/DeferredMotion.tsx, src/lib/lenis.ts).
 * Les plugins plus rares (SplitText) sont importés et enregistrés seulement dans l'effet qui les utilise.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Points de rupture partagés par gsap.matchMedia().
export const MQ = {
  /** Ordinateur assez haut pour une section épinglée, à la souris, animations autorisées (avant le lot 7) */
  desktopPin: '(min-width: 1024px) and (min-height: 760px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  /** Ordinateur à la souris, animations autorisées (avant le lot 7) */
  desktop: '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  /** Animations autorisées (toutes tailles) */
  motionOk: '(prefers-reduced-motion: no-preference)',
  /** Lot 7 : ordinateur à souris, 1 024 px et plus (scrub, parallaxe) */
  computer: '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  /** Lot 7 : « Sur le terrain » épinglé : ordinateur à souris, 1 024 px de large et 700 px de haut au moins */
  expand: '(min-width: 1024px) and (min-height: 700px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  /** Lot 7 : mouvement réduit demandé */
  reduce: '(prefers-reduced-motion: reduce)',
};

/**
 * Positions recalculées quand la page change de hauteur sans redimensionnement de la fenêtre : polices arrivées après
 * le premier rendu, images, cartes et pages chargées à la demande. Un seul recalcul groupé (250 ms) par vague.
 */
let pending = 0;
function scheduleRefresh() {
  window.clearTimeout(pending);
  pending = window.setTimeout(() => ScrollTrigger.refresh(), 250);
}

if (typeof window !== 'undefined') {
  registerScrollRefresh(scheduleRefresh);
  document.fonts?.ready.then(scheduleRefresh);
  if (document.readyState !== 'complete') window.addEventListener('load', scheduleRefresh, { once: true });
  if (typeof ResizeObserver !== 'undefined') {
    let lastHeight = document.body.scrollHeight;
    new ResizeObserver(() => {
      const height = document.body.scrollHeight;
      if (Math.abs(height - lastHeight) < 2) return;
      lastHeight = height;
      scheduleRefresh();
    }).observe(document.body);
  }
}

export { gsap, ScrollTrigger, useGSAP };
// Courbes et durées partagées avec Motion et le CSS
export { GSAP_EASE, DURATION, APPEAR_RISE, APPEAR_START } from './motionTokens';
