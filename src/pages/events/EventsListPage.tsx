import './i18n';
import '../../styles/events.css';
import '../../styles/events-motion.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, CalendarDays, MapPin, Sparkles } from 'lucide-react';
import SEO from '../../components/wahhf/SEO';
import Photo from '../../components/wahhf/Photo';
import type { Event } from '../../data/events';
import { eventDate, eventHours, eventPhoto, isShown, pastEvents, timeLeft, upcomingEvents } from '../../lib/events';
import { cn } from '../../lib/utils';
import { AccentTitle, HeroBackdrop } from './Hero';
import { useNow } from './Countdown';
import { EvButton, pad2 } from './ui';
import { PauseButton, useLoopControl } from './motion';

const place = (e: Event) => [e.lieu, isShown(e.ville) ? e.ville : null, e.pays].filter(Boolean).join(', ');

/** Grande carte de l'événement à venir, avec un mini compte à rebours (jours, heures, minutes) */
function UpcomingCard({ event }: { event: Event }) {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const left = timeLeft(event, useNow(ref));
  const photo = eventPhoto(event.photoHero);
  return (
    <article ref={ref} className="ev-a-venir ev-carte-lien ev-carte-lift">
      <div className="ev-a-venir-photo">
        {photo && <Photo photo={photo} sizes="(min-width: 1024px) 30rem, 100vw" fit="cover" radius="none" priority />}
      </div>
      <div className="ev-a-venir-corps">
        <h3 className="ev-h2">
          <Link to={`/evenements/${event.slug}`} className="ev-lien-carte">
            {event.titre}
          </Link>
        </h3>
        <ul className="ev-infos">
          <li>
            <CalendarDays aria-hidden="true" />
            <span>
              {eventDate(event, i18n.language)} · {eventHours(event, i18n.language)}
            </span>
          </li>
          <li>
            <MapPin aria-hidden="true" />
            <span>{place(event)}</span>
          </li>
        </ul>
        <div className="grid gap-2">
          <p className="ev-label text-[var(--ev-texte-doux)]">{t('events.list.startsIn')}</p>
          <p className="ev-mini-compte" aria-hidden="true">
            <span>
              <b>{pad2(left.days)}</b>
              <span className="ev-label">{t('events.countdown.days')}</span>
            </span>
            <span>
              <b>{pad2(left.hours)}</b>
              <span className="ev-label">{t('events.countdown.hours')}</span>
            </span>
            <span>
              <b>{pad2(left.minutes)}</b>
              <span className="ev-label">{t('events.countdown.minutes')}</span>
            </span>
          </p>
        </div>
        <span className="ev-link">
          {t('events.list.seeEvent')}
          <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

const VOIES = ['nuit', 'foret', 'soleil', 'papier'] as const;

/**
 * Liste des événements (/evenements), lot 7.9 : petit hero (pastille, h1, intro, même fond que la fiche) ; « À venir »
 * (grande carte et mini compte à rebours) ; « Éditions passées » (cartes couleur des activités : photo, date, lieu).
 * Rien à venir : une phrase et un lien vers Contact.
 */
export default function EventsListPage() {
  const { t, i18n } = useTranslation();
  const upcoming = upcomingEvents();
  const past = pastEvents();
  const root = useRef<HTMLDivElement>(null);
  const loops = useLoopControl(root);
  return (
    <div ref={root} className={cn('ev', loops.paused && 'ev-pause')}>
      <SEO title={t('events.seo.listTitle')} description={t('events.seo.listDescription')} />
      <section className="ev-hero-court" aria-labelledby="ev-liste-titre" data-ev-zone="">
        <HeroBackdrop />
        <div className="ev-container relative grid justify-items-start gap-6">
          <p className="ev-pastille ev-entree">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            {t('events.list.badge')}
          </p>
          <div id="ev-liste-titre" className="ev-entree-titre">
            <AccentTitle title={t('events.list.title')} accent={t('events.list.accent')} className="ev-h1" />
          </div>
          <p className="ev-lead ev-entree" style={{ '--delai': '0.16s' } as React.CSSProperties}>
            {t('events.list.intro')}
          </p>
          <PauseButton paused={loops.paused} onToggle={loops.toggle} />
        </div>
      </section>

      <section className="ev-section pt-0" aria-labelledby="ev-a-venir">
        <div className="ev-container grid gap-8">
          <h2 id="ev-a-venir" className="ev-eyebrow">
            {t('events.list.upcoming')}
          </h2>
          {upcoming.length > 0 ? (
            <ul className="grid gap-8">
              {upcoming.map((e) => (
                <li key={e.slug} data-reveal="ev">
                  <UpcomingCard event={e} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="grid justify-items-start gap-5">
              <p className="ev-lead">{t('events.list.none')}</p>
              <EvButton to="/contact" variant="contour" arrow>
                {t('events.list.noneAction')}
              </EvButton>
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="ev-section ev-alt" aria-labelledby="ev-passes">
          <div className="ev-container grid gap-10">
            <h2 id="ev-passes" className="ev-h2">
              {t('events.list.past')}
            </h2>
            <ul className="ev-grille-4">
              {past.map((e, i) => {
                const photo = eventPhoto(e.photoHero);
                return (
                  <li key={e.slug} className={cn('ev-voie ev-carte-voie', `ev-voie-${VOIES[i % VOIES.length]}`)} data-reveal="ev">
                    <div className="ev-voie-photo">
                      {photo && <Photo photo={photo} sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw" fit="cover" radius="none" />}
                    </div>
                    <div className="ev-voie-corps">
                      <span className="ev-voie-icone" aria-hidden="true">
                        <CalendarDays />
                      </span>
                      <h3 className="ev-h3">
                        <Link to={`/evenements/${e.slug}`} className="ev-voie-lien">
                          {e.titre}
                        </Link>
                      </h3>
                      <p className="ev-voie-texte">{place(e)}</p>
                      <div className="ev-voie-pied">
                        <span className="ev-voie-etiquette ev-label">{eventDate(e, i18n.language, false)}</span>
                        <span className="ev-rond-fleche" aria-hidden="true">
                          <ArrowUpRight className="h-5 w-5" />
                        </span>
                      </div>
                      <CalendarDays aria-hidden="true" className="ev-filigrane" strokeWidth={1.25} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
