import { ReactNode, Ref, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import { useMagnetic } from '../../effects/useMagnetic';

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
}: ButtonBaseProps) {
  const ref = useRef<HTMLElement>(null);
  useMagnetic(ref, magnetic);
  const baseClass = `group inline-flex items-center justify-between gap-3.5 pl-6 pr-2 py-2 rounded-full bg-[#0F3D2E] hover:bg-[#14523E] text-[#F5F1E8] font-medium text-sm sm:text-base transition-[color,background-color,border-color,box-shadow] duration-300 shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317] disabled:opacity-50 cursor-pointer ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      <span className="w-9 h-9 rounded-full bg-[#E8A317] text-[#1B1B18] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 shrink-0">
        <ArrowUpRight className="w-4 h-4 stroke-[2.25]" />
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
 * Bouton secondaire : forme pilule, contour fin.
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
  const baseClass = `inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full border transition-[color,background-color,border-color,box-shadow] duration-300 text-sm sm:text-base font-medium cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317] ${
    light
      ? 'border-[#F5F1E8]/45 text-[#F5F1E8] hover:bg-[#F5F1E8]/12 hover:border-[#E8A317]'
      : 'border-[#0F3D2E]/35 dark:border-[#F5F1E8]/30 text-[#0F3D2E] dark:text-[#F5F1E8] hover:border-[#E8A317] hover:bg-[#0F3D2E]/5 dark:hover:bg-[#F5F1E8]/10'
  } ${className}`;

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
 * Bouton Don : Rouge #C8102E réservé exclusivement au bouton « Faire un don », forme pilule.
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

  const classes = `inline-flex items-center justify-center gap-2 rounded-full bg-[#C8102E] hover:bg-[#a80d26] text-white font-semibold tracking-wide transition-[color,background-color,border-color,box-shadow] duration-300 shadow-sm hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317] cursor-pointer ${sizeClasses} ${className}`;

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
