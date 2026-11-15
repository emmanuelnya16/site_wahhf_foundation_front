# Audit mouvement — WAHHF Foundation

Phase 1 (audit seul, aucun fichier de code modifié). Date : 13 novembre 2026.

> **Mise à jour (phases 2 et 3, 14 novembre 2026)** : les corrections et les effets ont été réalisés selon les décisions validées. Voir la partie **« Phases 2 et 3 : réalisation »** en fin de document. L'audit initial ci-dessous est conservé tel quel, comme point de départ.

**Méthode.** Lecture du code (`src/`, configs), `npm run build`, puis mesures sur le **build de production** servi par `vite preview` dans Chrome headless, à 390 × 844 (tactile émulé) et 1440 × 900, sur 14 routes, en thème clair puis sombre : débordements horizontaux, images, titres, contrastes calculés sur le rendu, 70 tabulations clavier sur l'accueil, ouverture du menu mobile. Poids des bibliothèques mesurés par esbuild (minifié + gzip). Limites : pas de bridage réseau (LCP non mesuré), pas de test lecteur d'écran, comportement « réduire les animations » analysé dans le code.

---

## (a) Résumé

1. Stack moderne et saine : React 19.2, Vite 6.4, Tailwind 4.2 (sans fichier de config, tout dans `src/index.css`), React Router 7.18, Motion 14.14, GSAP 3.15.1, Lenis 1.3.27 (installé, pas encore utilisé).
2. Le build passe, mais en **un seul fichier JS de 1 044 kB (321 kB gzip)** : aucune page n'est chargée à la demande.
3. **Bloquant : les 5 photos sont cassées en production** (chemins `/src/assets/...` en texte, non copiés dans `dist/`) : 13 images sur 16 de l'accueil ne s'affichent pas.
4. Une partie du mouvement existe déjà : barre de progression (GSAP), header masqué au défilement, apparitions Motion des titres de section, compteurs, carrousel mobile des domaines, flèche des boutons qui pivote.
5. Conflits à lever avant Lenis : `scroll-behavior: smooth` global, deux `window.scrollTo`, fenêtres (menu, vidéo, carte) sans Échap, sans focus géré, sans blocage du défilement.
6. Aucun débordement horizontal à 390 px sur les 14 routes ; un seul `h1` par page ; toutes les images ont un `alt`.
7. **Contraste insuffisant** : l'or `#E8A317` en petit texte sur crème/blanc = 1,9 à 2,2:1 (AA exige 4,5:1), en thème clair, qui est le thème par défaut.
8. Thème sombre : 1 430 couleurs codées en dur ; le thème est appliqué après le rendu, d'où un flash clair au chargement.
9. Budget mouvement respecté : toute la pile (Motion + GSAP/ScrollTrigger/SplitText + Lenis) = **111 kB gzip** (< 168 kB) ; Motion et GSAP sont déjà dans le paquet, l'ajout réel est d'environ 10 à 15 kB gzip.
10. Les 8 skills demandés sont installés, mais **pas chargés dans cette session** : redémarrer Claude Code avant la phase 2.

---

## (b) Les 17 effets : composant, faisabilité, risque, ordre

| # | Effet | Fichier(s) | Faisabilité | Risque principal | Ordre conseillé |
|---|---|---|---|---|---|
| 1 | Lenis + barre de progression dorée | [Layout.tsx](../src/components/Layout.tsx), [index.css](../src/index.css), [Footer.tsx](../src/components/Footer.tsx) | **À adapter** : la barre existe déjà en GSAP (scrub 0,2) → la remplacer par `useScroll`, pas la doubler | `scroll-behavior: smooth` + `window.scrollTo` en conflit ; fenêtres sans blocage du défilement ; ancres inter-pages déjà cassées | **1** |
| 2 | Header masqué / menu plein écran | [Navbar.tsx](../src/components/Navbar.tsx) | **À adapter** : masquage déjà en place (300 ms) ; menu mobile affiché sans animation | Menu mobile : le focus reste derrière et la page défile dessous (mesuré) ; pas d'Échap | **3** |
| 3 | Rideau de chargement | nouveau composant (Layout) + hero | Faisable | Retarde la première impression ; ne doit attendre aucun téléchargement ; `sessionStorage` peut lever une exception | **5** |
| 4 | Hero (titre masqué, zoom, parallaxe, boutons) | [Home.tsx](../src/pages/Home.tsx) §1 | **À adapter** : 4 fondus Motion existants à remplacer | Image source 1376 px, déjà agrandie à 1512 px : un zoom à 1,25 la rendra floue ; boucle `animate-bounce` sur l'indicateur | **4** |
| 5 | Mission : SplitText ligne par ligne | Home.tsx §2 (`#mission`, 2 paragraphes traduits) | Faisable | Bascule FR/EN : React réécrit un texte que SplitText a découpé (clé par langue + `revert`) ; polices Google chargées après coup (`autoSplit`) | **6** |
| 6 | Chiffres clés : compteurs | [Counter.tsx](../src/components/wahhf/Counter.tsx) | **Déjà fait** (une seule fois, réduit-mouvement géré) | Chiffres marqués « TODO » (1 250 = valeur d'exemple) | **7** (vérification) |
| 7 | 6 domaines : galerie horizontale épinglée | Home.tsx §4, [DomainCard.tsx](../src/components/wahhf/DomainCard.tsx) | **À revoir** sur ordinateur (grille 3 colonnes aujourd'hui) ; mobile déjà en carrousel natif | Écrans peu hauts (< ~760 px) : la section ne tient pas épinglée ; carte focalisée au clavier hors champ ; header qui réapparaît par-dessus | **8** |
| 8 | Mobilité & Langues : agrandissement | Home.tsx §5 (section verte pleine largeur) | Faisable (`clip-path: inset()` + scrub) | Coincé entre l'épinglage (§4) et la vidéo (§6) : trois effets lourds d'affilée | **9** |
| 9 | Vidéo : vignette plein écran au scroll | Home.tsx §6 (vignette + modale existante) | **À revoir** : lecture au clic et pas de son auto déjà respectés | Deuxième « agrandissement » consécutif ; modale sans Échap ni focus ; vidéo = showreel IROKO (TODO) | **10** |
| 10 | Frise : ligne qui se dessine | Home.tsx §8 (ligne statique + jalons `whileInView`) | Faisable | Faible ; retirer les délais cumulés par index | **11** |
| 11 | Carte de présence | [PresenceSection.tsx](../src/components/wahhf/PresenceSection.tsx), [CameroonMap.tsx](../src/components/wahhf/CameroonMap.tsx), [EuropeMiniMap.tsx](../src/components/wahhf/EuropeMiniMap.tsx) | **À adapter** | « Prompt 3 » absent ; cartes chargées en différé + GeoJSON asynchrone (animer après rendu) ; l'arc se dessine via `stroke-dashoffset` (hors règle transform/opacity) ; deux boucles infinies déjà présentes | **12** |
| 12 | Actualités, témoignages, Agir | Home.tsx §10, §11, §13 | Faisable | Les titres de section apparaissent déjà tous : éviter la double apparition ; témoignages fictifs (TODO) | **13** |
| 13 | Partenaires : bandeau en boucle | Home.tsx §12 | **À revoir** : il n'existe **aucun logo** (6 cartes texte, dont 4 « TODO ») | Liens qui défilent : doublons lus et tabulables ; WCAG 2.2.2 impose un bouton pause | **17** (attente logos) |
| 14 | Boutons : flèche + magnétique | [Buttons.tsx](../src/components/wahhf/Buttons.tsx) | Flèche **déjà faite** (45°, 300 ms) ; magnétique à faire | Magnétique sur un bouton du header fixe/masqué ; Tailwind 4 limite déjà `hover:` aux appareils à survol | **14** |
| 15 | Thème clair/sombre fluide | Navbar.tsx (bascule), index.css, index.html | **À revoir** | 1 430 couleurs en dur, 2 seules `var(--wahhf-*)` : `@property` exigerait une refonte complète ; flash au chargement déjà présent | **16** |
| 16 | Footer | Footer.tsx | Faisable | « Retour en haut » via `window.scrollTo` à brancher sur Lenis | **15** |
| 17 | Transitions de page | [App.tsx](../src/App.tsx), Layout.tsx | Faisable | Un conteneur animé en `transform` casse l'épinglage ; remise en haut à faire après la sortie ; `ScrollTrigger.refresh()` après l'entrée | **2** (tôt) |

**Pourquoi cet ordre.** Les transitions de page (17) passent en 2 : elles enveloppent toutes les pages, et les sections épinglées doivent être construites et testées à l'intérieur de ce conteneur, pas l'inverse. Le rideau (3) vient après le hero (4), parce que le titre doit attendre le rideau : il faut d'abord un titre animé à retarder. Les partenaires (13) passent en dernier, en attente des logos.

---

## (c) Problèmes bloquants à corriger avant d'animer

1. **Photos cassées en production.** [api.ts:6-12](../src/services/api.ts#L6-L12) référence `'/src/assets/images/….jpg'` en texte : Vite ne les copie pas dans `dist/` (vérifié), donc 13 images sur 16 manquent sur l'accueil. Correctif : les importer (`import hero from '../assets/images/…'`) ou les déplacer dans `public/`, et en profiter pour les convertir en WebP/AVIF avec `srcset` (aujourd'hui 5 JPEG de 0,86 à 1,04 Mo, 4,7 Mo au total).
2. **Tailwind analyse le dossier `.claude/`** (les skills installés juste avant cet audit) : +27 kB de CSS (114 au lieu de 87 kB, soit +34 %) et l'avertissement Vite `/grid.svg didn't resolve`. Correctif d'une ligne dans `index.css` : `@source not "../.claude";`.
3. **Défilement natif en conflit avec Lenis.** `html { scroll-behavior: smooth }` ([index.css:67](../src/index.css#L67)), `window.scrollTo` dans [Layout.tsx:24](../src/components/Layout.tsx#L24) et [Footer.tsx:19](../src/components/Footer.tsx#L19).
4. **Flash de thème au chargement.** Le thème est appliqué dans un `useEffect` ([Navbar.tsx:48-76](../src/components/Navbar.tsx#L48-L76)) : un visiteur en thème sombre voit la page claire avant chaque chargement. Correctif : petit script en ligne dans `index.html`, exécuté avant React. C'est un prérequis de l'effet 15 (« jamais de flash blanc »).
5. **Ancres.** Sept liens inter-pages (`/agir#benevole`, `/agir#partenaire` ×3, `/qui-sommes-nous#gouvernance`, `/mobilite-langues/academie#test-niveau`, `…/accompagnement#pays`) arrivent en haut de page : `Layout` remet le défilement à 0 et rien ne gère le `#`. Pas de `scroll-margin-top` pour le header fixe. 13 des 14 sections de l'accueil n'ont pas d'`id`. Correctif : un seul gestionnaire de défilement (route + `#` + Lenis), posé avec l'effet 1.
6. **Fenêtres superposées non accessibles.** Menu mobile, modale vidéo, carte en plein écran, recherche : pas d'Échap, pas de piège à focus, pas de retour du focus, pas de blocage du défilement. Mesuré à 390 px : le focus reste derrière le menu et la page défile dessous. À corriger avant Lenis (`lenis.stop()`) et avant les animations de sortie (`AnimatePresence`).
7. **Contraste de l'or sur fond clair.** `#E8A317` en texte de 11 à 14 px sur crème = 1,92:1, sur blanc = 2,17:1 (AA : 4,5:1). Sont concernés les sur-titres de toutes les sections, « FOUNDATION » dans le logo du header et des badges. Sur les cartes vert moyen `#14523E` : 4,0 à 4,4:1. C'est une décision de design (voir question 1). La règle « Contrastes AA » est non négociable, et ces sur-titres sont précisément ceux qu'on va animer.

Avant de lancer la phase 2 : **redémarrer Claude Code** pour charger les skills (voir point 9).

**Recommandé, non bloquant :**

- Découper le JS par page (`React.lazy`) et charger la carte (d3, environ 87 kB minifiés) en différé : environ −25 % de JS initial (estimation). Cela compense largement les ajouts du mouvement.
- 55 `transition-all` : lister les propriétés (règle du skill ui-animation : jamais `transition: all`).
- Barres de progression du test de niveau ([LanguageAcademy.tsx:382](../src/pages/LanguageAcademy.tsx#L382)) et de la candidature ([ApplyPage.tsx:159](../src/pages/ApplyPage.tsx#L159)) : elles animent `width`, à passer en `scaleX`.
- La règle CSS globale « réduire les animations » ([index.css:122-129](../src/index.css#L122-L129)) coupe aussi les fondus de couleur et d'opacité, alors qu'elle n'agit pas sur Motion ni sur GSAP. À remplacer par `MotionConfig` + garde GSAP, en gardant les fondus.
- Polices auto-hébergées : Google Fonts transmet l'adresse IP des visiteurs à Google, un point sensible au regard du RGPD pour une fondation en partie allemande. L'auto-hébergement permet aussi le `preload`. Retirer les axes italiques, déclarés mais jamais utilisés.
- Logo PNG de 117 kB (598 × 417) affiché entre 20 et 64 px : une version de 128 px pèserait 5 à 10 kB.
- Ajouter un lien d'évitement (« Aller au contenu »).
- 3 pages passent de `h1` à `h3` (`/nos-actions`, `/notre-impact`, `/contact`).
- L'attribut `lang` du document reste `fr` en anglais.
- Contenus « TODO » visibles en ligne : noms des témoignages, partenaires, chiffres, dates d'actualités, liens des réseaux sociaux, titre de la vidéo.
- `framer-motion` est une dépendance directe, importée par [VkiBusiness.tsx](../src/pages/VkiBusiness.tsx) : unifier sur `motion/react` (même code, pas de doublon dans le paquet).

---

## (d) Ajustements proposés à la liste d'effets

- **1. Fondations.** Remplacer la barre GSAP existante, ne pas en ajouter une seconde. Lenis avec `anchors: { offset: -96 }` pour le header fixe ; le défilement reste natif sur tactile (comportement par défaut de Lenis). Le même module gère le `#` après un changement de route.
- **2. Header.** Garder le masquage existant et le passer à 0,4 s. Ne pas masquer le header quand le focus y est, ni quand un menu est ouvert. Menu mobile : `clip-path` en cercle qui part du bouton burger (continuité spatiale), focus piégé, Échap, défilement bloqué. Le geste « glisser vers le haut » est conservé.
- **3. Rideau.** 1,2 s maximum, plafonné par un minuteur, sans attendre aucune image. Seulement si la session commence sur l'accueil (pas sur `/candidater` ni sur une page légale), jamais sur `/vkibusiness`, jamais avec « réduire les animations ».
- **4. Hero.** Deux lignes sémantiques coupées à la virgule (« Autonomiser la jeunesse, / transformer les communautés », pareil en anglais), animées avec Motion comme demandé. Parallaxe limitée à **1,12** tant que l'image fait 1376 px ; 1,25 seulement avec une source d'au moins 2400 px. Supprimer la boucle `animate-bounce` de l'indicateur. Image du hero en `fetchpriority="high"`.
- **5. Mission.** SplitText sur les deux paragraphes, une seule fois, avec `aria` géré par SplitText. Re-découpage au changement de langue.
- **6. Chiffres.** Rien à refaire : garder `Counter.tsx`.
- **7. Domaines.** Épinglage seulement si la fenêtre fait au moins 1024 px de large **et** 760 px de haut ; sinon, grille. Mobile (< 768 px) : garder le carrousel natif existant. Tablette (768 à 1023 px) : garder la grille 2 colonnes (les règles autorisent « carrousel ou grille »). Une carte qui reçoit le focus fait défiler la page jusqu'à elle. Marge haute pour le header.
- **8 + 9. Un seul agrandissement au défilement.** Je propose de le garder sur **Mobilité & Langues** (8). Pour la **vidéo** (9), la vignette apparaît simplement, puis s'ouvre en plein écran **au clic** grâce à une transition partagée Motion (`layoutId`) : c'était l'intention notée dans le code (« s'agrandit en plein écran à la demande »), et cela évite deux effets identiques à la suite.
- **10. Frise.** Tracé en `scaleY` + scrub, autorisé aussi sur mobile (une seule transformation, léger). Jalons sans délai cumulé.
- **11. Carte.** Cascade des régions déclenchée à l'entrée dans l'écran, après le chargement des cartes. Arc dessiné une fois à chaque changement de pays, en remplacement des pointillés qui défilent en continu. Le halo pulsant est limité à quelques cycles. Le tracé d'arc utilise `stroke-dashoffset` : c'est une exception assumée à la règle transform/opacity.
- **12. Cartes.** Décalage de 0,1 s uniquement sur les grilles de cartes, pas de seconde apparition des titres. Carrousel de témoignages avec glisser (`drag="x"`), en gardant les boutons, avec `aria-live`.
- **13. Partenaires.** Reporté jusqu'à l'arrivée des logos ; d'ici là, grille avec décalage. Ensuite : logos non cliquables, moitié dupliquée `aria-hidden` + `inert`, bouton pause visible, bandeau immobile avec « réduire les animations », lien « Tous nos partenaires » hors du bandeau.
- **14. Boutons.** Garder le pivot existant. Effet magnétique seulement sur les grands boutons de contenu (« Faire un don » en taille `lg`, appels « Candidater »), jamais dans le header ni dans les menus ; ordinateur (≥ 1024 px) et souris (`pointer: fine`) uniquement.
- **15. Thème.** Fondu de 0,5 s avec la **View Transitions API** (`document.startViewTransition`) au lieu de `@property`. Ça fonctionne avec les 1 430 couleurs existantes sans refonte ; navigateur sans support : bascule instantanée, sans flash. Corriger d'abord le flash au chargement (bloquant 4).
- **16. Footer.** « Retour en haut » via `lenis.scrollTo`, puis focus remis en haut de page pour le clavier.
- **17. Transitions de page.** Fondu **d'opacité seulement** (aucun `transform` sur le conteneur, sinon l'épinglage casse), `mode="wait"`, remise en haut après la sortie, défilement vers le `#` après l'entrée, `ScrollTrigger.refresh()`.
- **Sections hors liste** (Notre approche, Newsletter + bande don) : seulement l'apparition existante des titres et un décalage discret, aucun effet fort.
- **Anciennes pages** (About, Structure, Tarifs, etc.) : aucun nouvel effet ; elles profitent de `MotionConfig`.
- **Pages légères** (candidature, test de niveau, avertissement, pages légales, Contact) : rien de plus qu'un fondu ; passer les barres de progression en `scaleX`.
- **VkiBusiness** : laissée telle quelle, hors périmètre.

---

## (e) Questions

1. **Contraste de l'or.** Pour les petits textes sur fond clair, je propose un « or texte » plus foncé, par exemple `#8C5E00` (5,0:1 sur crème, 5,7:1 sur blanc), en gardant `#E8A317` pour les grands titres, les fonds et le décor. D'accord, ou une autre teinte validée par IROKO ?
2. **Photos.** Pouvez-vous fournir le hero en 2400 px de large au moins, et les vraies photos ? Pour la conversion WebP/AVIF : je génère les fichiers une fois (recommandé, aucune dépendance ajoutée), ou on ajoute un plugin de build ?
3. **Agrandissements.** D'accord pour un seul agrandissement au défilement (Mobilité & Langues), la vidéo s'ouvrant au clic par une transition partagée ? Ou voulez-vous les deux ?
4. **Partenaires.** Avez-vous les logos ? Sinon, je reporte le bandeau et garde la grille.
5. **Carte de présence.** L'effet 11 renvoie au « Prompt 3 », que je n'ai pas. Pouvez-vous le coller ?
6. **Thème.** D'accord pour la View Transitions API plutôt que `@property` (qui demanderait de réécrire les 1 430 couleurs) ?
7. **Rideau.** Uniquement quand la visite commence sur l'accueil ?
8. **Hors mouvement mais recommandé** : découpage du JS par page, polices auto-hébergées, lien d'évitement, titres `h3` à remonter. Je les inclus en phase 2, ou on les traite plus tard ?

---

# Annexe : détail de l'audit

## 1. Stack

| Élément | Version installée |
|---|---|
| React / React DOM | 19.2.5 |
| Vite | 6.4.6 (`@vitejs/plugin-react` 5) |
| Tailwind CSS | 4.2.2 via `@tailwindcss/vite` ; pas de `tailwind.config` (thème dans `@theme` de `src/index.css`) ; mode sombre par classe `.dark` (`@custom-variant`) |
| Routeur | react-router-dom 7.18.5 (`BrowserRouter`, 30 routes dont 4 redirections) |
| Mouvement | motion 14.14.0 (+ framer-motion 14.14.0 dédupliqué), gsap 3.15.1, @gsap/react 2.1.2, lenis 1.3.27 (non utilisé) |
| Autres | i18next 26 (FR/EN), react-simple-maps 5 + d3-geo, lucide-react, tailwind-merge (utilisé par 1 seule page) |

**Configuration Vite.** Alias `@` vers la racine, HMR désactivable par variable d'environnement. Aucun réglage de build (pas de découpage du JS).

**Structure.** `src/pages` (15 fichiers, dont `TransversalPages.tsx` qui regroupe 7 pages), `src/components` (Layout, Navbar, Footer, WhatsAppButton) et `src/components/wahhf` (14 composants), `src/services/api.ts` (données d'exemple + fonctions prêtes pour une API Symfony), `src/data` (régions, pays), `src/locales` (fr, en), `public/geo` (GeoJSON des cartes).

**Assemblage de l'accueil** ([Home.tsx](../src/pages/Home.tsx)) : 14 sections dans `<main>`, sans composant de section dédié.

| § | Section | `id` | Hauteur 1440 px | Hauteur 390 px |
|---|---|---|---|---|
| 1 | Hero plein écran | — | 900 | 844 |
| 2 | Mission | `#mission` | 652 | 1142 |
| 3 | Chiffres clés (4 compteurs) | — | 627 | 1193 |
| 4 | 6 domaines (grille / carrousel mobile) | — | 1398 | 931 |
| 5 | Mobilité & Langues (3 cartes) | — | 968 | 1758 |
| 6 | Vidéo (vignette + modale) | — | 1085 | 617 |
| 7 | Notre approche (5 vignettes) | — | 717 | 1567 |
| 8 | Frise « Notre parcours » | — | 1442 | 1445 |
| 9 | Présence (2 cartes) | — | 1520 | 2340 |
| 10 | Témoignages (carrousel à boutons) | — | 942 | 1126 |
| 11 | Actualités (3 cartes) | — | 996 | 2008 |
| 12 | Partenaires (6 cartes texte) | — | 709 | 1179 |
| 13 | Agir (3 cartes) | — | 835 | 1391 |
| 14 | Newsletter + bande don | — | 709 | 945 |

Hauteur totale de la page : 13 990 px à 1440 px, 19 968 px à 390 px (environ 24 écrans).

## 2. Animations existantes

- **Bibliothèques** : Motion (14 fichiers), GSAP + ScrollTrigger (1 fichier : `Layout.tsx`, où `registerPlugin` est appelé), CSS. Pas d'AOS.
- **Motion** : apparition des titres de section ([SectionHeader.tsx](../src/components/wahhf/SectionHeader.tsx), `whileInView`, 0,75 s, `[0.22, 1, 0.36, 1]`, réduit-mouvement géré) ; 4 fondus du hero (0,7 à 0,85 s) ; jalons de la frise ; compteurs (`useInView` + `requestAnimationFrame`) ; bulle WhatsApp qui apparaît depuis `scale(0)`, sans garde réduit-mouvement ; fondus des anciennes pages (About, Catalogue, Contact, Founders, Realisation, Structure, Tarifs), sans garde réduit-mouvement ; VkiBusiness (import `framer-motion`).
- **GSAP** : barre de progression ([Layout.tsx:27-49](../src/components/Layout.tsx#L27-L49)), scrub 0,2, recréée à chaque route.
- **CSS** : header masqué au défilement ([Navbar.tsx:95-108](../src/components/Navbar.tsx#L95-L108), 300 ms) ; soulèvement des cartes au survol ; zoom des images au survol (DomainCard, actualités, vidéo) ; flèche des boutons qui pivote de 45° ; **3 boucles infinies** (`animate-bounce` sur la flèche du hero, `animate-ping` sur la carte du Cameroun, pointillés de l'arc Europe sur 14 s) ; transition de couleur du `body` (0,3 s) ; `scroll-behavior: smooth` ; règle globale « réduire les animations ».
- **Doublons et conflits avec la cible** : barre de progression (effet 1) et masquage du header (effet 2) existent déjà, à remplacer ou adapter et non à empiler ; `scroll-behavior` et `window.scrollTo` sont incompatibles avec Lenis.
- **Pas de conflit de transform** : Tailwind 4 utilise les propriétés `translate` et `scale` séparées, qui se combinent avec le `transform` écrit par Motion et GSAP.

## 4. Mise en page

- **Éléments fixes** : barre de progression (`z-100`, 3 px), header en pilule fixe (`top-3`, environ 80 px de haut avec la marge, `z-50`), bulle WhatsApp en bas à droite (`z-40`), bandeau cookies en bas (`z-50`, recouvre la bulle sur mobile tant qu'il n'est pas validé), modales (`z-50`).
- **Épinglage** : aucun ancêtre des sections n'a de `transform` ni de `filter` (bon). Le futur conteneur des transitions de page ne doit pas en avoir non plus. Le header, quand il réapparaît, recouvre les 80 premiers px d'une section épinglée.
- **Débordement horizontal** : aucun mesuré (14 routes à 390 et 1440 px). Pas de `overflow-x: hidden` global, donc la bande horizontale des domaines devra être découpée par sa section.
- **Ancres** : seul `#mission` existe sur l'accueil ; les `id` des autres pages existent (`gouvernance`, `benevole`, `partenaire`, `pays`, `test-niveau`, `calendrier-sessions`) mais les liens inter-pages ne défilent pas jusqu'à eux.
- **Hauteur du hero** : `min-h-screen` (100vh). Sur mobile, préférer `svh` pour la parallaxe, afin d'éviter les sauts dus à la barre d'adresse.

## 5. Images et polices

| Image | Format | Poids | Dimensions | Affichée (1440 px) |
|---|---|---|---|---|
| hero_youth | JPEG baseline | 1 015 kB | 1376 × 768 | 1512 × 945 (agrandie) |
| education / health / entrepreneurship / environment | JPEG baseline | 863 à 1 041 kB | 1200 × 896 | 387 × 242 (cartes) à 1022 × 574 (vidéo) |
| Logo WAHHF | PNG | 117 kB | 598 × 417 | 20 à 64 px |

- **Toutes cassées en production** sauf le logo (voir bloquant 1).
- Ratios réservés sur les cartes (`aspect-[16/10]`, `aspect-video`) ; `width`/`height` présents sur l'accueil, absents sur 9 images d'autres pages.
- `loading="lazy"` sur les images sous la ligne de flottaison de l'accueil (bon) ; le hero n'est pas en lazy (bon) mais n'a ni `fetchpriority`, ni `preload`, ni `srcset`.
- `public/logo.svg` est un ancien monogramme IROKO violet, inutilisé.
- **Polices** : feuille Google Fonts bloquante (`display=swap`, `preconnect` présents). Téléchargé réellement : DM Sans 61 kB + Fraunces 66 kB (latin, variables), soit environ 127 kB. Les italiques sont demandées (75 et 80 kB) mais jamais utilisées, donc jamais téléchargées. Il y a un changement de police visible au chargement, que SplitText doit attendre (`autoSplit`).

## 6. Accessibilité

- **Contrastes** (mesurés sur le rendu) : voir bloquant 7. Le thème sombre ne garde que le cas or sur vert moyen (4,0 à 4,4:1).
- **Titres** : un `h1` par page ; sauts `h1` → `h3` sur `/nos-actions`, `/notre-impact` et `/contact`.
- **Clavier** : tout l'accueil est atteignable à la tabulation (70 arrêts relevés, ordre logique). Les boutons ont un `focus-visible` ; les pays de la mini-carte Europe n'ont qu'un changement de couleur (`outline-none`) ; 2 éléments focalisés passent sous le header fixe ; aucun lien d'évitement ; aucune gestion d'Échap dans le site.
- **Alt** : 18 images sur 18 en ont un (celui des témoignages contient « TODO »).
- **Réduire les animations** : règle CSS globale (trop large) ; `useReducedMotion` dans Home, SectionHeader, Counter et les cartes seulement ; pas de `MotionConfig`, donc les anciennes pages et la bulle WhatsApp animent quand même ; la barre GSAP n'est pas gardée (acceptable, elle suit le défilement).

## 7. Performance

- **Build** : `index.js` 1 044 kB (321 kB gzip), `index.css` 114 kB (17,9 kB gzip ; 87 kB / 13,3 kB gzip sans `.claude/`). Avertissements Vite : fichier > 500 kB ; `/grid.svg` non résolu (lié à `.claude/`).
- **Ce qui pèse** (minifié) : react-dom 178 kB, Motion 147 kB (motion-dom 125 + framer-motion 22), GSAP 113 kB, d3 (geo, selection, transition, color, zoom) environ 79 kB + react-simple-maps 8 kB, i18next 61 kB, react-router 39 kB, données `api.ts` 37 kB, lucide 30 kB, tailwind-merge 26 kB. Les 15 pages sont toutes dans le fichier d'entrée.
- **Pile mouvement** (gzip, mesuré) : Motion 58,7 kB ; GSAP 27,2 kB, + ScrollTrigger 44,4 kB, + SplitText 47,4 kB ; Lenis 5,3 kB ; **total 111 kB**, sous le budget de 168 kB. Motion et GSAP + ScrollTrigger étant déjà livrés, la phase 3 ajoute surtout SplitText et Lenis (environ 10 à 15 kB gzip).

## 8. Mobile (390 px)

- Aucun débordement horizontal sur les 14 routes.
- **Menu** : plein écran (390 × 844, contenu de 874 px qui défile), 17 liens, sans animation ; le focus n'entre pas dans le menu et la page reste défilable dessous ; fermeture par bouton ou par glissement vers le haut.
- **Carrousel des domaines** : natif, `scroll-snap-type: x mandatory`, 6 cartes de 328 px (2 118 px de bande), boutons précédent/suivant. Il fonctionne déjà et correspond à la cible mobile.
- **Témoignages** : boutons seulement, pas de glisser. **Régions** : rangée de puces défilante.

## 9. Skills

| Skill | Sur disque (`.claude/skills/`) |
|---|---|
| gsap-core, gsap-timeline, gsap-scrolltrigger, gsap-plugins, gsap-react, gsap-performance | ✓ |
| ui-animation | ✓ |
| color-motion | ✓ |
| ui-design (remplace `ui-audit`, renommé par son auteur) | ✓ |

Aucun skill ne manque sur disque. En revanche, ils ont été installés après le démarrage de cette session de Claude Code et n'y sont pas chargés : **redémarrer Claude Code avant la phase 2**. Pour la vérification finale « ui-audit », utiliser `ui-design` (mode Audit).

---

# Phases 2 et 3 : réalisation

Décisions appliquées : celles du feu vert du 13 novembre, plus deux réponses complémentaires : (1) petits textes or sur vert moyen ou badges teintés → `--gold-text-on-green: #F2B544` ; (2) rideau de chargement **seulement si la visite commence sur l'accueil**.

Les skills ont été suivis en lisant directement leurs fichiers (`gsap-react`, `gsap-scrolltrigger`, `gsap-plugins` pour SplitText, `gsap-performance`, `ui-animation`, `color-motion` pour le thème et le fond du hero), car ils n'étaient pas chargés dans la session.

## Étape A : corrections (un build après chaque point, tous réussis)

| # | Correction | Résultat mesuré |
|---|---|---|
| 1 | Photos importées par Vite, converties en WebP (3 largeurs chacune) avec `srcset`/`sizes` ; hero en `fetchpriority="high"` | 15 WebP dans `dist/`, plus aucune image cassée ; 4,57 Mo de JPEG → 716 kB (−84 %) aux plus grandes tailles. Les JPEG d'origine restent dans `src/assets/images` mais ne sont plus livrés |
| 2 | `@source not "../.claude";` | CSS 114 → 87 kB ; avertissement `/grid.svg` disparu |
| 3 | `scroll-behavior: smooth` et les deux `window.scrollTo` supprimés → module unique [src/lib/scroll.ts](../src/lib/scroll.ts) (Lenis si actif, sinon natif instantané) | — |
| 4 | Script de thème dans [index.html](../index.html), exécuté avant React | Plus de flash clair pour les visiteurs en sombre |
| 5 | `id` sur les 14 sections de l'accueil ; `scroll-padding-top` = hauteur du header (couvre aussi le focus clavier) ; gestion du `#` après navigation | Les 7 liens du type `/agir#benevole` et les liens directs (`/qui-sommes-nous#gouvernance`) arrivent sous le header (mesuré : 96 px) |
| 6 | Hook [useDialog](../src/lib/useDialog.ts) : menu mobile, recherche, vidéo, carte plein écran | Échap ferme, focus gardé puis rendu au bouton d'ouverture, page figée (`overflow: hidden` + `lenis.stop()`) ; Échap ferme aussi le méga-menu |
| 7 | Pages chargées à la demande (`React.lazy`, sauf l'accueil) ; cartes d3 en différé ; polices auto-hébergées ([public/fonts](../public/fonts), préchargées, sans italiques) ; lien « Aller au contenu » ; 52 `transition-all` → `transition` ; barres de progression (test de niveau, candidature, filet About) en `scaleX` | JS initial 1 048 → 713 kB (322 → 234 kB gzip, −27 %) ; cartes d3 dans un fichier séparé de 101 kB ; plus aucune requête vers Google |
| 8 | `--gold-text: #8A5A00` (texte or sur fond clair) et `--gold-text-on-green: #F2B544` ; utilitaires `text-gold-text`, `text-gold-on-green` ; 35 emplacements corrigés | **0 échec AA** mesuré sur 19 routes, à 390 et 1440 px, en thème clair comme sombre |

## Étape B : effets

Structure : [src/effects](../src/effects) (effets réutilisables), [src/lib](../src/lib) (`reducedMotion.js`, `lenis.ts`, `gsap.ts`, `scroll.ts`, `scrollLock.ts`, `useDialog.ts`, `useMediaQuery.ts`). Aucun composant, route ni texte supprimé.

| # | Effet | État | Réalisation |
|---|---|---|---|
| 1 | Lenis + barre de progression | ✅ | [lenis.ts](../src/lib/lenis.ts) branché sur le ticker GSAP (`ScrollTrigger.update`), coupé si « réduire les animations » (et à chaud si le réglage change) ; ancres de la même page gérées avant le routeur. Barre GSAP **remplacée** par [ReadingProgress](../src/effects/ReadingProgress.tsx) (Motion `useScroll`, `scaleX`) |
| 17 | Transitions de page | ✅ | [PageTransition](../src/effects/PageTransition.tsx) : **opacité seule**, sortie 0,25 s, entrée 0,4 s ; défilement remis en haut après la sortie ; `ScrollTrigger.refresh()` après l'entrée. Pas de fondu entre deux URL d'une même page (niveau d'allemand, fiche pays, article) pour garder leur état |
| 2 | Header + menu mobile | ✅ | Masquage existant conservé, passé à 0,4 s, jamais masqué si le focus est dedans ou un menu ouvert ; menu mobile : `AnimatePresence` + `clip-path` qui se déroule (0,7 s, `[0.76, 0, 0.24, 1]`), fondu simple en mode réduit |
| 4 | Hero | ✅ | Titre en 2 lignes (coupé à la virgule) qui montent derrière un masque ([MaskedLines](../src/effects/MaskedLines.tsx), décalage 0,12 s) ; zoom très lent 1,05 → **1,1** ; parallaxe 20 px sur ordinateur ; boutons après le titre ; **rebond infini de la flèche supprimé** |
| 3 | Rideau | ✅ | [LoadingCurtain](../src/effects/LoadingCurtain.tsx) : accueil seulement, une fois par session, 1,3 s (plafond 1,5 s), minuté (n'attend aucun téléchargement), laisse passer les clics ; le titre du hero attend sa levée |
| 5 | Mission (SplitText) | ✅ | [SplitReveal](../src/effects/SplitReveal.tsx) : `lines` + `mask: 'lines'` + `autoSplit`, animation créée dans `onSplit` et renvoyée, une seule fois ; **bascule FR/EN** : remontage par clé de langue (re-découpage propre, sans rejouer l'effet) |
| 6 | Compteurs | ✅ (existant) | [Counter.tsx](../src/components/wahhf/Counter.tsx) conservé : une seule fois, valeur finale en mode réduit |
| 7 | Galerie des 6 domaines | ✅ | [HorizontalGallery](../src/effects/HorizontalGallery.tsx) : épinglage **seulement si ≥ 1024 px de large ET ≥ 760 px de haut** (souris, animations autorisées) ; distance = bande − écran, en fonctions + `invalidateOnRefresh` ; le titre devient le premier panneau de la bande ; **une carte atteinte au Tab fait défiler jusqu'à elle** ; ancre `#domaines` sur la section parente. Sinon : grille (tablette, ordinateur bas, mode réduit) ou carrousel tactile (téléphone) |
| 8 | Mobilité & Langues | ✅ | [ExpandSection](../src/effects/ExpandSection.tsx) : carte arrondie centrée → pleine largeur (`clip-path`, scrub, ordinateur), puis cascade titre / 3 cartes / bouton ; marge de la carte bornée pour que le texte reste toujours sur le vert, même en remontant ; cascade seule sur téléphone |
| 9 | Vidéo (version simplifiée) | ✅ | Léger agrandissement 0,92 → 1 au défilement (ordinateur) ; plein écran **au clic** par transition partagée (`layoutId`) ; Échap ferme, focus rendu à « Regarder » ; `preload="none"`, lecture seulement sur Play |
| 10 | Frise | ✅ | [useTimelineDraw](../src/effects/useTimelineDraw.ts) : ligne en `scaleY` scrubée, chaque jalon apparaît quand la ligne l'atteint ; délais cumulés supprimés |
| 11 | Carte de présence | ✅ (Prompt 3) | Régions qui apparaissent en cascade du sud vers le nord à l'entrée dans l'écran (opacité, 0,8 s, décalage 0,07 s) ; point du chef-lieu sélectionné qui pulse 3 fois puis s'arrête (4,8 s < 5 s) ; arc Europe qui se dessine une fois à chaque nouveau pays (0,9 s) au lieu des pointillés en boucle ; plein écran en fondu 0,6 s. Rien de tout cela en mode réduit. Détail dans la section « Prompt 3 » ci-dessous |
| 12 | Actualités, témoignages, Agir | ✅ | [StaggerGroup](../src/effects/StaggerGroup.tsx) (Motion `useInView` once, amount 0,3, décalage 0,1 s) sur Actualités et Agir, et discrètement sur Notre approche, Partenaires et le footer ; zoom lent des images au survol (1,2 s, CSS) ; témoignages glissables (`drag="x"`), boutons conservés, annonce `aria-live` |
| 14 | Boutons | ✅ | Pivot de la flèche conservé ; variante `hover:` de Tailwind redéfinie sur `(hover: hover) and (pointer: fine)` pour **tout le site** ; [useMagnetic](../src/effects/useMagnetic.ts) (`gsap.quickTo`, 8 px max, retour 0,4 s sans rebond) sur 9 boutons « Faire un don » / « Candidater » du contenu, **jamais dans le header** |
| 16 | Footer | ✅ | Colonnes en apparition douce ; « Retour en haut » via Lenis, puis focus remis en haut de page (lien d'évitement, visible seulement au clavier) |
| 15 | Thème clair/sombre | ✅ | [themeTransition.ts](../src/effects/themeTransition.ts) : **View Transitions API**, fondu enchaîné de 0,5 s (courbe color-motion) ; transitions CSS de couleur coupées pendant la bascule ; repli instantané sans animation (navigateur sans support ou mode réduit) |
| 13 | Bandeau partenaires | ⏸ **reporté** (aucun logo) | La grille actuelle reçoit seulement l'apparition discrète. Le bouton pause sera ajouté si le bandeau est fait |

## Compromis choisis

- **Accueil non différé** : toutes les pages sont chargées à la demande sauf l'accueil, page d'entrée la plus fréquente, pour éviter un aller-retour réseau avant le hero.
- **Galerie épinglée** : le titre de section devient le premier panneau de la bande, sinon la section ne tient pas dans 760 px de haut.
- **Cascades en opacité seule** (pas `autoAlpha`) : un élément en `visibility: hidden` sortirait de l'ordre de tabulation. Dès qu'un élément encore masqué reçoit le focus, l'apparition se termine aussitôt.
- **Transitions CSS des cartes animées** limitées aux propriétés du survol (sans `opacity` ni `transform`, réservés à GSAP/Motion). C'était la cause d'un défaut trouvé au test : des cartes restaient invisibles.
- **Vidéo** : la lecture demande un appui sur Play après l'ouverture (aucun son ne démarre sans action explicite).
- **Réduire les animations** : la barre de progression reste active (elle suit le défilement, sans mouvement autonome) ; la règle CSS globale existante est conservée telle quelle (non demandé).

## Poids mesurés

| Élément | Avant (audit) | Après |
|---|---|---|
| JS au premier chargement (accueil) | 1 044 kB / 321 kB gzip | **792 kB / 261 kB gzip** (−19 %), malgré l'ajout du mouvement |
| CSS | 114 kB / 17,9 kB gzip | 93,3 kB / 14,8 kB gzip |
| Pile mouvement (Motion + GSAP/ScrollTrigger/SplitText/useGSAP + Lenis) | — | **111,8 kB gzip**, sous le budget de 168 kB |
| Photos livrées (toutes tailles WebP) | 4,7 Mo de JPEG (cassés en production) | 1,4 Mo au total pour 15 fichiers ; un seul fichier par image téléchargé selon l'écran |
| Polices | Google Fonts, bloquantes | 224 kB pour 4 fichiers auto-hébergés (2 réellement chargés : 127 kB) |

Avertissement Vite restant : le fichier principal dépasse 500 kB minifiés. Il contient React, Motion, GSAP et i18n, que l'accueil utilise tous.

## Vérifications finales (build de production, Chrome headless)

| Vérification | Résultat |
|---|---|
| `npm run build` et `tsc --noEmit` | ✅ sans erreur |
| Console du navigateur | ✅ 0 erreur, 0 avertissement (accueil + 15 routes, 390 et 1440 px) |
| Débordement horizontal | ✅ 0 px partout |
| Texte resté caché après défilement | ✅ aucun (390, 1440, mode réduit) |
| Rideau | ✅ présent à 350 ms, titre en attente, levé avant 1,5 s |
| Galerie : redimensionnement 1440 → 1200 → 1440 px | ✅ positions identiques au pixel près |
| Clavier (Tab sur tout l'accueil) | ✅ 109 arrêts jusqu'à « Retour en haut » (107 + les 2 liens des crédits de carte), aucun sur un élément invisible ; les cartes de la galerie et de Mobilité sont atteintes |
| Fenêtres | ✅ vidéo, menu mobile : focus dedans, Échap, focus rendu, page figée |
| **« Réduire les animations » émulé** | ✅ pas de rideau ; titre affiché directement (transform `none`) ; pas de Lenis ; galerie en grille sans épinglage ; compteurs à 1 250+ / 6 / 10 / 10 ; SplitText non appliqué ; rien de masqué |
| Contrastes AA | ✅ 0 échec (thème sombre) ; en thème clair, 7 signalements, tous dans la section Mobilité : faux positifs du script (le fond vert y est un calque frère du texte), vérifiés par capture d'écran à 1280 px en remontant la page |

Point restant connu : le lien « Aller au contenu » apparaît au-dessus du header (voulu). Le pays de la mini-carte Europe qui passait sous le header au focus est réglé par le nouveau cadrage (vérifié sur les 10 pays).

## Revues des skills

Les deux revues ont été menées en mode « rapport seul », de façon indépendante, en suivant les fichiers des skills.

**ui-animation : verdict initial Block, corrigé, puis revérifié.** Trois raisons bloquantes, toutes corrigées :

1. Sur mobile, le geste « glisser vers le haut pour fermer » le menu entrait en conflit avec le défilement de ce menu (plus haut que l'écran). Il n'est désormais armé que si le menu est déjà tout en bas.
2. Les boutons magnétiques et les cartes à apparition décalée gardaient une transition CSS sur `transform` et `opacity`, qui re-lissait chaque image envoyée par GSAP ou Motion. Ces transitions sont maintenant limitées aux propriétés du survol.
3. La galerie utilisait `scrub: 1`, contraire à la règle « lié au défilement : linéaire, sans durée ». Elle passe à `scrub: true`.

La revue demandait aussi un recalcul de ScrollTrigger à chaque bascule FR/EN : il est ajouté dans `Layout`, et le test confirme que l'épinglage démarre au bon endroit en anglais. Avec ces corrections, la revue concluait à **Approve**.

Ajustements secondaires appliqués :

- zoom du hero en keyframe CSS (sur le compositeur, plus de `will-change` permanent) ;
- entrée des liens du menu mobile raccourcie et coupée en mode réduit ;
- fond de la vidéo sur la même courbe que le cadre ;
- `scope` ajouté au hook magnétique ;
- galerie recalculée si le réglage « réduire les animations » change en cours de visite ;
- `overscroll-x-contain` sur le carrousel mobile ;
- survols des cartes de domaine ramenés à 300 ms.

Conservé volontairement : les zooms d'image au survol à 0,7 et 1,2 s (l'effet 12 demande un « zoom lent »), et le header à 0,4 s (valeur demandée).

**ui-design (mode Audit, ex-ui-audit) : verdict « prêt avec suivi », 0 bloquant.** Les deux points issus de mes changements ont été corrigés :

- un filet d'erreur ([ChunkErrorBoundary](../src/components/wahhf/ChunkErrorBoundary.tsx)) autour des pages et des cartes chargées à la demande, qui affiche « Réessayer » au lieu d'une page blanche ;
- Échap sur le méga-menu rend désormais le focus au bouton « Nos actions ».

Points préexistants **non corrigés** (hors périmètre, à décider) :

- anneau de focus or (#E8A317) peu contrasté sur fond clair (1,9:1, il faut 3:1) ;
- `<html lang>` qui reste `fr` en anglais ;
- `alt` des images de cartes qui répète le titre ;
- champ e-mail de la newsletter sans `autoComplete="email"`, et double envoi possible ;
- recherche sans message « aucun résultat » ni annonce du nombre de résultats ;
- ~~région sélectionnée de la carte sans indicateur de focus~~ : corrigé avec le Prompt 3 (double trait sombre + clair sur les régions et les pays) ;
- cibles tactiles de moins de 44 px (icônes du header, flèches, puces des régions) ;
- texte de 14 px dans les champs, qui fait zoomer iOS au focus.

## Prompt 3 : carte de présence

**Constat à la reprise.** Le code local avait déjà les vraies données (geoBoundaries, world-atlas) et une page Contact sur OpenStreetMap ; le Google Maps avec filigrane ne se trouve plus que sur le site en ligne, qui date d'avant (il disparaîtra au prochain déploiement). Mais au rendu, la carte du Cameroun s'affichait comme **un grand rectangle or** : les contours geoBoundaries suivent la norme GeoJSON (anneau extérieur dans le sens inverse des aiguilles d'une montre), alors que d3-geo attend l'inverse ; chaque région devenait « toute la Terre sauf elle-même ». La mini-carte Europe coupait le Danemark et la Grèce, et l'étiquette « Depuis le Cameroun » sortait du cadre.

**Ce qui a été fait.**

- Données : anneaux réorientés dans [cameroun-regions.json](../public/geo/cameroun-regions.json) (aucun sommet modifié, contrôle d'aire : 467 758 km² pour 475 442 km² officiels), plus un garde-fou au chargement si le fichier est remplacé un jour ; licence corrigée dans le fichier (CC BY 3.0, et non 4.0).
- Un seul téléchargement par fichier ([geoData.ts](../src/lib/geoData.ts)), lancé quand la section approche, en parallèle du code des cartes ; [presenceGeo.ts](../src/components/wahhf/presenceGeo.ts) prépare les données. Les chemins sont calculés une fois avec d3-geo (le composant `Geographies` re-sérialisait les 166 kB de données à chaque survol).
- [CameroonMap](../src/components/wahhf/CameroonMap.tsx) : projection calée sur les vraies régions ; voisins en pointillés pâles **sans** leur frontière avec le Cameroun (le tracé 1:110m, grossier, aurait doublé la vraie frontière) ; étiquettes des voisins masquées sous 360 px de large ; noms des chefs-lieux à 11 px réels quelle que soit la taille ; contour de la région sélectionnée redessiné au-dessus ; plein écran avec Échap, focus gardé et rendu.
- [EuropeMiniMap](../src/components/wahhf/EuropeMiniMap.tsx) : projection azimutale équivalente centrée sur l'Europe, calée sur Portugal, Pologne, Danemark et Grèce ; la carte **remplit toute la hauteur libre** de la carte blanche (plus de vide sous la liste) et se recalcule au redimensionnement ; arc courbe depuis le coin bas-gauche ; pays = liens (Entrée ouvre la fiche), tabulés dans l'ordre de la liste #01 → #10.
- [CountryList](../src/components/wahhf/CountryList.tsx) : « Pays #01 · Voir la fiche » passe à la ligne au lieu d'être coupé à 390 px.
- Crédits sous la section (exigés par CC BY) : « limites régionales geoBoundaries (CC BY 3.0) · pays Natural Earth ».

**Sources et licences.**

| Fichier | Source | Licence | Poids (brut / gzip) |
|---|---|---|---|
| [cameroun-regions.json](../public/geo/cameroun-regions.json) | geoBoundaries gbOpen CMR ADM1, release 9469f09, géométrie simplifiée publiée par geoBoundaries (source amont : Wikimedia Commons) ; vérifié sommet par sommet contre l'original | **CC BY 3.0**, attribution requise | 59,0 kB / 18,9 kB |
| [countries-110m.json](../public/geo/countries-110m.json) | world-atlas 2.0.2 (Natural Earth 1:110m), identique octet pour octet au paquet npm | Natural Earth : domaine public ; world-atlas : ISC | 107,8 kB / 38,5 kB |
| Page Contact | iframe OpenStreetMap, un seul repère (déjà en place) | © contributeurs OpenStreetMap, ODbL (mention affichée dans l'iframe) | — |

**Poids du code.** JS au premier chargement inchangé (792 kB / 261 kB gzip). Les cartes sont dans des fichiers chargés à la demande : bibliothèques partagées 102,6 kB / 36,2 kB gzip, CameroonMap 8,7 / 3,4 kB, EuropeMiniMap 4,5 / 2,1 kB.

**Tests (build de production).** 22 vérifications d'interaction réussies : cascade, pulsation limitée, survol et clic synchronisés avec le panneau et les chips (dans les deux sens), Tab + anneau de focus + Entrée, plein écran (focus, Échap, retour), liste ↔ carte Europe, arc et étiquette, Entrée → fiche pays, mode réduit (tout visible, arc statique, pas de pulsation), téléphone (étiquettes lisibles, chips qui défilent, aucun débordement), 0 erreur console.

**Anciens textes des régions** (exemples inventés par une version précédente, remplacés par des TODO neutres conformément à « n'invente aucune action ») : Littoral « Antenne principale & Académie de langues » / « Accompagnement linguistique, orientation jeunes & actions solidaires » ; Centre « Relais de coordination & orientation » / « Actions éducatives, prévention santé & ateliers d'information » ; Ouest « Programmes jeunesse, éducation & environnement » ; Sud-Ouest « Soutien éducatif, inclusion & entrepreneuriat des jeunes » ; Nord-Ouest « Appui scolaire, droits & accompagnement communautaire » ; Sud « Sensibilisation environnementale & santé communautaire » ; Est « Actions de terrain santé, éducation & inclusion » ; Adamaoua « Soutien éducatif & initiatives jeunesse » ; Nord « Sensibilisation agroécologique & éducation » ; Extrême-Nord « Solidarité communautaire, scolarisation & prévention ».

**Hors périmètre, signalé sans y toucher.** La page `/contact` est un formulaire de devis événementiel aux couleurs « ktv » (« Devis Rapide & Garanti… chargé d'affaires dédié »), vestige d'un autre modèle ; sa carte est bien OpenStreetMap. `CAMEROON_REGIONS` dans [api.ts](../src/services/api.ts) (positions x/y de l'ancienne carte dessinée) n'est plus utilisé. Le bouton « Voir les actions » envoie `?region=…`, que `/nos-actions` ne lit pas encore. Les textes de la section Présence sont en dur en français (non traduits en anglais).

## Photos et vidéos WAHHF : galerie

**Sources analysées** (`E:/site_wahhf/Wahhf`, laissé intact) : 17 captures TikTok et 4 vidéos.

- **Photos.** Captures d'écran, et non fichiers d'origine : environ 1 000 × 720 px utiles, recompressées par TikTok, avec bandes noires. Le bandeau incrusté « WAHHF FOUNDATION – First Open Day & Boot Camp – 25 avril 2026 – Hôtel Albatros Premium Yaoundé » figure sur 13 photos.
- **Vidéos.** Toutes en 576 px de large. L'une est en HEVC (illisible sur Firefox), les trois autres pèsent entre 41 et 47 Mo pour environ 75 s.

**Décisions (validées).**

- Page `/galerie` avec un aperçu sur l'accueil.
- Hero inchangé en attendant l'original HD de la photo des jeunes.
- Vraies photos sur les cartes de domaines là où le sujet correspond.
- Vidéos réencodées avec ffmpeg, installé via scoop (avec 7-Zip, sa dépendance).

**Préparation** ([scripts/prepare_gallery.py](../scripts/prepare_gallery.py), à relancer quand les originaux arriveront).

- **Recadrages :** bandes noires, bandeau incrusté, interface de story (photo du danseur masqué), panneau publicitaire de paris (photo du rassemblement).
- **Photos :** 3 largeurs en WebP (480, 800, ≈ 1 000 px).
- **Vidéos :** 4 extraits H.264 de 12 à 18 s, avec une image d'aperçu chacun. Le son est gardé pour la chorale seulement ; il est coupé sur les plans de terrain, où le montage peut contenir une musique sous droits.
- **Non retenues :** la photo du barbecue (boîte de whisky, déchets) et la foule autour du barbecue (déchets au sol).

| Élément | Fichiers | Poids |
|---|---|---|
| Vignettes 480 px | 15 | 445 kB |
| Photos 800 px | 15 | 1 005 kB |
| Photos pleine taille (≈ 1 000 px) | 15 | 1 482 kB |
| Images d'aperçu des vidéos | 4 | 91 kB |
| Extraits vidéo (chargés seulement au clic) | 4 | 6,8 Mo (contre 143 Mo à l'origine) |
| JS de l'accueil | — | 809,7 kB / 266,3 kB gzip (+5 kB gzip : visionneuse et données) ; page /galerie : 1,3 kB gzip |

**Où sont les photos.**

- [/galerie](../src/pages/GalleryPage.tsx) : 3 albums, avec puces de filtre.
  - « First Open Day & Boot Camp » : 13 photos et la chorale en vidéo.
  - « Rencontres de la communauté » : 2 photos.
  - « Sur le terrain » : le car, la pépinière et la bananeraie, en vidéo.
- Accueil, section « En images » (entre Actualités et Partenaires) : 5 photos, dont une en grand, et un lien vers la galerie.
- Cartes de domaines :
  - Éducation : un encadrant guide une participante sur ordinateur ;
  - Droits et inclusion : la marche avec le slogan ;
  - Mobilité & Langues : l'intervention en visioconférence, aussi en fond de la page Mobilité. Ce fond devient décoratif (`alt=""`), car l'ancien texte alternatif ne correspondait plus.
- Santé, Entrepreneuriat, Environnement, le hero, les témoignages fictifs (jamais de vrais visages sur des citations inventées) et les actualités fictives gardent leurs images.
- Liens :
  - footer, sous « Notre impact & chiffres » ;
  - recherche du menu (« galerie », « photo », « vidéo ») ;
  - `sitemap.xml`.

**Composants.**

- [GalleryGrid](../src/components/wahhf/GalleryGrid.tsx) :
  - vignettes 4:3 au ratio réservé et en chargement différé ;
  - cadrage réglable par photo ;
  - apparition décalée en opacité ;
  - zoom lent au survol, à la souris seulement.
- [GalleryLightbox](../src/components/wahhf/GalleryLightbox.tsx) :
  - fenêtre accessible (Échap, focus gardé dedans puis rendu à la vignette, page figée) ;
  - ← → au clavier, boutons de 44 px, glisser du doigt ;
  - fondu de 0,6 s, glissement supprimé en mode réduit ;
  - photos voisines préchargées ;
  - images jamais agrandies au-delà de leur taille réelle ;
  - vidéos en `preload="none"`.
- Données : [gallery.ts](../src/data/gallery.ts), avec textes alternatifs, légendes et albums.

**Tests (build de production).** 23 vérifications réussies : albums et filtres, vignettes en petite taille, lecture des vidéos H.264, visionneuse au clavier (ouverture, ← →, Tab piégé, Échap et retour du focus), cartes de domaines, témoignages sans vraies photos, téléphone en thème sombre (2 colonnes, cibles de 44 px), mode réduit, 0 erreur console. Vérification finale relancée : 0 problème sur les 17 pages, 116 arrêts clavier.

**Relevé dans les photos, à vérifier (rien n'a été changé).**

- **Nom de la fondation.** Les kakémonos portent « Watio Hearts Humanitarian Foundation » et le slogan « Sowing hope, harvesting change ». Le site développe WAHHF en « We Are Here Help Foundation ».
- **Coordonnées.** Le dos du polo affiche un numéro allemand (+49…) et un site « wahhf-fondation.com » (lecture sur une capture basse définition). Le footer indique un numéro camerounais et « wahhf-foundation.org ».
- **Domaines.** Les kakémonos citent éducation, santé, moyens de subsistance, autonomisation des jeunes, agriculture et élevage, pas exactement les 6 domaines du site.

## Vidéo YouTube en arrière-plan du hero

**Vidéo** (`e-zT1lNANC0`, mesurée via le lecteur intégré, sans téléchargement) :
- « WAHHF », chaîne WAHHF Foundation ;
- 16:9, 69,8 s, jusqu'en 2160p ;
- intégration autorisée, lecture automatique muette acceptée ;
- générique de fin à partir d'environ 65 s ;
- images souvent claires (le centre monte jusqu'au blanc pur).

**Fichiers.**
- [src/config/heroVideo.ts](../src/config/heroVideo.ts) : identifiant, ratio, début et fin, zoom, rendu à 50 %, délais, mode de consentement.
- [HeroVideoBackground.tsx](../src/components/wahhf/HeroVideoBackground.tsx) : `useHeroVideo`, le calque et le bouton.
- [src/lib/consent.ts](../src/lib/consent.ts) : le bandeau de cookies diffuse désormais le choix du visiteur.
- Styles `.hero-video` et `.hero-veil` dans [index.css](../src/index.css).
- Image d'attente : [public/hero/](../public/hero), miniature publique convertie en WebP 1280 px (23 kB) et 960 px (15 kB), préchargée sur l'accueil depuis `index.html`.
- Un bloc ajouté dans la politique de confidentialité (TODO : texte à valider).

**Fonctionnement.**
- **Chargement :** l'image d'attente s'affiche d'abord. L'iframe `youtube-nocookie` n'est créée qu'après le chargement complet de la page, au moins 3 s après son ouverture, et à un moment d'inactivité.
- **Conditions :** animations autorisées, pas d'économie de données ni de 2G ou 3G (vérifié au moment de créer l'iframe), écran d'au moins 768 px non tactile, cookies non essentiels non refusés.
- **Affichage :** la vidéo apparaît en fondu de 0,8 s quand le lecteur annonce la lecture (postMessage, état 1).
  - Aucun message en 6 s, ou une erreur : l'iframe est retirée et l'image reste.
  - Pause, mise en mémoire tampon ou reprise : retour rapide à l'image, puis la vidéo revient après 3,5 s de lecture continue. Sinon YouTube affiche ses contrôles, son logo et le titre.
- **Pauses :** hors écran (moins de 10 % du hero visible) et onglet caché.
- **Bouton :** « Mettre la vidéo en pause » / « Lire la vidéo », mémorisé pour la session.
- **Une seule iframe**, retirée au changement de page.
- **Recadrage « cover » :** unités de conteneur (`cqw`/`cqh`) avec repli en `vw`/`vh`, et zoom de 1,08. L'iframe est rendue à 50 % puis agrandie, ce qui fait servir à YouTube du 360p–480p au lieu du 1080p.
- **Voile :** environ 60 % sur les bords, 74–76 % dans la bande du texte, 88 % en bas. Pour garder 4,5:1 sur les images claires :
  - la pastille du sur-titre passe en vert foncé ;
  - la phrase d'appui passe à 95 % d'opacité ;
  - le lien de défilement passe à 85 %.

**Mesures.**

| Mesure | Avant | Après |
|---|---|---|
| Lighthouse mobile (Slow 4G simulé, CPU ×4) : score | 71–72 | 71–73 |
| LCP mobile | 5,64 s | **5,04–5,11 s** |
| CLS mobile | 0 | 0 |
| TBT mobile | 183–203 ms (médiane 201) | 194–255 ms (médiane 226), plages qui se recouvrent, forte variation d'un passage à l'autre ; la vidéo ne se charge pas sur mobile |
| Lighthouse ordinateur : score / LCP / TBT | 98 / 0,95 s / 78–82 ms | **96–98 / 0,86–0,99 s / 41–98 ms** |
| JS de l'accueil | 266,3 kB gzip | 269,3 kB gzip |
| Lecteur YouTube (40 s de lecture) | — | ≈ 1,1 Mo de scripts + ≈ 78 ko/s de vidéo (≈ 5,4 Mo par tour de 70 s) |
| Processeur (rendu + GPU) | — | lecture 17–31 % d'un cœur ; hero quitté (pause) 5 % |

- **LCP mobile au-dessus de 2,5 s, avant comme après.** 92 % du temps est un délai d'affichage : exécution du JS, rideau d'accueil, puis apparition du titre et de la phrase. Ce sont des choix de mouvement validés (effets 3 et 4), à arbitrer.
- **Régression évitée sur ordinateur.** Une première version créait l'iframe dès la fin du chargement : le LCP passait à 2,3–2,9 s, à cause des ~1 Mo de scripts YouTube chargés avant l'apparition de la phrase. D'où le délai minimal de 3 s.

**Tests (builds de production, Chrome headless).**
- **Conditions (10 vérifications réussies) :**
  - sous Slow 4G et CPU ×4, titre et image affichés avant toute requête YouTube ;
  - rien vers YouTube avec les cookies refusés, le mode réduit, l'économie de données, en 390 px ou en tablette tactile ;
  - lecteur bloqué : iframe retirée après 6 s, image conservée.
- **Lecture (21 vérifications réussies, sur une build aux délais longs, car le réseau de l'environnement est lent) :**
  - aucune bande, à 1440×900, 1024×768, 768×1024, 1440×620, 2560×1080 et 1280×1400 ;
  - pause hors écran (temps figé) et reprise, pause quand l'onglet est caché ;
  - bouton mémorisé, rechargement compris ;
  - 10 allers-retours accueil ↔ galerie : jamais plus d'une iframe, aucun écouteur `message` restant, mémoire stable ;
  - défilement de toute la page aussi fluide qu'avec la vidéo coupée (95e centile 16,8 ms contre 16,9 ms, aucune image au-delà de 50 ms).
- **Contraste sur 14 images de la vidéo (toutes les 5 s), à 1440 et 768 px :** pire pixel ≥ 4,76:1 pour le sur-titre, le titre, la phrase, le bouton secondaire et le lien de défilement.
- **Bouton pause :** ne touche aucun texte ni la bulle WhatsApp à 6 formats.
- **Vérification finale du site :** 0 problème sur les 17 pages, 116 arrêts clavier.
- **Non testé :** Safari iOS. Sur iPhone et iPad, l'écran est tactile : la vidéo ne s'y charge jamais (image seule).

**Option plus légère (phase 3, non réalisée : il faut le fichier et les droits).** Une boucle hébergée (MP4 H.264 1280 px, 24 i/s, CRF 28, 8 à 15 s, sans son, avec WebM et image d'attente) pèserait 2 à 3 Mo, téléchargés une seule fois. Elle éviterait le tiers et la question du consentement, le risque des 6 s et l'interface YouTube. **Mode recommandé** dès que le fichier est disponible.

## Contenus TODO à remplacer avant la mise en ligne

Non modifiés, comme demandé. Environ 140 marqueurs « TODO », dont la plupart sont visibles à l'écran :

- **Accueil** ([Home.tsx](../src/pages/Home.tsx)) : 3 témoignages fictifs (noms suivis de « (TODO : valider témoignage) ») ; chiffre « 1 250+ » marqué « Valeur d'exemple — TODO » ; 4 partenaires « (TODO) » ; titre de la vidéo « (TODO : vidéo dédiée WAHHF à confirmer) ». La vidéo elle-même est le showreel IROKO.
- **Données** ([api.ts](../src/services/api.ts), 51) : dates d'actualités « (TODO) », durées de cours « (indicatif — TODO) », dates de sessions « (TODO : confirmer date) », étapes de la frise « 2021 (TODO) », etc.
- **Régions** ([regions.ts](../src/data/regions.ts)) : pour chacune des 10 régions, « Antenne locale : à confirmer (TODO) » et « Actions dans la région : à renseigner (TODO) » (voir la section Prompt 3 pour les anciens textes).
- **Pages** : [TransversalPages.tsx](../src/pages/TransversalPages.tsx) (17, dont noms de la gouvernance), [LanguageAcademy.tsx](../src/pages/LanguageAcademy.tsx) (5, certifications), [DonatePage.tsx](../src/pages/DonatePage.tsx) (5), [ApplyPage.tsx](../src/pages/ApplyPage.tsx) (5), [MobilityHub.tsx](../src/pages/MobilityHub.tsx) (4), [Contact.tsx](../src/pages/Contact.tsx) (1), traductions `fr.json`/`en.json` (4 chacune).
- **Footer** ([Footer.tsx](../src/components/Footer.tsx)) : liens réseaux sociaux `#linkedin-todo`… et « (TODO : adresse exacte) ».
- **Galerie** ([gallery.ts](../src/data/gallery.ts)) :
  - lieu et date des « Rencontres de la communauté » ;
  - lieux, dates et projets des vidéos « Sur le terrain » ;
  - autorisations de diffusion : de nombreux participants sont mineurs (autorisations parentales), et des passants figurent sur les photos du parc ;
  - noms et fonctions des personnes des photos « Prise de parole » et « Photo souvenir », pour les pages Qui sommes-nous et Fondateurs ;
  - musique de la vidéo de la chorale (icône ♫ incrustée) à vérifier.

## À valider de ton côté

1. Le rendu réel au navigateur, à la souris et au téléphone, en particulier la galerie épinglée et l'agrandissement de Mobilité & Langues.
2. La teinte `#F2B544` (or clair) sur les badges des sections vertes.
3. Les antennes et actions des 10 régions, et l'adresse exacte pour le repère de la page Contact.
4. Les fichiers originaux du photographe de l'Open Day : sans bandeau ni compression TikTok, ils permettront de passer la photo des jeunes en hero et de rendre la galerie nette (relancer `python scripts/prepare_gallery.py`).
5. Les logos partenaires, pour l'effet 13.
6. Le nom exact de la fondation et les coordonnées (voir « Relevé dans les photos »).
7. Vidéo du hero :
   - l'extrait (proposition : couper à 64 s, avant le générique) ;
   - l'image d'attente (miniature de la vidéo pour l'instant, ou une photo de hero de 1920 px) ;
   - le mode de consentement (`not-refused` actuellement, ou `explicit`, plus prudent) ;
   - le texte de la politique de confidentialité et celui du bandeau de cookies ;
   - le fichier vidéo, pour la boucle hébergée recommandée.
