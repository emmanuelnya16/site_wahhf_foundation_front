# Audit frontend du site WAHHF Foundation

*15 novembre 2026. Référentiel : la méthode d'audit frontend-excellence (les renvois « § » désignent ses sections). En dehors de ce rapport, aucun fichier du projet n'a été modifié ni ajouté : les captures et fichiers de travail sont restés hors du projet.*

## Avant de lire

**Périmètre.** L'audit couvre les 28 routes du site : 20 pages WAHHF et 8 pages historiques du groupe IROKO encore en ligne. Le build de production a été servi en local et regardé à 390 px et à 1440 px. La méthode est détaillée en annexe B.

**Organisation du rapport.**
- **Partie A, jugement de design :**
  - le site entier (A.1) ;
  - les problèmes transversaux (A.2) ;
  - chaque page, avec sa note sur 100 (A.3).
- **Partie B, audit technique**, en 7 dimensions : tokens (variables de couleurs, tailles et rayons), états, accessibilité, responsive, performance, animations, et une dimension hors grille (mise en ligne, référencement, données personnelles).
- **Synthèse :** les 5 problèmes les plus graves, ce qui fonctionne, la recommandation de direction, et ce qui n'a pas pu être vérifié.
- **Annexes :** les contenus provisoires encore visibles, la méthode.

**Priorités.**
- **bloquant** : empêche la mise en ligne en l'état. C'est le cas d'un contenu faux ou provisoire présenté comme vrai, d'une tâche impossible à accomplir, d'un échec à la norme d'accessibilité WCAG 2.2 AA ou d'un plancher de performance non atteint.
- **important** : dégrade nettement l'expérience, la confiance ou la maintenance.
- **finition** : polissage.

Exceptions : sur les 8 pages historiques, dont le retrait est proposé, les défauts de détail (cibles tactiles comprises, HIS-11) restent en finition. Une longueur de ligne excessive (RESP-06) est aussi une finition : c'est un critère de confort (WCAG AAA), qui ne touche que l'ordinateur.

**Identifiants.** Chaque problème a un identifiant :
- `T-xx` pour un problème transversal ;
- le code de la page pour un problème propre à une page (`DON-03`) ;
- le code de la dimension pour la partie technique (`A11Y-01`).

Un problème n'est écrit qu'une fois : les fiches de page renvoient aux identifiants transversaux et techniques.

**Corrections.** Elles sont proposées, pas appliquées. Celles qui retirent une route, un texte ou un composant portent la mention « (à valider) ». Les TODO et les contenus fictifs ne sont pas à supprimer mais à remplacer par le contenu réel, que la fondation doit fournir ; l'annexe A les liste.

**Fiabilité.** Le rapport repose sur 14 audits indépendants, contre-vérifiés un à un par un vérificateur chargé de les réfuter, puis sur une critique d'ensemble. Aucun constat n'a été réfuté. 102 ont été nuancés (chiffre, cause ou priorité corrigés) avant d'entrer dans le rapport. Les mesures (Lighthouse, débordements, TODO visibles, contrastes) sont signalées comme mesurées ; les estimations sont signalées comme telles.

## En bref

**Note du site : 47/100** (Design 22/40, Utilisabilité 14/30, Créativité 8/20, Contenu 3/10).

Le site est propre et techniquement soigné, mais il n'est pas publiable en l'état et il ne ressemble pas encore à WAHHF.

- **Il présente du provisoire et du fictif comme du vrai :** 108 « TODO » lisibles, 5 témoignages inventés, des images générées présentées comme du terrain, des sessions « à venir » déjà passées, et un nom de fondation à confirmer.
- **Aucun parcours n'aboutit.** Le don est simulé, la candidature reste dans le navigateur et aucun formulaire n'envoie. Il n'y a pas de page Contact WAHHF.
- **Un autre site vit dans le site :** 8 pages historiques IROKO (devis, tarifs, codes de traduction affichés à la place du texte, comme « GROUP.SYMBOLTITLE »), accessibles par un lien du footer de chaque page.
- **Sur mobile, l'accueil met 5 s à afficher son contenu principal**, et l'anneau qui montre où l'on se trouve au clavier (le focus) est presque invisible (contraste 1,92:1, minimum 3:1).
- **Le design est un gabarit d'ONG « vert et or » bien exécuté**, qui échoue au test du nom retiré. Ce qui appartient vraiment à WAHHF est enfoui : la carte passerelle, la voix anti-arnaque, l'Académie, les vraies photos.

**Recommandation :** lever d'abord les bloquants, puis faire évoluer la direction autour d'une signature. Deux pistes sont proposées dans la partie 3 de la synthèse.

**194 problèmes** après fusion des doublons : 34 bloquants, 106 importants, 54 finitions.

| Partie | Bloquants | Importants | Finitions |
|---|---|---|---|
| A.2 Transversaux | 7 | 12 | 3 |
| A.3 Pages | 20 | 60 | 23 |
| B.1 Tokens | 0 | 4 | 3 |
| B.2 États | 1 | 8 | 0 |
| B.3 Accessibilité | 2 | 6 | 6 |
| B.4 Responsive | 1 | 4 | 3 |
| B.5 Performance | 2 | 4 | 6 |
| B.6 Animations | 0 | 3 | 10 |
| B.7 Mise en ligne | 1 | 5 | 0 |

**Notes par page** (détail et justification dans chaque fiche de la partie A.3) :

| Page | Design /40 | Utilisabilité /30 | Créativité /20 | Contenu /10 | Total /100 |
|---|---|---|---|---|---|
| **Site entier** | 22 | 14 | 8 | 3 | **47** |
| Accueil | 21 | 15 | 9 | 2 | **47** |
| Qui sommes-nous | 22 | 18 | 4 | 3 | **47** |
| Nos actions | 24 | 17 | 5 | 4 | **50** |
| Notre impact | 25 | 17 | 9 | 1 | **52** |
| Partenaires | 20 | 21 | 3 | 2 | **46** |
| Transparence financière | 14 | 18 | 1 | 1 | **34** |
| Galerie | 25 | 21 | 7 | 5 | **58** |
| Actualités | 18 | 18 | 3 | 1 | **40** |
| Article d'actualité | 21 | 17 | 3 | 2 | **43** |
| Mobilité & Langues | 22 | 18 | 6 | 3 | **49** |
| Académie de langues | 21 | 15 | 9 | 3 | **48** |
| Niveau A1 | 20 | 13 | 8 | 3 | **44** |
| Accompagnement vers l'Europe | 20 | 17 | 5 | 5 | **47** |
| Fiche pays Allemagne | 19 | 18 | 4 | 4 | **45** |
| Éviter les arnaques | 18 | 15 | 3 | 5 | **41** |
| Agir | 17 | 10 | 3 | 4 | **34** |
| Faire un don | 24 | 13 | 4 | 3 | **44** |
| Candidater | 24 | 11 | 4 | 6 | **45** |
| Mentions légales | 18 | 16 | 2 | 0 | **36** |
| Politique de confidentialité | 18 | 17 | 2 | 2 | **39** |
| Pages historiques (ensemble) | 9 | 8 | 3 | 1 | **21** |
| Le groupe | 7 | 7 | 3 | 1 | **18** |
| Structure | 8 | 5 | 2 | 2 | **17** |
| Pôles | 13 | 10 | 4 | 3 | **30** |
| Tarifs | 3 | 4 | 1 | 0 | **8** |
| Méthode | 11 | 13 | 3 | 2 | **29** |
| Fondateurs | 15 | 12 | 3 | 0 | **30** |
| Contact | 5 | 3 | 1 | 0 | **9** |
| VKI Business | 12 | 8 | 3 | 1 | **24** |

Les notes jugent chaque page telle qu'elle se présente. La Galerie et Notre impact arrivent en tête parce qu'elles portent les deux meilleurs matériaux du site (les vraies photos, la carte), malgré un problème bloquant chacune (GAL-01, IMP-01). Les pages historiques ferment la marche.

## Sommaire

- **Partie A — Jugement de design**
  - A.1 Le site entier
  - A.2 Problèmes transversaux
  - A.3 Page par page
- **Partie B — Audit technique**
  - B.1 Tokens et design system
  - B.2 États
  - B.3 Accessibilité
  - B.4 Responsive
  - B.5 Performance
  - B.6 Animations
  - B.7 Mise en ligne, référencement, données personnelles
- **Synthèse**
  1. Les 5 problèmes les plus graves
  2. Ce qui fonctionne bien
  3. Recommandation de direction
  4. Ce qui n'a pas pu être vérifié
- **Annexes**
  - A. Contenus provisoires et fictifs
  - B. Méthode

## Partie A — Jugement de design

### A.1 Le site entier

**Première impression.** C'est propre, sérieux et cohérent sur les pages WAHHF : la grille est stable, les espacements sont réguliers, rien ne casse à 390 px sur les routes principales et le thème sombre est soigné. Mais le site n'est pas mémorable. De mémoire, on retient « vert, or, crème, une serif fine, beaucoup de cartes arrondies ». Le premier écran (le « hero », nom employé dans tout le rapport) montre un homme flou au micro (la miniature de la vidéo YouTube) sous un voile vert de 60 à 88 %, avec un titre que n'importe quelle ONG pourrait signer. Les deux éléments qui marquent vraiment, la carte Cameroun → Europe et les vraies photos de l'Open Day de Yaoundé, arrivent en 9e et en 12e position sur une page de 16,5 écrans (25 écrans sur téléphone). Puis la lecture fait chuter la confiance : « (TODO : confirmer) », « Valeur d'exemple », « Témoignage d'exemple », « (Simulé) ». Enfin, un clic sur « Archives Groupe IROKO », présent dans le footer de chaque page, fait basculer dans un autre site : titres en capitales noires, clés de traduction brutes, devis de sonorisation.

**Identité : test du nom retiré (§3).** Le test **échoue** sur l'accueil, Qui sommes-nous, Partenaires et Agir ; Nos actions et Notre impact ne le réussissent qu'en partie (vraies photos, carte des régions). Il **réussit par le texte** sur Mobilité & Langues, l'Académie et les fiches pays, mais échoue par l'image. « Éviter les arnaques » échoue faute de forme propre, alors que son sujet s'y prête le mieux.

- **Sans le nom, l'accueil ne dit presque rien.** Il reste « Autonomiser la jeunesse, transformer les communautés », 4 chiffres, 6 domaines génériques, des témoignages et un appel au don : on devine « une ONG africaine », sans savoir laquelle.
- **La vraie spécificité arrive tard.** Elle tient en une phrase : des cours d'allemand gratuits de A1 à C1 et une orientation vérifiée, sans intermédiaire payant, vers 10 pays européens. Elle n'apparaît qu'en 5e section, rangée comme « Domaine 06 ».
- **Le lien Cameroun–Allemagne n'est dit qu'en texte**, dans un sur-titre en capitales. Rien n'est allemand à l'image. Il n'y a pas de version allemande, ni aucune personne ou adresse en Allemagne.
- **L'identité se dilue dans IROKO** : 22 mentions sur l'accueil, le menu et le footer, et la vidéo de la section 6 est la bande démo (« showreel ») du groupe.
- **Le nom n'est pas stable.** Le site dit « [forme longue retirée au lot 12 : fausse selon la fondation] ». Les kakémonos photographiés à l'Open Day portent « Watio Hearts Humanitarian Foundation » et le slogan « Sowing hope, harvesting change ».
- **Tests d'échange et « autre modèle » (§4.2) : échec.**
  - Avec Playfair à la place de Fraunces et un autre blanc cassé, personne ne verrait la différence.
  - Une consigne « site d'ONG élégant vert et or » donnée à un générateur d'interfaces par IA produirait cette page presque à l'identique : pilule flottante, sur-titres or en capitales, serif fine, bande de chiffres, cartes photo en 3 × 2, témoignages, frise alternée, bande d'appel en dégradé, footer en 5 colonnes.

Seuls cinq éléments ne pourraient exister que pour WAHHF :

1. la carte des 10 régions du Cameroun, avec l'arc « Depuis le Cameroun » vers l'Europe ;
2. la frise A1 → C1 et le test de niveau ;
3. les fiches pays reliées aux portails officiels ;
4. la voix anti-arnaque (« Nous ne vendons ni visa ni emploi », « Un projet d'études ne s'achète pas ») ;
5. les vraies photos de l'Open Day.

**Signes d'une interface générée (« tells », §4.1).** La plupart des signes listés par le référentiel sont présents en même temps :

| Tell (§4.1) | Où sur le site |
|---|---|
| Fond crème + serif contrastée + accent | `#F5F1E8` + Fraunces + or `#E8A317` (`src/index.css:56`, `:64`, `:68`) sur toutes les pages claires |
| Petit label en MAJUSCULES espacées au-dessus de chaque titre | `SectionHeader.tsx:35-41` (32 usages) et chaque bandeau de page ; 154 lignes de `src` combinent capitales et interlettrage (67 hors pages historiques) |
| Filet en dégradé sous chaque titre | `SectionHeader.tsx:54-60` ; bande de don en dégradé (`Home.tsx:1169`) ; filet `#34D399` hors palette en sombre |
| Marqueurs 01/02/03 sur un contenu qui n'est pas une séquence | « DOMAINE / 01 / 06 » et filigrane (`DomainCard.tsx:38`, `:45-50`) ; chiffres 01-04, principes 01-05, Agir 01-03, actualités ; « VALEUR 01 », « PÔLE 01 » ; menu mobile « 1. … 6. » (`Navbar.tsx:611-690`) |
| Flèche « ↗ » ou « → » sur chaque bouton, lien et carte | `Buttons.tsx:41-45` ; 30 occurrences d'`ArrowUpRight` dans 10 fichiers ; « → Candidater », « Transparence financière → » |
| Métadonnées « A · B · C » | sur-titre du hero (`fr.json:34`) ; « Aucun frais de dossier · Aucune promesse commerciale · Information vérifiée » (`Home.tsx:530`) ; « Pays #01 · Voir la fiche » |
| Libellés « MOT — fragment » | « Académie de langues — Allemand A1 à C1 », « Groupe IROKO — Holding & 10 Pôles d'Expertise » |
| Contenu découpé en cartes identiques | chiffres, domaines, principes, actualités, partenaires, valeurs, pôles, corps d'article, newsletter, bande d'appel : même carte 24 px, bordure + ombre |
| `rounded-2xl` / 24 px partout | `rounded-[24px]` ×61, `rounded-2xl` ×40, `rounded-xl` ×29, `rounded-full` ×134 dans `src` |
| Ombres ET bordures mêlées | `DomainCard.tsx:20` (bordure + ombre + ombre au survol + translation) ; 6 ombres arbitraires différentes |
| Hover animé sur chaque carte | `DomainCard.tsx:20`, `:33`, `:65` ; cartes d'actualités et de partenaires |
| Verre dépoli sans raison | header en pilule `bg-white/95 backdrop-blur-md` (`Navbar.tsx:207`) ; badges `backdrop-blur-sm` |
| Gabarit hero → chiffres → grille → témoignages → appel à l'action | `Home.tsx`, 15 sections dans l'ordre du gabarit d'ONG |
| Gros chiffres + petit label | « 1 250+ / 6 / 10 / 10 » animés, dont le premier « (TODO : confirmer) » |
| Empilement des effets « Awwwards » sans idée directrice | rideau, titre masqué, zoom et parallaxe, vidéo de fond, SplitText, compteurs, galerie épinglée, agrandissement, frise dessinée, boutons magnétiques, Lenis, barre de progression, transitions de page |
| Fondu + glissement sur chaque section | chaque `SectionHeader` (`SectionHeader.tsx:28-31`) et les `StaggerGroup` |
| Un seul mot du titre en couleur ou en dégradé ; violet → orange | pages historiques : « CONTACTEZ IROKO », « NOS FORMULES & tarifs » (`Contact.tsx:61`, `Tarifs.tsx:87`) ; `#531FF5 → #FF8500` |
| Slogans creux et labels décoratifs | « Autonomiser la jeunesse, transformer les communautés », « Chaque geste renforce un parcours de vie », « Six piliers pour bâtir l'autonomie » ; « Identité & Lien IROKO », « Soutien Financier Direct » |

**Formes et composants.** Une seule forme sert à tout : une carte blanche à 24 px, avec une bordure à 10-12 %, une ombre douce, un chiffre en filigrane et une flèche dans un rond. Elle porte indifféremment un chiffre, un domaine, une valeur, un partenaire sans logo, une actualité, un formulaire ou un texte légal. La forme est plaquée sur le contenu au lieu d'être conçue pour lui (§5.3).

- **Pas de système de rayons ni de profondeur.** On compte 9 valeurs de rayon et 6 ombres arbitraires. 37 des 53 éléments ombrés ont aussi une bordure.
- **Les boutons forment une bonne base**, avec une hiérarchie claire :
  - une pilule verte avec un rond or et une flèche qui pivote ;
  - une pilule rouge à cœur pour le don ;
  - un contour pour l'action secondaire.
- **Mais le bouton principal du hero est forcé en or** par des surcharges `!bg-` : il y en a 13 dans le projet, et elles effacent le rond de la flèche, or sur or.
- **Les icônes Lucide sont posées dans des carrés arrondis colorés**, façon « tuile de fonctionnalité ».
- **Les numéros en filigrane entrent en collision** avec les boutons flèche (domaines) et avec les extraits (actualités).
- **Les exceptions sont réussies.** Les cartes pays (code ISO dans un rond, nom, flèche), la carte du Cameroun, la mini-carte Europe et la galerie ont une forme pensée pour leur contenu.

**Structure et parcours (mission → don, candidature, partenariat, contact).** L'accueil compte 15 sections, dans l'ordre du gabarit, rallongé :

1. hero ;
2. mission ;
3. chiffres ;
4. 6 domaines ;
5. Mobilité & Langues ;
6. vidéo ;
7. approche ;
8. frise ;
9. présence ;
10. témoignages ;
11. actualités ;
12. en images ;
13. partenaires ;
14. agir ;
15. newsletter et bande de don.

Il est redondant à plusieurs endroits :

- « 6 / 10 / 10 » revient dans les chiffres, les domaines, Mobilité et Présence ;
- deux sections d'images se suivent presque ;
- trois appels à agir s'enchaînent.

Les parcours se présentent ainsi :

| Visiteur | Ce qu'il voit | Ce qui se passe |
|---|---|---|
| Donateur | 4 entrées vers le don, mais deux couleurs de bouton pour le même verbe (rouge dans le header, or dans le hero) | Le formulaire est « (Simulé) » et affiche un texte de développeur (« prêt pour intégration Stripe… via Symfony ») : aucun don n'est possible |
| Jeune candidat | Aucun bouton « Candidater » dans le hero ni dans le header ordinateur, seulement un petit lien au fond du méga-menu | La candidature est enregistrée dans le navigateur du visiteur (`localStorage`) et n'est jamais envoyée |
| Partenaire | Le lien « Devenir partenaire » ouvre le formulaire en mode bénévole | Le formulaire n'envoie rien, mais affiche un succès |
| Contact | Le menu n'a pas d'entrée Contact | `/contact` est la page d'un autre métier (devis événementiel), avec des clés brutes |
| Lettre d'information | Un champ e-mail, sans information sur l'usage de l'adresse | Rien n'est envoyé, mais un succès s'affiche |

Il manque aussi :

- le statut légal, les adresses et les numéros d'enregistrement ;
- une gouvernance nommée, des rapports et de vrais chiffres ;
- un Impressum pour l'Allemagne ;
- une vraie page 404 ;
- tout contenu en allemand.

Deux boucles égarent le visiteur :

- « Découvrir ce domaine » mène à une page qui répète les mêmes cartes ;
- « Voir les actions » d'une région passe un paramètre que la page ignore.

**Typographie.** Le couple Fraunces 400 (titres) et DM Sans (texte) est lisible et bien chargé : polices auto-hébergées, 2 fichiers préchargés. Mais c'est le couple par défaut des sites générés, et il échoue au test d'échange.

- **L'échelle est timide pour une vitrine (§5.2).**
  - Le h1 plafonne à 76 px (`clamp(2.35rem, 5.4vw, 4.75rem)`, interligne 1,08) et le h2 à 50 px, soit un ratio de 1,53.
  - Tout est en graisse 400, et l'on compte 8 `clamp()` différents pour le même rôle de h1.
  - Les 13 h2 de l'accueil ont la même taille, le même sur-titre et le même filet.
- **La hiérarchie repose sur les sur-titres en capitales**, dont certains affichent des TODO.
- **49 textes font 9 à 11 px** (badges, sous-titre du logo, « Pays #01 · Voir la fiche ») : trop petit au soleil sur un Android.
- **Les intertitres du footer passent en Fraunces capitales de 12 px**, à cause de la règle globale `h1, h2, h3 { serif }`.
- **La casse de titre est à l'anglaise** (« Soutien Financier Direct », « Programme Phare ») et les apostrophes droites et typographiques sont mélangées.
- **Les drapeaux emoji s'affichent en lettres** (« DE ») sous Windows.
- **Les pages historiques suivent une troisième charte** : capitales serif grasses et un mot en dégradé.

**Couleurs.** La palette est disciplinée sur les pages WAHHF : 4 hex couvrent 89 % des 1 531 couleurs codées en dur. Les contrastes de texte ont été corrigés : or texte `#8A5A00` à 5,26:1 sur la crème, or clair `#F2B544` à 6,64:1 sur le vert. Le thème sombre garde la hiérarchie.

- **L'origine est un gabarit** (§4.1) : la crème `#F5F1E8` est presque le `#F4F1EA` du tell.
- **Le vert bouteille `#0F3D2E` ne vient ni du logo ni du drapeau camerounais.** Il évoque plutôt une banque privée.
- **L'histoire n'est pas racontée.** Le rouge et l'or sont communs aux drapeaux camerounais et allemand et au logo, mais le site ne s'en sert pas.
- **Il y a trois accents sur le même fond clair** : rouge du don, or et vert. Le rouge, censé être réservé au don, sert aussi d'alerte, de lien actif et d'état sélectionné.
- **L'anneau de focus or est à 1,92:1** sur la crème, sous le seuil de 3:1.
- **Les pages historiques ajoutent du violet `#531FF5` et de l'orange `#FF8500`.**

**Espace.** La respiration verticale est généreuse et régulière (`py-20` à `py-28`), la grille de 12 colonnes est propre, et il n'y a aucun débordement sur les pages WAHHF.

- **Le padding est identique partout** : chaque section a la même respiration, donc aucune n'est mise en avant.
- **La marge gauche saute d'une section à l'autre.** On compte 4 largeurs de conteneur (`max-w-4xl`, `5xl`, `6xl` et `7xl`) : par exemple, le hero des pages intérieures est en 6xl et leurs sections en 7xl, la page don passe de 5xl à 6xl.
- **Des sections centrées cassent l'alignement à gauche** : vidéo, frise, témoignages, Agir.
- **La galerie épinglée laisse environ 40 % de l'écran vide** à 1440.
- **Les 4 cartes de chiffres empilées occupent plus d'un écran** de téléphone.
- **Des éléments se chevauchent ou masquent du contenu.**
  - À 1440, les pastilles sociales du footer chevauchent « Archives Groupe IROKO ».
  - À 390, la bulle WhatsApp masque des fins de ligne et des boutons.

**Images.** Deux familles d'images incompatibles se côtoient.

- **Les images générées par IA** (Santé, Entrepreneuriat, Environnement) ressemblent à de la banque d'images : lumière dorée, netteté parfaite, mise en scène. La salle de classe « Willkommen in der Klasse » est réutilisée pour une actualité, un témoignage et la vignette vidéo.
- **Les vraies photos de l'Open Day** (jeunes en t-shirts WAHHF, kakémonos) sont le meilleur matériau du site. Mais ce sont des captures d'environ 1 000 px, avec un ciel blanc et de la compression.
- **Le mélange dessert les deux.** Dans la même grille, les images IA paraissent fausses et les vraies paraissent ratées.
- **Les témoignages sont illustrés par des images IA.** Les 3 de l'accueil le sont, ce qui est grave pour une fondation qui met en garde contre les fausses promesses.
- **`/fondateurs` associe des portraits Unsplash à des noms réels.**
- **L'image de partage est le logo.**
- **Ce qui est bien fait :** la galerie (albums, lieu, date, visionneuse accessible) et le format imposé des cartes (16:10, `object-cover`).

**Contenu.** La voix est forte et juste sur Mobilité & Langues et sur « Éviter les arnaques ». Le ton est digne (« jamais comme un client »). Ailleurs, les titres sont des slogans creux et les boutons sont vagues (« Soutenir nos actions », « Découvrir nos programmes »). Les contenus provisoires sont partout (liste complète en annexe A) :

- **TODO :** 108 occurrences lisibles à l'écran sur 27 des 28 routes, plus 35 mentions « à confirmer / à renseigner ».
- **Témoignages et chiffres :** 5 témoignages inventés, et un chiffre « 1 250+ » marqué « Valeur d'exemple ».
- **Dates :** des dates suivies de « (TODO) », et des sessions de cours « à venir » déjà passées au 15 novembre 2026 (du 14 septembre au 2 novembre).
- **Don :** il est marqué « (Simulé) », avec un texte de développeur.
- **Pages légales et traduction :** les mentions légales sont vides, et la version anglaise est à moitié en français.

Deux phrases reviennent trop souvent : « 100 % gratuit » revient 16 fois dans le code (hors commentaires), dont 7 fois suivi de « financé par IROKO et nos donateurs », « 10 pays » 5 fois sur l'accueil. Sur la page « Éviter les arnaques », des coches vertes précèdent les mises en garde, ce qui dit le contraire du texte.

**Note du site entier : 47/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 22/40 | L'exécution est propre : palette tenue, rythme régulier, thème sombre soigné, cartes géographiques réussies. Mais l'ensemble est un gabarit (crème, serif, vert et or, cartes numérotées), sans système de rayons ni de profondeur, avec une marge gauche qui saute. Images IA et vraies photos se côtoient sans traitement commun. Le hero est noyé sous un voile vert. Et les pages historiques, liées depuis chaque footer, ont un autre design, cassé. |
| Utilisabilité | 14/30 | Le socle est sérieux : clavier et fenêtres bien gérés, mode « réduire les animations » complet, aucun débordement sur les pages WAHHF, ordinateur à 96-98 sur Lighthouse. Mais aucun formulaire n'aboutit, Candidater et Contact manquent au menu ordinateur, et le contenu principal met 5 s à s'afficher sur mobile (LCP) pour un public sur Android en 3G/4G. S'y ajoutent l'anneau de focus à 1,9:1, des cibles tactiles sous 44 px, un accueil de 25 écrans sur téléphone et une version anglaise à moitié française. |
| Créativité | 8/20 | Il y a une vraie idée : la passerelle (carte des 10 régions, arc vers l'Europe). Mais elle est cachée en 9e section, en demi-largeur. Le reste est un empilement d'effets bien codés qui ne racontent rien de la passerelle Cameroun–Allemagne. Aucune signature n'est repérable à un endroit précis (§4.2). |
| Contenu | 3/10 | Le français est bon, et le guide anti-arnaques comme la FAQ sont réellement utiles. Mais 108 TODO visibles, 5 témoignages inventés, des chiffres d'exemple, des dates passées, un don simulé, des mentions légales vides et un nom incertain contredisent la promesse « information vérifiée ». |

Les deux regards globaux de l'audit donnaient 49 et 43, et la fiche de l'accueil 47. La note retenue se place entre les deux regards globaux. Sa seule différence avec le premier est l'utilisabilité, comptée plus bas (14 au lieu de 16), parce qu'aucune des tâches proposées ne peut aboutir.

### A.2 Problèmes transversaux (design, identité, contenu, parcours)

Ces problèmes touchent plusieurs pages à la fois. Chacun se corrige une seule fois, à la source (contenu fourni par la fondation, composant partagé ou données de `src/services/api.ts`), et non page par page. Les marqueurs TODO cités sont listés un par un dans l'annexe.

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>T-01 | 27 des 28 routes : accueil, pages institutionnelles, Don, Candidater, Agir, Académie, Actualités, pages légales, footer | `src/components/Footer.tsx:194`<br>`src/data/regions.ts:22-23`<br>`src/pages/DonatePage.tsx:11-23` | On lit 108 « TODO » à l'écran sur 27 des 28 routes (texte affiché mesuré à 1440, page défilée), plus 35 mentions « à confirmer / à renseigner… ». Le code en contient 153, commentaires compris (52 dans api.ts, 27 dans regions.ts). On les trouve dans des sur-titres or, des titres (« Publication des rapports annuels (TODO) »), le panneau d'impact du don (« (EXEMPLES — TODO) »), les options de candidature, l'adresse du footer de chaque page et les libellés cachés (aria-label) des réseaux sociaux, que lisent les lecteurs d'écran. | Le donateur ou l'institution lit un brouillon au moment précis où on lui demande de l'argent ou ses coordonnées. La meta description de /mentions-legales reprend un TODO, que Google peut afficher dans ses résultats. | Pour chaque TODO, remplacer par le contenu réel (à fournir par la fondation). En attendant, masquer le bloc plutôt qu'afficher sa promesse (à valider) ; liste complète : voir annexe. Ajouter un test de rendu (Vitest ou script de captures) qui échoue si « TODO » apparaît dans le texte affiché, un aria-label ou une option de select ; un grep brut sur dist/*.js tomberait aussi sur du code de librairie. |
| **bloquant**<br>T-02 | Accueil (Témoignages), /mobilite-langues | `src/pages/Home.tsx:72-97`<br>`src/pages/Home.tsx:841`<br>`src/pages/MobilityHub.tsx:271-307` | Les 5 témoignages sont inventés. Sur l'accueil, Aline M., Samuel N. et Dr Clarisse E. sont tous trois illustrés par des images générées (WAHHF_IMAGES.education, .entrepreneurship, .health) dont l'alt donne le prénom ; sur /mobilite-langues, Boris K. et Raïssa T. Les sous-titres les présentent comme des « témoignages d'exemple marqués TODO », à côté d'une frise datée « 2021 (TODO) » (api.ts:882-894). | Aujourd'hui, c'est un brouillon visible. Le jour où quelqu'un efface les mentions TODO en gardant les textes, cela devient une tromperie, avec une fausse photo qu'un lecteur d'écran présente comme « Aline M. ». Pour une fondation dont le message est « méfiez-vous des fausses promesses », c'est le contenu le plus dangereux pour la confiance des donateurs. | Retirer les deux sections tant qu'il n'existe aucun témoignage réel (à valider), puis remplacer par le contenu réel (à fournir par la fondation) : 2 ou 3 citations avec accord écrit, prénom, ville et programme, avec une vraie photo ou sans photo. Une citation tirée de la vidéo de l'Open Day vaut mieux que trois inventées ; pour la frise, voir annexe. |
| **bloquant**<br>T-03 | Accueil (dernières actions), /actualites, article | `src/services/api.ts:837-880`<br>`src/locales/fr.json:112`<br>`src/data/gallery.ts:60` | Les 3 actualités (ouverture des candidatures, journées de prévention sanitaire, reboisement) sont des exemples non confirmés. Elles sont datées « 12 Mai 2026 (TODO) », « 28 Avril 2026 (TODO) » et « 10 Avril 2026 (TODO) », illustrées par les images générées education, health et environment, et rédigées comme des comptes rendus. L'Open Day réel du 25 avril 2026 n'a pas d'article (voir ACTU-01). | Le site raconte à des donateurs des actions de terrain que rien n'atteste, pendant que l'action réelle et ses vraies photos restent en bas de page. Au 15 novembre 2026, la plus récente « actualité » a 6 mois. | Remplacer par le contenu réel (à fournir par la fondation), en commençant par un article sur l'Open Day du 25 avril 2026 : date, lieu, nombre de participants, 3 vraies photos et lien vers l'album. Retirer les actualités santé et reboisement non confirmées (à valider). Avec 1 ou 2 articles seulement, remplacer la grille de 3 par un article à la une. |
| **bloquant**<br>T-04 | Accueil (domaines, vidéo, témoignages, actualités), /nos-actions, /actualites | `src/services/api.ts:183-213`<br>`src/pages/Home.tsx:562-565`<br>`src/services/api.ts:844-871` | Santé, Entrepreneuriat et Environnement sont illustrés par des images générées (lumière dorée, enseigne au pseudo-mot « HUBUK »), dans la même grille que les vraies photos de l'Open Day. La salle de classe « Willkommen in der Klasse! » sert 3 fois : vignette de la vidéo de la section 6, qui ouvre en fait la bande démo du groupe IROKO (alt « Aperçu vidéo WAHHF Foundation »), témoignage et actualité. Le dispensaire sert lui aussi 3 fois (domaine Santé, témoignage, actualité). | Ces images sont présentées comme du reportage : elles suggèrent des cours et des campagnes de santé qui n'ont peut-être pas eu lieu. À côté d'elles, qui ressemblent à de la banque d'images, les vraies photos (captures d'environ 1 000 px) paraissent ratées. | Une image par usage, et uniquement des photos réelles. Pour Environnement, prendre l'aperçu de la pépinière (`src/assets/gallery/video-pepiniere-poster.webp`, gallery.ts:122) ; pour un domaine sans photo, une carte typographique (titre et 2 programmes). Obtenir les originaux du photographe, prévoir un reportage à la prochaine session, et retirer les images générées (à valider) ou au moins les marquer « Illustration ». |
| **bloquant**<br>T-05 | /mobilite-langues/academie, fiches de niveau (/academie/a1…), /actualites et article | `src/services/api.ts:361-436`<br>`src/services/api.ts:262-346`<br>`src/components/wahhf/CourseCard.tsx:70-76` | Au 15 novembre 2026, 6 des 7 sessions du « calendrier des prochaines sessions » ont déjà commencé (14 et 21 septembre, 5, 12 et 19 octobre, 2 novembre). Elles affichent pourtant toujours des « places disponibles » ; seule celle du 11 janvier 2027 est encore à venir. La fiche A1 annonce « Prochaine session : Septembre 2026 » (A2 et B1 : « Octobre 2026 »), et l'actualité « Ouverture des candidatures » du 12 mai est dépassée. | Un jeune s'inscrit à une session commencée depuis deux mois, ou conclut que le programme est abandonné. Les dates sont saisies comme du texte libre (« 14 Septembre 2026 (TODO) ») et jamais comparées à la date du jour : le problème reviendra à chaque rentrée. | Remplacer par le calendrier réel (à fournir par la fondation), stocké en dates ISO et formaté avec Intl.DateTimeFormat. Masquer automatiquement les sessions passées (à valider). Sans date confirmée, afficher « Prochaines cohortes annoncées en [mois] » avec une inscription à une alerte WhatsApp ou e-mail. |
| **bloquant**<br>T-06 | Tout le site : titres d'onglet, footer, carte Mission de l'accueil, Qui sommes-nous, mentions légales, JSON-LD | `src/components/wahhf/SEO.tsx:13`<br>`src/components/Footer.tsx:45`<br>`src/pages/TransversalPages.tsx:752` | Le site développe WAHHF en « [forme longue retirée au lot 12 : fausse selon la fondation] » : 14 occurrences dans src et index.html, dont le suffixe de chaque titre d'onglet, le footer et le copyright, le sur-titre de Qui sommes-nous, l'éditeur des mentions légales et le JSON-LD (index.html:61). Les kakémonos photographiés à l'Open Day portent « Watio Hearts Humanitarian Foundation » et le slogan « Sowing hope, harvesting change », absent du site. « Watio » est aussi le nom de l'un des deux co-fondateurs présentés sur /fondateurs (i18n.ts:61). | Le nom légal conditionne les reçus fiscaux, les virements et la recherche dans un registre : deux noms développés font douter de l'entité. « [forme longue] » est en plus agrammatical pour un lecteur anglophone ou allemand, et aucune identité visuelle ne tient sur un nom non fixé. | Faire trancher le nom légal par écrit par la fondation : c'est au client de décider. Le lire ensuite partout depuis une seule source : la clé brand.fullName existe déjà (fr.json:4) mais le code la contourne. En attendant, n'afficher que « WAHHF Foundation », et ajouter le slogan si la fondation le confirme (à valider). |
| **bloquant**<br>T-07 | Footer de chaque page → /le-groupe, /structure, /poles, /tarifs, /methode, /fondateurs, /contact, /vkibusiness | `src/components/Footer.tsx:115`<br>`src/App.tsx:86-96`<br>`public/robots.txt:2` | Les 8 pages historiques du groupe IROKO (événementiel, holding, devis, tarifs) sont toujours en ligne, dont 7 sous l'en-tête WAHHF (/vkibusiness a le sien). Le lien « Archives Groupe IROKO » du footer mène à /le-groupe, d'où un bouton mène à /contact ; les six autres routes restent ouvertes à qui connaît l'adresse, et aux moteurs de recherche. On y trouve des clés brutes (« GROUP.SYMBOLTITLE », « CONTACT.FORM.SUBMITQUOTE »), un « Devis rapide & garanti », le numéro égyptien « +20 151 594 8907 » (CTC-03), et /tarifs déborde de 57 px à 1440 (TAR-01). | Un donateur ou Google qui y arrive voit le site cassé d'une agence événementielle. /tarifs contredit les mentions légales (« Aucun service payant ») et /contact est la seule page « Contact » du site. Rien n'empêche leur indexation (voir MEL-01). | Retirer le lien du footer et rediriger chaque route vers l'équivalent WAHHF proposé dans la fiche « Pages historiques — vue d'ensemble » (A.3), et /contact vers une vraie page Contact WAHHF à créer ; en 301 chez l'hébergeur si possible (à valider). /vkibusiness ressemble à une carte de visite IROKO à QR code : corriger ses clés ou la déplacer sur le domaine IROKO plutôt que la rediriger, car des QR imprimés peuvent y pointer (à valider). |
| important<br>T-08 | Tout le site en mode EN (sélecteur FR/EN du header) | `src/i18n.ts:149`<br>`src/components/Navbar.tsx:172-174`<br>`src/components/wahhf/DisclaimerBanner.tsx:36` | En anglais, seuls le header et une partie de l'accueil et du footer changent. Sept modules de pages n'ont aucun appel t() (TransversalPages, DonatePage, ApplyPage, MobilityHub, LanguageAcademy, EuropeSupport, GalleryPage), et l'accueil garde des textes en dur (principes, cartes Agir, message de succès de la newsletter Home.tsx:1138) et des données en français (domaines, actualités, frise). De plus, `lng: 'fr'` remet le français à chaque chargement, `<html lang>` reste « fr », les aria-label sont en français, et la version anglaise n'a ni URL /en, ni hreflang, ni canonical. | Le donateur européen qui choisit EN retombe sur un formulaire de don en français, et le lecteur d'écran lit ce mélange de langues avec une seule voix (WCAG 3.1.1 et 3.1.2). On ne peut ni envoyer à un partenaire un lien vers la page anglaise, ni la faire indexer. Le défaut devient bloquant si le sélecteur EN reste visible au lancement. | À court terme, masquer EN ou l'annoncer « partiel » tant que le parcours donateur n'est pas traduit (à valider). Ensuite, extraire les textes des 7 modules et des données dans fr.json et en.json (Don, Qui sommes-nous, Transparence et Partenaires d'abord) ; lire `t('disclaimer.text')`, qui existe déjà ; retirer `lng: 'fr'` ; mettre à jour `document.documentElement.lang` en posant lang="fr" sur les blocs non traduits ; préfixer les routes par /en/ avec hreflang et canonical. Une version allemande des pages clés reste une recommandation, à envisager une fois l'anglais terminé. |
| important<br>T-09 | Header et menu mobile (toutes pages), hero de l'accueil | `src/pages/Home.tsx:241-250`<br>`src/components/Navbar.tsx:472-478`<br>`src/components/Navbar.tsx:654-691` | Le jeune candidat n'a pas de porte d'entrée : aucun « Candidater » dans le hero ni dans le header ordinateur, seulement un lien de 12 px au fond du méga-menu, et sur mobile une ligne « → Candidater (Cours & Europe — Gratuit) » cachée dans le menu. Galerie (19 photos et vidéos réelles), Partenaires et Contact manquent dans les deux menus, alors que les 3 actualités d'exemple y ont leur entrée. Sous 640 px, « Faire un don » n'est pas dans le header (Navbar.tsx:369) et arrive en dernier dans le menu : coupé en bas à 390×844, hors écran sur un écran de 640 px de haut (estimé). | Le site a deux verbes, s'inscrire et donner, mais le premier écran n'en sert qu'un, et mal : « Soutenir nos actions » (en or) et « Faire un don » (en rouge) mènent à la même page. La meilleure preuve de terrain est cachée, et sur /galerie aucune entrée du menu n'est active. | Hero : deux portes explicites, « Passer le test d'allemand gratuit » (ou « Candidater ») et « Faire un don », avec le même composant rouge que le header. Header : « Candidater » en vert et « Faire un don » en rouge ; menu mobile : les deux en boutons pleins, en tête ou fixés en bas du panneau, langues abrégées « FR » et « EN ». Ajouter au menu « Galerie » (ou « Sur le terrain », qui réunit actualités et albums) et une vraie page Contact WAHHF. |
| important<br>T-10 | Accueil (cartes des domaines, carte Présence), /nos-actions, /notre-impact | `src/services/api.ts:169-229`<br>`src/components/wahhf/PresenceSection.tsx:128-134`<br>`src/pages/TransversalPages.tsx:276-277` | « Découvrir ce domaine » mène à /nos-actions?domaine=… : la page s'ouvre en haut, sur les 6 mêmes cartes, et le bloc surligné reste plus de 1 000 px plus bas, car rien ne fait défiler la page (Layout.tsx:45 ne réagit qu'au chemin et au hash). « Voir les actions » d'une région envoie ?region=…, que la page ignore, comme le reconnaît un commentaire du code. | Le clic ne produit aucun effet visible : on croit le lien cassé, ou on retombe sur la même grille. Le seul élément propre au sujet, la carte Cameroun → Europe, promet une information qu'elle ne donne pas. | Passer les liens en ancre (/nos-actions#education) : les blocs portent déjà `id={dom.slug}`, et le gestionnaire de hash fait défiler sous l'en-tête. Retirer « Voir les actions » tant qu'aucune action n'est rattachée aux régions, ou le renommer « Voir toutes nos actions » (à valider). Écrire « Choisissez une région » au lieu de « Cliquez sur une région », qui oublie les écrans tactiles. |
| important<br>T-11 | Accueil (Chiffres clés, Présence), /notre-impact, /qui-sommes-nous, /partenaires | `src/pages/Home.tsx:364-388`<br>`src/data/regions.ts:22-23`<br>`src/pages/TransversalPages.tsx:68` | Sous le titre « Des actions concrètes et mesurables », 3 compteurs sur 4 décrivent un périmètre (6 domaines, 10 régions, 10 pays). Le 4e, « 1 250+ jeunes et familles », est une « Valeur d'exemple — TODO », animée de 0 à 1 250 en 1,8 s comme un résultat ; /notre-impact reprend les mêmes compteurs. « 10 régions couvertes », la pastille « 10 / 10 régions » et « Nos équipes interviennent dans les 10 régions » ne sont étayés nulle part : les 10 fiches de région affichent « Antenne locale : à confirmer (TODO) » et le footer ne cite que Douala et Yaoundé. | Un compteur qui monte jusqu'à 6 ne prouve aucun impact, et animer un chiffre non confirmé le rend plus crédible qu'il n'est. Une présence affirmée puis contredite par la carte de la même page se lit comme une exagération, et c'est précisément ce qu'un bailleur vérifie. | Remplacer par des résultats réels, datés et sourcés (à fournir par la fondation), en chiffres fixes : par exemple le nombre de participants à l'Open Day du 25 avril 2026 ou d'inscrits par cohorte. Retirer « 10 régions couvertes » et écrire ce qui est vrai (« Basée à Yaoundé et Douala ») tant que les relais ne sont pas confirmés (à valider). |
| important<br>T-12 | Accueil (Mobilité), /mobilite-langues, Académie, fiches pays, Candidater, article | `src/components/wahhf/CourseCard.tsx:44-46`<br>`src/services/api.ts:840-847`<br>`src/pages/LanguageAcademy.tsx:497-517` | « Gratuit » est répété jusqu'à saturation : 5 pastilles dans la frise, 7 « Gratuit · Financé par WAHHF » et 7 « Aucun frais demandé » dans les cartes de sessions, la même phrase en sous-titre et en pastille sur l'accueil, 2 fois avant le premier champ de Candidater. Le financeur varie (« WAHHF » ou « IROKO & nos donateurs ») et l'actualité annonce « A1 à B2 » contre « A1 à C1 » ailleurs. Rien ne dit ce qui reste à payer (examens Goethe, telc ou TestDaF, visa, preuve de ressources sans ordre de grandeur), ni qui enseigne, ni où. | À force d'être répété, le mot perd sa force, et les écarts sur le financeur et sur le niveau font douter du reste. Surtout, le jeune qui lit « 100 % gratuit » découvrira plus tard des frais officiels : c'est le malentendu qu'exploitent les intermédiaires que la fondation dit combattre. | Dire « gratuit » une fois par écran, avec une formule unique validée, en retirant les répétitions (à valider), et tirer les niveaux d'une seule source (A1–C1). Ajouter un encadré « Ce qui est gratuit chez WAHHF / Ce que vous paierez aux organismes officiels », avec des ordres de grandeur sourcés et datés, l'organisme, les enseignants et le lieu des cours (à fournir par la fondation). Sur Candidater, ne garder qu'un message de gratuité et qu'un des 3 indicateurs d'étape (à valider), et indiquer avant le formulaire qui peut candidater, le délai de réponse et la suite. |
| important<br>T-13 | Accueil (grille des domaines, section Mobilité), /nos-actions | `src/services/api.ts:169-244`<br>`src/locales/fr.json:66`<br>`src/pages/Home.tsx:417-534` | Six domaines sont présentés à égalité dans une grille 3×2, mais seul Mobilité & Langues a un contenu réel (académie, test de niveau, fiches pays, guide anti-arnaques, candidature). Les cinq autres renvoient à /nos-actions avec 3 puces génériques et, pour trois d'entre eux, une image générée. Le programme distinctif n'arrive qu'en 5e section de l'accueil, sous le sur-titre « Domaine 06 · Programme Phare », et les six domaines ne correspondent pas à ceux relevés sur les kakémonos (moyens de subsistance, agriculture et élevage…). | Le visiteur retient un catalogue d'ONG généraliste, pas ce que WAHHF fait vraiment, et le donateur ne sait pas ce que son don finance. C'est la cause principale de l'échec de l'accueil au test du nom retiré (§3). | Faire de Mobilité & Langues la colonne vertébrale de l'accueil, juste après le hero. Présenter les autres domaines avec leurs preuves réelles (dates, lieux, photos, à fournir par la fondation), ou les regrouper dans un bloc « Nos autres engagements, en préparation » aligné sur les domaines des kakémonos (à valider). |
| important<br>T-14 | Pages intérieures : Qui sommes-nous, Nos actions, Impact, Partenaires, Agir, Don, Candidater, Galerie, Mobilité, Académie, fiches pays, Arnaques | `src/pages/TransversalPages.tsx:42-54`<br>`src/components/wahhf/DisclaimerBanner.tsx:18-52`<br>`src/pages/DonatePage.tsx:68-81` | Toutes les pages intérieures s'ouvrent sur le même moule : bande verte sans image, sur-titre or en capitales, H1 serif, paragraphe gris, puis cartes. Don, Candidater et Agir n'ont aucune photo (leurs 2 images sont les logos). L'avertissement « Nous ne vendons ni visa ni emploi… » est recopié en version complète après le hero de 5 types de pages Mobilité (hub, académie, accompagnement, fiches pays, guides), et en version compacte sur Candidater : à 390, le hero et l'encadré (≈ 450 px) repoussent le contenu au-delà du premier écran (l'encadré seul fait plus d'un demi-écran), et sur Arnaques le lien de l'encadré renvoie à la page elle-même. | On ne sait plus sur quelle page on se trouve, et le test du nom retiré (§3) échoue sur Qui sommes-nous, Nos actions, Agir, Partenaires et Impact : aucun visage, aucun lieu. Une page de don sans visage ni terrain ne prouve rien, et la meilleure phrase du site, répétée partout, n'est plus lue. | Donner à chaque hero un contenu propre : visages de l'équipe pour Qui sommes-nous, carte pour Impact, document pour Transparence ; pour Don, Agir et Candidater, une vraie photo légère en petit format (WebP < 100 ko, ratio fixe, alt descriptif). Garder l'avertissement complet sur Candidater et Arnaques (sans lien vers la page elle-même), le réduire ailleurs à une phrase avec un lien qui déplie le reste (à valider), et lire son texte via `t('disclaimer.text')`. |
| important<br>T-15 | Accueil, Nos actions, Qui sommes-nous, Partenaires, Actualités, article, pages légales, Mobilité, Académie | `src/components/wahhf/DomainCard.tsx:20`<br>`src/pages/TransversalPages.tsx:494`<br>`src/pages/TransversalPages.tsx:816` | Presque tout est la même carte : fond blanc (ou vert), rayon de 24 px (61 occurrences de rounded-[24px]), bordure fine, ombre (6 variantes rien que sur l'accueil) et soulèvement au survol. Elle porte indifféremment chiffres, domaines, valeurs, pôles, voies, sessions, actualités, partenaires et newsletter, et même le corps de l'article et chaque paragraphe des pages légales. | C'est le tell « contenu découpé en cartes identiques » (§4.1) : tout a le même poids et l'œil ne sait pas où aller, alors que le §5.3 demande une structure propre à chaque contenu. Dans l'article (752 px utiles en 18 px) et les pages légales (760 px en 16 px), la carte laisse des lignes d'environ 80 à 90 caractères. | Réserver la carte aux collections cliquables (actualités, fiches pays). Passer valeurs, principes, pôles et voies en listes typographiques, les chiffres en grand texte sur le fond, les sessions en liste dense (niveau, date, lieu, bouton), et l'article et les pages légales en colonne de texte de 65 caractères, sans carte. |
| important<br>T-16 | Tout le site : en-têtes de section (SectionHeader), heros de Don, Candidater, Galerie, Actualités, article, pages légales | `src/components/wahhf/SectionHeader.tsx:35-60`<br>`src/pages/DonatePage.tsx:70-73`<br>`src/pages/ApplyPage.tsx:82-85` | Chaque titre de section a au-dessus un sur-titre or en capitales espacées (paramètre `kicker` obligatoire, interlettrage de 0,22 em) et en dessous un filet de 3 px en dégradé vert → or ; environ 67 lignes de code combinent capitales et interlettrage hors pages historiques. Beaucoup de sur-titres répètent le titre (« GALERIE » au-dessus de « La fondation en images »), alignent des métadonnées « A · B » ou portent un TODO (« ÉQUIPE & GOUVERNANCE (TODO : NOMS OFFICIELS À CONFIRMER) »). À 390, les badges pilules en capitales des heros Don et Candidater passent sur 2 lignes. | C'est le premier tell d'habillage du §4.1 : répété sur chaque section, il crée une seconde hiérarchie qui concurrence les titres et rend tous les blocs identiques. Les capitales espacées se lisent mal, et en thème sombre la moitié verte du filet disparaît dans le fond. | Rendre le sur-titre (paramètre `kicker`) facultatif et vide par défaut ; ne le garder que lorsqu'il informe (« Étape 2 sur 4 »), en casse de phrase et à 14 px minimum. Retirer le filet décoratif, et retirer les badges du hero ou les réduire à 2 ou 3 mots en casse de phrase (à valider). |
| important<br>T-17 | Accueil (chiffres, domaines, principes, actualités, Agir), Qui sommes-nous, Mobilité, Académie, fiches pays, Arnaques, menu mobile, footer | `src/components/wahhf/DomainCard.tsx:37-50`<br>`src/components/Navbar.tsx:611-690`<br>`src/pages/MobilityHub.tsx:62` | De grands numéros 01/02/03 en filigrane sont posés 15 fois (5 tailles, 3 opacités) sur des contenus qui ne forment pas une séquence, et passent sous les boutons (« 03 » coupé par le rond de la flèche, « Candidater » posé sur « 01 » dans les sessions, « 02 » sur l'extrait d'une actualité). S'y ajoutent « DOMAINE / 01 / 06 », « VALEUR 01 », « PÔLE 01 », « Pays #01 », « 01. Éducation » dans le footer, un menu mobile numéroté « 1. … 6. Faire un don » et « Domaine 06 / 06 », premier élément lu dans le hero Mobilité et dans sa meta description. | Tell du §4.1 : la numérotation suggère un ordre qui n'existe pas (faire un don n'est pas l'étape 6) et dévalue les vraies séquences du site. « Domaine 06 / 06 » est un classement interne qui ne dit rien à un jeune ni à un donateur, jusque dans les résultats Google. | Retirer ces numéros et filigranes (à valider) et garder un seul composant `<StepNumber>` pour les vraies suites : étapes de candidature, 4 étapes de l'accompagnement, niveaux A1→C1, jalons de la frise. Remplacer « Domaine 06 / 06 » par une information utile (« Programme gratuit · financé par le groupe IROKO et nos donateurs ») dans le hero et la description SEO, et retirer du menu la consigne « Glisser vers le haut pour fermer » (à valider). |
| important<br>T-18 | Tout le site : hero de l'accueil, Don, fiches pays hors UE, Arnaques, Académie | `src/index.css:61-71`<br>`src/pages/Home.tsx:241-244`<br>`src/pages/EuropeSupport.tsx:94` | La base crème #F5F1E8 + Fraunces + or est le tell « fond crème + serif + accent » (§4.1). Le rouge du don vient du cœur du logo et l'or de ses mains, mais le vert bouteille et la crème, qui couvrent presque toute la surface, ne viennent pas du logo. L'or sert à tout (sur-titres, filets, icônes, numéros, liens) et ne signale plus l'action (double bouton de don du hero : voir T-09). Le rouge « réservé exclusivement au don » (Buttons.tsx:124) sert aussi au badge « Hors Union européenne », à l'alerte de l'Albanie et au montant choisi ; les mises en garde de la page Arnaques portent des coches vertes. | La couleur ne signifie plus rien, alors que le §5.1 demande un accent par fond et des couleurs d'alerte séparées de la marque : le don partage la couleur de l'alerte, et une coche verte « validé » devant « Méfiez-vous… » dit le contraire du texte. Dans le seul formulaire de don, l'option choisie est signalée de trois façons (vert ou or plein, rouge plein, contour or). | Rouge plein pour la seule action « Faire un don », avec le même verbe partout ; vert pour Candidater ; or seulement sur fond vert ; décor en vert ou crème atténué ; un seul style pour l'option choisie. Créer des couleurs d'état (--color-danger, --color-warning, --color-success, --color-info) distinctes du rouge du don, avec une icône d'alerte devant chaque mise en garde. Reconstruire la base claire à partir du logo (rouge et ocre). Déplacer vers un appel final aux donateurs le bouton de don qui coupe le bloc certifications de l'Académie (LanguageAcademy.tsx:509). |
| important<br>T-19 | Tout le site : hero de l'accueil, H1 des pages internes, en-têtes de section, étapes des formulaires Don et Candidater | `src/components/wahhf/SectionHeader.tsx:45`<br>`src/pages/Home.tsx:225`<br>`src/pages/TransversalPages.tsx:47` | La hiérarchie typographique est plate : le H1 de l'accueil plafonne à 76 px (graisse 400, interligne 1,08) et les H2 de section à 50 px, soit un rapport de 1,26 seulement avec les H1 des pages internes (≈ 62 px, interligne 1,25). Le H1 prend 8 clamp() différents selon la page. Dans les formulaires, le titre d'étape (« Vos coordonnées de contact », ≈ 50 px) rivalise avec le H1 de 56 px. Ni text-balance ni espace insécable n'évitent les coupures (« Allemand A1 à / C1 », guillemet seul en fin de ligne). | En vitrine, la typographie doit porter le titre (§5.2 : grands titres à interligne 0,9-1, échelle unique) ; ici aucun moment ne domine, et le test d'échange (§4.2) échoue : remplacer Fraunces par une autre serif ne changerait rien. Un titre d'étape qui rivalise avec le H1 alourdit des formulaires qui devraient se faire oublier. | Une échelle nommée en tokens (--text-display, --text-page-title, --text-section-title, --text-meta) : taille d'affiche réservée au hero et à 1 ou 2 moments, interligne 0,95-1 et interlettrage de -0,02 em, H2 plus petits (32-40 px), titres d'étape à 20-24 px sans sur-titre ni filet. Ajouter text-balance aux titres et text-pretty aux paragraphes, et des espaces insécables (U+202F devant : ; ! ? et dans les guillemets, ainsi que dans « A1 à C1 »). Les axes SOFT et WONK de Fraunces demanderaient un fichier de police plus lourd, alors que les polices dépassent déjà le budget. |
| finition<br>T-20 | Toutes pages : boutons principaux, cartes, liens « Lire le guide » et « Consulter » | `src/components/wahhf/Buttons.tsx:41-46`<br>`src/pages/Home.tsx:244`<br>`src/pages/EuropeSupport.tsx:482-483` | Chaque bouton principal porte un rond or avec une flèche ↗ (ArrowUpRight, présente dans 10 fichiers), le signe habituel d'un lien externe, alors que ces liens restent sur le site. Les vrais liens externes (sites officiels) utilisent une autre icône et ne signalent pas qu'ils ouvrent un nouvel onglet. Le rond or qui disparaît sur les boutons forcés en or relève de TOK-02. | C'est le tell « flèche sur chaque lien » (§4.1), et il brouille un repère utile : sur un site qui apprend à reconnaître les sources officielles, le jeune ne voit plus s'il reste sur WAHHF ou s'il part ailleurs. | Réserver ↗ aux liens externes, avec la mention « nouvel onglet » pour les lecteurs d'écran, et mettre → ou rien sur les liens internes. Pour la variante or du bouton, voir TOK-02. |
| finition<br>T-21 | Tout le site : accueil, Qui sommes-nous, Impact, Partenaires, Académie, Mobilité, Actualités | `src/pages/Home.tsx:1045`<br>`src/pages/TransversalPages.tsx:75-84`<br>`src/services/api.ts:362-436` | Les titres et étiquettes suivent la casse anglaise (majuscule à chaque mot) avec « & » : « Soutien Financier Direct », « Engagement Humain », « Gratuité Totale », « Dignité & Respect », « Programme Phare », « Fondations & Communication Quotidienne », « Sources Gouvernementales & Ambassades ». Les mois prennent une majuscule (« 12 Mai 2026 », « 14 Septembre 2026 »), et apostrophes droites et typographiques se mélangent. | En français, ces majuscules sont fautives et donnent un air de texte traduit et peu relu (§5.8 : casse de phrase). | Casse de phrase partout, « et » plutôt que « & » dans les titres, mois en minuscules (le formatage Intl le fait tout seul), apostrophe typographique ’ partout dans fr.json et dans les données. |
| finition<br>T-22 | Fiches pays, /mobilite-langues/accompagnement, /mobilite-langues, Candidater, recherche | `src/pages/EuropeSupport.tsx:82-84`<br>`src/pages/MobilityHub.tsx:246`<br>`src/data/countries.ts:22` | Les drapeaux sont des emoji (🇩🇪). Sous Windows, ils s'affichent en lettres : un grand « DE » (text-5xl) à côté du H1 « S'orienter vers : Allemagne », des puces « DE Allemagne » et « LU Luxembourg » ; sur un vrai téléphone Android, l'emoji s'affiche normalement. Dans les puces, le drapeau n'est pas masqué aux lecteurs d'écran (pas d'aria-hidden), qui lisent « drapeau Allemagne Allemagne ». | Le public donateur et partenaire en Allemagne consulte souvent le site sur un PC Windows : le titre de la fiche paraît cassé et les puces ressemblent à du texte de développement. | Utiliser de petits drapeaux SVG en ligne (quelques centaines d'octets chacun), ou assumer le code pays en typographie comme le badge de CountryList, aligné avec le H1. Ajouter aria-hidden au drapeau quand le nom du pays suit. |

### A.3 Page par page

Chaque fiche suit la même grille : première impression, identité, tells IA, formes, structure et parcours, typographie, couleurs, espace, images, contenu, puis la note sur 100 et les problèmes propres à la page. Les problèmes transversaux ne sont pas répétés : la dernière ligne de chaque fiche renvoie à leurs identifiants (A.2 et partie B).

#### Accueil — `/`

**Première impression.** La page est propre, régulière et soignée : la grille est stable, les espacements constants, rien ne déborde à 390 et le thème sombre est complet. Mais on n'en retient presque rien : « vert, or, crème et beaucoup de cartes arrondies ». Le premier écran est un aplat vert où l'on devine un homme au micro, sous un slogan centré. La seule image forte, la carte Cameroun → Europe, arrive en 9e section sur 15. Et la page est très longue : 16,5 écrans à 1440, 25 sur téléphone. Elle est bien rangée, pas singulière.

**Identité (test du nom retiré, §3).** Échoué. Sans le nom, « Autonomiser la jeunesse, transformer les communautés » sur un voile vert pourrait signer n'importe quelle ONG ou fondation d'entreprise. Le lien Cameroun–Allemagne n'existe qu'en texte (sur-titre, titre de la mission). Rien de visuel n'est allemand. Les vraies photos de Yaoundé n'apparaissent qu'en vignettes de 3 cartes de domaine (section 4), puis dans l'album de l'Open Day (12e section). Le vrai différenciateur, des cours d'allemand gratuits de A1 à C1 et une orientation contre les arnaques vers 10 pays, n'arrive qu'en 5e section. Le rouge et l'or rappellent les drapeaux camerounais et allemand : c'est une bonne base, mais le vert bouteille et la crème viennent d'un gabarit, et l'ensemble est traité en « fondation premium vert et or ». Enfin, le nom lui-même n'est pas fixé (T-06).

**Tells IA (§4.1).**
- Fond crème #F5F1E8 et serif Fraunces (index.css:56 et 68).
- Hero centré de gabarit : pastille, slogan, sous-titre, 2 boutons, « Défiler pour découvrir », le tout sur une image voilée (Home.tsx:174-268).
- Sur-titre en capitales espacées et filet dégradé sur les 13 titres de section (SectionHeader.tsx:35-60).
- Cartes identiques en rayon 24 px (14 fois dans Home.tsx), toutes avec la même ombre et le même soulèvement.
- Numéros 01/02/03 en filigrane et « DOMAINE / 01 / 06 » sur des contenus qui ne forment pas une suite.
- Flèche ↗ sur chaque bouton, lien et carte.
- Métadonnées « A · B · C » (Home.tsx:530) et une quinzaine de types de pastilles arrondies.
- Tuiles d'icône colorées (Home.tsx:503, 706) et grille de 5 « valeurs » interchangeables (Home.tsx:662-692).
- Compteurs animés sur des chiffres qui ne sont pas des résultats (Home.tsx:364-388).
- Enchaînement type : hero → chiffres → grille → témoignages → actualités → partenaires → appel à l'action, plus un empilement d'effets sans idée directrice.
- Slogans creux (« Chaque geste renforce un parcours de vie ») et dégradé décoratif sur la bande finale (Home.tsx:1169).

**Formes et composants.** Un seul contenant pour tout : carte blanche, rayon 24 px, bordure verte à 10-12 %, ombre légère, soulèvement au survol. Sur fond vert, c'est la même carte avec une bordure or. Un chiffre, un principe, une actualité, un partenaire et un appel au don reçoivent donc la même boîte. Les boutons pilules (pilule verte et rond or fléché) sont cohérents et plutôt réussis. Mais la pilule sert aussi à une quinzaine de pastilles, ce qui l'use. La profondeur mêle bordures et six variantes d'ombre (T-15). Les numéros en filigrane heurtent les flèches (domaines) et les extraits (actualités). Exceptions réussies : les cartes pays (code ISO dans un rond), la carte du Cameroun et la mini-carte Europe avec l'arc « Depuis le Cameroun ».

**Structure et parcours.** L'ordre actuel : hero → mission → chiffres → 6 domaines → Mobilité & Langues → vidéo → approche → frise → présence → témoignages → actualités → en images → partenaires → agir → newsletter et bande de don → footer.
- **Don.** Le donateur a quatre entrées : le hero, la carte Agir, la bande finale et le bouton du header.
- **Candidature.** Le jeune n'a aucune entrée vers la candidature avant la bande finale (« Être accompagné gratuitement »).
- **Partenariat.** Il passe par la carte Agir « Bâtir un partenariat » et par la section Partenaires, dont les cartes sont inventées.
- **Contact.** Il n'existe que par la bulle WhatsApp et le footer.

Il manque une preuve datée en tête (l'Open Day du 25 avril 2026), la prochaine date d'inscription et un lien vers la transparence financière près du don. L'alignement alterne entre gauche et centre sans règle.

**Typographie.** Fraunces et DM Sans sont auto-hébergées et préchargées : c'est un bon point technique, mais c'est aussi un des couples les plus fréquents des sites générés. Le H1 est plafonné à 76 px (interligne 1,08, centré) et le H2 à 50 px. Ce rapport de 1,53 donne une hiérarchie plate pour une vitrine. Les 13 titres de section ont la même taille, le même sur-titre et le même filet. La mission est bien calibrée (environ 80 caractères par ligne), mais les 5 colonnes de l'Approche tombent à environ 24 caractères en 14 px (RESP-04). Bon point : les chiffres sont en tabular-nums.

**Couleurs.** Vert #0F3D2E, or #E8A317, rouge #C8102E, crème #F5F1E8, encre #1B1B18. Le rouge et l'or, communs aux deux drapeaux, sont le meilleur point d'identité, mais le vert bouteille et la crème viennent d'un gabarit (T-18). Surtout, l'or sert à tout et ne signale plus l'action, le rouge et l'or se disputent le don, et Home.tsx contient 230 couleurs hex écrites en dur. Les contrastes du texte sont corrects : or texte #8A5A00 à 5,3:1 sur crème, voile du hero à 4,76:1 au moins. Échouent seulement l'anneau de focus or (1,9:1, A11Y-01), le placeholder de la newsletter (3,23:1, ACC-06) et la bordure des champs (1,6:1, A11Y-05). En sombre, les bandes d'emphase se fondent dans le fond et la carte Présence reste blanche.

**Espace.** La grille est régulière : conteneur de 1 280 px, gouttières de 16 à 32 px, sections de 80 à 112 px. Rien n'est serré, mais tout a la même respiration : même marge, même en-tête, même grille de cartes, sans variation de densité. À 390, il faut environ 800 px pour 4 chiffres, 1 200 px pour 5 principes et 700 px pour 6 partenaires.

**Images.** Trois familles d'images ne vont pas ensemble :
- la miniature YouTube du hero, voilée et recadrée ;
- des images générées par IA (Santé, Entrepreneuriat, Environnement, et la salle de classe « Willkommen in der Klasse! », réutilisée pour la vignette vidéo, un témoignage et une actualité) ;
- les vraies photos de l'Open Day, joyeuses, en t-shirts WAHHF, mais ce sont des captures TikTok d'environ 1 000 px, parfois molles.

Côté technique, c'est propre : ratios réservés, srcset WebP, chargement différé.

**Contenu.** Le ton est sérieux et bienveillant, mais générique. Le concret existe (cours gratuits de A1 à C1, 4 étapes, 10 fiches pays, prévention des arnaques, Open Day) mais il est dilué. Sur cette page on trouve :
- 19 TODO visibles sans interaction ;
- 3 témoignages et 4 partenaires inventés ;
- un chiffre d'exemple animé ;
- le showreel d'IROKO présenté comme le film de la fondation ;
- des niveaux contradictoires ;
- une newsletter qui fait semblant d'inscrire.

« Proposer mon aide bénévole » et « Bâtir un partenariat » sont de bons libellés. « Soutenir nos actions » et « Découvrir nos programmes » sont vagues. En anglais, la moitié de la page reste en français.

**Note : 47/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 21/40 | Palette juste et exécution propre, mais gabarit, cartes uniformes, images IA et hiérarchie plate. |
| Utilisabilité | 15/30 | LCP mobile de 5 s et 269 ko de JS gzip, focus or à 1,9:1, 25 écrans de téléphone, anglais à moitié en français, aucune entrée Candidater en haut de page. Le clavier et le mode « réduire les animations » sont pris en charge, à quelques écarts près (A11Y-13, ANIM-06 à ANIM-08). |
| Créativité | 9/20 | Galerie épinglée et agrandissement bien exécutés mais génériques ; seule la carte Cameroun → Europe est une idée propre au sujet. |
| Contenu | 2/10 | TODO visibles, faux témoignages, faux partenaires, vidéo d'IROKO, nom incertain. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>ACC-01 | Accueil, section Partenaires | `src/pages/Home.tsx:99-106`<br>`src/pages/Home.tsx:995-1019` | La grille « Soutenus par IROKO Group et un réseau engagé » montre, à côté du groupe IROKO, 4 « partenaires » suivis de « (TODO) » (« Collectif Médical Camerouno-Allemand », « Réseau des Écoles & Bibliothèques Partenaires »…) et une carte générique « Donateurs & Philanthropes Engagés ». Ce sont des catégories inventées présentées comme des organisations, et toutes mènent à /partenaires. | Une institution qui cherche un partenaire cité ne le trouvera pas. Afficher un réseau inventé abîme davantage la confiance que n'en montrer aucun. | Remplacer par le contenu réel (à fournir par la fondation) : le groupe IROKO avec son logo, plus une carte « Devenir partenaire ». Retirer les 4 cartes « (TODO) » en attendant les accords signés (à valider ; voir annexe). |
| important<br>ACC-02 | Accueil, hero | `src/locales/fr.json:34-38`<br>`src/pages/Home.tsx:184-250`<br>`src/index.css:213-222` | Le titre « Autonomiser la jeunesse, transformer les communautés » pourrait signer n'importe quelle ONG, et le sur-titre présente d'abord la fondation comme « branche sociale du groupe IROKO ». L'image est une vraie image de la vidéo WAHHF (un orateur au micro), mais sous un voile vert de 60 à 88 % elle devient une tache verte ; le titre passe sur le visage et le logo incrusté est coupé au bord droit à 1440. Le bouton principal « Soutenir nos actions » mène au formulaire de don sans le dire. | Le premier écran échoue au test du nom retiré (§3) : en 3 secondes, ni le jeune Camerounais ni le donateur allemand ne comprennent l'offre ni le lien Cameroun–Allemagne. Un bouton doit dire ce qui va se passer (§5.8). | Ouvrir sur la vraie photo de groupe de l'Open Day (open-day-groupe ou open-day-rassemblement), avec un voile réduit à un dégradé sous le texte et le sujet hors de la zone de texte. Écrire une promesse concrète qui nomme le lien Cameroun–Allemagne et la gratuité sans effacer les autres domaines (formulation à choisir avec la fondation), et renommer le bouton « Faire un don » (les deux portes du hero : voir T-09). |
| important<br>ACC-03 | Accueil, page entière | `src/pages/Home.tsx:174-1190` | 15 sections plus le footer : 14 880 px à 1440 (≈ 16,5 écrans) et 21 109 px à 390 (≈ 25 écrans). Mission, Approche et Frise racontent la même histoire ; « 6 domaines / 10 régions / 10 pays » revient dans les chiffres, les domaines, la carte Mobilité et Présence ; deux sections « en images » sont à 6 sections d'écart ; Agir, la newsletter et la bande de don se suivent, et la bande mêle « Faire un don » et « Être accompagné gratuitement ». | Sur un téléphone en 3G avec une data payante, peu de visiteurs atteignent la carte (9e section) ou l'album de l'Open Day (12e). Tout a le même poids, donc rien ne ressort. | Viser environ 8 sections : hero, Mobilité & Langues avec Candidater, preuves en images (photos et film WAHHF réunis), domaines, carte de présence, chiffres réels datés, un seul bloc Agir avec la newsletter, footer. Déplacer Approche et Frise vers /qui-sommes-nous et supprimer la bande de don finale, en gardant un lien vers les actualités (à valider). |
| important<br>ACC-04 | Accueil, film de présentation | `src/pages/Home.tsx:562-586`<br>`src/pages/Home.tsx:617-642`<br>`src/config/heroVideo.ts:20` | « Regarder le film de présentation » ouvre le showreel du groupe IROKO (IROKO-Showreel-2026, fichier Cloudinary brut, sans f_auto ni q_auto), sous le titre « … (TODO : vidéo dédiée WAHHF à confirmer) ». La fenêtre reste un cadre noir jusqu'à la lecture (pas de poster) et n'affiche rien si la vidéo ne se charge pas. La vraie vidéo WAHHF (YouTube, 70 s) ne sert que de fond muet sous le voile du hero, et seulement sur ordinateur non tactile. | Le visiteur qui clique pour comprendre la fondation voit le film de son mécène, et l'atout le plus authentique reste invisible sur téléphone. Un cadre noir sans message ressemble à une panne (§5.5). | Faire de la vidéo WAHHF le film à la demande : vignette tirée de la vidéo, durée et poids affichés, sous-titres FR et EN, et message « La vidéo n'a pas pu se charger » en cas d'erreur. Déplacer le showreel vers /partenaires ou le retirer (à valider) ; s'il reste, ajouter f_auto,q_auto à son URL. |
| important<br>ACC-05 | Accueil, place du groupe IROKO et argument « 100 % des dons » | `src/locales/fr.json:34, 68, 133`<br>`src/pages/Home.tsx:320-330`<br>`src/components/WhatsAppButton.tsx:7` | Le code de l'accueil, du menu et du footer cite IROKO 22 fois, dès le sur-titre du hero. L'argument le plus fort pour un donateur (IROKO paie les frais de structure, donc 100 % des dons vont au terrain) est éclaté entre la carte Mission, la section Mobilité et la bande finale, et il n'est jamais prouvé : ni montant, ni exemple, ni lien vers /transparence près des boutons de don (le seul est en bas du footer). Le seul numéro affiché pour la fondation est celui de la carte de visite IROKO (VkiBusiness.tsx:37). | Pour un donateur européen, « branche sociale d'un groupe » pose la question de l'indépendance, puis celle-ci : « si IROKO paie tout, pourquoi donner ? ». Une promesse « 100 % » sans preuve fragilise la confiance au lieu de la créer. | Un seul bloc « Qui finance quoi » près du bouton de don, par exemple « Le groupe IROKO prend en charge nos frais de fonctionnement : votre don finance les cours et le terrain » (le chiffre « 100 % » seulement une fois les comptes publiés, voir DON-03), avec un lien « Voir nos comptes » vers /transparence et 2 ou 3 équivalences chiffrées (à fournir par la fondation). Retirer IROKO du sur-titre du hero (à valider) et donner à la fondation un numéro propre. |
| important<br>ACC-06 | Accueil, lettre d'information | `src/pages/Home.tsx:1141-1163` | Le champ e-mail n'a pas de libellé visible : le label est masqué (sr-only), et le placeholder, seul indice visible, disparaît à la saisie et n'atteint que 3,23:1 sur le fond crème du champ (3,91:1 en sombre). Le message de succès est écrit en dur en français (voir T-08). | Le §5.6 demande un libellé visible pour chaque champ, et un placeholder qui porte une information doit atteindre 4,5:1 (WCAG 1.4.3). C'est le formulaire des donateurs restés en Europe. | Afficher « Votre adresse e-mail » au-dessus du champ et un placeholder d'exemple (« nom@exemple.org ») à 4,5:1 au moins, via un token appliqué à tous les placeholders du site. La traduction du message de succès, le focus après l'envoi, l'autocomplete et l'information RGPD relèvent de T-08, A11Y-03, ETA-04 et MEL-04. |
| important<br>ACC-07 | Accueil, image du hero sur téléphone | `src/pages/Home.tsx:186-196`<br>`src/config/heroVideo.ts:54-59`<br>`index.html:45-54` | Sous 768 px, la vidéo n'est jamais chargée : l'image d'attente 16:9 (1280×720) forme tout le hero. Recadrée en portrait (object-cover centré, sans `<picture>`), elle ne montre plus qu'environ 26 % de l'image, un fragment de visage derrière le titre. Un téléphone de densité 2 à 2,75 reçoit la version de 960 px (15 ko), agrandie environ 4,5 fois, donc floue. | C'est le premier écran du public principal (§5.3), et il montre un recadrage accidentel au lieu d'un sujet choisi. Le poids est excellent ; c'est le cadrage qui manque. | Ajouter une source portrait en 2 largeurs (environ 720 et 1080 px, WebP) via `<picture><source media="(max-width: 767px)">`, et la précharger avec l'attribut media dans index.html. La tirer d'une vraie photo de l'Open Day recadrée sur un groupe de jeunes. |
| important<br>ACC-08 | Accueil, hero à 390 px | `src/pages/Home.tsx:177`<br>`src/pages/Home.tsx:209-219`<br>`src/pages/Home.tsx:255-264` | Le sur-titre occupe 3 lignes de capitales espacées dans une pastille. L'indication « Défiler pour découvrir » (en absolute left-1/2) est limitée à la moitié de l'écran : elle tient sur 2 lignes calées à gauche sous une flèche centrée, à 33 px du bouton « Découvrir nos programmes ». Quand la hauteur visible passe sous environ 780 px (Safari sur iPhone 390×844, la plupart des Android avec la barre d'adresse), elle recouvre ce bouton d'environ 32 px (calculé : la capture, faite sans barre de navigateur, ne le montre pas). | Deux liens superposés sur le premier écran mobile : on peut toucher le mauvais. Le décalage se voit dès l'arrivée sur la page. | Placer l'indication dans le flux, sous les boutons, ou la masquer sous md. Sur mobile, raccourcir le sur-titre (« Fondation camerouno-allemande ») et abandonner la pastille quand il passe à la ligne (à valider). |
| finition<br>ACC-09 | Accueil, encart « Identité & Lien IROKO » | `src/pages/Home.tsx:307-347` | La carte à côté de la mission répète le logo, le nom, le lien avec IROKO, « Cameroun & Allemagne » et « 100 % Non lucratif », déjà dits dans les paragraphes voisins et dans le hero. | C'est du remplissage, à l'emplacement idéal pour une preuve. | Remplacer la carte par une photo de l'équipe à l'Open Day ou par un chiffre vérifié (contenu à fournir par la fondation, à valider). |
| finition<br>ACC-10 | Accueil, vignette du film à 390 px | `src/pages/Home.tsx:579-586` | Le bouton « Regarder le film de présentation » passe sur 2 lignes et couvre environ 85 % de la largeur d'une vignette d'environ 200 px de haut. La légende « Lecture à la demande uniquement… » est elle aussi posée sur l'image. | La vignette doit donner envie de lancer la vidéo, mais ici le bouton cache l'image. | Sous sm, ne garder qu'un bouton rond de lecture de 56 px avec un aria-label, et placer le libellé court et la légende sous la vignette. |
| finition<br>ACC-11 | Accueil, chiffres clés à 390 px | `src/pages/Home.tsx:363, 392` | Les 4 compteurs s'empilent en une colonne de cartes d'environ 180 px (p-7) : environ 800 px de défilement pour 4 nombres. | Presque un écran entier pour 4 chiffres, alors que des valeurs à comparer gagnent à être groupées (§5.3). | Passer en 2 colonnes dès la base avec p-5, à condition de raccourcir ou de masquer sous sm les notes longues (« Valeur d'exemple — TODO… », liste des 6 domaines), illisibles dans une colonne d'environ 165 px (à valider). |
| finition<br>ACC-12 | Accueil, actualités, « En images » et partenaires (390 px) | `src/pages/Home.tsx:898-905`<br>`src/pages/Home.tsx:964-971`<br>`src/pages/Home.tsx:980-993` | Sur téléphone, « Toutes les actualités », « Voir toute la galerie » et « Découvrir tous nos partenaires » passent entre le sous-titre et le contenu, et aucun lien ne suit la grille. | On invite à « tout voir » avant d'avoir rien vu, et celui qui veut la suite doit remonter. | Sous sm, placer le lien après la grille (order-last, ou un second lien sm:hidden) ; garder la position actuelle à partir de sm. |
| finition<br>ACC-13 | Accueil, vidéo de fond du hero (ordinateur) | `src/config/heroVideo.ts:5-6, 25-28` | La boucle joue la vidéo entière, générique compris (« Directed by… MDR Studio » à partir d'environ 65 s), car start et end valent null. | Toutes les 70 s, le texte du générique défile sous le voile, derrière le titre. | Si la vidéo de fond est gardée, régler end à 64 comme le propose le commentaire du fichier ; le code sait déjà couper l'extrait (HeroVideoBackground.tsx:259-261). La décision vous revient : c'est la question déjà posée sur la fin de l'extrait (end = 64). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-02, T-03, T-04, T-06, T-07, T-08, T-09, T-10, T-11, T-12, T-13, T-15, T-16, T-17, T-18, T-19, T-20, T-21, TOK-01, TOK-02, TOK-03, TOK-05, ETA-01, ETA-02, ETA-04, ETA-06, ETA-08, A11Y-01, A11Y-03, A11Y-05, A11Y-06, A11Y-07, A11Y-08, A11Y-10, A11Y-11, A11Y-12, A11Y-13, A11Y-14, RESP-01, RESP-02, RESP-03, RESP-04, RESP-05, PERF-01, PERF-02, PERF-04, PERF-06, PERF-07, PERF-08, ANIM-01, ANIM-02, ANIM-04, ANIM-05, ANIM-06, ANIM-07, ANIM-08, ANIM-10, ANIM-12, ANIM-13, MEL-01, MEL-02, MEL-03, MEL-04, MEL-05, MEL-06

#### Qui sommes-nous — `/qui-sommes-nous`

**Première impression.** Sobre et soignée, mais anonyme : un bandeau vert, un paragraphe de mission, trois cartes de valeurs, un encadré IROKO, trois cartes de « pôles ». Aucune image hormis le logo, aucun visage. Comme les quatre autres pages institutionnelles, elle suit le même moule : on en retient « un site d'ONG vert et crème », pas WAHHF.

**Identité (test du nom retiré, §3).** Échoué. Le H1 « Une fondation camerouno-allemande au service de la dignité humaine » et les valeurs Dignité, Gratuité, Intégrité conviennent à n'importe quelle ONG. Rien ne montre le Cameroun ni l'Allemagne : ni date de création, ni ville, ni personne. Les deux slogans réels de la fondation (« Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse » sur les t-shirts, « Sowing hope, harvesting change » sur les kakémonos) sont absents ; c'est à la fondation de choisir lequel porter.

**Tells IA (§4.1).** Sur-titre « QUI SOMMES-NOUS · [FORME LONGUE RETIRÉE AU LOT 12 : FAUSSE SELON LA FONDATION] » en capitales or espacées (TransversalPages.tsx:44-46) ; « VALEUR 01/02/03 » et « PÔLE 01/02/03 » sur des contenus qui ne sont pas des séquences (l.91 et 162) ; pastille décorative « ANCRAGE INSTITUTIONNEL » avec bouclier (l.102-105) ; six cartes au même habillage ; filet dégradé sous chaque H2.

**Formes et composants.** Les cartes de valeurs et de pôles sont celles de toutes les autres pages. L'encadré IROKO, vert à bordure or, contient une seconde carte verte à bordure or juste pour afficher le logo : une carte dans une carte. Le bouton or « Découvrir nos partenaires et financeurs » est obtenu par des surcharges !important (l.114-117), et son rond fléché, or lui aussi, disparaît sur ce fond.

**Structure et parcours.** L'ordre mission → valeurs → IROKO → gouvernance est logique, mais il manque ce qu'un donateur vient chercher : l'histoire (le commentaire du composant l'annonce, et la frise TIMELINE_MILESTONES est importée sans être affichée), les personnes, la forme juridique et le siège. La page ouvre une chaîne de preuves (qui sommes-nous → impact → transparence → partenaires) qui casse à chaque maillon : chaque page est vide ou en TODO là où le donateur cherche une preuve, et les liens tournent en rond (Qui sommes-nous → Partenaires → Qui sommes-nous) ou s'arrêtent net (Impact → Transparence). Elle ne mène ni au don ni au contact ; son seul bouton, au milieu, part vers /partenaires.

**Typographie.** Le H1 (3,9 rem) a un interligne de 1,25, trop lâche pour un titre d'affiche, et le H2 « Bâtir l'autonomie… » (3,1 rem) le talonne. Le texte des cartes est en 14 px à 75 % d'opacité : correct à 1440, petit à 390.

**Couleurs.** Vert, crème et or cohérents ; le thème sombre tient (cartes en #132A21). Le sur-titre or « ÉQUIPE & GOUVERNANCE (TODO : NOMS OFFICIELS À CONFIRMER) » est l'élément le plus visible de sa section : le TODO est mis en vedette.

**Espace.** Respiration verticale correcte, empilement propre à 390. Le H1 (bandeau en max-w-6xl) et le corps (max-w-7xl) ne partent pas de la même marge gauche. À 390, la page fait 5 199 px, dont environ 1 500 px de pied de page.

**Images.** Aucune photo ; le logo apparaît deux fois (en-tête et encadré IROKO). Les photos réelles de l'Open Day de Yaoundé (photo de groupe, prise de parole, trois responsables devant les kakémonos) existent dans le projet mais ne servent pas ici.

**Contenu.** Textes propres, mais tout est affirmé et rien n'est prouvé : « gouvernance collégiale » sans un seul nom, « indépendante » sans explication, présence « dans les 10 régions » contredite par la carte de la page Impact. Le nom développé diffère de celui des kakémonos.

**Note : 47/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 22/40 | Propre et cohérent, mais gabarit commun sans image, carte dans une carte et tells du §4.1 en série. |
| Utilisabilité | 18/30 | Page courte, lisible, ordre logique, mobile propre ; mais aucune action en fin de page (QSN-04), focus or invisible sur fond clair, pas de version anglaise. |
| Créativité | 4/20 | Rien de propre à WAHHF : ni lieu, ni personne, ni slogan. |
| Contenu | 3/10 | Ne répond à aucune question du donateur (qui, depuis quand, où, avec quel statut) ; gouvernance en TODO. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>QSN-01 | Qui sommes-nous (gouvernance) et route /fondateurs | `src/pages/TransversalPages.tsx:135-170`<br>`src/pages/Founders.tsx:15`<br>`src/i18n.ts:61-66` | La gouvernance est anonyme : sur-titre « Équipe & Gouvernance (TODO : noms officiels à confirmer) » et trois cartes « PÔLE » dont les rôles finissent par « (TODO) », sans nom, visage ni photo. Les deux seuls noms de cofondateurs du code ne servent que sur la route /fondateurs, toujours en ligne (App.tsx:91) mais vers laquelle aucun lien interne ne mène, avec des portraits Unsplash en noir et blanc (Founders.tsx:15 et 23) sous le titre « Les fondateurs d'IROKO » (voir FON-01). | Une fondation qui demande des dons sans responsables identifiés ne passe pas l'examen d'un donateur ou d'un bailleur allemand. Associer des photos de banque d'images à des noms réels est trompeur et peut se retourner contre la fondation si quelqu'un le remarque. | Remplacer les rôles en TODO par 2 à 4 responsables réels sur /qui-sommes-nous#gouvernance (nom, rôle, pays, vraie photo avec accord, une phrase chacun), contenu réel à fournir par la fondation. Remplacer les portraits Unsplash par de vraies photos ou les retirer, et rediriger /fondateurs vers cette ancre (à valider). |
| important<br>QSN-02 | Qui sommes-nous (histoire et ancrage) | `src/pages/TransversalPages.tsx:34-70`<br>`src/services/api.ts:880-900`<br>`src/components/Footer.tsx:86` | La page n'a ni histoire (date de création, déclencheur), ni lieu (aucune ville au Cameroun ni en Allemagne), ni statut juridique, ni photo autre que le logo, alors que le pied de page annonce « Notre histoire & mission ». TIMELINE_MILESTONES est importé (l.24) mais jamais affiché, et 3 de ses 4 années portent « (TODO) ». | C'est la page que lit un donateur ou une institution avant de s'engager, et elle ne répond à aucune de ses questions : le test du nom retiré (§3) échoue. Les vraies photos de l'Open Day de Yaoundé, qui prouveraient l'existence de la fondation, ne sont pas utilisées. | Ajouter un récit court et daté (création, premier événement, ville au Cameroun et ville en Allemagne) avec une photo réelle de l'Open Day, et une frise sans année en TODO : contenu réel à fournir par la fondation. Ouvrir la page sur le slogan que la fondation aura choisi (t-shirts ou kakémonos). |
| important<br>QSN-03 | Qui sommes-nous (encadré IROKO) | `src/pages/TransversalPages.tsx:100-133` | La colonne droite de l'encadré (logo, « WAHHF Foundation », « Branche sociale du groupe IROKO ») répète le H2 placé juste à côté, dans une carte verte posée dans une carte verte. Le texte présente la fondation comme « indépendante » (l.110) sans dire ce qui le garantit, alors qu'un groupe privé la finance. | La moitié du bloc n'apporte aucune information. L'indépendance d'une branche financée par un groupe privé est la première question d'un bailleur : affirmée sans preuve, elle inquiète. | Ajouter une phrase sur ce qui garantit l'indépendance (statuts, conseil qui décide des programmes), contenu réel à fournir par la fondation. Remplacer la colonne logo par 3 faits : année de rattachement, part du budget couverte par IROKO, organe qui décide des programmes (à valider). |
| important<br>QSN-04 | Qui sommes-nous (fin de page) | `src/pages/TransversalPages.tsx:135-171` | La page se termine sur les cartes de gouvernance en TODO, sans aucun bouton vers le don, le partenariat ou le contact. Sur mobile, l'en-tête n'affiche pas « Faire un don » (T-09) : le seul bouton de don visible est dans le pied de page, après environ 1 500 px de liens. | Le donateur lit cette page juste avant de décider. Sans retour vers le don ni contact, le parcours « comprendre, puis donner ou devenir partenaire » s'arrête au moment de la décision. | Terminer la page par un seul bloc d'action : « Faire un don », « Devenir partenaire » et un contact nommé (à fournir par la fondation). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-06, T-07, T-08, T-09, T-11, T-14, T-15, T-16, T-17, T-19, T-20, T-21, TOK-02, A11Y-01, RESP-01, RESP-02, RESP-04, RESP-05, PERF-02, ANIM-04, MEL-01

#### Nos actions — `/nos-actions`

**Première impression.** La seule page institutionnelle qui a des images, donc la plus vivante. Mais elle est longue et répétitive : six cartes photo, puis six blocs de texte sur les mêmes six domaines, chacun terminé par le même bouton vert. À 390, elle fait 8 238 px, près de 10 écrans.

**Identité (test du nom retiré, §3).** À moitié réussi. Les vraies photos (Éducation, Droits et inclusion, Mobilité) ancrent la page à Yaoundé ; les trois images générées (consultation mise en scène, atelier à l'enseigne illisible « HUBUK », plantation en lumière dorée) la ramènent à la banque d'images. Les six domaines du site ne sont pas ceux des kakémonos de l'Open Day, ce qui brouille ce que fait réellement la fondation.

**Tells IA (§4.1).** Pastille « DOMAINE / 01 / 06 » en capitales sur fond flou (DomainCard.tsx:37) ; grand numéro en filigrane coupé par le bas de la carte et qui passe sous le rond fléché (DomainCard.tsx:45-50) ; triple numérotation des mêmes domaines (pastille, filigrane, « Domaine 01 / 06 » l.334), plus « 01. Éducation » dans le pied de page ; quatre effets de survol par carte ; cinq boutons « Soutenir ce domaine ↗ » identiques.

**Formes et composants.** DomainCard cumule bordure et ombre colorée, alors que les cartes voisines n'ont qu'une bordure. Les blocs de détail (rayon 24 px) contiennent des puces à 16 px sur fond gris à 5 % : trois niveaux d'arrondi sans logique. Le bouton or « Accéder au hub Mobilité & Langues » a un rond fléché or sur fond or, invisible. Côté technique, les images sont bien traitées : format 16:10, srcset, chargement différé.

**Structure et parcours.** Les deux listes des mêmes domaines se répètent, et la grille coupe les descriptions par « … » sur la page censée les expliquer. « Découvrir ce domaine », depuis l'accueil ou le méga-menu, arrive en haut de page sans défiler jusqu'au bloc mis en avant, alors que chaque bloc a déjà un id prêt à servir d'ancre. « Soutenir ce domaine » mène à /agir au lieu du don, et le don ne propose pas deux des six domaines (Entrepreneuriat, Droits et inclusion). Le programme distinctif, Mobilité & Langues, est rangé en sixième position.

**Typographie.** Saut de niveau H1 → H3 (titres des cartes), puis les mêmes titres reviennent en H2. Programmes en 12 px sur mobile, pastille de carte en 11 px : trop petit en plein soleil.

**Couleurs.** Le dégradé vert posé sur le bas des photos uniformise des images très différentes. Le bloc mis en avant par ?domaine= passe en vert, mais on ne le voit pas, faute de défilement.

**Espace.** Bandeau en max-w-6xl, corps en max-w-7xl : deux marges gauches. À 1440, la colonne de texte des blocs (max-w-3xl) laisse un grand vide à droite, occupé par un seul bouton centré verticalement.

**Images.** Technique propre, contenu problématique : Éducation est une capture TikTok floue au sujet coupé, et trois domaines sont illustrés par des images générées sans mention « illustration ». L'aperçu de la vidéo de la pépinière de jeunes palmiers (src/assets/gallery/video-pepiniere-poster.webp) pourrait illustrer Environnement.

**Contenu.** Les descriptions sont claires, mais aucun programme n'est daté, situé, chiffré ni marqué réalisé ou prévu. Le titre de la page atteint 141 caractères avec le suffixe ajouté par SEO.tsx:13.

**Note : 50/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 24/40 | Seule page du groupe avec des images et des cartes riches, mais DomainCard surchargé et images générées à côté de vraies photos. |
| Utilisabilité | 17/30 | Doublon de 6 domaines, textes coupés, ?domaine= sans effet, bouton de soutien vers une page générique. |
| Créativité | 5/20 | Les vraies photos de Yaoundé ; sinon le gabarit commun. |
| Contenu | 4/10 | Matière réelle, mais aucun programme daté, situé ou marqué réalisé. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>ACT-01 | Nos actions (structure) | `src/pages/TransversalPages.tsx:301-370`<br>`src/components/wahhf/DomainCard.tsx:56` | Les 6 domaines sont présentés deux fois de suite : une grille de cartes dont la description est coupée par « … » (line-clamp-2), puis 6 blocs détaillés avec les mêmes titres. La page fait 4 287 px à 1440 et 8 238 px à 390. | La redondance fatigue et coûte de la data sur mobile. Couper une description sur la page qui doit l'expliquer va contre son rôle. | Garder une seule liste : un bloc par domaine avec photo réelle, texte complet, programmes et bouton ; si un sommaire reste utile, en faire une rangée compacte de liens d'ancre sans photo (à valider). |
| important<br>ACT-02 | Nos actions → Faire un don | `src/pages/TransversalPages.tsx:362`<br>`src/pages/DonatePage.tsx:31-33`<br>`src/pages/DonatePage.tsx:205-216` | Les cinq boutons « Soutenir ce domaine » mènent à /agir, page générique, et non au formulaire de don. Le don ne propose que 4 affectations qui ne recoupent pas les 6 domaines : Éducation, Santé et Environnement partagent une seule option, Entrepreneuriat et Droits et inclusion n'en ont aucune (DonatePage.tsx:211-212), et l'affectation par défaut est l'Académie d'allemand. | Le bouton promet un soutien ciblé, mais le domaine se perd en route et il faut deux pages de plus pour donner (§5.8 : même verbe tout au long du parcours). Un visiteur venu soutenir la Santé finance par défaut l'Académie s'il ne change pas la liste. | Lier vers /faire-un-don?affectation=<domaine> et présélectionner l'affectation (la page de don ne lit aujourd'hui aucun paramètre). Aligner la liste d'affectation sur les 6 domaines, ou écrire honnêtement « Faire un don général » sur ces boutons. |
| important<br>ACT-03 | Nos actions (programmes) | `src/services/api.ts:170-250` | Les 18 programmes (3 par domaine) sont de simples phrases, sans lieu, date, nombre ni statut (réalisé, en cours, prévu). L'écart entre ces domaines et ceux des kakémonos de l'Open Day relève de T-13. | Un donateur ne distingue pas ce qui existe de ce qui est prévu. Il ne peut pas non plus juger ce que son don rendrait possible. | Afficher un statut sur chaque programme (« Réalisé · Yaoundé · avril 2026 », « Prévu 2027 »), contenu réel à fournir par la fondation. Pour la liste des domaines elle-même, voir T-13. |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-04, T-08, T-10, T-13, T-14, T-15, T-16, T-17, T-19, T-20, T-21, TOK-02, A11Y-01, A11Y-08, A11Y-09, A11Y-10, RESP-01, RESP-05, PERF-02, ANIM-05, MEL-01

#### Notre impact — `/notre-impact`

**Première impression.** La page la plus riche visuellement du groupe grâce à ses deux cartes, le Cameroun sur fond vert et l'Europe sur fond blanc, qui se répondent. On s'en souvient un peu. Mais à la lecture, il n'y a aucun impact : un chiffre marqué TODO, dix régions « à confirmer », et un bouton final vers une page Transparence elle aussi vide.

**Identité (test du nom retiré, §3).** Réussi en partie. Nos actions doit son demi-succès à ses photos ; ici, c'est un élément conçu pour le sujet. La carte des 10 régions aux vraies frontières, avec les pays voisins en filigrane, est propre au sujet. La flèche « Depuis le Cameroun » vers l'Allemagne est une bonne amorce de signature, cachée dans une mini-carte.

**Tells IA (§4.1).** Rangée de 4 cartes « gros chiffre + petit label » (TransversalPages.tsx:403-420) ; compteur animé jusqu'à « 1 250+ (TODO) » ; sur-titres en capitales « ANCRAGE LOCAL · 10 RÉGIONS DU CAMEROUN » et « PASSERELLE INTERNATIONALE · 10 PAYS D'ACCOMPAGNEMENT » (PresenceSection.tsx:84 et 174) ; métadonnée « Pays #01 · Voir la fiche » (CountryList.tsx:72) ; pastille « 10 / 10 régions » (PresenceSection.tsx:88).

**Formes et composants.** Les deux panneaux sont bien pensés comme pendants. Les cartes de chiffres sont des boîtes vides : un chiffre et un label, sans source ni date. Puces des régions à 28 px de haut, lignes de pays bien dimensionnées (environ 50 px). Au clavier, chaque choix existe deux fois (région sur la carte et en puce, pays sur la carte et dans la liste), soit environ 40 arrêts pour 20 choix ; le focus des formes de la carte, en double trait, est en revanche bien dessiné.

**Structure et parcours.** La page mélange trois sujets : des chiffres dont un seul est un résultat, une carte du Cameroun où chaque région affiche le même message vide, et une carte d'orientation vers l'Europe qui relève de Mobilité & Langues. « Voir les actions » d'une région envoie un paramètre que /nos-actions ignore. La frise annoncée par le commentaire du composant est absente. La page se termine sur /transparence, cul-de-sac du parcours, sans aucun lien vers le don.

**Typographie.** Les chiffres en Fraunces 3 rem avec tabular-nums sont bien. Mais beaucoup de micro-textes : panneau de région en 11 px, « Pays #01 · Voir la fiche » en 10 px, « Hors UE » en 9 px sur mobile. Saut de niveau H1 → H3 dans les panneaux.

**Couleurs.** Les panneaux vert profond et blanc s'équilibrent. À 390, la dernière puce de région est coupée exprès pour signaler le défilement : bonne idée. En sombre, la carte Présence reste blanche.

**Espace.** Grille 6/6 équilibrée à 1440 ; à 390, la liste des pays passe au-dessus de la mini-carte, bon choix. Bandeau en max-w-6xl, corps en max-w-7xl.

**Images.** Aucune photo, des cartes vectorielles chargées à la demande (bon pour la data mobile). Aucune image de résultat : pas de groupe d'élèves, de pépinière ni de bibliothèque.

**Contenu.** Le sous-titre du bandeau écrit en toutes lettres « (marqués TODO à consolider) ». La consigne « Cliquez sur une région » (PresenceSection.tsx:96) ne convient pas aux écrans tactiles.

**Note : 52/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 25/40 | Deux cartes soignées et appariées ; cartes de chiffres vides et micro-textes. |
| Utilisabilité | 17/30 | Carte interactive qui fonctionne, mais paramètre ?region= ignoré, double arrêt clavier, puces petites, fin de page en cul-de-sac. |
| Créativité | 9/20 | Seule page du groupe avec un élément propre au sujet (carte des régions, flèche vers l'Allemagne). |
| Contenu | 1/10 | Aucun résultat vérifié sur une page intitulée « Impact ». |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>IMP-01 | Notre impact | `src/pages/TransversalPages.tsx:388-437`<br>`src/data/regions.ts:22-23`<br>`src/components/wahhf/PresenceSection.tsx:86-89` | La page intitulée « Un impact concret, mesuré avec humilité et transparence » ne montre aucun résultat vérifié : son sous-titre dit « (marqués TODO à consolider) », et ses chiffres comme sa carte reprennent les données non confirmées décrites en T-11 (1 250+ « (TODO) », « Antenne locale : à confirmer (TODO) » sous « 10 / 10 régions »). Elle se termine sur un bouton vers /transparence, page elle aussi vide (TRA-01), sans lien vers le don. | Le titre est contredit par la page elle-même. Pour une ONG, une page « Impact » sans impact fait penser à de l'invention, et c'est précisément ce qu'un bailleur vérifie. | Remplacer les chiffres en TODO par 2 ou 3 résultats datés, sourcés et photographiés, par exemple le First Open Day & Boot Camp de Yaoundé du 25 avril 2026 (contenu réel à fournir par la fondation), et ajouter un bouton « Faire un don » à côté du lien vers /transparence. En attendant ces données, renommer la page « Où nous agissons », n'afficher sur la carte que les régions où une action a eu lieu et déplacer la carte des pays européens vers Mobilité & Langues (à valider). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-08, T-10, T-11, T-14, T-15, T-16, T-19, T-20, T-21, TOK-02, TOK-03, A11Y-01, A11Y-07, A11Y-08, A11Y-09, A11Y-12, RESP-01, RESP-05, PERF-02, PERF-08, ANIM-04, ANIM-12, MEL-01

#### Partenaires — `/partenaires`

**Première impression.** Un grand encadré vert à épaisse bordure or, trois cartes à la même icône de poignée de main, puis un appel à partenariat. Vide et répétitif : le seul partenaire nommé est la maison mère.

**Identité (test du nom retiré, §3).** Échoué. Sans le mot IROKO, c'est la page partenaires de n'importe quelle association. La phrase « aucun nom ou logo d'institution tierce n'est affiché sans accord écrit préalable » est honnête et mérite d'être gardée, mais elle confirme qu'il n'y a encore rien à montrer.

**Tells IA (§4.1).** « 01 · PARTENAIRE FONDATEUR & MÉCÈNE STRUCTUREL » : un numéro 01 pour un seul élément (TransversalPages.tsx:206) ; bordure décorative or de 2 px (l.204) ; même icône Handshake sur les trois cartes (l.248) ; sur-titre « RÉSEAU DE COOPÉRATION (TODO : LISTE OFFICIELLE À CONFIRMER) » (l.224) ; titre en casse anglaise « Groupe IROKO — Holding & 10 Pôles d'Expertise ».

**Formes et composants.** L'encadré IROKO (bordure or de 2 px) et les cartes de catégories (bordure fine) n'ont pas la même épaisseur de bordure, sans raison. Le bloc « Comment devenir partenaire » est une carte blanche de plus, avec un bouton vert fléché. Les icônes sont purement décoratives.

**Structure et parcours.** La page est absente du menu principal : on y arrive par le pied de page, par la section Partenaires de l'accueil ou par le bouton or de /qui-sommes-nous. Elle a bien un appel à l'action, « Proposer un partenariat », mais il mène au formulaire générique de /agir, qui s'ouvre en mode bénévole (voir AGIR-02). Il manque l'offre elle-même : formats de partenariat, contreparties, dossier à télécharger, interlocuteur.

**Typographie.** Le paragraphe IROKO (max-w-4xl, 16 px) fait environ 112 caractères par ligne à 1440, bien au-delà des 80 du §5.2. Texte des cartes en 14 px.

**Couleurs.** L'or sert à la fois de bordure, de fond de pastille, d'icône et de bouton : trop d'or sur un même écran, il ne hiérarchise plus rien.

**Espace.** Bandeau et corps sont tous deux en max-w-6xl : cohérent dans la page, mais différent des pages voisines en 7xl, si bien que la marge gauche « saute » quand on navigue.

**Images.** Aucune image, aucun logo. La photo de groupe devant les kakémonos ou un logo IROKO donneraient au moins une présence.

**Contenu.** Le H1 « Un écosystème engagé pour garantir la gratuité de nos actions » est contredit par un contenu qui ne nomme qu'un acteur. « Mécénat financier, technologique et humain » reste creux faute de chiffres, et le paragraphe IROKO reprend la présence « dans les 10 régions du Cameroun », que rien n'étaye.

**Note : 46/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 20/40 | Encadré lisible, mais cartes identiques, icône répétée et or partout. |
| Utilisabilité | 21/30 | Page courte avec un appel à l'action, mais absente du menu, et ce bouton mène à un formulaire réglé sur « bénévole ». |
| Créativité | 3/20 | Rien qui distingue WAHHF d'une autre association. |
| Contenu | 2/10 | Un seul partenaire, décrit par ce qu'il finance ; deux catégories sur trois en TODO ; aucune offre. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>PAR-01 | Partenaires | `src/pages/TransversalPages.tsx:202-219`<br>`src/pages/TransversalPages.tsx:221-255`<br>`src/pages/TransversalPages.tsx:257-265` | Le seul partenaire nommé est la maison mère : le paragraphe dit ce qu'IROKO finance, pas ce qu'est IROKO (secteurs, pays, site, part du budget), et « 10 Pôles d'Expertise » n'est pas expliqué. Deux catégories de partenaires sur trois finissent par « (TODO) », et le bloc « Comment devenir partenaire » ne propose ni format, ni contrepartie, ni interlocuteur : son seul bouton mène au formulaire de /agir, réglé sur « bénévole » (voir AGIR-02). | Une institution allemande qui envisage un partenariat ne trouve ni ce qu'on lui propose, ni à qui écrire. Le titre « Un écosystème engagé » est contredit par une page qui ne nomme qu'un acteur. | Décrire IROKO concrètement (secteurs, pays, site, part du financement) et ajouter une section « Ce que nous proposons » (mécénat, accueil de stagiaires, enseignants bénévoles, dossier à télécharger) avec un contact nommé, contenu réel à fournir par la fondation. En attendant de vrais partenaires, fusionner la page avec /qui-sommes-nous (à valider). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-08, T-09, T-11, T-14, T-15, T-16, T-17, T-18, T-19, T-20, T-21, TOK-05, A11Y-01, RESP-01, RESP-04, RESP-05, RESP-06, PERF-02, MEL-01

#### Transparence financière — `/transparence`

**Première impression.** Une page presque vide : un bandeau vert sans phrase d'appui et deux cartes de texte, dont une en TODO. À 1440, la page fait 1 318 px de haut et le pied de page arrive dès le premier écran.

**Identité (test du nom retiré, §3).** Échoué : il n'y a rien à retirer. C'est le gabarit des pages légales (le même composant que les mentions légales et la confidentialité), avec une icône de document.

**Tells IA (§4.1).** Sur-titre « ÉTHIQUE & GOUVERNANCE » en capitales avec icône (TransversalPages.tsx:804-807) ; titre en casse anglaise « Transparence financière & Origine des ressources » ; deux cartes blanches à 24 px pour deux paragraphes.

**Formes et composants.** La carte n'apporte rien à du texte courant. Une page de transparence demande des tableaux, des montants et des documents à télécharger, pas des cartes.

**Structure et parcours.** C'est le cul-de-sac du parcours de confiance. Le formulaire de don promet que la fondation « publie ses engagements d'allocation des ressources sur sa page dédiée » (DonatePage.tsx:355), la page Impact y renvoie par un grand bouton or, le pied de page aussi. Le visiteur n'y trouve ni chiffre, ni statut, ni bouton pour revenir au don ou poser une question.

**Typographie.** H1 en 3 rem, sans phrase d'appui ; texte en 16 px sur environ 96 caractères par ligne, comme la confidentialité (RESP-06).

**Couleurs.** Conformes au reste du site, rien à signaler.

**Espace.** Conteneur max-w-4xl pour le bandeau et le corps : une troisième largeur de grille dans le groupe institutionnel.

**Images.** Aucune, pas même un document téléchargeable.

**Contenu.** « Publication des rapports annuels (TODO) » et « (TODO : insérer lien PDF du rapport annuel dès validation) » sont visibles. Pour un donateur européen, c'est la page qui fait renoncer.

**Note : 34/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 14/40 | Gabarit de page légale, deux cartes, aucune forme adaptée à des chiffres. |
| Utilisabilité | 18/30 | Courte et lisible, mais aucun bouton et aucun retour vers le don. |
| Créativité | 1/20 | Aucun élément propre. |
| Contenu | 1/10 | Aucune donnée financière ni statutaire ; un titre en TODO. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>TRA-01 | Transparence financière | `src/pages/TransversalPages.tsx:780-793`<br>`src/pages/DonatePage.tsx:355`<br>`src/pages/TransversalPages.tsx:429-431` | La page ne contient aucun chiffre ni aucune information statutaire : deux cartes de texte, dont la seconde a pour titre « Publication des rapports annuels (TODO) » et promet un PDF « dès validation ». Ni forme juridique, ni numéro d'enregistrement, ni siège, ni budget, ni part de la dotation IROKO, ni règle d'affectation des dons, ni reçu fiscal, ni date du premier rapport. | Le don, la page Impact et le pied de page y renvoient, et un donateur allemand ou une institution y cherche ces faits avant de donner. Promettre la transparence et montrer une page vide abîme plus la confiance qu'une page absente. | Remplacer les TODO par des faits vérifiables, présentés dans un tableau simple ou une barre de répartition : entité et forme juridique dans chaque pays, numéro d'enregistrement, siège, responsable légal, part de la dotation IROKO, répartition prévue des dons, reçu fiscal possible ou non, date du premier rapport (contenu réel à fournir par la fondation). Tant que ces données manquent, retirer les liens vers cette page depuis le don, l'impact et le pied de page (à valider). |
| important<br>TRA-02 | Transparence financière (fin de page) | `src/pages/TransversalPages.tsx:798-826` | La page n'a aucun bouton : après les deux cartes vient directement le pied de page. Le formulaire de don y envoie pourtant le donateur sans lui offrir de chemin de retour. | Le donateur qui vérifie avant de payer tombe dans un cul-de-sac et doit retrouver seul le formulaire de don. | Terminer la page par un lien « Revenir au formulaire de don » et un contact pour les questions financières (à fournir par la fondation). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-08, T-14, T-15, T-16, T-19, T-21, A11Y-01, RESP-01, RESP-02, RESP-05, RESP-06, PERF-02, MEL-01

#### Galerie — `/galerie`

**Première impression.** C'est la page la plus convaincante du site, grâce à ses vraies photos : une rue de Yaoundé et ses taxis jaunes, le slogan imprimé sur les t-shirts, la joie des jeunes. Le cadre, lui, reprend le gabarit commun : bandeau vert, sur-titre en capitales, puces de filtre, grille 4:3 uniforme. On retient les photos, pas la page.

**Identité (test du nom retiré, §3).** Réussi par le contenu, échoué par la forme. Sans le nom, le slogan « Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse », les kakémonos WAHHF et Yaoundé suffisent à reconnaître la fondation. La mise en page, elle, est interchangeable. Le côté allemand n'apparaît nulle part : l'album « Rencontres de la communauté » (un parc, un participant européen) montre peut-être la diaspora, mais rien ne le dit.

**Tells IA (§4.1).**
- Sur-titre « GALERIE » en capitales avec icône, au-dessus d'un H1 qui dit la même chose (GalleryPage.tsx:37-40).
- Métadonnées « A · B · C » (« Hôtel Albatros Premium, Yaoundé · 25 avril 2026 · 14 éléments », GalleryPage.tsx:76).
- Fondu décalé sur chaque album, rejoué à chaque changement de filtre (la clé dépend du filtre, GalleryPage.tsx:69).
- Bandeau vert identique à celui de toutes les pages intérieures.

**Formes et composants.** Les vignettes sont cohérentes (rounded-2xl, sans bordure ni ombre), et le rond or de lecture rappelle la pastille or des boutons principaux : bonne idée. Le format 4:3 est imposé à toutes les images, même aux portraits et au panoramique, mais le point focal a été réglé photo par photo. La visionneuse est sobre et accessible : Échap, focus gardé puis rendu, balayage au doigt, légende annoncée « n sur N ». Son image en rounded-xl ajoute toutefois un troisième rayon. Les puces de filtre ont aria-pressed et un anneau de focus vert foncé, visible sur fond clair : c'est l'un des rares endroits du site où c'est le cas.

**Structure et parcours.** Hero, filtres, 3 albums (14, 2 et 3 éléments), footer. Il n'y a ni récit par album, ni légendes visibles, ni appel à l'action final, ni lien vers un article. La page ne mène ni au don, ni à la candidature, ni au partenariat, et elle est absente du menu principal : on y arrive par le footer, la recherche ou l'accueil.

**Typographie.** H1 Fraunces de 61 px à 1440, interligne 1,25 : lisible, sans parti pris d'affiche. Les H2 d'album font 30 px et les métadonnées 14 px à 70 % : la hiérarchie est claire mais neutre.

**Couleurs.** Le vert, le crème et l'or s'accordent avec les photos (gilets orange, t-shirts blancs). En sombre, la puce active or sur vert-noir fonctionne. Les 3 fichiers de la galerie contiennent 44 couleurs hex écrites en dur.

**Espace.** Les gouttières de 16 px sont correctes, et à 390 la grille de 2 colonnes est propre. Mais à 1440 le titre du hero commence 64 px plus à droite que le contenu, et les fins d'album laissent des trous (GAL-03).

**Images.** Le contenu est fort, la qualité moyenne : ce sont des captures TikTok d'environ 628 px de haut, molles sur un écran haute densité, et des vidéos de 576 px de large. On voit des visages de mineurs en gros plan, alors que les autorisations ne sont pas vérifiées (GAL-01).

**Contenu.** « Lieu et date à confirmer (TODO) » et « Lieux, dates et projets à confirmer (TODO) » sont visibles. « 14 éléments » est un mot de système. Tout reste en français en version anglaise. Le nom anglais de l'événement est acceptable : c'est celui du kakémono.

**Note : 58/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 25/40 | Vraies photos bien cadrées et vignettes cohérentes, mais gabarit commun, fins de grille trouées et images molles en grand. |
| Utilisabilité | 21/30 | Filtres accessibles avec focus visible, visionneuse complète au clavier et au doigt, vidéos chargées au clic. En revanche : puces de 36 px avec une 3e puce cachée à 390, page absente du menu, aucun appel à l'action. |
| Créativité | 7/20 | Grille et visionneuse standard, aucune mise en récit. |
| Contenu | 5/10 | Meilleure matière du site, mais aucun récit, TODO visibles et autorisations des mineurs non vérifiées. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>GAL-01 | Galerie, mais aussi « En images » sur l'accueil et cartes de domaines | `src/data/gallery.ts:5-7`<br>`src/data/gallery.ts:103-129`<br>`docs/audit-mouvement.md:520-522` | Des visages de jeunes, dont des mineurs, sont publiés en gros plan (photo mise en avant, chorale, photo de groupe). Or le code indique que les autorisations de diffusion, « autorisations parentales pour les mineurs » comprises, sont « à vérifier avant la mise en ligne ». Les mêmes photos servent sur l'accueil et sur des cartes de domaines, et les notes du projet demandent aussi de vérifier la musique de la vidéo de la chorale (icône ♫ incrustée). | Pour une ONG de jeunesse, publier des photos de mineurs sans accord écrit est un risque juridique (RGPD, droit camerounais, à faire confirmer par un juriste) et éthique. Les familles concernées regarderont cette page en premier. | Obtenir et archiver les autorisations écrites avant la mise en ligne ; à défaut, flouter ou retirer les photos concernées (à valider). Ajouter aux mentions légales un contact pour demander le retrait d'une photo. |
| important<br>GAL-02 | Galerie, albums | `src/pages/GalleryPage.tsx:67-82`<br>`src/components/wahhf/GalleryLightbox.tsx:183` | Chaque album se résume à un titre, une ligne de métadonnées et une grille. Les légendes déjà écrites (« Les jeunes du Boot Camp et leurs encadrants ») ne s'affichent que dans la visionneuse. L'album « Sur le terrain » (bananeraie, pépinière, car) ne dit ni lieu, ni date, ni projet, et la page finit sur la dernière vignette, sans lien vers le don, la candidature ou un article. | C'est la page qui convainc le plus, et elle ne demande rien. Le donateur ne sait pas ce qu'était le Boot Camp, combien de jeunes y ont participé ni ce qu'il a produit. | Ajouter 2 ou 3 phrases par album (quoi, qui, combien, résultat ; contenu à fournir par la fondation) et des légendes courtes visibles sous quelques photos clés. Terminer par un seul bloc avec « Financer le prochain Boot Camp » (don) et « Inscrire un jeune » (candidature). |
| important<br>GAL-03 | Galerie (et Académie) : fins de grille | `src/components/wahhf/GalleryGrid.tsx:24, 45`<br>`src/pages/GalleryPage.tsx:79`<br>`src/pages/LanguageAcademy.tsx:164, 489` | La grille garde 2, 3 ou 4 colonnes quel que soit le nombre d'éléments. L'album Open Day (à 1440, une mise en avant 2×2 et 13 vignettes, soit 17 cases ; 15 cases à 390) laisse une photo seule à 1440 comme à 390 ; « Rencontres » (2 photos) laisse la moitié droite vide et « Sur le terrain » (3) une colonne vide, car la mise en avant n'existe qu'à partir de 6 éléments. Même défaut sur l'Académie : C1 reste seule sur sa ligne (7 sessions sur 3 colonnes, 5 niveaux sur 2 colonnes à 390). | Une rangée incomplète se lit comme un trou, pas comme un choix : la page paraît inachevée. | Compléter la dernière ligne : seconde mise en avant, dernier élément étendu (col-span) ou nombre d'éléments ajusté selon la largeur (grid-flow-dense ne suffit pas). Pour les petits albums, adapter les colonnes (2 photos sur 2 colonnes larges, 3 sur 3) ou regrouper Rencontres et Terrain (à valider). |
| important<br>GAL-04 | Galerie, netteté des photos et des vidéos | `src/data/galleryManifest.json`<br>`src/components/wahhf/GalleryGrid.tsx:45, 54`<br>`src/components/wahhf/GalleryLightbox.tsx:161` | Les photos de l'Open Day sont des captures TikTok d'environ 628 px de haut. La mise en avant (600×454 px à 1440) est nette sur un écran standard, mais agrandie environ 1,45 fois sur un écran haute densité. Dans la visionneuse, les vidéos de 296 à 324 px de haut s'affichent jusqu'à 960 px de large, soit un agrandissement d'environ 1,7 fois même sur un écran standard. | Les donateurs européens consultent souvent sur des écrans haute densité : la meilleure preuve du site y paraît molle. | Récupérer les originaux du photographe et des vidéos, puis relancer scripts/prepare_gallery.py en 1600 et 2400 px. En attendant, plafonner la largeur des vidéos dans la visionneuse près de leur taille réelle. |
| important<br>GAL-05 | Galerie, puces de filtre | `src/pages/GalleryPage.tsx:22, 50` | Les puces font 36 px de haut (px-4 py-2 text-sm). À 390, la rangée défile à l'horizontale, et la 3e puce n'apparaît que comme une mince tranche au bord droit, sans autre indice. | Le §2.3 vise 44 px pour une saisie au pouce. Un défilement caché passe inaperçu, et l'album « Sur le terrain » devient introuvable par le filtre. | Hauteur minimale de 44 px (min-h-11) ; sur mobile, puces sur deux lignes (flex-wrap) ou dégradé au bord droit. Voir aussi A11Y-07. |
| finition<br>GAL-06 | Galerie, poids de deux photos et des extraits vidéo | `src/assets/gallery/`<br>`src/components/wahhf/GalleryGrid.tsx:70-72`<br>`src/components/wahhf/GalleryLightbox.tsx:51-61` | Deux photos de l'album Rencontres pèsent 2 à 4 fois plus que les autres : communaute-masque fait 96 ko en 480 px (environ 27 ko pour une vignette ordinaire) et 415 ko en pleine taille, version chargée par la visionneuse et préchargée depuis ses voisines ; communaute-rencontre fait 54, 127 et 198 ko. Trois extraits vidéo de 576 px sont encodés à 0,9-1,4 Mbit/s (pépinière 2,9 Mo pour 17 s, car 1,7 Mo pour 15 s, bananeraie 1,5 Mo pour 12 s) ; la vignette affiche la durée, pas le poids. | La data est payante au Cameroun (§2.3) : chaque lecture coûte 1,5 à 3 Mo sans prévenir. L'ensemble des vignettes reste raisonnable (environ 456 ko pour 15 photos) : seuls ces fichiers posent problème, et les vidéos ne se chargent qu'au clic. | Ré-encoder les deux photos (qualité 60-65, réduction du bruit, 40 ko au plus en 480 px) et les vidéos vers 400-600 kbit/s (H.264, CRF 28-32), soit environ −50 % (estimé). Afficher par exemple « 0:17 · 0,6 Mo » sur la vignette. |
| finition<br>GAL-07 | Galerie, visionneuse | `src/components/wahhf/GalleryLightbox.tsx:8, 130`<br>`src/components/wahhf/GalleryLightbox.tsx:141-150`<br>`src/components/wahhf/GalleryLightbox.tsx:169-172` | Les boutons s'appellent « Photo précédente » et « Photo suivante » même quand l'élément voisin est une vidéo, et seulement en français. Le passage d'une image à l'autre dure 0,6 s, la durée d'un changement d'écran. La première photo ouverte s'affiche sur une zone sombre vide le temps du téléchargement, sans indicateur ni message d'erreur (les voisines, elles, sont préchargées). | Un libellé inexact trompe le lecteur d'écran, et 0,6 s par image paraît lent quand on feuillette (§5.10.3). Le §5.5 demande un état de chargement et un état d'erreur. | Libellés « Élément précédent » et « Élément suivant », traduits. 0,3 s entre deux images et 0,6 s pour l'ouverture seulement ; pendant le chargement, la vignette déjà en cache floutée en fond, et un onError qui affiche un message. |
| finition<br>GAL-08 | Galerie, métadonnées des albums | `src/pages/GalleryPage.tsx:52, 76` | Les métadonnées affichent « 14 éléments » et les puces « Tout (19) » : un mot de système qui mélange photos et vidéos. | Le §5.8 demande les mots de l'utilisateur, pas ceux du système. | Écrire « 13 photos et 1 vidéo », et faire de même dans les puces ou y retirer le nombre (à valider). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-06, T-07, T-08, T-09, T-14, T-16, T-19, TOK-01, TOK-05, ETA-08, A11Y-01, A11Y-07, A11Y-11, RESP-01, RESP-02, RESP-03, RESP-05, PERF-02, ANIM-02, ANIM-04, MEL-01, MEL-05

#### Actualités — `/actualites`

**Première impression.** La page s'oublie vite : un bandeau vert de 240 px qui ne porte qu'un titre, puis 3 cartes identiques illustrées par des images de synthèse. On dirait un blog de modèle.

**Identité (test du nom retiré, §3).** Échoué. Une salle de classe, un dispensaire et un reboisement génériques, sous la même lumière dorée : n'importe quelle ONG africaine pourrait les publier. Le seul lien avec l'Allemagne est un tableau en allemand généré par IA, avec une affiche « Deutsch Germaly ».

**Tells IA (§4.1).**
- Sur-titre « JOURNAL DE LA FONDATION » en capitales espacées (TransversalPages.tsx:518).
- Grille de 3 cartes identiques (TransversalPages.tsx:527-558), avec une flèche ↗ sur chacune (555).
- Soulèvement de la carte et zoom de l'image au survol (531, 544).
- Images IA à l'éclairage doré uniforme.
- Formules creuses : « avec sérieux et méthode », « informer durablement les familles ».

**Formes et composants.** Carte blanche, bordure à 12 %, rayon 24 px, image en 16:10, même structure interne pour les 3. La même carte sert au corps de l'article et aux pages légales : elle est plaquée partout de la même façon.

**Structure et parcours.** Bandeau sans phrase d'introduction, 3 cartes, footer. Il n'y a ni article mis en avant, ni lien vers la galerie, ni inscription aux nouvelles, ni appel au don ou à la candidature. Le seul événement réel n'y figure pas (T-03).

**Typographie.** Titres de carte en Fraunces 20 px et extraits en 14 px à 75 % : c'est correct. Le H1 « Actualités & Actions de terrain » suit la casse anglaise, avec une majuscule à « Actions ».

**Couleurs.** La catégorie est en or foncé #8A5A00 sur blanc (5,9:1, conforme), mais les 3 catégories ont la même couleur, qui ne porte donc aucun sens.

**Espace.** À 1440, le titre du bandeau est décalé par rapport aux cartes (176 px contre 112 px de marge). À 390, trois cartes d'environ 600 px de haut s'empilent pour trois textes d'exemple.

**Images.** Les 3 images sont générées par IA. Celle de l'éducation montre une affiche « Deutsch Germaly » et un tableau au texte trop parfait.

**Contenu.** Trois actualités d'exemple, des dates « (TODO) » avec le mois en majuscule (« 12 Mai 2026 ») et des temps de lecture inventés.

**Note : 40/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 18/40 | Grille propre mais gabarit pur : cartes identiques, bandeau vide, images IA. |
| Utilisabilité | 18/30 | Page courte et lisible, mais rien à faire après lecture et aucun lien vers la galerie. |
| Créativité | 3/20 | Blog de modèle, sans aucune idée propre au sujet. |
| Contenu | 1/10 | Trois actualités d'exemple, dates en TODO, Open Day absent. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>ACTU-01 | Actualités | `src/services/api.ts:837-878`<br>`src/pages/TransversalPages.tsx:510-523`<br>`src/data/gallery.ts:60` | La rubrique ne renvoie nulle part à la galerie, qui montre pourtant les 14 photos et vidéos de la seule action réelle documentée, le First Open Day & Boot Camp du 25 avril 2026 à Yaoundé. Le bandeau ne porte qu'un titre, sans phrase d'introduction. L'absence d'article sur cet événement relève de T-03. | La rubrique censée prouver l'activité prouve son absence, alors que la preuve existe deux clics plus loin. | Ajouter sous le titre une phrase d'introduction (contenu réel à fournir par la fondation) et relier actualités et galerie, par exemple par un bloc « Sur le terrain » qui mène à l'album Open Day (à valider). L'article sur l'Open Day et le sort des 3 articles d'exemple relèvent de T-03. |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-03, T-04, T-05, T-06, T-07, T-08, T-14, T-15, T-16, T-19, T-20, T-21, ETA-08, A11Y-01, A11Y-10, RESP-01, RESP-02, RESP-03, RESP-04, RESP-05, PERF-02, ANIM-04, MEL-05

#### Article d'actualité — `/actualites/ouverture-inscriptions-academie-allemand-2026`

**Première impression.** Propre et lisible, mais vide : un bandeau, une grande image IA, 3 paragraphes dans une carte, 2 boutons. On n'en retient rien, et on ne sait pas quoi faire ensuite, à part cliquer sur « Candidater ».

**Identité (test du nom retiré, §3).** Échoué. Le sujet est pourtant spécifique : des cours d'allemand gratuits, un vrai pont Cameroun–Allemagne. Mais l'illustration est une salle de classe de synthèse et le texte est générique.

**Tells IA (§4.1).**
- Lien retour en capitales espacées avec « ← » (TransversalPages.tsx:458-463).
- Ligne de métadonnées : pastille de catégorie, date, temps de lecture (464-474).
- Corps de l'article enfermé dans une carte (494).
- Bouton magnétique dans un article (501).
- Image générée par IA.

**Formes et composants.** Une image en rayon 24 px avec bordure, puis une carte blanche en rayon 24 px pour le texte : la carte n'apporte rien à un article. En bas, une pilule verte à pastille or et une pilule rouge, poussées aux deux bouts de la ligne.

**Structure et parcours.** Bandeau, image, texte, boutons. Il manque l'encadré pratique, le lien vers le test cité, le partage WhatsApp, des articles liés et un retour en bas de page. La page mène bien à la candidature, mais sans l'information qui permettrait de candidater en connaissance de cause. Une adresse d'article inconnue affiche cet article au lieu d'une erreur (ETA-06).

**Typographie.** H1 Fraunces de 48 px sur 3 lignes à 1440, lisible. Corps de 18 px avec un interligne détendu : confortable. La colonne fait environ 80 caractères à 1440, à la limite haute du §5.2.

**Couleurs.** La pastille or sur vert est conforme. En bas de page, le vert et le rouge, deux couleurs fortes, se disputent l'attention.

**Espace.** La colonne centrée de 832 px tient du bandeau aux boutons : c'est l'espace le mieux tenu de ces pages.

**Images.** L'image IA, recadrée en 16:9, coupe le haut du tableau, et son texte alternatif répète le titre.

**Contenu.** « A1 à B2 » contredit le « A1 à C1 » du reste du site, jusque dans le footer de la même page (T-12). La date est « 12 Mai 2026 (TODO) », et « 3 min de lecture » s'affiche pour 70 mots. Les phrases sont génériques.

**Note : 43/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 21/40 | Colonne de lecture bien tenue, mais carte inutile, image IA recadrée et deux boutons concurrents. |
| Utilisabilité | 17/30 | Lecture confortable et lien vers la candidature, mais aucune information pratique ni lien vers le test cité. |
| Créativité | 3/20 | Gabarit d'article standard. |
| Contenu | 2/10 | Texte d'exemple daté en TODO, niveaux contradictoires, faux temps de lecture. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>ART-01 | Article « Ouverture des candidatures » | `src/services/api.ts:838-850`<br>`src/pages/TransversalPages.tsx:494-503` | L'article annonce l'ouverture des candidatures sans date limite, sans dates de session, sans lieu ni format, sans conditions ni nombre de places. Le « test d'orientation gratuit » qu'il cite n'a pas de lien (les 3 paragraphes, 70 mots en tout, n'en contiennent aucun), et « 3 min de lecture » s'affiche pour un texte qui se lit en moins d'une minute. | Le jeune qui lit sur son téléphone ne peut pas agir, et le faux temps de lecture renforce l'impression de gabarit. Daté « 12 Mai 2026 (TODO) », l'article reste en tête du journal six mois plus tard (T-05). | Ajouter un encadré « En bref » : date limite, début, en ligne ou sur place, prérequis, places, gratuité (contenu à fournir par la fondation). Lier le test de l'Académie, calculer le temps de lecture ou le retirer (à valider), et ajouter « Partager sur WhatsApp » une fois les aperçus de partage corrigés (MEL-05). |
| finition<br>ART-02 | Article, boutons de fin | `src/pages/TransversalPages.tsx:500-503` | « Candidater au programme gratuit » (pilule verte magnétique) et « Faire un don » (pilule rouge) sont poussés aux deux bouts de la ligne (justify-between), à environ 690 px l'un de l'autre à 1440. | L'œil hésite entre deux actions concurrentes, alors que l'action utile de cet article est de candidater. | Un seul bouton principal, « Candidater » ; le don devient un lien secondaire sous le texte, sans effet magnétique dans un article. L'anneau de focus or relève de A11Y-01. |
| finition<br>ART-03 | Article, image principale | `src/pages/TransversalPages.tsx:481-491` | L'image principale, probablement le plus grand élément affiché au chargement (LCP) à 1440 (832 px de large, environ 415 px visibles au premier écran ; non mesuré), n'a pas fetchpriority="high". Son recadrage en 16:9 coupe le haut du tableau (« Willkommen in der Klasse » est tronqué). | Le §5.9 demande de prioriser l'image LCP, surtout sur une page déjà chargée à la demande. Un texte coupé dans l'image fait négligé. | Ajouter fetchpriority="high" et choisir un cadrage qui ne coupe pas le texte, ou mieux, remplacer l'image par une vraie photo (T-04). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-03, T-04, T-05, T-06, T-07, T-08, T-12, T-15, T-16, T-18, T-19, ETA-06, ETA-08, A11Y-01, A11Y-09, A11Y-10, RESP-01, RESP-02, RESP-03, RESP-06, PERF-02, MEL-05

#### Mobilité & Langues — `/mobilite-langues`

**Première impression.** Propre et cohérente avec le reste du site, mais rien ne reste en mémoire. À 1440 : un grand aplat vert, un titre serif, trois boutons, puis un encadré vert. Décrite de mémoire, la page devient « un hero vert, deux cartes, des témoignages, une FAQ » : le schéma de n'importe quelle page d'atterrissage.

**Identité (test du nom retiré, §3).** Réussi par le texte (allemand A1–C1, Ausbildung, 10 pays, financement IROKO), échoué par l'image : pas de photo lisible, pas de carte Cameroun → Europe, aucun signe allemand ou camerounais. Le vert, l'or et le rouge du drapeau camerounais, posés en aplats uniformes, ne suffisent pas à reconnaître la fondation.

**Tells IA (§4.1).**
- Sur-titre en capitales espacées au-dessus de chaque H2 et filet dégradé vert → or (`SectionHeader.tsx:35-60`).
- Métadonnées « A · B · C » dans le badge du hero : « Domaine 06 / 06 · 100 % Gratuit… » (`MobilityHub.tsx:62`).
- Pastilles 01/02/03 sur trois arguments qui ne sont pas des étapes (`MobilityHub.tsx:136`), et 01 / 02 en filigrane sur les deux portes (l.163-168, 215-220).
- Témoignages signés d'un prénom et d'une initiale (« Boris K. », « Raïssa T. »).
- Flèche ↗ sur chaque bouton, fondu et montée sur chaque en-tête de section.

**Formes et composants.** Rayon de 24 px presque partout, 20 px sur la FAQ, 16 px sur les tuiles d'icône. Bordure fine et ombre sur les mêmes cartes : pas de stratégie de profondeur unique. Les deux « portes » (Académie en blanc, Accompagnement en vert) sont la seule variation de la page, mais leurs boutons n'ont pas le même style pour deux actions de même rang.

**Structure et parcours.** L'ordre se tient : pourquoi → choisir sa porte → FAQ → candidater. Mais sur téléphone l'avertissement occupe presque un écran avant tout contenu (T-14), et « pourquoi » passe avant le choix, alors que le visiteur veut d'abord savoir quoi faire. Le bloc final met côte à côte « Candidater gratuitement » et un grand bouton rouge « Financer un parcours » sans dire qu'un don ne donne jamais accès à une place (ARN-02). Il manque âge et diplôme requis, lieu des cours, mode de sélection (ACAD-06) et frais restant à la charge du jeune.

**Typographie.** Fraunces et DM Sans : couple lisible, registre « fondation classique ». H1 jusqu'à 4,1 rem, interligne 1,1 : sage, pas une affiche. « C1) » reste seul en fin de ligne dans le titre de la carte Académie à 1440 ; beaucoup de textes en 12 px.

**Couleurs.** Vert #0F3D2E, or #E8A317 et rouge #C8102E sur crème : palette justifiée par le drapeau. Les textes passent (or sur vert à 5,6:1). En thème sombre, le bouton vert « Accéder à l'Académie » se fond dans sa carte (1,25:1, TOK-03).

**Espace.** Marges généreuses et alignement à gauche tenu à 1440, mais « Choisissez votre porte » et la FAQ sont centrées et cassent l'axe. 8 750 px à 390, soit environ 10 écrans.

**Images.** Une seule vraie photo, la meilleure preuve du domaine, et elle est invisible (MOB-01). Aucun visage d'apprenant, aucune salle de cours.

**Contenu.** Le discours éthique est net : « Nous ne vous demandons jamais d'argent », FAQ « Non, jamais. ». Il est entamé par deux témoignages marqués TODO. « Domaine 06 / 06 » est du vocabulaire interne, « 10 pays accompagnés » est impropre (on accompagne des jeunes, pas des pays), « Accompagnement des cours de langue allemande » est maladroit.

**Note : 49/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 22/40 | Cohérent avec le site, mais c'est un gabarit : aplat vert, cartes identiques, aucune image visible. |
| Utilisabilité | 18/30 | Parcours clair ; trois appels dans le hero, avertissement envahissant sur téléphone, pas de version anglaise. |
| Créativité | 6/20 | Aucune idée visuelle propre ; la carte Cameroun → Europe existe mais reste sur l'accueil. |
| Contenu | 3/10 | Bon discours éthique, ruiné par les témoignages fictifs et les TODO visibles. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>MOB-01 | Hero | `src/pages/MobilityHub.tsx:46-57` | La seule vraie photo du domaine (intervention en visioconférence à l'Open Day, kakémono WAHHF visible) est posée à 25 % d'opacité sous un dégradé vert à 85 % : elle est invisible. Elle est pourtant téléchargée (sizes=100vw, jusqu'à 37 ko), et les cinq autres pages du domaine n'ont aucune image hors logo. | Pour un jeune comme pour un donateur, la preuve que le programme existe est une photo de terrain. La page la cache et la remplace par un aplat vert générique. | Montrer la photo en entier dans un cadre (ratio 16/10, object-fit cover), à côté du titre ou sous le hero, avec une légende datée (« Open Day, Yaoundé, 25 avril 2026 »). Ajouter au moins une vraie photo de cours sur l'Académie (à fournir par la fondation), en WebP de moins de 100 ko. |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-02, T-06, T-08, T-12, T-13, T-14, T-15, T-16, T-17, T-18, T-19, T-20, T-22, TOK-01, TOK-02, TOK-03, A11Y-01, A11Y-07, RESP-01, RESP-03, RESP-05, RESP-06, PERF-02, ANIM-04, MEL-01

#### Académie de langues — `/mobilite-langues/academie`

**Première impression.** La page la plus utile et la plus dense du domaine. Le hero reprend la formule de Mobilité (aplat vert, titre serif, trois boutons, encadré), puis viennent une rangée de 5 cartes de niveaux, une grande fiche blanche, un bloc vert avec le test et 7 cartes de sessions identiques. On retient le test de niveau ; le reste se confond.

**Identité (test du nom retiré, §3).** Réussi par le contenu, échoué par l'image. CECRL, Goethe, telc, TestDaF, cohortes à Douala et Yaoundé, phrases du test ancrées au Cameroun (« Ich komme aus Kamerun », « Großmutter in Douala ») : c'est le meilleur ancrage local du site. Mais aucun visuel ne le montre : ni classe, ni enseignant, ni support de cours.

**Tells IA (§4.1).**
- Sur-titres en capitales avec métadonnées « · » : « Auto-évaluation gratuite · 20 questions », « Cohortes gratuites (Dates indicatives — TODO) » (`LanguageAcademy.tsx:318, 455`).
- Numéros 01 à 07 en filigrane sur les cartes de sessions, qui ne forment pas une séquence et sont à moitié cachés par le bouton (`CourseCard.tsx:22-27`).
- Cartes de sessions identiques : ombre maison, bordure et soulèvement au survol (`CourseCard.tsx:20`).
- « Gratuit » 5 fois dans la rangée des niveaux, puis 7 « Gratuit · Financé par WAHHF » et 7 « Aucun frais demandé » (T-12).
- Un seul mot coloré dans le titre du résultat du test : le niveau, en or (`LanguageAcademy.tsx:349`).

**Formes et composants.** La « frise » est une grille de 5 cartes reliées par un trait de 2 px visible seulement dans les 12 px d'intervalle ; sur téléphone, 2 colonnes avec C1 seul sur sa ligne. La fiche (carte de 24 px avec 4 tuiles crème de 16 px), le test (carte vert moyen à ombre forte dans une section verte) et les sessions (ombres maison) font trois profondeurs différentes sur une page.

**Structure et parcours.** L'ordre niveaux → test → calendrier → certifications se défend, mais le test devrait passer avant la fiche : on ne connaît pas encore son niveau. Le clic sur un niveau ramène en haut de page (ACAD-02), un filtre peut vider la grille sans message (ACAD-03), et le bouton Candidater d'une session perd le format choisi (ACAD-01). Le bouton rouge « Soutenir l'Académie » est glissé dans le bloc des certifications, qui s'adresse aux apprenants (ARN-02). Il manque les conditions d'admission, le nombre réel de places, le profil des formateurs et les frais d'examen officiels.

**Typographie.** « C1 » seul en fin de H1 à 1440. Titres de sessions en casse anglaise (« Fondations & Communication Quotidienne »), mois avec majuscule (« 14 Septembre 2026 »). Heures des niveaux en 11 px, intitulés coupés (ACAD-08). Paragraphe des certifications à environ 125 caractères par ligne.

**Couleurs.** Bonne alternance crème / vert : fiche claire, test sombre, calendrier clair. Les icônes or sur blanc (2,2:1) sont décoratives, donc tolérables ; le rouge du don attire l'œil dans un bloc pour apprenants.

**Espace.** Densité tenue à 1440. À 390 : 10 195 px (environ 12 écrans), dont plus de 3 000 px de calendrier, et près de 2 écrans de hero et d'avertissement avant les niveaux.

**Images.** Aucune : une académie sans photo de classe ni d'enseignant ne prouve pas qu'elle existe.

**Contenu.** Le contenu pédagogique est concret et bien écrit (objectifs, « ce que vous savez faire »). Mais environ 14 TODO sont visibles (durées, prochaine session, certifications, option « Présentiel au Cameroun (TODO) »), et des sessions déjà commencées sont annoncées avec des « places disponibles ». Le financement varie : « Financé par WAHHF » sur les cartes, « financé par le groupe IROKO et nos donateurs » ailleurs.

**Note : 48/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 21/40 | Alternance claire / sombre bien rythmée, mais composants de gabarit et aucune image. |
| Utilisabilité | 15/30 | Saut en haut de page au choix d'un niveau, filtre sans état vide, format perdu à la candidature, test peu accessible au lecteur d'écran. |
| Créativité | 9/20 | Le test de niveau interactif, ancré au Cameroun, est une vraie idée. |
| Contenu | 3/10 | Contenu pédagogique solide, mais TODO visibles et dates passées présentées comme à venir. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>ACAD-01 | Cartes de sessions → Candidater | `src/components/wahhf/CourseCard.tsx:87`<br>`src/pages/ApplyPage.tsx:23-29, 48` | Le bouton « Candidater » d'une carte de session ne transmet que le niveau (`?souhait=cours_allemand&niveau=A1`). Le formulaire ne lit ni le format ni la session et se règle par défaut sur « En ligne » : cliquer sur la cohorte présentielle de Douala ouvre une candidature au cours en ligne (déduit du code). | Le jeune croit s'inscrire à la cohorte de Douala et envoie une autre demande sans s'en apercevoir. Le choix fait sur la carte est perdu au moment décisif. | Passer l'identifiant de session dans l'URL (`?session=sess-a1-dla`) et pré-remplir niveau et format dans ApplyPage. Afficher en tête du formulaire « Vous candidatez à : A1, présentiel Douala » avec un lien « changer ». |
| important<br>ACAD-02 | Rangée des 5 niveaux | `src/pages/LanguageAcademy.tsx:168-171`<br>`src/components/Layout.tsx:38-45`<br>`src/effects/PageTransition.tsx:11` | Chaque niveau de la rangée est un lien vers /academie/{niveau}. Comme routeKey renvoie « academie » pour toutes ces adresses, Layout croit rester sur la même page sans ancre et appelle scrollToTop({ immediate: true }) : un clic sur B1 ramène d'un coup au hero (déduit du code, non reproduit au navigateur). Le lien « Programme B1 » des cartes de session, à environ 3 000 px du haut, fait de même. | Tout visiteur perd ce qu'il regardait et doit redescendre d'environ 1 500 px (2 000 px sur téléphone) pour lire la fiche choisie ; au clavier, le focus reste sur un lien hors de l'écran. Le commentaire de PageTransition promet pourtant que « l'état de la page est conservé ». | Dans Layout, ne pas remonter en haut quand la clé de transition ne change pas (ou passer un state { keepScroll: true } dans le Link), puis défiler vers la fiche et y placer le focus. Autre voie : faire de la rangée des onglets qui changent l'état sans changer de route. |
| important<br>ACAD-03 | Calendrier des sessions (filtres) | `src/pages/LanguageAcademy.tsx:489-493`<br>`src/services/api.ts:361-440` | Seuls A1 (Douala) et B1 (Yaoundé) ont une session en présentiel : A2, B2 ou C1 + « Présentiel » vide la grille sans aucun message. Le nombre de sessions affichées n'est jamais annoncé. | Le jeune croit qu'il n'existe aucune session pour lui et quitte le parcours. Une grille qui se vide sans explication paraît cassée (§5.5 : vide n'est pas erreur, mais il faut dire pourquoi et quoi faire). | Si filteredSessions est vide, afficher « Pas de session en présentiel pour ce niveau pour l'instant : les cours en ligne sont gratuits et accessibles partout », avec « Voir les sessions en ligne » et « Être prévenu de la prochaine session ». Afficher « 3 sessions » au-dessus de la grille, dans un role=status. |
| important<br>ACAD-04 | Test de niveau (annonces) | `src/pages/LanguageAcademy.tsx:332-339, 376-395, 431-440` | Le test cumule des défauts déjà relevés : réponses sans état (A11Y-02), nouvelle question non annoncée et focus perdu au démarrage comme à la fin (A11Y-03). S'y ajoute une barre de progression sans role=progressbar ni aria-valuenow : au lecteur d'écran, on ne sait pas où l'on en est. | Plancher §5.6 : un utilisateur non voyant clique « Question suivante » sans entendre la nouvelle question. L'outil phare de l'Académie lui reste fermé. | Faire de chaque question un fieldset dont la legend est l'énoncé, avec des boutons radio natifs, et placer le focus sur la legend à chaque question. Ajouter role=progressbar avec aria-valuemin, max et now, et un role=status « Question 3 sur 20 ». |
| important<br>ACAD-05 | Test de niveau (langue et contraste) | `src/pages/LanguageAcademy.tsx:376, 395-417`<br>`src/services/api.ts:676-696` | Les 20 énoncés et leurs réponses sont en allemand, sans lang="de" : la synthèse vocale française les lit comme du français. Les trous « ______ » peuvent être lus caractère par caractère selon le réglage de ponctuation du lecteur d'écran. Le compteur « Question X sur 20 », or en 12 px sur #14523E à 90 %, est à 4,31:1. | Échec du critère 3.1.2 Langue d'un passage (AA), sur l'outil même qui sert à évaluer l'allemand. Échec léger du critère 1.4.3 pour le compteur. | Mettre lang="de" sur l'énoncé et sur chaque réponse. Remplacer « ______ » par un trou visuel aria-hidden suivi de `<span className="sr-only">(blanc)</span>`. Écrire le compteur avec le token gold-on-green (#F2B544). |
| important<br>ACAD-06 | Sessions et candidature (aussi Mobilité) | `src/components/wahhf/CourseCard.tsx:76`<br>`src/pages/MobilityHub.tsx:17-34`<br>`src/pages/LanguageAcademy.tsx:489-493` | Les cartes affichent « 24 places disponibles (indicatif) », mais aucune page du domaine ne dit ce qui se passe après la candidature : critères de sélection, date limite, délai de réponse, entretien ou test, liste d'attente si la cohorte est pleine. | Pour un programme gratuit à places limitées, une attribution sans règle connue nourrit la méfiance. Elle ouvre la porte aux intermédiaires qui prétendent « réserver une place » contre paiement, exactement ce que le domaine combat. | Ajouter un bloc « Après votre candidature » en 3 ou 4 étapes datées (accusé de réception, test ou entretien, réponse sous X jours, liste d'attente) et une question de FAQ « Comment les places sont-elles attribuées ? ». Règles réelles à fournir par la fondation. |
| finition<br>ACAD-07 | Hero (bouton principal) | `src/pages/LanguageAcademy.tsx:29-31, 129-134` | Sans niveau dans l'URL, le niveau par défaut est A1 : le bouton or du hero dit « Candidater au niveau A1 » à tous les visiteurs, avant tout test. | Un jeune de niveau B1 reçoit comme premier appel une candidature au niveau débutant. Le bouton décide à sa place et contredit le test proposé juste à côté. | Sans niveau dans l'URL, écrire « Candidater (choisir mon niveau) ». Ou faire du test le bouton principal (« Trouver mon niveau en 5 minutes ») et de la candidature le bouton secondaire. |
| finition<br>ACAD-08 | Rangée des 5 niveaux (intitulés) | `src/pages/LanguageAcademy.tsx:194` | Chaque intitulé de niveau est coupé par line-clamp-1 : « Survie & Échanges… », « Maîtrise Académique &… ». | Cette rangée est la navigation principale de la page : il faut cliquer pour savoir ce que recouvre un niveau. | Raccourcir les intitulés à la source (« Découverte », « Survie », « Autonomie », « Fluidité », « Maîtrise ») et retirer line-clamp, ou passer à 2 lignes avec text-wrap: balance. |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-05, T-06, T-08, T-12, T-14, T-15, T-16, T-17, T-18, T-19, T-21, TOK-01, TOK-02, TOK-03, ETA-06, A11Y-01, A11Y-02, A11Y-03, A11Y-07, A11Y-11, RESP-01, RESP-04, RESP-06, PERF-02, ANIM-04, ANIM-05, MEL-01

#### Niveau A1 — `/academie/a1`

**Première impression.** Presque identique à l'Académie : même H1, même description, même hauteur (5 603 px à 1440, 10 195 px à 390). Seuls le fil d'Ariane (« / Niveau A1 ») et le titre de l'onglet changent. Le visiteur qui a cliqué « Niveau A1 » arrive sur un hero générique et doit descendre d'environ 1 500 px (2 000 px sur téléphone) pour trouver la fiche.

**Identité (test du nom retiré, §3).** Même constat que l'Académie : contenu local fort, aucun visuel propre.

**Tells IA (§4.1).** Ceux de l'Académie, plus un H1 générique (« Académie de langues — Allemand A1 à C1 ») sur une page censée ne parler que du niveau A1.

**Formes et composants.** Identiques à l'Académie. La carte A1 de la rangée est surélevée et passe en vert, comme sur l'Académie où A1 est choisi par défaut (LanguageAcademy.tsx:29-31) : rien ne signale donc qu'on est sur la page du niveau A1.

**Structure et parcours.** Une page de niveau devrait ouvrir sur le niveau : titre, durée, prochaine session, bouton Candidater, puis les autres niveaux. On y arrive par les puces de niveaux de Mobilité (`MobilityHub.tsx:191`), la recherche du header (`Navbar.tsx:188`) et les cartes de sessions, et l'on y retrouve tous les défauts de parcours de l'Académie (ACAD-01 à ACAD-08), dont le saut en haut de page. L'adresse /academie/a1 sort aussi de l'arborescence /mobilite-langues/… que montre le fil d'Ariane.

**Typographie.** Identique à l'Académie (« C1 » orphelin dans le H1, heures en 11 px).

**Couleurs.** Identiques à l'Académie.

**Espace.** La fiche du niveau demandé commence sous le pli, après le hero, l'avertissement et la rangée des niveaux.

**Images.** Aucune.

**Contenu.** Mêmes TODO et mêmes dates passées que l'Académie (« Prochaine session : Septembre 2026 (TODO : confirmer date) »).

**Note : 44/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 20/40 | Gabarit de l'Académie, sans rien qui signale le niveau choisi en haut de page. |
| Utilisabilité | 13/30 | Le lien direct ne mène pas au niveau : la fiche est à 1 500-2 000 px sous le hero. |
| Créativité | 8/20 | Le test reste la seule idée propre, hérité de la page mère. |
| Contenu | 3/10 | TODO et dates passées, contenu dupliqué. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>NIV-01 | Route /academie/:niveau | `src/pages/LanguageAcademy.tsx:94-101, 120-122`<br>`src/App.tsx:72`<br>`src/components/wahhf/SEO.tsx:9-30` | /academie/a1 reprend le H1, la description et la mise en page de /mobilite-langues/academie ; seuls le titre d'onglet et le fil d'Ariane changent (mesures : même hauteur, même H1). La fiche A1 commence environ 1 500 px sous le haut de page, et aucune balise canonical ne désigne la page de référence. | Le lien « Niveau A1 » promet une page de niveau et livre une page générique. Pour le référencement, les cinq adresses /academie/… et la page Académie se concurrencent. | Ajouter une balise canonical dans SEO.tsx. Puis, soit faire une vraie page de niveau (H1 « Allemand A1 : découverte et bases », durée, prochaine session, Candidater, lien vers les autres niveaux), soit rediriger vers /mobilite-langues/academie#a1 (à valider). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-05, T-06, T-08, T-14, T-17, ETA-06, A11Y-01, A11Y-02, A11Y-03, A11Y-07, A11Y-11, RESP-01, PERF-02, MEL-01

#### Accompagnement vers l'Europe — `/mobilite-langues/accompagnement`

**Première impression.** Sobre et lisible : hero vert, avertissement, 4 étapes le long d'une ligne verticale or, 5 cartes de guides, 10 cartes pays. Puis la page s'arrête net sur la carte Albanie, sans conclusion ni appel.

**Identité (test du nom retiré, §3).** Échoué. Le texte sur les voies légales est clair, mais aucun visuel ne parle du départ, du Cameroun ou de l'Europe. La carte qui trace des arcs du Cameroun vers les 10 pays existe déjà sur l'accueil et manque ici, où elle serait la signature naturelle (ACCO-03).

**Tells IA (§4.1).**
- Sur-titres en capitales : « Méthodologie d'orientation », « Guides pratiques gratuits », « 10 Pays Documentés ».
- Numéros 01 à 10 en filigrane sur les cartes pays (`EuropeSupport.tsx:594-599`), alors que leur ordre n'a pas de sens.
- 19 cartes au même rayon de 24 px avec bordure fine (4 étapes, 5 guides, 10 pays) ; les 10 cartes pays y ajoutent ombre et soulèvement au survol.
- Flèche ↗ sur chaque lien interne (« Lire le guide », « Consulter la fiche pays & liens officiels »).
- À l'inverse, « Étape 01 / 04 » est légitime : c'est une vraie séquence.

**Formes et composants.** La ligne verticale or et ses pastilles conviennent bien à une suite d'étapes : c'est la meilleure idée de mise en page du domaine. Les cartes de guides, sur 5 colonnes, sont étroites à 1440 et coupent leurs titres sur deux lignes. La carte « Éviter les arnaques », mise en avant en vert, est un bon choix. Les cartes pays affichent « DE », « LU » au lieu du drapeau sous Windows.

**Structure et parcours.** Forte redite : les 4 étapes mènent aux 4 premiers guides (ACCO-02). L'étape 4 promet la prévention des arnaques et mène au guide d'installation (ACCO-01). Aucun appel en fin de page : celui qui a lu les 10 fiches ne sait pas quoi faire. La phrase qui énumère les pays commence par le Luxembourg, la grille par l'Allemagne (PAYS-05).

**Typographie.** Correcte. Textes des cartes de guides en 12 px ; résumés pays coupés à 3 lignes au milieu d'une phrase.

**Couleurs.** Cohérentes ; badges « Membre UE » gris-vert et « Hors UE » or, lisibles.

**Espace.** Bon rythme vertical à 1440. À 390, 9 089 px, dont environ 3 000 px pour les 10 cartes pays.

**Images.** Aucune.

**Contenu.** Clair, factuel, sans promesse. Deux maladresses : « 10 pays documentés » en sur-titre et dans le titre de l'onglet, contre « 10 pays accompagnés » sur les boutons de Mobilité et des fiches pays, et « Cliquez sur chaque étape » alors que seul le bouton est cliquable.

**Note : 47/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 20/40 | Bonne ligne d'étapes, mais 19 cartes du même moule et aucune image. |
| Utilisabilité | 17/30 | Un bouton qui ment sur sa destination, contenu en double, pas de fin de page. |
| Créativité | 5/20 | La signature naturelle (carte Cameroun → Europe) est déjà codée mais absente. |
| Contenu | 5/10 | Clair et sans promesse, mais redondant. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>ACCO-01 | Parcours en 4 étapes (étape 04) | `src/pages/EuropeSupport.tsx:38-43, 478-484`<br>`src/services/api.ts:783-799` | L'étape 04 s'intitule « Connaître les démarches officielles et éviter les arnaques », mais son bouton « Lire le guide » mène au guide s-installer, « Préparer son arrivée et son intégration » (logement, Anmeldung, assurance). | Le jeune qui cherche la prévention des arnaques arrive sur une page de logement et d'assurance. Le bouton ment sur sa destination. | Aligner titre et destination : soit l'étape 4 pointe vers /accompagnement/eviter-les-arnaques, soit elle devient « S'installer en Europe » et la prévention des arnaques devient un encadré permanent. |
| important<br>ACCO-02 | Étapes, guides et fin de page | `src/pages/EuropeSupport.tsx:448-577, 580-642` | Les sections « 4 étapes » et « 5 dossiers thématiques » renvoient aux mêmes guides (étapes 1 à 4 = guides 1 à 4), avec des titres presque identiques pour les trois premiers. La page finit sur la carte Albanie, sans conclusion ni appel. | Le contenu est dit deux fois, ce qui allonge la page (9 089 px à 390) et brouille le parcours. Arrivé en bas, le visiteur ne sait pas quoi faire. | Finir la page par un bloc « Être accompagné gratuitement » + « Signaler une arnaque », comme sur Mobilité. Fusionner étapes et guides en une seule séquence de 5 étapes cliquables, l'arnaque mise en avant (à valider). |
| important<br>ACCO-03 | Fiches d'orientation par pays | `src/pages/EuropeSupport.tsx:580-642`<br>`src/components/wahhf/PresenceSection.tsx:12, 197` | Aucune signature visuelle dans le domaine. La carte EuropeMiniMap, qui trace des arcs du Cameroun vers les 10 pays, existe déjà (accueil et Notre impact, via PresenceSection), mais pas sur la page qui liste ces 10 pays. | Le test du nom retiré (§3) échoue visuellement : ces pages pourraient être celles de n'importe quelle fondation. Le seul élément propre au projet est déjà codé et dort ailleurs. | Réutiliser PresenceSection en entier (liste et carte déjà synchronisées, carte chargée à la demande) en tête de la section pays, plutôt que la carte seule, qui dépend de react-simple-maps, d3-geo et du GeoJSON. Sur téléphone, garder la liste. |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-06, T-08, T-14, T-15, T-16, T-17, T-20, T-22, A11Y-01, A11Y-11, RESP-01, RESP-04, RESP-06, PERF-02, ANIM-04, MEL-01

#### Fiche pays Allemagne — `/accompagnement/pays/allemagne`

**Première impression.** Une fiche pratique et sérieuse : trois voies, quatre étapes, liens officiels dans un bloc vert. Mais le H1 « S'orienter vers : Allemagne » sonne comme un gabarit mal rempli, et chaque lien officiel est suivi de « (TODO : vérifier lien officiel) ».

**Identité (test du nom retiré, §3).** Réussi par le texte : c'est la page la plus camerouno-allemande du domaine (ambassade d'Allemagne à Yaoundé, Ausbildung, Fachkräfteeinwanderungsgesetz). Échoué par l'image : il n'y a que le code « DE » (drapeau emoji non rendu sous Windows), isolé au-dessus du H1 sur téléphone.

**Tells IA (§4.1).**
- Titre, bouton et intertitre fabriqués par concaténation avec deux-points (PAYS-03).
- « Voie 01/02/03 » et numéros en filigrane sur trois voies qui ne forment pas une séquence (`EuropeSupport.tsx:153-181`).
- Sur-titres en capitales avec « · » : « Voies légales · Allemagne », « Sources gouvernementales & ambassades ».
- « → » écrit devant le lien vers le guide de vigilance (l.251).

**Formes et composants.** Trois cartes de voies identiques. Les liens officiels sont bien faits (carte entière cliquable, icône de lien externe) : c'est le seul usage juste de cette icône dans le domaine. La carte des étapes s'étire et laisse un grand vide (PAYS-04). Les puces vers les autres pays, en bas, offrent une bonne navigation.

**Structure et parcours.** Logique : voies → étapes → sources officielles → autres pays, avec un bouton « Être accompagné » qui ouvre la candidature avec le pays pré-rempli. Il manque des ordres de grandeur (preuve de ressources sans montant, délais, frais de visa), le centre d'examen de Yaoundé et une date de vérification (PAYS-02).

**Typographie.** H1 serif correct, mais formulation cassée. URL des liens officiels en 11 px ; « Consulter une autre fiche… » en capitales espacées.

**Couleurs.** Cohérentes. Sur les fiches hors UE, le badge rouge reprend la couleur réservée au don (`EuropeSupport.tsx:94`).

**Espace.** 2 852 px à 1440 et 5 241 px à 390 : longueur raisonnable, hormis le vide sous les étapes.

**Images.** Aucune.

**Contenu.** « Pays partenaire historique de la fondation » est affirmé sans preuve (`api.ts:448`). Les trois liens allemands sont exacts, mais la page qui demande de vérifier les sources doute publiquement des siennes (PAYS-01).

**Note : 45/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 19/40 | Bonne ossature, gabarit visible dès le H1, grand vide à 1440. |
| Utilisabilité | 18/30 | Parcours clair et navigation entre pays ; manquent ordres de grandeur et date de vérification. |
| Créativité | 4/20 | Aucun élément propre au pays au-delà du texte. |
| Contenu | 4/10 | Information juste mais incomplète, liens officiels marqués TODO. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>PAYS-01 | Liens officiels (10 fiches pays) | `src/pages/EuropeSupport.tsx:63-64, 238-240`<br>`src/services/api.ts:461-463` | Chaque lien officiel s'affiche suivi de « (TODO : vérifier lien officiel) », car le gabarit écrit `{lnk.url} ({lnk.todoNote})`. C'est le cas des 21 liens des 10 fiches (3 pour l'Allemagne, 2 pour chacun des 9 autres pays), alors que la meta description promet une « Information vérifiée ». | La page répète « Ne vous fiez jamais à des pages non officielles », puis signale qu'elle n'a pas vérifié les siennes. Un jeune ne sait plus à quelle source se fier : c'est exactement la faille qu'exploitent les escrocs. | Vérifier les 21 liens, ne plus afficher todoNote et le remplacer par « Lien vérifié le [date] », date réelle à fournir par la fondation (voir annexe). Les trois liens allemands (make-it-in-germany.com, daad.de, jaunde.diplo.de) sont déjà corrects. |
| important<br>PAYS-02 | Contenu des fiches pays | `src/pages/EuropeSupport.tsx:63-64`<br>`src/services/api.ts:443-465` | Aucune fiche n'indique de date de dernière vérification, d'auteur ni de source datée. La fiche Allemagne, pays phare, ne cite ni la Chancenkarte (carte d'opportunité, en vigueur depuis le 1er juin 2024), ni la carte bleue européenne, ni le compte bloqué (Sperrkonto), la preuve de ressources la plus courante pour un visa d'études. | Les règles d'immigration changent souvent : une fiche non datée et incomplète renvoie le jeune vers les intermédiaires que le site dénonce. Un donateur allemand qui connaît ces dispositifs doutera du sérieux de l'accompagnement. | Ajouter sur chaque fiche « Vérifié le JJ/MM/AAAA par [rôle] » avec les sources officielles, et compléter la fiche Allemagne (Chancenkarte, carte bleue UE, Sperrkonto avec ordre de grandeur et lien officiel), contenu réel à fournir par la fondation. Retirer « vérifiée » de la meta description tant que la vérification n'est pas faite (à valider). |
| important<br>PAYS-03 | H1, bouton et intertitre (gabarit des 10 fiches) | `src/pages/EuropeSupport.tsx:88, 117, 197` | Le H1, le bouton principal et un intertitre sont fabriqués par concaténation avec deux-points : « S'orienter vers : Allemagne », « Être accompagné gratuitement pour : Allemagne », « Les grandes étapes pour préparer votre projet vers : Allemagne ». | Le gabarit se voit dès le titre principal, sur les 10 fiches. En français, il faut l'article : l'Allemagne, le Luxembourg, la Grèce, le Danemark. | Ajouter aux données pays deux champs, « vers » (« vers l'Allemagne ») et « en » (« en Allemagne »). Écrire « S'orienter vers l'Allemagne » et « Être accompagné pour partir en Allemagne ». |
| finition<br>PAYS-04 | Carte « Les grandes étapes » | `src/pages/EuropeSupport.tsx:194-211` | À 1440, la carte des étapes s'étire à la hauteur du bloc vert des liens officiels et laisse environ 200 px de blanc sous la liste. | Ce vide donne une impression d'inachevé et déséquilibre la rangée. | Mettre items-start sur la grille (l.194), ou placer sous les étapes un encadré utile (« Combien de temps prévoir ? », « Ce que coûtent les démarches »), contenu réel à fournir par la fondation. |
| finition<br>PAYS-05 | Données pays et découpage du code | `src/pages/EuropeSupport.tsx:407, 584`<br>`src/data/countries.ts:17`<br>`src/services/api.ts:441` | Les 10 pays sont décrits dans deux sources (EUROPE_SUPPORTED_COUNTRIES et COUNTRIES_DATA), qui suivent le même ordre ; la divergence est dans la prose écrite en dur (sous-titre l.584 et description SEO l.407 : « Luxembourg, Allemagne… ») face à une grille qui commence par l'Allemagne. EuropeSupport rassemble trois vues en 645 lignes, LanguageAcademy quatre blocs en 520 lignes. | Deux sources pour les mêmes pays finiront par diverger, et le texte contredit déjà la grille. §5.4 : au-delà de 200 lignes, on découpe. | Une seule source de pays (slug, code, nom, coordonnées, textes) lue par la carte, les fiches et la phrase d'énumération. Découper en CountryPage, GuidePage, SupportHub, PlacementTest et SessionCalendar. |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-06, T-08, T-12, T-14, T-16, T-17, T-18, T-22, ETA-06, A11Y-01, A11Y-07, A11Y-11, RESP-01, RESP-04, RESP-06, PERF-02, MEL-01

#### Éviter les arnaques — `/accompagnement/eviter-les-arnaques`

**Première impression.** La page la plus importante pour la sécurité des jeunes est la moins marquante : même hero vert, même encadré, trois cartes blanches de texte, un bloc de liens. Seul un filet or de 4 px sous le hero la distingue. Rien n'alerte.

**Identité (test du nom retiré, §3).** Échoué, alors que le sujet s'y prête le mieux. Les exemples sont justes et locaux (« visas garantis », transfert mobile à un particulier, faux profils WhatsApp), mais rien n'est montré : pas de capture type de faux message, pas de montant en FCFA, pas de liste des canaux officiels de la fondation.

**Tells IA (§4.1).**
- Trois sections en cartes identiques, avec 01/02/03 en filigrane alors que ce ne sont pas des étapes (`EuropeSupport.tsx:334-339`).
- Coche verte devant chaque signal d'alerte (ARN-03).
- Fil d'Ariane qui finit par un slogan en capitales : « Vigilance & protection · Priorité absolue ».
- « JAMAIS » en capitales au milieu d'une phrase.

**Formes et composants.** Cartes de 24 px avec bordure et ombre, puces des guides en pilules. Rien ne distingue visuellement une mise en garde d'un avantage.

**Structure et parcours.** L'encadré d'avertissement redit la section 2 et renvoie vers la page elle-même (ARN-04). « Signaler », l'action principale, est la section la plus courte, et son seul canal est inutilisable (ARN-01). La page se termine sur « Demander un accompagnement », pas sur « Signaler ». Il manque une check-list « avant de payer quoi que ce soit », un moyen de vérifier qu'une personne fait partie de WAHHF et la conduite à tenir si l'on a déjà payé.

**Typographie.** Lisible. Lignes d'environ 120 caractères à 1440 dans les cartes ; « JAMAIS » crie sans créer de hiérarchie.

**Couleurs.** Uniformément vert et crème, sans code couleur d'alerte : le rouge existe dans la palette, mais il est réservé au don.

**Espace.** Page courte (2 760 px à 1440, 4 618 px à 390), paddings larges et uniformes.

**Images.** Aucune.

**Contenu.** Les messages sont justes et bien formulés. Ils ne disent pas qu'un don ne donne jamais accès à une place, alors que les pages voisines affichent des boutons de don (ARN-02).

**Note : 41/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 18/40 | Forme interchangeable avec les autres guides, aucun code visuel d'alerte. |
| Utilisabilité | 15/30 | Impossible de signaler en un geste ; lien vers la page elle-même. |
| Créativité | 3/20 | La page qui méritait le plus une forme propre (affiche, check-list) n'en a pas. |
| Contenu | 5/10 | Bon fond, mais canal de signalement marqué TODO et faille du don non traitée. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>ARN-01 | Section « Comment signaler une tentative de fraude ? » | `src/services/api.ts:826-831`<br>`src/pages/EuropeSupport.tsx:346-358` | Le seul canal de signalement est un texte, « integrite@wahhf-foundation.org (TODO : confirmer adresse e-mail officielle) » : pas un lien mailto, et une adresse différente du contact@ du footer. Aucun canal n'est présenté comme officiel : le numéro WhatsApp n'apparaît que dans le footer et la bulle, sans être cité comme moyen de signaler. | Sur téléphone, on ne peut ni toucher l'adresse ni se fier à une adresse marquée TODO, et une victime peut écrire à une adresse qui n'existe pas. Les arnaques passent par WhatsApp, et la page ne dit pas quel est le seul numéro officiel de WAHHF. | Créer en haut de page un bloc « Nos seuls canaux officiels » (un numéro WhatsApp, une adresse e-mail testée, « tout autre numéro n'est pas WAHHF »), coordonnées réelles à fournir par la fondation (voir annexe). Ajouter des boutons « Signaler sur WhatsApp » (lien wa.me avec message pré-rempli) et « Signaler par e-mail » (mailto avec objet), de 44 px de haut au moins. |
| important<br>ARN-02 | Guide, avertissement et boutons de don des pages apprenants | `src/services/api.ts:817-823`<br>`src/pages/LanguageAcademy.tsx:509`<br>`src/pages/MobilityHub.tsx:360` | Le guide répète que « WAHHF ne demande jamais d'argent », mais les pages destinées aux apprenants affichent des boutons de don (« Soutenir l'Académie », grand bouton rouge sur Mobilité) et la page de don propose « Mobile Money Cameroun » (`DonatePage.tsx:264`). Le guide ne dit jamais qu'un don ne donne pas accès à une place, ni qu'aucun membre ne demandera de Mobile Money à un candidat. | Les escrocs passent justement par le Mobile Money et le nom des fondations. Un faux recruteur peut dire « faites un don à WAHHF pour réserver votre place » en montrant la vraie page. | Écrire dans le guide et dans l'avertissement que les dons financent les cours d'autres jeunes, qu'ils ne donnent jamais accès à une place et qu'aucun membre de WAHHF ne demandera de Mobile Money. Placer les boutons de don de l'Académie et de Mobilité dans un encadré « Vous souhaitez soutenir ? » clairement adressé aux donateurs, ou les retirer de ces pages (à valider). |
| important<br>ARN-03 | Puces des mises en garde | `src/pages/EuropeSupport.tsx:353` | Chaque signal d'alerte (« Méfiez-vous de toute personne qui promet un visa garanti… », « Aucune ambassade… ») est précédé d'une coche verte CheckCircle2, l'icône de « validé ». La même icône sert à toutes les puces de tous les guides. | Le signe dit l'inverse du texte, sur la page la plus sensible du site. En lecture rapide sur téléphone, on lit une liste d'avantages au lieu d'une liste de pièges. | Pour les mises en garde, une icône d'alerte (AlertTriangle, OctagonX) dans une couleur « danger » distincte du rouge du don ; la coche seulement pour les bonnes pratiques (« Vérifiez sur le site officiel »). Ajouter un champ « type » par puce dans les données. |
| important<br>ARN-04 | Hero et encadré d'avertissement | `src/pages/EuropeSupport.tsx:297-300, 324-326`<br>`src/components/wahhf/DisclaimerBanner.tsx:39-47` | La page de prévention n'a pas de forme propre : seul un filet or de 4 px la distingue des autres guides. Son encadré redit aussi la section 2 (« Nous ne vous demandons jamais d'argent ») ; son lien vers la page elle-même est déjà relevé en T-14. | La page qui protège les jeunes est la moins mémorable du domaine. La redite et le lien vers soi-même font perdre du temps et affaiblissent le message. | Donner à la page une forme d'affiche : « 5 signes d'arnaque » en check-list, un exemple de faux message annoté, puis les canaux officiels (ARN-01). Pour l'encadré, appliquer T-14 : prop compact sur cette page, qui retire le lien vers soi-même (à valider). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-06, T-08, T-14, T-15, T-17, T-18, A11Y-01, A11Y-11, RESP-01, RESP-03, RESP-06, PERF-02, MEL-01

#### Agir — `/agir`

**Première impression.** Propre, mais vide. Un bandeau vert, un titre serif, trois cartes, un formulaire centré : on retient « trois cartes et un formulaire ». Ce n'est pas laid, ce n'est pas mémorable non plus.

**Identité (test du nom retiré, §3).** Échoué. « Trois manières concrètes de soutenir la jeunesse » pourrait figurer sur le site de n'importe quelle ONG ; seuls « enseignants d'allemand » et « au Cameroun et en Europe » trahissent le sujet. Aucune photo (les deux images de la page sont les logos), aucun bénévole, aucun partenaire nommé, aucun lieu.

**Tells IA (§4.1).** Sur-titre « AGIR AVEC NOUS » en capitales (TransversalPages.tsx:592) ; gabarit « hero → 3 cartes » de même coquille (l.602-653) ; « 01 · Don Solidaire » sur la seule première carte, sans 02 ni 03 (l.605) ; flèche « ↓ » ajoutée aux libellés de boutons ; icônes Lucide génériques en or (Users, Handshake).

**Formes et composants.** La carte « Faire un don » en vert plein crée une vraie hiérarchie, et le rouge reste réservé au don sur cette page : c'est bien. Les deux autres cartes sont des coquilles blanches identiques, avec des boutons recodés à la main en 12 px (environ 36 px de haut) au lieu de PrimaryButton. Un seul formulaire, de 3 champs, sert aux bénévoles comme aux partenaires.

**Structure et parcours.** Le hero n'a ni phrase d'appui ni image. Les voies bénévole et partenaire ne disent ni durée, ni lieu, ni profil recherché, ni ce que la fondation apporte. Le parcours partenaire, qui arrive ici depuis l'accueil, /partenaires et le pied de page, est cassé : formulaire réglé sur « bénévole », boutons « ↓ » sans effet visible, aucun contact nommé ni dossier. Et quoi qu'on remplisse, rien n'est envoyé.

**Typographie.** H1 en clamp(2.1rem, 4.5vw, 3.8rem) et titres de cartes en Fraunces 2xl : correct. Tout le reste est petit : labels en capitales de 12 px, champs en 14 px, boutons secondaires en 12 px. Le titre du formulaire, un H3 placé juste après le H2 « Devenir partenaire », le range sous cette carte dans le plan de la page.

**Couleurs.** Vert, crème, or et rouge cohérents avec le reste du site. En sombre, les champs gardent une bordure #0F3D2E/20 sans variante dark et se fondent dans la carte (déduit du code : pas de capture sombre de cette page).

**Espace.** Bonne respiration verticale, mais le formulaire (max-w-3xl, centré) ne s'aligne pas sur la grille des cartes (max-w-6xl) : à 1440, cartes à x ≈ 176 px et formulaire à x ≈ 336 px. À 390, la page fait 3 403 px, dont près de la moitié de pied de page.

**Images.** Aucune.

**Contenu.** Textes courts et clairs, mais creux : aucun exemple de mission, aucun chiffre. Le titre « Formulaire : Devenir bénévole » est administratif. Après envoi, le message affiche « (TODO : confirmer délai) ». Le consentement RGPD est bien formulé mais ne renvoie pas à la politique de confidentialité.

**Note : 34/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 17/40 | Hiérarchie claire autour de la carte don, mais deux coquilles identiques, boutons recodés, formulaire désaligné. |
| Utilisabilité | 10/30 | Labels non reliés, boutons « ↓ » sans effet, formulaire partenaire réglé sur « bénévole », envoi simulé. |
| Créativité | 3/20 | Gabarit « hero → 3 cartes » sans élément propre. |
| Contenu | 4/10 | Clair et court, mais aucune mission, durée ni contact concrets. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>AGIR-01 | Agir (formulaire bénévole / partenaire) | `src/pages/TransversalPages.tsx:672-706` | Les trois labels « Nom complet / Structure », « E-mail » et « Votre message » ne sont reliés à aucun champ : ni htmlFor, ni id, ni champ placé dans le label, ni aria-label. Seule la case RGPD est correcte. | Échec WCAG 1.3.1, 4.1.2 et 3.3.2 (niveau A, plancher non négociable) : un lecteur d'écran annonce « zone d'édition, obligatoire » sans dire quoi saisir. Toucher le label ne place pas non plus le curseur dans le champ. | Donner un id à chaque champ (useId) et le htmlFor correspondant à son label, par exemple agir-name, agir-email et agir-details. |
| important<br>AGIR-02 | Agir (parcours partenaire) | `src/pages/TransversalPages.tsx:569`<br>`src/pages/TransversalPages.tsx:666-669`<br>`src/components/Footer.tsx:173` | Les liens « Devenir partenaire » (pied de page), « Bâtir un partenariat » (accueil, Home.tsx:1107) et « Proposer un partenariat » (/partenaires) arrivent sur /agir#partenaire, mais le hash n'est jamais lu : le formulaire reste « Devenir bénévole » et la demande part avec roleType 'benevole'. Le « formulaire partenaire » est de toute façon identique au formulaire bénévole : 3 champs, sans structure, pays ni type de soutien. | L'institution qui veut un partenariat remplit un formulaire intitulé « bénévole », et sa demande est mal classée. Le parcours partenaire, déjà faible, casse au dernier pas. | Initialiser roleType depuis le hash (#partenaire donne 'partenaire'). Ajouter pour les partenaires : type de structure, pays, téléphone, nature du soutien (financement, accueil, expertise), et nommer un contact partenariats (à fournir par la fondation). |
| important<br>AGIR-03 | Agir (boutons « ↓ ») | `src/pages/TransversalPages.tsx:625-631`<br>`src/pages/TransversalPages.tsx:645-651` | « Remplir le formulaire bénévole ↓ » et « Proposer un partenariat ↓ » changent seulement le titre du formulaire, sans faire défiler ni déplacer le focus. À 390, ce titre est 160 à 430 px sous les boutons (boutons vers y ≈ 840 et 1 107 px, titre vers y ≈ 1 267 px) : au moment de l'appui, il est souvent sous le bas de l'écran. | La flèche promet un déplacement qui n'arrive pas : sur téléphone, l'appui semble sans effet (§5.5, retour d'action). | Au clic, régler roleType puis faire défiler jusqu'au formulaire et placer le focus sur son titre (tabIndex={-1}), ou faire de ces boutons des liens d'ancre vers #formulaire-engagement avec le type en paramètre. Mettre la flèche « ↓ » dans un span aria-hidden pour la sortir du nom accessible. |
| important<br>AGIR-04 | Agir (contenu des trois voies) | `src/pages/TransversalPages.tsx:590-653` | Les voies bénévole et partenaire ne disent rien de concret : aucun exemple de mission, aucune durée, aucun lieu, aucun profil recherché, aucune photo de bénévole ni logo de partenaire. Le H1 n'a pas de phrase d'appui. | Un enseignant d'allemand ne sait pas ce qu'on attend de lui ni pour combien de temps : sans le nom, c'est la page « Agir » de n'importe quelle ONG (§3). | Donner à chaque voie son contenu propre : le don avec un impact concret, le bénévolat avec une mission type (par exemple « 2 h par semaine en ligne avec un groupe A2 ») et une photo de session, le partenariat avec ses formats et un contact (contenu réel à fournir par la fondation). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-08, T-14, T-16, T-17, TOK-02, TOK-03, ETA-01, ETA-02, ETA-04, A11Y-01, A11Y-02, A11Y-03, A11Y-05, A11Y-09, RESP-02, RESP-03, RESP-04, RESP-05, MEL-04

#### Faire un don — `/faire-un-don`

**Première impression.** La plus aboutie des pages de conversion : formulaire clair, quatre montants en gros chiffres serif, panneau d'impact vert rassurant. Mais c'est le gabarit standard d'un module de don (type Donorbox ou GiveWP) : on la décrit de mémoire (« 4 montants, un formulaire, une colonne verte ») sans la retenir. Et elle répète à chaque ligne qu'elle n'est qu'une simulation.

**Identité (test du nom retiré, §3).** À moitié échoué. « Cours d'allemand A1–C1 », « groupe IROKO » et « Mobile Money Cameroun » donnent un indice, mais il n'y a ni image, ni visage, ni preuve. L'argument le plus propre au projet (IROKO paie la structure, donc les dons vont au terrain) est noyé dans le paragraphe du hero et n'est étayé nulle part.

**Tells IA (§4.1).** Badge pilule rouge en capitales « SOUTENIR WAHHF FOUNDATION · FINANCER UN PARCOURS » (DonatePage.tsx:70-73) ; sur-titre et filet dégradé sous le titre du formulaire ; « CE QUE VOTRE DON PERMET (EXEMPLES — TODO) » avec l'icône Sparkles (l.327-329) ; quatre cartes identiques dans une carte verte (l.336-345) ; flèche « → » ajoutée au lien vers la transparence (l.365) ; trois couleurs d'état sélectionné sur un même formulaire.

**Formes et composants.** Les boutons de montant (rounded-2xl, hauts, chiffres serif) et le sélecteur ponctuel / mensuel en pilule segmentée conviennent à leur contenu. Les moyens de paiement sont en 12 px. La sélection s'exprime de trois façons, et le rouge du bouton final n'est plus exclusif. Les labels sont correctement reliés aux champs (htmlFor et id), contrairement à Agir.

**Structure et parcours.** Hero sans image, puis formulaire (7/12) et colonne d'impact et de transparence (5/12). Le lien entre montant et impact n'est pas fait, et sur mobile le panneau d'impact arrive après le bouton de don. Il manque tout ce qu'un donateur allemand vérifie (qui reçoit l'argent, reçu fiscal, IBAN, contact pour les entreprises), et la « Garantie de transparence » renvoie vers une page vide. Depuis un domaine de /nos-actions, le don n'est pas présélectionné (voir ACT-02).

**Typographie.** H1 en clamp(2.1rem, 4.6vw, 3.8rem) et montants en serif : bien. Mais labels en capitales de 12 px, consentement en 12 px sur mobile, champs en 14 px, et le titre de section « Choisissez votre contribution solidaire » rivalise avec le H1. Les montants n'utilisent pas tabular-nums.

**Couleurs.** Palette vert, crème, or et rouge cohérente, mais trois éléments rouges au-dessus de la ligne de flottaison en comptant le bouton du header. En sombre, la même carte porte or plein, rouge plein et bordure or, et les champs (#0F3D2E sur carte #132A21, 1,25:1) se devinent à peine.

**Espace.** Respiration correcte à 1440, mais la colonne de droite finit bien avant celle de gauche et laisse un grand vide. À 390, la page fait 4 408 px et le premier montant n'apparaît qu'au deuxième écran : le premier écran ne contient aucune action.

**Images.** Aucune (les deux images sont les logos). Pour une page de don, l'absence de visage et de terrain est un manque majeur.

**Contenu.** « Faire un don de 50 € » est un bon libellé, avec verbe et montant. Le reste abîme la confiance : 5 « TODO » dans le panneau d'impact, « (Simulé) » trois fois, jargon de développeur. Les exemples se contredisent : 50 € paient un mois pour un étudiant, 250 € un parcours complet pour une cohorte entière.

**Note : 44/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 24/40 | Meilleure ossature du groupe, montants bien dessinés ; trois styles de sélection et aucune image. |
| Utilisabilité | 13/30 | Parcours lisible et labels reliés, mais paiement impossible, impact après le bouton sur mobile, devise ambiguë. |
| Créativité | 4/20 | Gabarit de module de don sans élément propre. |
| Contenu | 3/10 | Simulation affichée, TODO, aucune information légale ou fiscale. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>DON-01 | Faire un don | `src/pages/DonatePage.tsx:256-285`<br>`src/pages/DonatePage.tsx:90-96`<br>`src/services/api.ts:978-982` | On ne peut pas donner (volet don d'ETA-01) : submitDonation attend 500 ms puis renvoie une référence aléatoire sans rien transmettre. La page l'affiche partout : « (Simulé) » sur les trois moyens de paiement, « Simulation sécurisée — aucune donnée bancaire collectée », « formulaire de démonstration », « Formulaire prêt pour intégration Stripe / PayPal / Mobile Money via Symfony » (l.359) et, après envoi, « prestataire de paiement officiel Symfony ». | C'est la conversion principale du site, vers laquelle mènent le bouton rouge du header et 6 autres liens, et elle n'aboutit pas. Le jargon de développeur montre un chantier, et Symfony est un framework PHP, pas un prestataire de paiement. | Avant la mise en ligne, brancher au moins un vrai moyen de don : IBAN de la fondation, numéros MTN MoMo et Orange Money officiels, ou lien vers une plateforme de dons reconnue en Allemagne (à fournir par la fondation). Sinon, remplacer le formulaire par une section « Comment donner aujourd'hui » et retirer les mentions « Simulé », « démonstration » et « Stripe / PayPal / Symfony » (à valider). |
| important<br>DON-02 | Faire un don (confiance) | `src/pages/DonatePage.tsx:349-367`<br>`src/pages/TransversalPages.tsx:747-752` | Rien de ce qu'un donateur européen vérifie : statut juridique, numéro d'enregistrement, reçu fiscal (Zuwendungsbestätigung en Allemagne), IBAN, adresse, interlocuteur ; « IBAN », « reçu fiscal » et « Zuwendungsbestätigung » n'apparaissent nulle part dans src. La carte « Garantie de transparence » renvoie vers une page vide (voir TRA-01), et les mentions légales renvoient elles-mêmes à des TODO. | En Allemagne, un don sans reçu fiscal ni bénéficiaire identifiable n'est presque jamais fait, et l'absence d'Impressum complet (adresse, représentant légal, enregistrement) aggrave le doute. | Ajouter sous le formulaire un bloc « Qui reçoit votre don » : entité juridique, pays, numéro d'enregistrement, reçu fiscal oui ou non et comment l'obtenir, IBAN, contact donateurs (contenu réel à fournir par la fondation). |
| important<br>DON-03 | Faire un don (hero) et Accueil (bande finale) | `src/pages/DonatePage.tsx:78`<br>`src/locales/fr.json:133` | Le site promet que « 100 % des dons financent directement les cours de langue, l'accompagnement des jeunes et les actions de terrain » (accueil) et que « vos dons aillent directement aux actions de terrain » (hero du don), sous un encart « Garantie de transparence ». Aucun compte ni rapport publié ne le montre. | Une promesse financière chiffrée et invérifiable est exactement ce qui fait reculer un donateur averti, et elle peut être jugée trompeuse. | Remplacer la promesse par un fait vérifiable (« Les frais de structure sont pris en charge par IROKO ; voir notre budget 2026 ») avec un lien vers un document réel, à fournir par la fondation, et retirer « 100 % » tant qu'aucun compte n'est publié (à valider). |
| important<br>DON-04 | Faire un don (don mensuel et cases à cocher) | `src/pages/DonatePage.tsx:117-139`<br>`src/pages/DonatePage.tsx:288-307` | Le don mensuel est proposé sans aucune condition : ni date de prélèvement, ni moyen de l'arrêter, ni mandat. La case « Je souhaite que mon don reste anonyme publiquement » suppose une liste publique de donateurs qui n'existe nulle part, et une case de consentement RGPD est obligatoire pour gérer le don. | Un donateur européen ne s'engage pas sur un prélèvement mensuel sans savoir comment l'arrêter, et un prélèvement SEPA exige mandat et préavis. Exiger un consentement pour traiter un don paraît une base légale inadaptée (la gestion du don relève du contrat et de l'obligation légale), point à faire confirmer par un juriste. | Sous « Don mensuel », ajouter une ligne du type « Prélevé le 5 de chaque mois, modifiable ou annulable à tout moment » et créer une page « Conditions des dons » (récurrence, remboursement, reçu). Dire où les donateurs sont cités ou retirer la case d'anonymat, et remplacer la case RGPD obligatoire par une phrase d'information avec un lien vers la politique (à valider). |
| important<br>DON-05 | Faire un don (montant et impact) | `src/pages/DonatePage.tsx:144-162`<br>`src/pages/DonatePage.tsx:108-110`<br>`src/pages/DonatePage.tsx:325-347` | Le montant choisi n'est pas relié à son impact : les 4 boutons sont nus, et le panneau « Ce que votre don permet » ne réagit pas à la sélection (l.335 ne lit pas selectedAmount). Sous 1024 px, ce panneau passe après tout le formulaire, donc après le bouton « Faire un don de 50 € ». | Sur téléphone, le donateur choisit 25, 50, 100 ou 250 € sans savoir ce qu'il finance : l'argument de conversion arrive là où il ne sert plus (§5.3). | Afficher sous les montants une seule ligne d'impact qui suit la sélection (zone aria-live="polite"), par exemple « 50 € = un mois d'accompagnement linguistique », avec des exemples réels à fournir par la fondation. Remplacer ensuite la liste des 4 cartes par une photo et un chiffre réel, à fournir par la fondation (à valider). |
| important<br>DON-06 | Faire un don (états sélectionnés) | `src/pages/DonatePage.tsx:122-126`<br>`src/pages/DonatePage.tsx:153-157`<br>`src/pages/DonatePage.tsx:275-279` | Trois styles « sélectionné » coexistent dans le même formulaire : fréquence en vert plein (or plein en sombre), montant en rouge plein, moyen de paiement en vert avec texte et bordure or. Le rouge, réservé « exclusivement » au bouton de don par la règle du projet (Buttons.tsx:124), sert aussi au badge du hero, au montant choisi et au cercle de confirmation. | L'utilisateur ne peut pas apprendre une règle visuelle de sélection (§5.5), et le bouton final rouge, qui n'est plus le seul élément rouge, ressort moins. En sombre, la carte porte à la fois or plein, rouge plein et bordure or (§4.1). | Un seul style « sélectionné » pour les trois groupes, porté par un token (fond vert profond, texte crème et coche), avec une variante sombre unique. Garder le rouge pour le seul bouton « Faire un don de X € ». |
| important<br>DON-07 | Faire un don (montant libre et devise) | `src/pages/DonatePage.tsx:43`<br>`src/pages/DonatePage.tsx:166-180`<br>`src/pages/DonatePage.tsx:318` | Le libellé invite à saisir un montant « en € ou équivalent FCFA », mais la valeur est toujours lue en euros : qui tape 5000 pour 5 000 FCFA (environ 7,62 €) voit « Faire un don de 5000 € ». Les montants suggérés n'existent qu'en euros, aucun équivalent FCFA n'est affiché, et ni le minimum (5 €, bloqué par la seule validation native, au message générique) ni un plafond ne sont indiqués ; saisir 0 fait afficher « 50 € » sur le bouton. | Erreur de saisie très probable pour un donateur camerounais, avec un risque financier réel dès que le paiement sera branché. Le formulaire n'indique ni la devise ni la plage acceptée (§5.7). | Fixer min et max, afficher sous le champ « Montant entre 5 € et … € » et un message précis à la sortie du champ, en tabular-nums. Ajouter un choix de devise EUR / XAF avec la conversion affichée (« 5 000 FCFA ≈ 7,62 € », parité fixe 655,957), ou à défaut retirer « équivalent FCFA » du libellé (à valider). |
| finition<br>DON-08 | Faire un don (affectation, mobile) | `src/pages/DonatePage.tsx:205-216` | À 390, l'option affichée du menu d'affectation est coupée : « Financer un parcours : Académie d'alle… ». Les 4 libellés font de 50 à 70 caractères. | Le donateur ne lit pas à quoi il affecte son don, alors que c'est l'information décisive du champ (§5.3). | Raccourcir les options (« Académie d'allemand », « Manuels et livres », « Santé, éducation, environnement », « Là où c'est le plus urgent ») et mettre le détail dans une ligne d'aide sous le champ (à valider). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-08, T-14, T-15, T-16, T-18, T-19, ETA-02, ETA-04, A11Y-01, A11Y-02, A11Y-03, A11Y-05, RESP-03, RESP-05, MEL-01, MEL-04

#### Candidater — `/candidater`

**Première impression.** Sobre, rassurante, lisible : un formulaire en 3 étapes avec barre de progression et un avertissement anti-arnaque bien mis en avant. Pas désagréable, mais générique : rien de visuel ne parle d'allemand, de parcours ou de départ.

**Identité (test du nom retiré, §3).** Réussi par le texte, échoué par l'image. C'est la page la plus ancrée du groupe : « Ex. Marie Nguenang », « +237 6… », « Douala, Yaoundé, Bafoussam, Garoua… », « Nous ne vendons ni visa ni emploi ». Sans le nom, on devine un programme d'accompagnement du Cameroun vers l'Europe. Le visuel, lui, reste celui de n'importe quel formulaire.

**Tells IA (§4.1).** Badge en capitales « 100 % GRATUIT · FINANCÉ PAR IROKO ET NOS DONATEURS », repris presque mot pour mot par le bandeau d'avertissement juste dessous (ApplyPage.tsx:82-85, DisclaimerBanner.tsx:29-32) ; trois indicateurs pour la même étape (« ÉTAPE 1 SUR 3 », « 1. IDENTITÉ & COORDONNÉES », « ÉTAPE 01 / 03 ») ; filet dégradé sous le titre d'étape et barre de progression en dégradé vert → or ; labels en capitales espacées.

**Formes et composants.** Carte blanche de rayon 24, champs de rayon 12, boutons en pilule. Le bandeau d'avertissement vert à bordure or qui chevauche le hero est une bonne idée de mise en avant, adaptée au contenu. Les labels sont reliés aux champs. Les boutons sont recodés à la main au lieu d'utiliser PrimaryButton, et « Étape précédente » fait environ 40 px de haut.

**Structure et parcours.** Le squelette est bon : hero, avertissement, 3 étapes, confirmation. Mais rien n'est dit avant le formulaire sur qui peut candidater, les critères, le calendrier ou la suite ; le délai de réponse n'apparaît qu'après l'envoi, avec un TODO. À 390, le premier champ arrive vers 1 130 px, soit environ 1,3 écran. Le jeune n'a pas d'accès direct à cette page dans le header ordinateur. Ensuite, un champ vide bloque l'étape 1 sans message, le focus se perd à chaque changement d'étape, et à l'envoi tout reste dans le téléphone du candidat alors que l'écran confirme « votre candidature est bien enregistrée ».

**Typographie.** H1 Fraunces correct (56 px à 1440). Le titre d'étape « Vos coordonnées de contact » monte à environ 50 px dans une carte de formulaire et concurrence le H1. Labels en capitales de 12 px, champs en 14 px.

**Couleurs.** Cohérentes en clair. En sombre, le bouton « Continuer vers l'étape 2 » (#0F3D2E sur la carte #132A21, 1,25:1) se fond dans la carte : l'action principale devient l'élément le moins visible du bloc.

**Espace.** Colonne max-w-4xl, 2 colonnes de champs à 1440 et 1 à 390, intervalles réguliers. La bulle WhatsApp recouvre le bord du champ « Ville » et le bouton « Continuer » à 390.

**Images.** Aucune (les deux images sont les logos).

**Contenu.** Rassurant et honnête : « ne vendons ni visa ni emploi », « Aucun document d'identité ni aucun paiement ». « Envoyer ma candidature gratuite » est un bon libellé. Mais des TODO sont visibles dans les options de l'étape 2 (« Présentiel — Douala (lieu à confirmer — TODO) ») et dans la confirmation, et la gratuité est dite deux fois avant le premier champ, puis encore à l'étape 3.

**Note : 45/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 24/40 | Formulaire propre et avertissement bien placé ; titre d'étape surdimensionné, aucune image. |
| Utilisabilité | 11/30 | Blocage silencieux à l'étape 1, e-mail jamais validé, saisie perdue au retour, envoi local présenté comme reçu. |
| Créativité | 4/20 | Ancrage par les textes seulement ; visuel de formulaire générique. |
| Contenu | 6/10 | Textes honnêtes et ancrés au Cameroun ; TODO visibles, critères et suite absents. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>CAND-01 | Candidater (étape 1) | `src/pages/ApplyPage.tsx:264-275`<br>`src/pages/ApplyPage.tsx:165` | « Continuer vers l'étape 2 » est un bouton type="button" qui ne fait rien si un champ est vide (`if (fullName && email && phone && city) setStep(2)`, sans autre branche) : aucun message, aucun aria-invalid, aucun focus déplacé. Le format de l'e-mail et du téléphone n'est jamais vérifié, car les champs de l'étape 1 sont retirés de la page avant l'envoi final : « abc » passe comme e-mail. La touche Entrée ne fait rien à cette étape. | Échec WCAG 3.3.1 Identification des erreurs (niveau A, plancher) sur la conversion principale des jeunes : à 390, le champ vide est souvent hors écran, le candidat croit le bouton cassé et abandonne. Avec un e-mail ou un numéro faux, la fondation ne peut plus le joindre. | Faire de chaque étape un formulaire avec un bouton submit pour profiter de la validation native, ou valider au clic avec reportValidity(). Pour chaque erreur : aria-invalid, message précis sous le champ relié par aria-describedby (« Saisissez un e-mail du type nom@exemple.com », « Numéro avec indicatif, ex. +237 6… »), focus sur le premier champ en erreur. |
| important<br>CAND-02 | Candidater (conservation de la saisie) | `src/pages/ApplyPage.tsx:31`<br>`src/pages/ApplyPage.tsx:38-50`<br>`src/pages/ApplyPage.tsx:454` | Les 3 étapes et toute la saisie n'existent que dans l'état React : ni brouillon, ni étape dans l'URL. Le bouton retour d'Android quitte /candidater au lieu de revenir à l'étape précédente, et le lien « politique de confidentialité » placé dans le libellé de la case de consentement fait quitter la page au moment de cocher. Tout est alors perdu, comme au rechargement ou quand Android ferme l'onglet après un passage sur WhatsApp. | La saisie de l'utilisateur doit toujours être conservée (§5.7). Le geste retour est le réflexe le plus courant sur mobile, et le lien de consentement fait perdre les 3 étapes au pire moment. | Refléter l'étape dans l'URL (?etape=2 via setSearchParams) et sauvegarder un brouillon dans sessionStorage (dans un try/catch) à chaque sortie de champ, restauré au montage avec « Nous avons gardé vos réponses ». Ouvrir la politique de confidentialité dans un nouvel onglet ou une fenêtre <dialog>. |
| important<br>CAND-03 | Candidater (étape 3, envoi) | `src/pages/ApplyPage.tsx:471-476`<br>`src/pages/ApplyPage.tsx:445-451` | « Envoyer ma candidature gratuite » reste désactivé (opacité 50 %) tant que la case RGPD n'est pas cochée, sans aucune explication. Comme le bouton est désactivé, la validation native de la case (required) ne se déclenche jamais, et le bouton sort de l'ordre de tabulation. | Le candidat qui n'a pas vu la case voit un bouton pâle qui ne réagit pas et ne sait pas pourquoi (§5.5, §5.7). | Laisser le bouton actif ; au clic sans consentement, afficher sous la case « Cochez la case pour que nous puissions vous recontacter », relié par aria-describedby, et y placer le focus. Garder disabled seulement pendant l'envoi. |
| finition<br>CAND-04 | Candidater (paramètres d'URL) | `src/pages/ApplyPage.tsx:23-29`<br>`src/pages/ApplyPage.tsx:351-383` | Sans ?niveau, l'état vaut « A1 (Débutant) », qui ne correspond à aucune option (value="A1") : la liste affiche A1 mais une autre valeur part à l'envoi, et c'est le cas de l'entrée directe par le menu. Un ?souhait inconnu ne sélectionne aucune des 3 options et masque le choix du pays, et ?pays n'est pas vérifié non plus. Les options de format envoient « Présentiel Douala (TODO) » comme valeur. | L'état affiché ne correspond pas à l'état envoyé : les données reçues seront incohérentes (deux libellés pour le même niveau). | Valider souhait, niveau et pays contre les listes autorisées, avec des valeurs par défaut valides ('les_deux', 'A1', 'allemagne'). Remplacer « (TODO) » dans les valeurs de format par les lieux réels (contenu réel à fournir par la fondation, voir annexe). |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-08, T-09, T-12, T-14, T-16, T-19, T-22, TOK-02, TOK-03, ETA-01, ETA-02, ETA-04, A11Y-01, A11Y-02, A11Y-03, A11Y-05, RESP-03, MEL-01, MEL-04

#### Mentions légales — `/mentions-legales`

**Première impression.** Une page vide habillée : un bandeau vert, un sur-titre or en capitales « INFORMATIONS STATUTAIRES (TODO : COMPLÉTER NUMÉROS D'ENREGISTREMENT) » et deux cartes. Elle inquiète plus qu'elle ne rassure.

**Identité (test du nom retiré, §3).** Échoué. La page ne dit même pas où se trouve la fondation. Pour une ONG qui se dit camerouno-allemande, l'absence d'Impressum (les mentions légales exigées en Allemagne) est le signal le plus visible pour un visiteur allemand. Le nom développé contredit en plus celui des kakémonos.

**Tells IA (§4.1).**
- Sur-titre en capitales avec icône, qui contient lui-même un TODO (TransversalPages.tsx:747, 804).
- Chaque paragraphe enfermé dans sa propre carte, toutes identiques (T-15).

**Formes et composants.** Deux cartes blanches en rayon 24 px pour deux paragraphes : la carte n'apporte rien à un texte juridique.

**Structure et parcours.** Deux blocs, « Éditeur du site » et « Caractère non commercial du site ». Il manque presque tout ce qu'on attend (MEN-01). Le texte ne contient aucun lien (contact, confidentialité, transparence) : seul le footer y mène.

**Typographie.** H2 en Fraunces de 24 px, corps de 16 px à 80 % d'opacité : lisible.

**Couleurs.** Conformes. Le sur-titre or sur vert atteint environ 5,6:1.

**Espace.** Une grande zone crème pour peu de texte. À 390, le footer occupe environ les trois quarts de la page.

**Images.** Aucune, ce qui est normal ici.

**Contenu.** Des TODO apparaissent dans le sur-titre, dans le corps et dans la meta description, qui reprend le premier bloc (TransversalPages.tsx:752 et 801). Les informations légales elles-mêmes sont absentes.

**Note : 36/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 18/40 | Gabarit propre mais cartes inutiles et grande zone vide. |
| Utilisabilité | 16/30 | Lisible, mais aucun contact ni lien utile dans le texte. |
| Créativité | 2/20 | Sans objet sur une page légale, et rien n'y est pensé pour le lecteur allemand. |
| Contenu | 0/10 | Ni adresse, ni enregistrement, ni représentant ; TODO jusque dans le sur-titre. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>MEN-01 | Mentions légales | `src/pages/TransversalPages.tsx:745-759`<br>`src/pages/TransversalPages.tsx:801`<br>`src/pages/DonatePage.tsx:352-355` | La page tient en 2 blocs, « Éditeur du site » et « Caractère non commercial du site ». On n'y trouve ni forme juridique, ni adresse postale, ni représentant légal ou directeur de publication, ni numéros d'enregistrement (Cameroun, Allemagne), ni contact direct, ni hébergeur, ni date de mise à jour. Le sur-titre, le texte et la meta description (tirée du premier bloc) affichent « (TODO : … à compléter) ». | Un site camerouno-allemand qui vise des donateurs en Allemagne doit publier un Impressum complet si la fondation y a un établissement (§ 5 DDG, la loi allemande sur les services numériques ; à faire trancher par un juriste), et le RGPD exige l'identité du responsable du traitement. Une fondation sans adresse ni enregistrement visibles ressemble à ce que la page de prévention des arnaques apprend à fuir, et la « Garantie de transparence » du formulaire de don est démentie un clic plus loin. | Avec un juriste, compléter (contenu à fournir par la fondation, voir annexe) : dénomination exacte, forme juridique, adresses au Cameroun et en Allemagne, représentants, numéros d'enregistrement, e-mail et téléphone cliquables, hébergeur, crédits photos, contact pour le retrait d'une photo, date de mise à jour. Ajouter un Impressum en allemand et un lien « Impressum » dans le footer. |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-06, T-07, T-08, T-15, T-16, T-19, ETA-08, A11Y-01, RESP-01, RESP-02, RESP-03, RESP-06, PERF-02, MEL-01, MEL-02

#### Politique de confidentialité — `/confidentialite`

**Première impression.** Même gabarit, trois cartes. Le ton se veut rassurant (« Collecte minimale et transparente »), mais les promesses restent générales et invérifiables. Seul le bloc sur la vidéo YouTube est concret.

**Identité (test du nom retiré, §3).** Échoué : le texte est générique. Le bloc sur la vidéo YouTube fait exception. Il est propre au site, précis et honnête : c'est le bon ton pour le reste de la page.

**Tells IA (§4.1).**
- Sur-titre « RESPECT DE LA VIE PRIVÉE » en capitales (TransversalPages.tsx:762).
- Chaque paragraphe enfermé dans sa propre carte, toutes identiques (T-15).

**Formes et composants.** Ce sont les mêmes cartes blanches en rayon 24 px que pour les mentions légales et les actualités.

**Structure et parcours.** Trois blocs, sans l'ordre attendu d'une politique de confidentialité, sans sommaire ni date de mise à jour (CONF-01). Aucun lien vers les formulaires concernés ni vers un contact cliquable.

**Typographie.** Le H1 « Politique de confidentialité & Protection des données (RGPD) » tient sur 2 lignes à 1440 et 4 à 390 : c'est trop long. « Confidentialité » suffirait, le reste irait en sous-titre (à valider).

**Couleurs.** Conformes.

**Espace.** Marges correctes, mais la colonne de 832 px atteint environ 96 caractères par ligne à 1440, au-delà des 80 conseillés (RESP-06).

**Images.** Aucune.

**Contenu.** « (TODO : confirmer adresse DPO) » est visible, et l'e-mail n'est pas cliquable. La page ne décrit ni le don, ni les stockages du navigateur, ni la plupart des contenus tiers.

**Note : 39/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 18/40 | Même gabarit de cartes, H1 trop long. |
| Utilisabilité | 17/30 | Lisible, mais sans sommaire, sans date, avec un e-mail non cliquable. |
| Créativité | 2/20 | Sans objet sur une page légale ; seul le bloc YouTube est écrit pour ce site. |
| Contenu | 2/10 | Informations obligatoires absentes, traitements réels non décrits, TODO visible. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>CONF-01 | Politique de confidentialité | `src/pages/TransversalPages.tsx:760-779`<br>`src/services/api.ts:966-968` | La politique tient en 3 blocs. Il manque le responsable du traitement et son adresse, les finalités par formulaire (le don, qui recueille nom et e-mail, n'est pas cité), les bases légales, les durées de conservation, les destinataires, les transferts entre le Cameroun et l'UE, le droit de réclamation auprès d'une autorité et la date de mise à jour. Les stockages du navigateur (candidature complète dans « wahhf_applications », thème, consentement) ne sont pas décrits, et l'adresse de contact est en texte brut, suivie de « (TODO : confirmer adresse DPO) ». | Le RGPD (art. 13) impose ces informations au moment de la collecte, et les candidats, souvent jeunes, utilisent des téléphones partagés. La politique décrit en outre un envoi qui n'existe pas encore, puisqu'aucun formulaire n'envoie de données (ETA-01). | Réécrire avec un juriste (RGPD et loi camerounaise n° 2024/017, à faire confirmer) : un intertitre par traitement (candidature, don, bénévolat, newsletter, vidéo YouTube, stockages techniques) et un tableau donnée / finalité / base légale / durée / destinataire, sur le ton concret du bloc YouTube. Mettre l'e-mail en lien mailto et dater la page. |

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-06, T-07, T-08, T-15, T-16, T-19, ETA-01, ETA-08, A11Y-01, RESP-01, RESP-02, RESP-03, RESP-06, PERF-02, MEL-01, MEL-03, MEL-04

#### Pages historiques — vue d'ensemble — `/le-groupe`, `/structure`, `/poles`, `/tarifs`, `/methode`, `/fondateurs`, `/contact`, `/vkibusiness`

**Première impression.** Cliquer sur « Archives Groupe IROKO », en bas de chaque page, fait changer de site. On passe d'un site crème aux cartes arrondies à un fond vert presque noir, avec des titres en capitales grasses et des coins carrés. Sur 5 pages sur 8, des titres affichent des clés de code (GROUP.SYMBOLTITLE, PRICING.PACK1.NAME, CONTACT.COORDSTITLE…). On s'en souvient, mais comme d'un site cassé.

**Identité (test du nom retiré, §3).** Échoué. Ces pages présentent le groupe commercial IROKO : une holding, 9 pôles, des tarifs de location de sono et de mobilier, un devis événementiel, plus une carte de visite « VKI Business Group LTD ». Nom retiré, on devine une agence événementielle ou une holding de services, jamais une ONG camerouno-allemande. Quatre marques s'y croisent : WAHHF, IROKO, VKI et les tokens « ktv » d'un ancien modèle.

**Tells IA (§4.1).** Communs aux 8 pages (détail en HIS-08) :
- Sur-titre en capitales espacées au-dessus de presque chaque titre.
- Un seul mot du H1 en dégradé, sur 7 pages (`.text-gradient-violet-orange`, `index.css:244-248`).
- Grilles de 3 ou 6 cartes identiques, monospace pour les labels, les numéros et les prix.
- Violet #531FF5 et bleu nuit (Méthode, VKI), survols violets #4314d6.
- Fondu et glissement sur chaque bloc ; slogans de cabinet (« excellence opérationnelle », « prestataire d'excellence »).

**Formes et composants.** Trois systèmes de rayons : 6 pages entièrement carrées, /methode en rounded-2xl et pilules, /vkibusiness de rounded-2xl à rounded-[2rem], quand le site principal est à 24 px. La profondeur mêle des bordures blanches à 5-20 % et des ombres colorées invisibles sur fond sombre. Les mêmes boîtes portent valeurs, pôles, tarifs et étapes.

**Structure et parcours.** Aucune de ces pages n'est dans le menu. Le seul accès est « Archives Groupe IROKO », en 12 px à 75 % d'opacité dans le footer (`Footer.tsx:115`), vers /le-groupe, qui mène à /contact. /structure, /poles et /tarifs forment un îlot ; /methode, /fondateurs et /vkibusiness n'ont aucun lien entrant mais restent ouvertes à qui tape l'adresse. Les appels de ces pages mènent tous au faux formulaire de devis de /contact. Nous recommandons de rediriger chaque route vers son équivalent WAHHF (/le-groupe et /poles → /partenaires, /structure et /fondateurs → /qui-sommes-nous#gouvernance, /methode → /qui-sommes-nous, /tarifs et /vkibusiness → site d'IROKO, /contact → une vraie page Contact WAHHF), de retirer le lien du footer et de garder les fichiers sources hors routes (à valider).

**Typographie.** Titres H1 à H4 en capitales grasses (sauf sur /methode) : tout crie au même niveau. Beaucoup de textes en 9 à 12 px et des niveaux de titres sautés (HIS-09).

**Couleurs.** Le token --color-ktv-red, remappé sur le vert #0F3D2E, tombe à 1,32:1 sur le fond #09261C : sur-titres, prix, icônes et début des mots en dégradé disparaissent (HIS-03). S'ajoutent émeraude, violet, orange #FF8500, bleu et rouge VKI. Sept pages restent sombres quel que soit le thème choisi ; /vkibusiness reste claire.

**Espace.** Marges et grilles correctes à 1440 (max-w-7xl, grille de 12 colonnes), rythme vertical uniforme. Les clés brutes insécables élargissent /structure et /tarifs (TAR-01).

**Images.** Toutes viennent d'Unsplash en lien direct : une forêt de conifères présentée comme un iroko, 9 photos de bureau et de technologie, deux portraits de banque d'images présentés comme les cofondateurs. Aucune photo du Cameroun, de l'Allemagne ou de la fondation.

**Contenu.** Environ 110 clés brutes au total, jamais traduites dans ce dépôt. Le contenu commercial (devis, packs, budgets en euros, « chargé d'affaires dédié ») contredit les engagements de gratuité, et les coordonnées divergent de celles du footer.

**Note : 21/100** (moyenne des 8 pages)

| Critère | Note | Justification |
|---|---|---|
| Design | 9/40 | Hors charte, trois systèmes de couleurs et de rayons, textes invisibles, clés brutes en titres. |
| Utilisabilité | 8/30 | Faux formulaire, menu perdu à 390 sur deux pages, cul-de-sac VKI, contrastes en échec. |
| Créativité | 3/20 | Gabarit d'agence ; seuls le symbole de l'iroko et la démarche en 5 étapes méritent d'être repris. |
| Contenu | 1/10 | Contenu commercial d'un autre métier, clés brutes, portraits et citations non authentiques. |

**Problèmes propres aux pages historiques (communs à plusieurs routes)**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>HIS-01 | Tarifs, Contact, Pôles, Méthode, Structure | `src/pages/Tarifs.tsx:24-69`<br>`src/pages/Contact.tsx:21, 403-410`<br>`src/pages/Catalogue.tsx:310-321` | Le site de la fondation vend des prestations : packs à « Réserver », location de canapés Chesterfield, d'écran LED et de sono, budgets « 2 000 € à 5 000 € », « Devis rapide & garanti… chargé d'affaires dédié », « Demander un devis ». | Ces pages contredisent deux engagements écrits sur le même site : « Aucun service payant… n'y est commercialisé » (mentions légales, `TransversalPages.tsx:756`) et « WAHHF ne demande jamais d'argent » (guide anti-arnaques). Pour un donateur ou une institution allemande, une fondation qui vend de la régie événementielle fait douter de son but non lucratif. | Retirer ces contenus du domaine WAHHF : rediriger /tarifs vers le site d'IROKO, /poles vers /partenaires et /structure vers /qui-sommes-nous#gouvernance, comme dans la vue d'ensemble (Navigate replace, ou mieux une redirection 301 chez l'hébergeur), et garder les fichiers dans un dossier d'archives hors routes (à valider). |
| **bloquant**<br>HIS-02 | Le groupe, Structure, Tarifs, Contact, VKI Business | `src/i18n.ts:20-72`<br>`src/pages/Tarifs.tsx:132`<br>`src/pages/Contact.tsx:148` | Environ 110 clés de traduction brutes s'affichent comme titres, libellés et boutons (108 appels t('…') statiques sans traduction, plus 4 clés dynamiques vki.*) : GROUP.SYMBOLTITLE, STRUCTURE.HOLDINGTITLE, PRICING.PACK1.NAME, CONTACT.FORM.FULLNAME, VKI.LEGAL… Ces clés n'ont jamais existé dans le dépôt : fr.json et en.json ne contiennent que brand, nav, disclaimer, hero, home et footer. | La page paraît cassée, le visiteur ne comprend pas ce qu'on lui propose, et un formulaire dont les libellés sont des clés est inutilisable. Google peut indexer ces clés. | Ajouter un contrôle (missingKeyHandler en développement, ou script qui compare les appels t('…') aux fichiers de langue) et ne plus écraser des espaces de noms entiers dans i18n.ts. Pour toute page conservée, écrire ses textes dans fr.json et en.json ; les autres sont retirées avec HIS-01 (à valider). |
| **bloquant**<br>HIS-03 | 7 pages sur 8 (toutes sauf VKI Business) | `src/index.css:88, 244-248`<br>`src/pages/About.tsx:83, 91`<br>`src/pages/Contact.tsx:61` | Le token hérité --color-ktv-red vaut #0F3D2E, presque le même vert que le fond --color-ktv-black (#09261C) : 1,32:1. Sur-titres, accroches des pôles (1,26:1), prix, liens « Ajouter au devis », icônes des coordonnées et début de chaque mot en dégradé (« IROKO » se lit « ROKO ») sont invisibles. | Le plancher WCAG 2.2 AA exige 4,5:1 pour le texte et 3:1 pour les icônes utiles. Ici, ces éléments sont illisibles pour tout le monde. | Sur toute page conservée, remplacer ktv-red par un accent prévu pour les fonds sombres (or #E8A317 à 7,41:1, ou le token gold-on-green). Faire partir le dégradé de titre d'une couleur à 3:1 au moins sur son fond, ou ne plus l'utiliser ; les tokens ktv-* sont traités en HIS-04. |
| **bloquant**<br>HIS-04 | Les 8 pages, surtout Méthode et VKI Business | `src/index.css:87-92`<br>`src/pages/Realisation.tsx:68-166`<br>`src/pages/VkiBusiness.tsx:48-126` | Trois systèmes de couleurs coexistent : la palette WAHHF en hex bruts, les tokens ktv-* (184 usages dans 7 pages) aux noms trompeurs (ktv-red et ktv-blue valent le même vert), et une ancienne palette violet, marine et orange (#531FF5, #4314D6, #FF8500, #8B66FF, #080C14, #0D1B3E, #142FA0 : 39 occurrences dans 7 fichiers). Six boutons verts deviennent violets au survol (hover:bg-[#4314d6], 7 occurrences en comptant le bouton déjà violet de /methode), et ces pages restent sombres hors du système de thème. | Le visiteur change de site visuel en un clic, et le violet ou l'indigo est un tell IA (§4.1). Le test des tokens (§4.2) échoue : c'est un token nommé « red » mais vert qui a produit les textes invisibles de HIS-03. | Toute page conservée n'utilise que les tokens du site : rayon 24 px pour les cartes, pilule pour les boutons, thème clair et sombre. Une fois les routes retirées (HIS-01), supprimer --color-ktv-*, --font-cursive, .text-gradient-violet-orange et .bg-gradient-blend (à valider). |
| important<br>HIS-05 | Le groupe, Structure, Fondateurs | `src/i18n.ts:20-29, 57-60`<br>`src/pages/About.tsx:52, 193`<br>`src/pages/Founders.tsx:43, 122` | i18n.ts greffe un chapeau WAHHF (sur-titre et sous-titre) sur un corps resté IROKO. /le-groupe : « Fondation & valeurs » puis le H1 « Le Groupe IROKO » et une carte finale qui cherche « un prestataire d'excellence » ; /fondateurs : « Les visages qui portent l'engagement social de WAHHF » puis « Les Fondateurs d'IROKO » et « les équipes des 9 pôles » ; /structure promet un « comité éthique » puis déroule « Trois familles, neuf pôles ». | Chaque page contredit son propre en-tête : le visiteur ne sait plus si WAHHF est une fondation ou la vitrine d'une holding commerciale. C'est le doute qu'un donateur ou une institution allemande ne doit pas avoir (§3). | Ne pas continuer à rhabiller ces pages : rediriger /le-groupe vers /partenaires (section IROKO), /fondateurs et /structure vers /qui-sommes-nous#gouvernance, puis retirer de i18n.ts les espaces de noms group, structure, poles, method, founders et contact (à valider). |
| important<br>HIS-06 | Les 8 pages (titre d'onglet) | `src/components/wahhf/SEO.tsx:12-14`<br>`index.html:19` | Aucune des 8 pages n'utilise le composant SEO. Au chargement direct, elles gardent le titre et la description de l'accueil ; en navigation interne, l'onglet garde le titre de la page précédente (on peut lire « Faire un don… » sur /le-groupe). | Échec du critère 2.4.2 Titre de page (niveau A) : onglets, historique et lecteur d'écran annoncent une mauvaise page. Pour Google, ce sont 8 titres et descriptions en double. Priorité « important » et non « bloquant » parce que ces pages sont appelées à être redirigées (vue d'ensemble). | Remettre un titre par défaut dans Layout à chaque changement de route, et ajouter `<SEO title=… description=… />` à la future page Contact. Les autres pages disparaissent avec les redirections de HIS-01 (à valider). |
| important<br>HIS-07 | Pôles, Tarifs, Contact, Fondateurs, VKI Business | `src/pages/Catalogue.tsx:36, 312, 413`<br>`src/pages/Tarifs.tsx:121, 150`<br>`src/pages/VkiBusiness.tsx:160, 187, 193` | D'autres paires échouent : blanc sur émeraude #10B981 à 2,54:1 (« Consulter les tarifs », badge « Opérationnel »), blanc à 40 % en 11-12 px sur #09261C à 3,69:1, slate-400 en 9 px sur blanc à 2,56:1, icônes « copier » à 1,47:1. Sur les boutons en dégradé vert → or, le blanc tient au centre (environ 5:1) mais tombe sous 3,8:1 vers 65-70 % de la largeur. Le badge « Formule recommandée », en blanc 10 px sur un dégradé qui finit sur l'or, est à environ 2,2:1. | §5.1 : 4,5:1 pour le texte normal, 3:1 pour les composants d'interface, sans arrondir un ratio qui échoue. | Si une page est conservée : boutons pleins vert #0F3D2E à texte crème ou or à texte encre, aucun texte posé sur un dégradé, libellés de 12 px minimum à 4,5:1 au moins. Sinon, ces échecs disparaissent avec la redirection de HIS-01 (à valider). |
| important<br>HIS-08 | Les 8 pages (gabarit) | `src/pages/About.tsx:48-52`<br>`src/pages/Catalogue.tsx:218, 231, 364`<br>`src/pages/VkiBusiness.tsx:98-99` | Toutes ces pages suivent un gabarit d'agence : sur-titre en capitales espacées au-dessus de chaque titre, un mot du H1 en dégradé, petits labels en monospace, « → » sur les boutons, 01/02/03 sur des familles, grilles de cartes identiques, verre dépoli (Pôles), blobs flous (VKI). | Ce sont les tells du §4.1. Le test « autre modèle » (§4.2) échoue : une autre IA produirait la même page, et le visiteur ne voit pas une fondation précise. | Pour les contenus repris ailleurs (démarche, fondateurs), utiliser les composants du site principal sans sur-titre décoratif. Ces pages-ci ne sont pas à corriger mais à retirer avec HIS-01 (à valider). |
| important<br>HIS-09 | Les 8 pages (hiérarchie typographique) | `src/pages/About.tsx:51, 163, 181`<br>`src/pages/Structure.tsx:181`<br>`src/pages/Contact.tsx:148` | Les titres H1 à H4 sont en capitales et en font-black (sauf sur /methode, en casse normale) : la hiérarchie est plate, et beaucoup de textes font 9 à 12 px. Des niveaux sont sautés : H1 → H3 sur /tarifs, /poles, /contact et /methode, H2 → H4 sur /le-groupe, /methode et /tarifs. Les H4 passent en DM Sans quand les H3 voisins sont en Fraunces. | §5.2 : un seul H1, aucun niveau sauté, et la casse fait partie de la hiérarchie. Sous 12 px, la lecture en plein soleil sur Android devient difficile. | Pour les contenus repris : titres en casse de phrase selon l'échelle du site, corps en 16 px, libellés en 13-14 px minimum, niveaux de titres continus. |
| finition<br>HIS-10 | Le groupe, Pôles, Fondateurs, VKI Business (images tierces) | `src/pages/Catalogue.tsx:25-191, 345-349`<br>`src/pages/Founders.tsx:15, 23, 66-70`<br>`src/pages/VkiBusiness.tsx:148` | 12 images Unsplash (9 sur /poles, 2 sur /fondateurs, 1 sur /le-groupe) sont chargées en lien direct, sans width ni height, sans loading=lazy ni srcset ; sur /poles, les 9 partent d'emblée. Le QR code de /vkibusiness est fabriqué par api.qrserver.com. Plusieurs cadres sont vides sur les captures à 390, cause non établie (latence du tiers ou lien mort). | Risque de décalage de mise en page, requêtes vers des domaines tiers et affichage fragile pour un public mobile qui paie sa data (§5.9). Ces pages étant chargées à la demande, elles ne pèsent pas sur l'accueil. | Pour toute image reprise : fichier local en WebP ou AVIF, srcset, loading=lazy, decoding=async, width et height ; QR code en SVG statique. Les images actuelles partent avec les pages (à valider). |
| finition<br>HIS-11 | Pôles, VKI Business, Contact, Tarifs (cibles tactiles) | `src/pages/Catalogue.tsx:237, 437-441`<br>`src/pages/VkiBusiness.tsx:193`<br>`src/pages/Tarifs.tsx:190` | Filtres de /poles et boutons « copier » de /vkibusiness d'environ 32 px de haut, croix de la modale à 24 px sans marge, liens « Ajouter au devis » en 10 px et « Agrandir » (`Contact.tsx:424`) en 11 px. | Le minimum AA de 24 px est tenu, sauf peut-être pour les liens texte de 10-11 px ; le §2.3 vise 44 px pour une saisie au pouce. Sur des pages à retirer, c'est une finition. | Hauteur minimale de 44 px (min-h-11) sur les boutons et liens conservés, zone de clic élargie pour les icônes seules. |
| finition<br>HIS-12 | Les 8 pages (animations) | `src/pages/Realisation.tsx:95-100`<br>`src/pages/About.tsx:64-69, 171-176`<br>`src/pages/VkiBusiness.tsx:178, 214` | Fondu et glissement sur chaque bloc et chaque carte (whileInView, délais en cascade), entrées alternées gauche / droite sur /methode, icônes qui grossissent au survol, whileHover scale sur chaque carte de /vkibusiness. | Tells du §4.1 (fondu sur chaque section, survol animé sur chaque carte) ; §5.10.1 : rien ne bouge par défaut, et whileHover ne sert à rien au doigt. Le réglage « réduire les animations » est bien respecté (MotionConfig reducedMotion="user", `App.tsx:110`). | Aucun mouvement sur les contenus repris, hormis l'apparition des titres déjà gérée par SectionHeader. |
| finition<br>HIS-13 | Pôles, Fondateurs, Structure, Tarifs, VKI Business (code d'animation) | `src/pages/Catalogue.tsx:330-337`<br>`src/pages/Tarifs.tsx:108-116`<br>`src/pages/VkiBusiness.tsx:2, 172-180` | Des éléments animés par Motion (y, scale, layout) portent aussi la classe Tailwind « transition », qui couvre transform : la transition CSS rattrape chaque valeur écrite par Motion, le mouvement arrive en retard et la disposition de /poles se déforme. /vkibusiness importe « framer-motion », l'ancien nom, et package.json garde les deux paquets (une seule copie installée aujourd'hui, en 14.14.0). | §5.10.2 : un seul animateur par élément. §5.10.4 exclut framer-motion, et une montée de version pourrait installer deux copies. | Si ces pages restent : transition-colors au lieu de transition, import depuis motion/react, puis retrait de framer-motion dans package.json. Sinon, le problème disparaît avec la redirection de HIS-01 (à valider). |

**Problèmes transversaux qui touchent aussi ces pages :** T-07, MEL-01, MEL-03, MEL-02, RESP-02, T-01, RESP-01, T-06

#### Le groupe — `/le-groupe`

**Première impression.** Un hero sombre « LE GROUPE IROKO » dont le I se fond dans le fond, puis trois écrans de titres en clés brutes (GROUP.SYMBOLTITLE, GROUP.VISIONTITLE, GROUP.VALUES.VAL1 à VAL5). La page a l'air cassée ; seule la photo de forêt retient l'œil.

**Identité (test du nom retiré, §3).** Échoué. Le titre parle du groupe IROKO, le sous-titre de la branche sociale, l'appel final cherche « un prestataire d'excellence ». Le symbole de l'iroko est une vraie idée d'univers, mais il est mal illustré (GRP-01).

**Tells IA (§4.1).** Sur-titres « Fondation & valeurs », « Origine & symbole », « Nos piliers éthiques » ; « IROKO » en dégradé (`About.tsx:52`) ; 6 cartes identiques dont l'icône grossit au survol (`About.tsx:169-186`) ; filets dégradés décoratifs (l.71, 166) ; slogans creux (« Résistance absolue aux épreuves du temps »).

**Formes et composants.** Tout est carré, avec des bordures blanches à 5-10 % presque invisibles. Le bouton « Prendre contact », vert #0F3D2E sur une carte vert sombre, se détache à peine.

**Structure et parcours.** Hero → symbole → vision et mission → valeurs → appel : l'ordre est logique, mais 3 blocs sur 5 (symbole, vision et mission, valeurs) n'affichent que des clés. Le seul appel mène au devis de /contact. La page fait doublon avec /qui-sommes-nous et /partenaires, et c'est pourtant la seule page historique liée depuis le footer (elle ne mène qu'à /contact).

**Typographie.** Tous les titres en Fraunces capitales grasses ; textes des encarts en 12 px à 60 % de blanc ; H2 puis H4 dans les valeurs (`About.tsx:163, 181`).

**Couleurs.** « Enracinement », « Élévation », « Nos piliers éthiques », « Engagements 2026 » et les icônes des valeurs sont invisibles (1,32:1) ; l'or est le seul accent lisible (7,4:1).

**Espace.** Grille de 12 colonnes correcte ; à 1440, la colonne gauche du bloc symbole est presque vide face à une image en 4/5.

**Images.** Une seule, une forêt de conifères présentée comme un iroko (GRP-01).

**Contenu.** 17 clés brutes (titres et textes du symbole, de la vision, de la mission, titre des valeurs, puis les 5 valeurs et leurs textes) ; l'appel s'adresse à des clients, pas à des donateurs.

**Note : 18/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 7/40 | Clés brutes en titres, texte invisible, photo fausse. |
| Utilisabilité | 7/30 | Contrastes en échec, seul appel vers un devis. |
| Créativité | 3/20 | Bon symbole, mal illustré. |
| Contenu | 1/10 | Trois blocs sur cinq en clés brutes, ton commercial. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>GRP-01 | Bloc « Origine & symbole » | `src/pages/About.tsx:105-112` | La photo « Arbre Iroko Majestueux » montre une forêt de conifères dans la brume, chargée depuis Unsplash. L'iroko est un grand arbre tropical d'Afrique de l'Ouest et centrale. | Le symbole fondateur du groupe est illustré par un paysage nordique : contresens d'identité (§3) que n'importe quel visiteur camerounais repère. | Si le symbole de l'iroko est repris (section IROKO de /partenaires), utiliser une vraie photo d'iroko, idéalement prise au Cameroun, en WebP avec width et height. |

**Problèmes communs aux pages historiques :** HIS-02, HIS-03, HIS-04, HIS-05, HIS-06, HIS-08, HIS-09, HIS-10, HIS-12.

**Problèmes transversaux qui touchent aussi cette page :** T-07, RESP-02, MEL-01, MEL-03

#### Structure — `/structure`

**Première impression.** « NOTRE structure », dont la moitié du dernier mot disparaît, puis une clé brute STRUCTURE.HOLDINGTITLE et un long organigramme de 9 pôles commerciaux, tous « À venir » sauf un. On lit le dossier de présentation d'une holding.

**Identité (test du nom retiré, §3).** Échoué : holding, familles Business / Digital / Services, cloud, cybersécurité, investissement d'amorçage. Le sous-titre promet un « comité éthique » qui n'apparaît nulle part.

**Tells IA (§4.1).** Sur-titres « Gouvernance & organisation », « Le tronc qui porte l'ensemble » ; « structure » en dégradé (`Structure.tsx:78`) ; 3 cartes identiques icône + titre + texte ; 01/02/03 en monospace sur des familles qui ne forment pas une séquence (l.156) ; badges de statut en monospace 9 px (l.181) ; bandeau final en dégradé décoratif.

**Formes et composants.** Trois niveaux de cadres carrés imbriqués (section, famille, pôle), chacun bordé : des boîtes empilées sans hiérarchie. « Échanger avec la direction » est un bloc blanc plein, seul de ce style sur le site.

**Structure et parcours.** Hero → rôle de la holding → 3 familles × 3 pôles → appel. Trois boutons « Voir les fiches » mènent au même endroit (STR-01) et « Consulter les packs & tarifs » à une page cassée. Rien sur ce qu'un donateur allemand cherche sous « structure » : conseil de fondation, statuts, contrôle des comptes.

**Typographie.** Capitales grasses partout, descriptions en 12 px, badges en 9 px.

**Couleurs.** Sur-titres, numéros, icônes des rôles et lien vers les tarifs sont invisibles (1,32:1) ; le badge « Opérationnel » est en émeraude, hors palette.

**Espace.** Rythme régulier mais lourd ; à 390, la clé brute élargit la page et le bouton menu disparaît (TAR-01).

**Images.** Aucune, seulement des icônes Lucide génériques dans un vert invisible.

**Contenu.** 3 clés brutes (titre et texte du bloc holding, notice légale qui n'affiche que sa clé) ; vocabulaire de cabinet (« allocation optimale des moyens ») ; 8 pôles sur 9 « À venir ».

**Note : 17/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 8/40 | Boîtes imbriquées sans hiérarchie, textes invisibles. |
| Utilisabilité | 5/30 | Menu inaccessible à 390, contrastes en échec, boutons redondants. |
| Créativité | 2/20 | Organigramme d'entreprise standard. |
| Contenu | 2/10 | Gouvernance d'une holding, pas d'une ONG. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| finition<br>STR-01 | Boutons « Voir les fiches » (et badge de /poles) | `src/pages/Structure.tsx:162-168`<br>`src/pages/Catalogue.tsx:220-223` | Les trois boutons « Voir les fiches », un par famille, mènent tous à /poles sans filtre. Sur /poles, le badge « Dix pôles, dont la holding » et le H1 « Nos 9 pôles » se tiennent (9 pôles plus la holding), mais se lisent comme une contradiction. | Trois boutons pour une même destination ajoutent du bruit sans aider, et deux chiffres en haut de page sèment le doute. | Le point disparaît avec la redirection de HIS-01. Si la page reste : un lien /poles?famille=… qui active le filtre, et un seul chiffre en haut de /poles (à valider). |

**Problèmes communs aux pages historiques :** HIS-01, HIS-02, HIS-03, HIS-04, HIS-05, HIS-06, HIS-08, HIS-09, HIS-12, HIS-13 ; débordement et menu perdu à 390 : TAR-01.

**Problèmes transversaux qui touchent aussi cette page :** T-07, RESP-01, RESP-02, MEL-01

#### Pôles — `/poles`

**Première impression.** La plus finie des huit : filtres, recherche, bandeau « Pôle opérationnel actif » et grille de 9 cartes photo. Mais c'est un catalogue de services d'entreprise sur fond quasi noir, illustré par une banque d'images : propre, oubliable, hors sujet.

**Identité (test du nom retiré, §3).** Échoué : IROKO Event, Academia, Engineering, App, Cloud, Security, Ventures… rien de social. Même la formation vise des « dirigeants et cadres supérieurs ».

**Tells IA (§4.1).** Badge monospace « Dix pôles, dont la holding » ; « d'activité » en dégradé ; 9 cartes identiques (même image, même liste à coches, mêmes 2 boutons) ; étiquettes en monospace (`Catalogue.tsx:355-390`) ; verre dépoli sur les filtres et les étiquettes (l.231, 364) ; zoom au survol sur chaque image.

**Formes et composants.** Cartes carrées cohérentes entre elles. Boutons à deux accents (émeraude pour le pôle actif, vert ailleurs) avec un survol violet ; « Détails de la fiche » et « Contact » ont le même poids. La modale n'a ni fond défini ni comportement de dialogue (POL-01).

**Structure et parcours.** Hero → filtres → bandeau → grille → lien vers /structure. Les 8 boutons « Contact » et « Demander un devis » mènent au faux formulaire, « Consulter les tarifs » à une page cassée, et la recherche n'affiche rien sans résultat (POL-02). On n'y arrive que depuis /structure.

**Typographie.** Noms de pôles lisibles ; accroches en 12 px capitales dans un vert invisible ; trois rendus (serif, sans, mono) dans une carte de 400 px.

**Couleurs.** Accroches à 1,26:1 (`Catalogue.tsx:382`), boutons émeraude à texte blanc à 2,54:1 (HIS-07).

**Espace.** Grille régulière à 1440 ; 8 365 px à 390, avec des filtres sur 4 lignes.

**Images.** 9 photos Unsplash de bureau et de technologie, aucune camerounaise ; cadres vides sur les captures (HIS-10).

**Contenu.** Textes cohérents mais commerciaux (« Donner une voix forte à votre marque »), sans lien avec les 6 domaines de la fondation.

**Note : 30/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 13/40 | Grille propre mais générique, contrastes ratés. |
| Utilisabilité | 10/30 | Filtres utiles, mais modale inaccessible et pas d'état vide. |
| Créativité | 4/20 | Catalogue B2B standard. |
| Contenu | 3/10 | Services d'entreprise sans rapport avec la mission. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>POL-01 | Modale « Détails de la fiche » | `src/pages/Catalogue.tsx:428-442`<br>`src/lib/useDialog.ts:34`<br>`src/lib/scrollLock.ts:12` | La modale est une simple div fixe : ni role=dialog, ni aria-modal, ni piège à focus, ni fermeture par Échap, et le focus n'y est pas déplacé. La croix n'a pas de nom accessible, le fond bg-ktv-dark-gray n'existe pas dans @theme, et sans data-lenis-prevent ni verrouillage du défilement, la molette fait défiler la page derrière la modale. | Plancher §5.6 : au clavier, le focus reste derrière le voile, et un lecteur d'écran n'annonce ni l'ouverture ni la fermeture. Priorité ramenée à « important » parce que /poles n'est liée que depuis /structure. | Si la page reste : un vrai `<dialog>` ouvert avec showModal() via useDialog, aria-label « Fermer » sur la croix, lockScroll() et data-lenis-prevent, focus rendu au bouton d'origine. Sinon, la rediriger avec les autres pages historiques (à valider). |
| finition<br>POL-02 | Recherche et filtres | `src/pages/Catalogue.tsx:234-289, 326` | Sans résultat, la grille disparaît sans message. Le champ de recherche n'a pas de libellé (placeholder seul) et son texte fait 12 px ; les filtres de famille n'exposent pas leur état (pas d'aria-pressed, état actif rendu par la seule opacité). | §5.5 : un état vide invite à agir ; §5.6 : un libellé par champ ; sur iPhone, un champ sous 16 px déclenche un zoom. Priorité basse : la page n'a aucun lien entrant depuis le site WAHHF. | Si la page reste : message « Aucun pôle ne correspond à « … » » avec un bouton « Effacer la recherche », label sr-only, texte du champ en 16 px, aria-pressed sur les filtres. |

**Problèmes communs aux pages historiques :** HIS-01, HIS-03, HIS-04, HIS-06, HIS-07, HIS-08, HIS-09, HIS-10, HIS-11, HIS-12, HIS-13 ; focus invisible de la recherche : CTC-04.

**Problèmes transversaux qui touchent aussi cette page :** T-07, RESP-02, MEL-01, MEL-03

#### Tarifs — `/tarifs`

**Première impression.** Une page cassée de haut en bas : PRICING.BADGE, pricing.subtitle, PRICING.PACK1.NAME, puis pricing.pack1.price en très gros caractères qui sortent des cartes. Entre les clés, des lignes de location : « Canapés Chesterfield », « Écran LED Pitch 2.6mm », « micros HF Shure/Sennheiser ».

**Identité (test du nom retiré, §3).** Échoué : une grille de prix de régie événementielle, sur le site d'une fondation qui écrit « WAHHF ne demande jamais d'argent ». C'est la page la plus dangereuse du site pour sa crédibilité (HIS-01).

**Tells IA (§4.1).** Gabarit « 3 formules, celle du milieu agrandie » (scale-105 et badge « Formule recommandée », `Tarifs.tsx:116-124`) ; prix en monospace (l.132) ; sur-titre « Flexibilité totale » ; « tarifs » en dégradé ; bouton en dégradé vert → or (l.150) ; « → » sur les liens.

**Formes et composants.** Trois cartes carrées ; celle du centre, agrandie à 105 %, déborde sur ses voisines. Quatre cartes d'options identiques.

**Structure et parcours.** Hero → avis → 3 formules → options → bouton devis ; les 8 boutons et liens (3 formules, 4 options, devis final) mènent au faux formulaire de /contact. Rien à garder pour une ONG. On y arrive par /structure et /poles.

**Typographie.** Clés insécables en monospace text-4xl / text-5xl qui débordent (TAR-01), listes en 12 px, liens « Ajouter au devis » en 10 px.

**Couleurs.** Prix et liens « Ajouter au devis » invisibles (1,32:1) ; le blanc du bouton « Réserver ce pack » passe sous 3,8:1 vers la droite.

**Espace.** Débordement de 57 px à 1440 et bouton menu coupé à 390 (TAR-01) ; grand vide sous le hero.

**Images.** Aucune.

**Contenu.** 38 clés brutes, aucun prix réel affiché, rien en FCFA alors que le formulaire lié parle en euros.

**Note : 8/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 3/40 | Clés brutes en très gros caractères, débordements, textes invisibles. |
| Utilisabilité | 4/30 | Débordement aux deux largeurs, menu perdu sur téléphone. |
| Créativité | 1/20 | Gabarit de grille tarifaire standard. |
| Contenu | 0/10 | Aucun prix réel, offre commerciale contraire à la mission. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>TAR-01 | Prix des formules (et titre de /structure) | `src/pages/Tarifs.tsx:106, 132, 170`<br>`src/pages/Structure.tsx:94-95` | La clé non traduite pricing.pack3.price, chaîne insécable de 19 caractères en monospace 48 px (environ 500 px dans une carte d'environ 310 px utiles), sort de l'écran : /tarifs déborde de 57 px à 1440. À 390, la même cause et STRUCTURE.HOLDINGTITLE en text-3xl capitales élargissent la page : le bouton menu est coupé sur /tarifs et /structure, où il sort même entièrement de l'écran (captures ; la mesure automatique donnait 0). | Défilement horizontal accidentel (§5.3) et navigation principale perdue sur téléphone, sur des pages encore en ligne que l'on ouvre par leur adresse ou depuis /structure et /poles. Le visiteur n'est pas bloqué (défilement latéral, footer), mais il perd le menu. | Ajouter overflow-wrap: anywhere et min-w-0 sur les prix et les titres, avec overflow-x: clip sur html et body comme simple filet, puis vérifier à 320, 360 et 390 px. La vraie correction reste la redirection des routes historiques et le retrait du lien du footer, voir HIS-01 (à valider). |

**Problèmes communs aux pages historiques :** HIS-01, HIS-02, HIS-03, HIS-04, HIS-06, HIS-07, HIS-08, HIS-09, HIS-11, HIS-12, HIS-13.

**Problèmes transversaux qui touchent aussi cette page :** T-07, RESP-01, RESP-02, MEL-01

#### Méthode — `/methode`

**Première impression.** On croit être sur un autre site : fond bleu nuit #080C14, cartes arrondies, orange vif #FF8500, bouton pilule violet électrique. C'est la plus lisible des huit, mais sans aucun lien avec la charte verte et or.

**Identité (test du nom retiré, §3).** Échoué : des titres d'ONG (« Écoute & Diagnostic », « 100 % gratuit pour les bénéficiaires ») sur des détails de régie événementielle (MET-01). Le titre annonce « Nos réalisations » et n'en montre aucune.

**Tells IA (§4.1).** Palette bleu nuit, violet #531FF5 et orange (HIS-04) ; double numérotation, « 01 » en monospace puis « 1. » dans le titre ; sur-titre double « Notre approche de terrain • Excellence opérationnelle » ; filet dégradé violet → orange (`Realisation.tsx:140`) ; entrées alternées gauche / droite et bouton qui grossit au survol.

**Formes et composants.** rounded-2xl sur les cartes, tuiles d'icônes rounded-xl, bouton pilule à ombre violette : un troisième système de rayons. C'est pourtant la seule page du groupe où la forme suit un vrai contenu séquentiel, et la numérotation y est légitime.

**Structure et parcours.** Hero → 5 étapes → 3 engagements → appel : la séquence est claire, mais l'appel « Lancer votre projet avec notre équipe » mène au devis. Aucune page ne pointe vers /methode.

**Typographie.** Fraunces en casse normale, avec une meilleure hiérarchie que le reste du groupe ; détails en 12 px ; numéros en monospace très gras qui dominent les titres.

**Couleurs.** Tout en hex bruts dans le composant. Blanc sur #531FF5 à 7,3:1, correct ; « Méthode » en dégradé commence par un vert invisible sur le bleu nuit.

**Espace.** Colonne de 5 étapes aérée, bien empilée à 390 ; la section des engagements passe sur un gris #161616 sans raison.

**Images.** Aucune.

**Contenu.** Ton d'agence (« Garantie d'envoi en 48 heures ouvrées chrono »). Les 5 étapes restent une bonne base pour expliquer la démarche de la fondation.

**Note : 29/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 11/40 | Lisible mais hors charte, violet et bleu nuit. |
| Utilisabilité | 13/30 | Séquence claire, appel vers un devis, page orpheline. |
| Créativité | 3/20 | Gabarit d'étapes d'agence. |
| Contenu | 2/10 | Titres sociaux contredits par des détails de régie. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>MET-01 | Les 5 étapes et l'appel final | `src/pages/Realisation.tsx:16-62, 82, 164-168` | Les étapes ont des titres d'ONG, mais leurs détails décrivent de la régie événementielle : « Visite technique ou analyse du plan de salle », « Devis modulaire en euros (€) », « Balance acoustique complète », « Démontage soigné et remise en état des lieux ». Le H1 promet « Nos réalisations » sans en montrer aucune, et le bouton invite à « Lancer votre projet avec notre équipe ». | Le texte se contredit dans chaque carte : le visiteur ne sait plus si la fondation accompagne des jeunes ou installe des sonos. | Réécrire les détails de chaque étape pour la fondation (par exemple « Entretien d'orientation gratuit », « Test de niveau d'allemand »), contenu réel à fournir par la fondation. Déplacer cette démarche dans /qui-sommes-nous, dans la charte du site, puis rediriger /methode (à valider). |

**Problèmes communs aux pages historiques :** HIS-01, HIS-03, HIS-04, HIS-06, HIS-08, HIS-09, HIS-12.

**Problèmes transversaux qui touchent aussi cette page :** T-07, MEL-01

#### Fondateurs — `/fondateurs`

**Première impression.** Une mise en page éditoriale correcte : grand portrait noir et blanc, nom en capitales, citation avec filet or. Puis on comprend que les portraits sont des photos de banque d'images : la page la plus soignée devient la plus problématique.

**Identité (test du nom retiré, §3).** Échoué. « Les fondateurs d'IROKO » en titre, « l'engagement social de WAHHF Foundation » en sous-titre, « Co-fondateur — Groupe IROKO & WAHHF Foundation » en rôle : on ne sait pas de quelle organisation il s'agit.

**Tells IA (§4.1).** « d'IROKO » en dégradé ; rôle en monospace dans un badge à étincelle (`Founders.tsx:80-83`) ; portrait noir et blanc qui se colore au survol et pastille bouclier décorative (FON-03) ; pied de carte en monospace « Gouvernance Groupe IROKO », sans fonction.

**Formes et composants.** Carte carrée, photo en 4/5 bien cadrée. La citation porte une bordure gauche or de 4 px, une bordure décorative épaisse (§4.1).

**Structure et parcours.** Hero → 2 fondateurs → appel. Aucun lien n'entre sur cette page ; l'appel parle des « équipes des 9 pôles » et renvoie au devis de /contact et à /structure. De son côté, la gouvernance de /qui-sommes-nous ne nomme encore personne : les deux devraient n'en faire qu'une.

**Typographie.** Bio en 16 px et citation en Fraunces 20 px, lisibles ; trop de petits textes en capitales autour du nom.

**Couleurs.** L'or est lisible (7,4:1) ; « Échanger avec l'équipe » est invisible, « Gouvernance Groupe IROKO » en blanc à 40 % est à 3,7:1.

**Espace.** Bonne respiration en deux colonnes à 1440 ; cadres photo vides sur les captures à 390.

**Images.** Deux portraits de banque d'images sous les noms réels des cofondateurs (FON-01). La galerie contient pourtant de vraies photos de l'Open Day (« Prise de parole », « Photo souvenir ») dont les personnes restent à nommer (`docs/audit-mouvement.md:521`).

**Contenu.** Bios d'une ligne, citations de dirigeant non sourcées (FON-02). Rien sur le parcours des fondateurs, leur lien avec le Cameroun et l'Allemagne, ni la raison d'être de la fondation.

**Note : 30/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 15/40 | Composition soignée, mais images fausses. |
| Utilisabilité | 12/30 | Lisible, mais page orpheline et appel vers un devis. |
| Créativité | 3/20 | Mise en page éditoriale classique. |
| Contenu | 0/10 | Portraits et citations non authentiques attribués à des personnes réelles. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>FON-01 | Portraits des cofondateurs | `src/pages/Founders.tsx:15, 23, 68` | Deux portraits de banque d'images Unsplash (photo-1507003211169 et photo-1500648767791), en noir et blanc, sont présentés sous les noms réels des deux cofondateurs de la fondation, avec alt={founder.name}. La page n'est liée nulle part et absente du sitemap, mais elle n'a pas de noindex et son adresse se devine. | Attribuer le visage d'un inconnu à une personne nommée trompe le visiteur et pose un problème de droit à l'image ; une recherche d'image inversée retrouve la photo sur Unsplash. Pour une fondation qui dénonce les fausses promesses, la confiance dans tout le site tombe. | Remplacer ces photos par de vrais portraits, avec l'accord écrit des intéressés (photos réelles à fournir par la fondation), ou ne mettre aucun portrait. Présenter les fondateurs dans /qui-sommes-nous#gouvernance, puis rediriger /fondateurs (à valider). |
| important<br>FON-02 | Citations des cofondateurs | `src/pages/Founders.tsx:14, 22`<br>`src/pages/TransversalPages.tsx:136-156` | Deux citations entre guillemets sont attribuées à des personnes nommées, sans source, sur un ton de holding : « Construire un groupe d'envergure… », « complémentarité sans faille entre nos métiers ». La page officielle /qui-sommes-nous#gouvernance, elle, ne nomme encore personne (« TODO : noms officiels à confirmer »). | Le site prête à de vraies personnes des paroles qu'elles n'ont peut-être jamais dites, sur un ton étranger à la fondation, en plus des témoignages fictifs déjà relevés (§5.8, vérité du contenu). | Remplacer ces citations par des paroles écrites ou validées par écrit par les intéressés (contenu réel à fournir par la fondation, voir annexe), à publier dans /qui-sommes-nous#gouvernance avec noms, rôles et photos validés. Rediriger ensuite /fondateurs (à valider). |
| finition<br>FON-03 | Traitement des portraits | `src/pages/Founders.tsx:69, 73-75` | Les portraits sont en noir et blanc et ne prennent leurs couleurs qu'au survol de la souris ; une pastille bouclier décorative en dégradé est posée sur le coin de chaque photo. | Sur mobile, on ne voit jamais les visages en couleur, ce qui retire toute chaleur ; le bouclier ne porte aucun sens (§4.2). Le point tombe si les photos sont retirées (FON-01). | Avec de vraies photos : couleur par défaut et plus de pastille bouclier (à valider). |

**Problèmes communs aux pages historiques :** HIS-03, HIS-04, HIS-05, HIS-06, HIS-07, HIS-08, HIS-09, HIS-10, HIS-12, HIS-13.

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-02, T-07, MEL-01, MEL-03

#### Contact — `/contact`

**Première impression.** Une autre entreprise. « CONTACTEZ IROKO », dont la moitié gauche du dernier mot disparaît, puis un formulaire dont tous les libellés sont des clés (CONTACT.FORM.FULLNAME, contact.form.typeSeminar), un bloc « Devis rapide & garanti », des numéros en +20 et une carte vide. On ne comprend ni à qui l'on écrit, ni pourquoi : mémorable, pour de mauvaises raisons.

**Identité (test du nom retiré, §3).** Échoué. Le sous-titre est celui de la fondation (« Une question sur nos actions, le bénévolat ou le mécénat ? »), mais le formulaire est un devis événementiel : type d'événement, invités, budget, son, lumière, écran, scénographie 3D, liste des pôles IROKO. Nom retiré : un loueur événementiel.

**Tells IA (§4.1).** Sur-titres « Contact & écoute », « Engagement 48h » ; « IROKO » en dégradé (`Contact.tsx:61`) ; bouton d'envoi pleine largeur en dégradé vert → or qui grossit au survol (l.333) ; libellés de 10 px en capitales très espacées (l.148) ; numéros de téléphone en monospace (l.375-376).

**Formes et composants.** Tout est carré, sauf la carte OpenStreetMap en rayon 24 px (l.414) : deux systèmes dans la même colonne. À 390, les onglets et les cases « besoins » débordent de leurs cellules.

**Structure et parcours.** Des onglets « devis » et « groupe » hors sujet, des coordonnées fausses, un argument commercial. Aucun parcours WAHHF : candidat, bénévole, partenaire, presse. Cette page reçoit pourtant les liens de 6 pages historiques ; on y arrive en deux clics depuis le footer de tout le site (« Archives Groupe IROKO » → /le-groupe → « Prendre contact »), et /contact est l'adresse qu'un visiteur tape d'instinct, alors que le menu n'a aucune entrée « Contact ».

**Typographie.** font-black en capitales partout, libellés de 10 px, champs de 12 px (zoom automatique sur iPhone) ; H1 puis H3 directement.

**Couleurs.** La page reste sombre même en thème clair. Icônes des coordonnées invisibles ; bordure des champs en blanc à 10 %, à 1,35:1 : on devine à peine les champs.

**Espace.** Grille 8/4 cohérente ; grands vides à droite sous les coordonnées.

**Images.** Aucune, hors une iframe OpenStreetMap chargée sans passer par le bandeau de cookies, vide sur les captures.

**Contenu.** 38 libellés sur 41 en clés brutes, promesse intenable (« traitées sous 48 heures ouvrées par un chargé d'affaires dédié »), « (TODO : adresse exacte) » visible à l'écran.

**Note : 9/100** (deux évaluations : 9 et 10/100)

| Critère | Note | Justification |
|---|---|---|
| Design | 5/40 | Charte étrangère, clés brutes partout, titre à moitié invisible. |
| Utilisabilité | 3/30 | Faux envoi, champs non étiquetés, focus invisible, coordonnées fausses. |
| Créativité | 1/20 | Formulaire de devis standard. |
| Contenu | 0/10 | Contenu d'un autre métier, coordonnées contradictoires. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>CTC-01 | Page entière | `src/pages/Contact.tsx:57-61, 191-311, 403-410`<br>`src/i18n.ts:68-72`<br>`src/App.tsx:92` | /contact est le formulaire de devis événementiel d'un autre modèle : « Contactez IROKO », onglets devis et groupe, champs budget, invités et scénographie 3D, bloc « Devis rapide & garanti ». 38 libellés sur 41 sont des clés brutes (seuls badge, title et subtitle existent dans i18n.ts), jusqu'à l'écran de succès. | C'est l'adresse qu'un visiteur devine, atteinte en deux clics depuis le footer de toutes les pages et liée par 6 pages historiques. Quiconque y arrive conclut à un site recyclé ou à une arnaque, et la crédibilité de toute la fondation en souffre. | Créer une vraie page Contact WAHHF dans la charte du site : motif du message en boutons radio (candidat, bénévole, partenaire ou institution, presse, autre), nom, e-mail, message, coordonnées réelles et bouton WhatsApp ; l'ajouter au menu et au footer. Le formulaire de devis actuel quitte la route /contact (à valider). |
| **bloquant**<br>CTC-02 | Envoi du formulaire | `src/pages/Contact.tsx:37-44, 116` | Le formulaire n'envoie rien : handleSubmit attend 800 ms avec un setTimeout, puis affiche un écran de succès, lui-même en clé brute (contact.form.successTitle). Le formulaire est démonté : le focus est perdu et rien n'est annoncé. | Un bénévole, un donateur ou un jeune croit avoir écrit à la fondation, et son message est perdu. Le succès annoncé est faux (§5.8) et il n'existe aucun état d'erreur réel (§5.5). | La nouvelle page Contact devra envoyer réellement, avec état de chargement, erreur actionnable et confirmation qui reprend le verbe (« Message envoyé »). D'ici là, afficher à la place du formulaire l'e-mail, le téléphone et le WhatsApp du footer, en retirant le faux formulaire (à valider). |
| **bloquant**<br>CTC-03 | Colonne des coordonnées | `src/pages/Contact.tsx:375-387`<br>`src/components/Footer.tsx:199-205`<br>`src/pages/VkiBusiness.tsx:38-39` | /contact affiche +20 151 594 8907 et +20 237 557 872 (+20 est l'indicatif de l'Égypte), contact@irokogroup.com et event@irokogroup.com, quand le footer de la même page affiche un numéro en +237 et contact@wahhf-foundation.org. /vkibusiness ajoute un troisième jeu (+49 30 1234567, contact@irokogroup.com). | Le visiteur peut appeler un mauvais numéro. Surtout, le site apprend aux jeunes à se méfier des coordonnées incohérentes : afficher plusieurs jeux, dont un à l'étranger, ressemble précisément au signal qu'il dénonce. | Créer une seule source de vérité pour les coordonnées (fichier de configuration), lue par le footer, la page Contact et le bouton WhatsApp, qui concordent déjà entre eux. Retirer des pages WAHHF les numéros en +20 et les adresses irokogroup.com (à valider). |
| important<br>CTC-04 | Champs, onglets et cases « besoins » | `src/pages/Contact.tsx:148-158, 294-307, 325`<br>`src/pages/Catalogue.tsx:283-289` | Aucun libellé n'est relié à son champ (label sans htmlFor, input sans id), et les placeholders sont eux aussi des clés brutes. Les 9 champs remplacent l'anneau de focus (focus:outline-none) par une bordure #0F3D2E sur un fond à base de #09261C, environ 1,3:1 : le focus est invisible, comme sur la recherche de /poles. Libellés en 10 px, champs en 12 px, aucun autocomplete, cases « besoins » sans aria-pressed, onglets sans role=tab ni aria-selected. | Échecs WCAG 1.3.1, 4.1.2 et 2.4.7 : un lecteur d'écran annonce des zones d'édition sans nom, un utilisateur au clavier ne voit pas où il écrit, et l'iPhone zoome sur chaque champ. Priorité « important » et non « bloquant » seulement parce que la page entière est à remplacer (CTC-01) : c'est le cahier des charges de la nouvelle page. | Dans la nouvelle page Contact : un label htmlFor par champ, champs en 16 px, autocomplete name, email et tel, inputMode tel, erreurs reliées par aria-invalid et aria-describedby. Anneau focus-visible contrasté à 3:1 au moins avec outline-offset, jamais d'outline-none sans remplacement, et cases à cocher natives pour les besoins. |

**Problèmes communs aux pages historiques :** HIS-01, HIS-02, HIS-03, HIS-04, HIS-06, HIS-07, HIS-08, HIS-09, HIS-11.

**Problèmes transversaux qui touchent aussi cette page :** T-01, T-07, T-09, ETA-01, MEL-01, MEL-03

#### VKI Business — `/vkibusiness`

**Première impression.** Une carte de visite numérique pour mobile : en-tête vert, logo « VKI », titre « IROKO GROUP », pilule violette, QR code vide et coordonnées dans des cartes blanches arrondies. Propre mais générique, et rien ne la relie à la fondation.

**Identité (test du nom retiré, §3).** Échoué. Une troisième marque apparaît : « © 2026 VKI Business Group - LTD », logo bleu et rouge (#142FA0, #9D0E1F), slogan « Construire aujourd'hui les entreprises de demain ». Ni WAHHF, ni ONG, ni lien Cameroun–Allemagne.

**Tells IA (§4.1).** Blobs flous dans l'en-tête (`VkiBusiness.tsx:98-99`) ; pilule violette #531FF5 à ombre colorée (l.126) ; rayons de rounded-2xl à rounded-[2rem] ; ombres shadow-2xl colorées ; libellés de 9 px en capitales espacées ; whileHover scale sur chaque carte ; icône Instagram en dégradé violet → orange.

**Formes et composants.** Système cohérent en interne (cartes blanches rounded-2xl, carte légale verte rounded-[2rem] à ombre forte), mais étranger au reste du site.

**Structure et parcours.** QR → coordonnées → réseaux → mentions légales : lisible au pouce, mais sans aucune sortie vers le site (VKI-01). Aucune page n'y mène ; si des cartes imprimées y renvoient, il faut une redirection plutôt qu'une suppression.

**Typographie.** Valeurs en 16 px gras, lisibles ; libellés en 9 px (clés VKI.WEBSITE, VKI.MOBILE…) illisibles en plein soleil ; titres de section en Fraunces 10 px.

**Couleurs.** Libellés slate-400 sur blanc à 2,56:1, icônes « copier » à 1,47:1, chevrons à 1,23:1 ; quatre accents (vert, violet, bleu, rouge).

**Espace.** Colonne de 448 px confortable sur mobile ; à 1440, bande étroite au milieu d'un grand fond gris, acceptable pour une carte de visite.

**Images.** QR code fabriqué par api.qrserver.com, cadre vide sur les captures (HIS-10).

**Contenu.** 8 clés brutes (VKI.WEBSITE, VKI.MOBILE, VKI.PHONE, VKI.EMAIL, VKI.SOCIALS…) ; numéro « +49 30 1234567 » en forme d'exemple ; numéros RC « 46009 » et fiscal « 771-037-279 » sans pays ni registre ; « Registration (RC) » et « Tax Code » en anglais, écrits en dur.

**Note : 24/100**

| Critère | Note | Justification |
|---|---|---|
| Design | 12/40 | Propre mais générique et hors charte. |
| Utilisabilité | 8/30 | Cul-de-sac, contrastes en échec, numéro douteux. |
| Créativité | 3/20 | Carte de visite numérique standard. |
| Contenu | 1/10 | Hors sujet pour la fondation, clés brutes. |

**Problèmes propres à la page**

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>VKI-01 | Page entière (carte de visite VKI) | `src/pages/VkiBusiness.tsx:29-38, 134, 148, 191-196, 250-267`<br>`src/components/Layout.tsx:75-81` | La page est un cul-de-sac à la marque d'une autre société : header et footer masqués, aucun lien vers le site, et les identifiants légaux de VKI Business Group Ltd (RC 46009, Tax Code 771-037-279) publiés sur le domaine WAHHF. Le numéro « +49 30 1234567 » a la forme d'un exemple, le QR est demandé à api.qrserver.com avec l'URL en paramètre, et un main est imbriqué dans celui du Layout. Les boutons « copier » n'ont pas de nom et affichent « copié » même si le presse-papiers échoue. | Le visiteur ne peut pas rejoindre la fondation, et trois marques (VKI Business, IROKO Group, VKI Business Group Ltd) sur un domaine dont les mentions légales disent autre chose brouillent l'identité. Le numéro douteux nuit à la crédibilité, les deux main faussent les repères (§5.6) et le faux « copié » viole §5.5. | D'ici le transfert : QR généré localement, aria-label « Copier le numéro » et try/catch autour de navigator.clipboard, div au lieu du main, lien vers le site WAHHF. Ensuite, déplacer la page sur le domaine d'IROKO et rediriger /vkibusiness, surtout si des cartes imprimées y renvoient (à valider). |

**Problèmes communs aux pages historiques :** HIS-02, HIS-04, HIS-06, HIS-07, HIS-08, HIS-09, HIS-10, HIS-11, HIS-12, HIS-13.

**Problèmes transversaux qui touchent aussi cette page :** T-07, MEL-01, MEL-03

## Partie B — Audit technique

### B.1 Tokens et design system (§5.1)

Dans les faits, la palette est cohérente : 4 couleurs (crème #F5F1E8, or #E8A317, vert #0F3D2E, encre #1B1B18) font 89 % des couleurs du code. Mais elle ne passe jamais par des tokens (variables nommées, déclarées une seule fois et réutilisées partout). Les 23 tokens du premier bloc @theme ne servent nulle part, et les composants écrivent 1 531 couleurs hex en dur dans 36 fichiers. Seuls les deux tokens d'or par fond (gold-text, gold-on-green) sont utilisés, 38 fois dans 12 fichiers : le mécanisme fonctionne, il n'a simplement pas été étendu au reste. Le thème sombre est donc refait à la main avec 396 variantes dark:, et il a des oublis visibles : bouton principal fondu dans sa carte (1,25:1), cases à cocher blanches, deux fonds de base. Il manque aussi des variantes de composant (bouton or obtenu par 13 surcharges « ! ») et une échelle de z-index (5 couches à z-50). Les rayons (9 valeurs), les ombres, les niveaux de texte et les courbes d'animation n'ont pas de tokens non plus. Aucun de ces défauts ne bloque seul. Mais ils rallongent chaque correction des autres sections : c'est le premier chantier à ouvrir côté code. Les comptages viennent de grep sur src/. Les contrastes sont calculés à partir des valeurs hex (marge d'environ ± 0,05).

**Ce qui a été vérifié et comment.**
- Lecture de src/index.css (@theme, @theme inline, :root, .dark) et de Buttons.tsx, Layout.tsx, Navbar.tsx, CookieBanner.tsx, PresenceSection.tsx et WhatsAppButton.tsx.
- Comptages grep refaits pour ce rapport : 1 531 hex dans 36 fichiers .tsx ; 38 usages de gold-text et gold-on-green dans 12 fichiers ; 0 usage des tokens wahhf-* et des alias ; 184 usages de ktv-* (7 pages historiques) ; 13 surcharges !bg-[#E8A317] ; 396 variantes dark: ; 0 color-scheme ; 9 valeurs de rayon ; 6 ombres arbitraires.
- Captures : accueil@1440-p01 (bouton or) et thème sombre de l'accueil, de Candidater, de Faire un don et de Mobilité (sombre-mobilite-langues-1440-2, sombre-faire-un-don-1440-1).
- Contrastes calculés avec la formule WCAG à partir des valeurs hex et des opacités.

Voir aussi : la bordure des champs (A11Y-05), l'anneau de focus or (A11Y-01), le rôle de l'or et du rouge (T-18), les 7 clamp() des H1 (T-19), les numéros en filigrane (T-17) et l'ancienne palette violette des pages IROKO (T-07 et HIS-04).

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>TOK-01 | Tout le site (index.css et 36 fichiers de composants) | `src/index.css:60-99`<br>`src/components/Footer.tsx:28`<br>`src/components/wahhf/Buttons.tsx:37` | Les 23 tokens du premier bloc @theme (11 wahhf-* et 12 alias comme primary ou page-bg) n'ont aucun usage. Seuls gold-text et gold-on-green (@theme inline) servent, 38 fois dans 12 fichiers. Les composants écrivent 1 531 couleurs hex en dur, surtout dans Home (230), Navbar (156), EuropeSupport (153) et TransversalPages (147). La surface sombre #132A21 (55 fois) n'a pas de token, et des teintes existent en double (8 ors, 3 rouges de survol). Les anciens tokens ktv-* (184 usages, seulement dans les 7 pages historiques) ont des noms trompeurs, traités dans HIS-04 ; --font-cursive vaut lui aussi Fraunces. Trois classes de index.css sont mortes : .bg-wahhf-gradient-rule, .text-gradient-blend et .font-serif-title. | §5.1 : les composants n'utilisent que des tokens sémantiques, jamais de hex brut. Aujourd'hui, changer une teinte ou corriger le thème sombre oblige à modifier 36 fichiers à la main. C'est la cause directe des oublis du thème sombre (TOK-03) et des teintes en double. La dette grandit : docs/audit-mouvement.md relevait 1 430 couleurs en dur, il y en a 1 531 aujourd'hui. | Créer deux couches. D'abord des tokens d'univers (vert forêt, or, crème, encre, rouge). Ensuite des tokens sémantiques qui pointent vers eux, redéfinis sous .dark (--color-surface, --color-surface-raised, --color-text, --color-text-secondary, --color-action, --color-border, --color-focus), et déclarés dans @theme inline comme gold-text l'est déjà. Remplacer les hex par un script, en commençant par Buttons, SectionHeader, Navbar et Footer. Critère d'acceptation : grep « #[0-9a-f]{6} » ne trouve plus rien dans les .tsx. Supprimer les trois classes mortes. Ne retirer les ktv-* qu'en même temps que les pages historiques qui les utilisent (à valider). |
| important<br>TOK-02 | Boutons : accueil (hero, Mobilité), Mobilité, Académie, Accompagnement, Candidater, pages transversales | `src/components/wahhf/Buttons.tsx:37,42`<br>`src/pages/Home.tsx:244,525`<br>`src/pages/ApplyPage.tsx:270,393,401` | Le bouton principal n'a pas de variante or : on l'obtient avec 13 surcharges « !bg-[#E8A317] !text-[#1B1B18] ». Le rond fléché reste or (Buttons.tsx:42) : posé sur le fond or, il disparaît et seule la flèche reste (accueil@1440-p01, sombre-mobilite-langues-1440-2). Côté survol, 9 de ces boutons n'en ont aucun ; les autres passent à #f3b32b ou #f2b029. Environ 30 autres boutons en pilule (estimé) sont recodés hors de Buttons.tsx, presque tous sans survol ni variante sombre, avec l'anneau de focus par défaut du navigateur. | §5.4 : un composant par rôle. Le bouton le plus vu, « Soutenir nos actions » dans le hero, perd la forme signature du bouton. Une même action a trois survols différents. Chaque état (survol, focus, sombre) doit être corrigé bouton par bouton : par exemple, la bordure de « Étape précédente » (ApplyPage.tsx:393) est invisible en sombre. | Ajouter à PrimaryButton une prop variant="gold" (rond couleur encre #1B1B18, flèche or) et une prop size (sm, md, lg). Composer les classes avec cn(), déjà présent dans src/lib/utils.ts, au lieu de les concaténer. Créer un seul token --color-accent-hover. Remplacer les pilules recodées par PrimaryButton, SecondaryButton ou cette nouvelle variante. |
| important<br>TOK-03 | Thème sombre : Candidater, Mobilité, Académie, Faire un don, newsletter et section Présence de l'accueil | `src/components/wahhf/Buttons.tsx:37`<br>`src/index.css:119-126`<br>`src/components/wahhf/PresenceSection.tsx:166-170` | Le bouton principal vert #0F3D2E n'a pas de variante sombre. Sur les cartes #132A21, le contraste tombe à 1,25:1 et la pilule se fond dans la carte : « Continuer vers l'étape 2 », « Accéder à l'Académie de langues », et la newsletter, où champ et bouton ont la même couleur. Le libellé reste lisible : c'est une perte de hiérarchie, pas un échec WCAG. Le thème a aussi deux fonds de base (#081C15 dans .dark, masqué par #0B1F18 dans Layout.tsx:52) et aucun color-scheme, si bien que les cases à cocher restent blanches (sombre-faire-un-don-1440-1). Enfin, la carte « 10 pays » de la section Présence reste blanche sur environ 900 px de haut (choix commenté dans le code, non capturé), et le « 01 » en filigrane de Mobilité disparaît alors que le « 02 » reste visible (voir T-17). | §5.1 : en sombre, la hiérarchie doit rester celle du clair, chaque niveau d'élévation étant un peu plus clair. Ici, l'ordre s'inverse : les cartes (#132A21) sont plus foncées que les bandes et les boutons (#0F3D2E). Les boutons de la candidature et de l'Académie perdent leur présence, et un grand aplat blanc éblouit dans une page sombre. | Créer un token --color-action : #0F3D2E avec texte crème en clair ; en sombre, or #E8A317 avec texte #1B1B18, ou un vert à au moins 3:1 contre la carte. L'utiliser dans PrimaryButton, CourseCard et les boutons recodés. Garder une seule base sombre et ordonner les surfaces dans les tokens (page, puis carte, puis carte surélevée). Ajouter :root { color-scheme: light } et .dark { color-scheme: dark }. Pour la carte Présence et CountryList, passer sur les tokens de surface, ou garder le fond clair pour la mini-carte seule (à valider : le fond blanc est un choix assumé dans le code). |
| important<br>TOK-04 | Header, menu mobile, bandeau cookies, dialogue vidéo, rideau, barre de lecture | `src/components/Navbar.tsx:201,575`<br>`src/components/wahhf/CookieBanner.tsx:25`<br>`src/components/Layout.tsx:75-81` | Il n'y a pas d'échelle de z-index. Le header, le méga-menu, le menu mobile, le bandeau cookies et le dialogue vidéo sont tous à z-50 ; les autres couches ont des valeurs fixées au cas par cas (40, 100, 120, 150, 200). Le bandeau cookies, au même niveau mais placé après la Navbar dans Layout, passe au-dessus du menu mobile ouvert. De même, la barre de lecture (z-[100]) passe au-dessus du dialogue vidéo (z-50). | À la première visite sur mobile, le bandeau couvre le bas du menu, où se trouvent FR/EN et « Faire un don ». Comme le menu garde le focus clavier à l'intérieur, les boutons du bandeau sont visibles mais impossibles à atteindre au clavier. L'ordre d'affichage dépend de l'ordre du code, ce qui casse à la moindre réorganisation (§5.11). Le défaut est démontré par le code mais non capturé, car les captures ont été faites après le consentement. | Déclarer une échelle en tokens, par exemple --z-float 30 (WhatsApp), --z-header 40, --z-progress 45, --z-banner 50, --z-menu 60, --z-modal 70, --z-curtain 90, --z-skip 100, et n'utiliser qu'elle. Masquer le bandeau cookies tant que le menu mobile est ouvert. |
| finition<br>TOK-05 | Tout le site (cartes, champs, bandeaux, menus) | `src/components/wahhf/CookieBanner.tsx:25`<br>`src/pages/Home.tsx:912`<br>`src/pages/TransversalPages.tsx:204` | Aucun rayon et aucune ombre n'est en token. On compte 9 valeurs de rayon : pilule ×134, [24px] ×61, 2xl ×40, xl ×29, [20px] ×4, lg ×3, 3xl ×3, [2rem] ×2, rounded (4 px) ×1. [24px] et 3xl valent la même chose, et le bandeau cookies est le seul à 20 px. Une échelle existe pourtant dans les faits (24 px pour les cartes, 16 pour les blocs internes, 12 pour les petits éléments, pilule pour les actions), mais elle n'est pas nommée. Pour la profondeur, on trouve 6 ombres Tailwind et 6 ombres arbitraires vertes (plus une violette dans VkiBusiness). 37 éléments ombrés sur 53 ont aussi une bordure, et au survol les cartes cumulent bordure, ombre et soulèvement (Home.tsx:912). Aucune ombre n'est adaptée au sombre. La carte IROKO de /partenaires a une bordure or de 2 px. | §5.1 : un seul système de rayons, une seule stratégie de profondeur. §4.1 classe le mélange ombres + bordures parmi les signes d'une interface générée. Sans token, chaque nouvelle carte invente sa propre valeur. | Déclarer 3 rayons, chacun avec un rôle : --radius-inner 12 px (champs, vignettes, icônes), --radius-card 24 px, --radius-pill (actions, badges). Ramener [20px], [2rem], 3xl, lg et rounded à ces trois valeurs. Pour la profondeur, garder des bordures fines seules, plus une ombre unique --shadow-overlay pour ce qui flotte (header, menus, bandeau, fenêtres). En sombre, uniquement des bordures. Ramener la bordure IROKO à 1 px. |
| finition<br>TOK-06 | Tout le site (texte secondaire) | `src/index.css:71,112`<br>`src/pages/Home.tsx:938` | La hiérarchie du texte repose sur des opacités choisies au cas par cas : 8 niveaux pour l'encre (/100 à /50), 11 pour le crème. Les tokens --color-wahhf-muted et --wahhf-text-muted (#57554E) existent mais ne servent pas. La paire la plus faible est la date des actualités : texte de 12 px #1B1B18/60 sur carte blanche, à 4,55:1, juste au-dessus du seuil de 4,5:1. Sur fond crème, elle tomberait à environ 4,34:1. | §5.1 prévoit 4 niveaux de texte nommés, vérifiés en clair et en sombre. Avec 8 niveaux, l'œil ne perçoit plus de hiérarchie, et chaque nouvel usage risque de passer sous 4,5:1. | Créer 4 tokens de texte par thème (primary, secondary, tertiary, muted) avec leur tableau de contrastes. Remplacer les opacités /50 à /85 par ces tokens. |
| finition<br>TOK-07 | Animations, ancres, frises, sur-titres | `src/index.css:103,149-153`<br>`src/lib/scroll.ts:10`<br>`src/components/WhatsAppButton.tsx:20-23` | Des réglages globaux sont recopiés au lieu d'être des tokens. La courbe [0.22, 1, 0.36, 1] apparaît 19 fois dans 12 fichiers, et [0.76, 0, 0.24, 1] 12 fois. S'y ajoutent une troisième courbe pour le thème, « ease » et « ease-out » ailleurs, deux EASE_OUT redéfinis dans CameroonMap et EuropeMiniMap, et le ressort par défaut de Motion sur la bulle WhatsApp. Le décalage du header existe deux fois, 6rem en CSS et 96 en JS, synchronisés à la main. Les points de frise sont placés à -left-[21px], -left-[33px] et -left-[49px], et l'espacement des lettres des sur-titres prend 7 valeurs. | §5.1 et §5.10.3 : la courbe, les durées et les décalages sont des tokens partagés. Le ressort par défaut de Motion donne probablement un léger rebond (non mesuré), contraire à la règle « pas de rebond ». Si la hauteur du header ou un padding change, les ancres et les frises cassent sans erreur visible. | Créer un module de tokens (EASE_OUT, EASE_SCREEN, durées) exporté depuis src/lib/gsap.ts pour Motion et GSAP. Déclarer les variables CSS correspondantes dans @theme (--ease-out, --dur-fast, --dur-base, --tracking-kicker). Donner une transition explicite à WhatsAppButton. Lire --header-offset en JS avec getComputedStyle, et placer les points de frise avec une variable --timeline-x partagée avec le trait. |

### B.2 États (§5.5)

Le défaut principal est simple : aucun formulaire n'envoie rien. services/api.ts simule chaque envoi par une attente de 350 à 500 ms, puis l'écran affiche un succès, parfois avec une référence inventée (WAHHF-CAND-2026-xxxx) et la phrase « votre candidature est bien enregistrée ». Seul le don dit honnêtement qu'il est « simulé ». Autour, il manque presque tous les états demandés par le §5.5. Il n'y a pas d'état d'envoi, donc on peut envoyer deux fois. Il n'y a ni état d'erreur ni état hors ligne (0 try/catch dans src/pages). Il n'y a pas de page « introuvable ». L'écran reste vide pendant le chargement d'une page, la recherche n'a pas d'état vide, et rien ne réagit visuellement à l'appui sur mobile. Plusieurs de ces défauts restent latents tant que l'API n'est pas branchée, mais deviendront réels le jour du branchement : il faut les traiter dans le même lot. Ailleurs, la base est bonne : la visionneuse, les cartes et la vidéo du hero ont de vrais états de chargement et d'échec. Tous ces constats viennent de la lecture du code et des captures, sans interaction réelle dans un navigateur.

**Ce qui a été vérifié et comment.**
- Lecture de services/api.ts:917-992, ApplyPage.tsx, DonatePage.tsx, du formulaire Agir (TransversalPages.tsx:568-735), de la newsletter (Home.tsx:152-162 et 1134-1165), d'App.tsx, de ChunkErrorBoundary.tsx, de main.tsx et de la recherche de Navbar.tsx.
- grep sur src : 0 autoComplete, 0 inputMode, 0 aria-invalid, 0 aria-describedby, 0 noValidate, 0 role="status", 0 navigator.onLine, 0 catch dans src/pages, aucune classe active: sur un bouton WAHHF.
- Captures : candidater@1440, Faire un don en clair et en sombre (sombre-faire-un-don-1440-1), agir@390.
- Non fait : aucune interaction réelle, aucune simulation hors ligne, aucun test avec un lecteur d'écran.

Voir aussi : le focus perdu après un envoi (A11Y-03), les choix signalés par la seule couleur (A11Y-02), les données des candidats dans le localStorage (MEL-04), les messages d'état en français seulement (T-08), le paramètre ?region= ignoré (T-10), le statut 404 côté serveur (MEL-02), la page vide avant le JavaScript au premier chargement (PERF-03), les TODO dans les confirmations (T-01) et, dans les fiches de page, CAND-01 à CAND-03 (Candidater), DON-01 (don) et AGIR-03 (Agir).

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>ETA-01 | Candidater, Agir (bénévole, partenaire), newsletter de l'accueil, Faire un don | `src/services/api.ts:962-992`<br>`src/pages/ApplyPage.tsx:105-111`<br>`src/pages/TransversalPages.tsx:576-581,660-662` | Les 4 fonctions d'envoi ne font aucun appel réseau : elles attendent 350 à 500 ms puis renvoient un succès. La candidature est écrite dans le localStorage du téléphone avec une référence tirée au hasard (WAHHF-CAND-2026-xxxx), puis l'écran affiche « Merci …, votre candidature est bien enregistrée ». Agir promet un contact « sous 7 à 14 jours ouvrés », et la newsletter annonce une inscription « bien enregistrée ». Le don dit honnêtement « Intention de don simulée », mais ne collecte rien non plus (détail dans DON-01). | Ce sont de faux succès (§5.5 : un succès confirme une action réellement faite). Le jeune croit son dossier transmis et attend une réponse qui ne viendra jamais. Bénévoles et partenaires ne sont jamais recontactés, sur un site dont une page entière apprend à repérer les fausses promesses. | Avant la mise en ligne, brancher un vrai envoi : l'API Symfony prévue, un service de formulaires conforme au RGPD ou un e-mail transactionnel. N'afficher la confirmation qu'après une réponse positive du serveur (statut 2xx), avec une référence créée par le serveur. Supprimer l'écriture dans le localStorage. En attendant, remplacer chaque formulaire par un contact direct et honnête : WhatsApp ou e-mail prérempli vers une adresse réellement surveillée (à valider). |
| important<br>ETA-02 | Candidater, Faire un don, Agir, newsletter de l'accueil | `src/pages/ApplyPage.tsx:52-71`<br>`src/pages/DonatePage.tsx:45-59,312-320`<br>`src/pages/Home.tsx:156-162` | Aucun envoi n'est protégé : 0 try/catch dans src/pages, aucun test de connexion (navigator.onLine), aucun message d'erreur. Sur Don, Agir et la newsletter, le bouton n'est jamais désactivé ni relibellé pendant l'envoi : un second appui renvoie le formulaire. Sur Candidater, setSubmitting(false) n'est pas dans un finally : si l'appel échoue, le bouton reste bloqué sur « Enregistrement en cours... ». | Le défaut est latent aujourd'hui, car les simulations ne peuvent pas échouer, mais il deviendra réel dès le branchement de l'API. Sur une 3G instable, le candidat restera bloqué sans savoir si sa candidature est partie, et un double appui sur le don donnera un double débit. Le §5.5 exige des états d'envoi, d'erreur et hors ligne ; le §5.7, un message qui dit ce qui s'est passé, ce qui est conservé et quoi faire. | Dans chaque formulaire, ajouter un état « envoi en cours » : bouton désactivé, aria-busy, libellé comme « Envoi du don… » ou « Inscription… ». Utiliser try/catch/finally et conserver la saisie. En cas d'échec, afficher près du bouton un message en role="alert", par exemple : « Candidature non envoyée. Vos réponses sont conservées. Vérifiez votre connexion puis réessayez, ou écrivez-nous sur WhatsApp. » Pour le don, prévoir une clé d'idempotence côté serveur (elle empêche d'enregistrer deux fois le même paiement). À faire dans le même lot que ETA-01. |
| important<br>ETA-03 | Confirmations de Candidater, d'Agir et de Faire un don | `src/pages/ApplyPage.tsx:111,477`<br>`src/pages/TransversalPages.tsx:660-662`<br>`src/pages/DonatePage.tsx:96,359` | Le verbe change en cours de route : « Envoyer ma candidature gratuite » devient « Enregistrement en cours… » puis « bien enregistrée » ; « Envoyer ma proposition » devient « Merci pour votre proposition ». Les confirmations contiennent des TODO (« TODO : délai exact à confirmer », « TODO : confirmer délai », voir annexe). Côté don, les mentions de Symfony et de Stripe sont traitées dans DON-01. | §5.8 : le même verbe de l'action jusqu'à la confirmation, avec les mots de l'utilisateur et non ceux du système. Un TODO dans un message de confirmation touche directement la confiance des candidats et des bénévoles. | Écrire « Envoi en cours… » puis « Candidature envoyée », et « Proposition envoyée ». Pour le délai de réponse, remplacer par le contenu réel (à fournir par la fondation). Pour le don, appliquer DON-01. |
| important<br>ETA-04 | Candidater, Faire un don, Agir, newsletter de l'accueil | `src/pages/ApplyPage.tsx:181-275,471-475`<br>`src/pages/DonatePage.tsx:229-252`<br>`src/pages/Home.tsx:1147-1156` | Aucun champ du site n'a d'autocomplete, d'inputmode, d'aria-invalid ou d'aria-describedby (grep : 0). Les champs sont en 14 px (text-sm), les labels en capitales de 12 px, et le texte de consentement en 12 px sur mobile. La validation se limite aux bulles natives du navigateur, dont le texte est générique et disparaît vite. Sur Candidater, l'étape 1 qui bloque sans message et le bouton d'envoi grisé sans explication sont traités dans CAND-01 et CAND-03 (le bouton grisé garde en plus un curseur en forme de main, comme s'il était cliquable). | Le critère WCAG 1.3.5 (AA, §5.6) n'est pas respecté. Sur un Android en 3G, devoir ressaisir nom, e-mail, téléphone et ville décourage la candidature. Sous 16 px, iOS zoome sur le champ au focus (non testé sur appareil). Le §5.7 demande de dire quoi saisir, pas seulement « champ obligatoire ». | Ajouter autoComplete : name, email, tel, address-level2 (ville) et country-name sur Candidater ; name et email sur Don ; name ou organization et email sur Agir ; email sur la newsletter. type="tel" ouvre déjà le bon clavier. Passer les champs en text-base (16 px) et les labels en casse normale à 14 px. Valider dans la page plutôt qu'avec les bulles du navigateur (noValidate, message sous chaque champ relié par aria-describedby, aria-invalid). Pour l'étape 1 et la case de consentement de Candidater, appliquer CAND-01 et CAND-03. |
| important<br>ETA-05 | Tout le site sur écran tactile (boutons, choix des formulaires) | `src/index.css:6-12`<br>`src/components/wahhf/Buttons.tsx:37,94,151` | Rien ne réagit visuellement à l'appui sur mobile. Le survol est réservé à la souris (une bonne règle, index.css:6-12), mais aucun bouton WAHHF n'a d'état active: (le style appliqué pendant l'appui), et Tailwind rend transparent le surlignage au toucher d'Android. Seule la bulle WhatsApp réagit au toucher (whileTap). | Sur un Android de milieu de gamme en 3G, une seconde peut séparer l'appui de la réaction. Sans signe que l'appui a été pris en compte, on appuie deux fois (double envoi, voir ETA-02) ou on croit le bouton cassé. Le §5.5 demande un état active. | Ajouter un état active: aux boutons partagés et aux boutons de choix, par exemple active:scale-[0.98] active:brightness-95 pendant 100 à 150 ms. Ou rétablir un léger -webkit-tap-highlight-color aux couleurs de la marque. |
| important<br>ETA-06 | Tout le site (route inconnue), article, fiche pays, niveau d'académie, accompagnement | `src/App.tsx:99`<br>`src/pages/TransversalPages.tsx:452`<br>`src/pages/EuropeSupport.tsx:56-58,286` | Le site n'a aucune page « introuvable ». Une route inconnue renvoie à l'accueil sans message, et l'adresse fautive disparaît de la barre (Navigate replace). Un article inconnu affiche le premier article. Un pays inconnu (par exemple /accompagnement/pays/france) affiche la fiche Allemagne avec son titre. Un niveau inconnu affiche la fiche A1 (LanguageAcademy.tsx:29-31), et un thème inconnu la page générale. | Un lien mal copié depuis WhatsApp mène à un autre contenu sans explication. Pour un service d'orientation, montrer les démarches d'un autre pays induit en erreur. Google y voit de fausses pages d'erreur et des doublons (« soft 404 »). Le risque reste modéré, car les liens internes sont générés à partir des données. | Créer une page 404 : « Cette page n'existe pas ou a changé d'adresse », avec la recherche, des liens vers Candidater, Faire un don, les 10 pays et l'accueil, et une balise noindex. L'afficher dans chaque vue à paramètre au lieu du premier élément de la liste, ou afficher un message dédié comme « Ce pays ne fait pas partie des 10 pays accompagnés », suivi de la liste. Le serveur doit renvoyer le statut 404. |
| important<br>ETA-07 | Filet d'erreur (pages chargées à la demande, cartes) | `src/components/wahhf/ChunkErrorBoundary.tsx:42-52`<br>`src/main.tsx:7-11`<br>`src/App.tsx:52` | Le message accuse toujours la connexion (« Vérifiez votre connexion »), même pour un bug JavaScript qu'un rechargement ne corrigera pas. « Réessayer » recharge toute la page : hors connexion, on tombe sur la page d'erreur du navigateur. Les textes existent en français seulement. Aucun filet n'entoure Layout : une erreur dans la Navbar ou le Footer donne une page blanche. | §5.7 : dire ce qui s'est passé, la cause si on la connaît, et proposer une action qui marche. Sur un réseau instable et payant, recharger toute la page consomme des données et peut empirer la situation. | Distinguer l'échec de téléchargement (ChunkLoadError, ou navigator.onLine à false) de l'erreur de code. Hors ligne, afficher « Vous êtes hors connexion. La page s'affichera dès le retour du réseau. » et réessayer automatiquement à l'événement online. Traduire les messages. Ajouter un filet d'erreur racine dans main.tsx, avec le numéro WhatsApp comme recours. |
| important<br>ETA-08 | Toutes les pages (navigation entre pages) | `src/App.tsx:39-41`<br>`src/components/Layout.tsx:37-45`<br>`src/effects/PageTransition.tsx:18-31` | Pendant le téléchargement d'une page, l'écran de repli est un bloc vide (min-h-screen, aria-busy, sans texte ni role="status"), qui suit 0,25 s de fondu de sortie. Aucune page clé (Faire un don, Candidater) n'est préchargée. Au changement de route, seul le défilement est géré : le focus retombe sur la page, et la nouvelle page n'est pas annoncée. Le lien d'évitement fait pourtant déjà le bon geste (main.focus, Layout.tsx:57-63). | En 3G, l'attente vient surtout de l'aller-retour réseau, environ 0,3 à 0,8 s (estimé : les fichiers sont petits et le header reste visible). Sans aucun signe de chargement, on croit que le site a planté. Un utilisateur de lecteur d'écran n'apprend pas que la page a changé, et sa touche Tab suivante repart d'un endroit sans rapport : c'est une bonne pratique reconnue des sites d'une seule page, rattachée au critère WCAG 2.4.3. | Remplacer le bloc vide par un squelette (bande verte et titre) avec role="status", aria-busy et un texte masqué « Chargement de la page… ». Précharger au survol, au focus ou au toucher le code des pages faire-un-don, candidater et mobilite-langues. Après chaque navigation (onExitComplete), placer le focus sur le h1 (tabIndex -1) ou sur main, et annoncer document.title dans une zone aria-live="polite" (lue par le lecteur d'écran sans l'interrompre). |
| important<br>ETA-09 | Recherche du header (toutes pages) | `src/components/Navbar.tsx:177-194,502,514-531` | Sans résultat, le panneau reste muet : le code ne prévoit aucun cas vide (l. 514). La comparaison ne retire pas les accents et ne connaît que les noms français : « education », « sante » ou « Germany » ne trouvent rien. « don », « bénévole » ou « contact » non plus, car seuls les domaines, niveaux, pays et la galerie sont indexés. Les résultats sont des `<button>` qui appellent navigate() au lieu de liens, leur nombre n'est pas annoncé, Entrée ne fait rien, et le champ a focus:outline-none (le curseur de saisie reste visible). | Sur un clavier de téléphone sans accents, ou pour un visiteur anglophone, la recherche paraît cassée. §5.5 : l'état vide doit inviter à agir. §5.6 : on navigue avec un lien. Et un utilisateur de lecteur d'écran doit savoir si sa recherche a abouti. | Normaliser les deux côtés (normalize('NFD'), puis retrait des accents). Indexer les libellés anglais et les pages clés (don, candidater, contact, bénévolat). Sans résultat, afficher « Aucun résultat pour « x ». Essayez : allemand, Allemagne, santé », avec 3 liens utiles. Annoncer le nombre de résultats dans un role="status". Afficher les résultats comme des liens `<Link>`, faire aller Entrée vers le premier résultat, et rendre le focus visible sur le conteneur (focus-within). |

### B.3 Accessibilité WCAG 2.2 AA (§5.6)

Le socle est sérieux : lien d'évitement, un seul hook pour toutes les fenêtres (Échap, piège du focus, retour du focus), boutons à icône tous nommés, un seul H1 par page, galerie exemplaire, mode « réduire les animations » respecté partout. Deux planchers WCAG 2.2 AA sont pourtant violés sur tout le site. L'anneau de focus or reste à 1,92:1 sur crème et 2,17:1 sur blanc, sous le seuil de 3:1 : au clavier, on ne voit pas où l'on est. Les choix du don, de la candidature et du test n'exposent leur état qu'à l'œil (critère 4.1.2, niveau A). Les formulaires cumulent les manques : focus perdu et rien d'annoncé après une étape ou un envoi (aucun `role="status"` dans src), bordures de champ entre 1,45:1 et 1,6:1 en clair, 1,04:1 en sombre sur Don et Agir. La cause commune : aucun token d'état (focus, bordure, sélection) ni composant de formulaire partagé, chaque écran recopie ses classes. Les contrastes sont calculés avec la formule WCAG, les cibles estimées d'après les classes ; aucun test n'a été fait avec un lecteur d'écran. Bilan : 2 bloquants, 6 importants, 6 finitions.

**Ce qui a été vérifié et comment.**
- Contrastes : environ 60 paires calculées avec la formule WCAG ; anneau de focus, bordures de champ et thème sombre recalculés par les vérificateurs.
- Code lu : formulaires (Candidater, Don, Agir, newsletter, test de niveau), Navbar, Footer, useDialog, SplitReveal, cartes. Recherches recomptées dans src : 0 `aria-current`, 0 `role="status"`, 0 `autoComplete`, 0 `aria-invalid`, 0 `aria-describedby` ; `aria-pressed` dans 3 composants seulement (galerie, puces des régions, carte) ; `aria-controls` une seule fois (burger).
- Plan des titres relevé dans le DOM des 28 routes à 1440 et 390 (un seul H1 partout).
- Captures en thème clair à 1440 et 390, et en thème sombre sur 6 pages (dont Don, Candidater, Mobilité).
- Cibles tactiles estimées d'après les classes Tailwind (w-9 = 36 px ; py-1 + text-xs = 24 px).

**Paires de contraste qui échouent ou passent de justesse (calcul WCAG).**

| Paire (élément / fond) | Ratio | Seuil | Verdict |
|---|---|---|---|
| Anneau de focus or #E8A317 / page crème #F5F1E8 | 1,92:1 | 3:1 (1.4.11) | Échec (A11Y-01) |
| Anneau de focus or #E8A317 / blanc (header, cartes, newsletter) | 2,17:1 | 3:1 | Échec (A11Y-01) |
| Anneau de focus or #E8A317 / vert #0F3D2E (hero, footer, Mobilité) | 5,61:1 | 3:1 | Passe : garder l'or sur fond vert |
| Bordure de champ #0F3D2E/20, sur le fond crème du champ | 1,6:1 | 3:1 | Échec, discuté (A11Y-05) |
| Bordure de champ #0F3D2E/20, sur carte blanche | 1,45:1 | 3:1 | Échec, discuté (A11Y-05) |
| Fond crème du champ / carte blanche | 1,13:1 | 3:1 | Échec si le fond seul doit délimiter le champ |
| Sombre : champ #0F3D2E / carte #132A21 (Don, Agir) ; sa bordure sans variante dark: | 1,25:1 ; 1,04:1 | 3:1 | Échec (A11Y-05) |
| Sombre : bordure crème /20 des champs de Candidater | ≈ 1,8:1 | 3:1 | Échec (A11Y-05) |
| Placeholder encre /50 sur crème (seul libellé visible de la newsletter) | 3,23:1 | 4,5:1 | Échec quand il tient lieu de libellé (ACC-06) |
| Placeholder crème /50 sur vert (thème sombre) | 3,91:1 | 4,5:1 | Échec quand il porte une information |
| Compteur « Question X sur 20 », or sur #14523E/90, 12 px | 4,31:1 | 4,5:1 | Échec de justesse |
| Date des actualités, encre /60 en 12 px sur blanc | 4,55:1 | 4,5:1 | Passe de justesse (4,34:1 si posée sur crème) |
| Noms des pays voisins sur la carte, crème 45 % en 8 px sur vert | 3,45:1 | 4,5:1 | Échec s'ils sont informatifs (groupe aria-hidden, plutôt décoratif) |
| Survol du menu : texte #1B1B18 puis #0F3D2E | 1,42:1 entre les deux états | état visible (§5.5) | Survol imperceptible (A11Y-11) |
| Sombre : bouton principal #0F3D2E / carte #132A21 | 1,25:1 | non exigé (le libellé identifie le bouton) | Perte de hiérarchie, voir TOK-03 |
| Tokens gold-text #8A5A00 (crème ; blanc) et gold-on-green #F2B544 (vert) | 5,26:1 ; 5,93:1 ; 6,64:1 | 4,5:1 | Passe : à généraliser |
| Pages historiques : focus #0F3D2E sur #09261C ; blanc sur émeraude #10B981 | 1,3:1 ; 2,54:1 | 3:1 ; 4,5:1 | Échec, voir CTC-04 et HIS-07 |

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>A11Y-01 | Toutes les pages en thème clair : boutons partagés, cartes de domaine, logo du header, champ de la newsletter | `src/components/wahhf/Buttons.tsx:37, 94, 151`<br>`src/components/wahhf/DomainCard.tsx:20`<br>`src/components/Navbar.tsx:212` | L'anneau de focus est or #E8A317, dessiné sur le fond de la page : 1,92:1 sur crème #F5F1E8 et 2,17:1 sur blanc (calcul WCAG). Il touche les boutons principal, secondaire et « Faire un don » (y compris dans le header blanc), les cartes de domaine et le logo (sans décalage, l'anneau colle au bord) et le champ de la newsletter (`Home.tsx:1154`, sur carte blanche). Il n'existe aucune règle :focus-visible globale, seulement 21 déclarations locales en 3 couleurs. | Échec du critère 1.4.11 Contraste non textuel (AA, 3:1), plancher non négociable du §5.6. Au clavier, on perd sa position sur les boutons d'action principaux (Candidater, Faire un don), sur un accueil qui compte environ 116 arrêts de tabulation. | Créer un token --color-focus qui dépend du fond : vert #0F3D2E sur fond clair (10,8:1 sur crème, 12,2:1 sur blanc), or sur fond vert (5,6:1), et une règle globale `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px }`. Ne remplacer l'or que sur les surfaces claires (sur vert ou sur la vidéo, il passe) ; sur une surface mixte, double anneau (2 px blanc puis 2 px vert). |
| **bloquant**<br>A11Y-02 | Faire un don (fréquence, montant, moyen de paiement), Candidater (souhait), test de niveau (réponses), Agir (rôle), sélecteur FR/EN | `src/pages/DonatePage.tsx:119-161, 267-283`<br>`src/pages/ApplyPage.tsx:297-315`<br>`src/pages/LanguageAcademy.tsx:405-417` | Les choix exclusifs sont des `<button>` dont seule la classe change à la sélection : ni aria-pressed, ni role="radio", ni fieldset et legend (les intitulés de groupe sont des `<p>`). aria-pressed n'existe que dans la galerie, les puces des régions et la carte du Cameroun. Avec TalkBack, on entend « 50 €, bouton » sans savoir quel montant est choisi. | Échec WCAG 4.1.2 Nom, rôle et valeur (niveau A) et 1.3.1 ; le 1.4.1 se discute, car l'aplat choisi change aussi fortement de luminance. Le montant et la fréquence sont repris dans le bouton final (« Faire un don mensuel de 50 € »), mais le moyen de paiement, le souhait de candidature et la réponse du test ne sont annoncés nulle part. | Des `<input type="radio">` natifs stylés en tuiles, dans un `<fieldset>` avec `<legend>` (« Fréquence », « Montant », « Moyen de règlement », « Votre souhait », énoncé de la question), plus une coche visible sur l'option choisie. Pour FR/EN et le rôle d'Agir, au minimum aria-pressed, comme dans `GalleryPage.tsx:51-58`. |
| important<br>A11Y-03 | Candidater (étapes et confirmation), Faire un don, Agir, newsletter de l'accueil, test de niveau | `src/pages/ApplyPage.tsx:156-161, 268, 400`<br>`src/pages/TransversalPages.tsx:625-664`<br>`src/pages/Home.tsx:1135-1139` | Au changement d'étape, après un envoi, au démarrage et à la fin du test, le bouton qui avait le focus est démonté : le focus retombe sur la page et rien n'est annoncé (aucun `role="status"` dans src, énoncé du test hors région live). Rien ne fait défiler non plus : à 390, on reste en bas de l'ancienne étape, et sur /agir les boutons « ↓ » restent sans effet visible (voir AGIR-03). Entre deux questions du test, « Question suivante » reste en place et garde le focus. | Échec du critère 4.1.3 Messages d'état (AA) : au lecteur d'écran, on ne sait ni que l'étape a changé ni que l'envoi a réussi, et au clavier on repart du haut. Sur mobile, une action sans effet visible ressemble à une panne, sur les parcours de conversion. | Après chaque changement d'étape ou de rôle, faire défiler jusqu'au haut du formulaire (décalage du header compris), placer le focus sur le titre de l'étape (tabIndex={-1}) et passer reveal={false} au SectionHeader des étapes. Garder un conteneur `role="status"` toujours présent qui reçoit la confirmation et prend le focus ; énoncé du test en aria-live="polite". La barre de progression peut passer en aria-hidden : « Étape 2 sur 3 » porte déjà l'information. |
| important<br>A11Y-04 | Header, méga-menu « Nos actions » (ordinateur) | `src/components/Navbar.tsx:247-265`<br>`src/components/Navbar.tsx:388-483`<br>`src/components/Navbar.tsx:161-170` | Le bouton du méga-menu a aria-expanded mais pas aria-controls, et le panneau n'a pas d'id. Le panneau est rendu après tous les contrôles de droite : après le bouton, Tab passe par Notre impact, Actualités, Agir, FR, EN, recherche, thème et « Faire un don » avant d'atteindre les 6 domaines. Il ne se ferme qu'avec Échap ou un clic extérieur, et reste ouvert sur le haut de la page quand le focus quitte le header. | Échec du critère 2.4.3 Parcours du focus (niveau A), et risque d'échec du 2.4.11 (élément focalisé caché sous le panneau resté ouvert). Le §5.6 demande aria-expanded et aria-controls. | Rendre le panneau juste après son bouton dans le DOM, lui donner un id relié par aria-controls, et le fermer sur focusout quand le focus sort du header. |
| important<br>A11Y-05 | Champs de Candidater, Faire un don, Agir et de la newsletter (clair et sombre) | `src/pages/ApplyPage.tsx:188`<br>`src/pages/DonatePage.tsx:179, 203, 235, 251`<br>`src/pages/TransversalPages.tsx:681, 691, 700` | En clair, la bordure #0F3D2E/20 des champs atteint 1,6:1 sur le fond crème du champ et 1,45:1 sur carte blanche, et le fond crème du champ ne fait que 1,13:1 contre la carte (calculs). En sombre, sur Don et Agir, le champ #0F3D2E fait 1,25:1 contre la carte #132A21 et sa bordure, sans variante dark:, 1,04:1 ; sur Candidater, la bordure crème /20 atteint environ 1,8:1. La même chaîne de classes est recopiée sur chaque champ, sans token de bordure forte. | Le seuil de 3:1 du critère 1.4.11 n'est pas atteint ; son application à la bordure d'un champ se discute quand le label l'identifie déjà. Le problème d'usage reste : sur un Android en plein soleil, on voit mal où taper (captures sombres de Faire un don : champs discernables mais pâles). | Créer un token --color-border-input d'au moins 3:1 dans les deux thèmes (environ #0F3D2E à 55-60 % en clair, crème à 45 % en sombre) et un composant `<Field>` partagé qui l'applique, variante dark: comprise, à tous les champs. |
| important<br>A11Y-06 | Accueil, paragraphes de la mission (effet SplitText) | `src/effects/SplitReveal.tsx:33-37, 55`<br>`node_modules/gsap/src/SplitText.js:217` | SplitText est créé sans option aria : par défaut (« auto »), il pose un aria-label sur le `<p>` de la mission et aria-hidden sur chaque ligne découpée. Le découpage n'est jamais annulé après l'animation (en mode « réduire les animations », il n'a pas lieu). | ARIA 1.2 interdit de nommer un paragraphe : selon le lecteur d'écran, les deux paragraphes clés de la mission peuvent être lus vides ou incomplets (NVDA en mode navigation lit le contenu, pas le nom). L'effet réel reste à tester avec un lecteur d'écran. | Passer aria: 'hidden' à SplitText.create et ajouter une copie `<span className="sr-only">{children}</span>`, ou appeler self.revert() à la fin de l'animation. Tester ensuite avec NVDA et TalkBack. |
| important<br>A11Y-07 | Header, accueil (témoignages, vidéo, régions), Notre impact, Mobilité, test de niveau, fiches pays, footer | `src/pages/MobilityHub.tsx:192, 244`<br>`src/pages/LanguageAcademy.tsx:426`<br>`src/components/Navbar.tsx:324, 352, 381` | D'après les classes : puces des 10 pays de Mobilité environ 24 px (8 px d'écart), puces des niveaux, des régions et pastilles sociales environ 28 px, puces pays des fiches environ 32 px ; FR/EN 24 px, recherche, thème et « Fermer la vidéo » 36 px, burger et flèches des témoignages 40 px. « ← Question précédente » (text-xs sans padding) et le lien « Programme A1 » des cartes de session font environ 16 px de haut, sous le minimum AA de 24 px : ils ne respectent le critère 2.5.8 que grâce à son exception d'espacement (assez de vide autour de la cible). | Le public tape au pouce sur des Android de 360 à 390 px : le §2.3 et le §5.6 visent 44 × 44 px. Dix puces de 24 px serrées provoquent des erreurs de toucher sur les choix qui mènent aux fiches pays. | min-h-11 (44 px), px-4 et au moins 8 px d'écart sur les puces ; w-11 h-11 sur les boutons ronds ; padding vertical sur « ← Question précédente » et « Programme A1 ». Pour garder un dessin compact (FR/EN), étendre la zone de toucher par un ::before de 44 px ; le défilement horizontal des puces de régions absorbe la largeur. |
| important<br>A11Y-08 | Accueil et Notre impact (liste des pays, panneau de région), Nos actions (badge des cartes), Académie, fiches pays, header | `src/components/wahhf/CountryList.tsx:15, 57, 68`<br>`src/components/wahhf/PresenceSection.tsx:120, 125, 221`<br>`src/components/Navbar.tsx:226` | Des textes qui portent une information font 9 à 11 px : « Hors UE » 9 px sur mobile, « Pays #01 · Voir la fiche » 10 px, panneau de région 11 px, badge « DOMAINE / 01 / 06 » 11 px, sous-titre du logo 10 px, heures de la frise et URL des liens officiels 11 px (18 occurrences dans les pages WAHHF, 31 de plus dans les pages historiques). Ils rapetissent sur mobile (text-[9px] sm:text-[10px]), et la liste des pays reste sur 2 colonnes à toutes les largeurs : à 390, cartes d'environ 150 px avec le sous-texte sur 2 lignes, à 360 « Luxembourg » tronqué (calcul). Les intitulés coupés de la frise de l'Académie relèvent de ACAD-08. | Le public lit sur un Android d'entrée de gamme, souvent en plein soleil (§2.3) : à 9-11 px, l'information « hors Union européenne » ou la région devient illisible. Ce n'est pas un échec WCAG en soi, mais le texte devrait grossir sur mobile, pas rapetisser. | Plancher de 14 px pour tout texte informatif et de 12 px pour les légendes ; noms de pays en 14 px en gardant 2 colonnes. Retirer la ligne « Pays #NN · Voir la fiche », redondante avec la flèche (à valider). |
| finition<br>A11Y-09 | Nos actions, Notre impact, article, Agir, footer, méga-menu | `src/components/wahhf/DomainCard.tsx:53`<br>`src/components/wahhf/PresenceSection.tsx:92, 182`<br>`src/components/Footer.tsx:80, 124, 149, 187` | Le plan des titres relevé dans le DOM saute des niveaux : sur /nos-actions, le H1 est suivi de 6 H3 (cartes), puis de H2 qui reprennent les mêmes titres ; sur /notre-impact, H1 puis H3 « Présence terrain au Cameroun » ; sur l'article, aucun H2, on passe du H1 aux H3 du footer. Sur /agir, le titre du formulaire bénévole est un H3 placé sous le H2 « Devenir partenaire » (`TransversalPages.tsx:666-669`). Le footer a 4 H3 hors de tout `<nav>`, et le méga-menu ouvert ajoute un H3 dans le header. | Les utilisateurs de lecteur d'écran naviguent par titres : le plan est faux et les doublons le rendent confus (1.3.1 ; §5.2 : aucun niveau sauté). Gêne réelle, sans être bloquante. | Prop de niveau sur DomainCard et PresenceSection (h2 dans la grille, ou h3 sous un H2 « Où nous agissons ») ; titre du formulaire d'Agir en H2 ; titres du footer en h2 de même style ou en texte simple sous `<nav aria-label="Pied de page">` ; un `<p>` à la place du h3 du méga-menu. |
| finition<br>A11Y-10 | Cartes de domaine, cartes d'actualité (accueil, /actualites, article), témoignage, vignette vidéo | `src/components/wahhf/DomainCard.tsx:28`<br>`src/pages/Home.tsx:565, 841, 920`<br>`src/pages/TransversalPages.tsx:487, 539` | Les images des cartes ont pour alt le titre de la carte, déjà présent dans le même lien : le lecteur d'écran dit « Éducation… Éducation ». L'alt du témoignage, « Aline M. (TODO : valider témoignage) », est posé sur une image générée du domaine Éducation et relu à chaque changement (zone aria-live). La vignette vidéo, une image générée de salle de classe, a pour alt « Aperçu vidéo WAHHF Foundation ». | Les doublons rallongent chaque nom de lien (1.1.1 : verbosité plutôt qu'échec). L'alt du témoignage présente une image générée comme une personne réelle et fait lire « TODO » à voix haute ; celui de la vignette décrit une vidéo que l'image ne montre pas. | alt="" sur les images des cartes, déjà nommées par leur titre ; alt descriptif pour l'image de l'article et pour les vraies photos, sur le modèle de la galerie. Témoignage et vignette : remplacer par le contenu réel (à fournir par la fondation, voir T-02, T-04 et l'annexe), puis décrire la vraie photo ou mettre alt="". |
| finition<br>A11Y-11 | Menu ordinateur et menu mobile (toutes pages), fils d'Ariane et sélecteurs de l'Académie, des fiches pays et des guides | `src/components/Navbar.tsx:236-240, 607-661`<br>`src/pages/LanguageAcademy.tsx:106-118, 168-176`<br>`src/pages/EuropeSupport.tsx:69-79, 267-271` | Le site n'a aucun aria-current (le header utilise Link, pas NavLink). Dans le menu ordinateur, la page en cours n'a qu'une pastille de fond à 10 % ; dans le menu mobile, rien ne la signale et « Candidater » reste en or même sur /candidater ; le survol du menu (#1B1B18 vers #0F3D2E, 1,42:1) est imperceptible. Les fils d'Ariane sont des div de span sans `<nav>`, et le niveau, le pays ou le guide actif ne se distingue que par la couleur. | Au lecteur d'écran comme sur téléphone (public principal), on ouvre le menu sans savoir où l'on se trouve (§5.5, §5.6 ; bonne pratique liée au 1.3.1). | NavLink, qui pose aria-current="page", dans les deux menus, avec un signe actif non coloré (trait or à gauche, soulignement, graisse) et un soulignement de 2 px au survol. Fils d'Ariane en `<nav aria-label="Fil d'Ariane">` avec `<ol>` et aria-current sur l'élément courant ; aria-current aussi sur le niveau, le pays et le guide actifs. |
| finition<br>A11Y-12 | Accueil et Notre impact, section Présence (carte du Cameroun et mini-carte Europe) | `src/components/wahhf/CameroonMap.tsx:309-318`<br>`src/components/wahhf/EuropeMiniMap.tsx:138-146`<br>`src/components/wahhf/PresenceSection.tsx:146-159` | Chaque région et chaque pays est atteignable deux fois au clavier : 10 tracés SVG (role="button", tabIndex 0) plus 10 puces, puis 10 tracés (role="link") plus 10 liens de liste. Cela fait environ 40 arrêts pour 20 choix, sur environ 116 pour tout l'accueil ; l'indicateur de focus des tracés, à double trait, est en revanche bien fait. | Au clavier, on traverse deux fois les mêmes options avant d'atteindre la suite de la page. C'est long et répétitif, sans être un échec WCAG. | tabIndex={-1} et aria-hidden sur les tracés des cartes (le clic à la souris reste), en gardant les puces et la liste des pays comme seul chemin clavier et lecteur d'écran. |
| finition<br>A11Y-13 | Fenêtres : menu mobile, vidéo, visionneuse de la galerie, carte en plein écran | `src/lib/useDialog.ts:34-92`<br>`src/components/Navbar.tsx:556-559`<br>`src/pages/Home.tsx:601-605, 623` | Les fenêtres sont des div role="dialog" aria-modal="true", pas des `<dialog>` ouverts par showModal(), et useDialog ne pose jamais inert sur l'arrière-plan (il gère bien Échap, le piège du Tab et le retour du focus). Le TODO du titre de la fenêtre vidéo et le choix de la vidéo (film du groupe IROKO) relèvent de ACC-04. | aria-modal n'est pas respecté par tous les lecteurs d'écran : leur curseur virtuel peut sortir de la fenêtre et lire la page derrière (le §5.6 recommande showModal()). | Dans useDialog, poser inert sur les éléments frères de la fenêtre pendant l'ouverture, ou passer à `<dialog>` et showModal(). Titre et vidéo : voir ACC-04 (contenu réel à fournir par la fondation). |
| finition<br>A11Y-14 | Titres fluides : hero de l'accueil, en-têtes de section, H1 des pages | `src/pages/Home.tsx:225`<br>`src/components/wahhf/SectionHeader.tsx:45` | Les tailles de titres en clamp() reposent sur vw sans terme en rem. À 1440 px zoomé à 200 %, le H1 du hero passe de 76 à environ 77,8 px à l'écran (× 1,02) et les H2 de 49,6 à environ 59 px (× 1,19), alors que le texte courant, en rem, double. | Risque d'échec du critère 1.4.4 Redimensionnement du texte (AA) pour les titres ; effet pratique faible, car ils sont déjà grands. Calculé, pas mesuré dans un navigateur. | Ajouter un terme en rem dans chaque clamp (par exemple `clamp(2.35rem, 1.5rem + 3vw, 4.75rem)`), puis vérifier à 200 % dans Chrome. |

Voir aussi T-08 (lang reste « fr », aria-label en français en mode anglais), ETA-04 (aucun autocomplete, champs en 14 px), ETA-02 et ETA-01 (double envoi possible, aucune erreur annoncée), ETA-08 (focus non déplacé au changement de page), TOK-03 (bouton principal à 1,25:1 sur les cartes sombres, aucun color-scheme), ANIM-02 (contenu invisible tant qu'un seuil n'est pas atteint), CTC-04 et POL-02 (formulaire de /contact sans labels reliés ni focus visible, choix de /contact et /poles sans état), ainsi que CAND-01 (étape 1 qui bloque sans message, critère 3.3.1) et AGIR-01 (labels non reliés aux champs), deux échecs de niveau A traités dans les fiches de page.

### B.4 Responsive (§5.3)

La base est saine aux deux largeurs capturées (390 et 1440 px) : une colonne sur mobile, images au format réservé (CLS 0), survol réservé à la souris, hero en svh. Mais le site n'a été réglé qu'à ces deux largeurs et casse entre elles et en dessous. Le header n'a aucun palier de repli : à 360 px, largeur courante des Android d'entrée de gamme au Cameroun, le bouton menu touche le bord de l'écran, et à 320 px (zoom 400 %) il en sort. Le footer chevauche sa colonne voisine sur toutes les pages à 1440, les grilles passent trop tôt à 3 ou 5 colonnes entre 640 et 1023 px, et la bulle WhatsApp recouvre du contenu à 390. Sur ordinateur, quatre largeurs de conteneur font sauter la marge gauche (112, 176 ou 240 px) et certaines lignes montent à 118-125 caractères. Seuls 390 et 1440 ont été rendus : /tarifs y déborde de 57 px à 1440 (page historique) ; les chiffres à 320, 360, 640, 768 et 1024 sont calculés depuis le code et restent à confirmer dans un navigateur. Bilan : 1 bloquant, 5 importants, 2 finitions.

**Ce qui a été vérifié et comment.**
- Captures des 28 routes à 1440×900 et 390×844 comparées planche par planche ; positions et largeurs relevées sur les planches (header à 390, colonnes du footer, marges des conteneurs, longueur des lignes).
- Chevauchement du footer relevé sur les planches à 1440 de 18 pages.
- Débordement horizontal mesuré : /tarifs déborde de 57 px à 1440 ; à 390, la mesure automatique donne 0, mais les captures montrent le bouton menu coupé sur /tarifs et /structure.
- Largeurs à 320, 360, 640, 768, 1024 et 1280 calculées à partir des classes Tailwind (colonnes, gap, padding) et des largeurs de mots mesurées sur les captures, sans rendu dans un navigateur.
- Code lu : Navbar, Footer, WhatsAppButton, Layout, grilles sm:/md:/lg:grid-cols. Recherches : 0 text-balance ; max-w-4xl, 5xl, 6xl et 7xl : 13, 13, 25 et 41 occurrences ; min-h-screen encore dans Layout, App et les 8 pages historiques.

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>RESP-01 | Header (toutes pages) : sous 384 px, de 640 à 679 px et de 1024 à 1279 px | `src/components/Navbar.tsx:198-230`<br>`src/components/Navbar.tsx:301-310`<br>`src/components/Navbar.tsx:314-384` | Le header n'a aucun palier de repli : logo en shrink-0 (environ 200 px) et bloc droit fixe (recherche, thème, menu : 124 px) ne laissent que 3 à 6 px libres à 390 ; à 360 px, le bouton menu déborde de la pilule et touche le bord de l'écran, et à 320 px (équivalent du zoom 400 %) il sort de l'écran, avec le seul accès à FR/EN sous 640 px. De 640 à 679 px, « Faire un don » passe sur 2 lignes dans sa pilule. De 1024 à 1279 px, la navigation demande environ 1 190 px pour environ 926 utiles : liens sur 2 lignes (« Qui / sommes-nous »), bloc droit hors de la pilule et « Faire un don » affiché deux fois. | 360 px est la largeur CSS des Android d'entrée de gamme (Tecno, Itel, Infinix), courante au Cameroun, et 320 px correspond au zoom 400 % : échec du critère 1.4.10 Reflow (AA). De 1024 à 1279 px, on touche l'iPad en paysage et une fenêtre de 1440 zoomée à 125 %, cas courant chez les donateurs ; largeurs calculées, sans capture à 360, 640 ni 1024. | Corriger le header comme un tout : sous sm, interrupteur de thème dans le menu, logo en min-w-0 et mot « FOUNDATION » masqué sous 380 px ; whitespace-nowrap sur les liens et le bouton don ; sous-titre « Branche sociale… » masqué sous lg ; menu burger jusqu'à xl (lg:flex devient xl:flex), puis vérifier à 320, 360, 640, 1024 et 1280. À défaut du burger jusqu'à xl, retirer le lien texte « Faire un don » en doublon de lg à xl (à valider). |
| important<br>RESP-02 | Footer (toutes pages) | `src/components/Footer.tsx:59-75`<br>`src/components/Footer.tsx:31, 80, 205`<br>`src/index.css:142` | À 1440, la rangée des 4 pastilles sociales (environ 330 px, flex sans flex-wrap) déborde de sa colonne de 274 px : « YouTube » recouvre « Archives Groupe IROKO » sur toutes les pages, et ces liens mènent à des ancres mortes (#linkedin-todo…, aria-label « … (TODO) »). Les colonnes de 169 px (environ 127 px à 1024) coupent les intertitres sur 2 lignes (« AGIR ET FAIRE UN / DON ») et l'e-mail en plein mot (« contact@wahhf-foun / dation.org », break-all), et ces intertitres h3 sortent en Fraunces capitales à cause de la règle globale h1-h3. À 1024, la rangée sociale déborde d'environ 120 px ; à 390, le footer fait environ 1 500 px, soit 1,8 écran sous chaque page. | Le chevauchement se voit en bas de chaque page sur l'écran des donateurs, et un lien social qui ne mène nulle part fait douter de l'existence de la fondation ; le lecteur d'écran prononce « TODO » (2.4.4). L'e-mail coupé se lit et se recopie mal. | Ajouter flex-wrap, ou placer les réseaux en pleine largeur dans la barre du bas ; grille lg:grid-cols-4 avec le bloc marque au-dessus (ou 12 colonnes dès xl seulement), font-sans sur les h3, `[overflow-wrap:anywhere]` avec un `<wbr>` après le @ ; sur mobile, colonnes repliables (`<details>`) en gardant don, contact et pages légales visibles. URL des réseaux : remplacer par le contenu réel (à fournir par la fondation, voir annexe), et masquer les pastilles d'ici là (à valider). |
| important<br>RESP-03 | Bulle WhatsApp et bandeau cookies (toutes pages, surtout à 390 : accueil, don, candidature, Agir, Mobilité, Académie) | `src/components/WhatsAppButton.tsx:24-33`<br>`src/components/Layout.tsx:79-81`<br>`src/components/wahhf/CookieBanner.tsx:22-25` | La bulle fixe de 52 px (bottom-6 right-6) n'a aucune place réservée : à 390, elle recouvre au passage la fin de titres, des badges, des puces et le bord des champs ou du bouton « Continuer vers l'étape 2 » (captures accueil, candidater, agir, faire-un-don, academie). Elle montre une icône de message générique, son libellé « Écoute & Orientation (Gratuit) » n'apparaît qu'au survol, donc jamais au toucher, et une pastille or permanente imite une notification non lue. Le bandeau cookies, rendu après le footer et la bulle, couvre aussi le bas de l'écran à la première visite et n'est atteint qu'en dernier au clavier. | Le recouvrement est passager, mais sur les formulaires il gêne la saisie, et sans glyphe WhatsApp le public ne reconnaît pas son canal principal. La fausse notification est un petit procédé trompeur pour une fondation qui promet l'honnêteté ; le bandeau risque de masquer l'élément focalisé (2.4.11, non vu sur capture). | Glyphe WhatsApp et libellé court visible dès l'affichage ; padding bas sur la barre du footer (pb-24) et scroll-padding-bottom égal à la hauteur de la bulle, et du bandeau tant qu'il est affiché ; bulle de 44-48 px en bottom-4 right-4 sous md, gardée sur les formulaires car c'est le recours principal du candidat. Placer le bandeau cookies en tête du DOM et lui donner le focus à l'affichage ; retirer la pastille or (à valider). |
| important<br>RESP-04 | Accueil, Agir, Actualités, Qui sommes-nous, Partenaires, Accompagnement, Académie, fiche Allemagne (de 640 à 1023 px) | `src/pages/Home.tsx:661, 1034`<br>`src/pages/LanguageAcademy.tsx:164`<br>`src/pages/EuropeSupport.tsx:172, 498` | À 768, md:grid-cols-3 laisse 160 à 176 px utiles (« Faire un don maintenant » sur 3 lignes dans sa pilule, titres d'actualité sur 5 à 6 lignes) ; à 1024, les 5 principes et les 5 guides n'ont que 125 à 128 px (environ 17 caractères par ligne) ; à 640, les 5 niveaux A1-C1 ont 77 px (badge « Gratuit » qui déborde, titre réduit à « Découv… »). Sur la fiche Allemagne, « (Fachkräfteeinwanderungsgesetz) », environ 250 px pour 168 utiles, est rogné par overflow-hidden entre 768 et 900 px environ. Même à 1440, les 5 principes n'ont qu'environ 176 px (environ 24 caractères par ligne). | Sur tablette et petit portable, les cartes deviennent des colonnes de mots et un terme officiel allemand est coupé (§5.3 : le contenu dicte la grille, rendu sans casse à 768 et 1024). Largeurs calculées depuis les classes, sans capture à 640, 768 ni 1024. | Grilles de 3 : rester sur 1 colonne jusqu'à lg, ou 3e carte en col-span-2 horizontale (md:grid-cols-2 laisserait une carte orpheline) ; 5 éléments : liste en ligne (icône, titre, texte) jusqu'à xl ou `grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]` ; niveaux A1-C1 sur 2 colonnes jusqu'à md. Terme allemand dans un `<span lang="de">` avec césures conditionnelles (`Fachkräfte&shy;einwanderungs&shy;gesetz`). |
| important<br>RESP-05 | Qui sommes-nous, Nos actions, Notre impact, Galerie, Actualités, Mobilité, Faire un don, Agir, accueil (ordinateur) | `src/pages/TransversalPages.tsx:43, 57, 601, 656`<br>`src/pages/DonatePage.tsx:69, 83`<br>`src/pages/GalleryPage.tsx:36, 49` | Les sections partent de quatre largeurs de conteneur (max-w-4xl, 5xl, 6xl et 7xl). À 1440, la marge gauche saute de 112 px (7xl) à 176 px (6xl) ou 240 px (5xl) : hero de Qui sommes-nous, de la Galerie et des Actualités à 176 px pour un corps à 112 px, hero de Faire un don à 240 px pour un formulaire à 176 px, témoignages de l'accueil à 176 px entre deux sections à 112 px. Sur /agir, le formulaire centré en max-w-3xl démarre environ 160 px plus à droite que la grille des cartes. | Le §5.3 veut qu'une vitrine parte d'une seule marge à gauche. Ces décalages de 64 px se voient au défilement sur l'écran des donateurs et font paraître la mise en page approximative. | Un seul composant `<Container>` (token --container, max-w-7xl et gouttière) pour les heros, les corps et le footer ; resserrer les textes à l'intérieur par max-w-[65ch] ou max-w-prose, sans changer de conteneur. Aligner le formulaire d'Agir sur la grille, ou le placer en 2 colonnes (introduction à gauche, formulaire à droite). |
| finition<br>RESP-06 | Avertissement Mobilité (7 pages), FAQ Mobilité, Académie, confidentialité et mentions légales, article, sous-titres de section (ordinateur) | `src/components/wahhf/DisclaimerBanner.tsx:35`<br>`src/components/wahhf/SectionHeader.tsx:64`<br>`src/pages/TransversalPages.tsx:494, 819` | À 1440, le paragraphe de l'avertissement Mobilité, sans largeur maximale, tient environ 118 à 125 caractères par ligne, comme la FAQ de Mobilité et le paragraphe des certifications de l'Académie. La politique de confidentialité monte à environ 96 caractères, le corps de l'article à 90 et les sous-titres de SectionHeader (max-w-3xl en 18 px) à 90-93 (comptés sur les captures). | Au-delà de 80 caractères, l'œil perd le début de la ligne suivante (§5.2) ; c'est une règle de confort (WCAG 1.4.8 est AAA), limitée à l'ordinateur. Mais la ligne la plus longue porte le message de confiance clé (« Nous ne vous demandons jamais d'argent »). | max-w-[65ch] sur les paragraphes de l'avertissement, des pages légales et de l'article, max-w-[60ch] sur le sous-titre de SectionHeader, sans réduire le conteneur. Commencer par l'avertissement. |
| finition<br>RESP-07 | Boutons principaux à 390 (Mobilité, Académie, fiche Allemagne) | `src/components/wahhf/Buttons.tsx:37, 94` | À 390, des libellés longs passent sur 2 lignes dans les pilules : « Accéder à l'Académie de / langues », « Explorer l'accompagnement / Europe », « Être accompagné gratuitement pour : / Allemagne », « Passer le test d'orientation gratuit (20 / questions) ». Sur /mobilite-langues, les 3 boutons empilés ont 3 largeurs différentes. | Une pilule sur deux lignes paraît cassée et le bouton perd son évidence, sur l'écran du public principal. | Sous sm, boutons en w-full avec text-balance et cercle fléché centré verticalement ; raccourcir les libellés (« Voir l'Académie », « Être accompagné ») (à valider). |
| finition<br>RESP-08 | Gabarit, écran de repli pendant le chargement d'une page, pages historiques | `src/components/Layout.tsx:49`<br>`src/App.tsx:40`<br>`src/pages/Tarifs.tsx:73` | min-h-screen (100vh) sert encore au gabarit, à l'écran de repli pendant le chargement d'une page et à 8 pages historiques, alors que le hero utilise déjà min-h-svh. | Sur mobile, 100vh dépasse la zone visible quand la barre d'adresse est affichée (§5.3 : dvh ou svh). Impact quasi nul ici, car les pages sont toujours plus hautes que l'écran. | Remplacer par min-h-dvh (avec min-h-screen en repli si besoin) dans Layout et dans l'écran de repli. |

Voir aussi T-09 (« Faire un don » coupé en bas du menu mobile à 390×844), TAR-01 (/tarifs déborde de 57 px à 1440 ; à 390, bouton menu coupé sur /tarifs et /structure d'après les captures), T-19 (titres qui cassent mal, aucun text-balance), T-22 (drapeaux emoji affichés en lettres sous Windows), A11Y-03 (étapes de formulaire qui ne défilent pas sur mobile), A11Y-08 (liste des pays bloquée sur 2 colonnes) et ANIM-01 (galerie épinglée). Le suffixe fixe ajouté par `src/components/wahhf/SEO.tsx:13`, qui allonge les titres de page jusqu'à 141 caractères (/nos-actions), est à revoir avec T-06.

### B.5 Performance (§5.9)

Sur ordinateur, le site tient ses budgets : Lighthouse 12.8.2 (3 passages, mesuré) donne un score de 96-98 et un LCP (temps d'affichage du plus grand élément visible) de 0,86-0,99 s. Sur mobile, l'appareil du public principal, il échoue : score 71-73, LCP 5,04-5,11 s pour une cible de 2,5 s, dont 92 % de délai de rendu ; TBT (temps de blocage du processeur) 194-255 ms ; CLS (décalages de mise en page) 0. Le code montre trois causes. La phrase d'appui du hero, qui est l'élément LCP, est cachée exprès pendant au moins 1,45 s (rideau puis fondu). Tout le rendu se fait côté client, à partir d'un fichier JS principal de 269 ko gzip (818 ko brut), 34 % au-dessus du budget de 200 ko : il embarque GSAP, SplitText, Lenis et les données de recherche sur toutes les pages. Enfin, 130 ko de polices et un logo PNG de 117 ko prennent de la bande passante à ce JS. Les gains indiqués dans le tableau sont estimés (lecture du code, poids des fichiers). Il faut re-mesurer chaque correction seule, dans les mêmes conditions. Le reste est sain : pages internes chargées à la demande, images WebP avec srcset et dimensions, aucun décalage de mise en page.

**Ce qui a été vérifié et comment.**
- Mesure Lighthouse 12.8.2, 3 passages sur l'accueil, en mobile (Slow 4G et processeur ×4 simulés) et sur ordinateur. Les autres pages n'ont pas été mesurées.
- Mesure du fichier principal de la build : 818 ko brut, 269 ko gzip. La part de chaque librairie est estimée avec esbuild (à ±5 ko près).
- Lecture de code : chaîne du hero (LoadingCurtain, heroFade, MaskedLines), imports de App, Layout, Navbar, i18n et lenis, index.html, dist/index.html, vite.config.ts.
- Poids des fichiers (polices, logo, images WebP, données geo) et dimensions du logo, lues dans l'en-tête PNG.
- metrics.json : l'accueil mesure 21 109 px de haut à 390 px et charge 18 images.

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>PERF-01 | Accueil, hero (mobile) | `src/pages/Home.tsx:60-63, 204-238`<br>`src/effects/LoadingCurtain.tsx:26-53` | LCP mobile mesuré à 5,04-5,11 s (score 71-73), dont 92 % de délai de rendu. L'élément LCP, la phrase d'appui du hero, part en opacité 0 : elle attend la levée du rideau (900 ms après le montage de React), puis 0,55 s de délai et 0,9 s de fondu ; les boutons ne sont complets que vers 2,65 s. Le rideau n'a aucune condition de largeur et joue à chaque première visite de la session, y compris pour Lighthouse. | Le §5.9 fixe un LCP ≤ 2,5 s, plancher non négociable, et le public principal est sur Android de milieu de gamme en 3G/4G avec une data payante. Au moins 1,45 s est de l'attente programmée (estimé) ; le rideau n'apparaît qu'après le JS et s'ajoute à l'attente au lieu de la couvrir. | Afficher sur-titre, phrase d'appui et boutons dès le premier rendu (retirer opacity: 0 de heroFade, garder au plus un petit déplacement y) et ne plus faire attendre le hero sur introDone ; la montée masquée du titre peut rester. Gain estimé ≈ −1,4 s, peut-être moins dans Lighthouse qui simule ; le LCP resterait vers 3,6 s tant que PERF-02 et PERF-03 ne sont pas faits : re-mesurer après chaque étape. Supprimer le rideau, ou le réserver à l'ordinateur (≥ 1024 px) avec 600 ms au plus (à valider). |
| **bloquant**<br>PERF-02 | Toutes les pages (fichier JS principal) | `src/components/Layout.tsx:11-12`<br>`src/App.tsx:8`<br>`src/components/Navbar.tsx:20` | Le JS initial est un seul fichier de 269 ko gzip (818 ko brut) pour un budget de 200 ko (+34 %), et il grossit à chaque phase (234, 261, 266 puis 269 ko). Le Layout charge sur toutes les pages GSAP, ScrollTrigger, Lenis et Motion ; l'accueil, importé en statique, ajoute SplitText ; Navbar et Home embarquent api.ts (questions du test, 10 pays), et les deux langues sont incluses. Une entrée directe sur /candidater ou /faire-un-don télécharge d'abord tout ce fichier, puis seulement le fichier propre à la page (chunk). | Rien ne s'affiche avant le téléchargement et l'exécution de ce fichier : ≈ 1,3 s de transfert en Slow 4G (estimé), puis l'analyse sur un processeur lent, avec une data payante. Les pages internes paient le code de l'accueil qu'elles n'affichent pas, plus un aller-retour en série ; leur LCP n'a pas été mesuré. | Charger GSAP, ScrollTrigger, SplitText et Lenis par import() seulement là où ils servent (≈ −57 ko gzip, estimé), avec un petit relais pour les ScrollTrigger.refresh() de Layout et PageTransition ; passer Home en lazy avec un `<link rel="modulepreload">` pour « / ». Séparer api.ts en un petit module de navigation et des données chargées par page (≈ −5 à −10 ko), charger en.json à la demande (−2,7 ko), LazyMotion en option (≈ −23 ko) : objectif < 200 ko, puis < 170 ko. Mesurer ensuite Lighthouse mobile sur /candidater, /mobilite-langues/academie et /faire-un-don. |
| important<br>PERF-03 | Toutes les pages (rendu) | `index.html:72`<br>`src/main.tsx` | Aucun HTML n'est pré-rendu : la page ne contient que `<div id="root"></div>` et reste vide jusqu'à l'exécution du JS, sans `<noscript>`. Titres et contenus des pages internes n'existent qu'après le JS. | C'est la cause structurelle des 92 % de délai de rendu : même sans rideau, le texte du hero attend les 269 ko de JS. Si le JS échoue (réseau coupé, navigateur ancien), la page reste blanche. | Pré-rendre au build les ≈ 20 routes publiques (vite-react-ssg, ou React Router 7 en mode framework avec prerender), puis hydrater, et ajouter un `<noscript>` court ; LCP mobile visé 1,5 à 2,5 s (estimé). À faire après PERF-01, sinon le HTML pré-rendu contiendra les états de départ de Motion (opacity: 0, translateY(110 %)) et n'affichera rien de plus. |
| important<br>PERF-04 | Toutes les pages (polices) | `index.html:41-42`<br>`src/index.css:19-53`<br>`public/fonts/` | Deux polices variables sont préchargées : DM Sans 62,7 ko + Fraunces 67,3 ko, soit 130 ko, au-dessus du budget de 100 ko du §5.9. Elles partent en haute priorité en même temps que le JS principal, avant le LCP. Fraunces ne sert presque qu'en graisse 400 (sur 113 classes font-serif, 2 seulement demandent une autre graisse, 500 et 600), plus 600 pour les h3 du footer. | Sur réseau lent, elles prennent ≈ 0,6 s de bande passante au JS au pire moment (estimé). L'élément LCP est en DM Sans ; Fraunces ne sert au premier écran que pour le titre. | À court terme, tant que Fraunces est conservée (les deux pistes du §3 la remplacent), la réduire avec fonttools (varLib.instancer) aux graisses 400 et 600, en gardant l'axe de taille optique (opsz) qui fait le caractère du grand titre : une coupe statique 400 l'abîmerait. Réduire aussi DM Sans aux seules graisses utilisées. Garder le préchargement de DM Sans, ne retirer celui de Fraunces qu'après avoir vérifié le saut de police sur le h1 (size-adjust sur la police de repli), puis re-mesurer le LCP. |
| important<br>PERF-05 | Logo : header, hero, rideau, footer, favicon (toutes pages) | `src/services/api.ts:4`<br>`index.html:31, 39`<br>`src/components/Navbar.tsx:215-220` | Le logo est un PNG de 117 ko (598 × 417 px), affiché entre 20 et 96 px à 6 endroits, et réutilisé comme favicon et comme image de partage. Il n'est découvert qu'après l'exécution du JS. | 117 ko sont téléchargés à chaque première visite, sur toutes les pages, pour une image de 40-44 px dans le header. En Slow 4G, son transfert (≈ 0,6 s, estimé) dure autant que l'affichage du logo dans le rideau (600 ms) : le rideau montre probablement un disque blanc vide (non observé). | Exporter le logo en SVG, ou en WebP 96 et 192 px (quelques ko, estimé), et ajouter un favicon 32 × 32 et un apple-touch-icon 180 × 180 : gain estimé ≈ −110 ko par première visite. Ne pas reprendre public/logo.svg, qui est un ancien logo IROKO (voir MEL-02). |
| important<br>PERF-06 | Accueil (domaines, actualités, vignette vidéo, témoignage) | `src/services/api.ts:44-53`<br>`src/components/wahhf/DomainCard.tsx:27`<br>`src/pages/Home.tsx:564, 840, 919` | Les quatre images générées (éducation, santé, entrepreneuriat, environnement) n'existent qu'en 480, 800 et 1200 px ; les versions 1200 pèsent 109 à 183 ko (570 ko à elles quatre). Actualités, vignette vidéo et témoignage sont déclarés en sizes 100vw : un téléphone de densité 2,75 y prend la version 1200, et la 800 pour les cartes de domaines (84vw). Cela fait ≈ 665 ko pour ces illustrations, et la même image est chargée en deux tailles (estimé d'après la règle de choix de Chrome). | L'accueil fait 21 109 px de haut à 390 px et charge 18 images. C'est beaucoup de data payante pour des illustrations, de surcroît générées par IA. | Corriger les sizes (une carte d'actualité mobile fait 100vw − 2rem), ajouter des paliers 640 et 960, recompresser en WebP qualité 60-70 ou servir de l'AVIF via `<picture>`, en visant 60 ko par vignette ; vérifier dans l'onglet Réseau. La vraie correction reste de remplacer ces images par des photos réelles (à fournir par la fondation) : voir T-04. |
| finition<br>PERF-07 | Accueil (démarrage) | `src/pages/Home.tsx`<br>`src/effects/SplitReveal.tsx:29-52`<br>`src/effects/useTimelineDraw.ts:13-44` | Les 15 sections de l'accueil (≈ 25 écrans à 390 px) sont montées d'un coup avec leurs effets : découpage SplitText, ≈ 8 ScrollTrigger sur mobile (plus sur ordinateur), styles posés par StaggerGroup. Le TBT mobile mesuré est de 194-255 ms, à la limite des 200 ms. | Le §5.9 demande de découper les tâches de plus de 50 ms. Mais aucune trace n'a été lue : l'exécution du fichier de 818 ko brut est une cause au moins aussi probable que ces effets. | Enregistrer d'abord une trace Performance (processeur ×4). Si elle confirme, monter les sections sous la ligne de flottaison dans un chunk différé, après le premier affichage, ce qui sert aussi PERF-02. Éviter content-visibility: auto, qui fausse les positions des sections épinglées. |
| finition<br>PERF-08 | Carte Présence (accueil, Notre impact) | `src/components/wahhf/CameroonMap.tsx:2, 61`<br>`src/components/wahhf/EuropeMiniMap.tsx:3`<br>`public/geo/countries-110m.json` | react-simple-maps ne sert qu'à deux enveloppes (ComposableMap et Marker), alors que les tracés sont déjà calculés avec d3-geo. Le fichier de la carte pèse 36 ko gzip (mesuré), dont ≈ 26 ko évitables (estimé), et la carte télécharge le monde entier (39 ko gzip) pour 6 voisins et 10 pays européens. | Le tout est chargé à l'approche de la section, donc ni le LCP ni le JS initial ne sont touchés. Le gain reste de la data économisée sur mobile. | Remplacer ComposableMap par un `<svg viewBox>` et Marker par un `<g transform>` calculé avec la projection, puis retirer react-simple-maps. Extraire au build un TopoJSON réduit (Europe, Cameroun et voisins), ≈ 10-15 ko gzip (estimé). |
| finition<br>PERF-09 | Build (mises en ligne successives) | `vite.config.ts:6-21` | Aucun découpage des librairies (pas de manualChunks) : React, Motion, GSAP et le code de l'app partagent le même fichier haché. | À chaque mise en ligne, le hash change et tous les visiteurs retéléchargent les 269 ko gzip, même pour une seule ligne modifiée : un coût répété en data payante pour les visiteurs fidèles. | Ajouter build.rollupOptions.output.manualChunks (react, motion, gsap + lenis, i18n). Cela n'allège pas la première visite : à faire après PERF-02. |
| finition<br>PERF-10 | Header (toutes pages) | `src/components/Navbar.tsx:207` | Le header fixe a un backdrop-blur-md (flou d'arrière-plan) sur un fond déjà opaque à 95 % (bg-white/95). | Le flou est recalculé à chaque image pendant le défilement. Il coûte sur un GPU de milieu de gamme, pour un effet presque invisible à 95 % d'opacité. | Fond opaque sans backdrop-blur, ou flou réservé à l'ordinateur. |
| finition<br>PERF-11 | Toutes les pages (suivi réel) | `package.json`<br>`src/main.tsx` | Aucune mesure des Web Vitals chez les vrais visiteurs : ni bibliothèque web-vitals, ni envoi du LCP, de l'INP (réactivité aux interactions) ou du CLS. | Les cibles du §5.9 portent sur le 75e percentile des vrais utilisateurs : une simulation Lighthouse ne dit pas si PERF-01 à PERF-03 marchent sur un Android au Cameroun. L'INP (thème, langue, menu) n'a jamais été mesuré. | Ajouter web-vitals (≈ 2 ko gzip, chargé après l'affichage) et envoyer LCP, INP et CLS, avec la page et le type de connexion, vers l'outil d'analyse retenu, après consentement si nécessaire. Suivre le 75e percentile par pays. |
| finition<br>PERF-12 | Dépendances du projet | `package.json`<br>`src/pages/VkiBusiness.tsx:2`<br>`src/i18n.ts:145-149` | @google/genai, express et dotenv sont installés sans être importés ; framer-motion n'est importé que par VkiBusiness, en doublon de motion, et vite est listé deux fois. Le détecteur de langue est neutralisé par lng: 'fr' mais écrit encore i18nextLng dans le localStorage, une valeur jamais relue. | Rien de cela ne pèse aujourd'hui dans le paquet (une seule copie de Motion, aucune trace de GoogleGenAI). C'est de l'hygiène : installation plus lourde, surface d'attaque plus grande, risque d'une seconde copie de Motion si les versions divergent. | Retirer @google/genai, express, dotenv et framer-motion (importer motion/react dans VkiBusiness), et garder vite et ses plugins en devDependencies seulement. Pour le détecteur de langue et lng: 'fr', voir T-08. |

Voir aussi ETA-08 (écran de repli vide, aucun préchargement des pages), T-04 (images générées à remplacer), MEL-02 (cache des fichiers non hachés de public/) et MEL-05 (logo servi comme image de partage). Lenis sur téléphone et le coût des compteurs sont traités en B.6 (ANIM-09, ANIM-12).

### B.6 Animations (§5.10)

L'exécution technique compte parmi les parties les plus soignées du projet. useGSAP est utilisé avec un scope partout, et les effets lourds sont réservés à l'ordinateur par gsap.matchMedia. La galerie épinglée suit le gabarit du §5.10.7. Le nettoyage est complet et il n'y a aucune boucle infinie. Le mode « réduire les animations » laisse une page complète et lisible (vérifié sur les planches). Le problème est la quantité, le sens et le coût. L'accueil empile une vingtaine d'effets, dont trois effets de défilement lourds à la suite, sans idée directrice : c'est un tell d'interface générée (§4.1). Le seul mouvement qui raconte la fondation, l'arc « Depuis le Cameroun » vers l'Europe, est relégué dans une mini-carte et ne joue qu'au survol. Côté coût, le rideau et les fondus du hero retardent le LCP mobile d'au moins 1,45 s (estimé, voir PERF-01). Sur téléphone, les apparitions déclenchées à 30 % de la surface d'un groupe laissent des zones vides, et en paysage du contenu peut ne jamais s'afficher (calculé). Plusieurs effets avaient été validés : les retraits proposés sont donc marqués « à valider ». Recommandation d'ensemble : appliquer le test Chanel (§4.2 : retirer des effets jusqu'à ce qu'il ne reste que celui qui compte), garder un seul moment fort, lié à la signature retenue en synthèse (§3), et rendre le texte visible dès la première image.

**Ce qui a été vérifié et comment.**
- Lecture de code ligne à ligne : les 12 fichiers de src/effects/, lib/gsap.ts, lenis.ts, reducedMotion, scroll, Home.tsx en entier, SectionHeader, Counter, DomainCard, CourseCard, Footer, Navbar, PageTransition.
- Captures avec animations actives sur l'accueil (galerie au début et au milieu, Mobilité avant et après, hero et menu à 390), et planches en mode réduit (accueil@1440, accueil@390).
- Durées et courbes comparées au tableau du §5.10.3. Seuils d'apparition calculés d'après les hauteurs mesurées sur les planches (accueil@390-p04 et p09).
- Recherche dans src : aucun markers, repeat: -1, animate-spin, animate-pulse ni animate-bounce.
- Les animations n'ont pas été filmées : le jugement repose sur le code et sur des captures fixes.

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| important<br>ANIM-01 | Accueil ; Layout (toutes pages) | `src/pages/Home.tsx:142-145, 243, 556-558`<br>`src/components/Layout.tsx:71-81`<br>`src/effects/ExpandSection.tsx:46-72` | L'accueil empile une vingtaine d'effets : rideau, titre masqué, zoom et parallaxe, vidéo de fond, SplitText, compteurs, galerie épinglée, agrandissement en clip-path, vignette qui grandit puis s'ouvre, frise, 4 boutons magnétiques, Lenis, barre de progression (montée sur toutes les pages), apparition de la bulle WhatsApp, transitions de page. Trois effets lourds se suivent : galerie épinglée (≈ 1 580 px de molette pour 6 cartes), agrandissement, vignette. Pendant l'épinglage, le titre sort de l'écran et ≈ 220 px restent vides au-dessus et au-dessous des cartes (capture anim-accueil-1440-galerie-milieu). | C'est le tell du §4.1 « empilement de tous les effets sans idée directrice » ; le §5.10.1 demande un moment orchestré, avec au plus un effet fort par section. Changez le logo, et rien dans le mouvement ne dit « fondation camerouno-allemande » : le seul geste porteur de sens, l'arc Cameroun → Europe, est caché dans une mini-carte au bloc 9 et ne joue qu'au survol. | Garder un seul moment fort, lié à la signature retenue en synthèse (§3) : la frise A1 → C1 qui se remplit (piste 1), le tampon qui se pose (piste 2) ou, à défaut, l'arc Cameroun → Europe tracé une fois en grand. Réserver la barre de progression aux articles. Retirer le rideau, le magnétique, SplitText, les compteurs et la vignette qui grandit, et ne garder qu'une des deux grandes scènes, galerie épinglée ou agrandissement Mobilité (à valider). |
| important<br>ANIM-02 | Accueil (Notre approche, Actualités, Agir, frise, Mobilité), Galerie, Footer | `src/effects/StaggerGroup.tsx:19, 32`<br>`src/effects/useTimelineDraw.ts:29-40`<br>`src/effects/ExpandSection.tsx:70` | StaggerGroup attend que 30 % du groupe soit à l'écran : sur téléphone, 300 à 350 px de grille restent transparents (dans Agir, la carte « Faire un don » est presque entière à l'écran mais invisible), et un groupe plus haut que 2 813 px (écran de 844 px) ne s'affiche jamais. En paysage (≈ 360 px de haut), la limite tombe à 1 200 px : les actualités de l'accueil et l'album Open Day (≈ 2 070 px et plus) restent invisibles (calcul, non testé en navigateur). Les jalons de la frise n'apparaissent qu'à 70 % de la hauteur d'écran (≈ 250 px vides en bas à 390). Sur ordinateur, Mobilité montre ≈ 400 px de vert vide avant sa cascade (« top 45% »). | Le public mobile fait défiler du vide sous un titre : la page semble cassée, et les seules vraies photos de la fondation peuvent ne jamais apparaître. Le seul déclencheur de secours est le focus clavier. | Ne jamais faire dépendre l'apparition d'une fraction de la surface du groupe : amount « some » avec une marge négative (margin '0px 0px -15% 0px'), apparition carte par carte ou ScrollTrigger.batch (§5.10.5), ou rien sous 768 px. Pour la frise, sur téléphone, garder le tracé de la ligne et afficher les jalons (ou passer à « top 90% ») ; pour Mobilité, lancer la cascade à « top 75-80% ». Tester à 740 × 360 et 667 × 375, et passer en bloquant si le défaut en paysage se confirme. |
| important<br>ANIM-03 | Toutes les pages (navigation) | `src/effects/PageTransition.tsx:31-36`<br>`src/App.tsx:50-54` | AnimatePresence est en mode="wait" : la nouvelle page n'est montée qu'après les 0,25 s du fondu de sortie, puis entre en 0,4 s. Comme les pages sont chargées à la demande, le téléchargement du fichier de la page ne commence lui aussi qu'après ces 250 ms, en série. | Le §5.10.1 interdit de faire attendre l'utilisateur la fin d'une animation. Chaque navigation paie 250 ms de mise en scène plus un aller-retour réseau (≈ 0,3-0,8 s en 3G, estimé), et aucun préchargement n'existe dans le code. | Supprimer le fondu de sortie (à valider), garder une entrée courte (0,3 s) et déplacer la remise en haut de page dans l'effet de navigation de Layout (à valider). Précharger les pages clés au survol ou au repos : voir ETA-08. |
| finition<br>ANIM-04 | Tout le site (titres de section), Footer | `src/components/wahhf/SectionHeader.tsx:21-31`<br>`src/components/Footer.tsx:31`<br>`src/components/wahhf/GalleryGrid.tsx:32` | Par défaut (reveal = true), SectionHeader apparaît en fondu avec une montée de 18 px : 12 titres animés sur l'accueil, de 0 à 4 sur les autres pages (4 sur Mobilité et Accompagnement, 3 sur Académie et Candidater). Six grilles apparaissent en cascade, dont celle du footer, présent sur toutes les pages. | Ce sont les tells du §4.1 « fondu + glissement sur chaque section » et « tout bouge » ; le §5.10.4 réserve whileInView aux blocs qui en bénéficient. Répété partout, le geste n'informe plus et ralentit la lecture de pages d'information (pays, arnaques, dossiers). | Passer reveal à false par défaut et ne l'activer qu'à un ou deux endroits choisis. Sur les grilles qui restent, une simple apparition en opacité (0,4 s) suffit. Retirer StaggerGroup du footer et des partenaires de l'accueil (à valider). |
| finition<br>ANIM-05 | Cartes (DomainCard, Notre approche, CourseCard, actualités, galerie) | `src/components/wahhf/DomainCard.tsx:20-65`<br>`src/pages/Home.tsx:570, 698, 925`<br>`src/components/wahhf/CourseCard.tsx:20` | Au survol, DomainCard change six propriétés à la fois (montée, ombre, zoom de l'image en 700 ms, grossissement du numéro, couleur du titre, rotation de la flèche), en plus d'un dégradé et d'une pastille en verre dépoli. Les cartes « Notre approche » (une div) et CourseCard (un article dont seuls les liens « Programme A1 » et « Candidater » sont actifs) se soulèvent alors qu'un clic sur la carte ne fait rien. Les zooms d'image durent 1,2 s sur la vignette vidéo et les actualités, 700 ms dans la galerie. | C'est le tell du §4.1 « hover animé sur chaque carte ». Un survol sur un élément non cliquable promet une action qui n'existe pas (faux état, §5.5), et 0,7 ou 1,2 s sortent du tableau du §5.10.3 (survol : 0,2 à 0,4 s). | Un seul retour visuel par carte cliquable (ombre ou flèche), en 200 à 300 ms ; zoom d'image supprimé ou limité à scale 1.03 en 300 ms. Aucun survol sur les éléments non interactifs : retirer hover:-translate-y-1 et l'ombre de Home.tsx:698 et de CourseCard (à valider), ou rendre toute la carte cliquable par un lien étiré. Voir aussi T-17 et A11Y-10. |
| finition<br>ANIM-06 | Accueil, hero en mode « réduire les animations » | `src/pages/Home.tsx:59-63, 209-251`<br>`src/App.tsx:109-110` | En mode réduit, le rideau est sauté, mais heroFade garde ses fondus et ses délais, car MotionConfig ne retire que les déplacements. La phrase d'appui n'est complète qu'à 1,45 s, les boutons à 1,75 s. | Le §5.10.2 demande, en mode réduit, un titre affiché directement. Les personnes qui ont demandé moins de mouvement attendent quand même le texte et les boutons, et leur LCP est retardé aussi. | Corrigé par PERF-01 (plus d'opacité nulle sur le hero, pour tout le monde). À défaut, passer initial={false} au conteneur du hero quand useReducedMotion() est vrai. |
| finition<br>ANIM-07 | Accueil, témoignages (mode réduit) | `src/pages/Home.tsx:66-70, 818-825` | En mode réduit, le témoignage qui sort est décalé d'un coup de 40 px puis s'efface en 0,3 s : MotionConfig applique le déplacement sans l'animer. | Le saut se voit, alors que le mode réduit doit rester calme. Le projet a déjà corrigé ce cas dans la visionneuse (GalleryLightbox.tsx:39), mais pas ici. | Faire comme GalleryLightbox : custom={shouldReduceMotion ? 0 : testimonialDir} sur AnimatePresence et sur le motion.div. Les témoignages eux-mêmes sont fictifs : voir T-02. |
| finition<br>ANIM-08 | Accueil (Mission, frise) | `src/effects/SplitReveal.tsx:31`<br>`src/effects/useTimelineDraw.ts:15` | Ces deux effets lisent le réglage « réduire les animations » une seule fois, sans gsap.matchMedia. Si le visiteur l'active pendant la visite, les lignes et les jalons pas encore vus gardent leur animation au défilement. | Le §5.10.2 demande de placer chaque effet dans gsap.matchMedia avec (prefers-reduced-motion: no-preference), pour qu'il réagisse au réglage et soit nettoyé seul ; les autres effets GSAP du projet le font déjà. Le cas est rare, et le texte ne reste jamais caché. | Envelopper ces effets dans mm.add(MQ.motionOk, …), comme ExpandSection. |
| finition<br>ANIM-09 | Téléphones (tout le site) | `src/lib/lenis.ts:13-25, 53-54` | Lenis (défilement fluide) est créé sur tous les appareils, sauf en mouvement réduit, y compris au toucher où il laisse le défilement natif (syncTouch: false). Son rappel branché sur gsap.ticker empêche le ticker de se mettre en veille : une boucle requestAnimationFrame tourne en permanence, avec lagSmoothing(0). | Cela consomme processeur et batterie sans aucun bénéfice sur les téléphones, qui font l'essentiel du public, et ajoute 5,4 ko gzip (§5.10.6 : garder le tactile natif). Avec lagSmoothing(0), les animations GSAP sautent après une longue tâche au lieu de rattraper. | N'initialiser Lenis, et donc lagSmoothing(0), que sous (hover: hover) and (pointer: fine), et le charger par import() (voir PERF-02). Garder le repli natif de scroll.ts, qui existe déjà pour le mode réduit. |
| finition<br>ANIM-10 | Accueil, section Mobilité (ordinateur) ; menu mobile ; rideau | `src/effects/ExpandSection.tsx:46-54`<br>`src/components/Navbar.tsx:545-555`<br>`src/effects/LoadingCurtain.tsx:58-63` | L'agrandissement de la section Mobilité anime un clip-path avec GSAP, lié au défilement (scrub) : à chaque image, le calcul se fait sur le fil principal et toute la section pleine largeur est repeinte. Le menu mobile (0,7 s) et le rideau animent aussi un clip-path, mais Motion les confie à l'API d'animation du navigateur (WAAPI), sans JS à chaque image. | Le §5.10.8 recommande d'animer x, y, scale ou opacity quand une animation saccade. Le coût réel n'a pas été profilé, et seul l'ordinateur est concerné pour l'agrandissement. | Vérifier au profil Performance (processeur ×4). Animer le scale d'un calque de fond plutôt que son clip-path ; passer le menu en yPercent reste facultatif. Ou retirer l'effet (voir ANIM-01, à valider). |
| finition<br>ANIM-11 | Boutons magnétiques (accueil, Mobilité, Accompagnement, article) | `src/effects/useMagnetic.ts:17, 25-30`<br>`src/lib/gsap.ts:16` | L'effet magnétique ne filtre pas le type de pointeur : MQ.desktop ne teste que le pointeur principal (pointer: fine). Sur un ordinateur à écran tactile ou avec un stylet, le bouton se décale sous le doigt. | Le §5.10.6 demande d'ignorer les pointeurs autres que la souris. Un bouton qui bouge sous le doigt gêne l'appui sur « Faire un don ». | Dans onMove et onEnter, ignorer l'événement si event.pointerType !== 'mouse'. Ou supprimer le magnétique, comme proposé en ANIM-01 (à valider). |
| finition<br>ANIM-12 | Chiffres clés (accueil, Notre impact) | `src/components/wahhf/Counter.tsx:15, 32, 44-49` | Le compteur vaut 0 tant que la section n'est pas vue, puis change à chaque image pendant 1,8 s ; le nombre affiché n'a ni aria-hidden ni valeur finale lisible. Chaque image déclenche un setState, pour un coût faible : React 19 regroupe les 4 compteurs en un seul rendu. | Un lecteur d'écran qui lit la section avant ou pendant l'animation annonce « 0+ » ou une valeur intermédiaire. Les robots et les aperçus, qui ne font pas défiler la page, voient « 0 ». La durée de 1,8 s sort du tableau du §5.10.3. | Afficher la valeur finale dans un `<span className="sr-only">` et passer le nombre animé en aria-hidden ; l'animer par une MotionValue ou une ref plutôt que setState, facultatif tant qu'aucune trace ne montre de saccade. Ne garder un compteur que pour des chiffres sourcés, voir T-11 (à valider). |
| finition<br>ANIM-13 | Accueil (hero) | `src/index.css:166-172` | Le zoom lent de l'image du hero dure 14 s, démarre seul et n'a pas de pause : le bouton pause ne concerne que la vidéo. | Le critère WCAG 2.2.2 vise tout mouvement automatique de plus de 5 s. Le risque est théorique : l'animation ne joue qu'une fois et ≈ 89 % du zoom (1,05 → 1,10) est fait à 5 s. | Ramener la durée à 4-5 s ; rien d'autre n'est nécessaire. |

Voir aussi PERF-01 (rideau et fondus du hero qui retardent le LCP), PERF-02 (GSAP, SplitText et Lenis dans le fichier principal), RESP-03 (apparition de la bulle) et ETA-08 (préchargement et écran de repli).

### B.7 Hors grille : mise en ligne, référencement, données personnelles

Ces points ne relèvent d'aucune dimension du skill, mais ils conditionnent le lancement. Rien n'empêche Google d'indexer la version actuelle (robots.txt « Allow: / », aucun noindex), avec ses TODO, ses témoignages inventés et son don simulé. Aucune configuration d'hébergement n'est versionnée. Sur un hébergement statique sans réécriture, chaque lien profond partagé (/candidater) renverra une erreur 404, et il n'y a ni règle de cache ni en-tête de sécurité. Les aperçus de partage sur WhatsApp, Facebook et LinkedIn sont cassés : l'image de partage a une adresse relative, et les balises ne changent qu'en JavaScript. Côté données personnelles, la vidéo YouTube se charge sur ordinateur avant tout choix au bandeau, qui affirme pourtant n'utiliser que des cookies techniques. Les candidatures restent en clair dans le navigateur, et rien n'est prévu pour les mineurs. La politique ne cite pas la loi camerounaise n° 2024/017 (à faire confirmer par un juriste). Enfin, aucun formulaire n'a de protection contre les robots : il faut la prévoir avant de brancher l'API. L'hébergeur n'est pas connu, et plusieurs effets dépendent de ce choix.

**Ce qui a été vérifié et comment.**
- Lecture : public/robots.txt, public/sitemap.xml (15 URL relatives), index.html (balises og:*, JSON-LD), SEO.tsx, App.tsx (BrowserRouter, route « * »).
- Recherche de fichiers : aucun .htaccess, vercel.json, netlify.toml, _redirects ni _headers à la racine ou dans public/. public/logo.svg a été lu : c'est un logo IROKO.
- Consentement : CookieBanner.tsx:32, heroVideo.ts:46, HeroVideoBackground.tsx:41 et la politique de confidentialité (TransversalPages.tsx:764-777) ont été lus.
- Formulaires : lecture de api.ts:962-990 (localStorage, envois simulés), de Candidater, Don, Agir et de la newsletter. La recherche de maxLength, honeypot ou captcha dans src donne 0 résultat.
- Les URL tierces ont été relevées dans le code : Unsplash, OpenStreetMap, qrserver, Cloudinary.

| Priorité | Page ou composant | Fichier | Problème | Pourquoi c'est un problème | Correction proposée |
|---|---|---|---|---|---|
| **bloquant**<br>MEL-01 | Tout le site (indexation) | `public/robots.txt:1-4`<br>`public/sitemap.xml:3-17`<br>`index.html:19-37` | Rien n'empêche les moteurs d'indexer la version actuelle : robots.txt autorise tout (« Allow: / »), aucune page n'a de noindex, et le sitemap pousse /faire-un-don, /candidater, /agir et /notre-impact. Le sitemap et la ligne « Sitemap: » utilisent des URL relatives (`<loc>/</loc>`, « Sitemap: /sitemap.xml »), qui ne sont pas valides. Le sitemap ne liste que 15 URL, sans fiches pays, niveaux, guide anti-arnaques ni articles. | Si cette version est mise en ligne, Google indexera sous le nom de la fondation des témoignages inventés, un don simulé et des TODO (jusque dans la meta description de /mentions-legales). Une page indexée reste en cache des semaines après correction. Au lancement, les contenus les plus recherchés (« étudier en Allemagne ») seront mal découverts. | Tant que le contenu n'est pas validé : « Disallow: / », `<meta name="robots" content="noindex">` dans index.html et en-tête X-Robots-Tag: noindex chez l'hébergeur, ou accès par mot de passe. Au lancement seulement, retirer ces verrous et publier un sitemap en URL absolues avec le domaine final, enrichi des fiches pays, niveaux, guides et articles. Voir aussi T-07 et T-01. |
| important<br>MEL-02 | Mise en ligne (toutes les routes) | `src/App.tsx:2, 99`<br>`public/logo.svg`<br>`vite.config.ts` | Le dépôt n'a aucune configuration d'hébergement (ni .htaccess, vercel.json, netlify.toml, _redirects ni _headers) : pas de réécriture vers index.html pour BrowserRouter, pas de règles de cache, pas d'en-têtes de sécurité. Polices, logo, image d'attente et données geo/ sont servis depuis public/ sans empreinte (hash) dans leur nom. public/logo.svg publie à /logo.svg un ancien logo « IROKO GROUP » violet et orange que rien n'utilise. | Sur un hébergement statique sans réécriture, un lien partagé sur WhatsApp (/candidater, /accompagnement/pays/allemagne) donne une erreur 404 (§5.12) ; avec une réécriture générique, toute URL inconnue répond 200 puis bascule sur l'accueil, ce que Google traite en « soft 404 » (page introuvable qui répond comme une page valide). Sans en-têtes de sécurité (CSP, HSTS, frame-ancestors), la page de don peut être affichée dans le cadre (iframe) d'un site frauduleux ; sans cache adapté, les ≈ 270 ko de public/ sont retéléchargés, ou une mise à jour n'arrive pas. | Choisir l'hébergeur et versionner sa configuration (.htaccess du §5.12, vercel.json ou _redirects) : réécriture vers index.html, cache long sur /assets/ seulement, no-cache sur index.html, compression Brotli, et déplacer polices et logo dans src/assets pour qu'ils soient hachés. Ajouter les en-têtes Content-Security-Policy (youtube-nocookie et Cloudinary autorisés), Strict-Transport-Security, frame-ancestors 'none' et Referrer-Policy ; pour une vraie page 404, voir ETA-06. Supprimer public/logo.svg (à valider). |
| important<br>MEL-03 | Accueil (vidéo du hero), bandeau cookies, Confidentialité, pages historiques | `src/config/heroVideo.ts:46`<br>`src/components/wahhf/CookieBanner.tsx:32`<br>`src/pages/TransversalPages.tsx:764-777` | Sur ordinateur, la vidéo YouTube du hero (≈ 1 Mo de scripts) se charge avant toute réponse au bandeau : le mode 'not-refused' teste consent !== 'essential', ce qui est vrai quand rien n'est choisi (HeroVideoBackground.tsx:41). Le bandeau affirme pourtant n'utiliser « uniquement des cookies techniques », et aucun lien ne permet ensuite de revenir sur son choix. D'autres tiers, absents de la politique, reçoivent l'adresse IP dès l'affichage : 12 images images.unsplash.com, une carte OpenStreetMap en iframe sur /contact et un QR code api.qrserver.com qui reçoit l'URL de la page. La vidéo Cloudinary de la modale et WhatsApp, pas cités non plus, ne la reçoivent qu'au clic. | Pour des visiteurs et donateurs allemands, charger un contenu tiers avant consentement est un risque juridique connu (RGPD et § 25 du TDDDG, l'ancien TTDSG ; le tribunal régional de Munich, LG München I, a condamné le 20 janvier 2022 un site qui transmettait l'IP à Google Fonts). Le bandeau et la politique deviennent faux, ce qui entame la confiance qu'une ONG demande à ses donateurs. | Passer consent à 'explicit', réécrire le bandeau (« la vidéo d'accueil est hébergée par YouTube : elle n'est chargée que si vous l'acceptez ») et ajouter un lien « Gérer les cookies » dans le footer. Héberger images et QR code sur le site, remplacer l'iframe de carte par une image et un lien, et lister dans la politique chaque destinataire restant (YouTube, Cloudinary, WhatsApp/Meta) avec sa finalité. Mieux encore : supprimer la vidéo de fond et retirer les pages historiques (à valider). |
| important<br>MEL-04 | Candidater, newsletter de l'accueil, Faire un don, Agir, Confidentialité | `src/services/api.ts:962-971`<br>`src/pages/Home.tsx:1141-1163`<br>`src/pages/DonatePage.tsx:298-309` | Chaque candidature (nom, e-mail, téléphone, ville, message) reste en clair dans le stockage du navigateur (localStorage), sans limite de durée et sans que la politique le dise. La newsletter annonce une lettre mensuelle mais recueille l'e-mail sans lien vers la politique ni double confirmation, et promet une « désinscription en un clic » que rien ne réalise ; les cases de consentement de Don et d'Agir n'ont pas de lien vers la politique, contrairement à Candidater. Le formulaire vise des jeunes mais ne demande pas l'âge et ne prévoit rien pour un mineur ; la politique ne cite que le RGPD, pas la loi camerounaise n° 2024/017 (entrée en vigueur annoncée le 23 juin 2026, à faire confirmer par un juriste). | Sur un téléphone partagé ou en cybercafé, la personne suivante peut lire la candidature. L'article 13 du RGPD impose d'informer au moment de la collecte, et le double opt-in (double confirmation) est la norme en Allemagne. La plupart des candidats vivent au Cameroun, et leurs données partiront sans doute vers l'Allemagne. | Ne rien stocker dans le navigateur (au plus la référence, effacée après affichage). Lier les consentements de Don et d'Agir à /confidentialite, ajouter sous le champ de la newsletter « Votre adresse ne sert qu'à cet envoi » et un lien vers /confidentialite, avec un outil à double opt-in, et demander l'âge, avec le contact et l'accord d'un parent pour un mineur. Faire réécrire la politique par un juriste : RGPD et loi n° 2024/017, responsable du traitement, transferts Cameroun ↔ Allemagne, formalités auprès de l'autorité camerounaise, formulaire de don et newsletter. |
| important<br>MEL-05 | Toutes pages (aperçus WhatsApp, Facebook, LinkedIn) | `index.html:24-37, 63`<br>`src/components/wahhf/SEO.tsx:12-30` | og:image pointe, par un chemin relatif, vers le logo PNG de 598 × 417, alors que twitter:card vaut summary_large_image. Il n'y a ni og:url ni og:locale, et le logo du JSON-LD est relatif lui aussi. SEO.tsx ne modifie le titre, la description et les og:* qu'en JavaScript, après le rendu : les robots d'aperçu, qui n'exécutent pas le JS, voient la même fiche générique (« WAHHF Foundation — Branche Sociale du Groupe IROKO ») pour un article comme pour la page de don. | Au Cameroun, WhatsApp est le premier canal de diffusion, et les partenaires partagent sur LinkedIn : un aperçu sans image, identique pour toutes les pages, réduit les clics. La plupart de ces robots ne résolvent pas une URL d'image relative. | og:image en URL absolue vers une image 1200 × 630 (vraie photo de l'Open Day et nom de la fondation), avec og:url et og:locale (fr_FR, alternate en_GB). Pré-rendre au build les balises de chaque route (title, description, og:*, canonical), au moins pour l'accueil, le don, la candidature et les articles, et raccourcir le titre de l'accueil (≈ 110 caractères). Voir aussi T-06 pour le nom ajouté à chaque titre. |
| important<br>MEL-06 | Tous les formulaires (sécurité de l'envoi) | `src/services/api.ts:1, 962-990`<br>`src/pages/ApplyPage.tsx`<br>`src/pages/Home.tsx:1141` | Aucun formulaire n'a de défense : pas de maxLength, pas de champ piège (honeypot), pas de délai minimal, pas de limite d'envoi (0 résultat pour maxLength, honeypot, captcha ou turnstile dans src). Le contrat de l'« API Symfony » annoncée n'existe pas : Agir envoie un `Record<string, unknown>`. | Ces formulaires seront partagés sur WhatsApp et Facebook. Le jour où ils enverront vraiment, des robots et des messages de plusieurs Mo arriveront dans la boîte de l'équipe ou dans la base. | Avant de brancher l'API : maxLength sur chaque champ (nom 100, e-mail 254, message 2 000), un champ piège invisible et un délai minimal, une validation et une limite d'envoi côté serveur, un schéma de données typé et partagé avec Symfony, un jeton anti-CSRF (protection contre les envois forgés depuis un autre site) si l'API utilise des cookies. Un captcha seulement s'il est nécessaire, et respectueux de la vie privée. Voir aussi ETA-01 et ETA-02. |

Voir aussi T-07 (pages IROKO encore en ligne et indexables), ETA-01 (aucun envoi réel), ETA-06 (aucune page 404), T-08 (ni URL /en ni hreflang) et T-06 (nom développé dans chaque titre et dans le JSON-LD).

## Synthèse

### 1. Les 5 problèmes les plus graves

**1. Le site présente du provisoire et du fictif comme du vrai.**
- **Ce qu'on voit.**
  - 108 « TODO » lisibles sur 27 des 28 routes.
  - 5 témoignages inventés, dont les 3 de l'accueil, illustrés par des images générées.
  - 4 « partenaires » génériques et 3 actualités d'exemple.
  - Un chiffre « 1 250+ » d'exemple, animé comme un résultat.
  - Des sessions de cours annoncées « à venir » alors que 6 sur 7 sont passées.
  - Des liens « officiels » suivis de « (TODO : vérifier lien officiel) ».
  - Des portraits Unsplash sous les noms réels des cofondateurs.
  - Un nom de fondation qui ne correspond pas aux kakémonos.
- **Pourquoi c'est le plus grave.** La promesse de la fondation est « information vérifiée », et elle met en garde contre les fausses promesses. Ce défaut détruit en une minute la confiance d'un donateur ou d'un partenaire allemand.
- **Où :** T-01, T-02, T-03, T-04, T-05, T-06, T-11, ACC-01, IMP-01, PAYS-01, FON-01.
- **Correction.** Remplacer chaque TODO et chaque contenu fictif par le contenu réel (à fournir par la fondation ; liste en annexe A). En attendant, masquer ce qui n'est pas confirmé (à valider).

**2. Aucune des tâches proposées n'aboutit.**
- **Ce qu'on voit.** Les 4 fonctions d'envoi renvoient un succès sans aucun appel réseau.
  - Le don est « (Simulé) » et affiche un texte de développeur.
  - La candidature d'un jeune reste dans le stockage local de son téléphone, avec une référence tirée au hasard.
  - Le bénévolat, le partenariat et la lettre d'information ne partent nulle part.
  - Sur `/candidater`, « Continuer » ne fait rien, sans message, quand un champ manque.
  - Il n'y a pas de page Contact WAHHF, et « Candidater » est absent du hero ; dans le header ordinateur, il n'est qu'un petit lien au fond d'un sous-menu.
  - Le seul canal pour signaler une arnaque est une adresse marquée TODO, qui n'est même pas un lien.
- **Où :** ETA-01, DON-01, CAND-01, T-09, ARN-01, CTC-02.
- **Correction.**
  - Brancher l'API Symfony annoncée, ou un service de formulaires et un prestataire de paiement, avec de vrais états d'erreur et hors-ligne (B.2).
  - Ajouter Candidater et Contact au header.
  - Donner un canal officiel et cliquable pour les signalements.

**3. Un autre site vit dans le site.**
- **Ce qu'on voit.** Le lien « Archives Groupe IROKO », dans le footer de chaque page, mène à 8 pages historiques. On y trouve :
  - des devis événementiels et de la location de sono ;
  - environ 110 clés de traduction brutes ;
  - du texte vert sur vert à 1,32:1 ;
  - des numéros de téléphone égyptiens et fictifs ;
  - une troisième palette, violet et orange.

  Ces pages sont indexables.
- **Où :** T-07, HIS-01, HIS-02, HIS-03, CTC-01, CTC-03, MEL-01.
- **Correction.** Retirer le lien du footer et rediriger ces routes (301) vers les pages WAHHF correspondantes ou vers l'accueil, sauf /vkibusiness, à déplacer sur le domaine IROKO (T-07, VKI-01) (à valider). D'ici là, les passer en `noindex`.

**4. Les obligations légales et la protection des données ne sont pas tenues.**
- **Ce qu'on voit.**
  - Les mentions légales n'ont ni forme juridique, ni adresse, ni représentant, ni hébergeur.
  - La politique de confidentialité est incomplète et inexacte. Elle ne cite ni Unsplash, ni OpenStreetMap, ni qrserver, ni Cloudinary, ni WhatsApp. Le bandeau, lui, promet « uniquement des cookies techniques », alors que la vidéo YouTube se charge avant tout choix.
  - La lettre d'information collecte une adresse sans lien vers la politique ni double confirmation.
  - Rien n'est prévu pour les candidats mineurs.
  - Des photos de mineurs sont publiées alors que les autorisations sont « à vérifier ».
  - Le don mensuel n'a aucune condition.
  - La page Transparence financière est vide.
  - Rien n'empêche l'indexation de la version actuelle.
- **Où :** MEN-01, CONF-01, TRA-01, GAL-01, MEL-01, MEL-03, MEL-04, DON-04.
- **Correction.**
  - Faire rédiger les mentions légales, l'Impressum et la politique par un juriste (RGPD et loi camerounaise).
  - Recueillir les autorisations de diffusion des photos.
  - Bloquer l'indexation jusqu'au lancement (B.7).

**5. Les deux planchers techniques ne sont pas atteints sur mobile.**
- **Performance.** Le LCP mobile est de 5,04 à 5,11 s, dont 92 % de délai de rendu, pour un public sur Android en 3G/4G. Les causes cumulées sont :
  - le rideau d'introduction ;
  - la phrase d'appui, qui part en opacité 0 ;
  - un rendu 100 % côté client ;
  - un JS de 269 ko gzip pour un budget de 200 ko.
- **Accessibilité.**
  - L'anneau de focus or est à 1,92:1 sur la crème.
  - Les choix des formulaires de don et de candidature ne donnent leur état qu'à l'œil.
  - Les labels ne sont pas reliés aux champs sur `/agir`.
  - Le header déborde sous 384 px.
- **Où :** PERF-01, PERF-02, A11Y-01, A11Y-02, AGIR-01, RESP-01.
- **Correction.**
  - Afficher le hero dès la première image, sans rideau.
  - Charger GSAP et Lenis à la demande, et pré-rendre le HTML.
  - Dessiner un anneau de focus à double trait (sombre et clair), comme sur la carte du Cameroun.
  - Signaler l'état des choix avec `aria-pressed`, ou avec des boutons radio dans un `fieldset`.

Juste après ce top 5 vient l'identité générique (T-14 à T-19, ANIM-01). C'est le premier chantier de design, une fois les bloquants levés.

### 2. Ce qui fonctionne bien

À garder, quelle que soit la direction choisie.

**Ce qui appartient vraiment à WAHHF**

1. **La voix anti-arnaque.** Le guide « Éviter les arnaques », la FAQ, « Nous ne vendons ni visa ni emploi », « Un projet d'études ne s'achète pas », « aucun document d'identité au premier contact ». C'est le positionnement le plus différenciant du site.
2. **Les fiches pays reliées aux portails officiels**, avec la note honnête sur l'Albanie, hors Union européenne.
3. **La carte de présence.** Les 10 régions du Cameroun sont cliquables et synchronisées avec les puces et le panneau. La mini-carte Europe porte l'arc « Depuis le Cameroun ». Les contours viennent de données géographiques réelles. C'est l'embryon d'une signature visuelle.
4. **Les vraies photos de l'Open Day et du Boot Camp de Yaoundé (25 avril 2026)** et la galerie par albums :
   - lieu et date sur chaque album ;
   - des textes `alt` précis ;
   - des filtres en `aria-pressed` ;
   - une visionneuse au clavier, au balayage et avec une légende annoncée (« 3 sur 14 »).
5. **L'Académie.** La frise A1 → C1, le test de niveau de 20 questions et le calendrier filtrable sont de vraies séquences, qui ont droit à la numérotation. Le résultat du test et les cartes de session pré-remplissent `/candidater` (`?souhait=cours_allemand&niveau=B1`).
6. **Des micro-textes qui comprennent le public :**
   - « Lecture à la demande uniquement (respect de votre forfait mobile et de votre tranquillité) » ;
   - « Aucun document d'identité ni aucun paiement ne vous est demandé » ;
   - le bouton WhatsApp avec un message prérempli en français et en anglais ;
   - le champ « Téléphone / WhatsApp » ;
   - le Cameroun présélectionné.

**Design**

7. **Le rouge `#C8102E` réservé au don et le vert profond `#0F3D2E` pour les surfaces sombres.** Le principe est sain : il reste à l'appliquer strictement.
8. **Une palette disciplinée.** 4 hex couvrent 89 % des couleurs. Les tokens or sont définis selon le fond, avec leurs ratios documentés : `gold-text` à 5,26:1 sur clair, `gold-on-green` à 6,64:1 sur vert (`index.css:95-107`). C'est exactement le modèle du §5.1, à généraliser.
9. **Le thème sombre.** La hiérarchie est conservée et les bordures remplacent les ombres. Un script inline pose le thème avant le premier rendu, sans flash.
10. **Les images au format imposé** (`aspect-[16/10]`, `object-cover`, `width` et `height` renseignés) : aucune image déformée, CLS de 0 mesuré.
11. **Les boutons** (pilule et rond fléché, `DonateButton` dédié) sont une bonne base, à garder avec des variantes propres plutôt qu'avec des surcharges `!bg-`.

**Technique**

12. **Un seul crochet `useDialog` pour toutes les fenêtres** : menu mobile, recherche, vidéo, visionneuse, carte plein écran. Il gère Échap, le piège de Tab, le focus initial, le retour du focus au déclencheur et le blocage de la page (`lenis.stop`).
13. **La navigation au clavier.**
    - Le lien « Aller au contenu » est le premier arrêt clavier.
    - `scroll-padding-top` est égal à la hauteur du header.
    - Le header réapparaît dès qu'un de ses éléments reçoit le focus.
    - Les révélations s'achèvent dès qu'un élément masqué reçoit le focus : aucun arrêt clavier ne tombe sur un élément invisible.
14. **Le mode « réduire les animations » est presque complet** (restes mineurs : ANIM-06 à ANIM-08). Il n'y a ni rideau, ni Lenis, ni vidéo, la galerie passe en grille et le texte n'est pas découpé : la page tient seule à l'arrêt. Le survol est limité aux souris pour tout le site (`@custom-variant hover`), donc aucun survol ne reste collé sur mobile.
15. **Le chargement.**
    - Le code est découpé par route, avec `ChunkErrorBoundary` et un bouton « Réessayer » au lieu d'une page blanche.
    - La carte et ses données ne se chargent qu'à l'approche de la section, avec un emplacement réservé au bon ratio.
    - Les polices sont auto-hébergées, découpées par `unicode-range` et préchargées, sans aucune requête vers Google.
16. **La vidéo de fond du hero est très encadrée.**
    - Elle ne se charge jamais sur un écran tactile, en 2G/3G, en mode économie de données ou si les cookies sont refusés (mais elle se charge avant tout choix au bandeau : MEL-03).
    - Elle ne démarre qu'après le chargement complet, 3 s d'attente et un moment d'inactivité, et se met en pause hors écran.
    - Elle a un bouton Pause mémorisé pour la session.
    - Résultat mesuré : LCP de 0,86 à 0,99 s sur ordinateur.
17. **L'architecture du mouvement.** Les effets sont rangés dans `src/effects`, `useGSAP` est utilisé avec un scope, et `gsap.matchMedia` reprend exactement la variante CSS `pin:`. La galerie épinglée est conforme au §5.10.7 : ancre sur la section parente, distance calculée par fonction, `ease: none`, `invalidateOnRefresh`. C'est la manière de faire à garder si une scène épinglée est conservée ; la recommandation de direction (§3) propose de n'en garder qu'un seul moment de mouvement.

### 3. Recommandation de direction

**Faire évoluer, en deux temps.** Nettoyer seul ne suffira pas. L'identité actuelle est propre, mais c'est un gabarit : crème, Fraunces, vert et or, cartes numérotées. Elle échoue au test du nom retiré, au test d'échange et au test « autre modèle ». La nettoyer ne la rendra pas mémorable.

**Temps 1 : nettoyer, quelle que soit la piste.** Les bloquants du top 5 passent avant toute question de style :

- la fiction et les brouillons ;
- les parcours qui n'aboutissent pas ;
- les pages historiques ;
- les obligations légales ;
- les deux planchers techniques (performance et accessibilité).

Le nom légal de la fondation doit être tranché par la fondation avant tout travail visuel. Il faut aussi obtenir les originaux HD des photos et les autorisations des personnes photographiées.

**Temps 2 : faire évoluer, autour d'une signature.** Ce que les deux pistes gardent :

- le vert profond pour les surfaces sombres ;
- le rouge réservé au don ;
- la carte passerelle ;
- la voix anti-arnaque ;
- les vraies photos et la galerie ;
- la frise A1 → C1 ;
- toute l'ingénierie listée plus haut.

Ce que les deux pistes changent :

- la crème ;
- la serif passe-partout ;
- les sur-titres en capitales et les filets ;
- les numéros décoratifs et les flèches partout ;
- la carte unique ;
- les images IA.

Dans les deux cas, il n'y a qu'**un seul moment de mouvement, lié à la signature**, et le reste devient statique (test « Chanel » du §4.2). Cela revient à reconsidérer une partie des effets validés en phase 2 : rideau, magnétique, SplitText, compteurs, agrandissement, vignette qui grandit, fondu des titres. Ce choix est à valider par vous.

#### Piste 1 : « Cahier & tableau » — l'école des deux pays

- **Univers.** Le cahier à réglure Seyès avec sa marge rouge, utilisé au Cameroun francophone, répond au *Schulheft* allemand et à son *Rand*. On y ajoute :
  - le tableau vert et la craie (« Willkommen in der Klasse ») ;
  - l'encre bleue du stylo et l'étiquette de cahier ;
  - le livret de progression A1 → C1 ;
  - le mot allemand du jour.

  Le ton est celui d'un professeur exigeant et bienveillant. Le programme phare (Académie, orientation) devient la colonne vertébrale du site, et les autres domaines deviennent des chapitres du même cahier.
- **Couleurs** (ratios calculés avec la formule WCAG) :

  | Token | Hex | Rôle | Contraste |
  |---|---|---|---|
  | `--tableau` | `#0F3D2E` | fonds sombres, footer (gardé) | texte blanc 12,16:1 |
  | `--papier` | `#FFFFFF` | fond clair, remplace la crème | — |
  | `--encre` | `#1B2A5E` | texte et liens sur papier | 13,64:1 |
  | `--marge` | `#C8102E` | rouge du logo : filet de marge et bouton de don seulement | 5,88:1 sur papier (texte blanc dessus : 5,88:1) |
  | `--craie` | `#F2C14E` | accent, uniquement sur `--tableau` | 7,24:1 |
  | `--reglure` | `#C9D3EE` | lignes et bordures subtiles, jamais pour du texte | 1,50:1 (décor seulement) |

- **Typographie.** Une seule famille, Atkinson Hyperlegible Next. Elle a été conçue par le Braille Institute pour la lisibilité, ce qui colle à la mission d'inclusion et à la lecture au soleil sur Android.
  - Deux graisses : 400 et 700.
  - Titres d'affiche en `clamp(2.6rem, 8vw, 7rem)`, interligne 0,95, approche −0,03 em.
  - Texte courant à 17-18 px.
  - Chiffres tabulaires pour les niveaux, les horaires et les montants (€ et FCFA).
  - Les mots allemands en italique, comme matériau du titre.
  - Aucune police manuscrite.
- **Signature : la marge rouge.** Un filet vertical rouge court à gauche du contenu sur les pages claires. Dans cette marge s'écrivent les repères, comme les annotations d'un professeur : niveau, année, région, « source officielle vérifiée le … ». Elle apparaît précisément :
  - dans le hero de l'accueil, qui s'ouvre sur « Où en êtes-vous ? A1 · A2 · B1 · B2 · C1 » et mène au test de niveau, avec « Douala → Allemagne » dans la marge ;
  - sur l'Académie, où la frise A1 → C1 se lit comme des lignes de cahier qui se remplissent (le seul effet fort du site, joué une fois) ;
  - sur Candidater, avec les étapes 1, 2 et 3 inscrites dans la marge ;
  - sur les fiches pays, avec les liens officiels cochés dans la marge et leur date de vérification.
- **Risques.**
  - Un ton scolaire face aux institutions allemandes : rester sobre, sans texture papier, avec la réglure sur une ou deux zones seulement.
  - Le rouge de marge qui deviendrait une seconde couleur d'action : le seul bouton rouge plein reste « Faire un don ».
  - Réduire la fondation à une école de langue : les cinq autres domaines deviennent secondaires, ce qu'il faut assumer avec la fondation.

#### Piste 2 : « Le guichet de la vérité » — le tampon « Vérifié »

- **Univers.** On y trouve :
  - le dossier administratif ;
  - le tampon daté avec sa source ;
  - le reçu numéroté ;
  - la file d'attente du consulat ;
  - le faux message WhatsApp qu'on signale ;
  - le passeport qu'on ne confie à personne.

  Le ton est calme, factuel et protecteur. La promesse : « Ici, on vous dit la vérité, gratuitement. » L'esthétique sert directement le message anti-arnaque, qui est ce qui distingue WAHHF des autres ONG.
- **Couleurs** (ratios calculés) :

  | Token | Hex | Rôle | Contraste |
  |---|---|---|---|
  | `--papier` | `#F3F5F4` | fond clair, papier administratif gris-vert très pâle (pas de crème) | — |
  | `--encre` | `#13261F` | texte et sections sombres | 14,48:1 sur papier |
  | `--vert-tampon` | `#0F5A3E` | « vérifié », liens officiels, bouton Candidater | 7,51:1 sur papier ; texte blanc dessus 8,23:1 |
  | `--rouge-alerte` | `#C8102E` | arnaques et don, jamais en décor | 5,37:1 sur papier |
  | `--or-sceau` | `#E8A317` | accent, uniquement sur `--encre` | 7,31:1 |

  Ce sont les couleurs du logo et des deux drapeaux, mais chacune porte un sens.
- **Typographie.** Une grotesque institutionnelle robuste pour tout le site, par exemple Public Sans ou Instrument Sans.
  - Titres en graisse forte et en grande taille.
  - Chiffres tabulaires pour les dates et les montants (FCFA, €).
  - Ni serif, ni monospace.
- **Signature : les cartes « On vous dit / La vérité ».** À gauche, un vrai message d'arnaque stylisé (« Visa garanti contre 1 500 000 FCFA »). À droite, la réponse vérifiée, avec sa source officielle et un tampon daté. Elles apparaissent précisément :
  - juste sous le hero de l'accueil, qu'elles ouvrent ;
  - sur chaque fiche pays, qui porte « Vérifié le JJ/MM/AAAA · source : make-it-in-germany.com » ;
  - sur le reçu de don et la confirmation de candidature, qui reprennent le même tampon.

  Le seul effet fort : le tampon qui se pose, une fois.
- **Risques.**
  - Un ton anxiogène ou policier qui ferait fuir les jeunes : garder les visages de l'Open Day et un récit positif.
  - Une veille indispensable : un tampon daté périmé détruit la confiance plus vite qu'il ne la crée.
  - Les donateurs veulent aussi voir des réussites, pas seulement des alertes.

**Mon choix par défaut : la Piste 1**, en lui empruntant le tampon daté de la Piste 2 pour les fiches pays. Elle s'ancre dans ce que la fondation fait réellement (enseigner l'allemand, orienter), garde le vert existant et coûte peu. La Piste 2 est préférable si la fondation veut faire de la lutte contre les arnaques son message principal. Elle demande alors une veille documentaire réelle.

Une troisième piste a été étudiée puis écartée : « Indigo partagé », qui croise le ndop des Grassfields et le Blaudruck allemand. Elle est plus mémorable, mais elle exige un·e designer ou un artisan de chaque tradition et présente un risque de folklorisation.

### 4. Ce qui n'a pas pu être vérifié

Ce qui suit est soit déduit du code, soit hors de portée de cet audit. Chaque point mérite un contrôle avant d'être tenu pour acquis.

**Appareils et navigateurs**
- **Aucun appareil réel.** Il n'y a eu de test ni sur un Android de milieu de gamme, ni sur un iPhone. Ne sont donc pas vérifiés : la barre d'adresse de Chrome Android et les unités `svh`, les zones sûres de Safari iOS, le zoom automatique d'iOS sur les champs en 14 px, ni l'usage du téléphone en paysage.
- **Un seul navigateur, Chrome sans affichage (« headless »), et deux largeurs.** Toutes les captures sont prises à 390 × 844 et à 1440 × 900.
  - Les constats à 320, 360, 768, 1024 et 1280 px sont calculés à partir du code et de la largeur des glyphes mesurée sur les captures. Ils sont à confirmer dans DevTools : bouton menu qui sort de la pilule à 360, header sur deux lignes entre 1024 et 1279, footer qui déborde à 1024.
  - Le zoom à 200 et 400 % n'a pas été testé.
- **Safari, Firefox et le mode contraste élevé de Windows (`forced-colors`)** n'ont pas été testés : rendu de l'anneau de focus par défaut et des choix signalés par la seule couleur de fond.

**Accessibilité**
- **Aucun lecteur d'écran** (NVDA, JAWS, VoiceOver, TalkBack). Ne sont donc pas vérifiés : la lecture des paragraphes découpés par SplitText, les annonces `aria-live`, ni le comportement des fenêtres en curseur virtuel.
- **axe et la catégorie Accessibilité de Lighthouse n'ont pas été lancés.** Les contrastes sont calculés avec la formule WCAG à partir des hex et des opacités, à ±0,05 près. Les pastilles posées sur des photos sont calculées sur fond uni.
- **Les interactions n'ont pas été rejouées pendant cet audit** : envoi des formulaires, bulles de validation natives, états hover et active, parcours clavier complet. Un parcours clavier automatisé (17 routes, 116 arrêts) avait été fait à la phase précédente, sur une version antérieure ; il n'a pas été refait.

**Contenu et parcours**
- **La version anglaise n'a pas été capturée.** Le mélange de français et d'anglais est déduit de la couverture de `en.json` et du français écrit en dur dans les composants.
- **La première visite n'a pas été capturée.** Toutes les captures ont été prises avec les cookies déjà choisis. Le bandeau, d'environ 210 px de haut à 390 d'après le code, pourrait couvrir le bouton secondaire du hero. Sa superposition au menu mobile (même `z-50`) est déduite des règles d'empilement.
- **Les vidéos tierces n'ont été ni regardées ni écoutées.** C'est le cas du showreel IROKO (Cloudinary, `Home.tsx:637`) et de l'extrait « chorale » avec son. On ne sait donc pas s'il faut des sous-titres (WCAG 1.2.2) ni si le showreel est commercial.
- **La carte OpenStreetMap de `/contact`** est vide sur la capture. Impossible de dire si c'est l'environnement de capture ou un vrai échec.
- **Plusieurs comportements ont été lus dans le code, sans être reproduits :**
  - la perte de la saisie de `/candidater` quand Android recharge l'onglet après un passage par WhatsApp ;
  - l'état du test de niveau entre `/mobilite-langues/academie` et `/academie/:level` ;
  - le retour en haut de page au clic sur un niveau de la frise.
- **Le thème sombre n'a été capturé que sur 6 pages**, et seulement sur les 4 premiers écrans. La carte de présence en sombre n'a pas été vue.

**Performance et mouvement**
- **Lighthouse n'a été lancé que sur l'accueil.** Les pages internes (galerie, article, faire-un-don) ne sont pas mesurées. Il n'y a ni données terrain au 75e percentile, ni mesure de l'INP.
- **Les gains annoncés sont des estimations à re-mesurer**, une correction à la fois : environ −1,4 s de LCP sans le rideau, −57 ko gzip avec GSAP, SplitText et Lenis chargés à la demande (−65 ko en découpant aussi les données, voir PERF-02). La ventilation du fichier JS principal vient d'esbuild en isolation, à ±5 ko près.
- **Les animations n'ont pas été filmées.** Il n'y a pas de mesure de fluidité ni de profil Performance sur Android (coût des repaints `clip-path`). La part du découpage SplitText, des ScrollTrigger et des observateurs dans le TBT n'est pas isolée.
- **La vidéo du hero** ne s'est pas lancée dans Chrome headless pendant cet audit, donc son bouton Pause n'apparaît sur aucune capture. Sa lecture avait été validée à la phase précédente (21 contrôles, avec un Chrome à GPU). Elle n'a pas été revérifiée ici, ni le générique de fin visible sous le voile à chaque boucle.

**Mise en ligne et juridique**
- **L'hébergement réel est inconnu.** Le dépôt ne contient aucune configuration : en-têtes de cache, compression, réécritures pour React Router et en-têtes de sécurité restent à vérifier chez l'hébergeur choisi.
- **Les points juridiques sont des risques, pas des avis :**
  - RGPD et transferts d'adresse IP vers des tiers ;
  - UWG §7 et double opt-in pour la lettre d'information ;
  - données des mineurs ;
  - loi camerounaise n° 2024/017 sur les données personnelles.

  La date d'entrée en vigueur de cette loi (annoncée au 23 juin 2026) n'a pas été vérifiée sur le texte officiel. Tout est à faire confirmer par un juriste.
- **Le nom légal de la fondation** n'a pas pu être établi : le site dit « [forme longue retirée au lot 12 : fausse selon la fondation] », les kakémonos visibles sur les photos de l'Open Day « Watio Hearts Humanitarian Foundation ». Seule la fondation peut trancher.

## Annexes

### Annexe A — Contenus provisoires et fictifs encore visibles

Relevé automatique du texte affiché (`innerText`), à 1440 px, après avoir fait défiler chaque page jusqu'en bas. Le relevé compte :

- 108 occurrences de « TODO » sur 27 des 28 routes ;
- 35 mentions « à confirmer / à renseigner / à compléter / à préciser / à venir » ;
- 3 « (Simulé) », tous sur /faire-un-don.

Le code source contient 153 « TODO », commentaires compris. Rien n'a été retiré du site : chaque élément de la liste se remplace par le contenu réel (à fournir par la fondation).

**Sur toutes les pages**
- Footer : « (TODO : adresse exacte) ».
- Libellés lus par les lecteurs d'écran (`aria-label`) des réseaux sociaux : « LinkedIn / Facebook / Instagram / YouTube WAHHF Foundation (TODO) » (`Footer.tsx:69`).
- Titre de chaque onglet : « … | WAHHF Foundation — [forme longue retirée au lot 12 : fausse selon la fondation] », un nom à confirmer (`SEO.tsx:13`). Les 8 pages historiques gardent le titre par défaut de `index.html` (« WAHHF Foundation — Autonomiser la jeunesse, transformer les communautés »).

**Accueil `/`** (19 lignes)
- Chiffres :
  - « Chaque programme est suivi avec rigueur et transparence financière. (Chiffres à confirmer — TODO) » ;
  - « Jeunes et familles accompagnés (TODO : confirmer) » ;
  - « 1 250+ » avec « Valeur d'exemple — TODO : confirmer chiffre officiel ».
- Frise : « (Dates et jalons à confirmer — TODO) », et les années 2021, 2023 et 2025 suivies de « (TODO) ».
- Carte de présence, dans le panneau de chaque région : « Antenne locale : à confirmer (TODO) », « Actions dans la région : à renseigner (TODO) ».
- Témoignages : « Témoignages d'exemple marqués TODO à valider ». Les 3 témoignages sont inventés, dont « Aline M. (TODO : valider témoignage) », et illustrés par des images générées.
- Actualités : « 12 Mai 2026 (TODO) », « 28 Avril 2026 (TODO) », « 10 Avril 2026 (TODO) ».
- Partenaires, 4 catégories génériques présentées comme des partenaires :
  - « Réseau des Écoles & Bibliothèques Partenaires (TODO) » ;
  - « Collectif Médical Camerouno-Allemand (TODO) » ;
  - « Mentors & Enseignants d'Allemand Solidaires (TODO) » ;
  - « Initiative Agroécologique Régionale (TODO) ».
- Vidéo : titre de la fenêtre vidéo avec un TODO. La vidéo est le showreel IROKO, pas une vidéo WAHHF.

**Qui sommes-nous** : « Équipe & Gouvernance (TODO : noms officiels à confirmer) », « Direction & Conseil de Fondation (TODO) », « Coordination Pédagogique & Langues (TODO) », « Coordination Terrain Cameroun (TODO) ».

**Notre impact** : « Chiffres clés d'accompagnement (marqués TODO à consolider) », « Jeunes et familles accompagnés (TODO) », et les deux mentions du panneau de région.

**Galerie** : « Lieu et date à confirmer (TODO) · 2 éléments », « Lieux, dates et projets à confirmer (TODO) · 3 éléments ».

**Actualités et article** : les 3 dates « (TODO) ». Les actualités elles-mêmes sont des exemples.

**Partenaires** : « Réseau de coopération (TODO : liste officielle à confirmer) », « Établissements scolaires & éducatifs (TODO) », « Professionnels de santé bénévoles (TODO) ».

**Faire un don**
- « Carte / Virement SEPA (Simulé) », « Mobile Money Cameroun (Simulé) », « RIB / Virement Fondation (Simulé) ».
- « Ce que votre don permet (exemples — TODO) », suivi de 4 exemples d'usage par montant, chacun marqué « (exemple — TODO) ».
- Texte de développeur sur l'intégration Stripe / Symfony.

**Mobilité & Langues** : « Témoignages d'exemple marqués TODO dans l'attente des citations validées par l'équipe WAHHF ». Les 2 témoignages sont inventés : « Boris K. (TODO : confirmer témoignage) », « Raïssa T. (TODO : confirmer témoignage) ».

**Académie et Niveau A1** (même contenu sur les deux routes, 17 lignes)
- Durée et calendrier :
  - « 10 à 12 semaines (indicatif — TODO) » ;
  - « Septembre 2026 (TODO : confirmer date) » ;
  - « Cohortes gratuites (dates indicatives — TODO) ».
- Lieux : « Présentiel au Cameroun (TODO) », « Présentiel (Douala — à confirmer) », « (Yaoundé — à confirmer) ».
- Dates de session : 7 débuts de session marqués « (TODO) », du 14 septembre 2026 au 11 janvier 2027. **Six de ces dates sont déjà passées** au 15 novembre 2026.
- Certifications : « Préparation au Goethe-Zertifikat A1 : Start Deutsch 1 / telc Deutsch A1 (TODO : à vérifier) », « Certifications internationales (mention indicative — TODO : à vérifier) ».

**Fiche pays Allemagne** : 3 liens officiels marqués « (TODO : vérifier lien officiel) » (make-it-in-germany.com, daad.de, jaunde.diplo.de), alors que la description de la page promet une « information vérifiée ».

**Éviter les arnaques** : « integrite@wahhf-foundation.org (TODO : confirmer adresse e-mail officielle) ». C'est l'adresse à laquelle on demande d'envoyer les messages suspects.

**Mentions légales** : « Informations statutaires (TODO : compléter numéros d'enregistrement) », « Siège et antennes : Cameroun & Allemagne (TODO : adresses postales et numéros d'enregistrement officiels) ». Ce TODO figure aussi dans la description de la page pour les moteurs de recherche.

**Transparence financière** : « Publication des rapports annuels (TODO) », « (TODO : insérer lien PDF du rapport annuel dès validation) ».

**Pages historiques**
- `/contact` : « Localisation OpenStreetMap · Yaoundé (TODO : adresse exacte) ».
- `/fondateurs` : portraits Unsplash associés à des noms réels.
- `/tarifs` et `/contact` : clés de traduction brutes (`pricing.pack1.name`, `CONTACT.COORDSTITLE`).
- `/vkibusiness` : clés brutes `VKI.*`.
- Numéros de téléphone d'exemple (+49 30 1234567, +20).

**Contenus fictifs sans mention TODO**
- Les images générées présentées comme du terrain : domaines Santé, Entrepreneuriat et Environnement, et la salle de classe « Willkommen in der Klasse », réutilisée pour une actualité, un témoignage et la vignette vidéo.
- La photo du hero : la miniature de la vidéo YouTube, avec un orateur non identifié.

### Annexe B — Méthode et fichiers de travail

- **Build de production** servi en local (`vite preview`, port 4173), sans aucune modification du projet.
- **Captures, sur 28 routes**, en tranches d'écran. Planches lisibles dans le dossier de travail de la session :
  - à 1440 × 900 et 390 × 844, avec « réduire les animations », le thème clair, le consentement donné et le rideau sauté ;
  - en thème sombre sur 6 pages ;
  - avec les animations actives sur l'accueil.
- **Mesures automatiques** : hauteur de page, débordement horizontal, titres h1 à h3, titre et description, erreurs console (aucune), langue (`fr` partout), et relevé des contenus provisoires (annexe A).
- **Lighthouse 12.8.2** sur l'accueil, mobile et ordinateur, en 3 passages.
- **14 audits indépendants**, chacun contre-vérifié par un vérificateur chargé de le réfuter, puis une critique d'ensemble chargée de chercher les oublis et les contradictions :
  - 6 groupes de pages ;
  - 2 regards globaux, direction artistique d'une part, parcours et contenu d'autre part ;
  - 6 dimensions techniques : tokens, états, accessibilité, responsive, performance, animations.
- **Bilan de la vérification** : 446 constats bruts, dont 276 confirmés tels quels, 102 nuancés (chiffre, cause ou priorité corrigés), 58 oublis ajoutés par les vérificateurs et 10 ajouts de la critique. Aucun n'a été réfuté. Les doublons ont ensuite été fusionnés.
