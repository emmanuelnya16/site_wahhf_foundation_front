import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageTitle, PageIntro, PageActions } from '../components/wahhf/PageHeader';
import Photo from '../components/wahhf/Photo';
import type { CatalogPhoto } from '../data/photos';
import { photoCaption, photoOrFallback } from '../lib/photos';
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import { COUNTRIES_DATA } from '../services/api';
import Section from '../components/wahhf/Section';
import Fil from '../components/wahhf/Fil';
import { TextList, TextListItem, TEXT_LINK_CLASS } from '../components/wahhf/TextList';
import { AfterFirstDisplay, FilScrub } from '../effects/DeferredMotion';
import { useLocalize } from '../lib/localize';
import { useLevels } from './academie/shared';
import '../locales/mobilite';

/** En-tête (lot 7.6, catalogue : « Mobilité / Allemagne ») : la présentation sur les études en Allemagne du 25 avril. */
const HEADER_PHOTO = photoOrFallback('A53');
/** Portes d'entrée (retouches du 19/11) : un participant prend des notes (A98) ; une question au micro pendant les échanges (A34). */
const ACADEMY_PHOTO = photoOrFallback('A98');
const EUROPE_PHOTO = photoOrFallback('A34');

/*
 * Mobilité & Langues (groupe 7.1 : contrat validé, audit MOB-01, T-14, ARN-02, T-12).
 * - En-tête : la vraie photo de l'Open Day (MOB-01), en entier, légendée et datée ; l'avertissement anti-arnaque juste
 *   sous le titre ; deux boutons seulement (Candidater, l'Académie).
 * - Le choix de la porte d'entrée vient juste après l'en-tête, avant « Pourquoi » (audit : le visiteur veut d'abord
 *   savoir quoi faire). Fonds alternés : brume, sauge, brume, sauge, brume.
 * - Gratuité dite une fois par écran : l'avertissement au premier écran, « Zéro frais » dans « Pourquoi », la question
 *   de la FAQ ; jamais dans un titre.
 * - Témoignages : masqués tant qu'aucun témoignage réel et autorisé n'est fourni (docs/contenus-a-fournir.md, n° 76-78).
 * - Une seule action en fin de page (Candidater), sans carte nuit au-dessus du footer.
 * - Mouvement (contrat §10) : en-tête révélé comme le hero, photo découverte du bas vers le haut (ordinateur), frise
 *   A1 → C1 au défilement (FilScrub, ordinateur), apparitions des listes.
 * - Retouches du 19/11 (« trop de texte », des images) : une photo pour chaque porte d'entrée, à côté de son texte
 *   (découverte du bas vers le haut sur ordinateur) ; la FAQ devient une liste de questions qui s'ouvrent (<details>,
 *   réponses gardées mot pour mot) ; dans « Pourquoi », le second paragraphe, qui redisait l'introduction et le point
 *   « Exigence », n'est plus affiché (WHY_SECOND_PARAGRAPH_HIDDEN). L'avertissement reste visible et entier (contrat §8).
 * - Lot 7.10 : textes du paquet « mobilite » (mobilite.hub.*), noms des pays des textes communs (contenu.pays.<slug>).
 */

/** « Pourquoi », second paragraphe : plus affiché (retouches du 19/11, il redit l'introduction et « Exigence »). */
export const WHY_SECOND_PARAGRAPH_HIDDEN =
  'Avec le soutien de nos partenaires et de nos donateurs, nous proposons ce que beaucoup marchandent : des cours d’allemand /anglais /italien structurés du niveau A1 au C1 et une orientation documentée étape par étape.';

/** Photo d'une porte d'entrée : 3:2 entière, légendée par son album, à droite du texte sur ordinateur. */
function DoorPhoto({ photo }: { photo: CatalogPhoto | null }) {
  if (!photo) return null;
  return (
    <figure className="w-full max-w-[26rem] lg:col-span-5 lg:justify-self-end">
      <div data-reveal="clip" data-reveal-radius="1.25rem" className="overflow-hidden rounded-card">
        <Photo photo={photo} radius="none" sizes="(min-width: 1024px) 26rem, calc(100vw - 2.5rem)" />
      </div>
      <figcaption className="mt-2 text-meta text-text-secondary">{photoCaption(photo)}</figcaption>
    </figure>
  );
}


/** Questions fréquentes (mobilite.hub.faq.<id>.q et .a). Réponse sur la gratuité : sans nommer le financeur tant que la
 *  question n'est pas tranchée (contrat §13) ; une seule mention de gratuité. */
const MOBILITY_FAQS = ['gratuit', 'visas', 'identite', 'niveau'] as const;

/** « Pourquoi » : les trois engagements (mobilite.hub.raisons.<id>.title et .desc). */
const WHY_ITEMS = ['frais', 'arnaques', 'exigence'] as const;

/**
 * Témoignages : masqués (groupe 7.1). Ces deux citations sont des exemples non validés ; elles restent ici, sans être
 * affichées, jusqu'à ce que la fondation fournisse de vrais témoignages avec l'accord écrit des personnes. Pour les
 * afficher, les placer dans TESTIMONIALS (la section réapparaît dès qu'il y en a un).
 */
const TESTIMONIALS: { name: string; track: string; text: string }[] = [];
export const EXAMPLE_TESTIMONIALS_NOT_VALIDATED = [
  {
    name: 'Boris K. (TODO : confirmer témoignage)',
    track: 'Parcours Allemand /anglais B1 & Orientation Formation (Ausbildung)',
    text: '« Avant de connaître WAHHF, on me demandait des sommes énormes sur les réseaux sociaux pour de simples formulaires. Ici, j’ai appris l’allemand /anglais gratuitement et compris comment postuler moi-même sur les sites officiels. »',
  },
  {
    name: 'Raïssa T. (TODO : confirmer témoignage)',
    track: 'Parcours Études Universitaires · Niveau B2',
    text: '« Les séances de relecture de CV et d’explication des démarches consulaires m’ont permis de structurer mon projet d’études avec sérénité et honnêteté. »',
  },
];

export default function MobilityHub() {
  const { t, localized } = useLocalize();
  const { steps: levelSteps } = useLevels();
  const filRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <SEO
        title={t('mobilite.hub.seoTitle')}
        description={t('mobilite.hub.seoDescription')}
      />

      {/* En-tête : titre, avertissement juste dessous (avant la photo sur téléphone), photo de l'Open Day légendée */}
      <PageHeader
        reveal
        revealPhoto
        catalogPhoto={HEADER_PHOTO}
        photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}
        photoId="open-day-visioconference"
        photoRatio="source"
        notice={<DisclaimerBanner />}
      >
        <PageTitle>{t('mobilite.hub.title')}</PageTitle>

        <PageIntro>{t('mobilite.hub.intro')}</PageIntro>

        <PageActions>
          <PrimaryButton to="/candidater">{t('mobilite.hub.ctaCandidater')}</PrimaryButton>
          <SecondaryButton to="/mobilite-langues/academie">{t('mobilite.hub.ctaAcademie')}</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* LES DEUX PORTES D'ENTRÉE */}
      <Section tone="sauge">
        <div className="container-page space-y-12">
          <SectionHeader title={t('mobilite.hub.portesTitle')} subtitle={t('mobilite.hub.portesSubtitle')} />

          {/* Porte 1 : l'Académie, avec le fil A1 → C1 (contrat §6) ; il se dessine au défilement sur ordinateur */}
          <div className="border-t border-border-subtle pt-6 space-y-6">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12">
              <div data-reveal="" className="space-y-4 lg:col-span-7">
                <h3 className="text-body font-semibold text-text">{t('mobilite.hub.academieTitle')}</h3>
                <p className="text-body text-text-secondary max-w-[65ch]">{t('mobilite.hub.academieText')}</p>
              </div>
              <DoorPhoto photo={ACADEMY_PHOTO} />
            </div>
            <div ref={filRef} role="group" aria-label={t('mobilite.commun.filAria')}>
              <Fil
                orientation="auto"
                steps={levelSteps}
                end={{ id: 'europe', label: t('mobilite.commun.europe') }}
              />
            </div>
            <AfterFirstDisplay>
              <FilScrub scope={filRef} />
            </AfterFirstDisplay>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <SecondaryButton to="/mobilite-langues/academie">{t('mobilite.hub.academieBouton')}</SecondaryButton>
              <Link to="/mobilite-langues/academie#test-niveau" className={TEXT_LINK_CLASS}>
                {t('mobilite.hub.academieTest')}
              </Link>
            </div>
          </div>

          {/* Porte 2 : l'accompagnement vers l'Europe */}
          <div className="border-t border-border-subtle pt-6 space-y-6">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div data-reveal="" className="space-y-4 lg:col-span-7">
              <h3 className="text-body font-semibold text-text">{t('mobilite.hub.europeTitle')}</h3>
              <p className="text-body text-text-secondary max-w-[65ch]">{t('mobilite.hub.europeText')}</p>
              <div className="flex flex-wrap gap-x-5">
                {COUNTRIES_DATA.map((c) => (
                  <Link key={c.slug} to={`/accompagnement/pays/${c.slug}`} className={TEXT_LINK_CLASS}>
                    {c.flag} {localized(c, `contenu.pays.${c.slug}`).name}
                  </Link>
                ))}
              </div>
            </div>
              <DoorPhoto photo={EUROPE_PHOTO} />
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <SecondaryButton to="/mobilite-langues/accompagnement">{t('mobilite.hub.europeBouton')}</SecondaryButton>
              <Link to="/accompagnement/eviter-les-arnaques" className={TEXT_LINK_CLASS}>
                {t('mobilite.hub.europeArnaques')}
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* POURQUOI CE PROGRAMME EXISTE */}
      <section className="container-page section-space">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionHeader title={t('mobilite.hub.pourquoiTitle')} subtitle={t('mobilite.hub.pourquoiSubtitle')} />

            <div className="space-y-4 text-body text-text-secondary max-w-[65ch]">
              <p>{t('mobilite.hub.pourquoiText')}</p>
            </div>
          </div>

          <TextList columns={1} className="lg:col-span-5">
            {WHY_ITEMS.map((id) => (
              <TextListItem key={id} title={t(`mobilite.hub.raisons.${id}.title`)}>
                <p>{t(`mobilite.hub.raisons.${id}.desc`)}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </section>

      {/* TÉMOIGNAGES : seulement des témoignages réels et autorisés (aucun pour l'instant) */}
      {TESTIMONIALS.length > 0 && (
        <section className="container-page section-space space-y-10">
          <SectionHeader title={t('mobilite.hub.temoignagesTitle')} />
          <TextList columns={2}>
            {TESTIMONIALS.map((item) => (
              <TextListItem key={item.name} title={item.name} meta={item.track}>
                <p>{item.text}</p>
              </TextListItem>
            ))}
          </TextList>
        </section>
      )}

      {/* FAQ */}
      <Section tone="sauge">
        <div className="container-page space-y-10">
          <SectionHeader title={t('mobilite.hub.faqTitle')} />

          {/* FAQ (retouches du 19/11, « trop de texte ») : chaque question s'ouvre sur sa réponse (<details> natif : clavier,
              Entrée et Espace, lecteurs d'écran « réduit / développé ») ; question en 600, filet entre les lignes */}
          <div className="max-w-[65ch] border-b border-border-subtle">
            {MOBILITY_FAQS.map((id) => (
              <details key={id} data-reveal="" className="group border-t border-border-subtle">
                <summary className="flex min-h-11 cursor-pointer list-none items-start justify-between gap-4 py-5 text-body font-semibold text-text [&::-webkit-details-marker]:hidden">
                  <span>{t(`mobilite.hub.faq.${id}.q`)}</span>
                  <Plus aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-link transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="pb-6 text-body text-text-secondary">{t(`mobilite.hub.faq.${id}.a`)}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* UNE SEULE ACTION EN FIN DE PAGE : sur le fond de la page, sans carte nuit au-dessus du footer */}
      <section className="container-page section-space">
        <div className="max-w-[65ch] space-y-5">
          <SectionHeader title={t('mobilite.commun.cohorte')} subtitle={t('mobilite.hub.finSubtitle')} />
          <PrimaryButton to="/candidater" size="lg">
            {t('mobilite.commun.candidater')}
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}
