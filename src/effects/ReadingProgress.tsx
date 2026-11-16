import { motion, useScroll } from 'motion/react';

/**
 * Barre de progression de lecture : filet de 3 px en haut de page, réservé aux articles (/actualites/:slug,
 * décision du 16/11 ; Layout décide où elle s'affiche). Couleur forêt (feuille en sombre), plus d'or.
 * Valeur liée au défilement (Motion useScroll), animée en scaleX uniquement, sans courbe ni durée.
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-reading-bar z-(--z-progress) origin-left pointer-events-none"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
