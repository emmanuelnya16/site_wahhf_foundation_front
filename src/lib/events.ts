import { EVENTS, type Event, type EventStatus } from '../data/events';
import { photoOrFallback } from './photos';
import type { CatalogPhoto } from '../data/photos';

/** Aperçu de production avec les textes provisoires (captures, Lighthouse) : VITE_APERCU_EVENEMENTS=1 au build. */
const PREVIEW = import.meta.env.VITE_APERCU_EVENEMENTS === '1';
/** En développement et dans l'aperçu, les textes « TODO » s'affichent ; en ligne, jamais (contrôle T-01). */
export const SHOW_PROVISIONAL = !import.meta.env.PROD || PREVIEW;

/** Un texte confirmé (sans « TODO ») ; en développement, tout texte compte. */
export const isShown = (text: string | null | undefined): text is string =>
  !!text && (SHOW_PROVISIONAL || !/TODO/.test(text));

/** Les éléments d'une liste dont tous les textes sont affichables. */
export function shownItems<T>(items: readonly T[], texts: (item: T) => (string | null | undefined)[]): T[] {
  return items.filter((item) => texts(item).every((t) => t == null || isShown(t)));
}

/** Statut réel : un événement « à venir » dont la fin est passée est passé. */
export function eventStatus(event: Event, now = Date.now()): EventStatus {
  return event.statut === 'a-venir' && Date.parse(event.fin) < now ? 'passe' : event.statut;
}

/** Tous les événements, le plus proche d'abord pour ceux à venir, le plus récent d'abord pour les passés. */
export function upcomingEvents(now = Date.now()) {
  return EVENTS.filter((e) => eventStatus(e, now) === 'a-venir').sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
}
export function pastEvents(now = Date.now()) {
  return EVENTS.filter((e) => eventStatus(e, now) === 'passe').sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
export const eventBySlug = (slug: string | undefined) => EVENTS.find((e) => e.slug === slug) ?? null;

/** Première photo publiable de la liste (repères du catalogue). */
export function eventPhoto(ids: readonly string[]): CatalogPhoto | null {
  const [first, ...rest] = ids;
  return first ? photoOrFallback(first, ...rest) : null;
}

const NB = ' ';
const locale = (lang: string) => (lang.startsWith('en') ? 'en-GB' : 'fr-FR');
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « Samedi 25 avril 2026 » (heure de Douala), insécable entre le jour, le mois et l'année. */
export function eventDate(event: Event, lang: string, withWeekday = true): string {
  const text = new Intl.DateTimeFormat(locale(lang), {
    weekday: withWeekday ? 'long' : undefined,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: event.fuseau,
  }).format(new Date(event.date));
  return capitalize(text).replace(/(\d+) (\p{L}+) (\d{4})/u, `$1${NB}$2${NB}$3`);
}

/** « 8 h – 21 h » en français, « 8:00 – 21:00 » en anglais (heure de Douala). */
export function eventHours(event: Event, lang: string): string {
  const fmt = (iso: string) => {
    const parts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: event.fuseau })
      .formatToParts(new Date(iso));
    const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
    const m = parts.find((p) => p.type === 'minute')?.value ?? '00';
    if (lang.startsWith('en')) return `${h}:${m}`;
    return m === '00' ? `${h}${NB}h` : `${h}${NB}h${NB}${m}`;
  };
  return `${fmt(event.date)} – ${fmt(event.fin)}`;
}

/** Temps restant avant le début, en jours, heures, minutes et secondes (0 partout une fois commencé). */
export function timeLeft(event: Event, now = Date.now()) {
  let s = Math.max(0, Math.floor((Date.parse(event.date) - now) / 1000));
  const days = Math.floor(s / 86_400);
  s -= days * 86_400;
  const hours = Math.floor(s / 3_600);
  s -= hours * 3_600;
  const minutes = Math.floor(s / 60);
  return { days, hours, minutes, seconds: s - minutes * 60 };
}

/** Le titre coupé autour du mot accent : [avant, accent, après] ; accent vide s'il n'est pas dans le titre. */
export function splitAccent(title: string, accent: string): [string, string, string] {
  const i = accent ? title.indexOf(accent) : -1;
  if (i < 0) return [title, '', ''];
  return [title.slice(0, i), accent, title.slice(i + accent.length)];
}
