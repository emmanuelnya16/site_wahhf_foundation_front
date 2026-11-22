import { ReactNode } from 'react';
import PageHeader, { PageMeta, PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import { photoCaption, photoOrFallback } from '../lib/photos';

/**
 * Photo (lot 7.6) : un lac de cratère vu d'en haut, « on s'est perdus en route » (texte à valider avec la fondation,
 * docs/contenus-a-fournir.md).
 */
const LOST_PHOTO = photoOrFallback('B40', 'B85');
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/wahhf/SEO';
import { LinkList, LINK_ROW_CLASS } from '../components/wahhf/TextList';
import { PrimaryButton, SecondaryButton, DonateButton } from '../components/wahhf/Buttons';
import { useNoIndex } from '../lib/useNoIndex';
import { COUNTRIES_DATA } from '../services/api';
import i18n from '../i18n';
import { useLocalize, localized } from '../lib/localize';

/** Liste de liens propre à un contexte (les 10 pays, les niveaux, les articles…). */
export function NotFoundLinks({ heading, links }: { heading: string; links: Array<{ to: string; label: string }> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-section-title text-text">{heading}</h2>
      <LinkList>
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className={LINK_ROW_CLASS}>
              <span>{l.label}</span>
            </Link>
          </li>
        ))}
      </LinkList>
    </div>
  );
}

/** Les 10 pays accompagnés : le cas le plus fréquent d'un lien mal copié depuis WhatsApp. Sans drapeau emoji, qui
 *  s'affiche en lettres sous Windows et se lit « drapeau Allemagne Allemagne » (audit T-22, groupe 7.4). */
export const countryLinks = () =>
  COUNTRIES_DATA.map((c) => localized(c, `contenu.pays.${c.slug}`)).map((c) => ({
    to: `/accompagnement/pays/${c.slug}`,
    label: c.isEU ? c.name : i18n.t('notFound.countryNonEu', { name: c.name }),
  }));
/** Liste en français, gardée pour les pages qui l'importent encore ; lot 7.10 : countryLinks(), dans la langue */
export const COUNTRY_LINKS = countryLinks();

/**
 * Page « introuvable » : adresse inconnue, ou paramètre inconnu (pays, niveau, article, guide).
 * Elle n'est jamais indexée (noindex) et dit clairement ce qui se passe, au lieu d'afficher un autre contenu.
 * Le statut HTTP 404 dépend de l'hébergement : voir public/.htaccess.
 */
export default function NotFoundPage({
  title,
  message,
  children,
}: {
  title?: string;
  message?: ReactNode;
  /** Liens propres au contexte, affichés avant les liens généraux. */
  children?: ReactNode;
}) {
  useNoIndex();
  const { pathname } = useLocation();
  const { t } = useLocalize();

  return (
    <>
      <SEO title={t('notFound.seoTitle')} description={t('notFound.seoDescription')} />

      <PageHeader
        catalogPhoto={LOST_PHOTO}
        photoCaption={LOST_PHOTO ? `${t('notFound.lost')} ${photoCaption(LOST_PHOTO)}` : undefined}
      >
        <PageMeta>
          <span>{t('notFound.meta')}</span>
        </PageMeta>
        <PageTitle>{title ?? t('notFound.title')}</PageTitle>
        <PageIntro>
          {message ?? (
            <>{t('notFound.message', { path: pathname })}</>
          )}
        </PageIntro>
      </PageHeader>

      <section className="container-page *:max-w-4xl section-space space-y-12">
        {children ?? <NotFoundLinks heading={t('notFound.countries')} links={countryLinks()} />}

        <div className="space-y-4">
          <h2 className="font-serif font-normal text-2xl text-text">{t('notFound.where')}</h2>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton to="/candidater">{t('nav.mega.apply')}</PrimaryButton>
            <DonateButton />
            <SecondaryButton to="/">{t('notFound.home')}</SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
