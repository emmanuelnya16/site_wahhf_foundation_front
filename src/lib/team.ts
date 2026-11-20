import { TEAM, TEAM_LEVEL_TITLES, type TeamMember } from '../data/team';
import { TEAM_PORTRAITS } from '../data/teamPortraits';
import type { PhotoLike } from '../components/wahhf/Photo';

/** Aperçu de production avec les portraits en attente d'accord (captures, mesures) : VITE_APERCU_EQUIPE=1 au build. */
const PREVIEW = import.meta.env.VITE_APERCU_EQUIPE === '1';
/** En développement, tout s'affiche, y compris « Nom à confirmer » ; en production, seulement ce qui est confirmé. */
const SHOW_PENDING = !import.meta.env.PROD || PREVIEW;

/** Les personnes affichables, du niveau le plus haut au plus bas, puis dans l'ordre du niveau. */
export function visibleMembers(): TeamMember[] {
  return TEAM.filter((m) => SHOW_PENDING || m.prenom !== null).sort((a, b) => a.niveau - b.niveau || a.ordre - b.ordre);
}

/** Pas de coupure de ligne après un trait d'union (« Dr.-Ing. », « Christian-Toralf ») : gluon invisible U+2060. */
const keepHyphens = (text: string) => text.replace(/-/g, '-\u2060');

/** « Ing. Pr. Christian Wilberg », « Wilfried » ; « Nom à confirmer » quand il est inconnu (développement seulement). */
export function displayName(member: TeamMember): string {
  if (!member.prenom) return 'Nom à confirmer';
  // Le titre (« Ing. Pr. », « Prof. Dr.-Ing. ») et un prénom composé ne se coupent pas en fin de ligne
  const titre = member.titre && keepHyphens(member.titre.replace(/ /g, '\u00a0'));
  return [titre, keepHyphens(member.prenom), member.nom].filter(Boolean).join(' ');
}

/** Rôle affiché, ou null : la personne n'a pas de rôle affiché (seulement son nom). */
export const displayRole = (member: TeamMember) => member.role;

/** Portrait publiable (accord écrit reçu, ou développement), au format de <Photo>, ou null. */
export function memberPortrait(member: TeamMember): PhotoLike | null {
  if (!member.photo) return null;
  if (member.consent !== 'ok' && !SHOW_PENDING) return null;
  const portrait = TEAM_PORTRAITS[member.photo];
  if (!portrait) return null;
  return { ...portrait, alt: `Portrait de ${displayName(member)}`, focus: member.focus };
}

export interface TeamLevel {
  niveau: number;
  /** null : niveau sans intitulé (le nom de la personne sert de titre) */
  title: string | null;
  members: TeamMember[];
}

/** Les niveaux de l'organigramme qui ont au moins une personne affichable, du plus haut au plus bas. */
export function teamLevels(): TeamLevel[] {
  const members = visibleMembers();
  const levels = [...new Set(members.map((m) => m.niveau))].sort((a, b) => a - b);
  return levels.map((niveau) => {
    const inLevel = members.filter((m) => m.niveau === niveau);
    return { niveau, title: TEAM_LEVEL_TITLES[niveau] ?? null, members: inLevel };
  });
}
