import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface ChoiceTileProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  /** Classes visuelles de la tuile (elles changent selon `checked`). */
  className: string;
  children: ReactNode;
  /** Coche visible sur l'option choisie, pour ne pas reposer sur la seule couleur. */
  showCheck?: boolean;
}

/**
 * Choix exclusif accessible : un vrai <input type="radio">, masqué visuellement, dans un <label> qui porte la tuile.
 * Le lecteur d'écran annonce « case d'option, cochée, 2 sur 4 » ; les flèches changent de choix dans le groupe.
 * À placer dans un <fieldset> dont la <legend> nomme le groupe. L'anneau de focus clavier (--color-focus)
 * est dessiné sur la tuile quand le bouton radio a le focus.
 */
export default function ChoiceTile({ name, value, checked, onChange, className, children, showCheck = false }: ChoiceTileProps) {
  return (
    <label
      className={`relative cursor-pointer has-[:focus-visible]:[outline:2px_solid_var(--color-focus)] has-[:focus-visible]:[outline-offset:2px] ${className}`}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="sr-only" />
      {showCheck ? (
        <span className="flex items-start justify-between gap-2">
          <span>{children}</span>
          {checked && <Check aria-hidden="true" className="w-4 h-4 shrink-0 mt-0.5 stroke-[2.5]" />}
        </span>
      ) : (
        children
      )}
    </label>
  );
}
