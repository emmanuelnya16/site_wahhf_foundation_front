import { useState, useEffect, useRef, ElementType, ReactNode } from 'react';
// m : composant léger de Motion, animé dès que LazyMotion a chargé son moteur (App.tsx, lot 7). Rendu inchangé.
// Repli CSS du menu tant que ce moteur n'est pas chargé, ou s'il ne se charge jamais (décision du 17/11).
// framer-motion : le même paquet que motion/react (14.14), importé sans passer par le fichier d'entrée de motion/react,
// qui embarque toujours motion.div complet : le premier chargement n'a que m, AnimatePresence et LazyMotion (lot 7).
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, ChevronDown, Search, Sun, Moon, Menu, X } from 'lucide-react';
import { DOMAINS_DATA, WAHHF_LOGO_URL, COUNTRIES_DATA, GERMAN_LEVELS_DATA } from '../services/api';
import { DonateButton } from './wahhf/Buttons';
import { useDialog } from '../lib/useDialog';
import { useMotionEngineReady } from '../lib/motionEngine';
import { switchTheme } from '../effects/themeTransition';
import { EASE_OUT, EASE_SCREEN, DURATION } from '../lib/motionTokens';
import { cn } from '../lib/utils';
import { setLanguage, type Language } from '../i18n';
import { localized, localizedList } from '../lib/localize';

/*
 * En-tête du site (contrat §8, ajout du 16/11 ; §9, §10) : barre opaque pleine largeur fixée en haut, contenu dans le
 * container, sans pilule ni verre dépoli, toujours visible ; ombre flottante seulement une fois la page défilée (en
 * sombre : une bordure basse trait-nuit à la place). Lien actif : souligné et aria-current (A11Y-11), pas la couleur seule.
 */
// Étape a (lot 7.9, 20 novembre 2026) : 1,25 rem entre deux entrées du menu (8 + 4 + 8 px), au lieu de 1,5 rem
// Lot 11.1 : entrées à 16 px (« pas de texte sous 16 px » dans l'en-tête), 8 entrées depuis l'ajout d'Accueil
// Lot 12 : logo agrandi ; pour garder la marge en allemand, 6 px de chaque côté d'une entrée au lieu de 8 (texte à 16 px)
const NAV_LINK =
  'inline-flex items-center gap-1 min-h-11 px-1.5 text-base text-text whitespace-nowrap underline-offset-[0.4em] decoration-2 transition-colors duration-(--dur-fast) hover:text-link hover:underline cursor-pointer';
const NAV_LINK_CURRENT = 'underline';
/** Lot 13 : l'entrée Simulation se distingue par une pastille au contour fin (forêt ; soleil en sombre : --link) */
const NAV_PILL = 'gap-1.5 px-3 rounded-pill border border-link';
const ICON_BUTTON =
  'w-11 h-11 shrink-0 rounded-pill inline-flex items-center justify-center text-text hover:bg-surface-section transition-colors duration-(--dur-fast) cursor-pointer';
const PANEL = 'rounded-card bg-surface-raised shadow-overlay dark:border dark:border-border-input';
const PANEL_LINK = 'text-meta text-link underline underline-offset-4 decoration-1 hover:decoration-2';
const MOBILE_LINK =
  'block py-2 text-section-title text-text-on-inverse hover:text-link-on-inverse underline-offset-8 decoration-2 transition-colors duration-(--dur-fast)';
const MOBILE_LINK_CURRENT = 'underline';
/** Langues proposées, chacune écrite dans sa propre langue (pas de drapeau : une langue n'est pas un pays) */
const LANGUAGES = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Deutsch' },
] as const;
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
  // Lot 7.9 (étape b) : choix de la langue dans un petit menu, ouvert par un bouton compact
  const [langOpen, setLangOpen] = useState(false);
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
  const langRef = useRef<HTMLDivElement>(null);
  const langTriggerRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const touchStartY = useRef<number | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  // Moteur de Motion chargé après le premier affichage : sans lui, le menu passe par son repli CSS (.menu-fallback),
  // hors AnimatePresence (qui attendrait une animation de sortie qui ne viendrait jamais). Le mode choisi reste le même
  // tant que le menu est ouvert : un changement en cours le remonterait.
  const engineReady = useMotionEngineReady();
  const menuWithMotion = useRef(engineReady);
  if (!mobileOpen) menuWithMotion.current = engineReady;
  const withMotion = menuWithMotion.current;
  const MenuPanel = (withMotion ? m.div : 'div') as ElementType;
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

  // Choix de la langue : Échap le ferme ; si le focus était dans la liste, il revient sur le bouton
  useEffect(() => {
    if (!langOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const focusInMenu = !!langRef.current?.contains(document.activeElement);
      setLangOpen(false);
      if (focusInMenu) langTriggerRef.current?.focus();
    };
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [langOpen]);

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
    setLangOpen(false);
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

  const currentLang: Language = i18n.language.startsWith('en') ? 'en' : i18n.language.startsWith('de') ? 'de' : 'fr';
  // Lot 7.10 : la langue est chargée à la demande, puis mémorisée ; la page en cours ne change pas
  const switchLanguage = (lang: Language) => {
    void setLanguage(lang);
  };
  // Liste des langues : flèches haut et bas d'une option à l'autre, Début et Fin
  const onLangKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const options = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('button')];
    const index = options.indexOf(document.activeElement as HTMLButtonElement);
    const next =
      event.key === 'ArrowDown' ? (index + 1) % options.length
      : event.key === 'ArrowUp' ? (index - 1 + options.length) % options.length
      : event.key === 'Home' ? 0
      : event.key === 'End' ? options.length - 1
      : -1;
    if (next < 0) return;
    event.preventDefault();
    options[next].focus();
  };

  // Données dans la langue de l'interface (lot 7.10) : domaines, niveaux, pays
  const domains = localizedList(DOMAINS_DATA, 'contenu.domaines', (d) => d.id, i18n.language);
  // Résultats de recherche rapide
  const searchResults = searchQuery.trim()
    ? [
        ...domains.filter(
          (d) =>
            d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.shortDesc.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((d) => ({ label: t('nav.search.domain', { title: d.title }), to: d.link })),
        ...GERMAN_LEVELS_DATA.map((l) => localized(l, `contenu.niveaux.${l.slug}`, i18n.language)).filter(
          (l) =>
            l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            l.level.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((l) => ({ label: t('nav.search.level', { title: l.title }), to: `/academie/${l.slug}` })),
        ...COUNTRIES_DATA.map((c) => localized(c, `contenu.pays.${c.slug}`, i18n.language)).filter((c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map((c) => ({ label: t('nav.search.country', { flag: c.flag, name: c.name }), to: `/accompagnement/pays/${c.slug}` })),
        ...(/galer|photo|foto|vid[ée]o|image|bild/i.test(searchQuery) ? [{ label: t('footer.gallery'), to: '/galerie' }] : []),
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
        {/* Lot 12 : barre de 68 px (80 px dès 640 px) pour le logo agrandi ; --header-height suit (index.css).
            Lot 13 : 9 entrées avec Simulation ; elles ne tiennent pas dans 72 rem avec le logo agrandi (mesuré : en
            français et en allemand, le logo était écrasé). Dernier recours du brief : le menu complet seulement dès
            1 366 px (85,375 rem), où l'en-tête s'élargit jusqu'à 80 rem ; en dessous, le menu burger. */}
        <div ref={megaRef} className="container-page min-[85.375rem]:max-w-[80rem] flex h-17 sm:h-20 items-center justify-between gap-3">
          {/* Gauche : Logo WAHHF */}
          <Link
            to="/"
            className="flex items-center gap-2.5 min-w-0 rounded-pill"
            aria-label={t('nav.homeLink')}
          >
            <img
              src={WAHHF_LOGO_URL}
              alt={t('ui.logoAlt')}
              width={60}
              height={60}
              className="w-13 h-13 sm:w-15 sm:h-15 shrink-0 object-contain rounded-pill bg-white p-0.5"
            />
            {/* Étape d (lot 7.9, votre choix du 20 novembre 2026) : le menu complet ne laisse pas la place du nom (le
                conteneur fait 1 152 px à toutes ces largeurs) : logo seul dès 1 280 px. Lot 11.1 : en anglais aussi, avec 8
                entrées à 16 px (mesuré : 10 px de marge avec le nom). Le lien garde son nom accessible. */}
            <div className="flex flex-col min-w-0 min-[85.375rem]:hidden">
              <span className="text-body font-bold leading-none text-text whitespace-nowrap">
                WAHHF<span className="hidden min-[360px]:inline"> Foundation</span>
              </span>
              <span className="text-meta text-text-secondary hidden lg:inline min-[85.375rem]:hidden whitespace-nowrap">
                {t('brand.branch')}
              </span>
            </div>
          </Link>

          {/* Centre : Menu principal (8 entrées ; Événements ajouté au lot 7.9, Accueil au lot 11.1) */}
          <nav aria-label={t('nav.mainNav')} className="hidden min-[85.375rem]:flex items-center gap-1">
            {/* Lot 11.1 : nouvelle page /accueil ; le logo mène toujours à / */}
            <Link to="/accueil" aria-current={navState('/accueil')} className={cn(NAV_LINK, navState('/accueil') && NAV_LINK_CURRENT)}>
              {t('nav.home')}
            </Link>

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

            {/* Lot 13 : le programme Simulation, juste après Nos actions, avec son cube */}
            <Link to="/simulation" aria-current={navState('/simulation')} className={cn(NAV_LINK, NAV_PILL, navState('/simulation') && NAV_LINK_CURRENT)}>
              <Box aria-hidden="true" className="w-4 h-4 shrink-0" />
              <span>{t('nav.simulation')}</span>
            </Link>

            <Link to="/notre-impact" aria-current={navState('/notre-impact')} className={cn(NAV_LINK, navState('/notre-impact') && NAV_LINK_CURRENT)}>
              {t('nav.impact')}
            </Link>

            <Link to="/actualites" aria-current={navState('/actualites', ['/actualites/'])} className={cn(NAV_LINK, navState('/actualites', ['/actualites/']) && NAV_LINK_CURRENT)}>
              {t('nav.news')}
            </Link>

            {/* Lot 7.9 (retours du 20 novembre 2026) : Événements directement dans le menu, entre Actualités et Agir */}
            <Link to="/evenements" aria-current={navState('/evenements', ['/evenements/'])} className={cn(NAV_LINK, navState('/evenements', ['/evenements/']) && NAV_LINK_CURRENT)}>
              {t('nav.events')}
            </Link>

            <Link to="/agir" aria-current={navState('/agir')} className={cn(NAV_LINK, navState('/agir') && NAV_LINK_CURRENT)}>
              {t('nav.act')}
            </Link>

            <Link to="/contact" aria-current={navState('/contact')} className={cn(NAV_LINK, navState('/contact') && NAV_LINK_CURRENT)}>
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Droite : Langue (bouton compact, lot 7.9), Recherche, Thème, Bouton Faire un don (rouge), Burger */}
          {/* Étape c (lot 7.9) : groupe resserré sur ordinateur (aucun espace entre les cibles de 44 × 44 px) */}
          <div className="flex items-center gap-1.5 sm:gap-2 min-[85.375rem]:gap-0 shrink-0">
            {/* Langue (lot 7.9, étape b) : un bouton compact qui affiche la langue en cours (nom accessible « Changer de
                langue (FR) » : il contient le texte visible, WCAG 2.5.3) et ouvre le choix ; chaque option porte sa
                langue (lang) ; Échap et clic extérieur ferment, le focus revient sur le bouton */}
            <div ref={langRef} className="relative hidden md:block">
              <button
                ref={langTriggerRef}
                type="button"
                onClick={() => setLangOpen((prev) => !prev)}
                aria-expanded={langOpen}
                aria-controls="choix-langue"
                aria-label={t('nav.changeLanguage', { lang: currentLang.toUpperCase() })}
                className="inline-flex min-h-11 min-w-11 items-center justify-center gap-0.5 rounded-pill border border-border-input px-1.5 text-base font-semibold text-text hover:text-link cursor-pointer transition-colors duration-(--dur-fast)"
              >
                <span>{currentLang.toUpperCase()}</span>
                <ChevronDown aria-hidden="true" className={cn('w-3.5 h-3.5 transition-transform duration-(--dur-fast)', langOpen && 'rotate-180')} />
              </button>
              {langOpen && (
                <ul id="choix-langue" onKeyDown={onLangKeyDown} className={cn(PANEL, 'absolute right-0 top-full z-10 mt-2 min-w-40 p-2')}>
                  {LANGUAGES.map((l) => (
                    <li key={l.code}>
                      <button
                        type="button"
                        lang={l.code}
                        aria-current={currentLang === l.code ? 'true' : undefined}
                        onClick={() => {
                          switchLanguage(l.code);
                          setLangOpen(false);
                          langTriggerRef.current?.focus();
                        }}
                        className={cn(
                          'flex w-full min-h-11 items-center justify-between gap-3 rounded-inner px-3 text-meta text-text hover:bg-surface-section cursor-pointer',
                          currentLang === l.code && 'font-semibold underline underline-offset-4'
                        )}
                      >
                        {l.name}
                        <span aria-hidden="true" className="text-text-secondary">{l.code.toUpperCase()}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Recherche */}
            <button
              ref={searchButtonRef}
              type="button"
              onClick={() => setSearchOpen((prev) => !prev)}
              aria-expanded={searchOpen}
              aria-label={t('nav.searchOpen')}
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

            {/* 6e entrée / Bouton « Faire un don » (token rouge) */}
            <div className="hidden sm:block">
              <DonateButton size="sm" className="whitespace-nowrap text-base min-[85.375rem]:gap-1.5 min-[85.375rem]:px-3">{t('nav.donate')}</DonateButton>
            </div>

            {/* Menu Burger (Mobile & Tablette) */}
            <button
              ref={burgerRef}
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label={t('nav.menuOpen')}
              aria-expanded={mobileOpen}
              aria-controls="menu-mobile"
              className="min-[85.375rem]:hidden w-11 h-11 shrink-0 rounded-pill bg-action text-on-action hover:bg-action-hover flex items-center justify-center cursor-pointer"
            >
              <Menu aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>

          {/* Méga-menu « Nos actions » (6 domaines) : panneau flottant aligné sur le container */}
          {megaOpen && (
            <div className="absolute inset-x-0 top-full pointer-events-none">
              <div className="container-page">
                <div className={cn(PANEL, 'pointer-events-auto mt-2 p-6 sm:p-8')}>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-meta text-text-secondary">{t('nav.mega.domainsTitle')}</span>
                        <Link to="/nos-actions" className={PANEL_LINK}>
                          {t('nav.mega.overview')}
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {domains.map((dom) => (
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
                        <h3 className="text-body font-semibold text-text">{t('nav.mega.mobilityTitle')}</h3>
                        <p className="text-meta text-text-secondary">
                          {t('nav.mega.mobilityText')}
                        </p>
                        <ul className="pt-1 space-y-2">
                          <li>
                            <Link to="/mobilite-langues/academie" className={PANEL_LINK}>
                              {t('nav.mega.academy')}
                            </Link>
                          </li>
                          <li>
                            <Link to="/mobilite-langues/accompagnement" className={PANEL_LINK}>
                              {t('nav.mega.support')}
                            </Link>
                          </li>
                          <li>
                            <Link to="/accompagnement/eviter-les-arnaques" className={PANEL_LINK}>
                              {t('nav.mega.scams')}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <Link to="/candidater" className={PANEL_LINK}>
                        {t('nav.mega.apply')}
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
                aria-label={t('nav.searchClose')}
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
      <MaybePresence enabled={withMotion}>
      {mobileOpen && (
        <MenuPanel
          key="menu-mobile"
          id="menu-mobile"
          ref={mobileMenuRef}
          {...(withMotion
            ? {
                initial: reduceMotion ? { opacity: 0 } : { clipPath: 'inset(0% 0% 100% 0%)' },
                animate: reduceMotion
                  ? { opacity: 1, transition: { duration: 0.2 } }
                  : { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: DURATION.screen, ease: EASE_SCREEN } },
                exit: reduceMotion
                  ? { opacity: 0, transition: { duration: 0.15 } }
                  : { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.6, ease: EASE_SCREEN } },
              }
            : {})}
          role="dialog"
          aria-modal="true"
          aria-label={t('nav.mobileMenu')}
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
          className={cn(
            'surface-green fixed inset-0 z-(--z-menu) bg-surface-inverse text-text-on-inverse flex flex-col justify-between p-6 overflow-y-auto',
            !withMotion && 'menu-fallback'
          )}
        >
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle-on-inverse">
            <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-3">
              <img
                src={WAHHF_LOGO_URL}
                alt={t('ui.logoAlt')}
                width={52}
                height={52}
                className="w-13 h-13 object-contain rounded-pill bg-white p-0.5"
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
              aria-label={t('nav.menuClose')}
              className="w-11 h-11 rounded-pill border border-border-on-inverse text-text-on-inverse flex items-center justify-center"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <m.nav
            aria-label={t('nav.mainNavMobile')}
            className="py-6 space-y-4"
            initial={reduceMotion || !withMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15, ease: EASE_OUT } }}
          >
            <Link
              to="/accueil"
              aria-current={navState('/accueil')}
              className={cn(MOBILE_LINK, navState('/accueil') && MOBILE_LINK_CURRENT)}
            >
              {t('nav.home')}
            </Link>

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
                {t('nav.actionsMobile')}
              </Link>
              <div className="pl-4 border-l border-border-subtle-on-inverse grid grid-cols-1 sm:grid-cols-2 gap-x-4 pt-1">
                {domains.map((d) => (
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

            {/* Lot 13 : Simulation, avec son cube */}
            <Link
              to="/simulation"
              aria-current={navState('/simulation')}
              className={cn(MOBILE_LINK, 'flex items-center gap-3', navState('/simulation') && MOBILE_LINK_CURRENT)}
            >
              <Box aria-hidden="true" className="w-6 h-6 shrink-0" />
              <span>{t('nav.simulation')}</span>
            </Link>

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
              to="/evenements"
              aria-current={navState('/evenements', ['/evenements/'])}
              className={cn(MOBILE_LINK, navState('/evenements', ['/evenements/']) && MOBILE_LINK_CURRENT)}
            >
              {t('nav.events')}
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

            <Link
              to="/candidater"
              aria-current={navState('/candidater')}
              className={cn(MOBILE_LINK, 'text-link-on-inverse', navState('/candidater') && MOBILE_LINK_CURRENT)}
            >
              {t('nav.applyMobile')}
            </Link>
          </m.nav>

          <div className="pt-6 border-t border-border-subtle-on-inverse space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* Langues (lot 7.10) : trois boutons visibles, chacun dans sa langue ; la langue en cours est signalée */}
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    lang={l.code}
                    aria-current={currentLang === l.code ? 'true' : undefined}
                    onClick={() => switchLanguage(l.code)}
                    className={cn(INVERSE_CHIP, currentLang === l.code ? INVERSE_CHIP_ON : INVERSE_CHIP_OFF)}
                  >
                    {l.name} ({l.code.toUpperCase()})
                  </button>
                ))}
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

            <DonateButton size="lg" className="w-full">
              {t('nav.donate')}
            </DonateButton>
          </div>
        </MenuPanel>
      )}
      </MaybePresence>
    </>
  );
}

/** AnimatePresence seulement quand le moteur de Motion est là (sorties animées) ; sinon, rendu direct. */
function MaybePresence({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  return enabled ? <AnimatePresence>{children}</AnimatePresence> : <>{children}</>;
}
