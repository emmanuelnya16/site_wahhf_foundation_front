import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { DonateButton, PrimaryButton } from '../../components/wahhf/Buttons';
import PresenceSection from '../../components/wahhf/PresenceSection';
import { TRANSPARENCY_DATA_PUBLISHED } from '../../config/transparency';

/*
 * Notre impact (groupe 7.3 : contrat validé, audit IMP-01, T-11, A11Y-09).
 * - IMP-01 : la page n'est pas renommée (proposition « Où nous agissons » à valider avec la cliente) ; un bouton
 *   « Faire un don » la termine. Introduction en phrase complète (revue du groupe 7.3).
 * - Chiffres clés masqués (contrat §7 et §12, T-11) : « 1 250+ (TODO) » est un exemple, « 10 régions couvertes » n'est
 *   étayé nulle part, et les gros compteurs animés sont un défaut rejeté. Ils sont gardés dans
 *   EXAMPLE_IMPACT_FIGURES_NOT_VALIDATED ; la section reviendra avec au moins deux résultats datés et sourcés, en texte
 *   fixe.
 * - La carte de présence garde ses régions et ses pays ; les lignes provisoires de son panneau sont masquées
 *   (PresenceSection hidePending). Un H2 la précède (A11Y-09 : plus de H1 suivi d'un H3).
 * - Mouvement (contrat §10) : en-tête révélé comme le hero ; la carte (cascade des régions, puis l'arc), déjà faite.
 * - Lien vers /transparence masqué tant qu'aucune donnée n'y est publiée (TRA-01, groupe 7.2).
 */

/** Chiffres d'exemple de l'ancienne page : jamais affichés (« 1 250+ » est marqué TODO, « 10 régions » non étayé). */
export const EXAMPLE_IMPACT_FIGURES_NOT_VALIDATED = [
  { end: 1250, suffix: '+', label: 'Jeunes et familles accompagnés (TODO)' },
  { end: 6, suffix: '', label: 'Domaines d’action structurés' },
  { end: 10, suffix: '', label: 'Régions du Cameroun couvertes' },
  { end: 10, suffix: '', label: 'Pays européens documentés gratuitement' },
];

export function NotreImpactPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title="Notre impact — Présence au Cameroun et orientation vers 10 pays européens"
        description="Où agit WAHHF Foundation : basée à Yaoundé et Douala, au Cameroun, elle informe les jeunes sur les études, la formation et le travail dans 10 pays européens."
      />

      <PageHeader reveal>
        <PageTitle>Un impact concret, mesuré avec humilité et transparence</PageTitle>
        <PageIntro>
          Voici où la fondation est présente au Cameroun, et les 10 pays européens sur lesquels elle informe les jeunes.
          Les résultats chiffrés seront publiés ici quand ils seront datés et vérifiés.
        </PageIntro>
      </PageHeader>

      {/* Carte de présence : régions du Cameroun et pays européens, sans lignes provisoires */}
      <Section>
        <div className="container-page space-y-10">
          <SectionHeader title={t('home.presence.title')} subtitle={t('home.presence.subtitle')} />
          <PresenceSection hidePending />
        </div>
      </Section>

      {/* Lien vers /transparence : masqué tant qu'aucune donnée n'y est publiée (TRA-01, groupe 7.2) */}
      {TRANSPARENCY_DATA_PUBLISHED && (
        <Section tone="sauge">
          <div className="container-page">
            <div className="max-w-[65ch] space-y-5">
              <SectionHeader
                title="Consulter nos engagements de transparence financière"
                subtitle="Découvrez comment les ressources du groupe IROKO et les dons sont affectés aux missions sociales."
              />
              <PrimaryButton to="/transparence">Voir la page Transparence</PrimaryButton>
            </div>
          </div>
        </Section>
      )}

      {/* FIN DE PAGE : le don (IMP-01), sur le fond de la page, sans carte nuit au-dessus du footer */}
      <Section tone={TRANSPARENCY_DATA_PUBLISHED ? 'brume' : 'sauge'}>
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader
              title="Soutenir nos actions"
              subtitle="Votre don finance des cours d’allemand et nos actions au Cameroun. Vous pouvez choisir le domaine qu’il soutient."
            />
            <DonateButton size="lg" />
          </div>
        </div>
      </Section>
    </>
  );
}

export default NotreImpactPage;
