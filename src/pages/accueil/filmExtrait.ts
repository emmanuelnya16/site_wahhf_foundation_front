/**
 * Extrait muet du film, hébergé sur le site (lot 11.9). Généré par scripts/encode-film.mjs : ne pas modifier à la main.
 * null : pas encore de fichier source (docs/references/video/film-wahhf.mp4) ; la section montre l'affiche et le bouton
 * « Regarder le film » (YouTube, après un clic).
 */
export interface FilmExtrait {
  bureau: { mp4: string; webm: string };
  telephone: { mp4: string; webm: string };
  /** Début de l'extrait dans le film et sa durée, en secondes */
  debut: number;
  duree: number;
}

export const FILM_EXTRAIT: FilmExtrait | null = null;
