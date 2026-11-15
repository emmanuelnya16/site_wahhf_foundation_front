import { ReactNode, useRef } from 'react';
import { SplitText } from 'gsap/SplitText';
import { gsap, useGSAP } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/reducedMotion';

// SplitText n'est importé et enregistré qu'ici (seul effet qui l'utilise).
gsap.registerPlugin(SplitText);

/** Paragraphes déjà révélés : après un changement de langue, le nouveau texte s'affiche sans rejouer l'effet. */
const revealed = new Set<string>();

interface SplitRevealProps {
  /** Identifiant stable du paragraphe (mémorise qu'il a déjà été révélé). */
  id: string;
  className?: string;
  children: ReactNode;
}

/**
 * Paragraphe révélé ligne par ligne au défilement (SplitText : type lines, mask lines, autoSplit).
 * L'animation est créée dans onSplit() et renvoyée : SplitText la nettoie et la resynchronise
 * à chaque nouveau découpage (polices chargées, largeur modifiée).
 * Changement de langue : le parent doit donner une `key` liée à la langue, le composant est alors
 * remonté (l'ancien découpage est annulé avec le contexte GSAP) au lieu que React réécrive un DOM découpé.
 */
export default function SplitReveal({ id, className = '', children }: SplitRevealProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || revealed.has(id) || !ref.current) return;
      const el = ref.current;
      SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          return gsap.from(self.lines, {
            yPercent: 100,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onComplete: () => {
              revealed.add(id);
            },
          });
        },
      });
    },
    { scope: ref }
  );

  return (
    <p ref={ref} className={className}>
      {children}
    </p>
  );
}
