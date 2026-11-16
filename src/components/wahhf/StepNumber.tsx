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
 * dégradé ; elle avance en 0,3 s (instantané en mouvement réduit). Décorative : la position est annoncée en texte.
 */
export function ProgressBar({ value, max, onInverse = false, className }: { value: number; max: number; onInverse?: boolean; className?: string }) {
  return (
    <div aria-hidden="true" className={cn('h-2 w-full overflow-hidden rounded-pill', onInverse ? 'bg-border-subtle-on-inverse' : 'bg-border-subtle', className)}>
      <div
        className={cn(
          'h-full w-full origin-left transition-transform duration-(--dur-fast) motion-reduce:transition-none',
          onInverse ? 'bg-action-on-inverse' : 'bg-action',
        )}
        style={{ transform: `scaleX(${Math.min(1, Math.max(0, value / max))})` }}
      />
    </div>
  );
}
