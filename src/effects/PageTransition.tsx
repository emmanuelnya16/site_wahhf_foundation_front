import { ReactNode, useEffect, useState } from 'react';
import { useNavigationType } from 'react-router-dom';
import { requestScrollRefresh } from '../lib/afterFirstDisplay';

/**
 * Clé de transition d'une route. Les URL servies par un même composant avec un paramètre différent
 * (niveau d'allemand, fiche pays, article) partagent une clé : pas de fondu, l'état de la page est conservé.
 */
export function routeKey(pathname: string): string {
  // Pages de niveau (/academie/a1…) : de vraies pages qui ouvrent sur le niveau (NIV-01), distinctes de l'Académie ;
  // passer d'un niveau à l'autre garde la même page (pas de fondu), qui se remonte sur le nouveau niveau.
  if (pathname.startsWith('/academie/')) return 'academie-niveau';
  if (pathname === '/mobilite-langues/academie') return 'academie';
  if (pathname.startsWith('/accompagnement/') || pathname === '/mobilite-langues/accompagnement') return 'accompagnement';
  if (pathname.startsWith('/actualites')) return 'actualites';
  return pathname;
}

let firstPageShown = false;
/** Une page a-t-elle déjà été affichée avant celle qui se monte ? (à lire pendant le rendu ; false au premier chargement) */
export const pageShownBefore = () => firstPageShown;

/**
 * Transition entre pages (contrat §10, ANIM-03, lot 7) : fondu d'entrée de 0,3 s, sans fondu de sortie ni attente.
 * La nouvelle page remplace l'ancienne dès qu'elle est prête ; pas de fondu au premier chargement (l'image du hero,
 * élément LCP, n'est jamais à opacité 0) ; instantané en mouvement réduit (.page-enter, src/index.css).
 * CSS seul, opacité seule : un transform sur ce conteneur casserait l'épinglage ScrollTrigger et les position: fixed.
 * Placé sous le Suspense des pages : le fondu joue sur la page elle-même, pas sur l'espace réservé du chargement.
 */
export default function PageTransition({ transitionKey, children }: { transitionKey: string; children: ReactNode }) {
  // Premier affichage : pas de fondu. Chaque page affichée ensuite : fondu d'entrée. Le composant est remonté à chaque
  // changement de page (filet ChunkErrorBoundary, App.tsx) : le premier affichage est donc retenu hors du composant.
  // Une redirection (<Navigate replace>, ex. /a-propos → /qui-sommes-nous) remplace l'adresse sans nouvelle page
  // pour le visiteur : pas de fondu, au premier chargement comme ensuite.
  const navigationType = useNavigationType();
  const [navigated] = useState(() => firstPageShown && navigationType !== 'REPLACE');
  useEffect(() => {
    firstPageShown = true;
  }, []);

  // Nouvelle page : les positions des effets liés au défilement sont recalculées (si GSAP est chargé)
  useEffect(() => {
    requestScrollRefresh();
  }, [transitionKey]);

  return (
    <div key={transitionKey} className={navigated ? 'page-enter' : undefined}>
      {children}
    </div>
  );
}
