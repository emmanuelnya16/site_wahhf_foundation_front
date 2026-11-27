#!/usr/bin/env node
/**
 * Extrait muet du film WAHHF pour la section « Le film » de /accueil (lot 11.9).
 *
 *   node scripts/encode-film.mjs                       film entier, ou 30 s si le poids ne le permet pas
 *   node scripts/encode-film.mjs --debut=12            l'extrait de 30 s commence à 12 s (« les 30 meilleures secondes »)
 *   node scripts/encode-film.mjs --affiches-seulement  seulement les affiches AVIF
 *
 * - Source : docs/references/video/film-wahhf.mp4 (ou --source=…). Il faut ffmpeg et ffprobe dans le PATH.
 * - Piste son retirée : la lecture au défilement est muette ; le son passe toujours par YouTube, après un clic.
 * - Deux tailles, deux formats : 1 280 px (ordinateur, 6 Mo au plus) et 720 px (téléphone, 3 Mo au plus), en MP4
 *   H.264 (moov au début : faststart) et en WebM VP9, encodés en deux passes au débit qui tient dans le poids visé.
 * - Le film entier jusqu'au générique (--fin, 64 s par défaut, comme le hero de /) si ce débit reste assez haut pour
 *   une image nette (900 kbit/s en 1 280, 450 en 720) ; sinon 30 s à partir de --debut (4 s par défaut).
 * - Affiches AVIF tirées des affiches WebP du hero de / (public/hero/hero-film-t49-*.webp), qui ne changent pas.
 * - Écrit src/pages/accueil/filmExtrait.ts (les fichiers, la durée) : la section le lit. Sans source, il l'écrit vide
 *   (la section montre alors l'affiche et le bouton « Regarder le film »).
 * Options : --source, --sortie (dossier, public/film par défaut), --donnees=non (n'écrit pas filmExtrait.ts), --debut,
 * --fin, --affiches-seulement.
 */
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, rm, stat, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = Object.fromEntries(process.argv.slice(2).map((a) => a.replace(/^--/, '').split('=')).map(([k, v]) => [k, v ?? 'oui']));
const SOURCE = path.resolve(ROOT, args.source ?? 'docs/references/video/film-wahhf.mp4');
const SORTIE = path.resolve(ROOT, args.sortie ?? 'public/film');
const DONNEES = path.join(ROOT, 'src/pages/accueil/filmExtrait.ts');
const ECRIRE_DONNEES = args.donnees !== 'non';
const FIN = Number(args.fin ?? 64);
const DEBUT_EXTRAIT = Number(args.debut ?? 4);
const EXTRAIT_S = 30;
const NUL = process.platform === 'win32' ? 'NUL' : '/dev/null';

/** Largeur, poids visé (octets), débit minimal pour une image nette et débit maximal utile (kbit/s) : un extrait court
 *  ne remplit pas tout le poids permis */
const TAILLES = [
  { nom: '1280', largeur: 1280, poids: 6e6, plancher: 900, plafond: 2200 },
  { nom: '720', largeur: 720, poids: 3e6, plancher: 450, plafond: 1000 },
];
/** Affiches WebP du hero de / (inchangées) et leurs copies AVIF, pour la section */
const AFFICHES = ['hero-film-t49-960', 'hero-film-t49-1280', 'hero-film-t49-1920', 'hero-film-t49-portrait-456', 'hero-film-t49-portrait-608'];

function lancer(cmd, liste) {
  const r = spawnSync(cmd, liste, { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`${cmd} ${liste.join(' ')}\n${(r.stderr || '').slice(-1500)}`);
  return r.stdout;
}
const duree = (fichier) => Number(lancer('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', fichier]).trim());
const mo = (octets) => `${(octets / 1e6).toFixed(2)} Mo`;

async function affiches() {
  await mkdir(SORTIE, { recursive: true });
  for (const nom of AFFICHES) {
    const src = path.join(ROOT, 'public/hero', `${nom}.webp`);
    const dst = path.join(SORTIE, `${nom.replace('hero-film-t49', 'affiche-film')}.avif`);
    await sharp(src).avif({ quality: 55, effort: 6 }).toFile(dst);
    console.log(`affiche  ${path.relative(ROOT, dst)}  ${mo((await stat(dst)).size)}`);
  }
}

/** Deux passes au débit donné ; renvoie la taille du fichier */
async function encoder({ format, largeur, kbps, debut, longueur, dst }) {
  const passlog = path.join(os.tmpdir(), `film-wahhf-${format}-${largeur}`);
  const commun = ['-y', '-ss', String(debut), '-t', String(longueur), '-i', SOURCE, '-an', '-vf', `scale=${largeur}:-2:flags=lanczos`, '-b:v', `${kbps}k`];
  const codec =
    format === 'mp4'
      ? ['-c:v', 'libx264', '-preset', 'slow', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-maxrate', `${Math.round(kbps * 1.5)}k`, '-bufsize', `${kbps * 2}k`]
      : ['-c:v', 'libvpx-vp9', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p'];
  lancer('ffmpeg', [...commun, ...codec, '-pass', '1', '-passlogfile', passlog, '-f', format === 'mp4' ? 'mp4' : 'webm', NUL]);
  lancer('ffmpeg', [...commun, ...codec, '-pass', '2', '-passlogfile', passlog, ...(format === 'mp4' ? ['-movflags', '+faststart'] : []), dst]);
  return (await stat(dst)).size;
}

async function donnees(extrait) {
  if (!ECRIRE_DONNEES) return;
  const corps = extrait
    ? `{
  bureau: { mp4: '/film/film-wahhf-1280.mp4', webm: '/film/film-wahhf-1280.webm' },
  telephone: { mp4: '/film/film-wahhf-720.mp4', webm: '/film/film-wahhf-720.webm' },
  debut: ${extrait.debut},
  duree: ${extrait.duree},
}`
    : 'null';
  await writeFile(
    DONNEES,
    `/**
 * Extrait muet du film, hébergé sur le site (lot 11.9). Généré par scripts/encode-film.mjs : ne pas modifier à la main.
 * null : pas encore de fichier source (docs/references/video/film-wahhf.mp4) ; la section montre l'affiche et le bouton
 * « Regarder le film » (YouTube, après un clic).
 */
export interface FilmExtrait {
  bureau: { mp4: string; webm?: string };
  telephone: { mp4: string; webm?: string };
  /** Début de l'extrait dans le film et sa durée, en secondes */
  debut: number;
  duree: number;
}

export const FILM_EXTRAIT: FilmExtrait | null = ${corps};
`
  );
  console.log(`données  ${path.relative(ROOT, DONNEES)}`);
}

await affiches();
if (args['affiches-seulement']) process.exit(0);
if (!existsSync(SOURCE)) {
  console.log(`Pas de source (${path.relative(ROOT, SOURCE)}) : la section garde l'affiche et le bouton « Regarder le film ».`);
  await donnees(null);
  process.exit(0);
}

const total = duree(SOURCE);
const entier = Math.min(total, FIN);
// Le film entier si le débit qui tient dans le poids reste au-dessus du plancher, dans les deux tailles
const debitPour = (t, s) => Math.floor(((t.poids * 0.93 * 8) / s) / 1000);
const filmEntier = TAILLES.every((t) => debitPour(t, entier) >= t.plancher);
const debut = filmEntier ? 0 : Math.min(DEBUT_EXTRAIT, Math.max(0, total - EXTRAIT_S));
const longueur = filmEntier ? entier : Math.min(EXTRAIT_S, total - debut);
console.log(`source   ${path.relative(ROOT, SOURCE)} : ${total.toFixed(1)} s ; extrait : ${filmEntier ? 'film entier' : '30 s'} de ${debut} s à ${(debut + longueur).toFixed(1)} s`);

await mkdir(SORTIE, { recursive: true });
for (const t of TAILLES) {
  for (const format of ['mp4', 'webm']) {
    const dst = path.join(SORTIE, `film-wahhf-${t.nom}.${format}`);
    let kbps = Math.min(t.plafond, debitPour(t, longueur));
    let taille = await encoder({ format, largeur: t.largeur, kbps, debut, longueur, dst });
    // Une seconde tentative, un peu plus basse, si le fichier dépasse le poids visé
    if (taille > t.poids) {
      kbps = Math.floor(kbps * 0.88);
      taille = await encoder({ format, largeur: t.largeur, kbps, debut, longueur, dst });
    }
    console.log(`vidéo    ${path.relative(ROOT, dst)}  ${mo(taille)}  (${kbps} kbit/s)${taille > t.poids ? '  AU-DESSUS DU POIDS VISÉ' : ''}`);
  }
}
// Journaux des deux passes
for (const t of TAILLES) for (const format of ['mp4', 'webm']) for (const fin of ['-0.log', '-0.log.mbtree']) await rm(path.join(os.tmpdir(), `film-wahhf-${format}-${t.largeur}${fin}`), { force: true });
await donnees({ debut, duree: Math.round(longueur) });
