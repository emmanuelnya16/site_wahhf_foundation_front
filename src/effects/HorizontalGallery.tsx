import { ReactNode, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'motion/react';
import { gsap, useGSAP, MQ, GSAP_EASE } from '../lib/gsap';
import { prefersReducedMotion } from '../lib/reducedMotion';
import { scrollToPosition } from '../lib/scroll';

interface HorizontalGalleryProps {
  /** Identifiant d'ancre : posé sur la section PARENTE, jamais sur l'élément épinglé. */
  id: string;
  header: ReactNode;
  items: { key: string; node: ReactNode }[];
  prevLabel: string;
  nextLabel: string;
  /** Phrase d'aide affichée en mode épinglé (décorative). */
  pinHint?: string;
}

/**
 * Galerie à trois comportements :
 * - ordinateur assez haut, souris, animations autorisées (variante CSS `pin:` = MQ.desktopPin) :
 *   section ÉPINGLÉE, la bande défile horizontalement au scroll (scrub 1, ease none) ;
 *   le titre de section devient le premier panneau de la bande (la hauteur tient dès 760 px) ;
 * - tablette / ordinateur bas / réduire les animations : grille classique ;
 * - téléphone : carrousel tactile natif (scroll-snap) avec flèches.
 */
export default function HorizontalGallery({ id, header, items, prevLabel, nextLabel, pinHint }: HorizontalGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.desktopPin, () => {
        const track = trackRef.current;
        const pinEl = pinRef.current;
        if (!track || !pinEl) return;

        // Distance = largeur de la bande − largeur de l'écran, recalculée à chaque refresh
        const distance = () => Math.max(0, track.scrollWidth - document.documentElement.clientWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: GSAP_EASE.scrub,
          scrollTrigger: {
            trigger: pinEl,
            pin: true,
            start: 'top top',
            end: () => `+=${distance()}`,
            // Lié au défilement : linéaire, sans durée (Lenis lisse déjà la molette)
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });

        // Clavier : une carte qui reçoit le focus fait défiler la page jusqu'à l'étape où elle est visible
        const onFocusIn = (event: FocusEvent) => {
          const item = (event.target as HTMLElement).closest<HTMLElement>('[data-gallery-item]');
          const st = tween.scrollTrigger;
          const d = distance();
          if (!item || !st || d === 0) return;
          let left = 0;
          for (let el: HTMLElement | null = item; el && el !== track; el = el.offsetParent as HTMLElement | null) {
            left += el.offsetLeft;
          }
          const viewport = document.documentElement.clientWidth;
          const wanted = gsap.utils.clamp(0, d, left + item.offsetWidth / 2 - viewport / 2);
          scrollToPosition(st.start + (wanted / d) * (st.end - st.start), { immediate: true });
        };
        track.addEventListener('focusin', onFocusIn);
        return () => track.removeEventListener('focusin', onFocusIn);
      });
      return () => mm.revert();
    },
    // Rejoué si « réduire les animations » change en cours de visite (la variante CSS pin: réagit en direct)
    { scope: sectionRef, dependencies: [reduce], revertOnUpdate: true }
  );

  const scrollCarousel = (dir: 'prev' | 'next') => {
    const el = carouselRef.current;
    if (!el) return;
    const width = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === 'next' ? width : -width, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <section id={id} ref={sectionRef} className="relative">
      <div
        ref={pinRef}
        className="py-20 sm:py-28 pin:py-0 pin:h-svh pin:flex pin:items-center pin:overflow-clip"
      >
        <div
          ref={trackRef}
          className="relative flex flex-col gap-12 container-page pin:flex-row pin:items-center pin:max-w-none pin:mx-0 pin:w-max pin:px-[max(var(--gutter),calc((100vw_-_var(--container-page))_/_2))] pin:will-change-transform"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pin:flex-col pin:items-start pin:justify-center pin:w-[min(26rem,30vw)] pin:shrink-0">
            {header}

            {pinHint && (
              <p aria-hidden="true" className="hidden pin:flex items-center gap-2 text-sm text-v1-encre/70 dark:text-creme/70">
                <ChevronRight className="w-4 h-4 text-or" />
                {pinHint}
              </p>
            )}

            {/* Flèches rondes précédent/suivant : téléphone uniquement (carrousel) */}
            <div className="flex md:hidden items-center gap-3 self-end">
              <button
                type="button"
                onClick={() => scrollCarousel('prev')}
                aria-label={prevLabel}
                className="w-11 h-11 rounded-pill border border-border-strong flex items-center justify-center text-accent hover:bg-or hover:text-v1-encre transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('next')}
                aria-label={nextLabel}
                className="w-11 h-11 rounded-pill border border-border-strong flex items-center justify-center text-accent hover:bg-or hover:text-v1-encre transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Téléphone : carrousel | Tablette & ordinateur bas : grille | Épinglé : rangée horizontale */}
          <div
            ref={carouselRef}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto overscroll-x-contain md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 pin:flex!"
          >
            {items.map((item) => (
              <div
                key={item.key}
                data-gallery-item
                className="min-w-[84vw] sm:min-w-[360px] md:min-w-0 snap-center pin:w-[min(23rem,27vw)] pin:shrink-0"
              >
                {item.node}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
