import { ReactNode } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChoiceTileProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  /** Forme et typographie de la tuile (padding, rayon, taille du texte). Les couleurs viennent de la tuile elle-même. */
  className?: string;
  children: ReactNode;
  /** Coche à droite du libellé (tuiles alignées à gauche). Sans elle, la coche se place devant le libellé. */
  showCheck?: boolean;
  /** Tuile posée sur nuit (bandes vertes), même en thème clair. */
  onInverse?: boolean;
  /** Pour placer le focus sur le groupe en cas d'erreur (premier bouton du groupe). */
  id?: string;
  /** Erreur du groupe : état invalide et message relié. */
  invalid?: boolean;
  describedBy?: string;
}

/**
 * Un seul style d'option pour tout le site (contrat §11) :
 * - non choisie : fond des champs (surface-raised), contour 1 px border-input (3,4:1 au pire sur sauge ; 4,0:1 sur
 *   sous-bois, le panneau de formulaire en sombre) ; sur nuit, brume à 60 % ;
 * - choisie : contour 2 px de la couleur de l'action (forêt en clair, soleil en sombre et sur nuit) et coche visible
 *   (à droite avec showCheck, sinon devant le libellé). Le second pixel est un liseré intérieur : la tuile ne change
 *   pas de taille.
 */
const STYLES = {
  surface: {
    base: 'bg-surface-raised text-body text-text',
    off: 'border-border-input hover:border-action',
    on: 'border-action [box-shadow:inset_0_0_0_1px_var(--action)]',
    check: 'text-action',
  },
  inverse: {
    base: 'bg-transparent text-body text-text-on-inverse',
    off: 'border-border-on-inverse hover:border-action-on-inverse',
    on: 'border-action-on-inverse [box-shadow:inset_0_0_0_1px_var(--action-on-inverse)]',
    check: 'text-action-on-inverse',
  },
};

/**
 * Choix exclusif accessible : un vrai <input type="radio">, masqué visuellement, dans un <label> qui porte la tuile.
 * Le lecteur d'écran annonce « case d'option, cochée, 2 sur 4 » ; les flèches changent de choix dans le groupe.
 * À placer dans un <fieldset> dont la <legend> nomme le groupe. L'anneau de focus clavier (--color-focus)
 * est dessiné sur la tuile quand le bouton radio a le focus.
 */
export default function ChoiceTile({
  name,
  value,
  checked,
  onChange,
  className,
  children,
  showCheck = false,
  onInverse = false,
  id,
  invalid,
  describedBy,
}: ChoiceTileProps) {
  const s = onInverse ? STYLES.inverse : STYLES.surface;
  return (
    <label
      className={cn(
        'relative cursor-pointer rounded-inner border transition-colors duration-(--dur-fast) has-[:focus-visible]:[outline:2px_solid_var(--focus)] has-[:focus-visible]:[outline-offset:2px]',
        s.base,
        checked ? s.on : s.off,
        className,
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        className="sr-only"
      />
      {showCheck ? (
        <span className="flex items-start justify-between gap-2">
          <span>{children}</span>
          {checked && <Check aria-hidden="true" className={cn('w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]', s.check)} />}
        </span>
      ) : (
        // Tuiles à libellé centré (montants, fréquence) : la coche apparaît devant le libellé de l'option choisie
        // (sans place réservée, qui ferait passer « 100 € » sur deux lignes dans les tuiles étroites).
        <span className="inline-flex items-center justify-center gap-1.5">
          {checked && <Check aria-hidden="true" className={cn('w-4 h-4 shrink-0 stroke-[2.5]', s.check)} />}
          <span>{children}</span>
        </span>
      )}
    </label>
  );
}
