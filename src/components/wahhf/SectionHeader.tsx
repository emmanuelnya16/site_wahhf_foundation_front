import { Ref } from 'react';
import { cn } from '../../lib/utils';

interface SectionHeaderProps {
  title: string;
  /** Introduction facultative, sous le titre (texte courant, 65 caractères par ligne au plus). */
  subtitle?: string;
  /**
   * Sur-titre facultatif (contrat §8, T-16) : seulement s'il porte une information (statut, source, état).
   * Affiché en casse de phrase, 15 px, encre douce ; jamais en capitales espacées.
   */
  kicker?: string;
  /** Posé sur une surface nuit (même en thème clair) : couleurs « on-inverse » (§3.4). */
  onInverse?: boolean;
  className?: string;
  /** Titre qui peut recevoir le focus par script (changement d'étape d'un formulaire). */
  titleRef?: Ref<HTMLHeadingElement>;
  /** id du titre (aria-labelledby de la section) */
  titleId?: string;
  /** Le titre apparaît au défilement (fondu et montée de 24 px). Accueil, sections 2 et 3 seulement (contrat §10). */
  revealTitle?: boolean;
}

/**
 * En-tête de section (contrat §8) : le titre (échelle section-title) et, au besoin, une introduction.
 * Aligné à gauche, sans filet. Pas d'apparition, sauf revealTitle (contrat §10, lot 7 : accueil, sections 2 et 3).
 */
export default function SectionHeader({ title, subtitle, kicker, onInverse = false, className = '', titleRef, titleId, revealTitle = false }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-[65ch]', className)}>
      {kicker && (
        <p className={cn('text-meta mb-2', onInverse ? 'text-text-secondary-on-inverse' : 'text-text-secondary')}>{kicker}</p>
      )}
      <h2
        ref={titleRef}
        id={titleId}
        tabIndex={titleRef ? -1 : undefined}
        data-reveal={revealTitle || undefined}
        className={cn('text-section-title', onInverse ? 'text-text-on-inverse' : 'text-text')}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('text-body mt-4', onInverse ? 'text-text-secondary-on-inverse' : 'text-text-secondary')}>{subtitle}</p>
      )}
    </div>
  );
}
