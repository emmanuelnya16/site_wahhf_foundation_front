/**
 * Le portique d'un hangar agricole (lot 13), dessiné pour la page : deux poteaux et une ferme, sous le vent (à gauche)
 * et le poids de la toiture. Chargé à part (React.lazy) : il ne retarde jamais le titre du hero.
 * Barres en forêt ; les plus sollicitées (poteau au vent, arbalétrier côté vent, entrait au milieu) en soleil, bordées
 * d'encre pour rester visibles sur fond clair. Aucune valeur chiffrée : « Exemple illustratif, valeurs fictives ».
 * Le mouvement (flexion lente, charges qui poussent, barres qui s'allument) est en CSS (simulation.css) : arrêté par le
 * bouton pause, l'onglet caché ou hors de l'écran ; en mouvement réduit, dessin figé en position chargée.
 */

/** Nœuds (viewBox 400 × 290) : appuis, têtes de poteaux, faîte, nœuds de la ferme */
const N = {
  pied1: [90, 250],
  pied2: [310, 250],
  tete1: [90, 150],
  tete2: [310, 150],
  faite: [200, 88],
  haut1: [145, 119],
  haut2: [255, 119],
  bas1: [145, 150],
  milieu: [200, 150],
  bas2: [255, 150],
} as const;
type Noeud = keyof typeof N;

const barre = (a: Noeud, b: Noeud) => `M${N[a][0]} ${N[a][1]}L${N[b][0]} ${N[b][1]}`;

/** Barres de la ferme (elles se tassent sous la toiture) */
const FERME: [Noeud, Noeud][] = [
  ['tete1', 'haut1'], ['haut1', 'faite'], ['faite', 'haut2'], ['haut2', 'tete2'],
  ['tete1', 'bas1'], ['bas1', 'milieu'], ['milieu', 'bas2'], ['bas2', 'tete2'],
  ['haut1', 'bas1'], ['faite', 'milieu'], ['haut2', 'bas2'], ['haut1', 'milieu'], ['haut2', 'milieu'],
];
/** Barres les plus sollicitées de la ferme */
const FERME_CHAUDE: [Noeud, Noeud][] = [['tete1', 'haut1'], ['bas1', 'milieu'], ['milieu', 'bas2']];

/** Flèches de la toiture (abscisses) et du vent (ordonnées) */
const TOITURE = [118, 172, 228, 282];
const VENT = [170, 200, 230];
/** Hauteur de l'arbalétrier à l'abscisse x (pour arrêter la flèche juste au-dessus) */
const surFerme = (x: number) => (x <= 200 ? 150 - ((x - 90) * 62) / 110 : 150 - ((310 - x) * 62) / 110);

/** Une barre très sollicitée : un bord d'encre, un cœur soleil (le soleil seul ne se voit pas assez sur fond clair) */
function Chaude({ d }: { d: string }) {
  return (
    <g className="sim-p-chaud">
      <path className="sim-p-chaud-bord" d={d} />
      <path className="sim-p-chaud-coeur" d={d} />
    </g>
  );
}

export default function Portique({ alt, vent, toiture }: { alt: string; vent: string; toiture: string }) {
  return (
    <svg className="sim-portique" viewBox="0 0 400 290" role="img" aria-label={alt} focusable="false">
      {/* Sol et appuis */}
      <path className="sim-p-sol" d="M30 250H370" />
      <path className="sim-p-appui" d="M90 250l-11 16h22zM310 250l-11 16h22z" />

      {/* Charges : la toiture (vers le bas), le vent (vers la droite) */}
      <g className="sim-p-charge sim-p-charge-toiture">
        {TOITURE.map((x) => (
          <path key={x} d={`M${x} 46V${surFerme(x) - 13}m-5-7 5 7 5-7`} />
        ))}
        <text x="118" y="34">{toiture}</text>
      </g>
      <g className="sim-p-charge sim-p-charge-vent">
        {VENT.map((y) => (
          <path key={y} d={`M22 ${y}H74m-7-5 7 5-7 5`} />
        ))}
        <text x="22" y="156">{vent}</text>
      </g>

      {/* Le cadre fléchit sous le vent (autour de sa base) ; la ferme se tasse sous la toiture (autour de l'entrait) */}
      <g className="sim-p-cadre">
        <path className="sim-p-barre" d={`${barre('pied1', 'tete1')}${barre('pied2', 'tete2')}`} />
        <Chaude d={barre('pied1', 'tete1')} />
        <g className="sim-p-ferme">
          <path className="sim-p-barre" d={FERME.map(([a, b]) => barre(a, b)).join('')} />
          <Chaude d={FERME_CHAUDE.map(([a, b]) => barre(a, b)).join('')} />
          {(Object.keys(N) as Noeud[])
            .filter((n) => !n.startsWith('pied'))
            .map((n) => (
              <circle key={n} className="sim-p-noeud" cx={N[n][0]} cy={N[n][1]} r="4.5" />
            ))}
        </g>
      </g>
    </svg>
  );
}
