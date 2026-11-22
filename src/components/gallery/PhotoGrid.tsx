import type { CSSProperties } from 'react';
import type { CatalogPhoto } from '../../data/photos';
import { useTranslation } from 'react-i18next';
import Photo from '../wahhf/Photo';
import { photoAlt } from '../../lib/photoText';

/**
 * Vignettes d'un album (lot 7.6) en rangées justifiées : chaque photo garde son vrai format (aucun recadrage, les
 * verticales restent entières) ; dans une rangée, toutes ont la même hauteur et la rangée remplit la largeur ; seule la
 * dernière rangée garde la hauteur de base au lieu de s'étirer. Vignettes de 480 ou 800 px, chargées en approchant de
 * l'écran ; apparition groupée (data-reveal).
 */
export default function PhotoGrid({
  photos,
  onOpen,
}: {
  photos: CatalogPhoto[];
  onOpen: (index: number, button: HTMLButtonElement) => void;
}) {
  const { t } = useTranslation();
  return (
    <ul className="photo-rows">
      {photos.map((photo, index) => {
        const ratio = photo.width / photo.height;
        return (
          <li key={photo.id} data-reveal="" style={{ '--r': ratio.toFixed(4) } as CSSProperties}>
            <button
              type="button"
              aria-label={t('ui.photos.enlarge', { alt: photoAlt(photo) })}
              onClick={(event) => onOpen(index, event.currentTarget)}
              className="block h-full w-full cursor-pointer rounded-inner focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <Photo photo={photo} sizes="(min-width: 1024px) 24rem, 50vw" radius="inner" className="photo-rows-img" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
