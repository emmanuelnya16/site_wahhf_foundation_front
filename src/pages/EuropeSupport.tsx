import { Link, useParams } from 'react-router-dom';
import {
  Compass,
  FileCheck2,
  GraduationCap,
  ShieldAlert,
  ArrowUpRight,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Home,
} from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import { COUNTRIES_DATA, THEMATIC_GUIDES } from '../services/api';
import NotFoundPage, { NotFoundLinks, COUNTRY_LINKS } from './NotFoundPage';

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

        <section className="surface-green pt-32 pb-16 sm:pt-36 sm:pb-20 bg-foret text-creme">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-or font-semibold uppercase tracking-[0.18em]">
              <Link to="/mobilite-langues" className="hover:underline">
                Mobilité & Langues
              </Link>
              <span>/</span>
              <Link to="/mobilite-langues/accompagnement" className="hover:underline">
                Accompagnement Europe
              </Link>
              <span>/</span>
              <span>{country.name}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="text-5xl" aria-hidden="true">
                {country.flag}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.75rem)] leading-tight text-creme">
                    S’orienter vers : {country.name}
                  </h1>
                  <span
                    className={`px-3.5 py-1 rounded-pill text-xs font-semibold ${
                      country.isEU
                        ? 'bg-or/20 text-gold-on-green border border-or/40'
                        : 'bg-rouge text-white'
                    }`}
                  >
                    {country.isEU
                      ? 'Membre de l’Union européenne (UE)'
                      : 'Hors Union européenne (Pays candidat)'}
                  </span>
                </div>
                <p className="text-sm text-creme/80 mt-1">
                  Langues parlées / d’études : {country.languages.join(' · ')}
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-creme/85 max-w-3xl leading-relaxed">
              {country.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <PrimaryButton
                to={`/candidater?souhait=accompagnement_europe&pays=${country.slug}`}
                variant="gold"
              >
                Être accompagné gratuitement pour : {country.name}
              </PrimaryButton>
              <SecondaryButton to="/mobilite-langues/accompagnement" light>
                Voir les 10 pays accompagnés
              </SecondaryButton>
            </div>
          </div>
        </section>

        {/* BLOC D'AVERTISSEMENT STANDARD OBLIGATOIRE */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-4">
          <DisclaimerBanner />

          {/* Mention explicite obligatoire si le pays n'est pas membre de l'UE (Albanie) */}
          {!country.isEU && country.euNote && (
            <div className="rounded-card bg-or/20 border-2 border-or p-6 text-text flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-rouge dark:text-or shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-serif text-lg font-medium">
                  Précision juridique importante concernant l’Albanie (État non membre de l’UE)
                </p>
                <p className="text-sm sm:text-base leading-relaxed">{country.euNote}</p>
              </div>
            </div>
          )}
        </section>

        {/* Voies possibles : Études, Formation, Travail */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-12">
          <SectionHeader
            kicker={`Voies légales · ${country.name}`}
            title="Les trois grandes voies de mobilité réglementaire"
            subtitle="Aperçu informatif et gratuit. Vérifiez systématiquement les critères à jour sur les portails officiels ci-dessous."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <div
                key={p.num}
                className="relative rounded-card bg-surface-raised border border-border-soft p-7 space-y-3 overflow-hidden shadow-xs"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -bottom-3 right-3 font-serif text-6xl text-foret/[0.05]"
                >
                  {p.num}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-accent-or">
                  Voie {p.num}
                </span>
                <h3 className="font-serif text-2xl text-text">
                  {p.title}
                </h3>
                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          {/* Grandes étapes & Liens officiels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            <div className="lg:col-span-7 rounded-card bg-surface-raised border border-border-soft p-7 sm:p-8 space-y-5">
              <h3 className="font-serif text-2xl text-text">
                Les grandes étapes pour préparer votre projet vers : {country.name}
              </h3>
              <ol className="space-y-4">
                {country.steps.map((st, i) => (
                  <li key={st} className="flex items-start gap-3.5 text-sm sm:text-base">
                    <span className="w-7 h-7 rounded-pill bg-foret text-or text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-encre/85 dark:text-creme/85">{st}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="surface-green lg:col-span-5 rounded-card bg-foret text-creme border border-or/35 p-7 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-or">
                  Sources Gouvernementales & Ambassades
                </span>
                <h3 className="font-serif text-2xl text-creme">
                  Liens vers les sites officiels ({country.name})
                </h3>
                <p className="text-xs text-creme/75">
                  Ne vous fiez jamais à des pages non officielles. Consultez directement les portails institutionnels :
                </p>

                <div className="space-y-3 pt-2">
                  {country.officialLinks.map((lnk) => (
                    <a
                      key={lnk.url}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-or/30 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm text-creme group-hover:text-or">
                          {lnk.label}
                        </span>
                        <ExternalLink className="w-4 h-4 text-or shrink-0" />
                      </div>
                      <span className="text-[11px] text-gold-on-green block mt-1">
                        {lnk.url} ({lnk.todoNote})
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/15">
                <Link
                  to="/accompagnement/eviter-les-arnaques"
                  className="text-xs font-semibold text-or underline underline-offset-4"
                >
                  → Lire notre guide de vigilance contre les fausses offres
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation rapide entre les 10 pays */}
          <div className="pt-8 border-t border-border-subtle space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-accent-or">
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
                      : 'bg-surface-raised border border-foret/15 text-text hover:border-or'
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
    const isAntiScam = topicSlug === 'eviter-les-arnaques';

    return (
      <>
        <SEO
          title={`${guide.title} — Accompagnement gratuit vers l'Europe`}
          description={guide.subtitle}
        />

        <section
          className={`surface-green pt-32 pb-16 sm:pt-36 sm:pb-20 ${
            isAntiScam ? 'bg-foret border-b-4 border-or' : 'bg-foret'
          } text-creme`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-or font-semibold uppercase tracking-[0.18em]">
              <Link to="/mobilite-langues" className="hover:underline">
                Mobilité & Langues
              </Link>
              <span>/</span>
              <Link to="/mobilite-langues/accompagnement" className="hover:underline">
                Accompagnement Europe
              </Link>
              <span>/</span>
              <span>{guide.kicker}</span>
            </div>

            <h1 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.6rem)] leading-tight text-creme">
              {guide.title}
            </h1>
            <p className="text-base sm:text-xl text-creme/85 max-w-3xl leading-relaxed">
              {guide.subtitle}
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <DisclaimerBanner />
        </section>

        <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
          {guide.sections.map((sec, idx) => (
            <article
              key={sec.heading}
              className="rounded-card bg-surface-raised border border-border-soft p-7 sm:p-10 space-y-4 shadow-xs relative overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-3 right-4 font-serif text-7xl text-foret/[0.04]"
              >
                0{idx + 1}
              </span>
              <h2 className="font-serif font-normal text-2xl sm:text-3xl text-text">
                {sec.heading}
              </h2>
              <p className="text-base text-text-secondary leading-relaxed">
                {sec.body}
              </p>
              {sec.bullets && (
                <ul className="space-y-2.5 pt-2">
                  {sec.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm sm:text-base text-encre/85 dark:text-creme/85"
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          {/* Navigation entre les 5 guides thématiques */}
          <div className="surface-green rounded-card bg-foret text-creme p-7 sm:p-9 border border-or/35 space-y-5">
            <h3 className="font-serif text-2xl text-creme">
              Tous nos guides thématiques gratuits
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {Object.values(THEMATIC_GUIDES).map((g) => (
                <Link
                  key={g.slug}
                  to={`/accompagnement/${g.slug}`}
                  className={`px-4 py-2 rounded-pill text-xs sm:text-sm font-medium transition-colors ${
                    g.slug === guide.slug
                      ? 'bg-or text-encre font-semibold'
                      : 'bg-white/10 text-creme hover:bg-white/20'
                  }`}
                >
                  {g.title}
                </Link>
              ))}
            </div>
            <div className="pt-3 flex flex-wrap gap-4">
              <PrimaryButton
                to="/candidater"
                magnetic
                variant="gold"
              >
                Demander un accompagnement gratuit
              </PrimaryButton>
              <SecondaryButton to="/mobilite-langues/accompagnement" light>
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
      <section className="surface-green pt-32 pb-16 sm:pt-36 sm:pb-20 bg-foret text-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-or font-semibold uppercase tracking-[0.18em]">
            <Link to="/mobilite-langues" className="hover:underline">
              Mobilité & Langues
            </Link>
            <span>/</span>
            <span>Accompagnement vers l’Europe</span>
          </div>

          <h1 className="font-serif font-normal text-[clamp(2.1rem,4.6vw,3.9rem)] leading-[1.1] text-creme max-w-4xl">
            Un accompagnement gratuit, transparent et étape par étape
          </h1>

          <p className="text-base sm:text-xl text-creme/85 max-w-3xl leading-relaxed">
            Comprendre les parcours légaux, préparer un dossier authentique, apprendre la langue du pays et vérifier chaque information sur les portails officiels de 10 pays européens.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <PrimaryButton
              to="/candidater?souhait=accompagnement_europe"
              variant="gold"
            >
              Être accompagné gratuitement
            </PrimaryButton>
            <SecondaryButton to="/accompagnement/eviter-les-arnaques" light>
              Guide prioritaire : Éviter les arnaques
            </SecondaryButton>
          </div>
        </div>
      </section>

      {/* BLOC D'AVERTISSEMENT STANDARD OBLIGATOIRE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <DisclaimerBanner />
      </section>

      {/* PARCOURS EN 4 ÉTAPES CLAIRES (Frise verticale) */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
        <SectionHeader
          kicker="Méthodologie d’orientation"
          title="Votre parcours d’accompagnement en 4 étapes claires"
          subtitle="Cliquez sur chaque étape pour lire le guide thématique complet correspondant."
          align="center"
        />

        <div className="relative [--timeline-pad:1.5rem] sm:[--timeline-pad:2.5rem] pl-(--timeline-pad) border-l-2 border-or space-y-8">
          {FOUR_STEPS.map((item) => (
            <div
              key={item.step}
              className="relative rounded-card bg-surface-raised border border-border-soft p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div
                aria-hidden="true"
                className="absolute -left-[calc(var(--timeline-pad)+9px)] top-8 w-4 h-4 rounded-pill bg-foret border-2 border-or"
              />
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-accent-or">
                  Étape {item.step} / 04
                </span>
                <h3 className="font-serif font-normal text-xl sm:text-2xl text-text">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-text-tertiary max-w-2xl">
                  {item.desc}
                </p>
              </div>
              <Link
                to={`/accompagnement/${item.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-pill bg-surface-inset text-accent text-xs sm:text-sm font-semibold hover:bg-or hover:text-encre transition-colors shrink-0"
              >
                <span>Lire le guide</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* LES 5 PAGES THÉMATIQUES D'INFORMATION */}
      <section className="py-16 bg-white/60 dark:bg-sous-bois/30 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeader
            kicker="Guides pratiques gratuits"
            title="5 dossiers thématiques pour avancer sans intermédiaire"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              {
                slug: 'comprendre-les-parcours',
                icon: Compass,
                title: '1. Comprendre les parcours',
                sub: 'Études, formation professionnelle et travail',
              },
              {
                slug: 'preparer-son-dossier',
                icon: FileCheck2,
                title: '2. Préparer son dossier',
                sub: 'Authenticité, CV, motivation et équivalences',
              },
              {
                slug: 'apprendre-la-langue',
                icon: GraduationCap,
                title: '3. Apprendre la langue',
                sub: 'Pourquoi la langue précède le départ',
              },
              {
                slug: 's-installer',
                icon: Home,
                title: '4. S’installer en Europe',
                sub: 'Logement, assurance et démarches d’arrivée',
              },
              {
                slug: 'eviter-les-arnaques',
                icon: ShieldAlert,
                title: '5. Éviter les arnaques',
                sub: 'Reconnaître une fausse offre et se protéger',
                highlight: true,
              },
            ].map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.slug}
                  to={`/accompagnement/${topic.slug}`}
                  className={`group rounded-card p-6 border transition flex flex-col justify-between ${
                    topic.highlight
                      ? 'bg-action text-on-action border-or'
                      : 'bg-surface-raised border-border-soft hover:border-or'
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`w-10 h-10 rounded-inner flex items-center justify-center ${
                        topic.highlight
                          ? 'bg-or text-encre'
                          : 'bg-foret text-or'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg">{topic.title}</h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        topic.highlight
                          ? 'text-creme/80'
                          : 'text-encre/70 dark:text-creme/70'
                      }`}
                    >
                      {topic.sub}
                    </p>
                  </div>
                  <div
                    className={`pt-4 mt-4 border-t border-current/10 flex items-center justify-between text-xs font-semibold ${
                      topic.highlight ? 'text-or' : 'text-accent-or'
                    }`}
                  >
                    <span>Consulter</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* LES 10 PAYS ACCOMPAGNÉS */}
      <section id="pays" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <SectionHeader
          kicker="10 Pays Documentés"
          title="Fiches d’orientation par pays"
          subtitle="Luxembourg, Allemagne, Slovénie, Italie, Grèce, Portugal, Espagne, Danemark, Pologne et Albanie (avec mention explicite du statut hors UE pour l’Albanie)."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COUNTRIES_DATA.map((country, idx) => (
            <Link
              key={country.slug}
              to={`/accompagnement/pays/${country.slug}`}
              className="group relative rounded-card bg-surface-raised border border-border-soft p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition flex flex-col justify-between overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-4 right-4 font-serif text-7xl text-foret/[0.05]"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <h3 className="font-serif font-normal text-2xl text-text group-hover:text-accent">
                      {country.name}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-pill text-[11px] font-semibold ${
                      country.isEU
                        ? 'bg-foret/10 dark:bg-creme/10 text-accent'
                        : 'bg-or/30 text-encre dark:text-gold-on-green'
                    }`}
                  >
                    {country.isEU ? 'Membre UE' : 'Hors UE'}
                  </span>
                </div>

                <p className="text-xs font-medium text-accent">
                  Langues : {country.languages.join(', ')}
                </p>

                <p className="text-sm text-text-tertiary line-clamp-3 leading-relaxed">
                  {country.summary}
                </p>

                {!country.isEU && (
                  <p className="text-xs bg-or/15 border border-or/40 rounded-inner p-2.5 text-text">
                    <strong>Note :</strong> L’Albanie est un pays européen candidat mais n’est pas membre de l’Union européenne.
                  </p>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-border-subtle flex items-center justify-between text-xs font-semibold text-accent relative z-10">
                <span>Consulter la fiche pays & liens officiels</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
