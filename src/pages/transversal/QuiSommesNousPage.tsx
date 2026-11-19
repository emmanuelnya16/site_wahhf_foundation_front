import { ReactNode, useRef } from 'react';
import SEO from '../../components/wahhf/SEO';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { DonateButton, SecondaryButton } from '../../components/wahhf/Buttons';
import Fil, { FilPoint } from '../../components/wahhf/Fil';
import { AfterFirstDisplay, FilScrub, PhotoReveal } from '../../effects/DeferredMotion';
import { TIMELINE_MILESTONES } from '../../services/api';
import { GOVERNANCE_MEMBERS } from '../../config/governance';

/*
 * Qui sommes-nous (groupe 7.3 : contrat validé, audit QSN-01 à QSN-04, T-11, T-15).
 * - En-tête du lot 5, révélé à l'arrivée comme le hero (titre ligne par ligne, introduction en fondu), avec une vraie
 *   photo de l'Open Day, légendée et datée (QSN-02) : trois responsables de la fondation, adultes (revue du groupe 7.3 :
 *   pas de gros plan de jeunes mineurs tant que les autorisations ne sont pas confirmées, GAL-01, demande B).
 * - Mission et valeurs ; puis l'Approche et la frise « Notre parcours », venues de l'accueil (contrat §7, ACC-03),
 *   refaites avec les composants du lot 5 : liste typographique pour les cinq principes, le fil pour la frise.
 * - Le groupe IROKO sur une section sauge, sans carte dans la carte (QSN-03) : plus de colonne logo, qui répétait le titre.
 * - Gouvernance masquée tant qu'aucun nom n'est fourni (QSN-01, src/config/governance.ts) ; ses rôles d'exemple,
 *   marqués TODO, sont gardés dans EXAMPLE_GOVERNANCE_ROLES_NOT_VALIDATED.
 * - Fin de page : « Faire un don » et « Devenir partenaire » (QSN-04), sans carte nuit au-dessus du footer.
 * - Gratuité dite une fois par écran, jamais dans un titre, mots voisins compris (« aucun frais », « sans frais »,
 *   « contrepartie financière » : revue du groupe 7.3) ; elle est dite dans le paragraphe de la mission et à l'étape 2026
 *   de la frise. Présence décrite telle qu'elle est (Yaoundé et Douala, coordination en Allemagne, T-11) au lieu des
 *   « 10 régions ».
 * - Mouvement (contrat §10) : la frise se dessine au défilement sur ordinateur (FilScrub), fixe sur téléphone et en
 *   mouvement réduit ; seuls ses points s'allument, ses paragraphes restent lisibles à pleine opacité (revue du groupe
 *   7.3) ; les photos de la gouvernance, quand elles existeront, se découvrent par clip-path (PhotoReveal).
 */

const NB = ' ';

// Revue du groupe 7.3 : la valeur « Aucun frais pour les familles » (ex-« Gratuité Totale ») est retirée : c'était une
// gratuité dans un titre, la troisième du premier écran. La gratuité reste dite dans le paragraphe de la mission.
const VALUES = [
  {
    title: 'Dignité et respect',
    desc: 'Chaque bénéficiaire est accueilli comme un acteur de son propre parcours, jamais comme un client.',
  },
  {
    title: 'Intégrité et vérité',
    desc: 'Nous combattons les fausses promesses migratoires par une information rigoureuse et vérifiable.',
  },
];

/** Notre approche : les cinq principes de l'ancienne section de l'accueil (lot 6, src/pages/home/archive). */
const APPROACH = [
  {
    title: 'Écoute',
    desc: 'Partir des besoins exprimés par les jeunes, les mères et les acteurs de terrain sans imposer de modèle préconçu.',
  },
  {
    title: 'Co-construction',
    desc: 'Bâtir chaque action avec les enseignants, soignants et associations locales pour un impact partagé.',
  },
  {
    title: 'Durabilité',
    desc: 'Privilégier la transmission de compétences durables (langues, métiers, écologie) plutôt que l’assistanat.',
  },
  {
    title: 'Transparence',
    desc: 'Rendre compte de l’usage des fonds engagés.',
  },
  {
    title: 'Partenariats',
    desc: 'Mobiliser les compétences du groupe IROKO et des institutions camerounaises et européennes.',
  },
];

/**
 * Trois faits sur le lien avec IROKO (QSN-03 : année de rattachement, part du budget, organe qui décide des
 * programmes), à fournir par la fondation (docs/contenus-a-fournir.md) : la liste s'affiche dès qu'elle est remplie.
 */
const IROKO_FACTS: { title: string; text: string }[] = [];

/** Année d'une étape, seulement si elle est confirmée (« 2021 (TODO) » n'est pas affichée). */
const confirmedYear = (year: string) => (/TODO/.test(year) ? null : year);

/**
 * Étapes de la frise : titre en 600 (aligné sur le point), année confirmée dessous, puis la phrase ; largeur bornée
 * pour la dernière colonne. Espace insécable avant les deux-points des titres (T-19).
 */
const milestones: FilPoint[] = TIMELINE_MILESTONES.map((m, i) => {
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

export function QuiSommesNousPage() {
  const filRef = useRef<HTMLDivElement>(null);
  const governanceRef = useRef<HTMLDivElement>(null);
  const hasGovernance = GOVERNANCE_MEMBERS.length > 0;

  return (
    <>
      <SEO
        title="Qui sommes-nous — Fondation camerouno-allemande, branche sociale du groupe IROKO"
        description="Découvrez l’histoire, la mission, les valeurs et l’approche de WAHHF Foundation, et son lien avec le groupe IROKO."
      />

      <PageHeader reveal photoId="open-day-trophee">
        <PageTitle>Une fondation camerouno-allemande au service de la dignité humaine</PageTitle>
        <PageIntro>
          Née de la solidarité entre le Cameroun et l’Allemagne, WAHHF Foundation accompagne les jeunes et les communautés à
          travers 6 domaines d’action complémentaires.
        </PageIntro>
      </PageHeader>

      {/* MISSION ET VALEURS */}
      <Section>
        <div className="container-page grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-5">
            <SectionHeader title="Bâtir l’autonomie par l’éducation, la santé et l’accès au savoir" />
            <div className="space-y-4 text-body text-text-secondary max-w-[65ch]">
              <p className="text-text">
                WAHHF Foundation part d’une conviction simple : chaque jeune mérite d’accéder à l’éducation, aux soins de
                prévention, à l’apprentissage des langues et à une information vérifiée, sans que le manque de ressources
                financières ou les réseaux de désinformation ne brisent son avenir.
              </p>
              <p>
                Basée à Yaoundé et à Douala, avec une coordination en Allemagne, la fondation propose un programme gratuit
                d’apprentissage de l’allemand (A1 à C1) et d’orientation vers 10 pays européens.
              </p>
            </div>
          </div>

          <TextList columns={1} className="lg:col-span-5">
            {VALUES.map((val) => (
              <TextListItem key={val.title} title={val.title}>
                <p>{val.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </Section>

      {/* NOTRE APPROCHE (venue de l'accueil) */}
      <Section tone="sauge" id="approche">
        <div className="container-page space-y-10">
          <SectionHeader
            title="Cinq principes qui guident chaque projet"
            subtitle="Une méthode humble, rigoureuse et ancrée dans les réalités locales."
          />
          <TextList columns={3}>
            {APPROACH.map((item) => (
              <TextListItem key={item.title} title={item.title}>
                <p>{item.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </Section>

      {/* NOTRE PARCOURS : la frise, avec le fil (venue de l'accueil). Années non confirmées masquées. */}
      <Section id="parcours">
        <div className="container-page space-y-10">
          <SectionHeader
            title="Les grandes étapes de WAHHF Foundation"
            subtitle="Une construction progressive au service des communautés."
          />
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
      </Section>

      {/* LE GROUPE IROKO : une section, plus une carte nuit contenant une seconde carte (QSN-03) */}
      <Section tone="sauge" id="iroko">
        <div className="container-page space-y-8">
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader title="WAHHF Foundation, branche sociale du groupe IROKO" />
            <p className="text-body text-text-secondary">
              Le groupe multisectoriel camerouno-allemand IROKO a structuré WAHHF Foundation comme sa branche sociale et
              philanthropique, à but non lucratif. Ce soutien couvre les frais de fonctionnement et d’enseignement.
            </p>
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
          <SecondaryButton to="/partenaires">Découvrir nos partenaires</SecondaryButton>
        </div>
      </Section>

      {/* GOUVERNANCE : seulement avec de vraies personnes (QSN-01) ; photos découvertes par clip-path (ordinateur) */}
      {hasGovernance && (
        <Section id="gouvernance">
          <div ref={governanceRef} className="container-page space-y-10">
            <SectionHeader
              title="Une gouvernance collégiale entre le Cameroun et l’Allemagne"
              subtitle="Les membres du conseil et les responsables de pôles veillent au respect de l’éthique et de la gratuité."
            />
            <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {GOVERNANCE_MEMBERS.map((member) => (
                <li key={member.name} data-photo-reveal="" className="space-y-4">
                  {member.photo && (
                    <img
                      data-photo-reveal-media=""
                      src={member.photo.src}
                      width={member.photo.width}
                      height={member.photo.height}
                      alt={`Portrait de ${member.name}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full max-w-[20rem] aspect-[4/5] object-cover rounded-card bg-surface-section"
                    />
                  )}
                  <div data-photo-reveal-text="" className="space-y-1">
                    <h3 className="text-body font-semibold text-text">{member.name}</h3>
                    <p className="text-meta text-text-secondary">
                      {member.role}, {member.country}
                    </p>
                    <p className="text-body text-text-secondary">{member.text}</p>
                  </div>
                </li>
              ))}
            </ul>
            <AfterFirstDisplay>
              <PhotoReveal scope={governanceRef} />
            </AfterFirstDisplay>
          </div>
        </Section>
      )}

      {/* FIN DE PAGE : deux actions (QSN-04), sur le fond de la page, sans carte nuit au-dessus du footer */}
      <Section tone={hasGovernance ? 'sauge' : 'brume'}>
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader
              title="Soutenir la fondation"
              subtitle={`Vous pouvez soutenir nos actions par un don, ou proposer un partenariat à la fondation${NB}: école, association, entreprise ou institution.`}
            />
            <div className="flex flex-wrap items-center gap-3">
              <DonateButton size="lg" />
              <SecondaryButton to="/agir#partenaire" size="lg">
                Devenir partenaire
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export default QuiSommesNousPage;
