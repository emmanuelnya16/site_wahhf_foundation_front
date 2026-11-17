import { RefObject } from 'react';
import { gsap, MQ, useGSAP } from '../../lib/gsap';
import { scrollToPosition } from '../../lib/scroll';
import { requestScrollRefresh } from '../../lib/afterFirstDisplay';

/** Hauteur de l'en-tête fixe, lue dans --header-height (src/index.css) */
function headerHeight() {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--header-height').trim();
  const value = parseFloat(raw) || 0;
  return raw.endsWith('rem') ? value * parseFloat(getComputedStyle(root).fontSize) : value;
}

/**
 * Scroll Expand de « Sur le terrain » (contrat §10, moment 3, lot 7), voir src/effects/ScrollExpand.tsx.
 * Ordinateur à souris, 1 024 × 700 px au moins, animations autorisées (MQ.expand) :
 * - scène épinglée sous l'en-tête pendant 1,3 hauteur d'écran de défilement (pin, scrub 0,5, sans courbe) ;
 * - cadre : clip-path de inset(21 % 29 % arrondi 20 px) à plein écran, soit un cadre centré d'environ 42 % × 58 % ;
 * - média : scale de 1,2 à 1 ; voile nuit : opacité de 0 à 1 ; légende et lien : fondu et montée de 24 px à la fin.
 * Seuls clip-path (toléré ici par le contrat), transform et opacité sont animés.
 * - Scène déjà atteinte quand GSAP arrive : rien ne s'épingle (la page ne sauterait pas sous les yeux du visiteur).
 * - Le lien de la légende reçoit le focus avant la fin : la page défile jusqu'à la fin de l'ouverture, lien visible.
 * - Fenêtre réduite sous les seuils, mouvement réduit : mode normal rétabli aussitôt (gsap.matchMedia).
 */
export default function ScrollExpandMotion({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useGSAP(
    () => {
      const stage = scope.current;
      const frame = stage?.querySelector<HTMLElement>('.expand-frame');
      const media = stage?.querySelector<HTMLElement>('[data-expand-media]');
      const veil = stage?.querySelector<HTMLElement>('.expand-veil');
      const caption = stage?.querySelector<HTMLElement>('.expand-caption');
      if (!stage || !frame || !media || !veil || !caption) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.expand, () => {
        if (stage.getBoundingClientRect().top < window.innerHeight) return;
        stage.dataset.expand = 'on';

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: () => `top ${headerHeight()}px`,
            end: () => `+=${window.innerHeight * 1.3}`,
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            // Créé après les déclencheurs placés plus bas (apparitions, carte) : recalculé en premier, pour que leurs
            // positions tiennent compte de l'espace ajouté par l'épinglage
            refreshPriority: 1,
          },
        });
        tl.fromTo(frame, { clipPath: 'inset(21% 29% 21% 29% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1 }, 0)
          .fromTo(media, { scale: 1.2 }, { scale: 1, duration: 1 }, 0)
          .fromTo(veil, { opacity: 0 }, { opacity: 1, duration: 1 }, 0)
          .fromTo(caption, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.25 }, 0.85)
          // Lien invisible = non cliquable ; il redevient cliquable quand la légende apparaît
          .set(caption, { pointerEvents: 'none' }, 0)
          .set(caption, { pointerEvents: 'auto' }, 0.85)
          .to({}, { duration: 0.2 });
        requestScrollRefresh();

        // Clavier : le lien encore masqué reçoit le focus, on va à la fin de l'ouverture
        const reveal = () => {
          const st = tl.scrollTrigger;
          if (st && tl.progress() < 1) scrollToPosition(st.end, { immediate: true });
        };
        caption.addEventListener('focusin', reveal);
        return () => {
          caption.removeEventListener('focusin', reveal);
          delete stage.dataset.expand;
        };
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
