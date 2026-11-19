import type { PhotoAlbumId } from './photos';

/**
 * Accueil, section « Apprendre, cultiver, grandir » (lot 7.6) : un parcours de gauche à droite, de la salle de
 * formation au sommet. Textes à valider avec la fondation ; aucun chiffre.
 * Chaque panneau a une photo de remplacement (adultes ou personnes de dos) tant que la sienne attend l'accord écrit des
 * parents (consent 'pending', question 141 de docs/contenus-a-fournir.md) : dans le build de production, c'est elle qui
 * s'affiche.
 */
export const JOURNEY_SECTION = {
  title: 'Apprendre, cultiver, grandir',
  intro: 'Des salles de formation aux champs, et jusqu’au sommet avec les jeunes.',
  link: 'Voir toutes les photos',
};

export interface JourneyPanel {
  id: string;
  title: string;
  /** Période ou lieu, sous le titre */
  meta: string;
  description: string;
  photoId: string;
  fallbackId: string;
  album: PhotoAlbumId;
}

const NB = ' ';

export const JOURNEY_PANELS: JourneyPanel[] = [
  {
    id: 'apprendre',
    title: 'Apprendre',
    meta: `Albatros Hotel, 25${NB}avril${NB}2026`,
    description: 'Une salle comble pour découvrir les programmes de la fondation.',
    photoId: 'A27',
    fallbackId: 'A30',
    album: 'journee-2026-04-25',
  },
  {
    id: 'chanter-ensemble',
    title: 'Chanter ensemble',
    meta: `25${NB}avril${NB}2026`,
    description: 'Les jeunes reprennent en chœur l’hymne de la fondation.',
    photoId: 'A85',
    fallbackId: 'A16',
    album: 'journee-2026-04-25',
  },
  {
    // TODO (fondation) : lieu et date de la visite de plantation à confirmer
    id: 'cultiver',
    title: 'Cultiver',
    meta: 'Visite de plantation',
    description: 'Sur le terrain pour comprendre l’agriculture et l’élevage durables.',
    photoId: 'B04',
    fallbackId: 'B06',
    album: 'terrain-agricole',
  },
  {
    // TODO (fondation) : lieux et dates des sorties de terrain à confirmer
    id: 's-engager',
    title: 'S’engager',
    meta: 'Sorties de terrain',
    description: 'Encadrants et jeunes réunis sous les mêmes couleurs.',
    photoId: 'B26',
    fallbackId: 'B23',
    album: 'terrain-agricole',
  },
  {
    // TODO (fondation) : lieu et date de la randonnée à confirmer
    id: 'grandir',
    title: 'Grandir',
    meta: 'Randonnée avec les jeunes',
    description: 'Une montée à plusieurs, la ville en contrebas.',
    photoId: 'B77',
    fallbackId: 'B85',
    album: 'randonnee-jeunesse',
  },
];
