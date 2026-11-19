/**
 * Grille de la galerie « sans trou » (audit GAL-03, groupe 7.3) : chaque rangée est complète, à chaque largeur.
 *
 * Les cases ont toutes le même format (4:3, hauteur de rangée = largeur d'une colonne × 0,75 ; index.css,
 * .gallery-fill). Une vignette occupe 1 × 1 case, une mise en avant 2 × 2, une vignette élargie 2 × 1. Pour une
 * largeur donnée (2, 3 ou 4 colonnes), on part de la mise en page simple (mise en avant éventuelle en tête, le reste en
 * 1 × 1) et, si la dernière rangée n'est pas pleine, on cherche le plus petit changement qui la remplit, dans cet
 * ordre de préférence :
 *   1. une seconde mise en avant (2 × 2), de préférence du côté opposé à la première ;
 *   2. une vignette élargie (2 × 1) ;
 *   3. deux vignettes élargies.
 * Seules les photos peuvent grandir (les aperçus vidéo font 576 px de large : agrandis, ils seraient flous).
 * Chaque essai est vérifié par une simulation du placement « dense » de CSS Grid : aucun trou, dernière rangée pleine.
 */
import type { CSSProperties } from 'react';
import type { GalleryItem } from '../../data/gallery';

export interface Span {
  /** Colonnes occupées (1 ou 2) */
  w: 1 | 2;
  /** Rangées occupées (1 ou 2) */
  h: 1 | 2;
  /** Première colonne imposée (1 = à gauche), sinon placement automatique */
  col?: number;
}

/** Simulation du placement « dense » : renvoie le nombre de rangées, ou null s'il reste un trou. */
export function simulate(spans: Span[], cols: number): number | null {
  const grid: boolean[][] = [];
  const free = (r: number, c: number, s: Span) => {
    if (c + s.w > cols) return false;
    for (let y = r; y < r + s.h; y++) for (let x = c; x < c + s.w; x++) if (grid[y]?.[x]) return false;
    return true;
  };
  for (const s of spans) {
    if (s.w > cols) return null;
    let placed = false;
    for (let r = 0; !placed && r < 400; r++) {
      const starts = s.col ? [s.col - 1] : Array.from({ length: cols - s.w + 1 }, (_, i) => i);
      for (const c of starts) {
        if (!free(r, c, s)) continue;
        for (let y = r; y < r + s.h; y++) {
          grid[y] ??= Array(cols).fill(false);
          for (let x = c; x < c + s.w; x++) grid[y][x] = true;
        }
        placed = true;
        break;
      }
    }
    if (!placed) return null;
  }
  return grid.every((row) => row.every(Boolean)) ? grid.length : null;
}

/**
 * Mise en page sans trou pour `count` éléments sur `cols` colonnes. `featureFirst` : le premier élément est mis en
 * avant (2 × 2). `canGrow(i)` : l'élément i peut-il grandir (photo assez grande) ?
 */
export function packGallery(count: number, cols: number, featureFirst: boolean, canGrow: (i: number) => boolean): Span[] {
  const base: Span[] = Array.from({ length: count }, (_, i) => (featureFirst && i === 0 && cols >= 2 ? { w: 2, h: 2 } : { w: 1, h: 1 }));
  if (cols < 2 || simulate(base, cols) !== null) return base;
  const growable = Array.from({ length: count }, (_, i) => i)
    .filter((i) => base[i].w === 1 && canGrow(i))
    .reverse(); // de la fin vers le début : la mise en page du haut de l'album reste la même
  const tryWith = (changes: [number, Span][]) => {
    const spans = base.slice();
    for (const [i, s] of changes) spans[i] = s;
    return simulate(spans, cols) !== null ? spans : null;
  };
  // 1. Seconde mise en avant : à droite d'abord (la première est à gauche), puis placement libre
  for (const i of growable) {
    for (const col of [cols - 1, undefined]) {
      const found = tryWith([[i, { w: 2, h: 2, col }]]);
      if (found) return found;
    }
  }
  // 2. Une vignette élargie, puis 3. deux
  for (const i of growable) {
    const found = tryWith([[i, { w: 2, h: 1 }]]);
    if (found) return found;
  }
  for (const i of growable) {
    for (const j of growable) {
      if (j >= i) continue;
      const found = tryWith([
        [i, { w: 2, h: 1 }],
        [j, { w: 2, h: 1 }],
      ]);
      if (found) return found;
    }
  }
  return base;
}

/**
 * Colonnes de la grille selon le nombre d'éléments : petits albums sur 1, 2 ou 3 colonnes ; sinon 2, 3 puis 4.
 * Revue du groupe 7.3 : un album de 3 éléments passe sur une colonne sous 768 px (sur 3 colonnes, à 390 px, les
 * vignettes faisaient 109 × 82 px et la durée d'une vidéo chevauchait son bouton de lecture).
 */
export function galleryColumns(count: number): { base: number; md: number; lg: number } {
  if (count <= 3) {
    const n = Math.max(1, count);
    return { base: n === 3 ? 1 : n, md: n, lg: n };
  }
  return { base: 2, md: 3, lg: 4 };
}

const BREAKPOINTS = ['base', 'md', 'lg'] as const;
type Breakpoint = (typeof BREAKPOINTS)[number];
/** Largeur utile la plus grande de chaque palier (container de 72 rem, gouttière comprise) et écart entre les cases. */
const MAX_AVAILABLE: Record<Breakpoint, number> = { base: 767 - 2 * 30.7, md: 1023 - 2 * 41, lg: 1152 };
/** Écart le plus petit du palier (index.css : 0,75 rem sous 640 px, 1 rem au-delà) : la case calculée est un plafond. */
const GAP: Record<Breakpoint, number> = { base: 12, md: 16, lg: 16 };
/** Hauteur d'une case / largeur (cases 4:3, index.css, .gallery-fill). */
const CELL_RATIO = 0.75;

export interface FillLayout {
  /** Variables de la grille : colonnes et largeur maximale par palier (index.css, .gallery-fill) */
  style: CSSProperties;
  /** Variables de chaque vignette : colonnes, rangées et colonne de départ par palier */
  itemStyle: (i: number) => CSSProperties;
  /** Vignette agrandie à au moins un palier (image plus grande demandée) */
  isLarge: (i: number) => boolean;
}

/** Largeur de case la plus grande permise, par palier (px). */
export type CellCaps = Record<Breakpoint, number>;

/** Colonnes et mise en page sans trou d'un album, par palier. */
function albumSpans(items: GalleryItem[], featureFirst: boolean) {
  const columns = galleryColumns(items.length);
  const canGrow = (i: number) => items[i].kind === 'photo';
  const spans = Object.fromEntries(
    BREAKPOINTS.map((bp) => [bp, packGallery(items.length, columns[bp], featureFirst && items.length >= 6, canGrow)])
  ) as Record<Breakpoint, Span[]>;
  return { columns, spans };
}

/**
 * Case la plus large permise : la vignette (ou la mise en avant) la plus exigeante ne dépasse pas la moitié de sa
 * source (aperçu de la vidéo pour une vidéo). L'image couvre sa case (object-cover) : son échelle est la plus grande de
 * largeur affichée / largeur de la source et hauteur affichée / hauteur de la source. Revue du groupe 7.3 : la hauteur
 * compte aussi (sources en 5:3 ou plus larges dans des cases 4:3 : c'est elle qui limite).
 */
function cellCaps(items: GalleryItem[], spans: Record<Breakpoint, Span[]>): CellCaps {
  const caps = {} as CellCaps;
  for (const bp of BREAKPOINTS) {
    const gap = GAP[bp];
    let cell = Infinity;
    spans[bp].forEach((s, i) => {
      const byWidth = (items[i].w / 2 - gap * (s.w - 1)) / s.w;
      const byHeight = (items[i].h / 2 - gap * (s.h - 1)) / (CELL_RATIO * s.h);
      cell = Math.min(cell, byWidth, byHeight);
    });
    caps[bp] = cell;
  }
  return caps;
}

/**
 * Une seule taille de case pour toute la page (revue du groupe 7.3) : la plus petite des cases permises de chaque
 * album, par palier. Les colonnes des albums s'alignent, et un petit album n'est jamais plus large que le grand.
 */
export function sharedCellCaps(albums: GalleryItem[][], featureFirst: boolean): CellCaps {
  const all = albums.filter((items) => items.length > 0).map((items) => cellCaps(items, albumSpans(items, featureFirst).spans));
  return Object.fromEntries(BREAKPOINTS.map((bp) => [bp, Math.min(...all.map((c) => c[bp]))])) as CellCaps;
}

/**
 * Mise en page sans trou d'un album, par palier (2, 3, 4 colonnes), et largeur maximale par palier : aucune vignette
 * (ni mise en avant) n'est affichée à plus de la moitié de la taille de sa source (aperçu pour une vidéo), en densité 2
 * (contrat §5). `shared` : taille de case commune à toute la page (sharedCellCaps).
 */
export function fillLayout(items: GalleryItem[], featureFirst: boolean, shared?: CellCaps): FillLayout {
  const { columns, spans } = albumSpans(items, featureFirst);
  const own = cellCaps(items, spans);
  const maxWidth = (bp: Breakpoint) => {
    const c = columns[bp];
    const cell = Math.min(own[bp], shared?.[bp] ?? Infinity);
    const width = Math.floor(c * cell + (c - 1) * GAP[bp]);
    return width >= MAX_AVAILABLE[bp] ? 'none' : `${width}px`;
  };
  const style = {
    '--cols-base': columns.base,
    '--cols-md': columns.md,
    '--cols-lg': columns.lg,
    '--max-base': maxWidth('base'),
    '--max-md': maxWidth('md'),
    '--max-lg': maxWidth('lg'),
  } as CSSProperties;
  const itemStyle = (i: number) => {
    const vars: Record<string, string | number> = {};
    for (const bp of BREAKPOINTS) {
      const s = spans[bp][i];
      vars[`--w-${bp}`] = s.w;
      vars[`--h-${bp}`] = s.h;
      if (s.col) vars[`--c-${bp}`] = s.col;
    }
    return vars as CSSProperties;
  };
  const isLarge = (i: number) => BREAKPOINTS.some((bp) => spans[bp][i].w === 2);
  return { style, itemStyle, isLarge };
}
