import { useTranslation } from 'react-i18next';
import i18n, { type Language } from '../i18n';

/**
 * Données traduites (lot 7.10) : le français reste dans les fichiers de src/data (et src/services/api.ts) ; l'anglais
 * et l'allemand sont des surcouches rangées sous « contenu » dans les fichiers de langue, qui ne reprennent que les
 * champs à traduire (les noms propres, les adresses et les liens restent ceux du français).
 */

/** Fusion profonde : chaque texte de la surcouche remplace celui du français ; les tableaux se fusionnent case à case. */
export function merge<T>(base: T, over: unknown): T {
  if (over == null) return base;
  if (Array.isArray(base) && Array.isArray(over)) return base.map((item, i) => merge(item, over[i])) as T;
  if (base && typeof base === 'object' && typeof over === 'object' && !Array.isArray(over)) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = merge(out[k], v);
    return out as T;
  }
  return over as T;
}

/** Langue du site à partir d'un code i18next (« de-DE » → « de ») */
export function langOf(lng: string = i18n.language): Language {
  return lng.startsWith('en') ? 'en' : lng.startsWith('de') ? 'de' : 'fr';
}

/** Locale Intl de chaque langue (dates, nombres) */
export const INTL_LOCALE: Record<Language, string> = { fr: 'fr-FR', en: 'en-GB', de: 'de-DE' };

/**
 * Une donnée dans la langue de l'interface : `key` est le chemin de sa surcouche dans les fichiers de langue
 * (ex. « contenu.domaines.education »), ou plusieurs chemins appliqués dans l'ordre (ex. le nom d'un pays dans les
 * textes communs, sa fiche dans le paquet des pages Accompagnement). Sans surcouche, le français.
 */
export function localized<T>(item: T, key: string | readonly string[], lng: string = i18n.language): T {
  const lang = langOf(lng);
  if (lang === 'fr') return item;
  let out = item;
  for (const k of typeof key === 'string' ? [key] : key) {
    const over = i18n.getResource(lang, 'translation', k);
    if (over) out = merge(out, over);
  }
  return out;
}

/** Une liste de données dans la langue de l'interface, chacune avec sa surcouche `${prefix}.${id}`. */
export function localizedList<T>(items: readonly T[], prefix: string, id: (item: T) => string, lng: string = i18n.language): T[] {
  return items.map((item) => localized(item, `${prefix}.${id(item)}`, lng));
}

/** Dans un composant : la langue en cours, et les mêmes fonctions, qui se remettent à jour au changement de langue. */
export function useLocalize() {
  const { t, i18n: instance } = useTranslation();
  const lang = langOf(instance.language);
  return {
    t,
    lang,
    locale: INTL_LOCALE[lang],
    localized: <T,>(item: T, key: string | readonly string[]) => localized(item, key, lang),
    localizedList: <T,>(items: readonly T[], prefix: string, id: (item: T) => string) => localizedList(items, prefix, id, lang),
  };
}
