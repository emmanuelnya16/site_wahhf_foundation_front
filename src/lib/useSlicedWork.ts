import { startTransition, useEffect, useState } from 'react';

/** Durée d'une tranche de calcul : le navigateur peut peindre une image entre deux tranches */
const SLICE_MS = 8;

/**
 * Calcule une liste par tranches de 8 ms (une tâche par tranche) au lieu d'un seul long calcul.
 * Sert aux cartes de présence (tracés d3-geo) : calculés d'un bloc, ils prenaient environ 300 ms au processeur
 * ralenti ×4, au moment où les cartes arrivent pendant le défilement (contrat §10, garde-fou : aucune image de plus
 * de 50 ms au défilement).
 * - Renvoie null tant que le premier calcul n'est pas fini. Le rendu du résultat passe en transition : React peut
 *   lui aussi le découper (seule l'insertion finale dans la page reste d'un bloc).
 * - Pendant un nouveau calcul (fenêtre redimensionnée), garde le résultat précédent : la carte ne clignote pas.
 * - items et compute doivent être stables (useMemo) : un changement relance le calcul.
 */
export function useSlicedWork<I, R>(items: readonly I[] | null, compute: ((item: I) => R | null) | null): R[] | null {
  const [results, setResults] = useState<R[] | null>(null);

  useEffect(() => {
    if (!items || !compute) return;
    let cancelled = false;
    let index = 0;
    const out: R[] = [];
    // MessageChannel : une nouvelle tâche aussitôt, sans le délai minimal de setTimeout
    const channel = new MessageChannel();
    const step = () => {
      if (cancelled) return;
      const start = performance.now();
      while (index < items.length && performance.now() - start < SLICE_MS) {
        const r = compute(items[index++]);
        if (r != null) out.push(r);
      }
      if (index < items.length) channel.port2.postMessage(null);
      else startTransition(() => setResults(out));
    };
    channel.port1.onmessage = step;
    channel.port2.postMessage(null);
    return () => {
      cancelled = true;
      channel.port1.onmessage = null;
      channel.port1.close();
    };
  }, [items, compute]);

  return results;
}
