import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Megaphone } from 'lucide-react';
import type { Event, EventStatus } from '../../data/events';
import Photo from '../../components/wahhf/Photo';
import { displayName, displayRole, memberPortrait, visibleMembers } from '../../lib/team';
import { shownItems } from '../../lib/events';
import { EvButton, ICONS, Lines, SectionHead, pad2 } from './ui';

/**
 * Le programme en un coup d'œil (référence : rtg-07) : section nuit avec halos soleil et forêt, 4 cartes sombres, barre
 * « Intervenants » (cartes depuis src/data/team.ts ; à venir sans nom : « annoncés très bientôt » ; passé sans nom :
 * pas de barre).
 */
export function Program({ event, status, scheduleShown }: { event: Event; status: EventStatus; scheduleShown: boolean }) {
  const { t } = useTranslation();
  const items = shownItems(event.tempsForts, (c) => [c.titre, c.texte]);
  const speakers = visibleMembers().filter((m) => event.intervenants.includes(m.id));
  const showBar = speakers.length > 0 || status === 'a-venir';
  const head = event.sections?.programme;
  if (!items.length && !showBar) return null;
  return (
    <section id="programme" className="ev-section ev-programme ev-on-nuit scroll-mt-24" aria-labelledby="ev-programme">
      <div className="ev-halo ev-halo-soleil" aria-hidden="true" />
      <div className="ev-halo ev-halo-foret" aria-hidden="true" />
      <div className="ev-container relative">
        <SectionHead
          id="ev-programme"
          eyebrow={head?.surtitre ?? t('events.program.eyebrow')}
          title={head?.titre ?? t('events.program.title')}
          lead={head?.intro}
        />
        {items.length > 0 && (
          <ul className="ev-grille-4">
            {items.map((c, i) => {
              const Icon = ICONS[c.icon];
              return (
                <li key={c.titre} className="ev-carte-sombre" data-reveal="ev">
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
        )}
        {showBar && (
          <div className="ev-barre" data-reveal="ev">
            <div className="grid gap-4">
              <p className="ev-barre-titre">
                <span className="ev-rond" aria-hidden="true">
                  <Megaphone className="h-5 w-5" />
                </span>
                <span>
                  <strong className="font-semibold">{t('events.program.speakers')}</strong>
                  {speakers.length === 0 && <>{t('events.program.speakersSep')}{t('events.program.speakersSoon')}</>}
                </span>
              </p>
              {speakers.length > 0 && (
                <ul className="ev-intervenants">
                  {speakers.map((m) => {
                    const portrait = memberPortrait(m);
                    const role = displayRole(m);
                    return (
                      <li key={m.id} className="ev-intervenant">
                        <span className="ev-intervenant-photo">
                          {portrait && <Photo photo={portrait} sizes="40px" fit="cover" radius="none" decorative />}
                        </span>
                        <span>
                          <span className="ev-intervenant-nom block">{displayName(m)}</span>
                          {role && <span className="ev-intervenant-role block">{role}</span>}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="flex flex-wrap gap-3">
              {scheduleShown && (
                <EvButton to="#deroule" variant="soleil" arrow>
                  {head?.action ?? t('events.program.schedule')}
                </EvButton>
              )}
              <EvButton to="/qui-sommes-nous#organigramme" variant="contour">
                {head?.action2 ?? t('events.program.team')}
              </EvButton>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * Sponsors et partenaires (référence : rtg-08) : texte à gauche, deux cartes couleur (soleil, nuit) ; cartes propres à
 * l'événement, sinon celles de l'i18n vers la page Agir.
 */
export function Support({ event }: { event: Event }) {
  const { t } = useTranslation();
  const head = event.sections?.partenaires;
  const cards = event.soutien
    ? event.soutien.map((c) => ({ tone: `is-${c.ton}`, to: c.to, eyebrow: c.surtitre, title: c.titre, text: c.texte }))
    : [
        { tone: 'is-soleil', to: '/agir#partenaire', eyebrow: t('events.support.partnerEyebrow'), title: t('events.support.partnerTitle'), text: t('events.support.partnerText') },
        { tone: 'is-nuit', to: '/agir#benevole', eyebrow: t('events.support.giveEyebrow'), title: t('events.support.giveTitle'), text: t('events.support.giveText') },
      ];
  return (
    <section className="ev-section" aria-labelledby="ev-soutien">
      <div className="ev-container ev-soutien">
        <div className="grid gap-5" data-reveal="ev">
          <p className="ev-eyebrow">{head?.surtitre ?? t('events.support.eyebrow')}</p>
          <h2 id="ev-soutien" className="ev-h2">
            <Lines text={head?.titre ?? t('events.support.title')} />
          </h2>
          <p className="ev-lead">{head?.intro ?? t('events.support.text')}</p>
        </div>
        <ul className="ev-soutien-cartes">
          {cards.map((c) => (
            <li key={c.title} className={`ev-carte-couleur ev-carte-lien ev-carte-lift ${c.tone}`} data-reveal="ev">
              <p className="ev-label">{c.eyebrow}</p>
              <h3 className="ev-h3">
                <Link to={c.to} className="ev-lien-carte">
                  {c.title}
                </Link>
              </h3>
              <p className="leading-relaxed">{c.text}</p>
              <ArrowUpRight aria-hidden="true" className="ev-fleche-simple" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
