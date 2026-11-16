import { FocusEvent, KeyboardEvent, use, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ComposableMap, Marker } from 'react-simple-maps';
import { geoMercator, geoPath, GeoProjection } from 'd3-geo';
import { AnimatePresence, motion, useAnimate, useInView, useReducedMotion } from 'motion/react';
import { Maximize2, Minimize2 } from 'lucide-react';
import { useDialog } from '../../lib/useDialog';
import { useElementSize } from '../../lib/useElementSize';
import { prefersReducedMotion } from '../../lib/reducedMotion';
import { CAMEROON_NEIGHBORS, CAMEROON_REGIONS_LIST, CameroonRegionData } from '../../data/regions';
import { loadCameroonGeo } from './presenceGeo';
import { EASE_OUT, EASE_SCREEN } from '../../lib/motionTokens';

/** Espace de coordonnées du SVG (la carte reste nette à toutes les tailles). */
const W = 480;
const H = 560;

const REGION_BY_ISO = new Map(CAMEROON_REGIONS_LIST.map((r) => [r.iso, r]));

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

  // Projection calée sur l'emprise réelle des régions ; bande basse réservée aux étiquettes des voisins du sud
  const { projection, shapes, neighborD } = useMemo(() => {
    const projection = geoMercator().fitExtent([[24, 22], [W - 24, H - 46]], geo.regions);
    const path = geoPath(projection);
    const shapes: RegionShape[] = geo.regions.features.flatMap((f) => {
      const region = REGION_BY_ISO.get(f.properties?.shapeISO);
      const d = path(f);
      return region && d ? [{ region, d }] : [];
    });
    return { projection, shapes, neighborD: path(geo.neighborLines) ?? '' };
  }, [geo]);

  // --- Cascade d'apparition (effet 11) ---
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.35 });
  const cascade = useRef<'idle' | 'hidden' | 'done'>('idle');

  useLayoutEffect(() => {
    if (cascade.current !== 'idle') return;
    if (prefersReducedMotion()) {
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
        <RegionMap {...mapProps} inModal={false} />

        {/* Infobulle de survol (doublon visuel de l'aria-label, donc masquée aux lecteurs d'écran) */}
        {hoveredRegion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1 left-1 px-3 py-1.5 rounded-pill bg-nuit/95 border border-or/50 text-xs text-creme"
          >
            <span className="text-or font-semibold">{hoveredRegion.name}</span> · Chef-lieu : {hoveredRegion.capital}
          </div>
        )}

        {/* Bouton discret de plein écran */}
        <button
          ref={openFullscreenRef}
          type="button"
          onClick={() => setIsFullscreen(true)}
          aria-label="Afficher la carte du Cameroun en plein écran"
          title="Plein écran"
          className="absolute top-0 right-0 w-11 h-11 [@media(pointer:fine)]:w-9 [@media(pointer:fine)]:h-9 rounded-pill bg-feuillage/90 hover:bg-or text-creme hover:text-v1-encre border border-or/40 flex items-center justify-center transition-colors duration-(--dur-fast) cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
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
            className="fixed inset-0 z-(--z-modal) bg-nuit flex flex-col p-4 sm:p-8 text-creme outline-none"
          >
            <div className="max-w-5xl w-full mx-auto flex items-start justify-between gap-4 border-b border-or/30 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-kicker text-or">Ancrage local · 10 régions du Cameroun</p>
                <h2 id={titleId} className="font-serif text-xl sm:text-2xl text-creme">
                  Région sélectionnée : {selectedRegion.name} ({selectedRegion.capital})
                </h2>
                <p className="mt-1 text-xs text-creme/80">{selectedRegion.antennaTodo}</p>
              </div>
              <button
                ref={closeFullscreenRef}
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-pill bg-or text-v1-encre text-xs font-semibold cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-creme"
              >
                <Minimize2 className="w-4 h-4" aria-hidden="true" />
                <span>Fermer</span>
              </button>
            </div>

            <div className="flex-1 min-h-0 w-full max-w-3xl mx-auto py-4">
              <RegionMap {...mapProps} inModal />
            </div>

            <div
              role="group"
              aria-label="Sélection rapide des 10 régions du Cameroun"
              className="max-w-5xl w-full mx-auto pt-3 border-t border-or/25 flex sm:flex-wrap sm:justify-center gap-1.5 overflow-x-auto pb-1"
            >
              {CAMEROON_REGIONS_LIST.map((reg) => {
                const isSelected = selectedRegion.id === reg.id;
                return (
                  <button
                    key={reg.id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => onSelectRegion(reg)}
                    className={`px-3 py-1.5 rounded-pill text-xs whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-(--dur-fast) focus-visible:outline-2 focus-visible:outline-creme ${
                      isSelected ? 'bg-or text-v1-encre font-semibold' : 'bg-white/10 text-creme hover:bg-white/20'
                    }`}
                  >
                    {reg.name}
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
        aria-label="Carte des 10 régions du Cameroun ; chaque région est un bouton"
        className={`block overflow-hidden select-none ${inModal ? 'max-h-full max-w-full h-full w-auto' : 'w-full h-auto'}`}
      >
        {/* 1. Contexte : les 6 voisins, contours très discrets sans remplissage ; le golfe de Guinée reste vide */}
        <g aria-hidden="true" pointerEvents="none">
          <path d={neighborD} fill="none" className="stroke-creme" strokeOpacity={0.26} strokeWidth={0.8 * Math.min(u, 1.4)} strokeDasharray="3 3" />
          {showNeighborLabels &&
            CAMEROON_NEIGHBORS.map((n) => (
              <Marker key={n.neName} coordinates={n.labelCoords}>
                <text textAnchor="middle" fillOpacity={0.45} fontSize={8 * u} style={{ letterSpacing: '0.14em' }} className="font-sans fill-creme">
                  {n.label.map((line, i) => (
                    <tspan key={line} x={0} dy={i === 0 ? 0 : 10 * u}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </Marker>
            ))}
        </g>

        {/* 2. Les 10 régions : vert moyen, fines bordures or ; survol et sélection s'éclairent en or */}
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
                aria-label={`Région ${region.name}, chef-lieu ${region.capital}`}
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
                className={`cursor-pointer outline-none stroke-or transition-[fill] duration-(--dur-fast) ease-out ${
                  isSelected ? 'fill-or' : isHovered ? 'fill-bronze' : 'fill-v1-canopee'
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
            className="stroke-ivoire"
            strokeWidth={1.3}
            strokeLinejoin="round"
            pointerEvents="none"
          />
        )}

        {/* 4. Indicateur de focus clavier : double trait sombre + clair, lisible sur le vert comme sur l'or */}
        {focusShape && (
          <g pointerEvents="none">
            <path d={focusShape.d} fill="none" className="stroke-v1-nuit" strokeWidth={4 * u} strokeLinejoin="round" />
            <path d={focusShape.d} fill="none" className="stroke-creme" strokeWidth={2 * u} strokeLinejoin="round" />
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
                      <circle r={8} className="fill-nuit" fillOpacity={0.28} />
                      {!reduce && <circle r={4} fill="none" strokeWidth={1.4} className="map-pulse stroke-ivoire" />}
                      <circle r={3.8} className="fill-nuit stroke-ivoire" strokeWidth={1.3} />
                    </>
                  ) : (
                    <>
                      <circle r={6.5} className="fill-or-clair" fillOpacity={0.24} />
                      <circle r={2.6} className="fill-creme stroke-nuit" strokeWidth={1.1} />
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
                  <rect x={-width / 2} y={0} width={width} height={pillH} rx={pillH / 2} className="fill-nuit stroke-or" strokeWidth={0.9 * u} />
                  <text y={pillH / 2} dy="0.35em" textAnchor="middle" fontSize={fs} fontWeight={600} className="font-sans fill-creme">
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
