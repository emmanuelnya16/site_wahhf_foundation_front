import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
// framer-motion : le même paquet que motion/react (14.14), importé sans passer par le fichier d'entrée de motion/react,
// qui embarque toujours motion.div complet : le premier chargement n'a que m, AnimatePresence et LazyMotion (lot 7).
import { LazyMotion, MotionConfig } from 'framer-motion';
import { loadMotionFeatures } from './lib/motionEngine';
import Layout from './components/Layout';
import PageTransition, { routeKey } from './effects/PageTransition';
import ChunkErrorBoundary from './components/wahhf/ChunkErrorBoundary';
// L'accueil reste dans le fichier principal (page d'entrée la plus fréquente : pas d'aller-retour réseau).
import Home from './pages/Home';

// Toutes les autres pages sont chargées à la demande.
const MobilityHub = lazy(() => import('./pages/MobilityHub'));
const LanguageAcademy = lazy(() => import('./pages/LanguageAcademy'));
const EuropeSupport = lazy(() => import('./pages/EuropeSupport'));
const ApplyPage = lazy(() => import('./pages/ApplyPage'));
const DonatePage = lazy(() => import('./pages/DonatePage'));
const transversal = () => import('./pages/TransversalPages');
const QuiSommesNousPage = lazy(() => transversal().then((m) => ({ default: m.QuiSommesNousPage })));
const PartenairesPage = lazy(() => transversal().then((m) => ({ default: m.PartenairesPage })));
const NosActionsPage = lazy(() => transversal().then((m) => ({ default: m.NosActionsPage })));
const NotreImpactPage = lazy(() => transversal().then((m) => ({ default: m.NotreImpactPage })));
const ActualitesPage = lazy(() => transversal().then((m) => ({ default: m.ActualitesPage })));
const AgirPage = lazy(() => transversal().then((m) => ({ default: m.AgirPage })));
const LegalTransparencyPage = lazy(() =>
  transversal().then((m) => ({ default: m.LegalTransparencyPage }))
);

// Pages existantes conservées intégralement (Règle générale : ne rien supprimer)
const About = lazy(() => import('./pages/About'));
const Structure = lazy(() => import('./pages/Structure'));
const Catalogue = lazy(() => import('./pages/Catalogue'));
const Tarifs = lazy(() => import('./pages/Tarifs'));
const Realisation = lazy(() => import('./pages/Realisation'));
const Founders = lazy(() => import('./pages/Founders'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const VkiBusiness = lazy(() => import('./pages/VkiBusiness'));

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
        <Route path="/" element={<Home />} />
        <Route path="/qui-sommes-nous" element={<QuiSommesNousPage />} />
        <Route path="/nos-actions" element={<NosActionsPage />} />
        <Route path="/notre-impact" element={<NotreImpactPage />} />
        <Route path="/galerie" element={<GalleryPage />} />
        <Route path="/actualites" element={<ActualitesPage />} />
        <Route path="/actualites/:slug" element={<ActualitesPage />} />
        <Route path="/partenaires" element={<PartenairesPage />} />
        <Route path="/agir" element={<AgirPage />} />
        <Route path="/faire-un-don" element={<DonatePage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* DOMAINE 06 : MOBILITÉ & LANGUES (ACADÉMIE D'ALLEMAND A1–C1 & EUROPE) */}
        <Route path="/mobilite-langues" element={<MobilityHub />} />
        <Route path="/mobilite-langues/academie" element={<LanguageAcademy />} />
        <Route path="/academie/:level" element={<LanguageAcademy />} />
        <Route path="/mobilite-langues/accompagnement" element={<EuropeSupport />} />
        <Route path="/accompagnement/pays/:countrySlug" element={<EuropeSupport />} />
        <Route path="/accompagnement/:topicSlug" element={<EuropeSupport />} />
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
