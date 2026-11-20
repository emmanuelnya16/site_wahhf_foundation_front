import { useRef } from 'react';
import SectionHeader from '../wahhf/SectionHeader';
import Photo from '../wahhf/Photo';
import { AfterFirstDisplay, FilStepsScrub } from '../../effects/DeferredMotion';
import type { TeamMember } from '../../data/team';
import { displayName, displayRole, memberPortrait, teamLevels } from '../../lib/team';
import { cn } from '../../lib/utils';

/**
 * Carte d'une personne : portrait 4:5 (s'il est publiable), nom, rôle s'il y en a un, bio de deux phrases si elle
 * existe, liens fournis. Dans un niveau sans intitulé, le nom est le titre (h3) du niveau.
 */
function PersonCard({ member, top, nameIsHeading }: { member: TeamMember; top: boolean; nameIsHeading: boolean }) {
  const portrait = memberPortrait(member);
  const role = displayRole(member);
  const Name = nameIsHeading ? 'h3' : 'p';
  return (
    <div className={cn('org-card', top && 'org-card-top')}>
      {portrait && (
        <div className="org-portrait">
          {/* Décoratif : le nom est écrit juste dessous */}
          <Photo photo={portrait} sizes={top ? '(min-width: 768px) 18rem, 15rem' : '(min-width: 768px) 13rem, 12rem'} fit="cover" radius="none" decorative />
        </div>
      )}
      <Name className="org-name">{displayName(member)}</Name>
      {role && <p className="org-role">{role}</p>}
      {member.bio && <p className="org-bio">{member.bio}</p>}
      {member.liens.length > 0 && (
        <ul className="org-links">
          {member.liens.map((lien) => (
            <li key={lien.href}>
              <a href={lien.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-link underline underline-offset-4">
                {lien.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/**
 * Organigramme de « Qui sommes-nous » (lot 7.7), piloté par src/data/team.ts : un bloc par niveau, du plus haut au plus
 * bas, avec son titre (h3) et ses personnes en liste ; un niveau sans intitulé (personne sans rôle affiché) n'a pas de
 * titre au-dessus des cartes, le nom de la personne sert de h3. Niveau 1 : une grande carte centrée ; niveaux suivants :
 * cartes plus petites, en ligne, ou en grille quand plusieurs personnes partagent un niveau (Bureau, Coordinateurs).
 * Le fil (signature du site, contrat §6) relie les niveaux en trait vertical, depuis la carte du niveau 1 ; décoratif.
 * Ordinateur à souris : il se dessine au défilement (FilStepsScrub) et les cartes apparaissent (montée de 16 px et
 * fondu, data-reveal="soft") ; ailleurs et en mouvement réduit, tout est en place.
 */
export default function OrgChart() {
  const levels = teamLevels();
  const ref = useRef<HTMLDivElement>(null);
  if (levels.length === 0) return null;
  return (
    <section id="organigramme" aria-labelledby="organigramme-titre" className="section-space bg-surface">
      <div ref={ref} className="container-page space-y-12">
        <SectionHeader title="Notre organisation" titleId="organigramme-titre" />
        <div data-fil-steps="" className="org">
          {levels.map((level, i) => (
            <div key={level.niveau} className="org-level">
              {i > 0 && <span data-fil-steps-dot="" aria-hidden="true" className="org-dot" />}
              {level.title && <h3 className="org-title">{level.title}</h3>}
              <ul className={cn('org-people', level.members.length > 1 && 'org-people-many')}>
                {level.members.map((member) => (
                  <li key={member.id} data-reveal="soft">
                    <PersonCard member={member} top={level.niveau === levels[0].niveau} nameIsHeading={!level.title} />
                  </li>
                ))}
              </ul>
              {i < levels.length - 1 && <span data-fil-steps-seg="" aria-hidden="true" className="org-seg" />}
            </div>
          ))}
        </div>
        <AfterFirstDisplay>
          <FilStepsScrub scope={ref} />
        </AfterFirstDisplay>
      </div>
    </section>
  );
}
