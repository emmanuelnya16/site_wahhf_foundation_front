import { NEWS_DATA } from '../services/api';

/**
 * Articles publiés (groupe 7.3, déplacé ici au lot 7.9 pour la page Événements, « Dernières actualités »).
 * Articles d'exemple non confirmés (T-03) : jamais affichés en ligne (questions 55 à 57 de docs/contenus-a-fournir.md).
 * Aperçu, pour vérifier la mise en page sans les publier : construire avec VITE_APERCU_ACTUALITES=1.
 */
export const EXAMPLE_NEWS_SLUGS = new Set([
  'ouverture-inscriptions-academie-allemand-2026',
  'campagne-sante-prevention-communautaire',
  'reboisement-jeunesse-engagement-ecologique',
]);
const PREVIEW_EXAMPLES = import.meta.env.VITE_APERCU_ACTUALITES === '1';
export const PUBLISHED_NEWS = NEWS_DATA.filter((a) => PREVIEW_EXAMPLES || !EXAMPLE_NEWS_SLUGS.has(a.slug));

/** Date seulement si elle est confirmée (« 12 Mai 2026 (TODO) » n'est pas affichée). */
export const confirmedDate = (date: string) => (/TODO/.test(date) ? null : date);
