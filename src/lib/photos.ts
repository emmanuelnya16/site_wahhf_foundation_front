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

/** Albums qui ont au moins une photo affichable, dans l'ordre du catalogue. */
export function visibleAlbums(): { album: PhotoAlbum; photos: CatalogPhoto[] }[] {
  const photos = visiblePhotos();
  return PHOTO_ALBUMS.map((album) => ({ album, photos: photos.filter((p) => p.album === album.id) })).filter((a) => a.photos.length > 0);
}
