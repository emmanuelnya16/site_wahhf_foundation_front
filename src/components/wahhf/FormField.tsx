import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

/** Attributs à poser sur le champ : id relié au label, état invalide, description (aide + erreur). */
export interface FieldA11y {
  id: string;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
}

export const fieldErrorId = (id: string) => `${id}-erreur`;

/*
 * Field (contrat §8) : les styles partagés de tous les formulaires du site.
 * - libellé visible au-dessus du champ, en casse de phrase, 15 px en 600, encre ;
 * - champ : texte 17-18 px (16 px minimum, sinon iOS zoome), 48 px de haut, bordure 1 px border-input
 *   (trait : 3,4:1 au pire sur sauge ; trait-nuit : 4,0:1 sur sous-bois), rayon 12, fond surface-raised
 *   (papier, canopée en sombre) ; anneau de focus global (forêt, soleil en sombre) ; bordure brique si invalide ;
 * - case à cocher : 20 px, cochée à la couleur de l'action ; son texte en 15 px, encre.
 */
export const LABEL_CLASS = 'block text-meta font-semibold text-text mb-2';
export const FIELD_CLASS =
  'block w-full min-h-12 px-4 py-2.5 rounded-inner bg-surface-raised border border-border-input text-body text-text placeholder:text-text-secondary aria-invalid:border-danger';
export const CHECK_LABEL_CLASS = 'flex items-start gap-3 cursor-pointer text-meta text-text';
export const CHECKBOX_CLASS = 'mt-0.5 w-5 h-5 shrink-0';

/** Message d'erreur placé sous le champ, relié par aria-describedby. Rien n'est rendu sans message. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-1.5 text-meta font-semibold text-danger">
      <AlertCircle aria-hidden="true" className="w-4 h-4 shrink-0 mt-1" />
      <span>{message}</span>
    </p>
  );
}

/**
 * Champ de formulaire : label relié (htmlFor = id), champ fourni par l'appelant, message d'erreur sous le champ.
 * Le champ reçoit aria-invalid et aria-describedby quand une erreur est affichée.
 */
export default function FormField({
  id,
  label,
  error,
  labelClassName = LABEL_CLASS,
  className,
  children,
}: {
  id: string;
  label: ReactNode;
  error?: string;
  labelClassName?: string;
  className?: string;
  children: (a11y: FieldA11y) => ReactNode;
}) {
  const errorId = fieldErrorId(id);
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {children({
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': error ? errorId : undefined,
      })}
      <FieldError id={errorId} message={error} />
    </div>
  );
}
