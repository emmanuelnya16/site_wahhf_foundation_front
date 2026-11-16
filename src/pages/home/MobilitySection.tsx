import { useTranslation } from 'react-i18next';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';

/**
 * 2. Mobilité & Langues (contrat §7, section 2), juste après le hero.
 * Sauge, titre et phrase d'introduction, « Candidater » en bouton primaire à côté du titre (bien visible dès que la
 * section entre à l'écran), puis les trois voies en liste typographique. Une seule mention de la gratuité, dans la
 * phrase d'introduction, jamais dans le titre. Aucune animation (l'agrandissement ExpandSection est retiré de
 * l'accueil ; son code reste dans src/effects).
 */
export default function MobilitySection() {
  const { t } = useTranslation();
  const ways = [
    { title: t('home.mobilitySpot.card1Title'), desc: t('home.mobilitySpot.card1Desc'), to: '/mobilite-langues/academie' },
    { title: t('home.mobilitySpot.card2Title'), desc: t('home.mobilitySpot.card2Desc'), to: '/mobilite-langues/accompagnement' },
    { title: t('home.mobilitySpot.card3Title'), desc: t('home.mobilitySpot.card3Desc'), to: '/mobilite-langues/accompagnement#pays' },
  ];
  return (
    <Section tone="sauge" id="mobilite-langues">
      <div className="container-page space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader title={t('home.mobilitySpot.title')} subtitle={t('home.mobilitySpot.subtitle')} />
          <div className="flex shrink-0 flex-wrap gap-3">
            <PrimaryButton to="/candidater" size="lg">
              {t('nav.apply')}
            </PrimaryButton>
            <SecondaryButton to="/mobilite-langues" size="lg">
              {t('home.mobilitySpot.cta')}
            </SecondaryButton>
          </div>
        </div>

        <TextList columns={3}>
          {ways.map((way) => (
            <TextListItem key={way.to} title={way.title} to={way.to}>
              <p>{way.desc}</p>
            </TextListItem>
          ))}
        </TextList>
      </div>
    </Section>
  );
}
