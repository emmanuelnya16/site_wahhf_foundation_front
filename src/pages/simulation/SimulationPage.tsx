import './i18n';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';

/**
 * Programme Simulation (lot 13) : simulation numérique solidaire et gratuite. Étape 1 : la route et le titre ; les
 * sections arrivent à l'étape 2. Guide : docs/page-simulation.md.
 */
export default function SimulationPage() {
  const { t } = useTranslation();
  return (
    <div className="sim">
      <SEO title={t('simulation.seo.title')} description={t('simulation.seo.description')} />
      <section className="container-page pt-[calc(var(--header-offset)+2rem)] pb-16">
        <h1 className="text-page-title text-text">{t('simulation.hero.titre')}</h1>
      </section>
    </div>
  );
}
