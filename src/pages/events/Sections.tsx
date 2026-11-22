import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Event } from '../../data/events';
import Photo from '../../components/wahhf/Photo';
import { WAHHF_LOGO_URL } from '../../services/api';
import { DOMAIN_LINKS, eventPhoto, isShown, shownItems } from '../../lib/events';
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

function TickerWords({ words, hidden = false }: { words: { mot: string; lang: string }[]; hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {words.map((word) => (
        <li key={word.mot} lang={word.lang} className="ev-bandeau-mot">
          {word.mot}
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
export function Ticker({ words, label }: { words?: { mot: string; lang: string }[]; label?: string }) {
  const { t } = useTranslation();
  const [stopped, setStopped] = useState(false);
  const list = words ?? DOMAINS_DE.map((mot) => ({ mot, lang: 'de' }));
  return (
    <section className="ev-bandeau-zone" aria-label={label ?? t('events.ticker.label')} data-ev-zone="">
      <div className={cn('ev-bandeau', stopped && 'is-arrete')}>
        <div className="ev-bandeau-piste">
          <div className="ev-bandeau-liste ev-defile">
            <TickerWords words={list} />
            <TickerWords words={list} hidden />
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
        <SectionHead
          id="ev-pourquoi"
          eyebrow={event.sections?.pourquoi?.surtitre ?? t('events.why.eyebrow')}
          title={event.sections?.pourquoi?.titre ?? t('events.why.title')}
          lead={event.sections?.pourquoi?.intro}
        />
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
  const head = event.sections?.route;
  if (!steps.length) return null;
  return (
    <section id="deroule" className="ev-section ev-alt scroll-mt-24" aria-labelledby="ev-deroule">
      <div className="ev-container">
        <SectionHead
          id="ev-deroule"
          eyebrow={head?.surtitre ?? t('events.schedule.eyebrow')}
          title={head?.titre ?? t('events.schedule.title')}
          lead={head?.intro}
          center
        />
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
                {s.heure && <p className="ev-etape-heure">{s.heure}</p>}
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

/**
 * Les activités (référence : rtg-06, les « quatre voies ») : cartes couleur, 4 (une ligne de 4) ou 6 (deux lignes de 3
 * à partir de 1 024 px). Photo du catalogue, ou variante sans photo : grande icône sur aplat. Titre, puis texte s'il
 * existe (jamais de paragraphe vide), étiquette (libre, ou nom du domaine) et lien (par défaut, la page du domaine).
 */
export function Activities({ event }: { event: Event }) {
  const { t } = useTranslation();
  const items = shownItems(event.activites, (a) => [a.titre, a.texte, a.etiquette]);
  if (!items.length) return null;
  return (
    <section className="ev-section" aria-labelledby="ev-activites">
      <div className="ev-container">
        <SectionHead
          id="ev-activites"
          eyebrow={event.sections?.voies?.surtitre ?? t('events.activities.eyebrow')}
          title={event.sections?.voies?.titre ?? t('events.activities.title')}
          lead={event.sections?.voies?.intro}
          center
        />
        <ul className={items.length > 4 ? 'ev-grille-voies-3' : 'ev-grille-4'}>
          {items.map((a, i) => {
            const Icon = ICONS[a.icon];
            const photo = a.photo.length ? eventPhoto(a.photo) : null;
            const label = a.etiquette ?? (a.domaine ? t(`nav.domains.${a.domaine}`) : null);
            const to = a.to ?? (a.domaine ? DOMAIN_LINKS[a.domaine] : undefined);
            // Carte liée à un domaine : le nom dit où mène le lien ; sinon, le titre visible suffit
            const name = label && a.domaine ? t('events.activities.domainLink', { title: a.titre, domain: label }) : undefined;
            return (
              <li
                key={a.titre}
                className={cn('ev-voie ev-carte-voie', `ev-voie-${VOIES[i % VOIES.length]}`, !photo && 'is-aplat', !isShown(a.texte) && 'is-court')}
                data-reveal="ev"
              >
                {photo ? (
                  <div className="ev-voie-photo">
                    <Photo photo={photo} sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw" fit="cover" radius="none" />
                  </div>
                ) : (
                  <div className="ev-voie-aplat" aria-hidden="true">
                    <Icon strokeWidth={1.25} />
                  </div>
                )}
                <div className="ev-voie-corps">
                  {photo && (
                    <span className="ev-voie-icone" aria-hidden="true">
                      <Icon />
                    </span>
                  )}
                  <h3 className="ev-h3">
                    {to ? (
                      <Link to={to} className="ev-voie-lien" aria-label={a.domaine ? name : undefined}>
                        {a.titre}
                      </Link>
                    ) : (
                      a.titre
                    )}
                  </h3>
                  {isShown(a.texte) && <p className="ev-voie-texte">{a.texte}</p>}
                  <div className="ev-voie-pied">
                    {isShown(label) && <span className="ev-voie-etiquette ev-label">{label}</span>}
                    {to && (
                      <span className="ev-rond-fleche" aria-hidden="true">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                  {photo && <Icon aria-hidden="true" className="ev-filigrane" strokeWidth={1.25} />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
