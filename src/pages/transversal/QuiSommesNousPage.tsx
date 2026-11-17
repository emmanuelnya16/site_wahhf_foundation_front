import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import { WAHHF_LOGO_URL } from '../../services/api';

/**
 * 1. PAGE /qui-sommes-nous
 * Histoire, mission, valeurs, équipe, gouvernance, et section dédiée « WAHHF, branche sociale du groupe IROKO ».
 */
export function QuiSommesNousPage() {
  return (
    <>
      <SEO
        title="Qui sommes-nous — Fondation camerouno-allemande & Branche sociale IROKO"
        description="Découvrez l'histoire, la mission, les valeurs, la gouvernance de WAHHF Foundation (We Are Here Help Foundation) et son lien avec le groupe IROKO."
      />

      <PageHeader>
        <PageTitle>
          Une fondation camerouno-allemande au service de la dignité humaine
        </PageTitle>
        <PageIntro>
          Née de la solidarité entre le Cameroun et l’Allemagne, WAHHF Foundation accompagne les jeunes et les communautés à travers 6 domaines d’action complémentaires.
        </PageIntro>
      </PageHeader>

      {/* Histoire, Mission & Valeurs */}
      <section className="container-page section-space space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-5">
            <SectionHeader
              title="Bâtir l’autonomie par l’éducation, la santé et l’accès gratuit au savoir"
            />
            <p className="text-body text-text">
              WAHHF Foundation (We Are Here Help Foundation) part d’une conviction simple : chaque jeune mérite d’accéder à l’éducation, aux soins de prévention, à l’apprentissage des langues et à une information vérifiée, sans que le manque de ressources financières ou les réseaux de désinformation ne brisent son avenir.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              Nos équipes interviennent dans les 10 régions du Cameroun et coordonnent depuis l’Allemagne et le Cameroun un programme gratuit d’apprentissage de l’allemand (A1 à C1) et d’orientation vers 10 pays européens.
            </p>
          </div>

          <TextList columns={1} className="lg:col-span-5">
            {[
              {
                title: 'Dignité & Respect',
                desc: 'Chaque bénéficiaire est accueilli comme un acteur de son propre parcours, jamais comme un client.',
              },
              {
                title: 'Gratuité Totale',
                desc: 'Aucune contrepartie financière n’est jamais demandée aux jeunes et aux familles accompagnés.',
              },
              {
                title: 'Intégrité & Vérité',
                desc: 'Nous combattons les fausses promesses migratoires par une information rigoureuse et vérifiable.',
              },
            ].map((val) => (
              <TextListItem key={val.title} title={val.title}>
                <p>{val.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>

        {/* Section dédiée : WAHHF, branche sociale du groupe IROKO */}
        <div className="surface-green rounded-card bg-nuit text-text-on-inverse p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-section-title text-text-on-inverse">
              WAHHF Foundation, branche sociale du groupe IROKO
            </h2>
            <p className="text-body text-text-secondary-on-inverse">
              Le groupe multisectoriel camerouno-allemand <strong>IROKO</strong> a structuré WAHHF Foundation comme sa branche sociale et philanthropique indépendante à but non lucratif. Ce soutien structurel permet de couvrir les frais opérationnels et pédagogiques afin que les cours de langue allemande et les actions de terrain demeurent 100 % gratuits pour les bénéficiaires.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <PrimaryButton
                to="/partenaires"
                onInverse
              >
                Découvrir nos partenaires et financeurs
              </PrimaryButton>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-3">
            <img
              src={WAHHF_LOGO_URL}
              alt="Logo WAHHF Foundation"
              className="w-20 h-20 rounded-pill bg-white p-1.5 object-contain"
            />
            <p className="text-body font-semibold text-text-on-inverse">WAHHF Foundation</p>
            {/* Rétabli : décision n° 11 de la liste du lot 5 annulée le 16/11 */}
            <p className="text-meta text-text-secondary-on-inverse">Branche sociale du groupe IROKO</p>
          </div>
        </div>

        {/* Gouvernance & Équipe (TODO) */}
        <div id="gouvernance" className="space-y-8">
          <SectionHeader
            kicker="Noms officiels à confirmer (TODO)"
            title="Une gouvernance collégiale entre le Cameroun et l’Allemagne"
            subtitle="Les membres du conseil et les responsables de pôles veillent au respect de l’éthique et de la gratuité."
          />

          <TextList columns={3}>
            {[
              {
                role: 'Direction & Conseil de Fondation (TODO)',
                desc: 'Supervision stratégique, conformité juridique camerouno-allemande et contrôle de l’intégrité des programmes.',
              },
              {
                role: 'Coordination Pédagogique & Langues (TODO)',
                desc: 'Enseignants d’allemand et conseillers d’orientation chargés des cohortes A1 à C1 et de la vérification des guides pays.',
              },
              {
                role: 'Coordination Terrain Cameroun (TODO)',
                desc: 'Relais régionaux pour les campagnes d’éducation, de santé préventive, d’agroécologie et d’inclusion.',
              },
            ].map((gov) => (
              <TextListItem key={gov.role} title={gov.role}>
                <p>{gov.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </section>
    </>
  );
}

export default QuiSommesNousPage;
