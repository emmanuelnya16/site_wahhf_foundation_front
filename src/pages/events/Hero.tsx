import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Clock, MapPin, Sparkles, Ticket } from 'lucide-react';
import type { Event, EventStatus } from '../../data/events';
import Photo from '../../components/wahhf/Photo';
import { WAHHF_LOGO_URL } from '../../services/api';
import { eventDate, eventHours, eventPhoto, isShown, splitAccent } from '../../lib/events';
import { CameroonFlag, EvButton, Lines } from './ui';
import { Confetti } from './motion';

/** Décalage d'entrée d'un bloc du hero (keyframes « entree », src/styles/events-motion.css) */
const delay = (s: number) => ({ '--delai': `${s}s` }) as React.CSSProperties;

/** Fond commun aux heros des pages Événements : grille de 56 px masquée et trois taches (soleil, forêt, sauge) */
export function HeroBackdrop({ children }: { children?: ReactNode }) {
  return (
    <div aria-hidden="true">
      <div className="ev-grille" />
      <div className="ev-tache ev-tache-soleil" />
      <div className="ev-tache ev-tache-foret" />
      <div className="ev-tache ev-tache-sauge" />
      {children}
    </div>
  );
}

/** Titre avec le mot accent souligné d'un trait soleil (animé à l'étape 3) */
export function AccentTitle({ title, accent, className }: { title: string; accent: string; className: string }) {
  const [before, word, after] = splitAccent(title, accent);
  return (
    <h1 className={className}>
      <Lines text={before} />
      {word && <span className="ev-accent">{word}</span>}
      <Lines text={after} />
    </h1>
  );
}

/**
 * Bouton d'inscription : un lien quand l'adresse est connue ; sinon, une pastille soleil (sans flèche ni reflet) qui
 * dit « Inscriptions annoncées très bientôt » : jamais un lien vers nulle part.
 */
export function RegisterAction({ href, label, variant, className }: { href: string | null; label: string; variant: 'soleil' | 'nuit'; className?: string }) {
  const { t } = useTranslation();
  if (href) {
    return (
      <EvButton to={href} variant={variant} arrow className={className}>
        {label}
      </EvButton>
    );
  }
  return (
    <p className={`ev-btn ev-btn-${variant} ev-btn-bientot`}>
      <Clock aria-hidden="true" className="ev-btn-fleche" />
      <span>{t('events.faits.inscriptionBientot')}</span>
    </p>
  );
}

/**
 * Hero de la fiche (référence : rtg-01) : pastille, h1 avec mot accent, accroche, deux boutons, ligne d'infos ; à
 * droite, photo 512 × 640 (rayon 40 px) avec pastille logo, panneau lieu penché et liseré bicolore forêt / soleil.
 */
export default function Hero({
  event,
  status,
  programAnchor,
  photosHref,
  controls,
}: {
  event: Event;
  status: EventStatus;
  programAnchor: string | null;
  photosHref: string | null;
  /** Bouton « Mettre les animations en pause » (étape 3) */
  controls?: ReactNode;
}) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const photo = eventPhoto(event.photoHero);
  const upcoming = status === 'a-venir';
  const city = isShown(event.ville) ? event.ville : null;
  const place = [event.lieu, city ?? (event.lieu ? null : t('events.faits.villeBientot')), event.pays].filter(Boolean).join(', ');
  const hours = eventHours(event, lang);
  const register = upcoming && isShown(event.lienInscription) ? event.lienInscription : null;
  const hero = event.sections?.hero;

  return (
    <section className="ev-hero" aria-labelledby="ev-titre" data-ev-zone="">
      <HeroBackdrop>
        <Confetti />
      </HeroBackdrop>
      <div className="ev-container ev-hero-grid">
        <div className="relative grid justify-items-start gap-7">
          <p className="ev-pastille ev-entree" style={delay(0)}>
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            {event.pastille && isShown(event.pastille.texte) ? (
              <span lang={event.pastille.lang}>{event.pastille.texte}</span>
            ) : upcoming ? (
              t('events.hero.badgeUpcoming')
            ) : (
              t('events.hero.badgePast')
            )}
          </p>
          <div id="ev-titre" className="ev-entree-titre" style={delay(0.08)}>
            <AccentTitle title={event.titre} accent={event.motAccent} className="ev-h1" />
          </div>
          {isShown(event.accroche) && (
            <p className="ev-lead ev-entree" style={delay(0.16)}>
              {event.accroche}
            </p>
          )}
          <div className="ev-entree flex flex-wrap items-center gap-4" style={delay(0.24)}>
            {upcoming && <RegisterAction href={register} label={hero?.action ?? t('events.hero.register')} variant="soleil" className="ev-btn-reflet" />}
            {!upcoming && photosHref && (
              <EvButton to={photosHref} variant="soleil" arrow className="ev-btn-reflet">
                {t('events.hero.photos')}
              </EvButton>
            )}
            {programAnchor && (
              <EvButton to={programAnchor} variant="contour">
                {hero?.action2 ?? t('events.hero.program')}
              </EvButton>
            )}
          </div>
          <ul className="ev-infos ev-entree" style={delay(0.32)}>
            <li>
              <CalendarDays aria-hidden="true" />
              <span>
                {eventDate(event, lang) ?? t('events.faits.dateBientot')}
                {hours && <> · {hours}</>}
              </span>
            </li>
            <li>
              <MapPin aria-hidden="true" />
              <span>{place}</span>
            </li>
            {upcoming && event.placesRestantes !== null && (
              <li className="ev-places">
                <Ticket aria-hidden="true" />
                <span>{t('events.hero.placesLeft', { count: event.placesRestantes })}</span>
              </li>
            )}
          </ul>
          {controls}
        </div>

        {photo && (
          <div className="ev-visuel ev-entree" style={delay(0.1)}>
            <div className="ev-photo">
              <Photo photo={photo} sizes="(min-width: 1024px) 32rem, (min-width: 640px) 32rem, calc(100vw - 2.5rem)" priority fit="cover" radius="none" />
            </div>
            <span className="ev-lisere" aria-hidden="true">
              <span />
              <span />
            </span>
            <span className="ev-logo-rond ev-flotte">
              <img src={WAHHF_LOGO_URL} alt="" width={68} height={68} />
            </span>
            {/* Panneau lieu : la ville si elle est confirmée, sinon le lieu ; le pays avec son drapeau */}
            <p className="ev-panneau">
              <span className="ev-panneau-epingle" aria-hidden="true">
                <MapPin className="h-6 w-6" />
              </span>
              <span>
                <span className="ev-panneau-label">{hero?.etiquette ?? (upcoming ? t('events.hero.venueUpcoming') : t('events.hero.venuePast'))}</span>
                {city ?? event.lieu ? (
                  <span className="ev-panneau-ville">{city ?? event.lieu}</span>
                ) : (
                  <span className="ev-panneau-ville is-bientot">{t('events.faits.villeBientot')}</span>
                )}
                <span className="ev-panneau-pays">
                  <CameroonFlag />
                  {event.pays}
                </span>
              </span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
