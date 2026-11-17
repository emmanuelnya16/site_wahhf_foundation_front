import { useSearchParams } from 'react-router-dom';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import DomainCard from '../../components/wahhf/DomainCard';
import { DOMAINS_DATA } from '../../services/api';

/**
 * 3. PAGE /nos-actions
 * Vue d'ensemble détaillée des 6 domaines d'action.
 */
export function NosActionsPage() {
  const [searchParams] = useSearchParams();
  const activeSlug = searchParams.get('domaine');

  return (
    <>
      <SEO
        title="Nos 6 domaines d'action — Éducation, Santé, Entrepreneuriat, Environnement, Droits, Mobilité"
        description="Découvrez les 6 domaines d'intervention de WAHHF Foundation au Cameroun et vers l'Europe."
      />

      <PageHeader>
        <PageTitle>
          Agir sur tous les leviers de l’autonomie humaine
        </PageTitle>
        <PageIntro>
          Éducation, Santé, Entrepreneuriat des jeunes, Environnement, Droits et inclusion, et Mobilité & Langues.
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space space-y-16">
        <TextList columns={3}>
          {DOMAINS_DATA.map((d) => (
            <DomainCard key={d.id} domain={d} />
          ))}
        </TextList>

        {/* Détail des programmes par domaine */}
        <div className="space-y-8">
          <SectionHeader
            title="Le détail de nos interventions par domaine"
          />

          {/* Blocs non cliquables : plus de carte (T-15) ; le domaine demandé (?domaine=) est posé dans un encart sauge. */}
          <div>
            {DOMAINS_DATA.map((dom) => {
              const isHighlighted = activeSlug === dom.slug;
              return (
                <div
                  key={dom.id}
                  id={dom.slug}
                  className={
                    isHighlighted
                      ? 'rounded-card bg-surface-section p-6 sm:p-8 my-4'
                      : 'border-t border-border-subtle py-8'
                  }
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-[65ch]">
                      <h3 className="text-body font-semibold text-text">{dom.title}</h3>
                      <p className="text-body text-text-secondary">
                        {dom.fullDesc}
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-body text-text marker:text-text-secondary">
                        {dom.programs.map((prog) => (
                          <li key={prog}>{prog}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="shrink-0">
                      {dom.slug === 'mobilite-langues' ? (
                        <PrimaryButton to="/mobilite-langues">
                          Accéder au hub Mobilité & Langues
                        </PrimaryButton>
                      ) : (
                        <PrimaryButton to="/agir">Soutenir ce domaine</PrimaryButton>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

export default NosActionsPage;
