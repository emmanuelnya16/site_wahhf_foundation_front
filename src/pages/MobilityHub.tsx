import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Compass,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  Quote,
} from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { PrimaryButton, SecondaryButton, DonateButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import { COUNTRIES_DATA, GERMAN_LEVELS_DATA, WAHHF_IMAGES, imageSrcSet } from '../services/api';

const MOBILITY_FAQS = [
  {
    q: 'Les cours d’allemand et l’accompagnement sont-ils vraiment 100 % gratuits ?',
    a: 'Oui. L’intégralité des cours d’allemand (du niveau A1 au C1) et des séances d’orientation vers l’Europe est gratuite pour les bénéficiaires. Ce programme est financé par le groupe IROKO (dont WAHHF est la branche sociale) et par nos donateurs.',
  },
  {
    q: 'WAHHF Foundation délivre-t-elle des visas ou des contrats de travail ?',
    a: 'Non, jamais. WAHHF Foundation est une fondation à but non lucratif. Nous ne vendons ni visa, ni admission universitaire, ni contrat de travail, et nous ne garantissons aucun résultat. Les décisions appartiennent exclusivement aux ambassades, consulats et établissements officiels.',
  },
  {
    q: 'Faut-il envoyer son passeport ou sa carte d’identité pour candidater ?',
    a: 'Non. Lors de votre candidature en ligne sur ce site, aucun document d’identité (ni passeport, ni CNI) et aucune somme d’argent ne vous sont demandés.',
  },
  {
    q: 'Comment savoir par quel niveau d’allemand commencer ?',
    a: 'Si vous débutez totalement, choisissez le niveau A1. Si vous avez déjà des bases, vous pouvez passer gratuitement notre test d’orientation de 20 questions sur la page Académie de langues.',
  },
];

export default function MobilityHub() {
  return (
    <>
      <SEO
        title="Mobilité & Langues — Apprendre, se préparer, s'orienter gratuitement"
        description="Domaine 06 de WAHHF Foundation : Académie de langue allemande gratuite (A1 à C1) et accompagnement transparent vers 10 pays européens, financé par IROKO et nos donateurs."
      />

      {/* HERO */}
      <section className="surface-green relative pt-32 pb-20 sm:pt-36 sm:pb-24 bg-nuit text-creme overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <img
            src={WAHHF_IMAGES.openDayVisioconference}
            srcSet={imageSrcSet(WAHHF_IMAGES.openDayVisioconference)}
            sizes="100vw"
            alt=""
            width={1027}
            height={628}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-nuit via-nuit/85 to-nuit" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-pill bg-or/20 border border-or/45 text-gold-on-green text-xs font-semibold uppercase tracking-[0.18em]">
            <CheckCircle2 className="w-4 h-4" />
            <span>Domaine 06 / 06 · 100 % Gratuit, financé par IROKO et nos donateurs</span>
          </div>

          <h1 className="font-serif font-normal text-[clamp(2.2rem,4.8vw,4.1rem)] leading-[1.1] text-creme max-w-4xl">
            Apprendre, se préparer, s’orienter — gratuitement
          </h1>

          <p className="text-base sm:text-xl text-creme/85 max-w-3xl leading-relaxed">
            Accompagnement des cours de langue allemande (A1 à C1) et information fiable sur les parcours d’études, de formation et de travail vers 10 pays européens.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <PrimaryButton
              to="/candidater"
              onInverse
            >
              Candidater au programme
            </PrimaryButton>
            <SecondaryButton to="/mobilite-langues/academie" onInverse>
              Découvrir l’Académie d’allemand (A1–C1)
            </SecondaryButton>
            <SecondaryButton to="/mobilite-langues/accompagnement" onInverse>
              Explorer les 10 pays accompagnés
            </SecondaryButton>
          </div>
        </div>
      </section>

      {/* BLOC D'AVERTISSEMENT STANDARD OBLIGATOIRE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <DisclaimerBanner />
      </section>

      {/* POURQUOI CE PROGRAMME EXISTE */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader
              kicker="Pourquoi ce programme existe"
              title="Protéger la jeunesse contre la désinformation et ouvrir l’accès au savoir"
              subtitle="Trop de jeunes et de familles s’endettent auprès d’intermédiaires frauduleux qui vendent de fausses promesses. WAHHF Foundation répond par la gratuité, la rigueur linguistique et la transparence."
            />

            <div className="space-y-4 text-base text-text-secondary leading-relaxed">
              <p>
                Un projet d’études ou de formation professionnelle à l’étranger ne s’achète pas : il se construit par l’apprentissage exigeant de la langue, la conformité des diplômes et le respect strict des procédures consulaires officielles.
              </p>
              <p>
                Grâce au soutien structurel du <strong>groupe IROKO</strong> et de nos donateurs, nous offrons gratuitement ce que beaucoup marchandent : des cours d’allemand structurés du niveau A1 au C1 et une orientation documentée étape par étape.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {[
              {
                title: 'Zéro frais pour le bénéficiaire',
                desc: 'Aucun frais d’inscription, aucun frais de dossier, aucune commission à aucun moment du parcours.',
              },
              {
                title: 'Lutte active contre les arnaques',
                desc: 'Ateliers de prévention pour reconnaître les faux contrats, les faux visas et vérifier les sources officielles.',
              },
              {
                title: 'Exigence académique & linguistique',
                desc: 'Accompagnement progressif du niveau débutant A1 jusqu’à l’autonomie universitaire C1.',
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="rounded-card bg-surface-raised border border-border-soft p-6 shadow-xs flex items-start gap-4"
              >
                <span className="w-9 h-9 rounded-pill bg-nuit text-or font-serif text-sm flex items-center justify-center shrink-0">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-text mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-tertiary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LES DEUX GRANDES PORTES D'ENTRÉE */}
      <section className="py-20 bg-white/65 dark:bg-v1-sous-bois/40 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <SectionHeader
            kicker="Deux volets complémentaires"
            title="Choisissez votre porte d’entrée"
            subtitle="Vous pouvez candidater uniquement aux cours de langue allemande, uniquement à l’accompagnement documentaire, ou aux deux."
            align="center"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Porte 1 : Académie de langues */}
            <div className="relative rounded-card bg-surface-raised border border-border p-8 sm:p-10 shadow-sm flex flex-col justify-between overflow-hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-4 right-5 font-serif text-8xl text-nuit/[0.05]"
              >
                01
              </span>
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-nuit text-or flex items-center justify-center">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1 rounded-pill bg-or/20 text-accent text-xs font-semibold">
                    Gratuit · Niveaux A1 à C1
                  </span>
                </div>

                <h3 className="font-serif font-normal text-3xl text-text">
                  Académie de langues (Allemand A1 à C1)
                </h3>

                <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
                  Accompagnement complet pour apprendre l’allemand étape par étape : compréhension, expression orale et écrite, test de niveau interactif gratuit et préparation méthodique aux certifications.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {GERMAN_LEVELS_DATA.map((lvl) => (
                    <Link
                      key={lvl.slug}
                      to={`/academie/${lvl.slug}`}
                      className="px-3.5 py-1.5 rounded-pill bg-surface-inset text-xs font-semibold text-accent hover:bg-or hover:text-v1-encre transition-colors"
                    >
                      Niveau {lvl.level}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-border-subtle flex flex-wrap items-center justify-between gap-4 relative z-10">
                <PrimaryButton to="/mobilite-langues/academie">
                  Accéder à l’Académie de langues
                </PrimaryButton>
                <Link
                  to="/mobilite-langues/academie#test-niveau"
                  className="text-xs sm:text-sm font-semibold text-accent underline underline-offset-4"
                >
                  Passer le test de niveau (20 questions)
                </Link>
              </div>
            </div>

            {/* Porte 2 : Accompagnement vers l'Europe */}
            <div className="surface-green relative rounded-card bg-nuit text-creme border border-or/35 p-8 sm:p-10 shadow-sm flex flex-col justify-between overflow-hidden">
              <span
                aria-hidden="true"
                className="pointer-events-none select-none absolute -bottom-4 right-5 font-serif text-8xl text-creme/[0.05]"
              >
                02
              </span>
              <div className="space-y-5 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-or text-v1-encre flex items-center justify-center">
                    <Compass className="w-7 h-7" />
                  </div>
                  <span className="px-3.5 py-1 rounded-pill bg-or/20 text-gold-on-green text-xs font-semibold">
                    Gratuit · 10 Pays Documentés
                  </span>
                </div>

                <h3 className="font-serif font-normal text-3xl text-creme">
                  Accompagnement vers l’Europe
                </h3>

                <p className="text-sm sm:text-base text-creme/85 leading-relaxed">
                  Un parcours pédagogique en 4 étapes pour comprendre les voies légales (études, formation professionnelle, travail), préparer son dossier et vérifier chaque démarche sur les portails officiels.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {COUNTRIES_DATA.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/accompagnement/pays/${c.slug}`}
                      className="px-3 py-1 rounded-pill bg-white/10 hover:bg-or hover:text-v1-encre text-xs font-medium text-creme transition-colors"
                    >
                      {c.flag} {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <PrimaryButton
                  to="/mobilite-langues/accompagnement"
                  onInverse
                >
                  Explorer l’accompagnement Europe
                </PrimaryButton>
                <Link
                  to="/accompagnement/eviter-les-arnaques"
                  className="text-xs sm:text-sm font-semibold text-or underline underline-offset-4"
                >
                  Guide : Éviter les arnaques
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES DU PROGRAMME (TODO) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10">
        <SectionHeader
          kicker="Retours d’expérience"
          title="Ce que disent nos apprenants accompagnés"
          subtitle="Témoignages d’exemple marqués TODO dans l’attente des citations validées par l’équipe WAHHF."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: 'Boris K. (TODO : confirmer témoignage)',
              track: 'Parcours Allemand B1 & Orientation Formation (Ausbildung)',
              text: '« Avant de connaître WAHHF, on me demandait des sommes énormes sur les réseaux sociaux pour de simples formulaires. Ici, j’ai appris l’allemand gratuitement et compris comment postuler moi-même sur les sites officiels. »',
            },
            {
              name: 'Raïssa T. (TODO : confirmer témoignage)',
              track: 'Parcours Études Universitaires · Niveau B2',
              text: '« Les séances de relecture de CV et d’explication des démarches consulaires m’ont permis de structurer mon projet d’études avec sérénité et honnêteté. »',
            },
          ].map((item) => (
            <div
              key={item.name}
              className="rounded-card bg-surface-raised border border-border-soft p-7 space-y-4 shadow-xs"
            >
              <Quote className="w-8 h-8 text-or" />
              <p className="font-serif text-lg text-text leading-relaxed">
                {item.text}
              </p>
              <div>
                <p className="font-semibold text-sm text-accent">{item.name}</p>
                <p className="text-xs text-text-muted">{item.track}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 bg-white/60 dark:bg-v1-sous-bois/30 border-t border-border-subtle">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeader
            kicker="Questions fréquentes"
            title="Tout comprendre sur la gratuité et nos règles d’éthique"
            align="center"
          />

          <div className="space-y-4">
            {MOBILITY_FAQS.map((faq) => (
              <div
                key={faq.q}
                className="rounded-[20px] bg-surface-raised border border-border-soft p-6 space-y-2"
              >
                <h3 className="font-serif text-lg sm:text-xl text-text flex items-start gap-2.5">
                  <HelpCircle className="w-5 h-5 text-or shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm sm:text-base text-text-tertiary pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APPEL À CANDIDATER OU À SOUTENIR LE PROGRAMME PAR UN DON */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="surface-green rounded-card bg-nuit text-creme p-8 sm:p-12 border border-or/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-kicker text-or">
              <ShieldCheck className="w-4 h-4" />
              Passez à l’action en toute confiance
            </span>
            <h2 className="font-serif font-normal text-2xl sm:text-4xl text-creme">
              Candidater gratuitement ou financer le parcours d’un jeune
            </h2>
            <p className="text-sm sm:text-base text-creme/80 leading-relaxed">
              Vous souhaitez rejoindre la prochaine cohorte d’allemand ou être orienté ? Remplissez le formulaire unique. Vous souhaitez pérenniser la gratuité de cette académie ? Soutenez-nous par un don.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3.5 justify-end">
            <PrimaryButton
              to="/candidater"
              onInverse
              className="justify-center"
            >
              Candidater gratuitement
            </PrimaryButton>
            <DonateButton size="lg" to="/faire-un-don">
              Financer un parcours (Faire un don)
            </DonateButton>
          </div>
        </div>
      </section>
    </>
  );
}
