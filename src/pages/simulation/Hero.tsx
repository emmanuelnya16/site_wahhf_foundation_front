import { lazy, Suspense, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowDown, Check } from 'lucide-react';
import { PauseButton } from '../events/motion';
import Lignes from '../accueil/Lignes';
import { Ancre, useLignes } from './ui';

/** Le dessin du portique : un fichier à part, chargé après le texte (le titre est l'élément LCP) */
const Portique = lazy(() => import('./Portique'));

/**
 * 1. Hero (brume) : surtitre, h1, phrase, trois badges, deux actions (le formulaire, « Pour qui ? »), le bouton pause du
 * site ; à droite, à la place d'une photo, la carte « Simulation · Portique de hangar » (dessin SVG fait pour la page).
 */
export default function Hero({ paused, onTogglePause }: { paused: boolean; onTogglePause: () => void }) {
  const { t } = useTranslation();
  const badges = t('simulation.hero.badges', { returnObjects: true }) as string[];
  const titre = useLignes('simulation.hero.titre');
  return (
    <section className="sim-section sim-fond-brume sim-hero" aria-labelledby="sim-titre">
      <div className="container-page sim-hero-grille">
        <div className="sim-hero-texte">
          <p className="ac-surtitre ac-entree">{t('simulation.hero.surtitre')}</p>
          <h1 id="sim-titre" className="sim-h1">
            <Lignes lignes={titre} />
          </h1>
          {/* L'intro monte sans fondu (ac-monte) : sur téléphone, c'est l'élément LCP (comme sur /accueil) */}
          <p className="sim-intro ac-entree" style={{ '--delai': '0.45s' } as CSSProperties}>
            {t('simulation.hero.intro')}
          </p>
          <ul className="sim-badges">
            {badges.map((badge, i) => (
              <li key={badge} style={{ '--rang': i } as CSSProperties}>
                <Check aria-hidden="true" />
                <span>{badge}</span>
              </li>
            ))}
          </ul>
          <div className="sim-actions ac-entree" style={{ '--delai': '0.85s' } as CSSProperties}>
            <Ancre to="soumettre" className="ac-btn ac-btn-nuit">
              <span>{t('simulation.hero.soumettre')}</span>
              <ArrowDown aria-hidden="true" className="ac-fleche" />
            </Ancre>
            <Ancre to="pour-qui" className="ac-btn ac-btn-contour">
              <span>{t('simulation.hero.eligible')}</span>
            </Ancre>
          </div>
          <PauseButton paused={paused} onToggle={onTogglePause} />
        </div>

        {/* data-ev-zone : la boucle du dessin s'arrête hors de l'écran (useLoopControl) */}
        <figure className="sim-carte" data-ev-zone>
          <p className="sim-carte-tete">
            <span className="sim-carte-voyant" aria-hidden="true" />
            {t('simulation.hero.carte.titre')}
          </p>
          <div className="sim-portique-cadre">
            <Suspense fallback={null}>
              <Portique alt={t('simulation.hero.carte.alt')} vent={t('simulation.hero.carte.vent')} toiture={t('simulation.hero.carte.toiture')} />
            </Suspense>
          </div>
          <ul className="sim-carte-cle" aria-hidden="true">
            <li>
              <span className="sim-cle sim-cle-chaude" />
              {t('simulation.hero.carte.sollicitees')}
            </li>
            <li>
              <span className="sim-cle sim-cle-barre" />
              {t('simulation.hero.carte.autres')}
            </li>
          </ul>
          <figcaption className="sim-carte-note">{t('simulation.hero.carte.legende')}</figcaption>
        </figure>
      </div>
    </section>
  );
}
