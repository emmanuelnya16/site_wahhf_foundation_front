import type { MouseEvent } from 'react';
import { followAnchorLink } from '../../lib/scroll';

/** Le temps d'arriver à une ancre : défilement fluide compris */
const DUREE = 2500;
let minuteur = 0;

/**
 * Rendu différé (content-visibility, accueil.css) : une section sous l'écran garde une hauteur d'attente tant qu'elle n'a
 * pas été dessinée. Pour aller à une ancre plus bas (#domaines), toutes les sections sont dessinées le temps du trajet :
 * la position calculée au départ est la vraie, et l'on arrive au bon endroit (lot 11.5).
 */
export function toutDessiner(duree = DUREE) {
  const racine = document.querySelector<HTMLElement>('.ac');
  if (!racine) return;
  racine.classList.add('ac-tout-dessine');
  window.clearTimeout(minuteur);
  minuteur = window.setTimeout(() => racine.classList.remove('ac-tout-dessine'), duree);
}

/** followAnchorLink (src/lib/scroll.ts), après avoir tout dessiné */
export function versAncre(event: MouseEvent<HTMLElement>, id: string) {
  toutDessiner();
  followAnchorLink(event, id);
}
