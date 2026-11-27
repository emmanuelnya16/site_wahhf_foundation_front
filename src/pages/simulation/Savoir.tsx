import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, Info, Layers, Thermometer, Waypoints, type LucideIcon } from 'lucide-react';
import Photo from '../../components/wahhf/Photo';
import { photoOrFallback } from '../../lib/photos';
import { useSimulation } from './donnees';
import { BadgeAConfirmer, Tete } from './ui';
import Entree from '../accueil/Entree';

const ICONES_FAMILLES: Record<string, LucideIcon> = { structures: Waypoints, fluides: Thermometer, conception: Layers };

/**
 * Les jeunes au cœur du programme : A30, des participants de dos face au kakémono pendant une présentation (accord
 * « ok », règle des mineurs respectée : de dos). Troisième affichage sur le site : l'accordéon de / et Notre impact.
 */
const PHOTO_JEUNES = photoOrFallback('A30');

/** 7. Ce que nous savons simuler (papier) : 3 familles, et leurs types d'analyse en pastilles. Aucun nom de logiciel. */
export function Familles() {
  const { t } = useTranslation();
  const { familles } = useSimulation();
  return (
    <section className="sim-section sim-fond-papier" aria-labelledby="sim-familles">
      <Entree className="container-page">
        <Tete id="sim-familles" cle="familles" />
        <ul className="sim-grille-3">
          {familles.map((f) => {
            const Icone = ICONES_FAMILLES[f.id] ?? Layers;
            return (
              <li key={f.id} className="sim-carte-feuille">
                <span className="sim-icone" aria-hidden="true">
                  <Icone />
                </span>
                <h3 className="sim-h3">
                  {f.titre} <BadgeAConfirmer item={f} />
                </h3>
                <p className="sim-texte">{f.texte}</p>
                <ul className="sim-pastilles" aria-label={t('simulation.familles.analyses')}>
                  {f.analyses.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Entree>
    </section>
  );
}

/** 8. Nos engagements et nos limites (sauge) : deux colonnes ; l'encadré des limites s'affiche toujours (protection) */
export function Engagements() {
  const { t } = useTranslation();
  const { engagements, limite } = useSimulation();
  return (
    <section className="sim-section sim-fond-sauge" aria-labelledby="sim-engagements">
      <Entree className="container-page">
        <Tete id="sim-engagements" cle="engagements" />
        <div className="sim-deux-colonnes">
          <div>
            <h3 className="sim-h3">{t('simulation.engagements.nos')}</h3>
            <ul className="sim-engagements">
              {engagements.map((e) => (
                <li key={e.id}>
                  <span className="sim-coche" aria-hidden="true">
                    <Check />
                  </span>
                  <div>
                    <p className="sim-engagement-titre">
                      {e.titre} <BadgeAConfirmer item={e} />
                    </p>
                    <p className="sim-texte">{e.texte}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <aside className="sim-limite" aria-labelledby="sim-limite">
            <Info aria-hidden="true" className="sim-limite-icone" />
            <h3 id="sim-limite" className="sim-h3">
              {limite.titre} <BadgeAConfirmer item={limite} />
            </h3>
            <p className="sim-limite-texte">{limite.texte}</p>
          </aside>
        </div>
      </Entree>
    </section>
  );
}

/** 9. Les jeunes au cœur du programme (brume) : une photo publiable, le texte, « Rejoindre le programme » (Agir) */
export function Jeunes() {
  const { t } = useTranslation();
  return (
    <section className="sim-section sim-fond-brume" aria-labelledby="sim-jeunes">
      <Entree className="container-page sim-jeunes">
        {PHOTO_JEUNES && (
          <div className="sim-jeunes-photo">
            <Photo photo={PHOTO_JEUNES} sizes="(min-width: 1024px) 34rem, calc(100vw - 2.5rem)" fit="cover" radius="none" />
          </div>
        )}
        <div>
          <Tete id="sim-jeunes" cle="jeunes" />
          <p className="ac-paragraphe">{t('simulation.jeunes.texte')}</p>
          <Link to="/agir#benevole" className="ac-btn ac-btn-nuit sim-jeunes-bouton">
            <span>{t('simulation.jeunes.bouton')}</span>
            <ArrowRight aria-hidden="true" className="ac-fleche" />
          </Link>
        </div>
      </Entree>
    </section>
  );
}
