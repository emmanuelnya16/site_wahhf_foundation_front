import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageTitle, PageIntro, PageActions } from '../components/wahhf/PageHeader';
import { photoCaption, photoOrFallback } from '../lib/photos';

/** En-tête (lot 7.6, catalogue : « Mobilité / Allemagne ») : la présentation sur les études en Allemagne du 25 avril. */
const HEADER_PHOTO = photoOrFallback('A53');
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import { COUNTRIES_DATA, GERMAN_LEVELS_DATA } from '../services/api';
import Section from '../components/wahhf/Section';
import Fil from '../components/wahhf/Fil';
import { TextList, TextListItem, TEXT_LINK_CLASS } from '../components/wahhf/TextList';
import { AfterFirstDisplay, FilScrub } from '../effects/DeferredMotion';

/*
 * Mobilité & Langues (groupe 7.1 : contrat validé, audit MOB-01, T-14, ARN-02, T-12).
 * - En-tête : la vraie photo de l'Open Day (MOB-01), en entier, légendée et datée ; l'avertissement anti-arnaque juste
 *   sous le titre ; deux boutons seulement (Candidater, l'Académie).
 * - Le choix de la porte d'entrée vient juste après l'en-tête, avant « Pourquoi » (audit : le visiteur veut d'abord
 *   savoir quoi faire). Fonds alternés : brume, sauge, brume, sauge, brume.
 * - Gratuité dite une fois par écran : l'avertissement au premier écran, « Zéro frais » dans « Pourquoi », la question
 *   de la FAQ ; jamais dans un titre.
 * - Témoignages : masqués tant qu'aucun témoignage réel et autorisé n'est fourni (docs/contenus-a-fournir.md, n° 76-78).
 * - Une seule action en fin de page (Candidater), sans carte nuit au-dessus du footer.
 * - Mouvement (contrat §10) : en-tête révélé comme le hero, photo découverte du bas vers le haut (ordinateur), frise
 *   A1 → C1 au défilement (FilScrub, ordinateur), apparitions des listes.
 */

const MOBILITY_FAQS = [
  {
    q: 'Les cours d’allemand et l’accompagnement sont-ils vraiment 100 % gratuits ?',
    // Sans nommer le financeur tant que la question n'est pas tranchée (contrat §13) ; une seule mention de gratuité
    a: 'Oui, pour tous les bénéficiaires : les cours d’allemand, du niveau A1 au niveau C1, comme les séances d’orientation vers l’Europe. Le programme est financé par nos partenaires et nos donateurs.',
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
    a: 'Si vous débutez totalement, choisissez le niveau A1. Si vous avez déjà des bases, passez notre test d’orientation de 20 questions sur la page Académie de langues.',
  },
];

/**
 * Témoignages : masqués (groupe 7.1). Ces deux citations sont des exemples non validés ; elles restent ici, sans être
 * affichées, jusqu'à ce que la fondation fournisse de vrais témoignages avec l'accord écrit des personnes. Pour les
 * afficher, les placer dans TESTIMONIALS (la section réapparaît dès qu'il y en a un).
 */
const TESTIMONIALS: { name: string; track: string; text: string }[] = [];
export const EXAMPLE_TESTIMONIALS_NOT_VALIDATED = [
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
];

export default function MobilityHub() {
  const filRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <SEO
        title="Mobilité & Langues — Apprendre, se préparer, s'orienter gratuitement"
        description="WAHHF Foundation : Académie de langue allemande gratuite (A1 à C1) et accompagnement transparent vers 10 pays européens, financé par nos partenaires et nos donateurs."
      />

      {/* En-tête : titre, avertissement juste dessous (avant la photo sur téléphone), photo de l'Open Day légendée */}
      <PageHeader
        reveal
        revealPhoto
        catalogPhoto={HEADER_PHOTO}
        photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}
        photoId="open-day-visioconference"
        photoRatio="source"
        notice={<DisclaimerBanner />}
      >
        <PageTitle>Apprendre l’allemand, se préparer, s’orienter vers l’Europe</PageTitle>

        <PageIntro>
          Des cours d’allemand du niveau A1 au niveau C1 et une information fiable sur les études, la formation et le
          travail dans 10 pays européens.
        </PageIntro>

        <PageActions>
          <PrimaryButton to="/candidater">Candidater au programme</PrimaryButton>
          <SecondaryButton to="/mobilite-langues/academie">Découvrir l’Académie d’allemand</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* LES DEUX PORTES D'ENTRÉE */}
      <Section tone="sauge">
        <div className="container-page space-y-12">
          <SectionHeader
            title="Choisissez votre porte d’entrée"
            subtitle="Vous pouvez candidater uniquement aux cours de langue allemande, uniquement à l’accompagnement documentaire, ou aux deux."
          />

          {/* Porte 1 : l'Académie, avec le fil A1 → C1 (contrat §6) ; il se dessine au défilement sur ordinateur */}
          <div data-reveal="" className="border-t border-border-subtle pt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-body font-semibold text-text">Académie de langues (allemand A1 à C1)</h3>
              <p className="text-body text-text-secondary max-w-[65ch]">
                Apprendre l’allemand étape par étape : compréhension, expression orale et écrite, test de niveau en ligne et préparation méthodique aux certifications.
              </p>
            </div>
            <div ref={filRef} role="group" aria-label="Les cinq niveaux d’allemand, de A1 à C1, puis l’Europe">
              <Fil
                orientation="auto"
                steps={GERMAN_LEVELS_DATA.map((lvl) => ({
                  id: lvl.slug,
                  label: lvl.level,
                  sublabel: lvl.shortTitle,
                  to: `/academie/${lvl.slug}`,
                }))}
                end={{ id: 'europe', label: 'Europe' }}
              />
            </div>
            <AfterFirstDisplay>
              <FilScrub scope={filRef} />
            </AfterFirstDisplay>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <SecondaryButton to="/mobilite-langues/academie">Accéder à l’Académie de langues</SecondaryButton>
              <Link to="/mobilite-langues/academie#test-niveau" className={TEXT_LINK_CLASS}>
                Passer le test de niveau (20 questions)
              </Link>
            </div>
          </div>

          {/* Porte 2 : l'accompagnement vers l'Europe */}
          <div data-reveal="" className="border-t border-border-subtle pt-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-body font-semibold text-text">Accompagnement vers l’Europe</h3>
              <p className="text-body text-text-secondary max-w-[65ch]">
                Un parcours pédagogique en 4 étapes pour comprendre les voies légales (études, formation professionnelle, travail), préparer son dossier et vérifier chaque démarche sur les portails officiels.
              </p>
              <div className="flex flex-wrap gap-x-5">
                {COUNTRIES_DATA.map((c) => (
                  <Link key={c.slug} to={`/accompagnement/pays/${c.slug}`} className={TEXT_LINK_CLASS}>
                    {c.flag} {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <SecondaryButton to="/mobilite-langues/accompagnement">Explorer l’accompagnement Europe</SecondaryButton>
              <Link to="/accompagnement/eviter-les-arnaques" className={TEXT_LINK_CLASS}>
                Guide : éviter les arnaques
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* POURQUOI CE PROGRAMME EXISTE */}
      <section className="container-page section-space">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader
              title="Protéger la jeunesse contre la désinformation et ouvrir l’accès au savoir"
              subtitle="Trop de jeunes et de familles s’endettent auprès d’intermédiaires frauduleux qui vendent de fausses promesses. WAHHF Foundation répond par la rigueur linguistique et la transparence."
            />

            <div className="space-y-4 text-body text-text-secondary max-w-[65ch]">
              <p>
                Un projet d’études ou de formation professionnelle à l’étranger ne s’achète pas : il se construit par l’apprentissage exigeant de la langue, la conformité des diplômes et le respect strict des procédures consulaires officielles.
              </p>
              <p>
                Avec le soutien de nos partenaires et de nos donateurs, nous proposons ce que beaucoup marchandent : des cours d’allemand structurés du niveau A1 au C1 et une orientation documentée étape par étape.
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
                desc: 'Un guide pour reconnaître les faux contrats et les faux visas, et vérifier chaque information sur les sources officielles.',
              },
              {
                title: 'Exigence académique et linguistique',
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

      {/* TÉMOIGNAGES : seulement des témoignages réels et autorisés (aucun pour l'instant) */}
      {TESTIMONIALS.length > 0 && (
        <section className="container-page section-space space-y-10">
          <SectionHeader title="Ce que disent nos apprenants" />
          <TextList columns={2}>
            {TESTIMONIALS.map((item) => (
              <TextListItem key={item.name} title={item.name} meta={item.track}>
                <p>{item.text}</p>
              </TextListItem>
            ))}
          </TextList>
        </section>
      )}

      {/* FAQ */}
      <Section tone="sauge">
        <div className="container-page space-y-10">
          <SectionHeader title="Questions fréquentes" />

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

      {/* UNE SEULE ACTION EN FIN DE PAGE : sur le fond de la page, sans carte nuit au-dessus du footer */}
      <section className="container-page section-space">
        <div className="max-w-[65ch] space-y-5">
          <SectionHeader
            title="Rejoindre la prochaine cohorte"
            subtitle="Un seul formulaire pour les cours d’allemand et l’orientation vers l’Europe. Il se remplit en 5 minutes environ ; aucun document d’identité ni paiement ne vous est demandé."
          />
          <PrimaryButton to="/candidater" size="lg">
            Candidater
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
