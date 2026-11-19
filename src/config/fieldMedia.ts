/**
 * « Sur le terrain » (contrat §10, moment 3, lot 7) : le média qui s'ouvre en plein écran.
 * Aujourd'hui une vraie photo de l'Open Day ; la boucle vidéo la remplacera dès que la fondation la fournira.
 */
export const FIELD_EXPAND = {
  /**
   * Lot 7.6 : la photo du catalogue (src/data/photos.ts) qui s'ouvre, B17, le groupe de la visite au milieu de la
   * plantation (1 080 px, comme B13 : aucune n'est plus nette à 1 440 px). Tant qu'elle attend l'accord parental, le
   * build de production garde la photo ci-dessous.
   */
  catalogPhotoId: 'B17',
  /** Photo de la galerie (src/data/gallery.ts) : la marche dans les rues de Yaoundé (repli de production) */
  photoId: 'open-day-marche',
  /**
   * Boucle hébergée sur le site (MP4 H.264 et WebM, muette, 8 à 15 s, 1 280 px) : renseigner les chemins (dossier
   * public/) pour qu'elle remplace la photo. Elle ne démarre pas en mouvement réduit (la photo sert d'affiche).
   */
  loop: { mp4: null as string | null, webm: null as string | null },
  /**
   * Fin de l'ouverture au défilement (décision du 17/11). 'container' : le cadre s'arrête à la largeur du container
   * (72 rem), rayon 20 px, tant que la photo source fait 986 px (au-delà, elle serait agrandie et floue).
   * Passer à 'screen' (plein écran) dès que les originaux HD (1 920 px au moins) ou la boucle vidéo sont fournis.
   */
  fit: 'container' as 'container' | 'screen',
};
