import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import PageHeader, { PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import SEO from '../components/wahhf/SEO';
import Section from '../components/wahhf/Section';
import SectionHeader from '../components/wahhf/SectionHeader';
import PhotoGrid from '../components/gallery/PhotoGrid';
import PhotoLightbox, { LIGHTBOX_SHARED_NAME } from '../components/gallery/PhotoLightbox';
import { DonateButton, SecondaryButton } from '../components/wahhf/Buttons';
import type { PhotoAlbumId } from '../data/photos';
import { albumLabel, photoCount, visibleAlbums } from '../lib/photos';
import { requestScrollRefresh } from '../lib/afterFirstDisplay';
import { cn } from '../lib/utils';

/**
 * Albums du catalogue (docs/photos-catalogue.md), dans son ordre ; en production, seules les photos dont l'accord est
 * confirmé, et un album vide disparaît (GAL-01, lot 7.6). Les anciens albums de la galerie (First Open Day & Boot Camp,
 * Rencontres de la communauté, Sur le terrain, dont 4 extraits vidéo) ne sont plus affichés ici : leurs données restent
 * dans src/data/gallery.ts (accueil, Candidater).
 */
const ALBUMS = visibleAlbums();
const ALBUM_IDS = new Set<string>(ALBUMS.map(({ album }) => album.id));

type ViewTransitionDocument = Document & { startViewTransition?: (update: () => void) => { finished: Promise<void> } };

/*
 * Galerie (groupe 7.3, adaptée au lot 7.6 : contrat validé, audit GAL-01 à GAL-08).
 * - En-tête du lot 5 révélé à l'arrivée comme le hero.
 * - Filtres par album en boutons (aria-pressed) de 44 px, sur plusieurs lignes au besoin ; l'adresse garde l'album
 *   (?album=…) : les liens de l'accordéon de l'accueil et d'Actualités tombent sur le bon album.
 * - Chaque album : son titre, ce qui reste à confirmer (lieu, date) quand le catalogue le dit, le nombre de photos.
 * - Vignettes en rangées justifiées, au vrai format (PhotoGrid) ; visionneuse en <dialog> (PhotoLightbox).
 * - Fin de page : « Faire un don » et « Candidater au programme » (GAL-02), sur sauge.
 * - Mouvement (contrat §10) : vignettes en apparitions groupées ; la visionneuse s'ouvre depuis la vignette cliquée
 *   (transition partagée, View Transitions API ; ouverture simple sans l'API et en mouvement réduit).
 */
export default function GalleryPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const requested = searchParams.get('album');
  const filter = requested && ALBUM_IDS.has(requested) ? (requested as PhotoAlbumId) : null;
  const shown = filter ? ALBUMS.filter(({ album }) => album.id === filter) : ALBUMS;
  const [view, setView] = useState<{ album: PhotoAlbumId; index: number } | null>(null);
  const [shared, setShared] = useState(false);
  const openerRef = useRef<HTMLElement | null>(null);

  // Album inconnu (ou vide en production) dans l'adresse : tous les albums, adresse nettoyée
  useEffect(() => {
    if (requested && !filter) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          next.delete('album');
          return next;
        },
        { replace: true }
      );
    }
  }, [requested, filter, setSearchParams]);

  const choose = (next: PhotoAlbumId | null) => {
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next) params.set('album', next);
        else params.delete('album');
        return params;
      },
      { replace: true }
    );
    // Les albums restants remontent : les apparitions recalculent leurs positions (si GSAP est chargé)
    requestAnimationFrame(requestScrollRefresh);
  };

  const open = (albumId: PhotoAlbumId) => async (index: number, button: HTMLButtonElement) => {
    openerRef.current = button;
    const doc = document as ViewTransitionDocument;
    if (!doc.startViewTransition || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setView({ album: albumId, index });
      return;
    }
    // La grande photo est demandée avant la transition (0,35 s au plus), sinon la visionneuse s'ouvrirait vide
    const photo = ALBUMS.find(({ album }) => album.id === albumId)?.photos[index];
    if (photo) {
      const img = new Image();
      img.sizes = '(min-width: 1024px) 1600px, 100vw';
      img.srcset = photo.sources.avif;
      await Promise.race([img.decode().catch(() => {}), new Promise((resolve) => setTimeout(resolve, 350))]);
    }
    const thumb = button.querySelector('img');
    if (thumb) thumb.style.viewTransitionName = LIGHTBOX_SHARED_NAME;
    const root = document.documentElement;
    root.classList.add('vt-galerie');
    const transition = doc.startViewTransition(() => {
      if (thumb) thumb.style.viewTransitionName = '';
      flushSync(() => {
        setShared(true);
        setView({ album: albumId, index });
      });
    });
    transition.finished.finally(() => {
      root.classList.remove('vt-galerie');
      setShared(false);
    });
  };

  const chip = (active: boolean) =>
    cn(
      'inline-flex min-h-11 items-center gap-2 px-4 rounded-pill border text-body text-text cursor-pointer transition-colors duration-(--dur-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
      active ? 'border-action [box-shadow:inset_0_0_0_1px_var(--action)] font-semibold' : 'border-border-input hover:border-action'
    );

  const options: { id: PhotoAlbumId | null; label: string }[] = [
    { id: null, label: 'Tous les albums' },
    ...ALBUMS.map(({ album }) => ({ id: album.id, label: albumLabel(album) })),
  ];
  const viewed = view ? ALBUMS.find(({ album }) => album.id === view.album) : undefined;

  return (
    <>
      <SEO
        title="Galerie — La fondation en images"
        description="Photos de WAHHF Foundation : la journée du 25 avril 2026 à l’Albatros Hotel, une visite de plantation, des sorties à Nkongsamba, au mont et au lac, et une randonnée avec les jeunes."
      />

      <PageHeader reveal>
        <PageTitle>La fondation en images</PageTitle>
        <PageIntro>
          Retour en photos sur nos actions : la journée du 25&nbsp;avril&nbsp;2026 à l’Albatros Hotel, une visite de
          plantation, des sorties à Nkongsamba, au mont et au lac, et une randonnée avec les jeunes.
        </PageIntro>
      </PageHeader>

      <Section>
        <div className="container-page space-y-14">
          <div role="group" aria-label="Filtrer par album" className="flex flex-wrap gap-2">
            {options.map((o) => {
              const active = filter === o.id;
              return (
                <button key={o.id ?? 'tout'} type="button" aria-pressed={active} onClick={() => choose(o.id)} className={chip(active)}>
                  {active && <Check aria-hidden="true" className="w-4 h-4 shrink-0 text-action" />}
                  {o.label}
                </button>
              );
            })}
          </div>

          {shown.map(({ album, photos }) => (
            // Clé = album : changer de filtre ne rejoue pas les apparitions
            <section key={album.id} id={album.id} aria-labelledby={`album-${album.id}`} className="space-y-6">
              <div className="max-w-[65ch] space-y-2">
                <h2 id={`album-${album.id}`} className="text-section-title text-text">
                  {albumLabel(album)}
                </h2>
                {album.note && <p className="text-meta text-text-secondary">{album.note}</p>}
                <p className="text-meta text-text-secondary">{photoCount(photos.length)}</p>
              </div>
              <PhotoGrid photos={photos} onOpen={open(album.id)} />
            </section>
          ))}
        </div>
      </Section>

      <PhotoLightbox
        photos={viewed?.photos ?? []}
        index={viewed && view ? view.index : null}
        onChange={(index) => setView((current) => (current ? { ...current, index } : current))}
        onClose={() => setView(null)}
        openerRef={openerRef}
        shared={shared}
      />

      {/* FIN DE PAGE : deux actions (GAL-02), sur sauge, sans carte nuit au-dessus du footer */}
      <Section tone="sauge">
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader
              title="Participer à la suite"
              subtitle="Un don soutient les actions de la fondation. Les jeunes peuvent candidater aux cours d’allemand /anglais et à l’orientation vers l’Europe."
            />
            <div className="flex flex-wrap items-center gap-3">
              <DonateButton size="lg" />
              <SecondaryButton to="/candidater" size="lg">
                Candidater au programme
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
