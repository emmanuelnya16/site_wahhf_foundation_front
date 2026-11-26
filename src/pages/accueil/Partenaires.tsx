import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { partenairesAffiches, SEUIL_BANDE, type Partenaire } from '../../data/partners';
import { cn } from '../../lib/utils';
import Entree from './Entree';

/** Décalage d'apparition d'un logo : 60 ms entre deux (brief du lot 12) */
const delai = (i: number) => ({ '--delai': `${(i * 0.06).toFixed(2)}s` }) as CSSProperties;

/**
 * Une carte coin feuille : le logo en niveaux de gris (en couleur au survol), ou le nom en texte s'il n'y a pas encore de
 * logo. Un lien vers le site du partenaire seulement s'il est confirmé (nouvel onglet, dit dans le nom du lien).
 */
function Carte({ partenaire, decor = false }: { partenaire: Partenaire; decor?: boolean }) {
  const { t } = useTranslation();
  const contenu = partenaire.logo ? (
    <img src={partenaire.logo} alt={decor ? '' : partenaire.nom} height={80} loading="lazy" decoding="async" className="ac-partenaire-logo" />
  ) : (
    <span className="ac-partenaire-nom">{partenaire.nom}</span>
  );
  if (!partenaire.lien) return <span className="ac-partenaire">{contenu}</span>;
  return (
    <a
      href={partenaire.lien}
      target="_blank"
      rel="noopener noreferrer"
      className="ac-partenaire"
      aria-label={decor ? undefined : t('accueil.partenaires.lienExterne', { nom: partenaire.nom })}
      tabIndex={decor ? -1 : undefined}
    >
      {contenu}
    </a>
  );
}

/**
 * 12. Nos partenaires (lot 12), tout à la fin de /accueil, après l'appel au don et avant le pied de page. Sur brume
 * (humus en sombre) : l'appel au don est sur sauge, le pied de page sur nuit.
 * - Moins de 6 partenaires : une grille fixe centrée. À partir de 6 : une bande qui défile lentement, sur deux rangées en
 *   sens opposés ; elle s'arrête au survol et au focus, au bouton pause du site, hors de l'écran (data-ev-zone) et en
 *   mouvement réduit (grille fixe). La seconde copie de chaque rangée, qui ferme la boucle, est cachée aux lecteurs
 *   d'écran et au clavier.
 * - Seul mouvement : les logos apparaissent l'un après l'autre (60 ms d'écart) à l'arrivée de la section.
 * - Un encadré « Devenir partenaire » mène à Agir (#partenaire).
 */
export default function Partenaires() {
  const { t } = useTranslation();
  const partenaires = partenairesAffiches();
  const bande = partenaires.length >= SEUIL_BANDE;
  const rangees = bande ? [partenaires.filter((_, i) => i % 2 === 0), partenaires.filter((_, i) => i % 2 === 1)] : [partenaires];

  return (
    <section id="partenaires" className="ac-partenaires" aria-labelledby="ac-partenaires-titre" data-ev-zone>
      <div className="container-page ac-partenaires-grille">
        <div className="ac-partenaires-entete">
          <p className="ac-surtitre">{t('accueil.partenaires.surtitre')}</p>
          <h2 id="ac-partenaires-titre" className="ac-h2">
            {t('accueil.partenaires.titre')}
          </h2>
        </div>

        <Entree className={cn('ac-partenaires-logos', bande && 'is-bande')}>
          {rangees.map((rangee, r) => (
            <div key={r} className={cn('ac-partenaires-rangee', r === 1 && 'is-inverse')}>
              <div className="ac-partenaires-piste">
                <ul className="ac-partenaires-liste">
                  {rangee.map((p, i) => (
                    <li key={p.id} className="ac-app" style={delai(r + i * rangees.length)}>
                      <Carte partenaire={p} />
                    </li>
                  ))}
                </ul>
                {bande && (
                  <ul className="ac-partenaires-liste is-copie" aria-hidden="true">
                    {rangee.map((p, i) => (
                      <li key={p.id} className="ac-app" style={delai(r + (i + rangee.length) * rangees.length)}>
                        <Carte partenaire={p} decor />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </Entree>

        <aside className="ac-partenaires-encadre" aria-labelledby="ac-partenaires-devenir">
          <h3 id="ac-partenaires-devenir" className="ac-partenaires-encadre-titre">
            {t('accueil.partenaires.devenir.titre')}
          </h3>
          <p className="ac-partenaires-encadre-texte">{t('accueil.partenaires.devenir.texte')}</p>
          <Link to="/agir#partenaire" className="ac-btn ac-btn-nuit">
            <span>{t('accueil.partenaires.devenir.bouton')}</span>
            <ArrowRight aria-hidden="true" className="ac-fleche" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
