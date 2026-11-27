import { lazy, Suspense, useRef, type ComponentType, type CSSProperties, type RefObject } from 'react';
import { prefersReducedMotion } from '../../lib/reducedMotion';
import { useSimulation } from './donnees';
import { BadgeAConfirmer, Tete } from './ui';
import Entree from '../accueil/Entree';
import { useApproche } from '../accueil/useApproche';

type MotionProps = { scope: RefObject<HTMLElement | null>; paused: boolean };
/** Sans le fichier du mouvement (réseau coupé) : le fil reste entier, les points allumés */
const SansMouvement: ComponentType<MotionProps> = () => null;
const EtapesMotion = lazy<ComponentType<MotionProps>>(() => import('./EtapesMotion').catch(() => ({ default: SansMouvement })));

/**
 * 6. Comment ça marche (nuit) : 5 étapes reliées par le fil. Le fil se dessine au défilement et chaque point s'allume en
 * soleil quand il l'atteint (EtapesMotion, chargé à l'approche de la section) ; sans mouvement ou au bouton pause, le fil
 * est entier et tous les points sont allumés.
 */
export default function Etapes({ paused }: { paused: boolean }) {
  const { etapes } = useSimulation();
  const section = useRef<HTMLElement>(null);
  const zone = useRef<HTMLDivElement>(null);
  const proche = useApproche(section, '150%');
  return (
    <section ref={section} id="comment" className="sim-section sim-fond-nuit" aria-labelledby="sim-etapes">
      <Entree className="container-page">
        <Tete id="sim-etapes" cle="etapes" />
        <div ref={zone} className="sim-etapes">
          <div className="sim-fil" aria-hidden="true">
            <span className="sim-fil-trace" />
          </div>
          <ol className="sim-etapes-liste">
            {etapes.map((etape, i) => (
              <li key={etape.id} className="sim-etape" style={{ '--rang': i } as CSSProperties}>
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
      </Entree>
      {proche && !prefersReducedMotion() && (
        <Suspense fallback={null}>
          <EtapesMotion scope={zone} paused={paused} />
        </Suspense>
      )}
    </section>
  );
}
