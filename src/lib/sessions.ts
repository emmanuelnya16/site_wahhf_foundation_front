import type { CourseSession } from '../services/api';

/**
 * Sessions de l'Académie (audit T-05, groupe 7.1) : dates stockées au format ISO, comparées à la date du jour.
 * Une session commencée disparaît d'elle-même du calendrier ; une date non confirmée par la fondation n'affiche que
 * son mois, « à confirmer ».
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

const DAY = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const MONTH = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });

/** « 11 janvier 2027 », ou « janvier 2027 (date à confirmer) » tant que la fondation ne l'a pas confirmée. */
export function formatSessionStart(session: Pick<CourseSession, 'startsOn' | 'dateConfirmed'>): string {
  const date = new Date(`${session.startsOn}T00:00:00Z`);
  return session.dateConfirmed ? DAY.format(date) : `${MONTH.format(date)} (date à confirmer)`;
}

/** Texte provisoire (marqueur TODO, « Simulé », « démonstration ») ou absent : masqué sur les pages du groupe 7.1
 *  tant que la fondation ne l'a pas fourni (docs/contenus-a-fournir.md). */
export const isProvisional = (text: string | undefined | null) => !text || /TODO|Simulé|démonstration/i.test(text);
