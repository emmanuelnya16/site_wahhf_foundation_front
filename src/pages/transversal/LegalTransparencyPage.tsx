import { Fragment } from 'react';
import { Scale } from 'lucide-react';
import SEO from '../../components/wahhf/SEO';
import { ReadingColumn, TEXT_LINK_CLASS } from '../../components/wahhf/TextList';
import PageHeader, { PageMeta, PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import { CONTACT } from '../../config/contact';
import { followAnchorLink } from '../../lib/scroll';
import { cn } from '../../lib/utils';
import { useLocalize } from '../../lib/localize';

/** « 15 novembre 2026 », insécable (T-19) : la date ne se coupe jamais en fin de ligne. */
const DAY = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const formatDay = (iso: string) => DAY.format(new Date(`${iso}T00:00:00Z`)).replace(/ /g, ' ');

/** Ancre d'un intertitre : « Vidéo de la page d’accueil (YouTube) » → « video-de-la-page-d-accueil-youtube ». */
const anchorId = (title: string) =>
  title
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Adresses e-mail du texte en liens mailto (CONF-01), sans toucher au texte : il viendra du juriste, et toute adresse
 * qu'il contiendra sera cliquable d'elle-même.
 */
const EMAIL = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+)/g;
function withEmailLinks(text: string) {
  return text.split(EMAIL).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={`mailto:${part}`} className="text-link underline underline-offset-4 decoration-1 hover:decoration-2">
        {part}
      </a>
    ) : (
      part
    ),
  );
}

/**
 * Bloc de /transparence encore provisoire (« TODO ») : masqué tant que le rapport annuel n'est pas fourni (groupe 7.2,
 * docs/contenus-a-fournir.md, questions 88 et 89). Le remettre dans content.transparence.blocks avec le vrai lien.
 */
export const TRANSPARENCY_PENDING_BLOCKS = [
  {
    h: 'Publication des rapports annuels (TODO)',
    p: 'Les rapports d’activité et bilans financiers certifiés seront publiés sur cette page à chaque clôture d’exercice (TODO : insérer lien PDF du rapport annuel dès validation).',
  },
];

/**
 * 7. PAGES LÉGALES & TRANSPARENCE (/mentions-legales, /confidentialite, /transparence)
 * Groupe 7.2, /transparence seulement (TRA-01, TRA-02) : en-tête révélé à l'arrivée avec une introduction, titre en
 * casse de phrase, sans « gratuité » dans un titre, bloc provisoire masqué, une seule action en fin de page (retour au
 * don). Aucun lien n'y mène tant qu'aucune donnée n'est publiée (src/config/transparency.ts).
 * Mentions légales et confidentialité (MEN-01, CONF-01, mise en page seulement : le texte viendra du juriste) : date de
 * mise à jour sous le titre, sommaire (au-dessus du texte sur téléphone, à droite et fixe sur ordinateur), intertitres
 * ancrés, colonne de lecture de 65 caractères, e-mails en liens mailto. Aucun mouvement (contrat §10).
 */
export function LegalTransparencyPage({
  type,
}: {
  type: 'mentions' | 'confidentialite' | 'transparence';
}) {
  const content = {
    mentions: {
      title: 'Mentions légales',
      kicker: 'Informations statutaires (TODO : compléter numéros d’enregistrement)',
      icon: Scale,
      // Date du texte affiché (AAAA-MM-JJ), à changer avec lui. Aujourd'hui, celle du premier commit du projet, qui
      // contient déjà ce texte ; le juriste donnera la sienne (docs/contenus-a-fournir.md, question 140).
      updatedOn: '2026-11-15',
      blocks: [
        {
          h: 'Éditeur du site',
          p: 'WAHHF Foundation (We Are Here Help Foundation), fondation camerouno-allemande à but non lucratif, branche sociale du groupe IROKO. Siège et antennes : Cameroun & Allemagne (TODO : adresses postales et numéros d’enregistrement officiels à compléter).',
        },
        {
          h: 'Caractère non commercial du site',
          p: 'Ce site a une vocation exclusivement informative, éducative et philanthropique. Aucun service payant, ni visa, ni contrat de travail n’y est commercialisé.',
        },
      ],
    },
    confidentialite: {
      title: 'Politique de confidentialité & Protection des données (RGPD)',
      // Même règle que les mentions légales (question 140)
      updatedOn: '2026-11-15',
      blocks: [
        {
          h: 'Collecte minimale et transparente',
          p: 'Les données saisies dans nos formulaires (Candidater, Agir, Newsletter) sont strictement limitées au suivi pédagogique et associatif de votre demande. Nous ne demandons jamais de copie de passeport ou de pièce d’identité lors du premier contact en ligne.',
        },
        {
          h: 'Absence de revente et droits des utilisateurs',
          // Adresse lue dans src/config/contact.ts, la seule source du site (CTC-03, revue du groupe 7.2) : même texte affiché
          p: `Vos informations ne sont jamais vendues ni cédées à des tiers commerciaux. Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment en écrivant à ${CONTACT.email} (TODO : confirmer adresse DPO).`,
        },
        {
          // TODO : texte à valider par la fondation
          h: 'Vidéo de la page d’accueil (YouTube)',
          p: 'Sur ordinateur, la page d’accueil peut afficher en arrière-plan une vidéo hébergée par YouTube (Google), en mode « confidentialité renforcée » (youtube-nocookie.com), muette et sans publicité ciblée. Elle n’est chargée qu’après l’affichage de la page, et jamais si vous avez refusé les cookies non essentiels. Lors de sa lecture, YouTube reçoit votre adresse IP et peut enregistrer des informations techniques sur votre appareil. Vous pouvez à tout moment la mettre en pause depuis la page, ou refuser les cookies non essentiels pour qu’elle ne soit plus chargée.',
        },
      ],
    },
    transparence: {
      title: 'Transparence financière et origine des ressources',
      intro: 'D’où viennent les ressources de WAHHF Foundation, et comment elles financent ses programmes.',
      blocks: [
        {
          h: 'Comment nos programmes sont financés',
          p: 'Les programmes de WAHHF Foundation (dont l’Académie de langue allemande /anglaise A1 à C1 et l’accompagnement vers l’Europe) sont financés par la dotation du groupe IROKO et par les dons volontaires des mécènes et donateurs.',
        },
      ],
    },
  }[type];
  // Sommaire, ancres et date : Mentions légales et Confidentialité seulement (Transparence a sa fin de page, groupe 7.2)
  const legal = type !== 'transparence';
  // Lot 7.10 : les pages légales ne sont pas traduites. En anglais et en allemand, la version française s'affiche,
  // marquée lang="fr" (lecteurs d'écran, césure), sous une mention dans la langue choisie.
  const { t, lang } = useLocalize();
  const translated = lang !== 'fr';
  const Content = translated ? 'div' : Fragment;
  const contentProps = translated ? { lang: 'fr' } : {};

  return (
    <>
      <SEO title={content.title} description={content.blocks[0].p} />
      <Content {...contentProps}>
      <PageHeader reveal={type === 'transparence'}>
        {translated && (
          <p lang={lang} role="note" className="w-fit rounded-inner border border-info/40 bg-info-bg px-4 py-2 text-meta font-semibold text-text">
            {t('legal.onlyFrench')}
          </p>
        )}
        {'kicker' in content && (
          <PageMeta>
            <content.icon aria-hidden="true" className="w-4 h-4" />
            <span>{content.kicker}</span>
          </PageMeta>
        )}
        <PageTitle>{content.title}</PageTitle>
        {'intro' in content && <PageIntro>{content.intro}</PageIntro>}
        {'updatedOn' in content && (
          <p className="text-meta text-text-secondary">
            Mise à jour le <time dateTime={content.updatedOn}>{formatDay(content.updatedOn)}</time>
          </p>
        )}
      </PageHeader>

      {/* Colonne de lecture de 65 caractères (contrat §8) : un paragraphe n'est jamais une carte. Pages légales : le
          sommaire vient d'abord dans le code (clavier, lecteur d'écran) ; sur ordinateur, il passe à droite de la
          colonne et reste visible au défilement, sous l'en-tête du site. La colonne garde la marge gauche du titre. */}
      <section className="container-page section-space">
        <div className={cn(legal && 'text-body lg:grid lg:grid-cols-[minmax(0,65ch)_15rem] lg:items-start lg:gap-x-16')}>
          {legal && (
            <nav
              aria-labelledby="sommaire"
              className="mb-12 max-w-[65ch] lg:sticky lg:top-[calc(var(--header-offset)+2rem)] lg:col-start-2 lg:row-start-1 lg:mb-0"
            >
              <h2 id="sommaire" className="text-body font-semibold text-text">
                Sommaire
              </h2>
              <ol className="mt-3 border-t border-border-subtle">
                {content.blocks.map((b) => (
                  <li key={b.h} className="border-b border-border-subtle">
                    <a
                      href={`#${anchorId(b.h)}`}
                      onClick={(event) => followAnchorLink(event, anchorId(b.h))}
                      className={cn(TEXT_LINK_CLASS, 'w-full py-2')}
                    >
                      {b.h}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <ReadingColumn as="article" className={cn(legal && 'lg:col-start-1 lg:row-start-1')}>
            {content.blocks.map((b) => (
              <Fragment key={b.h}>
                <h2 id={legal ? anchorId(b.h) : undefined}>{b.h}</h2>
                <p>{withEmailLinks(b.p)}</p>
              </Fragment>
            ))}
          </ReadingColumn>
        </div>
      </section>

      {/* Transparence : une seule action en fin de page, le retour au don (TRA-02) ; sans carte nuit */}
      {type === 'transparence' && (
        <section className="section-space bg-surface-section">
          <div className="container-page">
            <div className="max-w-[65ch] space-y-5">
              <SectionHeader
                title="Soutenir nos actions"
                subtitle="La page de don explique comment donner aujourd’hui."
              />
              <PrimaryButton to="/faire-un-don" size="lg">
                Revenir à la page de don
              </PrimaryButton>
            </div>
          </div>
        </section>
      )}
      </Content>
    </>
  );
}

export default LegalTransparencyPage;
