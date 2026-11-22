# Analyse de roadtogermany.org/fr : structure et animations

Analyse faite le 20/11/2026 dans le navigateur (code CSS et JS lu sur la page, mesures à 1440 × 900).
Captures de référence dans ce dossier : `rtg-01-hero.png` à `rtg-11-cta-final.png` (ordre de la page).
But : reproduire la même page dans le site WAHHF (React 19 + Vite + Tailwind 4 + GSAP déjà en place), avec les couleurs WAHHF. On reprend la structure et les mécanismes, jamais les textes, les photos ni le logo de Road to Germany.

## 1. Technique observée

- Next.js + Tailwind. Pas de GSAP ni de Lenis. Presque tout est en **keyframes CSS**.
- Apparitions au défilement : un seul `IntersectionObserver` ajoute `.is-visible` aux éléments `.reveal` (`rootMargin: "0px 0px -8% 0px"`, `threshold: 0.12`, une seule fois). Décalage par variable CSS `--delai` (ex. 80 ms).
  `.reveal { opacity:0; transform:translateY(28px); transition: opacity .8s, transform .8s cubic-bezier(.2,.7,.2,1) var(--delai,0s) }`
- Barre de la frise « 5 étapes » : `scaleY` lié à la progression du défilement de la liste (motion `useScroll`), `transform-origin: top`.
- Mouvement réduit : une règle globale coupe toutes les animations et transitions ; `.reveal` reste visible.
- Polices : Jost 700 (titres), Inter (texte), Barlow 600 (étiquettes, chiffres). Conteneur 1280 px, sections `py-24` (96 px).

## 2. Keyframes (copiés du CSS)

| Nom | Effet | Durée / boucle | Où |
|---|---|---|---|
| entree | opacity 0 → 1, translate 0 24px → 0 | 0,85 s, une fois, décalé par bloc | hero (pastille, texte, boutons, infos, photo) |
| entree-titre | translate 0 18px → 0 | 0,9 s | h1 |
| surligne | background-size 0 → 100 % × 0,16em (trait sous le mot) | 0,9 s cubic-bezier(.6,0,.2,1) délai 0,7 s | mot accent du h1 |
| entree-panneau | opacity 0, translate −24px 40px, scale .92 → normal | 1 s | panneau « La conférence a lieu à » |
| plume | opacity 0, translate(−28px,36px) rotate(−12deg) scale(.9) → normal | 0,95 s, délais 0 / .15 / .4 / .65 s | logo oiseau (3 plumes) |
| flotte | translateY 0 → −12px → 0 | 7 s infini | pastille logo ronde sur la photo |
| etincelle | rotate 0 → 18deg, scale 1 → 1,25 → retour | 2,4 s infini | icône de la pastille du hero |
| reflet | bande de lumière qui traverse le bouton | 4,5 s infini, délai 2 s, coupé au survol | bouton principal du hero |
| derive | taches floues : translate −6rem 4rem, scale 1,15 | 18 / 22 / 26 s alterné | fond du hero (3 taches, blur 70px) |
| confetti | translate 10px −26px, rotate 160deg aller-retour | 6 à 12 s infini, ~20 éléments | hero et bloc final |
| ping / ping-doux | cercle qui grandit et s'efface | 1 s infini | point rouge du compte à rebours |
| tombe | chiffre qui tombe : opacity 0, translateY −60 % → 0 | 0,45 s cubic-bezier(.2,.8,.2,1) à chaque changement | chiffres du compte à rebours (masque 1,1em) |
| defile | translateX 0 → −50 % (liste doublée) | 45 s linéaire infini, pause au survol, au focus et par bouton | bandeau de mots |
| menu-entree / menu-glisse | menu déroulant et menu mobile | — | en-tête |

Survols :
- `.btn:hover` translateY −2px ; `:active` scale .97 ; flèche `.btn-fleche` +5px.
- `.btn-remplit` : fond qui se remplit de gauche à droite (scaleX 0 → 1, 0,4 s).
- `.carte-lift:hover` translateY −4px + ombre `0 24px 50px -28px rgb(0 0 0 / .35)`.
- `.carte-voie:hover` translateY −8px, rotate −1deg, ombre `0 40px 70px -35px rgb(0 0 0 / .55)`, 0,45 s.

## 3. Structure et mesures (1440 px)

1. **Hero** (2 colonnes 642 / 526 px)
   - Fond : grille de 56 px (traits à 7 % de la couleur du texte) masquée par un dégradé radial, 3 taches floues qui dérivent, confettis.
   - Pastille : 14 px 600, padding 8 × 16, bordure fine, fond translucide, icône étincelle.
   - h1 : 72 px (2,6rem mobile, 3,75rem sm), 700, interligne 1,1, lettrage −0,01em, 3 lignes, mot clé en accent avec trait jaune dessous.
   - Intro : 18–20 px, couleur adoucie, max-w-xl.
   - Boutons pilule 48 px de haut, padding 0 × 24, 600 : principal plein jaune avec reflet ; secondaire contour 1,6 px.
   - Ligne d'infos avec icônes : date · lieu · places restantes (en rouge).
   - Photo : 512 × 640, rayon 40 px.
   - Pastille logo ronde : 96 px, haut droit, qui flotte.
   - Panneau lieu : 240 px de large, penché de −2deg, fond jaune, bordure 2,4 px foncée, rayon 15 px, anneau jaune de 5 px + ombre portée, icône épingle dans un rond rouge, drapeau du pays.
   - Sous la photo : un liseré bicolore.
2. **Compte à rebours** : carte pleine largeur (rayon 32 px, padding 24 px, fond translucide) ; à gauche, point rouge qui pulse + « Le compte à rebours a commencé » ; 4 cases de 209 × 110 px, rayon 16 px, chiffres 48 px 600 tabular-nums, libellés 12 px 600 majuscules lettrage 0,16em.
3. **Organisé par** : libellé en majuscules espacées à gauche, logos à droite.
4. **Bandeau** : fond jaune, penché de −1,5deg, scale 1,03, padding 24 px, ombre `0 20px 50px -25px rgb(0 0 0/.5)`, fondu des bords (4rem), mots 48 px 700 en italique alterné, séparateur de 3 points (noir, rouge, rond blanc cerclé), bouton pause rond 44 px à droite (`aria-pressed`).
5. **Pourquoi venir** : surtitre (trait de 32 px + majuscules 14 px 600, lettrage 0,22em, rouge), h2 48 px, intro ; 4 cartes de 289 px (rayon 24 px, padding 28 px, bordure fine) : icône dans un carré 48 px rayon 16, numéro 01–04 en haut à droite, h3 20 px, texte.
6. **Cinq étapes** (section sur fond alterné) : titre centré ; frise verticale centrale (piste 12 px de large, arrondie) dont le remplissage suit le défilement ; cercles numérotés 48 px bordure jaune ; cartes de 448 px alternées gauche/droite (texte aligné à droite côté gauche), rayon 24 px, lien « Lire le guide » avec flèche ; grille `1fr 4rem 1fr`. Mobile : la frise passe à gauche, cartes à droite (`3rem 1fr`).
7. **Quatre voies** : titre centré ; 4 cartes de 289 × 464 px, rayon 28 px, chacune d'une couleur pleine (noir, rouge, jaune, blanc) ; photo en haut ; carré d'icône 64 px qui chevauche la photo ; h3 24 px ; texte ; grande icône en filigrane (176 px) en bas à droite ; pastille étiquette (12 px majuscules, contour) + rond flèche ↗ ; survol : monte et penche.
8. **Programme en un coup d'œil** : section sombre avec halos de couleur (jaune en haut à droite, rouge en bas à gauche) ; surtitre jaune ; 4 cartes sombres (icône sur carré jaune, numéro, titre, texte) ; barre « Intervenants : annoncés très bientôt » avec icône dans un rond rouge et deux boutons.
9. **Sponsors et partenaires** : texte à gauche, 2 cartes de couleur à droite (jaune, noir), surtitre, titre, phrase, flèche ↗.
10. **Pour les parents** : h2 sur 3 lignes, phrase, photo arrondie ; 2 cartes « Ce que nous promettons » (coches jaunes) et « Ce que nous ne promettrons jamais » (croix rouges).
11. **FAQ** : texte à gauche + bouton contour ; à droite, carte (rayon 24 px) de 6 `<details>`, questions 18 px 600, bouton + rond.
12. **Derniers articles** : 3 cartes.
13. **Appel final** : bloc jaune 1280 px, rayon 40 px, padding 96 × 64 ; surtitre date ; h2 ; phrase ; 2 boutons (plein foncé, contour) ; photo 432 × 532 penchée de −2deg avec cadre clair ; confettis.

## 4. À faire mieux dans la version WAHHF

- Les animations en boucle (taches, confettis, étincelle, reflet, flotte, ping) se mettent en pause quand elles sortent de l'écran, quand l'onglet est caché et via un bouton « Mettre les animations en pause » (WCAG 2.2.2).
- Les taches floues ne doivent pas animer de `filter: blur` (coûteux) : utiliser des `radial-gradient` déjà flous et ne déplacer que `transform`.
- Moins de confettis sur mobile.
- La date du compte à rebours est aussi écrite en texte ; les chiffres sont `aria-hidden` et affichés juste au premier rendu (pas de valeur provisoire).
- Les places restantes ne s'affichent que si le chiffre vient d'une vraie source.
- Vraies photos de la fondation uniquement.
- Une seule police (celle du site).
