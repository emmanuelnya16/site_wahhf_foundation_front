import { RefObject, useEffect, useRef } from 'react';
import { lockScroll, unlockScroll } from './scrollLock';

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'video[controls]',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function focusables(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => el.getClientRects().length > 0 && !el.closest('[inert]')
  );
}

interface DialogOptions {
  /** Élément qui reçoit le focus à l'ouverture (sinon : le premier élément focalisable). */
  initialFocusRef?: RefObject<HTMLElement | null>;
  /** Fige la page dessous (par défaut : oui). */
  lockPageScroll?: boolean;
  /** Élément qui reprend le focus à la fermeture (ex. le bouton qui a ouvert la fenêtre). */
  returnFocusRef?: RefObject<HTMLElement | null>;
}

/**
 * Comportement commun des fenêtres superposées :
 * Échap ferme, Tab / Maj+Tab restent à l'intérieur, le focus revient à l'élément d'origine
 * à la fermeture, et la page est figée dessous.
 */
export function useDialog(
  open: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  { initialFocusRef, lockPageScroll = true, returnFocusRef }: DialogOptions = {}
) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    if (lockPageScroll) lockScroll();

    // Le contenu peut être monté par AnimatePresence dans la même image : on attend une image.
    const frame = requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) return;
      const target = initialFocusRef?.current ?? focusables(container)[0] ?? container;
      target.focus({ preventScroll: true });
    });

    const onKeyDown = (event: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;
      if (event.key === 'Escape') {
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables(container);
      if (items.length === 0) {
        event.preventDefault();
        container.focus({ preventScroll: true });
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || !container.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !container.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown, true);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKeyDown, true);
      if (lockPageScroll) unlockScroll();
      const target = returnFocusRef?.current ?? previous;
      if (target && target.isConnected && target !== document.body) target.focus({ preventScroll: true });
    };
  }, [open, containerRef, initialFocusRef, lockPageScroll, returnFocusRef]);
}
