import { lazy, Suspense, useEffect, useRef, useState, type FocusEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Pause, Play, Volume2 } from 'lucide-react';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { cn } from '../../lib/utils';
import { FILM_EXTRAIT } from './filmExtrait';
import FilmFenetre from './FilmFenetre';
import Lignes from './Lignes';
import { useApproche } from './useApproche';

/** La timeline au défilement : un fichier à part, chargé à l'approche de la section */
const FilmMotion = lazy(() => import('./FilmMotion'));

/** L'affiche du hero de / (WebP, inchangée) et ses copies AVIF (public/film, scripts/encode-film.mjs) */
const AFFICHE = {
  avif: '/film/affiche-film-960.avif 960w, /film/affiche-film-1280.avif 1280w, /film/affiche-film-1920.avif 1920w',
  webp: '/hero/hero-film-t49-960.webp 960w, /hero/hero-film-t49-1280.webp 1280w, /hero/hero-film-t49-1920.webp 1920w',
  portraitAvif: '/film/affiche-film-portrait-456.avif 456w, /film/affiche-film-portrait-608.avif 608w',
  portraitWebp: '/hero/hero-film-t49-portrait-456.webp 456w, /hero/hero-film-t49-portrait-608.webp 608w',
};
const TELEPHONE = '(max-width: 767px)';

/** Économie de données ou réseau lent : la vidéo n'est jamais téléchargée sans un clic */
function economie() {
  const c = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
  return !!c && (!!c.saveData || ['slow-2g', '2g', '3g'].includes(c.effectiveType ?? ''));
}

/**
 * 10. Le film (lot 11.9), sur nuit, entre les événements et l'appel au don.
 * - Défilement (mouvement accepté, pas de pause, pas d'économie de données) : section haute, scène collée (sticky) ;
 *   la carte s'ouvre en plein écran, l'extrait muet y joue, puis elle se referme (FilmMotion). Lecture seulement sur le
 *   plateau ; elle reprend où elle s'était arrêtée ; plus de relance au défilement après une pause demandée.
 * - Sinon : hauteur normale, cadre ouvert, affiche et gros bouton Lecture ; rien ne se charge sans clic.
 * - Le son et le film entier passent toujours par YouTube, après un clic (FilmFenetre).
 * - Sans fichier encore (FILM_EXTRAIT null) : l'affiche et « Regarder le film ».
 */
export default function Film({ paused }: { paused: boolean }) {
  const { t } = useTranslation();
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const boutonSon = useRef<HTMLButtonElement>(null);
  const reduit = useMediaQuery('(prefers-reduced-motion: reduce)');
  const telephone = useMediaQuery(TELEPHONE);
  const [eco] = useState(economie);
  const scrub = !reduit && !paused && !eco;
  const proche = useApproche(section, '100%');

  const sources = FILM_EXTRAIT && (telephone ? FILM_EXTRAIT.telephone : FILM_EXTRAIT.bureau);
  const [plateau, setPlateau] = useState(false);
  const [pauseManuelle, setPauseManuelle] = useState(false);
  const [demande, setDemande] = useState(false);
  const [fenetre, setFenetre] = useState(false);
  const [cache, setCache] = useState(false);
  const [joue, setJoue] = useState(false);
  // Le fichier : à un écran de distance au défilement ; sinon seulement après un clic sur Lecture
  const charger = !!sources && (scrub ? proche : demande);
  const veutJouer = charger && !fenetre && !cache && !pauseManuelle && (scrub ? plateau : demande);

  useEffect(() => {
    const surVisibilite = () => setCache(document.hidden);
    document.addEventListener('visibilitychange', surVisibilite);
    return () => document.removeEventListener('visibilitychange', surVisibilite);
  }, []);
  // Sources posées : on lance le chargement
  useEffect(() => {
    if (charger) video.current?.load();
  }, [charger, sources]);
  useEffect(() => {
    const v = video.current;
    if (!v || !charger) return;
    if (veutJouer) v.play().catch(() => setJoue(false));
    else v.pause();
  }, [veutJouer, charger]);

  const basculer = () => {
    if (joue) {
      setPauseManuelle(true);
    } else {
      setPauseManuelle(false);
      setDemande(true);
    }
  };
  const grandBouton = () => {
    if (!sources) return setFenetre(true);
    setPauseManuelle(false);
    setDemande(true);
  };
  // Clavier : un bouton de la barre reçoit le focus alors que la carte est fermée → on va au plateau, où il est visible
  const surFocus = (event: FocusEvent<HTMLDivElement>) => {
    const s = section.current;
    if (!scrub || plateau || !s || !event.target.matches(':focus-visible')) return;
    const haut = s.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: haut + (s.offsetHeight - window.innerHeight) * 0.52, behavior: 'instant' });
  };

  const titreSon = sources ? t('accueil.film.son') : t('accueil.film.film');
  return (
    <section ref={section} id="film" className={cn('ac-film', scrub && 'is-scrub')} aria-labelledby="ac-film-titre">
      <div className="ac-film-scene">
        {scrub && (
          <>
            <span className="ac-film-place" aria-hidden="true" />
            <span className="ac-film-ombre" aria-hidden="true" />
            <svg className="ac-film-fil" aria-hidden="true" focusable="false">
              <path pathLength={1000} />
            </svg>
          </>
        )}
        <div className="ac-film-entete container-page">
          <p className="ac-surtitre">{t('accueil.film.surtitre')}</p>
          <h2 id="ac-film-titre" className="ac-h2">
            <Lignes lignes={[t('accueil.film.titre')]} />
          </h2>
          <p className="ac-paragraphe">{t('accueil.film.phrase')}</p>
        </div>
        <div className="ac-film-cadre">
          <div className="ac-film-media">
            <picture>
              <source type="image/avif" media={TELEPHONE} srcSet={AFFICHE.portraitAvif} sizes="100vw" />
              <source type="image/webp" media={TELEPHONE} srcSet={AFFICHE.portraitWebp} sizes="100vw" />
              <source type="image/avif" srcSet={AFFICHE.avif} sizes="100vw" />
              <img src="/hero/hero-film-t49-1280.webp" srcSet={AFFICHE.webp} sizes="100vw" width={1920} height={1080} alt="" loading="lazy" decoding="async" />
            </picture>
            {sources && (
              <video
                ref={video}
                muted
                playsInline
                loop
                preload={charger ? 'auto' : 'none'}
                poster={telephone ? '/hero/hero-film-t49-portrait-608.webp' : '/hero/hero-film-t49-1280.webp'}
                aria-label={t('accueil.film.video')}
                onPlay={() => setJoue(true)}
                onPause={() => setJoue(false)}
              >
                {charger && (
                  <>
                    <source src={sources.webm} type="video/webm" />
                    <source src={sources.mp4} type="video/mp4" />
                  </>
                )}
              </video>
            )}
          </div>
          {!scrub && !joue && (
            <button type="button" className="ac-film-grand" onClick={grandBouton}>
              <Play aria-hidden="true" fill="currentColor" />
              <span>{sources ? t('accueil.film.lireExtrait') : t('accueil.film.film')}</span>
            </button>
          )}
          <div className="ac-film-barre" onFocus={surFocus}>
            {sources && (
              <button type="button" className="ac-film-btn" onClick={basculer}>
                {joue ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
                <span>{joue ? t('accueil.film.pause') : t('accueil.film.lecture')}</span>
              </button>
            )}
            <button ref={boutonSon} type="button" className="ac-film-btn ac-film-btn-son" onClick={() => setFenetre(true)}>
              <Volume2 aria-hidden="true" />
              <span>{titreSon}</span>
            </button>
            <span className="ac-film-duree">{t('accueil.film.duree')}</span>
          </div>
        </div>
      </div>
      {scrub && proche && (
        <Suspense fallback={null}>
          <FilmMotion scope={section} onPlateau={setPlateau} />
        </Suspense>
      )}
      <FilmFenetre open={fenetre} onClose={() => setFenetre(false)} returnFocusRef={boutonSon} />
    </section>
  );
}
