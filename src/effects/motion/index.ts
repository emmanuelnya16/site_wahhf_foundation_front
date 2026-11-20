/**
 * Effets GSAP du site (contrat §10, lot 7), réunis dans un seul fichier chargé après le premier affichage, avec GSAP
 * et ScrollTrigger (voir src/effects/DeferredMotion.tsx). Chacun est un composant sans rendu qui appelle useGSAP
 * avec le scope de ce qu'il anime.
 */
export { default as HeroMotion } from './HeroMotion';
export { default as FilScrub } from './FilScrub';
export { default as ScrollExpandMotion } from './ScrollExpandMotion';
export { default as MapMotion } from './MapMotion';
export { default as RevealBatch } from './RevealBatch';
export { default as PhotoReveal } from './PhotoReveal';
export { default as FilStepsScrub } from './FilStepsScrub';
// Lot 7.9 : frise du déroulé des pages Événements
export { default as EventsFrise } from './EventsFrise';
