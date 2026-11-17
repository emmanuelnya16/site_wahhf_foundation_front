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
 * - cadre : clip-path de inset(21 % 29 % arrondi 20 px), soit un cadre centré d'environ 42 % × 58 %, jusqu'à la
 *   largeur du container (photo de 986 px) ou jusqu'au plein écran (média HD, config/fieldMedia.ts) ;
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

        // Fin de l'ouverture (décision du 17/11) : plein écran seulement avec un média assez grand (originaux HD ou
        // boucle vidéo, config/fieldMedia.ts) ; sinon le cadre s'arrête à la largeur du container (72 rem), rayon
        // 20 px, à la hauteur qui garde les proportions de la photo (24 px de marge au moins en haut et en bas).
        // Les marges sont posées en variables CSS (--expand-x, --expand-y) pour placer la légende dans le cadre.
        const toScreen = stage.dataset.expandFit === 'screen';
        const inner = stage.querySelector<HTMLElement>('.container-page');
        const ratio = (() => {
          const w = Number(media.getAttribute('width'));
          const h = Number(media.getAttribute('height'));
          return w > 0 && h > 0 ? w / h : 16 / 10;
        })();
        const finalInset = () => {
          if (toScreen || !inner) return 'inset(0px 0px 0px 0px round 0px)';
          const box = stage.getBoundingClientRect();
          const content = inner.getBoundingClientRect();
          const pad = parseFloat(getComputedStyle(inner).paddingLeft) || 0;
          const x = Math.max(0, Math.round(content.left - box.left + pad));
          const frameHeight = (box.width - 2 * x) / ratio;
          const y = Math.max(24, Math.round((box.height - frameHeight) / 2));
          stage.style.setProperty('--expand-x', `${x}px`);
          stage.style.setProperty('--expand-y', `${y}px`);
          return `inset(${y}px ${x}px ${y}px ${x}px round 20px)`;
        };

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
        tl.fromTo(frame, { clipPath: 'inset(21% 29% 21% 29% round 20px)' }, { clipPath: finalInset, duration: 1 }, 0)
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
          stage.style.removeProperty('--expand-x');
          stage.style.removeProperty('--expand-y');
          delete stage.dataset.expand;
        };
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
