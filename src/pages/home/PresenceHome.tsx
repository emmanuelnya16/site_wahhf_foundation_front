import { useTranslation } from 'react-i18next';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import PresenceSection from '../../components/wahhf/PresenceSection';

/**
 * 5. Carte de présence (contrat §7, section 5 ; T-11) sur brume : carte des 10 régions du Cameroun et mini-carte des
 * 10 pays européens, aux couleurs du contrat (panneaux sauge, plus de panneau blanc en sombre, plus d'or). Le titre dit
 * ce qui est vrai : basée à Yaoundé et Douala, relais des autres régions à confirmer.
 */
export default function PresenceHome() {
  const { t } = useTranslation();
  return (
    <Section id="presence">
      <div className="container-page space-y-10">
        <SectionHeader title={t('home.presence.title')} subtitle={t('home.presence.subtitle')} />
        <PresenceSection />
      </div>
    </Section>
  );
}
