import { lazy, useEffect, useRef, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DonateButton } from '../../components/wahhf/Buttons';
import Photo from '../../components/wahhf/Photo';
import { projetPhare } from '../../data/accueil-projets';
import { AfterFirstDisplay } from '../../effects/DeferredMotion';
import { useLocalize } from '../../lib/localize';
import { photoCaption, photoOrFallback } from '../../lib/photos';
import { useMediaQuery } from '../../lib/useMediaQuery';
import Compteur from './Compteur';
import Entree from './Entree';
import Lignes from './Lignes';
import { tracerRoute } from './route';
import { useApproche } from './useApproche';
import { Fourgonnette, Livre } from './Vehicules';

/** Le véhicule, les panneaux (GSAP, MotionPath), chargés quand la section approche */
const ProjetMotion = lazy(() => import('./ProjetMotion'));

const PROJET = projetPhare();
const PHOTO = PROJET ? photoOrFallback(PROJET.photo[0], ...PROJET.photo.slice(1)) : null;

const delai = (s: number) => ({ '--delai': `${s}s` }) as CSSProperties;

/**
 * 5. Projet phare (lot 11.4) : le premier projet confirmé de src/data/accueil-projets.ts (en développement, l'exemple).
 * En haut, le projet et sa photo en ticket ; dessous, la route : des panneaux (les jalons) et un véhicule qui avance avec
 * le défilement, devant trois plans de collines (parallaxe : AccueilMotion). Entrées du haut : CSS ; route : ProjetMotion.
 * Sans mouvement : le véhicule est au bout de la route, tous les panneaux sont levés.
 */
export default function ProjetPhare({ paused }: { paused: boolean }) {
  const { t, lang, localized } = useLocalize();
  const section = useRef<HTMLElement>(null);
  const scene = useRef<HTMLDivElement>(null);
  const proche = useApproche(section, '150%');
  const reduit = useMediaQuery('(prefers-reduced-motion: reduce)');

  // La route, d'après la scène réelle, à chaque changement de taille (une fois prêt, ProjetMotion la redessine lui-même)
  useEffect(() => {
    const el = scene.current;
    if (!proche || !el) return;
    const draw = () => {
      if (!el.hasAttribute('data-pret')) tracerRoute(el);
    };
    if (typeof ResizeObserver === 'undefined') {
      draw();
      return;
    }
    const observer = new ResizeObserver(draw);
    observer.observe(el);
    return () => observer.disconnect();
  }, [proche, lang]);

  if (!PROJET) return null;
  const projet = localized(PROJET, `accueil.contenu.projets.${PROJET.id}`);
  const titre = [`${projet.titre} —`, ...projet.accroche.split('\n').map((l) => `<accent>${l}</accent>`)];

  return (
    <section ref={section} id="projet" className="ac-projet" aria-labelledby="ac-projet-titre">
      <div className="container-page ac-projet-grille">
        <Entree className="ac-projet-texte">
          <p className="ac-surtitre ac-app">{projet.surtitre}</p>
          <h2 id="ac-projet-titre" className="ac-h2">
            <Lignes lignes={titre} />
          </h2>
          <p className="ac-paragraphe ac-app" style={delai(0.35)}>
            {projet.texte}
          </p>
          <div className="ac-projet-actions ac-app" style={delai(0.5)}>
            <DonateButton to={projet.lienSoutenir} size="lg">
              {t('accueil.projet.soutenir')}
            </DonateButton>
            <Link to={projet.lienEnSavoirPlus} className="ac-lien">
              <span>{t('accueil.projet.enSavoirPlus')}</span>
              <ArrowRight aria-hidden="true" className="ac-fleche" />
            </Link>
          </div>
        </Entree>

        {PHOTO && (
          <Entree className="ac-ticket-place">
            <figure className="ac-ticket">
              <div className="ac-ticket-carte">
                <div className="ac-ticket-photo">
                  <Photo photo={PHOTO} sizes="(min-width: 1024px) 32rem, 92vw" fit="cover" radius="none" style={projet.cadrage ? { objectPosition: projet.cadrage } : undefined} />
                </div>
                <figcaption className="ac-ticket-souche">{photoCaption(PHOTO)}</figcaption>
              </div>
            </figure>
            <p className="ac-tampon" data-long={t('accueil.projet.tampon').length > 8 || undefined}>{t('accueil.projet.tampon')}</p>
          </Entree>
        )}
      </div>

      <div className="ac-paysage">
        <svg className="ac-colline ac-colline-1" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-ac-defile="22">
          <path d="M0 120 C140 60 260 40 400 92 C520 136 620 150 760 92 C900 34 1040 22 1180 76 C1290 118 1370 110 1440 84 V440 H0 Z" />
        </svg>
        <svg className="ac-colline ac-colline-2" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-ac-defile="12">
          <path d="M0 214 C120 176 250 150 380 178 C540 212 640 244 800 206 C960 168 1080 132 1230 168 C1330 192 1390 196 1440 186 V440 H0 Z" />
        </svg>
        <svg className="ac-colline ac-colline-3" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden="true" focusable="false" data-ac-defile="4">
          <path d="M0 268 C150 238 290 226 450 258 C620 292 720 296 880 264 C1040 232 1190 220 1320 246 C1380 258 1410 262 1440 262 V440 H0 Z" />
        </svg>
        <div ref={scene} className="ac-route" data-icone={projet.icone}>
          <svg className="ac-route-svg" fill="none" aria-hidden="true" focusable="false">
            <path className="ac-route-bande" />
            <path className="ac-route-ligne" />
          </svg>
          <ol key={lang} className="ac-jalons">
            {projet.jalons.map((jalon, i) => (
              <li key={i} className="ac-jalon">
                <div className="ac-panneau">
                  <div className="ac-panneau-plaque">
                    {jalon.valeur && (
                      <span className="ac-panneau-valeur">
                        <Compteur texte={jalon.valeur} />
                        <span className="sr-only">{jalon.valeur} </span>
                      </span>
                    )}
                    <span className="ac-panneau-libelle">{jalon.libelle}</span>
                  </div>
                  <span className="ac-panneau-poteau" aria-hidden="true" />
                </div>
              </li>
            ))}
          </ol>
          <div className="ac-vehicule" aria-hidden="true">
            {projet.icone === 'clinique' ? <Fourgonnette /> : <Livre />}
          </div>
        </div>
      </div>

      {proche && !reduit && (
        <AfterFirstDisplay>
          <ProjetMotion scope={scene} lang={lang} paused={paused} />
        </AfterFirstDisplay>
      )}
    </section>
  );
}
