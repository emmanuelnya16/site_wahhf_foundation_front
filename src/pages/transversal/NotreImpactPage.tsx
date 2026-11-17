import SEO from '../../components/wahhf/SEO';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import Counter from '../../components/wahhf/Counter';
import PresenceSection from '../../components/wahhf/PresenceSection';
import { TRANSPARENCY_DATA_PUBLISHED } from '../../config/transparency';

/**
 * 4. PAGE /notre-impact
 * Chiffres clés, carte des 10 régions & 10 pays, et frise.
 */
export function NotreImpactPage() {
  return (
    <>
      <SEO
        title="Notre impact — Résultats, présence dans 10 régions & transparence"
        description="Mesurez l'impact des programmes éducatifs, sanitaires et linguistiques de WAHHF Foundation au Cameroun et vers l'Europe."
      />

      <PageHeader>
        <PageTitle>
          Un impact concret, mesuré avec humilité et transparence
        </PageTitle>
        <PageIntro>
          Chiffres clés d’accompagnement (marqués TODO à consolider), couverture des 10 régions du Cameroun et passerelles vers 10 pays européens.
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { end: 1250, suffix: '+', label: 'Jeunes et familles accompagnés (TODO)' },
            { end: 6, suffix: '', label: 'Domaines d’action structurés' },
            { end: 10, suffix: '', label: 'Régions du Cameroun couvertes' },
            { end: 10, suffix: '', label: 'Pays européens documentés gratuitement' },
          ].map((item, i) => (
            <div key={i} className="border-t border-border-subtle pt-5 space-y-2">
              <p className="text-page-title text-accent tabular-nums">
                <Counter end={item.end} suffix={item.suffix} />
              </p>
              <p className="text-body text-text">{item.label}</p>
            </div>
          ))}
        </div>

        <PresenceSection />

        {/* Lien vers /transparence : masqué tant qu'aucune donnée n'y est publiée (TRA-01, groupe 7.2) */}
        {TRANSPARENCY_DATA_PUBLISHED && (
        <div className="surface-green rounded-card bg-nuit text-text-on-inverse p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-section-title text-text-on-inverse">
              Consulter nos engagements de transparence financière
            </h2>
            <p className="text-body text-text-secondary-on-inverse">
              Découvrez comment les ressources du groupe IROKO et les dons sont affectés aux missions sociales.
            </p>
          </div>
          <PrimaryButton
            to="/transparence"
            onInverse
            className="shrink-0"
          >
            Voir la page Transparence
          </PrimaryButton>
        </div>
        )}
      </section>
    </>
  );
}

export default NotreImpactPage;
