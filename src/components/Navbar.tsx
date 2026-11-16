import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ChevronDown,
  Search,
  Sun,
  Moon,
  Menu,
  X,
  GraduationCap,
  HeartPulse,
  Briefcase,
  Sprout,
  Scale,
  Globe2,
} from 'lucide-react';
import { DOMAINS_DATA, WAHHF_LOGO_URL, COUNTRIES_DATA, GERMAN_LEVELS_DATA } from '../services/api';
import { DonateButton } from './wahhf/Buttons';
import { useDialog } from '../lib/useDialog';
import { switchTheme } from '../effects/themeTransition';
import { EASE_OUT, EASE_SCREEN, DURATION } from '../lib/motionTokens';

const DOMAIN_ICONS: Record<string, typeof GraduationCap> = {
  education: GraduationCap,
  sante: HeartPulse,
  entrepreneuriat: Briefcase,
  environnement: Sprout,
  'droits-inclusion': Scale,
  'mobilite-langues': Globe2,
};

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [hiddenOnScroll, setHiddenOnScroll] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Le script de index.html a déjà posé (ou non) la classe .dark avant le rendu : on part de cet état.
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const touchStartY = useRef<number | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileCloseRef = useRef<HTMLButtonElement>(null);
  const searchPanelRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Menu mobile et recherche : Échap, focus gardé à l'intérieur puis rendu, page figée dessous
  const burgerRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);
  useDialog(mobileOpen, mobileMenuRef, () => setMobileOpen(false), {
    initialFocusRef: mobileCloseRef,
    returnFocusRef: burgerRef,
  });
  useDialog(searchOpen, searchPanelRef, () => setSearchOpen(false), {
    initialFocusRef: searchInputRef,
    returnFocusRef: searchButtonRef,
  });

  // Méga-menu : Échap le ferme
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      // Le panneau va disparaître : si le focus y était, il revient sur le bouton « Nos actions »
      const focusInPanel = !!megaRef.current?.contains(document.activeElement) && document.activeElement !== megaTriggerRef.current;
      setMegaOpen(false);
      if (focusInPanel) megaTriggerRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [megaOpen]);

  // Initialisation du thème : Clair par défaut, respecte prefers-color-scheme uniquement à la 1re visite
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('wahhf_theme');
      const visitedBefore = localStorage.getItem('wahhf_visited_theme');

      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      } else if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
        setIsDark(false);
      } else if (!visitedBefore) {
        // Première visite : on vérifie prefers-color-scheme, sinon clair par défaut
        const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
        localStorage.setItem('wahhf_visited_theme', 'true');
        if (prefersDark) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('wahhf_theme', 'dark');
          setIsDark(true);
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('wahhf_theme', 'light');
          setIsDark(false);
        }
      }
    } catch {
      // Fallback mode clair
    }
  }, []);

  // Bascule en fondu enchaîné (View Transitions, 0,5 s), repli instantané sans flash
  const toggleTheme = () => {
    const nextDark = !isDark;
    switchTheme(() => {
      setIsDark(nextDark);
      if (nextDark) {
        document.documentElement.classList.add('dark');
        try {
          localStorage.setItem('wahhf_theme', 'dark');
        } catch {}
      } else {
        document.documentElement.classList.remove('dark');
        try {
          localStorage.setItem('wahhf_theme', 'light');
        } catch {}
      }
    });
  };

  // Se CACHE quand on défile vers le bas et RÉAPPARAÎT quand on remonte (transition 0,4 s).
  // Jamais caché quand un menu est ouvert ou que le focus clavier est dans le header.
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const focusInHeader = !!headerRef.current?.contains(document.activeElement);
      if (currentY > 110 && currentY > lastScrollY.current + 8 && !megaOpen && !mobileOpen && !searchOpen && !focusInHeader) {
        setHiddenOnScroll(true);
      } else if (currentY < lastScrollY.current - 6 || currentY <= 80) {
        setHiddenOnScroll(false);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [megaOpen, mobileOpen, searchOpen]);

  // Fermer les menus au changement de route
  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Fermer le méga-menu au clic extérieur
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLanguage = (lang: 'fr' | 'en') => {
    i18n.changeLanguage(lang);
  };

  // Résultats de recherche rapide
  const searchResults = searchQuery.trim()
    ? [
        ...DOMAINS_DATA.filter(
          (d) =>
            d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((d) => ({ label: `Domaine : ${d.title}`, to: d.link })),
        ...GERMAN_LEVELS_DATA.filter(
          (l) =>
            l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.level.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((l) => ({ label: `Cours d'allemand : ${l.title}`, to: `/academie/${l.slug}` })),
        ...COUNTRIES_DATA.filter((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((c) => ({ label: `Pays accompagné : ${c.flag} ${c.name}`, to: `/accompagnement/pays/${c.slug}` })),
        ...(/galer|photo|vid[ée]o|image/i.test(searchQuery) ? [{ label: 'Galerie photo & vidéo', to: '/galerie' }] : []),
      ].slice(0, 6)
    : [];

  return (
    <>
      <header
        ref={headerRef}
        onFocusCapture={() => setHiddenOnScroll(false)}
        className={`fixed top-3 sm:top-4 left-0 right-0 z-(--z-header) px-3 sm:px-6 transition-transform duration-[400ms] ease-reveal ${
          hiddenOnScroll ? '-translate-y-28' : 'translate-y-0'
        }`}
      >
        <div
          ref={megaRef}
          className="max-w-7xl mx-auto rounded-pill bg-white/95 dark:bg-v1-sous-bois/95 backdrop-blur-md border border-nuit/12 dark:border-creme/15 shadow-overlay px-3.5 sm:px-6 py-2.5 flex items-center justify-between gap-2"
        >
          {/* Gauche : Logo WAHHF */}
          <Link
            to="/"
            className="flex items-center gap-2.5 min-w-0 rounded-pill"
            aria-label="WAHHF Foundation — Accueil"
          >
            <img
              src={WAHHF_LOGO_URL}
              alt="Logo WAHHF Foundation"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-11 sm:h-11 object-contain rounded-pill bg-white p-0.5 shadow-xs"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-serif font-normal text-base sm:text-lg leading-none text-nuit dark:text-creme tracking-tight whitespace-nowrap">
                WAHHF <span className="hidden min-[360px]:inline text-accent-or font-sans text-xs font-semibold uppercase tracking-widest">Foundation</span>
              </span>
              <span className="text-[10px] text-text-muted hidden lg:inline whitespace-nowrap">
                {t('brand.branch')}
              </span>
            </div>
          </Link>

          {/* Centre : Menu principal (6 entrées) */}
          <nav aria-label="Navigation principale" className="hidden xl:flex items-center gap-2">
            <Link
              to="/qui-sommes-nous"
              className={`px-3 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
                location.pathname === '/qui-sommes-nous'
                  ? 'bg-nuit/10 dark:bg-creme/15 text-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              {t('nav.about')}
            </Link>

            {/* Entrée 2 : Nos actions (ouvre le méga-menu des 6 domaines) */}
            <div className="relative">
              <button
                ref={megaTriggerRef}
                type="button"
                onClick={() => setMegaOpen((prev) => !prev)}
                aria-expanded={megaOpen}
                className={`inline-flex items-center gap-1 px-3 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  location.pathname.startsWith('/nos-actions') ||
                  location.pathname.startsWith('/mobilite-langues') ||
                  location.pathname.startsWith('/academie') ||
                  location.pathname.startsWith('/accompagnement')
                    ? 'bg-nuit/10 dark:bg-creme/15 text-accent'
                    : 'text-text hover:text-accent'
                }`}
              >
                <span>{t('nav.actions')}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${megaOpen ? 'rotate-180 text-or' : ''}`}
                />
              </button>
            </div>

            <Link
              to="/notre-impact"
              className={`px-3 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
                location.pathname === '/notre-impact'
                  ? 'bg-nuit/10 dark:bg-creme/15 text-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              {t('nav.impact')}
            </Link>

            <Link
              to="/actualites"
              className={`px-3 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
                location.pathname.startsWith('/actualites')
                  ? 'bg-nuit/10 dark:bg-creme/15 text-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              {t('nav.news')}
            </Link>

            <Link
              to="/agir"
              className={`px-3 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
                location.pathname === '/agir'
                  ? 'bg-nuit/10 dark:bg-creme/15 text-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              {t('nav.act')}
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-colors ${
                location.pathname === '/contact'
                  ? 'bg-nuit/10 dark:bg-creme/15 text-accent'
                  : 'text-text hover:text-accent'
              }`}
            >
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Droite : Langue (FR / EN), Recherche, Thème, Bouton Faire un don (rouge), Burger */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Sélecteur de langue FR / EN */}
            <div
              role="group"
              aria-label="Sélecteur de langue"
              className="hidden md:inline-flex items-center rounded-pill bg-surface-inset p-0.5 border border-nuit/10 dark:border-creme/15 text-xs"
            >
              <button
                type="button"
                onClick={() => switchLanguage('fr')}
                className={`px-2.5 py-1 rounded-pill font-semibold transition-colors cursor-pointer ${
                  i18n.language.startsWith('fr')
                    ? 'bg-accent text-creme dark:text-v1-encre'
                    : 'text-v1-encre/70 dark:text-creme/70'
                }`}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('en')}
                className={`px-2.5 py-1 rounded-pill font-semibold transition-colors cursor-pointer ${
                  i18n.language.startsWith('en')
                    ? 'bg-accent text-creme dark:text-v1-encre'
                    : 'text-v1-encre/70 dark:text-creme/70'
                }`}
              >
                EN
              </button>
            </div>

            {/* Recherche */}
            <button
              ref={searchButtonRef}
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-expanded={searchOpen}
              aria-label="Rechercher sur le site"
              className="w-9 h-9 rounded-pill flex items-center justify-center text-text hover:bg-nuit/10 dark:hover:bg-creme/10 transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Interrupteur de thème Clair / Sombre */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? t('nav.themeLight') : t('nav.themeDark')}
              title={isDark ? t('nav.themeLight') : t('nav.themeDark')}
              className="hidden sm:flex w-9 h-9 rounded-pill items-center justify-center text-v1-encre dark:text-or hover:bg-nuit/10 dark:hover:bg-creme/10 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* 6e entrée / Bouton « Faire un don » (token rouge) */}
            <div className="hidden sm:block">
              <DonateButton size="sm" className="whitespace-nowrap">{t('nav.donate')}</DonateButton>
            </div>

            {/* Menu Burger (Mobile & Tablette) */}
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Ouvrir le menu principal"
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              className="xl:hidden w-10 h-10 shrink-0 rounded-pill bg-action text-on-action flex items-center justify-center cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Méga-menu « Nos actions » (6 domaines) */}
          {megaOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 rounded-card bg-surface-raised border border-border shadow-2xl p-6 sm:p-8 z-50">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-meta text-text-secondary">
                      Les 6 domaines d’action de WAHHF Foundation
                    </span>
                    <Link
                      to="/nos-actions"
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
                    >
                      Voir la vue d’ensemble
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DOMAINS_DATA.map((dom) => {
                      const Icon = DOMAIN_ICONS[dom.id] || Globe2;
                      return (
                        <Link
                          key={dom.id}
                          to={dom.link}
                          className="group flex items-start gap-3.5 p-3.5 rounded-2xl hover:bg-creme dark:hover:bg-nuit/60 border border-transparent hover:border-or/30 transition"
                        >
                          <div className="w-10 h-10 rounded-inner bg-nuit text-or flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-serif font-normal text-base text-text group-hover:text-accent">
                                {dom.title}
                              </p>
                            </div>
                            <p className="text-xs text-v1-encre/70 dark:text-creme/70 line-clamp-2 mt-0.5">
                              {dom.shortDesc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Encart direct Mobilité & Langues */}
                <div className="surface-green lg:col-span-4 rounded-2xl bg-nuit text-creme p-6 flex flex-col justify-between border border-or/30">
                  <div className="space-y-3">
                    <h3 className="font-serif font-normal text-xl text-creme">
                      Mobilité & Langues : Allemand (A1–C1) & Europe
                    </h3>
                    <p className="text-xs text-creme/80 leading-relaxed">
                      Accompagnement gratuit aux cours d’allemand et orientation vérifiée vers 10 pays européens, financé par IROKO et nos donateurs.
                    </p>
                    <div className="pt-2 space-y-1.5 text-xs">
                      <Link
                        to="/mobilite-langues/academie"
                        className="flex items-center justify-between py-1.5 px-3 rounded-inner bg-white/10 hover:bg-white/15 text-creme"
                      >
                        <span>Académie de langues (A1 à C1)</span>
                      </Link>
                      <Link
                        to="/mobilite-langues/accompagnement"
                        className="flex items-center justify-between py-1.5 px-3 rounded-inner bg-white/10 hover:bg-white/15 text-creme"
                      >
                        <span>Accompagnement vers 10 pays</span>
                      </Link>
                      <Link
                        to="/accompagnement/eviter-les-arnaques"
                        className="flex items-center justify-between py-1.5 px-3 rounded-inner bg-or/20 hover:bg-or/30 text-gold-on-green font-medium"
                      >
                        <span>Vigilance : Éviter les arnaques</span>
                      </Link>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between">
                    <Link
                      to="/candidater"
                      className="text-xs font-semibold text-or hover:underline flex items-center gap-1"
                    >
                      Candidater gratuitement
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Barre de recherche déroulante */}
        {searchOpen && (
          <div
            ref={searchPanelRef}
            role="search"
            className="max-w-2xl mx-auto mt-2 rounded-card bg-surface-raised border border-border shadow-xl p-4"
          >
            <div className="flex items-center gap-3">
              <Search aria-hidden="true" className="w-5 h-5 text-or shrink-0" />
              <input
                ref={searchInputRef}
                aria-label={t('nav.searchPlaceholder')}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="w-full bg-transparent text-sm sm:text-base text-text placeholder-v1-encre/50 dark:placeholder-creme/50"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Fermer la recherche"
                className="p-1.5 rounded-pill hover:bg-nuit/10 text-text cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {searchResults.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border-subtle space-y-1">
                {searchResults.map((res) => (
                  <button
                    key={res.to}
                    type="button"
                    onClick={() => {
                      navigate(res.to);
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2 rounded-inner hover:bg-surface-inset text-sm text-text flex items-center justify-between cursor-pointer"
                  >
                    <span>{res.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Menu Mobile Plein Écran (fermeture au geste & grands liens) */}
      {/* Se déroule de haut en bas (clip-path, 0,7 s) ; simple fondu si « réduire les animations » */}
      <AnimatePresence>
      {mobileOpen && (
        <motion.div
          key="menu-mobile"
          id="menu-mobile"
          ref={mobileMenuRef}
          initial={reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={
            reduceMotion
              ? { opacity: 1, transition: { duration: 0.2 } }
              : { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: DURATION.screen, ease: EASE_SCREEN } }
          }
          exit={
            reduceMotion
              ? { opacity: 0, transition: { duration: 0.15 } }
              : { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.6, ease: EASE_SCREEN } }
          }
          role="dialog"
          aria-modal="true"
          aria-label="Menu mobile WAHHF Foundation"
          tabIndex={-1}
          data-lenis-prevent
          onTouchStart={(e) => {
            // Geste armé seulement si le menu est déjà en bas : sinon le glissé sert à faire défiler le menu
            const panel = e.currentTarget;
            const atBottom = panel.scrollTop + panel.clientHeight >= panel.scrollHeight - 1;
            touchStartY.current = atBottom ? e.touches[0].clientY : null;
          }}
          onTouchEnd={(e) => {
            if (touchStartY.current !== null) {
              const deltaY = e.changedTouches[0].clientY - touchStartY.current;
              if (deltaY < -70) {
                setMobileOpen(false);
              }
            }
          }}
          className="surface-green fixed inset-0 z-(--z-menu) bg-nuit text-creme flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-6 border-b border-white/15">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <img
                src={WAHHF_LOGO_URL}
                alt="Logo WAHHF Foundation"
                className="w-11 h-11 object-contain rounded-pill bg-white p-0.5"
              />
              <div>
                <p className="font-serif text-lg text-creme">WAHHF Foundation</p>
                <p className="text-xs text-or">{t('brand.branch')}</p>
              </div>
            </Link>

            <button
              ref={mobileCloseRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="w-11 h-11 rounded-pill bg-white/10 text-creme flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <motion.nav
            aria-label="Navigation principale (mobile)"
            className="py-6 space-y-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: EASE_OUT } }}
          >
            <Link
              to="/qui-sommes-nous"
              className="block font-serif text-2xl sm:text-3xl text-creme hover:text-or py-1"
            >
              {t('nav.about')}
            </Link>

            <div className="space-y-2">
              <Link
                to="/nos-actions"
                className="block font-serif text-2xl sm:text-3xl text-creme hover:text-or py-1"
              >
                {t('nav.actions')} (6 domaines)
              </Link>
              <div className="pl-4 border-l-2 border-or/40 grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {DOMAINS_DATA.map((d) => (
                  <Link
                    key={d.id}
                    to={d.link}
                    className="text-sm text-creme/85 hover:text-or py-1 flex items-center gap-2"
                  >
                    <span>{d.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/notre-impact"
              className="block font-serif text-2xl sm:text-3xl text-creme hover:text-or py-1"
            >
              {t('nav.impact')}
            </Link>

            <Link
              to="/actualites"
              className="block font-serif text-2xl sm:text-3xl text-creme hover:text-or py-1"
            >
              {t('nav.news')}
            </Link>

            <Link
              to="/agir"
              className="block font-serif text-2xl sm:text-3xl text-creme hover:text-or py-1"
            >
              {t('nav.act')}
            </Link>

            <Link
              to="/contact"
              className="block font-serif text-2xl sm:text-3xl text-creme hover:text-or py-1"
            >
              {t('nav.contact')}
            </Link>

            <Link
              to="/candidater"
              className="block font-serif text-2xl sm:text-3xl text-or py-1"
            >
              Candidater (Cours & Europe — Gratuit)
            </Link>
          </motion.nav>

          <div className="pt-6 border-t border-white/15 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchLanguage('fr')}
                  className={`px-3 py-1.5 rounded-pill text-xs font-semibold ${
                    i18n.language.startsWith('fr') ? 'bg-or text-v1-encre' : 'bg-white/10 text-white'
                  }`}
                >
                  Français (FR)
                </button>
                <button
                  type="button"
                  onClick={() => switchLanguage('en')}
                  className={`px-3 py-1.5 rounded-pill text-xs font-semibold ${
                    i18n.language.startsWith('en') ? 'bg-or text-v1-encre' : 'bg-white/10 text-white'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-semibold bg-white/10 text-white"
                >
                  {isDark ? <Sun aria-hidden="true" className="w-3.5 h-3.5" /> : <Moon aria-hidden="true" className="w-3.5 h-3.5" />}
                  <span>{isDark ? t('nav.themeLight') : t('nav.themeDark')}</span>
                </button>
              </div>
            </div>

            <DonateButton size="lg" className="w-full">
              {t('nav.donate')}
            </DonateButton>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
