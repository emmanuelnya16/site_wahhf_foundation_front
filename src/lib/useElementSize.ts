import { RefObject, useLayoutEffect, useState } from 'react';

export interface ElementSize {
  w: number;
  h: number;
}

/**
 * Taille en pixels (zone intérieure, sans bordure) d'un élément, mise à jour à chaque
 * redimensionnement (ResizeObserver). L'élément doit être présent au premier rendu.
 */
export function useElementSize(ref: RefObject<HTMLElement | null>): ElementSize | null {
  const [size, setSize] = useState<ElementSize | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = Math.round(el.clientWidth);
      const h = Math.round(el.clientHeight);
      setSize((prev) => (prev && prev.w === w && prev.h === h ? prev : { w, h }));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
