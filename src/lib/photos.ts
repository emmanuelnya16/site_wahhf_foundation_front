import { PHOTOS, PHOTO_ALBUMS, PHOTO_FALLBACKS, type CatalogPhoto, type PhotoAlbum } from '../data/photos';
import i18n from '../i18n';
import { localizedAlbum, markCatalog } from './photoText';

// Lot 7.10 : les photos du catalogue reçoivent la traduction de leur texte alternatif (Photo, visionneuse)
markCatalog(PHOTOS);

/**
 * Consentement (GAL-01, lot 7.6) : une photo marquée « mineurs : oui » ou « ? » au catalogue est 'pending' tant que la
 * fondation n'a pas confirmé l'accord écrit des parents (docs/contenus-a-fournir.md). En développement, tout s'affiche
 * pour travailler la mise en page ; dans le build de production, seules les photos 'ok'.
 */
export const isPublishable = (photo: CatalogPhoto) => !import.meta.env.PROD || photo.consent === 'ok';

/** Toutes les photos affichables ici, dans l'ordre du catalogue. */
export function visiblePhotos(): CatalogPhoto[] {
  return PHOTOS.filter(isPublishable);
}

/** Une photo du catalogue par son repère (A27, B04…), qu'elle soit publiable ou non. */
export function photoById(id: string): CatalogPhoto {
  const photo = PHOTOS.find((p) => p.id === id);
  if (!photo) throw new Error(`Photo inconnue au catalogue : ${id}`);
  return photo;
}

/**
 * La photo prévue si elle est publiable, sinon sa remplaçante (adultes ou personnes de dos), sinon rien.
 * Exemple : photoOrFallback('A27', 'A30') dans le build de production donne A30 tant que A27 attend l'accord.
 * Si aucune des photos demandées n'est publiable, celles de la table « Remplaçantes » du catalogue prennent le relais.
 */
export function photoOrFallback(id: string, ...fallbacks: string[]): CatalogPhoto | null {
  const asked = [id, ...fallbacks];
  for (const candidate of [...asked, ...asked.flatMap((other) => PHOTO_FALLBACKS[other] ?? [])]) {
    const photo = photoById(candidate);
    if (isPublishable(photo)) return photo;
  }
  return null;
}

const NB = '\u00a0';

/** Album d'une photo. */
export const albumOf = (photo: CatalogPhoto): PhotoAlbum => PHOTO_ALBUMS.find((a) => a.id === photo.album)!;

/** Une date dans un titre d'album : « 25 avril 2026 », « 25 April 2026 », « 25. April 2026 ». */
const DATE = /\d{1,2}\.?[\s\u00a0]+\p{L}+[\s\u00a0]+\d{4}/u;

/**
 * Légende d'une photo placée hors de la galerie : l'album d'où elle vient, tel que le catalogue le nomme ; jamais de
 * lieu ni de date que le catalogue ne donne pas. Lot 12 (demande de la fondation) : plus aucune date sous une photo.
 * Un album « événement daté — lieu » donne le lieu seul (« Albatros Hotel. ») ; un album sans lieu, daté, pas de
 * légende (chaîne vide). Le nom complet de l'album (albumLabel) reste dans les titres et les filtres de la galerie.
 */
export function photoCaption(photo: CatalogPhoto): string {
  const album = albumOf(photo);
  const [evenement, lieu] = localizedAlbum(album).title.split(/\s+—\s+/);
  if (DATE.test(evenement)) return lieu ? `${lieu}.` : '';
  return `${albumLabel(album)}.`;
}

/** Nom d'un album pour le texte courant : « Journée du 25 avril 2026, Albatros Hotel » (date insécable, T-19). */
export function albumLabel(album: PhotoAlbum): string {
  // Lot 7.10 : titre dans la langue de l'interface ; date insécable en français, en anglais (« 25 April 2026 ») et en
  // allemand (« 25. April 2026 »)
  return localizedAlbum(album).title.replace(/\s+—\s+/, ', ').replace(/(\d+\.?) (\p{L}+) (\d{4})/u, `$1${NB}$2${NB}$3`);
}

/** « 13 photos », « 1 photo » (nombre et mot insécables). */
export const photoCount = (n: number) => i18n.t('ui.photos.count', { count: n });

/** Albums qui ont au moins une photo affichable, dans l'ordre du catalogue. */
export function visibleAlbums(): { album: PhotoAlbum; photos: CatalogPhoto[] }[] {
  const photos = visiblePhotos();
  return PHOTO_ALBUMS.map((album) => ({ album, photos: photos.filter((p) => p.album === album.id) })).filter((a) => a.photos.length > 0);
}
