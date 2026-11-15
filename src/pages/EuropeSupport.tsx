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
    const country =
      COUNTRIES_DATA.find((c) => c.slug === countrySlug.toLowerCase()) ||
      COUNTRIES_DATA[0];

    return (
      <>
        <SEO
          title={`${country.name} — Fiche d'orientation gratuite vers l'Europe`}
          description={`Information vérifiée et gratuite sur les études, la formation et le travail en ${country.name} par WAHHF Foundation.`}
        />

        <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 bg-[#0F3D2E] text-[#F5F1E8]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#E8A317] font-semibold uppercase tracking-[0.18em]">
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
                  <h1 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.75rem)] leading-tight text-[#F5F1E8]">
                    S’orienter vers : {country.name}
                  </h1>
                  <span
                    className={`px-3.5 py-1 rounded-full text-xs font-semibold ${
                      country.isEU
                        ? 'bg-[#E8A317]/20 text-gold-on-green border border-[#E8A317]/40'
                        : 'bg-[#C8102E] text-white'
                    }`}
                  >
                    {country.isEU
                      ? 'Membre de l’Union européenne (UE)'
                      : 'Hors Union européenne (Pays candidat)'}
                  </span>
                </div>
                <p className="text-sm text-[#F5F1E8]/80 mt-1">
                  Langues parlées / d’études : {country.languages.join(' · ')}
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-[#F5F1E8]/85 max-w-3xl leading-relaxed">
              {country.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <PrimaryButton
                to={`/candidater?souhait=accompagnement_europe&pays=${country.slug}`}
                className="!bg-[#E8A317] !text-[#1B1B18]"
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
            <div className="rounded-[24px] bg-[#E8A317]/20 border-2 border-[#E8A317] p-6 text-[#1B1B18] dark:text-[#F5F1E8] flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-[#C8102E] dark:text-[#E8A317] shrink-0 mt-0.5" />
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
                className="relative rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/12 dark:border-[#F5F1E8]/12 p-7 space-y-3 overflow-hidden shadow-xs"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none select-none absolute -bottom-3 right-3 font-serif text-6xl text-[#0F3D2E]/[0.05]"
                >
                  {p.num}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-gold-text dark:text-[#E8A317]">
                  Voie {p.num}
                </span>
                <h3 className="font-serif text-2xl text-[#1B1B18] dark:text-[#F5F1E8]">
                  {p.title}
                </h3>
                <p className="text-sm sm:text-base text-[#1B1B18]/80 dark:text-[#F5F1E8]/80 leading-relaxed">
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          {/* Grandes étapes & Liens officiels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            <div className="lg:col-span-7 rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/12 dark:border-[#F5F1E8]/12 p-7 sm:p-8 space-y-5">
              <h3 className="font-serif text-2xl text-[#1B1B18] dark:text-[#F5F1E8]">
                Les grandes étapes pour préparer votre projet vers : {country.name}
              </h3>
              <ol className="space-y-4">
                {country.steps.map((st, i) => (
                  <li key={st} className="flex items-start gap-3.5 text-sm sm:text-base">
                    <span className="w-7 h-7 rounded-full bg-[#0F3D2E] text-[#E8A317] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-[#1B1B18]/85 dark:text-[#F5F1E8]/85">{st}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5 rounded-[24px] bg-[#0F3D2E] text-[#F5F1E8] border border-[#E8A317]/35 p-7 sm:p-8 space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#E8A317]">
                  Sources Gouvernementales & Ambassades
                </span>
                <h3 className="font-serif text-2xl text-[#F5F1E8]">
                  Liens vers les sites officiels ({country.name})
                </h3>
                <p className="text-xs text-[#F5F1E8]/75">
                  Ne vous fiez jamais à des pages non officielles. Consultez directement les portails institutionnels :
                </p>

                <div className="space-y-3 pt-2">
                  {country.officialLinks.map((lnk) => (
                    <a
                      key={lnk.url}
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-[#E8A317]/30 transition"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium text-sm text-[#F5F1E8] group-hover:text-[#E8A317]">
                          {lnk.label}
                        </span>
                        <ExternalLink className="w-4 h-4 text-[#E8A317] shrink-0" />
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
                  className="text-xs font-semibold text-[#E8A317] underline underline-offset-4"
                >
                  → Lire notre guide de vigilance contre les fausses offres
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation rapide entre les 10 pays */}
          <div className="pt-8 border-t border-[#0F3D2E]/10 dark:border-[#F5F1E8]/10 space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-text dark:text-[#E8A317]">
              Consulter une autre fiche parmi les 10 pays accompagnés :
            </p>
            <div className="flex flex-wrap gap-2">
              {COUNTRIES_DATA.map((c) => (
                <Link
                  key={c.slug}
                  to={`/accompagnement/pays/${c.slug}`}
                  className={`px-3.5 py-2 rounded-full text-xs font-medium transition-colors ${
                    c.slug === country.slug
                      ? 'bg-[#0F3D2E] text-[#E8A317] font-semibold'
                      : 'bg-white dark:bg-[#132A21] border border-[#0F3D2E]/15 text-[#1B1B18] dark:text-[#F5F1E8] hover:border-[#E8A317]'
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
          className={`pt-32 pb-16 sm:pt-36 sm:pb-20 ${
            isAntiScam ? 'bg-[#0F3D2E] border-b-4 border-[#E8A317]' : 'bg-[#0F3D2E]'
          } text-[#F5F1E8]`}
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#E8A317] font-semibold uppercase tracking-[0.18em]">
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

            <h1 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.6rem)] leading-tight text-[#F5F1E8]">
              {guide.title}
            </h1>
            <p className="text-base sm:text-xl text-[#F5F1E8]/85 max-w-3xl leading-relaxed">
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
              className="rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/12 dark:border-[#F5F1E8]/12 p-7 sm:p-10 space-y-4 shadow-xs relative overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-3 right-4 font-serif text-7xl text-[#0F3D2E]/[0.04]"
              >
                0{idx + 1}
              </span>
              <h2 className="font-serif font-normal text-2xl sm:text-3xl text-[#1B1B18] dark:text-[#F5F1E8]">
                {sec.heading}
              </h2>
              <p className="text-base text-[#1B1B18]/80 dark:text-[#F5F1E8]/80 leading-relaxed">
                {sec.body}
              </p>
              {sec.bullets && (
                <ul className="space-y-2.5 pt-2">
                  {sec.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-3 text-sm sm:text-base text-[#1B1B18]/85 dark:text-[#F5F1E8]/85"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#0F3D2E] dark:text-[#E8A317] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}

          {/* Navigation entre les 5 guides thématiques */}
          <div className="rounded-[24px] bg-[#0F3D2E] text-[#F5F1E8] p-7 sm:p-9 border border-[#E8A317]/35 space-y-5">
            <h3 className="font-serif text-2xl text-[#F5F1E8]">
              Tous nos guides thématiques gratuits
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {Object.values(THEMATIC_GUIDES).map((g) => (
                <Link
                  key={g.slug}
                  to={`/accompagnement/${g.slug}`}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                    g.slug === guide.slug
                      ? 'bg-[#E8A317] text-[#1B1B18] font-semibold'
                      : 'bg-white/10 text-[#F5F1E8] hover:bg-white/20'
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
                className="!bg-[#E8A317] !text-[#1B1B18]"
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
      <section className="pt-32 pb-16 sm:pt-36 sm:pb-20 bg-[#0F3D2E] text-[#F5F1E8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#E8A317] font-semibold uppercase tracking-[0.18em]">
            <Link to="/mobilite-langues" className="hover:underline">
              Mobilité & Langues
            </Link>
            <span>/</span>
            <span>Accompagnement vers l’Europe</span>
          </div>

          <h1 className="font-serif font-normal text-[clamp(2.1rem,4.6vw,3.9rem)] leading-[1.1] text-[#F5F1E8] max-w-4xl">
            Un accompagnement gratuit, transparent et étape par étape
          </h1>

          <p className="text-base sm:text-xl text-[#F5F1E8]/85 max-w-3xl leading-relaxed">
            Comprendre les parcours légaux, préparer un dossier authentique, apprendre la langue du pays et vérifier chaque information sur les portails officiels de 10 pays européens.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <PrimaryButton
              to="/candidater?souhait=accompagnement_europe"
              className="!bg-[#E8A317] !text-[#1B1B18]"
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

        <div className="relative pl-6 sm:pl-10 border-l-2 border-[#E8A317] space-y-8">
          {FOUR_STEPS.map((item) => (
            <div
              key={item.step}
              className="relative rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/12 dark:border-[#F5F1E8]/12 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6"
            >
              <div
                aria-hidden="true"
                className="absolute -left-[33px] sm:-left-[49px] top-8 w-4 h-4 rounded-full bg-[#0F3D2E] border-2 border-[#E8A317]"
              />
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-gold-text dark:text-[#E8A317]">
                  Étape {item.step} / 04
                </span>
                <h3 className="font-serif font-normal text-xl sm:text-2xl text-[#1B1B18] dark:text-[#F5F1E8]">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-[#1B1B18]/75 dark:text-[#F5F1E8]/75 max-w-2xl">
                  {item.desc}
                </p>
              </div>
              <Link
                to={`/accompagnement/${item.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F5F1E8] dark:bg-[#0F3D2E] text-[#0F3D2E] dark:text-[#E8A317] text-xs sm:text-sm font-semibold hover:bg-[#E8A317] hover:text-[#1B1B18] transition-colors shrink-0"
              >
                <span>Lire le guide</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* LES 5 PAGES THÉMATIQUES D'INFORMATION */}
      <section className="py-16 bg-white/60 dark:bg-[#132A21]/30 border-y border-[#0F3D2E]/10 dark:border-[#F5F1E8]/10">
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
                  className={`group rounded-[24px] p-6 border transition flex flex-col justify-between ${
                    topic.highlight
                      ? 'bg-[#0F3D2E] text-[#F5F1E8] border-[#E8A317]'
                      : 'bg-white dark:bg-[#132A21] border-[#0F3D2E]/12 dark:border-[#F5F1E8]/12 hover:border-[#E8A317]'
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        topic.highlight
                          ? 'bg-[#E8A317] text-[#1B1B18]'
                          : 'bg-[#0F3D2E] text-[#E8A317]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-serif text-lg">{topic.title}</h3>
                    <p
                      className={`text-xs leading-relaxed ${
                        topic.highlight
                          ? 'text-[#F5F1E8]/80'
                          : 'text-[#1B1B18]/70 dark:text-[#F5F1E8]/70'
                      }`}
                    >
                      {topic.sub}
                    </p>
                  </div>
                  <div
                    className={`pt-4 mt-4 border-t border-current/10 flex items-center justify-between text-xs font-semibold ${
                      topic.highlight ? 'text-[#E8A317]' : 'text-gold-text dark:text-[#E8A317]'
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
              className="group relative rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/12 dark:border-[#F5F1E8]/12 p-7 shadow-xs hover:shadow-md hover:-translate-y-1 transition flex flex-col justify-between overflow-hidden"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-4 right-4 font-serif text-7xl text-[#0F3D2E]/[0.05]"
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <h3 className="font-serif font-normal text-2xl text-[#1B1B18] dark:text-[#F5F1E8] group-hover:text-[#0F3D2E] dark:group-hover:text-[#E8A317]">
                      {country.name}
                    </h3>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      country.isEU
                        ? 'bg-[#0F3D2E]/10 dark:bg-[#F5F1E8]/10 text-[#0F3D2E] dark:text-[#E8A317]'
                        : 'bg-[#E8A317]/30 text-[#1B1B18] dark:text-gold-on-green'
                    }`}
                  >
                    {country.isEU ? 'Membre UE' : 'Hors UE'}
                  </span>
                </div>

                <p className="text-xs font-medium text-[#0F3D2E] dark:text-[#E8A317]">
                  Langues : {country.languages.join(', ')}
                </p>

                <p className="text-sm text-[#1B1B18]/75 dark:text-[#F5F1E8]/75 line-clamp-3 leading-relaxed">
                  {country.summary}
                </p>

                {!country.isEU && (
                  <p className="text-xs bg-[#E8A317]/15 border border-[#E8A317]/40 rounded-xl p-2.5 text-[#1B1B18] dark:text-[#F5F1E8]">
                    <strong>Note :</strong> L’Albanie est un pays européen candidat mais n’est pas membre de l’Union européenne.
                  </p>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-[#0F3D2E]/10 dark:border-[#F5F1E8]/10 flex items-center justify-between text-xs font-semibold text-[#0F3D2E] dark:text-[#E8A317] relative z-10">
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
