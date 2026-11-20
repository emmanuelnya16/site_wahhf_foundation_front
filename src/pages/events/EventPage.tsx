import './i18n';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';
import { EVENTS } from '../../data/events';
import { eventBySlug, eventDate, eventHours } from '../../lib/events';

/**
 * Fiche d'un événement (/evenements/:slug), lot 7.9. Étape 1 : titre, date, lieu (le design vient à l'étape 2).
 */
export default function EventPage() {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
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

  return (
    <>
      <SEO title={event.titre} description={t('events.seo.eventDescription', { title: event.titre })} />
      <section className="section-space container-page space-y-4">
        <h1 className="text-page-title font-semibold">{event.titre}</h1>
        <p className="text-body">{event.accroche}</p>
        <p className="text-meta text-text-secondary">
          {eventDate(event, i18n.language)} · {eventHours(event, i18n.language)} · {event.lieu}
        </p>
      </section>
    </>
  );
}
