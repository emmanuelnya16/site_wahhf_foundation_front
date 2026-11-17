import { domAnimation } from 'framer-motion';

/**
 * Moteur d'animation de Motion (animations, sorties, gestes), chargé par LazyMotion après le premier affichage
 * (src/lib/motionEngine.ts). Sans glisser ni mise en page partagée : les composants qui en ont besoin (visionneuse
 * de la galerie, cartes, pages historiques) utilisent motion.div, qui embarque tout dans leur propre fichier.
 */
export default domAnimation;
