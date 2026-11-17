import { ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { stagger, useAnimate, useInView, useReducedMotion } from 'motion/react';
import { EASE_OUT, DURATION } from '../lib/motionTokens';

interface StaggerGroupProps {
  className?: string;
  children: ReactNode;
}

/**
 * Grille de cartes qui apparaissent décalées quand le groupe entre à l'écran
 * (Motion : useInView once, amount 0,3 ; décalage 0,1 s ; DURATION.reveal et EASE_OUT de src/lib/motionTokens.ts).
 * Les enfants directs sont animés : aucune modification des cartes elles-mêmes.
 * L'état masqué n'est posé qu'au montage, par JS, et jamais avec « réduire les animations » :
 * sans JS, le contenu reste visible. Opacité seule (les cartes restent atteignables au clavier),
 * et si une carte reçoit le focus avant d'être apparue, tout le groupe apparaît aussitôt.
 */
export default function StaggerGroup({ className = '', children }: StaggerGroupProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const [focused, setFocused] = useState(false);

  useLayoutEffect(() => {
    if (reduce || !scope.current) return;
    for (const child of Array.from(scope.current.children) as HTMLElement[]) {
      child.style.opacity = '0';
      child.style.transform = 'translateY(24px)';
    }
  }, [reduce, scope]);

  useEffect(() => {
    if (!scope.current || !(inView || focused)) return;
    const items = Array.from(scope.current.children) as HTMLElement[];
    if (reduce) {
      items.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
      });
      return;
    }
    if (focused && !inView) {
      // Arrivée au clavier : affichage immédiat, sans attendre l'animation
      animate(items, { opacity: 1, y: 0 }, { duration: 0 });
      return;
    }
    animate(items, { opacity: 1, y: 0 }, { duration: DURATION.reveal, ease: EASE_OUT, delay: stagger(0.1) });
  }, [inView, focused, reduce, animate, scope]);

  // Clavier : une carte encore (partiellement) masquée qui reçoit le focus termine l'apparition du groupe
  const onFocusCapture = () => {
    setFocused(true);
    if (!scope.current || reduce) return;
    const items = Array.from(scope.current.children) as HTMLElement[];
    if (items.some((el) => parseFloat(getComputedStyle(el).opacity) < 1)) {
      animate(items, { opacity: 1, y: 0 }, { duration: 0 });
    }
  };

  return (
    <div ref={scope} className={className} onFocusCapture={onFocusCapture}>
      {children}
    </div>
  );
}
