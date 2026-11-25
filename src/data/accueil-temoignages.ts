/**
 * Témoignages de la page Accueil (/accueil, section « Des parcours qui inspirent », lot 11.4).
 *
 * Règle des faits : en production, seuls les témoignages confirmés (confirme: true) s'affichent ; s'il n'y en a aucun, la
 * section invite à raconter son parcours. Un témoignage non confirmé sert d'exemple, en développement seulement.
 * Confirmer : une vraie personne, son accord écrit, sa photo (règle des mineurs : docs/photos-catalogue.md).
 * Textes : le français ici, l'anglais et l'allemand dans src/locales/accueil (contenu.temoignages.<id>, mêmes champs).
 */
export interface Temoignage {
  id: string;
  confirme: boolean;
  /** Sans les guillemets : la page les ajoute */
  citation: string;
  nom: string;
  age?: number;
  ville: string;
  domaine: string;
  /** Le parcours en une phrase */
  resume: string;
  resultat?: string;
  /** Repère du catalogue ; null : une silhouette */
  photo: string | null;
  /** object-position de la photo dans son rond */
  cadrage?: string;
}

export const TEMOIGNAGES: Temoignage[] = [
  {
    // Exemple de la capture (docs/references/accueil/sections/6-parcours.png) : rien n'est confirmé (question 204)
    id: 'marie',
    confirme: false,
    citation: 'Le mentorat de WAHHF m’a donné la confiance et les outils pour lancer mon activité de transformation agroalimentaire.',
    nom: 'Marie',
    age: 23,
    ville: 'Douala',
    domaine: 'Jeunesse & entrepreneuriat',
    resume: 'De l’agriculture urbaine à la création de sa micro-entreprise, Marie a suivi le programme de mentorat pendant 12 mois.',
    resultat: 'Entreprise lancée, 3 emplois créés',
    photo: 'A41',
    cadrage: '66% 12%',
  },
];

/** Les témoignages affichés : confirmés ; en développement, les exemples aussi */
export function temoignagesPublies(): Temoignage[] {
  return TEMOIGNAGES.filter((t) => t.confirme || !import.meta.env.PROD);
}
