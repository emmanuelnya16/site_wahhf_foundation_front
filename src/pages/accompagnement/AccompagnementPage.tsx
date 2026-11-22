import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { CardLink, CardBody, CardMeta, CardTitle } from '../../components/wahhf/Card';
import PageHeader, { PageBreadcrumb, PageTitle, PageIntro, PageActions } from '../../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import DisclaimerBanner from '../../components/wahhf/DisclaimerBanner';
import Section from '../../components/wahhf/Section';
import FilSteps from '../../components/wahhf/FilSteps';
import CountryList from '../../components/wahhf/CountryList';
import ChunkErrorBoundary from '../../components/wahhf/ChunkErrorBoundary';
import { CountryCode, EuStatus } from '../../components/wahhf/CountryBadges';
import { AfterFirstDisplay, FilStepsScrub } from '../../effects/DeferredMotion';
import { fetchGeo, GEO_URLS } from '../../lib/geoData';
import { followAnchorLink } from '../../lib/scroll';
import { COUNTRIES_DATA } from '../../services/api';
import { useLocalize } from '../../lib/localize';
import { filSteps } from './steps';
import { NB, pieces } from './i18n';
import { photoCaption, photoOrFallback } from '../../lib/photos';

/*
 * Accompagnement vers l'Europe (/mobilite-langues/accompagnement), groupe 7.4 : contrat validé, audit ACCO-01 à ACCO-03,
 * T-22, PAYS-05, T-12, T-15, T-17.
 * - En-tête du lot 5 révélé comme le hero ; l'avertissement anti-arnaque juste sous le titre ; deux boutons.
 * - Une seule suite de 5 étapes (ACCO-02 : les 4 étapes et les 5 guides fusionnés), chaque titre menant à son guide ;
 *   l'étape « éviter les arnaques » mène enfin au bon guide (ACCO-01). Les étapes sont reliées par le fil, qui se dessine
 *   au défilement sur ordinateur (FilStepsScrub) et reste tracé ailleurs.
 * - Les 10 pays : en tête de section, la liste synchronisée avec la mini-carte d'Europe (ACCO-03), dont l'arc se trace
 *   à l'entrée puis se retrace à chaque changement de pays (ordinateur) ; sur téléphone, la liste seule (la carte n'y est
 *   pas téléchargée). La liste mène à chaque fiche, avec le code du pays (plus de drapeau emoji, T-22) et « Hors UE » en
 *   ambre ; au clavier, elle seule reçoit le focus (les pays de la carte restent cliquables à la souris). La phrase qui
 *   énumère les pays suit l'ordre des données (PAYS-05).
 * - Revue du groupe 7.4 : les 10 cartes des fiches, posées sous la liste et la carte, ne sont plus affichées : elles
 *   proposaient les 10 mêmes pays une deuxième fois (30 arrêts au clavier pour 10 destinations, 39 % de la page sur
 *   téléphone), la redite que ACCO-02 retire. Gardées dans le code (CountryCards, SHOW_COUNTRY_CARDS), à valider.
 * - « Choisir un pays » : défilement jusqu'à la section des pays, focus sur son titre, à chaque appui (followAnchorLink).
 * - Fin de page sur le fond de la page : « Être accompagné » et « Signaler une arnaque » (ACCO-02), sans carte nuit ; les
 *   deux boutons alignés, quelle que soit la longueur des textes au-dessus.
 * - Gratuité : dite par l'avertissement, au premier écran ; jamais dans un titre.
 * - Retouches du 19/11 (des images) : photo dans l'en-tête, l'intervenant devant la diapositive de la fondation le
 *   25 avril (A59), ou, tant que l'accord parental manque (production), devant l'écran et le kakémono (A46) ;
 *   découverte du bas vers le haut sur ordinateur, comme Mobilité.
 * - Lot 7.10 : textes du paquet « accompagnement » (FR / EN / DE) ; noms des pays dans la langue en cours
 *   (contenu.pays.<slug> des textes communs, puis accompagnement.contenu.pays.<slug>).
 */

const HEADER_PHOTO = photoOrFallback('A59', 'A46');

const EuropeMiniMap = lazy(() => import('../../components/wahhf/EuropeMiniMap'));

/** Les 10 pays dans la langue en cours, dans l'ordre des données (nom : textes communs ; le reste : paquet de la page) */
function useCountries() {
  const { localized } = useLocalize();
  return COUNTRIES_DATA.map((c) => localized(c, [`contenu.pays.${c.slug}`, `accompagnement.contenu.pays.${c.slug}`]));
}

function MapPlaceholder() {
  const { t } = useLocalize();
  return (
    <div role="status" aria-busy="true" className="absolute inset-0 rounded-inner bg-surface-raised flex items-center justify-center text-meta text-text-secondary">
      {t('accompagnement.hub.chargementCarte')}
    </div>
  );
}
const mapPlaceholder = <MapPlaceholder />;

/**
 * La liste des 10 pays et la mini-carte, synchronisées (survol ou focus d'un pays dans l'une, repère dans l'autre).
 * La carte (react-simple-maps, d3-geo et les données de public/geo) n'est téléchargée qu'à partir de 768 px, quand la
 * section approche de l'écran ; en dessous, la liste seule (audit ACCO-03).
 */
/**
 * Les 10 cartes des fiches (code, nom, statut UE, langues, résumé) : plus affichées (revue du groupe 7.4, ci-dessus).
 * La liste mène déjà à chaque fiche, qui reprend le résumé en introduction. SHOW_COUNTRY_CARDS à true les rétablit ;
 * la note sur l'Albanie, écrite en dur dans la boucle, en est retirée (« Hors UE » suffit, la fiche porte la précision
 * juridique de euNote).
 */
const SHOW_COUNTRY_CARDS = false;

function CountryCards() {
  const { t } = useLocalize();
  const countries = useCountries();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Collection cliquable : papier sur sauge, sans bordure, filigrane ni « Consulter » (contrat §8) */}
      {countries.map((country) => (
        <CardLink key={country.slug} to={`/accompagnement/pays/${country.slug}`} surface="section">
          <CardBody>
            <CardTitle className="flex items-center gap-3">
              <CountryCode code={country.code} />
              {country.name}
            </CardTitle>
            <CardMeta>
              <EuStatus isEU={country.isEU} short />
              <span>{pieces(t('accompagnement.commun.langues'), { nb: NB, liste: country.languages.join(', ') })}</span>
            </CardMeta>
            <p className="text-body text-text-secondary">{country.summary}</p>
          </CardBody>
        </CardLink>
      ))}
    </div>
  );
}

function CountriesWithMap() {
  const [active, setActive] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [loadMap, setLoadMap] = useState(false);

  useEffect(() => {
    const el = mapRef.current;
    if (!el) return;
    const wide = window.matchMedia('(min-width: 768px)');
    let observer: IntersectionObserver | undefined;
    const start = () => {
      fetchGeo(GEO_URLS.world);
      setLoadMap(true);
    };
    const arm = () => {
      if (!wide.matches || observer) return;
      if (typeof IntersectionObserver === 'undefined') return start();
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            start();
            observer?.disconnect();
          }
        },
        { rootMargin: '280px 0px' }
      );
      observer.observe(el);
    };
    arm();
    wide.addEventListener('change', arm);
    return () => {
      observer?.disconnect();
      wide.removeEventListener('change', arm);
    };
  }, []);

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-stretch">
      <CountryList activeCountrySlug={active} onHoverCountry={setActive} nonEuWarning />
      <div ref={mapRef} data-map="europe" className="hidden md:block relative min-h-[320px]">
        {loadMap ? (
          <ChunkErrorBoundary className="absolute inset-0 text-text">
            <Suspense fallback={mapPlaceholder}>
              <EuropeMiniMap activeCountrySlug={active} onHoverCountry={setActive} redrawArc keyboard={false} />
            </Suspense>
          </ChunkErrorBoundary>
        ) : (
          mapPlaceholder
        )}
      </div>
    </div>
  );
}

export default function AccompagnementPage() {
  const stepsRef = useRef<HTMLDivElement>(null);
  const { t } = useLocalize();
  const names = useCountries().map((c) => c.name);
  // « Allemagne, Luxembourg, …, Pologne et Albanie », dans l'ordre des données
  const countryList = `${names.slice(0, -1).join(', ')} ${t('accompagnement.hub.et')} ${names[names.length - 1]}`;
  return (
    <>
      <SEO title={t('accompagnement.hub.seoTitre')} description={t('accompagnement.hub.seoDescription', { liste: names.join(', ') })} />

      <PageHeader
        reveal
        revealPhoto
        catalogPhoto={HEADER_PHOTO}
        photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}
        notice={<DisclaimerBanner />}
      >
        <PageBreadcrumb
          items={[{ label: t('accompagnement.commun.mobilite'), to: '/mobilite-langues' }, { label: t('accompagnement.commun.accompagnement') }]}
        />

        <PageTitle>{t('accompagnement.hub.titre')}</PageTitle>

        <PageIntro>{t('accompagnement.hub.intro')}</PageIntro>

        <PageActions>
          <PrimaryButton to="/candidater?souhait=accompagnement_europe">{t('accompagnement.commun.etreAccompagne')}</PrimaryButton>
          <SecondaryButton to="#pays" onClick={(event) => followAnchorLink(event, 'pays')}>
            {t('accompagnement.hub.choisirPays')}
          </SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* LES 5 ÉTAPES (étapes et guides fusionnés), reliées par le fil */}
      <Section>
        <div className="container-page space-y-10">
          <SectionHeader title={t('accompagnement.hub.etapesTitre')} subtitle={t('accompagnement.hub.etapesSousTitre')} />
          <div ref={stepsRef}>
            <FilSteps steps={filSteps()} />
          </div>
          <AfterFirstDisplay>
            <FilStepsScrub scope={stepsRef} />
          </AfterFirstDisplay>
        </div>
      </Section>

      {/* LES 10 PAYS : liste et mini-carte en tête de section (les cartes des fiches ne sont plus affichées) */}
      <Section tone="sauge" id="pays">
        <div className="container-page space-y-12">
          <SectionHeader title={t('accompagnement.commun.dixPays')} subtitle={t('accompagnement.hub.paysSousTitre', { liste: countryList })} />

          <CountriesWithMap />

          {SHOW_COUNTRY_CARDS && <CountryCards />}
        </div>
      </Section>

      {/* FIN DE PAGE (ACCO-02) : être accompagné, ou signaler une arnaque ; sur le fond de la page, sans carte nuit.
          Colonnes en flex : chaque bouton descend en bas de sa colonne (mt-auto), les deux sont alignés dès 768 px. */}
      <Section>
        <div className="container-page grid gap-12 md:grid-cols-2">
          <div className="max-w-[65ch] flex flex-col gap-5">
            <SectionHeader title={t('accompagnement.commun.etreAccompagne')} subtitle={t('accompagnement.commun.formulaire')} />
            <div className="mt-auto">
              <PrimaryButton to="/candidater?souhait=accompagnement_europe" size="lg">
                {t('accompagnement.hub.demander')}
              </PrimaryButton>
            </div>
          </div>
          <div className="max-w-[65ch] flex flex-col gap-5">
            <SectionHeader title={t('accompagnement.hub.signalerTitre')} subtitle={t('accompagnement.hub.signalerSousTitre')} />
            <div className="mt-auto">
              <SecondaryButton to="/accompagnement/eviter-les-arnaques#signaler" size="lg">
                {t('accompagnement.hub.signalerTitre')}
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
