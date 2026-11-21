import SEO from '../../components/wahhf/SEO';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import { useTranslation } from 'react-i18next';
import { registerBundle } from '../../i18n';
import partenairesFr from '../../locales/partenaires/fr.json';

/** Textes de la page (lot 7.10) : src/locales/partenaires/ (espace de noms partenaires). */
registerBundle('partenaires', partenairesFr, {
  en: () => import('../../locales/partenaires/en.json'),
  de: () => import('../../locales/partenaires/de.json'),
});

/*
 * Partenaires (groupe 7.3 : contrat validé, audit PAR-01, T-11, T-15, T-17).
 * - PAR-01 : le groupe IROKO décrit concrètement, avec les seuls faits déjà présents dans le projet (pages historiques
 *   du groupe : une holding, neuf pôles en trois familles, IROKO Event en activité) ; son site et sa part du budget
 *   sont demandés à la fondation (docs/contenus-a-fournir.md). Plus de « 10 Pôles d'Expertise » ni de « 10 régions ».
 * - Catégories de partenaires marquées TODO masquées (EXAMPLE_PARTNER_CATEGORIES_NOT_VALIDATED). Revue du groupe 7.3 :
 *   la section « Les autres soutiens », qui ne gardait qu'une catégorie (les donateurs) dans une liste à trois
 *   colonnes et répétait l'introduction, est retirée ; les donateurs sont nommés dans l'introduction, la règle de
 *   l'accord écrit n'est dite qu'une fois (SUPPORTER_CATEGORIES_NOT_SHOWN garde le texte). La section « Ce que nous
 *   proposons » s'affiche dès que PARTNER_OFFERS est rempli (formats, contreparties, contact nommé : questions 104 et
 *   105).
 * - Plus de carte nuit bordée d'or ni de carte pour un bloc non cliquable (T-15) ; plus de « 01 » pour un seul
 *   partenaire (T-17) ; titre sans gratuité. Une seule action en fin de page : « Proposer un partenariat » (/agir#partenaire).
 * - Mouvement (contrat §10) : en-tête révélé comme le hero ; apparitions groupées des listes.
 */

/** Catégories d'exemple (TODO : liste officielle à confirmer) : gardées, jamais affichées. */
export const EXAMPLE_PARTNER_CATEGORIES_NOT_VALIDATED = [
  {
    title: 'Établissements scolaires & éducatifs (TODO)',
    desc: 'Écoles et centres communautaires accueillant nos bibliothèques, distributions de kits et ateliers linguistiques.',
  },
  {
    title: 'Professionnels de santé bénévoles (TODO)',
    desc: 'Médecins, infirmiers et sages-femmes mobilisés lors des campagnes gratuites de prévention sanitaire.',
  },
];

/**
 * Catégorie de soutien de l'ancienne liste, seule non marquée TODO : plus affichée seule (revue du groupe 7.3), les
 * donateurs sont nommés dans l'introduction. À reprendre avec la liste officielle des catégories (question 81).
 */
export const SUPPORTER_CATEGORIES_NOT_SHOWN = [
  {
    title: 'Donateurs individuels et mécènes',
    desc: 'Citoyens et philanthropes au Cameroun, en Allemagne et en Europe finançant les parcours des jeunes.',
  },
];

/** Ce que la fondation propose à un partenaire (mécénat, stagiaires, enseignants, dossier) : à fournir (PAR-01). */
const PARTNER_OFFERS: { title: string; desc: string }[] = [];

export function PartenairesPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('partenaires.seo.title')} description={t('partenaires.seo.description')} />

      <PageHeader reveal>
        <PageTitle>{t('partenaires.title')}</PageTitle>
        <PageIntro>{t('partenaires.intro')}</PageIntro>
      </PageHeader>

      {/* LE GROUPE IROKO (PAR-01) : une section, plus une carte nuit bordée d'or */}
      <Section id="iroko">
        <div className="container-page">
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader title={t('partenaires.iroko.title')} />
            <div className="space-y-4 text-body text-text-secondary">
              <p>{t('partenaires.iroko.p1')}</p>
              <p>{t('partenaires.iroko.p2')}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* CE QUE NOUS PROPOSONS : seulement si le contenu est fourni (PAR-01) */}
      {PARTNER_OFFERS.length > 0 && (
        <Section tone="sauge">
          <div className="container-page space-y-8">
            <SectionHeader title={t('partenaires.offers.title')} />
            <TextList columns={2}>
              {PARTNER_OFFERS.map((o) => (
                <TextListItem key={o.title} title={o.title}>
                  <p>{o.desc}</p>
                </TextListItem>
              ))}
            </TextList>
          </div>
        </Section>
      )}

      {/* UNE SEULE ACTION EN FIN DE PAGE : sections alternées par le fond (sauge après IROKO), sans carte nuit */}
      <Section tone={PARTNER_OFFERS.length > 0 ? 'brume' : 'sauge'}>
        <div className="container-page">
          <div className="max-w-[65ch] space-y-5">
            <SectionHeader title={t('partenaires.cta.title')} subtitle={t('partenaires.cta.subtitle')} />
            <PrimaryButton to="/agir#partenaire" size="lg">
              {t('partenaires.cta.button')}
            </PrimaryButton>
          </div>
        </div>
      </Section>
    </>
  );
}

export default PartenairesPage;
