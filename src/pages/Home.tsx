import { useTranslation } from 'react-i18next';
import SEO from '../components/wahhf/SEO';
import HeroSection from './home/HeroSection';
import MobilitySection from './home/MobilitySection';
import FieldSection from './home/FieldSection';
import DomainsSection from './home/DomainsSection';
import JourneySection from './home/JourneySection';
import PresenceHome from './home/PresenceHome';
import FiguresSection from './home/FiguresSection';
import ActSection from './home/ActSection';

/**
 * Accueil (contrat §7 ; lot 6, décisions du 16/11) : 8 blocs, dont le footer commun.
 * Hero vidéo, Mobilité & Langues, Sur le terrain, Domaines, Apprendre cultiver grandir (lot 7.6), Carte de présence, Chiffres datés (masqués tant qu'il n'y
 * en a pas deux sourcés), Agir + lettre d'information. Les sections retirées (mission et carte IROKO, approche, frise,
 * témoignages, actualités, partenaires, anciens chiffres, cartes Agir, bande de don) sont masquées sans suppression
 * dans src/pages/home/archive/.
 */
export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <SEO
        title={t('home.seo.title')}
        description={t('home.seo.description')}
      />

      {/* 1. HERO (décision du 16/11 : vidéo en fond) : src/pages/home/HeroSection.tsx */}
      <HeroSection />

      {/* 2. MOBILITÉ & LANGUES, juste après le hero (Candidater bien visible) : src/pages/home/MobilitySection.tsx */}
      <MobilitySection />

      {/* 3. SUR LE TERRAIN : photos de l'Open Day et lien vers la galerie : src/pages/home/FieldSection.tsx */}
      <FieldSection />

      {/* 4. DOMAINES : liste, photos réelles seulement, ancres vers /nos-actions : src/pages/home/DomainsSection.tsx */}
      <DomainsSection />

      {/* 4 bis. APPRENDRE, CULTIVER, GRANDIR : accordéon de 5 photos, sur nuit (lot 7.6) : src/pages/home/JourneySection.tsx */}
      <JourneySection />

      {/* 5. CARTE DE PRÉSENCE : src/pages/home/PresenceHome.tsx */}
      <PresenceHome />

      {/* 6. CHIFFRES RÉELS DATÉS : masqués tant que la fondation n'a pas fourni deux résultats sourcés (FiguresSection) */}
      <FiguresSection />

      {/* 7. AGIR + LETTRE D'INFORMATION, un seul bloc, sans bande de don finale : src/pages/home/ActSection.tsx */}
      <ActSection />
    </>
  );
}
