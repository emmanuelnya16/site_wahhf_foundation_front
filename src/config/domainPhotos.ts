/**
 * Une photo de la fondation par domaine, sur l'accueil (« Six piliers ») et sur Nos actions.
 * Premier repère : votre choix du 19/11 (lot 7.6). Les suivants : remplaçantes sans mineur identifiable, affichées en
 * production tant que la première attend l'accord parental (« ? » au catalogue).
 * - Santé : A63, l'intervenant devant le pictogramme « Santé » des domaines de la fondation (retouches du 19/11 : une
 *   image pour chaque domaine). TODO (fondation) : une photo d'une action de santé (question 142).
 * - Éducation : A27 (salle comble), sinon A98 (un participant prend des notes).
 * - Environnement : B10 (groupe dans un champ d'ananas), sinon B40 (lac de cratère) : B06 et B24 montrent les mêmes
 *   encadrants que B23 (Entrepreneuriat), côte à côte sur l'accueil.
 * Seulement des repères : les données des photos (src/data/photos.ts) ne sont pas dans le JavaScript initial.
 */
export const DOMAIN_PHOTO_IDS: Record<string, readonly string[]> = {
  education: ['A27', 'A98'],
  sante: ['A63'],
  entrepreneuriat: ['B23'],
  environnement: ['B10', 'B40'],
  'droits-inclusion': ['A31'],
  'mobilite-langues': ['A53'],
};
