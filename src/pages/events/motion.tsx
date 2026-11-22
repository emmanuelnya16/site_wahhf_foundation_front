import { useEffect, useState, type CSSProperties, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { Pause, Play } from 'lucide-react';

const PAUSE_KEY = 'wahhf_evenements_pause';

/**
 * Arrêt des animations en boucle (WCAG 2.2.2), en plus du mouvement réduit (src/styles/events-motion.css) :
 * - une zone [data-ev-zone] hors de l'écran reçoit .is-hors-ecran (IntersectionObserver) ;
 * - onglet caché : .ev-onglet-cache sur la page ;
 * - bouton « Mettre les animations en pause » : .ev-pause sur la page, retenu pour la visite (sessionStorage).
 */
export function useLoopControl(root: RefObject<HTMLElement | null>) {
  const [paused, setPaused] = useState(() => {
    try {
      return sessionStorage.getItem(PAUSE_KEY) === '1';
    } catch {
      return false;
    }
  });
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-hors-ecran', !entry.isIntersecting));
    });
    el.querySelectorAll('[data-ev-zone]').forEach((zone) => io.observe(zone));
    const onVisibility = () => el.classList.toggle('ev-onglet-cache', document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [root]);
  const toggle = () =>
    setPaused((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(PAUSE_KEY, next ? '1' : '0');
      } catch {
        // stockage indisponible (navigation privée) : la pause vaut pour la page
      }
      return next;
    });
  return { paused, toggle };
}

/** Bouton du hero : son libellé dit ce qu'il va faire (masqué en mouvement réduit, où rien ne bouge) */
export function PauseButton({ paused, onToggle }: { paused: boolean; onToggle: () => void }) {
  const { t } = useTranslation();
  return (
    <button type="button" className="ev-pause-anim" onClick={onToggle}>
      {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
      {paused ? t('events.hero.play') : t('events.hero.pause')}
    </button>
  );
}

/** Bouton pause du bandeau : rond de 44 px, aria-pressed (libellé constant) */
export function TickerPause({ pressed, onToggle }: { pressed: boolean; onToggle: () => void }) {
  const { t } = useTranslation();
  return (
    <button type="button" className="ev-bandeau-pause" aria-pressed={pressed} aria-label={t('events.ticker.pause')} onClick={onToggle}>
      {pressed ? <Play aria-hidden="true" className="h-5 w-5" /> : <Pause aria-hidden="true" className="h-5 w-5" />}
    </button>
  );
}

/** Confettis : 14 (les 6 premiers seulement sur téléphone), couleurs soleil, forêt et nuit ; décoratifs */
const CONFETTIS: { x: number; y: number; c: string; d: number; r?: boolean; rot: number }[] = [
  { x: 4, y: 38, c: 'nuit', d: 9, rot: -20 },
  { x: 47, y: 30, c: 'soleil', d: 7, r: true, rot: 0 },
  { x: 55, y: 62, c: 'foret', d: 11, r: true, rot: 0 },
  { x: 52, y: 58, c: 'soleil', d: 8, rot: 50 },
  { x: 90, y: 88, c: 'nuit', d: 10, rot: 30 },
  { x: 28, y: 92, c: 'foret', d: 12, rot: -40 },
  { x: 12, y: 12, c: 'soleil', d: 6, r: true, rot: 0 },
  { x: 38, y: 8, c: 'foret', d: 9, rot: 70 },
  { x: 66, y: 6, c: 'nuit', d: 8, r: true, rot: 0 },
  { x: 78, y: 40, c: 'soleil', d: 10, rot: -60 },
  { x: 84, y: 18, c: 'foret', d: 7, rot: 20 },
  { x: 18, y: 70, c: 'soleil', d: 11, rot: 80 },
  { x: 60, y: 96, c: 'nuit', d: 9, rot: -10 },
  { x: 96, y: 60, c: 'foret', d: 12, r: true, rot: 0 },
];

export function Confetti() {
  return (
    <div className="ev-confetti" aria-hidden="true">
      {CONFETTIS.map((p, i) => (
        <i
          key={i}
          className={p.r ? 'is-rond' : undefined}
          style={
            {
              left: `${p.x}%`,
              top: `${p.y}%`,
              rotate: `${p.rot}deg`,
              '--couleur': `var(--color-${p.c})`,
              '--duree': `${p.d}s`,
              '--delai': `${-(i % 5) * 1.3}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
