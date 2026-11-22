# À faire au lancement

Ce qu'il faut changer le jour où le site devient public. Prévu au **Lot 9**. Chaque point dit où agir dans le dépôt.

## 1. Une URL par langue

### Aujourd'hui

- Chaque page a une seule adresse.
- La langue choisie est gardée dans le navigateur du visiteur (localStorage, clé `wahhf_langue`).
- Un lien partagé s'ouvre donc dans la langue mémorisée par celui qui le reçoit, ou en français.
- Les moteurs de recherche ne voient que le français.

### Proposition

**Adresses**
- Le français reste à la racine : `/qui-sommes-nous`.
- L'anglais et l'allemand ont un préfixe : `/en/qui-sommes-nous`, `/de/qui-sommes-nous`.
- Les slugs restent les mêmes dans les trois langues (`/de/accompagnement/pays/allemagne`). Traduire les slugs reste possible plus tard, avec des redirections.

**Routage** (`src/App.tsx`, `src/i18n.ts`)
- Chaque route accepte le préfixe facultatif `en` ou `de`.
- La langue de l'adresse prime sur la langue mémorisée, et met à jour `<html lang>`.
- Sans préfixe, la page est en français.

**Sélecteur de langue** (`src/components/Navbar.tsx`)
- Il mène à la même page dans l'autre langue (`/de/candidater` vers `/en/candidater`), en gardant la position dans la page et le focus sur le bouton.
- Le choix reste mémorisé pour les liens internes.

**Liens internes**
- Ils gardent le préfixe de la langue en cours, par une fonction commune qui construit les liens.

**Balises de chaque page** (`src/components/wahhf/SEO.tsx`)
- `<link rel="canonical">` vers l'adresse de la page dans sa propre langue.
- `<link rel="alternate" hreflang="fr" | "en" | "de" | "x-default">` vers les trois versions. `x-default` désigne la version française, à la racine.
- `og:locale` (`fr_FR`, `en_GB`, `de_DE`) et `og:locale:alternate` pour les deux autres.

**Sitemap** (`public/sitemap.xml`, à générer au build)
- Les adresses sont absolues, avec le domaine final.
- Toutes les pages y figurent : fiches pays, niveaux, guides, articles, événements.
- Chaque `<url>` porte les mêmes liens `xhtml:link rel="alternate" hreflang="…"` (fr, en, de, x-default) que la page.

**Serveur** (`public/.htaccess`)
- Les règles de réécriture acceptent aussi `/en/…` et `/de/…`, servies avec le statut 200.
- Une adresse inconnue garde le statut 404, dans les trois langues.

**Pages légales** (mentions légales, confidentialité, transparence)
- Elles ne sont pas traduites : en anglais et en allemand, elles affichent le français avec une mention.
- Leurs versions `/en/` et `/de/` pointent vers la version française comme canonique, sans hreflang et hors du sitemap, tant qu'il n'existe pas d'Impressum ni de Datenschutzerklärung en allemand (question 179 de docs/contenus-a-fournir.md).

**À étudier en même temps**
- Le site est rendu dans le navigateur : titre, description, canonique et hreflang sont posés par JavaScript.
- Google exécute le JavaScript, mais les aperçus de partage (WhatsApp, Facebook, LinkedIn) ne le font pas (audit, partie B.7).
- Un pré-rendu au build (une page HTML par route et par langue) réglerait les deux.

## 2. Levée du noindex

À faire seulement quand les contenus sont validés : TODO de docs/contenus-a-fournir.md, accords pour les photos, pages légales.

- **`index.html`** : retirer `<meta name="robots" content="noindex" />`, ligne 7.
- **`public/robots.txt`** : remplacer « Disallow: / » par « Allow: / ». Ajouter la ligne `Sitemap: https://<domaine>/sitemap.xml`, en adresse absolue.
- **Hébergeur** : vérifier qu'aucun en-tête `X-Robots-Tag: noindex` n'est ajouté. Il n'y en a pas dans `public/.htaccess`.
- **Pages « introuvable »** : elles gardent leur propre noindex (`src/lib/useNoIndex.ts`).

## 3. Autres points à vérifier le même jour

- **`public/.htaccess`** : corrigé le 22 novembre 2026. `/evenements` et `/evenements/<slug>` sont servies en 200. `npm run check` (scripts/check-routes.mjs) échoue désormais si une route du routeur manque dans le .htaccess. Le jour du lancement, vérifier sur l'hébergement réel :
  - `curl -I https://<domaine>/evenements` et `curl -I https://<domaine>/accompagnement/pays/allemagne` : statut 200 ;
  - `curl -I https://<domaine>/page-inexistante` : statut 404.
- **Adresse exacte de la fondation** : `CONTACT.address` dans `src/config/contact.ts`. Tant qu'elle manque, la ligne d'adresse du pied de page reste masquée en production.
- **Traductions à relire** : docs/traductions-de-a-relire.md (astérisques en priorité).
- **Faits de Road to Europe** : date, lieu, prix dans les trois langues, inscription (`ROAD_TO_EUROPE_FAITS`, questions 171 à 178).
