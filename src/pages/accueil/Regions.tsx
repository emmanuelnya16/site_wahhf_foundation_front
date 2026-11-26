import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CarteRegions from './CarteRegions';
import Entree from './Entree';
import Lignes from './Lignes';

const delai = (s: number) => ({ '--delai': `${s}s` }) as CSSProperties;

/** Première phrase d'un texte (jusqu'au premier point suivi d'une espace) */
function premierePhrase(texte: string) {
  const fin = texte.indexOf('. ');
  return fin < 0 ? texte : texte.slice(0, fin + 1);
}

/**
 * 7. Les 10 régions (lot 11.5), sur sauge : un en-tête propre à l'accueil, puis la carte du Cameroun de Notre impact
 * (CarteRegions). La phrase sur les relais régionaux est celle de Notre impact, mot pour mot, dans chaque langue : la
 * première phrase de home.presence.subtitle (la seconde parle des pays d'Europe, absents ici).
 */
export default function Regions() {
  const { t } = useTranslation();
  return (
    <section id="regions" className="ac-regions" aria-labelledby="ac-regions-titre">
      <div className="container-page ac-regions-grille">
        <Entree className="ac-regions-texte">
          <p className="ac-surtitre ac-app">{t('accueil.regions.surtitre')}</p>
          <h2 id="ac-regions-titre" className="ac-h2">
            <Lignes lignes={t('accueil.regions.titre', { returnObjects: true }) as string[]} />
          </h2>
          <p className="ac-paragraphe ac-app" style={delai(0.35)}>
            {premierePhrase(t('home.presence.subtitle'))}
          </p>
          <Link to="/notre-impact" className="ac-lien ac-app" style={delai(0.5)}>
            <span>{t('accueil.regions.lien')}</span>
            <ArrowRight aria-hidden="true" className="ac-fleche" />
          </Link>
        </Entree>
        <CarteRegions />
      </div>
    </section>
  );
}
