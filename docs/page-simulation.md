# Page Simulation (/simulation)

Programme de simulation numérique solidaire et gratuit de WAHHF Foundation (lot 13).

## Analyse de la page IROKO Engineer (étape 0, lecture seule)

Code lu, sans rien modifier : `E:\Projet_Entreprise_IROKO\irokoholding\src\components\engineering\` et `src\data\engineering\engineeringContent.ts`.

1. **Repris, l'idée du hero :** un dessin technique animé à la place d'une photo (`TrussSimulation.tsx`). Chez nous, c'est un autre objet, dessiné pour la page : le portique d'un hangar agricole (poteaux et ferme), sous le vent et la charge de toiture.
2. **Écarté, dans ce dessin :** les chiffres inventés (« Fz = 120 kN · σ_max = 210 MPa »), le texte provisoire visible (« Espace réservé futur film IROKO Studio »), le point qui clignote sans fin, le monospace et l'orange IROKO. Notre carte dit « Exemple illustratif, valeurs fictives », et la boucle s'arrête (pause du site, onglet caché, hors écran).
3. **Repris :** la méthode en étapes. Elles deviennent 5 étapes reliées par le fil WAHHF, qui se dessine au défilement, sur fond nuit.
4. **Repris :** les cartes de services numérotées, en 4 cartes coin feuille 01 à 04, sur sauge, sans durée ni volume non confirmés.
5. **Repris :** la FAQ en accordéon sur deux colonnes (`EngFaq.tsx`). Les réponses sont prudentes, et tout délai reste à confirmer.
6. **Repris, en partie :** le formulaire avec pièce jointe et mention de confidentialité (`EngContact.tsx`).
7. **Écarté, dans ce formulaire :** le faux envoi. `EngContact.tsx` attend 850 ms (`setTimeout`), puis affiche une référence tirée au hasard (`IRK-ENG-2026-xxxx`) sans rien envoyer. Chez nous, le succès ne s'affiche qu'après la réponse d'un serveur ; tant qu'il n'y en a pas, l'envoi passe par WhatsApp ou par e-mail.
8. **Écarté, dans le contenu :** le catalogue de logiciels (aucun nom d'éditeur ni de logiciel sur notre page), les superlatifs, les chiffres non prouvés, la section « preuves » vide et les mentions entre crochets (« [on-site arrangements subject to confirmation] »). Chaque fait à valider porte `confirme: false` et reste masqué en ligne.
9. **Notre identité :** palette WAHHF (brume, papier, sauge, nuit, forêt, soleil ; jamais le cœur, réservé au don), Jost pour les titres et Barlow pour les surtitres (les mêmes fichiers que /accueil), cartes coin feuille, le fil, les entrées de /accueil (lignes du titre, cartes en cascade).
10. **Même ordre d'idées qu'IROKO, pas la même page :** IROKO vend un service d'ingénierie ; nous offrons un coup de main gratuit et formons des jeunes. Les besoins plus gros, ou à certifier, sont orientés vers IROKO Engineer.

## Envoi du formulaire (étape 3)

### Constat : le site n'envoie aucun formulaire

Le formulaire de Contact ne transmet rien. `ContactHandoff.tsx` prépare un message, et la personne l'envoie elle-même par WhatsApp ou par e-mail (commentaire du code : « tant que l'API Symfony n'est pas branchée »). Il n'y a ni serveur d'envoi, ni script, ni service tiers dans le dépôt. Un envoi de test n'arrive donc nulle part : seul le message envoyé par la personne arrive, sur le WhatsApp `CONTACT.whatsappNumber` ou à l'adresse `CONTACT.email` (src/config/contact.ts).

### Ce que fait le formulaire en attendant

- Il n'affiche aucun faux succès et aucun faux numéro de demande.
- Il vérifie les champs avant d'ouvrir quoi que ce soit : erreurs reliées par `aria-describedby`, focus sur la première erreur, description d'au moins 50 caractères avec un compteur.
- Il vérifie aussi les fichiers : formats PDF, JPG, PNG, STEP/STP, IGES/IGS, DWG, DXF ou ZIP, et 10 Mo au total.
- « Envoyer ma demande par WhatsApp » ouvre WhatsApp avec la demande déjà écrite.
- « Envoyer par e-mail » ouvre la messagerie, à l'adresse de Contact (adresse de réception à confirmer).
- Les fichiers ne peuvent pas passer par un lien WhatsApp ou `mailto:`. Le message les liste, et la page demande de les joindre.
- Le cadre qui s'affiche dit que la demande est prête dans l'application. Il ne dit pas qu'elle est envoyée : « elle ne nous parvient qu'une fois que vous l'avez envoyée ».
- Un champ piège invisible (`site`) bloque les robots : s'il est rempli, rien ne s'ouvre.

### Proposition : un petit script PHP sur l'hébergement

L'hébergement de production est un Apache (`public/.htaccess`). Un script `public/api/simulation.php` d'environ 150 lignes suffit :

1. **Réception.** Une requête POST `multipart/form-data`, seulement depuis le site (en-tête `Origin` vérifié). `.user.ini` doit autoriser 12 Mo (`upload_max_filesize`, `post_max_size`).
2. **Validation des champs.** Les mêmes règles que la page : champs obligatoires, longueurs maximales, e-mail (`filter_var`), description d'au moins 50 caractères.
3. **Validation des fichiers.**
   - Extensions de la liste blanche.
   - 10 Mo au total.
   - Contenu contrôlé par les premiers octets (signature) : `%PDF`, JPEG, PNG, ZIP (`PK`), STEP (`ISO-10303-21`), DWG (`AC10`), DXF ou IGES en texte.
   - Noms de fichiers remplacés.
   - Rien n'est conservé sur le serveur : les fichiers partent en pièces jointes, puis sont supprimés.
4. **Anti-robot.** Le champ piège doit être vide. Le formulaire doit aussi avoir été rempli en plus de 5 secondes : l'heure d'affichage est signée (HMAC) dans un champ caché.
5. **Limite d'envois.** Au plus 3 demandes par heure et par adresse IP (enregistrée hachée), et 30 par jour pour tout le site. Le compteur est un fichier hors du dossier public.
6. **Envoi.**
   - PHPMailer passe par la boîte SMTP de l'hébergement (pas `mail()`).
   - La demande part à l'adresse de réception, avec les pièces jointes, en répondant à l'e-mail du demandeur.
   - Un accusé de réception part au demandeur, avec le numéro de demande.
   - Les identifiants SMTP sont dans un fichier de configuration hors du dépôt, jamais dans Git.
7. **Réponse.**
   - Succès : `{ "ok": true, "numero": "SIM-2027-0001" }`, numéro suivi par le compteur. La page n'affiche le succès qu'à ce moment.
   - Échec : `{ "ok": false, "code": "…" }`. La page affiche alors une erreur claire et garde le bouton WhatsApp en secours.

Côté page, seul l'envoi change : `fetch` avec un `FormData` à la place de l'ouverture de WhatsApp. Il faut compter environ une demi-journée, essais compris.

À noter : l'aperçu Vercel n'exécute pas de PHP. Il garderait le mode WhatsApp et e-mail, à moins d'écrire une fonction Vercel équivalente.

**À fournir par la fondation :**
- l'accord sur cette solution ;
- PHP 8.1 ou plus sur l'hébergement, et une boîte SMTP ;
- l'adresse de réception et la personne qui répond (questions du bloc « Programme Simulation » de docs/contenus-a-fournir.md).

## La page, section par section

Code : `src/pages/simulation/`, styles `src/styles/simulation.css` (avec les jetons et les éléments communs de `src/styles/accueil.css`), textes `src/locales/simulation/` (fr, en, de), données `src/data/simulation.ts`. Les fonds alternent : deux sections voisines n'ont jamais le même.

| # | Section | Fond | Fichier | Contenu |
|---|---|---|---|---|
| 1 | Hero | brume | `Hero.tsx`, `Portique.tsx` | Le h1 ligne par ligne, une phrase, trois pastilles et deux boutons (le formulaire, « Suis-je éligible ? »). Le bouton pause du site. La carte du portique de hangar (SVG chargé à part), « Exemple illustratif, valeurs fictives ». |
| 2 | Pourquoi ce programme | papier | `Presentation.tsx` | 3 cartes : l'économie locale (lien Entrepreneuriat), la jeunesse (lien Éducation), le groupe IROKO. |
| 3 | Ce que nous offrons | sauge | `Presentation.tsx` | 4 cartes numérotées 01 à 04, avec « vous recevez ». |
| 4 | Pour qui ? (`#pour-qui`) | papier | `Presentation.tsx` | À qui s'adresse le programme. Un encadré « n'est pas fait pour… » renvoie vers IROKO Engineer. |
| 5 | Exemples de demandes | brume | `Exemples.tsx` | 5 cartes étiquetées « Exemple » (jamais des projets réalisés), dans une rangée qui défile (flèches, clavier, glisser). |
| 6 | Comment ça marche (`#comment`) | nuit | `Etapes.tsx`, `EtapesMotion.tsx` | 5 étapes reliées par le fil, qui se trace au défilement ; les points s'allument en soleil. |
| 7 | Ce que nous savons simuler | papier | `Savoir.tsx` | 3 familles et leurs pastilles. Aucun nom de logiciel. |
| 8 | Engagements et limites | sauge | `Savoir.tsx` | 4 engagements et la phrase des limites, toujours affichée. |
| 9 | Les jeunes au cœur du programme | brume | `Savoir.tsx` | Photo A30 (participants de dos, accord « ok »), texte, lien vers /agir#benevole. |
| 10 | FAQ (`#faq`) | papier | `Faq.tsx` | 8 questions en accordéon (`<details>`), sur deux colonnes dès 1 024 px. |
| 11 | Soumettre mon projet (`#soumettre`) | forêt | `Soumettre.tsx`, `Formulaire.tsx` | Le formulaire sur une carte (papier en clair, canopée en sombre). À côté : le WhatsApp officiel et IROKO Engineer. |

L'en-tête commun reçoit l'entrée « Simulation » (pastille à contour, icône cube), juste après « Nos actions », et la même entrée dans le menu mobile. Avec 9 entrées, le menu complet n'apparaît qu'à partir de 1 366 px ; dessous, c'est le menu burger (dernier recours du lot 7.9). Le texte reste à 16 px.

## Données et confirmation d'un fait

Le français est dans `src/data/simulation.ts`. L'anglais et l'allemand en sont des surcouches : `contenu.*` dans `src/locales/simulation/en.json` et `de.json`. Chaque élément porte :

- `confirme: true` : affiché partout ;
- `confirme: false` : affiché seulement en développement, avec le badge « à confirmer », et masqué en ligne (`src/pages/simulation/donnees.ts`) ;
- `protection: true` : affiché en ligne même non confirmé, parce qu'il protège le visiteur. C'est le cas de la phrase des limites et de la réponse « Les résultats sont-ils certifiés ? ».

**Confirmer un fait** (par exemple un délai de réponse, question 221) :
1. Écrire le texte exact dans `src/data/simulation.ts`, avec le chiffre donné par la fondation.
2. Passer `confirme` à `true`.
3. Reporter la traduction dans `contenu.<liste>.<id>` de `en.json` et `de.json`.
4. Lancer `npm run check`, qui exige les trois langues.
5. Noter la réponse sous sa question, dans docs/contenus-a-fournir.md.

Rien n'est chiffré sur la page tant que la fondation n'a pas répondu : délais, nombre de projets, volumes, durées. Les questions sont dans docs/contenus-a-fournir.md, bloc « Programme Simulation » (213 à 224).

## Mouvement (étape 4)

- **Entrées.** La grammaire de /accueil : chaque section arrive une fois, avec le composant `Entree` de /accueil. Viennent le surtitre, les lignes du titre sous leur masque (`Lignes`), l'introduction, puis les cartes en cascade (90 ms d'écart) et les pastilles une à une.
- **Hero.** Il joue son entrée au chargement. Son intro monte sans fondu : c'est l'élément LCP sur téléphone.
- **Portique.** Une boucle CSS de 7 s : le cadre fléchit sous le vent, la ferme se tasse sous la toiture, les flèches poussent, les barres les plus sollicitées s'allument. Le dessin est chargé à part (0,8 Ko) et ne retarde jamais le titre. La boucle s'arrête au bouton pause, quand l'onglet est caché, ou quand la carte sort de l'écran (`--ac-lecture`, `useLoopControl`).
- **Fil des étapes.** Le trait soleil s'allonge avec le défilement : horizontal dès 1 024 px, vertical dessous. Chaque point s'allume quand le trait l'atteint. Le code (GSAP, 0,7 Ko) se charge à l'approche de la section.
- **Mouvement réduit.** Rien ne bouge. Le dessin est figé en position chargée, le fil est entier et les points sont allumés.
- **Bouton pause.** Les entrées ne se jouent pas, le fil est entier et la boucle se fige.

## Vérifications (étape 5, 27 novembre 2026, build de production)

- **Structure :** 1 h1 et 10 h2, puis des h3, sans niveau sauté. Aucune clé brute en FR, EN et DE, en clair et en sombre. Deux sections voisines n'ont jamais le même fond (5 fonds dans chaque thème).
- **Contenu :** aucun nom de logiciel ni d'éditeur, aucun superlatif sur la fondation (seuls « la meilleure forme » et « où il travaille le plus » décrivent l'optimisation), aucun chiffre non confirmé.
- **Photos :** une seule, A30, de dos (règle des mineurs respectée). Elle est affichée 3 fois sur le site : /accueil et /notre-impact (en remplacement d'A27, encore en attente d'accord) et /simulation.
- **Clavier :** 84 arrêts, chacun avec un anneau visible. Aucun ne reste hors de l'écran. Le champ piège est hors du parcours.
- **Formulaire :**
  - erreurs reliées par `aria-describedby`, focus sur la première ;
  - un fichier .exe est refusé ;
  - plus de 10 Mo au total bloque l'envoi ;
  - le message WhatsApp ou e-mail contient tous les champs et la liste des fichiers ;
  - aucun faux succès.
- **Performance :**
  - JS initial (fichier d'entrée, même mesure qu'au lot 12) : 157,1 Ko compressés, contre 156,7 Ko au lot 12, pour un budget de 170 Ko.
  - La page charge à la demande 13,3 Ko de code, puis le portique (0,8 Ko) et le fil (0,7 Ko).
- **Lighthouse mobile, 3 passages :** performance 78 à 81, accessibilité 100, bonnes pratiques 100, CLS 0, TBT 120 à 190 ms, LCP 4,4 à 4,6 s.
  - L'élément LCP est l'intro du hero. Son temps est à 90 % du rendu côté client, comme sur /accueil (4,6 à 4,7 s au lot 12).
  - SEO 66 : c'est le noindex voulu tant que le site n'est pas lancé.
  - En mouvement réduit, en clair et en sombre : accessibilité 100, contrastes conformes sur toute la page.
- **Largeurs :** aucun défilement horizontal à 320, 390, 768, 1 024 et 1 440 px.
- **En-tête :** mesuré à 1 280, 1 366 et 1 440 px en FR, EN et DE.
  - 1 280 px : menu burger.
  - 1 366 px : 9 entrées, texte à 16 px, aucun chevauchement. Marge entre le logo et le menu : 29 px (FR), 93 px (EN), 12 px (DE).
- **Captures :** `docs/references/simulation/`.
  - Page entière à 1 440 et 390 px, en clair (FR) et en sombre (DE).
  - En-tête aux trois largeurs, dans les trois langues.
  - Formulaire vide, avec erreurs, avec fichiers trop lourds, et prêt dans WhatsApp (FR et DE, clair et sombre, ordinateur et téléphone).
