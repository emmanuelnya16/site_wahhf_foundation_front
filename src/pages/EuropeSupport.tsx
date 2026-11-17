import { Fragment } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowUpRight,
} from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { TextList, TextListItem, ReadingColumn, TEXT_LINK_CLASS } from '../components/wahhf/TextList';
import StepNumber from '../components/wahhf/StepNumber';
import Fil from '../components/wahhf/Fil';
import { CardLink, CardBody, CardMeta, CardTitle, CardNote } from '../components/wahhf/Card';
import PageHeader, { PageMeta, PageTitle, PageIntro, PageActions } from '../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import InfoBox from '../components/wahhf/InfoBox';
import { COUNTRIES_DATA, THEMATIC_GUIDES } from '../services/api';
import NotFoundPage, { NotFoundLinks, COUNTRY_LINKS } from './NotFoundPage';
import Section from '../components/wahhf/Section';

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

export default function EuropeSupport() {
  const { countrySlug, topicSlug } = useParams<{
    countrySlug?: string;
    topicSlug?: string;
  }>();

  // ---------------------------------------------------------------------------
  // VUE 1 : FICHE PAYS (/accompagnement/pays/:countrySlug)
  // ---------------------------------------------------------------------------
  if (countrySlug) {
    const country = COUNTRIES_DATA.find((c) => c.slug === countrySlug.toLowerCase());
    // Pays inconnu : on le dit, au lieu d'afficher la fiche d'un autre pays
    if (!country) {
      return (
        <NotFoundPage
          title="Ce pays ne fait pas partie des 10 pays accompagnés"
          message="WAHHF Foundation accompagne gratuitement vers 10 pays européens. Choisissez l’un d’eux ci-dessous pour consulter sa fiche d’orientation."
        >
          <NotFoundLinks heading="Les 10 pays accompagnés" links={COUNTRY_LINKS} />
        </NotFoundPage>
      );
    }

    return (
      <>
        <SEO
          title={`${country.name} — Fiche d'orientation gratuite vers l'Europe`}
          description={`Information vérifiée et gratuite sur les études, la formation et le travail en ${country.name} par WAHHF Foundation.`}
        />

        <PageHeader>
          <PageMeta>
            <Link to="/mobilite-langues">
              Mobilité & Langues
            </Link>
            <span>/</span>
            <Link to="/mobilite-langues/accompagnement">
              Accompagnement Europe
            </Link>
            <span>/</span>
            <span>{country.name}</span>
          </PageMeta>

          <div className="flex flex-wrap items-center gap-4">
            <span className="text-5xl leading-none" aria-hidden="true">
              {country.flag}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <PageTitle>
                  S’orienter vers : {country.name}
                </PageTitle>
                <span className="px-3 py-1 rounded-pill border border-border-input text-meta text-text">
                  {country.isEU
                    ? 'Membre de l’Union européenne (UE)'
                    : 'Hors Union européenne (Pays candidat)'}
                </span>
              </div>
              <p className="text-meta text-text-secondary mt-2">
                Langues parlées / d’études : {country.languages.join(' · ')}
              </p>
            </div>
          </div>

          {/* Le fil Cameroun → pays se dessine une fois, à l'arrivée (CSS, contrat §10, lot 7) ; tracé en mouvement réduit */}
          <Fil start={{ id: 'cameroun', label: 'Cameroun' }} end={{ id: country.slug, label: country.name }} drawOnce className="max-w-[65ch]" />
          <PageIntro>
            {country.summary}
          </PageIntro>

          <PageActions>
            <PrimaryButton
              to={`/candidater?souhait=accompagnement_europe&pays=${country.slug}`}
            >
              Être accompagné gratuitement pour : {country.name}
            </PrimaryButton>
            <SecondaryButton to="/mobilite-langues/accompagnement">
              Voir les 10 pays accompagnés
            </SecondaryButton>
          </PageActions>
        </PageHeader>

        {/* BLOC D'AVERTISSEMENT STANDARD OBLIGATOIRE */}
        <section className="container-page space-y-4">
          <DisclaimerBanner />

          {/* Mention explicite obligatoire si le pays n'est pas membre de l'UE (Albanie) */}
          {!country.isEU && country.euNote && (
            <InfoBox tone="warning" title="Précision juridique importante concernant l’Albanie (État non membre de l’UE)">
              <p>{country.euNote}</p>
            </InfoBox>
          )}
        </section>

        {/* Voies possibles : Études, Formation, Travail */}
        <section className="container-page section-space space-y-12">
          <SectionHeader
            title="Les trois grandes voies de mobilité réglementaire"
            subtitle="Aperçu informatif et gratuit. Vérifiez systématiquement les critères à jour sur les portails officiels ci-dessous."
          />

          <TextList columns={3}>
            {[
              {
                num: '01',
                title: 'Études supérieures',
                text: country.pathways.studies,
              },
              {
                num: '02',
                title: 'Formation professionnelle',
                text: country.pathways.training,
              },
              {
                num: '03',
                title: 'Travail & mobilité qualifiée',
                text: country.pathways.work,
              },
            ].map((p) => (
              <TextListItem key={p.num} title={p.title}>
                <p>{p.text}</p>
              </TextListItem>
            ))}
          </TextList>

          {/* Grandes étapes & Liens officiels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-body font-semibold text-text">
                Les grandes étapes pour préparer votre projet vers : {country.name}
              </h3>
              <ol className="space-y-4">
                {country.steps.map((st, i) => (
                  <li key={st} className="flex items-start gap-4">
                    <StepNumber n={i + 1} />
                    <span className="pt-1 text-body text-text">{st}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface-green lg:col-span-5 rounded-card bg-nuit text-text-on-inverse p-7 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-body font-semibold text-text-on-inverse">
                  Liens vers les sites officiels ({country.name})
                </h3>
                <p className="text-meta text-text-secondary-on-inverse">
                  Ne vous fiez jamais à des pages non officielles. Consultez directement les portails institutionnels :
                </p>

                <ul className="pt-2">
                  {country.officialLinks.map((lnk) => (
                    <li key={lnk.url} className="border-t border-border-subtle-on-inverse py-3">
                      <a
                        href={lnk.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-body font-semibold text-link-on-inverse underline underline-offset-4 decoration-1 hover:decoration-2"
                      >
                        {lnk.label}
                        <span className="sr-only"> (nouvel onglet)</span>
                        <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                      </a>
                      <p className="text-meta text-text-secondary-on-inverse break-all">
                        {lnk.url} ({lnk.todoNote})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4">
                <Link
                  to="/accompagnement/eviter-les-arnaques"
                  className="inline-flex min-h-11 items-center text-body text-link-on-inverse underline underline-offset-4"
                >
                  Lire notre guide de vigilance contre les fausses offres
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation rapide entre les 10 pays */}
          <div className="pt-8 border-t border-border-subtle space-y-4">
            <p className="text-meta text-text-secondary">
              Consulter une autre fiche parmi les 10 pays accompagnés :
            </p>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES_DATA.map((c) => (
                <Link
                  key={c.slug}
                  to={`/accompagnement/pays/${c.slug}`}
                  className={`px-3.5 py-2 rounded-pill text-xs font-medium transition-colors ${
                    c.slug === country.slug
                      ? 'bg-action text-or font-semibold'
                      : 'bg-surface-raised border border-nuit/15 text-text hover:border-or'
                  }`}
                >
                  {c.flag} {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  // ---------------------------------------------------------------------------
  // VUE 2 : PAGE THÉMATIQUE (/accompagnement/:topicSlug)
  // ---------------------------------------------------------------------------
  // Guide inconnu : message dédié et liste des guides, au lieu de la page générale
  if (topicSlug && !THEMATIC_GUIDES[topicSlug]) {
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

  if (topicSlug && THEMATIC_GUIDES[topicSlug]) {
    const guide = THEMATIC_GUIDES[topicSlug];

    return (
      <>
        <SEO
          title={`${guide.title} — Accompagnement gratuit vers l'Europe`}
          description={guide.subtitle}
        />

        <PageHeader>
          <PageMeta>
            <Link to="/mobilite-langues">
              Mobilité & Langues
            </Link>
            <span>/</span>
            <Link to="/mobilite-langues/accompagnement">
              Accompagnement Europe
            </Link>
            <span>/</span>
            <span>{guide.title}</span>
          </PageMeta>

          <PageTitle>
            {guide.title}
          </PageTitle>
          <PageIntro>
            {guide.subtitle}
          </PageIntro>
        </PageHeader>

        <section className="container-page *:max-w-5xl">
          <DisclaimerBanner />
        </section>

        <section className="container-page section-space space-y-12">
          {/* Colonne de lecture de 65 caractères (contrat §8) : sections sans carte ni filigrane (liste §6, EuropeSupport:363) */}
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

          {/* Navigation entre les 5 guides thématiques */}
          <div className="surface-green rounded-card bg-nuit text-text-on-inverse p-7 sm:p-9 space-y-5">
            <h3 className="text-body font-semibold text-text-on-inverse">
              Tous nos guides thématiques gratuits
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {Object.values(THEMATIC_GUIDES).map((g) => (
                <Link
                  key={g.slug}
                  to={`/accompagnement/${g.slug}`}
                  className={`px-4 py-2 rounded-pill text-xs sm:text-sm font-medium transition-colors ${
                    g.slug === guide.slug
                      ? 'border border-or bg-or text-v1-encre font-semibold'
                      : 'border border-border-on-inverse text-creme hover:bg-white/10'
                  }`}
                >
                  {g.title}
                </Link>
              ))}
            </div>
            <div className="pt-3 flex flex-wrap gap-4">
              <PrimaryButton
                to="/candidater"
                onInverse
              >
                Demander un accompagnement gratuit
              </PrimaryButton>
              <SecondaryButton to="/mobilite-langues/accompagnement" onInverse>
                Retour aux 10 pays accompagnés
              </SecondaryButton>
            </div>
          </div>
        </section>
      </>
    );
  }

  // ---------------------------------------------------------------------------
  // VUE 3 : PAGE PRINCIPALE (/mobilite-langues/accompagnement)
  // ---------------------------------------------------------------------------
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
