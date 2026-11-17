import { RefObject, useEffect, useRef } from 'react';
import { scrollToElement } from './scroll';

/**
 * Quand `key` change (nouvelle étape, envoi, question suivante), le bouton qui avait le focus a souvent disparu :
 * on fait défiler jusqu'au bloc concerné (header fixe compris) et on place le focus sur son titre (tabIndex={-1}),
 * pour que le lecteur d'écran lise le nouveau contenu et que le clavier reparte de là.
 * Rien au premier rendu ; la comparaison avec la clé précédente évite aussi un déclenchement en mode strict.
 * `afterMs` (groupe 7.1) : le focus attend la fin de l'animation d'entrée du nouveau contenu (étape de Candidater,
 * question du test) ; aussitôt en mouvement réduit.
 */
export function useFocusOnChange<T extends HTMLElement>(
  key: unknown,
  { scrollRef, afterMs = 0 }: { scrollRef?: RefObject<HTMLElement | null>; afterMs?: number } = {}
) {
  const ref = useRef<T>(null);
  const previous = useRef(key);
  useEffect(() => {
    if (Object.is(previous.current, key)) return;
    previous.current = key;
    const target = ref.current;
    if (!target) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait = reduced ? 0 : afterMs;
    let timer = 0;
    const frame = requestAnimationFrame(() => {
      if (!wait) {
        target.focus({ preventScroll: true });
        scrollToElement(scrollRef?.current ?? target, { immediate: true });
        return;
      }
      scrollToElement(scrollRef?.current ?? target, { immediate: true });
      timer = window.setTimeout(() => target.focus({ preventScroll: true }), wait);
    });
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [key, scrollRef, afterMs]);
  return ref;
}
