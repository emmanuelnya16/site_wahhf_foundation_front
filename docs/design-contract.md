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
- **ambre / ambre clair** : alertes : précision sur l'Albanie (fiche pays), mises en garde du guide anti-arnaques, encadré « Vigilance » de Contact. *Groupe 7.4 : aussi le statut « Hors Union européenne » (fiche Albanie, page Accompagnement), à la place du rouge du don, les 5 signes d'arnaque et les passages soulignés du faux message annoté.*
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
- **Images** : vraies photos uniquement, à ratio fixe (16/10, 4/5 ou 1/1), légendées avec le lieu et la date, `alt` précis. Pas d'image générée (T-04). Les sources actuelles ne dépassent pas environ 1 050 px de large : **pas d'image pleine largeur ni de photo en fond plein écran** tant que les originaux HD ne sont pas fournis (GAL-04), et **aucune image affichée plus grande que sa taille réelle en densité 2** (largeur affichée ≤ largeur de la source / 2). *Groupe 7.1 : les photos des en-têtes de page (Mobilité & Langues, Candidater) s'affichent à 512 px au plus, pour des sources de 1 027 et 1 030 px : la règle est tenue. Seule exception, votre décision du 17 novembre 2026 : l'ouverture de « Sur le terrain », arrêtée à la largeur du container (§10, §13).* *Groupe 7.3 : les photos des domaines de Nos actions s'affichent à 512 px au plus ; la grille de la galerie est plafonnée pour qu'aucune vignette, mise en avant comprise, ne s'affiche à plus de la moitié de sa source, en largeur comme en hauteur (revue du groupe 7.3 : les vignettes couvrent des cases 4:3, alors que les photos sont en 5:3 et les aperçus vidéo plus larges encore ; c'est donc leur hauteur, 628 px pour les photos et 296 à 324 px pour les vidéos, qui limite). Tous les albums partagent une même taille de case, la plus petite permise (environ 197 px à partir de 768 px), pour que leurs colonnes s'alignent d'un album à l'autre : la grille de l'Open Day fait ainsi environ 840 px de large sur ordinateur (au lieu de 1 066 px), « Rencontres de la communauté » environ 410 px, « Sur le terrain » environ 620 px, sur une colonne de 197 px sous 768 px ; la carte de l'album sur Actualités fait 30 rem au plus sur une colonne. Dans la visionneuse, les vidéos ne dépassent plus leur taille réelle (576 px). Les photos de 512 × 320 px (en-têtes, domaines de Nos actions) sont à 0,51 de leur source de 628 px de haut : écart de 2 % toléré.*

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

Il apparaît à **des endroits précis**, ceux de vos briefs (trois au départ, complétés par le lot 7 et le groupe 7.1 dans les notes ci-dessous), et nulle part ailleurs. Il est décoratif (`aria-hidden`) : son sens est toujours écrit en texte à côté.

*Lot 7 (votre brief sur le mouvement, décision du 16 novembre 2026) : un quatrième endroit, la section Mobilité & Langues de l'accueil. Le fil A1 → C1 y reprend la frise de l'Académie, sans niveau affiché, et se dessine au défilement (§10).*

*Groupe 7.1 (votre brief du 17 novembre 2026) : la même frise A1 → C1 apparaît aussi sur la page Mobilité & Langues (porte « Académie », sans niveau affiché, dessinée au défilement sur ordinateur), sur chaque page de niveau (tracée jusqu'au niveau affiché, qui s'allume, à l'arrivée) et dans le résultat du test de niveau (tracée jusqu'au niveau conseillé). C'est toujours le même trajet, A1 → C1 → Europe.*

*Groupe 7.3 (votre brief du 17 novembre 2026) : un nouvel endroit, la frise « Notre parcours » de Qui sommes-nous, venue de l'accueil (§7). Le fil y relie la première étape de la fondation à la dernière (points pleins), les étapes intermédiaires en cercles ; horizontal sur ordinateur, vertical sur téléphone. Il se dessine au défilement sur ordinateur, chaque étape s'allumant quand le trait l'atteint ; il est déjà tracé sur téléphone et en mouvement réduit (§10). Seules les années confirmées sont écrites (2026 aujourd'hui). Revue du groupe 7.3 : ici, seul le point de l'étape s'allume ; ses paragraphes restent toujours à pleine opacité (atténués, ils tombaient à un contraste de 1,72:1 quand la section était au milieu de l'écran).*

*Groupe 7.4 (votre brief du 17 novembre 2026) : un nouvel endroit, les 5 étapes de la page Accompagnement vers l'Europe. Le fil y relie les numéros des étapes, de la première à la dernière, en trait vertical ; il se dessine au défilement sur ordinateur, chaque numéro s'allumant quand le trait l'atteint, et il est déjà tracé sur téléphone et en mouvement réduit (§10). La fin de chaque guide reprend les 5 étapes, sans le fil. Fiches pays (point 3 ci-dessous) : le fil se dessine après le titre ; la date de vérification ne s'affiche que quand la fondation l'a donnée pour chaque lien (« Liens officiels vérifiés le … »), en fondu, après le tracé ; aujourd'hui, aucune.*

*Lot 7.8 (votre brief du 19 novembre 2026) : un nouvel endroit, « Cinq principes qui guident chaque projet » (Qui sommes-nous). Le fil y relie les encoches des cinq cartes puis de la carte finale, en ligne douce de 2,5 px (couleur `fil`) qui ondule entre les cartes et passe derrière elles ; à chaque encoche, un nœud rond au fond de la section, cerclé du fil, visible avant que la carte n'apparaisse. Sur ordinateur, il se dessine de gauche à droite et un point soleil cerclé de nuit (14 px) le parcourt (§10) ; ailleurs, vertical, il se dessine au défilement ; en mouvement réduit, il est entièrement tracé. Le tracé est calculé à partir des cartes réelles (`components/principles/principlesFil.ts`).*

**1. Hero de l'accueil** : sous le titre, de « Cameroun » à « Europe ». Il se dessine une fois, à l'arrivée, après le titre, la phrase et les boutons (1,2 s, en CSS, §10). Posé sur le voile nuit de la vidéo, il prend **soleil** (et non `--feuille`) pour rester lisible ; **absent en mouvement réduit** (votre décision du 16 novembre 2026).

> **Décision du 16 novembre 2026 (la vôtre) : le hero garde la vidéo en fond.** Elle remplace la photo cadrée validée plus tôt (ajustement n° 1 du §13). Le reste du contrat ne change pas.

```
Hero, 1 440 px : vidéo WAHHF en fond plein cadre, 85 à 90 svh ; texte aligné à gauche, sur la moitié gauche du container
┌──────────────────────────────────────────────────────────────────────────────┐
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░░░░                  │
│▓ Titre display, 600, brume      ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░    la vidéo reste   │
│▓ (2 à 3 lignes)                 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░░    nettement        │
│▓ Cameroun ●───────────● Europe  (fil soleil, se dessine une fois)  visible  │
│▓ Phrase concrète qui nomme le lien Cameroun–Allemagne                         │
│▓ ( Passer le test d'allemand gratuit )  ( ♥ Faire un don )                   │
│▓ Regarder le film avec le son (1 min)                          ( ❚❚ Pause )  │
└──────────────────────────────────────────────────────────────────────────────┘
  voile : dégradé horizontal nuit, ~85 % derrière le texte → ~20 % à droite

Hero, 390 px (téléphone, tactile, réseau lent, mouvement réduit) : image fixe portrait, jamais de vidéo
┌──────────────────────────────┐
│ photo portrait (<picture>)   │
│                              │
│░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│  voile : dégradé nuit du bas vers le haut, dense sous le texte
│▒ Titre display               │
│▓ Cameroun ●─────────● Europe │
│▓ Phrase concrète             │
│▓ ( Passer le test d'allemand │
│▓   gratuit )                 │
│▓ ( ♥ Faire un don )          │
│▓ Regarder le film avec le son│
└──────────────────────────────┘
```

**La vidéo du hero** (votre décision du 16 novembre 2026) :
- **Source** : la vidéo WAHHF sur YouTube (`e-zT1lNANC0`), muette, en boucle, sans contrôles, coupée à 64 s, avant le générique (ACC-13). Le code est prêt pour une **boucle hébergée sur le site** (MP4 H.264 et WebM, 1 280 px, 8 à 15 s, sans son, 2 à 3 Mo), qui remplacera YouTube dès que le fichier sera fourni.
- **Ingénierie gardée** : chargement après le premier affichage, une seule iframe, pause hors écran et onglet caché, bouton Pause visible et mémorisé, repli sur l'image fixe si le lecteur ne démarre pas en 6 s.
- **Jamais de vidéo** sur téléphone et écran tactile, en 2G/3G, en économie de données ni en mouvement réduit : image fixe en source portrait via `<picture>` (ACC-07), avec un dégradé nuit du bas vers le haut sous le texte.
- **Consentement explicite** (MEL-03) : la vidéo YouTube transmet l'adresse IP des visiteurs. Sans accord, l'image fixe reste et un lien « Activer la vidéo » est proposé. La boucle hébergée sur le site, sans tiers, n'en aura pas besoin.
- **Image d'attente** : nette (plus la miniature YouTube floue), tirée de la vidéo ou, à défaut, la photo `open-day-marche`, en WebP, préchargée, `fetchpriority="high"` : c'est l'élément LCP. Titre, phrase et boutons sont **visibles dès le premier rendu**, sans attendre la vidéo (PERF-01).
- **Voile** : plus de voile uniforme ; un dégradé horizontal couleur nuit, dense derrière le texte (80 à 85 %), qui s'éclaircit vers la droite (15 à 25 %). **Contraste du texte et des boutons ≥ 4,5:1 sur le pire pixel** des images de la vidéo (mesure toutes les 5 s), à 1 440, 1 024 et 768 px.
- **Contenu** : titre à l'échelle `display` en 600, couleur brume ; phrase concrète qui nomme le lien Cameroun–Allemagne ; deux portes, « Passer le test d'allemand gratuit » (bouton primaire sur fond sombre, soleil, vers `/mobilite-langues/academie#test-niveau`) et « Faire un don » (cœur plein avec liseré) ; un lien discret « Regarder le film avec le son (1 min) » ouvre le lecteur.
- **Pas** de sur-titre, de mention d'IROKO (l'en-tête la porte déjà), de « Défiler pour découvrir » ni de rideau. Hauteur d'environ 85 à 90 svh sur ordinateur, pour laisser deviner la section suivante.

**2. Frise des niveaux A1 à C1 (page Académie)** : le fil traverse les cinq niveaux comme des étapes et se termine vers l'Europe. Le niveau affiché est le seul point plein avant l'arrivée ; son nom passe en 600, et les lecteurs d'écran entendent « niveau affiché ». Chaque niveau reste un lien vers sa page. Sur ordinateur, le fil se dessine au défilement et chaque niveau s'allume quand le trait l'atteint ; fixe sur téléphone et en mouvement réduit (§10). Exemple sur la page du niveau B1 :

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

**3. Fiches pays** : en tête de fiche, sous le titre, de « Cameroun » au pays, avec la date de vérification de la fiche. Les fiches n'ont aujourd'hui ni carte ni repère géographique : le fil y est un trait droit, sans carte. Il se dessine une fois, à l'arrivée (§10).

```
Fiche Allemagne, 390 px
  S'orienter vers l'Allemagne
  Cameroun ●──────────────────────● Allemagne
  Liens officiels vérifiés le … (seulement quand la fondation a daté chaque lien)
```
*Croquis mis à jour après la revue du groupe 7.4 : titre avec l'article (PAYS-03) ; la mention de vérification ne s'affiche que quand chaque lien de la fiche est daté (PAYS-01), et chaque lien daté porte « Lien vérifié le … ».*

**Ce qui n'est pas le fil** : la mini-carte d'Europe de l'accueil et de Notre impact garde son arc « Depuis le Cameroun » vers le pays choisi. Pour que le fil reste à trois endroits, cet arc passe en **forêt à opacité réduite (environ 40 %)** (votre décision du 16 novembre 2026), se trace une fois quand la carte entre à l'écran (§10), puis change de pays d'un coup ; le pays visé reste écrit dans la liste à côté. Il est décoratif : aucun contraste n'est requis.

*Groupe 7.4 (votre brief du 17 novembre 2026) : sur la page Accompagnement, la liste des 10 pays et la mini-carte sont synchronisées, en tête de la section des pays (ACCO-03). L'arc s'y trace quand la carte entre à l'écran (1,2 s), puis **se retrace à chaque changement de pays** (0,8 s), sur ordinateur à souris ; ailleurs et en mouvement réduit, il change de pays d'un coup. Sur téléphone, la page n'affiche que la liste (la carte n'y est pas téléchargée). L'accueil et Notre impact ne changent pas. Après la revue : sur cette page, seule la liste reçoit le focus au clavier (le pays visé s'y montre aussi sur la carte) ; les pays de la carte restent cliquables à la souris, et la carte est masquée aux lecteurs d'écran, la liste disant déjà tout.*

## 7. Accueil en 8 sections (ACC-03)

Aujourd'hui : 15 sections et le footer, 21 109 px de haut à 390 (environ 25 écrans). Cible : 8 blocs, dans cet ordre.

```
Accueil, 390 px (une colonne)       Accueil, 1 440 px
┌──────────────────────────────┐    ┌────────────────────────────────────────┐
│1 HERO (brume)                │    │1 HERO : vidéo en fond, texte à gauche  │
│  titre display               │    │  le fil sous le titre                  │
│  image portrait + voile bas  │    │  ( test gratuit )  ( ♥ don )           │
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
| 1 | **Hero, deux portes** | *(Décision du 16 novembre 2026 : vidéo en fond, voir §6.)* Titre concret à l'échelle `display` ; le fil sous le titre ; phrase qui nomme le lien Cameroun–Allemagne ; **« Passer le test d'allemand gratuit »** (bouton primaire sur fond sombre, vers `/mobilite-langues/academie#test-niveau`) et **« Faire un don »** (cœur plein avec liseré, vers `/faire-un-don`) ; lien « Regarder le film avec le son (1 min) ». | Vidéo WAHHF (YouTube, 70 s, coupée à 64 s) ; image d'attente nette ; photo portrait pour le téléphone. Pas de sur-titre ni de mention d'IROKO (ACC-05). |
| 2 | **Mobilité & Langues** | Les trois voies en liste typographique (Académie A1 à C1, accompagnement en 4 étapes, 10 pays) et le bouton « Candidater ». Le fil A1 → C1 (lot 7, §6 et §10). Un seul « gratuit », au bon endroit (T-12). | Programme réel, test réel (20 questions). |
| 3 | **Sur le terrain** | Les vraies photos de l'Open Day, légendées, et le lien vers la galerie. Le film WAHHF s'ouvre depuis le hero ; le showreel IROKO quitte l'accueil. Aucune image générée. | 13 photos et 1 vidéo de l'Open Day ; film YouTube WAHHF de 70 s. |
| 4 | **Domaines** | Les 6 domaines en liste : titre et une phrase chacun, sans carte ni numéro ; photo seulement si elle est réelle (3 sur 6 aujourd'hui). *Retouches du 19 novembre 2026 (votre demande : une image pour chaque domaine) : chaque ligne commence par une photo de la fondation, 4:3, rayon 12 (7, 10 puis 12 rem de large), la même que sur Nos actions (`config/domainPhotos.ts`) ; toute la ligne est cliquable.* | `DOMAINS_DATA` ; 3 images générées à retirer (T-04). |
| 4 bis | **Apprendre, cultiver, grandir** (lot 7.6, votre brief du 19 novembre 2026) | Bande nuit pleine largeur : titre, une phrase, lien « Voir toutes les photos » vers /galerie ; accordéon de 5 photos (salle, hymne, plantation, sortie, randonnée), toujours un panneau ouvert, ~60 % de la largeur sur ordinateur, bandes empilées sur téléphone ; coins de 1,5 rem pour ces seuls panneaux (au-dessus des 20 px du §9, à la demande du brief). Photo de remplacement (adultes ou de dos) tant que la sienne attend l'accord parental. | `src/pages/home/JourneySection.tsx`, `src/components/gallery/` ; données et photos chargées après le premier affichage |
| 5 | **Carte de présence** | La carte des régions et la mini-carte d'Europe, sans le fil (son arc passe en forêt à 40 % d'opacité, §6). Titre qui dit ce qui est vrai : « Basée à Yaoundé et Douala » tant que les relais ne sont pas confirmés (T-11, IMP-01). | Géographie réelle ; données par région en TODO. |
| 6 | **Chiffres réels datés** | 2 à 4 résultats, chacun avec une date et une source, en texte fixe (pas de compteur). La section reste masquée tant qu'il n'y a pas au moins deux chiffres sourcés : l'accueil compte alors 7 sections. | À fournir par la fondation (participants à l'Open Day, apprenants par cohorte…). |
| 7 | **Agir + newsletter** | Un seul bloc : devenir bénévole, devenir partenaire, et le champ newsletter avec un libellé visible (ACC-06). Le don reste dans le hero, l'en-tête et le footer. | Formulaires existants (message préparé WhatsApp ou e-mail). |
| 8 | **Footer** | Coordonnées, liens (dont Actualités et Partenaires), bouton « Faire un don » (avec son liseré brume, §3.5), mentions légales. | Existant. |

**Ce qui quitte l'accueil, sans rien supprimer du code :**
- **Mission, Approche, frise historique** : déplacées vers `/qui-sommes-nous` (ACC-03). Les dates marquées TODO (à compléter) de la frise y restent visibles comme aujourd'hui. *Groupe 7.3 : fait (Approche en liste typographique, frise dessinée par le fil) ; les années non confirmées sont au contraire masquées, selon l'exception du §13 : seule 2026 s'affiche.*
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
  - **Colonne de lecture de 65 caractères** pour les articles et les pages légales : un paragraphe n'est jamais une carte. *Pages légales (votre brief du 19 novembre 2026, mise en page seulement, MEN-01 et CONF-01) : date de mise à jour sous le titre (« Mise à jour le 15 novembre 2026 », date du premier commit qui contient le texte actuel, à remplacer par celle du juriste, question 140), sommaire des intertitres (au-dessus du texte sur téléphone ; à droite de la colonne et fixe sous l'en-tête sur ordinateur, la colonne gardant la marge gauche du titre), intertitres ancrés, e-mails du texte en liens mailto. Le texte juridique, ses TODO et les titres ne changent pas.*
  - **Ajouts du 16 novembre 2026** : la liste des 10 pays (lignes de liste, plus de cadres), le bloc d'impact de la page Don et la FAQ de Mobilité (listes typographiques), les liens des deux portes. *Groupe 7.2 (votre brief du 17 novembre 2026) : le bloc d'impact de la page Don devient une seule ligne d'impact, sous les montants, dans le panneau du formulaire (ni aplat nuit ni carte dans la carte). Elle suit le montant et l'affectation ; elle ne dit à quoi sert le domaine que pour Mobilité & Langues, les programmes des cinq autres domaines n'étant pas confirmés (revue du groupe 7.2, question 117) ; les exemples chiffrés (« 25 € = manuels A1 »…), non confirmés, sont masqués.* *Retouches du 19 novembre 2026 (votre demande : « trop de texte » sur Mobilité) : la FAQ de Mobilité devient une liste de questions qui s'ouvrent (`<details>` natif, un « + » qui tourne d'un quart de tour, filet entre les lignes) ; les réponses sont gardées mot pour mot. Les deux portes ont chacune une photo à droite de leur texte (A98, A34) ; le second paragraphe de « Pourquoi », qui redisait l'introduction, n'est plus affiché. L'Académie et l'Accompagnement ont une photo dans l'en-tête (A33 ou A98, A59 ou A46).*
- **StepNumber** (T-17) : un cercle de 32 px, contour forêt de 1,5 px, numéro en 600. **Seulement pour les vraies suites** : « Après votre candidature » (Académie, pages de niveau, Candidater), 4 étapes de l'accompagnement, « Les grandes étapes » de chaque fiche pays. Les niveaux A1 à C1 sont dessinés par le Fil (§6), sans StepNumber. *Groupe 7.1 : le formulaire de Candidater n'a plus qu'un indicateur d'étape, « Étape 2 sur 3 » et la barre de progression, sans StepNumber.* *Groupe 7.4 : les 4 étapes de l'accompagnement deviennent 5 (étapes et guides fusionnés, ACCO-02), reliées par le fil sur la page Accompagnement ; la fin de chaque guide les reprend, l'étape affichée en numéro plein.*
  Retirés : tous les numéros qui ne marquent pas une suite, notamment « DOMAINE / 01 / 06 », « Domaine 06 / 06 » et « Domaine 06 » (hero et description de Mobilité, méga-menu, `fr.json`), « VALEUR 01 », « PÔLE 01 », « Pays #01 », « Voie 01/02/03 », « 01 · Don solidaire », « 01 · Partenaire fondateur », la numérotation du menu mobile, du méga-menu et du footer, et les 14 numéros en filigrane (chiffres, Mobilité, principes, actualités, Agir, domaines, sessions, voies, guides, pays). *Ce sont des textes : leur retrait sera listé fichier par fichier et vous sera montré avant d'être fait.*
  **Barre de progression** (ajout du 16 novembre 2026) : couleur pleine `action`, sans dégradé vert vers or.
- **Footer** (ajout du 16 novembre 2026) : fond nuit ; texte `text-on-inverse` et `text-secondary-on-inverse` en 15 px ; titres de colonne en 600, sans or ; soleil réservé aux liens (`link-on-inverse`) ; contrôles cerclés de `border-on-inverse`.
- **En-tête du site** (ajout du 16 novembre 2026) : barre opaque pleine largeur (brume, humus en sombre), fixée en haut, contenu dans le container ; sans pilule, sans verre dépoli ; ombre flottante seulement une fois la page défilée (en sombre, une bordure basse trait-nuit à la place) ; « WAHHF Foundation » dans une seule casse et une seule couleur.
  **Rétabli à votre demande (16 novembre 2026, après le lot 6) : l'en-tête est revenu tel qu'au commit `714194d`** (une ligne, sous-titre IROKO masqué de 1 280 px, pas de bouton « Candidater », don en cœur plein, langue dès 768 px). Les décisions ci-dessous ne sont donc plus appliquées dans l'en-tête ; le bouton de don en contour reste disponible dans le code (`DonateButton variant="outline"`).
  ~~**Décisions du 16 novembre 2026, après le lot 5 :**~~
  - **Sous-titre « Branche sociale du groupe IROKO » visible à toutes les largeurs**, sous le nom, en `meta`, `text-secondary` : sur deux lignes (largeur du nom, 120 px au moins) jusqu'à 1 023 px, sur une ligne au-delà.
  - **Deux portes** (T-09) : « Candidater » (bouton primaire forêt, soleil en sombre) à côté de « Faire un don » (bouton de don en contour), dans la barre dès 768 px ; sous 768 px, en tête du menu mobile, en pleine largeur (empilées sous 400 px). La ligne « Candidater (Cours & Europe — Gratuit) » et le bouton de don en bas du menu mobile sont remplacés par ces deux boutons.
  - **Dès 1 280 px, deux lignes** (64 + 44 px) : la marque et les deux portes, puis le menu (6 entrées, aligné sur la marge du logo) et les outils (langue, recherche, thème), séparés par un filet. Sur une seule ligne, l'en-tête demandait 1 261 px pour 1 152 disponibles. `--header-offset` passe de 6 à 8,25 rem à partir de 1 280 px (108 px + 24 px d'air).
  - Sous 1 280 px, une ligne : marque, outils (langue dès 1 024 px au lieu de 768 px, recherche, thème dès 640 px), les deux portes (dès 768 px), menu. Vérifié de 320 à 1 440 px, en français et en anglais : aucun débordement ni chevauchement.
- **Fil** : composant SVG pour la signature (§6). Paramètres : départ, arrivée, étapes facultatives (frise A1 à C1), niveau affiché, orientation (horizontale ou verticale). Animation : tracé unique à l'arrivée (hero) ; tracé au défilement (accueil, Académie, Mobilité & Langues ; ordinateur seulement) ; tracé jusqu'au niveau affiché, qui s'allume (pages de niveau, résultat du test ; ordinateur seulement, groupe 7.1). Couleur prise dans le token `fil`, épaisseur 1,5 px, points de 8 px. `aria-hidden`. L'arc de la mini-carte d'Europe n'utilise pas ce composant (§6). *Groupe 7.4 : FilSteps relie les numéros d'une suite d'étapes (page Accompagnement), tracé au défilement sur ordinateur. Les drapeaux emoji des pays sont remplacés par leur code en typographie (« DE », T-22).*

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

**Exception réservée à la section « Cinq principes » de Qui sommes-nous (lot 7.8, votre brief du 19 novembre 2026) : le coin feuille.** Chaque carte a un rayon de 0,75 rem sur trois coins et de 3 rem sur un seul ; ce grand coin change d'une carte à l'autre, comme une feuille qui pousse (haut droit, bas gauche, haut gauche, bas droit, haut droit, puis bas gauche pour la carte finale). Une encoche en demi-cercle de 12 px de rayon est découpée dans la carte, là où le fil entre : sur le bord gauche, à 70 px du haut, dans le parcours épinglé ; en haut de la carte, à 70 px du bord, en colonne. Classes `principle-leaf-*` et `principle-notch` (src/index.css). Les cartes sont des aplats pleins, identiques en clair et en sombre (tokens `--principle-*`), sans ombre ni bordure, sauf la carte finale (papier, bordure forêt de 1,5 px). Nulle part ailleurs.

Jamais de rayon de 20 px sur un petit élément. Les neuf valeurs actuelles (pilule, 24 px sous deux écritures, 16, 12, 20, 8, 32 et 4 px ; TOK-05) sont toutes ramenées à ces trois-là.

## 10. Mouvement

> **Décision du 16 novembre 2026 (la vôtre) : un mouvement riche, fluide et doux, construit avec GSAP.** Elle remplace « un seul moment fort ». GSAP et ScrollTrigger restent dans le projet : leur retrait, prévu au lot 8, est annulé. Lenis ne sert que sur ordinateur à souris. Mise en œuvre au lot 7, après la validation de l'accueil statique (lot 6).

**Principes**
- **Doux, c'est-à-dire fluide et posé** : courbes `power2.out`, `power3.out` ou `power3.inOut`, de 0,6 à 1,2 s. Aucun rebond, aucun élastique, aucun effet magnétique. Ce qui suit le défilement n'a pas de courbe (`ease: "none"`) et un lissage (`scrub`) de 0,5 s au plus.
- **Chaque effet raconte WAHHF** : la passerelle Cameroun → Europe, la progression A1 → C1, la preuve du terrain. Pas d'effet décoratif répété partout, et au plus un effet fort par section.
- **Rien n'attend l'animation** : l'état final de chaque effet est celui du HTML. Si le JavaScript tarde ou échoue, tout reste lisible. L'image d'attente du hero (élément LCP) n'est jamais à opacité 0. Un élément encore masqué qui reçoit le focus s'affiche aussitôt.

**Les moments de l'accueil**

| # | Moment | Ordinateur (1 024 px et plus, souris) | Téléphone et tactile | Mouvement réduit |
|---|---|---|---|---|
| 1 | Hero, à l'arrivée | Le titre est révélé ligne par ligne derrière un masque (de 100 % à 0, 1 s, décalage de 0,12 s). Suivent la phrase et les boutons, en fondu court (0,6 s), puis le fil, qui se dessine (1,2 s). | idem | tout est en place, le fil est absent |
| 1 bis | Hero, au défilement | La vidéo (ou l'image) descend un peu moins vite que la page (parallaxe de 8 % au plus) et le voile s'assombrit doucement. | rien | rien |
| 2 | Mobilité & Langues | Le titre apparaît. Le fil A1 → C1 se dessine au fil du défilement, et chaque niveau s'allume quand le trait l'atteint. | titre en fondu, fil déjà tracé | tout est en place |
| 3 | Sur le terrain | Le titre apparaît. Une photo de l'Open Day, dans un cadre arrondi au centre (environ 42 % × 58 %), s'ouvre au défilement pendant que l'image passe de 1,2 à 1. À la fin apparaissent la légende « Yaoundé, 25 avril 2026 » et le lien vers la galerie. La section est épinglée, seulement sur un écran d'au moins 700 px de haut. *Votre décision du 17 novembre 2026 : tant que la photo source fait 986 px, l'ouverture s'arrête à la largeur du container (72 rem), avec un rayon de 20 px. Le plein écran reviendra avec les originaux HD ou la boucle vidéo (`config/fieldMedia.ts`, réglage `fit`).* | photo normale en fondu, légende et lien dessous | photo normale, sans fondu |
| 4 | Domaines | Les lignes de la liste apparaissent. | idem | en place |
| 4 bis | Apprendre, cultiver, grandir | Titre, phrase et lien apparaissent (fondu et montée) ; les 5 panneaux se découvrent du bas vers le haut (clip-path, 0,9 s, 0,08 s de décalage, ordinateur seulement). Survol : la bande s'ouvre après 100 ms d'intention, en 650 ms (transform et largeur, pas de décalage de mise en page) ; le texte arrive 350 ms après le début (300 ms) et part en 120 ms. | RevealBatch, CSS | tout en place, changement de panneau instantané |
| 5 | Carte de présence | Les régions apparaissent en cascade douce, puis l'arc Cameroun → Europe se trace une fois, quand la carte entre à l'écran. | idem | carte et arc en place |
| 7 | Agir | Les lignes apparaissent. | idem | en place |

**Apparitions** (listes, cartes d'actualités, photos) : fondu et montée de 24 px, en 0,7 s, `power2.out`, une seule fois, groupées par `ScrollTrigger.batch`. Elles se déclenchent quand **le haut de l'élément** atteint 85 % de la hauteur de l'écran, jamais selon une fraction de la surface d'un groupe (ANIM-02). Sur l'accueil, seuls les titres des sections 2 et 3 s'animent. Un élément déjà à l'écran quand GSAP arrive n'est jamais masqué.

**Transitions entre pages** : fondu d'entrée de 0,3 s, sans fondu de sortie ni attente (ANIM-03), instantané en mouvement réduit. Pas de fondu au premier chargement.

**Autres pages**
- **Académie** : sur ordinateur, la frise A1 → C1 se dessine au défilement ; le niveau affiché reste le point plein.
- **Fiches pays** : le fil Cameroun → pays se dessine une fois, à l'arrivée.
- **Groupe 7.1 (votre brief du 17 novembre 2026)**, sur Mobilité & Langues, l'Académie, les pages de niveau et Candidater :
  - chaque en-tête de page arrive comme le hero, en CSS : titre ligne par ligne derrière un masque (0,8 s), puis introduction et boutons en fondu court ;
  - Mobilité : frise A1 → C1 au défilement (ordinateur) ; photo de l'en-tête découverte du bas vers le haut par un clip-path (ordinateur seulement, une fois, comme pour « Sur le terrain »), simplement en place ailleurs ;
  - pages de niveau : le fil se dessine jusqu'au niveau affiché, qui s'allume ;
  - apparitions groupées des listes et des photos, comme ailleurs.
- **Groupe 7.2 (votre brief du 17 novembre 2026)**, sur Faire un don, Agir, Contact et Transparence :
  - chaque en-tête de page arrive comme le hero, en CSS (titre ligne par ligne derrière un masque en 0,8 s, puis introduction en fondu) ;
  - Agir : les trois voies apparaissent en groupe (fondu et montée de 24 px, 0,7 s, 0,08 s de décalage). Celles qui sont déjà à l'écran à l'arrivée (les trois à 1 440 px, les deux premières à 390 px) le font en CSS juste après l'en-tête ; la troisième, sous l'écran à 390 px, par les apparitions groupées habituelles ;
  - Faire un don : seulement des retours d'action. L'option choisie (devise, montant ; l'affectation est un menu déroulant) se marque en 150 ms, coche comprise : le contour de 2 px apparaît en fondu, par l'opacité seulement (revue du groupe 7.2) ; la ligne d'impact change en fondu croisé de 0,3 s, l'ancienne phrase s'effaçant pendant que la nouvelle apparaît. Pendant la frappe d'un montant libre, elle attend une courte pause ;
  - Contact et Transparence : seulement l'en-tête de page, rien sur les champs ni sur le texte ;
  - mouvement réduit : tout est en place et change d'un coup.
- **Groupe 7.3 (votre brief du 17 novembre 2026)**, sur Qui sommes-nous, Nos actions, Notre impact, Partenaires, Galerie, Actualités et l'article :
  - chaque en-tête de page arrive comme le hero, en CSS (titre ligne par ligne derrière un masque en 0,8 s, puis introduction en fondu) ;
  - Qui sommes-nous : la frise « Notre parcours » se dessine au défilement sur ordinateur (§6), seuls ses points s'allumant (ses paragraphes restent lisibles) ; les photos de la gouvernance, quand elle sera publiée, se découvriront du bas vers le haut par un clip-path ;
  - Nos actions : pour chaque domaine, sur ordinateur, la photo se découvre du bas vers le haut par un clip-path (0,9 s, power3.out), puis le texte apparaît en fondu (0,6 s, power2.out), une fois ; un domaine déjà à l'écran à l'arrivée n'est jamais masqué, un domaine atteint au clavier s'affiche aussitôt ; tout est en place sur téléphone et en mouvement réduit ;
- **Lot 7.8 (votre brief du 19 novembre 2026)**, « Cinq principes » de Qui sommes-nous (`effects/motion/PrinciplesMotion.tsx`, chargé à part quand la section arrive à une demi-hauteur d'écran ; jamais chargé en mouvement réduit) :
  - ordinateur (1 024 × 700 px au moins, souris) : la scène s'épingle sous l'en-tête pendant 3,5 hauteurs d'écran ; tout suit la molette (scrub 0,6, sans courbe ni aimantation, Lenis branché) ; le fil se dessine (DrawSVG), le point le parcourt (MotionPath) et la piste glisse pour garder le point à 40 % de la largeur de l'écran ; à chaque encoche, la carte apparaît (fondu, montée de 24 px, échelle 0,94 → 1), le point fait une impulsion (× 1,4), titre et description montent ligne par ligne sous un masque (SplitText, redécoupés au redimensionnement et au changement de langue), le compteur « Principe 01 / 05 » roule ; la carte finale, puis la section se libère. Titre et introduction révélés ligne par ligne à l'arrivée. Le bouton final reçoit le focus avant la fin : la page va à la fin du parcours (2.4.11). Mesuré : aucune tâche longue, 60 images par seconde (33 ms au pire, processeur ralenti × 4), aucun saut après la section ;
  - téléphone, tablette, écran tactile ou bas : colonne, fil vertical tracé au défilement (scrub 0,5), cartes par lots (fondu, montée de 16 px, échelle 0,96 → 1, 80 ms de décalage) ; ni point ni compteur ;
  - mouvement réduit : colonne, fil tracé, tout en place, même sur grand écran.
  - *Écarts voulus par votre brief, réservés à cette section : scrub de 0,6 s (0,5 au plus ailleurs), SplitText, compteur et défilement horizontal épinglé (retirés partout ailleurs, annexe B), petites capitales espacées pour la rubrique et le compteur.*
  - Notre impact : la carte (cascade des régions, puis l'arc), inchangée ;
  - Galerie : vignettes en apparitions groupées ; la visionneuse s'ouvre depuis la vignette cliquée, la photo passant de sa place dans la grille à la visionneuse (0,6 s, power3.inOut) pendant que le fond apparaît en fondu (0,3 s), avec l'API View Transitions du navigateur ; sans elle, ou en mouvement réduit, ouverture simple. D'un élément à l'autre, fondu de 0,3 s sans glissement (annexe B, ligne 38), instantané en mouvement réduit. Écart accepté (revue du groupe 7.3) : à l'ouverture depuis la vignette, le navigateur fige l'écran 80 à 130 ms, processeur ralenti ×4, le temps de photographier les deux états ; aucune tâche longue, et ce n'est pas du défilement. Ne photographier que la photo (et non toute la page) n'a rien changé de mesurable, l'essai n'a pas été gardé. L'ouverture simple (mouvement réduit) : 50 ms au plus à la première ouverture, 17 à 33 ms ensuite ;
  - Actualités : cartes en apparitions groupées ; article : barre de lecture forêt (feuille en sombre), qui suit le défilement sans dépendre du moteur de Motion, sur la hauteur de l'article (pleine quand la fin du texte atteint le bas de l'écran, et non plus en bas du footer), et image découverte du bas vers le haut à l'arrivée (ordinateur, comme l'en-tête de Mobilité) ;
  - *Retouches du 19 novembre 2026 (votre demande : « page vide, sans design ni animations ») :* Actualités a une photo dans l'en-tête (A41, découverte du bas vers le haut sur ordinateur, comme Mobilité) ; l'état vide et « En images » partagent une section sauge ; la journée du 25 avril y est présentée en mosaïque de trois photos 3:2 (découvertes du bas vers le haut, clip-path, ordinateur), suivie des quatre autres albums de la galerie en cartes (couverture 4:3, nom, nombre de photos ; deux colonnes sur téléphone, quatre sur ordinateur). Les grandes photos s'affichent à 34 rem au plus (544 px pour des sources de 1 600 px).
  - Partenaires : l'en-tête et les apparitions de la liste, rien d'autre.
- **Groupe 7.4 (votre brief du 17 novembre 2026)**, sur Accompagnement vers l'Europe, les 10 fiches pays et Éviter les arnaques :
  - chaque en-tête de page arrive comme le hero, en CSS (titre ligne par ligne derrière un masque en 0,8 s, puis introduction et boutons en fondu) ; les quatre autres guides d'étape aussi ;
  - Accompagnement : les 5 étapes sont reliées par le fil, qui se dessine au défilement sur ordinateur (sans courbe, lissage de 0,5 s), chaque numéro s'allumant quand le trait l'atteint (§6) ; tracé sur téléphone et en mouvement réduit. L'arc de la mini-carte se trace à l'entrée de la carte (1,2 s), puis se retrace à chaque changement de pays (0,8 s, power3.inOut, masque circulaire : transform seulement), sur ordinateur à souris ; ailleurs, il change de pays d'un coup. Les cartes des fiches ne sont plus affichées (revue du groupe 7.4, §13) ;
  - fiches pays : le fil se dessine une fois, après le titre, puis la mention « Liens officiels vérifiés le … » arrive en fondu (seulement quand les dates sont fournies) ; étapes et liens en apparitions groupées ;
  - Arnaques, sobre et sérieuse : la check-list des 5 signes d'arnaque apparaît élément par élément (fondu seul, 0,6 s, 0,08 s de décalage), une fois : à l'arrivée si elle est déjà à l'écran, sinon quand son haut atteint 85 % de l'écran. Rien n'est lié à la position du défilement (ni scrub, ni épinglage), aucune apparition groupée, rien de ludique.
- **Listes** : apparitions groupées, comme sur l'accueil.
- **Formulaires** : rien sur Contact et Don. *Groupe 7.2 : sur Don, les retours d'action ci-dessus (option en 150 ms, ligne d'impact en fondu croisé) ; toujours rien au défilement.* *Groupe 7.1 :* sur le test de niveau et sur Candidater, seulement des retours d'action. Le passage d'une question ou d'une étape à l'autre se fait en fondu avec un glissement de 16 px (0,3 s, power2.out). La barre de progression se remplit (0,3 s). Le focus passe au titre de la question ou de l'étape une fois l'animation finie (aussitôt en mouvement réduit). Au résultat du test, le fil se dessine jusqu'au niveau conseillé, qui s'allume. Aucune apparition au défilement dans un formulaire.
- **Rien** sur les pages légales, la page Arnaques et les pages historiques. *Groupe 7.2 : Transparence, rangée jusqu'ici avec les pages légales, a l'arrivée de son en-tête ; Mentions légales et Confidentialité restent sans mouvement.* *Groupe 7.4 : la page Arnaques a désormais l'arrivée de son en-tête et l'apparition de sa check-list (ci-dessus), rien d'autre.*

**Ce qui ne bouge pas** : l'en-tête du site (toujours visible ; les en-têtes de page arrivent une fois, groupe 7.1), le footer, les textes courants, les boutons (couleur au survol seulement), la bulle WhatsApp, les cartes géographiques une fois apparues.

**Inchangés** : survols (couleur en 0,3 s, sans déplacement ni zoom, seulement sur ce qui est cliquable) ; appui (`:active`) immédiat ; fondus de 0,3 s du menu mobile, des fenêtres et des messages d'état ; barres de progression du test de niveau et de la candidature (0,3 s, un retour d'action).

**Garde-fous (non négociables)**
- **Mouvement réduit** : tout est visible tout de suite. Aucun épinglage, aucun scrub, pas de Lenis.
- **Téléphone et tactile** : ni épinglage ni scrub lourd. Seulement les apparitions légères et le fil du hero. Pas de Lenis.
- **Performance** :
  - GSAP et ScrollTrigger sont chargés à la demande (`import()`), après le premier affichage ;
  - le LCP mobile n'est pas dégradé ;
  - le JS initial reste sous 200 Ko compressés ;
  - seuls `transform` et `opacity` sont animés (le `clip-path` est toléré pour « Sur le terrain » sur ordinateur) ; *groupes 7.1 et 7.3 : aussi pour les photos découvertes du bas vers le haut (en-tête de Mobilité, domaines de Nos actions, gouvernance, image de l'article), sur ordinateur seulement* ;
  - le profil Performance, processeur ralenti ×4, ne montre aucune image de plus de 50 ms pendant le défilement.
- **Code** : `useGSAP` avec un `scope` ; `gsap.matchMedia()` pour l'ordinateur, le téléphone et le mouvement réduit ; `ScrollTrigger.refresh()` après le chargement des images et des polices ; aucun `markers` en production.

**Outils**
- **GSAP + ScrollTrigger** (avec `@gsap/react`) : tout ce qui suit le défilement ou s'enchaîne (apparitions, épinglage, frises, cascade, arc, parallaxe). Code dans `src/effects/motion/`.
- **CSS** : l'arrivée du hero (titre, phrase, boutons, fil). Elle doit jouer dès le premier affichage, avant l'arrivée de GSAP, qui est chargé après. Aussi les survols et le fondu d'entrée des pages.
- **Motion** : le menu mobile et les fenêtres qui entrent et sortent de la page, en version allégée (`LazyMotion` et `m.div`). *Votre décision du 17 novembre 2026 :* son moteur d'animation est chargé après le premier affichage (LCP mobile). Tant qu'il n'est pas là, ou s'il ne se charge jamais, le menu mobile et la fenêtre du film passent par un repli CSS. Ils s'ouvrent avec une animation CSS (le menu se déroule en 0,7 s, la fenêtre apparaît en fondu) et se ferment aussitôt. Ce cas est vérifié avec le fichier du moteur bloqué. La version complète (avec le glisser) n'arrive qu'avec la visionneuse, les cartes et les pages historiques.
- **Lenis** : défilement fluide, ordinateur à souris seulement.

**Mouvement réduit** (`prefers-reduced-motion: reduce`) :

| Effet | Avec animations | Mouvement réduit |
|---|---|---|
| Arrivée du hero (titre, phrase, boutons) | masque et fondus, 2 s en tout | tout en place dès le premier rendu |
| Fil du hero | se dessine en 1,2 s, une fois | absent (décision du 16 novembre 2026) |
| Parallaxe et voile du hero | au défilement, ordinateur | rien |
| Vidéo de fond du hero | muette, en boucle, bouton Pause | jamais : image fixe |
| Fil A1 → C1 (accueil, Académie) | se dessine au défilement, ordinateur | tracé, niveaux allumés |
| Sur le terrain | s'ouvre en plein écran, ordinateur | photo normale |
| Carte de présence | cascade puis arc | en place |
| Apparitions (listes, photos, actualités) | fondu et montée de 24 px | en place |
| Changement de page | fondu d'entrée de 0,3 s | instantané |
| Défilement | Lenis sur ordinateur à souris | natif |
| Fondus (menu, fenêtres, messages) | 0,3 s | instantanés |
| Survols | couleur en 0,3 s | couleur instantanée |
| Barres de progression (test, candidature) | avancent en 0,3 s | changent d'un coup |
| Film de présentation | lecture seulement au clic | lecture seulement au clic, sans lecture automatique |

*Avant le 16 novembre 2026, ce paragraphe disait : « Un seul moment fort : le fil du hero qui se dessine une fois. Ailleurs, des fondus de 0,3 s. Rien d'autre ne bouge. » La liste des effets retirés (annexe B) reste valable, sauf ceux qui reviennent sous la forme décrite ci-dessus (note en tête de l'annexe B).*

## 11. États

À couvrir pour chaque composant et chaque écran concerné :

- **Boutons et liens** : repos, survol (souris), appui (toucher), focus clavier (anneau forêt sur clair, soleil sur sombre et sur nuit), envoi en cours (couleurs gardées, libellé qui dit ce qui se passe, clic bloqué ; jamais désactivé sans explication).
- **Champs** : vide, rempli, focus, invalide (message précis sous le champ), aide.
- **Choix** (boutons radio en tuiles) : non choisi, choisi, focus. Un seul style pour l'option choisie sur tout le site (T-18) : contour forêt de 2 px et coche visible (soleil en sombre et sur nuit), jamais la couleur seule. L'option non choisie a un contour 1 px `border-input`. La coche se place à droite d'un libellé aligné à gauche, devant un libellé centré (montants, fréquence). *Fait le 16 novembre 2026 dans `ChoiceTile` (commit `a26a9f8`) : les trois styles d'option choisie (nuit et or, rouge du don, or plein) ont disparu.* *Groupe 7.2 : sur la page Don, ce même style s'applique en 150 ms (DON-06), le contour de 2 px apparaissant en fondu ; le rouge ne reste qu'au bouton de don.*
- **Formulaires** : erreurs, étape suivante (focus sur le titre de l'étape), message préparé (WhatsApp ou e-mail), sans faux succès.
- **Images et film** : chargement (fond sauge au ratio réservé), échec (texte alternatif et légende visibles), film indisponible (message et lien direct vers YouTube).
- **Carte de présence** : chargement des données (squelette à la forme de la carte, `aria-busy`), région choisie, échec de chargement.
- **Vide** : section Chiffres masquée tant qu'il n'y a pas deux chiffres sourcés ; Actualités sans article réel (« Aucun article publié pour le moment » et lien vers la galerie). *Groupe 7.3 : fait, avec une carte vers l'album de l'Open Day ; les adresses des articles d'exemple affichent « Cet article est introuvable ».*
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
| Empilement d'effets spectaculaires, façon sites primés | ANIM-01 | ~~un seul moment fort, lié à la signature~~ un mouvement doux qui raconte WAHHF, un effet fort par section au plus (décision du 16 novembre 2026, §10) |
| Fondu et glissement sur chaque section | ANIM-04 | ~~aucune apparition au défilement~~ apparitions sur les listes, les cartes d'actualités et les photos seulement, déclenchées par le haut de chaque élément ; sur l'accueil, titres animés dans les sections 2 et 3 seulement (§10) |
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
1. ~~**Photo du hero**~~ *(remplacé le 16 novembre 2026 par votre décision : le hero garde la vidéo en fond, §6)* : pas de photo en fond plein écran tant que les originaux HD manquent ; photo cadrée, à côté du titre sur ordinateur (environ la moitié du container), sous le titre sur téléphone, jamais affichée plus grande que sa taille réelle en densité 2, soit 493 px de large au plus pour `open-day-marche` (§5, §6, §7).
2. **Palette** : toute couleur ajoutée qui ne sert pas à au moins deux endroits concrets du site est supprimée ; chaque ajout gardé dit en une ligne où il sert, en clair comme en sombre (§3.7). Résultat : 23 ajouts gardés sur 26 ; pousse, pousse pâle et menthe retirées (aucun succès affiché sur le site) ; brique pâle, ambre pâle et ciel pâle gardées au seuil exact de deux endroits (confirmé le 16 novembre 2026).
3. **Arc de la mini-carte** : forêt à environ 40 % d'opacité, décoratif, sans exigence de contraste (§6).

**Propositions acceptées telles quelles**
- Container unique de 72 rem (§5) ; en-tête toujours visible (§10) ; barres de progression du test et de la candidature gardées (§10).
- ~~Retrait de GSAP et Lenis quand plus rien ne les utilise ; le fil du hero en CSS seul (§10).~~ *Annulé par votre décision du 16 novembre 2026 sur le mouvement : GSAP et ScrollTrigger restent, Lenis sur ordinateur à souris (§10).*
- Section Chiffres masquée tant qu'elle n'a pas deux chiffres sourcés (§7).
- Alerte en ambre (§3.2) ; soleil sur les fonds sombres (§3.3) ; tokens « on-inverse » (§3.4) ; renommage des tokens en trois temps (§3.6).
- Tailles de l'échelle typographique (§4.3), intitulés courts de la frise A1 à C1 (§6), ce qui quitte l'accueil (§7, pour l'étape qui traitera l'accueil), retrait des effets (§10, annexe B ; revu par la décision sur le mouvement).

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
- **TODO gardés** : les textes provisoires restent visibles tant que le contenu réel manque, par exemple « Montants donnés à titre d'exemple (TODO : à confirmer) ». *Groupe 7.1 (votre brief du 17 novembre 2026) : sur Mobilité & Langues, l'Académie, les pages de niveau et Candidater, les textes provisoires sont au contraire masqués tant qu'ils ne sont pas fournis. Les questions correspondantes sont dans `docs/contenus-a-fournir.md`. Ailleurs, la règle ne change pas.* *Groupe 7.2 (votre brief du 17 novembre 2026) : l'exception s'étend à Faire un don, Agir, Contact et Transparence ; leurs questions sont aux numéros 97 à 111. Le footer, commun à toutes les pages, garde ses textes provisoires (« TODO : adresse exacte », réseaux sociaux).* *Groupe 7.3 (votre brief du 17 novembre 2026) : l'exception s'étend à Qui sommes-nous, Nos actions, Notre impact, Partenaires, la Galerie et les Actualités ; leurs questions sont aux numéros 112 à 128. La carte de présence de l'accueil garde ses lignes « à confirmer (TODO) » ; celle de Notre impact les masque.* *Groupe 7.4 (votre brief du 17 novembre 2026) : l'exception s'étend à Accompagnement vers l'Europe, aux 10 fiches pays (plus aucune note « TODO : vérifier lien officiel » ; « Lien vérifié le … » quand la date est fournie, sinon rien) et à Éviter les arnaques (adresse integrite@… masquée) ; leurs questions sont aux numéros 129 à 137.*

**Étapes planifiées après le lot 5**
- **Étape de l'accueil** (§7), avec deux ajouts : les couleurs de la carte de présence (panneau blanc en sombre, régions et pays en or, tuiles crème ; elles valent aussi pour /notre-impact) ; le style de la bulle WhatsApp (ombre, contour et point or), en plus du vrai glyphe et du libellé court (RESP-03).
- **Petite étape « Mobilité & Langues »** : l'appel final en carte nuit juste au-dessus du footer, réduit à une seule action (« Candidater ») ; les témoignages (TODO, à remplacer par des témoignages réels, T-02) ; la gratuité dite une fois par écran ; le nombre de boutons du hero.
- **Petite étape « Candidater »** : la gratuité redite avant le premier champ ; le nombre d'actions et d'indicateurs d'étape au premier écran ; les mentions de chantier.
- **Petite étape « Faire un don »** : la gratuité redite, le nombre d'actions au premier écran, l'encadré « Garantie de transparence » en simple bloc de texte, les mentions de chantier. *Faite au groupe 7.2 : gratuité dite une fois, dans l'introduction ; l'encadré « Garantie de transparence » est retiré plutôt que gardé en bloc de texte (sa promesse renvoyait à une page vide, TRA-01) ; mentions de chantier retirées.*

**Décisions du 16 novembre 2026, après le lot 5 (validé)**
- **Sous-titre IROKO** : la décision n° 11 de la liste du lot 5 est annulée ; « Branche sociale du groupe IROKO » reste sous le logo (Qui sommes-nous) et sous le nom dans l'en-tête, visible à toutes les largeurs (§8, En-tête du site).
- *(En-tête rétabli tel qu'au commit `714194d` à votre demande, après le lot 6 : les deux points suivants ne s'appliquent plus à l'en-tête.)*
- **En-tête** (T-09) : « Candidater » (forêt) à côté de « Faire un don », qui passe en contour cœur ; le cœur plein est réservé à la page Don et à la porte « Faire un don » du hero (§8, Boutons).
- **Pages destinées aux jeunes** (Mobilité, Académie, niveaux, Candidater, Accompagnement, fiches pays, Arnaques) : aucun bouton de don dans le contenu (ARN-02) ; le footer garde son lien.
- **Contrôle des textes provisoires** (T-01) : un script npm échoue si « TODO », « Simulé » ou « démonstration » apparaissent dans le texte affiché, un `aria-label` ou une option de liste des pages WAHHF ; lancé à la fin de chaque lot, son résultat est remis à la fondation.
- **Début du lot 6** : barre de lecture réservée aux articles, en forêt (plus en or) ; bandeau cookies aux couleurs du contrat.
- **Groupes 7.1 et 7.2** : encadré « Vigilance » de Contact en alerte ambre, encadré « Message préparé » en information, boîte du test de niveau.
- **Accueil (lot 6)** : pas de mention d'IROKO dans le hero, l'en-tête la porte déjà.

**Décision du 16 novembre 2026 (la vôtre) : le hero garde la vidéo en fond.** Elle remplace la photo cadrée (ajustement n° 1 ci-dessus). Vidéo WAHHF coupée à 64 s ; consentement explicite (sans accord : image fixe et lien « Activer la vidéo ») ; jamais sur téléphone, écran tactile, réseau lent, économie de données ni en mouvement réduit (image portrait via `<picture>`) ; voile en dégradé horizontal nuit, contraste ≥ 4,5:1 sur le pire pixel ; image d'attente nette préchargée, élément LCP ; fil soleil qui se dessine une fois, absent en mouvement réduit ; code prêt pour une boucle hébergée sur le site (§6, §7, §10).

**Accueil (lot 6), suite de la même décision** : Mobilité & Langues juste après le hero, avec « Candidater » bien visible ; « Sur le terrain » avec les vraies photos de l'Open Day et le lien vers la galerie (le showreel IROKO quitte l'accueil) ; domaines en liste, liens en ancre vers `/nos-actions#<domaine>` (T-10) ; carte de présence aux couleurs du contrat (« Choisissez une région », sans « Voir les actions » ni « 10 régions couvertes », T-11) ; chiffres masqués ; un seul bloc Agir avec la newsletter, sans bande de don finale ; masqués sans suppression des données : témoignages, partenaires, actualités d'exemple, carte « Identité & Lien IROKO », Approche et frise (elles iront sur `/qui-sommes-nous`).

**Décision du 16 novembre 2026 (la vôtre) : le mouvement.** « Un mouvement riche, fluide et doux, construit avec GSAP » remplace « un seul moment fort ». GSAP et ScrollTrigger restent dans le projet (le retrait prévu au lot 8 est annulé) ; Lenis seulement sur ordinateur à souris. Courbes douces de 0,6 à 1,2 s, sans rebond ni effet magnétique ; chaque effet raconte la passerelle Cameroun → Europe, la progression A1 → C1 ou la preuve du terrain ; un effet fort par section au plus. Mouvement réduit : tout visible, sans épinglage, scrub ni Lenis. Téléphone : apparitions légères et fil du hero seulement. Lancé après la validation de l'accueil statique (lot 6), au lot 7 (§6, §10, §12, annexe B).

**Décisions du 17 novembre 2026 (les vôtres), après le lot 7 :**
- **LCP mobile** : le moteur de Motion est chargé après le premier affichage, avec un repli CSS pour le menu mobile et la fenêtre du film. Ils s'ouvrent et se ferment même si ce moteur ne se charge jamais, ce qui a été vérifié avec le fichier bloqué (§10, Outils).
- **Sur le terrain** : l'ouverture s'arrête à la largeur du container (72 rem, rayon 20 px) tant que la photo source fait 986 px. Le plein écran reviendra avec les originaux HD ou la boucle vidéo (§10, moment 3).
- **Fil sur la frise de l'accueil** : accepté, c'est le quatrième endroit du fil (§6).
- **Contenus à fournir** : la liste des questions pour la fondation est dans `docs/contenus-a-fournir.md`.

**Groupe 7.1 (votre brief du 17 novembre 2026)**, sur Mobilité & Langues, l'Académie, les pages de niveau et Candidater :
- un en-tête du lot 5 au contenu propre : la photo de l'Open Day sur Mobilité (en entier, légendée et datée) et sur Candidater (accompagnement d'une participante) ; l'Académie n'a pas de vraie photo de cours ;
- l'encadré d'information sous le titre ;
- une seule action en fin de page, sans carte nuit au-dessus du footer ;
- la gratuité une fois par écran ;
- les textes provisoires masqués.

Audit traité :
- Mobilité : MOB-01, témoignages masqués, portes d'entrée avant « Pourquoi ».
- Académie : le test avant la fiche, ACAD-01 à ACAD-08, sessions passées masquées d'elles-mêmes (T-05, dates ISO).
- Pages de niveau : NIV-01. Ce sont de vraies pages qui ouvrent sur le niveau, avec leur adresse canonique.
- Candidater : CAND-02 (étape dans l'adresse, brouillon gardé dans l'onglet), CAND-04, « Qui peut candidater » et « Après votre candidature » avant le formulaire, un seul indicateur d'étape.

*Groupe 7.2 (votre brief du 17 novembre 2026)*, sur Faire un don, Agir, Contact et Transparence :
- un en-tête du lot 5 révélé à l'arrivée, sans photo (aucune vraie photo de don, de bénévole ou de partenaire n'est fournie) ;
- une seule action claire en fin de page : « Préparer mon message » (Don), « Préparer l'envoi de ma proposition » (Agir), « Préparer l'envoi de mon message » (Contact), « Revenir à la page de don » (Transparence) ;
- pas de carte nuit au-dessus du footer : la carte « Nous joindre directement » de Contact passe sur le fond de la page ;
- la gratuité une fois par écran, jamais dans un titre ; IROKO n'est nommé dans aucun texte nouveau ;
- les textes provisoires masqués, gardés dans le code (`EXAMPLE_IMPACTS_NOT_VALIDATED`, `RESPONSE_DELAY_NOT_VALIDATED`, `TRANSPARENCY_PENDING_BLOCKS`, ancien formulaire de don dans `src/pages/don/ArchivedDonationForm.tsx`).

Audit traité :
- Faire un don : DON-01 (aucun vrai moyen de paiement fourni : section « Comment donner aujourd'hui », message préparé par WhatsApp ou e-mail, plus de « Simulé », de « démonstration » ni de note Stripe / Symfony) ; DON-03 (promesse « directement aux actions de terrain » retirée ; plus de « 100 % » sur la page Don, et la promesse « 100 % des dons… » n'est plus affichée nulle part : « 100 % » ne reste ailleurs que dans d'autres sens, « 100 % gratuits », exemples d'arnaque) ; DON-05 en partie (ligne d'impact en aria-live, qui suit le montant et le domaine ; ce que permet un montant reste à fournir, questions 67 à 71 et 117) ; DON-06 ; DON-07 (euros ou francs CFA, minimum et maximum écrits, conversion à la parité fixe) ; DON-08 et ACT-02 (affectation alignée sur les 6 domaines, `?affectation=<domaine>` présélectionné). DON-04 en partie : don mensuel, case d'anonymat et case de consentement obligatoire retirés tant que leurs conditions manquent. DON-02 reste à fournir (qui reçoit le don, reçu fiscal, IBAN).
- Agir : AGIR-02 (`#partenaire` et `#benevole` règlent le formulaire ; champs propres aux partenaires), AGIR-03 (défilement doux et focus sur le titre du formulaire), AGIR-04 en partie (phrase d'appui ; missions, durées, lieux et contact partenariats à fournir, masqués).
- Contact : page du lot 2 dans la charte (alerte « Vigilance » sous le titre, coordonnées sans carte nuit) ; CTC-03 (une seule source, `src/config/contact.ts`, lue aussi par le footer, la bulle WhatsApp et le texte de la Confidentialité ; restent écrits en dur le lien d'alerte du calendrier des sessions de l'Académie, groupe 7.1, et la page historique /vkibusiness, intouchable).
- Transparence : TRA-01 (page gardée, liens du footer et de Notre impact masqués par le réglage `TRANSPARENCY_DATA_PUBLISHED` ; celui du Don est parti avec l'encadré), TRA-02 (retour au don).

Après la revue indépendante (19 novembre 2026) :
- Faire un don : précaution anti-arnaque avant l'envoi et à la dernière étape (texte ci-dessous, questions 134 et 138) ; ligne d'impact qui ne décrit que le programme Mobilité & Langues ; politique de confidentialité ouverte dans un nouvel onglet (la saisie n'est plus perdue) ; option choisie en fondu d'opacité.
- Contact : liens téléphone, e-mail et « Reconnaître une fausse offre » de 44 px de haut ; pas de bulle WhatsApp sur cette page, qui a son propre bouton.

À valider :
- Titre de la page Don : « Votre don finance des cours d'allemand et nos actions au Cameroun ».
- Montants proposés : 25, 50, 100 et 250 € ; 5 000, 10 000, 25 000 et 50 000 FCFA. Montant libre : de 5 à 10 000 € ; de 3 000 à 6 500 000 FCFA ; au-delà, « écrivez-nous directement ».
- Affectation par défaut : « Là où le besoin est le plus urgent » (avant : l'Académie d'allemand).
- Contact : sur téléphone, les coordonnées directes passent avant le formulaire, pour que la page finisse sur une seule action.
- Agir : arrivée en CSS des voies déjà à l'écran (fondu et montée de 24 px, juste après l'en-tête), plutôt que rien.
- Précaution de la page Don : « Pour votre sécurité, la fondation vous répond seulement par WhatsApp au +237 693 12 92 05 ou par e-mail depuis contact@wahhf-foundation.org. Si quelqu'un vous écrit d'un autre numéro ou d'une autre adresse au sujet de votre don, ne payez rien et prévenez-nous. »
- Pas de bulle WhatsApp sur la page Contact.
- Bulle WhatsApp sur téléphone, à l'arrivée : elle recouvre en partie le bouton « Remplir le formulaire bénévole » d'Agir jusqu'au premier défilement. Deux choix, communs à toutes les pages : l'accepter, ou réduire la bulle à son seul glyphe (48 px) tant que la page n'a pas défilé.
- Page Arnaques (groupe 7.4) : à côté du parcours de don, où la fondation indique comment régler le don qu'on lui propose, le titre « WAHHF Foundation ne demande jamais d'argent » pourrait devenir « WAHHF Foundation ne demande jamais d'argent aux jeunes ni aux candidats ».

*Groupe 7.3 (votre brief du 17 novembre 2026)*, sur Qui sommes-nous, Nos actions, Notre impact, Partenaires, la Galerie et les Actualités (avec l'article) :
- un en-tête du lot 5 révélé à l'arrivée sur chaque page ; une vraie photo seulement sur Qui sommes-nous (photo souvenir de trois responsables de la fondation à l'Open Day, légendée et datée ; après la revue, plus la photo de groupe des jeunes, tant que les autorisations de la demande B ne sont pas confirmées) ;
- plus aucune carte nuit ni carte dans la carte : le groupe IROKO de Qui sommes-nous et de Partenaires passe sur une section ; la carte reste réservée aux collections cliquables (albums, articles) ;
- en fin de page, sur le fond de la page : « Faire un don » et « Devenir partenaire » (Qui sommes-nous), « Faire un don » (Notre impact), « Proposer un partenariat » (Partenaires), « Faire un don » et « Candidater au programme » (Galerie), la carte de l'album de l'Open Day (Actualités) ;
- la gratuité une fois par écran, jamais dans un titre, mots voisins compris (« sans frais », « aucun frais », « contrepartie financière », « ne rien demander » : la première version les comptait à part, jusqu'à trois mentions par écran sur Qui sommes-nous, corrigé après la revue ; vérifié écran par écran à 390 et 1 440 px) ; IROKO n'est nommé dans aucun texte nouveau, sauf sur Partenaires, où le brief demande de le décrire ;
- les textes provisoires masqués, gardés dans le code : rôles de la gouvernance (`EXAMPLE_GOVERNANCE_ROLES_NOT_VALIDATED`, `src/config/governance.ts`, avec le lien du footer), chiffres de Notre impact (`EXAMPLE_IMPACT_FIGURES_NOT_VALIDATED`), catégories de partenaires (`EXAMPLE_PARTNER_CATEGORIES_NOT_VALIDATED`), articles d'exemple (`EXAMPLE_NEWS_SLUGS`, visibles seulement dans une construction d'aperçu `VITE_APERCU_ACTUALITES=1`), années de la frise, lieux et dates « à confirmer » des albums.

Audit traité :
- Qui sommes-nous : QSN-01 (gouvernance masquée), QSN-03 (plus de colonne logo dans une carte ; « indépendante » et « 100 % » retirés tant que rien ne les étaye), QSN-04 ; QSN-02 en partie (Approche, frise, photo de l'Open Day ; à fournir : histoire datée, questions 112 à 115 ; statut juridique, demande A ; slogan, question 139) ; T-11 (« Basée à Yaoundé et à Douala, avec une coordination en Allemagne » au lieu des « 10 régions »).
- Nos actions : ACT-01 (une seule liste, texte complet, sommaire en liens d'ancre), ACT-02 (`/faire-un-don?affectation=<domaine>`), T-04 (photos réelles seulement), T-10 (`?domaine=` ouvre la page sur le domaine), A11Y-09 ; ACT-03 à fournir.
- Notre impact : chiffres d'exemple masqués (T-11, §7 et §12), lignes TODO de la carte masquées, H2 avant la carte (A11Y-09), « Faire un don » ; IMP-01 en attente de votre choix (ci-dessous).
- Partenaires : PAR-01 (IROKO décrit avec les faits du projet, catégories TODO masquées, « Ce que nous proposons » prête, affichée dès que le contenu est fourni).
- Galerie : GAL-02, GAL-03 (rangées complètes à toutes les largeurs), GAL-05, GAL-07, GAL-08 ; GAL-04 en partie (vidéos à leur taille réelle, vignettes plafonnées à la moitié de leur source ; originaux HD à fournir) ; GAL-01 et GAL-06 restent à faire (autorisations, fichiers sources).
- Actualités et article : ACTU-01, ART-02, ART-03 (image prioritaire), A11Y-10 ; ART-01 en partie (temps de lecture retiré ; l'article lui-même est masqué).

Après la revue indépendante (19 novembre 2026) :
- Qui sommes-nous : la valeur « Aucun frais pour les familles » est retirée (une gratuité dans un titre, la troisième du premier écran) : restent « Dignité et respect » et « Intégrité et vérité » ; principe Transparence : « Rendre compte de l'usage des fonds engagés. » ; le paragraphe sur IROKO s'arrête à « Ce soutien couvre les frais de fonctionnement et d'enseignement. » ; photo d'en-tête : les trois responsables ; frise lisible à pleine opacité.
- Nos actions : un lien du sommaire, ou une arrivée par `?domaine=` ou `#domaine`, donne le focus au titre du domaine (Tab repart de là) ; l'adresse prend `#domaine`, aussi avec le défilement fluide ; plus de décalage d'ancre compté deux fois sur ordinateur (aussi pour les albums de la Galerie).
- Notre impact : introduction en phrase complète (« Voici où la fondation est présente au Cameroun, et les 10 pays européens sur lesquels elle informe les jeunes. »).
- Partenaires : la section « Les autres soutiens de la fondation », qui ne gardait qu'une catégorie et redisait l'introduction, est retirée (texte gardé dans `SUPPORTER_CATEGORIES_NOT_SHOWN`) ; les donateurs sont nommés dans l'introduction ; la fin de page passe sur sauge.
- Galerie : le plafond de taille tient compte de la hauteur (§5) : grilles moins larges sur ordinateur, avec une même taille de case pour tous les albums (colonnes alignées) ; « Sur le terrain » (3 vidéos) sur une colonne sous 768 px, au lieu de vignettes de 109 px où la durée chevauchait le bouton de lecture.
- Actualités : la section de l'album de l'Open Day s'appelle « En images » (« Sur le terrain » est le nom d'un autre album), sa carte fait 30 rem au plus sur une colonne (densité 2, §5) ; la barre de lecture suit l'article seul.
- Légendes des photos d'en-tête au format de la galerie et de Nos actions (« Yaoundé, le 25 avril 2026 », date insécable), aussi sur Mobilité et Candidater.
- Textes retirés ou remplacés par le groupe 7.3, non gardés (historique git) : titres d'onglet « Qui sommes-nous — Fondation camerouno-allemande & Branche sociale IROKO », « Nos 6 domaines d'action — Éducation, Santé, Entrepreneuriat, Environnement, Droits, Mobilité », « Notre impact — Résultats, présence dans 10 régions & transparence », « Partenaires et financeurs — Groupe IROKO & Réseau engagé », « Actualités & Actions de terrain » et leurs descriptions (dont « …ouvertures des sessions d'allemand gratuites, campagnes de santé et reboisement ») ; boutons « Découvrir nos partenaires et financeurs », « Accéder au hub Mobilité & Langues », « Candidater au programme gratuit » (devenus « Découvrir nos partenaires », « Découvrir Mobilité & Langues », « Candidater ») ; titres « Le détail de nos interventions par domaine », « Catégories de partenaires & soutiens », « Comment devenir partenaire de WAHHF Foundation ? » (devenu « Devenir partenaire de WAHHF Foundation »), « Actualités & Actions de terrain » (devenu « Actualités et actions de terrain ») ; introductions « Éducation, Santé, Entrepreneuriat des jeunes, Environnement, Droits et inclusion, et Mobilité & Langues. » (Nos actions) et « En premier lieu le groupe IROKO, accompagné de nos donateurs, professionnels bénévoles et institutions partenaires. » (Partenaires) ; description de valeur « Aucune contrepartie financière n'est jamais demandée aux jeunes et aux familles accompagnés. » ; sur-titre « Partenaire fondateur et mécène structurel ».

À valider :
- Notre impact (IMP-01) : renommer la page « Où nous agissons » tant qu'aucun résultat n'est publié ; elle garde aujourd'hui son titre. Textes proposés : titre « Où nous agissons » ; introduction « Basée à Yaoundé et à Douala, la fondation agit au Cameroun et informe les jeunes sur les études, la formation et le travail dans 10 pays européens. Les résultats chiffrés de nos actions seront publiés ici dès qu'ils seront datés et vérifiés. » ; titre d'onglet « Où nous agissons — Cameroun et 10 pays européens » ; description « Où agit WAHHF Foundation : basée à Yaoundé et à Douala, au Cameroun, elle informe les jeunes sur les études, la formation et le travail dans 10 pays européens. » ; menu et footer « Où nous agissons » au lieu de « Notre impact » (clé `nav.impact` de `fr.json`) ; adresse `/notre-impact` gardée.
- Frise de Qui sommes-nous : étapes affichées sans leurs années non confirmées (ou frise masquée entière jusqu'à confirmation).
- Puces de la galerie sans nombre (« Tous les albums » au lieu de « Tout (19) ») ; le nombre est sous chaque titre d'album.
- Visionneuse de l'accueil : mêmes couleurs du contrat et mêmes fondus de 0,3 s que celle de la galerie (composant partagé) ; l'ouverture depuis la vignette n'est activée que sur la page Galerie.
- Après la revue : Qui sommes-nous avec deux valeurs au lieu de trois ; photo d'en-tête des trois responsables (ou aucune photo) ; introduction de Partenaires « WAHHF Foundation est soutenue par le groupe IROKO, dont elle est la branche sociale, et par ses donateurs. Aucun autre partenaire n'est nommé sans son accord écrit. »
- Grille de la galerie plus étroite sur ordinateur (règle de la densité 2, §5). Autre possibilité : des cases 16/10 (un ratio du §5) au lieu de 4:3, plus proches des photos en 5:3, qui la laisseraient plus large et recadreraient moins les photos.

*Groupe 7.4 (votre brief du 17 novembre 2026)*, sur Accompagnement vers l'Europe, les 10 fiches pays et Éviter les arnaques :
- un en-tête du lot 5 révélé à l'arrivée sur chaque page, sans photo (aucune vraie photo de départ ni de démarche n'est fournie), l'avertissement anti-arnaque juste sous le titre ;
- une seule source des 10 pays (`src/data/countries.ts`), lue par les fiches, la page Accompagnement, la mini-carte, Candidater, la recherche et la page « introuvable » ;
- plus aucune carte nuit : les liens officiels des fiches en lignes de liens, la fin des guides sur sauge ; en fin de page, « Être accompagné » et « Signaler une arnaque » (Accompagnement), « Être accompagné pour partir en Allemagne » (fiches), « Signaler sur WhatsApp » et « Signaler par e-mail » (Arnaques) ;
- la gratuité une fois par écran, jamais dans un titre ; IROKO n'est nommé dans aucun texte nouveau (la phrase d'origine « au nom de WAHHF Foundation ou d'IROKO » de la page Arnaques est gardée) ; aucun bouton de don ;
- les textes provisoires masqués : notes « TODO » des 21 liens officiels, adresse integrite@… (gardée dans `src/data/arnaques.ts`), mention « pays partenaire historique » de l'Allemagne (gardée en commentaire).

Audit traité :
- Accompagnement : ACCO-01 (l'étape « éviter les arnaques » mène au bon guide), ACCO-02 (5 étapes cliquables au lieu des 4 étapes et des 5 cartes de guides, numéros des guides retirés, fin de page), ACCO-03 (liste et mini-carte synchronisées en tête de la section des pays).
- Fiches pays : PAYS-01 (aucune note TODO, « Lien vérifié le … » quand la date est fournie), PAYS-03 (« S'orienter vers l'Allemagne », « Être accompagné pour partir en Allemagne », l'article vient des données), PAYS-04 (étapes et liens alignés en haut), PAYS-05 (une seule source, phrase des pays dans l'ordre des données) ; PAYS-02 en partie (« vérifiée » retiré de la description ; dates, auteur et compléments de la fiche Allemagne à fournir) ; T-22 (code pays à la place des drapeaux emoji sur ces pages et sur la page « introuvable ») ; « Hors Union européenne » en ambre ; ETA-06 (adresse en majuscules redirigée, pays inconnu en page « introuvable », déjà en place) ; RESP-04 (mot allemand qui débordait).
- Arnaques : ARN-01 (« Nos seuls canaux officiels » en haut, boutons « Signaler sur WhatsApp » et « Signaler par e-mail » de 48 px), ARN-02 (« Un don ne donne jamais accès à une place » sur la page), ARN-03 (icônes d'alerte ambre, coche seulement pour les bons réflexes), ARN-04 (check-list, faux message annoté, encadré sans lien vers la page elle-même).

Après la revue indépendante (19 novembre 2026) :
- Accompagnement : les 10 cartes des fiches ne sont plus affichées sous la liste et la mini-carte. Elles proposaient les 10 mêmes pays une deuxième fois (30 arrêts au clavier pour 10 destinations, 39 % de la page sur téléphone, la carte Albanie seule sur sa rangée à 1 440 px), la redite que ACCO-02 retire ; la liste mène à chaque fiche, qui reprend le résumé du pays. Elles restent dans le code (`SHOW_COUNTRY_CARDS`), sans la note sur l'Albanie écrite en dur dans la boucle. Au clavier, seule la liste reçoit le focus (§6). La page passe de 8 337 à 5 058 px à 390 px.
- Ancres : « Choisir un pays », « Voir les 10 pays accompagnés » (fiches), « Signaler une arnaque » (vers « Nos seuls canaux officiels ») donnent le focus au titre de la section atteinte ; la touche Tab repart de là, et non plus du haut de la page. C'est un réglage commun (`src/lib/scroll.ts`) : il vaut pour toutes les ancres du site (Agir, Nos actions, test de niveau de l'Académie), vérifiées. « Choisir un pays » redescend à chaque appui, aussi sur téléphone, et l'adresse prend `#pays`.
- Titres des 5 étapes : cible de 44 px (avant 22 à 24 px), sans changer la mise en page ; fin de page : les deux boutons alignés ; liste des 10 pays : le code « AL » reste face à « Albanie » quand « Hors UE » passe à la ligne (aussi sur l'accueil et Notre impact à 390 px).
- Arnaques : l'icône de chaque puce vient de son type (triangle d'alerte, coche ou rien), et non plus de la section. Espaces insécables avant « : ? ! », dans les guillemets et dans « 100 % » sur les pages du groupe, les guides d'étape, le lien de l'avertissement commun et la page « introuvable » (T-19) ; sur téléphone, le bouton des fiches passe à la ligne avant « en Albanie » et non plus entre « en » et le pays.
- Textes retirés sans être listés par la première version : les libellés du statut UE des fiches, « Membre de l'Union européenne (UE) » et « Hors Union européenne (Pays candidat) », devenus « Membre de l'Union européenne » et « Hors Union européenne » (« pays candidat » reste dans la précision juridique de la fiche Albanie) ; la note des cartes « Note : L'Albanie est un pays européen candidat mais n'est pas membre de l'Union européenne. ».
- Historique : la refonte des quatre autres guides est dans le commit de la page Accompagnement (`2363093`) et non dans un commit à elle ; l'historique n'est pas réécrit. Un retour en arrière de `src/pages/accompagnement/GuidePage.tsx` seul reste possible si vous ne la validez pas.

À valider :
- Titre de la page Accompagnement : « Un accompagnement transparent, étape par étape » (avant : « Un accompagnement gratuit, transparent et étape par étape »).
- Les 5 étapes, dans cet ordre, chacune menant à son guide : « Comprendre les parcours (études, formation, travail) », « Préparer son dossier (CV, lettre, diplômes, équivalences) », « Apprendre la langue du pays », « Connaître les démarches officielles et éviter les arnaques », « Préparer son arrivée et son intégration ». L'étape des arnaques n'a pas de couleur à part (l'audit laissait cette mise en avant à valider).
- Sur la page Accompagnement, les 10 cartes des fiches ne sont plus affichées (ci-dessus) : la liste et la mini-carte suffisent pour choisir un pays. Si vous tenez au résumé de chaque pays sur cette page, les cartes peuvent revenir (`SHOW_COUNTRY_CARDS`), ou les résumés passer en simple liste de textes.
- Fin de la page Accompagnement : « Être accompagné » (« Un seul formulaire pour l'orientation vers l'Europe et les cours d'allemand. Aucun document d'identité ni paiement ne vous est demandé. », bouton « Demander un accompagnement ») et « Signaler une arnaque » (« Une personne vous demande de l'argent au nom de WAHHF Foundation ? Interrompez tout échange et prévenez-nous. »).
- Page Arnaques : « Tout autre numéro ou adresse qui se présente comme WAHHF Foundation n'est pas le nôtre. » (question 134) ; « Un don ne donne jamais accès à une place. Les dons financent les actions de la fondation. Faire un don ne réserve ni une place dans nos cours, ni un accompagnement. » ; « … ni de paiement par Mobile Money » ; le faux message inventé : « Bonjour ! Visa garanti à 100 % pour l'Allemagne, sans entretien à l'ambassade. Un contrat de travail vous attend déjà. Pour réserver votre place, envoyez les frais de dossier par transfert mobile à ce numéro. L'équipe WAHHF Foundation ».
- « Rien lié au défilement » (Arnaques) a été compris comme « ni scrub ni épinglage » : la check-list joue une fois quand elle entre à l'écran. Autre lecture possible : seulement à l'arrivée de la page, ce qui la ferait jouer hors de l'écran sur téléphone.
- L'avertissement commun aux pages Mobilité (texte validé) ne change pas ; l'audit (ARN-02) propose d'y ajouter « Un don ne donne jamais accès à une place. ».
- Hors brief, gabarit partagé avec la page Arnaques : les quatre autres guides ont l'en-tête révélé avec « Étape N sur 5 », et finissent sur les 5 étapes et « Être accompagné », sur sauge, au lieu de la carte nuit.

 Aujourd'hui les formulaires préparent un message et n'envoient rien, d'où l'absence de couleur de succès (§3.2). Quand ils enverront vraiment (API Symfony), il faudra un état de succès (« Candidature envoyée », « Message envoyé ») et donc une couleur de succès, avec son tableau de contrastes. À traiter à ce moment-là.

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

## 15. Pages Événements (lot 7.9)

*Votre brief du 20 novembre 2026 : « reproduction du design de roadtogermany.org/fr aux couleurs WAHHF ». Référence : `docs/references/evenement/` (analyse et captures rtg-01 à rtg-11). Code : `src/pages/events/`, `src/styles/events.css`, données `src/data/events.ts`.*

**Correspondance des couleurs** (tokens de la page, `.ev` dans `events.css`, rebranchés en sombre sous `.dark .ev`) :

| Référence | Clair | Sombre |
|---|---|---|
| jaune (boutons, bandeau, panneau lieu, cercles, bloc final) | soleil, texte encre | soleil, texte encre |
| rouge (surtitres, mot accent, liens, icônes) | forêt | soleil |
| rouge des places restantes | miel | soleil |
| noir (cartes, section programme, boutons pleins) | nuit, texte brume | nuit, texte brume (cerclé de filet-nuit) |
| texte | encre, encre douce | brume voilée, lichen |
| fond crème, sections alternées | brume, sauge | humus, sous-bois |
| cartes blanches | papier | canopée |
| taches floues jaune / rouge / pêche | soleil / forêt / sauge, opacité basse | mêmes, plus basses |
| dégradé de la frise | aplat forêt (le contrat interdit les dégradés) | aplat feuille |

**Écarts au contrat voulus par le brief, réservés à ces deux pages** :
- soleil sur fond clair (boutons, bandeau, panneau lieu, cercles, bloc final) : son texte est toujours l'encre (7,8:1) ;
- surtitres et libellés en capitales 600 espacées (0,16 à 0,22 em), au lieu de la casse de phrase (§4.3) ;
- titres de 72 px (h1) et 48 px (h2), au-dessus de l'échelle nommée (§4.3) ;
- ~~conteneur de 1 232 px (77 rem)~~ : retiré le 20 novembre 2026, les pages Événements utilisent le conteneur du site (72 rem, §5), aligné sur l'en-tête ;
- taches, grille masquée et halos en dégradés radiaux (§3.5 : pas de dégradé) ; la frise, elle, reste en aplat ;
- grands rayons (40, 32, 28 et 24 px) et ombres portées de la référence (§9).
- italique 600 (§4.1 : seulement 400 et 600 droits) pour un mot sur deux du bandeau : le vrai italique du paquet @fontsource 5.3.0 (latin, 14 Ko), déclaré dans le CSS des pages Événements seulement, sans préchargement ; aucun faux italique (`font-synthesis: none`) : avant son chargement, le mot reste droit.

**Activités** (retours du 20 novembre 2026) : 4 cartes (une ligne de 4) ou 6 (deux lignes de 3 à partir de 1 024 px) ; une carte sans photo montre une grande icône sur aplat ; une carte sans texte n’a pas de paragraphe ; l’étiquette peut être le nom d’un domaine, la carte mène alors à sa page. Pastille du hero : texte propre à l’événement possible, avec sa langue (`lang`).

**Menu** (retours du 20 novembre 2026) : « Événements » est directement dans l'en-tête, entre Actualités et Agir ; « Actualités » est de nouveau un lien direct ; dans le menu mobile, Événements est une entrée normale. Pour la place (le conteneur fait 1 152 px de 1 248 px à 1 440 px et au-delà), dans l'ordre : a. 1,25 rem entre deux entrées (au lieu de 1,5) ; b. la pilule FR | EN devient un bouton compact qui affiche la langue en cours et ouvre le choix (nom accessible « Changer de langue (FR) », options « Français » et « English » avec leur `lang`, Échap et clic extérieur) ; c. groupe recherche / thème / don resserré (cibles de 44 × 44 px gardées) ; d. en français, logo seul dès 1 280 px (le nom ne tient à aucune largeur), le lien gardant le nom « WAHHF Foundation, accueil » ; en anglais, le nom reste affiché. Texte du menu inchangé (15 px). Marges mesurées : français 90 px de chaque côté, anglais 60 px, à 1 280, 1 366 et 1 440 px.

**Mouvement** (étape 3 ; écart voulu par le brief au « un effet fort par section » du §10, réservé à ces pages) : keyframes CSS de la référence, mêmes noms, durées et courbes (`src/styles/events-motion.css`) : entrée du hero bloc par bloc, trait soleil sous le mot accent (0,7 s de délai), panneau lieu, pastille logo qui flotte, étincelle, reflet du bouton principal, taches qui dérivent, confettis (14 sur ordinateur, 6 sur téléphone), point qui pulse, chiffres qui tombent, bandeau qui défile (45 s), survols (montée, flèche qui glisse, fond qui se remplit, cartes qui se soulèvent ou penchent), entrée du sous-menu Actualités. Apparitions par le RevealBatch du site (`data-reveal="ev"` : 92 % de l'écran, 28 px, 0,8 s, cubic-bezier(.2,.7,.2,1), 80 ms entre deux cartes). Frise du déroulé remplie au défilement (ScrollTrigger, scaleY). Mieux que la référence : chaque boucle s'arrête hors de l'écran, onglet caché et par le bouton « Mettre les animations en pause » du hero (retenu pour la visite) ; le bandeau a son propre bouton (aria-pressed) et s'arrête au survol et au focus (WCAG 2.2.2) ; compte à rebours calculé au premier rendu, un seul intervalle arrêté hors de l'écran, chiffres masqués aux lecteurs d'écran et date écrite à côté. Mouvement réduit : tout visible et fixe, bandeau arrêté, frise pleine, chiffres sans chute, boutons pause masqués.

**Contrastes mesurés** (48 paires, clair et sombre ; fonds translucides composés sur leur fond réel ; aucun échec) :

| Thème | Usage | Texte | Fond | Ratio | Seuil |
|---|---|---|---|---|---|
| clair | Texte courant, titres (h1, h2, h3) | encre | brume | 13,47:1 | 4,5:1 |
| clair | Texte secondaire, accroche | encre-douce | brume | 6,84:1 | 4,5:1 |
| clair | Texte secondaire sur section sauge (déroulé, FAQ) | encre-douce | sauge | 6,05:1 | 4,5:1 |
| clair | Texte des cartes papier | encre-douce | papier | 7,3:1 | 4,5:1 |
| clair | Surtitres, mot accent, liens, icônes (forêt) | foret | brume | 8,59:1 | 4,5:1 |
| clair | Surtitres et liens sur sauge | foret | sauge | 7,59:1 | 4,5:1 |
| clair | Icône forêt dans son carré sauge | foret | sauge | 7,59:1 | 3,0:1 |
| clair | Places restantes (miel) | miel | brume | 5,56:1 | 4,5:1 |
| clair | Pastille du hero (texte sur voile) | encre | #FDFDFC (composé) | 14,1:1 | 4,5:1 |
| clair | Compte à rebours : titre et date (voile) | encre-douce | #FDFDFC (composé) | 7,17:1 | 4,5:1 |
| clair | Chiffres et libellés des cases (papier) | encre-douce | papier | 7,3:1 | 4,5:1 |
| clair | Anneau de focus (forêt) sur brume | foret | brume | 8,59:1 | 3,0:1 |
| clair | Contour des boutons (encre) sur brume | encre | brume | 13,47:1 | 3,0:1 |
| les deux | Boutons soleil, bandeau, panneau, cercles, bloc final, carte soleil | encre | soleil | 7,84:1 | 4,5:1 |
| les deux | Bouton soleil au survol (soleil pâle) | encre | soleil-pale | 9,09:1 | 4,5:1 |
| les deux | Cartes nuit, section programme, bouton nuit | brume | nuit | 11,41:1 | 4,5:1 |
| les deux | Texte secondaire sur nuit | brume-douce | nuit | 7,85:1 | 4,5:1 |
| les deux | Surtitre et libellés soleil sur nuit | soleil | nuit | 6,64:1 | 4,5:1 |
| les deux | Cartes du programme (brume à 5 % sur nuit) : titre | brume | #1B4638 (composé) | 9,95:1 | 4,5:1 |
| les deux | Cartes du programme : texte | brume-douce | #1B4638 (composé) | 6,85:1 | 4,5:1 |
| les deux | Carte activité forêt : texte | brume | foret | 8,59:1 | 4,5:1 |
| clair | Carte activité papier : texte | encre | papier | 14,35:1 | 4,5:1 |
| clair | Carte activité papier : icône brume sur carré forêt | brume | foret | 8,59:1 | 3,0:1 |
| les deux | Carte activité forêt : icône forêt sur carré papier | foret | papier | 9,15:1 | 3,0:1 |
| les deux | Carte activité nuit : icône encre sur carré soleil | encre | soleil | 7,84:1 | 3,0:1 |
| les deux | Carte activité soleil : icône soleil sur carré nuit | soleil | nuit | 6,64:1 | 3,0:1 |
| clair | Croix brume sur rond forêt (« jamais ») | brume | foret | 8,59:1 | 3,0:1 |
| les deux | Coche encre sur rond soleil | encre | soleil | 7,84:1 | 3,0:1 |
| les deux | Épingle brume sur rond forêt (panneau) | brume | foret | 8,59:1 | 3,0:1 |
| les deux | Panneau lieu : bordure encre sur soleil | encre | soleil | 7,84:1 | 3,0:1 |
| sombre | Texte courant, titres | brume-voilee | humus | 15,04:1 | 4,5:1 |
| sombre | Texte secondaire | lichen | humus | 8,72:1 | 4,5:1 |
| sombre | Texte sur sections sous-bois | brume-voilee | sous-bois | 13,45:1 | 4,5:1 |
| sombre | Texte secondaire sur sous-bois | lichen | sous-bois | 7,8:1 | 4,5:1 |
| sombre | Cartes canopée : titre | brume-voilee | canopee | 11,76:1 | 4,5:1 |
| sombre | Cartes canopée : texte | lichen | canopee | 6,82:1 | 4,5:1 |
| sombre | Surtitres, mot accent, liens, icônes (soleil) sur humus | soleil | humus | 9,66:1 | 4,5:1 |
| sombre | Surtitres et liens soleil sur sous-bois | soleil | sous-bois | 8,64:1 | 4,5:1 |
| sombre | Icône soleil dans son carré sous-bois | soleil | sous-bois | 8,64:1 | 3,0:1 |
| sombre | Places restantes (soleil) | soleil | humus | 9,66:1 | 4,5:1 |
| sombre | Pastille et compte à rebours (voile canopée) | brume-voilee | #182C25 (composé) | 12,52:1 | 4,5:1 |
| sombre | Date du compte à rebours (lichen sur voile) | lichen | #182C25 (composé) | 7,26:1 | 4,5:1 |
| sombre | Anneau de focus (soleil) sur humus | soleil | humus | 9,66:1 | 3,0:1 |
| sombre | Contour des boutons (brume voilée) sur humus | brume-voilee | humus | 15,04:1 | 3,0:1 |
| sombre | Carte activité papier devenue canopée : texte | brume-voilee | canopee | 11,76:1 | 4,5:1 |
| sombre | Croix encre sur rond feuille | encre | feuille | 6,39:1 | 3,0:1 |
| sombre | Remplissage de la frise (feuille) sur sa piste | feuille | filet-nuit | 4,75:1 | 3,0:1 |
| clair | Remplissage de la frise (forêt) sur sa piste (filet) | foret | filet | 6,24:1 | 3,0:1 |

**Vérifié le 20 novembre 2026** (build de production et aperçu) : JS initial 167,9 Ko (pages chargées à la demande : 4,2 + 1,6 Ko pour les deux pages, 9,7 Ko de code commun, 6,0 Ko de CSS) ; défilement sans tâche longue (processeur ralenti × 4) ; interaction la plus lente 160 ms (× 4) ; Lighthouse mobile : CLS 0, accessibilité 100, LCP 4,3 s (le titre h1 sur téléphone ; 4,1 s pour Actualités et 3,8 s pour Qui sommes-nous dans les mêmes conditions) ; clavier complet, anneau de focus partout, un seul h1, aucun niveau sauté ; aucun texte provisoire en ligne ; aucun défilement horizontal de 320 à 1 440 px.

**Lot 7.9 bis, Road to Europe (brief du 21 novembre 2026)** : la fiche doit ressembler exactement à la référence ; les 13 sections sont visibles en ligne, avec les textes de la fondation.
- *Typographie, écart voulu au §4.1, réservé aux pages Événements* : titres (h1, h2, h3), mots du bandeau, titre du compte à rebours, ville du panneau et questions de la FAQ en **Jost 700** (vrai italique pour un mot sur deux du bandeau) ; surtitres, étiquettes, libellés et chiffres en **Barlow 600** ; texte courant dans la police du site. WOFF2 auto-hébergés (latin, 45 Ko pour les trois fichiers), déclarés dans le CSS des pages Événements, `font-display: swap`, polices de secours Arial Bold calées dans Chrome (Jost : 98,14 %, Barlow : 87,36 %). L'italique d'Atkinson du lot précédent est retiré. Jost n'a pas de grec : « Ελλάδα » s'écrit dans la police de secours du système.
- *Faits inconnus* : « annoncé(e) très bientôt » à leur place (date, ville, prix, inscription) ; compte à rebours à cases « – » ; bouton d'inscription remplacé par une pastille sans lien.
- *Hero* : l'en-tête étant fixe, le hero réserve sa hauteur (`--header-height`) ; correctif d'un défaut du lot 7.9, où la pastille passait sous l'en-tête.
- *Couleurs* : celles du tableau ci-dessus ; le rouge de la référence n'est pas utilisé (le rond du mégaphone est soleil, comme les carrés d'icône de la section nuit).

**Contenu** : une section ne s'affiche que si ses données existent ; un texte « TODO » s'affiche en développement et dans l'aperçu `VITE_APERCU_EVENEMENTS=1`, jamais en ligne. Questions 156 et suivantes de `docs/contenus-a-fournir.md`.

## 16. Page Accueil, /accueil (lot 11.1)

*Votre brief du 25 novembre 2026. Référence : `docs/references/accueil/hero-apercu.jpg` et `inspirations/`. Code : `src/pages/accueil/`, `src/styles/accueil.css`, textes `src/locales/accueil/`. L'accueil actuel (/) et ses composants ne changent pas ; le logo y mène toujours.*

**Écarts au contrat voulus par le brief, réservés à cette page** :
- Jost 700 (celle des pages Événements, même fichier, même police de secours) pour le titre et les chiffres ; titre de 72 px sur ordinateur, interligne 1,05 ;
- soleil sur fond clair : badge (texte encre), contour de l'arche, trait sous « la jeunesse », étoile de la pastille ;
- un mot du titre en forêt (soleil en sombre), au lieu d'une seule couleur (§12) ;
- deux taches en dégradé radial (sauge, et soleil à 25 %) ;
- flèche sur le bouton plein et la carte de l'événement (T-20) ; nom de l'événement en petites capitales espacées ;
- plusieurs boucles lentes au lieu d'un seul effet (§10) : cartes qui flottent (±8 px, 6 à 8 s), badge (24 s), étoile, point. Elles s'arrêtent hors de l'écran, onglet caché et au bouton pause des pages Événements ; en mouvement réduit, rien ne bouge.

**Inchangé** : conteneur de 72 rem (même bord gauche que l'en-tête ; l'aperçu en montre 80), palette, une seule ombre (`--ombre-flottante`, remplacée par un filet en sombre), rayon de 20 px, texte courant en Atkinson.

**En-tête** : 8 entrées (« Accueil » en premier), texte à 16 px ; logo seul dès 1 280 px dans les trois langues (étape d) ; langue et don resserrés (étape c). Marges mesurées autour du menu : 41 px en français, 105 px en anglais, 24 px en allemand.

**LCP** : la photo sur ordinateur, l'intro sur téléphone. L'intro monte donc sans fondu : partie en opacité 0, elle retardait le LCP réel de 1,4 s.

**Contrastes** (23 paires ; seuil 4,5:1 pour le texte, 3:1 pour les contours ; aucun échec) :

| Thème | Usage | Ratio |
|---|---|---|
| clair | Titre sur brume | 13,47:1 |
| clair | Titre, pire cas sur la tache soleil | 11,75:1 |
| clair | « la jeunesse » (forêt) sur brume | 8,59:1 |
| clair | Intro, seconde ligne, bouton pause sur brume | 6,84:1 |
| clair | Intro, pire cas sur sauge | 6,05:1 |
| clair | Bouton pause, pire cas sur la tache soleil | 5,97:1 |
| clair | Pastille (forêt sur papier) | 9,15:1 |
| clair | Carte papier : chiffre, nom de l'événement | 9,15:1 |
| clair | Carte papier : texte | 7,30:1 |
| les deux | Bouton et carte nuit : texte (brume) | 11,41:1 |
| les deux | Carte nuit : chiffre (soleil) | 6,64:1 |
| les deux | Badge : encre sur soleil | 7,84:1 |
| clair | Contour du bouton | 13,47:1 |
| clair | Anneau de focus, pire cas sur la tache soleil | 7,49:1 |
| sombre | Titre | 15,04:1 |
| sombre | « la jeunesse » (soleil) | 9,66:1 |
| sombre | Intro | 8,72:1 |
| sombre | Intro, pire cas sur sous-bois | 7,80:1 |
| sombre | Bouton pause, pire cas sur la tache soleil | 7,26:1 |
| sombre | Pastille et chiffre (soleil sur canopée) | 7,56:1 |
| sombre | Carte canopée : texte | 6,82:1 |
| sombre | Carte et bouton nuit : texte | 10,33:1 |
| sombre | Contour du bouton | 15,04:1 |

### 16.2 Sections « Qui sommes-nous en bref » et « Les chiffres » (lot 11.2)

*Votre brief du 25 novembre 2026. Contenu : `docs/references/accueil/sections/` (2 et 3), limité à ce que le site dit déjà.*

**Écarts voulus par le brief** :
- surtitres et libellés en capitales Barlow 600 espacées de 0,16 em (comme les pages Événements) ;
- soleil sur fond clair : l'étiquette de la citation (texte encre) ;
- rayons hors système pour la photo « feuille » : 8 rem en haut à gauche et en bas à droite, 1 rem aux deux autres coins ;
- « Gratuité » en intertitre d'un point, et « groupe IROKO » dans le texte de présentation.

**Choix** :
- étiquette en Jost 700 : la graisse 600 n'est pas hébergée, et un fichier de plus ne se justifiait pas pour une phrase ;
- le fil en pointillés et les parallaxes n'existent que sur ordinateur (souris, 1 024 px au moins, mouvement autorisé) ; parallaxe : 40 px de course au plus dans la section 2, 30 px pour le motif de la section 3 ; le bouton pause les fige ;
- entrées en CSS, une seule fois, quand le bloc arrive à l'écran (`Entree.tsx`) ; un bloc déjà visible à l'arrivée ne s'anime pas ;
- chiffres en liste alignée à gauche, comme le reste du site ; une flèche reste visible au repos, car rien ne signale le lien sur un écran tactile ;
- contours d'Europe et du Cameroun réels (Natural Earth 1:110 m, domaine public).

**Chiffres** : `src/data/accueil-chiffres.ts`. Un chiffre d'impact s'affiche seulement avec sa date et sa source, en petit dessous. Pays, domaines et niveaux se comptent sur les données du site.

**Contrastes** (seuil 4,5:1 ; aucun échec ; « motif » : pire cas, texte sur un trait du fond) :

| Usage | Ratio |
|---|---|
| Citation : encre sur soleil | 7,83:1 |
| Surtitre, lien, icône (clair) : forêt sur brume, sur sauge | 8,58:1, 7,58:1 |
| Texte des points (clair) : encre douce sur brume, sur la tache sauge | 6,84:1, 6,04:1 |
| Bandeau nuit : titre et libellés (brume), sur motif | 11,40:1, 9,80:1 |
| Bandeau nuit : sous-textes, note, source (brume douce), sur motif | 7,85:1, 6,75:1 |
| Bandeau nuit : chiffres, surtitre, flèches (soleil), sur motif | 6,63:1, 5,70:1 |

### 16.3 Section « Les 6 domaines » (lot 11.3)

*Votre brief du 25 novembre 2026. Modèle : les « Cinq principes » (lot 7.8), dont le composant, les styles et la page ne changent pas. Code : `DomainesParcours.tsx`, `DomainesMotion.tsx`, `.ac-domaines` dans `src/styles/accueil.css`.*

**Repris tel quel** : classes `.principles*` et `.principle-*`, tracé du fil (`principlesFil.ts`), plugins GSAP (même fichier que Qui sommes-nous). **Recopié** : la mise en scène, pour 6 cartes, 4 hauteurs d'écran et les photos.

**Écarts aux Cinq principes** :
- titre en Jost 700 avec surtitre, comme les autres sections de /accueil ;
- photo en haut de carte (11 rem, cadrage propre à chaque photo), ligne d'accent de 3 px, lien à la place de l'étiquette ; Santé : icône au trait, aucune photo publiable (question 197) ;
- carte de 36 rem au plus ; sur un écran bas, les marges et le numéro se resserrent, puis la photo rétrécit, et la piste n'est réduite qu'en dernier ; le texte n'est jamais coupé ;
- épinglage en `position: sticky` au lieu du « pin » de ScrollTrigger : Chrome compte un décalage de mise en page de 0,92 à l'entrée et à la sortie d'un « pin » (c'était le cas sur Qui sommes-nous, corrigé de la même façon au lot 11.4, animation inchangée) ; avec sticky, CLS 0 ;
- dévoilement de la photo en 0,6 s au passage du repère (il se referme en remontant) ; au bouton pause, la photo est là d'emblée ;
- clavier : le focus d'un lien amène sa carte à l'écran ; à la souris, la page ne bouge pas ;
- le parcours horizontal est la mise en page de départ sur ordinateur (correctif du 25 novembre 2026), sans attendre GSAP : défilement rapide, rechargement au milieu de la page, adresse en #domaines, il est toujours là ; si le fichier du mouvement ne se charge pas, la section passe en colonne, tout visible ;
- dès 600 px de haut (700 pour les Cinq principes) : une fenêtre d'ordinateur portable fait souvent 600 à 700 px une fois les barres retirées.

**Contrastes** (texte, puis accent : numéro, rubrique, lien ; seuil 4,5:1 ; aucun échec ; mêmes couleurs en clair et en sombre) :

| Carte | Fond | Texte | Accent |
|---|---|---|---|
| 01 Éducation | forêt | 9,15:1 | 4,99:1 (soleil) |
| 02 Santé | sauge | 11,89:1 | 7,58:1 (forêt) |
| 03 Entrepreneuriat des jeunes | soleil | 7,83:1 | 7,83:1 (encre) |
| 04 Environnement | nuit | 12,15:1 | 6,63:1 (soleil) |
| 05 Droits et inclusion | miel | 5,92:1 | 4,77:1 (blanc 85 %) |
| 06 Mobilité & Langues | encre | 14,35:1 | 7,83:1 (soleil) |
| Carte de fin | blanc | 14,35:1 | 9,15:1 (forêt) ; bouton 9,15:1 |
| Compteur, consigne (clair ; sombre) | fond de page | 13,46:1, 6,84:1 ; 15,03:1, 8,72:1 | — |

### 16.4 Temps de blocage au chargement (lot 11.3)

Cause (profil Performance, mobile, CPU ×4) : chaque bloc animé mesurait sa position pendant le rendu, ce qui forçait la mise en page de toute la page dans la même tâche que React (256 ms) ; GSAP se chargeait sur téléphone pour des parallaxes qui n'y existent pas (50 ms) ; les sections sous l'écran étaient mises en page au chargement. Le compteur et le motif n'y étaient pour rien.
Corrections : un seul IntersectionObserver, sans mesure ; `AccueilMotion` chargé seulement sur ordinateur à la souris ; une timeline de parallaxe par section ; souris suivie par l'Observer de ScrollTrigger (plus d'écouteur brut) ; `content-visibility: auto` sous 1 024 px. Mesures finales (Lighthouse mobile, 3 passages) : TBT 120, 150 et 100 ms, CLS 0.
Lot 11.5 : `content-visibility: auto` retiré, téléphone compris (voir §16.6, « Rendu différé »).

### 16.5 Sections « Projet phare » et « Des parcours qui inspirent » (lot 11.4)

*Votre brief du 25 novembre 2026. Contenu : `docs/references/accueil/sections/` (5 et 6). Code : `ProjetPhare.tsx`, `route.ts`, `ProjetMotion.tsx`, `Parcours.tsx`, `Paquet.tsx`, `CarteTemoignage.tsx`, `CitationMotion.tsx`.*

**Faits** : `src/data/accueil-projets.ts` et `src/data/accueil-temoignages.ts`. En ligne, seul ce qui porte `confirme: true` s'affiche ; sans témoignage confirmé, la section invite à raconter son parcours (trois cartes vierges, aucun nom).

**Projet phare** : fond sauge, trois plans de collines (`--colline-1` à `-3`), ticket penché de 2° (perforation, deux encoches, la légende sur la souche), tampon soleil. La route est tracée d'après la taille de la scène (horizontale dès 1 024 px, verticale en dessous) ; les panneaux gardent leurs couleurs dans les deux thèmes. Le véhicule suit la route (MotionPath, scrub 0,8) ; roues et ailes tournent ou battent selon la distance, sans boucle. Mouvement réduit ou fichier absent : véhicule au bout, panneaux levés.

**Parcours** : paquet de cartes en CSS (coin feuille, −4° et +5° derrière), glisser à partir de 80 px, flèches, clavier ; région « carrousel », seule la carte du dessus est lisible. Moins de trois témoignages : le paquet se complète de cartes qui invitent à raconter le sien. La citation se révèle ligne par ligne (SplitText), le reste est en CSS.

**Recalculs** : pendant un `ScrollTrigger.refresh`, les timelines repassent par zéro ; `recalcul.ts` évite que les panneaux et les photos des domaines se rejouent.

**Contrastes** (seuil 4,5:1 ; aucun échec) :

| Usage | Ratio |
|---|---|
| Projet, clair : titre (encre), suite du titre et lien (forêt) sur sauge | 11,89:1, 7,58:1 |
| Projet, clair : texte (encre douce) sur sauge | 6,04:1 |
| Projet, sombre : titre, suite et lien (soleil), texte sur sous-bois | 13,45:1, 8,64:1, 7,80:1 |
| Souche du ticket : clair (encre douce sur blanc), sombre (lichen sur canopée) | 7,29:1, 6,82:1 |
| Tampon : encre sur soleil | 7,83:1 |
| Panneaux, les deux thèmes : valeur (forêt) et libellé (encre douce) sur blanc | 9,15:1, 7,29:1 |
| Parcours, clair : citation et nom (encre), résumé (encre douce), domaine (forêt) sur blanc | 14,35:1, 7,29:1, 9,15:1 |
| Parcours, sombre : citation et nom, résumé, domaine (soleil) sur canopée | 11,75:1, 6,82:1, 7,55:1 |
| Flèches et indicateur : clair sur brume, sombre sur humus | 13,46:1, 15,03:1 |

### 16.6 Sections « Les 10 régions » et « Apprendre, cultiver, grandir » (lot 11.5)

*Votre brief du 26 novembre 2026. Code : `Regions.tsx`, `CarteRegions.tsx` ; l'accordéon est `src/pages/home/JourneySection.tsx`, importé tel quel.*

**Les 10 régions** : fond sauge (sous-bois en sombre), le fond de la carte d'origine. À gauche, l'en-tête propre à l'accueil (surtitre, titre révélé ligne par ligne, la première phrase du sous-titre de Notre impact dans chaque langue, lien vers /notre-impact) ; à droite, la carte « Présence terrain au Cameroun » de Notre impact, en variante (`CarteRegions.tsx`) : mêmes éléments, mêmes textes, lignes provisoires masquées, sans la carte de l'Europe ni la liste des pays. `PresenceSection.tsx` ne change pas. La cascade des régions reste celle de `MapMotion` ; un repère caché tient la place de la mini-carte d'Europe qu'il attend. Contrastes : les mêmes paires que le Projet phare (§16.5).

**Apprendre, cultiver, grandir** : la section de `/`, inchangée (bande nuit, accordéon de 5 photos, mêmes données), dans une enveloppe `.ac-accordeon`. Tant qu'elle est la dernière de la page, le fond de la page la sépare du pied de page, nuit lui aussi. Styles calculés identiques sur `/` et `/accueil`.

**Fonds, dans l'ordre** : hero et « Qui sommes-nous » brume (déjà ainsi), chiffres nuit, domaines brume, projet sauge, parcours brume, régions sauge, accordéon nuit, puis le pied de page.

**Rendu différé (essayé, puis retiré)** : `content-visibility: auto` sur chaque section sous le premier écran, avec une hauteur d'attente mesurée pour chacune. Gain réel sur téléphone : Lighthouse avec un vrai ralentissement (`--throttling-method=devtools`, 3 passages) donne un TBT médian de 930 ms sans, 510 ms avec (performance 51 → 61) ; la simulation par défaut de Lighthouse ne voit aucune différence (340 et 330 ms). Mais Chrome retire de l'arbre d'accessibilité ce qu'il n'a pas encore dessiné : sans défilement, seuls le h1 et les deux premiers h2 y restaient (les autres « ignorés : notRendered », 457 nœuds au lieu de 890). Un lecteur d'écran ne pouvait ni lire les sections plus bas ni y aller par les titres. Le plancher d'accessibilité passe avant : rendu différé retiré partout sur l'accueil (il était déjà, depuis le lot 11.3, sur téléphone, avec le même défaut). À ne pas remettre sans vérifier l'arbre d'accessibilité.

**Photos** : l'accordéon garde les siennes ; ce sont celles de l'accueil qui changent quand elles se répètent. En ligne, l'arche du hero passe de A30 (« Apprendre » dans l'accordéon) à A12, et la carte Entrepreneuriat de B06 (« Cultiver ») à B24. A12 et B24 : trois affichages chacune sur le site.

### 16.7 Retouches du lot 11.5 et section « Événements » (lot 11.6)

*Votre brief du 26 novembre 2026.*

**Photos du haut de page** (en ligne) : l'arche du hero prend A07 (les participants devant l'Albatros Hotel, recadrée sur l'enseigne et le groupe de gauche) ; A12, en portrait, passe dans la feuille de « Qui sommes-nous en bref ». Comparées côte à côte à 1 440 et 390 px avec l'inverse (A12 dans l'arche, A07 dans la feuille) : A07 donne au hero le lieu et la foule de la journée, A12 remplit la feuille sans perte. La taille d'image demandée suit l'orientation de la photo (arche et feuille).

**Fond de « Qui sommes-nous en bref »** : la surface claire du thème (`--surface-raised` : papier en clair, canopée en sombre) ; le hero reste brume (humus en sombre). En sombre, les pastilles des icônes et la tache passent sur filet-nuit, un cran plus clair que la section.

| Usage | Ratio |
|---|---|
| Clair : titre et noms des points (encre), texte (encre douce), surtitre et lien (forêt) sur papier | 14,35:1, 7,30:1, 9,15:1 |
| Clair : icône (forêt) sur pastille sauge | 7,59:1 |
| Sombre : titre (brume voilée), texte (lichen), surtitre et lien (soleil) sur canopée | 11,76:1, 6,82:1, 7,56:1 |
| Sombre : icône (soleil) sur pastille filet-nuit | 5,82:1 |

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

**Cartes des cinq principes (lot 7.8, Qui sommes-nous ; identiques en clair et en sombre)**

| Devant | Fond | Ratio | Seuil | Résultat | Usage |
|---|---|---|---|---|---|
| blanc #FFFFFF | forêt #24503F | 9,15:1 | 4,5:1 | passe | carte 01 (Écoute) : titre, description |
| soleil #F2B544 | forêt #24503F | 5,00:1 | 4,5:1 | passe | carte 01 : numéro, rubrique, étiquette |
| encre #1F2D27 | sauge #E3ECE6 | 11,90:1 | 4,5:1 | passe | carte 02 (Co-construction) : titre, description |
| forêt #24503F | sauge #E3ECE6 | 7,59:1 | 4,5:1 | passe | carte 02 : numéro, rubrique, étiquette |
| encre #1F2D27 | soleil #F2B544 | 7,84:1 | 4,5:1 | passe | carte 03 (Durabilité) : tout le texte (l'accent est l'encre) |
| blanc #FFFFFF | nuit #0F3D2E | 12,16:1 | 4,5:1 | passe | carte 04 (Transparence) : titre, description |
| soleil #F2B544 | nuit #0F3D2E | 6,64:1 | 4,5:1 | passe | carte 04 : numéro, rubrique, étiquette |
| blanc #FFFFFF | miel #8A5A00 | 5,93:1 | 4,5:1 | passe | carte 05 (Partenariats) : titre, description |
| blanc à 85 % (#EDE6D9) | miel #8A5A00 | 4,78:1 | 4,5:1 | passe | carte 05 : numéro, rubrique, étiquette |
| encre #1F2D27 | papier #FFFFFF | 14,35:1 | 4,5:1 | passe | carte finale : titre |
| forêt #24503F | papier #FFFFFF | 9,15:1 | 4,5:1 | passe | carte finale : rubrique ; anneau de focus du bouton |
| blanc #FFFFFF | forêt #24503F | 9,15:1 | 4,5:1 | passe | bouton « Voir nos actions » |

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

> **Lot 7 (décision du 16 novembre 2026 sur le mouvement, §10).** Certains effets reviennent, sous une forme nouvelle décrite au §10 :
> - 1 : Lenis, sur ordinateur à souris seulement ;
> - 3 : fondu d'entrée de 0,3 s, sans sortie ;
> - 19 : parallaxe de 8 % au plus, sur ordinateur, avec le voile qui s'assombrit ;
> - 20 et 21 : arrivée du hero (titre masqué ligne par ligne, puis phrase et boutons en fondu), en CSS ;
> - 25 : « Sur le terrain » s'ouvre en plein écran (nouvelle forme ; Mobilité & Langues ne s'agrandit plus) ;
> - 29 : apparitions groupées des listes, photos et actualités ;
> - 30 : frise A1 → C1 (Académie, accueil), pas la frise historique ;
> - 33 : cascade des régions ;
> - 36 : arc tracé une fois, à l'entrée de la carte.
>
> Restent retirés : boutons magnétiques (15), SplitText (22), compteurs (23), galerie épinglée (24), vignette qui grandit (27), apparition des titres hors sections 2 et 3 de l'accueil (9), zoom au survol (12). *Exception du lot 7.8 (votre brief du 19 novembre 2026) : SplitText, le compteur mécanique et le défilement horizontal épinglé reviennent dans la seule section « Cinq principes » de Qui sommes-nous (§10).*

Inventaire relevé dans le code le 16 novembre 2026 : 39 effets. Les numéros de ligne renvoient au code au moment du relevé (copie de travail, tokens compris). « Sort » applique le §10 ; les lignes marquées **(ajout)** ne figuraient pas au §10 avant ce relevé ; elles ont été acceptées à la validation.

**Toutes les pages**

| # | Effet actuel | Fichiers | Outil | Sort |
|---|---|---|---|---|
| 1 | Défilement fluide (molette, ancres, « Retour en haut ») | `lib/lenis.ts:13-68`, `lib/scroll.ts:32-60`, `Layout.tsx:23` | Lenis | **retiré** : défilement natif |
| 2 | Barre de progression de lecture (filet or de 3 px) | `effects/ReadingProgress.tsx:8-16` | Motion | ~~retirée~~ **gardée sur les articles seulement** (`/actualites/:slug`), en forêt (feuille en sombre), plus en or : décision du 16/11, après le lot 5 |
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
| 17 | Vidéo YouTube en fond du hero (ordinateur, après 3 s) | `wahhf/HeroVideoBackground.tsx`, `config/heroVideo.ts` | iframe + CSS | ~~retirée~~ **gardée** (décision du 16 novembre 2026, §6) : extrait 0 à 64 s, consentement explicite, image fixe sur téléphone et en mouvement réduit ; le film avec le son s'ouvre depuis le hero |
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
