import type { CSSProperties } from 'react';
import type { CatalogPhoto } from '../../data/photos';
import { cn } from '../../lib/utils';

/** Rayons du contrat (§9) : 20 px pour une photo, 12 px pour une vignette ou une petite image, aucun dans un cadre déjà arrondi. */
const RADIUS = { card: 'rounded-card', inner: 'rounded-inner', none: '' } as const;

type PhotoProps = {
  photo: CatalogPhoto;
  /** Largeur affichée, pour que le navigateur choisisse la bonne taille (obligatoire : sans lui, il prendrait 100vw). */
  sizes: string;
  /**
   * Image LCP de la page (une seule au plus) : chargée tout de suite, en priorité haute. Toutes les autres attendent
   * d'approcher de l'écran (loading="lazy", decoding="async").
   */
  priority?: boolean;
  /**
   * 'intrinsic' (par défaut) : l'image garde son ratio réel, en largeur 100 % ; 'cover' : elle remplit un cadre de
   * taille fixée par le parent, recadrée autour du centre d'intérêt du catalogue (object-position).
   */
  fit?: 'intrinsic' | 'cover';
  radius?: keyof typeof RADIUS;
  /** Image purement décorative (le texte voisin dit déjà tout) : alt="" et ignorée des lecteurs d'écran. */
  decorative?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Attributs data-* posés sur l'image (ex. data-photo-reveal-media pour PhotoReveal, data-expand-media) */
  imgAttributes?: Record<`data-${string}`, string>;
  /** Échec du chargement (visionneuse : message à la place de la photo) */
  onError?: () => void;
};

/**
 * Photo du catalogue (lot 7.6, src/data/photos.ts) : AVIF, puis WebP, puis JPEG de 800 px ; largeur et hauteur réelles
 * (aucun décalage de mise en page) ; la couleur dominante de la photo sert de fond pendant le chargement ; le texte
 * alternatif vient du catalogue.
 */
export default function Photo({ photo, sizes, priority = false, fit = 'intrinsic', radius = 'card', decorative = false, className, style, imgAttributes, onError }: PhotoProps) {
  return (
    // <picture> en bloc (et non display: contents) : dans une grille, ses <source> occuperaient sinon des cases
    <picture className={fit === 'cover' ? 'block h-full w-full' : 'block'}>
      <source type="image/avif" srcSet={photo.sources.avif} sizes={sizes} />
      <source type="image/webp" srcSet={photo.sources.webp} sizes={sizes} />
      <img
        {...imgAttributes}
        src={photo.sources.jpeg}
        width={photo.width}
        height={photo.height}
        alt={decorative ? '' : photo.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'auto' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={cn(fit === 'cover' ? 'h-full w-full object-cover' : 'h-auto w-full', RADIUS[radius], className)}
        style={{ objectPosition: photo.focus, backgroundColor: photo.dominantColor, ...style }}
        onError={onError}
      />
    </picture>
  );
}
