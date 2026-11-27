/**
 * Le film joué sans le son dans la section « Le film » de /accueil.
 * 26 novembre 2026 : le film entier (1 min 10, 1 280 × 720, 15,7 Mo), hébergé par la fondation sur Cloudinary, à
 * l'adresse qu'elle a donnée (res.cloudinary.com est autorisé pour les vidéos dans la CSP de public/.htaccess). Un même
 * fichier pour l'ordinateur et le téléphone, sans WebM.
 * scripts/encode-film.mjs peut le remplacer par des copies plus légères hébergées sur le site (public/film) : il réécrit
 * alors ce fichier.
 */
export interface FilmExtrait {
  bureau: { mp4: string; webm?: string };
  telephone: { mp4: string; webm?: string };
  /** Début de l'extrait dans le film et sa durée, en secondes */
  debut: number;
  duree: number;
}

const FILM_CLOUDINARY = 'https://res.cloudinary.com/dtntkknaq/video/upload/v1795691237/WAHHF_720p_eoo0rc.mp4';

export const FILM_EXTRAIT: FilmExtrait | null = {
  bureau: { mp4: FILM_CLOUDINARY },
  telephone: { mp4: FILM_CLOUDINARY },
  debut: 0,
  duree: 69.8,
};
