import { ElementType, ReactNode, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
// framer-motion : le même paquet que motion/react (14.14), importé sans passer par le fichier d'entrée de motion/react,
// qui embarque toujours motion.div complet : le premier chargement n'a que m, AnimatePresence et LazyMotion (lot 7).
import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import { PrimaryButton, DonateButton } from '../../components/wahhf/Buttons';
import Fil from '../../components/wahhf/Fil';
import { HeroVideoBackground, HeroVideoConsent, HeroVideoToggle, useHeroVideo } from '../../components/wahhf/HeroVideoBackground';
import { HERO_FILM, HERO_POSTER, heroFilmUrl } from '../../config/heroVideo';
import { getVideoConsent } from '../../lib/consent';
import { useDialog } from '../../lib/useDialog';
import { useMotionEngineReady } from '../../lib/motionEngine';
import { DURATION, EASE_OUT } from '../../lib/motionTokens';
import LineReveal from '../../effects/LineReveal';
import { AfterFirstDisplay, HeroMotion } from '../../effects/DeferredMotion';

/**
 * 1. Hero de l'accueil (contrat §6 et §7 ; décision de la cliente du 16/11 : la vidéo en fond).
 *
 * - Fond : image d'attente nette (élément LCP, préchargée, fetchpriority high) ; portrait sur téléphone (<picture>,
 *   ACC-07) ; la vidéo WAHHF par-dessus, sur ordinateur seulement et avec l'accord du visiteur (HeroVideoBackground).
 * - Voile nuit (.hero-veil) : horizontal dès 768 px, dense derrière la colonne de texte ; du bas vers le haut sur
 *   téléphone. Texte et boutons visibles dès le premier rendu (PERF-01) : rien n'attend la vidéo ni une animation.
 * - Arrivée (contrat §10, moment 1, lot 7), en CSS pour jouer dès le premier affichage : le titre monte ligne par
 *   ligne derrière un masque (LineReveal), puis la phrase, les boutons et le lien du film en fondu court (.hero-fade),
 *   puis le fil (soleil sur le voile), qui se dessine ; absent en mouvement réduit. L'image d'attente (LCP) ne bouge pas.
 * - Au défilement, sur ordinateur (HeroMotion, GSAP chargé après le premier affichage) : parallaxe de 8 % au plus de
 *   la vidéo ou de l'image [data-hero-media] et voile qui s'assombrit [data-hero-dim].
 * - Deux portes : le test d'allemand (soleil) et le don (cœur plein avec liseré). Lien discret vers le film avec
 *   le son, ouvert dans une fenêtre (fondu de 0,3 s) ; YouTube n'est contacté qu'après « Lire le film sur YouTube »,
 *   sauf si le visiteur a déjà activé la vidéo.
 * - Hauteur : l'en-tête et le hero occupent 88 svh sur ordinateur (la section suivante se devine), 94 svh sur
 *   téléphone, texte en bas. Pas de sur-titre, pas d'IROKO, pas de « Défiler », pas de rideau.
 */
export default function HeroSection() {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const video = useHeroVideo(heroRef);

  // Film avec le son, à la demande
  const [filmOpen, setFilmOpen] = useState(false);
  const [filmLoaded, setFilmLoaded] = useState(false);
  const filmDialogRef = useRef<HTMLDivElement>(null);
  const filmCloseRef = useRef<HTMLButtonElement>(null);
  const filmLinkRef = useRef<HTMLButtonElement>(null);
  useDialog(filmOpen, filmDialogRef, () => setFilmOpen(false), { initialFocusRef: filmCloseRef, returnFocusRef: filmLinkRef });
  // Moteur de Motion chargé après le premier affichage : sans lui, fondu CSS (.dialog-fallback) et fermeture immédiate.
  // Le mode reste le même tant que la fenêtre est ouverte.
  const engineReady = useMotionEngineReady();
  const filmWithMotion = useRef(engineReady);
  if (!filmOpen) filmWithMotion.current = engineReady;
  const withMotion = filmWithMotion.current;
  const FilmPanel = (withMotion ? m.div : 'div') as ElementType;
  const openFilm = () => {
    setFilmLoaded(getVideoConsent());
    setFilmOpen(true);
  };

  return (
    <>
    <section
      id="accueil"
      ref={heroRef}
      aria-labelledby="hero-titre"
      className="surface-green relative isolate mt-(--header-height) flex min-h-[calc(94svh-var(--header-height))] flex-col justify-end overflow-hidden bg-surface-inverse text-text-on-inverse md:min-h-[calc(88svh-var(--header-height))] md:justify-center"
    >
      {/* Fond : image d'attente, vidéo, voile (décoratifs) */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {/* Image et vidéo ensemble : c'est ce calque que la parallaxe déplace (jamais l'image seule) */}
        <div data-hero-media className="absolute inset-0">
        <picture>
          <source
            media="(max-width: 47.99rem)"
            type="image/webp"
            srcSet={HERO_POSTER.portraitSrcSet}
            sizes="100vw"
            width={HERO_POSTER.portraitWidth}
            height={HERO_POSTER.portraitHeight}
          />
          <img
            src={HERO_POSTER.src}
            srcSet={HERO_POSTER.srcSet}
            sizes="100vw"
            width={HERO_POSTER.width}
            height={HERO_POSTER.height}
            alt=""
            fetchPriority="high"
            className="h-full w-full object-cover"
          />
        </picture>
        <HeroVideoBackground video={video} />
        </div>
        <div className="hero-veil absolute inset-0" />
        {/* Voile qui s'assombrit au défilement (ordinateur) ; transparent au repos */}
        <div data-hero-dim className="absolute inset-0 bg-nuit opacity-0" />
      </div>

      {/* Enveloppe pleine largeur : le container (content-box, marges auto) ne s'étire pas seul dans une colonne flex */}
      <div className="w-full">
      <div className="container-page py-10">
        <div className="max-w-(--hero-text-width)">
          <LineReveal id="hero-titre" text={t('hero.headline')} className="text-display text-text-on-inverse text-balance" />

          {/* Le fil arrive en dernier : ses libellés en fondu à 0,85 s, puis le trait se dessine à 0,95 s */}
          <Fil
            start={{ id: 'cameroun', label: t('hero.filStart') }}
            end={{ id: 'europe', label: t('hero.filEnd') }}
            drawOnce
            onMedia
            className="hero-fade [--hero-fade-delay:0.85s] [--fil-draw-delay:0.95s] mt-5 max-w-sm motion-reduce:hidden"
          />

          <p className="hero-fade [--hero-fade-delay:0.55s] mt-5 text-body text-text-on-inverse max-w-[52ch]">{t('hero.lead')}</p>

          <div className="hero-fade [--hero-fade-delay:0.65s] mt-7 flex flex-col sm:flex-row sm:flex-wrap gap-3">
            <PrimaryButton to="/mobilite-langues/academie#test-niveau" onInverse size="lg">
              {t('hero.ctaTest')}
            </PrimaryButton>
            {/* Sur la vidéo, le liseré brume à 60 % ne détache le bouton qu'à 3,8:1 au pire pixel : liseré brume plein (7,8:1) */}
            <DonateButton size="lg" className="[box-shadow:inset_0_0_0_1px_var(--color-brume)]">
              {t('nav.donate')}
            </DonateButton>
          </div>

          <button
            ref={filmLinkRef}
            type="button"
            onClick={openFilm}
            aria-haspopup="dialog"
            className="hero-fade [--hero-fade-delay:0.75s] mt-3 inline-flex min-h-11 items-center text-meta text-text-on-inverse underline underline-offset-4 decoration-1 transition-colors duration-(--dur-fast) hover:decoration-2 hover:text-link-on-inverse cursor-pointer"
          >
            {t('hero.filmLink')}
          </button>
        </div>
      </div>
      </div>

      {/* Vidéo de fond (ordinateur) : accord, puis bouton Pause ; en haut à droite, sur la marge droite du container
          (en bas, il croiserait la bulle WhatsApp, fixée en bas à droite de l'écran) */}
      <div className="absolute top-6 right-[max(var(--gutter),calc((100%-var(--container-page))/2))] hidden md:flex flex-col items-end gap-2">
        <HeroVideoConsent video={video} label={t('hero.videoConsent')} note={t('hero.videoConsentNote')} />
        <HeroVideoToggle video={video} pauseLabel={t('hero.videoPause')} playLabel={t('hero.videoPlay')} />
      </div>

      <AfterFirstDisplay>
        <HeroMotion scope={heroRef} />
      </AfterFirstDisplay>
    </section>

      {/* Film avec le son : fenêtre hors de la section (le hero isole son empilement, elle passerait sous l'en-tête).
          Échap, focus gardé puis rendu au lien, page figée dessous. */}
      <MaybePresence enabled={withMotion}>
        {filmOpen && (
          <FilmPanel
            key="film"
            ref={filmDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('hero.filmFrameTitle')}
            tabIndex={-1}
            data-lenis-prevent
            className={`fixed inset-0 z-(--z-modal) flex items-center justify-center p-4 sm:p-8${withMotion ? '' : ' dialog-fallback'}`}
            {...(withMotion
              ? {
                  initial: { opacity: 0 },
                  animate: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE_OUT } },
                  exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE_OUT } },
                }
              : {})}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-surface-inverse/95" onClick={() => setFilmOpen(false)} />
            <div className="surface-green relative w-full max-w-5xl overflow-hidden rounded-card bg-surface-inverse text-text-on-inverse">
              <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border-subtle-on-inverse">
                <p className="text-body font-bold">{t('hero.filmTitle')}</p>
                <button
                  ref={filmCloseRef}
                  type="button"
                  onClick={() => setFilmOpen(false)}
                  aria-label={t('hero.filmClose')}
                  className="w-11 h-11 shrink-0 rounded-pill border border-border-on-inverse inline-flex items-center justify-center transition-colors duration-(--dur-fast) hover:bg-action-on-inverse hover:text-on-action-on-inverse cursor-pointer"
                >
                  <X aria-hidden="true" className="w-5 h-5" />
                </button>
              </div>
              <div className="relative aspect-video w-full bg-surface-inverse">
                {filmLoaded ? (
                  <iframe
                    src={heroFilmUrl()}
                    title={t('hero.filmFrameTitle')}
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                ) : (
                  <>
                    <img
                      src={HERO_POSTER.src}
                      srcSet={HERO_POSTER.srcSet}
                      sizes="(min-width: 64rem) 64rem, 100vw"
                      width={HERO_POSTER.width}
                      height={HERO_POSTER.height}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-40"
                    />
                    <div className="absolute inset-x-4 top-1/2 mx-auto flex max-w-md -translate-y-1/2 flex-col items-center gap-3 rounded-card bg-surface-inverse/90 p-5 text-center">
                      <PrimaryButton onInverse onClick={() => setFilmLoaded(true)}>
                        {t('hero.filmPlay')}
                      </PrimaryButton>
                      <p className="text-meta text-text-on-inverse max-w-md">{t('hero.filmNote')}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </FilmPanel>
        )}
      </MaybePresence>
    </>
  );
}

/** AnimatePresence seulement quand le moteur de Motion est là (sortie animée) ; sinon, rendu direct. */
function MaybePresence({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  return enabled ? <AnimatePresence>{children}</AnimatePresence> : <>{children}</>;
}
