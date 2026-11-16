# Contrat de design : refonte douce de WAHHF Foundation

> **Statut : validé le 16/11/2026**, avec trois ajustements intégrés (photo du hero, palette réduite aux couleurs qui servent, arc de la mini-carte) ; détail au §13. Rédigé à partir de votre brief (direction « douce »), de `docs/audit-frontend.md` et du code au commit `bd80a33`, puis relu par deux relecteurs indépendants (conformité au brief, exactitude des faits).
> Les codes entre parenthèses (ACC-03, T-15…) renvoient aux points numérotés de l'audit ; « audit, l. 158 » renvoie à une ligne de `docs/audit-frontend.md`. Les ajouts au brief, marqués **(proposition)** pendant la relecture, ont tous été acceptés à la validation (§13). Tous les ratios de contraste ont été calculés, puis tronqués à une décimale (jamais arrondis vers le haut).

## Sommaire

1. Sujet, audience, mission
2. Univers
3. Couleurs (clair, sombre, états, règles, passage depuis les tokens actuels, où sert chaque couleur ajoutée) — tableau complet des contrastes en annexe A
4. Typographie
5. Mise en page
6. Signature : le fil
7. Accueil en 8 sections (ACC-03)
8. Composants partagés
9. Profondeur et rayons
10. Mouvement
11. États
12. Défauts rejetés
13. Décisions (validation du 16 novembre 2026)
14. Test du nom retiré
- Annexe A : tableau des contrastes
- Annexe B : effets de mouvement actuels et leur sort

---

## 1. Sujet, audience, mission

**Sujet.** Une fondation camerouno-allemande à but non lucratif. Son programme réel et vérifiable aujourd'hui est Mobilité & Langues : cours d'allemand gratuits de A1 à C1, test de niveau en ligne de 20 questions, orientation vers 10 pays européens sans intermédiaire payant. Les cinq autres domaines n'ont pas encore de contenu attesté (T-13).

**Audience, par ordre de priorité.**
1. **Le jeune Camerounais de 18 à 30 ans** qui veut apprendre l'allemand ou partir étudier, se former ou travailler en Europe.
   - Il est à Yaoundé, à Douala ou en région, sur un Android milieu de gamme de 360 à 390 px, en 3G/4G avec une data payante, souvent en plein soleil.
   - Cinq minutes plus tôt, il a vu passer sur WhatsApp ou TikTok une offre de visa « garanti » contre paiement. Il se méfie, avec raison.
2. **Le donateur ou le partenaire** (diaspora, Allemagne, entreprises). Il est sur ordinateur ou sur téléphone et cherche des preuves avant de donner.
3. **Le parent ou l'enseignant** qui vérifie que la fondation est sérieuse.

**Les deux verbes du site.** Passer le test d'allemand gratuit (puis candidater) et faire un don. Tout le reste soutient ces deux portes.

**Mission du site.** Faire passer le jeune visiteur de la méfiance à une première étape concrète et gratuite (le test, puis la candidature), sans rien lui vendre, et donner au donateur assez de preuves datées pour soutenir la fondation.

**Sensation.** Comme une salle d'accueil au calme après la rue : de l'air, de la lumière douce, une voix posée qui dit les choses simplement, des visages réels. Rassurant comme un guichet qui ne vous demande pas d'argent.

## 2. Univers

- **Le trajet Cameroun → Europe**, raconté honnêtement : on ne vend pas un départ, on accompagne une préparation.
- **Le cahier de l'apprenant** : niveaux A1 à C1, test, progression étape par étape.
- **La forêt et la sauge** : le vert de la fondation, apaisé, végétal ; la brume du matin plutôt que le blanc clinique.
- **Le soleil et le miel** : la chaleur, en touches rares, jamais en aplat.
- **Le fil** : ce qui relie un point de départ et un point d'arrivée sans promettre de raccourci. C'est la signature (§6).
- **La preuve** : photos datées de l'Open Day de Yaoundé (25 avril 2026), sources officielles, dates de vérification.
- **Vocabulaire** : « gratuit » (dit une fois, au bon endroit), « vérifié », « étape », « niveau », « départ », « accompagner », « sans intermédiaire payant ».

## 3. Couleurs

Deux couches, comme dans la structure de tokens déjà préparée : des **tokens d'univers** (les couleurs ci-dessous) et des **tokens sémantiques** (surface, texte, action, focus…) qui pointent vers eux et changent sous `.dark`. Les composants n'utilisent que les tokens sémantiques.

### 3.1 Palette claire

Les neuf premières viennent de votre brief ; les suivantes sont ajoutées pour couvrir les besoins (cartes, bordures de champ, survols).

| Token | Valeur | Rôle | Où elle a le droit d'apparaître |
|---|---|---|---|
| `--brume` | #F7F8F5 | fond de page | partout |
| `--sauge` | #E3ECE6 | fond de section (décalage de fond) | sections alternées, encarts |
| `--encre` | #1F2D27 | texte courant, titres | sur brume, sauge, papier, soleil |
| `--encre-douce` | #4A5A53 | texte secondaire, méta, légendes | sur brume, sauge, papier |
| `--foret` | #24503F | actions, liens, anneau de focus sur clair, le fil | sur brume, sauge, papier |
| `--nuit` | #0F3D2E | footer, sections sombres, survol des actions | fond seulement |
| `--soleil` | #F2B544 | accent | **sur forêt ou nuit** (votre règle) ; en thème sombre, aussi sur humus, sous-bois et canopée (§3.3) ; jamais sur un fond clair (1,7:1 sur brume) |
| `--miel` | #8A5A00 | petit texte or sur clair (dates, sources, mention « gratuit ») | sur brume, sauge, papier ; jamais un lien, une action ni une alerte |
| `--coeur` | #C8102E | **bouton de don uniquement** | jamais en décor ni pour une erreur |
| `--papier` | #FFFFFF | champs ; cartes posées sur sauge (un cran au-dessus du fond) | champs sur brume et sauge ; cartes sur sauge seulement (sur brume, une carte prend le fond sauge, §8) |
| `--trait` | #6F8078 | bordure des champs (3:1 sur tous les fonds clairs) | champs, cases, filets fonctionnels |
| `--filet` | #CCD8D1 | séparateur décoratif | entre deux blocs, jamais seul porteur d'information |
| `--brume-douce` | #C5D3CC | texte secondaire sur nuit | footer, bandes et encarts nuit |
| `--coeur-fonce` | #A50D26 | survol et appui du bouton de don | bouton de don |

### 3.2 Couleurs d'état

Séparées de la marque (T-18) : aucune couleur d'état ne reprend une couleur de la marque (ni le rouge du don, ni l'or, ni le vert des actions), et chaque état a aussi une icône et un texte, jamais la couleur seule. En sombre, les trois encadrés prennent le fond canopée ; seuls l'icône, le titre et le contour changent de couleur.

| État | Texte (clair) | Fond d'encadré (clair) | Texte (sombre) | Fond d'encadré (sombre) | Icône |
|---|---|---|---|---|---|
| Erreur | `--brique` #B42318 | `--brique-pale` #FBEAE7 | `--corail` #F2A497 | canopée | cercle avec « ! » (celle de `FormField.tsx` aujourd'hui) |
| Alerte | `--ambre` #9C4A00 | `--ambre-pale` #FDEBDC | `--ambre-clair` #F7A35C | canopée | triangle |
| Information | `--ciel` #245E78 | `--ciel-pale` #E3EEF3 | `--ciel-clair` #93C6DE | canopée | « i » |

- **Pas de couleur de succès** : le site n'affiche aucun succès, par choix (les formulaires préparent un message, ils n'envoient rien ; `ContactHandoff.tsx`). Pousse, pousse pâle et menthe sont donc retirées (§3.7). Quand les formulaires enverront vraiment (API Symfony), un état de succès et sa couleur seront ajoutés (§13).
- **Classement des encadrés existants** : alertes = précision juridique sur l'Albanie (fiche pays), encadré « Vigilance » de Contact, mises en garde du guide anti-arnaques ; informations = délai de réponse et rappel « aucun document ni paiement » de Candidater, note sur l'Albanie dans la liste des pays, message préparé.
- **Une erreur posée sur nuit reste dans son encadré** (repli de la carte du Cameroun) : brique sur brique pâle 5,6:1, alors que la brique seule sur nuit tomberait à 1,8:1.
- L'alerte n'utilise plus le miel ni le soleil : en sombre, une alerte en soleil aurait eu exactement la couleur d'un lien et de l'anneau de focus.

### 3.3 Thème sombre

Même hiérarchie qu'en clair, pas une simple inversion : page, section, carte, chaque cran un peu plus clair ; les bandes nuit sont à part et ne portent pas de carte. Ombres remplacées par des bordures. Un seul accent par type de fond : **forêt sur clair, soleil sur sombre**. Votre brief réserve le soleil à la forêt et à la nuit ; en thème sombre, il devient aussi la couleur des actions, des liens et du focus sur humus, sous-bois et canopée, car la forêt y tombe sous 3:1. C'est une extension de votre règle, acceptée à la validation.

| Token sombre | Valeur | Rôle |
|---|---|---|
| `--humus` | #0E1B16 | fond de page |
| `--sous-bois` | #14261F | fond de section |
| `--canopee` | #1B3129 | cartes, champs |
| `--nuit` | #0F3D2E | bandes et footer (la même valeur qu'en clair, reconnaissable) |
| `--brume-voilee` | #E8EEEA | texte courant (un peu moins blanc que la brume, pour éviter l'éblouissement) |
| `--lichen` | #A9BAB2 | texte secondaire |
| `--soleil` | #F2B544 | actions (fond, texte encre dessus), liens, anneau de focus |
| `--soleil-pale` | #F6C76A | survol des actions |
| `--feuille` | #7DBA98 | le fil (forêt y tomberait à 1,3:1 sur nuit) |
| `--trait-nuit` | #71857B | bordure des champs |
| `--filet-nuit` | #2C4339 | séparateur décoratif |

### 3.4 Correspondance sémantique

| Token sémantique | Clair | Sombre |
|---|---|---|
| surface (page) | brume | humus |
| surface-section | sauge | sous-bois |
| surface-raised (champs ; cartes posées sur une section) | papier | canopee |
| surface-card-on-page (cartes posées directement sur la page) | sauge | canopee |
| surface-inverse (bandes, footer) | nuit | nuit |
| text | encre | brume-voilee |
| text-secondary | encre-douce | lichen |
| text-on-inverse | brume | brume-voilee |
| text-secondary-on-inverse | brume-douce | lichen |
| action (fond) / on-action (texte) | foret / brume | soleil / encre |
| action-hover | nuit | soleil-pale |
| link | foret | soleil |
| link-on-inverse (liens sur nuit : footer, bandes) | soleil | soleil |
| action-on-inverse (fond) / on-action-on-inverse (texte) | soleil / encre | soleil / encre |
| action-on-inverse-hover | soleil-pale | soleil-pale |
| accent-on-inverse | soleil | soleil |
| focus | foret (soleil sur nuit et forêt) | soleil |
| fil | foret (feuille sur nuit) | feuille |
| border-input | trait | trait-nuit |
| border-on-inverse (contour des contrôles posés sur nuit, liseré du don) | brume à 60 % | brume à 60 % |
| border-subtle (décoratif) | filet | filet-nuit |
| donate / donate-hover | coeur / coeur-fonce | coeur / coeur-fonce |
| danger, warning, info | §3.2 | §3.2 |

Les tokens « on-inverse » couvrent tout ce qui est posé sur nuit, même en thème clair : sans eux, un lien du footer serait forêt sur nuit, à 1,3:1.

### 3.5 Règles d'usage

- **Le bouton de don** reste `--coeur` dans les deux thèmes. **Sur nuit (footer, bandes), même en clair, et en thème sombre, il porte un liseré intérieur de 1 px, brume à 60 %** (token `border-on-inverse`) : décision du 16 novembre 2026, prise sur la capture du footer, où sa forme se perdait. Son fond seul se détache peu des fonds sombres (2,0:1 sur nuit, 2,3:1 sur une carte sombre, 2,6:1 sur une section sombre) ; le liseré, lui, se détache à 5,5:1 sur nuit, 6,2:1 sur canopée, 7,2:1 sur sous-bois et 8,0:1 sur humus, et encore à 5,2:1 au pire au survol (cœur foncé, sur nuit). Le liseré est intérieur : la taille du bouton ne change pas. La couleur cœur ne change pas. Sur fond clair, pas de liseré : le cœur s'y détache seul (4,8:1 au pire, sur sauge).
- **Soleil** n'apparaît jamais sur un fond clair (1,7:1 sur brume, 1,5:1 sur sauge).
- **Miel** est la seule couleur or autorisée sur clair, et seulement pour du petit texte informatif (4,9:1 sur sauge, son pire cas).
- **Un seul accent par fond** : forêt sur clair, soleil sur sombre et sur nuit. Le miel n'est jamais un accent : il ne sert ni aux liens, ni aux actions, ni aux alertes.
- **Aucune couleur décorative** : pas de dégradé, pas de pastille colorée sans rôle.
- **Thème** : à la première visite, le site suit le réglage clair ou sombre du téléphone ; ensuite, il retient le choix du visiteur (comme aujourd'hui). *Pour le développeur : `color-scheme: light` et `color-scheme: dark` sur la racine, pour que les cases à cocher et les barres de défilement natives suivent le thème.*

Le tableau complet est en annexe A : 109 lignes, 95 paires distinctes (certaines paires servent à deux usages), chacune avec son usage. **Toutes les paires de texte passent 4,5:1 et tous les composants passent 3:1**, sauf le fond du bouton de don sur fond sombre et sur nuit : c'est son liseré qui le détache (voir ci-dessus).
- **Contrôles en sombre** (vérifiés le 16 novembre 2026 sur l'accueil, Mobilité & Langues, Candidater et Faire un don, à 390 et 1 440 px) : la bordure d'un champ atteint 3:1 sur sa carte, et un bouton se détache de sa carte à 3:1 au moins, par son fond ou par son contour. Aucun contrôle ne porte de couleur écrite en dur : champs, options et pastilles passent par `border-input` ; sur nuit, par `border-on-inverse` ; les cases et boutons radio natifs sont cochés à la couleur de `action` (forêt en clair, soleil en sombre).

### 3.6 Passage depuis les tokens actuels (pour le développeur)

Huit noms de ce contrat existent déjà dans `src/index.css` (copie de travail des tokens) avec **un autre rôle ou une autre valeur**. Changer seulement les valeurs déplacerait des couleurs d'un rôle à l'autre : par exemple, tout ce qui est en `bg-foret` aujourd'hui (#0F3D2E, footer et bandes) passerait à la nouvelle forêt #24503F. On procède donc en trois temps :
1. **renommer** les huit tokens actuels, valeurs inchangées (aucun changement visible, vérifiable par captures comme le lot des tokens) ;
2. **ajouter** les tokens d'univers du contrat ;
3. **rebrancher** les tokens sémantiques, puis les composants un par un, sur les nouvelles valeurs.

| Nom actuel | Valeur actuelle | Rôle actuel | Renommé en (étape 1) | Nom et valeur du contrat |
|---|---|---|---|---|
| `foret` | #0F3D2E | actions, bandes vertes, footer | `nuit` (même valeur, après le renommage de l'ancien `nuit`) | `nuit` #0F3D2E pour les bandes et le footer ; les actions passent au token `action` = `foret` #24503F |
| `nuit` | #0B1F18 | fond de page sombre | `v1-nuit` | `humus` #0E1B16 |
| `canopee` | #1F6B50 | régions de la carte | `v1-canopee` | `canopee` #1B3129 = cartes sombres |
| `sous-bois` | #132A21 | cartes sombres | `v1-sous-bois` | `sous-bois` #14261F = sections sombres |
| `brume` | #F4F6FA | fond de la page VKI (historique) | `vki-brume` (la page VKI ne change pas) | `brume` #F7F8F5 = fond de page |
| `encre` | #1B1B18 | texte | `v1-encre` | `encre` #1F2D27 |
| `corail` | #FDA29B | erreurs en sombre | `v1-corail` | `corail` #F2A497 |
| `menthe` | #34D399 | succès en sombre (aucun composant ne l'utilise) | `v1-menthe` | aucun : la couleur de succès est retirée (§3.2, §3.7) ; `v1-menthe` disparaîtra |

Ces noms apparaissent 249 fois dans 31 fichiers de `src/` (aucune page historique ; `Layout.tsx` pose `bg-brume` sur la page VKI). Les noms `v1-…` disparaissent quand plus aucun composant ne les utilise. **Étape 1 faite** le 16 novembre 2026 (commit `81370be`, sans changement visible, vérifié par captures et styles calculés).

### 3.7 Où sert chaque couleur ajoutée

Règle de la validation : une couleur ajoutée à votre palette n'est gardée que si elle sert à **au moins deux endroits concrets** du site. Un endroit est un emplacement distinct qu'un visiteur peut voir ; un même bloc répété sur deux pages compte une fois. Relevé dans le code le 16 novembre 2026, puis contre-vérifié.

**Clair**
- **papier** : fond des champs (Candidater, Contact, Agir, Don, newsletter) et des cartes posées sur sauge ; libellé blanc du bouton de don.
- **trait** : bordure des champs et des cases (Candidater, Contact, Agir, Don, newsletter) et des filtres de sessions de l'Académie.
- **filet** : séparateurs de listes : résultats de recherche de l'en-tête, fiche pays, fiche de niveau et sessions de l'Académie, valeurs de Qui sommes-nous.
- **brume douce** : texte secondaire sur nuit : footer, menu mobile, bande du test de niveau, encarts nuit de Contact, du Don et de la fiche pays.
- **cœur foncé** : survol et appui du bouton de don : en-tête, menu mobile, footer, formulaire de don.

**États (clair, puis sombre)**
- **brique / corail** : erreurs des champs (Candidater, Contact, Agir) et message d'échec de chargement des cartes.
- **brique pâle** : fond de l'encadré d'erreur sous la carte du Cameroun et sous la mini-carte d'Europe (accueil et Notre impact)  ; au seuil des deux endroits, gardée (votre décision du 16 novembre 2026).
- **ambre / ambre clair** : alertes : précision sur l'Albanie (fiche pays), mises en garde du guide anti-arnaques, encadré « Vigilance » de Contact.
- **ambre pâle** : fond des encadrés d'alerte : fiche Albanie, « Vigilance » de Contact ; au seuil des deux endroits, gardée (même décision).
- **ciel / ciel clair** : informations : message préparé des formulaires, encadrés de Candidater, note sur l'Albanie (liste des pays et carte « 10 pays »).
- **ciel pâle** : fond des encadrés d'information : Candidater (délai de réponse, « aucun document ni paiement »), note sur l'Albanie de la liste des pays ; au seuil des deux endroits, gardée (même décision).

**Sombre**
- **humus** : fond de page de toutes les pages et de l'en-tête opaque.
- **sous-bois** : fond des sections alternées : accueil, Mobilité & Langues, Accompagnement, Académie.
- **canopée** : champs des 5 formulaires, cartes des fiches pays, bandeau cookies, encadrés d'état.
- **brume voilée** : texte courant de toutes les pages, du footer et du menu mobile.
- **lichen** : texte secondaire : fiches pays, page Don, footer.
- **soleil pâle** : survol des boutons soleil : boutons d'action en sombre, boutons posés sur nuit (Contact, test de niveau, footer).
- **feuille** : le fil en sombre et sur nuit : hero, frise A1 à C1, fiches pays.
- **trait-nuit** : bordure des champs des 5 formulaires ; contour de l'en-tête, des menus et du bandeau cookies à la place de l'ombre.
- **filet-nuit** : séparateurs de listes : recherche, fiche pays, Académie, valeurs de Qui sommes-nous.

**Retirées** : **pousse**, **pousse pâle** et **menthe** (succès), aucun endroit : le site n'affiche pas de succès (§3.2). Brume douce perd son usage « sur forêt », qui n'avait aucun endroit : elle ne sert que sur nuit.

## 4. Typographie

### 4.1 Famille

**Atkinson Hyperlegible Next, en 400 et 600, une seule famille pour tout le site.** *(600 à la place du 700 retenu d'abord : décision du 16 novembre 2026, §4.3.)*

- Dessinée par Applied Design Works et Letters from Sweden pour le Braille Institute, conçue pour distinguer les formes proches (I l 1, O 0). Licence SIL OFL 1.1 (vérifiée dans le fichier). Version 2.001, sur Google Fonts depuis le 7 janvier 2025.
- Couvre le français courant : accents, Œ œ, « », ’, –, —, …, €, espace insécable U+00A0. **Manque l'espace fine insécable U+202F** : on utilisera U+00A0 avant ; : ! ? et dans les guillemets, plutôt que de laisser une police de repli dessiner U+202F.
- Pas de ligatures (voulu pour la lisibilité). Les chiffres peuvent prendre une largeur fixe, pour que les montants en € et FCFA, les dates et les niveaux s'alignent en colonne.
- **Chargement** : la police est servie par le site lui-même (pas par Google), dans le format le plus léger, réduite aux caractères du français. Les deux graisses sont chargées en priorité : la 400 pour le texte, la 600 pour les titres et le gras. Le texte s'affiche tout de suite dans une police de secours de même encombrement, puis bascule sans faire sauter la page.
  *Pour le développeur : WOFF2 statiques du paquet `@fontsource/atkinson-hyperlegible-next` 5.3.0, sous-ensemble latin préchargé (400 et 600), latin-ext seulement par `unicode-range` (Ÿ, noms rares), `font-display: swap`, police de repli ajustée (`size-adjust`, `ascent-override` ; 97,85 % pour la 400, 96,21 % pour la 600 face à Arial Bold), `font-variant-numeric: tabular-nums` (fonction `tnum` présente).*
- **Poids** : 400 + 600 en latin = 24 768 octets (environ 25 Ko, mesurés sur le paquet 5.3.0 ; 24 828 avec la 700), contre 130 028 octets (environ 130 Ko) pour DM Sans et Fraunces préchargées aujourd'hui (`public/fonts`, `index.html:41-42`). La version variable (33 996 octets, environ 34 Ko) ne vaut pas le coup pour deux graisses.

### 4.2 Fraunces et DM Sans : retirées (décidé)

**Fraunces et DM Sans sortent toutes les deux** (votre accord du 16 novembre 2026). Les raisons :

- Votre brief demande une seule famille ; une deuxième pour un seul titre casse cette règle à l'endroit le plus vu.
- Fraunces pèse 67 Ko (latin), soit 2,7 fois les deux graisses d'Atkinson, sur le chemin du premier affichage (PERF-04). Le budget polices est de 100 Ko.
- Le couple crème + police à empattements contrastée + or est le premier tic relevé par l'audit (T-18). Garder Fraunces au hero garderait ce tic en vitrine.
- Une police à empattements très contrastée est expressive mais pas « calme ». La force du titre viendra de la taille, de la graisse 600, de l'approche légèrement serrée et du fil qui se dessine dessous.

### 4.3 Échelle nommée

Noms et texte 17-18 px à 1,6 viennent de votre brief ; les tailles, proposées, ont été acceptées. **Réglage des titres revu le 16 novembre 2026** : le brief demandait 700, interligne 1 et approche -0,02 em ; sur planches comparées (hero et titre de section, 390 et 1 440 px), Atkinson y paraissait trop sèche. Retenu : **600, interligne 1,1, approche -0,01 em**, et 600 à la place du 700 partout (titres et gras du texte), pour ne charger que deux fichiers. Tailles fluides à partir de 320 px ; elles atteignent leur maximum vers 1 030 px (display) et 1 120 px (page-title, section-title). Les valeurs entre parenthèses sont calculées.

| Nom | Taille | Graisse | Interligne | Approche | Usage |
|---|---|---|---|---|---|
| `display` | clamp(2.5rem, 1.6rem + 4.5vw, 4.5rem) (40 px à 320, 43 à 390, 72 à 1 440) | 600 | 1,1 | -0,01 em | le seul titre du hero de l'accueil |
| `page-title` | clamp(2rem, 1.5rem + 2.5vw, 3.25rem) (32 px à 320, 34 à 390, 52 à 1 440) | 600 | 1,1 | -0,01 em | le H1 des autres pages |
| `section-title` | clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem) (24 px à 320, 25 à 390, 36 à 1 440) | 600 | 1,1 | -0,01 em | H2 de section |
| `body` | 17 px, puis 18 px à partir de 768 px | 400 (600 pour l'emphase) | 1,6 | normale | texte courant, boutons, champs à partir de 17 px |
| `meta` | 15 px | 400 ou 600 | 1,5 | normale | légendes, dates, sources, aide des champs |

- **Titres en casse de phrase**, sans capitales espacées (T-16, T-21), équilibrés (`text-wrap: balance`) ; texte courant en `text-wrap: pretty`.
- **Un seul H1 par page**, aucun niveau sauté. Un titre de carte ou d'étape (H3) prend la taille `body` (17 puis 18 px) en 600.
- **Longueur de ligne** : 65 caractères au plus (`max-width: 65ch`) pour le texte courant.
- **Interligne 1,1 sur les titres** (16 novembre 2026) : il laisse de l'air aux accents des capitales quand un titre passe sur trois lignes à 320 px.
- Les champs de formulaire restent à 16 px minimum (17 px par défaut) : sous 16 px, iOS zoome à la saisie.

## 5. Mise en page

**Une seule marge gauche pour tout le site, beaucoup d'air, des sections alternées par le fond plutôt que par des cadres.**

- **Container unique** (RESP-05) : largeur maximale 72 rem (1 152 px), gouttière `clamp(1.25rem, 4vw, 3rem)`. Tout part du même bord gauche, sur toutes les pages. Le texte courant est une colonne de 65 caractères **alignée à gauche** dans ce container, pas centrée.
- **Alignement** : gauche partout. Le centrage est réservé aux états vides et à la page 404.
- **Espacement** : base 4 px. Respiration de section `clamp(4rem, 9vw, 7.5rem)` (64 à 120 px). Piles internes de 8, 12, 16, 24, 32 et 48 px.
- **Densité qui varie avec le contenu** : grand air au hero et aux preuves ; liste dense pour les sessions de cours ; colonne de lecture pour les articles et les pages légales.
- **Images** : vraies photos uniquement, à ratio fixe (16/10, 4/5 ou 1/1), légendées avec le lieu et la date, `alt` précis. Pas d'image générée (T-04). Les sources actuelles ne dépassent pas environ 1 050 px de large : **pas d'image pleine largeur ni de photo en fond plein écran** tant que les originaux HD ne sont pas fournis (GAL-04), et **aucune image affichée plus grande que sa taille réelle en densité 2** (largeur affichée ≤ largeur de la source / 2).

```
Principe de page (1 440 px)
┌──────────────────────────────────────────────────────────────────────────┐
│ en-tête : logo, navigation, bouton « Faire un don »                      │
├──────────────────────────────────────────────────────────────────────────┤
│        ← marge gauche unique (container de 72 rem)                       │
│        Titre de page (page-title)                                        │
│        Texte d'introduction, 65 caractères au plus…                      │
│                                                                          │
│▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ section sur sauge
│▒▒▒▒▒▒▒▒Titre de section (section-title)▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│ (décalage de fond,
│▒▒▒▒▒▒▒▒Contenu aligné sur la même marge▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒│  pas de cadre)
│                                                                          │
│        Section suivante sur brume…                                       │
└──────────────────────────────────────────────────────────────────────────┘
```

## 6. Signature : le fil

**Un trait fin de 1,5 px, couleur forêt, qui relie le Cameroun à l'Europe** (votre brief). Il relie toujours un départ à une arrivée : « Cameroun » → « Europe » dans le hero, « Cameroun » → le pays dans les fiches pays, A1 → « Europe » dans la frise des niveaux. Départ et arrivée sont des points pleins ; dans la frise, les niveaux sont des cercles, sauf le niveau affiché. Il ne promet rien : il montre un trajet, avec ses étapes. Sur fond nuit et en thème sombre, il prend `--feuille`.

Il apparaît à **trois endroits précis**, ceux de votre brief, et nulle part ailleurs. Il est décoratif (`aria-hidden`) : son sens est toujours écrit en texte à côté.

**1. Hero de l'accueil** : sous la phrase d'appui, de « Cameroun » à « Europe ». C'est le seul moment fort du site : il se dessine une fois, au chargement (§10).

```
Hero, 1 440 px : texte à gauche, photo cadrée à droite (environ la moitié du container)
  Des cours d'allemand gratuits               ┌──────────────────────────┐
  pour préparer l'Europe en confiance.        │ vraie photo, Open Day,   │
  (display, 2 lignes au plus)                 │ Yaoundé : cadre 16/10,   │
                                              │ 493 × 308 px au plus     │
  Niveaux A1 à C1, test en ligne, orientation └──────────────────────────┘
  vers 10 pays, sans intermédiaire payant.    Open Day, Yaoundé, 25 avril 2026

  Cameroun ●─────────────────────────────────────────● Europe

  ( Passer le test d'allemand gratuit )   ( ♥ Faire un don )

Hero, 390 px : une colonne, la photo sous le titre
  Des cours d'allemand gratuits
  pour préparer l'Europe
  en confiance.
  ┌──────────────────────────────┐
  │ vraie photo, Open Day,       │
  │ Yaoundé : cadre 16/10, toute │
  │ la largeur du container      │
  │ (350 × 219 px à 390 px)      │
  └──────────────────────────────┘
  Open Day, Yaoundé, 25 avril 2026

  Niveaux A1 à C1, test en ligne,
  orientation vers 10 pays, sans
  intermédiaire payant.

  Cameroun ●────────────────● Europe

  ( Passer le test d'allemand gratuit )
  ( ♥ Faire un don )
```

**La photo du hero** (votre décision du 16 novembre 2026). La source recommandée, `open-day-marche`, fait 986 × 628 px. Tant que les originaux HD ne sont pas fournis :
- **pas de photo en fond plein écran** ;
- la photo est **cadrée** en 16/10 (rayon 20) : à côté du titre sur ordinateur, sur environ la moitié du container ; sous le titre sur téléphone, sur toute la largeur du container ;
- elle n'est **jamais affichée plus grande que sa taille réelle en densité 2** : 493 px de large au plus (986 / 2), soit 493 × 308 px dans le cadre 16/10. Sur ordinateur, elle s'arrête à 493 px même si sa colonne est plus large ; sur tablette, quand les colonnes s'empilent, elle reste à 493 px, alignée à gauche ;
- à 390 px, elle fait 350 × 219 px : la source couvre la densité 2 ; sur un écran de densité 3, l'agrandissement reste faible (×1,06).

Le cadre 16/10 suit le format paysage de la source : un cadre 4/5 n'en garderait que la moitié.

**2. Frise des niveaux A1 à C1 (page Académie)** : le fil traverse les cinq niveaux comme des étapes et se termine vers l'Europe. Le niveau affiché est le seul point plein avant l'arrivée ; son nom passe en 600, et les lecteurs d'écran entendent « niveau affiché ». Chaque niveau reste un lien vers sa page. Fixe, aucune animation. Exemple sur la page du niveau B1 :

```
Académie, 1 440 px (horizontal)
  ○─────────────○─────────────●─────────────○─────────────○──────────● Europe
  A1            A2            B1            B2            C1
  Découverte    Échanges      Autonomie     Indépendance  Maîtrise
                courants      (affiché)

Académie, 390 px (vertical : même fil, de haut en bas)
  ○ A1  Découverte
  │
  ○ A2  Échanges courants
  │
  ● B1  Autonomie (affiché)
  │
  ○ B2  Indépendance
  │
  ○ C1  Maîtrise
  │
  ● Europe
```
*Intitulés courts tirés des titres existants de `GERMAN_LEVELS_DATA` (« Niveau A1 — Découverte & Bases », « Niveau A2 — Survie & Échanges Courants », « Niveau B1 — Seuil d'Autonomie », « Niveau B2 — Indépendance & Fluidité », « Niveau C1 — Maîtrise Académique & Professionnelle »), en casse de phrase et sans « & » (T-21). Formulation validée le 16 novembre 2026.*

**3. Fiches pays** : en tête de fiche, sous le titre, de « Cameroun » au pays, avec la date de vérification de la fiche. Les fiches n'ont aujourd'hui ni carte ni repère géographique : le fil y est un trait droit, sans carte.

```
Fiche Allemagne, 390 px
  S'orienter vers : Allemagne
  Cameroun ●──────────────────────● Allemagne
  Fiche vérifiée le … (date à fournir)
```

**Ce qui n'est pas le fil** : la mini-carte d'Europe de l'accueil et de Notre impact garde son arc « Depuis le Cameroun » vers le pays choisi. Pour que le fil reste à trois endroits, cet arc passe en **forêt à opacité réduite (environ 40 %)** (votre décision du 16 novembre 2026), immobile, et change de pays d'un coup ; le pays visé reste écrit dans la liste à côté. Il est décoratif : aucun contraste n'est requis.

## 7. Accueil en 8 sections (ACC-03)

Aujourd'hui : 15 sections et le footer, 21 109 px de haut à 390 (environ 25 écrans). Cible : 8 blocs, dans cet ordre.

```
Accueil, 390 px (une colonne)       Accueil, 1 440 px
┌──────────────────────────────┐    ┌────────────────────────────────────────┐
│1 HERO (brume)                │    │1 HERO : texte à gauche, photo à droite │
│  titre display               │    │  le fil sous la phrase d'appui         │
│  photo 16/10 + légende datée │    │  ( test gratuit )  ( ♥ don )           │
│  phrase d'appui              │    ├────────────────────────────────────────┤
│  Cameroun ●──────────● Europe│    │2 MOBILITÉ & LANGUES (sauge)            │
│  ( Passer le test d'allemand │    │  3 voies en liste : Académie,          │
│    gratuit )                 │    │  4 étapes, 10 pays ; ( Candidater )    │
│  ( ♥ Faire un don )          │    ├────────────────────────────────────────┤
├──────────────────────────────┤    │3 PREUVES EN IMAGES (brume)             │
│2 MOBILITÉ & LANGUES (sauge)  │    │  film WAHHF + 5 photos de l'Open Day   │
│  Académie A1 à C1            │    ├────────────────────────────────────────┤
│  Accompagnement en 4 étapes  │    │4 DOMAINES (sauge) : liste de 6 lignes  │
│  Les 10 pays                 │    ├────────────────────────────────────────┤
│  ( Candidater )              │    │5 CARTE DE PRÉSENCE (brume)             │
├──────────────────────────────┤    ├────────────────────────────────────────┤
│3 PREUVES EN IMAGES (brume)   │    │6 CHIFFRES RÉELS DATÉS (nuit)           │
│  film WAHHF (vignette, durée)│    ├────────────────────────────────────────┤
│  photos 2 colonnes, légendées│    │7 AGIR + NEWSLETTER (sauge)             │
├──────────────────────────────┤    ├────────────────────────────────────────┤
│4 DOMAINES (sauge)            │    │8 FOOTER (nuit)                         │
│  6 lignes : titre + 1 phrase │    └────────────────────────────────────────┘
├──────────────────────────────┤
│5 CARTE DE PRÉSENCE (brume)   │
├──────────────────────────────┤
│6 CHIFFRES RÉELS DATÉS (nuit) │
├──────────────────────────────┤
│7 AGIR + NEWSLETTER (sauge)   │
├──────────────────────────────┤
│8 FOOTER (nuit)               │
└──────────────────────────────┘
```

| # | Section | Contenu | Matière réelle disponible |
|---|---|---|---|
| 1 | **Hero, deux portes** | Titre concret qui nomme l'allemand, l'Europe et la gratuité (formulation à choisir avec la fondation, ACC-02) ; phrase d'appui ; le fil ; **« Passer le test d'allemand gratuit »** (bouton primaire, vers `/mobilite-langues/academie#test-niveau`) et **« Faire un don »** (bouton de don, vers `/faire-un-don`) ; vraie photo légendée, cadrée et limitée à 493 px de large (§6), jamais en fond plein écran. | Photo de l'Open Day : `open-day-marche` recommandée (adultes, pas de mineurs en gros plan), sous réserve des autorisations (GAL-01). Pas de sur-titre IROKO (ACC-05). |
| 2 | **Mobilité & Langues** | Les trois voies en liste typographique (Académie A1 à C1, accompagnement en 4 étapes, 10 pays) et le bouton « Candidater ». Un seul « gratuit », au bon endroit (T-12). | Programme réel, test réel (20 questions). |
| 3 | **Preuves en images** | Le film WAHHF à la demande (vignette, durée, sous-titres ; ACC-04) et 5 photos de l'Open Day légendées, lien vers la galerie. | 13 photos et 1 vidéo de l'Open Day ; film YouTube WAHHF de 70 s. |
| 4 | **Domaines** | Les 6 domaines en liste : titre et une phrase chacun, sans carte ni numéro ; photo seulement si elle est réelle (3 sur 6 aujourd'hui). | `DOMAINS_DATA` ; 3 images générées à retirer (T-04). |
| 5 | **Carte de présence** | La carte des régions et la mini-carte d'Europe, sans le fil (son arc passe en forêt à 40 % d'opacité, §6). Titre qui dit ce qui est vrai : « Basée à Yaoundé et Douala » tant que les relais ne sont pas confirmés (T-11, IMP-01). | Géographie réelle ; données par région en TODO. |
| 6 | **Chiffres réels datés** | 2 à 4 résultats, chacun avec une date et une source, en texte fixe (pas de compteur). La section reste masquée tant qu'il n'y a pas au moins deux chiffres sourcés : l'accueil compte alors 7 sections. | À fournir par la fondation (participants à l'Open Day, apprenants par cohorte…). |
| 7 | **Agir + newsletter** | Un seul bloc : devenir bénévole, devenir partenaire, et le champ newsletter avec un libellé visible (ACC-06). Le don reste dans le hero, l'en-tête et le footer. | Formulaires existants (message préparé WhatsApp ou e-mail). |
| 8 | **Footer** | Coordonnées, liens (dont Actualités et Partenaires), bouton « Faire un don » (avec son liseré brume, §3.5), mentions légales. | Existant. |

**Ce qui quitte l'accueil, sans rien supprimer du code :**
- **Mission, Approche, frise historique** : déplacées vers `/qui-sommes-nous` (ACC-03). Les dates marquées TODO (à compléter) de la frise y restent visibles comme aujourd'hui.
- **Témoignages** : retirés de l'accueil tant qu'aucun témoignage réel n'existe (T-02). Les données restent dans le code, marquées TODO.
- **Actualités** : lien dans le footer et la navigation ; la section revient quand un article réel existe (T-03).
- **Partenaires** : sur `/partenaires`. La bande démo d'IROKO y va aussi, ou est retirée (ACC-04, à décider à l'étape de l'accueil).
- **Bande de don finale** : retirée. Le don a aujourd'hui 5 entrées sur l'accueil à 1 440 px (en-tête, hero, carte Agir, bande finale, footer), 6 avec le menu mobile.
- **Chiffres actuels** (1 250+, 6, 10, 10) : remplacés par la section 6 ; le « 1 250+ » d'exemple n'est plus affiché.

*Ce contrat ne change pas encore l'accueil : il fera l'objet d'une étape séparée, après les composants partagés (§8).*

## 8. Composants partagés

Ce sont ceux de votre demande sur les composants partagés ; ils appliquent les décisions ci-dessus.

- **Boutons**
  - Primaire : fond forêt, texte brume ; survol : fond nuit ; appui (`:active`) : fond nuit immédiat, sans déplacement, **visible au toucher**. En sombre : fond soleil, texte encre ; survol et appui : soleil pâle. Sur nuit (footer, bandes), même en clair : fond soleil, texte encre (tokens « on-inverse », §3.4).
  - Don : fond cœur, texte blanc, icône cœur ; survol et appui : cœur foncé ; sur nuit et en thème sombre, liseré intérieur de 1 px brume à 60 % (§3.5). Réservé au don.
  - **Don en contour** (décision du 16 novembre 2026, après le lot 5) : le cœur plein est réservé à la page Don et à la porte « Faire un don » du hero. Dans l'en-tête et le menu mobile, le bouton de don passe en contour : bordure 1,5 px et icône cœur, libellé couleur du texte, fond transparent ; survol et appui : fond cœur, libellé blanc. En thème sombre et sur nuit, où le cœur n'atteint que 3,0:1 (humus) et 2,1:1 (nuit), le contour et l'icône prennent corail (8,9:1 et 6,1:1) : token `donate-outline`.
  - Secondaire : contour 1,5 px forêt, texte forêt, fond transparent ; survol et appui (immédiat, visible au toucher) : fond forêt, texte brume. En sombre, et sur nuit même en clair : contour et texte soleil ; survol et appui : fond soleil, texte encre.
  - Pendant un envoi : le bouton garde ses couleurs, son libellé dit ce qui se passe (« Préparation du message… ») et il ne répond plus au clic.
  - **Cibles de 44 px minimum** (48 px de haut par défaut). Forme pilule. Texte `body` en 600.
  - **↗ seulement pour un lien externe**, avec « (nouvel onglet) » pour les lecteurs d'écran (T-20). Pas de flèche sur les liens internes ni sur les boutons.
- **Container** : un seul (§5). Variantes de largeur interdites ; la colonne de lecture est une contrainte de texte à l'intérieur, alignée à gauche.
  - **Section** (ajout du 16 novembre 2026) : une section de page porte l'un des deux fonds, brume (`surface`) ou sauge (`surface-section`) ; en sombre, humus ou sous-bois. Pas de filet entre les sections, pas de voile blanc translucide : le changement de fond suffit. Respiration verticale `clamp(4rem, 9vw, 7.5rem)`.
- **En-tête de page** (ajout du 16 novembre 2026, 18 pages) : le H1 en `page-title`, texte `text`, sur le fond de la page (brume, humus en sombre), **sans bande nuit ni photo en fond** ; une introduction en `body`, `text-secondary`, 65 caractères au plus ; tout aligné à gauche dans le container. Photo facultative, seulement si elle est réelle, cadrée en 16/10 avec le rayon des cartes, sans voile ni dégradé.
- **Encadré d'information** (ajout du 16 novembre 2026) : remplace l'avertissement anti-arnaque actuel (bloc nuit bordé d'or, à cheval sur le hero). Fond `info-bg` (ciel pâle, canopée en sombre), rayon 12, sans bordure or ni ombre ; icône « i » couleur `info`, sans carré ; texte `body` en `text`, sans guillemets ; lien `link` souligné. **Précaution** : le message anti-arnaque reste le premier élément sous le titre de la page, en taille `body`, avec un titre court en 600 ; il ne descend jamais en `meta`, n'est ni replié ni masqué, et ne doit pas devenir discret au point de passer inaperçu. Il est posé dans le flux, plus à cheval sur le titre.
- **Field** (champ partagé) : fait évoluer `src/components/wahhf/FormField.tsx`, qui relie déjà le libellé et gère `aria-invalid` et `aria-describedby`.
  - Libellé visible au-dessus, en casse de phrase (il est aujourd'hui en capitales espacées) ; aide et erreur en `meta` sous le champ, reliées par `aria-describedby`.
  - Texte à 16 px minimum, hauteur de 48 px ; bordure 1 px `--trait` (3,4:1 au pire, sur sauge), rayon 12 ; anneau de focus forêt de 2 px, décalé de 2 px.
  - Erreur : bordure brique, icône et message ; `aria-invalid`.
  - `autocomplete` et `inputmode` obligatoires selon le type (nom, e-mail, téléphone).
  - **Panneau de formulaire** (ajout du 16 novembre 2026) : sur sauge (sous-bois en sombre), rayon des cartes, sans bordure ni ombre ; les champs y prennent le fond `surface-raised` (papier, canopée en sombre) avec leur bordure `border-input`.
- **SectionHeader** : le titre (`section-title`) et, au besoin, un paragraphe d'introduction. **Pas de sur-titre ni de filet par défaut** (T-16). Le sur-titre reste possible en option, en casse de phrase, 15 px, couleur encre douce. Aucune apparition animée.
- **Carte, liste, colonne** (T-15)
  - **La carte est réservée aux collections cliquables** : fiches pays, actualités, albums. Toujours un cran de fond par rapport à ce qui l'entoure : sur brume, fond sauge ; sur sauge, fond papier ; en sombre, canopée. Rayon 20, sans bordure ni ombre ; la carte se reconnaît d'abord à sa photo et à son titre-lien. Toute la carte est le lien, et son survol ne change que la couleur du titre.
  - **Listes typographiques** pour les valeurs, les principes, les voies et les domaines : titre en 600 et phrase en dessous, séparés par un filet, sans cadre.
  - **Colonne de lecture de 65 caractères** pour les articles et les pages légales : un paragraphe n'est jamais une carte.
  - **Ajouts du 16 novembre 2026** : la liste des 10 pays (lignes de liste, plus de cadres), le bloc d'impact de la page Don et la FAQ de Mobilité (listes typographiques), les liens des deux portes.
- **StepNumber** (T-17) : un cercle de 32 px, contour forêt de 1,5 px, numéro en 600. **Seulement pour les vraies suites** : étapes de candidature, 4 étapes de l'accompagnement, « Les grandes étapes » de chaque fiche pays. Les niveaux A1 à C1 sont dessinés par le Fil (§6), sans StepNumber.
  Retirés : tous les numéros qui ne marquent pas une suite, notamment « DOMAINE / 01 / 06 », « Domaine 06 / 06 » et « Domaine 06 » (hero et description de Mobilité, méga-menu, `fr.json`), « VALEUR 01 », « PÔLE 01 », « Pays #01 », « Voie 01/02/03 », « 01 · Don solidaire », « 01 · Partenaire fondateur », la numérotation du menu mobile, du méga-menu et du footer, et les 14 numéros en filigrane (chiffres, Mobilité, principes, actualités, Agir, domaines, sessions, voies, guides, pays). *Ce sont des textes : leur retrait sera listé fichier par fichier et vous sera montré avant d'être fait.*
  **Barre de progression** (ajout du 16 novembre 2026) : couleur pleine `action`, sans dégradé vert vers or.
- **Footer** (ajout du 16 novembre 2026) : fond nuit ; texte `text-on-inverse` et `text-secondary-on-inverse` en 15 px ; titres de colonne en 600, sans or ; soleil réservé aux liens (`link-on-inverse`) ; contrôles cerclés de `border-on-inverse`.
- **En-tête du site** (ajout du 16 novembre 2026) : barre opaque pleine largeur (brume, humus en sombre), fixée en haut, contenu dans le container ; sans pilule, sans verre dépoli ; ombre flottante seulement une fois la page défilée (en sombre, une bordure basse trait-nuit à la place) ; « WAHHF Foundation » dans une seule casse et une seule couleur.
  **Décisions du 16 novembre 2026, après le lot 5 :**
  - **Sous-titre « Branche sociale du groupe IROKO » visible à toutes les largeurs**, sous le nom, en `meta`, `text-secondary` : sur deux lignes (largeur du nom, 120 px au moins) jusqu'à 1 023 px, sur une ligne au-delà.
  - **Deux portes** (T-09) : « Candidater » (bouton primaire forêt, soleil en sombre) à côté de « Faire un don » (bouton de don en contour), dans la barre dès 768 px ; sous 768 px, en tête du menu mobile, en pleine largeur (empilées sous 400 px). La ligne « Candidater (Cours & Europe — Gratuit) » et le bouton de don en bas du menu mobile sont remplacés par ces deux boutons.
  - **Dès 1 280 px, deux lignes** (64 + 44 px) : la marque et les deux portes, puis le menu (6 entrées, aligné sur la marge du logo) et les outils (langue, recherche, thème), séparés par un filet. Sur une seule ligne, l'en-tête demandait 1 261 px pour 1 152 disponibles. `--header-offset` passe de 6 à 8,25 rem à partir de 1 280 px (108 px + 24 px d'air).
  - Sous 1 280 px, une ligne : marque, outils (langue dès 1 024 px au lieu de 768 px, recherche, thème dès 640 px), les deux portes (dès 768 px), menu. Vérifié de 320 à 1 440 px, en français et en anglais : aucun débordement ni chevauchement.
- **Fil** : composant SVG pour la signature (§6). Paramètres : départ, arrivée, étapes facultatives (frise A1 à C1), niveau affiché, orientation (horizontale ou verticale), animation unique (hero seulement). Couleur prise dans le token `fil`, épaisseur 1,5 px, points de 8 px. `aria-hidden`. L'arc de la mini-carte d'Europe n'utilise pas ce composant (§6).

## 9. Profondeur et rayons

**Profondeur : par décalage de fond, plus une ombre unique pour ce qui flotte** (votre brief).
- Clair : page brume → section sauge (un cran plus foncé) → carte et champ papier (le plus clair). Sombre : humus → sous-bois → canopée, chaque cran un peu plus clair. Dans les deux thèmes, la carte et le champ sont le fond le plus clair de leur contexte ; les bandes nuit sont à part et ne portent pas de carte.
- **Pas de bordure sur les cartes**, pas d'ombre sur ce qui ne flotte pas. Les seules bordures sont fonctionnelles (champs) ou des filets de séparation.
- **`--ombre-flottante`** : `0 12px 32px -16px` encre à 28 %, seulement pour l'en-tête une fois la page défilée, les menus, le bandeau cookies et les fenêtres. En sombre : pas d'ombre, une bordure 1 px `--trait-nuit` à la place.
- Plus de verre dépoli (l'en-tête flouté actuel devient un fond brume opaque).

**Rayons : 12 / 20 / pilule, chacun avec un rôle.**

| Token | Valeur | Usage |
|---|---|---|
| `--radius-inner` | 12 px | champs, cases, encadrés d'état, vignettes, petites images |
| `--radius-card` | 20 px | cartes cliquables, photos, fenêtres, menus déroulants |
| `--radius-pill` | pilule | boutons, badges, filtres, pastilles de navigation |

Jamais de rayon de 20 px sur un petit élément. Les neuf valeurs actuelles (pilule, 24 px sous deux écritures, 16, 12, 20, 8, 32 et 4 px ; TOK-05) sont toutes ramenées à ces trois-là.

## 10. Mouvement

**Un seul moment fort : le fil du hero qui se dessine une fois. Ailleurs, des fondus de 0,3 s. Rien d'autre ne bouge** (votre brief).

- **Le moment fort** : à l'affichage de l'accueil, le fil se trace de « Cameroun » vers « Europe » en 1,2 s, après 0,2 s, sur une courbe douce (`cubic-bezier(0.22, 1, 0.36, 1)`, token `--ease-reveal`). Le titre, le texte, les boutons et la photo sont **visibles dès le premier rendu** : rien n'attend l'animation, l'affichage du premier écran n'est pas retardé. Il se joue une fois par chargement de l'accueil, jamais en boucle. Outil : CSS seul (tracé du trait), sans JavaScript.
- **Fondus de 0,3 s** (opacité seule, sans glissement) : ouverture et fermeture du menu mobile, des fenêtres (vidéo, visionneuse, carte plein écran), des messages d'état, changement de page. Outil : Motion (bibliothèque d'animation déjà installée) pour ce qui apparaît ou disparaît de la page, CSS pour le reste.
- **Survols** : changement de couleur en 0,3 s, sans déplacement, sans zoom, et seulement sur ce qui est cliquable. **Appui (`:active`)** : immédiat, sans déplacement.
- Les barres de progression du test de niveau et de la candidature continuent d'avancer en 0,3 s : c'est un retour d'action, pas un décor.
- **Ce qui ne bouge pas** : titres, sections, cartes, chiffres, cartes géographiques, frise A1 à C1, fiches pays, en-tête (il ne se masque plus au défilement), défilement (natif).
- **Bibliothèques** : CSS et Motion suffisent. GSAP (ScrollTrigger, SplitText) et Lenis ne servent plus à rien une fois les effets retirés ; ils pourront être retirés du site (environ 53 Ko compressés de moins à télécharger, mesure isolée en annexe B, à refaire sur le site réel).

**Effets retirés** (inventaire complet des 39 effets et fichiers en annexe B) : rideau de chargement, zoom lent et parallaxe de l'image du hero, vidéo YouTube en fond (elle devient le film à la demande), titre révélé ligne par ligne, glissement du sur-titre, de la phrase d'appui et des boutons du hero, paragraphe découpé (SplitText), compteurs animés, galerie horizontale épinglée, section Mobilité qui s'agrandit, vignette vidéo qui grandit au défilement, apparition en fondu-glissement des titres de section et des grilles, frise historique qui se dessine, boutons magnétiques, barre de lecture, défilement fluide (Lenis), carrousel de témoignages, soulèvement et zoom des cartes au survol, rotation de la flèche des boutons, pulsation et cascade de la carte du Cameroun, arc de la mini-carte qui se redessine au survol, rideau du menu mobile (devient un fondu), fondu de 0,5 s de la bascule de thème (devient instantané), entrée en ressort de la bulle WhatsApp, en-tête qui se masque au défilement.

**Mouvement réduit** (`prefers-reduced-motion: reduce`) :

| Effet | Avec animations | Mouvement réduit |
|---|---|---|
| Fil du hero | se dessine en 1,2 s, une fois | déjà tracé, immobile |
| Fondus (menu, fenêtres, messages, pages) | 0,3 s | instantanés |
| Survols | couleur en 0,3 s | couleur instantanée |
| Barres de progression (test, candidature) | avancent en 0,3 s | changent d'un coup |
| Film de présentation | lecture seulement au clic | lecture seulement au clic, sans lecture automatique |
| Tout le reste | immobile | immobile |

## 11. États

À couvrir pour chaque composant et chaque écran concerné :

- **Boutons et liens** : repos, survol (souris), appui (toucher), focus clavier (anneau forêt sur clair, soleil sur sombre et sur nuit), envoi en cours (couleurs gardées, libellé qui dit ce qui se passe, clic bloqué ; jamais désactivé sans explication).
- **Champs** : vide, rempli, focus, invalide (message précis sous le champ), aide.
- **Choix** (boutons radio en tuiles) : non choisi, choisi, focus. Un seul style pour l'option choisie sur tout le site (T-18) : contour forêt de 2 px et coche visible (soleil en sombre et sur nuit), jamais la couleur seule. L'option non choisie a un contour 1 px `border-input`. La coche se place à droite d'un libellé aligné à gauche, devant un libellé centré (montants, fréquence). *Fait le 16 novembre 2026 dans `ChoiceTile` (commit `a26a9f8`) : les trois styles d'option choisie (nuit et or, rouge du don, or plein) ont disparu.*
- **Formulaires** : erreurs, étape suivante (focus sur le titre de l'étape), message préparé (WhatsApp ou e-mail), sans faux succès.
- **Images et film** : chargement (fond sauge au ratio réservé), échec (texte alternatif et légende visibles), film indisponible (message et lien direct vers YouTube).
- **Carte de présence** : chargement des données (squelette à la forme de la carte, `aria-busy`), région choisie, échec de chargement.
- **Vide** : section Chiffres masquée tant qu'il n'y a pas deux chiffres sourcés ; Actualités sans article réel (« Aucun article publié pour le moment » et lien vers la galerie).
- **Page introuvable, paramètre inconnu** : déjà en place (ETA-06), à habiller avec les nouveaux tokens.
- **Thème** : clair et sombre pour chacun de ces états.

## 12. Défauts rejetés

Les tics relevés par l'audit et ce qui les remplace :

| Défaut relevé | Où (audit) | Remplacement |
|---|---|---|
| Fond crème + police à empattements contrastée + or | T-18 ; `index.css` | brume et sauge, une seule police sans empattements très lisible, or (miel, soleil) seulement en touches |
| Sur-titre en capitales espacées au-dessus de chaque titre | T-16 ; SectionHeader | titre seul, sur-titre facultatif en casse de phrase |
| Filet en dégradé sous chaque titre, dégradés vert → or | T-16 | aucun dégradé ; le seul trait décoratif est le fil, à trois endroits ; les filets gris ne servent qu'à séparer les éléments d'une liste |
| Un seul mot du titre en couleur ou en dégradé (violet → orange) | audit, l. 169 (pages historiques) | sur les pages WAHHF, titre d'une seule couleur ; les pages historiques ne sont pas touchées |
| Numéros 01/02/03 et filigranes sur des contenus qui ne sont pas des suites | T-17 | StepNumber pour les vraies suites, rien ailleurs (liste au §8) |
| Flèche ↗ ou → sur chaque bouton et lien | T-20 | ↗ seulement pour un lien externe |
| Une même carte (24 px, bordure, ombre, soulèvement) pour tout | T-15 | carte pour les collections cliquables ; listes et colonne de lecture ailleurs |
| Ombres et bordures mêlées, 12 ombres différentes (6 de Tailwind, 6 sur mesure) | TOK-05 | décalage de fond ; une seule ombre pour ce qui flotte |
| Verre dépoli de l'en-tête | PERF-10 ; audit, l. 164 | fond brume opaque, ombre flottante au défilement |
| Rayons partout (9 valeurs) | TOK-05 | 12 / 20 / pilule |
| Gabarit hero → chiffres → grille → témoignages → appel, en 15 sections | ACC-03 | 8 sections, chacune avec une raison d'être |
| Gros chiffres animés avec une petite étiquette, dont un chiffre d'exemple | T-11 | chiffres réels, datés et sourcés, en texte fixe, ou rien |
| Empilement d'effets spectaculaires, façon sites primés | ANIM-01 | un seul moment fort, lié à la signature |
| Fondu et glissement sur chaque section | ANIM-04 | aucune apparition au défilement |
| Métadonnées « A · B · C » et libellés « MOT — fragment » | audit, l. 158-159 | phrases complètes ou deux lignes distinctes |
| Slogans creux (« Autonomiser la jeunesse… ») et étiquettes décoratives | ACC-02 | une promesse concrète qui nomme l'allemand, l'Europe et la gratuité |
| Icônes posées dans des carrés arrondis colorés | audit, l. 180 | pas d'icône décorative ; icône seulement si elle porte un sens (état, lien externe, don) |
| Témoignages et images générés | T-02, T-04 | vraies photos légendées ; pas de témoignage tant qu'il n'y en a pas de réel |
| Couleur qui contredit le sens (coche verte devant une alerte ; rouge du don pour un badge, une alerte ou une option choisie) | T-18, ARN-03 | couleurs d'état distinctes de la marque, avec leur icône ; rouge réservé au don |

## 13. Décisions (validation du 16 novembre 2026)

**Décisions prises avant la validation**
- Fraunces et DM Sans retirées au profit d'Atkinson Hyperlegible Next seule (§4.2).
- Bouton de don sans liseré, footer compris ; à revoir sur la capture du footer (§3.5). *Revu le 16 novembre 2026 : liseré ajouté (voir plus bas).*
- Structure de tokens en deux couches (TOK-01 à TOK-07) enregistrée dans l'historique (commit `2937307`), avec ses écarts validés sur captures : menu au-dessus du bandeau cookies, barre de lecture sous le menu et les fenêtres, cases à cocher natives qui suivent le thème sombre.

**Trois ajustements demandés à la validation**
1. **Photo du hero** : pas de photo en fond plein écran tant que les originaux HD manquent ; photo cadrée, à côté du titre sur ordinateur (environ la moitié du container), sous le titre sur téléphone, jamais affichée plus grande que sa taille réelle en densité 2, soit 493 px de large au plus pour `open-day-marche` (§5, §6, §7).
2. **Palette** : toute couleur ajoutée qui ne sert pas à au moins deux endroits concrets du site est supprimée ; chaque ajout gardé dit en une ligne où il sert, en clair comme en sombre (§3.7). Résultat : 23 ajouts gardés sur 26 ; pousse, pousse pâle et menthe retirées (aucun succès affiché sur le site) ; brique pâle, ambre pâle et ciel pâle gardées au seuil exact de deux endroits (confirmé le 16 novembre 2026).
3. **Arc de la mini-carte** : forêt à environ 40 % d'opacité, décoratif, sans exigence de contraste (§6).

**Propositions acceptées telles quelles**
- Container unique de 72 rem (§5) ; en-tête toujours visible (§10) ; barres de progression du test et de la candidature gardées (§10).
- Retrait de GSAP et Lenis quand plus rien ne les utilise ; le fil du hero en CSS seul (§10).
- Section Chiffres masquée tant qu'elle n'a pas deux chiffres sourcés (§7).
- Alerte en ambre (§3.2) ; soleil sur les fonds sombres (§3.3) ; tokens « on-inverse » (§3.4) ; renommage des tokens en trois temps (§3.6).
- Tailles de l'échelle typographique (§4.3), intitulés courts de la frise A1 à C1 (§6), ce qui quitte l'accueil (§7, pour l'étape qui traitera l'accueil), retrait des effets (§10, annexe B).

**Décisions prises après la validation (16 novembre 2026)**, avec la liste des textes du lot 5 (`docs/lot5-textes-a-retirer.md`)
- **Gratuité** : une seule mention par écran ; l'avertissement dit « Nos cours et notre accompagnement sont gratuits. », sans nommer le financeur tant que la question IROKO n'est pas tranchée.
- **Bulle WhatsApp** : à l'étape de l'accueil, vrai glyphe WhatsApp et libellé court visible (RESP-03).
- **Menu mobile** : le geste « glisser pour fermer » reste, sa phrase d'explication est retirée.

**Décisions du 16 novembre 2026, après les captures de Buttons et SectionHeader**
- **Liseré du bouton de don** sur nuit et en thème sombre : 1 px intérieur, brume à 60 % ; couleur cœur inchangée (§3.5 ; commit `9bd06c7`).
- **Titres** : 600, interligne 1,1, approche -0,01 em ; 600 à la place du 700 partout, titres et gras du texte ; seules les graisses 400 et 600 sont chargées (§4 ; commit `905a76c`).
- **Contrôles en thème sombre** : bordure des champs à 3:1 sur leur carte, boutons détachés de leur carte à 3:1, corrigés par les tokens et non page par page (§3.5 ; commit `a26a9f8`).
- **Lot 5 élargi** (toutes les propositions de l'analyse de tension acceptées). Ordre : Container (avec la Section brume ou sauge, sans filets), En-tête de page (18 pages, sans bande nuit), Encadré d'information (à la place de l'avertissement), Field (avec les panneaux de formulaire sur sauge, sans ombre), Carte-liste-colonne (avec la liste des pays, le bloc d'impact du Don, la FAQ de Mobilité et les liens des portes), StepNumber (avec la barre de progression pleine), Fil, Footer (couleurs du contrat), En-tête du site (barre opaque). Un commit chacun (§8).
- **Précaution pour l'encadré d'information** : le message anti-arnaque reste le premier élément sous le titre de la page, bien lisible, et ne doit pas devenir discret au point de passer inaperçu (§8).
- **TODO gardés** : les textes provisoires restent visibles tant que le contenu réel manque, par exemple « Montants donnés à titre d'exemple (TODO : à confirmer) ».

**Étapes planifiées après le lot 5**
- **Étape de l'accueil** (§7), avec deux ajouts : les couleurs de la carte de présence (panneau blanc en sombre, régions et pays en or, tuiles crème ; elles valent aussi pour /notre-impact) ; le style de la bulle WhatsApp (ombre, contour et point or), en plus du vrai glyphe et du libellé court (RESP-03).
- **Petite étape « Mobilité & Langues »** : l'appel final en carte nuit juste au-dessus du footer, réduit à une seule action (« Candidater ») ; les témoignages (TODO, à remplacer par des témoignages réels, T-02) ; la gratuité dite une fois par écran ; le nombre de boutons du hero.
- **Petite étape « Candidater »** : la gratuité redite avant le premier champ ; le nombre d'actions et d'indicateurs d'étape au premier écran ; les mentions de chantier.
- **Petite étape « Faire un don »** : la gratuité redite, le nombre d'actions au premier écran, l'encadré « Garantie de transparence » en simple bloc de texte, les mentions de chantier.

**Décisions du 16 novembre 2026, après le lot 5 (validé)**
- **Sous-titre IROKO** : la décision n° 11 de la liste du lot 5 est annulée ; « Branche sociale du groupe IROKO » reste sous le logo (Qui sommes-nous) et sous le nom dans l'en-tête, visible à toutes les largeurs (§8, En-tête du site).
- **En-tête** (T-09) : « Candidater » (forêt) à côté de « Faire un don », qui passe en contour cœur ; le cœur plein est réservé à la page Don et à la porte « Faire un don » du hero (§8, Boutons).
- **Pages destinées aux jeunes** (Mobilité, Académie, niveaux, Candidater, Accompagnement, fiches pays, Arnaques) : aucun bouton de don dans le contenu (ARN-02) ; le footer garde son lien.
- **Contrôle des textes provisoires** (T-01) : un script npm échoue si « TODO », « Simulé » ou « démonstration » apparaissent dans le texte affiché, un `aria-label` ou une option de liste des pages WAHHF ; lancé à la fin de chaque lot, son résultat est remis à la fondation.
- **Début du lot 6** : barre de lecture réservée aux articles, en forêt (plus en or) ; bandeau cookies aux couleurs du contrat.
- **Groupes 7.1 et 7.2** : encadré « Vigilance » de Contact en alerte ambre, encadré « Message préparé » en information, boîte du test de niveau.
- **Accueil (lot 6)** : pas de mention d'IROKO dans le hero, l'en-tête la porte déjà.

**À traiter plus tard : état de succès des formulaires.** Aujourd'hui les formulaires préparent un message et n'envoient rien, d'où l'absence de couleur de succès (§3.2). Quand ils enverront vraiment (API Symfony), il faudra un état de succès (« Candidature envoyée », « Message envoyé ») et donc une couleur de succès, avec son tableau de contrastes. À traiter à ce moment-là.

**Reste à fournir par la fondation** : autorisations de diffusion des photos (GAL-01), originaux HD, chiffres datés et sourcés, date de vérification de chaque fiche pays, formulation du titre du hero (ACC-02).

**Ordre de travail (lot 5)** : la liste des numéros et textes à retirer vous est montrée d'abord ; puis le renommage des tokens (fait : commit `81370be`, sans changement visible) ; puis les composants dans l'ordre prévu, un commit chacun, avec captures à 390 et 1 440 px, en clair et en sombre. Faits : tokens et police (`0b32577`), Buttons (`665c86d`), SectionHeader (`2cb7db1`), creux sombres (`399748d`), liseré (`9bd06c7`), contrôles sombres (`a26a9f8`), titres en 600 (`905a76c`). Suivent, dans l'ordre élargi ci-dessus : Container, En-tête de page, Encadré d'information, Field (arrêt pour captures avant/après des 4 pages), puis Carte-liste-colonne, StepNumber, Fil, Footer, En-tête du site.

## 14. Test du nom retiré

**Sans le nom WAHHF, devine-t-on à quoi sert le site ?**

- Ce qu'on voit sans le nom : un fil vert qui part du Cameroun et arrive en Europe ; une frise de niveaux A1, A2, B1, B2, C1 qui mène à l'Europe ; deux portes, « Passer le test d'allemand gratuit » et « Faire un don » ; des photos datées d'une journée à Yaoundé ; des fiches pays avec une date de vérification.
- Ce qu'on en déduit : **une organisation qui prépare gratuitement des jeunes Camerounais à l'Europe par l'allemand, sans vendre de départ, et qui vit de dons.** C'est la mission. Le test passe.
- **Limites honnêtes** :
  - le test passe grâce au **contenu** (le fil, les niveaux, les deux portes), pas grâce à la palette : sauge et forêt pourraient appartenir à une autre ONG ;
  - les cinq autres domaines ne participent pas à cette lecture : tant qu'ils n'ont pas de contenu réel (T-13), le site raconte surtout Mobilité & Langues, ce qui est juste ;
  - la preuve reste mince tant que les chiffres datés et les originaux HD des photos manquent.

Contrat validé le 16/11/2026, avec les ajustements du §13.

---

## Annexe A : tableau des contrastes

Calcul WCAG 2.x sur fond uni ; ratios tronqués à une décimale. Seuils : 4,5:1 pour le texte, 3:1 pour les composants et le fil.

**Clair : texte**

| Devant | Fond | Ratio | Seuil | Résultat | Usage |
|---|---|---|---|---|---|
| encre #1F2D27 | brume #F7F8F5 | 13,4:1 | 4,5:1 | passe | texte courant |
| encre #1F2D27 | sauge #E3ECE6 | 11,8:1 | 4,5:1 | passe | texte courant |
| encre #1F2D27 | papier #FFFFFF | 14,3:1 | 4,5:1 | passe | texte courant (cartes) |
| encre-douce #4A5A53 | brume #F7F8F5 | 6,8:1 | 4,5:1 | passe | texte secondaire, méta |
| encre-douce #4A5A53 | sauge #E3ECE6 | 6,0:1 | 4,5:1 | passe | texte secondaire, méta |
| encre-douce #4A5A53 | papier #FFFFFF | 7,2:1 | 4,5:1 | passe | texte secondaire, méta |
| foret #24503F | brume #F7F8F5 | 8,5:1 | 4,5:1 | passe | liens |
| foret #24503F | sauge #E3ECE6 | 7,5:1 | 4,5:1 | passe | liens |
| foret #24503F | papier #FFFFFF | 9,1:1 | 4,5:1 | passe | liens |
| miel #8A5A00 | brume #F7F8F5 | 5,5:1 | 4,5:1 | passe | petit texte or |
| miel #8A5A00 | sauge #E3ECE6 | 4,9:1 | 4,5:1 | passe | petit texte or |
| miel #8A5A00 | papier #FFFFFF | 5,9:1 | 4,5:1 | passe | petit texte or |
| brume #F7F8F5 | foret #24503F | 8,5:1 | 4,5:1 | passe | texte des boutons d’action |
| brume #F7F8F5 | nuit #0F3D2E | 11,4:1 | 4,5:1 | passe | texte des sections sombres, footer |
| brume-douce #C5D3CC | nuit #0F3D2E | 7,8:1 | 4,5:1 | passe | texte secondaire sur sections sombres |
| brume-douce #C5D3CC | foret #24503F | 5,9:1 | 4,5:1 | passe | texte secondaire sur forêt |
| soleil #F2B544 | nuit #0F3D2E | 6,6:1 | 4,5:1 | passe | accent, liens sur nuit (link-on-inverse) |
| soleil #F2B544 | foret #24503F | 4,9:1 | 4,5:1 | passe | accent sur forêt |
| encre #1F2D27 | soleil #F2B544 | 7,8:1 | 4,5:1 | passe | texte des boutons posés sur nuit (on-action-on-inverse) |
| encre #1F2D27 | soleil-pale #F6C76A | 9,0:1 | 4,5:1 | passe | texte des boutons posés sur nuit, au survol |
| papier #FFFFFF | coeur #C8102E | 5,8:1 | 4,5:1 | passe | texte du bouton don |
| papier #FFFFFF | coeur-fonce #A50D26 | 7,8:1 | 4,5:1 | passe | texte du bouton don au survol |
| brume #F7F8F5 | nuit #0F3D2E | 11,4:1 | 4,5:1 | passe | (survol des actions : fond nuit) |

**Clair : états (texte)**

| Devant | Fond | Ratio | Seuil | Résultat | Usage |
|---|---|---|---|---|---|
| brique #B42318 | papier #FFFFFF | 6,5:1 | 4,5:1 | passe | erreur |
| brique #B42318 | brume #F7F8F5 | 6,1:1 | 4,5:1 | passe | erreur |
| brique #B42318 | sauge #E3ECE6 | 5,4:1 | 4,5:1 | passe | erreur |
| brique #B42318 | brique-pale #FBEAE7 | 5,6:1 | 4,5:1 | passe | erreur dans son encadré |
| ambre #9C4A00 | papier #FFFFFF | 6,1:1 | 4,5:1 | passe | alerte |
| ambre #9C4A00 | brume #F7F8F5 | 5,8:1 | 4,5:1 | passe | alerte |
| ambre #9C4A00 | sauge #E3ECE6 | 5,1:1 | 4,5:1 | passe | alerte |
| ambre #9C4A00 | ambre-pale #FDEBDC | 5,3:1 | 4,5:1 | passe | alerte dans son encadré |
| ciel #245E78 | papier #FFFFFF | 7,1:1 | 4,5:1 | passe | information |
| ciel #245E78 | brume #F7F8F5 | 6,6:1 | 4,5:1 | passe | information |
| ciel #245E78 | sauge #E3ECE6 | 5,9:1 | 4,5:1 | passe | information |
| ciel #245E78 | ciel-pale #E3EEF3 | 6,0:1 | 4,5:1 | passe | information dans son encadré |
| encre #1F2D27 | brique-pale #FBEAE7 | 12,3:1 | 4,5:1 | passe | texte courant dans un encadré |
| encre #1F2D27 | ambre-pale #FDEBDC | 12,3:1 | 4,5:1 | passe | texte courant dans un encadré |

**Clair : composants et fil (3:1)**

| Devant | Fond | Ratio | Seuil | Résultat | Usage |
|---|---|---|---|---|---|
| foret #24503F | brume #F7F8F5 | 8,5:1 | 3:1 | passe | anneau de focus, fil, fond de bouton |
| foret #24503F | sauge #E3ECE6 | 7,5:1 | 3:1 | passe | anneau de focus, fil, fond de bouton |
| foret #24503F | papier #FFFFFF | 9,1:1 | 3:1 | passe | anneau de focus, fil, fond de bouton |
| soleil #F2B544 | nuit #0F3D2E | 6,6:1 | 3:1 | passe | anneau de focus et fond des boutons sur nuit |
| soleil-pale #F6C76A | nuit #0F3D2E | 7,6:1 | 3:1 | passe | fond des boutons sur nuit, au survol |
| soleil #F2B544 | foret #24503F | 4,9:1 | 3:1 | passe | anneau de focus sur forêt |
| trait #6F8078 | papier #FFFFFF | 4,1:1 | 3:1 | passe | bordure des champs |
| trait #6F8078 | brume #F7F8F5 | 3,9:1 | 3:1 | passe | bordure des champs |
| trait #6F8078 | sauge #E3ECE6 | 3,4:1 | 3:1 | passe | bordure des champs |
| coeur #C8102E | brume #F7F8F5 | 5,5:1 | 3:1 | passe | bouton don |
| coeur #C8102E | sauge #E3ECE6 | 4,8:1 | 3:1 | passe | bouton don |
| coeur #C8102E | papier #FFFFFF | 5,8:1 | 3:1 | passe | bouton don |
| brique #B42318 | papier #FFFFFF | 6,5:1 | 3:1 | passe | bordure d’un champ en erreur |
| coeur #C8102E | nuit #0F3D2E | 2,0:1 | 3:1 | **échoue** | bouton don dans le footer (fond du bouton ; le liseré le détache, ligne suivante) |
| liseré brume 60 % sur coeur | nuit #0F3D2E | 5,5:1 | 3:1 | passe | liseré du bouton don sur nuit (§3.5) |
| coeur-fonce #A50D26 | nuit #0F3D2E | 1,5:1 | 3:1 | **échoue** | bouton don du footer au survol et à l'appui (aussi en sombre ; le liseré le détache, ligne suivante) |
| liseré brume 60 % sur coeur-fonce | nuit #0F3D2E | 5,2:1 | 3:1 | passe | liseré du bouton don au survol, sur nuit |
| brume 60 % (border-on-inverse) | nuit #0F3D2E | 5,1:1 | 3:1 | passe | contour des pastilles et boutons-icônes posés sur nuit |
| filet #CCD8D1 | brume #F7F8F5 | 1,3:1 | — | décoratif | filet décoratif (aucune exigence) |

**Sombre : texte**

| Devant | Fond | Ratio | Seuil | Résultat | Usage |
|---|---|---|---|---|---|
| brume-voilee #E8EEEA | humus #0E1B16 | 15,0:1 | 4,5:1 | passe | texte courant |
| brume-voilee #E8EEEA | sous-bois #14261F | 13,4:1 | 4,5:1 | passe | texte courant |
| brume-voilee #E8EEEA | canopee #1B3129 | 11,7:1 | 4,5:1 | passe | texte courant |
| brume-voilee #E8EEEA | nuit #0F3D2E | 10,3:1 | 4,5:1 | passe | texte des bandes et du footer |
| lichen #A9BAB2 | humus #0E1B16 | 8,7:1 | 4,5:1 | passe | texte secondaire, méta |
| lichen #A9BAB2 | sous-bois #14261F | 7,8:1 | 4,5:1 | passe | texte secondaire |
| lichen #A9BAB2 | canopee #1B3129 | 6,8:1 | 4,5:1 | passe | texte secondaire |
| lichen #A9BAB2 | nuit #0F3D2E | 5,9:1 | 4,5:1 | passe | texte secondaire |
| soleil #F2B544 | humus #0E1B16 | 9,6:1 | 4,5:1 | passe | liens, accent |
| soleil #F2B544 | sous-bois #14261F | 8,6:1 | 4,5:1 | passe | liens |
| soleil #F2B544 | canopee #1B3129 | 7,5:1 | 4,5:1 | passe | liens |
| soleil #F2B544 | nuit #0F3D2E | 6,6:1 | 4,5:1 | passe | liens |
| encre #1F2D27 | soleil #F2B544 | 7,8:1 | 4,5:1 | passe | texte des boutons d’action (fond soleil) |
| encre #1F2D27 | soleil-pale #F6C76A | 9,0:1 | 4,5:1 | passe | texte des boutons d’action au survol |
| papier #FFFFFF | coeur #C8102E | 5,8:1 | 4,5:1 | passe | texte du bouton don |
| corail #F2A497 | humus #0E1B16 | 8,8:1 | 4,5:1 | passe | erreur |
| corail #F2A497 | canopee #1B3129 | 6,9:1 | 4,5:1 | passe | erreur |
| ciel-clair #93C6DE | humus #0E1B16 | 9,5:1 | 4,5:1 | passe | information |
| ciel-clair #93C6DE | canopee #1B3129 | 7,4:1 | 4,5:1 | passe | information |
| ambre-clair #F7A35C | humus #0E1B16 | 8,7:1 | 4,5:1 | passe | alerte |
| ambre-clair #F7A35C | sous-bois #14261F | 7,7:1 | 4,5:1 | passe | alerte |
| ambre-clair #F7A35C | canopee #1B3129 | 6,8:1 | 4,5:1 | passe | alerte dans son encadré |

**Sombre : composants et fil (3:1)**

| Devant | Fond | Ratio | Seuil | Résultat | Usage |
|---|---|---|---|---|---|
| soleil #F2B544 | humus #0E1B16 | 9,6:1 | 3:1 | passe | anneau de focus, fond de bouton |
| soleil #F2B544 | canopee #1B3129 | 7,5:1 | 3:1 | passe | anneau de focus |
| soleil-pale #F6C76A | humus #0E1B16 | 11,2:1 | 3:1 | passe | bouton d’action au survol |
| feuille #7DBA98 | humus #0E1B16 | 7,8:1 | 3:1 | passe | fil |
| feuille #7DBA98 | sous-bois #14261F | 7,0:1 | 3:1 | passe | fil |
| feuille #7DBA98 | canopee #1B3129 | 6,1:1 | 3:1 | passe | fil |
| feuille #7DBA98 | nuit #0F3D2E | 5,4:1 | 3:1 | passe | fil sur bande |
| trait-nuit #71857B | humus #0E1B16 | 4,5:1 | 3:1 | passe | bordure des champs |
| trait-nuit #71857B | sous-bois #14261F | 4,0:1 | 3:1 | passe | bordure des champs |
| trait-nuit #71857B | canopee #1B3129 | 3,5:1 | 3:1 | passe | bordure des champs |
| coeur #C8102E | humus #0E1B16 | 3,0:1 | 3:1 | passe | bouton don (fond du bouton) |
| coeur #C8102E | sous-bois #14261F | 2,6:1 | 3:1 | **échoue** | bouton don sur section sombre (fond du bouton ; le liseré le détache, §3.5) |
| coeur #C8102E | canopee #1B3129 | 2,3:1 | 3:1 | **échoue** | bouton don sur carte sombre (fond du bouton ; le liseré le détache, §3.5) |
| coeur #C8102E | nuit #0F3D2E | 2,0:1 | 3:1 | **échoue** | bouton don sur bande ou footer (fond du bouton ; le liseré le détache, §3.5) |
| coeur-fonce #A50D26 | humus #0E1B16 | 2,2:1 | 3:1 | **échoue** | bouton don au survol et à l'appui (le liseré le détache) |
| coeur-fonce #A50D26 | sous-bois #14261F | 2,0:1 | 3:1 | **échoue** | bouton don au survol et à l'appui (le liseré le détache) |
| coeur-fonce #A50D26 | canopee #1B3129 | 1,7:1 | 3:1 | **échoue** | bouton don au survol et à l'appui (le liseré le détache, lignes suivantes) |
| liseré brume 60 % sur coeur | humus #0E1B16 | 8,0:1 | 3:1 | passe | liseré du bouton don (§3.5) |
| liseré brume 60 % sur coeur | sous-bois #14261F | 7,2:1 | 3:1 | passe | liseré du bouton don |
| liseré brume 60 % sur coeur | canopee #1B3129 | 6,2:1 | 3:1 | passe | liseré du bouton don |
| liseré brume 60 % sur coeur-fonce | canopee #1B3129 | 5,9:1 | 3:1 | passe | liseré du bouton don au survol |
| soleil #F2B544 | canopee #1B3129 | 7,5:1 | 3:1 | passe | contour de l'option choisie, case cochée |

**Écarts d’élévation (décalage de fond, aucune exigence)**

| Devant | Fond | Ratio | Seuil | Résultat | Usage |
|---|---|---|---|---|---|
| papier #FFFFFF | brume #F7F8F5 | 1,0:1 | — | décoratif | champ sur page (il a sa bordure) ; c'est pourquoi une carte sur brume prend le fond sauge |
| brume #F7F8F5 | sauge #E3ECE6 | 1,1:1 | — | décoratif | page / section ; carte sauge sur page brume |
| papier #FFFFFF | sauge #E3ECE6 | 1,2:1 | — | décoratif | carte sur section |
| sous-bois #14261F | humus #0E1B16 | 1,1:1 | — | décoratif | section sur page (sombre) |
| canopee #1B3129 | sous-bois #14261F | 1,1:1 | — | décoratif | carte sur section (sombre) |
| nuit #0F3D2E | humus #0E1B16 | 1,4:1 | — | décoratif | bande sur page (sombre) |
| filet-nuit #2C4339 | humus #0E1B16 | 1,6:1 | — | décoratif | filet de séparation (sombre) |
| filet-nuit #2C4339 | sous-bois #14261F | 1,4:1 | — | décoratif | filet de séparation (sombre) |
| filet-nuit #2C4339 | canopee #1B3129 | 1,2:1 | — | décoratif | filet de séparation (sombre) |

## Annexe B : effets de mouvement actuels et leur sort

Inventaire relevé dans le code le 16 novembre 2026 : 39 effets. Les numéros de ligne renvoient au code au moment du relevé (copie de travail, tokens compris). « Sort » applique le §10 ; les lignes marquées **(ajout)** ne figuraient pas au §10 avant ce relevé ; elles ont été acceptées à la validation.

**Toutes les pages**

| # | Effet actuel | Fichiers | Outil | Sort |
|---|---|---|---|---|
| 1 | Défilement fluide (molette, ancres, « Retour en haut ») | `lib/lenis.ts:13-68`, `lib/scroll.ts:32-60`, `Layout.tsx:23` | Lenis | **retiré** : défilement natif |
| 2 | Barre de progression de lecture (filet or de 3 px) | `effects/ReadingProgress.tsx:8-16` | Motion | **retirée** |
| 3 | Transition de page : entrée 0,4 s, sortie 0,25 s, la nouvelle page attend la sortie | `effects/PageTransition.tsx:30-43` | Motion | **fondu de 0,3 s**, sans attente ; instantané en mouvement réduit |
| 4 | En-tête masqué au défilement vers le bas (400 ms) | `Navbar.tsx:137-153`, `199-204` | CSS | **(ajout)** l'en-tête reste toujours visible : fond brume opaque, ombre flottante une fois la page défilée (§9) |
| 5 | Menu mobile en rideau (clip-path 0,7 s), liens qui glissent | `Navbar.tsx:540-606` | Motion | **fondu de 0,3 s** ; liens immobiles. Le geste « glisser pour fermer » reste |
| 6 | Méga-menu et recherche : panneaux sans animation, chevron qui pivote en 200 ms | `Navbar.tsx:264`, `389-493` | CSS | panneaux inchangés ; **(ajout)** le chevron se retourne sans animation |
| 7 | Bascule clair/sombre en fondu enchaîné de 0,5 s | `effects/themeTransition.ts:16-33`, `index.css:302-316` | View Transitions | **instantanée** |
| 8 | Bulle WhatsApp : entrée en ressort, grossit au survol et à l'appui | `WhatsAppButton.tsx:16-32` | Motion + CSS | **immobile** ; survol par la couleur seulement |
| 9 | Titres de section qui apparaissent (y 18 px, 0,9 s), 28 titres sur les pages WAHHF | `wahhf/SectionHeader.tsx:28-37` | Motion | **retiré** |
| 10 | Colonnes du footer en cascade | `Footer.tsx:30-31`, `effects/StaggerGroup.tsx` | Motion | **retiré** |
| 11 | Transitions de couleur des liens, puces, boutons (150 ms ou 0,3 s) | `Footer.tsx`, `EuropeSupport.tsx`, `HeroVideoBackground.tsx:405` | CSS | **gardé**, uniformisé à 0,3 s ; instantané en mouvement réduit |
| 12 | Zoom de l'image au survol (5 composants) | `DomainCard.tsx:33`, `GalleryGrid.tsx:63`, `Home.tsx:582, 937`, `TransversalPages.tsx:564` | CSS | **retiré** |
| 13 | Soulèvement des cartes au survol (7 endroits, dont 2 blocs non cliquables) | `DomainCard.tsx:20`, `CourseCard.tsx:20`, `Home.tsx:505, 710, 924`, `EuropeSupport.tsx:617`, `TransversalPages.tsx:551` | CSS | **retiré** : seul le titre de la carte change de couleur (§8) |
| 14 | Micro-survols : flèche qui pivote ou glisse, filigrane qui grossit, Play qui grossit, ombre des boutons | `Buttons.tsx:60, 71, 186`, `DomainCard.tsx:47, 65`, `CourseCard.tsx:91`, `Home.tsx:313, 526, 591`, `CountryList.tsx:78` | CSS | **retirés** ; couleur seulement |
| 15 | Boutons magnétiques (9 boutons, ordinateur) | `effects/useMagnetic.ts:11-48` | GSAP | **retiré** |
| 16 | Rideau de chargement | `effects/LoadingCurtain.tsx`, `effects/introState.ts` | Motion | déjà retiré (PERF-01) ; **code mort**, importé nulle part. Sa suppression vous sera proposée, pas faite d'office |

**Accueil**

| # | Effet actuel | Fichiers | Outil | Sort |
|---|---|---|---|---|
| 17 | Vidéo YouTube en fond du hero (ordinateur, après 3 s) | `wahhf/HeroVideoBackground.tsx`, `config/heroVideo.ts` | iframe + CSS | **retirée** ; le film passe à la demande en section 3 (§7) |
| 18 | Zoom lent de l'image du hero (14 s) | `Home.tsx:205`, `index.css:318-327` | CSS | **retiré** |
| 19 | Parallaxe de l'image du hero | `Home.tsx:117-122, 195` | Motion | **retirée** |
| 20 | Titre du hero révélé ligne par ligne | `Home.tsx:214-236`, `effects/MaskedLines.tsx` | Motion | **retiré** |
| 21 | Sur-titre, phrase d'appui et boutons du hero qui glissent (16 px, délais jusqu'à 0,85 s) | `Home.tsx:61-68, 219-262` | Motion | **retiré** : tout est en place au premier rendu |
| 22 | Paragraphes de la Mission découpés ligne par ligne | `effects/SplitReveal.tsx:29-52` | GSAP SplitText | **retiré** (la Mission quitte l'accueil, §7) |
| 23 | Compteurs des chiffres clés (1,8 s), aussi sur Notre impact | `wahhf/Counter.tsx:11-42` | Motion + rAF | **retirés** : chiffres en texte fixe (§7, section 6) |
| 24 | Galerie horizontale épinglée des 6 domaines, carrousel sur téléphone | `effects/HorizontalGallery.tsx:34-136` | GSAP ScrollTrigger | **retirée** : liste de 6 lignes (§7, section 4) |
| 25 | Section Mobilité & Langues qui s'agrandit (clip-path) | `effects/ExpandSection.tsx:36-55` | GSAP ScrollTrigger | **retirée** |
| 26 | Cascade du contenu de Mobilité & Langues | `effects/ExpandSection.tsx:61-78` | GSAP ScrollTrigger | **retirée** |
| 27 | Vignette vidéo qui grandit au défilement | `Home.tsx:146-149` | Motion | **retirée** |
| 28 | Vidéo en plein écran par agrandissement partagé (0,7 s) | `Home.tsx:567-659` | Motion (layoutId) | **fondu de 0,3 s** de la fenêtre |
| 29 | Grilles qui apparaissent en cascade (Approche, Actualités, En images, Partenaires, Agir ; /galerie) | `effects/StaggerGroup.tsx:18-65` | Motion | **retiré** |
| 30 | Frise « Notre parcours » qui se dessine | `effects/useTimelineDraw.ts:12-45` | GSAP ScrollTrigger | **retirée** ; la frise part vers /qui-sommes-nous, fixe (§7) |
| 31 | Carrousel de témoignages (glissement 40 px, glisser au doigt) | `Home.tsx:70-75, 830-897` | Motion | **retiré** avec la section (T-02) ; le code reste |
| 32 | Le fil du hero (**nouveau**) | — | CSS | se dessine une fois en 1,2 s ; déjà tracé en mouvement réduit (§10) |

**Cartes et galeries (accueil, Notre impact, /galerie)**

| # | Effet actuel | Fichiers | Outil | Sort |
|---|---|---|---|---|
| 33 | Régions du Cameroun en cascade (0,8 s, décalées) | `wahhf/CameroonMap.tsx:69-97` | Motion | **retiré** : carte affichée d'un coup |
| 34 | Pulsation du chef-lieu sélectionné (3 × 1,6 s) | `wahhf/CameroonMap.tsx:357-362`, `index.css:411-427` | CSS | **retirée** : la région choisie se lit par sa couleur et un point plein |
| 35 | Carte du Cameroun en plein écran (fondu 0,6 s) | `wahhf/CameroonMap.tsx:140-203` | Motion | **fondu de 0,3 s** |
| 36 | Arc « Depuis le Cameroun » qui se redessine à chaque pays survolé (0,9 s) | `wahhf/EuropeMiniMap.tsx:183-218` | Motion | trait forêt à 40 % d'opacité, immobile, qui change de pays d'un coup ; ce n'est pas le fil (§6) |
| 37 | Couleur des régions et des pays au survol (0,3 s) | `CameroonMap.tsx:321`, `EuropeMiniMap.tsx:149`, `CountryList.tsx` | CSS | **gardé** (survol de ce qui est cliquable) |
| 38 | Visionneuse de la galerie : fondu 0,6 s et glissement de 48 px | `wahhf/GalleryLightbox.tsx:8-140` | Motion | **fondu de 0,3 s**, sans glissement ; le geste « glisser » pour changer de photo reste |

**Formulaires et Académie**

| # | Effet actuel | Fichiers | Outil | Sort |
|---|---|---|---|---|
| 39 | Barres de progression du test de niveau et de la candidature (0,3 s) | `LanguageAcademy.tsx:422-429`, `ApplyPage.tsx:210-215` | CSS | **(ajout) gardées** : c'est un retour d'action, pas un décor ; instantanées en mouvement réduit |
| 40 | Tuile du niveau choisi qui se soulève (frise A1 à C1) | `LanguageAcademy.tsx:199-207` | CSS | **retiré** : le niveau affiché est le point plein du fil (§6) |

*L'inventaire compte 39 effets existants ; la ligne 32 (le fil) est le seul ajout.*

**Ce que le relevé a corrigé ou précisé dans le contrat**
- **Mouvement réduit aujourd'hui** : trois écarts existent déjà et disparaissent avec les retraits. Les fondus de page et de fenêtre restent en mouvement réduit (lignes 3, 28, 35, 38) ; le carrousel de témoignages applique son décalage de 40 px d'un coup (ANIM-07) ; SplitText et la frise ne lisent le réglage qu'au chargement (ANIM-08).
- **Ce que le retrait libère** (mesure isolée sur les fichiers compressés, à refaire sur le site réel) : GSAP + ScrollTrigger + SplitText 47,8 Ko et Lenis 5,3 Ko, soit **environ 53 Ko** (54 Ko avec `@gsap/react`, selon la relecture). Motion (59,1 Ko compressés pour les imports actuels) reste, pour les fondus d'entrée et de sortie.
- **Dépendances à défaire ensemble** : `lib/lenis.ts` s'appuie sur `gsap.ticker` et `ScrollTrigger.update` ; `Layout.tsx`, `PageTransition.tsx` et `lib/gsap.ts` appellent `ScrollTrigger.refresh()`. Ces appels partent avec GSAP.
