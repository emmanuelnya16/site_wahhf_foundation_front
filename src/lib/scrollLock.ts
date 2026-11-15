import { getLenis } from './scroll';

/**
 * Fige la page sous une fenêtre (menu, vidéo, carte, recherche).
 * Compteur : plusieurs fenêtres peuvent être ouvertes l'une sur l'autre.
 * Lenis est arrêté (il bloque alors la molette hors des zones data-lenis-prevent),
 * et le défilement natif est coupé sur <html> pour le tactile et le mode sans Lenis.
 */
let locks = 0;
let saved = { overflow: '', paddingRight: '' };

export function lockScroll() {
  locks += 1;
  if (locks > 1) return;
  const html = document.documentElement;
  const scrollbar = window.innerWidth - html.clientWidth;
  saved = { overflow: html.style.overflow, paddingRight: document.body.style.paddingRight };
  html.style.overflow = 'hidden';
  // Évite le décalage du contenu quand la barre de défilement disparaît
  if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
  getLenis()?.stop();
}

export function unlockScroll() {
  if (locks === 0) return;
  locks -= 1;
  if (locks > 0) return;
  document.documentElement.style.overflow = saved.overflow;
  document.body.style.paddingRight = saved.paddingRight;
  getLenis()?.start();
}
