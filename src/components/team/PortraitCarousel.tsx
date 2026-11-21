import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronDown, ChevronUp, Pause, Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { TeamMember } from '../../data/team';
import { displayName, displayRole, memberPortrait } from '../../lib/team';
import { useMediaQuery } from '../../lib/useMediaQuery';
import Photo from '../wahhf/Photo';

/** Une carte monte d'un cran toutes les 3 secondes. */
const INTERVAL_MS = 3000;

/** Rang d'une carte par rapport à la carte du centre : 0 au centre, -1 au-dessus, 1 en dessous ; ±2 cachées. */
function offset(index: number, active: number, count: number) {
  let d = (((index - active) % count) + count) % count;
  if (d > count / 2) d -= count;
  return Math.max(-2, Math.min(2, d));
}

/** Boucle sans saut : la liste est répétée jusqu'à 6 cartes au moins (deux visibles autour du centre, deux en attente). */
function loop<T>(items: T[]): T[] {
  if (items.length === 0) return [];
  const out: T[] = [];
  while (out.length < 6) out.push(...items);
  return out;
}

/**
 * Colonne de portraits du hero de « Qui sommes-nous » (lot 7.7), pilotée par src/data/team.ts.
 * - La carte du centre est grande, avec le nom et le rôle en bas à gauche ; ses voisines (échelle 0,75) sont décalées
 *   vers la droite, un peu derrière elle, coupées par le haut et le bas de la zone qui s'efface dans le fond.
 * - Toutes les 3 s, la colonne monte d'un cran (700 ms) ; positions par transform et opacité, en CSS, pilotées par
 *   l'index React : rien ne déclenche de mise en page. Le nom et le rôle arrivent une fois la carte en place.
 * - Pause automatique : survol, focus dans la zone, section hors de l'écran, onglet caché ; bouton « Mettre en pause /
 *   Reprendre » (WCAG 2.2.2) ; boutons haut et bas pour avancer à la main.
 * - Les cartes sont décoratives (aria-hidden) : l'organigramme dessous donne la même information en entier. Seuls les
 *   boutons sont focalisables ; pas de région aria-live.
 * - Mouvement réduit : ni défilement automatique ni bouton pause, trois cartes fixes, changement instantané.
 */
export default function PortraitCarousel({ members }: { members: TeamMember[] }) {
  const { t } = useTranslation();
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const cards = loop(members.filter((m) => memberPortrait(m)));
  const count = cards.length;
  const [active, setActive] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const zoneRef = useRef<HTMLDivElement>(null);

  const running = !reduce && !userPaused && !hovered && !focused && inView && pageVisible && count > 1;

  // Section hors de l'écran : pause (et rien ne tourne)
  useEffect(() => {
    const zone = zoneRef.current;
    if (!zone || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0 });
    observer.observe(zone);
    return () => observer.disconnect();
  }, []);

  // Onglet caché : pause
  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Un cran toutes les 3 s tant que rien ne demande la pause ; un pas à la main relance le compte
  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => setActive((a) => a + 1), INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [running, active]);

  if (count === 0) return null;
  const step = (delta: number) => setActive((a) => a + delta);

  return (
    <div
      ref={zoneRef}
      role="group"
      aria-roledescription={t('equipe.carousel.roleDescription')}
      aria-label={t('equipe.carousel.label')}
      className="pc"
      // Focus au clavier dans la zone : pause (un clic de souris sur un bouton ne la déclenche pas)
      onFocus={(event) => setFocused((event.target as HTMLElement).matches(':focus-visible'))}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      {/* Survol des portraits (pas des boutons, pour que « Reprendre » reprenne aussitôt) : pause */}
      <div
        className="pc-stage"
        aria-hidden="true"
        onPointerEnter={(event) => event.pointerType === 'mouse' && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        {cards.map((member, i) => {
          const d = offset(i, active, count);
          const portrait = memberPortrait(member)!;
          const vars = { '--d': d, '--side': d === 0 ? 0 : 1, '--s': d === 0 ? 1 : 0.75 } as CSSProperties;
          return (
            <div key={`${member.id}-${i}`} className="pc-card" data-pos={d} style={vars}>
              <Photo
                photo={portrait}
                sizes="(min-width: 768px) 17rem, 14rem"
                priority={i === 0}
                fit="cover"
                radius="none"
                decorative
              />
              <div className="pc-caption">
                <p className="pc-name">{displayName(member)}</p>
                {displayRole(member) && <p className="pc-role">{displayRole(member)}</p>}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pc-controls">
        <button type="button" className="pc-button" onClick={() => step(-1)}>
          <ChevronUp aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">{t('equipe.carousel.previous')}</span>
        </button>
        {!reduce && (
          <button type="button" className="pc-button pc-button-text" onClick={() => setUserPaused((p) => !p)}>
            {userPaused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
            {userPaused ? t('equipe.carousel.resume') : t('equipe.carousel.pause')}
          </button>
        )}
        <button type="button" className="pc-button" onClick={() => step(1)}>
          <ChevronDown aria-hidden="true" className="h-5 w-5" />
          <span className="sr-only">{t('equipe.carousel.next')}</span>
        </button>
      </div>
    </div>
  );
}
