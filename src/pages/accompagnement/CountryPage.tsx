import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import StepNumber from '../../components/wahhf/StepNumber';
import Fil from '../../components/wahhf/Fil';
import PageHeader, { PageMeta, PageTitle, PageIntro, PageActions } from '../../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import DisclaimerBanner from '../../components/wahhf/DisclaimerBanner';
import InfoBox from '../../components/wahhf/InfoBox';
import { COUNTRIES_DATA } from '../../services/api';
import NotFoundPage, { NotFoundLinks, COUNTRY_LINKS } from '../NotFoundPage';

/** Fiche pays (/accompagnement/pays/:countrySlug), gabarit des 10 fiches (venu de EuropeSupport.tsx, vue 1). */
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

  return (
    <>
      <SEO
        title={`${country.name} — Fiche d'orientation gratuite vers l'Europe`}
        description={`Information vérifiée et gratuite sur les études, la formation et le travail en ${country.name} par WAHHF Foundation.`}
      />

      <PageHeader>
        <PageMeta>
          <Link to="/mobilite-langues">
            Mobilité & Langues
          </Link>
          <span>/</span>
          <Link to="/mobilite-langues/accompagnement">
            Accompagnement Europe
          </Link>
          <span>/</span>
          <span>{country.name}</span>
        </PageMeta>

        <div className="flex flex-wrap items-center gap-4">
          <span className="text-5xl leading-none" aria-hidden="true">
            {country.flag}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <PageTitle>
                S’orienter vers : {country.name}
              </PageTitle>
              <span className="px-3 py-1 rounded-pill border border-border-input text-meta text-text">
                {country.isEU
                  ? 'Membre de l’Union européenne (UE)'
                  : 'Hors Union européenne (Pays candidat)'}
              </span>
            </div>
            <p className="text-meta text-text-secondary mt-2">
              Langues parlées / d’études : {country.languages.join(' · ')}
            </p>
          </div>
        </div>

        {/* Le fil Cameroun → pays se dessine une fois, à l'arrivée (CSS, contrat §10, lot 7) ; tracé en mouvement réduit */}
        <Fil start={{ id: 'cameroun', label: 'Cameroun' }} end={{ id: country.slug, label: country.name }} drawOnce className="max-w-[65ch]" />
        <PageIntro>
          {country.summary}
        </PageIntro>

        <PageActions>
          <PrimaryButton
            to={`/candidater?souhait=accompagnement_europe&pays=${country.slug}`}
          >
            Être accompagné gratuitement pour : {country.name}
          </PrimaryButton>
          <SecondaryButton to="/mobilite-langues/accompagnement">
            Voir les 10 pays accompagnés
          </SecondaryButton>
        </PageActions>
      </PageHeader>

      {/* BLOC D'AVERTISSEMENT STANDARD OBLIGATOIRE */}
      <section className="container-page space-y-4">
        <DisclaimerBanner />

        {/* Mention explicite obligatoire si le pays n'est pas membre de l'UE (Albanie) */}
        {!country.isEU && country.euNote && (
          <InfoBox tone="warning" title="Précision juridique importante concernant l’Albanie (État non membre de l’UE)">
            <p>{country.euNote}</p>
          </InfoBox>
        )}
      </section>

      {/* Voies possibles : Études, Formation, Travail */}
      <section className="container-page section-space space-y-12">
        <SectionHeader
          title="Les trois grandes voies de mobilité réglementaire"
          subtitle="Aperçu informatif et gratuit. Vérifiez systématiquement les critères à jour sur les portails officiels ci-dessous."
        />

        <TextList columns={3}>
          {[
            {
              num: '01',
              title: 'Études supérieures',
              text: country.pathways.studies,
            },
            {
              num: '02',
              title: 'Formation professionnelle',
              text: country.pathways.training,
            },
            {
              num: '03',
              title: 'Travail & mobilité qualifiée',
              text: country.pathways.work,
            },
          ].map((p) => (
            <TextListItem key={p.num} title={p.title}>
              <p>{p.text}</p>
            </TextListItem>
          ))}
        </TextList>

        {/* Grandes étapes & Liens officiels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
          <div className="lg:col-span-7 space-y-5">
            <h3 className="text-body font-semibold text-text">
              Les grandes étapes pour préparer votre projet vers : {country.name}
            </h3>
            <ol className="space-y-4">
              {country.steps.map((st, i) => (
                <li key={st} className="flex items-start gap-4">
                  <StepNumber n={i + 1} />
                  <span className="pt-1 text-body text-text">{st}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="surface-green lg:col-span-5 rounded-card bg-nuit text-text-on-inverse p-7 sm:p-8 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-body font-semibold text-text-on-inverse">
                Liens vers les sites officiels ({country.name})
              </h3>
              <p className="text-meta text-text-secondary-on-inverse">
                Ne vous fiez jamais à des pages non officielles. Consultez directement les portails institutionnels :
              </p>

              <ul className="pt-2">
                {country.officialLinks.map((lnk) => (
                  <li key={lnk.url} className="border-t border-border-subtle-on-inverse py-3">
                    <a
                      href={lnk.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 text-body font-semibold text-link-on-inverse underline underline-offset-4 decoration-1 hover:decoration-2"
                    >
                      {lnk.label}
                      <span className="sr-only"> (nouvel onglet)</span>
                      <ArrowUpRight aria-hidden="true" className="w-4 h-4 shrink-0" />
                    </a>
                    <p className="text-meta text-text-secondary-on-inverse break-all">
                      {lnk.url} ({lnk.todoNote})
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4">
              <Link
                to="/accompagnement/eviter-les-arnaques"
                className="inline-flex min-h-11 items-center text-body text-link-on-inverse underline underline-offset-4"
              >
                Lire notre guide de vigilance contre les fausses offres
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation rapide entre les 10 pays */}
        <div className="pt-8 border-t border-border-subtle space-y-4">
          <p className="text-meta text-text-secondary">
            Consulter une autre fiche parmi les 10 pays accompagnés :
          </p>
          <div className="flex flex-wrap gap-2">
            {COUNTRIES_DATA.map((c) => (
              <Link
                key={c.slug}
                to={`/accompagnement/pays/${c.slug}`}
                className={`px-3.5 py-2 rounded-pill text-xs font-medium transition-colors ${
                  c.slug === country.slug
                    ? 'bg-action text-or font-semibold'
                    : 'bg-surface-raised border border-nuit/15 text-text hover:border-or'
                }`}
              >
                {c.flag} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
