import { useState } from 'react';
import { MapPin } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import GalleryGrid from '../components/wahhf/GalleryGrid';
import { AlbumId, GALLERY_ALBUMS, GALLERY_ITEMS } from '../data/gallery';

type Filter = 'tout' | AlbumId;

/**
 * Page /galerie : photos et vidéos de WAHHF Foundation, rangées par album.
 * Puces de filtre (aria-pressed) ; chaque album a sa grille et sa visionneuse
 * (on parcourt les photos d'un même album, avec son titre, son lieu et sa date).
 */
export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('tout');
  const albums = GALLERY_ALBUMS.map((album) => ({ album, items: GALLERY_ITEMS.filter((it) => it.album === album.id) })).filter(
    ({ items }) => items.length > 0
  );
  const visible = filter === 'tout' ? albums : albums.filter(({ album }) => album.id === filter);

  const chip = (active: boolean) =>
    `px-4 py-2 rounded-pill text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-(--dur-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
      active
        ? 'bg-accent text-creme dark:text-v1-encre font-semibold'
        : 'bg-nuit/8 text-text hover:bg-nuit/15 dark:bg-creme/10 dark:hover:bg-creme/18'
    }`;

  return (
    <>
      <SEO
        title="Galerie — La fondation en images"
        description="Photos et vidéos de WAHHF Foundation : First Open Day & Boot Camp à Yaoundé, rencontres de la communauté et actions sur le terrain."
      />

      <section className="surface-green pt-32 pb-16 bg-nuit text-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h1 className="font-serif font-normal text-[clamp(2.1rem,4.5vw,3.8rem)] leading-tight">La fondation en images</h1>
          <p className="text-base sm:text-xl text-creme/85 max-w-3xl">
            Retour en photos et en vidéos sur nos actions : la première journée portes ouvertes et le Boot Camp de Yaoundé, nos rencontres
            et le terrain.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-14">
        <div role="group" aria-label="Filtrer par album" className="flex gap-2 overflow-x-auto sm:flex-wrap pb-1 -mx-1 px-1">
          <button type="button" aria-pressed={filter === 'tout'} onClick={() => setFilter('tout')} className={chip(filter === 'tout')}>
            Tout ({GALLERY_ITEMS.length})
          </button>
          {albums.map(({ album, items }) => (
            <button
              key={album.id}
              type="button"
              aria-pressed={filter === album.id}
              onClick={() => setFilter(album.id)}
              className={chip(filter === album.id)}
            >
              {album.title} ({items.length})
            </button>
          ))}
        </div>

        {visible.map(({ album, items }) => (
          // Clé = filtre : la grille réapparaît en douceur quand on change d'album
          <section key={`${filter}-${album.id}`} aria-labelledby={`album-${album.id}`} className="space-y-6">
            <div className="space-y-1">
              <h2 id={`album-${album.id}`} className="font-serif font-normal text-2xl sm:text-3xl text-text">
                {album.title}
              </h2>
              <p className="inline-flex items-center gap-1.5 text-sm text-v1-encre/70 dark:text-creme/70">
                <MapPin className="w-4 h-4 text-accent-or" aria-hidden="true" />
                {album.meta} · {items.length} {items.length > 1 ? 'éléments' : 'élément'}
              </p>
            </div>
            <GalleryGrid items={items} featureFirst={items.length >= 6} />
          </section>
        ))}
      </section>
    </>
  );
}
