import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import type { Event, EventStatus } from '../../data/events';
import Photo from '../../components/wahhf/Photo';
import { imageSrcSet } from '../../services/api';
import { PUBLISHED_NEWS, confirmedDate, localizedNews } from '../../lib/news';
import { eventDate, eventPhoto, fillFacts, isShown, shownItems } from '../../lib/events';
import { EvButton, ICONS, Lines } from './ui';
import { RegisterAction } from './Hero';
import { cn } from '../../lib/utils';
import { Confetti } from './motion';

/**
 * Pour les parents (référence : rtg-09) : titre, phrase et photo à gauche ; à droite, « Nos engagements » (coches soleil)
 * et « Ce que nous ne promettrons jamais » (croix forêt). Textes à faire valider par la fondation (TODO).
 */
export function Parents({ event }: { event: Event }) {
  const { t } = useTranslation();
  const promises = event.parents.promesses.filter((p) => isShown(p));
  const never = event.parents.jamais.filter((p) => isShown(p));
  if (!promises.length && !never.length) return null;
  const photo = eventPhoto(event.photoParents);
  const head = event.sections?.parents;
  return (
    <section className="ev-section" aria-labelledby="ev-parents">
      <div className="ev-container ev-parents">
        <div className="grid gap-5" data-reveal="ev">
          <p className="ev-eyebrow">{head?.surtitre ?? t('events.parents.eyebrow')}</p>
          <h2 id="ev-parents" className={cn('ev-h2', !head?.titre?.includes('\n') && 'max-w-[14ch]')}>
            <Lines text={head?.titre ?? t('events.parents.title')} />
          </h2>
          <p className="ev-lead">{head?.intro ?? t('events.parents.text')}</p>
          {photo && (
            <div className="ev-parents-photo mt-4">
              <Photo photo={photo} sizes="(min-width: 1024px) 36rem, calc(100vw - 2.5rem)" fit="cover" radius="none" />
            </div>
          )}
        </div>
        <div className="ev-engagements">
          {promises.length > 0 && (
            <div className="ev-engagement is-promesse" data-reveal="ev">
              <h3>{event.parents.titrePromesses ?? t('events.parents.promises')}</h3>
              <ul>
                {promises.map((p) => (
                  <li key={p}>
                    <span className="ev-coche" aria-hidden="true">
                      <Check strokeWidth={3} />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {never.length > 0 && (
            <div className="ev-engagement is-jamais" data-reveal="ev">
              <h3>{event.parents.titreJamais ?? t('events.parents.never')}</h3>
              <ul>
                {never.map((p) => (
                  <li key={p}>
                    <span className="ev-croix" aria-hidden="true">
                      <X strokeWidth={3} />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** FAQ (référence : rtg-10) : texte et bouton contour à gauche ; à droite, une carte de six questions dépliables */
export function Faq({ event }: { event: Event }) {
  const { t, i18n } = useTranslation();
  const items = shownItems(event.faq, (f) => [f.question, f.reponse]).slice(0, 6);
  if (!items.length) return null;
  const head = event.sections?.faq;
  return (
    <section className="ev-section ev-alt" aria-labelledby="ev-faq">
      <div className="ev-container ev-faq">
        <div className="grid justify-items-start gap-5" data-reveal="ev">
          <p className="ev-eyebrow">{head?.surtitre ?? t('events.faq.eyebrow')}</p>
          <h2 id="ev-faq" className={cn('ev-h2', !head?.titre?.includes('\n') && 'max-w-[12ch]')}>
            <Lines text={head?.titre ?? t('events.faq.title')} />
          </h2>
          <p className="ev-lead">{head?.intro ?? t('events.faq.text')}</p>
          <EvButton to="/contact" variant="contour" arrow className="mt-2">
            {head?.action ?? t('events.faq.action')}
          </EvButton>
        </div>
        <div className="ev-faq-carte" data-reveal="ev">
          {items.map((f) => (
            <details key={f.question}>
              <summary>
                <span>{f.question}</span>
                <span className="ev-plus" aria-hidden="true">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="ev-faq-reponse ev-text">{fillFacts(f.reponse, event, t, i18n.language)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Dernières actualités / « À lire avant de partir » (référence : 3 cartes d'articles) : les articles publiés de la page
 * Actualités, complétés jusqu'à 3 par les guides du site propres à l'événement (titre, une phrase, lien).
 */
export function LatestNews({ event }: { event: Event }) {
  const { t, i18n } = useTranslation();
  // Lot 7.10 : articles dans la langue de l'interface (la rubrique française reste dans les données)
  const articles = PUBLISHED_NEWS.slice(0, 3).map((a) => localizedNews(a, i18n.language));
  const guides = (event.blog ?? []).slice(0, Math.max(0, 3 - articles.length));
  if (!articles.length && !guides.length) return null;
  const head = event.sections?.blog;
  return (
    <section className="ev-section" aria-labelledby="ev-actualites">
      <div className="ev-container">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6" data-reveal="ev">
          <div className="grid gap-5">
            <p className="ev-eyebrow">{head?.surtitre ?? t('events.news.eyebrow')}</p>
            <h2 id="ev-actualites" className="ev-h2">
              <Lines text={head?.titre ?? t('events.news.title')} />
            </h2>
          </div>
          <EvButton to="/actualites" variant="contour" arrow>
            {t('events.news.all')}
          </EvButton>
        </div>
        <ul className="ev-grille-3">
          {articles.map((a) => {
            const date = confirmedDate(a.date, i18n.language);
            return (
              <li key={a.slug} className="ev-article ev-carte-lien ev-carte-lift" data-reveal="ev">
                <div className="ev-article-image">
                  <img src={a.image} srcSet={imageSrcSet(a.image)} sizes="(min-width: 768px) 24rem, 100vw" alt="" width={600} height={375} loading="lazy" decoding="async" />
                </div>
                <div className="ev-article-corps">
                  <p className="ev-label text-[var(--ev-texte-doux)]">
                    {a.category}
                    {date && <> · {date}</>}
                  </p>
                  <h3 className="ev-h3">
                    <Link to={`/actualites/${a.slug}`} className="ev-lien-carte">
                      {a.title}
                    </Link>
                  </h3>
                  <p className="ev-text">{a.excerpt}</p>
                </div>
              </li>
            );
          })}
          {guides.map((g, i) => {
            const Icon = ICONS[g.icon];
            return (
              <li key={g.to + g.titre} className={`ev-article ev-article-guide ev-carte-lien ev-carte-lift is-${['nuit', 'foret', 'soleil'][i % 3]}`} data-reveal="ev">
                <div className="ev-article-image ev-article-aplat" aria-hidden="true">
                  <Icon strokeWidth={1.25} />
                </div>
                <div className="ev-article-corps">
                  <p className="ev-label text-[var(--ev-texte-doux)]">{g.surtitre}</p>
                  <h3 className="ev-h3">
                    <Link to={g.to} className="ev-lien-carte">
                      {g.titre}
                    </Link>
                  </h3>
                  <p className="ev-text">{g.texte}</p>
                  <span className="ev-link" aria-hidden="true">
                    {g.lien}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * Appel final (référence : rtg-11) : bloc soleil (rayon 40 px), date en surtitre, h2, phrase, bouton nuit plein et
 * bouton contour ; photo penchée de -2deg dans un cadre brume. Confettis à l'étape 3.
 */
export function FinalCta({ event, status, photosHref }: { event: Event; status: EventStatus; photosHref: string | null }) {
  const { t, i18n } = useTranslation();
  const upcoming = status === 'a-venir';
  const register = upcoming && isShown(event.lienInscription) ? event.lienInscription : null;
  const photo = eventPhoto(event.photoFinale);
  const head = event.sections?.final;
  return (
    <section className="ev-section pt-0" aria-labelledby="ev-final" data-ev-zone="">
      <div className="ev-container">
        <div className="ev-final ev-on-soleil" data-reveal="ev">
          <Confetti />
          <div className="relative grid justify-items-start gap-6">
            <p className="ev-label">{eventDate(event, i18n.language) ?? t('events.faits.dateBientot')}</p>
            <h2 id="ev-final" className={cn('ev-h2', !head?.titre?.includes('\n') && 'max-w-[14ch]')}>
              <Lines text={head?.titre ?? (upcoming ? t('events.final.titleUpcoming') : t('events.final.titlePast'))} />
            </h2>
            <p className="ev-final-texte">
              {head?.intro ? fillFacts(head.intro, event, t, i18n.language) : upcoming ? t('events.final.textUpcoming') : t('events.final.textPast')}
            </p>
            <div className="flex flex-wrap gap-4">
              {upcoming ? (
                <RegisterAction href={register} label={head?.action ?? t('events.hero.register')} variant="nuit" />
              ) : (
                photosHref && (
                  <EvButton to={photosHref} variant="nuit" arrow>
                    {t('events.hero.photos')}
                  </EvButton>
                )
              )}
              <EvButton to="/contact" variant="contour">
                {head?.action2 ?? t('events.final.write')}
              </EvButton>
            </div>
          </div>
          {photo && (
            <div className="ev-final-photo">
              <Photo photo={photo} sizes="(min-width: 1024px) 27rem, calc(100vw - 4rem)" fit="cover" radius="none" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
