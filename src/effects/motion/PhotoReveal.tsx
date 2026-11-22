import { RefObject } from 'react';
import { gsap, MQ, ScrollTrigger, useGSAP, GSAP_EASE, DURATION, APPEAR_START } from '../../lib/gsap';

/**
 * Photo révélée par clip-path, puis texte en fondu (groupe 7.3, contrat §10) : un domaine de Nos actions, un membre de
 * la gouvernance de Qui sommes-nous. Repères posés par la page :
 *   [data-photo-reveal]        le bloc (déclencheur) ;
 *   [data-photo-reveal-media]  la photo, facultative ;
 *   [data-photo-reveal-text]   le texte.
 * - Ordinateur à souris seulement (MQ.computer), une fois, quand le haut du bloc atteint 85 % de l'écran : la photo se
 *   découvre du bas vers le haut (clip-path, 0,9 s, power3.out, comme l'en-tête de Mobilité), puis le texte apparaît en
 *   fondu (0,6 s, power2.out), 0,35 s après le début. Sans photo : le texte seul, en fondu. Clip-path et opacité
 *   seulement ; un seul effet fort par bloc.
 * - Rien n'est masqué pour un bloc déjà visible, même en partie, quand GSAP arrive (seuls les blocs encore sous l'écran le
 *   sont). Un bloc encore masqué qui reçoit le focus s'affiche aussitôt.
 * - Téléphone, tactile, mouvement réduit, ou si GSAP ne se charge pas : tout est en place (état du HTML). Ce qui est
 *   créé plus tard passe par le contexte de gsap.matchMedia (self.add) : le passage en mouvement réduit ou le départ de
 *   la page l'annule, et tout redevient visible.
 */
const START = 0.35;

export default function PhotoReveal({ scope }: { scope: RefObject<HTMLElement | null> }) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.computer, (self) => {
        const blocks = gsap.utils
          .toArray<HTMLElement>('[data-photo-reveal]', root)
          .filter((el) => el.getClientRects().length && el.getBoundingClientRect().top >= window.innerHeight);
        if (!blocks.length) return;
        const hidden = new Set<HTMLElement>();
        const parts = (block: HTMLElement) => ({
          media: block.querySelector<HTMLElement>('[data-photo-reveal-media]'),
          text: gsap.utils.toArray<HTMLElement>('[data-photo-reveal-text]', block),
        });
        // Masque du bas vers le haut, au rayon de la photo (lu dans le style calculé : GSAP n'interpole pas var()).
        // Forme à trois valeurs, celle que renvoie le navigateur : les nombres de départ et d'arrivée se correspondent.
        const clip = (media: HTMLElement, top: string) => `inset(${top} 0% 0% round ${getComputedStyle(media).borderTopLeftRadius || '0px'})`;

        const play = self.add('play', (block: HTMLElement) => {
          if (!hidden.delete(block)) return;
          const { media, text } = parts(block);
          const tl = gsap.timeline();
          if (media) tl.to(media, { clipPath: clip(media, '0%'), duration: DURATION.reveal, ease: GSAP_EASE.glide, clearProps: 'clipPath' }, 0);
          if (text.length) tl.to(text, { opacity: 1, duration: 0.6, ease: GSAP_EASE.soft, clearProps: 'opacity' }, media ? START : 0);
        }) as unknown as (block: HTMLElement) => void;

        const finish = self.add('finish', (block: HTMLElement) => {
          if (!hidden.delete(block)) return;
          const { media, text } = parts(block);
          gsap.killTweensOf([media, ...text].filter(Boolean));
          if (media) gsap.set(media, { clearProps: 'clipPath' });
          if (text.length) gsap.set(text, { clearProps: 'opacity' });
        }) as unknown as (block: HTMLElement) => void;

        blocks.forEach((block) => {
          const { media, text } = parts(block);
          if (media) gsap.set(media, { clipPath: clip(media, '100%') });
          if (text.length) gsap.set(text, { opacity: 0 });
          hidden.add(block);
          ScrollTrigger.create({ trigger: block, start: APPEAR_START, once: true, onEnter: () => play(block) });
        });

        // Clavier : un lien ou un bouton du bloc atteint au Tab avant son apparition, tout s'affiche
        const onFocus = (event: FocusEvent) => {
          const target = event.target instanceof Element ? event.target : null;
          const block = target?.closest<HTMLElement>('[data-photo-reveal]');
          if (block && hidden.has(block)) finish(block);
        };
        root.addEventListener('focusin', onFocus);
        return () => root.removeEventListener('focusin', onFocus);
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
