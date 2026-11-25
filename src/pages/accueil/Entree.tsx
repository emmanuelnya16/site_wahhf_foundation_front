import { useLayoutEffect, useRef, type CSSProperties, type ReactNode, type Ref } from 'react';
import { prefersReducedMotion } from '../../lib/reducedMotion';

interface EntreeProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'li';
}

/**
 * Bloc qui joue son entrée une seule fois, quand il arrive à l'écran (src/styles/accueil.css) :
 * - .ac-attend : encore sous l'écran, ses éléments attendent ;
 * - .ac-vue : il est arrivé, les animations CSS de ses éléments partent.
 * Rien n'est masqué pour un bloc déjà à l'écran à l'arrivée sur la page, ni en mouvement réduit : sans classe, tout est
 * en place.
 */
export default function Entree({ children, className, style, as: Balise = 'div' }: EntreeProps) {
  const ref = useRef<HTMLElement>(null);
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
    <Balise ref={ref as Ref<HTMLDivElement & HTMLLIElement>} className={className} style={style}>
      {children}
    </Balise>
  );
}
