import { lazy, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Temoignage } from '../../data/accueil-temoignages';
import { AfterFirstDisplay } from '../../effects/DeferredMotion';
import { useLocalize } from '../../lib/localize';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { cn } from '../../lib/utils';
import { CarteTemoignage, CarteVierge } from './CarteTemoignage';
import Entree from './Entree';
import { useApproche } from './useApproche';

/** La citation ligne par ligne (SplitText), chargée quand le paquet approche */
const CitationMotion = lazy(() => import('./CitationMotion'));

/** Trois cartes au moins : le paquet se complète de cartes qui invitent à raconter son parcours */
const MINIMUM = 3;
/** Glisser la carte du dessus au-delà de … px la change ; en dessous, elle revient */
const SEUIL = 80;

/**
 * Paquet de cartes (lot 11.4). La carte du dessus est droite, les deux suivantes dépassent derrière elle.
 * - Suivant : elle part à gauche en tournant, les autres avancent ; précédent : l'inverse. Glisser (souris, doigt) aussi.
 *   Mouvement : CSS (accueil.css) ; la position de chaque carte est dans data-pos. Aucun défilement automatique.
 * - Accessibilité : région « carrousel » ; seule la carte du dessus est lisible (les autres aria-hidden, inert) ; flèches
 *   gauche et droite du clavier quand le focus est dans le paquet ; « Témoignage 2 sur 3 » est annoncé.
 */
export default function Paquet({ temoignages }: { temoignages: Temoignage[] }) {
  const { t, lang } = useLocalize();
  const region = useRef<HTMLDivElement>(null);
  const reduit = useMediaQuery('(prefers-reduced-motion: reduce)');
  const proche = useApproche(region, '100%');
  const cartes: (Temoignage | null)[] = [...temoignages, ...Array<null>(Math.max(0, MINIMUM - temoignages.length)).fill(null)];
  const total = cartes.length;
  const [dessus, setDessus] = useState(0);
  /** Carte qui part (suivant) puis reparaît au fond, ou qui arrive (précédent), le temps de son animation */
  const [mobile, setMobile] = useState<{ carte: number; sens: 'part' | 'fond' | 'arrive' } | null>(null);
  const [annonce, setAnnonce] = useState('');

  const aller = (sens: 1 | -1) => {
    const prochaine = (dessus + sens + total) % total;
    if (!reduit) setMobile(sens === 1 ? { carte: dessus, sens: 'part' } : { carte: prochaine, sens: 'arrive' });
    setDessus(prochaine);
    setAnnonce(t('accueil.parcours.annonce', { n: prochaine + 1, total }));
  };

  const auClavier = (event: KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    aller(event.key === 'ArrowRight' ? 1 : -1);
  };

  // Glisser : la carte suit le doigt ou la souris (--dx), sans rendu React ; le lien d'une carte reste cliquable
  const glisse = useRef<{ id: number; x: number; tire: boolean } | null>(null);
  const poser = (el: HTMLElement, dx: number) => {
    el.style.setProperty('--dx', `${dx}px`);
    el.style.setProperty('--dr', `${dx * 0.04}deg`);
  };
  const debut = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    glisse.current = { id: event.pointerId, x: event.clientX, tire: false };
  };
  const bouge = (event: PointerEvent<HTMLDivElement>) => {
    const g = glisse.current;
    if (!g || g.id !== event.pointerId) return;
    const dx = event.clientX - g.x;
    if (!g.tire) {
      if (Math.abs(dx) < 6) return;
      g.tire = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add('is-tiree');
    }
    poser(event.currentTarget, dx);
  };
  const fin = (event: PointerEvent<HTMLDivElement>) => {
    const g = glisse.current;
    if (!g || g.id !== event.pointerId) return;
    glisse.current = null;
    if (!g.tire) return;
    const el = event.currentTarget;
    const dx = event.clientX - g.x;
    el.classList.remove('is-tiree');
    if (event.type === 'pointercancel' || Math.abs(dx) < SEUIL) {
      poser(el, 0);
      return;
    }
    // Vers la gauche : la carte continue son chemin depuis le doigt ; vers la droite : elle reprend sa place, la précédente revient
    if (dx > 0 || reduit) poser(el, 0);
    aller(dx < 0 ? 1 : -1);
  };
  const apresMouvement = (carte: number, el: HTMLElement) => {
    poser(el, 0);
    setMobile((m) => (m?.carte !== carte ? m : m.sens === 'part' ? { carte, sens: 'fond' } : null));
  };

  return (
    <div ref={region} className="ac-paquet-place" role="region" aria-roledescription={t('accueil.parcours.role')} aria-label={t('accueil.parcours.region')} onKeyDown={auClavier}>
      <Entree className="ac-paquet-entree">
        <div className={cn('ac-paquet', annonce && 'is-joue')} tabIndex={0} aria-label={t('accueil.parcours.position', { n: dessus + 1, total })} role="group">
          {cartes.map((temoignage, i) => {
            const pos = (i - dessus + total) % total;
            const active = pos === 0;
            const part = mobile?.carte === i && mobile.sens === 'part';
            const arrive = mobile?.carte === i && mobile.sens === 'arrive';
            const fond = mobile?.carte === i && mobile.sens === 'fond';
            return (
              <div
                key={temoignage?.id ?? `vierge-${i}`}
                className={cn('ac-temoin', part && 'is-depart', arrive && 'is-arrivee', fond && 'is-fond')}
                data-pos={Math.min(pos, 3)}
                style={{ '--pos': pos, zIndex: part ? total + 1 : total - pos } as CSSProperties}
                role="group"
                aria-label={t('accueil.parcours.position', { n: i + 1, total })}
                aria-hidden={!active || undefined}
                inert={!active}
                onPointerDown={active ? debut : undefined}
                onPointerMove={active ? bouge : undefined}
                onPointerUp={active ? fin : undefined}
                onPointerCancel={active ? fin : undefined}
                onAnimationEnd={(event) => {
                  if (event.target === event.currentTarget && (part || arrive || fond)) apresMouvement(i, event.currentTarget);
                }}
              >
                {temoignage ? <CarteTemoignage temoignage={temoignage} /> : <CarteVierge invite />}
              </div>
            );
          })}
        </div>
      </Entree>
      <div className="ac-paquet-commandes">
        <button type="button" className="ac-rond-bouton" onClick={() => aller(-1)} aria-label={t('accueil.parcours.precedent')}>
          <ChevronLeft aria-hidden="true" />
        </button>
        <p className="ac-paquet-indicateur" aria-hidden="true">
          {dessus + 1} / {total}
        </p>
        <button type="button" className="ac-rond-bouton" onClick={() => aller(1)} aria-label={t('accueil.parcours.suivant')}>
          <ChevronRight aria-hidden="true" />
        </button>
      </div>
      <p className="sr-only" role="status">
        {annonce}
      </p>
      {proche && !reduit && (
        <AfterFirstDisplay>
          <CitationMotion scope={region} dessus={dessus} lang={lang} />
        </AfterFirstDisplay>
      )}
    </div>
  );
}

/** Sans témoignage confirmé : le même paquet, trois cartes vierges, pour l'œil seulement */
export function PaquetVierge() {
  return (
    <div className="ac-paquet-place" aria-hidden="true">
      <Entree className="ac-paquet-entree">
        <div className="ac-paquet">
          {[0, 1, 2].map((pos) => (
            <div key={pos} className="ac-temoin ac-temoin-vierge" data-pos={pos} style={{ '--pos': pos, zIndex: 3 - pos } as CSSProperties}>
              <CarteVierge />
            </div>
          ))}
        </div>
      </Entree>
    </div>
  );
}
