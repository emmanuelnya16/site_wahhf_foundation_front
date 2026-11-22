#!/usr/bin/env node
/**
 * Contrôle des routes : chaque route du routeur React (src/App.tsx) doit être servie par l'hébergement avec le statut
 * 200 (règles « RewriteRule … index.html » de public/.htaccess), et une adresse inconnue doit rester en 404 (page
 * « introuvable », par ErrorDocument 404).
 *
 * Méthode : une série d'adresses d'essai (un exemple par route, chaque route suivie d'un segment inconnu, des adresses
 * inventées) est soumise aux deux côtés. Pour chacune, « le routeur a une page » doit être égal à « le .htaccess sert
 * index.html en 200 ». Sinon, la route manque dans le .htaccess, ou le .htaccess accepte une adresse que le site ne
 * connaît pas (elle ne renverrait plus 404).
 * Vérifie aussi qu'aucune route ne porte le nom d'un dossier de public/ (Apache servirait le dossier, pas la page).
 * Usage : node scripts/check-routes.mjs   (aussi dans npm run check)
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const app = readFileSync(join(ROOT, 'src', 'App.tsx'), 'utf8');
const htaccess = readFileSync(join(ROOT, 'public', '.htaccess'), 'utf8');

// ---------- Routes du routeur ----------
const routes = [...app.matchAll(/<Route\s+path="([^"]+)"/g)].map((m) => m[1]).filter((p) => p !== '*');
if (!routes.length) {
  console.log('ÉCHEC : aucune route trouvée dans src/App.tsx');
  process.exit(1);
}
const SEGMENT = /^[A-Za-z0-9_-]+$/;
/** Le routeur a-t-il une page pour cette adresse (hors page « * ») ? Un paramètre vaut un segment. */
const reactMatches = (url) => {
  const parts = url.split('/').filter(Boolean);
  return routes.some((route) => {
    const r = route.split('/').filter(Boolean);
    return r.length === parts.length && r.every((seg, i) => (seg.startsWith(':') ? SEGMENT.test(parts[i]) : seg === parts[i]));
  });
};

// ---------- Règles du .htaccess ----------
const lines = htaccess.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
const rules = lines
  .map((l) => /^RewriteRule\s+(\S+)\s+index\.html\b/.exec(l))
  .filter(Boolean)
  .map((m) => new RegExp(m[1]));
const problems = [];
if (!rules.length) problems.push('aucune règle « RewriteRule … index.html » dans public/.htaccess');
if (!lines.some((l) => /^ErrorDocument\s+404\s+\/index\.html$/.test(l))) problems.push('« ErrorDocument 404 /index.html » absent : une adresse inconnue n\'afficherait pas la page « introuvable »');
if (!lines.some((l) => /^DirectoryIndex\s+index\.html/.test(l))) problems.push('« DirectoryIndex index.html » absent : l\'accueil (/) ne serait pas servi');
/** Le .htaccess sert-il index.html en 200 pour cette adresse ? (Apache compare le chemin sans la barre initiale) */
const served = (url) => rules.some((re) => re.test(url.replace(/^\//, '')));

// ---------- Adresses d'essai ----------
const example = (route) => route.replace(/:[A-Za-z]+/g, 'exemple-1');
const probes = new Set();
for (const route of routes) {
  if (route === '/') continue;
  const url = example(route);
  probes.add(url);
  probes.add(url + '/');
  probes.add(url + '/segment-inconnu');
}
for (const url of ['/page-inexistante', '/page/inexistante', '/qui-sommes-nous-bis', '/evenements/a/b', '/accompagnement/pays/a/b', '/index']) probes.add(url);

let checked = 0;
for (const url of probes) {
  checked++;
  const expected = reactMatches(url);
  const got = served(url);
  if (expected && !got) problems.push(`${url} : le routeur a une page, mais le .htaccess ne la sert pas (elle renverrait 404)`);
  if (!expected && got) problems.push(`${url} : le .htaccess la sert en 200, mais le routeur ne la connaît pas (une page inconnue doit rester en 404)`);
}

// ---------- Routes qui portent le nom d'un dossier de public/ ----------
const publicDirs = readdirSync(join(ROOT, 'public')).filter((f) => statSync(join(ROOT, 'public', f)).isDirectory());
for (const route of routes) {
  const first = route.split('/').filter(Boolean)[0];
  if (first && publicDirs.includes(first)) problems.push(`${route} : public/${first}/ est un dossier ; Apache le servirait à la place de la page`);
}

if (problems.length) {
  console.log(`ÉCHEC routes : ${problems.length} problème(s)\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log(`OK    routes : ${routes.length} routes du routeur, ${rules.length} règles du .htaccess, ${checked} adresses d'essai concordantes`);
