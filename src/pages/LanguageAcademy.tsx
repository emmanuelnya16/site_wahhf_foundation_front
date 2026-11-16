import { useState, useRef, Ref } from 'react';
import { useFocusOnChange } from '../lib/useFocusOnChange';
import { Link, useParams } from 'react-router-dom';
import {
  RotateCcw,
} from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageMeta, PageTitle, PageIntro, PageActions } from '../components/wahhf/PageHeader';
import Section from '../components/wahhf/Section';
import { PrimaryButton, SecondaryButton, DonateButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import CourseCard from '../components/wahhf/CourseCard';
import { ProgressBar } from '../components/wahhf/StepNumber';
import Fil from '../components/wahhf/Fil';
import ChoiceTile from '../components/wahhf/ChoiceTile';
import NotFoundPage, { NotFoundLinks } from './NotFoundPage';
import {
  GERMAN_LEVELS_DATA,
  COURSE_SESSIONS_DATA,
  PLACEMENT_QUESTIONS,
} from '../services/api';

export default function LanguageAcademy() {
  const { level: routeLevel } = useParams<{ level?: string }>();

  // Niveau sélectionné dans la frise horizontale A1 -> C1
  const initialLevel =
    GERMAN_LEVELS_DATA.find((l) => l.slug === routeLevel?.toLowerCase()) ||
    GERMAN_LEVELS_DATA[0];
  const [selectedLevel, setSelectedLevel] = useState(initialLevel);

  // Filtres du calendrier des sessions
  const [filterLevel, setFilterLevel] = useState<string>('ALL');
  const [filterFormat, setFilterFormat] = useState<string>('ALL');

  // État du test de niveau interactif gratuit (20 questions progressives)
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  // Synchroniser si routeLevel change
  const activeCourse =
    GERMAN_LEVELS_DATA.find((l) => l.slug === routeLevel?.toLowerCase()) || selectedLevel;

  const filteredSessions = COURSE_SESSIONS_DATA.filter((s) => {
    const matchLevel = filterLevel === 'ALL' || s.level === filterLevel;
    const matchFormat =
      filterFormat === 'ALL' ||
      (filterFormat === 'ONLINE' && s.format === 'En ligne') ||
      (filterFormat === 'PRESENTIEL' && s.format.startsWith('Présentiel'));
    return matchLevel && matchFormat;
  });

  // Calcul du niveau indicatif à la fin des 20 questions
  const score = PLACEMENT_QUESTIONS.reduce((acc, q) => {
    return answers[q.id] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  const getRecommendedLevel = (pts: number): 'A1' | 'A2' | 'B1' | 'B2' | 'C1' => {
    if (pts <= 5) return 'A1';
    if (pts <= 9) return 'A2';
    if (pts <= 14) return 'B1';
    if (pts <= 17) return 'B2';
    return 'C1';
  };

  const recommendedLevel = getRecommendedLevel(score);

  // Démarrage, question suivante ou précédente, résultat : focus sur l'énoncé (ou le résultat) + annonce polie
  const quizView = !quizStarted ? 'accueil' : quizFinished ? 'resultat' : `question-${currentQIndex}`;
  const quizBoxRef = useRef<HTMLDivElement>(null);
  const quizFocusRef = useFocusOnChange<HTMLElement>(quizView, { scrollRef: quizBoxRef });
  const quizStatus = !quizStarted
    ? ''
    : quizFinished
    ? `Test terminé. Score : ${score} sur ${PLACEMENT_QUESTIONS.length}.`
    : `Question ${currentQIndex + 1} sur ${PLACEMENT_QUESTIONS.length}.`;

  const handleSelectOption = (optionIdx: number) => {
    const currentQ = PLACEMENT_QUESTIONS[currentQIndex];
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIdx }));
  };

  const handleNextQuestion = () => {
    if (currentQIndex < PLACEMENT_QUESTIONS.length - 1) {
      setCurrentQIndex((i) => i + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentQIndex(0);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  // Niveau inconnu (/academie/z9) : message dédié et liste des 5 niveaux, au lieu de la fiche A1
  if (routeLevel && !GERMAN_LEVELS_DATA.some((l) => l.slug === routeLevel.toLowerCase())) {
    return (
      <NotFoundPage
        title="Ce niveau d’allemand n’existe pas"
        message="L’Académie de langues propose 5 niveaux, de A1 à C1. Choisissez le vôtre ci-dessous, ou faites le test de niveau gratuit."
      >
        <NotFoundLinks
          heading="Les niveaux de l’Académie"
          links={[
            ...GERMAN_LEVELS_DATA.map((l) => ({ to: `/academie/${l.slug}`, label: `${l.level} — ${l.title}` })),
            { to: '/mobilite-langues/academie#test-niveau', label: 'Test de niveau gratuit (20 questions)' },
          ]}
        />
      </NotFoundPage>
    );
  }

  return (
    <>
      <SEO
        title={
          routeLevel
            ? `Allemand Niveau ${activeCourse.level} — Académie de langues gratuite`
            : 'Académie de langues — Allemand A1 à C1 gratuit'
        }
        description="Accompagnement gratuit des cours de langue allemande du niveau A1 au niveau C1 par WAHHF Foundation : programme par niveau, test d'orientation de 20 questions et sessions."
      />

      {/* HERO */}
      <PageHeader>
        <PageMeta>
          <Link to="/mobilite-langues">
            Mobilité & Langues
          </Link>
          <span>/</span>
          <span>Académie de langues (A1 à C1)</span>
          {routeLevel && (
            <>
              <span>/</span>
              <span>Niveau {activeCourse.level}</span>
            </>
          )}
        </PageMeta>

        <PageTitle>
          Académie de langues — Allemand A1 à C1
        </PageTitle>

        <PageIntro>
          Accompagnement linguistique 100 % gratuit, financé par le groupe IROKO et nos donateurs. Progressez méthodiquement du niveau débutant A1 jusqu’à la maîtrise académique C1.
        </PageIntro>

        <PageActions>
          <PrimaryButton
            to={`/candidater?souhait=cours_allemand&niveau=${activeCourse.level}`}
          >
            Candidater au niveau {activeCourse.level}
          </PrimaryButton>
          <SecondaryButton href="#test-niveau">
            Passer le test d’orientation gratuit (20 questions)
          </SecondaryButton>
          <SecondaryButton href="#calendrier-sessions">
            Voir le calendrier des sessions
          </SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* BLOC D'AVERTISSEMENT STANDARD */}
      <section className="container-page">
        <DisclaimerBanner />
      </section>

      {/* LE FIL DES 5 NIVEAUX : A1 -> A2 -> B1 -> B2 -> C1 -> Europe */}
      <section className="container-page section-space space-y-12">
        <SectionHeader
          kicker="Parcours structuré CECRL"
          title="Frise des 5 niveaux d’allemand : A1, A2, B1, B2, C1"
          subtitle="Sélectionnez un niveau pour consulter ses objectifs pédagogiques, ce que vous saurez faire, le volume horaire et les prérequis."
        />

        {/* Le fil des niveaux (contrat §6) : A1 -> Europe, un point par niveau, le niveau affiché en point plein ;
            chaque niveau reste un lien vers sa page. Vertical sous 1 024 px. */}
        <Fil
          orientation="auto"
          steps={GERMAN_LEVELS_DATA.map((lvl) => ({
            id: lvl.slug,
            label: lvl.level,
            sublabel: lvl.shortTitle,
            to: `/academie/${lvl.slug}`,
            onClick: () => setSelectedLevel(lvl),
          }))}
          end={{ id: 'europe', label: 'Europe' }}
          currentId={activeCourse.slug}
        />

        {/* Détail complet du niveau sélectionné (page /academie/:level incluse) */}
        <div className="space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border-subtle">
            <div className="space-y-2">
              <h2 className="text-section-title text-text">
                {activeCourse.title}
              </h2>
              <p className="text-body text-text-secondary">
                {activeCourse.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <PrimaryButton to={`/candidater?souhait=cours_allemand&niveau=${activeCourse.level}`}>
                Candidater au niveau {activeCourse.level}
              </PrimaryButton>
            </div>
          </div>

          {/* 4 indicateurs du niveau */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8">
            <div className="border-t border-border-subtle py-4 space-y-1">
              <dt className="text-meta text-text-secondary">Durée indicative</dt>
              <dd className="text-body text-text">{activeCourse.duration}</dd>
            </div>

            <div className="border-t border-border-subtle py-4 space-y-1">
              <dt className="text-meta text-text-secondary">Volume horaire</dt>
              <dd className="text-body text-text">{activeCourse.hours}</dd>
            </div>

            <div className="border-t border-border-subtle py-4 space-y-1">
              <dt className="text-meta text-text-secondary">Prérequis</dt>
              <dd className="text-body text-text">{activeCourse.prerequisites}</dd>
            </div>

            <div className="border-t border-border-subtle py-4 space-y-1">
              <dt className="text-meta text-text-secondary">Prochaine session</dt>
              <dd className="text-body text-text">{activeCourse.nextSession}</dd>
            </div>
          </dl>

          {/* Objectifs & Ce qu'on sait faire à la fin du niveau */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-body font-semibold text-text">
                Objectifs pédagogiques du niveau {activeCourse.level}
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-body text-text marker:text-text-secondary">
                {activeCourse.objectives.map((obj) => (
                  <li key={obj}>{obj}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-body font-semibold text-text">
                Ce que vous savez faire à la fin du niveau {activeCourse.level}
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-body text-text marker:text-text-secondary">
                {activeCourse.canDo.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-body font-semibold text-text">{activeCourse.examTarget}</p>
            <span className="text-meta text-text-secondary">
              Modalité : En ligne & Présentiel au Cameroun (selon cohortes) · 100 % Gratuit
            </span>
          </div>
        </div>
      </section>

      {/* TEST DE NIVEAU EN LIGNE GRATUIT (20 QUESTIONS PROGRESSIVES) */}
      <section
        id="test-niveau"
        className="surface-green py-20 bg-nuit text-creme border-y border-or/30"
      >
        <div className="container-page *:max-w-4xl space-y-10">
          <SectionHeader
            title="Test de niveau d’allemand en ligne"
            subtitle="Évaluez gratuitement vos connaissances actuelles grâce à 20 questions progressives (de A1 à C1) afin de candidater au niveau le plus adapté."
            onInverse
          />

          <div ref={quizBoxRef} className="rounded-card bg-feuillage/90 border border-or/35 p-6 sm:p-10 shadow-xl">
            <p role="status" className="sr-only">
              {quizStatus}
            </p>
            {!quizStarted ? (
              <div className="text-center space-y-6 py-4">
                <p className="text-base sm:text-lg text-creme/90 max-w-2xl mx-auto">
                  Ce questionnaire comporte <strong>20 questions à choix multiples</strong> classées par difficulté croissante (4 questions par niveau : A1, A2, B1, B2, C1). Il dure environ 5 à 8 minutes et est entièrement gratuit.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <PrimaryButton onInverse onClick={() => setQuizStarted(true)}>
                    Commencer le test des 20 questions
                  </PrimaryButton>
                </div>
              </div>
            ) : quizFinished ? (
              <div className="space-y-6 text-center py-4">
                <p className="text-meta text-text-secondary-on-inverse">
                  Résultat indicatif de votre test
                </p>
                <h3
                  ref={quizFocusRef as Ref<HTMLHeadingElement>}
                  tabIndex={-1}
                  className="font-serif font-normal text-3xl sm:text-4xl text-creme"
                >
                  Score : {score} / {PLACEMENT_QUESTIONS.length} — Niveau conseillé :{' '}
                  <span className="text-or">{recommendedLevel}</span>
                </h3>
                <p className="text-sm sm:text-base text-creme/85 max-w-2xl mx-auto leading-relaxed">
                  Ce résultat est un indicateur pédagogique pour vous orienter. Lors de l’étude de votre candidature, nos formateurs bénévoles confirmeront avec vous le groupe qui vous permettra de progresser dans les meilleures conditions.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <PrimaryButton
                    to={`/candidater?souhait=cours_allemand&niveau=${recommendedLevel}`}
                    onInverse
                  >
                    Candidater au niveau {recommendedLevel}
                  </PrimaryButton>
                  <SecondaryButton onInverse onClick={resetQuiz}>
                    <RotateCcw aria-hidden="true" className="inline w-4 h-4 mr-2" />
                    Recommencer le test
                  </SecondaryButton>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Barre de progression du quiz */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-or font-semibold">
                    <span>
                      Question {currentQIndex + 1} sur {PLACEMENT_QUESTIONS.length}
                    </span>
                    <span>
                      Palier testé : Niveau {PLACEMENT_QUESTIONS[currentQIndex].level}
                    </span>
                  </div>
                  <ProgressBar value={currentQIndex + 1} max={PLACEMENT_QUESTIONS.length} onInverse />
                </div>

                {/* Énoncé (légende du groupe) et réponses en boutons radio natifs */}
                <fieldset>
                  <legend
                    ref={quizFocusRef as Ref<HTMLLegendElement>}
                    tabIndex={-1}
                    className="font-serif text-xl sm:text-2xl text-creme pt-2 mb-6"
                  >
                    {PLACEMENT_QUESTIONS[currentQIndex].question}
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PLACEMENT_QUESTIONS[currentQIndex].options.map((opt, idx) => {
                      const selected =
                        answers[PLACEMENT_QUESTIONS[currentQIndex].id] === idx;
                      return (
                        <ChoiceTile
                          key={opt}
                          name={`placement-q${PLACEMENT_QUESTIONS[currentQIndex].id}`}
                          value={String(idx)}
                          checked={selected}
                          onChange={() => handleSelectOption(idx)}
                          showCheck
                          onInverse
                          className="p-4 rounded-2xl text-left font-medium"
                        >
                          {opt}
                        </ChoiceTile>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    disabled={currentQIndex === 0}
                    onClick={() => setCurrentQIndex((i) => Math.max(0, i - 1))}
                    className="text-xs sm:text-sm text-creme/75 hover:text-white disabled:opacity-40 cursor-pointer"
                  >
                    Question précédente
                  </button>

                  <PrimaryButton
                    onInverse
                    disabled={answers[PLACEMENT_QUESTIONS[currentQIndex].id] === undefined}
                    onClick={handleNextQuestion}
                    className="disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {currentQIndex === PLACEMENT_QUESTIONS.length - 1
                      ? 'Voir mon niveau conseillé'
                      : 'Question suivante'}
                  </PrimaryButton>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CALENDRIER DES SESSIONS (Cartes filtrables par niveau et par format) */}
      <section
        id="calendrier-sessions"
        className="container-page section-space space-y-12"
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            kicker="Dates indicatives (TODO)"
            title="Calendrier des prochaines sessions d’accompagnement"
            subtitle="Filtrez par niveau (A1 à C1) ou par modalité (En ligne ou Présentiel au Cameroun — lieux à confirmer)."
          />

          {/* Filtres Niveau & Format */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              aria-label="Filtrer par niveau"
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="px-4 py-2.5 rounded-pill bg-surface-raised border border-border-input text-sm text-text"
            >
              <option value="ALL">Tous les niveaux (A1–C1)</option>
              <option value="A1">Niveau A1</option>
              <option value="A2">Niveau A2</option>
              <option value="B1">Niveau B1</option>
              <option value="B2">Niveau B2</option>
              <option value="C1">Niveau C1</option>
            </select>

            <select
              aria-label="Filtrer par format"
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
              className="px-4 py-2.5 rounded-pill bg-surface-raised border border-border-input text-sm text-text"
            >
              <option value="ALL">Tous les formats</option>
              <option value="ONLINE">En ligne</option>
              <option value="PRESENTIEL">Présentiel au Cameroun (TODO)</option>
            </select>
          </div>
        </div>

        <p className="text-body text-text-secondary">Toutes les sessions sont gratuites, financées par WAHHF.</p>
          <ul>
            {filteredSessions.map((session) => (
              <CourseCard key={session.id} session={session} />
            ))}
          </ul>
      </section>

      {/* PRÉPARATION AUX EXAMENS OFFICIELS (Goethe, telc, TestDaF — mention indicative TODO) */}
      <Section tone="sauge">
        <div className="container-page">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-meta text-text-secondary">
                  Mention indicative (TODO : à vérifier)
                </p>
                <h2 className="text-section-title text-text mt-1">
                  Préparation méthodique aux examens officiels d’allemand
                </h2>
              </div>
              <DonateButton to="/faire-un-don">Soutenir l’Académie</DonateButton>
            </div>

            <p className="text-body text-text-secondary max-w-[65ch]">
              Nos parcours d’accompagnement intègrent des entraînements blancs aux épreuves de compréhension écrite, d’écoute, d’expression écrite et d’oral selon les standards des examens reconnus : <strong>Goethe-Zertifikat, telc Deutsch et TestDaF</strong> (mention indicative — TODO : modalités exactes de partenariat ou d’inscription aux centres d’examen officiels à confirmer par WAHHF).
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
