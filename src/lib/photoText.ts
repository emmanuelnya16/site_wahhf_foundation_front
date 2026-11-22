import { registerBundle } from '../i18n';
import { localized } from './localize';
import fr from '../locales/photos/fr.json';

/**
 * Textes des photos (lot 7.10) : textes alternatifs du catalogue (src/data/photos.ts, généré) et de la galerie
 * (src/data/gallery.ts), titres des albums. Le français reste dans ces fichiers ; l'anglais et l'allemand sont des
 * surcouches (src/locales/photos/), téléchargées seulement quand la langue est choisie.
 */
registerBundle('photos', fr, {
  en: () => import('../locales/photos/en.json'),
  de: () => import('../locales/photos/de.json'),
});

/** Photos du catalogue (src/lib/photos.ts les inscrit au chargement du catalogue) */
const catalog = new WeakSet<object>();
export const markCatalog = (photos: readonly object[]) => photos.forEach((p) => catalog.add(p));

/**
 * Texte alternatif d'une photo du catalogue (repère A02, B04…) dans la langue de l'interface. Une copie dont la page a
 * remplacé le texte ({ ...photo, alt }) garde le texte donné par la page, qui se charge de le traduire.
 */
export function photoAlt(photo: { alt: string; id?: string }): string {
  return photo.id && catalog.has(photo) ? localized(photo, `photos.contenu.photos.${photo.id}`).alt : photo.alt;
}

/** Album du catalogue (titre, note) dans la langue de l'interface */
export const localizedAlbum = <T extends { id: string }>(album: T): T => localized(album, `photos.contenu.albums.${album.id}`);

/** Élément ou album de la galerie (src/data/gallery.ts : alt, légende, titre, lieu et date…) dans la langue de l'interface */
export const localizedGallery = <T extends { id: string }>(item: T): T => localized(item, `photos.contenu.galerie.${item.id}`);
