import type { CourseSession } from '../services/api';
import i18n from '../i18n';
import '../locales/mobilite';
import { INTL_LOCALE, langOf, localized } from './localize';

/**
 * Sessions de l'Académie (audit T-05, groupe 7.1) : dates stockées au format ISO, comparées à la date du jour.
 * Une session commencée disparaît d'elle-même du calendrier ; une date non confirmée par la fondation n'affiche que
 * son mois, « à confirmer ».
 * Lot 7.10 : dates écrites dans la langue de l'interface (fr-FR, en-GB, de-DE) ; textes des sessions traduits par la
 * surcouche « mobilite.contenu.sessions.<id> » (titre, jours, durée).
 */

/** Date du jour au format ISO (AAAA-MM-JJ), heure locale. */
export function todayIso(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Sessions pas encore commencées, de la plus proche à la plus lointaine. */
export function upcomingSessions(sessions: readonly CourseSession[], today = todayIso()): CourseSession[] {
  return sessions.filter((s) => s.startsOn >= today).sort((a, b) => a.startsOn.localeCompare(b.startsOn));
}

const FORMATTERS = new Map<string, { day: Intl.DateTimeFormat; month: Intl.DateTimeFormat }>();
function formatters(locale: string) {
  let f = FORMATTERS.get(locale);
  if (!f) {
    f = {
      day: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }),
      month: new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }),
    };
    FORMATTERS.set(locale, f);
  }
  return f;
}

/**
 * « 11 janvier 2027 », ou « janvier 2027 (date à confirmer) » tant que la fondation ne l'a pas confirmée ; dans la
 * langue `lng` (par défaut celle de l'interface) : « 11. Januar 2027 », « January 2027 (date to be confirmed) ».
 */
export function formatSessionStart(session: Pick<CourseSession, 'startsOn' | 'dateConfirmed'>, lng: string = i18n.language): string {
  const lang = langOf(lng);
  const { day, month } = formatters(INTL_LOCALE[lang]);
  const date = new Date(`${session.startsOn}T00:00:00Z`);
  return session.dateConfirmed ? day.format(date) : i18n.t('mobilite.sessions.moisAConfirmer', { lng: lang, month: month.format(date) });
}

/** Format d'une session (valeur française des données) → clé de ses libellés traduits (mobilite.formats.<clé>). */
export type FormatKey = 'enLigne' | 'douala' | 'yaounde';
export const formatKey = (format: string): FormatKey =>
  format.includes('Douala') ? 'douala' : format.includes('Yaoundé') ? 'yaounde' : 'enLigne';

/** Une session dans la langue de l'interface (titre, jours, durée) ; `format` garde sa valeur française (filtres). */
export const localizedSession = (session: CourseSession, lng?: string): CourseSession =>
  localized(session, `mobilite.contenu.sessions.${session.id}`, lng);

/** Texte provisoire (marqueur TODO, « Simulé », « démonstration ») ou absent : masqué sur les pages du groupe 7.1
 *  tant que la fondation ne l'a pas fourni (docs/contenus-a-fournir.md). */
export const isProvisional = (text: string | undefined | null) => !text || /TODO|Simulé|démonstration/i.test(text);
