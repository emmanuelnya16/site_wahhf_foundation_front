import SEO from '../../components/wahhf/SEO';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';

/*
 * Partenaires (groupe 7.3 : contrat validé, audit PAR-01, T-11, T-15, T-17).
 * - PAR-01 : le groupe IROKO décrit concrètement, avec les seuls faits déjà présents dans le projet (pages historiques
 *   du groupe : une holding, neuf pôles en trois familles, IROKO Event en activité) ; son site et sa part du budget
 *   sont demandés à la fondation (docs/contenus-a-fournir.md). Plus de « 10 Pôles d'Expertise » ni de « 10 régions ».
 * - Catégories de partenaires marquées TODO masquées (EXAMPLE_PARTNER_CATEGORIES_NOT_VALIDATED) ; seule reste celle des
 *   donateurs. La section « Ce que nous proposons » s'affiche dès que PARTNER_OFFERS est rempli (formats, contreparties,
 *   contact nommé : questions 104 et 105).
 * - Plus de carte nuit bordée d'or ni de carte pour un bloc non cliquable (T-15) ; plus de « 01 » pour un seul
 *   partenaire (T-17) ; titre sans gratuité. Une seule action en fin de page : « Proposer un partenariat » (/agir#partenaire).
 * - Mouvement (contrat §10) : en-tête révélé comme le hero ; apparitions groupées des listes.
 */

/** Catégories d'exemple (TODO : liste officielle à confirmer) : gardées, jamais affichées. */
export const EXAMPLE_PARTNER_CATEGORIES_NOT_VALIDATED = [
  {
    title: 'Établissements scolaires & éducatifs (TODO)',
    desc: 'Écoles et centres communautaires accueillant nos bibliothèques, distributions de kits et ateliers linguistiques.',
  },
  {
    title: 'Professionnels de santé bénévoles (TODO)',
    desc: 'Médecins, infirmiers et sages-femmes mobilisés lors des campagnes gratuites de prévention sanitaire.',
  },
];

const SUPPORTERS = [
  {
    title: 'Donateurs individuels et mécènes',
    desc: 'Citoyens et philanthropes au Cameroun, en Allemagne et en Europe finançant les parcours des jeunes.',
  },
];

/** Ce que la fondation propose à un partenaire (mécénat, stagiaires, enseignants, dossier) : à fournir (PAR-01). */
const PARTNER_OFFERS: { title: string; desc: string }[] = [];

const NB = ' ';

export function PartenairesPage() {
  return (
    <>
      <SEO
        title="Partenaires — Le groupe IROKO et les soutiens de WAHHF Foundation"
        description="Découvrez le rôle du groupe IROKO, partenaire fondateur de WAHHF Foundation, et comment devenir partenaire de la fondation."
      />

      <PageHeader reveal>
        <PageTitle>Nos partenaires et nos soutiens</PageTitle>
        <PageIntro>
          Le groupe IROKO, dont WAHHF Foundation est la branche sociale, et nos donateurs. Aucun autre partenaire n’est
          nommé sans son accord écrit.
        </PageIntro>
      </PageHeader>

      {/* LE GROUPE IROKO (PAR-01) : une section, plus une carte nuit bordée d'or */}
      <Section id="iroko">
        <div className="container-page">
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader title="Le groupe IROKO, partenaire fondateur" />
            <div className="space-y-4 text-body text-text-secondary">
              <p>
                IROKO est un groupe camerouno-allemand organisé autour d’une holding et de neuf pôles d’activité, en trois
                familles&nbsp;: Business (communication et événementiel, formation, ingénierie), Digital (applications,
                logiciels de gestion, hébergement) et Services et support (audiovisuel, cybersécurité, investissement). Son
                pôle de communication et d’événementiel, IROKO Event, est en activité&nbsp;; les autres sont annoncés.
              </p>
              <p>
                WAHHF Foundation est sa branche sociale. Le groupe finance l’Académie de langues (allemand A1 à C1) et les
                supports d’orientation vérifiés vers l’Europe.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* LES AUTRES SOUTIENS : catégories TODO masquées */}
      <Section tone="sauge">
        <div className="container-page space-y-8">
          <SectionHeader
            title="Les autres soutiens de la fondation"
            subtitle="Conformément à notre éthique, aucun nom ou logo d’institution tierce n’est affiché sans accord écrit préalable."
          />
          <TextList columns={3}>
            {SUPPORTERS.map((p) => (
              <TextListItem key={p.title} title={p.title}>
                <p>{p.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </Section>

      {/* CE QUE NOUS PROPOSONS : seulement si le contenu est fourni (PAR-01) */}
      {PARTNER_OFFERS.length > 0 && (
        <Section>
          <div className="container-page space-y-8">
            <SectionHeader title="Ce que nous proposons" />
            <TextList columns={2}>
              {PARTNER_OFFERS.map((o) => (
                <TextListItem key={o.title} title={o.title}>
                  <p>{o.desc}</p>
                </TextListItem>
              ))}
            </TextList>
          </div>
        </Section>
      )}

      {/* UNE SEULE ACTION EN FIN DE PAGE, sur le fond de la page */}
      <Section tone={PARTNER_OFFERS.length > 0 ? 'sauge' : 'brume'}>
        <div className="container-page">
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader
              title="Devenir partenaire de WAHHF Foundation"
              subtitle={`Vous représentez une université, un centre de formation, une ONG, un établissement médical ou une entreprise engagée${NB}? Construisons ensemble un programme à impact mesurable.`}
            />
            <PrimaryButton to="/agir#partenaire" size="lg">
              Proposer un partenariat
            </PrimaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}

export default PartenairesPage;
