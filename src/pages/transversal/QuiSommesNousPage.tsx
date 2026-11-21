import { ReactNode, useRef } from 'react';
import type { TFunction } from 'i18next';
import SEO from '../../components/wahhf/SEO';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import TeamHero from '../../components/team/TeamHero';
import { DonateButton, SecondaryButton } from '../../components/wahhf/Buttons';
import Fil, { FilPoint } from '../../components/wahhf/Fil';
import { AfterFirstDisplay, FilScrub } from '../../effects/DeferredMotion';
import { TIMELINE_MILESTONES } from '../../services/api';
import OrgChart from '../../components/team/OrgChart';
import PrinciplesSection from '../../components/principles/PrinciplesSection';
import { TEAM } from '../../data/team';
import { displayName, displayRole } from '../../lib/team';
import Photo from '../../components/wahhf/Photo';
import { cn } from '../../lib/utils';
import { photoCaption, photoOrFallback } from '../../lib/photos';
import { registerBundle } from '../../i18n';
import { useLocalize } from '../../lib/localize';
import qsnFr from '../../locales/qui-sommes-nous/fr.json';

/**
 * Textes de la page (lot 7.10) : src/locales/qui-sommes-nous/ (espace de noms quiSommesNous). Les étapes de la frise
 * (TIMELINE_MILESTONES, src/services/api.ts) restent en français dans leur fichier ; l'anglais et l'allemand sont des
 * surcouches (quiSommesNous.contenu.etapes, case par case). Hero, organigramme et rôles : src/locales/equipe/
 * (src/lib/team.ts) ; les cinq principes : src/locales/principles/.
 */
registerBundle('quiSommesNous', qsnFr, {
  en: () => import('../../locales/qui-sommes-nous/en.json'),
  de: () => import('../../locales/qui-sommes-nous/de.json'),
});

/**
 * Photos de la fondation (lot 7.6, catalogue : « À propos ») : la banderole dans l'en-tête ; le kakémono des domaines
 * et les parents au premier rang sous la mission ; les trois aînés à côté de l'appel final (A31 et A88 montrent les
 * mêmes personnes : elles ne sont pas côte à côte). Une photo absente (accord parental en attente) n'est pas remplacée.
 */
const STORY_PHOTO = photoOrFallback('A02');
/** Le président pendant sa présentation du 25 avril (A71 ; A45 et A77 le montrent aussi) */
const PRESIDENT_PHOTO = photoOrFallback('A71');
const MISSION_PORTRAIT = photoOrFallback('A14');
const MISSION_LANDSCAPE = photoOrFallback('A31');
const CLOSING_PHOTO = photoOrFallback('A88');

/*
 * Qui sommes-nous (groupe 7.3, refondue au lot 7.7 : contrat validé, audit QSN-01 à QSN-04, T-11, T-15).
 * - Hero sur nuit (lot 7.7, TeamHero) : le seul h1, une phrase, « Rejoindre la fondation », « Voir l'organigramme » et
 *   la colonne de portraits de l'équipe (PortraitCarousel).
 * - Organigramme (lot 7.7, OrgChart) : un h3 par niveau, reliés par le fil ; il remplace l'ancienne section
 *   Gouvernance, jamais affichée (ses rôles d'exemple restent dans src/config/governance.ts).
 * - Puis, sur des fonds alternés : mission et valeurs (kakémono A14, parents au premier rang A31) ; l'Approche et la
 *   frise « Notre parcours », venues de l'accueil, avec la banderole A02 et le président à la tribune A71 ; le groupe
 *   IROKO, sans carte dans la carte (QSN-03) ; la fin de page « Faire un don » et « Devenir partenaire » (QSN-04), avec
 *   les trois aînés A88.
 * - Gratuité dite une fois par écran, jamais dans un titre ; présence décrite telle qu'elle est (T-11).
 * - Mouvement (contrat §10) : hero comme celui du site ; le fil de l'organigramme et la frise se dessinent au
 *   défilement sur ordinateur ; photos en apparitions groupées ; tout en place en mouvement réduit.
 */

const NB = ' ';

// Revue du groupe 7.3 : la valeur « Aucun frais pour les familles » (ex-« Gratuité Totale ») est retirée : c'était une
// gratuité dans un titre, la troisième du premier écran. La gratuité reste dite dans le paragraphe de la mission.
// Les deux valeurs : quiSommesNous.values (lot 7.10).
interface Value {
  title: string;
  desc: string;
}

/*
 * Notre approche : les cinq principes de l'ancienne section de l'accueil, déplacés mot pour mot dans les fichiers de
 * langue au lot 7.8 (principles.items, src/locales/principles/) : src/components/principles/.
 */

/**
 * Trois faits sur le lien avec IROKO (QSN-03 : année de rattachement, part du budget, organe qui décide des
 * programmes), à fournir par la fondation (docs/contenus-a-fournir.md) : la liste s'affiche dès qu'elle est remplie.
 */
const IROKO_FACTS: { title: string; text: string }[] = [];

/** Texte alternatif de la photo du président : son nom seulement s'il est confirmé (src/data/team.ts, nomConfirme). */
function presidentAlt(catalogueAlt: string, t: TFunction) {
  const president = TEAM.find((m) => m.niveau === 1);
  return president?.nomConfirme
    ? t('quiSommesNous.presidentAlt', { name: displayName(president), role: displayRole(president) ?? '' })
    : catalogueAlt;
}

/** Année d'une étape, seulement si elle est confirmée (« 2021 (TODO) » n'est pas affichée). */
const confirmedYear = (year: string) => (/TODO/.test(year) ? null : year);

/**
 * Étapes de la frise : titre en 600 (aligné sur le point), année confirmée dessous, puis la phrase ; largeur bornée
 * pour la dernière colonne. Espace insécable avant les deux-points des titres (T-19, en français).
 */
function milestonePoints(items: typeof TIMELINE_MILESTONES): FilPoint[] {
  return items.map((m, i) => {
    const year = confirmedYear(m.year);
    const label: ReactNode = (
      <span className="flex flex-col gap-1 lg:max-w-[16rem]">
        <span className="font-semibold">{m.title.replace(' : ', `${NB}: `)}</span>
        {year && <span className="text-meta text-text-secondary tabular-nums">{year}</span>}
        <span className="text-text-secondary">{m.desc}</span>
      </span>
    );
    return { id: `etape-${i + 1}`, label };
  });
}

export function QuiSommesNousPage() {
  const filRef = useRef<HTMLDivElement>(null);
  const { t, localized } = useLocalize();
  const values = t('quiSommesNous.values', { returnObjects: true }) as Value[];
  const milestones = milestonePoints(localized(TIMELINE_MILESTONES, 'quiSommesNous.contenu.etapes'));

  return (
    <>
      <SEO title={t('quiSommesNous.seo.title')} description={t('quiSommesNous.seo.description')} />

      {/* HERO : titre et portraits de l'équipe (lot 7.7) */}
      <TeamHero />

      {/* ORGANIGRAMME : un bloc par niveau, reliés par le fil (lot 7.7) ; remplace l'ancienne section Gouvernance */}
      <OrgChart />

      {/* MISSION ET VALEURS */}
      <Section tone="sauge">
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-5">
            <SectionHeader title={t('quiSommesNous.mission.title')} />
            <div className="space-y-4 text-body text-text-secondary max-w-[65ch]">
              <p className="text-text">{t('quiSommesNous.mission.p1')}</p>
              <p>{t('quiSommesNous.mission.p2')}</p>
            </div>
          </div>

          <TextList columns={1} className="lg:col-span-5">
            {values.map((val) => (
              <TextListItem key={val.title} title={val.title}>
                <p>{val.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>

        {/* Deux photos du 25 avril côte à côte, à la même hauteur (ratios réels : 2:3 et 3:2, colonnes 4 / 9) : le
            kakémono des domaines, les parents au premier rang ; apparition avec les autres photos (data-reveal) */}
        {MISSION_PORTRAIT && MISSION_LANDSCAPE && (
          <figure className="container-page mt-12 lg:mt-16">
            <div className="grid max-w-4xl grid-cols-[4fr_9fr] gap-2 sm:gap-3">
              <Photo photo={MISSION_PORTRAIT} sizes="(min-width: 56rem) 17rem, 30vw" imgAttributes={{ 'data-reveal': '' }} />
              <Photo photo={MISSION_LANDSCAPE} sizes="(min-width: 56rem) 38rem, 70vw" imgAttributes={{ 'data-reveal': '' }} />
            </div>
            <figcaption className="mt-3 text-meta text-text-secondary">{photoCaption(MISSION_PORTRAIT)}</figcaption>
          </figure>
        )}
      </Section>

      {/* NOTRE APPROCHE (venue de l'accueil) : les cinq principes en cartes, en parcours sur ordinateur (lot 7.8) */}
      <PrinciplesSection />

      {/* NOTRE PARCOURS : la frise, avec le fil (venue de l'accueil). Années non confirmées masquées. */}
      <Section tone="sauge" id="parcours">
        <div className="container-page space-y-10">
          <SectionHeader title={t('quiSommesNous.timeline.title')} subtitle={t('quiSommesNous.timeline.subtitle')} />
          <div ref={filRef}>
            <Fil
              orientation="auto"
              start={milestones[0]}
              steps={milestones.slice(1, -1)}
              end={milestones[milestones.length - 1]}
            />
          </div>
          <AfterFirstDisplay>
            <FilScrub scope={filRef} dim="[data-fil-dot]" />
          </AfterFirstDisplay>
        </div>

        {/* Le 25 avril 2026 : la banderole et le président à la tribune, côte à côte à la même hauteur (ratios réels
            3:2 et 2:3, colonnes 9 / 4). Le texte alternatif ne le nomme que si son nom est confirmé. */}
        {STORY_PHOTO && PRESIDENT_PHOTO && (
          <figure className="container-page mt-12 lg:mt-16">
            <div className="grid max-w-4xl grid-cols-[9fr_4fr] gap-2 sm:gap-3">
              <Photo photo={STORY_PHOTO} sizes="(min-width: 56rem) 38rem, 70vw" imgAttributes={{ 'data-reveal': '' }} />
              <Photo
                photo={{ ...PRESIDENT_PHOTO, alt: presidentAlt(PRESIDENT_PHOTO.alt, t) }}
                sizes="(min-width: 56rem) 17rem, 30vw"
                imgAttributes={{ 'data-reveal': '' }}
              />
            </div>
            <figcaption className="mt-3 text-meta text-text-secondary">{photoCaption(STORY_PHOTO)}</figcaption>
          </figure>
        )}
      </Section>

      {/* LE GROUPE IROKO : une section, plus une carte nuit contenant une seconde carte (QSN-03) */}
      <Section id="iroko">
        <div className="container-page space-y-8">
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader title={t('quiSommesNous.iroko.title')} />
            <p className="text-body text-text-secondary">{t('quiSommesNous.iroko.text')}</p>
          </div>
          {IROKO_FACTS.length > 0 && (
            <TextList columns={3}>
              {IROKO_FACTS.map((fact) => (
                <TextListItem key={fact.title} title={fact.title}>
                  <p>{fact.text}</p>
                </TextListItem>
              ))}
            </TextList>
          )}
          <SecondaryButton to="/partenaires">{t('quiSommesNous.iroko.partners')}</SecondaryButton>
        </div>
      </Section>

      {/* FIN DE PAGE : deux actions (QSN-04), sur le fond de la page, sans carte nuit au-dessus du footer */}
      <Section tone="sauge">
        <div className={cn('container-page', CLOSING_PHOTO && 'grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-12')}>
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader title={t('quiSommesNous.support.title')} subtitle={t('quiSommesNous.support.subtitle')} />
            <div className="flex flex-wrap items-center gap-3">
              <DonateButton size="lg" />
              <SecondaryButton to="/agir#partenaire" size="lg">
                {t('quiSommesNous.support.partner')}
              </SecondaryButton>
            </div>
          </div>
          {CLOSING_PHOTO && (
            <figure className="w-full max-w-[32rem] lg:justify-self-end">
              <Photo photo={CLOSING_PHOTO} sizes="(min-width: 1024px) 32rem, calc(100vw - 2.5rem)" imgAttributes={{ 'data-reveal': '' }} />
              <figcaption className="mt-2 text-meta text-text-secondary">{photoCaption(CLOSING_PHOTO)}</figcaption>
            </figure>
          )}
        </div>
      </Section>
    </>
  );
}

export default QuiSommesNousPage;
