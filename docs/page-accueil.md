# Page Accueil (/accueil)

La nouvelle page d'accueil, construite à côté de l'ancien accueil. Depuis le 26 novembre 2026, / mène à /accueil (redirection dans `src/App.tsx`) ; l'ancien accueil reste dans le code (`src/pages/Home.tsx`), il n'est plus affiché. Ce guide dit où se trouve chaque section et comment mettre à jour ce qui dépend de la fondation. Le détail du design est dans `docs/design-contract.md` (§16).

## Les 12 sections

Composants dans `src/pages/accueil/`, sauf mention contraire. Styles : `src/styles/accueil.css`. Textes en anglais et en allemand : `src/locales/accueil/en.json` et `de.json`.

| # | Section | Composant | Données |
|---|---|---|---|
| 1 | Hero | `Hero.tsx`, `Visuel.tsx` | Textes : `src/locales/accueil` (`hero`). Carte « Prochain événement » : `src/data/events.ts` |
| 2 | Qui sommes-nous en bref, et la direction (lot 12) | `QuiSommesNous.tsx` | Textes : `src/locales/accueil` (`qsn`). La direction : les trois premiers niveaux de `src/data/team.ts` (noms, titres, fonctions, accord des portraits), lus par `src/lib/team.ts`, comme l'organigramme de Qui sommes-nous |
| 3 | Les chiffres | `Chiffres.tsx`, `Compteur.tsx` | `src/data/accueil-chiffres.ts` |
| 4 | Les 6 domaines | `DomainesParcours.tsx`, `DomainesMotion.tsx` | Domaines : `src/services/api.ts` (`DOMAINS_DATA`). Photos : `PHOTOS` dans `DomainesParcours.tsx` |
| 5 | Projet phare | `ProjetPhare.tsx`, `ProjetMotion.tsx`, `route.ts` | `src/data/accueil-projets.ts` |
| 6 | Des parcours qui inspirent | `Parcours.tsx`, `Paquet.tsx`, `CarteTemoignage.tsx` | `src/data/accueil-temoignages.ts` |
| 7 | Les 10 régions | `Regions.tsx`, `CarteRegions.tsx` | `src/data/regions.ts`. Textes repris de Notre impact |
| 8 | En images (Apprendre, cultiver, grandir) | `AccueilEnImages.tsx`, `PanneauImage.tsx` : variante de l'accordéon de /, qui ne change pas | `src/data/journey.ts`, les mêmes données que /. Surtitre et titres courts du fil : `src/locales/accueil` (`images`) |
| 9 | Événements | `Evenements.tsx`, `CarteEvenement.tsx` | `src/data/events.ts` |
| 10 | Le film | `Film.tsx`, `FilmMotion.tsx` (le défilement, fichier à part), `FilmFenetre.tsx` : variante de la fenêtre du film du hero de /, qui ne change pas | `filmExtrait.ts`, écrit par `scripts/encode-film.mjs` (voir « Mettre le film en ligne »). Textes : `src/locales/accueil` (`film`) |
| 11 | Appel au don | `AppelDon.tsx` | Textes : `src/locales/accueil` (`don`). Domaines : `src/services/api.ts`. Chaque pastille ouvre Faire un don avec son domaine choisi (`/faire-un-don?affectation=sante`) |
| 12 | Nos partenaires (lot 12) | `Partenaires.tsx` | `src/data/partners.ts` (voir « Ajouter un partenaire »). Textes : `src/locales/accueil` (`partenaires`) |

L'assemblage et le bouton pause sont dans `AccueilPage.tsx`. Les photos viennent du catalogue : on modifie `docs/photos-catalogue.md`, puis on lance `npm run photos`.

**L'appel au don** n'affiche ni montant, ni équivalence (« X FCFA = … »), ni chiffre d'impact, tant que la fondation ne les a pas fournis (question 206).

**La règle des faits.** En ligne, rien de non confirmé ne s'affiche : ni chiffre sans date ni source, ni projet ou témoignage non confirmé, ni texte marqué TODO, ni photo en attente d'accord. Ces exemples restent visibles en développement seulement, pour travailler la mise en page. Ce qui manque est masqué, et la question est notée dans `docs/contenus-a-fournir.md`.

Après chaque modification : `npm run check`, puis `npm run build`.

## Publier un chiffre d'impact

Fichier : `src/data/accueil-chiffres.ts`. Ajoutez une entrée à la fin de `CHIFFRES` :

```ts
{
  id: 'jeunes',
  nature: 'impact',
  valeur: 120,
  suffixe: '+',
  libelle: { fr: 'Jeunes accompagnés', en: 'Young people supported', de: 'Begleitete junge Menschen' },
  sousTexte: { fr: 'Depuis 2024', en: 'Since 2024', de: 'Seit 2024' },
  lien: '/notre-impact',
  date: '2026-12-31',
  source: { fr: 'registre des inscriptions', en: 'enrolment register', de: 'Anmelderegister' },
},
```

Sans `date` ou sans `source`, le chiffre ne s'affiche pas. La page affiche la date et la source en petit sous le chiffre.

## Confirmer un projet phare

Fichier : `src/data/accueil-projets.ts`. En ligne, la section montre le premier projet confirmé ; aujourd'hui, c'est l'Académie de langues. « WAHHF on Wheel » est un exemple, visible en développement seulement.

1. La fondation valide les faits : le projet, ses lieux, ses chiffres (chacun daté et sourcé).
2. Écrivez le titre, l'accroche, le texte et les 3 à 5 jalons de la route. Choisissez une photo publiable du catalogue (`photo`).
3. Ajoutez l'anglais et l'allemand dans `src/locales/accueil/en.json` et `de.json`, sous `contenu.projets.<id>`, avec les mêmes champs.
4. Passez `confirme: true`.

## Publier un vrai témoignage

Fichier : `src/data/accueil-temoignages.ts`. Sans témoignage confirmé, la section invite à raconter son parcours : le bouton mène au formulaire de contact, avec le motif « Partager mon parcours » déjà choisi.

1. Il faut une vraie personne et son accord écrit, que la fondation conserve.
2. Photo : seulement celle de cette personne, avec son accord, versée au catalogue. La règle des mineurs s'applique. Sans photo, mettez `photo: null` : la carte montre l'initiale du prénom. Jamais le visage de quelqu'un d'autre.
3. Écrivez la citation (sans guillemets), le nom, l'âge si la personne l'accepte, la ville, le domaine, le résumé et le résultat.
4. Ajoutez l'anglais et l'allemand sous `contenu.temoignages.<id>` dans `src/locales/accueil`.
5. Passez `confirme: true`.

## Ajouter un événement

Fichier : `src/data/events.ts`. La section Événements se remplit seule. Elle montre le prochain événement à venir dans la grande carte, puis les deux plus récents des événements passés en tickets. Un événement « à venir » dont la fin est passée devient « passé » automatiquement.

- **Road to Europe :** remplissez `ROAD_TO_EUROPE_FAITS` (date, fin, ville, salle, prix, places, inscription). Les dates s'écrivent comme `'2027-01-16T08:00:00+01:00'` (heure de Douala).
- **Nouvel événement :** copiez un objet existant, donnez-lui un `slug` et des faits, puis ajoutez-le à la liste `EVENTS`.
  - `date: null` affiche « Date annoncée très bientôt » ; `lienInscription: null` affiche « Inscriptions annoncées très bientôt » ;
  - `photoHero` : des repères du catalogue, la photo d'abord, puis ses remplaçantes ;
  - textes anglais et allemands : `src/locales/events/en.json` et `de.json`, sous `events.contenu.<slug>`.

Le compte à rebours, la page d'éphéméride et les liens se mettent à jour seuls.

## Ajouter un partenaire

Fichier : `src/data/partners.ts`. Aujourd'hui, quatre partenaires s'affichent : IROKO Group, CRTV, L'Eldorado Digital Academy et Wahhf bio délices (logos donnés le 26 novembre 2026), sans lien ni pays tant qu'ils ne sont pas confirmés (question 212).

1. Ajoutez une ligne : `{ id: 'goethe', nom: 'Goethe-Institut', logo: '/logos-partenaires/goethe.webp', lien: 'https://…', pays: 'Allemagne', confirme: false }`.
2. Logo : à partir du fichier fourni (SVG, ou PNG d'au moins 400 px de large sur fond transparent), un WebP de 160 px de haut dans `public/logos-partenaires/`. Il s'affiche en niveaux de gris, en couleur au survol. Sans logo (`logo: null`), la carte montre le nom en texte.
3. Lien : seulement le site officiel confirmé ; sinon `lien: null`, et la carte n'est pas un lien.
4. Passez `confirme: true` quand la fondation a confirmé le partenariat et l'accord pour l'afficher. Avant, il ne s'affiche qu'en développement.

Moins de 6 partenaires : une grille fixe centrée. À partir de 6, les logos défilent sur deux rangées en sens opposés ; la bande s'arrête au survol, au focus, au bouton pause du site, hors de l'écran et en mouvement réduit.

## Mettre le film en ligne

La section « Le film » attend le fichier vidéo du film (question 207). En attendant, elle montre l'affiche et le bouton « Regarder le film », qui ouvre la fenêtre YouTube de / après accord. YouTube ne se charge jamais sans un clic.

1. Déposez le film dans sa meilleure qualité : `docs/references/video/film-wahhf.mp4`.
2. Lancez `node scripts/encode-film.mjs`. Il faut ffmpeg et ffprobe. Le script écrit :
   - dans `public/film/`, quatre fichiers sans le son :
     - `film-wahhf-1280.mp4` et `.webm` (ordinateur), 6 Mo au plus chacun ;
     - `film-wahhf-720.mp4` et `.webm` (téléphone), 3 Mo au plus chacun ;
   - `src/pages/accueil/filmExtrait.ts`, que la section lit.
3. Le script garde le film entier, jusqu'à 64 s (avant le générique, comme le hero de /), si l'image reste nette dans ces poids. Sinon, il coupe 30 s à partir de 4 s. Pour choisir les 30 secondes : `--debut=12`. Le script affiche ce qu'il a fait et le poids de chaque fichier.
4. `npm run check`, puis `npm run build`.

Ce que fait la section avec ces fichiers :

- **Au défilement :** l'extrait se charge à un écran de distance, joue quand le cadre est plein écran, puis se met en pause en se refermant.
- **Sans défilement :** mouvement réduit, bouton pause du site, économie de données ou réseau 2G / 3G. Le cadre est ouvert et rien ne se télécharge avant un clic sur Lecture.
- **Le son et le film entier :** toujours la fenêtre YouTube, avec les sous-titres dans la langue de la page s'ils existent.

Pour refaire seulement les affiches AVIF, à partir des WebP du hero de / : `node scripts/encode-film.mjs --affiches-seulement`.

## Questions encore ouvertes pour cette page

Numéros de `docs/contenus-a-fournir.md` :

- **Chiffres d'impact :**
  - 79 : quels chiffres publier ;
  - 80 : jeunes accompagnés, à quelle date, de quelle source ;
  - 192 : la date et la source de chaque chiffre du bandeau.
- **Photos :**
  - 141 : accord écrit des parents pour les photos de mineurs ;
  - 185 : A16, la photo prévue pour l'arche du hero ;
  - 186 : portraits et noms de l'équipe du hero ;
  - 197 : une photo d'action de santé pour la carte Santé.
- **Textes à valider :**
  - 182 : intro du hero ;
  - 183 : la ligne « au service de la jeunesse » ;
  - 190 : la citation « Le changement doit venir de nous-mêmes. » et qui la signe ;
  - 198 : introduction des domaines.
- **Projet et témoignage :**
  - 203 : WAHHF on Wheel existe-t-il, avec quels faits et chiffres ;
  - 204 : Marie est-elle une vraie personne, avec son accord et sa photo.
- **Événements :**
  - 171 et 172 : date, horaires, ville et salle de Road to Europe ;
  - 173 : son prix ;
  - 175 : son lien d'inscription ;
  - 157 : la ville de l'Albatros Hotel, sur le ticket de la journée du 25 avril.
- **Appel au don :** 206 : des exemples de montants, et ce qu'ils financent réellement.
- **Film :** 207 : le fichier vidéo du film, et l'accord des personnes qu'on y voit (voir aussi 201).
- **Direction :** 145 : l'orthographe des noms (celle de Christian Willberg est confirmée) ; 144 et 149 : portraits et accords écrits (en attendant, les initiales).
- **Partenaires :** 212 : la liste, les logos, les liens, les pays et l'accord pour les afficher.
- **Nom de la fondation :** 170 : le nom complet officiel derrière WAHHF (en attendant, « WAHHF Foundation » seulement).
- **Mise en ligne :** 188 : / mène à /accueil depuis le 26 novembre 2026 ; reste à décider quand retirer l'ancien accueil du code.
