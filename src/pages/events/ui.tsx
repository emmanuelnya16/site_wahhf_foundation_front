import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  Handshake,
  HeartPulse,
  Languages,
  ListChecks,
  MessagesSquare,
  Presentation,
  ShieldCheck,
  Sprout,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { EventIcon } from '../../data/events';
import { cn } from '../../lib/utils';

/** Icônes des cartes (src/data/events.ts) */
export const ICONS: Record<EventIcon, LucideIcon> = {
  ecoute: ShieldCheck,
  parcours: ListChecks,
  partenaires: Handshake,
  temoignages: MessagesSquare,
  presentation: Presentation,
  echange: MessagesSquare,
  atelier: Wrench,
  rencontre: Users,
  education: GraduationCap,
  sante: HeartPulse,
  langues: Languages,
  communaute: Sprout,
};

export const pad2 = (n: number) => String(n).padStart(2, '0');

/** Surtitre : trait de 32 px + capitales espacées (rouge de la référence → forêt ; soleil sur fond sombre) */
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="ev-eyebrow">{children}</p>;
}

/** En-tête de section : surtitre, h2, phrase ; centré pour le déroulé et les activités, comme la référence */
export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string | null;
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={cn('ev-head', center && 'ev-head-center')} data-reveal="ev">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="ev-h2">
        {title}
      </h2>
      {lead && <p className="ev-lead">{lead}</p>}
    </div>
  );
}

type Variant = 'soleil' | 'nuit' | 'contour';

/** Bouton pilule de 48 px : lien interne, ancre (#…) ou adresse externe ; flèche qui glisse au survol (étape 3) */
export function EvButton({
  to,
  variant,
  children,
  arrow = false,
  className,
}: {
  to: string;
  variant: Variant;
  children: ReactNode;
  arrow?: boolean;
  className?: string;
}) {
  const cls = cn('ev-btn', `ev-btn-${variant}`, className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight aria-hidden="true" className="ev-btn-fleche" />}
    </>
  );
  if (to.startsWith('#')) {
    return (
      <a href={to} className={cls}>
        {content}
      </a>
    );
  }
  if (/^https?:/.test(to)) {
    return (
      <a href={to} className={cls} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {content}
    </Link>
  );
}

/** Drapeau du Cameroun (vert, rouge, jaune, étoile jaune) ; son nom est donné par le texte à côté ou par label */
export function CameroonFlag({ label }: { label?: string }) {
  return (
    <svg viewBox="0 0 30 20" className="ev-drapeau" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <rect width="10" height="20" fill="var(--ev-drapeau-vert)" />
      <rect x="10" width="10" height="20" fill="var(--ev-drapeau-rouge)" />
      <rect x="20" width="10" height="20" fill="var(--ev-drapeau-jaune)" />
      <path
        d="M15 6.6l.95 2.9h3.05l-2.47 1.8.94 2.9L15 12.4l-2.47 1.8.94-2.9-2.47-1.8h3.05z"
        fill="var(--ev-drapeau-jaune)"
      />
    </svg>
  );
}
