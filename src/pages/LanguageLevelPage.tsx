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
import { FinalAction, levelName, levelSteps, useFocusTitleAfterNavigation } from './academie/shared';
import { GERMAN_LEVELS_DATA, GermanLevelCourse } from '../services/api';

/*
 * Page d'un niveau d'allemand (/academie/:niveau), groupe 7.1 : audit NIV-01, ACAD-02, ETA-06.
 * Une vraie page qui ouvre sur le niveau, et non plus une copie de l'Académie : titre du niveau, avertissement, frise
 * qui se dessine jusqu'au niveau affiché (qui s'allume), fiche du niveau, sessions de ce niveau, « Après votre
 * candidature », une seule action en fin de page. Adresse canonique propre à chaque niveau (SEO canonical).
 * - Niveau écrit en majuscules (/academie/B1) : redirection vers l'adresse en minuscules.
 * - Niveau inconnu (/academie/z9) : page « introuvable » avec la liste des 5 niveaux.
 * - Passer d'un niveau à l'autre remonte la page (key) : l'en-tête et la frise rejouent leur arrivée.
 */
function LevelPage({ level }: { level: GermanLevelCourse }) {
  useFocusTitleAfterNavigation();
  return (
    <>
      <SEO
        title={`Allemand niveau ${level.level} — Académie de langues gratuite`}
        description={`Niveau ${level.level} d'allemand à l'Académie WAHHF : ${level.subtitle} Objectifs, compétences, volume horaire et prochaines sessions.`}
        canonical={`/academie/${level.slug}`}
      />

      <PageHeader reveal notice={<DisclaimerBanner />}>
        <PageBreadcrumb
          items={[
            { label: 'Mobilité & Langues', to: '/mobilite-langues' },
            { label: 'Académie de langues', to: '/mobilite-langues/academie' },
            { label: `Niveau ${level.level}` },
          ]}
        />
        <PageTitle>{levelName(level)}</PageTitle>
        <PageIntro>{level.subtitle}</PageIntro>
        <PageActions>
          <PrimaryButton to={`/candidater?souhait=cours_allemand&niveau=${level.level}`}>Candidater au niveau {level.level}</PrimaryButton>
          <SecondaryButton to="/mobilite-langues/academie#test-niveau">Vérifier mon niveau (test)</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* La frise se dessine jusqu'au niveau affiché, qui s'allume (CSS, à l'arrivée) ; puis la fiche */}
      <section className="container-page section-space pt-0! space-y-10">
        <div role="group" aria-label={`Les cinq niveaux d’allemand ; niveau affiché : ${level.level}`}>
          <Fil
            orientation="auto"
            steps={levelSteps}
            end={{ id: 'europe', label: 'Europe' }}
            currentId={level.slug}
            drawTo={level.slug}
            lightCurrent
          />
        </div>
        <div className="space-y-8">
          <h2 className="text-section-title text-text">Programme du niveau {level.level}</h2>
          <LevelDetail level={level} headingLevel="h3" />
        </div>
      </section>

      <SessionsCalendar level={level.level} tone="sauge" />

      <Section>
        <div className="container-page">
          <AfterApplicationSteps headingLevel="h2" />
        </div>
      </Section>

      <FinalAction to={`/candidater?souhait=cours_allemand&niveau=${level.level}`} label={`Candidater au niveau ${level.level}`} tone="sauge" />
    </>
  );
}

export default function LanguageLevelPage() {
  const { level: routeLevel = '' } = useParams<{ level?: string }>();
  const level = GERMAN_LEVELS_DATA.find((l) => l.slug === routeLevel.toLowerCase());

  if (!level) {
    return (
      <NotFoundPage
        title="Ce niveau d’allemand n’existe pas"
        message="L’Académie de langues propose 5 niveaux, de A1 à C1. Choisissez le vôtre ci-dessous, ou faites le test de niveau."
      >
        <NotFoundLinks
          heading="Les niveaux de l’Académie"
          links={[
            ...GERMAN_LEVELS_DATA.map((l) => ({ to: `/academie/${l.slug}`, label: levelName(l) })),
            { to: '/mobilite-langues/academie#test-niveau', label: 'Test de niveau (20 questions)' },
          ]}
        />
      </NotFoundPage>
    );
  }
  // Une seule adresse par niveau (ETA-06)
  if (routeLevel !== level.slug) return <Navigate replace to={`/academie/${level.slug}`} />;
  return <LevelPage key={level.slug} level={level} />;
}
