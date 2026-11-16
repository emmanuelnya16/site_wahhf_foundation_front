import { CSSProperties, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { HERO_VIDEO, YOUTUBE_ORIGIN, heroVideoUrl } from '../../config/heroVideo';
import { onReducedMotionChange, prefersReducedMotion } from '../../lib/reducedMotion';
import { getConsent, onConsentChange } from '../../lib/consent';

/**
 * Vidéo YouTube en arrière-plan du hero.
 *
 * - L'image d'attente (dans Home) s'affiche d'abord ; l'iframe n'existe qu'après le chargement de la page
 *   et un moment d'inactivité, et seulement si : animations autorisées, pas d'économie de données ni de 2G/3G,
 *   écran d'au moins 768 px non tactile, cookies non essentiels non refusés.
 * - L'iframe reste invisible jusqu'à ce que le lecteur annonce la lecture (postMessage, état 1), puis fondu 0,8 s.
 *   Aucun message en 6 s, ou erreur (vidéo indisponible, intégration interdite) : iframe retirée, image seule.
 * - Pause quand le hero est quasi sorti de l'écran ou que l'onglet est caché ; bouton pause mémorisé pour la session.
 * - Une seule iframe à la fois ; tout est retiré au changement de page.
 */

type Phase = 'off' | 'waiting' | 'loading' | 'playing' | 'failed';

const PAUSE_KEY = 'wahhf_hero_video_paused';
const DESKTOP_QUERY = `(min-width: ${HERO_VIDEO.minWidth}px) and (hover: hover) and (pointer: fine)`;

/** Une seule iframe vidéo de hero sur tout le site. */
let activeOwner: symbol | null = null;

interface NetworkInformationLike extends EventTarget {
  saveData?: boolean;
  effectiveType?: string;
}
const connection = () => (navigator as Navigator & { connection?: NetworkInformationLike }).connection;

/** Toutes les conditions de chargement de la vidéo sont-elles réunies ? */
function videoAllowed(): boolean {
  if (!HERO_VIDEO.enabled || typeof window === 'undefined') return false;
  if (prefersReducedMotion()) return false;
  const c = connection();
  if (c && (c.saveData || ['slow-2g', '2g', '3g'].includes(c.effectiveType ?? ''))) return false;
  if (!window.matchMedia(DESKTOP_QUERY).matches || navigator.maxTouchPoints > 0) return false;
  const consent = getConsent();
  return HERO_VIDEO.consent === 'explicit' ? consent === 'all' : consent !== 'essential';
}

const readPaused = () => {
  try {
    return sessionStorage.getItem(PAUSE_KEY) === '1';
  } catch {
    return false;
  }
};
const writePaused = (paused: boolean) => {
  try {
    if (paused) sessionStorage.setItem(PAUSE_KEY, '1');
    else sessionStorage.removeItem(PAUSE_KEY);
  } catch {
    // session indisponible : le choix vaut pour cette page
  }
};

/** Après le chargement complet de la page, le délai minimal (config) et le premier moment d'inactivité. */
function afterLoadAndIdle(callback: () => void): () => void {
  let cancelled = false;
  let idleId: number | undefined;
  let timeoutId: number | undefined;
  const idle = () => {
    if (cancelled) return;
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(() => !cancelled && callback(), { timeout: 3000 });
    } else {
      timeoutId = window.setTimeout(() => !cancelled && callback(), 1500); // Safari : pas de requestIdleCallback
    }
  };
  const schedule = () => {
    if (cancelled) return;
    const wait = HERO_VIDEO.minDelayMs - performance.now();
    if (wait > 0) timeoutId = window.setTimeout(idle, wait);
    else idle();
  };
  if (document.readyState === 'complete') schedule();
  else window.addEventListener('load', schedule, { once: true });
  return () => {
    cancelled = true;
    window.removeEventListener('load', schedule);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    if (timeoutId !== undefined) window.clearTimeout(timeoutId);
  };
}

export interface HeroVideoState {
  phase: Phase;
  /** Vidéo affichée (lecture démarrée et non mise en pause par le visiteur) */
  visible: boolean;
  /** Bouton pause/lecture affiché */
  showToggle: boolean;
  userPaused: boolean;
  toggle: () => void;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  onIframeLoad: () => void;
}

export function useHeroVideo(sectionRef: RefObject<HTMLElement | null>): HeroVideoState {
  const [phase, setPhase] = useState<Phase>('off');
  const [userPaused, setUserPaused] = useState(readPaused);
  const [resuming, setResuming] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const owner = useRef(Symbol('hero-video'));
  const inView = useRef(true);
  const pageVisible = useRef(typeof document === 'undefined' || document.visibilityState === 'visible');
  const userPausedRef = useRef(userPaused);
  const phaseRef = useRef<Phase>(phase);
  phaseRef.current = phase;
  userPausedRef.current = userPaused;

  const command = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args, id: 1, channel: 'widget' }), YOUTUBE_ORIGIN);
  }, []);

  const release = useCallback(() => {
    if (activeOwner === owner.current) activeOwner = null;
  }, []);

  // 1. Conditions : évaluées au montage puis à chaque changement de réglage d'animation, de consentement
  //    ou de taille d'écran. La qualité de connexion n'est vérifiée qu'au moment de créer l'iframe :
  //    l'estimation du navigateur fluctue pendant les chargements (sinon : iframe créée puis retirée en boucle).
  useEffect(() => {
    const evaluate = () => {
      const ok = videoAllowed();
      setPhase((p) => {
        if (!ok) return p === 'failed' ? p : 'off';
        return p === 'off' ? 'waiting' : p;
      });
    };
    evaluate();
    const mq = window.matchMedia(DESKTOP_QUERY);
    mq.addEventListener('change', evaluate);
    const stopReduced = onReducedMotionChange(evaluate);
    const stopConsent = onConsentChange(evaluate);
    return () => {
      mq.removeEventListener('change', evaluate);
      stopReduced();
      stopConsent();
    };
  }, []);

  // 2. Création de l'iframe : après le chargement et un moment d'inactivité (ou tout de suite sur clic « Lire »)
  useEffect(() => {
    if (phase !== 'waiting' || userPaused) return;
    const start = () => {
      if (!videoAllowed() || (activeOwner && activeOwner !== owner.current)) return;
      activeOwner = owner.current;
      setPhase('loading');
    };
    if (resuming) {
      start();
      return;
    }
    return afterLoadAndIdle(start);
  }, [phase, userPaused, resuming]);

  // 3. Dialogue avec le lecteur (postMessage) + délais de secours + pause hors écran / onglet caché
  const handshake = useRef<number | undefined>(undefined);
  const readyTimer = useRef<number | undefined>(undefined);
  const playTimer = useRef<number | undefined>(undefined);
  const gotMessage = useRef(false);

  // Affichage : seulement pendant une lecture stable. YouTube affiche ses propres contrôles, son logo et
  // le titre quand la vidéo est en pause, se charge (tampon) ou vient de reprendre : on montre alors
  // l'image d'attente, et la vidéo ne revient en fondu qu'après quelques secondes de lecture continue.
  const [stable, setStable] = useState(false);
  const stableRef = useRef(false);
  const shownOnce = useRef(false);
  const showTimer = useRef<number | undefined>(undefined);
  const showPending = useRef(false);
  const hideTimer = useRef<number | undefined>(undefined);
  const setStableBoth = useCallback((value: boolean) => {
    stableRef.current = value;
    setStable(value);
  }, []);
  /** Lecture en cours : 1re fois, fondu immédiat ; après une interruption, fondu après RESUME_SHOW_DELAY. */
  const markPlaying = useCallback(() => {
    window.clearTimeout(hideTimer.current);
    // L'état « lecture » peut arriver plusieurs fois par seconde : le délai n'est lancé qu'une fois
    if (stableRef.current || showPending.current) return;
    if (!shownOnce.current) {
      shownOnce.current = true;
      setStableBoth(true);
    } else {
      showPending.current = true;
      showTimer.current = window.setTimeout(() => {
        showPending.current = false;
        setStableBoth(true);
      }, HERO_VIDEO.resumeShowDelayMs);
    }
  }, [setStableBoth]);
  /** Pause, chargement ou fin de boucle : retour à l'image (aussitôt si c'est nous qui mettons en pause). */
  const markInterrupted = useCallback(
    (immediate: boolean) => {
      window.clearTimeout(showTimer.current);
      showPending.current = false;
      if (!stableRef.current) return;
      window.clearTimeout(hideTimer.current);
      if (immediate) setStableBoth(false);
      else hideTimer.current = window.setTimeout(() => setStableBoth(false), 250);
    },
    [setStableBoth]
  );

  const fail = useCallback(() => {
    window.clearInterval(handshake.current);
    window.clearTimeout(readyTimer.current);
    window.clearTimeout(playTimer.current);
    release();
    setResuming(false);
    setPhase('failed');
  }, [release]);

  const shouldPlay = () => inView.current && pageVisible.current && !userPausedRef.current;

  /** Applique l'état voulu (lecture/pause) et arme le délai « lecture non démarrée » si besoin. */
  const apply = useCallback(() => {
    if (!iframeRef.current || !gotMessage.current) return;
    window.clearTimeout(playTimer.current);
    if (shouldPlay()) {
      command('playVideo');
      if (phaseRef.current !== 'playing') playTimer.current = window.setTimeout(fail, HERO_VIDEO.playTimeoutMs);
    } else {
      markInterrupted(true);
      command('pauseVideo');
    }
  }, [command, fail, markInterrupted]);

  useEffect(() => {
    if (phase !== 'loading' && phase !== 'playing') return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== YOUTUBE_ORIGIN || e.source !== iframeRef.current?.contentWindow || typeof e.data !== 'string') return;
      let data: { event?: string; info?: unknown };
      try {
        data = JSON.parse(e.data);
      } catch {
        return;
      }
      if (!gotMessage.current) {
        gotMessage.current = true;
        window.clearInterval(handshake.current);
        window.clearTimeout(readyTimer.current);
        apply();
      }
      const info = (data.info ?? {}) as { playerState?: number; currentTime?: number; videoData?: { errorCode?: unknown } };
      if (data.event === 'onError' || (data.event === 'infoDelivery' && info.videoData?.errorCode)) return fail();
      const state = data.event === 'onStateChange' ? (data.info as number) : data.event === 'infoDelivery' ? info.playerState : undefined;
      if (state === 1 && phaseRef.current !== 'playing') {
        window.clearTimeout(playTimer.current);
        setResuming(false);
        setPhase('playing');
        if (!shouldPlay()) command('pauseVideo');
      }
      if (state === 1 && shouldPlay()) markPlaying();
      else if (state !== undefined && state !== 1) markInterrupted(false);
      // Extrait (début/fin) : la boucle native de YouTube ignore « end » après le premier passage
      const { start, end } = HERO_VIDEO;
      if (end !== null && typeof info.currentTime === 'number' && info.currentTime >= end - 0.25) command('seekTo', [start ?? 0, true]);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [phase, apply, command, fail, markPlaying, markInterrupted]);

  // Délai « aucun message » armé à l'insertion de l'iframe
  useEffect(() => {
    if (phase !== 'loading') return;
    gotMessage.current = false;
    readyTimer.current = window.setTimeout(() => {
      if (!gotMessage.current) fail();
    }, HERO_VIDEO.readyTimeoutMs);
    return () => window.clearTimeout(readyTimer.current);
    // fail est stable (useCallback)
  }, [phase === 'loading', fail]); // eslint-disable-line react-hooks/exhaustive-deps

  /** L'iframe est chargée : on se présente au lecteur jusqu'à sa première réponse (protocole de l'API iframe). */
  const onIframeLoad = useCallback(() => {
    window.clearInterval(handshake.current);
    const hello = () =>
      iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }), YOUTUBE_ORIGIN);
    hello();
    handshake.current = window.setInterval(() => (gotMessage.current ? window.clearInterval(handshake.current) : hello()), 250);
  }, []);

  // Hors écran (hero visible à moins de 10 %) et onglet caché : pause ; retour : reprise
  useEffect(() => {
    if (phase !== 'loading' && phase !== 'playing') return;
    const section = sectionRef.current;
    const observer =
      section &&
      new IntersectionObserver(
        ([entry]) => {
          const next = entry.isIntersecting && entry.intersectionRatio >= 0.1;
          if (next !== inView.current) {
            inView.current = next;
            apply();
          }
        },
        { threshold: [0, 0.1, 0.25] }
      );
    if (section && observer) observer.observe(section);
    const onVisibility = () => {
      pageVisible.current = document.visibilityState === 'visible';
      apply();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [phase === 'loading' || phase === 'playing', sectionRef, apply]); // eslint-disable-line react-hooks/exhaustive-deps

  // Iframe retirée (conditions perdues, échec, démontage) : tout est débranché
  useEffect(() => {
    if (phase === 'loading' || phase === 'playing') return;
    window.clearInterval(handshake.current);
    window.clearTimeout(playTimer.current);
    window.clearTimeout(showTimer.current);
    window.clearTimeout(hideTimer.current);
    showPending.current = false;
    stableRef.current = false;
    shownOnce.current = false;
    setStable(false);
    release();
  }, [phase, release]);
  useEffect(
    () => () => {
      window.clearInterval(handshake.current);
      window.clearTimeout(readyTimer.current);
      window.clearTimeout(playTimer.current);
      window.clearTimeout(showTimer.current);
      window.clearTimeout(hideTimer.current);
      release();
    },
    [release]
  );

  // Bouton du visiteur (choix mémorisé pour la session)
  const toggle = useCallback(() => {
    const paused = !userPausedRef.current;
    userPausedRef.current = paused;
    writePaused(paused);
    setUserPaused(paused);
    if (paused) {
      setResuming(false);
      markInterrupted(true);
      command('pauseVideo');
    } else if (phaseRef.current === 'waiting') {
      setResuming(true); // jamais chargée (pause mémorisée) : on la charge maintenant
    } else {
      apply();
    }
  }, [apply, command, markInterrupted]);

  const active = phase === 'loading' || phase === 'playing';
  return {
    phase,
    visible: phase === 'playing' && !userPaused && stable,
    showToggle: phase === 'playing' || (userPaused && phase === 'waiting') || (resuming && active),
    userPaused,
    toggle,
    iframeRef,
    onIframeLoad,
  };
}

/** Calque vidéo (sous le voile du hero). Recadrage « cover » en CSS : voir .hero-video dans index.css. */
export function HeroVideoBackground({ video }: { video: HeroVideoState }) {
  if (video.phase !== 'loading' && video.phase !== 'playing') return null;
  const style = {
    '--video-ratio': HERO_VIDEO.ratio,
    '--video-zoom': HERO_VIDEO.zoom,
    '--video-render-scale': HERO_VIDEO.renderScale,
    // Apparition : fondu de 0,8 s ; disparition (pause, chargement) : rapide, pour ne jamais montrer l'interface YouTube
    transitionDuration: `${video.visible ? HERO_VIDEO.fadeMs : 300}ms`,
  } as CSSProperties;
  return (
    <div className="hero-video" data-visible={video.visible} style={style} aria-hidden="true" inert>
      <iframe
        ref={video.iframeRef}
        src={heroVideoUrl(window.location.origin)}
        title={HERO_VIDEO.title}
        tabIndex={-1}
        aria-hidden="true"
        allow="autoplay; encrypted-media"
        referrerPolicy="strict-origin-when-cross-origin"
        onLoad={video.onIframeLoad}
      />
    </div>
  );
}

/** Bouton « Mettre la vidéo en pause » / « Lire la vidéo » (mouvement automatique de plus de 5 s).
 *  Placé au-dessus de la bulle WhatsApp (fixe en bas à droite) : il ne touche ni le lien « Défiler »
 *  centré en bas, ni le bandeau de cookies (en bas à gauche). */
export function HeroVideoToggle({ video, pauseLabel, playLabel }: { video: HeroVideoState; pauseLabel: string; playLabel: string }) {
  if (!video.showToggle) return null;
  const Icon = video.userPaused ? Play : Pause;
  return (
    <button
      type="button"
      onClick={video.toggle}
      className="absolute bottom-24 right-6 z-20 inline-flex items-center gap-2 h-11 px-4 rounded-pill bg-foret/85 border border-or/50 text-creme text-xs font-semibold cursor-pointer transition-colors duration-(--dur-fast) hover:bg-or hover:text-encre focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or"
    >
      <Icon className="w-4 h-4" aria-hidden="true" fill="currentColor" />
      {video.userPaused ? playLabel : pauseLabel}
    </button>
  );
}
