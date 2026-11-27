import { lazy, Suspense, type ComponentType } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// framer-motion : le même paquet que motion/react (14.14), importé sans passer par le fichier d'entrée de motion/react,
// qui embarque toujours motion.div complet : le premier chargement n'a que m, AnimatePresence et LazyMotion (lot 7).
import { LazyMotion, MotionConfig } from 'framer-motion';
import { loadMotionFeatures } from './lib/motionEngine';
import Layout from './components/Layout';
import PageTransition, { routeKey } from './effects/PageTransition';
import ChunkErrorBoundary from './components/wahhf/ChunkErrorBoundary';
// L'ancien accueil (src/pages/Home.tsx) reste dans le code, mais / mène désormais à /accueil (26 novembre 2026).
import { bundlesReady } from './i18n';

/**
 * Page chargée à la demande (lot 7.10) : son JS, puis, en anglais ou en allemand, son paquet de textes. Elle s'affiche
 * directement dans la langue choisie, sans passer par le français.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function page<P = any>(load: () => Promise<{ default: ComponentType<P> }>) {
  return lazy(() => load().then(async (m) => {
    await bundlesReady();
    return m;
  }));
}

// Toutes les autres pages sont chargées à la demande.
const MobilityHub = page(() => import('./pages/MobilityHub'));
const LanguageAcademy = page(() => import('./pages/LanguageAcademy'));
// Pages de niveau : de vraies pages qui ouvrent sur le niveau (NIV-01, groupe 7.1)
const LanguageLevelPage = page(() => import('./pages/LanguageLevelPage'));
// Accompagnement vers l'Europe : un fichier par gabarit (page principale, fiche pays, guide), un morceau de JS chacun
const AccompagnementPage = page(() => import('./pages/accompagnement/AccompagnementPage'));
const CountryPage = page(() => import('./pages/accompagnement/CountryPage'));
const GuidePage = page(() => import('./pages/accompagnement/GuidePage'));
// « Éviter les arnaques » : une forme propre (groupe 7.4, ARN-04), plus le gabarit des guides
const ArnaquesPage = page(() => import('./pages/accompagnement/ArnaquesPage'));
const ApplyPage = page(() => import('./pages/ApplyPage'));
const DonatePage = page(() => import('./pages/DonatePage'));
// Nouvelle page Accueil (lot 11.1), à côté de l'accueil actuel (/) qui ne change pas
const AccueilPage = page(() => import('./pages/accueil/AccueilPage'));
// Programme de simulation numérique solidaire (lot 13)
const SimulationPage = page(() => import('./pages/simulation/SimulationPage'));
// Une page par fichier (src/pages/transversal/), un morceau de JS par page
const QuiSommesNousPage = page(() => import('./pages/transversal/QuiSommesNousPage'));
const PartenairesPage = page(() => import('./pages/transversal/PartenairesPage'));
const NosActionsPage = page(() => import('./pages/transversal/NosActionsPage'));
const NotreImpactPage = page(() => import('./pages/transversal/NotreImpactPage'));
const ActualitesPage = page(() => import('./pages/transversal/ActualitesPage'));
const EventsListPage = page(() => import('./pages/events/EventsListPage'));
const EventPage = page(() => import('./pages/events/EventPage'));
const AgirPage = page(() => import('./pages/transversal/AgirPage'));
const LegalTransparencyPage = page(() => import('./pages/transversal/LegalTransparencyPage'));

// Pages existantes conservées intégralement (Règle générale : ne rien supprimer)
const About = page(() => import('./pages/About'));
const Structure = page(() => import('./pages/Structure'));
const Catalogue = page(() => import('./pages/Catalogue'));
const Tarifs = page(() => import('./pages/Tarifs'));
const Realisation = page(() => import('./pages/Realisation'));
const Founders = page(() => import('./pages/Founders'));
const GalleryPage = page(() => import('./pages/GalleryPage'));
const NotFoundPage = page(() => import('./pages/NotFoundPage'));
const ContactPage = page(() => import('./pages/ContactPage'));
const VkiBusiness = page(() => import('./pages/VkiBusiness'));

/** Espace réservé pendant le chargement d'une page : garde la hauteur, aucun saut de mise en page. */
function PageFallback() {
  return <div className="min-h-screen" aria-busy="true" />;
}

/**
 * Routes enveloppées dans la transition de page (fondu d'entrée de 0,3 s, sans sortie ni attente : contrat §10,
 * ANIM-03). La transition est sous le Suspense : le fondu joue sur la page chargée, pas sur l'espace réservé.
 */
function AppRoutes() {
  const location = useLocation();
  return (
    // Filet : une page qui ne se télécharge pas affiche « Réessayer » au lieu d'une page blanche
    <ChunkErrorBoundary key={routeKey(location.pathname)} variant="page">
      <Suspense fallback={<PageFallback />}>
      <PageTransition transitionKey={routeKey(location.pathname)}>
      <Routes location={location}>
        {/* =================================================================
            ROUTES PRINCIPALES WAHHF FOUNDATION (PROMPT 1 & PROMPT 2)
           ================================================================= */}
        <Route path="/" element={<Navigate to="/accueil" replace />} />
        <Route path="/accueil" element={<AccueilPage />} />
        <Route path="/qui-sommes-nous" element={<QuiSommesNousPage />} />
        <Route path="/nos-actions" element={<NosActionsPage />} />
        <Route path="/simulation" element={<SimulationPage />} />
        <Route path="/notre-impact" element={<NotreImpactPage />} />
        <Route path="/galerie" element={<GalleryPage />} />
        <Route path="/actualites" element={<ActualitesPage />} />
        <Route path="/actualites/:slug" element={<ActualitesPage />} />
        {/* Lot 7.9 : événements (liste et fiche) */}
        <Route path="/evenements" element={<EventsListPage />} />
        <Route path="/evenements/:slug" element={<EventPage />} />
        <Route path="/partenaires" element={<PartenairesPage />} />
        <Route path="/agir" element={<AgirPage />} />
        <Route path="/faire-un-don" element={<DonatePage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* DOMAINE 06 : MOBILITÉ & LANGUES (ACADÉMIE D'ALLEMAND A1–C1 & EUROPE) */}
        <Route path="/mobilite-langues" element={<MobilityHub />} />
        <Route path="/mobilite-langues/academie" element={<LanguageAcademy />} />
        <Route path="/academie/:level" element={<LanguageLevelPage />} />
        <Route path="/mobilite-langues/accompagnement" element={<AccompagnementPage />} />
        <Route path="/accompagnement/pays/:countrySlug" element={<CountryPage />} />
        <Route path="/accompagnement/eviter-les-arnaques" element={<ArnaquesPage />} />
        <Route path="/accompagnement/:topicSlug" element={<GuidePage />} />
        <Route path="/candidater" element={<ApplyPage />} />

        {/* PAGES TRANSVERSALES & RGPD */}
        <Route path="/mentions-legales" element={<LegalTransparencyPage type="mentions" />} />
        <Route path="/confidentialite" element={<LegalTransparencyPage type="confidentialite" />} />
        <Route path="/transparence" element={<LegalTransparencyPage type="transparence" />} />

        {/* =================================================================
            ROUTES HISTORIQUES CONSERVÉES (RÈGLE : NE RIEN SUPPRIMER)
           ================================================================= */}
        <Route path="/le-groupe" element={<About />} />
        <Route path="/structure" element={<Structure />} />
        <Route path="/poles" element={<Catalogue />} />
        <Route path="/tarifs" element={<Tarifs />} />
        <Route path="/methode" element={<Realisation />} />
        <Route path="/fondateurs" element={<Founders />} />
        {/* /contact mène désormais à la page Contact WAHHF (ci-dessus). L'ancien formulaire de devis
            (src/pages/Contact.tsx) est conservé tel quel, sans route. */}
        <Route path="/a-propos" element={<Navigate to="/qui-sommes-nous" replace />} />
        <Route path="/catalogue" element={<Navigate to="/nos-actions" replace />} />
        <Route path="/realisations" element={<Navigate to="/notre-impact" replace />} />
        <Route path="/vkibusiness" element={<VkiBusiness />} />

        {/* Adresse inconnue : vraie page « introuvable » (noindex), l'adresse reste visible dans la barre */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </PageTransition>
      </Suspense>
    </ChunkErrorBoundary>
  );
}

// Motion allégé (contrat §10) : LazyMotion, moteur domAnimation chargé après le premier affichage (décision du 17/11,
// LCP mobile). Le menu mobile et la fenêtre du film ont un repli CSS tant qu'il n'est pas là, ou s'il ne se charge
// jamais (src/lib/motionEngine.ts). Les composants du premier affichage utilisent m.div ; les pages historiques, la
// visionneuse et les cartes gardent motion.div, qui embarque le reste dans leur propre fichier.

export default function App() {
  return (
    // « Réduire les animations » : Motion supprime les déplacements et ne garde que les fondus.
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures}>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </LazyMotion>
    </MotionConfig>
  );
}
