#!/usr/bin/env node
/**
 * Lot 7.10 : génère docs/traductions-de-a-relire.md, chaque texte allemand face à son français, pour la relecture par
 * la fondation. Un astérisque marque les textes dont le traducteur n'était pas sûr (listes « _relire » des de.json).
 * - Textes fixes : fr.json et de.json de chaque dossier de src/locales.
 * - Données (« contenu ») : le français vient des fichiers de données (src/data, src/services/api.ts, src/config…),
 *   chargés par Vite ; l'élément est retrouvé par son identifiant (id, slug, clé).
 * Usage : npm run i18n:relire
 */
import { readdirSync, readFileSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { createServer } from 'vite';

const ROOT = resolve(import.meta.dirname, '..');
const LOCALES = join(ROOT, 'src', 'locales');

/** Feuilles d'un objet JSON : chemin → texte (les clés « _… » sont des notes) */
function leaves(obj, prefix = '', out = new Map()) {
  if (Array.isArray(obj)) obj.forEach((v, i) => leaves(v, `${prefix}[${i}]`, out));
  else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) if (!k.startsWith('_')) leaves(v, prefix ? `${prefix}.${k}` : k, out);
  } else if (typeof obj === 'string') out.set(prefix, obj);
  return out;
}
const segments = (path) => path.match(/[^.[\]]+/g) ?? [];
const get = (obj, segs) => segs.reduce((o, s) => (o == null ? undefined : o[/^\d+$/.test(s) ? Number(s) : s]), obj);

// ---------- Données françaises, chargées par Vite (import.meta.glob, alias, JSON…) ----------
const vite = await createServer({ root: ROOT, logLevel: 'silent', server: { middlewareMode: true, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
const DATA_MODULES = [
  'src/services/api.ts', 'src/data/countries.ts', 'src/data/arnaques.ts', 'src/data/events.ts', 'src/data/gallery.ts',
  'src/data/journey.ts', 'src/data/photos.ts', 'src/data/regions.ts', 'src/data/team.ts', 'src/data/teamPortraits.ts',
  'src/config/contact.ts', 'src/pages/accompagnement/steps.ts',
];
const pool = []; // { name, value } : chaque export des modules de données
for (const m of DATA_MODULES) {
  if (!existsSync(join(ROOT, m))) continue;
  try {
    const mod = await vite.ssrLoadModule('/' + m);
    for (const [name, value] of Object.entries(mod)) if (value && typeof value === 'object') pool.push({ name, value });
  } catch (e) {
    console.warn(`(données non chargées : ${m} — ${e.message.split('\n')[0]})`);
  }
}
await vite.close();

const idOf = (o) => [o.id, o.slug, o.code, typeof o.neName === 'string' ? o.neName.replace(/\W/g, '') : undefined].filter((x) => x != null).map(String);
/** Le français d'une feuille de surcouche « contenu.<groupe>.<id>.<champ…> » (ou « contenu.<id>.<champ…> »). */
function frenchOf(path) {
  const segs = segments(path).slice(1); // sans « contenu »
  for (let cut = 0; cut < Math.min(3, segs.length); cut++) {
    const id = segs[cut];
    const rest = segs.slice(cut + 1);
    for (const { value } of pool) {
      const items = Array.isArray(value) ? value : Object.entries(value).map(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? { __key: k, ...v } : null)).filter(Boolean);
      for (const it of items) {
        if (!it || typeof it !== 'object') continue;
        if (!(idOf(it).includes(id) || it.__key === id)) continue;
        const v = get(it, rest);
        if (typeof v === 'string') return v;
      }
      // objet simple (ex. JOURNEY_SECTION, CONTACT) : le chemin entier à partir d'ici
    }
  }
  // Objets sans identifiant : chercher le chemin restant dans chaque export (ex. contenu.contact.place, contenu.parcours.section.title)
  for (let cut = 1; cut < segs.length; cut++) {
    for (const { value } of pool) {
      const v = get(value, segs.slice(cut));
      if (typeof v === 'string') return v;
    }
  }
  return null;
}

// ---------- Les dossiers de langue ----------
const dirs = [];
(function walk(dir) {
  if (existsSync(join(dir, 'de.json'))) dirs.push(dir);
  for (const name of readdirSync(dir)) if (statSync(join(dir, name)).isDirectory()) walk(join(dir, name));
})(LOCALES);

const esc = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, '<br>').replace(/</g, '&lt;').replace(/&lt;br>/g, '<br>');
let total = 0, marked = 0, unresolved = 0;
const sections = [];
for (const dir of dirs) {
  const rel = relative(ROOT, dir).replace(/\\/g, '/');
  const fr = JSON.parse(readFileSync(join(dir, 'fr.json'), 'utf8'));
  const deRaw = JSON.parse(readFileSync(join(dir, 'de.json'), 'utf8'));
  const de = leaves(deRaw);
  const frLeaves = leaves(fr);
  // Clés « à relire » : chemins exacts, ou préfixés par l'espace de noms, ou cités dans une note
  const notes = (deRaw._relire ?? []).map(String);
  const relire = new Map();
  for (const note of notes) {
    const tokens = note.match(/[\w-]+(?:\.[\w-]+|\[\d+\])+/g) ?? [];
    const reason = note.includes(' ') ? note.replace(/^[^:]*:\s*/, '') : '';
    for (const tok of tokens) {
      const candidates = [tok, tok.split('.').slice(1).join('.')];
      for (const c of candidates) for (const k of de.keys()) if (k === c || k.startsWith(c + '.') || k.startsWith(c + '[')) relire.set(k, reason);
    }
  }
  const rows = [];
  for (const [k, v] of de) {
    let f = frLeaves.get(k);
    if (f === undefined && k.startsWith('contenu.')) f = frenchOf(k);
    if (f == null) unresolved++;
    const star = relire.has(k);
    if (star) marked++;
    total++;
    rows.push(`| ${star ? '\\*' : ''} | \`${k}\` | ${f == null ? '_(français dans le fichier de données)_' : esc(f)} | ${esc(v)}${star && relire.get(k) ? ` <br>_Note : ${esc(relire.get(k))}_` : ''} |`);
  }
  sections.push(`## ${rel === 'src/locales' ? 'Textes communs (en-tête, pied de page, accueil, composants)' : rel.replace('src/locales/', '')}\n\nFichier : \`${rel}/de.json\` (${de.size} textes, dont ${[...de.keys()].filter((k) => relire.has(k)).length} à relire).\n\n| | Clé | Français | Allemand |\n|---|---|---|---|\n${rows.join('\n')}\n`);
}

const head = `# Traductions allemandes à relire

Généré par \`npm run i18n:relire\` (scripts/traductions-a-relire.mjs) le ${new Date().toISOString().slice(0, 10)}. Ne pas modifier à la main : corriger les fichiers de langue, puis relancer.

Chaque texte allemand du site, face à son français. **Un astérisque (\\*) marque les ${marked} textes dont le traducteur n'était pas sûr** (sens du français ambigu, terme juridique, nom d'institution, ton) : à relire en priorité. ${total} textes allemands au total.

- Ton choisi : vouvoiement (« Sie »), simple et chaleureux, pas du mot à mot.
- Ne sont pas traduits : les noms propres et officiels (WAHHF Foundation, IROKO, Albatros Hotel, Ausbildung, Studienkolleg…), les adresses, les liens.
- Les pages légales (mentions légales, confidentialité, transparence) ne sont pas traduites : en allemand, elles affichent le français avec la mention « Diese Seite ist derzeit nur auf Französisch verfügbar. » (question 179 de docs/contenus-a-fournir.md).
- {{nom}} : une valeur insérée par le site (nom, date, nombre). <b>…</b>, <lien>…</lien> : mise en forme, à garder.
- Où corriger : la colonne « Clé » donne le chemin du texte dans le fichier de langue indiqué en tête de chaque partie.

`;
writeFileSync(join(ROOT, 'docs', 'traductions-de-a-relire.md'), head + sections.join('\n'));
console.log(`docs/traductions-de-a-relire.md : ${total} textes, ${marked} à relire, ${unresolved} sans français retrouvé`);
process.exit(0);
