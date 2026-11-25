import { useEffect, useRef, type CSSProperties, type ReactNode, type Ref } from 'react';
import { prefersReducedMotion } from '../../lib/reducedMotion';

interface EntreeProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'li';
}

/** Un bloc est « arrivé » quand il entre dans les 78 premiers % de la hauteur de l'écran */
const PART_VUE = 0.78;
/** Un seul observateur pour toute la page, et aucune mesure pendant le rendu (lot 11.3 : elles forçaient la mise en page) */
let observateur: IntersectionObserver | null = null;
const suivis = new WeakSet<Element>();

function surveiller() {
  return (observateur ??= new IntersectionObserver(
    (entries) => {
      for (const { target, isIntersecting, boundingClientRect: b, rootBounds } of entries) {
        if (!suivis.has(target)) {
          // Premier relevé : un bloc déjà à l'écran reste en place, un bloc plus bas (ou pas encore mis en page) attend
          suivis.add(target);
          const limite = rootBounds ? (rootBounds.height / PART_VUE) * 0.9 : 0;
          const plusBas = (!b.width && !b.height) || b.top >= limite;
          if (plusBas) target.classList.add('ac-attend');
          else observateur?.unobserve(target);
        } else if (isIntersecting) {
          target.classList.replace('ac-attend', 'ac-vue');
          observateur?.unobserve(target);
        }
      }
    },
    { rootMargin: `0px 0px -${Math.round((1 - PART_VUE) * 100)}% 0px` }
  ));
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
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) return;
    surveiller().observe(el);
    return () => {
      observateur?.unobserve(el);
      suivis.delete(el);
      el.classList.remove('ac-attend', 'ac-vue');
    };
  }, []);
  return (
    <Balise ref={ref as Ref<HTMLDivElement & HTMLLIElement>} className={className} style={style}>
      {children}
    </Balise>
  );
}
