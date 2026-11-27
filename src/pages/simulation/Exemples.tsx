import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { SimIcone } from '../../data/simulation';
import { useSimulation } from './donnees';
import { BadgeAConfirmer, Tete } from './ui';

/** Icônes dessinées pour les exemples (48 × 48, trait), jamais de photo : ce ne sont pas des projets réalisés */
const ICONES: Record<SimIcone, string> = {
  // Hangar : deux poteaux, une ferme, la toiture
  hangar: 'M6 42h36M10 42V22M38 42V22M6 22 24 9l18 13M10 22h28M17 22 24 15l7 7M24 15v7',
  // Châssis : un plateau sur quatre pieds, une roue de transmission
  chassis: 'M8 24h32M12 24v18M36 24v18M8 42h8M32 42h8M24 24v-6m-6 0a6 6 0 1 0 12 0a6 6 0 1 0-12 0M12 33h24',
  // Séchoir solaire : un caisson, le soleil, l'air qui circule
  sechoir: 'M8 42V24l16-8 16 8v18zM8 24h32M15 31c3-2 5 2 8 0s5-2 8 0M15 36c3-2 5 2 8 0s5-2 8 0M38 6v4M31 9l2 3M45 9l-2 3M38 18a4 4 0 1 0 0-8',
  // Salle de classe : un bâtiment, deux fenêtres, l'air qui traverse
  classe: 'M6 42V18l18-10 18 10v24zM13 26h7v7h-7zM28 26h7v7h-7zM21 42v-6h6v6M2 30h6m-3-3 3 3-3 3M40 30h6m-3-3 3 3-3 3',
  // Réservoir surélevé : une cuve sur une tour
  reservoir: 'M14 8h20v14H14zM14 8c3-3 17-3 20 0M16 22 12 42M32 22l4 20M14 32h20M10 42h28M16 22l16 10M32 22 16 32',
};

/** 5. Exemples de demandes possibles (brume) : une rangée qui défile au doigt, à la molette (Maj) ou aux boutons */
export default function Exemples() {
  const { t } = useTranslation();
  const { exemples } = useSimulation();
  const rangee = useRef<HTMLUListElement>(null);
  const defiler = (sens: 1 | -1) => {
    const el = rangee.current;
    const carte = el?.querySelector('li');
    if (!el || !carte) return;
    el.scrollBy({ left: sens * (carte.getBoundingClientRect().width + 16), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <section className="sim-section sim-fond-brume" aria-labelledby="sim-exemples">
      <div className="container-page">
        <div className="sim-tete-ligne">
          <Tete id="sim-exemples" cle="exemples" intro />
          <div className="sim-fleches">
            <button type="button" className="sim-rond" onClick={() => defiler(-1)} aria-label={t('simulation.exemples.precedent')}>
              <ChevronLeft aria-hidden="true" />
            </button>
            <button type="button" className="sim-rond" onClick={() => defiler(1)} aria-label={t('simulation.exemples.suivant')}>
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
        {/* Zone défilante atteignable au clavier (flèches gauche et droite une fois le focus dessus) */}
        <ul ref={rangee} className="sim-rangee" tabIndex={0} aria-label={t('simulation.exemples.liste')}>
          {exemples.map((e) => (
            <li key={e.id} className="sim-carte-feuille sim-exemple">
              <div className="sim-exemple-haut">
                <svg className="sim-exemple-icone" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
                  <path d={ICONES[e.icone]} />
                </svg>
                <span className="sim-etiquette">{t('simulation.exemples.etiquette')}</span>
              </div>
              <h3 className="sim-h3">
                {e.titre} <BadgeAConfirmer item={e} />
              </h3>
              <p className="sim-texte">{e.besoin}</p>
              <p className="sim-type">
                <span className="sr-only">{t('simulation.exemples.type')} : </span>
                {e.type}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
