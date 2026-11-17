import { Link } from 'react-router-dom';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TEXT_LINK_CLASS } from '../../components/wahhf/TextList';
import StepNumber from '../../components/wahhf/StepNumber';
import { CardLink, CardBody, CardMeta, CardTitle, CardNote } from '../../components/wahhf/Card';
import PageHeader, { PageMeta, PageTitle, PageIntro, PageActions } from '../../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import DisclaimerBanner from '../../components/wahhf/DisclaimerBanner';
import { COUNTRIES_DATA } from '../../services/api';
import Section from '../../components/wahhf/Section';

const FOUR_STEPS = [
  {
    step: '01',
    slug: 'comprendre-les-parcours',
    title: 'Comprendre les parcours (études, formation, travail)',
    desc: 'Distinguer avec clarté les conditions d’études universitaires, d’alternance professionnelle (Ausbildung) et de mobilité qualifiée selon votre profil réel.',
  },
  {
    step: '02',
    slug: 'preparer-son-dossier',
    title: 'Préparer son dossier (CV, lettre, diplômes, équivalences)',
    desc: 'Rassembler des pièces 100 % authentiques, comprendre les procédures d’équivalence académique et rédiger un dossier lisible aux normes européennes.',
  },
  {
    step: '03',
    slug: 'apprendre-la-langue',
    title: 'Apprendre la langue du pays',
    desc: 'Acquérir le niveau linguistique requis (notamment l’allemand de A1 à C1 via l’Académie gratuite WAHHF) avant d’entamer les démarches.',
  },
  {
    step: '04',
    slug: 's-installer',
    title: 'Connaître les démarches officielles et éviter les arnaques',
    desc: 'Consulter exclusivement les portails gouvernementaux et consulaires officiels, préparer son intégration et refuser tout intermédiaire payant.',
  },
];

/** Accompagnement vers l'Europe (/mobilite-langues/accompagnement) (venu de EuropeSupport.tsx, vue 3). */
export default function AccompagnementPage() {
  return (
    <>
      <SEO
        title="Accompagnement vers l'Europe — 4 étapes & 10 pays documentés"
        description="Orientation gratuite et transparente vers 10 pays européens (Luxembourg, Allemagne, Slovénie, Italie, Grèce, Portugal, Espagne, Danemark, Pologne, Albanie) par WAHHF Foundation."
      />

      {/* HERO */}
      <PageHeader>
        <PageMeta>
          <Link to="/mobilite-langues">
            Mobilité & Langues
          </Link>
          <span>/</span>
          <span>Accompagnement vers l’Europe</span>
        </PageMeta>

        <PageTitle>
          Un accompagnement gratuit, transparent et étape par étape
        </PageTitle>

        <PageIntro>
          Comprendre les parcours légaux, préparer un dossier authentique, apprendre la langue du pays et vérifier chaque information sur les portails officiels de 10 pays européens.
        </PageIntro>

        <PageActions>
          <PrimaryButton
            to="/candidater?souhait=accompagnement_europe"
          >
            Être accompagné gratuitement
          </PrimaryButton>
          <SecondaryButton to="/accompagnement/eviter-les-arnaques">
            Guide prioritaire : Éviter les arnaques
          </SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* BLOC D'AVERTISSEMENT STANDARD OBLIGATOIRE */}
      <section className="container-page">
        <DisclaimerBanner />
      </section>

      {/* PARCOURS EN 4 ÉTAPES CLAIRES (Frise verticale) */}
      <section className="container-page *:max-w-5xl section-space space-y-12">
        <SectionHeader
          title="Votre parcours d’accompagnement en 4 étapes claires"
          subtitle="Cliquez sur chaque étape pour lire le guide thématique complet correspondant."
        />

        <ol>
          {FOUR_STEPS.map((item, i) => (
            <li key={item.step} className="border-t border-border-subtle py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <StepNumber n={i + 1} />
                <div className="space-y-2">
                  <h3 className="text-body font-semibold text-text">{item.title}</h3>
                  <p className="text-body text-text-secondary max-w-[65ch]">{item.desc}</p>
                </div>
              </div>
              <Link to={`/accompagnement/${item.slug}`} className={`${TEXT_LINK_CLASS} shrink-0 sm:ml-12`}>
                Lire le guide
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* LES 5 PAGES THÉMATIQUES D'INFORMATION */}
      <Section tone="sauge">
        <div className="container-page space-y-10">
          <SectionHeader
            title="5 dossiers thématiques pour avancer sans intermédiaire"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                slug: 'comprendre-les-parcours',
                title: 'Comprendre les parcours',
                sub: 'Études, formation professionnelle et travail',
              },
              {
                slug: 'preparer-son-dossier',
                title: 'Préparer son dossier',
                sub: 'Authenticité, CV, motivation et équivalences',
              },
              {
                slug: 'apprendre-la-langue',
                title: 'Apprendre la langue',
                sub: 'Pourquoi la langue précède le départ',
              },
              {
                slug: 's-installer',
                title: 'S’installer en Europe',
                sub: 'Logement, assurance et démarches d’arrivée',
              },
              {
                slug: 'eviter-les-arnaques',
                title: 'Éviter les arnaques',
                sub: 'Reconnaître une fausse offre et se protéger',
              },
            ].map((topic) => (
              <CardLink key={topic.slug} to={`/accompagnement/${topic.slug}`} surface="section">
                <CardBody>
                  <CardTitle>{topic.title}</CardTitle>
                  <p className="text-body text-text-secondary">{topic.sub}</p>
                </CardBody>
              </CardLink>
            ))}
          </div>
        </div>
      </Section>

      {/* LES 10 PAYS ACCOMPAGNÉS */}
      <section id="pays" className="container-page section-space space-y-12">
        <SectionHeader
          title="Fiches d’orientation par pays"
          subtitle="Luxembourg, Allemagne, Slovénie, Italie, Grèce, Portugal, Espagne, Danemark, Pologne et Albanie (avec mention explicite du statut hors UE pour l’Albanie)."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Collection cliquable : sauge sur brume, sans bordure, filigrane ni « Consulter » (liste §5 et §6) */}
          {COUNTRIES_DATA.map((country) => (
            <CardLink key={country.slug} to={`/accompagnement/pays/${country.slug}`}>
              <CardBody>
                <CardTitle>
                  <span className="mr-2">{country.flag}</span>
                  {country.name}
                </CardTitle>
                <CardMeta>
                  <span>{country.isEU ? 'Membre UE' : 'Hors UE'}</span>
                  <span>Langues : {country.languages.join(', ')}</span>
                </CardMeta>
                <p className="text-body text-text-secondary">{country.summary}</p>
                {!country.isEU && (
                  <CardNote>
                    <strong>Note :</strong> L’Albanie est un pays européen candidat mais n’est pas membre de l’Union européenne.
                  </CardNote>
                )}
              </CardBody>
            </CardLink>
          ))}
        </div>
      </section>
    </>
  );
}
