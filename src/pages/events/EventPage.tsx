import './i18n';
import '../../styles/events.css';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';
import { EVENTS, type Event } from '../../data/events';
import { eventBySlug, eventStatus, shownItems } from '../../lib/events';
import Hero from './Hero';
import Countdown from './Countdown';
import { Activities, Organizers, Schedule, Ticker, Why } from './Sections';
import { Program, Support } from './Program';
import { Faq, FinalCta, LatestNews, Parents } from './Families';

/**
 * Fiche d'un événement (/evenements/:slug), lot 7.9 : reproduction de la structure de la référence
 * (docs/references/evenement/, captures rtg-01 à rtg-11), aux couleurs WAHHF, section par section :
 * hero, compte à rebours (ou « C'était le … »), organisateurs, bandeau des six domaines, pourquoi venir, déroulé,
 * activités, programme en un coup d'œil, soutenir l'événement, pour les parents, FAQ, dernières actualités, appel final.
 * Chaque section ne s'affiche que si ses données existent (textes « TODO » masqués en ligne, src/lib/events.ts).
 * Mouvement : étape 3 (src/styles/events-motion.css).
 */
function EventSheet({ event }: { event: Event }) {
  const { t } = useTranslation();
  const status = eventStatus(event);
  const photosHref = status === 'passe' && event.galerieAlbum ? `/galerie?album=${event.galerieAlbum}` : null;
  const scheduleShown = shownItems(event.deroule, (s) => [s.heure, s.titre, s.texte]).length > 0;
  const programShown = shownItems(event.tempsForts, (c) => [c.titre, c.texte]).length > 0;
  const programAnchor = scheduleShown ? '#deroule' : programShown ? '#programme' : null;

  return (
    <div className="ev">
      <SEO title={event.titre} description={t('events.seo.eventDescription', { title: event.titre })} />
      <Hero event={event} status={status} programAnchor={programAnchor} photosHref={photosHref} />
      <Countdown event={event} status={status} photosHref={photosHref} />
      <Organizers event={event} />
      <Ticker />
      <Why event={event} />
      <Schedule event={event} />
      <Activities event={event} />
      <Program event={event} status={status} scheduleShown={scheduleShown} />
      <Support />
      <Parents event={event} />
      <Faq event={event} />
      <LatestNews />
      <FinalCta event={event} status={status} photosHref={photosHref} />
    </div>
  );
}

export default function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const event = eventBySlug(slug);

  if (!event) {
    return (
      <NotFoundPage title={t('events.notFound.title')} message={t('events.notFound.text')}>
        <NotFoundLinks
          heading={t('events.list.title')}
          links={[{ to: '/evenements', label: t('events.list.title') }, ...EVENTS.map((e) => ({ to: `/evenements/${e.slug}`, label: e.titre }))]}
        />
      </NotFoundPage>
    );
  }
  return <EventSheet key={event.slug} event={event} />;
}
