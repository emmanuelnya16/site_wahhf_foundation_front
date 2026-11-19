import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageBreadcrumb, PageTitle, PageIntro, PageActions } from '../components/wahhf/PageHeader';
import Section from '../components/wahhf/Section';
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import Fil from '../components/wahhf/Fil';
import { AfterApplicationSteps } from '../components/wahhf/AfterApplication';
import { TEXT_LINK_CLASS } from '../components/wahhf/TextList';
import { AfterFirstDisplay, FilScrub } from '../effects/DeferredMotion';
import PlacementTest from './academie/PlacementTest';
import SessionsCalendar from './academie/SessionsCalendar';
import LevelDetail from './academie/LevelDetail';
import { FinalAction, levelName, levelSteps, useFocusTitleAfterNavigation } from './academie/shared';
import { GERMAN_LEVELS_DATA } from '../services/api';
import { photoCaption, photoOrFallback } from '../lib/photos';

/*
 * Académie de langues (/mobilite-langues/academie), groupe 7.1 : contrat validé, audit ACAD-01 à ACAD-08, T-05, T-14.
 * En-tête et avertissement ; le test de niveau AVANT la fiche (on ne connaît pas encore son niveau) ; la frise et la
 * fiche du niveau (celui du test une fois fait, A1 sinon) ; le calendrier ; « Après votre candidature » ; les examens ;
 * une seule action en fin de page. Les pages de niveau (/academie/:niveau) sont dans LanguageLevelPage.tsx (NIV-01).
 * ACAD-02 : un niveau de la frise mène à sa page, qui s'ouvre en haut sur ce niveau, le focus sur son titre.
 * Retouches du 19/11 (des images) : photo dans l'en-tête, des jeunes participantes attentives le 25 avril (A33), ou,
 * tant que l'accord parental manque (production), un participant qui prend des notes (A98) ; découverte du bas vers le
 * haut sur ordinateur, comme Mobilité.
 */

const HEADER_PHOTO = photoOrFallback('A33', 'A98');

export default function LanguageAcademy() {
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

      <PageHeader
        reveal
        revealPhoto
        catalogPhoto={HEADER_PHOTO}
        photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}
        notice={<DisclaimerBanner />}
      >
        <PageBreadcrumb items={[{ label: 'Mobilité & Langues', to: '/mobilite-langues' }, { label: 'Académie de langues' }]} />
        <PageTitle>Académie de langues : l’allemand, du niveau A1 au niveau C1</PageTitle>
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
          <LevelDetail level={selected} headingLevel="h4" />
        </div>
      </section>

      <SessionsCalendar tone="sauge" />

      <Section>
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

      <FinalAction to="/candidater?souhait=cours_allemand" label="Candidater" tone="sauge" />
    </>
  );
}
