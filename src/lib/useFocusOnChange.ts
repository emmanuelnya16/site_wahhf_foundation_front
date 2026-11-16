import { RefObject, useEffect, useRef } from 'react';
import { scrollToElement } from './scroll';

/**
 * Quand `key` change (nouvelle étape, envoi, question suivante), le bouton qui avait le focus a souvent disparu :
 * on fait défiler jusqu'au bloc concerné (header fixe compris) et on place le focus sur son titre (tabIndex={-1}),
 * pour que le lecteur d'écran lise le nouveau contenu et que le clavier reparte de là.
 * Rien au premier rendu ; la comparaison avec la clé précédente évite aussi un déclenchement en mode strict.
 */
export function useFocusOnChange<T extends HTMLElement>(
  key: unknown,
  { scrollRef }: { scrollRef?: RefObject<HTMLElement | null> } = {}
) {
  const ref = useRef<T>(null);
  const previous = useRef(key);
  useEffect(() => {
    if (Object.is(previous.current, key)) return;
    previous.current = key;
    const target = ref.current;
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      target.focus({ preventScroll: true });
      scrollToElement(scrollRef?.current ?? target, { immediate: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [key, scrollRef]);
  return ref;
}
