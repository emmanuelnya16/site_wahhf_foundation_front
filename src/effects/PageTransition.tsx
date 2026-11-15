import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScrollTrigger } from '../lib/gsap';
import { scrollToHash, scrollToTop } from '../lib/scroll';

/**
 * Clé de transition d'une route. Les URL servies par un même composant avec un paramètre différent
 * (niveau d'allemand, fiche pays, article) partagent une clé : pas de fondu, l'état de la page est conservé.
 */
export function routeKey(pathname: string): string {
  if (pathname.startsWith('/academie/') || pathname === '/mobilite-langues/academie') return 'academie';
  if (pathname.startsWith('/accompagnement/') || pathname === '/mobilite-langues/accompagnement') return 'accompagnement';
  if (pathname.startsWith('/actualites')) return 'actualites';
  return pathname;
}

/** Après la sortie de l'ancienne page : haut de page, ou ancre demandée. */
function restoreScroll() {
  const { hash } = window.location;
  if (hash) scrollToHash(hash);
  else scrollToTop({ immediate: true });
}

/**
 * Fondu léger entre les pages (opacité seulement : un transform sur ce conteneur casserait
 * l'épinglage ScrollTrigger et les éléments position: fixed des pages).
 * Sortie 0,25 s, entrée 0,4 s. Avec « réduire les animations », le fondu reste (pas de déplacement).
 */
export default function PageTransition({ transitionKey, children }: { transitionKey: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={restoreScroll}>
      <motion.div
        key={transitionKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] } }}
        onAnimationComplete={() => ScrollTrigger.refresh()}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
