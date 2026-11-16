import { FocusEvent, KeyboardEvent, use, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComposableMap, Marker } from 'react-simple-maps';
import { geoAzimuthalEqualArea, geoPath } from 'd3-geo';
import { motion, useReducedMotion } from 'motion/react';
import type { FeatureCollection } from 'geojson';
import { EUROPE_FRAME_NE_NAMES, EUROPE_SUPPORTED_COUNTRIES, SupportedEuropeCountry } from '../../data/countries';
import { useElementSize } from '../../lib/useElementSize';
import { loadEuropeGeo } from './presenceGeo';
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

interface EuropeMiniMapProps {
  activeCountrySlug: string | null;
  onHoverCountry: (slug: string | null) => void;
}

/**
 * Mini-carte de l'Europe (Natural Earth 1:110m), cadrée du Portugal à la Pologne et du Danemark à la Grèce.
 * Elle remplit toute la hauteur disponible de la carte blanche (plus de vide sous la liste) et se
 * recalcule à chaque redimensionnement (ResizeObserver), pixel pour pixel : textes nets.
 * Les 10 pays accompagnés (or doux) sont des liens vers leur fiche, synchronisés avec la liste.
 */
export default function EuropeMiniMap({ activeCountrySlug, onHoverCountry }: EuropeMiniMapProps) {
  const geo = use(loadEuropeGeo());
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const boxRef = useRef<HTMLDivElement>(null);
  const size = useElementSize(boxRef);
  const [focusSlug, setFocusSlug] = useState<string | null>(null);

  // Cible de l'arc : le pays survolé ou sélectionné ; l'arc reste sur le dernier pays visé (Allemagne au départ)
  const [arcSlug, setArcSlug] = useState(EUROPE_SUPPORTED_COUNTRIES[0].slug);
  if (activeCountrySlug && activeCountrySlug !== arcSlug) setArcSlug(activeCountrySlug);

  const model = useMemo(() => {
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
    const path = geoPath(projection);
    const shapes = geo.countries
      .flatMap((f) => {
        const d = path(f);
        return d ? [{ key: String(f.id ?? f.properties.name), d, supported: SUPPORTED_BY_NE_NAME.get(f.properties.name) }] : [];
      })
      // Les pays accompagnés sont dessinés en dernier (leurs bordures restent visibles),
      // dans l'ordre de la liste (#01 → #10) : c'est aussi l'ordre de tabulation
      .sort((a, b) => (a.supported?.order ?? '00').localeCompare(b.supported?.order ?? '00'));
    return { w, h, projection, shapes };
  }, [geo, size]);

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
      const text = `${active.code} · ${active.nameFr}`;
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
        role="group"
        aria-label="Carte de l'Europe : les 10 pays accompagnés, chacun avec un lien vers sa fiche"
        className="absolute inset-0 w-full h-full select-none overflow-hidden"
      >
        {/* Pays : les 10 accompagnés en or doux (liens), les autres en gris très clair */}
        <g>
          {shapes.map(({ key, d, supported }) => {
            if (!supported) {
              return <path key={key} d={d} className="fill-surface-section stroke-surface-raised" strokeWidth={0.6} aria-hidden="true" pointerEvents="none" />;
            }
            const isActive = supported.slug === activeCountrySlug;
            return (
              <path
                key={key}
                d={d}
                role="link"
                tabIndex={0}
                aria-label={`${supported.nameFr}${supported.isEU ? '' : ', hors Union européenne'} : ouvrir la fiche`}
                onClick={() => open(supported.slug)}
                onPointerEnter={() => onHoverCountry(supported.slug)}
                onPointerLeave={() => onHoverCountry(null)}
                onFocus={(e) => handleFocus(e, supported.slug)}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, supported.slug)}
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

        {/* Arc « Depuis le Cameroun » : se dessine une fois à chaque nouveau pays (statique en « réduire les animations ») */}
        <g pointerEvents="none" aria-hidden="true">
          {arcEnd && (
            <>
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
      {overlay}
    </div>
  );
}
