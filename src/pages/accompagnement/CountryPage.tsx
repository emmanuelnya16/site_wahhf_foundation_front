import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem, TEXT_LINK_CLASS } from '../../components/wahhf/TextList';
import StepNumber from '../../components/wahhf/StepNumber';
import Fil from '../../components/wahhf/Fil';
import PageHeader, { PageBreadcrumb, PageTitle, PageIntro, PageActions } from '../../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import DisclaimerBanner from '../../components/wahhf/DisclaimerBanner';
import InfoBox from '../../components/wahhf/InfoBox';
import Section from '../../components/wahhf/Section';
import { CountryCode, EuStatus } from '../../components/wahhf/CountryBadges';
import { COUNTRIES_DATA, CountryGuide } from '../../services/api';
import { cn } from '../../lib/utils';
import NotFoundPage, { NotFoundLinks, COUNTRY_LINKS } from '../NotFoundPage';

/*
 * Fiche pays (/accompagnement/pays/:countrySlug), gabarit des 10 fiches, groupe 7.4 : contrat validé (§6 : le fil en
 * tête de fiche), audit PAYS-01, PAYS-03, PAYS-04, PAYS-05, T-22, ETA-06, A11Y-11.
 * - En-tête révélé comme le hero : code du pays (plus de drapeau emoji, T-22) et statut UE (« Hors Union européenne »
 *   en ambre), titre « S'orienter vers l'Allemagne » (PAYS-03 : l'article vient des données), puis le fil
 *   Cameroun → pays, trait droit qui se dessine une fois, puis la mention « Liens officiels vérifiés le … » en fondu,
 *   seulement quand la fondation a donné la date de chaque lien (PAYS-01) ; sinon rien.
 * - L'avertissement anti-arnaque (et la précision juridique d'un pays hors UE) juste sous le titre.
 * - Les trois voies ; puis, sur sauge, les grandes étapes et les sites officiels côte à côte, alignés en haut (PAYS-04),
 *   les sites en lignes de liens (plus de carte nuit), sans aucune note « TODO » ; « Lien vérifié le … » sous un lien
 *   quand sa date est fournie ; la navigation vers les autres fiches.
 * - Une seule action en fin de page, « Être accompagné pour partir en Allemagne », sans carte nuit.
 * Adresse en majuscules : redirection vers l'adresse en minuscules ; pays inconnu : page « introuvable » (ETA-06).
 */

const NB = ' ';
const DAY = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
/** « 12 novembre 2026 » (date ISO AAAA-MM-JJ) */
const formatDay = (iso: string) => DAY.format(new Date(`${iso}T00:00:00Z`));

/** Fin de l'en-tête : le fil (fondu dès 0,45 s, trait dessiné de 0,75 à 1,95 s), puis la mention de vérification. */
const VERIFIED_DELAY = '[--hero-fade-delay:1.95s]';

function CountryFiche({ country }: { country: CountryGuide }) {
  const links = country.officialLinks;
  // Toutes les dates fournies : la plus ancienne vaut pour la fiche ; sinon, aucune mention dans l'en-tête
  const allVerified = links.length > 0 && links.every((l) => l.verifiedOn);
  const oldest = allVerified ? links.map((l) => l.verifiedOn as string).sort()[0] : undefined;
  const applyTo = `/candidater?souhait=accompagnement_europe&pays=${country.slug}`;
  const actionLabel = `Être accompagné pour partir ${country.inside}`;

  return (
    <>
      <SEO
        title={`${country.name} — Fiche d'orientation gratuite vers l'Europe`}
        description={`Information gratuite sur les études, la formation et le travail ${country.inside}, par WAHHF Foundation.`}
        canonical={`/accompagnement/pays/${country.slug}`}
      />

      <PageHeader
        reveal
        notice={
          <div className="space-y-4">
            <DisclaimerBanner />
            {/* Mention explicite obligatoire si le pays n'est pas membre de l'UE (Albanie) */}
            {!country.isEU && country.euNote && (
              <InfoBox tone="warning" title={`Précision juridique importante concernant ${country.towards.replace(/^vers /, '')} (État non membre de l’UE)`}>
                <p>{country.euNote}</p>
              </InfoBox>
            )}
          </div>
        }
      >
        <PageBreadcrumb
          items={[
            { label: 'Mobilité & Langues', to: '/mobilite-langues' },
            { label: 'Accompagnement vers l’Europe', to: '/mobilite-langues/accompagnement' },
            { label: country.name },
          ]}
        />

        <div className="hero-fade [--hero-fade-delay:0.3s] flex flex-wrap items-center gap-x-3 gap-y-2">
          <CountryCode code={country.code} />
          <EuStatus isEU={country.isEU} />
        </div>

        <PageTitle>{`S’orienter ${country.towards}`}</PageTitle>

        <p className="hero-fade [--hero-fade-delay:0.4s] text-meta text-text-secondary">
          Langues{NB}: {country.languages.join(', ')}
        </p>

        {/* Le fil Cameroun → pays (contrat §6) : trait droit qui se dessine une fois, à l'arrivée, après le titre */}
        <div className="hero-fade [--hero-fade-delay:0.45s]">
          <Fil
            start={{ id: 'cameroun', label: 'Cameroun' }}
            end={{ id: country.slug, label: country.name }}
            drawOnce
            className="max-w-[65ch] [--fil-draw-delay:0.75s]"
          />
        </div>
        {oldest && (
          <p className={cn('hero-fade text-meta text-text-secondary', VERIFIED_DELAY)}>Liens officiels vérifiés le {formatDay(oldest)}</p>
        )}

        <PageIntro>{country.summary}</PageIntro>

        <PageActions>
          <PrimaryButton to={applyTo}>{actionLabel}</PrimaryButton>
          <SecondaryButton to="/mobilite-langues/accompagnement#pays">Voir les 10 pays accompagnés</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* Les trois voies : études, formation, travail */}
      <Section>
        <div className="container-page space-y-10">
          <SectionHeader
            title="Les trois grandes voies de mobilité réglementaire"
            subtitle="Aperçu informatif. Vérifiez toujours les critères à jour sur les portails officiels ci-dessous."
          />
          {/* break-words : « Fachkräfteeinwanderungsgesetz » ne déborde plus de sa colonne (RESP-04) */}
          <TextList columns={3} className="break-words">
            {[
              { title: 'Études supérieures', text: country.pathways.studies },
              { title: 'Formation professionnelle', text: country.pathways.training },
              { title: 'Travail et mobilité qualifiée', text: country.pathways.work },
            ].map((p) => (
              <TextListItem key={p.title} title={p.title}>
                <p>{p.text}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </Section>

      {/* Grandes étapes et sites officiels, alignés en haut (PAYS-04) ; puis les autres fiches */}
      <Section tone="sauge">
        <div className="container-page space-y-14">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-8">
              <SectionHeader title={`Les grandes étapes pour préparer votre projet ${country.towards}`} />
              <ol className="space-y-5 max-w-[65ch]">
                {country.steps.map((st, i) => (
                  <li key={st} data-reveal="" className="flex items-start gap-4">
                    <StepNumber n={i + 1} />
                    <span className="pt-1 text-body text-text">{st}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <SectionHeader
                title="Les sites officiels"
                subtitle="Ne vous fiez jamais à des pages non officielles. Consultez directement les portails institutionnels :"
              />
              {/* Lignes de liens (contrat §8), plus de carte nuit ; aucune note « à vérifier » (PAYS-01) */}
              <ul>
                {links.map((lnk) => (
                  <li key={lnk.url} data-reveal="" className="border-t border-border-subtle py-3 space-y-1">
                    <a
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-body font-semibold text-link underline underline-offset-4 decoration-1 hover:decoration-2"
                    >
                      <span>{lnk.label}</span>
                      <span className="sr-only"> (nouvel onglet)</span>
                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                    </a>
                    <p className="text-meta text-text-secondary break-all">{lnk.url}</p>
                    {lnk.verifiedOn && <p className="text-meta text-text-secondary">Lien vérifié le {formatDay(lnk.verifiedOn)}</p>}
                  </li>
                ))}
              </ul>
              <Link to="/accompagnement/eviter-les-arnaques" className={TEXT_LINK_CLASS}>
                Lire notre guide de vigilance contre les fausses offres
              </Link>
            </div>
          </div>

          {/* Navigation entre les 10 fiches : code (masqué aux lecteurs d'écran) et nom ; fiche affichée en aria-current */}
          <nav aria-labelledby="autres-pays" className="pt-8 border-t border-border-subtle space-y-4">
            <p id="autres-pays" className="text-body font-semibold text-text">
              Consulter une autre fiche parmi les 10 pays accompagnés
            </p>
            <ul className="flex flex-wrap gap-2">
              {COUNTRIES_DATA.map((c) => {
                const current = c.slug === country.slug;
                return (
                  <li key={c.slug}>
                    <Link
                      to={`/accompagnement/pays/${c.slug}`}
                      aria-current={current ? 'page' : undefined}
                      className={cn(
                        'inline-flex min-h-11 items-center gap-2 rounded-pill border-[1.5px] px-4 text-meta transition-colors duration-(--dur-fast)',
                        current
                          ? 'border-action bg-action text-on-action font-semibold'
                          : 'border-border-input text-text hover:border-action hover:text-link',
                      )}
                    >
                      <span aria-hidden="true" className="tabular-nums opacity-80">
                        {c.code}
                      </span>
                      {c.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </Section>

      {/* Une seule action en fin de page, sur le fond de la page, sans carte nuit au-dessus du footer */}
      <Section>
        <div className="container-page">
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader
              title="Être accompagné"
              subtitle="Un seul formulaire pour l’orientation vers l’Europe et les cours d’allemand. Aucun document d’identité ni paiement ne vous est demandé."
            />
            <PrimaryButton to={applyTo} size="lg">
              {actionLabel}
            </PrimaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}

export default function CountryPage() {
  const { countrySlug = '' } = useParams<{ countrySlug?: string }>();
  const country = COUNTRIES_DATA.find((c) => c.slug === countrySlug.toLowerCase());

  // Pays inconnu : on le dit, au lieu d'afficher la fiche d'un autre pays
  if (!country) {
    return (
      <NotFoundPage
        title="Ce pays ne fait pas partie des 10 pays accompagnés"
        message="WAHHF Foundation accompagne gratuitement vers 10 pays européens. Choisissez l’un d’eux ci-dessous pour consulter sa fiche d’orientation."
      >
        <NotFoundLinks heading="Les 10 pays accompagnés" links={COUNTRY_LINKS} />
      </NotFoundPage>
    );
  }
  // Une seule adresse par pays (ETA-06)
  if (countrySlug !== country.slug) return <Navigate replace to={`/accompagnement/pays/${country.slug}`} />;
  // Passer d'une fiche à l'autre remonte la page : l'en-tête et le fil rejouent leur arrivée
  return <CountryFiche key={country.slug} country={country} />;
}
