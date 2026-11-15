import { motion, useReducedMotion } from 'motion/react';

interface SectionHeaderProps {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
  /** false : pas d'apparition propre (la section anime déjà ce bloc, évite une double apparition). */
  reveal?: boolean;
}

export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = 'left',
  light = false,
  className = '',
  reveal = true,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion();
  const animated = reveal && !shouldReduceMotion;

  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 18 } : false}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      {/* 1. Sur-titre en petites capitales espacées, couleur or */}
      <p
        className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] mb-3 ${
          light ? 'text-[#E8A317]' : 'text-gold-text dark:text-[#E8A317]'
        }`}
      >
        {kicker}
      </p>

      {/* 2. Grand titre en serif élégante Fraunces, graisse NORMALE */}
      <h2
        className={`font-serif font-normal tracking-tight leading-[1.12] text-[clamp(1.85rem,3.6vw,3.1rem)] ${
          light
            ? 'text-[#F5F1E8]'
            : 'text-[#1B1B18] dark:text-[#F5F1E8]'
        }`}
      >
        {title}
      </h2>

      {/* 3. Petit filet en dégradé vert vers or, sous le titre */}
      <div
        aria-hidden="true"
        className={`h-[3px] w-20 rounded-full bg-gradient-to-r from-[#0F3D2E] via-[#1b634b] to-[#E8A317] mt-5 mb-5 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />

      {/* 4. Sous-titre léger */}
      {subtitle && (
        <p
          className={`text-base sm:text-lg font-normal leading-relaxed ${
            light
              ? 'text-[#F5F1E8]/80'
              : 'text-[#1B1B18]/75 dark:text-[#F5F1E8]/75'
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
