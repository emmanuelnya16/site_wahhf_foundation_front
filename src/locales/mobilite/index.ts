import { registerBundle } from '../../i18n';
import fr from './fr.json';

/**
 * Paquet « mobilite » (lot 7.10) : textes des pages Mobilité & Langues, Académie, pages de niveau et Candidater, et
 * surcouches anglaises et allemandes de leurs données (niveaux et sessions de src/services/api.ts, sous « contenu »).
 * Importé par chaque module qui l'utilise : registerBundle ne fait rien la deuxième fois.
 */
registerBundle('mobilite', fr, {
  en: () => import('./en.json'),
  de: () => import('./de.json'),
});
