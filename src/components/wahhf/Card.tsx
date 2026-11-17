import { ElementType, ReactNode, ComponentPropsWithoutRef, ImgHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Info } from 'lucide-react';
import { cn } from '../../lib/utils';

/*
 * Carte de collection cliquable (contrat §8 et §9) : fiches pays, actualités, guides, albums.
 * Toute la carte est le lien. Un cran de fond par rapport à ce qui l'entoure (sauge sur brume, papier sur sauge,
 * canopée en sombre), rayon 20, sans bordure ni ombre ; elle se reconnaît à sa photo et à son titre.
 * Au survol, seule la couleur du titre change : ni zoom, ni soulèvement.
 *
 *   <CardLink to="…" surface="page">
 *     <CardMedia … />
 *     <CardBody>
 *       <CardMeta>rubrique, date</CardMeta>
 *       <CardTitle>…</CardTitle>
 *       <p className="text-body text-text-secondary">…</p>
 *     </CardBody>
 *   </CardLink>
 */
export function CardLink({
  to,
  surface = 'page',
  className,
  children,
  ...rest
}: {
  to: string;
  /** page : posée sur le fond de la page (brume) ; section : posée sur une section sauge. */
  surface?: 'page' | 'section';
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'to' | 'className' | 'children'>) {
  return (
    <Link
      to={to}
      // Apparition au défilement des collections (actualités, pays, guides, albums) : contrat §10, lot 7
      data-reveal=""
      className={cn(
        'group flex flex-col overflow-hidden rounded-card transition-colors duration-(--dur-fast)',
        surface === 'section' ? 'bg-surface-raised' : 'bg-surface-card',
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
}

/** Photo de la carte : ratio fixe, recadrée, sans voile, dégradé ni zoom. */
export function CardMedia({ className, ...img }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      loading="lazy"
      decoding="async"
      {...img}
      className={cn('block w-full aspect-[16/10] object-cover bg-surface-section', className)}
    />
  );
}

export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('flex flex-1 flex-col gap-2 p-6', className)}>{children}</div>;
}

/** Méta de la carte (rubrique, date, langues) : 15 px, encre douce ; ni pastille colorée ni icône or. */
export function CardMeta({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-meta text-text-secondary', className)}>{children}</p>;
}

/** Titre de la carte : 600 à la taille du texte courant ; seul élément qui change au survol (couleur du lien). */
export function CardTitle({
  as: Tag = 'h3',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        'text-body font-semibold text-text transition-colors duration-(--dur-fast) group-hover:text-link',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Petite note d'information dans une carte (ex. pays hors UE) : ciel pâle, icône « i », texte en 15 px. */
export function CardNote({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cn('flex items-start gap-2 rounded-inner bg-info-bg p-3 text-meta text-text', className)}>
      <Info aria-hidden="true" className="w-4 h-4 shrink-0 mt-1 text-info" />
      <span>{children}</span>
    </p>
  );
}
