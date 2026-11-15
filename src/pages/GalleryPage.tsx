import { useState } from 'react';
import { Camera, MapPin } from 'lucide-react';
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
    `px-4 py-2 rounded-full text-sm whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3D2E] dark:focus-visible:outline-[#E8A317] ${
      active
        ? 'bg-[#0F3D2E] text-[#F5F1E8] dark:bg-[#E8A317] dark:text-[#1B1B18] font-semibold'
        : 'bg-[#0F3D2E]/8 text-[#1B1B18] hover:bg-[#0F3D2E]/15 dark:bg-[#F5F1E8]/10 dark:text-[#F5F1E8] dark:hover:bg-[#F5F1E8]/18'
    }`;

  return (
    <>
      <SEO
        title="Galerie — La fondation en images"
        description="Photos et vidéos de WAHHF Foundation : First Open Day & Boot Camp à Yaoundé, rencontres de la communauté et actions sur le terrain."
      />

      <section className="pt-32 pb-16 bg-[#0F3D2E] text-[#F5F1E8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A317]">
            <Camera className="w-4 h-4" aria-hidden="true" />
            Galerie
          </span>
          <h1 className="font-serif font-normal text-[clamp(2.1rem,4.5vw,3.8rem)] leading-tight">La fondation en images</h1>
          <p className="text-base sm:text-xl text-[#F5F1E8]/85 max-w-3xl">
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
              <h2 id={`album-${album.id}`} className="font-serif font-normal text-2xl sm:text-3xl text-[#1B1B18] dark:text-[#F5F1E8]">
                {album.title}
              </h2>
              <p className="inline-flex items-center gap-1.5 text-sm text-[#1B1B18]/70 dark:text-[#F5F1E8]/70">
                <MapPin className="w-4 h-4 text-gold-text dark:text-[#E8A317]" aria-hidden="true" />
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
