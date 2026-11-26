import { useRef, useState, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import { HERO_FILM, HERO_POSTER, YOUTUBE_ORIGIN } from '../../config/heroVideo';
import { getVideoConsent } from '../../lib/consent';
import { langOf } from '../../lib/localize';
import { useDialog } from '../../lib/useDialog';

/** Le film avec le son, sous-titres YouTube dans la langue de la page s'il en a (cc_load_policy) */
function urlFilm(lang: string) {
  const code = langOf(lang);
  const params = new URLSearchParams({ autoplay: '1', rel: '0', playsinline: '1', modestbranding: '1', hl: code, cc_lang_pref: code, cc_load_policy: '1' });
  return `${YOUTUBE_ORIGIN}/embed/${HERO_FILM.id}?${params}`;
}

/**
 * Fenêtre du film avec le son (lot 11.9) : la même que celle du hero de / (src/pages/home/HeroSection.tsx, inchangé,
 * où elle n'est pas un composant à part), mêmes textes (hero.film…) et même règle : YouTube n'est contacté qu'après
 * « Lire le film sur YouTube », sauf si le visiteur a déjà accepté la vidéo. En plus : les sous-titres YouTube.
 * Échap, focus gardé dans la fenêtre puis rendu au bouton qui l'a ouverte, page figée dessous (useDialog).
 */
export default function FilmFenetre({ open, onClose, returnFocusRef }: { open: boolean; onClose: () => void; returnFocusRef: RefObject<HTMLElement | null> }) {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const fermer = useRef<HTMLButtonElement>(null);
  const [charge, setCharge] = useState(false);
  const [ouverture, setOuverture] = useState(open);
  // À chaque ouverture : le lecteur se charge d'emblée seulement si la vidéo est déjà acceptée
  if (open !== ouverture) {
    setOuverture(open);
    if (open) setCharge(getVideoConsent());
  }
  useDialog(open, ref, onClose, { initialFocusRef: fermer, returnFocusRef });
  if (!open) return null;
  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={t('hero.filmFrameTitle')}
      tabIndex={-1}
      data-lenis-prevent
      className="dialog-fallback fixed inset-0 z-(--z-modal) flex items-center justify-center p-4 sm:p-8"
    >
      <div aria-hidden="true" className="absolute inset-0 bg-surface-inverse/95" onClick={onClose} />
      <div className="surface-green relative w-full max-w-5xl overflow-hidden rounded-card bg-surface-inverse text-text-on-inverse">
        <div className="flex items-center justify-between gap-4 px-5 py-3 border-b border-border-subtle-on-inverse">
          <p className="text-body font-bold">{t('hero.filmTitle')}</p>
          <button
            ref={fermer}
            type="button"
            onClick={onClose}
            aria-label={t('hero.filmClose')}
            className="w-11 h-11 shrink-0 rounded-pill border border-border-on-inverse inline-flex items-center justify-center transition-colors duration-(--dur-fast) hover:bg-action-on-inverse hover:text-on-action-on-inverse cursor-pointer"
          >
            <X aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>
        <div className="relative aspect-video w-full bg-surface-inverse">
          {charge ? (
            <iframe
              src={urlFilm(i18n.language)}
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
                <PrimaryButton onInverse onClick={() => setCharge(true)}>
                  {t('hero.filmPlay')}
                </PrimaryButton>
                <p className="text-meta text-text-on-inverse max-w-md">{t('hero.filmNote')}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
