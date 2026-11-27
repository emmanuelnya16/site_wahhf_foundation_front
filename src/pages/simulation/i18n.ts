import { registerBundle } from '../../i18n';
import fr from '../../locales/simulation/fr.json';

/** Textes de la page Simulation (lot 13) : le français part avec la page, l'anglais et l'allemand à la demande. */
registerBundle('simulation', fr, {
  en: () => import('../../locales/simulation/en.json'),
  de: () => import('../../locales/simulation/de.json'),
});
