import { MouseEvent, useEffect, useRef } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import SEO from '../../components/wahhf/SEO';
import Section from '../../components/wahhf/Section';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import { TEXT_LINK_CLASS } from '../../components/wahhf/TextList';
import { DOMAINS_DATA } from '../../services/api';
import Photo from '../../components/wahhf/Photo';
import { photoCaption, photoOrFallback } from '../../lib/photos';
import { scrollToElement, scrollToHash } from '../../lib/scroll';
import { DOMAIN_PHOTO_IDS } from '../../config/domainPhotos';
import { AfterFirstDisplay, PhotoReveal } from '../../effects/DeferredMotion';

/*
 * Nos actions (groupe 7.3 : contrat validé, audit ACT-01, ACT-02, T-04, T-10, A11Y-09, A11Y-10).
 * - ACT-01 : une seule liste de domaines (plus de grille de cartes suivie des mêmes domaines en détail), chacun avec son
 *   texte complet (description, approche, programmes) ; une rangée de liens d'ancre en tête sert de sommaire.
 * - ACT-02 : « Soutenir ce domaine » mène à /faire-un-don?affectation=<domaine>, qui présélectionne l'affectation
 *   (DonatePage, groupe 7.2).
 * - T-04 : photo seulement si elle est réelle : une photo de la fondation par domaine (lot 7.6 et retouches du 19/11,
 *   DOMAIN_PHOTO_IDS), légendée par son album ; les images générées ne sont plus affichées (elles restent dans
 *   DOMAINS_DATA).
 * - T-10 : /nos-actions#education comme /nos-actions?domaine=education (méga-menu, footer) ouvrent la page sur le
 *   domaine demandé.
 * - Sommaire et arrivée sur un domaine (revue du groupe 7.3) : le titre du domaine reçoit le focus (tabIndex -1), Tab
 *   repart donc de là et non du haut de page ; l'adresse prend #domaine (lien partageable), aussi sur ordinateur à
 *   souris où le défilement fluide (Lenis) gère l'ancre. Aucun décalage d'ancre en plus : scrollToElement et Lenis
 *   tiennent déjà compte de l'en-tête fixe.
 * - Plan des titres : H1, puis un H2 par domaine (A11Y-09).
 * - Mouvement (contrat §10) : en-tête révélé comme le hero ; pour chaque domaine, sur ordinateur, la photo se découvre
 *   par clip-path puis le texte apparaît en fondu (PhotoReveal) ; tout est en place sur téléphone et en mouvement réduit.
 */

/** Le titre d'un domaine reçoit le focus, sans défilement de plus (le défilement est déjà demandé). */
const focusDomain = (slug: string) => document.getElementById(`domaine-${slug}`)?.focus({ preventScroll: true });
const isDomain = (slug: string | null) => !!slug && DOMAINS_DATA.some((d) => d.slug === slug);

/**
 * Une photo de la fondation par domaine (lot 7.6, vos choix du 19/11 ; retouches du 19/11 : Santé a la sienne, A63) :
 * src/config/domainPhotos.ts, partagé avec l'accueil. Une photo qui attend l'accord parental laisse la place à sa
 * remplaçante en production (A98 pour Éducation, B40 pour Environnement).
 */
/** Vue d'ensemble dans l'en-tête : la diapositive des domaines (A60), ou l'intervenant qui les présente (A66). */
const HEADER_PHOTO = photoOrFallback('A60', 'A66');

export function NosActionsPage() {
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const asked = searchParams.get('domaine');
  const listRef = useRef<HTMLDivElement>(null);

  // ?domaine=education (méga-menu, footer, recherche) : la page s'ouvre sur le domaine, comme avec l'ancre #education
  // (Layout fait défiler jusqu'à l'ancre) ; dans les deux cas, le titre du domaine reçoit le focus
  useEffect(() => {
    const fromHash = decodeURIComponent(hash.replace(/^#/, ''));
    if (hash) {
      if (isDomain(fromHash)) focusDomain(fromHash);
      return;
    }
    if (!asked || !isDomain(asked)) return;
    focusDomain(asked);
    return scrollToHash(`#${asked}`);
  }, [asked, hash]);

  // Lien du sommaire : défilement jusqu'au domaine (fluide avec Lenis, qui a déjà pris le clic), focus sur son titre,
  // adresse en #domaine sans nouvelle entrée d'historique
  const goTo = (slug: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.getElementById(slug);
    if (!target) return;
    if (!event.defaultPrevented) {
      event.preventDefault();
      scrollToElement(target);
    }
    focusDomain(slug);
    window.history.replaceState(window.history.state, '', `${window.location.pathname}#${slug}`);
  };

  return (
    <>
      <SEO
        title="Nos 6 domaines d'action — Éducation, santé, entrepreneuriat, environnement, droits, mobilité"
        description="Découvrez les 6 domaines d'intervention de WAHHF Foundation au Cameroun et vers l'Europe, et soutenez celui de votre choix."
      />

      <PageHeader reveal catalogPhoto={HEADER_PHOTO} photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}>
        <PageTitle>Agir sur tous les leviers de l’autonomie humaine</PageTitle>
        <PageIntro>
          Éducation, santé, entrepreneuriat des jeunes, environnement, droits et inclusion, Mobilité & Langues : les six
          domaines où la fondation agit. Vous pouvez soutenir celui de votre choix.
        </PageIntro>
        {/* Sommaire : liens d'ancre, sans photo (ACT-01) */}
        <nav aria-label="Les six domaines" className="hero-fade [--hero-fade-delay:0.55s]">
          <ul className="flex flex-wrap gap-x-5">
            {DOMAINS_DATA.map((d) => (
              <li key={d.id}>
                <Link to={`#${d.slug}`} replace onClick={goTo(d.slug)} className={TEXT_LINK_CLASS}>
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <Section>
        <div ref={listRef} className="container-page">
          {DOMAINS_DATA.map((dom) => {
            const [photoId, ...fallbacks] = DOMAIN_PHOTO_IDS[dom.slug] ?? [];
            const photo = photoId ? photoOrFallback(photoId, ...fallbacks) : null;
            const titleId = `domaine-${dom.slug}`;
            return (
              <section
                key={dom.id}
                id={dom.slug}
                aria-labelledby={titleId}
                data-photo-reveal=""
                className="border-t border-border-subtle first:border-t-0 first:pt-0 py-10 sm:py-14 grid gap-8 lg:grid-cols-12 lg:gap-12 items-start"
              >
                <div data-photo-reveal-text="" className="lg:col-span-7 space-y-4 max-w-[65ch]">
                  <h2 id={titleId} tabIndex={-1} className="text-section-title text-text">
                    {dom.title}
                  </h2>
                  <p className="text-body text-text">{dom.shortDesc}</p>
                  <p className="text-body text-text-secondary">{dom.fullDesc}</p>
                  <ul className="list-disc pl-5 space-y-1 text-body text-text marker:text-text-secondary">
                    {dom.programs.map((prog) => (
                      <li key={prog}>{prog}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {dom.slug === 'mobilite-langues' && (
                      <PrimaryButton to="/mobilite-langues">Découvrir Mobilité & Langues</PrimaryButton>
                    )}
                    <SecondaryButton to={`/faire-un-don?affectation=${dom.slug}`} ariaLabel={`Soutenir ce domaine : ${dom.title}`}>
                      Soutenir ce domaine
                    </SecondaryButton>
                  </div>
                </div>

                {photo && (
                  <figure className="lg:col-span-5 w-full max-w-[32rem] lg:justify-self-end">
                    <Photo
                      photo={photo}
                      sizes="(min-width: 1024px) 28rem, calc(100vw - 2.5rem)"
                      className="aspect-[16/10] object-cover"
                      imgAttributes={{ 'data-photo-reveal-media': '' }}
                    />
                    {/* Légende : l'album d'où vient la photo ; elle n'illustre pas un programme précis */}
                    <figcaption className="mt-2 text-meta text-text-secondary">{photoCaption(photo)}</figcaption>
                  </figure>
                )}
              </section>
            );
          })}
          <AfterFirstDisplay>
            <PhotoReveal scope={listRef} />
          </AfterFirstDisplay>
        </div>
      </Section>
    </>
  );
}

export default NosActionsPage;
