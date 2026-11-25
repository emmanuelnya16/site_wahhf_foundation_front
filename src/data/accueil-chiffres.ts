/**
 * Chiffres de la page Accueil (/accueil, section « Les chiffres », lot 11.2).
 *
 * Ajouter un chiffre d'impact : une entrée à la fin de CHIFFRES, avec nature: 'impact', sa date et sa source ; le site
 * le place tout seul, avec la date et la source en petit dessous. Exemple :
 *
 *   {
 *     id: 'jeunes',
 *     nature: 'impact',
 *     valeur: 120,
 *     suffixe: '+',
 *     libelle: { fr: 'Jeunes accompagnés', en: 'Young people supported', de: 'Begleitete junge Menschen' },
 *     sousTexte: { fr: 'Depuis 2024', en: 'Since 2024', de: 'Seit 2024' },
 *     lien: '/notre-impact',
 *     date: '2026-12-31',
 *     source: { fr: 'registre des inscriptions', en: 'enrolment register', de: 'Anmelderegister' },
 *   }
 *
 * Règle : un chiffre d'impact sans date ou sans source ne s'affiche pas (chiffresPublies). Les chiffres « en-place »
 * décrivent ce que le site montre déjà : trois d'entre eux se comptent tout seuls sur les données du site.
 * Textes des quatre premiers : le français ici, l'anglais et l'allemand dans src/locales/accueil (contenu.chiffres.<id>).
 */
import { COUNTRIES_DATA, DOMAINS_DATA, GERMAN_LEVELS_DATA } from '../services/api';
import type { TexteTraduit } from './events';

/** Un texte français traduit dans src/locales/accueil, ou les trois langues écrites ici */
export type TexteChiffre = string | TexteTraduit;

export interface ChiffreAccueil {
  id: string;
  /** 'en-place' : ce que le site montre déjà ; 'impact' : un résultat, publié seulement daté et sourcé */
  nature: 'en-place' | 'impact';
  valeur: number;
  /** Signe collé au chiffre (« + », « % ») */
  suffixe?: string;
  libelle: TexteChiffre;
  sousTexte: TexteChiffre;
  /** Page du site où mène toute la colonne */
  lien: string;
  /** Date du chiffre (AAAA-MM-JJ) ; null pour ce qui est en place */
  date: string | null;
  /** D'où vient le chiffre (registre, rapport…) ; null pour ce qui est en place */
  source: TexteChiffre | null;
}

/** Les 6 domaines : l'ancre de leur section de /accueil quand elle existera (lot à venir) ; d'ici là, Nos actions */
export const LIEN_DOMAINES = '/nos-actions';

/** Les 10 pays : la liste des fiches, la même destination dans le hero et dans les chiffres (réponse 194) */
export const LIEN_PAYS = '/mobilite-langues/accompagnement#pays';

export const CHIFFRES: ChiffreAccueil[] = [
  {
    id: 'pays',
    nature: 'en-place',
    valeur: COUNTRIES_DATA.length,
    libelle: 'Pays d’Europe',
    sousTexte: 'Fiches d’orientation vérifiées',
    lien: LIEN_PAYS,
    date: null,
    source: null,
  },
  {
    id: 'domaines',
    nature: 'en-place',
    valeur: DOMAINS_DATA.length,
    libelle: 'Domaines d’action',
    sousTexte: 'De l’éducation à la mobilité',
    lien: LIEN_DOMAINES,
    date: null,
    source: null,
  },
  {
    id: 'niveaux',
    nature: 'en-place',
    valeur: GERMAN_LEVELS_DATA.length,
    libelle: 'Niveaux d’allemand et d’anglais',
    sousTexte: 'De A1 à C1, gratuits',
    lien: '/mobilite-langues',
    date: null,
    source: null,
  },
  {
    id: 'villes',
    nature: 'en-place',
    valeur: 2,
    libelle: 'Villes au Cameroun',
    sousTexte: 'Nos équipes à Yaoundé et Douala, coordination en Allemagne',
    lien: '/contact',
    date: null,
    source: null,
  },
];

/** Les chiffres affichés : un chiffre d'impact attend sa date et sa source */
export function chiffresPublies(liste: ChiffreAccueil[] = CHIFFRES): ChiffreAccueil[] {
  return liste.filter((c) => c.nature === 'en-place' || (c.date !== null && c.source !== null));
}
