import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';

/**
 * 2. PAGE /partenaires
 * Présentation d'IROKO en tant que partenaire fondateur, autres partenaires et financeurs, comment devenir partenaire.
 */
export function PartenairesPage() {
  return (
    <>
      <SEO
        title="Partenaires et financeurs — Groupe IROKO & Réseau engagé"
        description="Découvrez le rôle du groupe IROKO en tant que partenaire fondateur de WAHHF Foundation ainsi que nos partenaires institutionnels et associatifs."
      />

      <PageHeader>
        <PageTitle>
          Un écosystème engagé pour garantir la gratuité de nos actions
        </PageTitle>
        <PageIntro>
          En premier lieu le groupe IROKO, accompagné de nos donateurs, professionnels bénévoles et institutions partenaires.
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space space-y-12">
        {/* Partenaire Fondateur : Groupe IROKO */}
        <div className="surface-green rounded-card bg-nuit text-text-on-inverse p-8 sm:p-12 space-y-5">
          <p className="text-meta text-text-secondary-on-inverse">Partenaire fondateur et mécène structurel</p>
          <h2 className="text-section-title text-text-on-inverse">
            Groupe IROKO — Holding & 10 Pôles d’Expertise
          </h2>
          <p className="text-body text-text-secondary-on-inverse max-w-[65ch]">
            WAHHF Foundation est la branche sociale du groupe IROKO. Par son mécénat financier, technologique et humain, le groupe IROKO finance durablement l’Académie de langues (allemand A1 à C1), les supports d’orientation vérifiés vers l’Europe ainsi que les déploiements solidaires dans les 10 régions du Cameroun.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <SecondaryButton to="/qui-sommes-nous" onInverse>
              En savoir plus sur notre gouvernance
            </SecondaryButton>
          </div>
        </div>

        {/* Autres partenaires (TODO : logos et accords officiels à valider) */}
        <div className="space-y-6">
          <SectionHeader
            kicker="Liste officielle à confirmer (TODO)"
            title="Catégories de partenaires & soutiens"
            subtitle="Conformément à notre éthique, aucun nom ou logo d’institution tierce n’est affiché sans accord écrit préalable."
          />

          <TextList columns={3}>
            {[
              {
                title: 'Établissements scolaires & éducatifs (TODO)',
                desc: 'Écoles et centres communautaires accueillant nos bibliothèques, distributions de kits et ateliers linguistiques.',
              },
              {
                title: 'Professionnels de santé bénévoles (TODO)',
                desc: 'Médecins, infirmiers et sages-femmes mobilisés lors des campagnes gratuites de prévention sanitaire.',
              },
              {
                title: 'Donateurs individuels & Mécènes',
                desc: 'Citoyens et philanthropes au Cameroun, en Allemagne et en Europe finançant les parcours des jeunes.',
              },
            ].map((p) => (
              <TextListItem key={p.title} title={p.title}>
                <p>{p.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>

        {/* Appel à devenir partenaire */}
        <div className="rounded-card bg-surface-section p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-body font-semibold text-text">Comment devenir partenaire de WAHHF Foundation ?</h3>
            <p className="text-sm text-text-tertiary">
              Vous représentez une université, un centre de formation, une ONG, un établissement médical ou une entreprise engagée ? Construisons ensemble un programme à impact mesurable.
            </p>
          </div>
          <PrimaryButton to="/agir#partenaire">Proposer un partenariat</PrimaryButton>
        </div>
      </section>
    </>
  );
}

export default PartenairesPage;
