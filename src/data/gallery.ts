// Galerie photo et vidéo de WAHHF Foundation.
// Fichiers : src/assets/gallery (générés par scripts/prepare_gallery.py depuis E:/site_wahhf/Wahhf).
// Dimensions : src/data/galleryManifest.json (écrit par le même script), pour réserver le ratio.
//
// TODO (équipe WAHHF) : lieux et dates à confirmer pour les albums « communauté » et « terrain » ;
// autorisations de diffusion (droit à l'image, autorisations parentales pour les mineurs) à vérifier
// avant la mise en ligne.
import manifest from './galleryManifest.json';
import i18n from '../i18n';
import { localizedGallery } from '../lib/photoText';

const files = import.meta.glob<string>('../assets/gallery/*.{webp,mp4}', {
  eager: true,
  query: '?url',
  import: 'default',
});
const url = (name: string) => files[`../assets/gallery/${name}`];

type ManifestEntry = { w: number; h: number; duration?: number };
const dims = manifest as Record<string, ManifestEntry>;

export type AlbumId = 'open-day' | 'communaute' | 'terrain';

export interface GalleryAlbum {
  id: AlbumId;
  title: string;
  /** Lieu et date affichés sous le titre (« lieu · date ») ; marqués TODO tant qu'ils ne sont pas confirmés */
  meta: string;
  /** Quelques phrases sur l'album (page Galerie, GAL-02), seulement avec des faits établis */
  story?: string;
}

interface GalleryBase {
  id: string;
  album: AlbumId;
  /** Texte alternatif : ce que montre l'image */
  alt: string;
  /** Légende affichée dans la visionneuse */
  caption: string;
  w: number;
  h: number;
  /** Cadrage de la vignette (object-position) */
  focus?: string;
}

export interface GalleryPhoto extends GalleryBase {
  kind: 'photo';
  /** Plus grande version (≈ 1 000 px) */
  src: string;
  /** Plus petite version (480 px) : image d'attente de la visionneuse pendant le chargement (GAL-07) */
  thumb: string;
  /** Vignettes et visionneuse : 480 / 800 / pleine taille */
  srcSet: string;
}

export interface GalleryVideo extends GalleryBase {
  kind: 'video';
  src: string;
  poster: string;
  duration: number;
}

export type GalleryItem = GalleryPhoto | GalleryVideo;

export const GALLERY_ALBUMS: GalleryAlbum[] = [
  {
    id: 'open-day',
    title: 'First Open Day & Boot Camp',
    meta: 'Hôtel Albatros Premium, Yaoundé · 25 avril 2026',
    // Groupe 7.3 (GAL-02) : uniquement ce que montrent les photos et leurs légendes ; le nombre de participants et ce
    // qu'a produit le Boot Camp sont demandés à la fondation (docs/contenus-a-fournir.md)
    story:
      'La première journée portes ouvertes de la fondation, avec les jeunes du Boot Camp et leurs encadrants : une marche dans les rues de Yaoundé, un rassemblement au centre-ville, des prises de parole sur place et en visioconférence, un accompagnement sur ordinateur et des chants sur scène.',
  },
  { id: 'communaute', title: 'Rencontres de la communauté', meta: 'Lieu et date à confirmer (TODO)' },
  { id: 'terrain', title: 'Sur le terrain', meta: 'Lieux, dates et projets à confirmer (TODO)' },
];

function photo(id: string, album: AlbumId, alt: string, caption: string, focus?: string): GalleryPhoto {
  const { w, h } = dims[id];
  const sizes = [480, 800].filter((s) => s < w).map((s) => `${url(`${id}-${s}.webp`)} ${s}w`);
  return {
    kind: 'photo',
    id,
    album,
    alt,
    caption,
    focus,
    w,
    h,
    src: url(`${id}-full.webp`),
    thumb: url(`${id}-480.webp`) ?? url(`${id}-full.webp`),
    srcSet: [...sizes, `${url(`${id}-full.webp`)} ${w}w`].join(', '),
  };
}

function video(id: string, album: AlbumId, alt: string, caption: string, focus?: string): GalleryVideo | null {
  const entry = dims[id];
  const src = url(`${id}.mp4`);
  if (!entry || !src) return null; // extrait non généré (lancer prepare_gallery.py --videos)
  return {
    kind: 'video',
    id,
    album,
    alt,
    caption,
    focus,
    w: entry.w,
    h: entry.h,
    duration: entry.duration ?? 0,
    src,
    poster: url(`${id}-poster.webp`),
  };
}

const ITEMS: (GalleryItem | null)[] = [
  // --- First Open Day & Boot Camp, Yaoundé ---
  photo('open-day-jeunes', 'open-day', 'Des jeunes en t-shirts WAHHF rient et lèvent les bras autour de deux encadrants.', 'Les jeunes du Boot Camp et leurs encadrants.'),
  photo('open-day-marche', 'open-day', 'Le cortège de WAHHF marche dans une rue de Yaoundé, entre les taxis jaunes.', 'La marche dans les rues de Yaoundé.'),
  photo('open-day-marche-slogan', 'open-day', 'Vus de dos, des participants marchent en t-shirts portant le slogan « Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse ».', '« Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse » : le slogan porté dans la rue.'),
  photo('open-day-rassemblement', 'open-day', 'Des participants en gilets orange et t-shirts blancs rassemblés sur une pelouse au centre de Yaoundé.', 'Rassemblement des participants au centre de Yaoundé.'),
  photo('open-day-interview', 'open-day', 'Un responsable de WAHHF, en casquette blanche, répond à une interview télévisée en plein air.', 'Interview accordée à la presse.', '40% 40%'),
  photo('open-day-accueil', 'open-day', 'Des participants en gilets orange dans le hall de l’hôtel.', 'Dans le hall de l’Hôtel Albatros Premium.'),
  photo('open-day-visioconference', 'open-day', 'Dans une salle de conférence, le public suit un intervenant projeté en visioconférence, à côté d’un kakémono WAHHF.', 'Intervention en visioconférence.'),
  photo('open-day-prise-de-parole', 'open-day', 'Un intervenant en veste bleue parle au micro devant le kakémono WAHHF Foundation.', 'Prise de parole devant les participants.', '50% 25%'),
  photo('open-day-accompagnement', 'open-day', 'Un encadrant guide une jeune participante sur un ordinateur portable.', 'Accompagnement d’une participante sur ordinateur.', '60% 50%'),
  photo('open-day-chorale', 'open-day', 'Des jeunes en t-shirts WAHHF chantent sur scène.', 'Les jeunes chantent sur scène.'),
  video('video-chorale', 'open-day', 'Extrait vidéo : des jeunes en t-shirts WAHHF chantent sur scène.', 'La chorale des jeunes (extrait vidéo, 18 s).'),
  photo('open-day-trophee', 'open-day', 'Trois responsables posent devant les kakémonos WAHHF ; une femme tient un trophée en verre.', 'Photo souvenir devant les kakémonos WAHHF.', '50% 35%'),
  photo('open-day-groupe', 'open-day', 'Photo de groupe des jeunes du Boot Camp en t-shirts WAHHF devant les kakémonos de la fondation.', 'Photo de groupe des participants du Boot Camp.'),
  photo('open-day-slogan', 'open-day', 'Dos d’un polo WAHHF : « Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse », à côté de caméramans.', 'Le slogan de la fondation au dos des polos.', '60% 60%'),
  // --- Rencontres de la communauté ---
  photo('communaute-masque', 'communaute', 'Un membre de WAHHF en polo blanc salue un danseur masqué en costume de raphia, sur une pelouse.', 'Rencontre avec un danseur masqué traditionnel.', '50% 30%'),
  photo('communaute-rencontre', 'communaute', 'Trois hommes, dont un membre de WAHHF en polo blanc, posent lors d’un pique-nique de la communauté dans un parc.', 'Pique-nique de la communauté.', '50% 60%'),
  // --- Sur le terrain ---
  video('video-car', 'terrain', 'Extrait vidéo : des jeunes en gilets WAHHF voyagent en car sur une piste de terre.', 'En route : les jeunes en car (extrait vidéo, sans son).'),
  video('video-pepiniere', 'terrain', 'Extrait vidéo : une pépinière de jeunes palmiers, puis un camion chargé de plants.', 'Pépinière de jeunes palmiers (extrait vidéo, sans son).'),
  video('video-bananeraie', 'terrain', 'Extrait vidéo : des régimes de bananes dans une plantation.', 'Régimes de bananes dans une plantation (extrait vidéo, sans son).'),
];

/**
 * Règle des mineurs (25 novembre 2026, GAL-01) : jeunes reconnaissables, accord écrit des parents attendu. En production,
 * ces photos et ces vidéos ne s'affichent pas ; la remplaçante, si elle existe, prend leur place (accueil, Candidater).
 * L'accord reçu : retirer la ligne.
 */
const EN_ATTENTE: Record<string, string | null> = {
  'open-day-jeunes': 'open-day-trophee',
  'open-day-groupe': 'open-day-rassemblement',
  'open-day-chorale': 'open-day-marche-slogan',
  'open-day-accompagnement': 'open-day-trophee',
  'video-chorale': null,
  'video-car': null,
};
const publiable = (id: string) => !import.meta.env.PROD || !(id in EN_ATTENTE);

export const GALLERY_ITEMS: GalleryItem[] = ITEMS.filter((item): item is GalleryItem => item !== null && publiable(item.id));

/** Sélection de l'accueil (« En images ») : la première photo est mise en avant. */
export const HOME_GALLERY_IDS = ['open-day-jeunes', 'open-day-marche', 'open-day-groupe', 'open-day-chorale', 'open-day-interview'];

export const galleryItem = (id: string) => {
  const shown = publiable(id) ? id : EN_ATTENTE[id];
  return GALLERY_ITEMS.find((item) => item.id === shown);
};

/** Photo de la galerie réutilisée ailleurs (cartes de domaines…) : URL principale + srcset. */
export function galleryPhoto(id: string): { src: string; srcSet: string } {
  const item = galleryItem(id);
  if (!item || item.kind !== 'photo') throw new Error(`Photo de galerie inconnue : ${id}`);
  return { src: item.src, srcSet: item.srcSet };
}

/** Lieu et date d'un album, sans « A · B » (contrat §12) ; null tant qu'ils ne sont pas confirmés (TODO). */
export function albumPlaceDate(album: GalleryAlbum | undefined): string | null {
  if (!album || /TODO/.test(album.meta)) return null;
  // Lot 7.10 : lieu et date dans la langue de l'interface (« Yaoundé, le 25 avril 2026 », « Yaoundé, 25. April 2026 »)
  const [place, date] = localizedGallery(album).meta.split(' · ');
  // La date ne se coupe pas en fin de ligne (« 25 avril 2026 » reste d'un bloc)
  return date ? i18n.t('ui.gallery.placeDate', { place, date: date.replace(/ /g, ' ') }) : place;
}

/** « 13 photos et 1 vidéo » (GAL-08) : les mots du visiteur, pas « 14 éléments ». */
export function countLabel(items: GalleryItem[]): string {
  const photos = items.filter((it) => it.kind === 'photo').length;
  const videos = items.length - photos;
  const parts: string[] = [];
  if (photos) parts.push(i18n.t('ui.photos.count', { count: photos }));
  if (videos) parts.push(i18n.t('ui.gallery.videoCount', { count: videos }));
  return parts.join(i18n.t('ui.gallery.and'));
}

export const formatDuration = (s: number) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
