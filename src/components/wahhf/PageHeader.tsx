import { createContext, ReactNode, useContext } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import { cn } from '../../lib/utils';
import { albumPlaceDate, GALLERY_ALBUMS, galleryItem } from '../../data/gallery';
import LineReveal from '../../effects/LineReveal';
import type { CatalogPhoto } from '../../data/photos';
import Photo from './Photo';

/** Arrivée de l'en-tête (groupe 7.1, contrat §10) : activée page par page avec <PageHeader reveal>. */
const RevealContext = createContext(false);

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
 *
 * `reveal` (groupe 7.1 : Mobilité, Académie, niveaux, Candidater ; contrat §10) : l'en-tête arrive comme le hero de
 * l'accueil, en CSS (il joue avant GSAP) : le titre monte ligne par ligne derrière un masque (0,8 s, LineReveal),
 * puis l'introduction et les boutons en fondu court. `revealPhoto` : sur ordinateur, la photo se découvre du bas vers
 * le haut (clip-path, 0,9 s). Le texte reste lisible si l'animation ne joue pas ; tout est en place en mouvement réduit.
 */
export default function PageHeader({
  children,
  photoId,
  catalogPhoto,
  photoCaption,
  notice,
  photoRatio = '16/10',
  reveal = false,
  revealPhoto = false,
  className,
}: {
  children: ReactNode;
  photoId?: string;
  /**
   * Photo du catalogue (lot 7.6, src/data/photos.ts), à la place de photoId ; null ou absente : pas de photo (par
   * exemple quand la seule photo prévue attend encore l'accord parental, en production).
   */
  catalogPhoto?: CatalogPhoto | null;
  /** Légende de la photo du catalogue (photoCaption() de src/lib/photos.ts : l'album d'où elle vient). */
  photoCaption?: string;
  /** 'source' : la photo garde ses proportions, visible en entier (MOB-01) ; '16/10' par défaut (recadrée). */
  photoRatio?: '16/10' | 'source';
  /** Arrivée animée de l'en-tête (titre ligne par ligne, introduction en fondu). */
  reveal?: boolean;
  /** Photo découverte du bas vers le haut à l'arrivée (ordinateur ; Mobilité seulement, brief du groupe 7.1). */
  revealPhoto?: boolean;
  /**
   * Encadré à garder juste sous le titre (avertissement anti-arnaque) quand l'en-tête porte une photo : sur
   * téléphone, il passe avant la photo ; sur ordinateur, il s'étend sous les deux colonnes.
   */
  notice?: ReactNode;
  className?: string;
}) {
  const photo = !catalogPhoto && photoId ? galleryItem(photoId) : undefined;
  const hasPhoto = !!catalogPhoto || !!photo;
  const album = photo ? GALLERY_ALBUMS.find((a) => a.id === photo.album) : undefined;
  const placeDate = albumPlaceDate(album);
  return (
    <RevealContext.Provider value={reveal}>
    <header
      className={cn(
        'page-header bg-surface pt-[calc(var(--header-offset)+clamp(1.5rem,4vw,3rem))] pb-[clamp(2rem,4vw,3rem)]',
        className,
      )}
    >
      {/* Deux colonnes seulement avec une photo ; avec l'encadré seul, une colonne (le titre garde toute la largeur) */}
      <Container className={cn(hasPhoto ? 'grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-x-12' : notice && 'grid gap-8')}>
        <div className="space-y-5">{children}</div>
        {notice && <div className={cn(hasPhoto && 'lg:col-span-2 lg:row-start-2')}>{notice}</div>}
        {catalogPhoto && (
          <figure className="w-full max-w-[32rem] lg:col-start-2 lg:row-start-1 lg:justify-self-end">
            {/* Photo de l'en-tête : l'image LCP de la page (chargée en priorité), 512 px au plus */}
            <Photo
              photo={catalogPhoto}
              sizes="(min-width: 1024px) 32rem, calc(100vw - 2.5rem)"
              priority
              className={cn(photoRatio === 'source' ? undefined : 'aspect-[16/10] object-cover', revealPhoto && 'photo-rise')}
            />
            {photoCaption && <figcaption className="mt-2 text-meta text-text-secondary">{photoCaption}</figcaption>}
          </figure>
        )}
        {photo && photo.kind === 'photo' && (
          <figure className="w-full max-w-[32rem] lg:col-start-2 lg:row-start-1 lg:justify-self-end">
            <img
              src={photo.src}
              srcSet={photo.srcSet}
              sizes="(min-width: 1024px) 32rem, calc(100vw - 2.5rem)"
              alt={photo.alt}
              width={photo.w}
              height={photo.h}
              fetchPriority="high"
              className={cn(
                'w-full object-cover rounded-card bg-surface-section',
                photoRatio === 'source' ? 'h-auto' : 'aspect-[16/10]',
                revealPhoto && 'photo-rise',
              )}
              style={photo.focus && photoRatio !== 'source' ? { objectPosition: photo.focus } : undefined}
            />
            {/* Légende datée : celle de la galerie, puis l'événement, le lieu et la date de l'album (sans « A · B »,
                contrat §12) ; rien de l'album s'il est encore provisoire. Même format que la galerie, Nos actions et la
                visionneuse (albumPlaceDate : « Yaoundé, le 25 avril 2026 », date insécable ; revue du groupe 7.3) */}
            <figcaption className="mt-2 text-meta text-text-secondary">
              {photo.caption}
              {album && placeDate && (
                <>
                  {' '}
                  {album.title}, {placeDate}.
                </>
              )}
            </figcaption>
          </figure>
        )}
      </Container>
    </header>
    </RevealContext.Provider>
  );
}

/**
 * Fil d'Ariane (audit A11Y-11, groupe 7.1) : <nav> nommée et liste ordonnée, séparateurs « / » masqués aux lecteurs
 * d'écran, page courante en aria-current. Même apparence que PageMeta.
 */
export function PageBreadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Fil d’Ariane">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-text-secondary">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-x-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {item.to ? (
              <Link to={item.to} className="text-link underline underline-offset-4">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
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
  const reveal = useContext(RevealContext);
  const classes = cn('text-page-title text-text max-w-4xl', className);
  // Arrivée : lignes réelles mesurées puis révélées (0,8 s au lieu de 1 s pour le hero : .reveal-08)
  if (reveal && typeof children === 'string') return <LineReveal as="h1" text={children} className={cn(classes, 'reveal-08')} />;
  return <h1 className={classes}>{children}</h1>;
}

/** Introduction : texte courant, encre douce, 65 caractères au plus. */
export function PageIntro({ children, className }: { children: ReactNode; className?: string }) {
  const reveal = useContext(RevealContext);
  return (
    <p className={cn('text-body text-text-secondary max-w-[65ch]', reveal && 'hero-fade [--hero-fade-delay:0.45s]', className)}>
      {children}
    </p>
  );
}

/** Boutons de l'en-tête (primaire forêt, secondaires en contour : le fond est clair). */
export function PageActions({ children, className }: { children: ReactNode; className?: string }) {
  const reveal = useContext(RevealContext);
  return (
    <div className={cn('flex flex-wrap items-center gap-3 pt-2', reveal && 'hero-fade [--hero-fade-delay:0.55s]', className)}>
      {children}
    </div>
  );
}
