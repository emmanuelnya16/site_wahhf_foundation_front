import { FocusEvent, KeyboardEvent, use, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Marker } from 'react-simple-maps';
import { geoMercator, geoPath, GeoProjection } from 'd3-geo';
import { AnimatePresence, motion, useAnimate, useInView, useReducedMotion } from 'motion/react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useDialog } from '../../lib/useDialog';
import { useLocalize } from '../../lib/localize';
import { useElementSize } from '../../lib/useElementSize';
import { useSlicedWork } from '../../lib/useSlicedWork';
import { prefersReducedMotion } from '../../lib/reducedMotion';
import { CAMEROON_NEIGHBORS, CAMEROON_REGIONS_LIST, CameroonRegionData } from '../../data/regions';
import { loadCameroonGeo } from './presenceGeo';
import { EASE_OUT, EASE_SCREEN } from '../../lib/motionTokens';

/** Espace de coordonnées du SVG (la carte reste nette à toutes les tailles). */
const W = 480;
const H = 560;

const REGION_BY_ISO = new Map(CAMEROON_REGIONS_LIST.map((r) => [r.iso, r]));

/** Cascade d'apparition des régions par Motion : retirée au lot 6. Lot 7 (contrat §10, moment 5) : la cascade revient,
 *  jouée par GSAP (src/effects/motion/MapMotion.tsx, qui lit les attributs data-cascade). Ce code reste désactivé. */
const CASCADE_ENABLED = false;

/** Apparition en cascade : de la côte (sud) vers le nord, selon la latitude des chefs-lieux. */
const CASCADE_ORDER = [...CAMEROON_REGIONS_LIST]
  .sort((a, b) => a.coordinates[1] - b.coordinates[1])
  .map((r) => r.id);

interface RegionShape {
  region: CameroonRegionData;
  d: string;
}

interface CameroonMapProps {
  selectedRegion: CameroonRegionData;
  onSelectRegion: (region: CameroonRegionData) => void;
}

/**
 * Carte des 10 vraies régions du Cameroun (geoBoundaries ADM1), fixe et nette (pas de zoom libre).
 * Chaque région est un bouton (clic, Entrée, Espace) synchronisé avec les chips et le panneau.
 * Effet 11 : les régions apparaissent en cascade quand la carte entre dans l'écran
 * (opacité seule, 0,8 s, rien en « réduire les animations ») ; le point du chef-lieu
 * sélectionné pulse doucement trois fois (moins de 5 s), puis reste fixe.
 */
export default function CameroonMap({ selectedRegion, onSelectRegion }: CameroonMapProps) {
  const geo = use(loadCameroonGeo());
  const { t, localized } = useLocalize();
  const regionText = (r: CameroonRegionData) => localized(r, `contenu.regions.${r.id}`);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const titleId = useId();

  // Plein écran : Échap ferme, focus gardé dans la fenêtre puis rendu au bouton, page figée dessous
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const openFullscreenRef = useRef<HTMLButtonElement>(null);
  const closeFullscreenRef = useRef<HTMLButtonElement>(null);
  useDialog(isFullscreen, fullscreenRef, () => setIsFullscreen(false), {
    initialFocusRef: closeFullscreenRef,
    returnFocusRef: openFullscreenRef,
  });

  // Projection calée sur l'emprise réelle des régions ; bande basse réservée aux étiquettes des voisins du sud.
  // Tracés calculés par tranches de 8 ms (useSlicedWork) : d'un bloc, ils faisaient une tâche de plus de 50 ms au
  // moment où la carte arrive pendant le défilement (contrat §10, lot 7).
  const { projection, items, compute } = useMemo(() => {
    const projection = geoMercator().fitExtent([[24, 22], [W - 24, H - 46]], geo.regions);
    const path = geoPath(projection);
    const items: Array<{ f: (typeof geo.regions.features)[number] } | 'voisins'> = [
      ...geo.regions.features.map((f) => ({ f })),
      'voisins',
    ];
    const compute = (item: (typeof items)[number]): RegionShape | { neighborD: string } | null => {
      if (item === 'voisins') return { neighborD: path(geo.neighborLines) ?? '' };
      const region = REGION_BY_ISO.get(item.f.properties?.shapeISO);
      const d = path(item.f);
      return region && d ? { region, d } : null;
    };
    return { projection, items, compute };
  }, [geo]);
  const computed = useSlicedWork(items, compute);
  const ready = computed !== null;
  const shapes = useMemo(() => (computed ?? []).filter((x): x is RegionShape => 'region' in x), [computed]);
  const neighborD = useMemo(() => (computed ?? []).find((x): x is { neighborD: string } => 'neighborD' in x)?.neighborD ?? '', [computed]);

  // --- Cascade d'apparition (effet 11) ---
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.35 });
  const cascade = useRef<'idle' | 'hidden' | 'done'>('idle');

  // Contrat §10 et annexe B n° 33 (lot 6) : la carte s'affiche d'un coup, plus de cascade. Le code de la cascade
  // reste en place, désactivé : il suffirait de remettre CASCADE_ENABLED à true.
  useLayoutEffect(() => {
    if (cascade.current !== 'idle') return;
    if (!CASCADE_ENABLED || prefersReducedMotion()) {
      cascade.current = 'done';
      return;
    }
    scope.current?.querySelectorAll<SVGElement>('[data-cascade]').forEach((el) => (el.style.opacity = '0'));
    cascade.current = 'hidden';
  }, [scope]);

  useEffect(() => {
    if (!inView || cascade.current !== 'hidden') return;
    cascade.current = 'done';
    CASCADE_ORDER.forEach((id, i) => {
      animate(`[data-cascade="${id}"]`, { opacity: 1 }, { duration: 0.8, delay: 0.1 + i * 0.07, ease: EASE_OUT });
    });
  }, [inView, animate]);

  // Une région atteinte au clavier avant la cascade : tout s'affiche aussitôt
  const revealNow = () => {
    if (cascade.current !== 'hidden') return;
    cascade.current = 'done';
    animate('[data-cascade]', { opacity: 1 }, { duration: 0 });
  };

  const hoveredRegion = CAMEROON_REGIONS_LIST.find((r) => r.id === hoveredId);
  const mapProps = {
    projection,
    shapes,
    neighborD,
    selectedRegion,
    hoveredId,
    focusId,
    onSelectRegion,
    onHover: setHoveredId,
    onFocusRegion: setFocusId,
  };

  return (
    <>
      <div ref={scope} onFocusCapture={revealNow} className="relative w-full max-w-[400px] mx-auto">
        {ready ? (
          <RegionMap {...mapProps} inModal={false} />
        ) : (
          // Même format que la carte (480 × 560) pendant le calcul des tracés : rien ne bouge à l'arrivée
          <div role="status" aria-busy="true" className="w-full aspect-[480/560] rounded-inner bg-surface-raised flex items-center justify-center text-meta text-text-secondary">
            {t('ui.map.loadingCameroon')}
          </div>
        )}

        {/* Infobulle de survol (doublon visuel de l'aria-label, donc masquée aux lecteurs d'écran) */}
        {hoveredRegion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1 left-1 px-3 py-1.5 rounded-pill bg-surface-raised text-meta text-text shadow-overlay dark:border dark:border-border-input"
          >
            <span className="font-semibold">{regionText(hoveredRegion).name}</span> · {t('ui.map.capital', { capital: hoveredRegion.capital })}
          </div>
        )}

        {/* Bouton discret de plein écran */}
        <button
          ref={openFullscreenRef}
          type="button"
          onClick={() => setIsFullscreen(true)}
          aria-label={t('ui.map.fullscreenOpen')}
          title={t('ui.map.fullscreen')}
          className="absolute top-0 right-0 w-11 h-11 [@media(pointer:fine)]:w-9 [@media(pointer:fine)]:h-9 rounded-pill bg-surface-raised hover:bg-action text-text hover:text-on-action border border-border-input flex items-center justify-center transition-colors duration-(--dur-fast) cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Plein écran : fondu d'opacité (changement d'écran, 0,6 s) */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            ref={fullscreenRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            data-lenis-prevent
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE_SCREEN }}
            className="fixed inset-0 z-(--z-modal) bg-surface flex flex-col p-4 sm:p-8 text-text outline-none"
          >
            <div className="max-w-5xl w-full mx-auto flex items-start justify-between gap-4 border-b border-border-subtle pb-4">
              <div>
                <h2 id={titleId} className="text-section-title text-text">
                  {t('ui.map.selectedTitle', { name: regionText(selectedRegion).name, capital: selectedRegion.capital })}
                </h2>
                <p className="mt-1 text-meta text-text-secondary">{regionText(selectedRegion).antennaTodo}</p>
              </div>
              <button
                ref={closeFullscreenRef}
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-pill bg-action text-on-action text-meta font-semibold cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
              >
                <Minimize2 className="w-4 h-4" aria-hidden="true" />
                <span>{t('ui.map.close')}</span>
              </button>
            </div>

            <div className="flex-1 min-h-0 w-full max-w-3xl mx-auto py-4">
              <RegionMap {...mapProps} inModal />
            </div>

            <div
              role="group"
              aria-label={t('ui.map.quickSelect')}
              className="max-w-5xl w-full mx-auto pt-3 border-t border-border-subtle flex sm:flex-wrap sm:justify-center gap-1.5 overflow-x-auto pb-1"
            >
              {CAMEROON_REGIONS_LIST.map((reg) => {
                const isSelected = selectedRegion.id === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectRegion(reg)}
                    className={`px-3 py-1.5 inline-flex min-h-11 items-center rounded-pill text-meta whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-(--dur-fast) ${
                      isSelected ? 'bg-action text-on-action font-semibold' : 'border border-border-input text-text hover:bg-surface-section'
                    }`}
                  >
                    {regionText(reg).name}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

interface RegionMapProps {
  projection: GeoProjection;
  shapes: RegionShape[];
  neighborD: string;
  selectedRegion: CameroonRegionData;
  hoveredId: string | null;
  focusId: string | null;
  onSelectRegion: (region: CameroonRegionData) => void;
  onHover: (id: string | null) => void;
  onFocusRegion: (id: string | null) => void;
  inModal: boolean;
}

/**
 * Le SVG de la carte (affiché dans la section et en plein écran).
 * Les textes sont dimensionnés en pixels réels d'après la taille affichée :
 * « Douala » reste lisible (11 px) que la carte fasse 300 px ou 900 px de large.
 */
function RegionMap({
  projection,
  shapes,
  neighborD,
  selectedRegion,
  hoveredId,
  focusId,
  onSelectRegion,
  onHover,
  onFocusRegion,
  inModal,
}: RegionMapProps) {
  const reduce = useReducedMotion();
  const { t, localized } = useLocalize();
  const boxRef = useRef<HTMLDivElement>(null);
  const box = useElementSize(boxRef);

  // Largeur réellement affichée du SVG, puis nombre d'unités SVG par pixel écran
  const shown = box ? (inModal ? Math.min(box.w, (box.h * W) / H) : box.w) : 400;
  const u = W / Math.max(shown, 1);
  const showNeighborLabels = shown >= 360;

  const cascadeId = (id: string) => (inModal ? undefined : id);
  const selectedShape = shapes.find((s) => s.region.id === selectedRegion.id);
  const focusShape = focusId ? shapes.find((s) => s.region.id === focusId) : undefined;
  const labelled = CAMEROON_REGIONS_LIST.filter((r) => r.id === selectedRegion.id || r.id === hoveredId);

  const handleKeyDown = (e: KeyboardEvent<SVGPathElement>, region: CameroonRegionData) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectRegion(region);
    }
  };
  const handleFocus = (e: FocusEvent<SVGPathElement>, id: string) => {
    onHover(id);
    if (e.currentTarget.matches(':focus-visible')) onFocusRegion(id);
  };
  const handleBlur = () => {
    onHover(null);
    onFocusRegion(null);
  };

  // Étiquette du chef-lieu : 11 px à l'écran, pastille de 19 px
  const fs = 11 * u;
  const pillH = 19 * u;

  return (
    <div ref={boxRef} className={inModal ? 'w-full h-full flex items-center justify-center' : 'w-full'}>
      <ComposableMap
        projection={projection}
        width={W}
        height={H}
        role="group"
        aria-label={t('ui.map.cameroonLabel')}
        className={`block overflow-hidden select-none ${inModal ? 'max-h-full max-w-full h-full w-auto' : 'w-full h-auto'}`}
      >
        {/* 1. Contexte : les 6 voisins, contours très discrets sans remplissage ; le golfe de Guinée reste vide */}
        <g aria-hidden="true" pointerEvents="none">
          <path d={neighborD} fill="none" className="stroke-text-secondary" strokeOpacity={0.45} strokeWidth={0.8 * Math.min(u, 1.4)} strokeDasharray="3 3" />
          {showNeighborLabels &&
            CAMEROON_NEIGHBORS.map((n) => (
              <Marker key={n.neName} coordinates={n.labelCoords}>
                <text textAnchor="middle" fillOpacity={0.45} fontSize={8 * u} style={{ letterSpacing: '0.14em' }} className="font-sans fill-text-secondary">
                  {localized(n, `contenu.voisins.${n.neName.replace(/\W/g, '')}`).label.map((line, i) => (
                    <tspan key={line} x={0} dy={i === 0 ? 0 : 10 * u}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </Marker>
            ))}
        </g>

        {/* 2. Les 10 régions (contrat, décision du 16/11) : papier (canopée en sombre), bordure trait ; survol filet ; sélection couleur d'action */}
        <g>
          {shapes.map(({ region, d }) => {
            const isSelected = region.id === selectedRegion.id;
            const isHovered = region.id === hoveredId;
            return (
              <path
                key={region.id}
                d={d}
                data-cascade={cascadeId(region.id)}
                role="button"
                tabIndex={0}
                aria-label={t('ui.map.regionLabel', { name: localized(region, `contenu.regions.${region.id}`).name, capital: region.capital })}
                aria-pressed={isSelected}
                onClick={() => onSelectRegion(region)}
                onPointerEnter={() => onHover(region.id)}
                onPointerLeave={() => onHover(null)}
                onFocus={(e) => handleFocus(e, region.id)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, region)}
                strokeOpacity={0.75}
                strokeWidth={0.7}
                strokeLinejoin="round"
                className={`cursor-pointer outline-none stroke-border-input transition-[fill] duration-(--dur-fast) ease-out ${
                  isSelected ? 'fill-foret dark:fill-feuille' : isHovered ? 'fill-border-subtle' : 'fill-surface-raised'
                }`}
              />
            );
          })}
        </g>

        {/* 3. Contour de la région sélectionnée, redessiné au-dessus (sinon les voisines le recouvrent) */}
        {selectedShape && (
          <path
            d={selectedShape.d}
            data-cascade={cascadeId(selectedShape.region.id)}
            fill="none"
            className="stroke-text"
            strokeWidth={1.3}
            strokeLinejoin="round"
            pointerEvents="none"
          />
        )}

        {/* 4. Indicateur de focus clavier : double trait sombre + clair, lisible sur le vert comme sur l'or */}
        {focusShape && (
          <g pointerEvents="none">
            <path d={focusShape.d} fill="none" className="stroke-surface-raised" strokeWidth={4 * u} strokeLinejoin="round" />
            <path d={focusShape.d} fill="none" className="stroke-(--focus)" strokeWidth={2 * u} strokeLinejoin="round" />
          </g>
        )}

        {/* 5. Points lumineux des chefs-lieux (le clic passe à la région en dessous) */}
        <g pointerEvents="none">
          {CAMEROON_REGIONS_LIST.map((region) => {
            const isSelected = region.id === selectedRegion.id;
            return (
              <Marker key={region.id} coordinates={region.coordinates}>
                <g data-cascade={cascadeId(region.id)}>
                  {isSelected ? (
                    <>
                      <circle r={8} className="fill-text" fillOpacity={0.2} />
                      {/* Pulsation du chef-lieu retirée (contrat §10, annexe B n° 33 ; lot 6) ; keyframes map-pulse gardées dans index.css */}

                      <circle r={3.8} className="fill-text stroke-surface-raised" strokeWidth={1.3} />
                    </>
                  ) : (
                    <>
                      <circle r={6.5} className="fill-foret dark:fill-feuille" fillOpacity={0.18} />
                      <circle r={2.6} className="fill-surface-raised stroke-text" strokeWidth={1.1} />
                    </>
                  )}
                </g>
              </Marker>
            );
          })}
        </g>

        {/* 6. Nom du chef-lieu (région sélectionnée et région survolée), au-dessus de tous les points */}
        <g pointerEvents="none">
          {labelled.map((region) => {
            const width = (region.capital.length * 6.3 + 18) * u;
            return (
              <Marker key={region.id} coordinates={region.coordinates}>
                <g data-cascade={cascadeId(region.id)} transform={`translate(0, ${-7 - pillH})`}>
                  <rect x={-width / 2} y={0} width={width} height={pillH} rx={pillH / 2} className="fill-text stroke-text" strokeWidth={0.9 * u} />
                  <text y={pillH / 2} dy="0.35em" textAnchor="middle" fontSize={fs} fontWeight={600} className="font-sans fill-surface-raised">
                    {region.capital}
                  </text>
                </g>
              </Marker>
            );
          })}
        </g>
      </ComposableMap>
    </div>
  );
}
