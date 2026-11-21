import { Navigate, useParams } from 'react-router-dom';
import SEO from '../components/wahhf/SEO';
import PageHeader, { PageBreadcrumb, PageTitle, PageIntro, PageActions } from '../components/wahhf/PageHeader';
import Section from '../components/wahhf/Section';
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import Fil from '../components/wahhf/Fil';
import { AfterApplicationSteps } from '../components/wahhf/AfterApplication';
import NotFoundPage, { NotFoundLinks } from './NotFoundPage';
import SessionsCalendar from './academie/SessionsCalendar';
import LevelDetail from './academie/LevelDetail';
import { FinalAction, useFocusTitleAfterNavigation, useLevels } from './academie/shared';
import { GERMAN_LEVELS_DATA, GermanLevelCourse } from '../services/api';
import { useLocalize } from '../lib/localize';
import '../locales/mobilite';

/*
 * Page d'un niveau d'allemand (/academie/:niveau), groupe 7.1 : audit NIV-01, ACAD-02, ETA-06.
 * Une vraie page qui ouvre sur le niveau, et non plus une copie de l'Académie : titre du niveau, avertissement, frise
 * qui se dessine jusqu'au niveau affiché (qui s'allume), fiche du niveau, sessions de ce niveau, « Après votre
 * candidature », une seule action en fin de page. Adresse canonique propre à chaque niveau (SEO canonical).
 * - Niveau écrit en majuscules (/academie/B1) : redirection vers l'adresse en minuscules.
 * - Niveau inconnu (/academie/z9) : page « introuvable » avec la liste des 5 niveaux.
 * - Passer d'un niveau à l'autre remonte la page (key) : l'en-tête et la frise rejouent leur arrivée.
 * Lot 7.10 : textes du paquet « mobilite » ; `raw` est le niveau des données (en français), affiché traduit.
 */
function LevelPage({ level: raw }: { level: GermanLevelCourse }) {
  useFocusTitleAfterNavigation();
  const { t } = useLocalize();
  const levels = useLevels();
  const level = levels.localize(raw);
  const apply = t('mobilite.commun.candidaterNiveau', { level: level.level });
  return (
    <>
      <SEO
        title={t('mobilite.niveauPage.seoTitle', { level: level.level })}
        description={t('mobilite.niveauPage.seoDescription', { level: level.level, subtitle: level.subtitle })}
        canonical={`/academie/${level.slug}`}
      />

      <PageHeader reveal notice={<DisclaimerBanner />}>
        <PageBreadcrumb
          items={[
            { label: t('mobilite.commun.mobilite'), to: '/mobilite-langues' },
            { label: t('mobilite.commun.academie'), to: '/mobilite-langues/academie' },
            { label: t('mobilite.commun.niveau', { level: level.level }) },
          ]}
        />
        <PageTitle>{levels.name(raw)}</PageTitle>
        <PageIntro>{level.subtitle}</PageIntro>
        <PageActions>
          <PrimaryButton to={`/candidater?souhait=cours_allemand&niveau=${level.level}`}>{apply}</PrimaryButton>
          <SecondaryButton to="/mobilite-langues/academie#test-niveau">{t('mobilite.niveauPage.verifier')}</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* La frise se dessine jusqu'au niveau affiché, qui s'allume (CSS, à l'arrivée) ; puis la fiche */}
      <section className="container-page section-space pt-0! space-y-10">
        <div role="group" aria-label={t('mobilite.niveauPage.filAria', { level: level.level })}>
          <Fil
            orientation="auto"
            steps={levels.steps}
            end={{ id: 'europe', label: t('mobilite.commun.europe') }}
            currentId={level.slug}
            currentLabel={t('mobilite.commun.niveauAffiche')}
            drawTo={level.slug}
            lightCurrent
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-section-title text-text">{t('mobilite.niveauPage.programme', { level: level.level })}</h2>
          <LevelDetail level={raw} headingLevel="h3" />
        </div>
      </section>

      <SessionsCalendar level={level.level} tone="sauge" />

      <Section>
        <div className="container-page">
          <AfterApplicationSteps headingLevel="h2" />
        </div>
      </Section>

      <FinalAction to={`/candidater?souhait=cours_allemand&niveau=${level.level}`} label={apply} tone="sauge" />
    </>
  );
}

export default function LanguageLevelPage() {
  const { level: routeLevel = '' } = useParams<{ level?: string }>();
  const { t } = useLocalize();
  const levels = useLevels();
  const level = GERMAN_LEVELS_DATA.find((l) => l.slug === routeLevel.toLowerCase());

  if (!level) {
    return (
      <NotFoundPage title={t('mobilite.niveauPage.introuvableTitle')} message={t('mobilite.niveauPage.introuvableMessage')}>
        <NotFoundLinks
          heading={t('mobilite.niveauPage.introuvableListe')}
          links={[
            ...GERMAN_LEVELS_DATA.map((l) => ({ to: `/academie/${l.slug}`, label: levels.name(l) })),
            { to: '/mobilite-langues/academie#test-niveau', label: t('mobilite.niveauPage.introuvableTest') },
          ]}
        />
      </NotFoundPage>
    );
  }
  // Une seule adresse par niveau (ETA-06)
  if (routeLevel !== level.slug) return <Navigate replace to={`/academie/${level.slug}`} />;
  return <LevelPage key={level.slug} level={level} />;
}
