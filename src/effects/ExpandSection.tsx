import { ReactNode, useRef } from 'react';
import { gsap, useGSAP, MQ, GSAP_EASE } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/reducedMotion';

interface ExpandSectionProps {
  id: string;
  /** Classes du fond (couleur) : c'est ce calque qui s'agrandit. */
  backgroundClassName: string;
  className?: string;
  children: ReactNode;
}

/**
 * Effet d'AGRANDISSEMENT : le fond de la section passe d'une carte arrondie centrée à la pleine
 * largeur (clip-path inset, scrub lié au défilement, sans courbe ni durée), puis les blocs marqués
 * [data-cascade] apparaissent en cascade, une seule fois.
 * - Ordinateur à la souris : agrandissement + cascade.
 * - Téléphone / tactile : cascade seule (pas de scrub lourd).
 * - Réduire les animations : rien n'est masqué ni animé (retour immédiat).
 */
export default function ExpandSection({ id, backgroundClassName, className = '', children }: ExpandSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const section = sectionRef.current;
      if (!section) return;
      const items = gsap.utils.toArray<HTMLElement>('[data-cascade]', section);
      const mm = gsap.matchMedia();
      mm.add({ isDesktop: MQ.desktop, motionOk: MQ.motionOk }, (ctx) => {
        const { isDesktop, motionOk } = ctx.conditions as { isDesktop: boolean; motionOk: boolean };
        if (!motionOk) return;

        if (isDesktop && bgRef.current) {
          // Marge latérale de la carte : 6 % de l'écran, mais jamais plus que l'espace libre autour du
          // contenu (moins 16 px). Ainsi, même en remontant la page, le texte clair reste toujours sur le vert.
          const content = section.querySelector<HTMLElement>('[data-expand-content]');
          const sideInset = () => {
            if (!content) return 0;
            const left = content.getBoundingClientRect().left - section.getBoundingClientRect().left;
            const padding = parseFloat(getComputedStyle(content).paddingLeft) || 0;
            return Math.max(0, Math.min(window.innerWidth * 0.06, left + padding - 16));
          };
          gsap.fromTo(
            bgRef.current,
            { clipPath: () => `inset(4% ${sideInset()}px 4% ${sideInset()}px round 32px)` },
            {
              clipPath: 'inset(0% 0px 0% 0px round 0px)',
              ease: GSAP_EASE.scrub,
              scrollTrigger: { trigger: section, start: 'top 90%', end: 'top 20%', scrub: true, invalidateOnRefresh: true },
            }
          );
        }

        // La cascade démarre quand la carte est presque pleine largeur (le texte reste sur le vert).
        // fromTo avec valeurs finales explicites : si matchMedia rejoue ce bloc, un état intermédiaire
        // (ex. transition CSS en cours) ne peut jamais être pris pour l'état final.
        // Opacité seule (pas autoAlpha) : un élément en visibility: hidden sortirait de l'ordre de tabulation.
        const cascade = gsap.fromTo(
          items,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: GSAP_EASE.reveal,
            stagger: 0.12,
            scrollTrigger: { trigger: section, start: isDesktop ? 'top 45%' : 'top 80%', once: true },
          }
        );
        // Clavier : si un élément encore masqué reçoit le focus, la cascade se termine aussitôt
        const reveal = () => {
          if (cascade.progress() < 1) cascade.progress(1);
        };
        section.addEventListener('focusin', reveal);
        return () => section.removeEventListener('focusin', reveal);
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section id={id} ref={sectionRef} className={`relative overflow-hidden ${className}`}>
      <div ref={bgRef} aria-hidden="true" className={`absolute inset-0 ${backgroundClassName}`} />
      <div className="relative z-10">{children}</div>
    </section>
  );
}
