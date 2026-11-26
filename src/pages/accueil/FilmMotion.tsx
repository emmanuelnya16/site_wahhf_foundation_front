import type { RefObject } from 'react';
import { gsap, MQ, ScrollTrigger, useGSAP } from '../../lib/gsap';

// Téléphone : la barre d'adresse qui apparaît ou disparaît ne relance pas le calcul des positions
ScrollTrigger.config({ ignoreMobileResize: true });

/** Plateau : la lecture entre dans 0,34–0,71 et n'en sort qu'hors de 0,32–0,73 (pas de clignotement au bord) */
const ENTREE = [0.34, 0.71];
const SORTIE = [0.32, 0.73];
/** Coins de la carte : 2,5 rem */
const RAYON = 40;

interface Geo {
  W: number;
  H: number;
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Le fil autour de la carte : il entre par la gauche, fait le tour par le bas et la droite, repart à gauche par le haut */
function cheminFil({ x, y, w, h }: Geo) {
  const m = 28;
  const r = RAYON + m;
  const [L, T, R, B] = [x - m, y - m, x + w + m, y + h + m];
  return [
    `M 0 ${B + 34} C ${L * 0.6} ${B + 34} ${L} ${B} ${L + r} ${B}`,
    `L ${R - r} ${B} Q ${R} ${B} ${R} ${B - r}`,
    `L ${R} ${T + r} Q ${R} ${T} ${R - r} ${T}`,
    `L ${L + r} ${T} C ${L - 12} ${T} ${L * 0.5} ${T - 28} 0 ${T - 40}`,
  ].join(' ');
}

/**
 * Le film au défilement (lot 11.9) : une seule timeline, en scrub (lissage 0,6), sur toute la hauteur de la section ;
 * la scène est collée en CSS (sticky, aucun pin JS : CLS 0).
 * - 0 → 0,35 : le fil se dessine autour de la carte (repère .ac-film-place, posé en CSS) ; puis la carte s'ouvre en plein
 *   écran par clip-path et rotation, recouvre le fil (qui s'efface) et le titre, qui monte et s'efface dessous.
 * - 0,35 → 0,70 : plateau. Le cadre est plein écran, l'image passe de 1,08 à 1, la barre de contrôles paraît.
 * - 0,70 → 1 : le chemin inverse. Le titre revient.
 * - onPlateau : l'entrée et la sortie du plateau, d'après la progression lissée (ce que l'on voit).
 * Seulement transform, opacity et clip-path ; will-change posé pendant que la section est active.
 */
export default function FilmMotion({ scope, onPlateau }: { scope: RefObject<HTMLElement | null>; onPlateau: (dedans: boolean) => void }) {
  useGSAP(
    () => {
      const section = scope.current;
      const scene = section?.querySelector<HTMLElement>('.ac-film-scene');
      const place = section?.querySelector<HTMLElement>('.ac-film-place');
      const cadre = section?.querySelector<HTMLElement>('.ac-film-cadre');
      const media = section?.querySelector<HTMLElement>('.ac-film-media');
      const entete = section?.querySelector<HTMLElement>('.ac-film-entete');
      const ombre = section?.querySelector<HTMLElement>('.ac-film-ombre');
      const fil = section?.querySelector<SVGSVGElement>('.ac-film-fil');
      const trace = fil?.querySelector<SVGPathElement>('path');
      const barre = section?.querySelector<HTMLElement>('.ac-film-barre');
      if (!section || !scene || !place || !cadre || !media || !entete || !ombre || !fil || !trace || !barre) return;

      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        const geo = (): Geo => {
          const s = scene.getBoundingClientRect();
          const p = place.getBoundingClientRect();
          return { W: s.width, H: s.height, x: p.left - s.left, y: p.top - s.top, w: p.width, h: p.height };
        };
        const carte = () => {
          const g = geo();
          return `inset(${g.y}px ${g.W - g.x - g.w}px ${g.H - g.y - g.h}px ${g.x}px round ${RAYON}px)`;
        };
        // L'image suit le milieu de la carte (sinon une carte basse montre le bas de l'affiche), puis revient au centre
        const decalage = () => {
          const g = geo();
          return g.y + g.h / 2 - g.H / 2;
        };
        const dessinerFil = () => {
          const g = geo();
          fil.setAttribute('viewBox', `0 0 ${g.W} ${g.H}`);
          trace.setAttribute('d', cheminFil(g));
        };
        dessinerFil();

        let dedans = false;
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          onUpdate: () => {
            const p = tl.progress();
            const v = dedans ? p >= SORTIE[0] && p <= SORTIE[1] : p >= ENTREE[0] && p <= ENTREE[1];
            if (v !== dedans) {
              dedans = v;
              onPlateau(v);
            }
          },
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: dessinerFil,
            onToggle: (self) => section.classList.toggle('is-actif', self.isActive),
          },
        });
        const ouvert = 'inset(0px 0px 0px 0px round 0px)';
        // Ouverture : le fil fait le tour de la carte immobile, puis la carte grandit, le recouvre et avale le titre
        tl.fromTo(trace, { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 0.1 }, 0)
          .fromTo(cadre, { clipPath: carte, rotation: 2 }, { clipPath: ouvert, rotation: 0, duration: 0.28 }, 0.07)
          .fromTo(media, { y: decalage }, { y: 0, duration: 0.28 }, 0.07)
          .fromTo(fil, { opacity: 1 }, { opacity: 0, duration: 0.05 }, 0.11)
          .fromTo(ombre, { opacity: 1 }, { opacity: 0, duration: 0.1 }, 0.08)
          .fromTo(entete, { y: 0, opacity: 1 }, { y: -48, opacity: 0, duration: 0.18 }, 0.06)
          // Plateau : léger zoom de l'image, la barre paraît
          .fromTo(media, { scale: 1.08 }, { scale: 1, duration: 0.35 }, 0.35)
          .fromTo(barre, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.06 }, 0.37)
          .to(barre, { y: 16, opacity: 0, duration: 0.05 }, 0.66)
          // Fermeture : le chemin inverse
          .to(cadre, { clipPath: carte, rotation: 2, duration: 0.28 }, 0.7)
          .to(media, { y: decalage, duration: 0.28 }, 0.7)
          .to(entete, { y: 0, opacity: 1, duration: 0.18 }, 0.79)
          .to(ombre, { opacity: 1, duration: 0.1 }, 0.85)
          .to(fil, { opacity: 1, duration: 0.05 }, 0.87)
          .to(trace, { strokeDashoffset: 1000, duration: 0.1 }, 0.9);

        return () => {
          section.classList.remove('is-actif');
          onPlateau(false);
        };
      });
      return () => mm.revert();
    },
    { scope }
  );
  return null;
}
