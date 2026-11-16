import { ReactNode, Ref, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import { useMagnetic } from '../../effects/useMagnetic';
import { cn } from '../../lib/utils';

interface ButtonBaseProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  /** Effet magnétique léger (ordinateur uniquement). Réservé aux appels « Faire un don » / « Candidater »
   *  du contenu, jamais dans le header fixe. */
  magnetic?: boolean;
}

/**
 * Variantes du bouton principal :
 * - forest : vert forêt (token action), survol plus clair (action-hover) ;
 * - gold : fond or et texte encre, pour les fonds verts. Pas de survol de couleur par défaut :
 *   un survol propre se passe par className (ex. « hover:bg-or-vif »).
 */
const PRIMARY_VARIANTS = {
  forest: 'bg-action hover:bg-action-hover text-on-action',
  gold: 'bg-or text-v1-encre',
} as const;

/** Tailles du bouton principal : la pilule et le rond fléché grandissent ensemble. md = taille historique. */
const PRIMARY_SIZES = {
  sm: { pill: 'gap-2.5 pl-5 pr-2 py-1.5 text-sm', ring: 'w-7 h-7', icon: 'w-3.5 h-3.5' },
  md: { pill: 'gap-3.5 pl-6 pr-2 py-2 text-sm sm:text-base', ring: 'w-9 h-9', icon: 'w-4 h-4' },
  lg: { pill: 'gap-4 pl-7 pr-2.5 py-2.5 text-base sm:text-lg', ring: 'w-11 h-11', icon: 'w-5 h-5' },
} as const;

/**
 * Bouton principal : forme pilule, porte à droite un segment circulaire contenant une flèche
 * qui pivote légèrement au survol (0,3 s, souris uniquement).
 */
export function PrimaryButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  ariaLabel,
  magnetic = false,
  variant = 'forest',
  size = 'md',
}: ButtonBaseProps & { variant?: keyof typeof PRIMARY_VARIANTS; size?: keyof typeof PRIMARY_SIZES }) {
  const ref = useRef<HTMLElement>(null);
  useMagnetic(ref, magnetic);
  const s = PRIMARY_SIZES[size];
  const baseClass = cn(
    'group inline-flex items-center justify-between rounded-pill font-medium transition-[color,background-color,border-color,box-shadow] duration-(--dur-fast) shadow-sm hover:shadow-md disabled:opacity-50 cursor-pointer',
    s.pill,
    PRIMARY_VARIANTS[variant],
    className
  );

  const inner = (
    <>
      <span>{children}</span>
      <span
        className={cn(
          'rounded-pill bg-or text-v1-encre flex items-center justify-center transition-transform duration-(--dur-fast) ease-reveal group-hover:rotate-45 shrink-0',
          s.ring
        )}
      >
        <ArrowUpRight className={cn(s.icon, 'stroke-[2.25]')} />
      </span>
    </>
  );

  if (to) {
    return (
      <Link ref={ref as Ref<HTMLAnchorElement>} to={to} className={baseClass} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref as Ref<HTMLAnchorElement>} href={href} className={baseClass} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={baseClass}
    >
      {inner}
    </button>
  );
}

/**
 * Bouton secondaire : forme pilule, contour fin. « light » : sur fond vert.
 */
export function SecondaryButton({
  children,
  to,
  href,
  onClick,
  type = 'button',
  className = '',
  light = false,
  ariaLabel,
  magnetic = false,
}: ButtonBaseProps & { light?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useMagnetic(ref, magnetic);
  const baseClass = cn(
    'inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-pill border transition-[color,background-color,border-color,box-shadow] duration-(--dur-fast) text-sm sm:text-base font-medium cursor-pointer',
    light
      ? 'border-creme/45 text-creme hover:bg-creme/12 hover:border-or'
      : 'border-nuit/35 dark:border-creme/30 text-nuit dark:text-creme hover:border-or hover:bg-nuit/5 dark:hover:bg-creme/10',
    className
  );

  if (to) {
    return (
      <Link ref={ref as Ref<HTMLAnchorElement>} to={to} className={baseClass} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a ref={ref as Ref<HTMLAnchorElement>} href={href} className={baseClass} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <button ref={ref as Ref<HTMLButtonElement>} type={type} onClick={onClick} aria-label={ariaLabel} className={baseClass}>
      {children}
    </button>
  );
}

/**
 * Bouton Don : rouge (token rouge) réservé exclusivement au bouton « Faire un don », forme pilule.
 */
export function DonateButton({
  children = 'Faire un don',
  to = '/faire-un-don',
  onClick,
  className = '',
  size = 'md',
  magnetic = false,
}: {
  children?: ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Effet magnétique léger (ordinateur uniquement) ; jamais dans le header fixe. */
  magnetic?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  useMagnetic(ref, magnetic);
  const sizeClasses =
    size === 'sm'
      ? 'px-4 py-2 text-xs sm:text-sm'
      : size === 'lg'
      ? 'px-7 py-3.5 text-base'
      : 'px-5 py-2.5 text-sm';

  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-pill bg-rouge hover:bg-rouge-fonce text-white font-semibold tracking-wide transition-[color,background-color,border-color,box-shadow] duration-(--dur-fast) shadow-sm hover:shadow-md cursor-pointer',
    sizeClasses,
    className
  );

  if (onClick) {
    return (
      <button ref={ref as Ref<HTMLButtonElement>} type="button" onClick={onClick} className={classes}>
        <Heart className="w-4 h-4 fill-current" />
        <span>{children}</span>
      </button>
    );
  }

  return (
    <Link ref={ref as Ref<HTMLAnchorElement>} to={to} className={classes}>
      <Heart className="w-4 h-4 fill-current" />
      <span>{children}</span>
    </Link>
  );
}
