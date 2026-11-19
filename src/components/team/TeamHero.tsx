import { ArrowDown } from 'lucide-react';
import LineReveal from '../../effects/LineReveal';
import { PrimaryButton } from '../wahhf/Buttons';
import { followAnchorLink } from '../../lib/scroll';
import { memberPortrait, visibleMembers } from '../../lib/team';
import { cn } from '../../lib/utils';
import PortraitCarousel from './PortraitCarousel';

/** Textes du hero (à valider avec la fondation). */
const TITLE = 'Ceux qui portent la fondation.';
const INTRO = 'Une équipe entre le Cameroun et l’Allemagne, au service de la jeunesse.';

/**
 * Hero de « Qui sommes-nous » (lot 7.7), sur une bande nuit : à gauche le titre (le seul h1 de la page), une phrase,
 * « Rejoindre la fondation » (pilule claire, vers Agir) et « Voir l'organigramme » (ancre) ; à droite la colonne de
 * portraits. Téléphone (moins de 768 px) : le texte d'abord, les portraits dessous.
 * Arrivée comme le hero du site (contrat §10) : titre ligne par ligne, puis phrase et actions en fondu.
 * Sans portrait publiable (accords écrits en attente, en production), le texte occupe seul la bande.
 */
export default function TeamHero() {
  const members = visibleMembers();
  const hasPortraits = members.some((m) => memberPortrait(m));
  return (
    <section
      aria-labelledby="qui-sommes-nous-titre"
      className="bg-surface-inverse pt-[calc(var(--header-offset)+clamp(1.5rem,4vw,3rem))] pb-[clamp(3rem,6vw,5rem)]"
    >
      <div className={cn('container-page grid items-center gap-10', hasPortraits && 'md:grid-cols-[7fr_5fr] md:gap-12')}>
        <div className="space-y-6">
          <LineReveal as="h1" id="qui-sommes-nous-titre" text={TITLE} className="text-display text-text-on-inverse reveal-08" />
          <p className="max-w-[46ch] text-body text-text-on-inverse/80 hero-fade [--hero-fade-delay:0.45s]">{INTRO}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 hero-fade [--hero-fade-delay:0.55s]">
            <PrimaryButton
              to="/agir"
              size="lg"
              className="bg-brume text-encre hover:bg-soleil-pale active:bg-soleil-pale focus-visible:outline-soleil"
            >
              Rejoindre la fondation
            </PrimaryButton>
            <a
              href="#organigramme"
              onClick={(event) => followAnchorLink(event, 'organigramme')}
              className="inline-flex min-h-11 items-center gap-2 text-body text-link-on-inverse underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              Voir l’organigramme
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>
        {hasPortraits && <PortraitCarousel members={members} />}
      </div>
    </section>
  );
}
