import { ReactNode, useId } from 'react';
import { Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Encadré d'état (contrat §3.2 et §8), posé dans le flux de la page. Ni or, ni ombre, ni bande nuit.
 * - tone="info" (par défaut) : fond ciel pâle, contour fin et titre couleur info, icône « i » ;
 * - tone="warning" (alerte) : fond ambre pâle, contour fin et titre couleur ambre, icône triangle.
 * En sombre, les deux prennent le fond canopée ; seuls l'icône, le titre et le contour changent de couleur.
 * Texte courant en encre pleine. Pour l'avertissement anti-arnaque : premier élément sous le titre de la page,
 * texte en taille courante, jamais replié ni réduit (précaution du 16 novembre 2026).
 */
const TONES = {
  info: { box: 'border-info/40 bg-info-bg', accent: 'text-info', Icon: Info },
  warning: { box: 'border-warning/40 bg-warning-bg', accent: 'text-warning', Icon: AlertTriangle },
};

export default function InfoBox({
  title,
  tone = 'info',
  children,
  className,
}: {
  /** Titre court (600) ; sert aussi de nom accessible à l'encadré. */
  title?: ReactNode;
  tone?: keyof typeof TONES;
  children: ReactNode;
  className?: string;
}) {
  const titleId = useId();
  const t = TONES[tone];
  const Icon = t.Icon;
  return (
    <aside
      aria-labelledby={title ? titleId : undefined}
      className={cn('max-w-4xl rounded-inner border p-5 sm:p-6 text-text', t.box, className)}
    >
      {title ? (
        // Icône sur la ligne du titre ; le texte prend toute la largeur sur téléphone, aligné sous le titre ensuite.
        <>
          <div className="flex items-center gap-3">
            <Icon aria-hidden="true" className={cn('w-6 h-6 shrink-0', t.accent)} />
            <p id={titleId} className={cn('text-body font-semibold', t.accent)}>
              {title}
            </p>
          </div>
          <div className="mt-2 space-y-2 text-body sm:pl-9">{children}</div>
        </>
      ) : (
        <div className="flex items-start gap-3">
          <Icon aria-hidden="true" className={cn('w-6 h-6 shrink-0 mt-0.5', t.accent)} />
          <div className="min-w-0 space-y-2 text-body">{children}</div>
        </div>
      )}
    </aside>
  );
}
