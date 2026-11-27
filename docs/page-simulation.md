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
