import { useEffect, useRef, useState, type RefObject } from 'react';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { SplitText } from 'gsap/SplitText';
import { gsap, ScrollTrigger, useGSAP, MQ, GSAP_EASE, DURATION, APPEAR_START } from '../../lib/gsap';
import { drawFil } from '../../components/principles/principlesFil';
import { scrollToPosition } from '../../lib/scroll';
import { requestScrollRefresh } from '../../lib/afterFirstDisplay';

// Les mêmes plugins que les Cinq principes, chargés à l'approche de la section (DomainesParcours)
gsap.registerPlugin(DrawSVGPlugin, MotionPathPlugin, SplitText);

/** Part de la timeline consacrée au trajet du point ; le reste : la carte finale reste à l'écran avant la sortie */
const TRAVEL = 0.92;
/** Le point reste à 40 % de la largeur de l'écran (caméra) */
const CAMERA_AT = 0.4;
/** Dévoilement de la photo (secondes) */
const DEVOILEMENT = 0.6;

/** Hauteur de l'en-tête fixe (--header-height) : la scène s'épingle juste dessous */
function headerHeight() {
  const root = document.documentElement;
  const raw = getComputedStyle(root).getPropertyValue('--header-height').trim();
  const value = parseFloat(raw) || 0;
  return raw.endsWith('rem') ? value * parseFloat(getComputedStyle(root).fontSize) : value;
}

/**
 * Les 6 domaines en mouvement (lot 11.3) : le travelling des Cinq principes (src/effects/motion/PrinciplesMotion.tsx,
 * qui ne change pas), recopié ici pour 6 cartes et leurs photos. Mêmes réglages, sauf 4 hauteurs d'écran (la hauteur de
 * la section, accueil.css) et l'épinglage : position sticky (accueil.css) au lieu du « pin » de ScrollTrigger, qui passe la scène en position fixed ;
 * Chrome y compte un décalage de mise en page de 0,92 à l'entrée et à la sortie. Avec sticky, CLS 0 et aucun saut.
 * La mise en page (colonne ou parcours) est celle de DomainesParcours ; ce fichier l'anime, où que l'on soit dans la page.
 * Ordinateur, en plus :
 * - à chaque repère, la photo se dévoile depuis l'encoche (clip-path, de gauche à droite, 0,6 s) et dézoome de 1,1 à 1 ;
 *   en remontant, elle se referme. Au bouton pause, elle est là d'emblée : seul le défilement pilote encore la scène ;
 * - la photo suivante commence à se charger quand une carte apparaît ;
 * - la photo rétrécit d'abord si l'écran est bas ; la piste n'est réduite qu'ensuite ;
 * - clavier : un lien qui reçoit le focus amène sa carte à l'écran (2.4.11).
 * Téléphone, tablette, écran bas : la colonne, fil tracé au défilement, cartes par lots.
 * Mouvement réduit : ce fichier n'est pas chargé.
 */
export default function DomainesMotion({ scope, lang, paused, epingle }: { scope: RefObject<HTMLElement | null>; lang: string; paused: boolean; epingle: boolean }) {
  const [version, setVersion] = useState(0);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

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
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => (epingle ? pinned(section, pausedRef) : column(section)));
      return () => mm.revert();
    },
    { scope, dependencies: [lang, version, epingle], revertOnUpdate: true }
  );
  return null;
}

/** Ordinateur : le travelling épinglé. Renvoie le nettoyage (appelé par gsap.matchMedia). */
function pinned(section: HTMLElement, pausedRef: RefObject<boolean>) {
  const pinEl = section.querySelector<HTMLElement>('.principles-pin');
  const viewport = section.querySelector<HTMLElement>('.principles-viewport');
  const track = section.querySelector<HTMLElement>('.principles-track');
  const title = section.querySelector<HTMLElement>('.principles-title');
  const intro = section.querySelector<HTMLElement>('.principles-intro');
  const roll = section.querySelector<HTMLElement>('.principles-counter-roll');
  const path = track?.querySelector<SVGPathElement>('.principles-fil-path');
  const dot = track?.querySelector<SVGGElement>('.principles-dot');
  const dotCircle = dot?.querySelector<SVGCircleElement>('circle');
  if (!pinEl || !viewport || !track || !title || !intro || !roll || !path || !dot || !dotCircle) return;
  const cards = gsap.utils.toArray<HTMLElement>('.principle-card', track);
  const total = cards.length - 1;
  const titleBelow = section.getBoundingClientRect().top >= window.innerHeight;

  const lead = title.getBoundingClientRect().left - section.getBoundingClientRect().left;
  track.style.setProperty('--principles-lead', `${Math.round(lead)}px`);
  // Écran bas : la bande de la photo rétrécit d'abord (accueil.css), mais une carte garde toujours son texte entier
  const avail = viewport.clientHeight;
  const decalage = parseFloat(getComputedStyle(section.querySelector('.principles-item[data-side="end"]')!).marginTop) || 0;
  const textCards = cards.slice(0, total);
  textCards.forEach((card) => card.style.setProperty('--ac-carte-max', '0px'));
  const needed = textCards.map((card) => card.scrollHeight);
  textCards.forEach((card, i) => card.style.setProperty('--ac-carte-max', `${Math.max(avail - decalage, needed[i])}px`));
  const geo = drawFil(track, 'row');
  if (!geo || !geo.length) return;

  const scale = Math.min(1, avail / geo.height);
  gsap.set(track, { transformOrigin: '0 0', scale, x: 0, y: Math.max(0, (avail - geo.height * scale) / 2) });
  const setX = gsap.quickSetter(track, 'x', 'px') as (value: number) => void;
  // Largeur lue une fois (une nouvelle mise en place suit tout redimensionnement) : rien à mesurer pendant le défilement
  const width = viewport.clientWidth;
  const minX = Math.min(0, width - geo.width * scale);
  const camera = () => {
    const dotX = (gsap.getProperty(dot, 'x') as number) || 0;
    setX(Math.max(minX, Math.min(0, width * CAMERA_AT - dotX * scale)));
  };

  const at = (i: number) => (geo.notchLengths[i] / geo.length) * TRAVEL;
  const splits = cards.slice(0, total).map((card) => SplitText.create(card.querySelectorAll('.principle-title, .principle-desc'), { type: 'lines', mask: 'lines' }));

  // Photos : dévoilement à chaque repère, et chargement de la suivante
  const images = cards.map((card) => card.querySelector<HTMLImageElement>('.ac-domaine-media img'));
  const load = (i: number) => {
    const img = images[i];
    if (img && img.loading !== 'eager') img.loading = 'eager';
  };
  load(0);
  const reveals = cards.map((card) => {
    const frame = card.querySelector<HTMLElement>('.ac-domaine-photo');
    const media = card.querySelector<HTMLElement>('.ac-domaine-media, .ac-domaine-icone');
    if (!frame || !media) return null;
    return gsap
      .timeline({ paused: true, defaults: { duration: DEVOILEMENT, ease: GSAP_EASE.soft } })
      .fromTo(frame, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0)
      .fromTo(media, { scale: 1.1 }, { scale: 1 }, 0);
  });
  const shown = cards.map(() => false);
  const photos = (time: number) => {
    for (let i = 0; i < total; i++) {
      const visible = time >= at(i);
      if (visible === shown[i]) continue;
      shown[i] = visible;
      if (visible) load(i + 1);
      const reveal = reveals[i];
      if (!reveal) continue;
      if (pausedRef.current) reveal.progress(visible ? 1 : 0).pause();
      else if (visible) reveal.play();
      else reveal.reverse();
    }
  };

  const tl = gsap.timeline({
    defaults: { ease: GSAP_EASE.scrub },
    onUpdate: () => {
      camera();
      photos(tl.time());
    },
    scrollTrigger: {
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
  gsap.set(dot, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5], end: 0 } });
  tl.to(dot, { motionPath: { path, align: path, alignOrigin: [0.5, 0.5] }, duration: TRAVEL }, 0);

  cards.forEach((card, i) => {
    const t = at(i);
    tl.fromTo(card, { opacity: 0, y: 24, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.035, ease: GSAP_EASE.soft }, Math.max(0, t - 0.004));
    tl.to(dotCircle, { scale: 1.4, transformOrigin: '50% 50%', duration: 0.01, ease: GSAP_EASE.soft }, t).to(
      dotCircle,
      { scale: 1, transformOrigin: '50% 50%', duration: 0.016, ease: GSAP_EASE.soft },
      t + 0.01
    );
    const split = splits[i];
    if (split) tl.from(split.lines, { yPercent: 110, duration: 0.03, stagger: 0.006, ease: GSAP_EASE.glide }, t + 0.008);
    // Compteur mécanique : 01 → 06
    if (i > 0 && i < total) tl.to(roll, { yPercent: (-100 / total) * i, duration: 0.016, ease: GSAP_EASE.draw }, t);
  });
  // Temps d'arrêt sur la carte finale avant la sortie
  tl.set({}, {}, 1);
  camera();
  // Tout est en place : les cartes, masquées jusque-là, n'obéissent plus qu'au parcours
  section.setAttribute('data-pret', '');

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

  // Clavier : le lien d'une carte reçoit le focus → le parcours va jusqu'à cette carte (à la souris, rien ne bouge)
  const onFocus = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (!target.matches(':focus-visible')) return;
    const i = cards.findIndex((card) => card.contains(target));
    const st = tl.scrollTrigger;
    if (i < 0 || !st) return;
    const progress = i === total ? 1 : Math.min(1, at(i) + 0.055);
    scrollToPosition(st.start + (st.end - st.start) * progress, { immediate: true });
  };
  track.addEventListener('focusin', onFocus);

  return () => {
    track.removeEventListener('focusin', onFocus);
    reveals.forEach((reveal) => reveal?.kill());
    splits.forEach((s) => s.revert());
    headSplit?.revert();
    track.style.removeProperty('--principles-lead');
    textCards.forEach((card) => card.style.removeProperty('--ac-carte-max'));
    track.style.willChange = '';
    section.removeAttribute('data-pret');
  };
}

/** Téléphone, tablette, tactile : la colonne ; fil tracé au défilement, cartes par lots (comme les Cinq principes). */
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
  const tops = cards.map((card) => card.getBoundingClientRect().top);
  const below = cards.filter((_, i) => tops[i] >= window.innerHeight);
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
  // Une carte encore masquée qui reçoit le focus s'affiche aussitôt
  const onFocus = (event: FocusEvent) => {
    const card = (event.target as Element | null)?.closest?.('.principle-card');
    if (card) gsap.set(card, { opacity: 1, y: 0, scale: 1 });
  };
  track.addEventListener('focusin', onFocus);
  requestScrollRefresh();
  return () => track.removeEventListener('focusin', onFocus);
}
