# Référence : section « Méthode » du site IROKO (description fournie par Emmanuel)

À utiliser comme modèle de comportement pour le lot 7.8. Ne pas reprendre l'identité IROKO (violet, orange, coin coupé, textes).

L'animation
Tout est fait avec GSAP, sur trois scénarios selon l'écran.

Sur ordinateur (1024 px et plus) : un « travelling » épinglé

Quand la section arrive en haut de l'écran, elle se fige (« pin ») pendant environ 4 hauteurs d'écran de défilement. Tout avance au rythme de la molette, avec un léger lissage.
Un tracé violet se dessine de gauche à droite (DrawSVG). C'est une ligne de circuit qui serpente en vague entre les cartes.
Un point orange parcourt ce tracé (MotionPath). Il représente le projet qui progresse.
La scène défile horizontalement comme une caméra : une bande de 3 600 px glisse pour garder le point orange à environ 40 % de la largeur de l'écran.
À chaque étape (5 repères dans la timeline) :
la carte apparaît : fondu, montée de 24 px, échelle de 0,94 à 1 ;
le point orange fait une petite impulsion (×1,4 puis retour) en « s'emboîtant » dans l'encoche de la carte ;
le titre et la description se révèlent ligne par ligne sous un masque (SplitText) ;
le compteur « ÉTAPE 01 / 05 » défile comme un compteur mécanique jusqu'à « 05 / 05 ».
À la fin, une 6ᵉ carte crème apparaît, avec un bouton vers /methode, puis la section se libère.
Le titre de la section se révèle aussi ligne par ligne à l'arrivée.
Sur mobile et tablette : défilement normal

Pas d'épinglage. Une ligne verticale ondulée se dessine au fil du défilement.
Les cartes apparaissent par lots (fondu, montée, légère échelle, en décalé).
Pas de point orange ni de compteur.
En mouvement réduit : tout est affiché immédiatement, ligne entièrement tracée, sans animation.

Le design
Une métaphore de circuit électronique ou de parcours, présentée comme un tableau de bord.

Le tracé : un trait violet #531FF5 de 2,5 px, sans halo. Il passe derrière les cartes, qui alternent haut et bas. À l'entrée de chaque carte, un petit nœud rond sombre cerclé de violet.
Les 5 cartes : des aplats pleins et opaques aux couleurs de la marque, identiques en clair et en sombre :
Étape	Fond	Texte	Accent
01 Écouter & Cadrer	violet #531FF5	blanc	lilas #D9CCFF
02 Structurer & Chiffrer	crème #F7F5F2	encre	violet
03 Concevoir & Valider	orange #FF8500	encre	encre
04 Réaliser & Déployer	violet clair #8B66FF	encre	encre
05 Accompagner & Mesurer	encre #0A0B14	blanc	orange
La forme signature :

un rectangle arrondi à 6 px, avec un seul coin coupé en biais de 44 px, chaque fois sur un coin différent (haut droit, bas gauche, haut gauche, bas droit, haut droit) ;
une encoche en demi-cercle de 12 px sur le bord gauche, à 70 px du haut : c'est là que le tracé « entre » dans la carte.
Les deux sont définis dans index.css (method-chamfer-*, method-card-notch).

La typographie dans chaque carte :

un grand numéro (01 à 05) de 64 à 72 px en gras ;
une rubrique en majuscules espacées (« CADRAGE INITIAL »…) ;
un titre de 26 à 30 px ;
une description d'environ 36 caractères par ligne ;
un filet fin, puis une étiquette (« Objectifs & Périmètre »…).
L'habillage façon tableau de bord :

en haut à gauche, le titre de section ;
en haut à droite, une pastille compteur « ÉTAPE 0X / 05 » ;
en bas, une barre discrète « Défilez pour parcourir les 5 étapes · IROKO GROUP ».
Ce que j'ai remarqué en la lisant
Elle ne suit pas toutes les règles que tu as fixées ailleurs :

Un dégradé violet → orange sous le titre (lignes 505 et 722), alors que ta règle est « aplats uniquement, jamais de dégradé ».
L'étiquette orange #FF8500 sur fond blanc est trop peu contrastée en mode clair. Il faudrait le token text-accent-text.
Des textes non traduits, figés en français : « ÉTAPE », les étiquettes des cartes, la carte finale « Excellence & Méthode Détaillée », « Défilez pour parcourir… ».
Les étapes 3 et 4 reprennent le vocabulaire d'IROKO Event (« scénographies », « régie terrain », « sur le terrain »), alors que cette méthode s'affiche pour tout le groupe.
Les couleurs sont écrites en dur dans le code ; c'était le Groupe 3 de la migration du thème.
Je peux corriger ces points si tu le souhaites.