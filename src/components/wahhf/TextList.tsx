import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

/*
 * Liste typographique (contrat §8, T-15) : valeurs, principes, voies, domaines, FAQ, bloc d'impact.
 * Chaque élément : un titre en 600 à la taille du texte courant, une phrase dessous, un filet de séparation.
 * Ni cadre, ni fond, ni ombre, ni numéro, ni filigrane, ni icône dans un carré coloré.
 *
 *   <TextList columns={3}>
 *     <TextListItem title="Éducation" to="/nos-actions?domaine=education">Soutien scolaire…</TextListItem>
 *   </TextList>
 */
const COLUMNS = { 1: '', 2: 'md:grid-cols-2', 3: 'md:grid-cols-2 lg:grid-cols-3' } as const;

export function TextList({
  columns = 1,
  onInverse = false,
  as: Tag = 'ul',
  className,
  children,
}: {
  columns?: keyof typeof COLUMNS;
  /** Posée sur nuit (bandes vertes) : couleurs on-inverse. */
  onInverse?: boolean;
  as?: 'ul' | 'ol' | 'dl' | 'div';
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag data-on-inverse={onInverse || undefined} className={cn('group/list grid gap-x-10', COLUMNS[columns], className)}>
      {children}
    </Tag>
  );
}

type ItemProps = {
  title: ReactNode;
  /** Niveau du titre : h3 par défaut (sous le h2 de la section). */
  titleAs?: ElementType;
  /** Lien interne porté par le titre (la ligne n'est pas une carte). */
  to?: string;
  /** Méta sous le titre (montant, statut) : 15 px. */
  meta?: ReactNode;
  /** Boutons ou liens d'action sous la phrase. */
  actions?: ReactNode;
  /** Apparition au défilement (contrat §10, lot 7) : oui par défaut ; jamais dans un formulaire ni sur les pages
   *  sans mouvement (src/effects/motion/RevealBatch.tsx). */
  reveal?: boolean;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'li'>, 'title' | 'className' | 'children'>;

export function TextListItem({ title, titleAs: Title = 'h3', to, meta, actions, reveal = true, className, children, ...li }: ItemProps) {
  return (
    <li
      data-reveal={reveal || undefined}
      className={cn(
        'border-t py-5 sm:py-6 space-y-2 border-border-subtle group-data-[on-inverse]/list:border-border-subtle-on-inverse',
        className,
      )}
      {...li}
    >
      <Title className="text-body font-semibold text-text group-data-[on-inverse]/list:text-text-on-inverse">
        {to ? (
          <Link
            to={to}
            className="text-link underline underline-offset-4 decoration-1 hover:decoration-2 group-data-[on-inverse]/list:text-link-on-inverse"
          >
            {title}
          </Link>
        ) : (
          title
        )}
      </Title>
      {meta && <p className="text-meta text-text-secondary tabular-nums group-data-[on-inverse]/list:text-text-secondary-on-inverse">{meta}</p>}
      {children && (
        <div className="text-body text-text-secondary max-w-[65ch] space-y-2 group-data-[on-inverse]/list:text-text-secondary-on-inverse">
          {children}
        </div>
      )}
      {actions && <div className="pt-3 flex flex-wrap items-center gap-x-6 gap-y-3">{actions}</div>}
    </li>
  );
}

/** Lien texte d'action (dans une liste ou sous un bloc) : souligné, cible de 44 px. */
export const TEXT_LINK_CLASS =
  'inline-flex min-h-11 items-center text-body text-link underline underline-offset-4 decoration-1 hover:decoration-2';

/**
 * Colonne de lecture (contrat §5 et §8) : articles, pages légales, sections des guides.
 * 65 caractères au plus, alignée à gauche, sans fond ni cadre : un paragraphe n'est jamais une carte.
 */
export function ReadingColumn({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: 'div' | 'article' | 'section';
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        'max-w-[65ch] space-y-5 text-body text-text [&_h2]:text-section-title [&_h2]:text-text [&_h2:not(:first-child)]:mt-12 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:marker:text-text-secondary',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Lignes de liens (page introuvable, liens officiels) : filet entre les lignes, liens soulignés, 44 px de haut. */
export function LinkList({ onInverse = false, className, children }: { onInverse?: boolean; className?: string; children: ReactNode }) {
  return (
    <ul
      data-on-inverse={onInverse || undefined}
      className={cn(
        'group/links grid gap-x-10 sm:grid-cols-2 [&>li]:border-t [&>li]:border-border-subtle data-[on-inverse]:[&>li]:border-border-subtle-on-inverse',
        className,
      )}
    >
      {children}
    </ul>
  );
}

export const LINK_ROW_CLASS =
  'flex min-h-11 items-center justify-between gap-3 py-3 text-body text-link underline underline-offset-4 decoration-1 hover:decoration-2 group-data-[on-inverse]/links:text-link-on-inverse';
