import { useSyncExternalStore } from 'react';
import type { FeatureBundle } from 'framer-motion';
import { afterFirstDisplay } from './afterFirstDisplay';

/**
 * Moteur d'animation de Motion chargé après le premier affichage (décision de la cliente du 17/11 : LCP mobile).
 * Tant qu'il n'est pas là, et pour toute la visite s'il ne se charge jamais, les composants qui en dépendent (menu
 * mobile de l'en-tête, fenêtre du film du hero) passent par leur repli CSS : ils s'ouvrent et se ferment normalement,
 * avec une animation CSS à l'ouverture et une fermeture immédiate. useMotionEngineReady() dit quand il est prêt.
 */
let ready = false;
const listeners = new Set<() => void>();

export function loadMotionFeatures(): Promise<FeatureBundle> {
  return afterFirstDisplay()
    .then(() => import('./motionFeatures'))
    .then((mod) => {
      ready = true;
      listeners.forEach((listener) => listener());
      return mod.default;
    })
    .catch(
      // Échec de téléchargement : promesse jamais tenue (pas d'erreur non traitée) ; le repli CSS reste en place
      () => new Promise<FeatureBundle>(() => {})
    );
}

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/** true une fois le moteur de Motion chargé ; false avant, et pour toujours s'il ne se charge pas. */
export function useMotionEngineReady(): boolean {
  return useSyncExternalStore(subscribe, () => ready, () => false);
}
