import { ElementType, Fragment, useLayoutEffect, useRef, useState } from 'react';

/**
 * Titre révélé ligne par ligne derrière un masque (contrat §10, moment 1 : arrivée du hero, lot 7).
 *
 * En CSS, sans GSAP : l'arrivée joue dès le premier affichage, alors que GSAP n'est chargé qu'après. Chaque ligne
 * monte de 100 % à 0 en 1 s (power3.out), avec 0,12 s de décalage entre les lignes (.line-mask, .line-rise dans
 * src/index.css). Le découpage suit le vrai retour à la ligne à la largeur affichée :
 * 1. premier rendu : les mots dans des span, mesurés avant que l'écran ne soit peint (useLayoutEffect) ;
 * 2. deuxième rendu, toujours avant la peinture : une ligne par masque, animée en CSS ;
 * 3. fin de l'animation : retour au texte simple (le titre se recompose seul si la fenêtre change de taille).
 * Mouvement réduit, ou texte qui change (langue) : texte simple d'emblée. L'état final est celui du HTML : si
 * l'animation ne joue pas, le titre est lisible ; transform seulement, aucune opacité.
 */
type Phase = 'measure' | 'reveal' | 'done';

const canAnimate = () =>
  typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface LineRevealProps {
  text: string;
  as?: ElementType;
  id?: string;
  className?: string;
}

export default function LineReveal({ text, as: Tag = 'h1', id, className }: LineRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<{ phase: Phase; text: string; lines: string[] }>(() => ({
    phase: canAnimate() ? 'measure' : 'done',
    text,
    lines: [],
  }));
  const phase: Phase = state.text === text ? state.phase : 'done';

  useLayoutEffect(() => {
    if (phase !== 'measure' || !ref.current) return;
    const lines: string[][] = [];
    let top = Number.NEGATIVE_INFINITY;
    ref.current.querySelectorAll<HTMLElement>('[data-word]').forEach((word) => {
      if (Math.abs(word.offsetTop - top) > 2) {
        lines.push([]);
        top = word.offsetTop;
      }
      lines[lines.length - 1].push(word.textContent ?? '');
    });
    setState({ phase: 'reveal', text, lines: lines.map((l) => l.join(' ')) });
  }, [phase, text]);

  if (phase === 'measure') {
    // Espaces ordinaires seulement : une espace insécable reste dans son mot
    const words = text.split(' ');
    return (
      <Tag ref={ref} id={id} className={className}>
        {words.map((word, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            <span data-word="">{word}</span>
          </Fragment>
        ))}
      </Tag>
    );
  }

  if (phase === 'reveal') {
    const last = state.lines.length - 1;
    return (
      <Tag ref={ref} id={id} className={className}>
        {state.lines.map((line, i) => (
          <span key={i} className="line-mask">
            <span
              className="line-rise"
              onAnimationEnd={i === last ? () => setState((s) => ({ ...s, phase: 'done' })) : undefined}
            >
              {/* Espace finale : les lecteurs d'écran lisent « pour préparer », pas « pourpréparer » */}
              {i < last ? `${line} ` : line}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} id={id} className={className}>
      {text}
    </Tag>
  );
}
