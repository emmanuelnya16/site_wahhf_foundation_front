import { ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  /** Fond de la section : brume (page) ou sauge (section alternée) ; humus ou sous-bois en sombre. */
  tone?: 'brume' | 'sauge';
  className?: string;
  children?: ReactNode;
}

/**
 * Section de page (contrat §5 et §8) : les sections s'alternent par leur fond, sans filet ni voile translucide.
 * Respiration verticale --section-space : clamp(4rem, 9vw, 7.5rem). Le contenu se place dans un Container
 * (ou un élément portant `container-page`).
 */
export default function Section({ tone = 'brume', className, children, ...rest }: SectionProps) {
  return (
    <section className={cn('section-space', tone === 'sauge' ? 'bg-surface-section' : 'bg-surface', className)} {...rest}>
      {children}
    </section>
  );
}
