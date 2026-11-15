/**
 * Vidéo YouTube en arrière-plan du hero de l'accueil.
 *
 * Mesuré le 15/11/2026 via le lecteur intégré (sans télécharger la vidéo) :
 * « WAHHF », chaîne WAHHF Foundation, 16:9, 69,8 s, jusqu'en 2160p, intégration autorisée,
 * lecture automatique muette acceptée. Générique de fin (« Directed by… MDR Studio ») à partir de ~65 s.
 *
 * Image d'attente : miniature publique de la vidéo (1280 × 720), récupérée une fois et convertie en WebP,
 * dans public/hero/ (noms fixes : préchargée depuis index.html). Pour la remplacer par une photo du hero,
 * déposer des fichiers WebP sous de NOUVEAUX noms, puis mettre à jour POSTER ci-dessous et index.html.
 */

const env = import.meta.env;
const num = (value: string | undefined, fallback: number) => (value && !Number.isNaN(Number(value)) ? Number(value) : fallback);

export const HERO_VIDEO = {
  /** Interrupteur général : false = image d'attente seule, partout. */
  enabled: env.VITE_HERO_VIDEO_ENABLED !== 'false',
  /** Identifiant YouTube. */
  id: 'e-zT1lNANC0',
  /** Titre de l'iframe (décorative : elle est aussi masquée aux lecteurs d'écran). */
  title: 'Vidéo de présentation de WAHHF Foundation (décorative, sans son)',
  /** Largeur / hauteur de la vidéo. Détecté : 16:9. Vidéo verticale : 9 / 16 ; carrée : 1. */
  ratio: 16 / 9,
  /** Début et fin de l'extrait, en secondes (null = vidéo entière). TODO : extrait à confirmer
   *  (proposition : end = 64 pour couper le générique de fin). */
  start: null as number | null,
  end: null as number | null,
  /** Agrandissement pour cacher les bords et le logo incrusté. */
  zoom: 1.08,
  /** Taille de rendu de l'iframe (0,5 = moitié, puis agrandie à l'écran) : YouTube choisit alors une qualité
   *  plus légère (≈ 480p au lieu de 1080p) ; la vidéo reste sous un voile sombre, la différence ne se voit pas. */
  renderScale: 0.5,
  /** Fondu d'apparition, une fois la lecture démarrée. */
  fadeMs: 800,
  /** Après une pause ou un chargement, YouTube affiche quelques secondes ses contrôles, son logo et le titre :
   *  la vidéo ne réapparaît qu'après ce délai de lecture continue (l'image d'attente reste visible entre-temps). */
  resumeShowDelayMs: 3500,
  /** Conditions : écran d'au moins cette largeur, et non tactile. */
  minWidth: 768,
  /** Délai minimal depuis l'ouverture de la page avant de créer l'iframe (en plus de « chargée + inactive ») :
   *  le titre du hero (après le rideau) s'affiche d'abord, sans concurrence des ~1 Mo de scripts YouTube. */
  minDelayMs: 3000,
  /** Consentement : 'not-refused' = chargée sauf refus des cookies non essentiels ;
   *  'explicit' = seulement après « Accepter » (plus prudent au regard du RGPD). */
  consent: 'not-refused' as 'not-refused' | 'explicit',
  /** Secours : aucun message du lecteur dans ce délai → iframe retirée, image seule. */
  readyTimeoutMs: num(env.VITE_HERO_VIDEO_READY_TIMEOUT_MS, 6000),
  /** Secours : lecteur prêt mais lecture non démarrée dans ce délai → iframe retirée. */
  playTimeoutMs: num(env.VITE_HERO_VIDEO_PLAY_TIMEOUT_MS, 8000),
} as const;

/** Image d'attente (élément principal du hero, préchargée sur l'accueil). */
export const HERO_POSTER = {
  src: '/hero/hero-video-poster-1280.webp',
  srcSet: '/hero/hero-video-poster-960.webp 960w, /hero/hero-video-poster-1280.webp 1280w',
  width: 1280,
  height: 720,
};

export const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com';

/** Adresse de l'iframe (youtube-nocookie, lecture muette en boucle, sans contrôles). */
export function heroVideoUrl(origin: string) {
  const { id, start, end } = HERO_VIDEO;
  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: id,
    controls: '0',
    playsinline: '1',
    rel: '0',
    disablekb: '1',
    iv_load_policy: '3',
    modestbranding: '1',
    enablejsapi: '1',
    origin,
  });
  if (start !== null) params.set('start', String(Math.floor(start)));
  if (end !== null) params.set('end', String(Math.ceil(end)));
  return `${YOUTUBE_ORIGIN}/embed/${id}?${params}`;
}
