import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/**
 * Enregistrement UNIQUE des plugins communs. Tous les effets importent gsap depuis ce module.
 * Les plugins plus rares (SplitText) sont importés et enregistrés seulement dans l'effet qui les utilise.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Points de rupture partagés par gsap.matchMedia() : épinglage et scrub lourds réservés à l'ordinateur.
export const MQ = {
  /** Ordinateur assez haut pour une section épinglée, à la souris, animations autorisées */
  desktopPin: '(min-width: 1024px) and (min-height: 760px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  /** Ordinateur à la souris, animations autorisées */
  desktop: '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  /** Animations autorisées (toutes tailles) */
  motionOk: '(prefers-reduced-motion: no-preference)',
};

// Les polices arrivent après le premier rendu : les positions de ScrollTrigger doivent être recalculées.
if (typeof document !== 'undefined' && document.fonts?.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

export { gsap, ScrollTrigger, useGSAP };
// Courbes et durées partagées avec Motion et le CSS
export { GSAP_EASE, DURATION } from './motionTokens';
