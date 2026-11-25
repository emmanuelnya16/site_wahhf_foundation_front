import { useEffect, useRef, useState, type RefObject } from 'react';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { gsap, MQ, useGSAP } from '../../lib/gsap';
import { requestScrollRefresh } from '../../lib/afterFirstDisplay';
import { tracerRoute } from './route';

// Le même plugin que les parcours épinglés (Cinq principes, domaines), chargé à l'approche de la section
gsap.registerPlugin(MotionPathPlugin);

/** Rayon des roues à l'écran (px) : la distance donne le nombre de tours */
const RAYON = 8;
/** Hauteur de l'en-tête fixe et une marge (px) */
const SOUS_ENTETE = 96;
/** Un battement d'ailes tous les … px */
const BATTEMENT = 46;

/**
 * Le projet phare en mouvement (lot 11.4 ; ProjetPhare.tsx, route.ts) :
 * - le véhicule suit la route au rythme du défilement (MotionPath, scrub 0,8) ; roues et ailes tournent ou battent selon la
 *   distance parcourue : aucune boucle ;
 * - quand il passe un jalon, le panneau se lève depuis son pied (−90° → 0, petit rebond) et sa valeur roule ; il se recouche
 *   quand on remonte. Au bouton pause : sans rebond ni défilement de chiffres, le panneau est levé ou couché.
 * Ordinateur : route horizontale ; en dessous de 1 024 px : route verticale, le véhicule descend.
 * Mouvement réduit : ce fichier n'est pas chargé.
 */
export default function ProjetMotion({ scope, lang, paused }: { scope: RefObject<HTMLElement | null>; lang: string; paused: boolean }) {
  const [version, setVersion] = useState(0);
  const pausedRef = useRef(paused);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // Fin d'un redimensionnement, polices arrivées : nouvelle mise en place
  useEffect(() => {
    let w = window.innerWidth;
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        // Largeur seulement : la barre d'adresse d'un téléphone change la hauteur sans cesse
        if (window.innerWidth === w) return;
        w = window.innerWidth;
        setVersion((v) => v + 1);
      }, 250);
    };
    window.addEventListener('resize', onResize);
    let active = true;
    if (document.fonts && document.fonts.status !== 'loaded') document.fonts.ready.then(() => active && setVersion((v) => v + 1));
    return () => {
      active = false;
      window.removeEventListener('resize', onResize);
      window.clearTimeout(timer);
    };
  }, []);

  useGSAP(
    () => {
      const scene = scope.current;
      if (!scene) return;
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => animer(scene, pausedRef));
      return () => mm.revert();
    },
    { scope, dependencies: [lang, version], revertOnUpdate: true }
  );
  return null;
}

function animer(scene: HTMLElement, pausedRef: RefObject<boolean>) {
  const geo = tracerRoute(scene);
  const path = scene.querySelector<SVGPathElement>('.ac-route-bande');
  const vehicule = scene.querySelector<HTMLElement>('.ac-vehicule');
  if (!geo || !path || !vehicule) return;
  const panneaux = gsap.utils.toArray<HTMLElement>('.ac-panneau', scene);
  const roues = gsap.utils.toArray<SVGElement>('.ac-roue', scene);
  const [aileG, aileD] = gsap.utils.toArray<SVGElement>('.ac-aile', scene);
  const origine = geo.horizontale ? '50% 100%' : '0% 50%';
  // Fin du trajet (ordinateur) : le haut des panneaux est encore sous l'en-tête
  const hautScene = scene.getBoundingClientRect().top;
  const hautPanneaux = Math.min(...panneaux.map((p) => p.getBoundingClientRect().top - hautScene));
  const fin = Math.round(scene.offsetHeight - hautPanneaux + SOUS_ENTETE);
  scene.setAttribute('data-pret', '');

  gsap.set(panneaux, { transformOrigin: origine, rotation: -90, autoAlpha: 0 });
  const bandes = panneaux.map((p) =>
    gsap.utils.toArray<HTMLElement>('.ac-rouleau-bande', p).map((el) => ({ el, y: Number(getComputedStyle(el.parentElement!).getPropertyValue('--pas')) * parseFloat(getComputedStyle(el).fontSize) * 1.1 }))
  );
  const leves = panneaux.map(() => false);
  const passer = (i: number, leve: boolean) => {
    leves[i] = leve;
    const p = panneaux[i];
    if (pausedRef.current) {
      gsap.killTweensOf(p);
      gsap.set(p, { rotation: leve ? 0 : -90, autoAlpha: leve ? 1 : 0 });
      bandes[i].forEach(({ el }) => gsap.set(el, { y: 0 }));
      return;
    }
    if (!leve) {
      gsap.to(p, { rotation: -90, autoAlpha: 0, duration: 0.35, ease: 'power2.in', overwrite: true });
      return;
    }
    gsap.to(p, { rotation: 0, autoAlpha: 1, duration: 0.8, ease: 'back.out(1.7)', overwrite: true });
    bandes[i].forEach(({ el, y }, k) => gsap.fromTo(el, { y }, { y: 0, duration: 1.3, delay: 0.1 + k * 0.09, ease: 'power3.out', overwrite: true }));
  };

  const tourner = (part: number) => {
    const distance = part * geo.longueur;
    if (roues.length) gsap.set(roues, { rotation: (distance / RAYON) * (180 / Math.PI), transformOrigin: '50% 50%' });
    if (aileG && aileD) {
      const angle = Math.sin((distance / BATTEMENT) * Math.PI) * 24;
      gsap.set(aileG, { rotation: angle, transformOrigin: '100% 78%' });
      gsap.set(aileD, { rotation: -angle, transformOrigin: '0% 78%' });
    }
  };

  const tl = gsap.timeline({
    onUpdate: () => {
      const part = geo.depart + (geo.arrivee - geo.depart) * tl.progress();
      tourner(part);
      geo.jalons.forEach((t, i) => {
        const leve = part >= t - 0.004;
        if (leve !== leves[i]) passer(i, leve);
      });
    },
    scrollTrigger: {
      trigger: scene,
      // Ordinateur : la route est au bas de la scène, le trajet commence quand elle est entière à l'écran
      start: geo.horizontale ? 'top 50%' : 'top 68%',
      end: geo.horizontale ? `bottom ${fin}px` : 'bottom 70%',
      scrub: 0.8,
      invalidateOnRefresh: true,
    },
  });
  const trajet = { path, align: path, alignOrigin: [0.5, 1] as [number, number], autoRotate: geo.horizontale };
  gsap.set(vehicule, { motionPath: { ...trajet, start: geo.depart, end: geo.depart } });
  tl.to(vehicule, { motionPath: { ...trajet, start: geo.depart, end: geo.arrivee }, duration: 1, ease: 'none' });
  tourner(geo.depart);
  requestScrollRefresh();

  return () => {
    gsap.killTweensOf(panneaux);
    scene.removeAttribute('data-pret');
    tracerRoute(scene);
  };
}
