import { useEffect, useState } from 'react';
import type { CatalogPhoto } from '../data/photos';
import { afterFirstDisplay } from './afterFirstDisplay';

type PhotosModule = typeof import('./photos');
let loaded: PhotosModule | null = null;
let loading: Promise<PhotosModule> | null = null;
/** Les données des photos (src/data/photos.ts) ne font pas partie du JavaScript initial : chargées après le premier affichage. */
const load = () => (loading ??= afterFirstDisplay().then(() => import('./photos')).then((m) => (loaded = m)));

/**
 * Photo du catalogue pour un composant du JavaScript initial de l'accueil (lot 7.6) : la photo prévue si elle est
 * publiable, sinon sa remplaçante. undefined pendant le chargement, null si aucune n'est publiable (en production,
 * tant que l'accord parental manque).
 */
export interface DeferredPhoto {
  photo: CatalogPhoto | null | undefined;
  /** Légende de la photo (l'album d'où elle vient), une fois chargée */
  caption?: string;
}

const resolve = (m: PhotosModule, id: string, fallbacks: string[]): DeferredPhoto => {
  const photo = m.photoOrFallback(id, ...fallbacks);
  return { photo, caption: photo ? m.photoCaption(photo) : undefined };
};

export function useCatalogPhoto(id: string, ...fallbacks: string[]): DeferredPhoto {
  const [state, setState] = useState<DeferredPhoto>(() => (loaded ? resolve(loaded, id, fallbacks) : { photo: undefined }));
  const key = [id, ...fallbacks].join(',');
  useEffect(() => {
    if (loaded) return;
    let active = true;
    load().then((m) => {
      if (active) setState(resolve(m, id, fallbacks));
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return state;
}
