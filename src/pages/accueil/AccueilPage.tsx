import './i18n';
// Le bouton pause et le prochain événement viennent des pages Événements : leurs textes aussi
import '../events/i18n';
import '../../styles/accueil.css';
import { lazy, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import { AfterFirstDisplay } from '../../effects/DeferredMotion';
import { useLoopControl } from '../events/motion';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { cn } from '../../lib/utils';
import Hero from './Hero';
import QuiSommesNous from './QuiSommesNous';
import Chiffres from './Chiffres';
import DomainesParcours from './DomainesParcours';
import ProjetPhare from './ProjetPhare';
import Parcours from './Parcours';
import Regions from './Regions';
import JourneySection from '../home/JourneySection';
import Evenements from './Evenements';

/** Parallaxes et fil (GSAP), chargés après le premier affichage, seulement là où ils existent (MQ.computer, src/lib/gsap.ts) */
const AccueilMotion = lazy(() => import('./AccueilMotion'));
const ORDINATEUR = '(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

/**
 * Nouvelle page « Accueil » (/accueil), lots 11.1 à 11.6 : construite à côté de l'accueil actuel (/), qui ne change pas.
 * Neuf sections : hero, qui sommes-nous en bref, chiffres, domaines, projet phare, parcours, régions, accordéon (la
 * section de /, telle quelle), événements. Guide : docs/page-accueil.md.
 */
export default function AccueilPage() {
  const { t } = useTranslation();
  const title = t('accueil.seo.title');
  const root = useRef<HTMLDivElement>(null);
  const loops = useLoopControl(root);
  const ordinateur = useMediaQuery(ORDINATEUR);

  // Titre exact du brief (« … | WAHHF Foundation ») : <SEO> ajoute le nom développé, il est repris ici après elle
  useEffect(() => {
    document.title = `${title} | WAHHF Foundation`;
  }, [title]);

  return (
    <div ref={root} className={cn('ac', loops.paused && 'ev-pause')}>
      <SEO title={title} description={t('accueil.seo.description')} />
      <Hero paused={loops.paused} onTogglePause={loops.toggle} />
      <QuiSommesNous />
      <Chiffres />
      <DomainesParcours paused={loops.paused} />
      <ProjetPhare paused={loops.paused} />
      <Parcours />
      <Regions />
      {/* Apprendre, cultiver, grandir : la section de l'accueil actuel (/), telle quelle, avec ses données */}
      <div className="ac-accordeon">
        <JourneySection />
      </div>
      <Evenements paused={loops.paused} />
      {ordinateur && (
        <AfterFirstDisplay>
          <AccueilMotion scope={root} paused={loops.paused} />
        </AfterFirstDisplay>
      )}
    </div>
  );
}
