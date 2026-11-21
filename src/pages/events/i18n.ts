import { registerBundle } from '../../i18n';
import eventsFr from '../../locales/events/fr.json';

/**
 * Textes fixes des pages Événements (lots 7.9 et 7.10), ajoutés à l'i18n du site au chargement de ces pages seulement :
 * le français part avec leur JS ; l'anglais et l'allemand (avec le contenu traduit des événements, events.contenu) sont
 * téléchargés quand la langue est choisie.
 */
registerBundle('events', eventsFr, {
  en: () => import('../../locales/events/en.json'),
  de: () => import('../../locales/events/de.json'),
});
