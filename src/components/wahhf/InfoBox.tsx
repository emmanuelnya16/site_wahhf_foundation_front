import { ReactNode, useId } from 'react';
import { Info } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Encadré d'information (contrat §3.2 et §8) : fond ciel pâle (canopée en sombre), contour fin couleur info,
 * icône « i » sans carré, titre court en 600 couleur info, texte courant en encre pleine. Ni or, ni ombre, ni bande nuit.
 * Posé dans le flux de la page. Pour l'avertissement anti-arnaque : premier élément sous le titre de la page,
 * texte en taille courante, jamais replié ni réduit (précaution du 16 novembre 2026).
 */
export default function InfoBox({
  title,
  children,
  className,
}: {
  /** Titre court (600) ; sert aussi de nom accessible à l'encadré. */
  title?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const titleId = useId();
  return (
    <aside
      aria-labelledby={title ? titleId : undefined}
      className={cn('max-w-4xl rounded-inner border border-info/40 bg-info-bg p-5 sm:p-6 text-text', className)}
    >
      {title ? (
        // Icône sur la ligne du titre ; le texte prend toute la largeur sur téléphone, aligné sous le titre ensuite.
        <>
          <div className="flex items-center gap-3">
            <Info aria-hidden="true" className="w-6 h-6 shrink-0 text-info" />
            <p id={titleId} className="text-body font-semibold text-info">
              {title}
            </p>
          </div>
          <div className="mt-2 space-y-2 text-body sm:pl-9">{children}</div>
        </>
      ) : (
        <div className="flex items-start gap-3">
          <Info aria-hidden="true" className="w-6 h-6 shrink-0 text-info mt-0.5" />
          <div className="min-w-0 space-y-2 text-body">{children}</div>
        </div>
      )}
    </aside>
  );
}
