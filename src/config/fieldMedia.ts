/**
 * « Sur le terrain » (contrat §10, moment 3, lot 7) : le média qui s'ouvre en plein écran.
 * Aujourd'hui une vraie photo de l'Open Day ; la boucle vidéo la remplacera dès que la fondation la fournira.
 */
export const FIELD_EXPAND = {
  /** Photo de la galerie (src/data/gallery.ts) : la marche dans les rues de Yaoundé */
  photoId: 'open-day-marche',
  /**
   * Boucle hébergée sur le site (MP4 H.264 et WebM, muette, 8 à 15 s, 1 280 px) : renseigner les chemins (dossier
   * public/) pour qu'elle remplace la photo. Elle ne démarre pas en mouvement réduit (la photo sert d'affiche).
   */
  loop: { mp4: null as string | null, webm: null as string | null },
};
