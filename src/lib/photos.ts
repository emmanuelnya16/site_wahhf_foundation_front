import { PHOTOS, PHOTO_ALBUMS, type CatalogPhoto, type PhotoAlbum } from '../data/photos';

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
 */
export function photoOrFallback(id: string, ...fallbacks: string[]): CatalogPhoto | null {
  for (const candidate of [id, ...fallbacks]) {
    const photo = photoById(candidate);
    if (isPublishable(photo)) return photo;
  }
  return null;
}

const NB = '\u00a0';

/** Album d'une photo. */
export const albumOf = (photo: CatalogPhoto): PhotoAlbum => PHOTO_ALBUMS.find((a) => a.id === photo.album)!;

/**
 * Légende d'une photo placée hors de la galerie : l'album d'où elle vient, tel que le catalogue le nomme
 * (« Journée du 25 avril 2026, Albatros Hotel. ») ; jamais de lieu ni de date que le catalogue ne donne pas.
 */
export function photoCaption(photo: CatalogPhoto): string {
  return `${albumLabel(albumOf(photo))}.`;
}

/** Nom d'un album pour le texte courant : « Journée du 25 avril 2026, Albatros Hotel » (date insécable, T-19). */
export function albumLabel(album: PhotoAlbum): string {
  return album.title.replace(/\s+—\s+/, ', ').replace(/(\d+) (\p{L}+) (\d{4})/u, `$1${NB}$2${NB}$3`);
}

/** « 13 photos », « 1 photo » (nombre et mot insécables). */
export const photoCount = (n: number) => `${n}${NB}photo${n > 1 ? 's' : ''}`;

/** Albums qui ont au moins une photo affichable, dans l'ordre du catalogue. */
export function visibleAlbums(): { album: PhotoAlbum; photos: CatalogPhoto[] }[] {
  const photos = visiblePhotos();
  return PHOTO_ALBUMS.map((album) => ({ album, photos: photos.filter((p) => p.album === album.id) })).filter((a) => a.photos.length > 0);
}
