import { useRef, type RefObject } from 'react';
import { SplitText } from 'gsap/SplitText';
import { gsap, MQ, useGSAP, GSAP_EASE } from '../../lib/gsap';

// Le même plugin que les parcours épinglés, chargé à l'approche du paquet
gsap.registerPlugin(SplitText);

/**
 * La citation de la nouvelle carte du dessus se révèle ligne par ligne (lot 11.4, Paquet.tsx). La première, à l'arrivée sur
 * la section, reste en place : c'est le paquet qui s'éventaille. Le texte redevient entier à la fin. Mouvement réduit : rien.
 */
export default function CitationMotion({ scope, dessus, lang }: { scope: RefObject<HTMLElement | null>; dessus: number; lang: string }) {
  const precedente = useRef(dessus);
  useGSAP(
    () => {
      if (precedente.current === dessus) return;
      precedente.current = dessus;
      const texte = scope.current?.querySelector<HTMLElement>('.ac-temoin[data-pos="0"] .ac-citation-texte');
      if (!texte) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        const split = SplitText.create(texte, { type: 'lines', mask: 'lines' });
        gsap.from(split.lines, { yPercent: 110, duration: 0.7, ease: GSAP_EASE.glide, stagger: 0.08, delay: 0.12, onComplete: () => split.revert() });
        return () => split.revert();
      });
      return () => mm.revert();
    },
    { scope, dependencies: [dessus, lang], revertOnUpdate: true }
  );
  return null;
}
