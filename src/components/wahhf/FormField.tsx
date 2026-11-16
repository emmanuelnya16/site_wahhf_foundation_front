import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

/** Attributs à poser sur le champ : id relié au label, état invalide, description (aide + erreur). */
export interface FieldA11y {
  id: string;
  'aria-invalid'?: true;
  'aria-describedby'?: string;
}

export const fieldErrorId = (id: string) => `${id}-erreur`;

/** Message d'erreur placé sous le champ, relié par aria-describedby. Rien n'est rendu sans message. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-xs sm:text-sm font-medium text-danger normal-case tracking-normal">
      <AlertCircle aria-hidden="true" className="w-4 h-4 shrink-0 mt-px" />
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
  labelClassName = 'block text-xs font-semibold uppercase tracking-wider mb-2',
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
