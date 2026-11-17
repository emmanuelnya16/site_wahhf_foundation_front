// framer-motion : le même paquet que motion/react (14.14), importé sans passer par le fichier d'entrée de motion/react,
// qui embarque toujours motion.div complet : le premier chargement n'a que m, AnimatePresence et LazyMotion (lot 7).
import { m, useScroll } from 'framer-motion';

/**
 * Barre de progression de lecture : filet de 3 px en haut de page, réservé aux articles (/actualites/:slug,
 * décision du 16/11 ; Layout décide où elle s'affiche). Couleur forêt (feuille en sombre), plus d'or.
 * Valeur liée au défilement (Motion useScroll), animée en scaleX uniquement, sans courbe ni durée.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <m.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-reading-bar z-(--z-progress) origin-left pointer-events-none"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
