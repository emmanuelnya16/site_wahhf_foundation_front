import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Check, Plus, X } from 'lucide-react';
import type { Event, EventStatus } from '../../data/events';
import Photo from '../../components/wahhf/Photo';
import { imageSrcSet } from '../../services/api';
import { PUBLISHED_NEWS, confirmedDate } from '../../lib/news';
import { eventDate, eventPhoto, isShown, shownItems } from '../../lib/events';
import { EvButton } from './ui';

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
  return (
    <section className="ev-section" aria-labelledby="ev-parents">
      <div className="ev-container ev-parents">
        <div className="grid gap-5">
          <p className="ev-eyebrow">{t('events.parents.eyebrow')}</p>
          <h2 id="ev-parents" className="ev-h2 max-w-[14ch]">
            {t('events.parents.title')}
          </h2>
          <p className="ev-lead">{t('events.parents.text')}</p>
          {photo && (
            <div className="ev-parents-photo mt-4">
              <Photo photo={photo} sizes="(min-width: 1024px) 36rem, calc(100vw - 2.5rem)" fit="cover" radius="none" />
            </div>
          )}
        </div>
        <div className="ev-engagements">
          {promises.length > 0 && (
            <div className="ev-engagement is-promesse">
              <h3>{t('events.parents.promises')}</h3>
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
            <div className="ev-engagement is-jamais">
              <h3>{t('events.parents.never')}</h3>
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
  const { t } = useTranslation();
  const items = shownItems(event.faq, (f) => [f.question, f.reponse]).slice(0, 6);
  if (!items.length) return null;
  return (
    <section className="ev-section ev-alt" aria-labelledby="ev-faq">
      <div className="ev-container ev-faq">
        <div className="grid justify-items-start gap-5">
          <p className="ev-eyebrow">{t('events.faq.eyebrow')}</p>
          <h2 id="ev-faq" className="ev-h2 max-w-[12ch]">
            {t('events.faq.title')}
          </h2>
          <p className="ev-lead">{t('events.faq.text')}</p>
          <EvButton to="/contact" variant="contour" arrow className="mt-2">
            {t('events.faq.action')}
          </EvButton>
        </div>
        <div className="ev-faq-carte">
          {items.map((f) => (
            <details key={f.question}>
              <summary>
                <span>{f.question}</span>
                <span className="ev-plus" aria-hidden="true">
                  <Plus className="h-5 w-5" />
                </span>
              </summary>
              <p className="ev-faq-reponse ev-text">{f.reponse}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Dernières actualités : trois cartes de la page Actualités (articles publiés seulement) */
export function LatestNews() {
  const { t } = useTranslation();
  const articles = PUBLISHED_NEWS.slice(0, 3);
  if (!articles.length) return null;
  return (
    <section className="ev-section" aria-labelledby="ev-actualites">
      <div className="ev-container">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="grid gap-5">
            <p className="ev-eyebrow">{t('events.news.eyebrow')}</p>
            <h2 id="ev-actualites" className="ev-h2">
              {t('events.news.title')}
            </h2>
          </div>
          <EvButton to="/actualites" variant="contour" arrow>
            {t('events.news.all')}
          </EvButton>
        </div>
        <ul className="ev-grille-3">
          {articles.map((a) => {
            const date = confirmedDate(a.date);
            return (
              <li key={a.slug} className="ev-article ev-carte-lien ev-carte-lift">
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
        </ul>
      </div>
    </section>
  );
}

/**
 * Appel final (référence : rtg-11) : bloc soleil (rayon 40 px), date en surtitre, h2, phrase, bouton nuit plein et
 * bouton contour ; photo penchée de -2deg dans un cadre brume. Confettis à l'étape 3.
 */
export function FinalCta({ event, status, photosHref, decor }: { event: Event; status: EventStatus; photosHref: string | null; decor?: React.ReactNode }) {
  const { t, i18n } = useTranslation();
  const upcoming = status === 'a-venir';
  const register = upcoming && isShown(event.lienInscription) ? event.lienInscription : null;
  const primary = upcoming ? register : photosHref;
  const photo = eventPhoto(event.photoFinale);
  return (
    <section className="ev-section pt-0" aria-labelledby="ev-final">
      <div className="ev-container">
        <div className="ev-final ev-on-soleil">
          {decor}
          <div className="relative grid justify-items-start gap-6">
            <p className="ev-label">{eventDate(event, i18n.language)}</p>
            <h2 id="ev-final" className="ev-h2 max-w-[14ch]">
              {upcoming ? t('events.final.titleUpcoming') : t('events.final.titlePast')}
            </h2>
            <p className="ev-final-texte">{upcoming ? t('events.final.textUpcoming') : t('events.final.textPast')}</p>
            <div className="flex flex-wrap gap-4">
              {primary && (
                <EvButton to={primary} variant="nuit" arrow>
                  {upcoming ? t('events.hero.register') : t('events.hero.photos')}
                </EvButton>
              )}
              <EvButton to="/contact" variant="contour">
                {t('events.final.write')}
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
