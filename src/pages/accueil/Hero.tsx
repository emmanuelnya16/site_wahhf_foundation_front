import { useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Sparkle } from 'lucide-react';
import { PauseButton } from '../events/motion';
import Equipe from './Equipe';
import Lignes from './Lignes';
import Visuel from './Visuel';
import { useParallaxe } from './useParallaxe';

/** Slogan de la banderole du 25 avril, gardé en anglais dans les trois langues (brief du lot 11.1) */
const SLOGAN = 'Sowing hope, harvesting change';

/** Décalage d'entrée d'un bloc (src/styles/accueil.css) */
const delai = (s: number) => ({ '--delai': `${s}s` }) as CSSProperties;

/**
 * 1. Hero de la page Accueil (lot 11.1 ; docs/references/accueil/hero-apercu.jpg). Deux colonnes 55 / 45 dès 1 024 px ;
 * en dessous, le texte, puis l'arche et les cartes. Styles et mouvement : src/styles/accueil.css.
 */
export default function Hero({ paused, onTogglePause }: { paused: boolean; onTogglePause: () => void }) {
  const { t } = useTranslation();
  const zone = useRef<HTMLElement>(null);
  useParallaxe(zone, !paused);

  return (
    <section ref={zone} className="ac-hero" aria-labelledby="ac-titre" data-ev-zone="">
      <div className="ac-taches" aria-hidden="true">
        <span className="ac-tache-sauge" />
        <span className="ac-tache-soleil" />
      </div>
      <div className="container-page ac-grille">
        <div className="ac-texte">
          <p className="ac-pastille ac-entree" style={delai(0)}>
            <Sparkle aria-hidden="true" className="ac-etoile" />
            <span lang="en">{SLOGAN}</span>
          </p>
          <h1 id="ac-titre" className="ac-h1">
            <Lignes lignes={t('accueil.hero.titre', { returnObjects: true }) as string[]} />
          </h1>
          <p className="ac-intro ac-entree" style={delai(0.4)}>
            {t('accueil.hero.intro')}
          </p>
          <div className="ac-actions ac-entree" style={delai(0.65)}>
            <Link to="/nos-actions" className="ac-btn ac-btn-nuit">
              <span>{t('accueil.hero.actions')}</span>
              <ArrowRight aria-hidden="true" className="ac-fleche" />
            </Link>
            <Link to="/agir" className="ac-btn ac-btn-contour">
              <span>{t('accueil.hero.rejoindre')}</span>
            </Link>
          </div>
          <Equipe />
          <PauseButton paused={paused} onToggle={onTogglePause} />
        </div>
        <Visuel />
      </div>
    </section>
  );
}
