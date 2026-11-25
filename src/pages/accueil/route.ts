/**
 * La route du projet phare (lot 11.4) : tracée d'après la taille réelle de la scène, jamais en dur. Partagée par la
 * section (état fixe, mouvement réduit) et par ProjetMotion (le véhicule, les panneaux).
 * - Ordinateur : elle serpente de gauche à droite ; les panneaux se plantent dessus à intervalles réguliers.
 * - En dessous de 1 024 px : elle descend à gauche ; chaque panneau est à côté, à sa place dans la liste.
 */
export interface GeometrieRoute {
  horizontale: boolean;
  /** Longueur de la route (px) */
  longueur: number;
  /** Début et fin du trajet du véhicule, en part de la route (0 à 1) */
  depart: number;
  arrivee: number;
  /** Part de la route où passe chaque jalon (0 à 1) */
  jalons: number[];
}

/** Début et fin du trajet du véhicule, en part de la route : il reste entier à l'écran (la route en déborde) */
const TRAJET = { horizontal: [0.11, 0.89], vertical: [0.05, 0.955] } as const;
/** Premier et dernier panneaux, en part de la route (ordinateur) */
const PREMIER = 0.17;
const DERNIER = 0.83;

const r = (n: number) => Math.round(n * 10) / 10;

function traceHorizontal(w: number, h: number) {
  const x = (f: number) => r(w * f);
  const y = (f: number) => r(h * f);
  return `M-60 ${y(0.9)} C${x(0.06)} ${y(0.9)} ${x(0.11)} ${y(0.75)} ${x(0.24)} ${y(0.77)} S${x(0.4)} ${y(0.91)} ${x(0.52)} ${y(0.88)} S${x(0.68)} ${y(0.73)} ${x(0.79)} ${y(0.76)} S${x(0.95)} ${y(0.88)} ${r(w + 60)} ${y(0.84)}`;
}

function traceVertical(w: number, h: number) {
  const pas = 170;
  const tours = Math.max(1, Math.round(h / pas));
  const dy = (h + 40) / tours;
  const cote = (k: number) => r(w / 2 + (k % 2 ? 11 : -11));
  let d = `M${r(w / 2)} -20`;
  for (let k = 0; k < tours; k++) {
    const y0 = -20 + dy * k;
    d += ` C${cote(k)} ${r(y0 + dy * 0.3)} ${cote(k)} ${r(y0 + dy * 0.7)} ${r(w / 2)} ${r(y0 + dy)}`;
  }
  return d;
}

/** Dessine la route, place les panneaux et pose le véhicule au bout (position de repos). */
export function tracerRoute(scene: HTMLElement): GeometrieRoute | null {
  const svg = scene.querySelector<SVGSVGElement>('.ac-route-svg');
  const bande = svg?.querySelector<SVGPathElement>('.ac-route-bande');
  const ligne = svg?.querySelector<SVGPathElement>('.ac-route-ligne');
  const vehicule = scene.querySelector<HTMLElement>('.ac-vehicule');
  const items = Array.from(scene.querySelectorAll<HTMLElement>('.ac-jalon'));
  if (!svg || !bande || !ligne || !vehicule || !items.length) return null;
  const horizontale = window.matchMedia('(min-width: 1024px)').matches;
  // clientWidth / clientHeight : 0 pour un SVG dans certains navigateurs, sa boîte sert de mesure
  const box = svg.getBoundingClientRect();
  const w = box.width;
  const h = box.height;
  if (!w || !h) return null;
  svg.setAttribute('viewBox', `0 0 ${r(w)} ${r(h)}`);
  const d = horizontale ? traceHorizontal(w, h) : traceVertical(w, h);
  bande.setAttribute('d', d);
  ligne.setAttribute('d', d);
  const longueur = bande.getTotalLength();

  const haut = scene.getBoundingClientRect().top;
  const jalons = items.map((item, i) => {
    if (!horizontale) {
      const b = item.getBoundingClientRect();
      return Math.min(0.97, Math.max(0.03, (b.top - haut + b.height / 2) / h));
    }
    const t = items.length > 1 ? PREMIER + ((DERNIER - PREMIER) * i) / (items.length - 1) : 0.5;
    const p = bande.getPointAtLength(longueur * t);
    item.style.setProperty('--x', `${r(p.x)}px`);
    item.style.setProperty('--y', `${r(p.y)}px`);
    return t;
  });

  // Véhicule au repos : au bout de la route (mouvement réduit, ou mouvement pas encore là)
  const [depart, arrivee] = horizontale ? TRAJET.horizontal : TRAJET.vertical;
  const fin = bande.getPointAtLength(longueur * arrivee);
  const avant = bande.getPointAtLength(longueur * (arrivee - 0.01));
  const angle = horizontale ? (Math.atan2(fin.y - avant.y, fin.x - avant.x) * 180) / Math.PI : 0;
  vehicule.style.setProperty('--fin', `translate(${r(fin.x)}px, ${r(fin.y)}px) translate(-50%, -100%) rotate(${r(angle)}deg)`);
  return { horizontale, longueur, depart, arrivee, jalons };
}
