import { CSSProperties, RefObject, useEffect, useLayoutEffect, useState } from 'react';

/** arrive : joue à l'arrivée (après l'en-tête) ; play : joue maintenant (déclenchée plus bas, ou au focus). */
type SeqState = 'idle' | 'armed' | 'arrive' | 'play' | 'done';

const REDUCE = '(prefers-reduced-motion: reduce)';

/**
 * Apparition élément par élément d'une liste (groupe 7.4 : check-list « 5 signes d'arnaque »), sans GSAP : fondu seul,
 * 0,6 s, 0,08 s de décalage (CSS : [data-seq], .seq-play, --seq-i sur chaque élément), une seule fois.
 * - Liste déjà à l'écran à l'arrivée (son haut sous 85 % de la hauteur) : elle joue juste après l'en-tête (--seq-start).
 * - Liste plus bas : elle attend, masquée (data-seq="armed"), et joue quand son haut atteint 85 % de l'écran. C'est un
 *   déclenchement unique, jamais lié à la position du défilement (ni scrub, ni épinglage).
 * - Un élément qui reçoit le focus s'affiche aussitôt (CSS :focus-within) ; la liste entière joue aussitôt aussi.
 * - Mouvement réduit, ou navigateur sans IntersectionObserver : rien n'est masqué.
 * Rend les attributs à poser sur la liste : <ol {...seq}>.
 */
export function useSequentialFade(ref: RefObject<HTMLElement | null>, startDelay = 0.6) {
  const [state, setState] = useState<SeqState>('idle');

  // Avant la première peinture : décider si la liste joue tout de suite ou attend (pas de clignotement)
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia(REDUCE).matches || typeof IntersectionObserver === 'undefined') {
      setState('done');
      return;
    }
    // Position dans la page (la page s'affiche en haut : Layout la remonte juste après ce rendu) ; avec une ancre plus
    // bas, la liste attend et l'observateur la fait jouer dès qu'elle est à l'écran
    const top = el.getBoundingClientRect().top + window.scrollY;
    setState(!window.location.hash && top < window.innerHeight * 0.85 ? 'arrive' : 'armed');
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el || state !== 'armed') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState('play');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -15% 0px' }
    );
    observer.observe(el);
    const onFocus = () => setState('play');
    el.addEventListener('focusin', onFocus);
    // Passage en mouvement réduit pendant l'attente : tout s'affiche
    const mq = window.matchMedia(REDUCE);
    const onChange = () => mq.matches && setState('done');
    mq.addEventListener('change', onChange);
    return () => {
      observer.disconnect();
      el.removeEventListener('focusin', onFocus);
      mq.removeEventListener('change', onChange);
    };
  }, [ref, state]);

  const playing = state === 'arrive' || state === 'play';
  return {
    'data-seq': state === 'idle' ? undefined : state,
    className: playing ? 'seq-play' : undefined,
    // Joue à l'arrivée : après l'en-tête ; déclenchée plus bas : tout de suite
    style: { '--seq-start': `${state === 'arrive' ? startDelay : 0}s` } as CSSProperties,
  };
}
