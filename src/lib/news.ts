import { NEWS_DATA, type NewsArticle } from '../services/api';
import { registerBundle } from '../i18n';
import { INTL_LOCALE, langOf, localized } from './localize';
import fr from '../locales/actualites/fr.json';

/**
 * Textes de la page Actualités et traductions des articles (lot 7.10, paquet « actualites ») : enregistrés ici, pour
 * que la page Événements (« Dernières actualités ») ait aussi les articles en anglais et en allemand. Le français des
 * articles reste dans NEWS_DATA (src/services/api.ts) ; l'anglais et l'allemand sont des surcouches,
 * actualites.contenu.news.<slug> (titre, rubrique, résumé, contenu, temps de lecture).
 */
registerBundle('actualites', fr, {
  en: () => import('../locales/actualites/en.json'),
  de: () => import('../locales/actualites/de.json'),
});

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
/** En français (la rubrique sert à retrouver le domaine de l'article) ; à afficher avec localizedNews(). */
export const PUBLISHED_NEWS = NEWS_DATA.filter((a) => PREVIEW_EXAMPLES || !EXAMPLE_NEWS_SLUGS.has(a.slug));

/**
 * Un article dans la langue de l'interface (ou `lng`) : titre, rubrique, résumé et contenu traduits. Le composant qui
 * l'appelle doit utiliser useTranslation() ou useLocalize(), pour se remettre à jour au changement de langue.
 */
export const localizedNews = (article: NewsArticle, lng?: string): NewsArticle =>
  localized(article, `actualites.contenu.news.${article.slug}`, lng);

const FR_MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

/**
 * Date seulement si elle est confirmée (« 12 Mai 2026 (TODO) » n'est pas affichée). Avec une langue (`lng`, ex. la
 * `lang` de useLocalize) : la date au format de cette langue (« 12 May 2026 », « 12. Mai 2026 ») ; le français reste
 * tel qu'il est écrit dans NEWS_DATA.
 */
export const confirmedDate = (date: string, lng?: string): string | null => {
  if (/TODO/.test(date)) return null;
  const lang = lng ? langOf(lng) : 'fr';
  if (lang === 'fr') return date;
  const m = /^(\d{1,2})\s+(\p{L}+)\s+(\d{4})$/u.exec(date.trim());
  const month = m ? FR_MONTHS.indexOf(m[2].toLowerCase()) : -1;
  if (!m || month < 0) return date;
  return new Intl.DateTimeFormat(INTL_LOCALE[lang], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(Date.UTC(Number(m[3]), month, Number(m[1])))
  );
};
