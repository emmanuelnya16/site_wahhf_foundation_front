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
import { FinalAction, useFocusTitleAfterNavigation, useLevels } from './academie/shared';
import { GERMAN_LEVELS_DATA } from '../services/api';
import { photoCaption, photoOrFallback } from '../lib/photos';
import { useLocalize } from '../lib/localize';
import '../locales/mobilite';

/*
 * Académie de langues (/mobilite-langues/academie), groupe 7.1 : contrat validé, audit ACAD-01 à ACAD-08, T-05, T-14.
 * En-tête et avertissement ; le test de niveau AVANT la fiche (on ne connaît pas encore son niveau) ; la frise et la
 * fiche du niveau (celui du test une fois fait, A1 sinon) ; le calendrier ; « Après votre candidature » ; les examens ;
 * une seule action en fin de page. Les pages de niveau (/academie/:niveau) sont dans LanguageLevelPage.tsx (NIV-01).
 * ACAD-02 : un niveau de la frise mène à sa page, qui s'ouvre en haut sur ce niveau, le focus sur son titre.
 * Retouches du 19/11 (des images) : photo dans l'en-tête, des jeunes participantes attentives le 25 avril (A33), ou,
 * tant que l'accord parental manque (production), un participant qui prend des notes (A98) ; découverte du bas vers le
 * haut sur ordinateur, comme Mobilité.
 * Lot 7.10 : textes du paquet « mobilite », niveaux traduits par leurs surcouches (useLevels).
 */

const HEADER_PHOTO = photoOrFallback('A33', 'A98');

export default function LanguageAcademy() {
  useFocusTitleAfterNavigation();
  const { t } = useLocalize();
  const levels = useLevels();
  // Le niveau des données (en français) ; affiché traduit
  const [selectedLevel, setSelected] = useState(GERMAN_LEVELS_DATA[0]);
  const selected = levels.localize(selectedLevel);
  const filRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SEO
        title={t('mobilite.academie.seoTitle')}
        description={t('mobilite.academie.seoDescription')}
        canonical="/mobilite-langues/academie"
      />

      <PageHeader
        reveal
        revealPhoto
        catalogPhoto={HEADER_PHOTO}
        photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}
        notice={<DisclaimerBanner />}
      >
        <PageBreadcrumb items={[{ label: t('mobilite.commun.mobilite'), to: '/mobilite-langues' }, { label: t('mobilite.commun.academie') }]} />
        <PageTitle>{t('mobilite.academie.title')}</PageTitle>
        <PageIntro>{t('mobilite.academie.intro')}</PageIntro>
        <PageActions>
          {/* ACAD-07 : le test est la porte principale ; la candidature ne choisit pas le niveau à votre place */}
          <PrimaryButton href="#test-niveau">{t('mobilite.academie.ctaTest')}</PrimaryButton>
          <SecondaryButton to="/candidater?souhait=cours_allemand">{t('mobilite.academie.ctaCandidater')}</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* Le test avant la fiche du niveau ; son résultat règle la fiche ci-dessous */}
      <PlacementTest onResult={(lvl) => setSelected(GERMAN_LEVELS_DATA.find((l) => l.level === lvl) ?? GERMAN_LEVELS_DATA[0])} />

      {/* Les 5 niveaux : la frise (dessinée au défilement sur ordinateur) et la fiche du niveau affiché */}
      <section id="niveaux" className="container-page section-space space-y-10">
        <SectionHeader title={t('mobilite.academie.niveauxTitle')} subtitle={t('mobilite.academie.niveauxSubtitle')} />
        <div ref={filRef} role="group" aria-label={t('mobilite.commun.filAria')}>
          <Fil
            orientation="auto"
            steps={levels.steps}
            end={{ id: 'europe', label: t('mobilite.commun.europe') }}
            currentId={selected.slug}
            currentLabel={t('mobilite.commun.niveauAffiche')}
          />
        </div>
        <AfterFirstDisplay>
          <FilScrub scope={filRef} />
        </AfterFirstDisplay>

        <div className="space-y-6 border-t border-border-subtle pt-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="space-y-2">
              <h3 className="text-section-title text-text">{levels.name(selectedLevel)}</h3>
              <p className="text-body text-text-secondary max-w-[65ch]">{selected.subtitle}</p>
            </div>
            <Link to={`/academie/${selected.slug}`} className={TEXT_LINK_CLASS}>
              {t('mobilite.academie.pageNiveau', { level: selected.level })}
            </Link>
          </div>
          <LevelDetail level={selectedLevel} headingLevel="h4" />
        </div>
      </section>

      <SessionsCalendar tone="sauge" />

      <Section>
        <div className="container-page grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          <AfterApplicationSteps headingLevel="h2" />
          <div className="space-y-4">
            <h2 className="text-section-title text-text">{t('mobilite.academie.examensTitle')}</h2>
            <p className="text-body text-text-secondary max-w-[65ch]">{t('mobilite.academie.examensText')}</p>
          </div>
        </div>
      </Section>

      <FinalAction to="/candidater?souhait=cours_allemand" label={t('mobilite.commun.candidater')} tone="sauge" />
    </>
  );
}
