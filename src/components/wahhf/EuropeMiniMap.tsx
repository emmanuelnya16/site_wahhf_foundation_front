import { FocusEvent, KeyboardEvent, use, useEffect, useId, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Marker } from 'react-simple-maps';
import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { motion, useReducedMotion } from 'motion/react';
import type { FeatureCollection, Polygon, Position } from 'geojson';
import { EUROPE_FRAME_NE_NAMES, EUROPE_SUPPORTED_COUNTRIES, SupportedEuropeCountry } from '../../data/countries';
import { useElementSize } from '../../lib/useElementSize';
import { useSlicedWork } from '../../lib/useSlicedWork';
import { loadEuropeGeo, CountryFeature } from './presenceGeo';
import { EASE_OUT, DURATION } from '../../lib/motionTokens';

const SUPPORTED_BY_NE_NAME = new Map<string, SupportedEuropeCountry>(EUROPE_SUPPORTED_COUNTRIES.map((c) => [c.neName, c]));
/** Départ de l'arc : coin bas-gauche du cadre (« Depuis le Cameroun »), en pixels. */
const ORIGIN_INSET = 16;

/** Petit arc courbe (courbe de Bézier quadratique) qui se bombe vers le haut. */
function arcPath([x0, y0]: [number, number], [x1, y1]: [number, number]) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy) || 1;
  const bend = Math.min(len * 0.22, 70);
  const cx = (x0 + x1) / 2 + (dy / len) * bend;
  const cy = (y0 + y1) / 2 - (dx / len) * bend;
  return `M${x0.toFixed(1)},${y0.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
}

type Box = [minLon: number, minLat: number, maxLon: number, maxLat: number];
type CountryPart = { coords: Polygon['coordinates']; box: Box };
type Shape = { key: string; d: string; supported: SupportedEuropeCountry | undefined };

/** Emprise (longitude, latitude) d'un polygone, d'après son anneau extérieur. */
function ringBox(ring: Position[]): Box {
  let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
  for (const [lon, lat] of ring) {
    if (lon < minLon) minLon = lon;
    if (lon > maxLon) maxLon = lon;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  return [minLon, minLat, maxLon, maxLat];
}

/** Les parties (polygones) d'un pays, chacune avec son emprise. */
function countryParts(f: CountryFeature): CountryPart[] {
  const g = f.geometry;
  if (g.type === 'Polygon') return [{ coords: g.coordinates, box: ringBox(g.coordinates[0]) }];
  if (g.type === 'MultiPolygon') return g.coordinates.map((coords) => ({ coords, box: ringBox(coords[0]) }));
  return [];
}

const overlaps = (a: Box, b: Box) => a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];

interface EuropeMiniMapProps {
  activeCountrySlug: string | null;
  onHoverCountry: (slug: string | null) => void;
  /**
   * Groupe 7.4 (page Accompagnement vers l'Europe) : l'arc se trace quand la carte entre à l'écran (son haut à 75 %),
   * puis se retrace à chaque changement de pays. Un masque circulaire centré sur le départ grandit (transform seulement,
   * CSS .arc-redraw : 1,2 s la première fois, 0,8 s ensuite, power3.inOut). Ordinateur à souris, mouvement autorisé ;
   * ailleurs, l'arc est en place et change de pays d'un coup. Sans ce réglage (accueil, Notre impact), rien ne change :
   * l'arc est tracé une fois par MapMotion, puis change de pays d'un coup (contrat §6).
   */
  redrawArc?: boolean;
  /**
   * Revue du groupe 7.4 (page Accompagnement) : `keyboard={false}` retire les 10 pays de la carte de l'ordre de tabulation
   * et des lecteurs d'écran (carte aria-hidden) ; ils restent cliquables à la souris. La liste synchronisée posée à côté
   * mène déjà à chaque fiche et, au clavier, montre le pays sur la carte : les 10 mêmes liens n'étaient plus qu'une
   * redite. Par défaut (accueil, Notre impact) : pays focalisables, inchangé.
   */
  keyboard?: boolean;
}

/**
 * Mini-carte de l'Europe (Natural Earth 1:110m), cadrée du Portugal à la Pologne et du Danemark à la Grèce.
 * Elle remplit toute la hauteur disponible de la carte blanche (plus de vide sous la liste) et se
 * recalcule à chaque redimensionnement (ResizeObserver), pixel pour pixel : textes nets.
 * Les 10 pays accompagnés (or doux) sont des liens vers leur fiche, synchronisés avec la liste.
 */
export default function EuropeMiniMap({ activeCountrySlug, onHoverCountry, redrawArc = false, keyboard = true }: EuropeMiniMapProps) {
  const geo = use(loadEuropeGeo());
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const size = useElementSize(boxRef);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);
  // Masque de l'arc (contrat §10, moment 5) : identifiant sans caractères spéciaux pour url(#…)
  const arcMaskId = `arc-trace-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  // Cible de l'arc : le pays survolé ou sélectionné ; l'arc reste sur le dernier pays visé (Allemagne au départ)
  const [arcSlug, setArcSlug] = useState(EUROPE_SUPPORTED_COUNTRIES[0].slug);
  if (activeCountrySlug && activeCountrySlug !== arcSlug) setArcSlug(activeCountrySlug);

  // redrawArc : l'arc attend que la carte entre à l'écran (ou qu'un pays soit visé avant, au clavier), puis se trace ;
  // chaque nouveau pays visé le retrace (le masque est remonté, son animation CSS repart)
  const [arcEntered, setArcEntered] = useState(!redrawArc);
  if (redrawArc && !arcEntered && activeCountrySlug) setArcEntered(true);
  // Numéro du tracé : 0 pour le premier (1,2 s), puis +1 à chaque nouveau pays (0,8 s)
  const [trace, setTrace] = useState({ slug: arcSlug, n: 0 });
  if (redrawArc && arcEntered && trace.slug !== arcSlug) setTrace({ slug: arcSlug, n: trace.n + 1 });
  useEffect(() => {
    if (arcEntered) return;
    const el = boxRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setArcEntered(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArcEntered(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -25% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [arcEntered]);

  // Emprise de chaque partie de chaque pays : calculée une fois par chargement des données
  const parts = useMemo(() => geo.countries.map((f) => ({ f, parts: countryParts(f) })), [geo]);

  // Lot 7 (contrat §10, garde-fou de performance) : seuls les pays (et parties de pays) qui touchent le cadre sont
  // projetés, et leurs tracés sont calculés par tranches de 8 ms (useSlicedWork). Avant, les 177 pays du monde étaient
  // projetés d'un bloc, en une tâche de plus de 200 ms au processeur ralenti ×4, pendant le défilement. Dessin identique :
  // ce qui est écarté tombait hors du cadre.
  const frameModel = useMemo(() => {
    if (!size || size.w < 80 || size.h < 80) return null;
    const { w, h } = size;
    const frame: FeatureCollection = {
      type: 'FeatureCollection',
      features: geo.countries.filter((f) => EUROPE_FRAME_NE_NAMES.includes(f.properties.name)),
    };
    // Projection azimutale équivalente centrée sur l'Europe (comme l'ETRS89-LAEA d'Eurostat)
    const projection = geoAzimuthalEqualArea()
      .rotate([-10, -52])
      .fitExtent([[18, 14], [w - 18, h - 14]], frame)
      .clipExtent([[0, 0], [w, h]]);
    // Partie du globe visible : les bords du cadre ramenés en longitude et latitude, avec 5° de marge
    const view: Box = [Infinity, Infinity, -Infinity, -Infinity];
    for (let i = 0; i <= 8; i++) {
      const t = i / 8;
      for (const p of [[t * w, 0], [t * w, h], [0, t * h], [w, t * h]] as [number, number][]) {
        const ll = projection.invert?.(p);
        if (!ll || !Number.isFinite(ll[0]) || !Number.isFinite(ll[1])) continue;
        view[0] = Math.min(view[0], ll[0] - 5);
        view[1] = Math.min(view[1], ll[1] - 5);
        view[2] = Math.max(view[2], ll[0] + 5);
        view[3] = Math.max(view[3], ll[1] + 5);
      }
    }
    const visible: CountryFeature[] = parts.flatMap(({ f, parts: ps }) => {
      const kept = ps.filter((p) => overlaps(p.box, view));
      if (!kept.length) return [];
      if (kept.length === ps.length) return [f];
      return [{ ...f, geometry: { type: 'MultiPolygon', coordinates: kept.map((k) => k.coords) } }];
    });
    const path = geoPath(projection);
    const compute = (f: CountryFeature): Shape | null => {
      const d = path(f);
      return d ? { key: String(f.id ?? f.properties.name), d, supported: SUPPORTED_BY_NE_NAME.get(f.properties.name) } : null;
    };
    return { w, h, projection, visible, compute };
  }, [geo, parts, size]);

  const computed = useSlicedWork(frameModel?.visible ?? null, frameModel?.compute ?? null);
  // Les pays accompagnés sont dessinés en dernier (leurs bordures restent visibles),
  // dans l'ordre de la liste (#01 → #10) : c'est aussi l'ordre de tabulation
  const shapes = useMemo(
    () => (computed ? [...computed].sort((a, b) => (a.supported?.order ?? '00').localeCompare(b.supported?.order ?? '00')) : null),
    [computed]
  );
  const model = frameModel && shapes ? { ...frameModel, shapes } : null;

  const open = (slug: string) => navigate(`/accompagnement/pays/${slug}`);
  const handleKeyDown = (e: KeyboardEvent<SVGPathElement>, slug: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      open(slug);
    }
  };
  const handleFocus = (e: FocusEvent<SVGPathElement>, slug: string) => {
    onHoverCountry(slug);
    if (e.currentTarget.matches(':focus-visible')) setFocusSlug(slug);
  };
  const handleBlur = () => {
    onHoverCountry(null);
    setFocusSlug(null);
  };

  let overlay = null;
  if (model) {
    const { w, h, projection, shapes } = model;
    const origin: [number, number] = [ORIGIN_INSET, h - ORIGIN_INSET];
    const arcTarget = EUROPE_SUPPORTED_COUNTRIES.find((c) => c.slug === arcSlug) ?? EUROPE_SUPPORTED_COUNTRIES[0];
    const arcEnd = projection(arcTarget.coordinates) as [number, number] | null;
    const active = EUROPE_SUPPORTED_COUNTRIES.find((c) => c.slug === activeCountrySlug);
    const activePoint = active ? (projection(active.coordinates) as [number, number] | null) : null;
    const focusShape = focusSlug ? shapes.find((s) => s.supported?.slug === focusSlug) : undefined;

    // Étiquette du pays (survol ou focus uniquement), gardée dans le cadre
    let label = null;
    if (active && activePoint) {
      const text = `${active.code} · ${active.name}`;
      const lw = text.length * 6 + 18;
      const x = Math.min(Math.max(activePoint[0], lw / 2 + 4), w - lw / 2 - 4);
      const above = activePoint[1] - 30 > 4;
      const y = above ? activePoint[1] - 28 : activePoint[1] + 10;
      label = (
        <g transform={`translate(${x.toFixed(1)}, ${y.toFixed(1)})`} pointerEvents="none">
          <rect x={-lw / 2} y={0} width={lw} height={19} rx={9.5} className="fill-text stroke-text" strokeWidth={0.9} />
          <text x={0} y={13} textAnchor="middle" fontSize={10} fontWeight={600} className="font-sans fill-surface-raised">
            {text}
          </text>
        </g>
      );
    }

    overlay = (
      <ComposableMap
        projection={projection}
        width={w}
        height={h}
        {...(keyboard
          ? { role: 'group', 'aria-label': "Carte de l'Europe : les 10 pays accompagnés, chacun avec un lien vers sa fiche" }
          : { 'aria-hidden': true })}
        className="absolute inset-0 w-full h-full select-none overflow-hidden"
      >
        {/* Pays : les 10 accompagnés en or doux (liens), les autres en gris très clair */}
        <g>
          {shapes.map(({ key, d, supported }) => {
            if (!supported) {
              return <path key={key} d={d} className="fill-surface-section stroke-surface-raised" strokeWidth={0.6} aria-hidden="true" pointerEvents="none" />;
            }
            const isActive = supported.slug === activeCountrySlug;
            // Lien au clavier et pour les lecteurs d'écran, sauf keyboard={false} (souris seulement)
            const linkProps = keyboard
              ? {
                  role: 'link',
                  tabIndex: 0,
                  'aria-label': `${supported.name}${supported.isEU ? '' : ', hors Union européenne'} : ouvrir la fiche`,
                  onFocus: (e: FocusEvent<SVGPathElement>) => handleFocus(e, supported.slug),
                  onBlur: handleBlur,
                  onKeyDown: (e: KeyboardEvent<SVGPathElement>) => handleKeyDown(e, supported.slug),
                }
              : {};
            return (
              <path
                key={key}
                d={d}
                {...linkProps}
                onClick={() => open(supported.slug)}
                onPointerEnter={() => onHoverCountry(supported.slug)}
                onPointerLeave={() => onHoverCountry(null)}
                strokeWidth={isActive ? 1 : 0.7}
                strokeLinejoin="round"
                className={`cursor-pointer outline-none transition-[fill] duration-(--dur-fast) ease-out ${isActive ? 'fill-foret stroke-foret dark:fill-feuille dark:stroke-feuille' : 'fill-border-subtle stroke-border-input'}`}
              />
            );
          })}
        </g>

        {/* Indicateur de focus clavier : double trait blanc + vert, au-dessus des voisins */}
        {focusShape && (
          <g pointerEvents="none">
            <path d={focusShape.d} fill="none" className="stroke-surface-raised" strokeWidth={4.5} strokeLinejoin="round" />
            <path d={focusShape.d} fill="none" className="stroke-(--focus)" strokeWidth={2} strokeLinejoin="round" />
          </g>
        )}

        {/* Repères des 10 pays : agrandissent la zone de survol/clic des petits pays (Luxembourg, Slovénie, Albanie) */}
        <g aria-hidden="true">
          {EUROPE_SUPPORTED_COUNTRIES.map((c) => {
            const isActive = c.slug === activeCountrySlug;
            return (
              <Marker
                key={c.slug}
                coordinates={c.coordinates}
                onClick={() => open(c.slug)}
                onPointerEnter={() => onHoverCountry(c.slug)}
                onPointerLeave={() => onHoverCountry(null)}
                className="cursor-pointer"
              >
                <circle r={9} fill="transparent" />
                <circle r={isActive ? 3.6 : 2.3} className={isActive ? 'fill-foret dark:fill-feuille stroke-surface-raised' : 'fill-text stroke-surface-raised'} strokeWidth={1} pointerEvents="none" />
              </Marker>
            );
          })}
        </g>

        {/* Arc « Depuis le Cameroun » (forêt à 40 %, ce n'est pas le fil). Lot 7 (contrat §10) : il se trace une fois quand
            la carte entre à l'écran, par le masque circulaire centré sur le départ, que MapMotion fait grandir (transform
            seulement) ; ensuite il change de pays d'un coup. Au repos (HTML), le masque couvre tout l'arc. */}
        <g pointerEvents="none" aria-hidden="true">
          {arcEnd && (
            <>
              <defs>
                <mask id={arcMaskId} maskUnits="userSpaceOnUse" x={0} y={0} width={w} height={h}>
                  <circle
                    key={redrawArc ? (arcEntered ? `trace-${trace.n}` : 'attente') : undefined}
                    data-arc-mask=""
                    // Tracé à l'entrée, puis à chaque pays (redrawArc) : premier tracé en 1,2 s, les suivants en 0,8 s
                    className={redrawArc ? (arcEntered ? 'arc-redraw' : 'arc-wait') : undefined}
                    data-first={redrawArc && arcEntered && trace.n === 0 ? '' : undefined}
                    style={redrawArc ? { transformOrigin: `${origin[0]}px ${origin[1]}px` } : undefined}
                    cx={origin[0]}
                    cy={origin[1]}
                    r={Math.hypot(arcEnd[0] - origin[0], arcEnd[1] - origin[1]) + 16}
                    fill="white"
                  />
                </mask>
              </defs>
              <g mask={`url(#${arcMaskId})`}>
              <motion.path
                key={arcSlug}
                d={arcPath(origin, arcEnd)}
                fill="none"
                className="stroke-foret dark:stroke-feuille"
                strokeOpacity={0.4}
                strokeWidth={1.6}
                strokeLinecap="round"
              />
              <motion.circle
                key={`fin-${arcSlug}`}
                cx={arcEnd[0]}
                cy={arcEnd[1]}
                r={5.5}
                fill="none"
                className="stroke-foret dark:stroke-feuille"
                strokeOpacity={0.4}
                strokeWidth={1.2}
              />
              </g>
            </>
          )}
          <g transform={`translate(${origin[0]}, ${origin[1]})`}>
            <circle r={4} className="fill-text stroke-surface-raised" strokeWidth={1.5} />
            <rect x={9} y={-9.5} width={106} height={19} rx={9.5} className="fill-text" />
            <text x={62} y={3.5} textAnchor="middle" fontSize={9.5} fontWeight={600} className="font-sans fill-surface-raised">
              Depuis le Cameroun
            </text>
          </g>
        </g>

        {label}
      </ComposableMap>
    );
  }

  return (
    <div ref={boxRef} className="absolute inset-0 rounded-inner bg-surface-raised overflow-hidden">
      {overlay ?? (
        // Pendant le calcul des tracés (quelques images) : le même message que pendant le chargement
        <div role="status" aria-busy="true" className="absolute inset-0 flex items-center justify-center text-meta text-text-secondary">
          Chargement de la carte Europe…
        </div>
      )}
    </div>
  );
}
