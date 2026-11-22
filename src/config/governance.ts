import { TEAM_PUBLISHED } from '../data/team';

/**
 * Équipe et gouvernance de WAHHF Foundation (groupe 7.3, audit QSN-01). Aucun nom ni aucune photo n'est fourni pour
 * l'instant : la section « Gouvernance » de Qui sommes-nous est masquée, et le lien « Équipe & Gouvernance » du footer
 * aussi (comme le lien Transparence, src/config/transparency.ts).
 * Pour l'afficher : ajouter ici les vraies personnes, avec leur accord écrit (nom, fonction, pays, une phrase, et une
 * vraie photo si elle est autorisée). La section et le lien du footer reviennent d'eux-mêmes.
 * Questions correspondantes : docs/contenus-a-fournir.md, questions 84 à 87.
 */
export interface GovernanceMember {
  name: string;
  role: string;
  /** Pays où la personne exerce (Cameroun, Allemagne) */
  country: string;
  /** Une phrase sur son rôle dans la fondation */
  text: string;
  /** Vraie photo, avec l'accord de la personne (chemin dans public/ ou import), facultative */
  photo?: { src: string; width: number; height: number };
}

export const GOVERNANCE_MEMBERS: GovernanceMember[] = [];

/**
 * Lot 7.7 : l'équipe est présentée par l'organigramme de Qui sommes-nous (src/data/team.ts) ; le lien du footer
 * « Équipe & Gouvernance » y mène dès qu'une personne au nom connu y figure.
 */
export const GOVERNANCE_PUBLISHED = GOVERNANCE_MEMBERS.length > 0 || TEAM_PUBLISHED;

/**
 * Rôles d'exemple de l'ancienne section (marqués TODO, sans nom) : gardés ici, jamais affichés. Ils peuvent servir de
 * trame quand la fondation donnera les noms.
 */
export const EXAMPLE_GOVERNANCE_ROLES_NOT_VALIDATED = [
  {
    role: 'Direction & Conseil de Fondation (TODO)',
    desc: 'Supervision stratégique, conformité juridique camerouno-allemande et contrôle de l’intégrité des programmes.',
  },
  {
    role: 'Coordination Pédagogique & Langues (TODO)',
    desc: 'Enseignants d’allemand et conseillers d’orientation chargés des cohortes A1 à C1 et de la vérification des guides pays.',
  },
  {
    role: 'Coordination Terrain Cameroun (TODO)',
    desc: 'Relais régionaux pour les campagnes d’éducation, de santé préventive, d’agroécologie et d’inclusion.',
  },
];
