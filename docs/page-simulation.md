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
