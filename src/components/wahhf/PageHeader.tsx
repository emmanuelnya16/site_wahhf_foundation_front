import { ReactNode } from 'react';
import Container from './Container';
import { cn } from '../../lib/utils';
import { GALLERY_ALBUMS, galleryItem } from '../../data/gallery';

/**
 * En-tête de page (contrat §8, 18 pages) : le titre de la page sur le fond de la page (brume, humus en sombre),
 * sans bande nuit ni photo en fond, aligné à gauche dans le container.
 *
 *   <PageHeader>
 *     <PageMeta>fil d'Ariane, rubrique ou date</PageMeta>
 *     <PageTitle>…</PageTitle>
 *     <PageIntro>…</PageIntro>
 *     <PageActions>boutons</PageActions>
 *   </PageHeader>
 *
 * Photo facultative (`photoId`, une photo réelle de la galerie) : cadrée en 16/10 avec le rayon des cartes, sans voile,
 * à côté du titre sur ordinateur et dessous sur téléphone, jamais plus large que la moitié de sa taille réelle
 * (512 px pour des sources d'environ 1 000 px). Légende : celle de la galerie, avec le lieu et la date de l'album.
 */
export default function PageHeader({
  children,
  photoId,
  className,
}: {
  children: ReactNode;
  photoId?: string;
  className?: string;
}) {
  const photo = photoId ? galleryItem(photoId) : undefined;
  const album = photo ? GALLERY_ALBUMS.find((a) => a.id === photo.album) : undefined;
  return (
    <header
      className={cn(
        'bg-surface pt-[calc(var(--header-offset)+clamp(1.5rem,4vw,3rem))] pb-[clamp(2rem,4vw,3rem)]',
        className,
      )}
    >
      <Container className={cn(photo && 'grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12')}>
        <div className="space-y-5">{children}</div>
        {photo && photo.kind === 'photo' && (
          <figure className="w-full max-w-[32rem] lg:justify-self-end">
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(min-width: 1024px) 32rem, calc(100vw - 2.5rem)"
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              fetchPriority="high"
              className="w-full aspect-[16/10] object-cover rounded-card bg-surface-section"
              style={photo.focus ? { objectPosition: photo.focus } : undefined}
            />
            <figcaption className="mt-2 text-meta text-text-secondary">
              {photo.caption}
              {album && <> {album.meta}</>}
            </figcaption>
          </figure>
        )}
      </Container>
    </header>
  );
}

/** Ligne de méta au-dessus du titre : fil d'Ariane, rubrique, date. Les liens y prennent la couleur des liens. */
export function PageMeta({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-text-secondary [&_a]:text-link [&_a]:underline [&_a]:underline-offset-4',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Le H1 de la page : échelle page-title (600, interligne 1,1, approche -0,01 em). */
export function PageTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h1 className={cn('text-page-title text-text max-w-4xl', className)}>{children}</h1>;
}

/** Introduction : texte courant, encre douce, 65 caractères au plus. */
export function PageIntro({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('text-body text-text-secondary max-w-[65ch]', className)}>{children}</p>;
}

/** Boutons de l'en-tête (primaire forêt, secondaires en contour : le fond est clair). */
export function PageActions({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-wrap items-center gap-3 pt-2', className)}>{children}</div>;
}
