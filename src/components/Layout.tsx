import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import CookieBanner from './wahhf/CookieBanner';
import ReadingProgress from '../effects/ReadingProgress';
import LoadingCurtain from '../effects/LoadingCurtain';
import { routeKey } from '../effects/PageTransition';
import { scrollToElement, scrollToHash, scrollToTop } from '../lib/scroll';
import { startSmoothScroll } from '../lib/lenis';
import { ScrollTrigger } from '../lib/gsap';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname, hash } = useLocation();
  const isVkiPage = pathname === '/vkibusiness';

  // Défilement fluide (désactivé si « réduire les animations »)
  useEffect(() => startSmoothScroll(), []);

  // Bascule FR/EN : les textes changent de hauteur, les positions ScrollTrigger sont recalculées
  // (après le rendu des enfants, dont le re-découpage SplitText de la mission).
  const { i18n } = useTranslation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(frame);
  }, [i18n.language]);

  // Défilement à la navigation : haut de page, ou l'ancre demandée (/agir#benevole…).
  // Quand la page change vraiment (nouvelle clé de transition), c'est la fin du fondu de sortie
  // qui s'en charge (PageTransition), pour que l'ancienne page ne saute pas pendant qu'elle disparaît.
  const previousKey = useRef<string | null>(null);
  useEffect(() => {
    const key = routeKey(pathname);
    const pageChanged = previousKey.current !== null && previousKey.current !== key;
    previousKey.current = key;
    if (pageChanged) return;
    if (hash) return scrollToHash(hash);
    scrollToTop({ immediate: true });
  }, [pathname, hash]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isVkiPage
          ? 'bg-[#f4f6fa]'
          : 'bg-[#F5F1E8] dark:bg-[#0B1F18] text-[#1B1B18] dark:text-[#F5F1E8]'
      } selection:bg-[#E8A317] selection:text-[#1B1B18] relative`}
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
        className="focus-ring-double sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-[200] focus-visible:px-5 focus-visible:py-3 focus-visible:rounded-full focus-visible:bg-[#0F3D2E] focus-visible:text-[#F5F1E8] focus-visible:font-semibold"
      >
        Aller au contenu
      </a>

      {/* Rideau de chargement : accueil, une fois par session (rien en « réduire les animations ») */}
      {!isVkiPage && <LoadingCurtain />}

      {/* Barre de progression de lecture dorée (Motion useScroll, scaleX) */}
      {!isVkiPage && <ReadingProgress />}
      {!isVkiPage && <Navbar />}
      <main id="contenu" tabIndex={-1} className="flex-grow focus:outline-none">
        {children}
      </main>
      {!isVkiPage && <Footer />}
      {!isVkiPage && <WhatsAppButton />}
      {!isVkiPage && <CookieBanner />}
    </div>
  );
}
