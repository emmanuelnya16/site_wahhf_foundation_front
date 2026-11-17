import { Fragment } from 'react';
import { Scale } from 'lucide-react';
import SEO from '../../components/wahhf/SEO';
import { ReadingColumn } from '../../components/wahhf/TextList';
import PageHeader, { PageMeta, PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';

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
 * don). Aucun lien n'y mène tant qu'aucune donnée n'est publiée (src/config/transparency.ts). Mentions légales et
 * confidentialité : inchangées.
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
      blocks: [
        {
          h: 'Collecte minimale et transparente',
          p: 'Les données saisies dans nos formulaires (Candidater, Agir, Newsletter) sont strictement limitées au suivi pédagogique et associatif de votre demande. Nous ne demandons jamais de copie de passeport ou de pièce d’identité lors du premier contact en ligne.',
        },
        {
          h: 'Absence de revente et droits des utilisateurs',
          p: 'Vos informations ne sont jamais vendues ni cédées à des tiers commerciaux. Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment en écrivant à contact@wahhf-foundation.org (TODO : confirmer adresse DPO).',
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
          p: 'Les programmes de WAHHF Foundation (dont l’Académie de langue allemande A1 à C1 et l’accompagnement vers l’Europe) sont financés par la dotation du groupe IROKO et par les dons volontaires des mécènes et donateurs.',
        },
      ],
    },
  }[type];

  return (
    <>
      <SEO title={content.title} description={content.blocks[0].p} />
      <PageHeader reveal={type === 'transparence'}>
        {'kicker' in content && (
          <PageMeta>
            <content.icon aria-hidden="true" className="w-4 h-4" />
            <span>{content.kicker}</span>
          </PageMeta>
        )}
        <PageTitle>{content.title}</PageTitle>
        {'intro' in content && <PageIntro>{content.intro}</PageIntro>}
      </PageHeader>

      {/* Colonne de lecture de 65 caractères (contrat §8) : un paragraphe n'est jamais une carte */}
      <section className="container-page section-space">
        <ReadingColumn as="article">
          {content.blocks.map((b) => (
            <Fragment key={b.h}>
              <h2>{b.h}</h2>
              <p>{b.p}</p>
            </Fragment>
          ))}
        </ReadingColumn>
      </section>

      {/* Transparence : une seule action en fin de page, le retour au don (TRA-02) ; sans carte nuit */}
      {type === 'transparence' && (
        <section className="section-space bg-surface-section">
          <div className="container-page">
            <div className="max-w-[65ch] space-y-5">
              <SectionHeader
                title="Soutenir nos actions"
                subtitle="La page de don explique comment donner aujourd’hui et à quoi sert votre don."
              />
              <PrimaryButton to="/faire-un-don" size="lg">
                Revenir à la page de don
              </PrimaryButton>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default LegalTransparencyPage;
