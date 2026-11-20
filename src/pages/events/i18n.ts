import i18n from '../../i18n';
import eventsFr from '../../locales/events/fr.json';
import eventsEn from '../../locales/events/en.json';

/**
 * Textes fixes des pages Événements (lot 7.9), ajoutés à l'i18n du site au chargement de ces pages seulement :
 * dans src/locales/fr.json et en.json, ils alourdiraient le JS du premier affichage.
 */
i18n.addResourceBundle('fr', 'translation', { events: eventsFr }, true, false);
i18n.addResourceBundle('en', 'translation', { events: eventsEn }, true, false);
