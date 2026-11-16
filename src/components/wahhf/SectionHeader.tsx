import { Ref } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { EASE_OUT, DURATION } from '../../lib/motionTokens';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
  /** false : pas d'apparition propre (la section anime déjà ce bloc, évite une double apparition). */
  reveal?: boolean;
  /** Titre qui peut recevoir le focus par script (changement d'étape d'un formulaire). */
  titleRef?: Ref<HTMLHeadingElement>;
}

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
  reveal = true,
  titleRef,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const animated = reveal && !shouldReduceMotion;

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 18 } : false}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: DURATION.reveal, ease: EASE_OUT }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {/* 1. Sur-titre en petites capitales espacées, couleur or */}
      <p
        className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mb-3 ${
          light ? 'text-or' : 'text-accent-or'
        }`}
      >
        {kicker}
      </p>

      {/* 2. Grand titre en serif élégante Fraunces, graisse NORMALE */}
      <h2
        ref={titleRef}
        tabIndex={titleRef ? -1 : undefined}
        className={`font-serif font-normal tracking-tight leading-[1.12] text-[clamp(1.85rem,3.6vw,3.1rem)] ${
          light
            ? 'text-creme'
            : 'text-text'
        }`}
      >
        {title}
      </h2>

      {/* 3. Petit filet en dégradé vert vers or, sous le titre */}
      <div
        aria-hidden="true"
        className={`h-[3px] w-20 rounded-pill bg-gradient-to-r from-nuit via-fougere to-or mt-5 mb-5 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />

      {/* 4. Sous-titre léger */}
      {subtitle && (
        <p
          className={`text-base sm:text-lg font-normal leading-relaxed ${
            light
              ? 'text-creme/80'
              : 'text-text-tertiary'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
