import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CookieBanner from './wahhf/CookieBanner';
import ReadingProgress from '../effects/ReadingProgress';
import { scrollToElement, scrollToHash, scrollToTop } from '../lib/scroll';
import { afterFirstDisplay, requestScrollRefresh } from '../lib/afterFirstDisplay';
import { AfterFirstDisplay, RevealBatch } from '../effects/DeferredMotion';
import { useTranslation } from 'react-i18next';

/** Défilement fluide (Lenis) : ordinateur à souris seulement, jamais en mouvement réduit (contrat §10, lot 7). */
const SMOOTH_SCROLL_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';

interface LayoutProps {
  children: ReactNode;
}

const LEGACY_PATHS = new Set(['/le-groupe', '/structure', '/poles', '/tarifs', '/methode', '/fondateurs', '/vkibusiness']);

export default function Layout({ children }: LayoutProps) {
  const { pathname, hash } = useLocation();
  const isVkiPage = pathname === '/vkibusiness';
  // Pages historiques IROKO : elles gardent DM Sans et Fraunces (index.css, .legacy-fonts)
  const isLegacyPage = LEGACY_PATHS.has(pathname);
  // Article d'actualité (/actualites/:slug) : seule page qui garde la barre de lecture
  const isArticlePage = /^\/actualites\/[^/]+\/?$/.test(pathname);
  const mainRef = useRef<HTMLElement>(null);

  // Défilement fluide : Lenis (et GSAP) chargés après le premier affichage, seulement sur ordinateur à souris ;
  // arrêté aussitôt si le visiteur passe en mouvement réduit ou au tactile, relancé s'il en revient.
  useEffect(() => {
    const query = window.matchMedia(SMOOTH_SCROLL_QUERY);
    let stop: (() => void) | null = null;
    let loading = false;
    let disposed = false;
    const sync = () => {
      if (disposed) return;
      if (query.matches && !stop && !loading) {
        loading = true;
        import('../lib/lenis')
          .then(({ startSmoothScroll }) => {
            loading = false;
            if (!disposed && query.matches && !stop) stop = startSmoothScroll();
          })
          .catch(() => {
            loading = false;
          });
      } else if (!query.matches && stop) {
        stop();
        stop = null;
      }
    };
    afterFirstDisplay().then(sync);
    query.addEventListener('change', sync);
    return () => {
      disposed = true;
      query.removeEventListener('change', sync);
      stop?.();
    };
  }, []);

  // Bascule FR/EN : les textes changent de hauteur, les positions ScrollTrigger sont recalculées (si GSAP est chargé).
  const { i18n } = useTranslation();
  useEffect(() => {
    const frame = requestAnimationFrame(requestScrollRefresh);
    return () => cancelAnimationFrame(frame);
  }, [i18n.language]);

  // Défilement à la navigation : haut de page, ou l'ancre demandée (/agir#benevole…). Plus de fondu de sortie à
  // attendre (contrat §10, ANIM-03) : la nouvelle page s'affiche en haut, ou à son ancre, tout de suite.
  useEffect(() => {
    if (hash) return scrollToHash(hash);
    scrollToTop({ immediate: true });
  }, [pathname, hash]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isVkiPage
          ? 'bg-vki-brume'
          : 'bg-surface text-text'
      } selection:bg-or selection:text-v1-encre relative`}
    >
      {/* Lien d'évitement : premier arrêt clavier, visible seulement quand il reçoit le focus */}
      <a
        href="#contenu"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById('contenu');
          if (!main) return;
          main.focus({ preventScroll: true });
          scrollToElement(main, { immediate: true });
        }}
        className="focus-ring-double sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-(--z-skip) focus-visible:px-5 focus-visible:py-3 focus-visible:rounded-pill focus-visible:bg-nuit focus-visible:text-creme focus-visible:font-semibold"
      >
        Aller au contenu
      </a>

      {/* Rideau de chargement retiré (PERF-01) : il retardait l'affichage du hero d'environ 1,4 s sur mobile.
          Le composant reste disponible dans src/effects/LoadingCurtain.tsx. */}

      {/* Barre de progression de lecture : articles seulement (décision du 16/11), en forêt */}
      {isArticlePage && <ReadingProgress />}
      {!isVkiPage && <Navbar />}
      <main ref={mainRef} id="contenu" tabIndex={-1} className={`flex-grow focus:outline-none${isLegacyPage ? ' legacy-fonts' : ''}`}>
        {children}
      </main>
      {/* Apparitions groupées des listes, cartes et photos (contrat §10 ; GSAP après le premier affichage) */}
      <AfterFirstDisplay>
        <RevealBatch scope={mainRef} pathname={pathname} />
      </AfterFirstDisplay>
      {!isVkiPage && <Footer />}
      {!isVkiPage && <WhatsAppButton />}
      {!isVkiPage && <CookieBanner />}
    </div>
  );
}
