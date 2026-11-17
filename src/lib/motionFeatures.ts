// framer-motion : même paquet que motion/react, sans son fichier d'entrée (voir App.tsx).
import { domAnimation } from 'framer-motion';

/**
 * Moteur d'animation de Motion (animations, sorties, gestes), chargé par LazyMotion après le premier rendu
 * (App.tsx, contrat §10, lot 7). Sans glisser ni mise en page partagée : les composants qui en ont besoin
 * (visionneuse de la galerie, pages historiques) utilisent motion.div, qui embarque tout et vit dans leur fichier.
 */
export default domAnimation;
