# Catalogue des photos de la fondation

Source : `C:\Users\Emmanuel NYA\Downloads\images_wahhf-fundation` (184 fichiers WhatsApp, reçus les 18 et 19/11/2026).
Retenues : celles listées ici. Écartées : doublons de la même prise (2 à 8 par série), façade et hall de l'hôtel sans la fondation, et deux copies basse définition de photos de l'événement (B49 et B50).
**89 photos retenues** sur 184.

Correspondance avec les 6 domaines du site (une photo par domaine sur Nos actions) : Éducation → A27 ; Environnement → B10 ; Entrepreneuriat des jeunes → B23 ; Mobilité & Langues → A53 ; Droits et inclusion → A31 ; Santé → aucune photo (TODO). Fichiers de référence : docs/references/accordeon-*.jpg (accordéon) et docs/references/portraits-*.png (page 7.7).

Colonnes : **id** (repère), **fichier source**, **taille**, **slug** (nom de sortie), **alt** (texte alternatif), **mineurs identifiables** (oui = attendre l'accord écrit ; ? = à vérifier ; non = adultes seulement, ou personnes vues de dos), **cadrage** (`object-position`), **usage proposé**.

Règle : toute photo marquée `oui` ou `?` reçoit `consent: 'pending'` tant que la fondation n'a pas confirmé les autorisations parentales (GAL-01). Les photos `pending` s'affichent en développement, jamais dans le build de production.

Règle des mineurs (25 novembre 2026) : un jeune **reconnaissable** (visage net, de face ou de profil, à n'importe quel plan) met la photo en `pending`. Un jeune flou, de dos ou trop petit pour être reconnu la laisse `ok`. Vérifiées une à une avec cette règle : les 36 photos alors publiables ; A31, A34, A98 et B85 passent en `?`. Même règle pour l'ancienne galerie (src/data/gallery.ts).

## Remplaçantes des photos en attente d'accord

Quand une page ne donne pas elle-même de remplaçante publiable, le site prend celle de cette table (`photoOrFallback`, src/lib/photos.ts). Les remplaçantes propres à une section restent dans ses données (accordéon : src/data/journey.ts ; événements : src/data/events.ts ; domaines : src/config/domainPhotos.ts ; cartes de /accueil : src/pages/accueil/DomainesParcours.tsx). Règle du 25 novembre 2026 : jamais deux fois sur la même page, et au plus 3 fois sur tout le site (galerie non comptée).

| photo en attente | remplaçantes | où |
|---|---|---|
| A16 | A44 | Faire un don (en-tête) |
| A31 | A74 | Qui sommes-nous (mission) |
| A33 | A63 | Académie de langues (en-tête) |
| A34 | A46 | Mobilité & Langues (Europe) |
| A81 | A12 | Notre impact (troisième photo) |
| A85 | A44 | Actualités, mosaïque du 25 avril (A07 y est déjà, à la troisième place) |
| A88 | A99 | Qui sommes-nous (fin de page), cercle de /accueil |
| A98 | A66 | Mobilité & Langues (Académie) |
| B75 | B41 | Notre impact (deuxième photo) |

## Journée du 25 avril 2026 — Albatros Hotel  (`journee-2026-04-25`)

_Nom exact de l'événement à confirmer (la banderole indique : Albatros Hotel, 25 avril 2026, 8 h–21 h)._

| id | fichier source | taille | slug | alt | mineurs | cadrage | usage |
|---|---|---|---|---|---|---|---|
| A02 | `WhatsApp Image 2026-11-18 at 12.38.46 (1).jpeg` | 1600x1066 | `journee-2026-04-25-banderole` | Banderole de la WAHHF Foundation sur la façade de l'Albatros Hotel : « Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse » | non | `center` | À propos, carte événement |
| A07 | `WhatsApp Image 2026-11-18 at 12.38.46 (6).jpeg` | 1600x1066 | `journee-2026-04-25-accueil-devant-hotel` | Participants rassemblés devant l'Albatros Hotel avant le début de la journée | non | `center 70%` | Contact, carte événement |
| A12 | `WhatsApp Image 2026-11-18 at 12.38.46 (11).jpeg` | 1066x1600 | `journee-2026-04-25-membre-equipe-kakemono` | Un membre de l'équipe pose à côté du kakémono de la fondation | non | `60% 40%` | Galerie (pas de page Équipe) |
| A13 | `WhatsApp Image 2026-11-18 at 12.38.47.jpeg` | 1066x1600 | `journee-2026-04-25-kakemono-orange` | Kakémono orange de la fondation : « Showing hope, harvesting change » | non | `center` | Galerie |
| A14 | `WhatsApp Image 2026-11-18 at 12.38.47 (1).jpeg` | 1066x1600 | `journee-2026-04-25-kakemono-domaines` | Kakémono de la fondation présentant ses domaines d'action | non | `center` | À propos |
| A16 | `WhatsApp Image 2026-11-18 at 12.38.47 (3).jpeg` | 1600x1066 | `journee-2026-04-25-jeunes-de-dos-tshirts` | Jeunes participants vus de dos, en t-shirts « Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse » | oui | `center 60%` | Don, Accueil : après l'accord des parents (visages reconnaissables de profil, numéro de téléphone lisible) |
| A17 | `WhatsApp Image 2026-11-18 at 12.38.47 (4).jpeg` | 1600x1066 | `journee-2026-04-25-salle-vue-du-fond` | Salle de conférence vue depuis le fond, participants assis face à l'écran | ? | `center` | Galerie |
| A18 | `WhatsApp Image 2026-11-18 at 12.38.47 (5).jpeg` | 1600x1066 | `journee-2026-04-25-inscriptions` | Accueil et inscription des participants près du kakémono | ? | `center` | Galerie |
| A22 | `WhatsApp Image 2026-11-18 at 12.38.47 (9).jpeg` | 1600x1066 | `journee-2026-04-25-preparation-technique` | Préparation des ordinateurs avant les présentations | non | `center` | Galerie (coulisses) |
| A23 | `WhatsApp Image 2026-11-18 at 12.38.47 (10).jpeg` | 1066x1600 | `journee-2026-04-25-salle-verticale` | Salle remplie, kakémono de la fondation au fond | ? | `center` | Galerie |
| A26 | `WhatsApp Image 2026-11-18 at 12.38.47 (13).jpeg` | 1600x1066 | `journee-2026-04-25-salle-installation` | Vue d'ensemble de la salle pendant l'installation | ? | `center` | Galerie |
| A27 | `WhatsApp Image 2026-11-18 at 12.38.47 (14).jpeg` | 1600x1066 | `journee-2026-04-25-salle-comble` | Salle comble pendant une présentation, kakémonos de la fondation de chaque côté de l'écran | ? | `center 55%` | ACCORDÉON panneau 1, poster du hero (option), domaine Éducation |
| A29 | `WhatsApp Image 2026-11-18 at 12.38.47 (16).jpeg` | 1066x1600 | `journee-2026-04-25-logo-projete` | Logo de la fondation projeté sur l'écran de la salle | ? | `center 30%` | Galerie |
| A30 | `WhatsApp Image 2026-11-18 at 12.38.47 (17).jpeg` | 1600x1066 | `journee-2026-04-25-public-de-dos` | Participants de dos face au kakémono de la fondation | non | `center` | Galerie |
| A31 | `WhatsApp Image 2026-11-18 at 12.38.47 (18).jpeg` | 1600x1066 | `journee-2026-04-25-parents-aines` | Parents et aînés assis au premier rang | ? | `center` | À propos (familles), domaine Droits et inclusion |
| A33 | `WhatsApp Image 2026-11-18 at 12.38.47 (20).jpeg` | 1600x1066 | `journee-2026-04-25-jeunes-attentives` | Jeunes participantes attentives pendant une présentation | oui | `center` | Galerie (après accord) |
| A34 | `WhatsApp Image 2026-11-18 at 12.38.47 (21).jpeg` | 1600x1066 | `journee-2026-04-25-question-au-micro` | Un participant prend la parole au micro pendant les échanges | ? | `65% 40%` | Galerie, Actualités |
| A36 | `WhatsApp Image 2026-11-18 at 12.38.47 (23).jpeg` | 1600x1066 | `journee-2026-04-25-jeunes-debout` | Jeunes participants debout dans la salle | oui | `center` | Galerie (après accord) |
| A37 | `WhatsApp Image 2026-11-18 at 12.38.47 (24).jpeg` | 1600x1066 | `journee-2026-04-25-jeune-homme-ecoute` | Un jeune homme écoute une présentation | ? | `center 40%` | Galerie |
| A38 | `WhatsApp Image 2026-11-18 at 12.38.48.jpeg` | 1066x1600 | `journee-2026-04-25-jeune-polo-fondation` | Jeune participant en polo de la fondation | ? | `center 35%` | Galerie |
| A41 | `WhatsApp Image 2026-11-18 at 12.38.48 (3).jpeg` | 1600x1066 | `journee-2026-04-25-intervenant-polo-rose` | Intervenant en polo rose au pupitre, micro en main | non | `center 40%` | Galerie, Actualités |
| A42 | `WhatsApp Image 2026-11-18 at 12.38.48 (4).jpeg` | 1600x1066 | `journee-2026-04-25-intervenant-assis` | Intervenant assis à la table technique | non | `center 40%` | Galerie |
| A44 | `WhatsApp Image 2026-11-18 at 12.38.48 (6).jpeg` | 1600x1066 | `journee-2026-04-25-deux-intervenants` | Deux intervenants au pupitre | non | `center 40%` | Galerie |
| A45 | `WhatsApp Image 2026-11-18 at 12.38.48 (7).jpeg` | 1066x1600 | `journee-2026-04-25-intervenant-veste-bleue` | Intervenant en veste bleue, micro en main | non | `center 30%` | Galerie (pas de page Équipe) |
| A46 | `WhatsApp Image 2026-11-18 at 12.38.48 (8).jpeg` | 1600x1066 | `journee-2026-04-25-presentation-kakemono` | Intervenant présentant devant l'écran et le kakémono | non | `center` | Galerie |
| A48 | `WhatsApp Image 2026-11-18 at 12.38.48 (10).jpeg` | 1600x1066 | `journee-2026-04-25-photos-terrain-projetees` | Projection de photos de terrain pendant une présentation | ? | `center 40%` | Galerie |
| A51 | `WhatsApp Image 2026-11-18 at 12.38.48 (13).jpeg` | 1600x1066 | `journee-2026-04-25-presentation-salle` | Présentation devant la salle, photos d'actions projetées | ? | `center` | Galerie |
| A53 | `WhatsApp Image 2026-11-18 at 12.38.48 (15).jpeg` | 1600x1066 | `journee-2026-04-25-etudes-allemagne` | Présentation « Der Hochschulvergleich » sur les études en Allemagne | non | `35% 40%` | domaine Mobilité & Langues |
| A56 | `WhatsApp Image 2026-11-18 at 12.38.48 (18).jpeg` | 1066x1600 | `journee-2026-04-25-presentation-verticale` | Intervenant présentant face au public | ? | `center` | Galerie |
| A57 | `WhatsApp Image 2026-11-18 at 12.38.48 (19).jpeg` | 1066x1600 | `journee-2026-04-25-projection-photos-verticale` | Photos d'actions projetées devant le public | ? | `center` | Galerie |
| A59 | `WhatsApp Image 2026-11-18 at 12.38.48 (21).jpeg` | 1600x1066 | `journee-2026-04-25-diapo-fondation` | Intervenant devant la diapositive de présentation de la fondation | ? | `center` | Galerie |
| A60 | `WhatsApp Image 2026-11-18 at 12.38.48 (22).jpeg` | 1600x1066 | `journee-2026-04-25-diapo-domaines` | Diapositive présentant les domaines d'action de la fondation | ? | `center 30%` | Nos actions (vue d'ensemble, option) |
| A61 | `WhatsApp Image 2026-11-18 at 12.38.48 (23).jpeg` | 1600x1066 | `journee-2026-04-25-pupitre-lumiere` | Intervenant au pupitre dans une salle baignée de lumière | non | `center` | Galerie |
| A63 | `WhatsApp Image 2026-11-18 at 12.38.48 (25).jpeg` | 1600x1066 | `journee-2026-04-25-pictogrammes-domaines` | Intervenant devant les pictogrammes Éducation, Santé et Moyens de subsistance | non | `35% center` | Galerie |
| A66 | `WhatsApp Image 2026-11-18 at 12.38.49 (2).jpeg` | 1600x1066 | `journee-2026-04-25-cinq-domaines` | Intervenant présentant les domaines d'action de la fondation | non | `center` | Galerie |
| A68 | `WhatsApp Image 2026-11-18 at 12.38.49 (4).jpeg` | 1066x1600 | `journee-2026-04-25-intervenant-scene` | Intervenant sur la scène, devant le kakémono | non | `center 30%` | Galerie |
| A71 | `WhatsApp Image 2026-11-18 at 12.38.49 (7).jpeg` | 1066x1600 | `journee-2026-04-25-portrait-intervenant` | Portrait d'un intervenant pendant sa présentation | non | `center 25%` | Galerie (pas de page Équipe) |
| A74 | `WhatsApp Image 2026-11-18 at 12.38.49 (10).jpeg` | 1600x1066 | `journee-2026-04-25-intervenant-geste` | Intervenant s'adressant à la salle, bras ouverts | non | `center 40%` | Galerie |
| A77 | `WhatsApp Image 2026-11-18 at 12.38.49 (13).jpeg` | 1066x1600 | `journee-2026-04-25-intervenant-micro` | Intervenant parlant au micro | non | `center 25%` | Galerie |
| A80 | `WhatsApp Image 2026-11-18 at 12.38.49 (16).jpeg` | 1600x1066 | `journee-2026-04-25-public-debout` | Le public debout dans la salle | oui | `center` | Galerie (après accord) |
| A81 | `WhatsApp Image 2026-11-18 at 12.38.49 (17).jpeg` | 1600x1066 | `journee-2026-04-25-hymne-scene` | Les jeunes chantent l'hymne de la WAHHF Foundation sur scène | oui | `center 40%` | Galerie |
| A83 | `WhatsApp Image 2026-11-18 at 12.38.49 (19).jpeg` | 1600x1066 | `journee-2026-04-25-hymne-depuis-public` | L'hymne de la fondation vu depuis le public | oui | `center 40%` | Galerie |
| A85 | `WhatsApp Image 2026-11-18 at 12.38.49 (21).jpeg` | 1600x1066 | `journee-2026-04-25-hymne-bras-leves` | Chant de l'hymne de la fondation, bras levés | oui | `center 40%` | ACCORDÉON panneau 2 |
| A87 | `WhatsApp Image 2026-11-18 at 12.38.49 (23).jpeg` | 1600x1066 | `journee-2026-04-25-hymne-vue-large` | Vue large de la scène pendant l'hymne | oui | `center` | Galerie |
| A88 | `WhatsApp Image 2026-11-18 at 12.38.49 (24).jpeg` | 1600x1066 | `journee-2026-04-25-trois-aines` | Trois aînés assis, attentifs | ? | `center 40%` | À propos, Don |
| A89 | `WhatsApp Image 2026-11-18 at 12.38.49 (25).jpeg` | 1600x1066 | `journee-2026-04-25-jeunes-sourires` | Jeunes participantes souriantes | oui | `center` | Galerie (après accord) |
| A90 | `WhatsApp Image 2026-11-18 at 12.38.49 (26).jpeg` | 1600x1066 | `journee-2026-04-25-participante-polo-rose` | Participante en polo rose de la fondation | oui | `center 35%` | Galerie (après accord) |
| A92 | `WhatsApp Image 2026-11-18 at 12.38.50 (1).jpeg` | 1600x1066 | `journee-2026-04-25-jeunes-ecoutent` | Jeunes participantes à l'écoute | oui | `center` | Galerie (après accord) |
| A95 | `WhatsApp Image 2026-11-18 at 12.38.50 (4).jpeg` | 1600x1066 | `journee-2026-04-25-jeune-reflechit` | Jeune participant pensif | oui | `center` | Galerie (après accord) |
| A97 | `WhatsApp Image 2026-11-18 at 12.38.50 (6).jpeg` | 1600x1066 | `journee-2026-04-25-trois-jeunes` | Trois jeunes participants | oui | `center` | Galerie (après accord) |
| A98 | `WhatsApp Image 2026-11-18 at 12.38.50 (7).jpeg` | 1600x1066 | `journee-2026-04-25-prise-de-notes` | Un participant prend des notes | ? | `center` | Galerie |
| A99 | `WhatsApp Image 2026-11-18 at 12.38.50 (8).jpeg` | 1600x1066 | `journee-2026-04-25-polo-rose-bras-croises` | Membre de la fondation en polo rose, bras croisés | non | `center 35%` | Galerie (pas de page Équipe) |

## Visite de terrain dans une plantation  (`terrain-agricole`)

_Lieu et date à confirmer._

| id | fichier source | taille | slug | alt | mineurs | cadrage | usage |
|---|---|---|---|---|---|---|---|
| B03 | `WhatsApp Image 2026-11-19 at 15.02.49 (2).jpeg` | 1080x607 | `terrain-agricole-groupe-avant-depart` | Groupe en gilets réfléchissants avant le départ | ? | `center 40%` | Galerie |
| B04 | `WhatsApp Image 2026-11-19 at 15.02.50.jpeg` | 1080x607 | `terrain-agricole-explication-plantation` | Jeunes en gilets orange écoutant un encadrant dans une plantation d'ananas | ? | `center 45%` | ACCORDÉON panneau 3 |
| B06 | `WhatsApp Image 2026-11-19 at 15.02.51.jpeg` | 1080x607 | `terrain-agricole-deux-encadrants` | Deux encadrants échangent au bord d'un champ | non | `center 40%` | Galerie |
| B10 | `WhatsApp Image 2026-11-19 at 15.02.52 (1).jpeg` | 1080x607 | `terrain-agricole-groupe-champ` | Groupe en gilets réfléchissants au milieu d'un champ d'ananas | ? | `center 60%` | domaine Environnement |
| B13 | `WhatsApp Image 2026-11-19 at 15.02.53 (1).jpeg` | 1080x607 | `terrain-agricole-groupe-disperse` | Le groupe se répartit dans la plantation | ? | `center 60%` | Scroll Expand (option), domaine Environnement |
| B16 | `WhatsApp Image 2026-11-19 at 15.02.54 (1).jpeg` | 1080x607 | `terrain-agricole-observation-plants` | Participants observant les plants d'ananas | ? | `center 60%` | Galerie |
| B17 | `WhatsApp Image 2026-11-19 at 15.02.54 (2).jpeg` | 1080x607 | `terrain-agricole-groupe-aligne-champ` | Le groupe de la visite au milieu de la plantation, sous un grand ciel | ? | `center 60%` | SCROLL EXPAND « Sur le terrain » (image) |
| B20 | `WhatsApp Image 2026-11-19 at 15.02.56 (1).jpeg` | 1080x607 | `terrain-agricole-groupe-vue-large` | Vue large du groupe dans la plantation | ? | `center 60%` | Galerie |
| B21 | `WhatsApp Image 2026-11-19 at 15.02.56 (2).jpeg` | 1080x607 | `terrain-agricole-encadrant-accroupi` | Un encadrant accroupi examine un plant | ? | `center 60%` | Galerie |
| B23 | `WhatsApp Image 2026-11-19 at 15.02.57 (1).jpeg` | 1080x607 | `terrain-agricole-discussion-terrain` | Deux encadrants en discussion près des hautes herbes | non | `center 40%` | domaine Entrepreneuriat des jeunes |
| B24 | `WhatsApp Image 2026-11-19 at 15.02.57 (2).jpeg` | 1080x607 | `terrain-agricole-echange-terrain` | Encadrants échangeant sur le terrain | non | `center 40%` | Galerie |
| B26 | `WhatsApp Image 2026-11-19 at 15.02.58 (1).jpeg` | 1080x607 | `terrain-agricole-photo-de-groupe` | Photo de groupe des participants en gilets réfléchissants | ? | `center 50%` | ACCORDÉON panneau 4, Rejoindre / bénévolat |
| B27 | `WhatsApp Image 2026-11-19 at 15.02.58 (2).jpeg` | 1080x607 | `terrain-agricole-ecoute-terrain` | Jeunes en gilets écoutant une explication sur le terrain | ? | `center` | Galerie |

## Sortie à Nkongsamba  (`nkongsamba`)

_Date et contexte à confirmer._

| id | fichier source | taille | slug | alt | mineurs | cadrage | usage |
|---|---|---|---|---|---|---|---|
| B01 | `WhatsApp Image 2026-11-19 at 15.02.49.jpeg` | 1080x607 | `nkongsamba-route-en-travaux` | Route en terre détrempée en travaux | non | `center` | Galerie |
| B02 | `WhatsApp Image 2026-11-19 at 15.02.49 (1).jpeg` | 1080x607 | `nkongsamba-chantier-route` | Pelleteuse sur un chantier de route, collines en arrière-plan | non | `center` | Galerie |
| B09 | `WhatsApp Image 2026-11-19 at 15.02.52.jpeg` | 1080x607 | `nkongsamba-pelleteuse` | Pelleteuse en travaux sur une route | non | `center` | Galerie |
| B51 | `WhatsApp Image 2026-11-19 at 15.03.19 (2).jpeg` | 1080x607 | `nkongsamba-arche-groupe` | Participants sous l'arche « I love my town Nkongsamba 1er – Ville propre » | ? | `center 60%` | Galerie |
| B53 | `WhatsApp Image 2026-11-19 at 15.03.20.jpeg` | 1080x607 | `nkongsamba-arche-trois` | Trois participants posent sous l'arche de Nkongsamba | ? | `center 60%` | Galerie |
| B56 | `WhatsApp Image 2026-11-19 at 15.03.20 (3).jpeg` | 1080x607 | `nkongsamba-arche-seul` | Un participant pose sous l'arche de Nkongsamba | ? | `center 60%` | Galerie |

## Sortie au mont et au lac  (`mont-et-lac`)

_Lieu à confirmer (lac de cratère)._

| id | fichier source | taille | slug | alt | mineurs | cadrage | usage |
|---|---|---|---|---|---|---|---|
| B30 | `WhatsApp Image 2026-11-19 at 15.02.59 (1).jpeg` | 810x1080 | `mont-et-lac-a-cheval` | Un membre de l'équipe à cheval sur les pentes verdoyantes | non | `center 50%` | Galerie |
| B35 | `WhatsApp Image 2026-11-19 at 15.03.14 (2).jpeg` | 810x1080 | `mont-et-lac-cheval-bras-ouverts` | Deux membres de l'équipe posent à côté d'un cheval, bras ouverts | non | `center 50%` | Galerie |
| B40 | `WhatsApp Image 2026-11-19 at 15.03.16 (1).jpeg` | 810x1080 | `mont-et-lac-lac-de-cratere` | Vue sur un lac de cratère entouré de collines | non | `center 55%` | Galerie, page 404 (option) |
| B41 | `WhatsApp Image 2026-11-19 at 15.03.16 (2).jpeg` | 810x1080 | `mont-et-lac-bord-du-lac` | Membre de l'équipe au bord d'un lac de cratère | non | `center 40%` | Galerie |
| B44 | `WhatsApp Image 2026-11-19 at 15.03.17 (2).jpeg` | 810x1080 | `mont-et-lac-contemple-le-lac` | Membre de l'équipe contemplant le lac | non | `center 40%` | Galerie |

## Randonnée avec les jeunes  (`randonnee-jeunesse`)

_Lieu et date à confirmer._

| id | fichier source | taille | slug | alt | mineurs | cadrage | usage |
|---|---|---|---|---|---|---|---|
| B60 | `WhatsApp Image 2026-11-19 at 15.03.22.jpeg` | 1080x607 | `randonnee-jeunesse-sentier-foret` | Une jeune participante sur un sentier en forêt | oui | `center 60%` | Galerie (après accord) |
| B62 | `WhatsApp Image 2026-11-19 at 15.03.22 (2).jpeg` | 1080x607 | `randonnee-jeunesse-rocher-sommet` | Deux participantes sur un rocher au sommet | oui | `center` | Galerie (après accord) |
| B63 | `WhatsApp Image 2026-11-19 at 15.03.23.jpeg` | 1080x607 | `randonnee-jeunesse-echauffement` | Échauffement collectif avant la randonnée | oui | `center` | Galerie |
| B65 | `WhatsApp Image 2026-11-19 at 15.03.24.jpeg` | 1080x607 | `randonnee-jeunesse-echauffement-2` | Échauffement en cercle sous les arbres | oui | `center` | Galerie (après accord) |
| B68 | `WhatsApp Image 2026-11-19 at 15.03.24 (3).jpeg` | 1080x607 | `randonnee-jeunesse-pause-rocher` | Pause des participants sur la roche | oui | `center` | Galerie (après accord) |
| B69 | `WhatsApp Image 2026-11-19 at 15.03.25.jpeg` | 1080x607 | `randonnee-jeunesse-etirements` | Étirements au sommet | oui | `center` | Galerie (après accord) |
| B73 | `WhatsApp Image 2026-11-19 at 15.03.27.jpeg` | 1080x607 | `randonnee-jeunesse-vue-sur-la-ville` | Un jeune contemple la ville depuis le sommet | oui | `center` | Galerie (après accord) |
| B75 | `WhatsApp Image 2026-11-19 at 15.03.27 (2).jpeg` | 1080x607 | `randonnee-jeunesse-arrivee-sommet` | Le groupe célèbre l'arrivée au sommet, bras levés | oui | `center 45%` | Galerie |
| B77 | `WhatsApp Image 2026-11-19 at 15.03.28 (1).jpeg` | 1080x607 | `randonnee-jeunesse-groupe-sommet` | Photo de groupe au sommet, la ville en contrebas | oui | `center 45%` | ACCORDÉON panneau 5 |
| B80 | `WhatsApp Image 2026-11-19 at 15.03.29 (1).jpeg` | 1080x607 | `randonnee-jeunesse-arbre-sentier` | Un jeune s'appuie à un arbre sur le sentier | oui | `center` | Galerie (après accord) |
| B82 | `WhatsApp Image 2026-11-19 at 15.03.30.jpeg` | 1080x607 | `randonnee-jeunesse-file-en-foret` | Le groupe progresse en file sur un sentier forestier | oui | `center` | Galerie (après accord) |
| B84 | `WhatsApp Image 2026-11-19 at 15.03.30 (2).jpeg` | 1080x607 | `randonnee-jeunesse-sommet-vue-large` | Le groupe au sommet, vue sur la ville | oui | `center 45%` | Galerie (après accord) |
| B85 | `WhatsApp Image 2026-11-19 at 15.03.31.jpeg` | 1080x607 | `randonnee-jeunesse-chasuble-de-dos` | Participant de dos en chasuble verte dans la forêt | ? | `center` | Galerie, page 404 (option) |
