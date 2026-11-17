/**
 * Vidéo en fond du hero de l'accueil (décision de la cliente du 16/11/2026, contrat §6).
 *
 * Source actuelle : le film « WAHHF » sur YouTube (chaîne WAHHF Foundation, 16:9, 69,8 s, intégration autorisée,
 * lecture automatique muette acceptée). Générique de fin (« Directed by… MDR Studio ») à partir de ~65 s : l'extrait
 * s'arrête à 64 s (ACC-13).
 *
 * Boucle hébergée sur le site (prévue) : quand le fichier sera fourni (MP4 H.264 + WebM, 1 280 px, 8 à 15 s, sans son,
 * 2 à 3 Mo), le déposer dans public/hero/ et renseigner HERO_LOOP ci-dessous. Elle remplace alors YouTube : plus aucun
 * tiers, donc plus de demande de consentement ; les autres conditions (ordinateur, réseau, mouvement réduit) restent.
 *
 * Image d'attente : image nette du film (49 s : la marche dans les rues de Yaoundé), capturée en 1920 × 1080 et
 * convertie en WebP dans public/hero/ ; recadrage portrait pour le téléphone. Préchargée depuis index.html (mêmes
 * srcset/sizes) : c'est l'élément LCP. Pour la remplacer, déposer de nouveaux fichiers sous de NOUVEAUX noms, puis
 * mettre à jour HERO_POSTER et index.html.
 */

const env = import.meta.env;
const num = (value: string | undefined, fallback: number) => (value && !Number.isNaN(Number(value)) ? Number(value) : fallback);

/** Boucle hébergée sur le site : null tant que le fichier n'est pas fourni (YouTube sert alors de source). */
export const HERO_LOOP: { mp4: string | null; webm: string | null } = {
  mp4: null, // ex. '/hero/boucle-wahhf-1280.mp4'
  webm: null, // ex. '/hero/boucle-wahhf-1280.webm'
};

export const HERO_VIDEO = {
  /** Interrupteur général : false = image d'attente seule, partout. */
  enabled: env.VITE_HERO_VIDEO_ENABLED !== 'false',
  /** Source : boucle hébergée dès qu'elle est renseignée, sinon YouTube. */
  source: (HERO_LOOP.mp4 || HERO_LOOP.webm ? 'file' : 'youtube') as 'file' | 'youtube',
  /** Identifiant YouTube. */
  id: 'e-zT1lNANC0',
  /** Titre de l'iframe (décorative : elle est aussi masquée aux lecteurs d'écran). */
  title: 'Vidéo de présentation de WAHHF Foundation (décorative, sans son)',
  /** Largeur / hauteur de la vidéo. Détecté : 16:9. Vidéo verticale : 9 / 16 ; carrée : 1. */
  ratio: 16 / 9,
  /** Début et fin de l'extrait, en secondes : 0 à 64 s, avant le générique (ACC-13). */
  start: null as number | null,
  end: 64 as number | null,
  /** Agrandissement pour cacher les bords et le logo incrusté. */
  zoom: 1.08,
  /** Taille de rendu de l'iframe (0,5 = moitié, puis agrandie à l'écran) : YouTube choisit alors une qualité
   *  plus légère (≈ 480p au lieu de 1080p). À droite, sous un voile léger, la vidéo reste lisible. */
  renderScale: 0.5,
  /** Fondu d'apparition, une fois la lecture démarrée. */
  fadeMs: 800,
  /** Après une pause ou un chargement, YouTube affiche quelques secondes ses contrôles, son logo et le titre :
   *  la vidéo ne réapparaît qu'après ce délai de lecture continue (l'image d'attente reste visible entre-temps). */
  resumeShowDelayMs: 3500,
  /** Au tout premier démarrage, YouTube affiche aussi le nom de la chaîne et ses boutons : même principe, 4,5 s. */
  firstShowDelayMs: 4500,
  /** Conditions : écran d'au moins cette largeur, et non tactile. */
  minWidth: 768,
  /** Délai minimal depuis l'ouverture de la page avant de créer l'iframe (en plus de « chargée + inactive ») :
   *  le titre du hero s'affiche d'abord, sans concurrence des ~1 Mo de scripts YouTube. */
  minDelayMs: 3000,
  /** Secours : aucun message du lecteur dans ce délai → iframe retirée, image seule. */
  readyTimeoutMs: num(env.VITE_HERO_VIDEO_READY_TIMEOUT_MS, 6000),
  /** Secours : lecteur prêt mais lecture non démarrée dans ce délai → iframe retirée. */
  playTimeoutMs: num(env.VITE_HERO_VIDEO_PLAY_TIMEOUT_MS, 8000),
} as const;

/** Image d'attente (élément principal du hero, préchargée sur l'accueil ; voir index.html). */
export const HERO_POSTER = {
  src: '/hero/hero-film-t49-1280.webp',
  srcSet: '/hero/hero-film-t49-960.webp 960w, /hero/hero-film-t49-1280.webp 1280w, /hero/hero-film-t49-1920.webp 1920w',
  width: 1920,
  height: 1080,
  /** Téléphone (moins de 768 px) : recadrage portrait sur le cortège (ACC-07). */
  portraitSrcSet: '/hero/hero-film-t49-portrait-456.webp 456w, /hero/hero-film-t49-portrait-608.webp 608w',
  portraitWidth: 608,
  portraitHeight: 880,
};

/** Film WAHHF avec le son, ouvert à la demande depuis le hero (« Regarder le film avec le son (1 min) »). */
export const HERO_FILM = {
  id: 'e-zT1lNANC0',
  title: 'Film WAHHF Foundation (1 min 10)',
};

/** Bande démo du groupe IROKO (Cloudinary) : retirée de l'accueil le 16/11/2026 ; gardée ici pour /partenaires. */
export const IROKO_SHOWREEL_URL = 'https://res.cloudinary.com/dtntkknaq/video/upload/v1792318859/IROKO-Showreel-2026_1_njl3pg.mp4';

export const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com';

/** Adresse de l'iframe de fond (youtube-nocookie, lecture muette en boucle, sans contrôles). */
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

/** Adresse du film avec le son (lecture lancée par le visiteur, contrôles, sous-titres français si disponibles). */
export function heroFilmUrl() {
  const params = new URLSearchParams({ autoplay: '1', rel: '0', playsinline: '1', modestbranding: '1', hl: 'fr', cc_lang_pref: 'fr' });
  return `${YOUTUBE_ORIGIN}/embed/${HERO_FILM.id}?${params}`;
}
