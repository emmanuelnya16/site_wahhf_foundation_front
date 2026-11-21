import './i18n';
import '../../styles/events.css';
import '../../styles/events-motion.css';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';
import { EVENTS, type Event } from '../../data/events';
import { eventBySlug, eventStatus, localizeEvent, shownItems } from '../../lib/events';
import Hero from './Hero';
import Countdown from './Countdown';
import { Activities, Organizers, Schedule, Ticker, Why } from './Sections';
import { Program, Support } from './Program';
import { Faq, FinalCta, LatestNews, Parents } from './Families';
import { PauseButton, useLoopControl } from './motion';
import { AfterFirstDisplay, EventsFrise } from '../../effects/DeferredMotion';
import { cn } from '../../lib/utils';

/**
 * Fiche d'un événement (/evenements/:slug), lot 7.9 : reproduction de la structure de la référence
 * (docs/references/evenement/, captures rtg-01 à rtg-11), aux couleurs WAHHF, section par section :
 * hero, compte à rebours (ou « C'était le … »), organisateurs, bandeau des six domaines, pourquoi venir, déroulé,
 * activités, programme en un coup d'œil, soutenir l'événement, pour les parents, FAQ, dernières actualités, appel final.
 * Chaque section ne s'affiche que si ses données existent (textes « TODO » masqués en ligne, src/lib/events.ts).
 * Mouvement (étape 3) : keyframes CSS (src/styles/events-motion.css), apparitions groupées (RevealBatch,
 * data-reveal="ev"), frise remplie au défilement (EventsFrise) ; boucles arrêtées hors de l'écran, onglet caché ou par le
 * bouton du hero (motion.tsx).
 */
function EventSheet({ event }: { event: Event }) {
  const { t } = useTranslation();
  const status = eventStatus(event);
  const photosHref = status === 'passe' && event.galerieAlbum ? `/galerie?album=${event.galerieAlbum}` : null;
  const scheduleShown = shownItems(event.deroule, (s) => [s.heure, s.titre, s.texte]).length > 0;
  const programShown = shownItems(event.tempsForts, (c) => [c.titre, c.texte]).length > 0;
  // « Voir le programme » mène au programme en un coup d'œil (votre brief), à défaut au déroulé
  const programAnchor = programShown ? '#programme' : scheduleShown ? '#deroule' : null;
  const plainTitle = event.nom ?? event.titre.replace(/\n/g, ' ');
  const root = useRef<HTMLDivElement>(null);
  const loops = useLoopControl(root);

  return (
    <div ref={root} className={cn('ev', loops.paused && 'ev-pause')}>
      <SEO title={plainTitle} description={t('events.seo.eventDescription', { title: plainTitle })} />
      <Hero
        event={event}
        status={status}
        programAnchor={programAnchor}
        photosHref={photosHref}
        controls={<PauseButton paused={loops.paused} onToggle={loops.toggle} />}
      />
      <Countdown event={event} status={status} photosHref={photosHref} />
      <Organizers event={event} />
      <Ticker words={event.bandeau} />
      <Why event={event} />
      <Schedule event={event} />
      <Activities event={event} />
      <Program event={event} status={status} scheduleShown={scheduleShown} />
      <Support event={event} />
      <Parents event={event} />
      <Faq event={event} />
      <LatestNews event={event} />
      <FinalCta event={event} status={status} photosHref={photosHref} />
      {scheduleShown && (
        <AfterFirstDisplay>
          <EventsFrise scope={root} />
        </AfterFirstDisplay>
      )}
    </div>
  );
}

export default function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const event = eventBySlug(slug);

  if (!event) {
    return (
      <NotFoundPage title={t('events.notFound.title')} message={t('events.notFound.text')}>
        <NotFoundLinks
          heading={t('events.list.title')}
          links={[{ to: '/evenements', label: t('events.list.title') }, ...EVENTS.map((e) => ({ to: `/evenements/${e.slug}`, label: e.titre.replace(/\n/g, ' ') }))]}
        />
      </NotFoundPage>
    );
  }
  return <EventSheet key={event.slug} event={localizeEvent(event, i18n.language)} />;
}
