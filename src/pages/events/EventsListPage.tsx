import './i18n';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import { eventDate, pastEvents, upcomingEvents } from '../../lib/events';

/**
 * Liste des événements (/evenements), lot 7.9. Étape 1 : la liste, sans mise en forme (le design vient à l'étape 2).
 */
export default function EventsListPage() {
  const { t, i18n } = useTranslation();
  const upcoming = upcomingEvents();
  const past = pastEvents();
  return (
    <>
      <SEO title={t('events.seo.listTitle')} description={t('events.seo.listDescription')} />
      <section className="section-space container-page space-y-8">
        <h1 className="text-page-title font-semibold">{t('events.list.title')}</h1>
        <p className="max-w-[65ch] text-body text-text-secondary">{t('events.list.intro')}</p>
        <h2 className="text-section-title font-semibold">{t('events.list.upcoming')}</h2>
        {upcoming.length > 0 ? (
          <ul>
            {upcoming.map((e) => (
              <li key={e.slug}>
                <Link to={`/evenements/${e.slug}`} className="text-link underline">{e.titre}</Link> — {eventDate(e, i18n.language)}
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {t('events.list.none')} <Link to="/contact" className="text-link underline">{t('events.list.noneAction')}</Link>
          </p>
        )}
        {past.length > 0 && (
          <>
            <h2 className="text-section-title font-semibold">{t('events.list.past')}</h2>
            <ul>
              {past.map((e) => (
                <li key={e.slug}>
                  <Link to={`/evenements/${e.slug}`} className="text-link underline">{e.titre}</Link> — {eventDate(e, i18n.language)}
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
}
