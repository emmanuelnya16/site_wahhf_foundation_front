import { useEffect } from 'react';

/**
 * Demande aux moteurs de ne pas indexer la page affichée (`<meta name="robots" content="noindex">`).
 * Au démontage, l'état précédent est rétabli : la balise globale de index.html, si elle existe, est conservée,
 * et une balise créée ici est retirée. Utilisé par les 8 pages historiques IROKO, qui doivent rester exclues
 * des moteurs même quand le noindex global sera levé au lancement.
 */
export function useNoIndex() {
  useEffect(() => {
    let meta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !meta;
    const previous = meta?.getAttribute('content') ?? null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex');
    return () => {
      if (created) meta?.remove();
      else if (previous !== null) meta?.setAttribute('content', previous);
    };
  }, []);
}
