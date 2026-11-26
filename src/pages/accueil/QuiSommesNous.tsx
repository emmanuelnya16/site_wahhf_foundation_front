import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, GraduationCap, HeartHandshake, ShieldCheck, type LucideIcon } from 'lucide-react';
import Photo from '../../components/wahhf/Photo';
import { photoOrFallback } from '../../lib/photos';
import { displayName, displayRole, memberPortrait, visibleMembers } from '../../lib/team';
import type { TeamMember } from '../../data/team';
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
 * La direction (lot 12) : un partenaire européen doit voir qui dirige la fondation. Les trois premiers niveaux de
 * l'organigramme (src/data/team.ts : présidence, vice-présidence, puis le niveau sans intitulé), quatre personnes au
 * plus, avec leur nom connu. Fonctions de team.ts, jamais inventées ; pas de fonction affichée quand team.ts n'en a pas.
 */
const NIVEAUX_DIRECTION = 3;
const direction = () => visibleMembers().filter((m) => m.niveau <= NIVEAUX_DIRECTION && m.prenom && m.nom).slice(0, 4);
const initiales = (m: TeamMember) => `${m.prenom?.[0] ?? ''}${m.nom?.[0] ?? ''}`.toUpperCase();

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

      {/* La direction : portrait rond seulement avec l'accord écrit (memberPortrait), sinon les initiales sur sauge */}
      <div className="container-page">
        <Entree className="ac-direction">
          <h3 className="ac-direction-titre ac-app" style={delai(0)}>
            {t('accueil.qsn.direction.titre')}
          </h3>
          <ul className="ac-direction-liste">
            {direction().map((membre, i) => {
              const portrait = memberPortrait(membre);
              const role = displayRole(membre);
              return (
                <li key={membre.id} className="ac-direction-personne ac-app" style={delai(0.1 + i * 0.08)}>
                  <span className="ac-direction-rond" aria-hidden="true">
                    {portrait ? (
                      <Photo photo={portrait} sizes="4.5rem" fit="cover" radius="none" decorative />
                    ) : (
                      initiales(membre)
                    )}
                  </span>
                  <span className="ac-direction-texte">
                    <span className="ac-direction-nom">{displayName(membre)}</span>
                    {role && <span className="ac-direction-role">{role}</span>}
                  </span>
                </li>
              );
            })}
          </ul>
          <Link to="/qui-sommes-nous#organigramme" className="ac-lien ac-app" style={delai(0.4)}>
            <span>{t('accueil.qsn.direction.lien')}</span>
            <ArrowRight aria-hidden="true" className="ac-fleche" />
          </Link>
        </Entree>
      </div>
    </section>
  );
}
