import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { temoignagesPublies } from '../../data/accueil-temoignages';
import { useLocalize } from '../../lib/localize';
import { LIEN_RACONTER } from './CarteTemoignage';
import Entree from './Entree';
import Lignes from './Lignes';
import Paquet, { PaquetVierge } from './Paquet';

const delai = (s: number) => ({ '--delai': `${s}s` }) as CSSProperties;

/**
 * 6. Des parcours qui inspirent (lot 11.4) : les témoignages confirmés de src/data/accueil-temoignages.ts (en
 * développement, l'exemple aussi), en paquet de cartes. Aucun témoignage : la section invite à raconter son parcours, avec
 * le même paquet, vierge (aucun faux nom).
 */
export default function Parcours() {
  const { t, localizedList } = useLocalize();
  const temoignages = localizedList(temoignagesPublies(), 'accueil.contenu.temoignages', (x) => x.id);
  const appel = temoignages.length === 0;
  const cle = appel ? 'accueil.parcours.appel' : 'accueil.parcours';

  return (
    <section id="parcours" className="ac-parcours" aria-labelledby="ac-parcours-titre">
      <div className="container-page ac-parcours-grille">
        <Entree className="ac-parcours-texte">
          <p className="ac-surtitre ac-app">{t(`${cle}.surtitre`)}</p>
          <h2 id="ac-parcours-titre" className="ac-h2">
            <Lignes lignes={t(`${cle}.titre`, { returnObjects: true }) as string[]} />
          </h2>
          <p className="ac-paragraphe ac-app" style={delai(0.35)}>
            {t(`${cle}.texte`)}
          </p>
          {appel ? (
            <Link to={LIEN_RACONTER} className="ac-btn ac-btn-nuit ac-app ac-parcours-bouton" style={delai(0.5)}>
              <span>{t('accueil.parcours.raconter')}</span>
              <ArrowRight aria-hidden="true" className="ac-fleche" />
            </Link>
          ) : (
            <Link to="/actualites" className="ac-lien ac-app" style={delai(0.5)}>
              <span>{t('accueil.parcours.lien')}</span>
              <ArrowRight aria-hidden="true" className="ac-fleche" />
            </Link>
          )}
        </Entree>
        {appel ? <PaquetVierge /> : <Paquet temoignages={temoignages} />}
      </div>
    </section>
  );
}
