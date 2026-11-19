import { useEffect, useRef } from 'react';

/**
 * Barre de progression de lecture : filet de 3 px en haut de page, réservé aux articles (/actualites/:slug,
 * décision du 16/11 ; Layout décide où elle s'affiche). Couleur forêt (feuille en sombre), plus d'or. Décorative
 * (aria-hidden) : la position dans l'article se lit déjà avec la barre de défilement.
 * Groupe 7.3 : elle suit le défilement sans Motion (un écouteur de défilement passif, une mise à jour par image, scaleX
 * seulement) ; elle fonctionne donc même si le moteur de Motion ne se charge jamais. Sans courbe ni durée : elle
 * indique une position, elle ne s'anime pas (identique en mouvement réduit). Elle reste vide tant que la page ne
 * contient pas d'article ([data-reading-progress] ; « Cet article est introuvable » n'en a pas), et se remplit sur la
 * hauteur de l'article seulement.
 */
export default function ReadingProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = ref.current;
    if (!bar) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = document.querySelector('[data-reading-progress]');
      if (!article) {
        bar.style.transform = 'scaleX(0)';
        return;
      }
      // Revue du groupe 7.3 : la progression suit l'article, pas toute la page (footer compris). Vide en haut de page,
      // pleine quand la fin de l'article atteint le bas de l'écran ; un article qui tient dans l'écran est lu d'emblée.
      const end = article.getBoundingClientRect().bottom + window.scrollY - window.innerHeight;
      const progress = end > 0 ? Math.min(1, Math.max(0, window.scrollY / end)) : 1;
      bar.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    // La page change de hauteur sans défilement (images, polices) : la proportion est recalculée
    const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    resize?.observe(document.body);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      resize?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-reading-bar z-(--z-progress) origin-left pointer-events-none"
      style={{ transform: 'scaleX(0)' }}
    />
  );
}
