import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Images } from 'lucide-react';
import type { Event, EventStatus } from '../../data/events';
import { eventDate, eventHours, timeLeft } from '../../lib/events';
import { EvButton, pad2 } from './ui';

/**
 * Temps restant, une fois par seconde, avec UN seul intervalle : arrêté quand la carte sort de l'écran ou quand
 * l'onglet est caché, relancé (et remis à l'heure) au retour. Valeurs calculées dès le premier rendu.
 */
export function useNow(ref: React.RefObject<HTMLElement | null>) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let timer = 0;
    let inView = true;
    const start = () => {
      if (timer || !inView || document.hidden) return;
      setNow(Date.now());
      timer = window.setInterval(() => setNow(Date.now()), 1000);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = 0;
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(el);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);
    start();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [ref]);
  return now;
}

/** Chiffre qui tombe à chaque changement (keyframes « tombe », étape 3) : la clé change, l'élément est recréé */
function Digit({ value, label }: { value: number; label: string }) {
  const text = pad2(value);
  return (
    <div className="ev-case">
      <span className="ev-chiffre">
        <span key={text} className="ev-tombe">
          {text}
        </span>
      </span>
      <span className="ev-label">{label}</span>
    </div>
  );
}

function Live({ event }: { event: Event }) {
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const now = useNow(ref);
  const left = timeLeft(event, now);
  const start = eventHours(event, i18n.language).split(' – ')[0];
  return (
    <div ref={ref} className="ev-compte">
      <div className="grid gap-2">
        <p className="ev-compte-titre">
          <span className="ev-point ev-ping" aria-hidden="true" />
          {t('events.countdown.label')}
        </p>
        <p className="ev-text pl-[1.625rem] text-meta">
          {t('events.countdown.when', { date: eventDate(event, i18n.language, true, false), time: start })}
        </p>
      </div>
      {/* Les chiffres changent chaque seconde : masqués aux lecteurs d'écran, qui lisent la date écrite à côté */}
      <div className="ev-cases" aria-hidden="true">
        <Digit value={left.days} label={t('events.countdown.days')} />
        <Digit value={left.hours} label={t('events.countdown.hours')} />
        <Digit value={left.minutes} label={t('events.countdown.minutes')} />
        <Digit value={left.seconds} label={t('events.countdown.seconds')} />
      </div>
    </div>
  );
}

/**
 * Compte à rebours (référence : rtg-02) pour un événement à venir ; pour un événement passé, la carte dit « C'était
 * le … » et mène aux photos de la journée.
 */
export default function Countdown({ event, status, photosHref }: { event: Event; status: EventStatus; photosHref: string | null }) {
  const { t, i18n } = useTranslation();
  return (
    <div className="ev-container relative -mt-4 mb-4 lg:-mt-8" data-ev-zone="">
      {status === 'a-venir' ? (
        <Live event={event} />
      ) : (
        <div className="ev-compte ev-compte-passe">
          <div className="grid gap-1">
            <p className="ev-compte-titre">
              <span className="ev-point" aria-hidden="true" />
              {t('events.countdown.past', { date: eventDate(event, i18n.language, false) })}
            </p>
            <p className="ev-text pl-[1.625rem]">{t('events.countdown.pastText')}</p>
          </div>
          {photosHref && (
            <EvButton to={photosHref} variant="nuit" arrow>
              <span className="inline-flex items-center gap-2">
                <Images aria-hidden="true" className="h-5 w-5" />
                {t('events.countdown.photos')}
              </span>
            </EvButton>
          )}
        </div>
      )}
    </div>
  );
}
