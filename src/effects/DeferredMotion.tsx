import { Component, lazy, ReactNode, Suspense } from 'react';
import { useAfterFirstDisplay } from '../lib/afterFirstDisplay';

/**
 * Effets GSAP chargés après le premier affichage (contrat §10, lot 7).
 *
 * Chaque effet est un petit composant sans rendu (src/effects/motion/), qui appelle useGSAP avec le scope de la
 * section qu'il anime. Ils vivent tous dans un fichier à part, chargé par import() avec GSAP et ScrollTrigger : le code
 * du premier affichage ne contient ni GSAP ni ScrollTrigger.
 *
 *   const heroRef = useRef<HTMLElement>(null);
 *   <AfterFirstDisplay><HeroMotion scope={heroRef} /></AfterFirstDisplay>
 *
 * Si le fichier ne se charge pas (hors ligne), rien ne s'affiche à sa place et la page reste dans son état final :
 * le HTML, tout visible.
 */
class QuietBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function AfterFirstDisplay({ children }: { children: ReactNode }) {
  const ready = useAfterFirstDisplay();
  if (!ready) return null;
  return (
    <QuietBoundary>
      <Suspense fallback={null}>{children}</Suspense>
    </QuietBoundary>
  );
}

// Les effets, chargés ensemble (un seul fichier, avec GSAP et ScrollTrigger)
const loadEffects = () => import('./motion');
export const HeroMotion = lazy(() => loadEffects().then((m) => ({ default: m.HeroMotion })));
export const FilScrub = lazy(() => loadEffects().then((m) => ({ default: m.FilScrub })));
export const ScrollExpandMotion = lazy(() => loadEffects().then((m) => ({ default: m.ScrollExpandMotion })));
export const MapMotion = lazy(() => loadEffects().then((m) => ({ default: m.MapMotion })));
export const RevealBatch = lazy(() => loadEffects().then((m) => ({ default: m.RevealBatch })));
export const PhotoReveal = lazy(() => loadEffects().then((m) => ({ default: m.PhotoReveal })));
