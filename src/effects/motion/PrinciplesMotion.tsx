import { RefObject, useEffect, useRef, useState } from 'react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { SplitText } from 'gsap/SplitText';
import { gsap, ScrollTrigger, useGSAP, MQ, GSAP_EASE, DURATION, APPEAR_START } from '../../lib/gsap';
import { drawFil } from '../../components/principles/principlesFil';
import { scrollToPosition } from '../../lib/scroll';
import { requestScrollRefresh } from '../../lib/afterFirstDisplay';

// Plugins de cette section seulement : ce fichier est chargé à part, quand la section approche (PrinciplesSection)
gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, SplitText);

/** Parcours épinglé : 1 024 × 700 px au moins, souris, animations autorisées (votre brief) */
const PIN = '(min-width: 1024px) and (min-height: 700px) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
/** Part de la timeline consacrée au trajet du point ; le reste : la carte finale reste à l'écran avant la sortie */
const TRAVEL = 0.92;
/** Le point reste à 40 % de la largeur de l'écran (caméra) */
const CAMERA_AT = 0.4;

/** Hauteur de l'en-tête fixe (--header-height) : la scène s'épingle juste dessous */
function headerHeight() {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--header-height').trim();
  const value = parseFloat(raw) || 0;
  return raw.endsWith('rem') ? value * parseFloat(getComputedStyle(root).fontSize) : value;
}

/**
 * Les cinq principes en mouvement (lot 7.8 ; src/components/principles/PrinciplesSection.tsx).
 *
 * Ordinateur (PIN) : un travelling épinglé.
 * - La scène se fige sous l'en-tête pendant 3,5 hauteurs d'écran ; tout suit la molette (scrub 0,6, sans courbe,
 *   Lenis branché sur ScrollTrigger), sans aimantation sur les étapes.
 * - Le fil se dessine de gauche à droite (DrawSVG) ; le point soleil le parcourt (MotionPath) ; la piste glisse
 *   (caméra) pour garder le point à 40 % de la largeur de l'écran, entre le début et la fin de la piste.
 * - À chaque encoche : la carte apparaît (fondu, montée de 24 px, échelle 0,94 → 1) ; le point fait une impulsion
 *   (× 1,4) ; titre et description montent ligne par ligne sous un masque (SplitText) ; le compteur roule.
 * - Puis la carte finale ; la section se libère après un court temps d'arrêt.
 * - Titre et introduction de la section : révélés ligne par ligne à l'arrivée.
 * - Clavier : le bouton de la carte finale reçoit le focus avant la fin → la page va à la fin du parcours (2.4.11).
 * - Seuls transform et opacité bougent (plus le tracé du fil) ; will-change seulement pendant l'épinglage.
 * Téléphone, tablette, écran tactile, écran bas : la colonne ; le fil vertical se dessine au défilement (scrub) et
 * les cartes apparaissent par lots (fondu, montée de 16 px, échelle 0,96 → 1, 80 ms de décalage).
 * Mouvement réduit : ce fichier n'est pas chargé (fil tracé, tout en place, colonne).
 * Changement de langue, redimensionnement, polices : tout est défait puis recalculé (tracé, découpe des lignes).
 * Scène déjà atteinte quand ce fichier arrive (lien vers #approche) : la colonne, sans épinglage, pour ne pas faire
 * sauter la page sous les yeux du visiteur.
 */
export default function PrinciplesMotion({ scope, lang }: { scope: RefObject<HTMLElement | null>; lang: string }) {
  const [version, setVersion] = useState(0);
  const reachedAtLoad = useRef<boolean | null>(null);

  // Fin d'un redimensionnement, polices arrivées : nouvelle mise en place
  useEffect(() => {
    let w = window.innerWidth;
    let h = window.innerHeight;
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (window.innerWidth === w && window.innerHeight === h) return;
        w = window.innerWidth;
        h = window.innerHeight;
        setVersion((v) => v + 1);
      }, 250);
    };
    window.addEventListener('resize', onResize);
    let active = true;
    if (document.fonts && document.fonts.status !== 'loaded') {
      document.fonts.ready.then(() => active && setVersion((v) => v + 1));
    }
    return () => {
      active = false;
      window.removeEventListener('resize', onResize);
      window.clearTimeout(timer);
    };
  }, []);

  useGSAP(
    () => {
      const section = scope.current;
      if (!section) return;
      if (reachedAtLoad.current === null) reachedAtLoad.current = section.getBoundingClientRect().top < window.innerHeight;
      const mm = gsap.matchMedia();
      mm.add({ pin: PIN, motion: MQ.motionOk }, (context) => {
        const { pin, motion } = context.conditions as { pin: boolean; motion: boolean };
        if (!motion) return;
        if (pin && !reachedAtLoad.current) return pinned(section);
        return column(section);
      });
      return () => mm.revert();
    },
    { scope, dependencies: [lang, version], revertOnUpdate: true }
  );
  return null;
}

/** Ordinateur : le travelling épinglé. Renvoie le nettoyage (appelé par gsap.matchMedia). */
function pinned(section: HTMLElement) {
  const pinEl = section.querySelector<HTMLElement>('.principles-pin');
  const viewport = section.querySelector<HTMLElement>('.principles-viewport');
  const track = section.querySelector<HTMLElement>('.principles-track');
  const title = section.querySelector<HTMLElement>('.principles-title');
  const intro = section.querySelector<HTMLElement>('.principles-intro');
  const roll = section.querySelector<HTMLElement>('.principles-counter-roll');
  const path = track?.querySelector<SVGPathElement>('.principles-fil-path');
  const dot = track?.querySelector<SVGGElement>('.principles-dot');
  const dotCircle = dot?.querySelector<SVGCircleElement>('circle');
  const action = track?.querySelector<HTMLElement>('.principle-action');
  if (!pinEl || !viewport || !track || !title || !intro || !roll || !path || !dot || !dotCircle) return;
  const cards = gsap.utils.toArray<HTMLElement>('.principle-card', track);
  // Avant la mise en ligne : la section est-elle encore sous l'écran (titre à révéler) ?
  const titleBelow = section.getBoundingClientRect().top >= window.innerHeight;

  section.classList.add('is-pinned');
  // La piste commence au bord gauche de l'écran ; la première carte s'aligne sur le titre
  const lead = title.getBoundingClientRect().left - section.getBoundingClientRect().left;
  track.style.setProperty('--principles-lead', `${Math.round(lead)}px`);
  const geo = drawFil(track, 'row');
  if (!geo || !geo.length) {
    section.classList.remove('is-pinned');
    return;
  }

  // La piste tient en hauteur dans la scène (réduite si l'écran est bas), centrée verticalement
  const avail = viewport.clientHeight;
  const scale = Math.min(1, avail / geo.height);
  gsap.set(track, { transformOrigin: '0 0', scale, x: 0, y: Math.max(0, (avail - geo.height * scale) / 2) });
  const setX = gsap.quickSetter(track, 'x', 'px') as (value: number) => void;
  const camera = () => {
    const width = viewport.clientWidth;
    const dotX = (gsap.getProperty(dot, 'x') as number) || 0;
    const min = Math.min(0, width - geo.width * scale);
    setX(Math.max(min, Math.min(0, width * CAMERA_AT - dotX * scale)));
  };

  // Titre et description de chaque principe, ligne par ligne (redécoupés à chaque mise en place)
  const splits = cards.slice(0, 5).map((card) =>
    SplitText.create(card.querySelectorAll('.principle-title, .principle-desc'), { type: 'lines', mask: 'lines' })
  );

  const tl = gsap.timeline({
    defaults: { ease: GSAP_EASE.scrub },
    onUpdate: camera,
    scrollTrigger: {
      // Épinglage en position sticky (src/index.css, lot 11.4) : le « pin » de ScrollTrigger passait la scène en position
      // fixed, ce que Chrome comptait comme un décalage de mise en page (CLS 0,92 à l'entrée et à la sortie)
      trigger: section,
      start: () => `top ${headerHeight()}px`,
      end: () => `+=${section.offsetHeight - pinEl.offsetHeight}`,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        track.style.willChange = self.isActive ? 'transform' : '';
      },
    },
  });
  tl.fromTo(path, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', duration: TRAVEL }, 0);
  // Le point : posé au départ du fil, puis le parcourt
  gsap.set(dot, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], end: 0 } });
  tl.to(dot, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: TRAVEL }, 0);

  const at = (i: number) => (geo.notchLengths[i] / geo.length) * TRAVEL;
  cards.forEach((card, i) => {
    const t = at(i);
    tl.fromTo(card, { opacity: 0, y: 24, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.035, ease: GSAP_EASE.soft }, Math.max(0, t - 0.004));
    // Le point s'emboîte dans l'encoche
    tl.to(dotCircle, { scale: 1.4, transformOrigin: '50% 50%', duration: 0.01, ease: GSAP_EASE.soft }, t).to(
      dotCircle,
      { scale: 1, transformOrigin: '50% 50%', duration: 0.016, ease: GSAP_EASE.soft },
      t + 0.01
    );
    const split = splits[i];
    if (split) tl.from(split.lines, { yPercent: 110, duration: 0.03, stagger: 0.006, ease: GSAP_EASE.glide }, t + 0.008);
    // Compteur mécanique : 01 → 05
    if (i > 0 && i < 5) tl.to(roll, { yPercent: -20 * i, duration: 0.016, ease: GSAP_EASE.draw }, t);
  });
  // Temps d'arrêt sur la carte finale avant la sortie
  tl.set({}, {}, 1);
  camera();

  // Titre et introduction : ligne par ligne à l'arrivée de la section (une fois)
  let headSplit: SplitText | null = null;
  if (titleBelow) {
    headSplit = SplitText.create([title, intro], { type: 'lines', mask: 'lines' });
    gsap.set(headSplit.lines, { yPercent: 110 });
    ScrollTrigger.create({
      trigger: section,
      start: APPEAR_START,
      once: true,
      onEnter: () => gsap.to(headSplit!.lines, { yPercent: 0, duration: DURATION.reveal, ease: GSAP_EASE.glide, stagger: 0.08 }),
    });
  }
  requestScrollRefresh();

  // Clavier : le bouton final reçoit le focus pendant le parcours → fin du parcours, bouton visible
  const toEnd = () => {
    const st = tl.scrollTrigger;
    if (st && tl.progress() < 1) scrollToPosition(st.end, { immediate: true });
  };
  action?.addEventListener('focusin', toEnd);

  return () => {
    action?.removeEventListener('focusin', toEnd);
    splits.forEach((s) => s.revert());
    headSplit?.revert();
    track.style.removeProperty('--principles-lead');
    track.style.willChange = '';
    section.classList.remove('is-pinned');
  };
}

/** Téléphone, tablette, tactile : la colonne ; fil tracé au défilement, cartes par lots. */
function column(section: HTMLElement) {
  const track = section.querySelector<HTMLElement>('.principles-track');
  const path = track?.querySelector<SVGPathElement>('.principles-fil-path');
  if (!track || !path) return;
  const cards = gsap.utils.toArray<HTMLElement>('.principle-card', track);

  gsap.fromTo(
    path,
    { drawSVG: '0% 0%' },
    {
      drawSVG: '0% 100%',
      ease: GSAP_EASE.scrub,
      scrollTrigger: { trigger: track, start: 'top 75%', end: 'bottom 75%', scrub: 0.5, invalidateOnRefresh: true },
    }
  );

  // Seules les cartes encore sous l'écran sont masquées : rien de visible ne disparaît
  const below = cards.filter((card) => card.getBoundingClientRect().top >= window.innerHeight);
  if (below.length) {
    gsap.set(below, { opacity: 0, y: 16, scale: 0.96 });
    ScrollTrigger.batch(below, {
      start: APPEAR_START,
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: DURATION.appear,
          ease: GSAP_EASE.soft,
          stagger: 0.08,
          overwrite: true,
          clearProps: 'opacity,transform',
        }),
    });
  }
  // Une carte encore masquée qui reçoit le focus (bouton final) s'affiche aussitôt
  const onFocus = (event: FocusEvent) => {
    const card = (event.target as Element | null)?.closest?.('.principle-card');
    if (card) gsap.set(card, { opacity: 1, y: 0, scale: 1 });
  };
  track.addEventListener('focusin', onFocus);
  requestScrollRefresh();
  return () => track.removeEventListener('focusin', onFocus);
}
