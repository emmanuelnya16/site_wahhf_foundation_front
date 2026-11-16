import { Link } from 'react-router-dom';
import {
  Quote,
} from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageTitle, PageIntro, PageActions } from '../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton, DonateButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import { COUNTRIES_DATA, GERMAN_LEVELS_DATA } from '../services/api';
import Section from '../components/wahhf/Section';
import { TextList, TextListItem, TEXT_LINK_CLASS } from '../components/wahhf/TextList';

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
        description="WAHHF Foundation : Académie de langue allemande gratuite (A1 à C1) et accompagnement transparent vers 10 pays européens, financé par IROKO et nos donateurs."
      />

      {/* HERO */}
      {/* Avertissement standard obligatoire : juste sous le titre, avant la photo sur téléphone */}
      <PageHeader photoId="open-day-visioconference" notice={<DisclaimerBanner />}>
        <PageTitle>
          Apprendre, se préparer, s’orienter — gratuitement
        </PageTitle>

        <PageIntro>
          Accompagnement des cours de langue allemande (A1 à C1) et information fiable sur les parcours d’études, de formation et de travail vers 10 pays européens.
        </PageIntro>

        <PageActions>
          <PrimaryButton
            to="/candidater"
          >
            Candidater au programme
          </PrimaryButton>
          <SecondaryButton to="/mobilite-langues/academie">
            Découvrir l’Académie d’allemand (A1–C1)
          </SecondaryButton>
          <SecondaryButton to="/mobilite-langues/accompagnement">
            Explorer les 10 pays accompagnés
          </SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* POURQUOI CE PROGRAMME EXISTE */}
      <section className="container-page section-space">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader
              title="Protéger la jeunesse contre la désinformation et ouvrir l’accès au savoir"
              subtitle="Trop de jeunes et de familles s’endettent auprès d’intermédiaires frauduleux qui vendent de fausses promesses. WAHHF Foundation répond par la gratuité, la rigueur linguistique et la transparence."
            />

            <div className="space-y-4 text-body text-text-secondary max-w-[65ch]">
              <p>
                Un projet d’études ou de formation professionnelle à l’étranger ne s’achète pas : il se construit par l’apprentissage exigeant de la langue, la conformité des diplômes et le respect strict des procédures consulaires officielles.
              </p>
              <p>
                Grâce au soutien structurel du <strong>groupe IROKO</strong> et de nos donateurs, nous offrons gratuitement ce que beaucoup marchandent : des cours d’allemand structurés du niveau A1 au C1 et une orientation documentée étape par étape.
              </p>
            </div>
          </div>

          <TextList columns={1} className="lg:col-span-5">
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
            ].map((item) => (
              <TextListItem key={item.title} title={item.title}>
                <p>{item.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </section>

      {/* LES DEUX GRANDES PORTES D'ENTRÉE */}
      <Section tone="sauge">
        <div className="container-page space-y-12">
          <SectionHeader
            title="Choisissez votre porte d’entrée"
            subtitle="Vous pouvez candidater uniquement aux cours de langue allemande, uniquement à l’accompagnement documentaire, ou aux deux."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-12">
            {/* Porte 1 : Académie de langues */}
            <div className="border-t border-border-subtle pt-6 flex flex-col justify-between">
              <div className="space-y-4">

                <h3 className="text-body font-semibold text-text">
                  Académie de langues (Allemand A1 à C1)
                </h3>

                <p className="text-body text-text-secondary max-w-[65ch]">
                  Accompagnement complet pour apprendre l’allemand étape par étape : compréhension, expression orale et écrite, test de niveau interactif gratuit et préparation méthodique aux certifications.
                </p>

                <div className="flex flex-wrap gap-x-5">
                  {GERMAN_LEVELS_DATA.map((lvl) => (
                    <Link
                      key={lvl.slug}
                      to={`/academie/${lvl.slug}`}
                      className={TEXT_LINK_CLASS}
                    >
                      Niveau {lvl.level}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <PrimaryButton to="/mobilite-langues/academie">
                  Accéder à l’Académie de langues
                </PrimaryButton>
                <Link
                  to="/mobilite-langues/academie#test-niveau"
                  className={TEXT_LINK_CLASS}
                >
                  Passer le test de niveau (20 questions)
                </Link>
              </div>
            </div>

            {/* Porte 2 : Accompagnement vers l'Europe */}
            <div className="border-t border-border-subtle pt-6 flex flex-col justify-between">
              <div className="space-y-4">

                <h3 className="text-body font-semibold text-text">
                  Accompagnement vers l’Europe
                </h3>

                <p className="text-body text-text-secondary max-w-[65ch]">
                  Un parcours pédagogique en 4 étapes pour comprendre les voies légales (études, formation professionnelle, travail), préparer son dossier et vérifier chaque démarche sur les portails officiels.
                </p>

                <div className="flex flex-wrap gap-x-5">
                  {COUNTRIES_DATA.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/accompagnement/pays/${c.slug}`}
                      className={TEXT_LINK_CLASS}
                    >
                      {c.flag} {c.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <PrimaryButton to="/mobilite-langues/accompagnement">
                  Explorer l’accompagnement Europe
                </PrimaryButton>
                <Link
                  to="/accompagnement/eviter-les-arnaques"
                  className={TEXT_LINK_CLASS}
                >
                  Guide : Éviter les arnaques
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* TÉMOIGNAGES DU PROGRAMME (TODO) */}
      <section className="container-page section-space space-y-10">
        <SectionHeader
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
      <Section tone="sauge">
        <div className="container-page space-y-10">
          <SectionHeader
            kicker="Questions fréquentes"
            title="Tout comprendre sur la gratuité et nos règles d’éthique"
          />

          {/* FAQ en liste typographique (ajout du 16/11 au §8) : question en 600, réponse, filet ; tout reste visible */}
          <TextList columns={1} className="max-w-[65ch]">
            {MOBILITY_FAQS.map((faq) => (
              <TextListItem key={faq.q} title={faq.q}>
                <p>{faq.a}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </Section>

      {/* APPEL À CANDIDATER OU À SOUTENIR LE PROGRAMME PAR UN DON */}
      <section className="container-page section-space">
        <div className="surface-green rounded-card bg-nuit text-creme p-8 sm:p-12 border border-or/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
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
