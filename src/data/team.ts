/**
 * Équipe dirigeante de WAHHF Foundation (lot 7.7) : hero et organigramme de « Qui sommes-nous ».
 * Ajouter une personne : une ligne dans TEAM. Ajouter un niveau : une ligne dans TEAM_LEVEL_TITLES (puis ses personnes).
 * Portraits : scripts/team-portraits.json (recadrage 4:5) puis `npm run photos` ; ici, le champ photo reprend le slug.
 * Règles d'affichage (src/lib/team.ts) :
 * - une personne sans nom connu (prenom null) s'affiche « Nom à confirmer » en développement, jamais en production ;
 * - un portrait sans accord écrit (consent 'pending') ne s'affiche qu'en développement (ou avec VITE_APERCU_EQUIPE=1),
 *   comme les photos de mineurs du lot 7.6 ; la personne reste dans l'organigramme, sans portrait.
 * Questions à la fondation : docs/contenus-a-fournir.md, questions 144 à 149.
 */

export type TeamConsent = 'ok' | 'pending';

export interface TeamLink {
  label: string;
  href: string;
}

export interface TeamMember {
  id: string;
  /** null : nom inconnu */
  prenom: string | null;
  /** true quand la fondation a confirmé l'orthographe exacte du nom (sinon il n'apparaît dans aucun texte alternatif) */
  nomConfirme: boolean;
  nom: string | null;
  /** Civilité ou titre devant le nom (« Ing. Pr. », « Prof. Dr.-Ing. ») */
  titre?: string;
  /** null : pas de rôle affiché, seulement le nom (Prof. Dr.-Ing. Christian-Toralf Weber, à la demande de la fondation) */
  role: string | null;
  /** 1 = le plus haut */
  niveau: number;
  /** Ordre dans le niveau */
  ordre: number;
  /** Slug du portrait (src/data/teamPortraits.ts), ou null */
  photo: string | null;
  /** object-position sur le visage, si un cadre n'est pas en 4:5 */
  focus: string;
  /** Deux phrases ; null tant qu'elle n'est pas fournie (rien n'est affiché) */
  bio: string | null;
  /** Liens externes, seulement s'ils sont fournis */
  liens: TeamLink[];
  /** 'pending' : accord écrit pour publier le portrait pas encore reçu */
  consent: TeamConsent;
}

/**
 * Intitulé de chaque niveau (titre h3 de l'organigramme), tiré des rôles. Un niveau sans intitulé n'a pas de titre :
 * le nom de la personne y sert de h3.
 */
export const TEAM_LEVEL_TITLES: Record<number, string> = {
  1: 'Présidence',
  2: 'Vice-présidence',
  // 3 : sans intitulé (Prof. Dr.-Ing. Christian-Toralf Weber, sans rôle affiché)
  4: 'Secrétariat général',
  // Prévus : plusieurs personnes au même niveau, en grille
  5: 'Bureau',
  6: 'Coordinateurs',
};

export const TEAM: TeamMember[] = [
  // TODO (fondation) : orthographe du nom et ordre à confirmer ; bio et accord écrit à fournir
  { id: 'marrion-watio-notesse', prenom: 'Marrion', nomConfirme: false, nom: 'Watio Notesse', role: 'Président', niveau: 1, ordre: 1, photo: 'marrion-watio-notesse', focus: '50% 35%', bio: null, liens: [], consent: 'pending' },
  // TODO (fondation) : orthographe du nom et ordre à confirmer ; bio et accord écrit à fournir
  { id: 'christian-wilberg', titre: 'Ing. Pr.', prenom: 'Christian', nomConfirme: false, nom: 'Wilberg', role: 'Vice-président', niveau: 2, ordre: 1, photo: 'christian-wilberg', focus: '50% 35%', bio: null, liens: [], consent: 'pending' },
  // Nom donné par la fondation le 20 novembre 2026 (« Prof Dr ing Christian-Toralf Weber »), sans rôle : seulement
  // son nom. TODO (fondation) : ordre à confirmer ; bio et accord écrit à fournir
  { id: 'christian-toralf-weber', titre: 'Prof. Dr.-Ing.', prenom: 'Christian-Toralf', nomConfirme: true, nom: 'Weber', role: null, niveau: 3, ordre: 1, photo: 'personne-niveau-3', focus: '50% 25%', bio: null, liens: [], consent: 'pending' },
  // TODO (fondation) : nom de famille à demander, ordre à confirmer ; bio et accord écrit à fournir
  { id: 'wilfried', prenom: 'Wilfried', nomConfirme: false, nom: null, role: 'Secrétaire général', niveau: 4, ordre: 1, photo: 'wilfried', focus: '50% 35%', bio: null, liens: [], consent: 'pending' },
];

/** Au moins une personne au nom connu : l'organigramme est publié (lien du footer). */
export const TEAM_PUBLISHED = TEAM.some((member) => member.prenom !== null);
