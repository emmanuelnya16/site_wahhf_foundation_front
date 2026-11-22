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
import { useLocalize } from '../../lib/localize';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';
import { ACCOMPANIMENT_STEPS, filSteps } from './steps';
import { pieces } from './i18n';

/*
 * Guide d'une étape de l'accompagnement (/accompagnement/:topicSlug), groupe 7.4 : les guides sont les 5 étapes de la
 * page Accompagnement (ACCO-02).
 * - En-tête du lot 5 révélé comme le hero, avec « Étape N sur 5 » et l'avertissement anti-arnaque juste sous le titre.
 * - Le texte du guide en colonne de lecture (inchangé).
 * - Fin de page sur sauge, sans carte nuit au-dessus du footer : les 5 étapes (l'étape affichée marquée, sans le fil :
 *   il reste propre à la page Accompagnement) et une seule action, « Être accompagné ».
 * Guide inconnu : page « introuvable » avec la liste des guides (ETA-06).
 * Lot 7.10 : textes du paquet « accompagnement » ; le guide dans la langue en cours (accompagnement.contenu.guides.<slug>).
 */
export default function GuidePage() {
  const { topicSlug = '' } = useParams<{ topicSlug?: string }>();
  const { t, localized } = useLocalize();
  const guideKey = (slug: string) => `accompagnement.contenu.guides.${slug}`;

  // Guide inconnu : message dédié et liste des guides, au lieu de la page générale
  if (!THEMATIC_GUIDES[topicSlug]) {
    return (
      <NotFoundPage title={t('accompagnement.guide.introuvableTitre')} message={t('accompagnement.guide.introuvableMessage')}>
        <NotFoundLinks
          heading={t('accompagnement.guide.introuvableListe')}
          links={Object.entries(THEMATIC_GUIDES).map(([slug, g]) => ({ to: `/accompagnement/${slug}`, label: localized(g, guideKey(slug)).title }))}
        />
      </NotFoundPage>
    );
  }

  const guide = localized(THEMATIC_GUIDES[topicSlug], guideKey(topicSlug));
  const stepIndex = ACCOMPANIMENT_STEPS.findIndex((s) => s.slug === guide.slug);

  return (
    <Fragment key={guide.slug}>
      <SEO title={t('accompagnement.guide.seoTitre', { title: guide.title })} description={guide.subtitle} />

      <PageHeader reveal notice={<DisclaimerBanner />}>
        <PageBreadcrumb
          items={[
            { label: t('accompagnement.commun.mobilite'), to: '/mobilite-langues' },
            { label: t('accompagnement.commun.accompagnement'), to: '/mobilite-langues/accompagnement' },
            { label: guide.title },
          ]}
        />
        {stepIndex >= 0 && (
          <p className="text-meta text-text-secondary">
            {pieces(t('accompagnement.commun.etape'), { n: stepIndex + 1, total: ACCOMPANIMENT_STEPS.length })}
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
          <SectionHeader title={t('accompagnement.guide.etapesTitre')} />
          <FilSteps steps={filSteps(false)} currentId={guide.slug} withFil={false} />
          <PrimaryButton to="/candidater?souhait=accompagnement_europe" size="lg">
            {t('accompagnement.commun.etreAccompagne')}
          </PrimaryButton>
        </div>
      </Section>
    </Fragment>
  );
}
