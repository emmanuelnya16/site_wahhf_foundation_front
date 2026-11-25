import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '../../lib/reducedMotion';
import { cn } from '../../lib/utils';

/**
 * Bloc qui joue son entrée une seule fois, quand il arrive à l'écran (src/styles/accueil.css) :
 * - .ac-attend : encore sous l'écran, ses éléments attendent ;
 * - .ac-vue : il est arrivé, les animations CSS de ses éléments partent.
 * Rien n'est masqué pour un bloc déjà à l'écran à l'arrivée sur la page, ni en mouvement réduit : sans classe, tout est
 * en place.
 */
export default function Entree({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    el.classList.add('ac-attend');
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.replace('ac-attend', 'ac-vue');
        io.disconnect();
      },
      { rootMargin: '0px 0px -22% 0px' }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.classList.remove('ac-attend', 'ac-vue');
    };
  }, []);
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
