import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { AlertCircle, ArrowUpRight } from 'lucide-react';
import { richText } from '../../lib/richText';
import i18n from '../../i18n';
import { useLocalize } from '../../lib/localize';
import { CAMEROON_REGIONS_LIST, CameroonRegionData } from '../../data/regions';
import { prefetchPresenceGeo } from '../../lib/geoData';
import CountryList from './CountryList';
import ChunkErrorBoundary from './ChunkErrorBoundary';
import { AfterFirstDisplay, MapMotion } from '../../effects/DeferredMotion';

// Les cartes (react-simple-maps + d3) et leurs données (public/geo) sont téléchargées
// seulement quand la section approche de l'écran.
const CameroonMap = lazy(() => import('./CameroonMap'));
const EuropeMiniMap = lazy(() => import('./EuropeMiniMap'));

/** Même format que la carte (480 × 560) : rien ne bouge quand elle arrive. */
const CAMEROON_BOX = 'w-full max-w-[400px] mx-auto aspect-[480/560]';

// Fonctions (lot 7.10) : le texte est lu dans la langue au moment de l'affichage
const cameroonPlaceholder = () => (
  <div role="status" aria-busy="true" className={`${CAMEROON_BOX} rounded-inner bg-surface-raised flex items-center justify-center text-meta text-text-secondary`}>
    {i18n.t('ui.map.loadingCameroon')}
  </div>
);

const europePlaceholder = () => (
  <div role="status" aria-busy="true" className="absolute inset-0 rounded-inner bg-surface-raised flex items-center justify-center text-meta text-text-secondary">
    {i18n.t('ui.map.loadingEurope')}
  </div>
);

/**
 * Section « Présence & rayonnement » :
 * - Carte gauche (fond vert forêt (foret) conservé en mode clair et sombre) :
 *   Présence terrain au Cameroun (10 vraies régions, chefs-lieux, voisins discrets, panneau synchronisé et chips).
 * - Carte droite (fond blanc (blanc) conservé en mode clair et sombre avec contrastes AA) :
 *   Les 10 pays d'orientation vers l'Europe (mini-carte Europe + liste 2 colonnes synchronisées + note Albanie).
 * - Chargement différé (lazy loading) des cartes et de leurs données dès que la section approche de l'écran.
 */
export default function PresenceSection({
  hidePending = false,
}: {
  /**
   * Groupe 7.3 (Notre impact) : les lignes provisoires du panneau de région (« Antenne locale : à confirmer (TODO) »,
   * « Actions dans la région : à renseigner (TODO) ») sont masquées tant que la fondation ne les a pas fournies.
   * L'accueil garde l'affichage actuel (false par défaut).
   */
  hidePending?: boolean;
} = {}) {
  const { t, lang, localized } = useLocalize();
  // Région par défaut : Littoral (Douala)
  const [selectedRegion, setSelectedRegion] = useState<CameroonRegionData>(CAMEROON_REGIONS_LIST[0]);
  // Noms et textes des régions dans la langue (lot 7.10) ; l'état garde la donnée française
  const regionText = (r: CameroonRegionData) => localized(r, `contenu.regions.${r.id}`);
  const shownRegion = regionText(selectedRegion);

  // Pays européen survolé ou sélectionné (synchronisation bidirectionnelle carte <-> liste)
  const [activeCountrySlug, setActiveCountrySlug] = useState<string | null>(null);

  // Lazy loading des cartes quand la section approche de l'écran
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMaps, setShouldLoadMaps] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      prefetchPresenceGeo();
      setShouldLoadMaps(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          // Données géographiques et code des cartes téléchargés en parallèle
          prefetchPresenceGeo();
          setShouldLoadMaps(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* =====================================================================
            CARTE GAUCHE : « PRÉSENCE TERRAIN AU CAMEROUN » (fond vert forêt, token foret)
            ===================================================================== */}
        <div className="lg:col-span-6 rounded-card bg-surface-section text-text p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between">
          <div>

            <h3 className="text-[1.375rem] font-semibold leading-tight text-text mb-2">
              {t('ui.presence.cameroonTitle')}
            </h3>
            <p className="text-body text-text-secondary mb-4">
              {hidePending ? t('ui.presence.promptShort') : t('ui.presence.prompt')}
            </p>
          </div>

          {/* Carte géographique réelle des 10 régions du Cameroun (cascade des régions : MapMotion, contrat §10) */}
          <div className="my-1" data-map="cameroun">
            {shouldLoadMaps ? (
              <ChunkErrorBoundary className={`${CAMEROON_BOX} text-text`}>
                <Suspense fallback={cameroonPlaceholder()}>
                  <CameroonMap selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
                </Suspense>
              </ChunkErrorBoundary>
            ) : (
              cameroonPlaceholder()
            )}
          </div>

          {/* Panneau « Région sélectionnée » + Chips des 10 régions (défilement horizontal sur mobile) */}
          <div className="space-y-4 pt-3">
            <div
              aria-live="polite"
              className="rounded-inner bg-surface-raised p-4"
            >
              <div className="space-y-1">
                <p className="text-meta text-text-secondary">{t('ui.map.selected')}</p>
                <p className="text-body font-semibold text-text">
                  {shownRegion.name} ({shownRegion.capital})
                </p>
                {[shownRegion.antennaTodo, shownRegion.actionsTodo]
                  .filter((line) => !hidePending || !/TODO/.test(line))
                  .map((line) => (
                    <p key={line} className="text-meta text-text-secondary">
                      {line}
                    </p>
                  ))}
              </div>

            </div>

            {/* Chips des 10 régions : défilement horizontal sur mobile, retour à la ligne sur desktop */}
            <div
              role="group"
              aria-label={t('ui.map.quickSelect')}
              className="flex sm:flex-wrap gap-1.5 overflow-x-auto sm:overflow-visible pb-1.5 sm:pb-0 -mx-1 px-1"
            >
              {CAMEROON_REGIONS_LIST.map((reg) => {
                const isSelected = selectedRegion.id === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    aria-label={t('ui.map.regionLabel', { name: regionText(reg).name, capital: reg.capital })}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedRegion(reg)}
                    className={`inline-flex min-h-11 items-center px-4 rounded-pill text-meta whitespace-nowrap transition-colors duration-(--dur-fast) cursor-pointer shrink-0 ${
                      isSelected
                        ? 'border border-transparent bg-action text-on-action font-semibold'
                        : 'border border-border-input text-text hover:bg-surface-raised'
                    }`}
                  >
                    {regionText(reg).name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* =====================================================================
            CARTE DROITE : « LES 10 PAYS D'ORIENTATION VERS L'EUROPE »
            (Garde son fond blanc, token blanc, même en thème sombre pour un contraste AA optimal)
            ===================================================================== */}
        <div className="lg:col-span-6 rounded-card bg-surface-section text-text p-6 sm:p-8 flex flex-col">
          <div>

            <h3 className="text-[1.375rem] font-semibold leading-tight text-text mb-2">
              {t('ui.presence.europeTitle')}
            </h3>
            <p className="text-body text-text-secondary mb-5">
              {t('ui.presence.europeText')}
            </p>
          </div>

          {/* Mobile : la mini-carte passe SOUS la liste (order-2). Dès md : au-dessus (order-1).
              Sur ordinateur, la mini-carte prend toute la hauteur restante (flex-1) : plus de vide sous la liste. */}
          <div className="flex-1 flex flex-col gap-5">
            <div data-map="europe" className="order-2 md:order-1 relative flex-1 min-h-[220px] sm:min-h-[250px]">
              {shouldLoadMaps ? (
                <ChunkErrorBoundary className="absolute inset-0 text-text">
                  <Suspense fallback={europePlaceholder()}>
                    <EuropeMiniMap activeCountrySlug={activeCountrySlug} onHoverCountry={setActiveCountrySlug} />
                  </Suspense>
                </ChunkErrorBoundary>
              ) : (
                europePlaceholder()
              )}
            </div>

            <div className="order-1 md:order-2">
              <CountryList activeCountrySlug={activeCountrySlug} onHoverCountry={setActiveCountrySlug} />
            </div>
          </div>

          {/* Note en bas sur l'Albanie */}
          <div className="mt-6 pt-4 border-t border-border-subtle flex items-start gap-2.5 text-meta text-text-secondary">
            <AlertCircle aria-hidden="true" className="w-4 h-4 text-warning shrink-0 mt-1" />
            <p>
              {richText(t('ui.presence.albaniaNote'), { b: (text) => <strong>{text}</strong> })}
            </p>
          </div>
        </div>
      </div>

      {/* Crédits exigés par la licence CC BY des limites régionales */}
      <p className="text-meta text-text-secondary lg:text-right">
        {t('ui.map.creditsPrefix')}{' '}
        <a
          href="https://www.geoboundaries.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-link"
        >
          geoBoundaries
          <ArrowUpRight aria-hidden="true" className="w-3 h-3 shrink-0" />
          <span className="sr-only">{t('ui.newTab')}</span>
        </a>{' '}
        (
        <a
          href={`https://creativecommons.org/licenses/by/3.0/deed.${lang}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-link"
        >
          CC BY 3.0
          <ArrowUpRight aria-hidden="true" className="w-3 h-3 shrink-0" />
          <span className="sr-only">{t('ui.newTab')}</span>
        </a>
        {t('ui.map.creditsSuffix')}
      </p>
      {/* Cascade des régions, puis arc Cameroun → Europe (contrat §10, moment 5 ; GSAP après le premier affichage) */}
      <AfterFirstDisplay>
        <MapMotion scope={sectionRef} />
      </AfterFirstDisplay>
    </div>
  );
}
