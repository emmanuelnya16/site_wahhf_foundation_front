import { Fragment, Ref, useId, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import { ProgressBar } from '../../components/wahhf/StepNumber';
import ChoiceTile from '../../components/wahhf/ChoiceTile';
import Fil from '../../components/wahhf/Fil';
import { useFocusOnChange } from '../../lib/useFocusOnChange';
import { PLACEMENT_QUESTIONS } from '../../services/api';
import { useLocalize } from '../../lib/localize';
import { useLevels } from './shared';

type Level = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

const recommendedFor = (pts: number): Level => (pts <= 5 ? 'A1' : pts <= 9 ? 'A2' : pts <= 14 ? 'B1' : pts <= 17 ? 'B2' : 'C1');

/**
 * Énoncé en allemand : le trou « ______ » devient un blanc visuel, lu « (blanc) » par les lecteurs d'écran (ACAD-05).
 * Lot 7.10 : le test est un test d'allemand, énoncés et réponses restent en allemand dans toutes les langues ; seul
 * « (blanc) » suit la langue de l'interface (et son attribut lang).
 */
function GermanText({ text }: { text: string }) {
  const { t, lang } = useLocalize();
  const parts = text.split(/_{3,}/);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {i < parts.length - 1 && (
            <>
              <span aria-hidden="true" className="inline-block w-16 border-b-2 border-current align-baseline mx-1" />
              <span lang={lang} className="sr-only">{t('mobilite.test.blanc')}</span>
            </>
          )}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Test de niveau d'allemand (Académie, groupe 7.1 : ACAD-04, ACAD-05 ; contrat §8 : bande du test sur nuit).
 * - Chaque question est un fieldset dont la légende est l'énoncé, réponses en boutons radio natifs (ChoiceTile) ;
 *   énoncé et réponses en lang="de" ; focus sur l'énoncé à chaque question, annonce « Question 3 sur 20 » ;
 *   vraie barre de progression pour les lecteurs d'écran (role=progressbar).
 * - Mouvement (contrat §10, groupe 7.1) : passage d'une question à l'autre en fondu et glissement de 16 px (0,3 s),
 *   focus placé une fois l'entrée finie ; barre qui se remplit (0,3 s) ; au résultat, le fil se dessine jusqu'au
 *   niveau conseillé, qui s'allume. Tout est instantané en mouvement réduit.
 * - onResult : la page affiche ensuite la fiche du niveau conseillé.
 */
export default function PlacementTest({ onResult }: { onResult?: (level: Level) => void }) {
  const { t } = useLocalize();
  const { steps: levelSteps } = useLevels();
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finished, setFinished] = useState(false);
  // « Question suivante » reste actif (contrat §11 : jamais désactivé sans explication) : sans réponse, un message le dit
  const [missing, setMissing] = useState(false);
  const errorId = useId();

  const total = PLACEMENT_QUESTIONS.length;
  const question = PLACEMENT_QUESTIONS[index];
  const score = PLACEMENT_QUESTIONS.reduce((acc, q) => (answers[q.id] === q.correctIndex ? acc + 1 : acc), 0);
  const recommended = recommendedFor(score);
  const recommendedSlug = recommended.toLowerCase();

  const view = !started ? 'accueil' : finished ? 'resultat' : `question-${index}`;
  const boxRef = useRef<HTMLDivElement>(null);
  const focusRef = useFocusOnChange<HTMLElement>(view, { scrollRef: boxRef, afterMs: 300 });
  const status = !started
    ? ''
    : finished
    ? `${t('mobilite.test.statutFini', { score, total, level: recommended })}${onResult ? ` ${t('mobilite.test.statutFiche', { level: recommended })}` : ''}`
    : t('mobilite.test.statutQuestion', { n: index + 1, total });

  const next = () => {
    if (answers[question.id] === undefined) {
      setMissing(true);
      boxRef.current?.querySelector<HTMLInputElement>('fieldset input[type="radio"]')?.focus();
      return;
    }
    setMissing(false);
    if (index < total - 1) {
      setIndex((i) => i + 1);
      return;
    }
    setFinished(true);
    onResult?.(recommended);
  };
  const restart = () => {
    setAnswers({});
    setIndex(0);
    setFinished(false);
    setStarted(true);
  };

  return (
    <section id="test-niveau" data-no-reveal="" className="surface-green bg-surface-inverse text-text-on-inverse section-space">
      <div className="container-page *:max-w-4xl space-y-10">
        <SectionHeader title={t('mobilite.test.title')} subtitle={t('mobilite.test.subtitle')} onInverse />

        <div ref={boxRef} className="rounded-card border border-border-subtle-on-inverse p-6 sm:p-10">
          <p role="status" className="sr-only">
            {status}
          </p>

          {!started ? (
            <div className="space-y-6">
              <p className="text-body text-text-on-inverse max-w-[60ch]">{t('mobilite.test.intro')}</p>
              <PrimaryButton onInverse onClick={() => setStarted(true)}>
                {t('mobilite.test.commencer')}
              </PrimaryButton>
            </div>
          ) : finished ? (
            <div key="resultat" className="step-enter space-y-6">
              <p className="text-meta text-text-secondary-on-inverse">{t('mobilite.test.resultatKicker')}</p>
              <h3 ref={focusRef as Ref<HTMLHeadingElement>} tabIndex={-1} className="text-section-title text-text-on-inverse">
                {t('mobilite.test.niveauConseille', { level: recommended })}{' '}
                <span className="block mt-1 text-body text-text-secondary-on-inverse">
                  {t('mobilite.test.score', { count: score, total })}
                </span>
              </h3>

              {/* Le fil se dessine jusqu'au niveau conseillé, qui s'allume */}
              <Fil
                orientation="auto"
                onInverse
                steps={levelSteps}
                end={{ id: 'europe', label: t('mobilite.commun.europe') }}
                currentId={recommendedSlug}
                currentLabel={t('mobilite.test.niveauConseilleCourt')}
                drawTo={recommendedSlug}
                lightCurrent
              />

              <p className="text-body text-text-on-inverse max-w-[60ch]">{t('mobilite.test.resultatText')}</p>

              <div className="flex flex-wrap items-center gap-4">
                <PrimaryButton to={`/candidater?souhait=cours_allemand&niveau=${recommended}`} onInverse>
                  {t('mobilite.commun.candidaterNiveau', { level: recommended })}
                </PrimaryButton>
                <SecondaryButton onInverse onClick={restart}>
                  <RotateCcw aria-hidden="true" className="inline w-4 h-4 mr-2" />
                  {t('mobilite.test.recommencer')}
                </SecondaryButton>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Position : texte visible (contraste du texte sur nuit) et barre de progression qui se remplit */}
              <div className="space-y-2">
                <p className="flex flex-wrap items-center justify-between gap-x-4 text-meta font-semibold text-text-on-inverse">
                  <span>{t('mobilite.test.position', { n: index + 1, total })}</span>
                  <span className="text-text-secondary-on-inverse font-normal">{t('mobilite.test.niveauTeste', { level: question.level })}</span>
                </p>
                <ProgressBar value={index + 1} max={total} onInverse label={t('mobilite.test.avancement')} />
              </div>

              {/* Nouvelle question : fondu et glissement de 16 px (0,3 s), focus sur l'énoncé une fois l'entrée finie */}
              <fieldset key={question.id} className="step-enter" aria-describedby={missing ? errorId : undefined}>
                <legend
                  ref={focusRef as Ref<HTMLLegendElement>}
                  tabIndex={-1}
                  lang="de"
                  className="text-section-title text-text-on-inverse pt-2 mb-6"
                >
                  <GermanText text={question.question} />
                </legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {question.options.map((opt, idx) => (
                    <ChoiceTile
                      key={opt}
                      name={`placement-q${question.id}`}
                      value={String(idx)}
                      checked={answers[question.id] === idx}
                      onChange={() => {
                        setAnswers((prev) => ({ ...prev, [question.id]: idx }));
                        setMissing(false);
                      }}
                      showCheck
                      onInverse
                      invalid={missing}
                      describedBy={missing ? errorId : undefined}
                      className="p-4 text-left"
                    >
                      <span lang="de">{opt}</span>
                    </ChoiceTile>
                  ))}
                </div>
                {missing && (
                  <p id={errorId} role="alert" className="mt-3 text-body font-semibold text-text-on-inverse">
                    {t('mobilite.test.manque')}
                  </p>
                )}
              </fieldset>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                {index > 0 ? (
                  <SecondaryButton
                    onInverse
                    onClick={() => {
                      setMissing(false);
                      setIndex((i) => Math.max(0, i - 1));
                    }}
                  >
                    {t('mobilite.test.precedente')}
                  </SecondaryButton>
                ) : (
                  <span />
                )}
                <PrimaryButton onInverse onClick={next}>
                  {index === total - 1 ? t('mobilite.test.voirResultat') : t('mobilite.test.suivante')}
                </PrimaryButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
