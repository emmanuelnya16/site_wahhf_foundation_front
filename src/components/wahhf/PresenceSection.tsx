import { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Compass, AlertCircle } from 'lucide-react';
import { CAMEROON_REGIONS_LIST, CameroonRegionData } from '../../data/regions';
import { prefetchPresenceGeo } from '../../lib/geoData';
import CountryList from './CountryList';
import ChunkErrorBoundary from './ChunkErrorBoundary';

// Les cartes (react-simple-maps + d3) et leurs données (public/geo) sont téléchargées
// seulement quand la section approche de l'écran.
const CameroonMap = lazy(() => import('./CameroonMap'));
const EuropeMiniMap = lazy(() => import('./EuropeMiniMap'));

/** Même format que la carte (480 × 560) : rien ne bouge quand elle arrive. */
const CAMEROON_BOX = 'w-full max-w-[400px] mx-auto aspect-[480/560]';

const cameroonPlaceholder = (
  <div className={`${CAMEROON_BOX} rounded-2xl bg-feuillage/40 border border-or/20 flex items-center justify-center text-xs text-creme/75`}>
    Chargement de la carte des 10 régions du Cameroun…
  </div>
);

const europePlaceholder = (
  <div className="absolute inset-0 rounded-2xl bg-creme border border-nuit/10 flex items-center justify-center text-xs text-v1-encre/70">
    Chargement de la carte Europe…
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
export default function PresenceSection() {
  // Région par défaut : Littoral (Douala)
  const [selectedRegion, setSelectedRegion] = useState<CameroonRegionData>(CAMEROON_REGIONS_LIST[0]);

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
        <div className="surface-green lg:col-span-6 rounded-card bg-nuit text-creme p-6 sm:p-8 border border-or/30 relative overflow-hidden flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-kicker text-or">
                ANCRAGE LOCAL · 10 RÉGIONS DU CAMEROUN
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-or/15 text-gold-on-green text-xs font-medium border border-or/30">
                <MapPin className="w-3.5 h-3.5" />
                10 / 10 régions
              </span>
            </div>

            <h3 className="font-serif font-normal text-2xl sm:text-3xl text-creme mb-2">
              Présence terrain au Cameroun
            </h3>
            <p className="text-sm text-creme/80 mb-4 leading-relaxed">
              Cliquez sur une région ou son chef-lieu pour afficher nos relais locaux (éducation, santé, agroécologie et orientation).
            </p>
          </div>

          {/* Carte géographique réelle des 10 régions du Cameroun */}
          <div className="my-1">
            {shouldLoadMaps ? (
              <ChunkErrorBoundary className={`${CAMEROON_BOX} text-creme`}>
                <Suspense fallback={cameroonPlaceholder}>
                  <CameroonMap selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
                </Suspense>
              </ChunkErrorBoundary>
            ) : (
              cameroonPlaceholder
            )}
          </div>

          {/* Panneau « Région sélectionnée » + Chips des 10 régions (défilement horizontal sur mobile) */}
          <div className="space-y-4 pt-3">
            <div
              aria-live="polite"
              className="rounded-2xl bg-feuillage border border-or/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="text-[11px] uppercase tracking-wider text-gold-on-green font-semibold">Région sélectionnée</p>
                <p className="font-serif text-lg sm:text-xl text-creme">
                  {selectedRegion.name} ({selectedRegion.capital})
                </p>
                <p className="text-xs text-creme/90">{selectedRegion.antennaTodo}</p>
                <p className="text-[11px] text-creme/75">{selectedRegion.actionsTodo}</p>
              </div>

              {/* TODO : la page /nos-actions ne filtre pas encore par région (paramètre ?region= ignoré) */}
              <Link
                to={`/nos-actions?region=${selectedRegion.id}`}
                className="px-4 py-2.5 rounded-pill bg-or text-v1-encre text-xs font-semibold hover:bg-or-vif transition-colors shrink-0 text-center"
              >
                Voir les actions
              </Link>
            </div>

            {/* Chips des 10 régions : défilement horizontal sur mobile, retour à la ligne sur desktop */}
            <div
              role="group"
              aria-label="Sélection rapide des 10 régions du Cameroun"
              className="flex sm:flex-wrap gap-1.5 overflow-x-auto sm:overflow-visible pb-1.5 sm:pb-0 -mx-1 px-1"
            >
              {CAMEROON_REGIONS_LIST.map((reg) => {
                const isSelected = selectedRegion.id === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    aria-label={`Région ${reg.name}, chef-lieu ${reg.capital}`}
                    aria-pressed={isSelected}
                    onClick={() => setSelectedRegion(reg)}
                    className={`px-3 py-1.5 rounded-pill text-xs whitespace-nowrap transition-colors duration-(--dur-fast) cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-or ${
                      isSelected
                        ? 'bg-or text-v1-encre font-semibold shadow-xs'
                        : 'bg-creme/12 text-creme/90 hover:bg-creme/22'
                    }`}
                  >
                    {reg.name}
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
        <div className="lg:col-span-6 rounded-card bg-white text-v1-encre border border-nuit/15 p-6 sm:p-8 flex flex-col shadow-sm">
          <div>
            <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-kicker text-gold-text">
                PASSERELLE INTERNATIONALE · 10 PAYS D’ACCOMPAGNEMENT
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-nuit/10 text-nuit text-xs font-semibold">
                <Compass className="w-3.5 h-3.5" />
                Orientation 100 % gratuite
              </span>
            </div>

            <h3 className="font-serif font-normal text-2xl sm:text-3xl text-v1-encre mb-2">
              Les 10 pays d’orientation vers l’Europe
            </h3>
            <p className="text-sm text-v1-encre/75 mb-5 leading-relaxed">
              Fiches d’information vérifiées sur les voies d’études, de formation professionnelle et de travail, avec liens vers les portails officiels.
            </p>
          </div>

          {/* Mobile : la mini-carte passe SOUS la liste (order-2). Dès md : au-dessus (order-1).
              Sur ordinateur, la mini-carte prend toute la hauteur restante (flex-1) : plus de vide sous la liste. */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="order-2 md:order-1 relative flex-1 min-h-[220px] sm:min-h-[250px]">
              {shouldLoadMaps ? (
                <ChunkErrorBoundary className="absolute inset-0 text-v1-encre">
                  <Suspense fallback={europePlaceholder}>
                    <EuropeMiniMap activeCountrySlug={activeCountrySlug} onHoverCountry={setActiveCountrySlug} />
                  </Suspense>
                </ChunkErrorBoundary>
              ) : (
                europePlaceholder
              )}
            </div>

            <div className="order-1 md:order-2">
              <CountryList activeCountrySlug={activeCountrySlug} onHoverCountry={setActiveCountrySlug} />
            </div>
          </div>

          {/* Note en bas sur l'Albanie */}
          <div className="mt-6 pt-4 border-t border-nuit/12 flex items-start gap-2.5 text-xs text-v1-encre/80">
            <AlertCircle className="w-4 h-4 text-ocre shrink-0 mt-0.5" />
            <p>
              Note : L’Albanie est un pays européen candidat mais <strong>non membre de l’Union européenne</strong>. Consultez chaque fiche pays pour connaître le cadre réglementaire officiel.
            </p>
          </div>
        </div>
      </div>

      {/* Crédits exigés par la licence CC BY des limites régionales */}
      <p className="text-[11px] leading-relaxed text-v1-encre/70 dark:text-creme/70 lg:text-right">
        Fonds de carte : limites régionales{' '}
        <a
          href="https://www.geoboundaries.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          geoBoundaries
        </a>{' '}
        (
        <a
          href="https://creativecommons.org/licenses/by/3.0/deed.fr"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-accent"
        >
          CC BY 3.0
        </a>
        ) · pays Natural Earth (domaine public).
      </p>
    </div>
  );
}
