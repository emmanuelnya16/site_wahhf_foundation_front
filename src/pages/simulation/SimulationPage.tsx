import './i18n';
// Le bouton pause vient des pages Événements : ses textes aussi
import '../events/i18n';
// Les polices (Jost, Barlow), les jetons et les éléments communs de /accueil : le même fichier CSS, partagé entre les pages
import '../../styles/accueil.css';
import '../../styles/simulation.css';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import { useLoopControl } from '../events/motion';
import { cn } from '../../lib/utils';
import Hero from './Hero';
import { Offre, Pourquoi, Publics } from './Presentation';
import Exemples from './Exemples';
import Etapes from './Etapes';
import { Engagements, Familles, Jeunes } from './Savoir';
import Faq from './Faq';
import Soumettre from './Soumettre';

/**
 * Programme Simulation (lot 13) : simulation numérique solidaire et gratuite. Onze sections aux fonds alternés (jamais
 * deux voisines du même fond) : hero (brume), pourquoi (papier), offre (sauge), pour qui (papier), exemples (brume),
 * comment ça marche (nuit), familles (papier), engagements (sauge), les jeunes (brume), FAQ (papier), soumettre (forêt).
 * Guide : docs/page-simulation.md.
 */
export default function SimulationPage() {
  const { t } = useTranslation();
  const root = useRef<HTMLDivElement>(null);
  const loops = useLoopControl(root);
  return (
    <div ref={root} className={cn('ac sim', loops.paused && 'ev-pause')}>
      <SEO title={t('simulation.seo.title')} description={t('simulation.seo.description')} />
      <Hero paused={loops.paused} onTogglePause={loops.toggle} />
      <Pourquoi />
      <Offre />
      <Publics />
      <Exemples />
      <Etapes />
      <Familles />
      <Engagements />
      <Jeunes />
      <Faq />
      <Soumettre />
    </div>
  );
}
