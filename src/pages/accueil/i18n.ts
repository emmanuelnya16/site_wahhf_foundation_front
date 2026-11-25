import { registerBundle } from '../../i18n';
import fr from '../../locales/accueil/fr.json';

/** Textes de la page Accueil (lot 11.1) : le français part avec la page, l'anglais et l'allemand à la demande. */
registerBundle('accueil', fr, {
  en: () => import('../../locales/accueil/en.json'),
  de: () => import('../../locales/accueil/de.json'),
});
