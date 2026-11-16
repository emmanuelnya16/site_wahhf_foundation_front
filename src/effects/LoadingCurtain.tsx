import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { WAHHF_LOGO_URL } from '../services/api';
import { prefersReducedMotion } from '../lib/reducedMotion';
import { setIntroDone } from './introState';
import { EASE_OUT, EASE_SCREEN, DURATION } from '../lib/motionTokens';

const STORAGE_KEY = 'wahhf_curtain_seen';

/**
 * Décidé une seule fois, au chargement du site :
 * rideau seulement si la visite commence sur l'accueil, une fois par session,
 * jamais avec « réduire les animations » ni si sessionStorage est indisponible.
 */
function decideCurtain(): boolean {
  if (typeof window === 'undefined') return false;
  if (window.location.pathname !== '/' || prefersReducedMotion()) return false;
  try {
    if (window.sessionStorage.getItem(STORAGE_KEY)) return false;
    window.sessionStorage.setItem(STORAGE_KEY, '1');
    return true;
  } catch {
    return false;
  }
}

const SHOW_CURTAIN = decideCurtain();
// Le titre du hero attend la fin du rideau
if (SHOW_CURTAIN) setIntroDone(false);

// Rythme : logo 0,6 s, puis le rideau se lève en 0,7 s (total 1,3 s, plafond de sécurité 1,5 s).
const LOGO_MS = 600;
const RELEASE_TITLE_MS = 900; // le titre commence à monter pendant que le rideau se lève
const HARD_STOP_MS = 1500;

/**
 * Petit rideau de chargement avec le logo WAHHF. Purement minuté : il n'attend aucun téléchargement
 * (jamais bloquant sur connexion lente) et laisse passer les clics (pointer-events: none).
 */
export default function LoadingCurtain() {
  const [phase, setPhase] = useState<'logo' | 'leaving' | 'done'>(SHOW_CURTAIN ? 'logo' : 'done');

  useEffect(() => {
    if (!SHOW_CURTAIN) return;
    const timers = [
      window.setTimeout(() => setPhase((p) => (p === 'logo' ? 'leaving' : p)), LOGO_MS),
      window.setTimeout(() => setIntroDone(true), RELEASE_TITLE_MS),
      window.setTimeout(() => {
        setIntroDone(true);
        setPhase('done');
      }, HARD_STOP_MS),
    ];
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  if (phase === 'done') return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-(--z-curtain) bg-foret pointer-events-none flex items-center justify-center"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      animate={{ clipPath: phase === 'leaving' ? 'inset(0% 0% 100% 0%)' : 'inset(0% 0% 0% 0%)' }}
      transition={{ duration: DURATION.screen, ease: EASE_SCREEN }}
      onAnimationComplete={() => {
        if (phase === 'leaving') setPhase('done');
      }}
    >
      <motion.img
        src={WAHHF_LOGO_URL}
        alt=""
        width={96}
        height={96}
        className="w-24 h-24 rounded-pill bg-white p-2.5 object-contain"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={phase === 'leaving' ? { opacity: 0, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: phase === 'leaving' ? DURATION.fast : 0.5, ease: EASE_OUT }}
      />
    </motion.div>
  );
}
