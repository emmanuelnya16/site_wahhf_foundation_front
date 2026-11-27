import { useEffect, useRef, useState, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import Photo from '../../components/wahhf/Photo';
import type { Event } from '../../data/events';
import { eventDate, eventMonth, eventPhoto, eventStartTime, eventWhen, isShown, timeLeft } from '../../lib/events';
import { INTL_LOCALE, langOf } from '../../lib/localize';
import { pad2 } from '../events/ui';

/** Lieu : salle, ville (ou « Ville annoncée très bientôt » sans salle), pays ; comme la liste des événements */
export const lieuDe = (e: Event, bientot: string) =>
  [e.lieu, isShown(e.ville) ? e.ville : e.lieu ? null : bientot, e.pays].filter(Boolean).join(', ');

/** Une partie de la date de l'événement, heure de Douala ; null sans date */
export function partieDate(e: Event, lang: string, options: Intl.DateTimeFormatOptions) {
  if (!e.date) return null;
  return new Intl.DateTimeFormat(INTL_LOCALE[langOf(lang)], { ...options, timeZone: e.fuseau }).format(new Date(e.date));
}

/**
 * L'heure, une fois par seconde, avec un seul intervalle : arrêté hors de l'écran, onglet caché et avec le bouton pause
 * (variante de useNow, src/pages/events/Countdown.tsx, qui ne connaît pas la pause) ; remise à l'heure au retour.
 */
function useMaintenant(ref: RefObject<HTMLElement | null>, paused: boolean) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const el = ref.current;
    if (!el || paused) return;
    let timer = 0;
    let visible = true;
    const start = () => {
      if (timer || !visible || document.hidden) return;
      setNow(Date.now());
      timer = window.setInterval(() => setNow(Date.now()), 1000);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(el);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    start();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [ref, paused]);
  return now;
}

/** Page d'éphéméride : jour de la semaine, numéro, mois. Sans date : « À venir » et un point d'interrogation. */
export function Ephemeride({ event, lang }: { event: Event | null; lang: string }) {
  const { t } = useTranslation();
  const jour = event && partieDate(event, lang, { weekday: 'long' });
  return (
    <div className="ac-ephemeride" aria-hidden="true">
      <span className="ac-eph-haut">{jour ?? t('events.list.upcoming')}</span>
      <span className="ac-eph-numero">{(event && partieDate(event, lang, { day: 'numeric' })) ?? '?'}</span>
      {event?.date && <span className="ac-eph-mois">{partieDate(event, lang, { month: 'long' })}</span>}
      {/* Jour pas encore fixé : le point d'interrogation, et le mois prévu dessous (« mars 2027 ») */}
      {event && !event.date && event.mois && <span className="ac-eph-mois">{eventMonth(event, lang, false)}</span>}
    </div>
  );
}

/** Un chiffre qui tombe à chaque changement (comme sur la fiche) : la clé change, l'élément est recréé */
function Chiffre({ value, label }: { value: number | undefined; label: string }) {
  const text = value === undefined ? '–' : pad2(value);
  return (
    <span className="ac-ev-case">
      <span className="ac-ev-chiffre">
        <span key={text}>{text}</span>
      </span>
      <span className="ac-ev-unite">{label}</span>
    </span>
  );
}

/** Cadrage dans la bande en largeur de la carte, pour les photos en hauteur : B44, le visage et le lac */
const CADRAGES: Record<string, string> = { B44: '50% 12%' };

/**
 * Grande carte du prochain événement : photo du hero (coin feuille) et page d'éphéméride, titre, lieu, compte à rebours
 * de 4 cases, inscription et fiche. Date ou inscription inconnues : « annoncée(s) très bientôt », jamais un faux chiffre.
 */
export function CarteEvenement({ event, paused }: { event: Event; paused: boolean }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const ref = useRef<HTMLElement>(null);
  const reste = timeLeft(event, useMaintenant(ref, paused));
  const photo = eventPhoto(event.photoHero);
  const date = eventDate(event, lang, true, false);
  const heure = eventStartTime(event, lang);
  const inscription = event.lienInscription;
  return (
    <article ref={ref} className="ac-ev-carte">
      <div className="ac-ev-visuel">
        <div className="ac-ev-photo">
          {photo && (
            <Photo
              photo={photo}
              sizes="(min-width: 1024px) 40rem, calc(100vw - 2.5rem)"
              fit="cover"
              radius="none"
              style={CADRAGES[photo.id] ? { objectPosition: CADRAGES[photo.id] } : undefined}
            />
          )}
        </div>
        <Ephemeride event={event} lang={lang} />
      </div>
      <div className="ac-ev-corps">
        <h3 className="ac-ev-titre">{event.nom ?? event.titre.replace(/\n/g, ' ')}</h3>
        <p className="ac-ev-lieu">
          <MapPin aria-hidden="true" />
          <span>{lieuDe(event, t('events.faits.villeBientot'))}</span>
        </p>
        <div className="ac-ev-compte">
          <p className="ac-ev-compte-titre">{reste ? t('events.countdown.label') : eventWhen(event, lang, t)}</p>
          {/* Les chiffres changent chaque seconde : masqués aux lecteurs d'écran, qui lisent la date écrite dessous */}
          <p className="ac-ev-cases" aria-hidden="true">
            <Chiffre value={reste?.days} label={t('events.countdown.days')} />
            <Chiffre value={reste?.hours} label={t('events.countdown.hours')} />
            <Chiffre value={reste?.minutes} label={t('events.countdown.minutes')} />
            <Chiffre value={reste?.seconds} label={t('events.countdown.seconds')} />
          </p>
          {date && heure && <p className="ac-ev-quand">{t('events.countdown.when', { date, time: heure })}</p>}
        </div>
        <div className="ac-ev-actions">
          {inscription ? (
            inscription.startsWith('/') ? (
              <Link to={inscription} className="ac-btn ac-btn-nuit">
                {t('events.hero.register')}
              </Link>
            ) : (
              <a href={inscription} target="_blank" rel="noopener noreferrer" className="ac-btn ac-btn-nuit">
                {t('events.hero.register')}
                <span className="sr-only"> {t('ui.newTab')}</span>
              </a>
            )
          ) : (
            <p className="ac-btn ac-ev-bientot">
              <Clock aria-hidden="true" className="ac-fleche" />
              <span>{t('events.faits.inscriptionBientot')}</span>
            </p>
          )}
          <Link to={`/evenements/${event.slug}`} className="ac-btn ac-btn-contour">
            <span>{t('events.list.seeEvent')}</span>
            <ArrowRight aria-hidden="true" className="ac-fleche" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/** Aucun événement à venir : la page d'éphéméride attend, et l'on peut demander à être prévenu */
export function CarteSansEvenement() {
  const { t, i18n } = useTranslation();
  return (
    <article className="ac-ev-carte ac-ev-carte-vide">
      <div className="ac-ev-corps">
        <Ephemeride event={null} lang={i18n.language} />
        <h3 className="ac-ev-titre">{t('accueil.evenements.bientot')}</h3>
        <div className="ac-ev-actions">
          <Link to="/contact" className="ac-btn ac-btn-nuit">
            <span>{t('events.list.noneAction')}</span>
            <ArrowRight aria-hidden="true" className="ac-fleche" />
          </Link>
        </div>
      </div>
    </article>
  );
}
