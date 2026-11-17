import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import Fil from '../../components/wahhf/Fil';
import { GERMAN_LEVELS_DATA } from '../../services/api';
import { AfterFirstDisplay, FilScrub } from '../../effects/DeferredMotion';

/**
 * 2. Mobilité & Langues (contrat §7, section 2), juste après le hero.
 * Sauge, titre et phrase d'introduction, « Candidater » en bouton primaire à côté du titre (bien visible dès que la
 * section entre à l'écran), le fil A1 → C1, puis les trois voies en liste typographique. Une seule mention de la
 * gratuité, dans la phrase d'introduction, jamais dans le titre.
 * Mouvement (contrat §10, moment 2, lot 7) : le titre apparaît (data-reveal) ; sur ordinateur, le fil A1 → C1 se
 * dessine au défilement et chaque niveau s'allume quand le trait l'atteint (FilScrub). Le fil reprend la frise de
 * l'Académie, sans niveau affiché : chaque niveau mène à sa page (contrat §6, quatrième endroit du fil).
 */
export default function MobilitySection() {
  const { t } = useTranslation();
  const filRef = useRef<HTMLDivElement>(null);
  const ways = [
    { title: t('home.mobilitySpot.card1Title'), desc: t('home.mobilitySpot.card1Desc'), to: '/mobilite-langues/academie' },
    { title: t('home.mobilitySpot.card2Title'), desc: t('home.mobilitySpot.card2Desc'), to: '/mobilite-langues/accompagnement' },
    { title: t('home.mobilitySpot.card3Title'), desc: t('home.mobilitySpot.card3Desc'), to: '/mobilite-langues/accompagnement#pays' },
  ];
  const levels = GERMAN_LEVELS_DATA.map((lvl) => ({
    id: lvl.slug,
    label: lvl.level,
    sublabel: t(`home.mobilitySpot.levels.${lvl.slug}`),
    to: `/academie/${lvl.slug}`,
  }));
  return (
    <Section tone="sauge" id="mobilite-langues">
      <div className="container-page space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader title={t('home.mobilitySpot.title')} subtitle={t('home.mobilitySpot.subtitle')} revealTitle />
          <div className="flex shrink-0 flex-wrap gap-3">
            <PrimaryButton to="/candidater" size="lg">
              {t('nav.apply')}
            </PrimaryButton>
            <SecondaryButton to="/mobilite-langues" size="lg">
              {t('home.mobilitySpot.cta')}
            </SecondaryButton>
          </div>
        </div>

        <div ref={filRef} role="group" aria-label={t('home.mobilitySpot.filLabel')}>
          <Fil orientation="auto" steps={levels} end={{ id: 'europe', label: t('home.mobilitySpot.filEnd') }} />
        </div>
        <AfterFirstDisplay>
          <FilScrub scope={filRef} />
        </AfterFirstDisplay>

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
