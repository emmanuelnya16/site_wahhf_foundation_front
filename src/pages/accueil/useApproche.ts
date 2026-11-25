import { useEffect, useState, type RefObject } from 'react';

/**
 * Vrai quand une section approche de l'écran, ou qu'un lien vers elle (#id) est sous la souris ou au clavier : c'est le
 * moment de la mesurer (un fil, une route) et de charger son mouvement. Plus tôt, la mesurer forcerait la mise en page
 * de toute la page au chargement (contrat §16.4). `marge` : avance, en hauteurs d'écran (« 150% »).
 */
export function useApproche(ref: RefObject<HTMLElement | null>, marge: string) {
  const [proche, setProche] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || proche) return;
    if (typeof IntersectionObserver === 'undefined') {
      setProche(true);
      return;
    }
    const annonce = () => setProche(true);
    const liens = el.id ? document.querySelectorAll(`a[href$="#${el.id}"]`) : [];
    liens.forEach((lien) => {
      lien.addEventListener('pointerenter', annonce);
      lien.addEventListener('focus', annonce);
    });
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setProche(true);
        observer.disconnect();
      },
      { rootMargin: `${marge} 0px` }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      liens.forEach((lien) => {
        lien.removeEventListener('pointerenter', annonce);
        lien.removeEventListener('focus', annonce);
      });
    };
  }, [ref, proche, marge]);
  return proche;
}
