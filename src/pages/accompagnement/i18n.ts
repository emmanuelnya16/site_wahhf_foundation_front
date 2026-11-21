import type { ReactNode } from 'react';
import { registerBundle } from '../../i18n';
import fr from '../../locales/accompagnement/fr.json';

/**
 * Textes des pages Accompagnement vers l'Europe (lot 7.10) : page Accompagnement, 10 fiches pays, guides des étapes,
 * Éviter les arnaques, et leurs composants (CountryBadges, FilSteps). Espace de noms « accompagnement ».
 * - Les textes fixes : src/locales/accompagnement/{fr,en,de}.json.
 * - Les données (src/data/countries.ts, src/data/arnaques.ts, THEMATIC_GUIDES de src/services/api.ts, étapes de
 *   ./steps.ts) restent en français dans leurs fichiers ; l'anglais et l'allemand sont des surcouches sous
 *   « accompagnement.contenu » (pays, arnaques, guides, etapes), lues par useLocalize.
 */
registerBundle('accompagnement', fr, {
  en: () => import('../../locales/accompagnement/en.json'),
  de: () => import('../../locales/accompagnement/de.json'),
});

/** Espace insécable */
export const NB = ' ';

/**
 * Un texte traduit à trous ({{nom}}), rendu en morceaux : chaque partie fixe et chaque valeur restent des nœuds de texte
 * séparés, comme dans le JSX d'origine (« Étape {n} sur {total} … »), et l'ordre des mots suit la langue.
 */
export function pieces(template: string, values: Record<string, ReactNode>): ReactNode[] {
  return template
    .split(/\{\{(\w+)\}\}/)
    .map((part, i) => (i % 2 ? values[part] : part))
    .filter((part) => part !== '');
}
