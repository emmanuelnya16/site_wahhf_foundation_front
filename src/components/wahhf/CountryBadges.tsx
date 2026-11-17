import { AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

/*
 * Repères des 10 pays accompagnés (groupe 7.4 : page Accompagnement, fiches pays).
 * - CountryCode : le code du pays en typographie (« DE »), à la place du drapeau en emoji, qui s'affiche en lettres sous
 *   Windows (audit T-22). Masqué aux lecteurs d'écran : le nom du pays est toujours écrit à côté.
 * - EuStatus : « Membre de l'Union européenne » en encre douce, ou « Hors Union européenne » en couleur d'alerte
 *   (ambre, avec le triangle ; plus jamais le rouge du don, contrat §3.2 et §12). `short` : « Membre UE », « Hors UE ».
 */
export function CountryCode({ code, className }: { code: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'inline-flex min-w-9 shrink-0 items-center justify-center rounded-inner border border-border-input px-1.5 text-meta font-semibold leading-6 text-text tabular-nums',
        className,
      )}
    >
      {code}
    </span>
  );
}

export function EuStatus({ isEU, short = false, className }: { isEU: boolean; short?: boolean; className?: string }) {
  if (isEU) {
    return (
      <span className={cn('text-meta text-text-secondary', className)}>{short ? 'Membre UE' : 'Membre de l’Union européenne'}</span>
    );
  }
  return (
    <span className={cn('inline-flex items-center gap-1.5 text-meta font-semibold text-warning', className)}>
      <AlertTriangle aria-hidden="true" className="w-4 h-4 shrink-0" />
      {short ? 'Hors UE' : 'Hors Union européenne'}
    </span>
  );
}
