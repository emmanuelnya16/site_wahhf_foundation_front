import { useEffect, type RefObject } from 'react';

/** Bureau à la souris, mouvement accepté : ailleurs, rien ne suit le pointeur. */
const QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/**
 * Parallaxe du hero : chaque élément [data-parallaxe="n"] de la zone se déplace de n px au plus (négatif : sens inverse)
 * en suivant la souris, en douceur. Seul transform est posé, sur des enveloppes que rien d'autre n'anime ; l'image
 * suivante n'est demandée que tant que quelque chose bouge. Coupée au bouton pause, en mouvement réduit et au tactile.
 */
export function useParallaxe(zoneRef: RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone || !enabled) return;
    const media = window.matchMedia(QUERY);
    const items = [...zone.querySelectorAll<HTMLElement>('[data-parallaxe]')].map((el) => ({ el, depth: Number(el.dataset.parallaxe) }));
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;

    const tick = () => {
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      for (const { el, depth } of items) {
        el.style.transform = `translate3d(${(current.x * depth).toFixed(2)}px, ${(current.y * depth).toFixed(2)}px, 0)`;
      }
      const moving = Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.002;
      frame = moving ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const box = zone.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, ((event.clientX - box.left) / box.width) * 2 - 1));
      target.y = Math.max(-1, Math.min(1, ((event.clientY - box.top) / box.height) * 2 - 1));
      wake();
    };
    const rest = () => {
      target.x = 0;
      target.y = 0;
      wake();
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      zone.removeEventListener('pointermove', onMove);
      zone.removeEventListener('pointerleave', rest);
      target.x = target.y = current.x = current.y = 0;
      for (const { el } of items) el.style.transform = '';
    };
    const apply = () => {
      stop();
      if (!media.matches) return;
      zone.addEventListener('pointermove', onMove, { passive: true });
      zone.addEventListener('pointerleave', rest);
    };

    apply();
    media.addEventListener('change', apply);
    return () => {
      media.removeEventListener('change', apply);
      stop();
    };
  }, [zoneRef, enabled]);
}
