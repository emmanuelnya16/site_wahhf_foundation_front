import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageMeta, PageTitle, PageIntro, PageActions } from '../components/wahhf/PageHeader';
import Section from '../components/wahhf/Section';
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import Fil from '../components/wahhf/Fil';
import { AfterApplicationSteps } from '../components/wahhf/AfterApplication';
import { TEXT_LINK_CLASS } from '../components/wahhf/TextList';
import { AfterFirstDisplay, FilScrub } from '../effects/DeferredMotion';
import NotFoundPage, { NotFoundLinks } from './NotFoundPage';
import PlacementTest from './academie/PlacementTest';
import SessionsCalendar from './academie/SessionsCalendar';
import LevelDetail from './academie/LevelDetail';
import { GERMAN_LEVELS_DATA, GermanLevelCourse } from '../services/api';

/*
 * Académie (/mobilite-langues/academie) et pages de niveau (/academie/:niveau), groupe 7.1 : contrat validé, audit
 * ACAD-01 à ACAD-08, NIV-01, T-05, T-14.
 * - Académie : en-tête et avertissement ; le test de niveau AVANT la fiche (on ne connaît pas encore son niveau) ;
 *   la frise et la fiche du niveau (celui du test une fois fait, A1 sinon) ; le calendrier ; « Après votre
 *   candidature » ; les examens ; une seule action en fin de page.
 * - Page de niveau (NIV-01) : une vraie page qui ouvre sur le niveau (titre, frise tracée jusqu'à lui, fiche, sessions
 *   du niveau, Candidater), avec son adresse canonique ; un niveau inconnu mène à la page « introuvable ».
 * - ACAD-02 : un niveau de la frise mène à sa page, qui s'ouvre en haut sur ce niveau, le focus sur son titre.
 */

const levelSteps = GERMAN_LEVELS_DATA.map((lvl) => ({
  id: lvl.slug,
  label: lvl.level,
  sublabel: lvl.shortTitle,
  to: `/academie/${lvl.slug}`,
}));
const levelName = (lvl: GermanLevelCourse) => `Allemand ${lvl.level} : ${lvl.shortTitle.toLowerCase()}`;

/** Page affichée après une navigation dans le site (pas au premier chargement) : focus sur son titre (ACAD-02). */
let academyPageShown = false;
function useFocusTitleAfterNavigation() {
  useEffect(() => {
    if (!academyPageShown) {
      academyPageShown = true;
      return;
    }
    const frame = requestAnimationFrame(() => {
      const h1 = document.querySelector<HTMLElement>('#contenu h1');
      if (!h1) return;
      h1.tabIndex = -1;
      h1.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, []);
}

/** Fin de page : une seule action (contrat §7, groupe 7.1). */
function FinalAction({ to, label }: { to: string; label: string }) {
  return (
    <section className="container-page section-space">
      <div className="max-w-[65ch] space-y-5">
        <SectionHeader
          title="Rejoindre la prochaine cohorte"
          subtitle="Un seul formulaire, 5 minutes environ ; aucun document d’identité ni paiement ne vous est demandé."
        />
        <PrimaryButton to={to} size="lg">
          {label}
        </PrimaryButton>
      </div>
    </section>
  );
}

function AcademyPage() {
  useFocusTitleAfterNavigation();
  const [selected, setSelected] = useState(GERMAN_LEVELS_DATA[0]);
  const filRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SEO
        title="Académie de langues — Allemand A1 à C1 gratuit"
        description="Accompagnement gratuit des cours de langue allemande du niveau A1 au niveau C1 par WAHHF Foundation : test de niveau de 20 questions, programme par niveau et sessions."
        canonical="/mobilite-langues/academie"
      />

      <PageHeader reveal notice={<DisclaimerBanner />}>
        <PageMeta>
          <Link to="/mobilite-langues">Mobilité & Langues</Link>
          <span aria-hidden="true">/</span>
          <span>Académie de langues</span>
        </PageMeta>
        <PageTitle>Académie de langues : l’allemand, du niveau A1 au niveau C1</PageTitle>
        <PageIntro>
          Des cours d’allemand du niveau débutant jusqu’à la maîtrise académique, en ligne ou en présentiel à Douala et à
          Yaoundé. Commencez par le test : il vous dit par quel niveau commencer.
        </PageIntro>
        <PageActions>
          {/* ACAD-07 : le test est la porte principale ; la candidature ne choisit pas le niveau à votre place */}
          <PrimaryButton href="#test-niveau">Trouver mon niveau (5 minutes)</PrimaryButton>
          <SecondaryButton to="/candidater?souhait=cours_allemand">Candidater (choisir mon niveau)</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* Le test avant la fiche du niveau ; son résultat règle la fiche ci-dessous */}
      <PlacementTest onResult={(lvl) => setSelected(GERMAN_LEVELS_DATA.find((l) => l.level === lvl) ?? GERMAN_LEVELS_DATA[0])} />

      {/* Les 5 niveaux : la frise (dessinée au défilement sur ordinateur) et la fiche du niveau affiché */}
      <section id="niveaux" className="container-page section-space space-y-10">
        <SectionHeader
          title="Les 5 niveaux, de A1 à C1"
          subtitle="Chaque niveau mène à sa page : objectifs, compétences, volume horaire et prochaines sessions."
        />
        <div ref={filRef} role="group" aria-label="Les cinq niveaux d’allemand, de A1 à C1, puis l’Europe">
          <Fil orientation="auto" steps={levelSteps} end={{ id: 'europe', label: 'Europe' }} currentId={selected.slug} />
        </div>
        <AfterFirstDisplay>
          <FilScrub scope={filRef} />
        </AfterFirstDisplay>

        <div className="space-y-6 border-t border-border-subtle pt-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-section-title text-text">{levelName(selected)}</h3>
              <p className="text-body text-text-secondary max-w-[65ch]">{selected.subtitle}</p>
            </div>
            <Link to={`/academie/${selected.slug}`} className={TEXT_LINK_CLASS}>
              Toute la page du niveau {selected.level}
            </Link>
          </div>
          <LevelDetail level={selected} />
        </div>
      </section>

      <SessionsCalendar />

      <Section tone="sauge">
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          <AfterApplicationSteps headingLevel="h2" />
          <div className="space-y-4">
            <h2 className="text-section-title text-text">Préparation aux examens officiels</h2>
            <p className="text-body text-text-secondary max-w-[65ch]">
              Nos parcours intègrent des entraînements blancs aux épreuves de compréhension écrite, d’écoute,
              d’expression écrite et d’oral, selon les standards des examens reconnus : Goethe-Zertifikat, telc Deutsch
              et TestDaF.
            </p>
          </div>
        </div>
      </Section>

      <FinalAction to="/candidater?souhait=cours_allemand" label="Candidater" />
    </>
  );
}

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
        <PageMeta>
          <Link to="/mobilite-langues">Mobilité & Langues</Link>
          <span aria-hidden="true">/</span>
          <Link to="/mobilite-langues/academie">Académie de langues</Link>
          <span aria-hidden="true">/</span>
          <span>Niveau {level.level}</span>
        </PageMeta>
        <PageTitle>{levelName(level)}</PageTitle>
        <PageIntro>{level.subtitle}</PageIntro>
        <PageActions>
          <PrimaryButton to={`/candidater?souhait=cours_allemand&niveau=${level.level}`}>Candidater au niveau {level.level}</PrimaryButton>
          <SecondaryButton to="/mobilite-langues/academie#test-niveau">Vérifier mon niveau (test)</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* La frise se dessine jusqu'au niveau affiché, qui s'allume ; puis la fiche */}
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
        <LevelDetail level={level} />
      </section>

      <SessionsCalendar level={level.level} />

      <Section tone="sauge">
        <div className="container-page">
          <AfterApplicationSteps headingLevel="h2" />
        </div>
      </Section>

      <FinalAction to={`/candidater?souhait=cours_allemand&niveau=${level.level}`} label={`Candidater au niveau ${level.level}`} />
    </>
  );
}

export default function LanguageAcademy() {
  const { level: routeLevel } = useParams<{ level?: string }>();

  if (routeLevel) {
    const level = GERMAN_LEVELS_DATA.find((l) => l.slug === routeLevel.toLowerCase());
    // Niveau inconnu (/academie/z9) : page « introuvable » avec la liste des 5 niveaux
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
    // Remontée à chaque niveau : l'en-tête et la frise rejouent leur arrivée
    return <LevelPage key={level.slug} level={level} />;
  }
  return <AcademyPage />;
}
