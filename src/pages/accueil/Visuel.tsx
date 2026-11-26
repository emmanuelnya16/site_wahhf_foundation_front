import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import Photo from '../../components/wahhf/Photo';
import { photoOrFallback } from '../../lib/photos';
import { versAncre } from './ancre';
import { localizeEvent, upcomingEvents } from '../../lib/events';
import { LIEN_DOMAINES, LIEN_PAYS } from '../../data/accueil-chiffres';
import { COUNTRIES_DATA, DOMAINS_DATA, WAHHF_LOGO_URL } from '../../services/api';

/**
 * A16 : jeunes en t-shirts « Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse » (25 avril 2026). Elle attend
 * l'accord des parents (lot 11.2). En ligne, A12 la remplace (un membre de l'équipe à côté du kakémono) : A30, prévue
 * d'abord, est la photo « Apprendre » de l'accordéon, plus bas sur la page (lot 11.5).
 */
const PHOTO = photoOrFallback('A16', 'A12');
/**
 * Largeur affichée : une photo en largeur déborde de l'arche (recadrée sur les côtés), une photo en hauteur la remplit
 * juste. Arche : 29,4 rem dès 1 280 px, 37 vw dès 1 024 px, 26 rem au plus en dessous (90 vw).
 */
const SIZES =
  PHOTO && PHOTO.height > PHOTO.width
    ? '(min-width: 1280px) 29.4rem, (min-width: 1024px) 37vw, (min-width: 29rem) 26rem, 90vw'
    : '(min-width: 1024px) 60rem, (min-width: 29rem) 53rem, 186vw';

/** Arche de 470 × 640 : demi-cercle en haut, coins de 36 px en bas ; tracée depuis le bas à gauche */
const ARCHE = 'M36 640 A36 36 0 0 1 0 604 V235 A235 235 0 0 1 470 235 V604 A36 36 0 0 1 434 640 Z';

/** Espace insécable à la fin : SVG retire une espace simple, et la boucle du texte se refermerait mal */
const SLOGAN_ROND = 'SOWING HOPE · HARVESTING CHANGE · ';

/**
 * Colonne droite du hero : la photo dans une arche, le contour soleil décalé, trois cartes et le badge rond.
 * Chaque élément qui suit la souris a son enveloppe (data-parallaxe) ; son contenu porte l'entrée et le flottement :
 * un seul animateur par élément.
 */
export default function Visuel() {
  const { t, i18n } = useTranslation();
  const next = upcomingEvents()[0];
  const event = next && localizeEvent(next, i18n.language);

  return (
    <div className="ac-visuel">
      <div className="ac-scene">
        <svg className="ac-contour" viewBox="0 0 470 640" fill="none" aria-hidden="true" focusable="false">
          <path d={ARCHE} pathLength={1} />
        </svg>
        <div className="ac-arche-place" data-parallaxe="-6">
          <div className="ac-arche">
            {PHOTO && <Photo photo={PHOTO} sizes={SIZES} priority fit="cover" radius="none" />}
          </div>
        </div>
        <div className="ac-badge-place" data-parallaxe="5">
          <div className="ac-badge">
            <svg className="ac-badge-texte" viewBox="0 0 124 124" aria-hidden="true" focusable="false">
              <defs>
                <path id="ac-cercle" d="M16 62 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
              </defs>
              <text>
                <textPath href="#ac-cercle" textLength="288" lengthAdjust="spacing">
                  {SLOGAN_ROND}
                </textPath>
              </text>
            </svg>
            <span className="ac-badge-logo">
              <img src={WAHHF_LOGO_URL} alt={t('ui.logoAlt')} width={48} height={48} />
            </span>
          </div>
        </div>
      </div>

      <div className="ac-cartes">
        <div className="ac-carte-place ac-place-pays" data-parallaxe="10">
          <Link to={LIEN_PAYS} className="ac-carte focus-ring-double">
            <span className="ac-nombre">{COUNTRIES_DATA.length}</span>{' '}
            <span className="ac-carte-texte">{t('accueil.hero.pays')}</span>
          </Link>
        </div>
        <div className="ac-carte-place ac-place-domaines" data-parallaxe="8">
          <Link to={LIEN_DOMAINES} onClick={(e) => versAncre(e, LIEN_DOMAINES.slice(1))} className="ac-carte ac-carte-nuit focus-ring-double">
            <span className="ac-nombre">{DOMAINS_DATA.length}</span>{' '}
            <span className="ac-carte-texte">{t('accueil.hero.domaines')}</span>
          </Link>
        </div>
        {event && (
          <div className="ac-carte-place ac-place-evenement" data-parallaxe="10">
            <Link to={`/evenements/${event.slug}`} className="ac-carte focus-ring-double">
              <span className="ac-evenement-nom">
                <span className="ac-point" aria-hidden="true" />
                <span>{event.nom ?? event.titre.replace(/\n/g, ' ')}</span>
              </span>{' '}
              <span className="ac-evenement-lien">
                {t('accueil.hero.evenement')}
                <ArrowRight aria-hidden="true" className="ac-fleche" />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
