import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../../components/wahhf/SEO';
import { ReadingColumn } from '../../components/wahhf/TextList';
import PageHeader, { PageMeta, PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import DisclaimerBanner from '../../components/wahhf/DisclaimerBanner';
import { THEMATIC_GUIDES } from '../../services/api';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';

/** Guide thématique (/accompagnement/:topicSlug), dont « Éviter les arnaques » (venu de EuropeSupport.tsx, vue 2). */
export default function GuidePage() {
  const { topicSlug = '' } = useParams<{ topicSlug?: string }>();

  // Guide inconnu : message dédié et liste des guides, au lieu de la page générale
  if (!THEMATIC_GUIDES[topicSlug]) {
    return (
      <NotFoundPage
        title="Ce guide d’accompagnement n’existe pas"
        message="Le lien a peut-être été mal copié. Voici les guides disponibles pour préparer votre projet vers l’Europe."
      >
        <NotFoundLinks
          heading="Les guides d’accompagnement"
          links={Object.entries(THEMATIC_GUIDES).map(([slug, g]) => ({ to: `/accompagnement/${slug}`, label: g.title }))}
        />
      </NotFoundPage>
    );
  }

  const guide = THEMATIC_GUIDES[topicSlug];

  return (
    <>
      <SEO
        title={`${guide.title} — Accompagnement gratuit vers l'Europe`}
        description={guide.subtitle}
      />

      <PageHeader>
        <PageMeta>
          <Link to="/mobilite-langues">
            Mobilité & Langues
          </Link>
          <span>/</span>
          <Link to="/mobilite-langues/accompagnement">
            Accompagnement Europe
          </Link>
          <span>/</span>
          <span>{guide.title}</span>
        </PageMeta>

        <PageTitle>
          {guide.title}
        </PageTitle>
        <PageIntro>
          {guide.subtitle}
        </PageIntro>
      </PageHeader>

      <section className="container-page *:max-w-5xl">
        <DisclaimerBanner />
      </section>

      <section className="container-page section-space space-y-12">
        {/* Colonne de lecture de 65 caractères (contrat §8) : sections sans carte ni filigrane (liste §6, EuropeSupport:363) */}
        <ReadingColumn as="article">
          {guide.sections.map((sec) => (
            <Fragment key={sec.heading}>
              <h2>{sec.heading}</h2>
              <p>{sec.body}</p>
              {sec.bullets && (
                <ul>
                  {sec.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
            </Fragment>
          ))}
        </ReadingColumn>

        {/* Navigation entre les 5 guides thématiques */}
        <div className="surface-green rounded-card bg-nuit text-text-on-inverse p-7 sm:p-9 space-y-5">
          <h3 className="text-body font-semibold text-text-on-inverse">
            Tous nos guides thématiques gratuits
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {Object.values(THEMATIC_GUIDES).map((g) => (
              <Link
                key={g.slug}
                to={`/accompagnement/${g.slug}`}
                className={`px-4 py-2 rounded-pill text-xs sm:text-sm font-medium transition-colors ${
                  g.slug === guide.slug
                    ? 'border border-or bg-or text-v1-encre font-semibold'
                    : 'border border-border-on-inverse text-creme hover:bg-white/10'
                }`}
              >
                {g.title}
              </Link>
            ))}
          </div>
          <div className="pt-3 flex flex-wrap gap-4">
            <PrimaryButton
              to="/candidater"
              onInverse
            >
              Demander un accompagnement gratuit
            </PrimaryButton>
            <SecondaryButton to="/mobilite-langues/accompagnement" onInverse>
              Retour aux 10 pays accompagnés
            </SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
