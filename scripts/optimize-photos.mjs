// Photos de la fondation (lot 7.6) : import, optimisation et données du site, depuis docs/photos-catalogue.md.
//
//   npm run photos                         optimise les photos déjà copiées dans photos-src/
//   npm run photos -- --source <dossier>   copie d'abord les fichiers du catalogue depuis <dossier> (rien n'y est modifié)
//
// 1. Copie : chaque ligne du catalogue → photos-src/<album>/<slug>.jpg (originaux, hors du dépôt : .gitignore).
// 2. Optimisation (sharp) : rotation EXIF appliquée, métadonnées supprimées ; AVIF (qualité 50) et WebP (qualité 72) en
//    480, 800, 1200 et 1600 px de large, jamais au-delà de la largeur source (la largeur source s'ajoute quand elle
//    dépasse de plus de 10 % la plus grande taille retenue) ; un JPEG de 800 px au plus pour les navigateurs sans AVIF
//    ni WebP ; sortie dans public/photos/<album>/ ; une couleur dominante par photo (fond pendant le chargement).
// 3. Données : src/data/photos.ts (généré, à ne pas modifier à la main).
//
// Relançable : les noms de sortie sont fixes, un fichier à jour n'est pas recalculé, les fichiers qui ne correspondent
// plus au catalogue sont retirés de public/photos.
import { copyFile, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const CATALOGUE = path.join(ROOT, 'docs/photos-catalogue.md');
const SRC_DIR = path.join(ROOT, 'photos-src');
const OUT_DIR = path.join(ROOT, 'public/photos');
const DATA_FILE = path.join(ROOT, 'src/data/photos.ts');
const WIDTHS = [480, 800, 1200, 1600];
const JPEG_WIDTH = 800;
const QUALITY = { avif: 50, webp: 72, jpeg: 78 };

const args = process.argv.slice(2);
const sourceIndex = args.indexOf('--source');
const SOURCE = sourceIndex >= 0 ? args[sourceIndex + 1] : null;

// --- Lecture du catalogue ---------------------------------------------------------------------------------------
/** Sections « ## Titre  (`album`) », note en italique facultative, puis le tableau des photos. */
function parseCatalogue(md) {
  const albums = [];
  const photos = [];
  let album = null;
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    const heading = line.match(/^##\s+(.+?)\s+\(`([a-z0-9-]+)`\)\s*$/);
    if (heading) {
      album = { id: heading[2], title: heading[1].trim(), note: null };
      albums.push(album);
      continue;
    }
    if (album && /^_.+_$/.test(line) && !album.note) {
      album.note = line.slice(1, -1).trim();
      continue;
    }
    if (!album || !line.startsWith('|') || /^\|\s*(id|---)/.test(line)) continue;
    const cells = line.split('|').slice(1, -1).map((c) => c.trim().replace(/^`|`$/g, ''));
    if (cells.length !== 8) throw new Error(`Ligne du catalogue illisible (${cells.length} colonnes) : ${line}`);
    const [id, file, size, slug, alt, minors, focus] = cells;
    if (!/^[A-Z]\d{2}$/.test(id)) throw new Error(`Repère inattendu : ${id}`);
    if (!['oui', 'non', '?'].includes(minors)) throw new Error(`${id} : colonne « mineurs » inattendue (${minors})`);
    const [w, h] = size.split('x').map(Number);
    photos.push({ id, album: album.id, file, slug, alt, focus, catalogueSize: { w, h }, consent: minors === 'non' ? 'ok' : 'pending' });
  }
  const ids = new Set();
  const slugs = new Set();
  for (const p of photos) {
    if (ids.has(p.id)) throw new Error(`Repère en double : ${p.id}`);
    if (slugs.has(p.slug)) throw new Error(`Slug en double : ${p.slug}`);
    ids.add(p.id);
    slugs.add(p.slug);
  }
  return { albums, photos };
}

// --- Fichiers ---------------------------------------------------------------------------------------------------
const mtime = async (file) => (existsSync(file) ? (await stat(file)).mtimeMs : 0);

/** Largeurs de sortie : les tailles standard jusqu'à la largeur source, plus la largeur source si elle est nettement plus grande. */
function widthsFor(sourceWidth) {
  const widths = WIDTHS.filter((w) => w <= sourceWidth);
  const largest = widths.at(-1) ?? 0;
  if (sourceWidth < WIDTHS.at(-1) && (sourceWidth - largest) / sourceWidth > 0.1) widths.push(sourceWidth);
  return widths;
}

const hex = ({ r, g, b }) => `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;

async function processPhoto(photo) {
  const src = path.join(SRC_DIR, photo.album, `${photo.slug}.jpg`);
  if (!existsSync(src)) {
    if (!SOURCE) throw new Error(`${photo.id} : ${path.relative(ROOT, src)} manque ; relancer avec --source <dossier des originaux>`);
    const original = path.join(SOURCE, photo.file);
    if (!existsSync(original)) throw new Error(`${photo.id} : fichier source introuvable (${photo.file})`);
    await mkdir(path.dirname(src), { recursive: true });
    await copyFile(original, src);
    photo.copied = true;
  }
  // Dimensions une fois la rotation EXIF appliquée (orientations 5 à 8 : largeur et hauteur échangées)
  const meta = await sharp(src).metadata();
  const swap = (meta.orientation ?? 1) >= 5;
  const width = swap ? meta.height : meta.width;
  const height = swap ? meta.width : meta.height;
  if (width !== photo.catalogueSize.w || height !== photo.catalogueSize.h) {
    photo.warning = `taille ${width}x${height} (catalogue : ${photo.catalogueSize.w}x${photo.catalogueSize.h})`;
  }
  const { dominant } = await sharp(src).rotate().stats();
  const widths = widthsFor(width);
  const jpegWidth = Math.min(JPEG_WIDTH, width);
  const outDir = path.join(OUT_DIR, photo.album);
  await mkdir(outDir, { recursive: true });
  const srcTime = await mtime(src);
  const outputs = [];
  const jobs = [];
  for (const w of widths) {
    for (const format of ['avif', 'webp']) {
      const out = path.join(outDir, `${photo.slug}-${w}.${format}`);
      outputs.push(out);
      if ((await mtime(out)) >= srcTime) continue;
      const pipeline = sharp(src).rotate().resize({ width: w, withoutEnlargement: true });
      jobs.push((format === 'avif' ? pipeline.avif({ quality: QUALITY.avif, effort: 5 }) : pipeline.webp({ quality: QUALITY.webp, effort: 5 })).toFile(out));
    }
  }
  const jpeg = path.join(outDir, `${photo.slug}-${jpegWidth}.jpg`);
  outputs.push(jpeg);
  if ((await mtime(jpeg)) < srcTime) {
    jobs.push(sharp(src).rotate().resize({ width: jpegWidth, withoutEnlargement: true }).jpeg({ quality: QUALITY.jpeg, mozjpeg: true }).toFile(jpeg));
  }
  await Promise.all(jobs);
  photo.generated = jobs.length;
  return { ...photo, width, height, widths, jpegWidth, dominantColor: hex(dominant), outputs };
}

/** Retire de public/photos ce qui ne correspond plus au catalogue (dossier entièrement généré par ce script). */
async function removeOrphans(expected) {
  const removed = [];
  if (!existsSync(OUT_DIR)) return removed;
  for (const dir of await readdir(OUT_DIR, { withFileTypes: true })) {
    const full = path.join(OUT_DIR, dir.name);
    if (!dir.isDirectory()) {
      if (!expected.has(full)) { await rm(full); removed.push(full); }
      continue;
    }
    for (const file of await readdir(full)) {
      const f = path.join(full, file);
      if (!expected.has(f)) { await rm(f); removed.push(f); }
    }
    if ((await readdir(full)).length === 0) await rm(full, { recursive: true });
  }
  return removed;
}

// --- Données du site --------------------------------------------------------------------------------------------
const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function dataModule(albums, photos) {
  const albumIds = albums.map((a) => q(a.id)).join(' | ');
  return `// Généré par scripts/optimize-photos.mjs depuis docs/photos-catalogue.md (npm run photos). Ne pas modifier à la main :
// corriger le catalogue, puis relancer le script.
// Fichiers : public/photos/<album>/<slug>-<largeur>.avif | .webp, et un .jpg de ${JPEG_WIDTH} px au plus.

export type PhotoAlbumId = ${albumIds};

/** 'pending' : mineurs identifiables, ou à vérifier ; la photo n'est publiée qu'après l'accord écrit des parents (GAL-01). */
export type PhotoConsent = 'ok' | 'pending';

export interface PhotoAlbum {
  id: PhotoAlbumId;
  title: string;
  /** Ce qui reste à confirmer (lieu, date, nom de l'événement), ou null */
  note: string | null;
}

export interface PhotoSources {
  /** srcset AVIF puis WebP (largeurs réelles, jamais agrandies) */
  avif: string;
  webp: string;
  /** JPEG de repli, ${JPEG_WIDTH} px au plus */
  jpeg: string;
  /** Largeurs disponibles, de la plus petite à la plus grande */
  widths: number[];
}

export interface CatalogPhoto {
  /** Repère du catalogue (A27, B04…) */
  id: string;
  album: PhotoAlbumId;
  slug: string;
  alt: string;
  /** Dimensions réelles, rotation EXIF appliquée */
  width: number;
  height: number;
  /** object-position du catalogue */
  focus: string;
  /** Fond pendant le chargement */
  dominantColor: string;
  consent: PhotoConsent;
  sources: PhotoSources;
}

export const PHOTO_ALBUMS: PhotoAlbum[] = [
${albums.map((a) => `  { id: ${q(a.id)}, title: ${q(a.title)}, note: ${a.note ? q(a.note) : 'null'} },`).join('\n')}
];

function photo(
  id: string,
  album: PhotoAlbumId,
  slug: string,
  alt: string,
  width: number,
  height: number,
  focus: string,
  dominantColor: string,
  consent: PhotoConsent,
  widths: number[],
  jpegWidth: number,
): CatalogPhoto {
  const base = \`/photos/\${album}/\${slug}\`;
  const set = (format: string) => widths.map((w) => \`\${base}-\${w}.\${format} \${w}w\`).join(', ');
  return {
    id, album, slug, alt, width, height, focus, dominantColor, consent,
    sources: { avif: set('avif'), webp: set('webp'), jpeg: \`\${base}-\${jpegWidth}.jpg\`, widths },
  };
}

/** Les ${photos.length} photos du catalogue, dans son ordre. */
export const PHOTOS: CatalogPhoto[] = [
${photos.map((p) => `  photo(${q(p.id)}, ${q(p.album)}, ${q(p.slug)}, ${q(p.alt)}, ${p.width}, ${p.height}, ${q(p.focus)}, ${q(p.dominantColor)}, ${q(p.consent)}, [${p.widths.join(', ')}], ${p.jpegWidth}),`).join('\n')}
];
`;
}

// --- Programme --------------------------------------------------------------------------------------------------
const started = Date.now();
const { albums, photos } = parseCatalogue(await readFile(CATALOGUE, 'utf8'));
console.log(`Catalogue : ${photos.length} photos, ${albums.length} albums.`);
const results = [];
for (const photo of photos) results.push(await processPhoto(photo)); // une photo à la fois : sharp parallélise déjà
const expected = new Set(results.flatMap((r) => r.outputs));
const removed = await removeOrphans(expected);
const module = dataModule(albums, results);
const previous = existsSync(DATA_FILE) ? await readFile(DATA_FILE, 'utf8') : '';
if (previous !== module) await writeFile(DATA_FILE, module);

const copied = results.filter((r) => r.copied).length;
const generated = results.reduce((n, r) => n + r.generated, 0);
console.log(`Copiées : ${copied} ; fichiers créés ou mis à jour : ${generated} ; retirés : ${removed.length} ; src/data/photos.ts ${previous === module ? 'inchangé' : 'écrit'}.`);
for (const r of results.filter((r) => r.warning)) console.log(`  attention, ${r.id} : ${r.warning}`);
const pending = results.filter((r) => r.consent === 'pending');
console.log(`Consentement : ${results.length - pending.length} publiables, ${pending.length} en attente (${pending.map((r) => r.id).join(', ')}).`);
console.log(`Terminé en ${((Date.now() - started) / 1000).toFixed(1)} s.`);
