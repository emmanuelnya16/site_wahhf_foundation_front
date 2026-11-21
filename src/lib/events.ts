import type { TFunction } from 'i18next';
import i18n from '../i18n';
import { EVENTS, type Event, type EventDomain, type EventSectionKey, type EventSectionText, type EventStatus } from '../data/events';
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

/** Page de chaque domaine (comme DOMAINS_DATA, src/services/api.ts) : lien des cartes d'activité */
export const DOMAIN_LINKS: Record<EventDomain, string> = {
  education: '/nos-actions?domaine=education',
  health: '/nos-actions?domaine=sante',
  entrepreneurship: '/nos-actions?domaine=entrepreneuriat',
  environment: '/nos-actions?domaine=environnement',
  rights: '/nos-actions?domaine=droits-inclusion',
  mobility: '/mobilite-langues',
};

/** Statut réel : un événement « à venir » dont la fin est passée est passé ; sans date, il reste à venir. */
export function eventStatus(event: Event, now = Date.now()): EventStatus {
  const end = event.fin ?? event.date;
  return event.statut === 'a-venir' && end && Date.parse(end) < now ? 'passe' : event.statut;
}

/** Instant de début (pour trier) ; un événement sans date passe après ceux qui en ont une. */
const startOf = (e: Event, missing: number) => (e.date ? Date.parse(e.date) : missing);

/** Tous les événements, le plus proche d'abord pour ceux à venir, le plus récent d'abord pour les passés. */
export function upcomingEvents(now = Date.now()) {
  return EVENTS.filter((e) => eventStatus(e, now) === 'a-venir').sort((a, b) => startOf(a, Infinity) - startOf(b, Infinity));
}
export function pastEvents(now = Date.now()) {
  return EVENTS.filter((e) => eventStatus(e, now) === 'passe').sort((a, b) => startOf(b, -Infinity) - startOf(a, -Infinity));
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

/** « Samedi 25 avril 2026 » (heure de Douala), insécable entre le jour, le mois et l'année ; en milieu de phrase,
 *  capital = false garde la minuscule française (« le mardi 19 janvier »). */
export function eventDate(event: Event, lang: string, withWeekday = true, capital = true): string | null {
  if (!event.date) return null;
  const text = new Intl.DateTimeFormat(locale(lang), {
    weekday: withWeekday ? 'long' : undefined,
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: event.fuseau,
  }).format(new Date(event.date));
  return (capital ? capitalize(text) : text).replace(/(\d+) (\p{L}+) (\d{4})/u, `$1${NB}$2${NB}$3`);
}

/** « 8 h – 21 h » en français, « 8:00 – 21:00 » en anglais (heure de Douala) ; null sans date. */
export function eventHours(event: Event, lang: string): string | null {
  if (!event.date) return null;
  const date = event.date;
  const fmt = (iso: string) => {
    const parts = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: event.fuseau })
      .formatToParts(new Date(iso));
    const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0);
    const m = parts.find((p) => p.type === 'minute')?.value ?? '00';
    if (lang.startsWith('en')) return `${h}:${m}`;
    return m === '00' ? `${h}${NB}h` : `${h}${NB}h${NB}${m}`;
  };
  return event.fin ? `${fmt(date)} – ${fmt(event.fin)}` : fmt(date);
}

/** Temps restant avant le début, en jours, heures, minutes et secondes (0 partout une fois commencé) ; null sans date. */
export function timeLeft(event: Event, now = Date.now()) {
  if (!event.date) return null;
  let s = Math.max(0, Math.floor((Date.parse(event.date) - now) / 1000));
  const days = Math.floor(s / 86_400);
  s -= days * 86_400;
  const hours = Math.floor(s / 3_600);
  s -= hours * 3_600;
  const minutes = Math.floor(s / 60);
  return { days, hours, minutes, seconds: s - minutes * 60 };
}

/**
 * Phrases qui dépendent des faits (FAQ, appel final) : {{quandOu}}, {{prix}}, {{deVille}} sont remplacés par les faits
 * connus, ou par « annoncé(e) très bientôt » (events.faits.* dans src/locales/events/*.json), jamais par un faux chiffre.
 */
export function fillFacts(text: string, event: Event, t: TFunction, lang: string): string {
  const date = eventDate(event, lang, true, false);
  const ville = event.ville && isShown(event.ville) ? event.ville : null;
  const quandOu = date && ville
    ? t('events.faits.quandOu', { date, ville, pays: event.pays })
    : date
      ? t('events.faits.quandSansVille', { date, pays: event.pays })
      : ville
        ? t('events.faits.ouSansDate', { ville, pays: event.pays })
        : t('events.faits.quandOuInconnus', { pays: event.pays });
  const prix = event.prix ? t('events.faits.prix', { prix: event.prix }) : t('events.faits.prixInconnu');
  return text
    .replace('{{quandOu}}', quandOu)
    .replace('{{prix}}', prix)
    .replace('{{deVille}}', ville ? t('events.faits.deVille', { ville }) : '');
}

/** Texte d'une section propre à l'événement, sinon celui de l'i18n (events.<défaut>) */
export function sectionText(event: Event, key: EventSectionKey, field: keyof EventSectionText): string | undefined {
  return event.sections?.[key]?.[field];
}

/** Fusion profonde : les objets champ par champ, les tableaux élément par élément ; le reste est remplacé. */
function merge<T>(base: T, over: unknown): T {
  if (over == null) return base;
  if (Array.isArray(base) && Array.isArray(over)) return base.map((item, i) => merge(item, over[i])) as T;
  if (base && typeof base === 'object' && typeof over === 'object' && !Array.isArray(over)) {
    const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
    for (const [k, v] of Object.entries(over as Record<string, unknown>)) out[k] = merge(out[k], v);
    return out as T;
  }
  return over as T;
}

/**
 * Contenu dans la langue de l'interface : le français vient de src/data/events.ts ; l'anglais, quand il existe, de
 * events.contenu.<slug> dans src/locales/events/en.json (mêmes champs, fusionnés sur le français).
 */
export function localizeEvent(event: Event, lang: string): Event {
  if (!lang.startsWith('en')) return event;
  const over = i18n.getResource('en', 'translation', `events.contenu.${event.slug}`);
  return over ? merge(event, over) : event;
}

/** Le titre coupé autour du mot accent : [avant, accent, après] ; accent vide s'il n'est pas dans le titre. */
export function splitAccent(title: string, accent: string): [string, string, string] {
  const i = accent ? title.indexOf(accent) : -1;
  if (i < 0) return [title, '', ''];
  return [title.slice(0, i), accent, title.slice(i + accent.length)];
}
