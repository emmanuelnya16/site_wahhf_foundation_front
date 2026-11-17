/**
 * Effets GSAP du site (contrat §10, lot 7), réunis dans un seul fichier chargé après le premier affichage, avec GSAP
 * et ScrollTrigger (voir src/effects/DeferredMotion.tsx). Chacun est un composant sans rendu qui appelle useGSAP
 * avec le scope de ce qu'il anime.
 */
export { default as HeroMotion } from './HeroMotion';
export { default as FilScrub } from './FilScrub';
