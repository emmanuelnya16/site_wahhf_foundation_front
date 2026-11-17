import { motion, Variants } from 'motion/react';
import { EASE_OUT } from '../lib/motionTokens';

/** Conteneur : les lignes montent l'une après l'autre (décalage 0,12 s). */
export const maskedLinesContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};

/** Chaque ligne monte derrière son masque (1,1 s, courbe douce, sans rebond). */
export const maskedLine: Variants = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 1.1, ease: EASE_OUT } },
};

// Composants Motion créés une seule fois (jamais dans le rendu, sinon remontage à chaque mise à jour)
const TAGS = { h1: motion.h1, h2: motion.h2, p: motion.p } as const;

interface MaskedLinesProps {
  lines: string[];
  as?: keyof typeof TAGS;
  className?: string;
}

/**
 * Titre découpé en lignes, chacune dans un masque (overflow hidden) d'où elle monte.
 * Le texte reste un vrai titre lisible par les lecteurs d'écran (simples <span> en bloc).
 * À piloter par un parent Motion (initial="hidden" / animate="show").
 * « Réduire les animations » : MotionConfig supprime le déplacement, le titre est affiché directement.
 */
export default function MaskedLines({ lines, as = 'h1', className = '' }: MaskedLinesProps) {
  const MotionTag = TAGS[as];
  return (
    <MotionTag variants={maskedLinesContainer} className={className}>
      {lines.map((line, i) => (
        // pb/-mb : laisse la place aux jambages (g, p, ç) sous la ligne de base
        <span key={i} className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
          <motion.span className="block" variants={maskedLine}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

/** Coupe un titre en lignes sémantiques à la première virgule (« Autonomiser la jeunesse, / transformer… »). */
export function splitAtComma(text: string): string[] {
  const i = text.indexOf(', ');
  return i === -1 ? [text] : [text.slice(0, i + 1), text.slice(i + 2)];
}
