import { motion, useScroll } from 'motion/react';

/**
 * Barre de progression de lecture : filet doré de 3 px en haut de page.
 * Valeur liée au défilement (Motion useScroll), animée en scaleX uniquement, sans courbe ni durée.
 * Remplace l'ancienne barre GSAP de Layout (une seule barre).
 */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#E8A317] z-[100] origin-left pointer-events-none"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
