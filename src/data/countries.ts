// Données des 10 pays européens d'orientation documentés par WAHHF Foundation
// Coordonnées réelles [longitude, latitude] utilisées pour la projection d3-geo et l'arc depuis le Cameroun.

export interface SupportedEuropeCountry {
  order: string;
  slug: string;
  code: string;
  flag: string;
  nameFr: string;
  /** Nom correspondant dans Natural Earth (world-atlas countries-110m.json) */
  neName: string;
  /** Coordonnées [longitude, latitude] du centre pour l'arc et le marqueur/infobulle */
  coordinates: [number, number];
  isEU: boolean;
}

export const EUROPE_SUPPORTED_COUNTRIES: SupportedEuropeCountry[] = [
  {
    order: '01',
    slug: 'allemagne',
    code: 'DE',
    flag: '🇩🇪',
    nameFr: 'Allemagne',
    neName: 'Germany',
    coordinates: [10.4515, 51.1657],
    isEU: true,
  },
  {
    order: '02',
    slug: 'luxembourg',
    code: 'LU',
    flag: '🇱🇺',
    nameFr: 'Luxembourg',
    neName: 'Luxembourg',
    coordinates: [6.1296, 49.8153],
    isEU: true,
  },
  {
    order: '03',
    slug: 'slovenie',
    code: 'SI',
    flag: '🇸🇮',
    nameFr: 'Slovénie',
    neName: 'Slovenia',
    coordinates: [14.9955, 46.1512],
    isEU: true,
  },
  {
    order: '04',
    slug: 'italie',
    code: 'IT',
    flag: '🇮🇹',
    nameFr: 'Italie',
    neName: 'Italy',
    coordinates: [12.5674, 42.5],
    isEU: true,
  },
  {
    order: '05',
    slug: 'grece',
    code: 'GR',
    flag: '🇬🇷',
    nameFr: 'Grèce',
    neName: 'Greece',
    coordinates: [21.8243, 39.0742],
    isEU: true,
  },
  {
    order: '06',
    slug: 'portugal',
    code: 'PT',
    flag: '🇵🇹',
    nameFr: 'Portugal',
    neName: 'Portugal',
    coordinates: [-8.2245, 39.3999],
    isEU: true,
  },
  {
    order: '07',
    slug: 'espagne',
    code: 'ES',
    flag: '🇪🇸',
    nameFr: 'Espagne',
    neName: 'Spain',
    coordinates: [-3.7492, 40.4637],
    isEU: true,
  },
  {
    order: '08',
    slug: 'danemark',
    code: 'DK',
    flag: '🇩🇰',
    nameFr: 'Danemark',
    neName: 'Denmark',
    coordinates: [9.5018, 56.2639],
    isEU: true,
  },
  {
    order: '09',
    slug: 'pologne',
    code: 'PL',
    flag: '🇵🇱',
    nameFr: 'Pologne',
    neName: 'Poland',
    coordinates: [19.1451, 51.9194],
    isEU: true,
  },
  {
    order: '10',
    slug: 'albanie',
    code: 'AL',
    flag: '🇦🇱',
    nameFr: 'Albanie',
    neName: 'Albania',
    coordinates: [20.1683, 41.1533],
    isEU: false,
  },
];

/**
 * Cadrage de la mini-carte : du Portugal à la Pologne (ouest–est), du Danemark à la Grèce (nord–sud).
 * La projection est ajustée sur l'emprise réelle de ces 4 pays (noms Natural Earth).
 */
export const EUROPE_FRAME_NE_NAMES = ['Portugal', 'Poland', 'Denmark', 'Greece'];
