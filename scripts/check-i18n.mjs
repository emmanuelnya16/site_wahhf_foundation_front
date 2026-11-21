#!/usr/bin/env node
/**
 * Contrôle des traductions (lot 7.10) : dans chaque dossier de src/locales qui contient fr.json, en.json et de.json
 * doivent exister avec exactement les mêmes clés, et aucune valeur ne doit être vide.
 * - Les clés qui commencent par « _ » (notes pour la relecture) sont ignorées.
 * - Le sous-arbre « contenu » (traductions de données, fusionnées sur le français des fichiers src/data) n'existe qu'en
 *   anglais et en allemand : il est comparé entre en.json et de.json seulement.
 * Échoue (code 1) à la première langue incomplète, en listant les clés manquantes.
 * Usage : node scripts/check-i18n.mjs   (aussi dans npm run check)
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const LOCALES = join(ROOT, 'src', 'locales');
const LANGS = ['fr', 'en', 'de'];

/** Toutes les feuilles d'un objet JSON : chemin → valeur */
function leaves(obj, prefix = '', out = new Map()) {
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => leaves(v, `${prefix}[${i}]`, out));
  } else if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith('_')) continue;
      leaves(v, prefix ? `${prefix}.${k}` : k, out);
    }
  } else {
    out.set(prefix, obj);
  }
  return out;
}

const dirs = [];
(function walk(dir) {
  if (existsSync(join(dir, 'fr.json')) || existsSync(join(dir, 'en.json'))) dirs.push(dir);
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
  }
})(LOCALES);

let problems = 0;
let total = 0;
for (const dir of dirs) {
  const rel = relative(ROOT, dir) || '.';
  const files = {};
  for (const lang of LANGS) {
    const file = join(dir, `${lang}.json`);
    if (!existsSync(file)) {
      console.log(`ÉCHEC ${rel} : ${lang}.json manquant`);
      problems++;
      continue;
    }
    files[lang] = leaves(JSON.parse(readFileSync(file, 'utf8')));
  }
  if (Object.keys(files).length < LANGS.length) continue;
  const isContent = (k) => k === 'contenu' || k.startsWith('contenu.');
  const pairs = [
    ['fr', 'en', (k) => !isContent(k)],
    ['fr', 'de', (k) => !isContent(k)],
    ['en', 'de', () => true],
  ];
  for (const [a, b, keep] of pairs) {
    const ka = [...files[a].keys()].filter(keep);
    const kb = new Set([...files[b].keys()].filter(keep));
    const missing = ka.filter((k) => !kb.has(k));
    if (missing.length) {
      problems += missing.length;
      console.log(`ÉCHEC ${rel} : ${missing.length} clé(s) de ${a}.json absente(s) de ${b}.json : ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? ' …' : ''}`);
    }
  }
  for (const lang of LANGS) {
    for (const [k, v] of files[lang]) {
      if (typeof v === 'string' && v.trim() === '') {
        problems++;
        console.log(`ÉCHEC ${rel}/${lang}.json : texte vide pour « ${k} »`);
      }
    }
  }
  total += files.de.size;
  console.log(`OK    ${rel} : ${files.fr.size} clés (fr), ${files.en.size} (en), ${files.de.size} (de)`);
}
console.log(problems ? `\n${problems} problème(s) de traduction` : `\nTraductions complètes : ${total} chaînes allemandes dans ${dirs.length} dossier(s)`);
process.exit(problems ? 1 : 0);
