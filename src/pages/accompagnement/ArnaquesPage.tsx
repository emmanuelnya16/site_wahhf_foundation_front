import { CSSProperties, Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import PageHeader, { PageBreadcrumb, PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton } from '../../components/wahhf/Buttons';
import DisclaimerBanner from '../../components/wahhf/DisclaimerBanner';
import Section from '../../components/wahhf/Section';
import { TEXT_LINK_CLASS } from '../../components/wahhf/TextList';
import { CONTACT } from '../../config/contact';
import { buildDraft, mailtoHref, whatsappHref } from '../../lib/contactDraft';
import { useSequentialFade } from '../../effects/useSequentialFade';
import { FAKE_MESSAGE, FakeMessageFlag, SCAM_PRACTICES, SCAM_PROMISES, SCAM_SIGNS, ScamItemType } from '../../data/arnaques';
import { cn } from '../../lib/utils';
import { ACCOMPANIMENT_STEPS } from './steps';

/*
 * Éviter les arnaques (/accompagnement/eviter-les-arnaques), groupe 7.4 : contrat validé, audit ARN-01 à ARN-04, T-14.
 * Une forme propre, sobre et sérieuse :
 * - en-tête du lot 5 révélé comme le hero ; l'avertissement juste sous le titre, en version courte, sans lien vers la
 *   page elle-même (ARN-04, T-14) ;
 * - en haut, « Nos seuls canaux officiels » (ARN-01) : les coordonnées de src/config/contact.ts, la seule source du
 *   site, et deux boutons de 48 px, « Signaler sur WhatsApp » (message préparé) et « Signaler par e-mail » (objet et
 *   message préparés). L'adresse integrite@…, non confirmée, est masquée (data/arnaques.ts) ;
 * - la check-list « 5 signes d'arnaque », icônes d'alerte ambre (ARN-03) ; elle apparaît élément par élément (fondu
 *   seul, 0,08 s de décalage, une fois), rien n'est lié à la position du défilement ;
 * - un exemple de faux message annoté (ARN-04) ;
 * - ce que la fondation ne fait jamais, dont « un don ne donne jamais accès à une place » (ARN-02), et les bons
 *   réflexes, seuls à porter une coche (ARN-03) ;
 * - fin de page sur « Signaler » (et non plus « Demander un accompagnement »), sans carte nuit.
 * Aucune apparition groupée sur cette page (src/effects/motion/RevealBatch.tsx, EXCLUDED) ; aucun bouton de don.
 * Revue du groupe 7.4 : l'icône de chaque puce est lue dans son type (ScamIcon), et non plus choisie par section.
 */

const NB = ' ';
const STEP = ACCOMPANIMENT_STEPS.findIndex((s) => s.slug === 'eviter-les-arnaques');

const REPORT = buildDraft(
  'Signalement d’une tentative d’arnaque',
  'Je souhaite signaler une personne ou un message qui utilise le nom de WAHHF Foundation.',
  [],
  'Ce qui s’est passé (date, numéro ou profil, somme demandée) :\n\n(Joignez si possible une capture d’écran du message.)'
);

/**
 * Icône d'une puce, lue dans son type (ARN-03) : triangle d'alerte ambre pour un signe d'arnaque, coche pour un bon
 * réflexe, aucune pour un engagement de la fondation. Décorative : le texte dit déjà de quoi il s'agit.
 */
function ScamIcon({ type }: { type: ScamItemType }) {
  if (type === 'sign') return <AlertTriangle aria-hidden="true" className="mt-0.5 w-6 h-6 text-warning" />;
  if (type === 'practice') return <CheckCircle2 aria-hidden="true" className="mt-0.5 w-6 h-6 text-fil" />;
  return null;
}

/** Colonne de l'icône, seulement pour les types qui en portent une. */
const withIcon = (type: ScamItemType) => type !== 'promise' && 'grid grid-cols-[1.5rem_1fr] gap-x-4';

/** Les deux boutons de signalement (48 px de haut, au-delà des 44 px demandés par ARN-01). */
function ReportButtons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Lien externe : PrimaryButton ajoute ↗ et « (nouvel onglet) » pour les lecteurs d'écran */}
      <PrimaryButton href={whatsappHref(REPORT)}>Signaler sur WhatsApp</PrimaryButton>
      <SecondaryButton href={mailtoHref(REPORT)}>Signaler par e-mail</SecondaryButton>
    </div>
  );
}

export default function ArnaquesPage() {
  const signsRef = useRef<HTMLOListElement>(null);
  const seq = useSequentialFade(signsRef);

  return (
    <>
      <SEO
        title="Éviter les arnaques et les fausses promesses — Accompagnement gratuit vers l'Europe"
        description="Reconnaître une fausse offre de visa, de contrat ou d'admission, et signaler une arnaque à WAHHF Foundation par ses seuls canaux officiels."
      />

      <PageHeader reveal notice={<DisclaimerBanner compact />}>
        <PageBreadcrumb
          items={[
            { label: 'Mobilité & Langues', to: '/mobilite-langues' },
            { label: 'Accompagnement vers l’Europe', to: '/mobilite-langues/accompagnement' },
            { label: 'Éviter les arnaques' },
          ]}
        />
        <p className="text-meta text-text-secondary">
          Étape {STEP + 1} sur {ACCOMPANIMENT_STEPS.length} de l’accompagnement
        </p>
        <PageTitle>Éviter les arnaques et les fausses promesses</PageTitle>
        <PageIntro>Comment reconnaître une offre frauduleuse, protéger vos proches et vérifier chaque information.</PageIntro>
      </PageHeader>

      {/* NOS SEULS CANAUX OFFICIELS (ARN-01), en haut de page ; ancre #signaler (fin de la page Accompagnement) */}
      <Section tone="sauge" id="signaler">
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader
              title="Nos seuls canaux officiels"
              subtitle="Si une personne prétend agir au nom de WAHHF Foundation ou d’IROKO en vous réclamant de l’argent, interrompez immédiatement tout échange et signalez-le-nous."
            />
            <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3">
              <dt className="text-meta text-text-secondary">WhatsApp</dt>
              <dd className="text-body font-semibold text-text tabular-nums">{CONTACT.whatsappDisplay}</dd>
              <dt className="text-meta text-text-secondary">E-mail</dt>
              <dd className="text-body font-semibold text-text break-all">{CONTACT.email}</dd>
            </dl>
            <p className="text-body text-text-secondary">
              Tout autre numéro ou adresse qui se présente comme WAHHF Foundation n’est pas le nôtre. Joignez si possible une capture d’écran du message.
            </p>
            <ReportButtons />
          </div>
        </div>
      </Section>

      {/* 5 SIGNES D'ARNAQUE (ARN-04) : check-list, icônes d'alerte ambre (ARN-03), apparition élément par élément */}
      <Section>
        <div className="container-page space-y-10">
          <SectionHeader title="5 signes d’arnaque" subtitle="Si vous reconnaissez l’un de ces signes, interrompez l’échange et vérifiez." />
          <ol ref={signsRef} {...seq} className={`${seq.className ?? ''} max-w-[65ch]`}>
            {SCAM_SIGNS.map((sign, i) => (
              <li
                key={sign.title}
                style={{ '--seq-i': i } as CSSProperties}
                className={cn(withIcon(sign.type), 'border-t border-border-subtle py-5')}
              >
                <ScamIcon type={sign.type} />
                <div className="space-y-1.5">
                  <h3 className="text-body font-semibold text-text">{sign.title}</h3>
                  <p className="text-body text-text-secondary">{sign.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* EXEMPLE DE FAUX MESSAGE ANNOTÉ (ARN-04) */}
      <Section tone="sauge">
        <div className="container-page space-y-10">
          <SectionHeader
            title="À quoi ressemble un faux message"
            subtitle="Ce message est inventé pour l’exemple, à partir des signes ci-dessus. Chaque passage souligné en ambre est un signe d’arnaque."
          />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <figure className="max-w-md space-y-3">
              <div className="rounded-card rounded-bl-inner bg-surface-raised p-5 sm:p-6 space-y-3">
                <p className="text-meta text-text-secondary">Message reçu sur WhatsApp, d’un numéro inconnu</p>
                <p className="text-body text-text">
                  {FAKE_MESSAGE.map((part, i) =>
                    typeof part === 'string' ? (
                      <Fragment key={i}>{part}</Fragment>
                    ) : (
                      <mark key={i} className="bg-transparent font-semibold text-text underline decoration-warning decoration-2 underline-offset-4">
                        {part.flag}
                      </mark>
                    )
                  )}
                </p>
              </div>
              <figcaption className="text-meta text-text-secondary">Exemple inventé{NB}: ce message ne vient pas de WAHHF Foundation.</figcaption>
            </figure>
            <ul className="max-w-[65ch]">
              {FAKE_MESSAGE.filter((p): p is FakeMessageFlag => typeof p !== 'string').map((p) => (
                <li key={p.flag} className={cn(withIcon(p.type), 'border-t border-border-subtle py-4')}>
                  <ScamIcon type={p.type} />
                  <p className="text-body text-text-secondary">
                    <span className="font-semibold text-text">«{NB}{p.flag.replace(/\.$/, '')}{NB}»</span>
                    {NB}: {p.note}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* CE QUE LA FONDATION NE FAIT JAMAIS (ARN-02) ET LES BONS RÉFLEXES (seuls à porter une coche, ARN-03) */}
      <Section>
        <div className="container-page grid gap-14 lg:grid-cols-2">
          <div className="space-y-6">
            <SectionHeader
              title="WAHHF Foundation ne demande jamais d’argent"
              subtitle="WAHHF Foundation est une fondation à but non lucratif, financée par ses partenaires et ses donateurs. Notre accompagnement et nos cours d’allemand sont gratuits."
            />
            <ul className="max-w-[65ch]">
              {SCAM_PROMISES.map((item) => (
                <li key={item.text} className={cn(withIcon(item.type), 'border-t border-border-subtle py-4')}>
                  <ScamIcon type={item.type} />
                  <div className="space-y-1">
                    {item.title && <p className="text-body font-semibold text-text">{item.title}</p>}
                    <p className="text-body text-text-secondary">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <SectionHeader title="Les bons réflexes" />
            <ul className="max-w-[65ch]">
              {SCAM_PRACTICES.map((item) => (
                <li key={item.text} className={cn(withIcon(item.type), 'border-t border-border-subtle py-4')}>
                  <ScamIcon type={item.type} />
                  <p className="text-body text-text">{item.text}</p>
                </li>
              ))}
            </ul>
            <Link to="/mobilite-langues/accompagnement#pays" className={TEXT_LINK_CLASS}>
              Voir les fiches des 10 pays et leurs sites officiels
            </Link>
          </div>
        </div>
      </Section>

      {/* FIN DE PAGE : signaler (ARN-04), sur sauge, sans carte nuit au-dessus du footer */}
      <Section tone="sauge">
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader
              title={`Une offre vous semble suspecte${NB}?`}
              subtitle="Interrompez tout échange et prévenez-nous par l’un de nos seuls canaux officiels, avec une capture d’écran du message si possible."
            />
            <ReportButtons />
            <Link to="/mobilite-langues/accompagnement" className={TEXT_LINK_CLASS}>
              Revenir aux 5 étapes de l’accompagnement
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
