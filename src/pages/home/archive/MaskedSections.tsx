import { useTranslation } from 'react-i18next';
import SectionHeader from '../../../components/wahhf/SectionHeader';
import Counter from '../../../components/wahhf/Counter';

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
