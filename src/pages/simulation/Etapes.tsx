import { useSimulation } from './donnees';
import { BadgeAConfirmer, Tete } from './ui';

/**
 * 6. Comment ça marche (nuit) : 5 étapes reliées par le fil. Le fil se dessine au défilement et chaque point s'allume en
 * soleil quand il l'atteint (SimulationMotion) ; sans mouvement, le fil est entier et tous les points sont allumés.
 */
export default function Etapes() {
  const { etapes } = useSimulation();
  return (
    <section id="comment" className="sim-section sim-fond-nuit" aria-labelledby="sim-etapes">
      <div className="container-page">
        <Tete id="sim-etapes" cle="etapes" />
        <div className="sim-etapes">
          <div className="sim-fil" aria-hidden="true">
            <span className="sim-fil-trace" />
          </div>
          <ol className="sim-etapes-liste">
            {etapes.map((etape, i) => (
              <li key={etape.id} className="sim-etape">
                <span className="sim-point" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="sim-h3">
                  {etape.titre} <BadgeAConfirmer item={etape} />
                </h3>
                <p className="sim-texte">{etape.texte}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
