import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { CardLink, CardBody, CardMeta, CardTitle, CardNote } from '../../components/wahhf/Card';
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
import { COUNTRIES_DATA } from '../../services/api';
import { filSteps } from './steps';

/*
 * Accompagnement vers l'Europe (/mobilite-langues/accompagnement), groupe 7.4 : contrat validé, audit ACCO-01 à ACCO-03,
 * T-22, PAYS-05, T-12, T-15, T-17.
 * - En-tête du lot 5 révélé comme le hero ; l'avertissement anti-arnaque juste sous le titre ; deux boutons.
 * - Une seule suite de 5 étapes (ACCO-02 : les 4 étapes et les 5 guides fusionnés), chaque titre menant à son guide ;
 *   l'étape « éviter les arnaques » mène enfin au bon guide (ACCO-01). Les étapes sont reliées par le fil, qui se dessine
 *   au défilement sur ordinateur (FilStepsScrub) et reste tracé ailleurs.
 * - Les 10 pays : en tête de section, la liste synchronisée avec la mini-carte d'Europe (ACCO-03), dont l'arc se trace
 *   à l'entrée puis se retrace à chaque changement de pays (ordinateur) ; sur téléphone, la liste seule (la carte n'y est
 *   pas téléchargée). Puis les fiches, en cartes cliquables avec le code du pays (plus de drapeau emoji, T-22) et
 *   « Hors UE » en ambre. La phrase qui énumère les pays suit l'ordre des données (PAYS-05).
 * - Fin de page sur le fond de la page : « Être accompagné » et « Signaler une arnaque » (ACCO-02), sans carte nuit.
 * - Gratuité : dite par l'avertissement, au premier écran ; jamais dans un titre.
 */

const EuropeMiniMap = lazy(() => import('../../components/wahhf/EuropeMiniMap'));

const NB = ' ';
const names = COUNTRIES_DATA.map((c) => c.name);
/** « Allemagne, Luxembourg, …, Pologne et Albanie », dans l'ordre des données */
const COUNTRY_LIST = `${names.slice(0, -1).join(', ')} et ${names[names.length - 1]}`;

const mapPlaceholder = (
  <div role="status" aria-busy="true" className="absolute inset-0 rounded-inner bg-surface-raised flex items-center justify-center text-meta text-text-secondary">
    Chargement de la carte Europe…
  </div>
);

/**
 * La liste des 10 pays et la mini-carte, synchronisées (survol ou focus d'un pays dans l'une, repère dans l'autre).
 * La carte (react-simple-maps, d3-geo et les données de public/geo) n'est téléchargée qu'à partir de 768 px, quand la
 * section approche de l'écran ; en dessous, la liste seule (audit ACCO-03).
 */
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
              <EuropeMiniMap activeCountrySlug={active} onHoverCountry={setActive} redrawArc />
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
  return (
    <>
      <SEO
        title="Accompagnement vers l'Europe — 5 étapes et 10 pays accompagnés"
        description={`Orientation gratuite et transparente vers 10 pays européens (${names.join(', ')}) par WAHHF Foundation.`}
      />

      <PageHeader reveal notice={<DisclaimerBanner />}>
        <PageBreadcrumb items={[{ label: 'Mobilité & Langues', to: '/mobilite-langues' }, { label: 'Accompagnement vers l’Europe' }]} />

        <PageTitle>Un accompagnement transparent, étape par étape</PageTitle>

        <PageIntro>
          Comprendre les parcours légaux, préparer un dossier authentique, apprendre la langue du pays et vérifier chaque information sur les portails officiels de 10 pays européens.
        </PageIntro>

        <PageActions>
          <PrimaryButton to="/candidater?souhait=accompagnement_europe">Être accompagné</PrimaryButton>
          <SecondaryButton to="#pays">Choisir un pays</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* LES 5 ÉTAPES (étapes et guides fusionnés), reliées par le fil */}
      <Section>
        <div className="container-page space-y-10">
          <SectionHeader title="Votre parcours en 5 étapes" subtitle="Chaque étape mène à son guide pratique." />
          <div ref={stepsRef}>
            <FilSteps steps={filSteps()} />
          </div>
          <AfterFirstDisplay>
            <FilStepsScrub scope={stepsRef} />
          </AfterFirstDisplay>
        </div>
      </Section>

      {/* LES 10 PAYS : liste et mini-carte en tête de section, puis les fiches */}
      <Section tone="sauge" id="pays">
        <div className="container-page space-y-12">
          <SectionHeader
            title="Les 10 pays accompagnés"
            subtitle={`${COUNTRY_LIST}. Pour chaque pays, une fiche présente les voies légales et les sites officiels.`}
          />

          <CountriesWithMap />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Collection cliquable : papier sur sauge, sans bordure, filigrane ni « Consulter » (contrat §8) */}
            {COUNTRIES_DATA.map((country) => (
              <CardLink key={country.slug} to={`/accompagnement/pays/${country.slug}`} surface="section">
                <CardBody>
                  <CardTitle className="flex items-center gap-3">
                    <CountryCode code={country.code} />
                    {country.name}
                  </CardTitle>
                  <CardMeta>
                    <EuStatus isEU={country.isEU} short />
                    <span>Langues{NB}: {country.languages.join(', ')}</span>
                  </CardMeta>
                  <p className="text-body text-text-secondary">{country.summary}</p>
                  {!country.isEU && (
                    <CardNote>
                      <strong>Note{NB}:</strong> L’Albanie est un pays européen candidat mais n’est pas membre de l’Union européenne.
                    </CardNote>
                  )}
                </CardBody>
              </CardLink>
            ))}
          </div>
        </div>
      </Section>

      {/* FIN DE PAGE (ACCO-02) : être accompagné, ou signaler une arnaque ; sur le fond de la page, sans carte nuit */}
      <Section>
        <div className="container-page grid gap-12 md:grid-cols-2">
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader
              title="Être accompagné"
              subtitle="Un seul formulaire pour l’orientation vers l’Europe et les cours d’allemand. Aucun document d’identité ni paiement ne vous est demandé."
            />
            <PrimaryButton to="/candidater?souhait=accompagnement_europe" size="lg">
              Demander un accompagnement
            </PrimaryButton>
          </div>
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader
              title="Signaler une arnaque"
              subtitle={`Une personne vous demande de l’argent au nom de WAHHF Foundation${NB}? Interrompez tout échange et prévenez-nous.`}
            />
            <SecondaryButton to="/accompagnement/eviter-les-arnaques#signaler" size="lg">
              Signaler une arnaque
            </SecondaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}
