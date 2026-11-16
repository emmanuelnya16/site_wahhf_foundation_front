import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Boutons du site (contrat de design §8).
 * - Forme pilule, texte en 700, cibles de 44 px au moins (48 px par défaut).
 * - Survol à la souris : changement de couleur seulement. Appui (:active) : même couleur que le survol,
 *   immédiate, visible au toucher. Aucun déplacement, aucune ombre (rien ne flotte).
 * - Aucune flèche, sauf ↗ sur un lien externe, avec « (nouvel onglet) » pour les lecteurs d'écran (T-20).
 * - onInverse : bouton posé sur une surface nuit (bandes, encarts verts, footer), même en thème clair.
 * - Pendant un traitement (disabled) : le bouton garde ses couleurs ; son libellé dit ce qui se passe.
 */

interface ButtonBaseProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  /** Posé sur une surface nuit (même en thème clair) : couleurs « on-inverse » du contrat (§3.4). */
  onInverse?: boolean;
  size?: ButtonSize;
}

type ButtonSize = 'sm' | 'md' | 'lg';

/** Hauteurs : 44 px (sm), 48 px (md), 56 px (lg). */
const SIZES: Record<ButtonSize, string> = {
  sm: 'min-h-11 px-4 gap-2 text-meta',
  md: 'min-h-12 px-6 gap-2.5 text-body',
  lg: 'min-h-14 px-7 gap-3 text-body',
};

const BASE =
  'inline-flex items-center justify-center rounded-pill font-bold leading-tight text-center cursor-pointer ' +
  'transition-colors duration-(--dur-fast) active:transition-none [-webkit-tap-highlight-color:transparent] ' +
  // Pendant un traitement : mêmes couleurs, aucune réaction au survol, à l'appui ni au clic
  'disabled:pointer-events-none';

const isExternal = (href?: string) => !!href && /^https?:\/\//.test(href);

/** Contenu commun : libellé, puis ↗ et « (nouvel onglet) » si le lien sort du site. */
function Label({ children, external }: { children: ReactNode; external: boolean }) {
  return (
    <>
      <span>{children}</span>
      {external && (
        <>
          <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
          <span className="sr-only"> (nouvel onglet)</span>
        </>
      )}
    </>
  );
}

/** Lien interne, lien (externe ou ancre) ou bouton, selon les props. */
function ButtonOrLink({ to, href, onClick, type = 'button', disabled, ariaLabel, className, children }: ButtonBaseProps & { className: string }) {
  const external = isExternal(href);
  if (to) {
    return (
      <Link to={to} className={className} aria-label={ariaLabel}>
        <Label external={false}>{children}</Label>
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={className}
        aria-label={ariaLabel}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <Label external={external}>{children}</Label>
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={className}>
      <Label external={false}>{children}</Label>
    </button>
  );
}

/**
 * Bouton principal : forêt, texte brume ; survol et appui nuit. En sombre : soleil, texte encre ;
 * survol et appui soleil pâle. Sur nuit (onInverse), même en clair : soleil, texte encre.
 */
export function PrimaryButton({ onInverse = false, size = 'md', className = '', ...props }: ButtonBaseProps) {
  const colors = onInverse
    ? 'bg-action-on-inverse text-on-action-on-inverse hover:bg-action-on-inverse-hover active:bg-action-on-inverse-hover'
    : 'bg-action text-on-action hover:bg-action-hover active:bg-action-hover';
  return <ButtonOrLink {...props} className={cn(BASE, SIZES[size], colors, className)} />;
}

/**
 * Bouton secondaire : contour 1,5 px forêt, texte forêt, fond transparent ; survol et appui : fond forêt,
 * texte brume. En sombre, et sur nuit même en clair : contour et texte soleil ; survol et appui : fond soleil,
 * texte encre.
 */
export function SecondaryButton({ onInverse = false, size = 'md', className = '', ...props }: ButtonBaseProps) {
  const colors = onInverse
    ? 'border-action-on-inverse text-action-on-inverse hover:bg-action-on-inverse hover:text-on-action-on-inverse active:bg-action-on-inverse active:text-on-action-on-inverse'
    : 'border-action text-link hover:bg-action hover:text-on-action active:bg-action active:text-on-action';
  return <ButtonOrLink {...props} className={cn(BASE, SIZES[size], 'border-[1.5px] bg-transparent', colors, className)} />;
}

/**
 * Bouton de don : cœur, libellé blanc et icône cœur ; survol et appui : cœur foncé.
 * Réservé au don. Sur nuit et en thème sombre, liseré brume à 60 % (contrat §3.5, décision du 16/11).
 * Le cœur plein est réservé à la page Don et à la porte « Faire un don » du hero (décision du 16/11) :
 * ailleurs (en-tête, menu mobile), variante « outline » : contour 1,5 px et icône couleur donate-outline
 * (cœur sur clair ; corail en sombre et sur nuit, où le cœur n'atteint que 3,0:1 et 2,1:1), libellé
 * couleur du texte ; survol et appui : fond cœur, libellé blanc.
 */
export function DonateButton({
  children = 'Faire un don',
  to = '/faire-un-don',
  onClick,
  type,
  className = '',
  size = 'md',
  variant = 'solid',
  onInverse = false,
}: {
  children?: ReactNode;
  to?: string;
  onClick?: () => void;
  /** « submit » : bouton d'envoi du formulaire de don (sinon, lien vers /faire-un-don). */
  type?: 'button' | 'submit';
  className?: string;
  size?: ButtonSize;
  /** « outline » : contour cœur (en-tête, menu mobile) ; « solid » : cœur plein (page Don, porte du hero). */
  variant?: 'solid' | 'outline';
  /** Variante « outline » posée sur nuit : libellé brume (le contour prend déjà corail via surface-green). */
  onInverse?: boolean;
}) {
  const classes = cn(
    BASE,
    SIZES[size],
    variant === 'solid'
      ? // donate-button : liseré brume à 60 % quand le bouton est posé sur nuit ou en thème sombre (index.css)
        'donate-button bg-donate text-on-donate hover:bg-donate-hover active:bg-donate-hover'
      : cn(
          'group border-[1.5px] border-donate-outline bg-transparent hover:bg-donate hover:text-on-donate active:bg-donate active:text-on-donate',
          onInverse ? 'text-text-on-inverse' : 'text-text'
        ),
    className
  );
  const inner = (
    <>
      <Heart
        aria-hidden="true"
        className={cn(
          'w-4 h-4 fill-current shrink-0',
          variant === 'outline' && 'text-donate-outline group-hover:text-on-donate group-active:text-on-donate'
        )}
      />
      <span>{children}</span>
    </>
  );

  if (onClick || type) {
    return (
      <button type={type ?? 'button'} onClick={onClick} className={classes}>
        {inner}
      </button>
    );
  }

  return (
    <Link to={to} className={classes}>
      {inner}
    </Link>
  );
}
