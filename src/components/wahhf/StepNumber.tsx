import { CSSProperties } from 'react';
import { cn } from '../../lib/utils';

/**
 * Numéro d'étape (contrat §8, T-17) : cercle de 32 px, contour 1,5 px couleur du fil (forêt en clair, feuille en
 * sombre), numéro en 600. Seulement pour les vraies suites : étapes de candidature, 4 étapes de l'accompagnement,
 * « Les grandes étapes » des fiches pays. Aucun survol, aucune animation.
 * `decorative` le masque aux lecteurs d'écran quand la position est déjà écrite à côté (« Étape 1 sur 3 »).
 */
export default function StepNumber({ n, decorative = false, className }: { n: number; decorative?: boolean; className?: string }) {
  return (
    <span
      aria-hidden={decorative || undefined}
      className={cn(
        'inline-flex size-8 shrink-0 items-center justify-center rounded-pill border-[1.5px] border-fil text-meta font-bold leading-none text-text tabular-nums',
        className,
      )}
    >
      {n}
    </span>
  );
}

/**
 * Barre de progression (contrat §10 : gardée, retour d'action) : remplissage plein à la couleur de l'action, sans
 * dégradé ; elle se remplit en 0,3 s (transform, instantané en mouvement réduit). Décorative par défaut (la position
 * est écrite à côté) ; avec `label`, c'est une vraie barre de progression pour les lecteurs d'écran (ACAD-04).
 */
export function ProgressBar({ value, max, onInverse = false, label, className }: { value: number; max: number; onInverse?: boolean; label?: string; className?: string }) {
  return (
    <div
      {...(label
        ? { role: 'progressbar', 'aria-label': label, 'aria-valuemin': 0, 'aria-valuemax': max, 'aria-valuenow': value }
        : { 'aria-hidden': true })}
      className={cn('h-2 w-full overflow-hidden rounded-pill', onInverse ? 'bg-border-subtle-on-inverse' : 'bg-border-subtle', className)}
    >
      <div
        className={cn(
          'h-full w-full origin-left [transform:scaleX(var(--progress))] starting:[transform:scaleX(0)] transition-transform duration-(--dur-fast) ease-(--ease-power2-out) motion-reduce:transition-none',
          onInverse ? 'bg-action-on-inverse' : 'bg-action',
        )}
        style={{ '--progress': Math.min(1, Math.max(0, value / max)) } as CSSProperties}
      />
    </div>
  );
}
