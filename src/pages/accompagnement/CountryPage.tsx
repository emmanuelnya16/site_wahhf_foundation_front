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
import { useLocalize } from '../../lib/localize';
import { NB, pieces } from './i18n';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';

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
 * Lot 7.10 : textes du paquet « accompagnement » ; la fiche dans la langue en cours (nom : contenu.pays.<slug> des
 * textes communs ; le reste : accompagnement.contenu.pays.<slug>) ; dates au format de la langue.
 */

/** « 12 novembre 2026 », « 12 November 2026 », « 12. November 2026 » (date ISO AAAA-MM-JJ) */
const formatDay = (iso: string, locale: string) =>
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${iso}T00:00:00Z`));

/** Fin de l'en-tête : le fil (fondu dès 0,45 s, trait dessiné de 0,75 à 1,95 s), puis la mention de vérification. */
const VERIFIED_DELAY = '[--hero-fade-delay:1.95s]';

/** Une fiche dans la langue en cours : nom dans les textes communs, le reste dans le paquet de la page */
const countryKeys = (slug: string) => [`contenu.pays.${slug}`, `accompagnement.contenu.pays.${slug}`];

function CountryFiche({ country: frCountry }: { country: CountryGuide }) {
  const { t, locale, localized } = useLocalize();
  const country = localized(frCountry, countryKeys(frCountry.slug));
  const links = country.officialLinks;
  // Toutes les dates fournies : la plus ancienne vaut pour la fiche ; sinon, aucune mention dans l'en-tête
  const allVerified = links.length > 0 && links.every((l) => l.verifiedOn);
  const oldest = allVerified ? links.map((l) => l.verifiedOn as string).sort()[0] : undefined;
  const applyTo = `/candidater?souhait=accompagnement_europe&pays=${country.slug}`;
  // « en Allemagne », « au Luxembourg » insécables : sur téléphone, le bouton passe à la ligne avant la préposition,
  // et non entre elle et le pays (revue du groupe 7.4)
  const actionLabel = t('accompagnement.pays.action', {
    inside: country.inside.replace(' ', NB),
    towards: country.towards.replace(' ', NB),
    name: country.name,
  });

  return (
    <>
      <SEO
        title={t('accompagnement.pays.seoTitre', { name: country.name })}
        description={t('accompagnement.pays.seoDescription', { inside: country.inside, name: country.name })}
        canonical={`/accompagnement/pays/${country.slug}`}
      />

      <PageHeader
        reveal
        notice={
          <div className="space-y-4">
            <DisclaimerBanner />
            {/* Mention explicite obligatoire si le pays n'est pas membre de l'UE (Albanie) */}
            {!country.isEU && country.euNote && (
              <InfoBox
                tone="warning"
                title={t('accompagnement.pays.precisionTitre', { pays: country.towards.replace(/^vers /, ''), name: country.name })}
              >
                <p>{country.euNote}</p>
              </InfoBox>
            )}
          </div>
        }
      >
        <PageBreadcrumb
          items={[
            { label: t('accompagnement.commun.mobilite'), to: '/mobilite-langues' },
            { label: t('accompagnement.commun.accompagnement'), to: '/mobilite-langues/accompagnement' },
            { label: country.name },
          ]}
        />

        <div className="hero-fade [--hero-fade-delay:0.3s] flex flex-wrap items-center gap-x-3 gap-y-2">
          <CountryCode code={country.code} />
          <EuStatus isEU={country.isEU} />
        </div>

        <PageTitle>{t('accompagnement.pays.titre', { towards: country.towards, inside: country.inside, name: country.name })}</PageTitle>

        <p className="hero-fade [--hero-fade-delay:0.4s] text-meta text-text-secondary">
          {pieces(t('accompagnement.commun.langues'), { nb: NB, liste: country.languages.join(', ') })}
        </p>

        {/* Le fil Cameroun → pays (contrat §6) : trait droit qui se dessine une fois, à l'arrivée, après le titre */}
        <div className="hero-fade [--hero-fade-delay:0.45s]">
          <Fil
            start={{ id: 'cameroun', label: t('accompagnement.pays.cameroun') }}
            end={{ id: country.slug, label: country.name }}
            drawOnce
            className="max-w-[65ch] [--fil-draw-delay:0.75s]"
          />
        </div>
        {oldest && (
          <p className={cn('hero-fade text-meta text-text-secondary', VERIFIED_DELAY)}>
            {pieces(t('accompagnement.pays.verifies'), { date: formatDay(oldest, locale) })}
          </p>
        )}

        <PageIntro>{country.summary}</PageIntro>

        <PageActions>
          <PrimaryButton to={applyTo}>{actionLabel}</PrimaryButton>
          <SecondaryButton to="/mobilite-langues/accompagnement#pays">{t('accompagnement.pays.voirPays')}</SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* Les trois voies : études, formation, travail */}
      <Section>
        <div className="container-page space-y-10">
          <SectionHeader title={t('accompagnement.pays.voiesTitre')} subtitle={t('accompagnement.pays.voiesSousTitre')} />
          {/* break-words : « Fachkräfteeinwanderungsgesetz » ne déborde plus de sa colonne (RESP-04) */}
          <TextList columns={3} className="break-words">
            {[
              { title: t('accompagnement.pays.voieEtudes'), text: country.pathways.studies },
              { title: t('accompagnement.pays.voieFormation'), text: country.pathways.training },
              { title: t('accompagnement.pays.voieTravail'), text: country.pathways.work },
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
              <SectionHeader
                title={t('accompagnement.pays.etapesTitre', { towards: country.towards, inside: country.inside, name: country.name })}
              />
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
              <SectionHeader title={t('accompagnement.pays.sitesTitre')} subtitle={t('accompagnement.pays.sitesSousTitre')} />
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
                      <span className="sr-only">{t('accompagnement.commun.nouvelOnglet')}</span>
                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                    </a>
                    <p className="text-meta text-text-secondary break-all">{lnk.url}</p>
                    {lnk.verifiedOn && (
                      <p className="text-meta text-text-secondary">
                        {pieces(t('accompagnement.pays.lienVerifie'), { date: formatDay(lnk.verifiedOn, locale) })}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
              <Link to="/accompagnement/eviter-les-arnaques" className={TEXT_LINK_CLASS}>
                {t('accompagnement.pays.vigilance')}
              </Link>
            </div>
          </div>

          {/* Navigation entre les 10 fiches : code (masqué aux lecteurs d'écran) et nom ; fiche affichée en aria-current */}
          <nav aria-labelledby="autres-pays" className="pt-8 border-t border-border-subtle space-y-4">
            <p id="autres-pays" className="text-body font-semibold text-text">
              {t('accompagnement.pays.autresFiches')}
            </p>
            <ul className="flex flex-wrap gap-2">
              {COUNTRIES_DATA.map((frC) => {
                const c = localized(frC, countryKeys(frC.slug));
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
            <SectionHeader title={t('accompagnement.commun.etreAccompagne')} subtitle={t('accompagnement.commun.formulaire')} />
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
  const { t, localized } = useLocalize();
  const country = COUNTRIES_DATA.find((c) => c.slug === countrySlug.toLowerCase());

  // Pays inconnu : on le dit, au lieu d'afficher la fiche d'un autre pays
  if (!country) {
    return (
      <NotFoundPage title={t('accompagnement.pays.introuvableTitre')} message={t('accompagnement.pays.introuvableMessage')}>
        <NotFoundLinks
          heading={t('accompagnement.commun.dixPays')}
          links={COUNTRIES_DATA.map((frC) => {
            const c = localized(frC, countryKeys(frC.slug));
            return { to: `/accompagnement/pays/${c.slug}`, label: `${c.name}${c.isEU ? '' : t('accompagnement.pays.horsUe')}` };
          })}
        />
      </NotFoundPage>
    );
  }
  // Une seule adresse par pays (ETA-06)
  if (countrySlug !== country.slug) return <Navigate replace to={`/accompagnement/pays/${country.slug}`} />;
  // Passer d'une fiche à l'autre remonte la page : l'en-tête et le fil rejouent leur arrivée
  return <CountryFiche key={country.slug} country={country} />;
}
