import { feature, mesh } from 'topojson-client';
import { geoArea } from 'd3-geo';
import type { Feature, FeatureCollection, Geometry, MultiLineString } from 'geojson';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { fetchGeo, GEO_URLS } from '../../lib/geoData';
import { CAMEROON_NEIGHBORS } from '../../data/regions';

/**
 * Préparation des données géographiques réelles des deux cartes (aucun contour dessiné à la main).
 * Chargé avec le code des cartes (à la demande) ; chaque résultat est mémorisé pour la visite.
 */

type CountryProps = { name: string };
type WorldTopology = Topology<{ countries: GeometryCollection<CountryProps> }>;
export type CountryFeature = Feature<Geometry, CountryProps>;

export interface CameroonGeo {
  regions: FeatureCollection;
  /** Contours des 6 pays voisins, SANS la frontière commune avec le Cameroun
   *  (celle-ci vient des régions geoBoundaries, plus précises que le 1:110m). */
  neighborLines: MultiLineString;
}

export interface EuropeGeo {
  countries: CountryFeature[];
}

/**
 * d3-geo attend l'anneau extérieur dans le sens horaire ; la norme GeoJSON (RFC 7946) l'inverse.
 * Un polygone « à l'envers » couvre toute la Terre sauf lui-même (aire > 2π sr) : on le retourne.
 * Le fichier livré est déjà orienté ; ce garde-fou protège une future mise à jour des données.
 */
function orientForD3<T extends Feature>(f: T): T {
  if (geoArea(f) <= 2 * Math.PI) return f;
  const g = f.geometry;
  if (g.type === 'Polygon') g.coordinates = g.coordinates.map((ring) => [...ring].reverse());
  else if (g.type === 'MultiPolygon') g.coordinates = g.coordinates.map((poly) => poly.map((ring) => [...ring].reverse()));
  return f;
}

let cameroonPromise: Promise<CameroonGeo> | null = null;
let europePromise: Promise<EuropeGeo> | null = null;

export function loadCameroonGeo(): Promise<CameroonGeo> {
  cameroonPromise ??= Promise.all([
    fetchGeo<FeatureCollection>(GEO_URLS.cameroonRegions),
    fetchGeo<WorldTopology>(GEO_URLS.world),
  ]).then(([regions, world]) => {
    const neighbors = new Set(CAMEROON_NEIGHBORS.map((n) => n.neName));
    type WithName = { properties?: Partial<CountryProps> | null };
    const isNeighbor = (g: WithName) => neighbors.has(g.properties?.name ?? '');
    const isCameroon = (g: WithName) => g.properties?.name === 'Cameroon';
    return {
      regions: { ...regions, features: regions.features.map(orientForD3) },
      neighborLines: mesh(
        world,
        world.objects.countries,
        (a, b) => (isNeighbor(a) || isNeighbor(b)) && !isCameroon(a) && !isCameroon(b)
      ),
    };
  });
  cameroonPromise.catch(() => (cameroonPromise = null));
  return cameroonPromise;
}

export function loadEuropeGeo(): Promise<EuropeGeo> {
  europePromise ??= fetchGeo<WorldTopology>(GEO_URLS.world).then((world) => ({
    countries: (feature(world, world.objects.countries) as FeatureCollection<Geometry, CountryProps>).features,
  }));
  europePromise.catch(() => (europePromise = null));
  return europePromise;
}
