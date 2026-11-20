import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Event } from '../../data/events';
import Photo from '../../components/wahhf/Photo';
import { WAHHF_LOGO_URL } from '../../services/api';
import { eventPhoto, isShown, shownItems } from '../../lib/events';
import { cn } from '../../lib/utils';
import { ICONS, SectionHead, pad2 } from './ui';
import { TickerPause } from './motion';
import { useState } from 'react';

/** Organisé par (référence : rtg-02) : libellé à gauche, logos à droite ; un partenaire sans logo s'écrit en texte */
export function Organizers({ event }: { event: Event }) {
  const { t } = useTranslation();
  const orgs = shownItems(event.organisateurs, (o) => [o.nom]);
  if (!orgs.length) return null;
  return (
    <div className="ev-container ev-orga" data-reveal="ev">
      <p className="ev-label">{t('events.organizers.label')}</p>
      <ul>
        {orgs.map((o) => (
          <li key={o.nom}>
            {o.logo && <img src={o.logo === 'wahhf' ? WAHHF_LOGO_URL : o.logo} alt="" width={56} height={56} />}
            {o.url ? (
              <a href={o.url} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                {o.nom}
              </a>
            ) : (
              <span>{o.nom}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Les six domaines de la fondation, en allemand (bandeau, référence : rtg-02) */
export const DOMAINS_DE = ['Bildung', 'Gesundheit', 'Unternehmertum', 'Umwelt', 'Teilhabe', 'Sprache & Mobilität'];

function TickerWords({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul lang="de" aria-hidden={hidden || undefined}>
      {DOMAINS_DE.map((word) => (
        <li key={word} className="ev-bandeau-mot">
          {word}
          <span className="ev-points" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Bandeau soleil penché de -1,5deg : la liste est doublée (la copie est masquée aux lecteurs d'écran) pour défiler
 * sans trou (étape 3) ; contrôles fournis par la page (bouton pause).
 */
export function Ticker() {
  const { t } = useTranslation();
  const [stopped, setStopped] = useState(false);
  return (
    <section className="ev-bandeau-zone" aria-label={t('events.ticker.label')} data-ev-zone="">
      <div className={cn('ev-bandeau', stopped && 'is-arrete')}>
        <div className="ev-bandeau-piste">
          <div className="ev-bandeau-liste ev-defile">
            <TickerWords />
            <TickerWords hidden />
          </div>
        </div>
        <TickerPause pressed={stopped} onToggle={() => setStopped((s) => !s)} />
      </div>
    </section>
  );
}

/** Pourquoi venir (référence : rtg-03) : 4 cartes, icône, numéro, titre, texte */
export function Why({ event }: { event: Event }) {
  const { t } = useTranslation();
  const items = shownItems(event.pourquoi, (c) => [c.titre, c.texte]);
  if (!items.length) return null;
  return (
    <section className="ev-section" aria-labelledby="ev-pourquoi">
      <div className="ev-container">
        <SectionHead id="ev-pourquoi" eyebrow={t('events.why.eyebrow')} title={t('events.why.title')} />
        <ul className="ev-grille-4">
          {items.map((c, i) => {
            const Icon = ICONS[c.icon];
            return (
              <li key={c.titre} className="ev-carte ev-carte-lift" data-reveal="ev">
                <div className="ev-carte-haut">
                  <span className="ev-icone" aria-hidden="true">
                    <Icon />
                  </span>
                  <span className="ev-carte-num" aria-hidden="true">
                    {pad2(i + 1)}
                  </span>
                </div>
                <h3 className="ev-h3">{c.titre}</h3>
                <p className="ev-text">{c.texte}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/**
 * Le déroulé (référence : rtg-04 et 05, les « 5 étapes ») : frise verticale centrale (une route, remplie au défilement
 * à l'étape 3), cercles numérotés soleil, cartes alternées ; sur téléphone, la frise passe à gauche.
 */
export function Schedule({ event }: { event: Event }) {
  const { t } = useTranslation();
  const steps = shownItems(event.deroule, (s) => [s.heure, s.titre, s.texte, s.lien?.libelle]);
  if (!steps.length) return null;
  return (
    <section id="deroule" className="ev-section ev-alt scroll-mt-24" aria-labelledby="ev-deroule">
      <div className="ev-container">
        <SectionHead id="ev-deroule" eyebrow={t('events.schedule.eyebrow')} title={t('events.schedule.title')} center />
        <div className="ev-frise">
          <div className="ev-frise-piste" aria-hidden="true">
            <span className="ev-frise-rempli" />
          </div>
          <ol className="ev-frise-liste">
          {steps.map((s, i) => (
            <li key={`${s.heure}-${s.titre}`} className="ev-etape" data-reveal="ev">
              <span className="ev-cercle" aria-hidden="true">
                {i + 1}
              </span>
              <div className="ev-etape-carte">
                <p className="ev-etape-heure">{s.heure}</p>
                <h3 className="ev-h3">{s.titre}</h3>
                <p className="ev-text">{s.texte}</p>
                {s.lien && (
                  <Link to={s.lien.to} className="ev-link">
                    {s.lien.libelle}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const VOIES = ['nuit', 'foret', 'soleil', 'papier'] as const;

/** Les activités (référence : rtg-06, les « quatre voies ») : cartes couleur avec une vraie photo du catalogue */
export function Activities({ event }: { event: Event }) {
  const { t } = useTranslation();
  const items = shownItems(event.activites, (a) => [a.titre, a.texte, a.etiquette]);
  if (!items.length) return null;
  return (
    <section className="ev-section" aria-labelledby="ev-activites">
      <div className="ev-container">
        <SectionHead id="ev-activites" eyebrow={t('events.activities.eyebrow')} title={t('events.activities.title')} center />
        <ul className="ev-grille-4">
          {items.map((a, i) => {
            const Icon = ICONS[a.icon];
            const photo = eventPhoto(a.photo);
            return (
              <li key={a.titre} className={cn('ev-voie ev-carte-voie', `ev-voie-${VOIES[i % VOIES.length]}`)} data-reveal="ev">
                <div className="ev-voie-photo">
                  {photo && <Photo photo={photo} sizes="(min-width: 1024px) 18rem, (min-width: 640px) 50vw, 100vw" fit="cover" radius="none" />}
                </div>
                <div className="ev-voie-corps">
                  <span className="ev-voie-icone" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="ev-h3">
                    {a.to ? (
                      <Link to={a.to} className="ev-voie-lien" aria-label={t('events.activities.more', { title: a.titre })}>
                        {a.titre}
                      </Link>
                    ) : (
                      a.titre
                    )}
                  </h3>
                  <p className="ev-voie-texte">{a.texte}</p>
                  <div className="ev-voie-pied">
                    {isShown(a.etiquette) && <span className="ev-voie-etiquette ev-label">{a.etiquette}</span>}
                    {a.to && (
                      <span className="ev-rond-fleche" aria-hidden="true">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                  <Icon aria-hidden="true" className="ev-filigrane" strokeWidth={1.25} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
