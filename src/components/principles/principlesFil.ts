/**
 * Le fil des cinq principes (lot 7.8) : tracé calculé à partir des cartes réelles, jamais en dur.
 * Partagé par la section (colonne : téléphone, tablette, mouvement réduit, avant l'arrivée de GSAP) et par
 * src/effects/motion/PrinciplesMotion.tsx (ligne : le parcours épinglé de l'ordinateur).
 *
 * - Colonne : le fil descend ; il entre dans chaque carte par l'encoche du haut (à 70 px du bord, à gauche ou à
 *   droite selon la carte), passe derrière elle, puis ondule dans l'espace qui la sépare de la suivante.
 * - Ligne : il part du bord gauche de la scène, entre dans chaque carte par l'encoche du bord gauche (70 px du haut),
 *   passe derrière elle et ondule jusqu'à la suivante, plus haute ou plus basse.
 * Positions lues avec offsetLeft / offsetTop (sans les transformations : caméra, apparitions).
 */

export type FilMode = 'column' | 'row';

export interface FilGeometry {
  /** Longueur totale du tracé (px, repère de la piste) */
  length: number;
  /** Longueur du tracé jusqu'à l'encoche de chaque carte (5 principes, puis la carte finale) */
  notchLengths: number[];
  /** Largeur et hauteur de la piste */
  width: number;
  height: number;
}

const NOTCH_OFFSET = 70;
const SVG_NS = 'http://www.w3.org/2000/svg';
const r = (n: number) => Math.round(n * 10) / 10;

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
  end: boolean;
}

/** Cadre de chaque carte dans le repère de la piste (élément positionné : la piste, puis l'élément de liste). */
function cardBoxes(track: HTMLElement): Box[] {
  return Array.from(track.querySelectorAll<HTMLElement>('.principles-item')).map((item) => {
    const card = item.querySelector<HTMLElement>('.principle-card')!;
    return {
      x: item.offsetLeft + card.offsetLeft,
      y: item.offsetTop + card.offsetTop,
      w: card.offsetWidth,
      h: card.offsetHeight,
      end: item.dataset.side === 'end',
    };
  });
}

/** Les segments du tracé ; le premier mène à la première encoche, chacun des suivants à l'encoche suivante. */
function segments(boxes: Box[], mode: FilMode): { notch: [number, number]; d: string }[] {
  const out: { notch: [number, number]; d: string }[] = [];
  boxes.forEach((b, i) => {
    if (mode === 'row') {
      const notch: [number, number] = [b.x, b.y + NOTCH_OFFSET];
      if (i === 0) {
        out.push({ notch, d: `M 0 ${r(notch[1])} L ${r(notch[0])} ${r(notch[1])}` });
        return;
      }
      const prev = boxes[i - 1];
      const exitX = prev.x + prev.w;
      const exitY = prev.y + NOTCH_OFFSET;
      const mid = (notch[0] - exitX) / 2;
      out.push({
        notch,
        d: `L ${r(exitX)} ${r(exitY)} C ${r(exitX + mid)} ${r(exitY)} ${r(notch[0] - mid)} ${r(notch[1])} ${r(notch[0])} ${r(notch[1])}`,
      });
      return;
    }
    const notch: [number, number] = [b.end ? b.x + b.w - NOTCH_OFFSET : b.x + NOTCH_OFFSET, b.y];
    if (i === 0) {
      // Le fil arrive d'au-dessus de la première carte (le SVG laisse voir ce qui dépasse)
      out.push({ notch, d: `M ${r(notch[0])} ${r(notch[1] - 40)} L ${r(notch[0])} ${r(notch[1])}` });
      return;
    }
    const prev = out[i - 1].notch;
    const prevBox = boxes[i - 1];
    const exitY = prevBox.y + prevBox.h;
    const mid = (notch[1] - exitY) / 2;
    out.push({
      notch,
      d: `L ${r(prev[0])} ${r(exitY)} C ${r(prev[0])} ${r(exitY + mid)} ${r(notch[0])} ${r(notch[1] - mid)} ${r(notch[0])} ${r(notch[1])}`,
    });
  });
  return out;
}

/**
 * Dessine le fil de la piste (chemin et nœuds) pour la mise en page en cours et renvoie ses longueurs.
 * Le SVG (.principles-fil) couvre la piste ; ses nœuds sont des cercles au fond de la section, cerclés du fil.
 */
export function drawFil(track: HTMLElement, mode: FilMode): FilGeometry | null {
  const svg = track.querySelector<SVGSVGElement>('.principles-fil');
  const path = svg?.querySelector<SVGPathElement>('.principles-fil-path');
  const nodes = svg?.querySelector<SVGGElement>('.principles-nodes');
  if (!svg || !path || !nodes) return null;
  const boxes = cardBoxes(track);
  if (!boxes.length) return null;
  // Taille de la piste elle-même (offset*, et non scroll* : le SVG précédent, positionné dedans, compterait)
  const width = track.offsetWidth;
  const height = track.offsetHeight;
  svg.setAttribute('width', String(width));
  svg.setAttribute('height', String(height));
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

  const segs = segments(boxes, mode);
  // Longueur jusqu'à chaque encoche : le chemin prend chaque préfixe, le temps d'une mesure (aucun affichage entre deux)
  const notchLengths: number[] = [];
  let d = '';
  for (const seg of segs) {
    d = d ? `${d} ${seg.d}` : seg.d;
    path.setAttribute('d', d);
    notchLengths.push(path.getTotalLength());
  }
  const length = notchLengths[notchLengths.length - 1] ?? 0;

  nodes.replaceChildren(
    ...segs.map((seg) => {
      const c = document.createElementNS(SVG_NS, 'circle');
      c.setAttribute('cx', String(r(seg.notch[0])));
      c.setAttribute('cy', String(r(seg.notch[1])));
      c.setAttribute('r', '6');
      c.setAttribute('class', 'principles-node');
      return c;
    }),
  );
  return { length, notchLengths, width, height };
}
