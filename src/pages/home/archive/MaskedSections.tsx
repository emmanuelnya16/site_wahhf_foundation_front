import { useTranslation } from 'react-i18next';
import SectionHeader from '../../../components/wahhf/SectionHeader';
import Counter from '../../../components/wahhf/Counter';
import Section from '../../../components/wahhf/Section';
import StaggerGroup from '../../../effects/StaggerGroup';
import { PrimaryButton, SecondaryButton, DonateButton } from '../../../components/wahhf/Buttons';
import { Heart } from 'lucide-react';

/*
 * Sections retirées de l'accueil au lot 6 (décision du 16/11), MASQUÉES SANS SUPPRESSION : ce module n'est importé
 * nulle part. Les textes et données restent ici (et dans fr.json / en.json) pour /qui-sommes-nous ou un retour
 * ultérieur. Code recopié tel qu'il était sur l'accueil.
 */

/** Ancien bandeau « Des actions concrètes et mesurables » : 4 compteurs animés, dont « 1 250+ » d'exemple (T-11). */
export function ArchivedKeyFigures() {
  const { t } = useTranslation();
  return (
    <>
      {/* =====================================================================
          3. CHIFFRES CLÉS (4 compteurs animés)
          ===================================================================== */}
      <section id="chiffres-cles" className="surface-green py-16 sm:py-20 bg-nuit text-creme border-y border-or/25">
        <div className="container-page space-y-12">
          <SectionHeader
            title={t('home.stats.title')}
            subtitle={t('home.stats.subtitle')}
            onInverse
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: 1250,
                suffix: '+',
                label: t('home.stats.s1Label'),
                note: 'Valeur d’exemple — TODO : confirmer chiffre officiel',
              },
              {
                number: 6,
                suffix: '',
                label: t('home.stats.s2Label'),
                note: 'Éducation, Santé, Entrepreneuriat, Environnement, Droits, Mobilité',
              },
              {
                number: 10,
                suffix: '',
                label: t('home.stats.s3Label'),
                note: 'Présence et relais communautaires au Cameroun',
              },
              {
                number: 10,
                suffix: '',
                label: t('home.stats.s4Label'),
                note: 'Fiches pays vérifiées & cours d’allemand A1–C1 gratuits',
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="relative rounded-card bg-feuillage/70 border border-or/30 p-7 overflow-hidden"
              >
                <p className="font-serif font-normal text-4xl sm:text-5xl text-or mb-3">
                  <Counter end={stat.number} suffix={stat.suffix} />
                </p>
                <p className="text-base font-medium text-creme mb-1.5">{stat.label}</p>
                <p className="text-xs text-creme/65">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/** Anciennes cartes « Agir » : don, bénévole, partenaire (le don reste dans le hero, l'en-tête et le footer). */
export function ArchivedActCards() {
  const { t } = useTranslation();
  return (
    <>
      {/* =====================================================================
          13. AGIR (Trois cartes : Faire un don · Devenir bénévole · Devenir partenaire)
          ===================================================================== */}
      <Section tone="sauge" id="agir">
        <div className="container-page space-y-12">
          <SectionHeader
            kicker={t('home.act.kicker')}
            title={t('home.act.title')}
            subtitle={t('home.act.subtitle')}
          />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Carte 1 : Faire un don */}
            <div className="surface-green relative rounded-card bg-nuit text-creme p-8 border border-or/35 flex flex-col justify-between overflow-hidden">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-pill bg-rouge text-white text-xs font-semibold">
                  Soutien Financier Direct
                </span>
                <h3 className="font-serif font-normal text-2xl sm:text-3xl text-creme">
                  Faire un don
                </h3>
                <p className="text-sm sm:text-base text-creme/80 leading-relaxed">
                  Financez directement les heures de cours d’allemand gratuits, les manuels pédagogiques et les campagnes de santé communautaire.
                </p>
              </div>
              <div className="pt-8">
                <DonateButton size="lg" className="w-full">
                  Faire un don maintenant
                </DonateButton>
              </div>
            </div>

            {/* Carte 2 : Devenir bénévole */}
            <div className="relative rounded-card bg-surface-raised p-8 border border-border-soft flex flex-col justify-between overflow-hidden shadow-xs">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-pill bg-nuit/10 dark:bg-or/20 text-accent text-xs font-semibold">
                  Engagement Humain
                </span>
                <h3 className="font-serif font-normal text-2xl sm:text-3xl text-text">
                  Devenir bénévole
                </h3>
                <p className="text-sm sm:text-base text-text-tertiary leading-relaxed">
                  Rejoignez nos équipes au Cameroun, en Allemagne ou à distance : enseignement des langues, mentorat, santé ou logistique.
                </p>
              </div>
              <div className="pt-8">
                <PrimaryButton to="/agir#benevole" className="w-full">
                  Proposer mon aide bénévole
                </PrimaryButton>
              </div>
            </div>

            {/* Carte 3 : Devenir partenaire */}
            <div className="relative rounded-card bg-surface-raised p-8 border border-border-soft flex flex-col justify-between overflow-hidden shadow-xs">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-pill bg-or/20 text-v1-encre dark:text-or text-xs font-semibold">
                  Mécénat & Institutions
                </span>
                <h3 className="font-serif font-normal text-2xl sm:text-3xl text-text">
                  Devenir partenaire
                </h3>
                <p className="text-sm sm:text-base text-text-tertiary leading-relaxed">
                  Écoles, universités, ONG, fondations et entreprises : co-construisons des programmes d’intérêt général mesurables.
                </p>
              </div>
              <div className="pt-8">
                <PrimaryButton to="/agir#partenaire" className="w-full">
                  Bâtir un partenariat
                </PrimaryButton>
              </div>
            </div>
          </StaggerGroup>
        </div>
      </Section>
    </>
  );
}

/** Ancienne bande finale d'appel au don, juste avant le footer (retirée : décision du 16/11). */
export function ArchivedDonateBand() {
  const { t } = useTranslation();
  return (
    <>
        {/* Bande finale d'appel au don juste avant le footer */}
        <div className="surface-green rounded-card bg-gradient-to-r from-nuit via-feuillage to-nuit text-creme p-8 sm:p-12 border border-or/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-kicker text-or">
              <Heart className="w-4 h-4 text-rouge fill-current" />
              <span>Solidarité & Gratuité</span>
            </div>
            <h2 className="font-serif font-normal text-2xl sm:text-3xl text-creme">
              {t('home.newsletter.donateBannerTitle')}
            </h2>
            <p className="text-sm sm:text-base text-creme/80">
              {t('home.newsletter.donateBannerSub')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <DonateButton size="lg">{t('home.newsletter.donateBannerBtn')}</DonateButton>
            <SecondaryButton to="/candidater" onInverse>
              Être accompagné gratuitement
            </SecondaryButton>
          </div>
        </div>
    </>
  );
}
