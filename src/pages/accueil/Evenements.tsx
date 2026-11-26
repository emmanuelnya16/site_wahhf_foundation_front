import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Photo from '../../components/wahhf/Photo';
import type { Event } from '../../data/events';
import { eventPhoto, localizeEvent, pastEvents, upcomingEvents } from '../../lib/events';
import { CarteEvenement, CarteSansEvenement, lieuDe, partieDate } from './CarteEvenement';
import Entree from './Entree';
import Lignes from './Lignes';

const delai = (s: number) => ({ '--delai': `${s}s` }) as CSSProperties;

/** Un événement passé, en ticket : date en colonne, titre, lieu, flèche, petite photo ronde ; lien vers sa fiche */
function Ticket({ event, lang, rang }: { event: Event; lang: string; rang: number }) {
  const { t } = useTranslation();
  const titre = event.nom ?? event.titre.replace(/\n/g, ' ');
  const photo = eventPhoto(event.photoHero);
  return (
    <li className="ac-ev-ticket-place" style={{ '--rang': rang } as CSSProperties}>
      <Link to={`/evenements/${event.slug}`} className="ac-ev-ticket" aria-label={t('accueil.evenements.voir', { titre })}>
        <span className="ac-ev-ticket-date" aria-hidden="true">
          <b>{partieDate(event, lang, { day: 'numeric' }) ?? '–'}</b>
          <span>{partieDate(event, lang, { month: 'short' })}</span>
          <span>{partieDate(event, lang, { year: 'numeric' })}</span>
        </span>
        <span className="ac-ev-ticket-corps">
          <span className="ac-ev-ticket-titre">{titre}</span>
          <span className="ac-ev-ticket-lieu">{lieuDe(event, t('events.faits.villeBientot'))}</span>
          <ArrowRight aria-hidden="true" className="ac-fleche" />
        </span>
        {photo && (
          <span className="ac-ev-ticket-photo">
            <Photo photo={photo} sizes="5rem" fit="cover" radius="none" decorative />
          </span>
        )}
      </Link>
    </li>
  );
}

/**
 * 9. Événements (lot 11.6), sur brume : au plus trois rendez-vous de src/data/events.ts. Le prochain à venir en grande
 * carte (CarteEvenement), puis les plus récents des passés en tickets. Aucun à venir : la carte invite à être prévenu.
 * Entrées en CSS (Entree) : la carte se pose, sa page d'éphéméride se rabat, les tickets arrivent de la droite.
 */
export default function Evenements({ paused }: { paused: boolean }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const prochain = upcomingEvents()[0];
  const passes = pastEvents()
    .slice(0, prochain ? 2 : 3)
    .map((e) => localizeEvent(e, lang));

  return (
    <section id="evenements" className="ac-evenements" aria-labelledby="ac-evenements-titre">
      <div className="container-page">
        <Entree className="ac-ev-entete">
          <p className="ac-surtitre ac-app">{t('events.list.title')}</p>
          <h2 id="ac-evenements-titre" className="ac-h2">
            <Lignes lignes={t('accueil.evenements.titre', { returnObjects: true }) as string[]} />
          </h2>
          <p className="ac-paragraphe ac-app" style={delai(0.3)}>
            {t('accueil.evenements.intro')}
          </p>
        </Entree>
        <Entree className={passes.length ? 'ac-ev-grille' : 'ac-ev-grille ac-ev-grille-seule'}>
          {prochain ? <CarteEvenement event={localizeEvent(prochain, lang)} paused={paused} /> : <CarteSansEvenement />}
          {passes.length > 0 && (
            <div className="ac-ev-passes">
              <h3 className="ac-ev-passes-titre">{t('events.list.past')}</h3>
              <ul className="ac-ev-tickets">
                {passes.map((e, i) => (
                  <Ticket key={e.slug} event={e} lang={lang} rang={i} />
                ))}
              </ul>
            </div>
          )}
        </Entree>
        <Link to="/evenements" className="ac-lien ac-ev-tous">
          <span>{t('accueil.evenements.lien')}</span>
          <ArrowRight aria-hidden="true" className="ac-fleche" />
        </Link>
      </div>
    </section>
  );
}
