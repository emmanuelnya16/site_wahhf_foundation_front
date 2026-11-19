import { ReactNode } from 'react';
import PageHeader, { PageMeta, PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../components/wahhf/SEO';
import { LinkList, LINK_ROW_CLASS } from '../components/wahhf/TextList';
import { PrimaryButton, SecondaryButton, DonateButton } from '../components/wahhf/Buttons';
import { useNoIndex } from '../lib/useNoIndex';
import { COUNTRIES_DATA } from '../services/api';

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
export const COUNTRY_LINKS = COUNTRIES_DATA.map((c) => ({
  to: `/accompagnement/pays/${c.slug}`,
  label: `${c.name}${c.isEU ? '' : ' (hors Union européenne)'}`,
}));

/**
 * Page « introuvable » : adresse inconnue, ou paramètre inconnu (pays, niveau, article, guide).
 * Elle n'est jamais indexée (noindex) et dit clairement ce qui se passe, au lieu d'afficher un autre contenu.
 * Le statut HTTP 404 dépend de l'hébergement : voir public/.htaccess.
 */
export default function NotFoundPage({
  title = 'Cette page n’existe pas ou a changé d’adresse',
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

  return (
    <>
      <SEO title="Page introuvable" description="Cette adresse ne correspond à aucune page du site WAHHF Foundation." />

      <PageHeader>
        <PageMeta>
          <span>Page introuvable (erreur 404)</span>
        </PageMeta>
        <PageTitle>{title}</PageTitle>
        <PageIntro>
          {message ?? (
            <>
              L’adresse « {pathname} » ne correspond à aucune page du site. Le lien a peut-être été mal copié ou
              la page a été déplacée.
            </>
          )}
        </PageIntro>
      </PageHeader>

      <section className="container-page *:max-w-4xl section-space space-y-12">
        {children ?? <NotFoundLinks heading="Les 10 pays accompagnés" links={COUNTRY_LINKS} />}

        <div className="space-y-4">
          <h2 className="font-serif font-normal text-2xl text-text">Où aller maintenant{' '}?</h2>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton to="/candidater">Candidater gratuitement</PrimaryButton>
            <DonateButton />
            <SecondaryButton to="/">Retour à l’accueil</SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
