import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { chiffresPublies, type ChiffreAccueil, type TexteChiffre } from '../../data/accueil-chiffres';
import { useLocalize } from '../../lib/localize';
import { followAnchorLink } from '../../lib/scroll';
import Compteur from './Compteur';
import Entree from './Entree';
import Lignes from './Lignes';
import MotifCartes from './MotifCartes';

/** Taille du chiffre selon sa longueur : il reste dans son anneau (« 10 », « 250 », « 2 000+ ») */
const longueur = (texte: string) => (texte.length > 4 ? 'long' : texte.length > 2 ? 'moyen' : undefined);

/**
 * 3. Les chiffres (lot 11.2) : bandeau nuit, un anneau par chiffre, toute la colonne est un lien. Les chiffres viennent
 * de src/data/accueil-chiffres.ts ; ceux d'impact y attendent leur date et leur source. Entrées : CSS (accueil.css),
 * parallaxe du motif : AccueilMotion.
 */
export default function Chiffres() {
  const { t, lang, locale, localizedList } = useLocalize();
  const texte = (x: TexteChiffre) => (typeof x === 'string' ? x : x[lang]);
  const jour = (iso: string) => new Intl.DateTimeFormat(locale, { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(iso));
  const chiffres = localizedList<ChiffreAccueil>(chiffresPublies(), 'accueil.contenu.chiffres', (c) => c.id);

  return (
    <section className="ac-chiffres" aria-labelledby="ac-chiffres-titre">
      <MotifCartes />
      <div className="container-page">
        <Entree>
          <p className="ac-surtitre ac-app">{t('accueil.chiffres.surtitre')}</p>
          <h2 id="ac-chiffres-titre" className="ac-h2">
            <Lignes lignes={t('accueil.chiffres.titre', { returnObjects: true }) as string[]} />
          </h2>
        </Entree>
        <ul className="ac-chiffres-liste">
          {chiffres.map((c, i) => {
            const valeur = `${new Intl.NumberFormat(locale).format(c.valeur)}${c.suffixe ?? ''}`;
            return (
              <Entree as="li" key={c.id} className="ac-chiffre" style={{ '--rang': i } as CSSProperties}>
                <Link to={c.lien} onClick={c.lien.startsWith('#') ? (e) => followAnchorLink(e, c.lien.slice(1)) : undefined} className="ac-chiffre-lien">
                  <span className="ac-anneau">
                    <svg viewBox="0 0 150 150" fill="none" aria-hidden="true" focusable="false">
                      <circle cx="75" cy="75" r="73.5" pathLength={1} />
                    </svg>
                    <span className="ac-chiffre-valeur" data-longueur={longueur(valeur)}>
                      <Compteur texte={valeur} />
                    </span>
                    <span className="sr-only">{valeur} </span>
                  </span>
                  <span className="ac-chiffre-libelle">{texte(c.libelle)}</span>{' '}
                  <span className="ac-chiffre-texte">
                    {texte(c.sousTexte)}
                    {' '}
                    <ArrowRight aria-hidden="true" className="ac-fleche" />
                  </span>
                  {c.date && c.source && (
                    <>
                      {' '}
                      <span className="ac-chiffre-source">{t('accueil.chiffres.source', { date: jour(c.date), source: texte(c.source) })}</span>
                    </>
                  )}
                </Link>
              </Entree>
            );
          })}
        </ul>
        <Entree>
          <p className="ac-chiffres-note ac-app" style={{ '--delai': '0.8s' } as CSSProperties}>
            {t('accueil.chiffres.note')}
          </p>
        </Entree>
      </div>
    </section>
  );
}
