import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { DOMAINS_DATA, WAHHF_LOGO_URL, COUNTRIES_DATA, GERMAN_LEVELS_DATA } from '../services/api';
import { DonateButton, PrimaryButton } from './wahhf/Buttons';
import { useDialog } from '../lib/useDialog';
import { switchTheme } from '../effects/themeTransition';
import { EASE_OUT, EASE_SCREEN, DURATION } from '../lib/motionTokens';
import { cn } from '../lib/utils';

/*
 * En-tête du site (contrat §8, ajout du 16/11 ; §9, §10) : barre opaque pleine largeur fixée en haut, contenu dans le
 * container, sans pilule ni verre dépoli, toujours visible ; ombre flottante seulement une fois la page défilée (en
 * sombre : une bordure basse trait-nuit à la place). Lien actif : souligné et aria-current (A11Y-11), pas la couleur seule.
 */
const NAV_LINK =
  'inline-flex items-center gap-1 min-h-11 px-2.5 text-meta text-text whitespace-nowrap underline-offset-[0.4em] decoration-2 transition-colors duration-(--dur-fast) hover:text-link hover:underline cursor-pointer';
const NAV_LINK_CURRENT = 'underline';
const ICON_BUTTON =
  'w-11 h-11 shrink-0 rounded-pill inline-flex items-center justify-center text-text hover:bg-surface-section transition-colors duration-(--dur-fast) cursor-pointer';
const PANEL = 'rounded-card bg-surface-raised shadow-overlay dark:border dark:border-border-input';
const PANEL_LINK = 'text-meta text-link underline underline-offset-4 decoration-1 hover:decoration-2';
const MOBILE_LINK =
  'block py-2 text-section-title text-text-on-inverse hover:text-link-on-inverse underline-offset-8 decoration-2 transition-colors duration-(--dur-fast)';
const MOBILE_LINK_CURRENT = 'underline';
const INVERSE_CHIP =
  'inline-flex items-center gap-1.5 min-h-11 px-4 rounded-pill text-meta font-bold border transition-colors duration-(--dur-fast)';
const INVERSE_CHIP_ON = 'bg-action-on-inverse text-on-action-on-inverse border-transparent';
const INVERSE_CHIP_OFF = 'border-border-on-inverse text-text-on-inverse';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  // Le script de index.html a déjà posé (ou non) la classe .dark avant le rendu : on part de cet état.
  const [isDark, setIsDark] = useState(
    () => typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

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

  // En-tête toujours visible (contrat §10) ; ombre flottante dès que la page a défilé (§9).
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Lien actif (A11Y-11) : « page » sur la page elle-même, « true » dans sa rubrique.
  const navState = (path: string, section: string[] = []): 'page' | 'true' | undefined =>
    location.pathname === path ? 'page' : section.some((x) => location.pathname.startsWith(x)) ? 'true' : undefined;
  const ACTIONS_SECTION = ['/nos-actions', '/mobilite-langues', '/academie', '/accompagnement'];

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
        className={cn(
          'fixed inset-x-0 top-0 z-(--z-header) bg-surface border-b border-transparent transition-[box-shadow,border-color] duration-(--dur-fast)',
          scrolled && 'shadow-overlay dark:border-border-input',
        )}
      >
        {/* En-tête (contrat §8, décisions du 16/11) :
            - sous 1 280 px, une ligne : marque | outils | Candidater et Faire un don (dès 768 px) | menu ;
            - dès 1 280 px, deux lignes : marque | Candidater et Faire un don, puis menu | outils.
            Le sous-titre « Branche sociale du groupe IROKO » reste visible à toutes les largeurs : sur deux lignes
            sous le nom (de la largeur du nom, 120 px au moins) jusqu'à 1 024 px, sur une ligne au-delà. */}
        <div
          ref={megaRef}
          className="container-page flex h-16 sm:h-18 items-center gap-2 sm:gap-3 xl:grid xl:h-auto xl:grid-cols-[minmax(0,1fr)_auto] xl:grid-rows-[4rem_2.75rem] xl:gap-x-6 xl:gap-y-0"
        >
          {/* Marque : logo, nom, sous-titre */}
          <Link
            to="/"
            className="mr-auto xl:mr-0 xl:col-start-1 xl:row-start-1 flex items-center gap-2 sm:gap-2.5 min-w-0 rounded-pill"
            aria-label="WAHHF Foundation — Accueil"
          >
            <img
              src={WAHHF_LOGO_URL}
              alt="Logo WAHHF Foundation"
              width={48}
              height={48}
              className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 object-contain rounded-pill bg-white p-0.5"
            />
            <span className="flex flex-col gap-0.5 min-w-30">
              <span className="text-body font-bold leading-none text-text whitespace-nowrap">
                WAHHF<span className="hidden min-[360px]:inline"> Foundation</span>
              </span>
              <span className="w-0 min-w-full lg:w-auto lg:whitespace-nowrap text-meta leading-tight text-text-secondary">
                {t('brand.branch')}
              </span>
            </span>
          </Link>

          {/* Menu principal (6 entrées) : deuxième ligne dès 1 280 px, aligné sur la marge du logo */}
          <nav aria-label="Navigation principale" className="hidden xl:flex xl:col-start-1 xl:row-start-2 items-center gap-1 -ml-2.5">
            <Link to="/qui-sommes-nous" aria-current={navState('/qui-sommes-nous')} className={cn(NAV_LINK, navState('/qui-sommes-nous') && NAV_LINK_CURRENT)}>
              {t('nav.about')}
            </Link>

            {/* Nos actions : ouvre le méga-menu des 6 domaines ; souligné dans toute la rubrique */}
            <button
              ref={megaTriggerRef}
              type="button"
              onClick={() => setMegaOpen((prev) => !prev)}
              aria-expanded={megaOpen}
              aria-current={navState('/nos-actions', ACTIONS_SECTION) ? 'true' : undefined}
              className={cn(NAV_LINK, navState('/nos-actions', ACTIONS_SECTION) && NAV_LINK_CURRENT)}
            >
              <span>{t('nav.actions')}</span>
              <ChevronDown aria-hidden="true" className={cn('w-4 h-4 transition-transform duration-(--dur-fast)', megaOpen && 'rotate-180')} />
            </button>

            <Link to="/notre-impact" aria-current={navState('/notre-impact')} className={cn(NAV_LINK, navState('/notre-impact') && NAV_LINK_CURRENT)}>
              {t('nav.impact')}
            </Link>

            <Link to="/actualites" aria-current={navState('/actualites', ['/actualites/'])} className={cn(NAV_LINK, navState('/actualites', ['/actualites/']) && NAV_LINK_CURRENT)}>
              {t('nav.news')}
            </Link>

            <Link to="/agir" aria-current={navState('/agir')} className={cn(NAV_LINK, navState('/agir') && NAV_LINK_CURRENT)}>
              {t('nav.act')}
            </Link>

            <Link to="/contact" aria-current={navState('/contact')} className={cn(NAV_LINK, navState('/contact') && NAV_LINK_CURRENT)}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Outils : langue (dès 1 024 px), recherche, thème (dès 640 px) ; à droite du menu dès 1 280 px */}
          <div className="flex items-center gap-1.5 xl:gap-1 shrink-0 xl:col-start-2 xl:row-start-2 xl:justify-self-end">
            {/* Sélecteur de langue FR / EN */}
            <div
              role="group"
              aria-label="Sélecteur de langue"
              className="hidden lg:inline-flex items-center rounded-pill border border-border-input p-0.5 text-meta"
            >
              <button
                type="button"
                onClick={() => switchLanguage('fr')}
                className={cn('px-2.5 py-1 rounded-pill font-semibold transition-colors cursor-pointer', i18n.language.startsWith('fr') ? 'bg-action text-on-action' : 'text-text-secondary hover:text-link')}
              >
                FR
              </button>
              <button
                type="button"
                onClick={() => switchLanguage('en')}
                className={cn('px-2.5 py-1 rounded-pill font-semibold transition-colors cursor-pointer', i18n.language.startsWith('en') ? 'bg-action text-on-action' : 'text-text-secondary hover:text-link')}
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
              className={ICON_BUTTON}
            >
              <Search aria-hidden="true" className="w-4 h-4" />
            </button>

            {/* Interrupteur de thème Clair / Sombre */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? t('nav.themeLight') : t('nav.themeDark')}
              title={isDark ? t('nav.themeLight') : t('nav.themeDark')}
              className={cn(ICON_BUTTON, 'hidden sm:inline-flex')}
            >
                            {isDark ? <Sun aria-hidden="true" className="w-4 h-4" /> : <Moon aria-hidden="true" className="w-4 h-4" />}
            </button>
          </div>

          {/* Les deux portes (T-09) : Candidater (forêt) et Faire un don (contour cœur) ; dans le menu sous 768 px */}
          <div className="hidden md:flex items-center gap-2 shrink-0 xl:col-start-2 xl:row-start-1 xl:justify-self-end">
            <PrimaryButton to="/candidater" size="sm" className="whitespace-nowrap">
              {t('nav.apply')}
            </PrimaryButton>
            <DonateButton size="sm" variant="outline" className="whitespace-nowrap">
              {t('nav.donate')}
            </DonateButton>
          </div>

          {/* Menu Burger (Mobile & Tablette) */}
          <button
            ref={burgerRef}
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Ouvrir le menu principal"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            className="xl:hidden w-11 h-11 shrink-0 rounded-pill bg-action text-on-action hover:bg-action-hover flex items-center justify-center cursor-pointer"
          >
            <Menu aria-hidden="true" className="w-5 h-5" />
          </button>

          {/* Filet entre les deux lignes (dès 1 280 px), sur toute la largeur */}
          <div aria-hidden="true" className="hidden xl:block absolute inset-x-0 top-16 border-t border-border-subtle pointer-events-none" />

          {/* Méga-menu « Nos actions » (6 domaines) : panneau flottant aligné sur le container */}
          {megaOpen && (
            <div className="absolute inset-x-0 top-full pointer-events-none">
              <div className="container-page">
                <div className={cn(PANEL, 'pointer-events-auto mt-2 p-6 sm:p-8')}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-meta text-text-secondary">Les 6 domaines d’action de WAHHF Foundation</span>
                        <Link to="/nos-actions" className={PANEL_LINK}>
                          Voir la vue d’ensemble
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {DOMAINS_DATA.map((dom) => (
                          <Link
                            key={dom.id}
                            to={dom.link}
                            className="group block p-3 rounded-inner hover:bg-surface-section transition-colors duration-(--dur-fast)"
                          >
                            <p className="text-body font-semibold text-text group-hover:text-link">{dom.title}</p>
                            <p className="text-meta text-text-secondary mt-0.5">{dom.shortDesc}</p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Encart Mobilité & Langues : sauge, sans cadre ni carte nuit */}
                    <div className="lg:col-span-4 rounded-inner bg-surface-section p-6 flex flex-col justify-between gap-4">
                      <div className="space-y-3">
                        <h3 className="text-body font-semibold text-text">Mobilité & Langues : Allemand (A1–C1) & Europe</h3>
                        <p className="text-meta text-text-secondary">
                          Accompagnement gratuit aux cours d’allemand et orientation vérifiée vers 10 pays européens, financé par IROKO et nos donateurs.
                        </p>
                        <ul className="pt-1 space-y-2">
                          <li>
                            <Link to="/mobilite-langues/academie" className={PANEL_LINK}>
                              Académie de langues (A1 à C1)
                            </Link>
                          </li>
                          <li>
                            <Link to="/mobilite-langues/accompagnement" className={PANEL_LINK}>
                              Accompagnement vers 10 pays
                            </Link>
                          </li>
                          <li>
                            <Link to="/accompagnement/eviter-les-arnaques" className={PANEL_LINK}>
                              Vigilance : Éviter les arnaques
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <Link to="/candidater" className={PANEL_LINK}>
                        Candidater gratuitement
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Barre de recherche déroulante */}
        {searchOpen && (
          <div className="absolute inset-x-0 top-full pointer-events-none">
          <div className="container-page">
          <div ref={searchPanelRef} role="search" className={cn(PANEL, 'pointer-events-auto mt-2 ml-auto max-w-2xl p-4')}>
            <div className="flex items-center gap-3">
              <Search aria-hidden="true" className="w-5 h-5 text-text-secondary shrink-0" />
              <input
                ref={searchInputRef}
                aria-label={t('nav.searchPlaceholder')}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="w-full min-h-11 bg-transparent text-body text-text placeholder:text-text-secondary"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Fermer la recherche"
                className={ICON_BUTTON}
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
                    className="w-full min-h-11 text-left px-3 py-2 rounded-inner hover:bg-surface-section text-body text-text flex items-center justify-between cursor-pointer"
                  >
                    <span>{res.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          </div>
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
          className="surface-green fixed inset-0 z-(--z-menu) bg-surface-inverse text-text-on-inverse flex flex-col justify-between p-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle-on-inverse">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <img
                src={WAHHF_LOGO_URL}
                alt="Logo WAHHF Foundation"
                className="w-11 h-11 object-contain rounded-pill bg-white p-0.5"
              />
              <div>
                <p className="text-body font-bold text-text-on-inverse">WAHHF Foundation</p>
                <p className="text-meta text-text-secondary-on-inverse">{t('brand.branch')}</p>
              </div>
            </Link>

            <button
              ref={mobileCloseRef}
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Fermer le menu"
              className="w-11 h-11 rounded-pill border border-border-on-inverse text-text-on-inverse flex items-center justify-center"
            >
                            <X className="w-6 h-6" />
            </button>
          </div>

                    {/* Les deux portes en tête du menu (T-09), puis les liens : un seul bloc (le panneau répartit ses enfants) */}
          <div>
          <div className="pt-6 grid grid-cols-1 min-[400px]:grid-cols-2 gap-3">
            <PrimaryButton to="/candidater" onInverse className="w-full">
              {t('nav.apply')}
            </PrimaryButton>
            <DonateButton variant="outline" onInverse className="w-full">
              {t('nav.donate')}
            </DonateButton>
          </div>

          <motion.nav
            aria-label="Navigation principale (mobile)"
            className="py-6 space-y-4"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: EASE_OUT } }}
          >
            <Link
              to="/qui-sommes-nous"
              aria-current={navState('/qui-sommes-nous')}
              className={cn(MOBILE_LINK, navState('/qui-sommes-nous') && MOBILE_LINK_CURRENT)}
            >
              {t('nav.about')}
            </Link>

            <div className="space-y-2">
              <Link
                to="/nos-actions"
              aria-current={navState('/nos-actions', ACTIONS_SECTION)}
              className={cn(MOBILE_LINK, navState('/nos-actions', ACTIONS_SECTION) && MOBILE_LINK_CURRENT)}
              >
                {t('nav.actions')} (6 domaines)
              </Link>
              <div className="pl-4 border-l border-border-subtle-on-inverse grid grid-cols-1 sm:grid-cols-2 gap-x-4 pt-1">
                {DOMAINS_DATA.map((d) => (
                  <Link
                    key={d.id}
                    to={d.link}
                    aria-current={location.pathname + location.search === d.link ? 'page' : undefined}
                    className={cn('block py-2 text-body text-text-secondary-on-inverse hover:text-link-on-inverse underline-offset-4 decoration-2', location.pathname + location.search === d.link && 'underline')}
                  >
                    <span>{d.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/notre-impact"
              aria-current={navState('/notre-impact')}
              className={cn(MOBILE_LINK, navState('/notre-impact') && MOBILE_LINK_CURRENT)}
            >
              {t('nav.impact')}
            </Link>

            <Link
              to="/actualites"
              aria-current={navState('/actualites', ['/actualites/'])}
              className={cn(MOBILE_LINK, navState('/actualites', ['/actualites/']) && MOBILE_LINK_CURRENT)}
            >
              {t('nav.news')}
            </Link>

            <Link
              to="/agir"
              aria-current={navState('/agir')}
              className={cn(MOBILE_LINK, navState('/agir') && MOBILE_LINK_CURRENT)}
            >
              {t('nav.act')}
            </Link>

            <Link
              to="/contact"
              aria-current={navState('/contact')}
              className={cn(MOBILE_LINK, navState('/contact') && MOBILE_LINK_CURRENT)}
            >
              {t('nav.contact')}
            </Link>

                                </motion.nav>
          </div>

          <div className="pt-6 border-t border-border-subtle-on-inverse space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => switchLanguage('fr')}
                  className={cn(INVERSE_CHIP, i18n.language.startsWith('fr') ? INVERSE_CHIP_ON : INVERSE_CHIP_OFF)}
                >
                  Français (FR)
                </button>
                <button
                  type="button"
                  onClick={() => switchLanguage('en')}
                  className={cn(INVERSE_CHIP, i18n.language.startsWith('en') ? INVERSE_CHIP_ON : INVERSE_CHIP_OFF)}
                >
                  English (EN)
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={cn(INVERSE_CHIP, INVERSE_CHIP_OFF)}
                >
                  {isDark ? <Sun aria-hidden="true" className="w-3.5 h-3.5" /> : <Moon aria-hidden="true" className="w-3.5 h-3.5" />}
                  <span>{isDark ? t('nav.themeLight') : t('nav.themeDark')}</span>
                </button>
              </div>
                        </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
