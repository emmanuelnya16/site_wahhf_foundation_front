// Les 10 régions du Cameroun : noms, codes ISO 3166-2, chefs-lieux et coordonnées réelles.
// Contours : public/geo/cameroun-regions.json (geoBoundaries CMR ADM1, CC BY 3.0).
//
// TODO (équipe WAHHF) : antenne et actions de chaque région = données d'exemple à remplacer.
// Aucune action ni aucun chiffre n'est inventé ici : tant que l'équipe n'a pas validé
// le contenu, chaque région affiche un simple « à confirmer / à renseigner ».

export interface CameroonRegionData {
  id: string;
  /** Code ISO 3166-2 (propriété shapeISO de geoBoundaries) */
  iso: string;
  name: string;
  capital: string;
  /** Coordonnées GPS réelles du chef-lieu [longitude, latitude] */
  coordinates: [number, number];
  /** Antenne ou relais local — TODO : exemple à remplacer par l'équipe */
  antennaTodo: string;
  /** Actions menées dans la région — TODO : exemple à remplacer par l'équipe */
  actionsTodo: string;
}

const ANTENNA_TODO = 'Antenne locale : à confirmer (TODO)';
const ACTIONS_TODO = 'Actions dans la région : à renseigner (TODO)';

/** Ordre d'affichage des chips ; le premier (Littoral, Douala) est la région sélectionnée par défaut. */
export const CAMEROON_REGIONS_LIST: CameroonRegionData[] = [
  { id: 'littoral', iso: 'CM-LT', name: 'Littoral', capital: 'Douala', coordinates: [9.7043, 4.0511], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'centre', iso: 'CM-CE', name: 'Centre', capital: 'Yaoundé', coordinates: [11.5021, 3.848], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'ouest', iso: 'CM-OU', name: 'Ouest', capital: 'Bafoussam', coordinates: [10.4176, 5.4778], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'sud-ouest', iso: 'CM-SW', name: 'Sud-Ouest', capital: 'Buea', coordinates: [9.241, 4.1527], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'nord-ouest', iso: 'CM-NW', name: 'Nord-Ouest', capital: 'Bamenda', coordinates: [10.1591, 5.9631], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'sud', iso: 'CM-SU', name: 'Sud', capital: 'Ebolowa', coordinates: [11.15, 2.9], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'est', iso: 'CM-ES', name: 'Est', capital: 'Bertoua', coordinates: [13.6846, 4.5773], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'adamaoua', iso: 'CM-AD', name: 'Adamaoua', capital: 'Ngaoundéré', coordinates: [13.5847, 7.3277], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'nord', iso: 'CM-NO', name: 'Nord', capital: 'Garoua', coordinates: [13.3977, 9.3014], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
  { id: 'extreme-nord', iso: 'CM-EN', name: 'Extrême-Nord', capital: 'Maroua', coordinates: [14.3159, 10.591], antennaTodo: ANTENNA_TODO, actionsTodo: ACTIONS_TODO },
];

export interface NeighborCountryInfo {
  /** Nom dans Natural Earth (world-atlas countries-110m.json) */
  neName: string;
  /** Étiquette très pâle (une ligne par élément) */
  label: string[];
  /** Position de l'étiquette [longitude, latitude], hors du territoire camerounais */
  labelCoords: [number, number];
}

export const CAMEROON_NEIGHBORS: NeighborCountryInfo[] = [
  { neName: 'Nigeria', label: ['NIGERIA'], labelCoords: [9.6, 8.7] },
  { neName: 'Chad', label: ['TCHAD'], labelCoords: [16.0, 11.7] },
  { neName: 'Central African Rep.', label: ['RÉP.', 'CENTRAFRICAINE'], labelCoords: [16.35, 6.6] },
  { neName: 'Congo', label: ['CONGO'], labelCoords: [15.2, 1.45] },
  { neName: 'Gabon', label: ['GABON'], labelCoords: [12.6, 1.45] },
  { neName: 'Eq. Guinea', label: ['GUINÉE ÉQ.'], labelCoords: [10.35, 1.45] },
];
