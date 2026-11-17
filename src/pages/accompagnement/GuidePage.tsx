import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { ReadingColumn } from '../../components/wahhf/TextList';
import PageHeader, { PageBreadcrumb, PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import DisclaimerBanner from '../../components/wahhf/DisclaimerBanner';
import Section from '../../components/wahhf/Section';
import FilSteps from '../../components/wahhf/FilSteps';
import { THEMATIC_GUIDES } from '../../services/api';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';
import { ACCOMPANIMENT_STEPS, filSteps } from './steps';

/*
 * Guide d'une étape de l'accompagnement (/accompagnement/:topicSlug), groupe 7.4 : les guides sont les 5 étapes de la
 * page Accompagnement (ACCO-02).
 * - En-tête du lot 5 révélé comme le hero, avec « Étape N sur 5 » et l'avertissement anti-arnaque juste sous le titre.
 * - Le texte du guide en colonne de lecture (inchangé).
 * - Fin de page sur sauge, sans carte nuit au-dessus du footer : les 5 étapes (l'étape affichée marquée, sans le fil :
 *   il reste propre à la page Accompagnement) et une seule action, « Être accompagné ».
 * Guide inconnu : page « introuvable » avec la liste des guides (ETA-06).
 */
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
  const stepIndex = ACCOMPANIMENT_STEPS.findIndex((s) => s.slug === guide.slug);

  return (
    <Fragment key={guide.slug}>
      <SEO
        title={`${guide.title} — Accompagnement gratuit vers l'Europe`}
        description={guide.subtitle}
      />

      <PageHeader reveal notice={<DisclaimerBanner compact={guide.slug === 'eviter-les-arnaques'} />}>
        <PageBreadcrumb
          items={[
            { label: 'Mobilité & Langues', to: '/mobilite-langues' },
            { label: 'Accompagnement vers l’Europe', to: '/mobilite-langues/accompagnement' },
            { label: guide.title },
          ]}
        />
        {stepIndex >= 0 && (
          <p className="text-meta text-text-secondary">
            Étape {stepIndex + 1} sur {ACCOMPANIMENT_STEPS.length} de l’accompagnement
          </p>
        )}
        <PageTitle>{guide.title}</PageTitle>
        <PageIntro>{guide.subtitle}</PageIntro>
      </PageHeader>

      <Section>
        <div className="container-page">
          {/* Colonne de lecture de 65 caractères (contrat §8) : sections sans carte ni filigrane */}
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
        </div>
      </Section>

      {/* Fin de page : les 5 étapes, puis une seule action ; sur sauge, sans carte nuit au-dessus du footer */}
      <Section tone="sauge">
        <div className="container-page space-y-10">
          <SectionHeader title="Les 5 étapes de l’accompagnement" />
          <FilSteps steps={filSteps(false)} currentId={guide.slug} withFil={false} />
          <PrimaryButton to="/candidater?souhait=accompagnement_europe" size="lg">
            Être accompagné
          </PrimaryButton>
        </div>
      </Section>
    </Fragment>
  );
}
