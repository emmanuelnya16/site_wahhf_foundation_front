import { Link } from 'react-router-dom';
import Photo from '../../components/wahhf/Photo';
import { CardBody, CardLink, CardTitle } from '../../components/wahhf/Card';
import { TEXT_LINK_CLASS } from '../../components/wahhf/TextList';
import type { CatalogPhoto, PhotoAlbumId } from '../../data/photos';
import { albumLabel, photoCount, photoOrFallback, visibleAlbums } from '../../lib/photos';
import { useLocalize } from '../../lib/localize';
// Paquet « actualites » (textes de la page), enregistré par src/lib/news.ts
import '../../lib/news';

/**
 * Nos actions de terrain en images (Actualités, retouches du 19/11 : la page était vide, sans mise en page ni
 * mouvement) : les albums de la galerie, rien d'autre (aucune date ni aucun lieu que le catalogue ne donne pas).
 * - La journée du 25 avril 2026 en tête : trois photos en mosaïque (une grande, deux petites, toutes en 3:2), son nom
 *   en lien vers l'album et le nombre de photos.
 * - Les autres albums en cartes de collection (contrat §8 : la carte est réservée aux albums, actualités, pays) :
 *   couverture 4:3, nom, nombre de photos ; toute la carte mène à l'album.
 * - Couvertures : la photo prévue si elle est publiable, sinon une remplaçante sans mineur identifiable (production).
 * - Mouvement : les photos de la mosaïque se découvrent du bas vers le haut (clip-path, ordinateur, RevealBatch) ; les
 *   cartes apparaissent en groupe (fondu et montée) ; tout est en place en mouvement réduit. Pas de zoom au survol.
 */

const FEATURED: PhotoAlbumId = 'journee-2026-04-25';
/** Mosaïque de la journée : la salle comble (sinon l'intervenant au pupitre), l'hymne (sinon les t-shirts de dos), l'arrivée devant l'hôtel. */
const FEATURED_PHOTOS = [
  ['A27', 'A61'],
  ['A85', 'A16'],
  ['A07'],
] as const;
/** Couverture de chaque autre album : la prévue, puis ses remplaçantes. */
const COVERS: Partial<Record<PhotoAlbumId, readonly string[]>> = {
  'terrain-agricole': ['B17', 'B24'],
  nkongsamba: ['B51', 'B02'],
  'mont-et-lac': ['B35'],
  'randonnee-jeunesse': ['B77', 'B85'],
};

const pick = (ids: readonly string[]) => photoOrFallback(ids[0], ...ids.slice(1));
const albumHref = (id: PhotoAlbumId) => `/galerie?album=${id}`;

/** Cadre d'une photo de la mosaïque : rayon des photos, découvert du bas vers le haut sur ordinateur. */
function Tile({ photo, sizes, className }: { photo: CatalogPhoto; sizes: string; className?: string }) {
  return (
    <div data-reveal="clip" data-reveal-radius="1.25rem" className={`overflow-hidden rounded-card ${className ?? ''}`}>
      <Photo photo={photo} sizes={sizes} fit="cover" radius="none" />
    </div>
  );
}

export default function FieldAlbums() {
  // useLocalize : le composant se remet à jour au changement de langue (albumLabel et photoCount de src/lib/photos.ts
  // donnent le nom des albums et le nombre de photos dans la langue de l'interface)
  const { t } = useLocalize();
  const albums = visibleAlbums();
  const featured = albums.find(({ album }) => album.id === FEATURED);
  const featuredPhotos = FEATURED_PHOTOS.map(pick).filter((p): p is CatalogPhoto => !!p);
  const others = albums
    .filter(({ album }) => album.id !== FEATURED)
    .map((entry) => ({ ...entry, cover: COVERS[entry.album.id] ? pick(COVERS[entry.album.id]!) : entry.photos[0] }))
    .filter((entry) => !!entry.cover);

  return (
    <div className="space-y-14 lg:space-y-20">
      {featured && featuredPhotos.length === 3 && (
        <article aria-labelledby="album-a-la-une" className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          {/* Mosaïque 9:4 : la grande photo et les deux petites gardent toutes le ratio 3:2 */}
          <div className="grid aspect-[9/4] grid-cols-[2fr_1fr] grid-rows-2 gap-2 sm:gap-3 lg:col-span-8">
            <Tile photo={featuredPhotos[0]} className="row-span-2" sizes="(min-width: 1024px) 34rem, 64vw" />
            <Tile photo={featuredPhotos[1]} sizes="(min-width: 1024px) 17rem, 32vw" />
            <Tile photo={featuredPhotos[2]} sizes="(min-width: 1024px) 17rem, 32vw" />
          </div>
          <div data-reveal="" className="space-y-3 lg:col-span-4">
            <h3 id="album-a-la-une" className="text-section-title text-text">
              {albumLabel(featured.album)}
            </h3>
            <p className="text-body text-text-secondary">
              {photoCount(featured.photos.length)}
              {t('actualites.albums.inGallery')}
            </p>
            <Link to={albumHref(featured.album.id)} className={TEXT_LINK_CLASS}>
              {t('actualites.albums.seeAlbum')}
            </Link>
          </div>
        </article>
      )}

      {others.length > 0 && (
        <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">
          {others.map(({ album, photos, cover }) => (
            <li key={album.id} className="flex">
              <CardLink to={albumHref(album.id)} surface="section" className="w-full">
                {/* Couverture décorative : le nom de l'album suit */}
                <div className="aspect-[4/3] overflow-hidden">
                  <Photo photo={cover!} sizes="(min-width: 1024px) 18rem, 50vw" fit="cover" radius="none" decorative />
                </div>
                <CardBody className="p-4 sm:p-6">
                  <CardTitle as="h3">{albumLabel(album)}</CardTitle>
                  <p className="text-meta text-text-secondary">{photoCount(photos.length)}</p>
                </CardBody>
              </CardLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
