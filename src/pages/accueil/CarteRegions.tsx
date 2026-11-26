import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import i18n from '../../i18n';
import { useLocalize } from '../../lib/localize';
import { CAMEROON_REGIONS_LIST, CameroonRegionData } from '../../data/regions';
import { prefetchPresenceGeo } from '../../lib/geoData';
import ChunkErrorBoundary from '../../components/wahhf/ChunkErrorBoundary';
import { AfterFirstDisplay, MapMotion } from '../../effects/DeferredMotion';

// La carte (react-simple-maps + d3) et ses données (public/geo) : téléchargées seulement quand la section approche
const CameroonMap = lazy(() => import('../../components/wahhf/CameroonMap'));

/** Même format que la carte (480 × 560) : rien ne bouge quand elle arrive. */
const CAMEROON_BOX = 'w-full max-w-[400px] mx-auto aspect-[480/560]';

const cameroonPlaceholder = () => (
  <div role="status" aria-busy="true" className={`${CAMEROON_BOX} rounded-inner bg-surface-raised flex items-center justify-center text-meta text-text-secondary`}>
    {i18n.t('ui.map.loadingCameroon')}
  </div>
);

/**
 * Variante, pour l'accueil (lot 11.5), de la carte « Présence terrain au Cameroun » de Notre impact
 * (src/components/wahhf/PresenceSection.tsx, inchangée) : mêmes éléments, mêmes textes, mêmes animations, comme sur
 * Notre impact (lignes provisoires masquées) ; sans la carte de l'Europe ni la liste des pays.
 * - Pas de fond de carte : la section est déjà sauge, le fond de la carte d'origine (même couleur, clair et sombre).
 * - Cascade des régions : MapMotion, tel quel. Il attend aussi la mini-carte d'Europe ([data-map="europe"]) : un repère
 *   caché la remplace ; caché, il ne déclenche rien (son arc n'existe pas).
 * - Crédits de la licence CC BY des limites régionales, sous la carte.
 */
export default function CarteRegions() {
  const { t, lang, localized } = useLocalize();
  // Région par défaut : Littoral (Douala)
  const [selectedRegion, setSelectedRegion] = useState<CameroonRegionData>(CAMEROON_REGIONS_LIST[0]);
  const regionText = (r: CameroonRegionData) => localized(r, `contenu.regions.${r.id}`);
  const shownRegion = regionText(selectedRegion);

  // Chargement de la carte quand la section approche de l'écran (comme sur Notre impact)
  const sectionRef = useRef<HTMLDivElement>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      prefetchPresenceGeo();
      setShouldLoadMap(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          prefetchPresenceGeo();
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="ac-regions-carte text-text">
      <h3 className="text-[1.375rem] font-semibold leading-tight text-text mb-2">{t('ui.presence.cameroonTitle')}</h3>
      <p className="text-body text-text-secondary mb-4">{t('ui.presence.promptShort')}</p>

      {/* Carte géographique réelle des 10 régions du Cameroun (cascade des régions : MapMotion) */}
      <div className="my-1" data-map="cameroun">
        {shouldLoadMap ? (
          <ChunkErrorBoundary className={`${CAMEROON_BOX} text-text`}>
            <Suspense fallback={cameroonPlaceholder()}>
              <CameroonMap selectedRegion={selectedRegion} onSelectRegion={setSelectedRegion} />
            </Suspense>
          </ChunkErrorBoundary>
        ) : (
          cameroonPlaceholder()
        )}
      </div>
      {/* Repère attendu par MapMotion à la place de la mini-carte d'Europe, absente ici */}
      <div data-map="europe" hidden />

      {/* Panneau « Région sélectionnée » + chips des 10 régions (défilement horizontal sur mobile) */}
      <div className="space-y-4 pt-3">
        <div aria-live="polite" className="rounded-inner bg-surface-raised p-4">
          <div className="space-y-1">
            <p className="text-meta text-text-secondary">{t('ui.map.selected')}</p>
            <p className="text-body font-semibold text-text">
              {shownRegion.name} ({shownRegion.capital})
            </p>
            {[shownRegion.antennaTodo, shownRegion.actionsTodo]
              .filter((line) => !/TODO/.test(line))
              .map((line) => (
                <p key={line} className="text-meta text-text-secondary">
                  {line}
                </p>
              ))}
          </div>
        </div>

        <div role="group" aria-label={t('ui.map.quickSelect')} className="flex sm:flex-wrap gap-1.5 overflow-x-auto sm:overflow-visible pb-1.5 sm:pb-0 -mx-1 px-1">
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
                  isSelected ? 'border border-transparent bg-action text-on-action font-semibold' : 'border border-border-input text-text hover:bg-surface-raised'
                }`}
              >
                {regionText(reg).name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Crédits exigés par la licence CC BY des limites régionales */}
      <p className="mt-6 text-meta text-text-secondary">
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
      <AfterFirstDisplay>
        <MapMotion scope={sectionRef} />
      </AfterFirstDisplay>
    </div>
  );
}
