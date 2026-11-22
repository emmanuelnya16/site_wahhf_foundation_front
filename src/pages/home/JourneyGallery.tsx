import ExpandingGallery from '../../components/gallery/ExpandingGallery';
import type { GalleryPanelData } from '../../components/gallery/GalleryPanel';
import { JOURNEY_PANELS } from '../../data/journey';
import { photoOrFallback } from '../../lib/photos';
import { useLocalize } from '../../lib/localize';

/**
 * Partie chargée à la demande de la section « Apprendre, cultiver, grandir » (lot 7.6) : les données des photos
 * (src/data/photos.ts) et l'accordéon restent hors du JavaScript initial de l'accueil.
 * Chaque panneau prend sa photo si elle est publiable, sinon sa remplaçante (photoOrFallback).
 */
export default function JourneyGallery() {
  const { t, localizedList } = useLocalize();
  const panels = localizedList(JOURNEY_PANELS, 'contenu.parcours.panneaux', (p) => p.id).flatMap((panel): GalleryPanelData[] => {
    const photo = photoOrFallback(panel.photoId, panel.fallbackId);
    if (!photo) return [];
    return [
      {
        id: panel.id,
        title: panel.title,
        meta: panel.meta,
        description: panel.description,
        photo,
        link: { to: `/galerie?album=${panel.album}`, label: t('home.journey.albumLink') },
      },
    ];
  });
  // Panneau ouvert : ~60 % du container (72 rem) sur ordinateur ; toute la largeur sur téléphone
  return <ExpandingGallery panels={panels} sizes="(min-width: 1024px) and (pointer: fine) min(60vw, 45rem), 100vw" />;
}
