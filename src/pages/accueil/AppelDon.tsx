import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, ShieldCheck } from 'lucide-react';
import Photo from '../../components/wahhf/Photo';
import { useLocalize } from '../../lib/localize';
import { photoOrFallback } from '../../lib/photos';
import { DOMAINS_DATA } from '../../services/api';
import Entree from './Entree';
import Lignes from './Lignes';

const delai = (s: number) => ({ '--delai': `${s}s` }) as CSSProperties;

/** A71 : un intervenant de la journée du 25 avril, devant le kakémono au cœur de la fondation (lot 11.7) */
const PHOTO = photoOrFallback('A71');

/**
 * Le fil du site dessine un grand cœur : il entre en bas à gauche, fait le cœur, ressort à droite (décor, au trait).
 * pathLength 1 : il se dessine au trait à l'arrivée (accueil.css).
 */
const COEUR =
  'M-40 490 C90 500 260 480 330 440 C250 370 140 300 140 200 C140 130 190 90 245 90 C290 90 320 120 330 160 C340 120 370 90 415 90 C470 90 520 130 520 200 C520 300 410 370 330 440 C420 490 560 505 680 470';

/** Faire un don avec un domaine déjà choisi : la page Faire un don lit ?affectation=<slug> (ACT-02) */
export const lienDon = (slug?: string) => (slug ? `/faire-un-don?affectation=${slug}` : '/faire-un-don');

/**
 * 10. Appel au don (lot 11.7), dernière section : un grand bloc cœur. Seulement des faits déjà sur le site : le titre de la
 * section « Agir » de /, les six domaines, l'affectation au choix ou là où le besoin est le plus urgent (Faire un don),
 * le soutien du groupe IROKO (Qui sommes-nous). Aucun montant, aucune équivalence, aucun chiffre d'impact (question 206).
 */
export default function AppelDon() {
  const { t } = useTranslation();
  const { localized } = useLocalize();

  return (
    <section id="soutenir" className="ac-don" aria-labelledby="ac-don-titre">
      <div className="container-page">
        <Entree className="ac-don-bloc">
          <svg className="ac-don-fil" viewBox="0 0 640 520" fill="none" aria-hidden="true" focusable="false">
            <path d={COEUR} pathLength={1} />
          </svg>
          <div className="ac-don-texte">
            <p className="ac-surtitre ac-don-surtitre ac-app">{t('accueil.don.surtitre')}</p>
            <h2 id="ac-don-titre" className="ac-h2 ac-don-h2">
              <Lignes lignes={t('accueil.don.titre', { returnObjects: true }) as string[]} />
            </h2>
            <p className="ac-don-paragraphe ac-app" style={delai(0.35)}>
              {t('accueil.don.texte')}
            </p>
            <ul className="ac-don-domaines">
              {DOMAINS_DATA.map((domaine, i) => {
                const titre = localized(domaine, `contenu.domaines.${domaine.id}`).title;
                return (
                  <li key={domaine.id} style={{ '--rang': i } as CSSProperties}>
                    <Link to={lienDon(domaine.slug)} className="ac-don-pastille" aria-label={t('accueil.don.domaine', { domaine: titre })}>
                      {titre}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="ac-don-actions ac-app" style={delai(0.7)}>
              <Link to={lienDon()} className="ac-don-btn">
                <span className="ac-don-coeur" aria-hidden="true">
                  <Heart fill="currentColor" strokeWidth={0} />
                </span>
                <span>{t('nav.donate')}</span>
              </Link>
              <Link to="/agir#partenaire" className="ac-don-btn ac-don-btn-contour">
                {t('footer.partner')}
              </Link>
            </div>
            <p className="ac-don-confiance ac-app" style={delai(0.85)}>
              <ShieldCheck aria-hidden="true" />
              <span>{t('accueil.don.confiance')}</span>
            </p>
          </div>
          {PHOTO && (
            <div className="ac-don-photo">
              <div className="ac-don-goutte">
                <Photo photo={PHOTO} sizes="(min-width: 1024px) 23rem, 17rem" fit="cover" radius="none" style={{ objectPosition: '50% 12%' }} />
              </div>
            </div>
          )}
        </Entree>
      </div>
    </section>
  );
}
