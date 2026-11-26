import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, GraduationCap, HeartHandshake, ShieldCheck, type LucideIcon } from 'lucide-react';
import Photo from '../../components/wahhf/Photo';
import { photoOrFallback } from '../../lib/photos';
import Entree from './Entree';
import Lignes from './Lignes';

/**
 * A12 : un membre de l'équipe à côté du kakémono, en portrait (lot 11.6 ; A07 passe dans l'arche du hero) ; A88 : trois
 * aînés. Remplaçantes si l'une passe en attente d'accord.
 */
const FEUILLE = photoOrFallback('A12', 'A13');
const CERCLE = photoOrFallback('A88', 'A99');
/** A99 dans le cercle : serrée sur le visage et le haut du polo */
const CADRAGE_CERCLE: CSSProperties | undefined = CERCLE?.id === 'A99' ? { objectPosition: '42% 0', scale: '1.5', transformOrigin: '48% 12%' } : undefined;
/** A12 dans la feuille : le visage et le kakémono en entier */
const CADRAGE_FEUILLE = FEUILLE?.id === 'A12' ? '60% 30%' : 'center';
/** Largeur affichée : une photo en hauteur remplit la feuille juste (32,5 rem au plus), une photo en largeur la déborde */
const TAILLES_FEUILLE =
  FEUILLE && FEUILLE.height > FEUILLE.width
    ? '(min-width: 1024px) 34vw, (min-width: 600px) 32.5rem, 92vw'
    : '(min-width: 1280px) 53rem, (min-width: 1024px) 60vw, (min-width: 36rem) 53rem, 162vw';

const POINTS: { id: 'dignite' | 'integrite' | 'gratuite'; icon: LucideIcon }[] = [
  { id: 'dignite', icon: HeartHandshake },
  { id: 'integrite', icon: ShieldCheck },
  { id: 'gratuite', icon: GraduationCap },
];

const delai = (s: number) => ({ '--delai': `${s}s` }) as CSSProperties;

/**
 * Le fil en pointillés : il part de l'étiquette, fait une boucle et va vers le texte (bureau). Le tracé visible est
 * pointillé ; c'est un masque au trait plein qui se dessine (AccueilMotion), d'où le pathLength et le masque.
 */
const FIL = 'M40 96 C70 190 250 232 372 196 C470 168 486 92 424 78 C366 66 344 140 408 178 C478 220 560 190 640 120';

/**
 * 2. Qui sommes-nous en bref (lot 11.2) : une photo en forme de feuille, une seconde dans un cercle, la citation sur une
 * étiquette soleil et le fil qui mène au texte. Parallaxe et tracé au défilement : AccueilMotion ; entrées : CSS.
 */
export default function QuiSommesNous() {
  const { t } = useTranslation();

  return (
    <section className="ac-qsn" aria-labelledby="ac-qsn-titre">
      <div className="container-page ac-qsn-grille">
        <Entree className="ac-qsn-images">
          <span className="ac-qsn-tache" data-ac-defile="-18" aria-hidden="true" />
          <svg className="ac-fil" viewBox="0 0 680 260" fill="none" aria-hidden="true" focusable="false">
            <defs>
              <mask id="ac-fil-masque" maskUnits="userSpaceOnUse" x="0" y="0" width="680" height="260">
                <path className="ac-fil-trace" d={FIL} pathLength={1000} stroke="#fff" strokeWidth={14} strokeLinecap="round" />
              </mask>
            </defs>
            <g mask="url(#ac-fil-masque)">
              <path className="ac-fil-points" d={FIL} />
              <circle className="ac-fil-arrivee" cx="640" cy="120" r="5" />
            </g>
          </svg>
          <div className="ac-qsn-photos">
            <div className="ac-feuille-place" data-ac-defile="8">
              <div className="ac-feuille">
                {FEUILLE && <Photo photo={FEUILLE} sizes={TAILLES_FEUILLE} fit="cover" radius="none" style={{ objectPosition: CADRAGE_FEUILLE }} />}
              </div>
            </div>
            <div className="ac-cercle-place" data-ac-defile="20">
              <div className="ac-cercle">{CERCLE && <Photo photo={CERCLE} sizes="(min-width: 1024px) 37rem, 26rem" fit="cover" radius="none" style={CADRAGE_CERCLE} />}</div>
            </div>
          </div>
          <blockquote className="ac-etiquette">
            <p>{t('accueil.qsn.citation')}</p>
          </blockquote>
        </Entree>

        <Entree className="ac-qsn-texte">
          <p className="ac-surtitre ac-app" style={delai(0)}>
            {t('accueil.qsn.surtitre')}
          </p>
          <h2 id="ac-qsn-titre" className="ac-h2">
            <Lignes lignes={t('accueil.qsn.titre', { returnObjects: true }) as string[]} />
          </h2>
          <p className="ac-paragraphe ac-app" style={delai(0.35)}>
            {t('accueil.qsn.texte')}
          </p>
          <ul className="ac-points">
            {POINTS.map(({ id, icon: Icon }, i) => (
              <li key={id} className="ac-app" style={delai(0.5 + i * 0.09)}>
                <span className="ac-point-icone" aria-hidden="true">
                  <Icon />
                </span>
                <div>
                  <h3 className="ac-point-titre">{t(`accueil.qsn.points.${id}.titre`)}</h3>
                  <p className="ac-point-texte">{t(`accueil.qsn.points.${id}.texte`)}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link to="/qui-sommes-nous" className="ac-lien ac-app" style={delai(0.85)}>
            <span>{t('accueil.qsn.lien')}</span>
            <ArrowRight aria-hidden="true" className="ac-fleche" />
          </Link>
        </Entree>
      </div>
    </section>
  );
}
