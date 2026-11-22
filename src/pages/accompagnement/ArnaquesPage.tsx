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
import { useLocalize } from '../../lib/localize';
import { ACCOMPANIMENT_STEPS } from './steps';
import { NB, pieces } from './i18n';

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
 * Lot 7.10 : textes du paquet « accompagnement » ; contenu de data/arnaques.ts dans la langue en cours
 * (accompagnement.contenu.arnaques : signes, fauxMessage, promesses, reflexes, surcouches case par case) ; message de
 * signalement préparé dans la langue du visiteur.
 */

const STEP = ACCOMPANIMENT_STEPS.findIndex((s) => s.slug === 'eviter-les-arnaques');


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
  const { t } = useLocalize();
  const report = buildDraft(
    t('accompagnement.arnaques.signalementObjet'),
    t('accompagnement.arnaques.signalementIntro'),
    [],
    t('accompagnement.arnaques.signalementFin')
  );
  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Lien externe : PrimaryButton ajoute ↗ et « (nouvel onglet) » pour les lecteurs d'écran */}
      <PrimaryButton href={whatsappHref(report)}>{t('accompagnement.arnaques.signalerWhatsapp')}</PrimaryButton>
      <SecondaryButton href={mailtoHref(report)}>{t('accompagnement.arnaques.signalerEmail')}</SecondaryButton>
    </div>
  );
}

export default function ArnaquesPage() {
  const signsRef = useRef<HTMLOListElement>(null);
  const seq = useSequentialFade(signsRef);
  const { t, localized } = useLocalize();
  const content = 'accompagnement.contenu.arnaques';
  const signs = localized(SCAM_SIGNS, `${content}.signes`);
  const fakeMessage = localized(FAKE_MESSAGE, `${content}.fauxMessage`);
  const promises = localized(SCAM_PROMISES, `${content}.promesses`);
  const practices = localized(SCAM_PRACTICES, `${content}.reflexes`);

  return (
    <>
      <SEO title={t('accompagnement.arnaques.seoTitre')} description={t('accompagnement.arnaques.seoDescription')} />

      <PageHeader reveal notice={<DisclaimerBanner compact />}>
        <PageBreadcrumb
          items={[
            { label: t('accompagnement.commun.mobilite'), to: '/mobilite-langues' },
            { label: t('accompagnement.commun.accompagnement'), to: '/mobilite-langues/accompagnement' },
            { label: t('accompagnement.arnaques.filAriane') },
          ]}
        />
        <p className="text-meta text-text-secondary">
          {pieces(t('accompagnement.commun.etape'), { n: STEP + 1, total: ACCOMPANIMENT_STEPS.length })}
        </p>
        <PageTitle>{t('accompagnement.arnaques.titre')}</PageTitle>
        <PageIntro>{t('accompagnement.arnaques.intro')}</PageIntro>
      </PageHeader>

      {/* NOS SEULS CANAUX OFFICIELS (ARN-01), en haut de page ; ancre #signaler (fin de la page Accompagnement) */}
      <Section tone="sauge" id="signaler">
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader title={t('accompagnement.arnaques.canauxTitre')} subtitle={t('accompagnement.arnaques.canauxSousTitre')} />
            <dl className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-3">
              <dt className="text-meta text-text-secondary">WhatsApp</dt>
              <dd className="text-body font-semibold text-text tabular-nums">{CONTACT.whatsappDisplay}</dd>
              <dt className="text-meta text-text-secondary">{t('accompagnement.arnaques.email')}</dt>
              <dd className="text-body font-semibold text-text break-all">{CONTACT.email}</dd>
            </dl>
            <p className="text-body text-text-secondary">
              {t('accompagnement.arnaques.canauxNote')}
            </p>
            <ReportButtons />
          </div>
        </div>
      </Section>

      {/* 5 SIGNES D'ARNAQUE (ARN-04) : check-list, icônes d'alerte ambre (ARN-03), apparition élément par élément */}
      <Section>
        <div className="container-page space-y-10">
          <SectionHeader title={t('accompagnement.arnaques.signesTitre')} subtitle={t('accompagnement.arnaques.signesSousTitre')} />
          <ol ref={signsRef} {...seq} className={`${seq.className ?? ''} max-w-[65ch]`}>
            {signs.map((sign, i) => (
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
          <SectionHeader title={t('accompagnement.arnaques.exempleTitre')} subtitle={t('accompagnement.arnaques.exempleSousTitre')} />
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <figure className="max-w-md space-y-3">
              <div className="rounded-card rounded-bl-inner bg-surface-raised p-5 sm:p-6 space-y-3">
                <p className="text-meta text-text-secondary">{t('accompagnement.arnaques.exempleEntete')}</p>
                <p className="text-body text-text">
                  {fakeMessage.map((part, i) =>
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
              <figcaption className="text-meta text-text-secondary">
                {pieces(t('accompagnement.arnaques.exempleLegende'), { nb: NB })}
              </figcaption>
            </figure>
            <ul className="max-w-[65ch]">
              {fakeMessage.filter((p): p is FakeMessageFlag => typeof p !== 'string').map((p) => (
                <li key={p.flag} className={cn(withIcon(p.type), 'border-t border-border-subtle py-4')}>
                  <ScamIcon type={p.type} />
                  <p className="text-body text-text-secondary">
                    <span className="font-semibold text-text">
                      {pieces(t('accompagnement.arnaques.citation'), { nb: NB, texte: p.flag.replace(/\.$/, '') })}
                    </span>
                    {pieces(t('accompagnement.arnaques.avantNote'), { nb: NB })}
                    {p.note}
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
            <SectionHeader title={t('accompagnement.arnaques.jamaisTitre')} subtitle={t('accompagnement.arnaques.jamaisSousTitre')} />
            <ul className="max-w-[65ch]">
              {promises.map((item) => (
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
            <SectionHeader title={t('accompagnement.arnaques.reflexesTitre')} />
            <ul className="max-w-[65ch]">
              {practices.map((item) => (
                <li key={item.text} className={cn(withIcon(item.type), 'border-t border-border-subtle py-4')}>
                  <ScamIcon type={item.type} />
                  <p className="text-body text-text">{item.text}</p>
                </li>
              ))}
            </ul>
            <Link to="/mobilite-langues/accompagnement#pays" className={TEXT_LINK_CLASS}>
              {t('accompagnement.arnaques.voirFiches')}
            </Link>
          </div>
        </div>
      </Section>

      {/* FIN DE PAGE : signaler (ARN-04), sur sauge, sans carte nuit au-dessus du footer */}
      <Section tone="sauge">
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader title={t('accompagnement.arnaques.suspectTitre')} subtitle={t('accompagnement.arnaques.suspectSousTitre')} />
            <ReportButtons />
            <Link to="/mobilite-langues/accompagnement" className={TEXT_LINK_CLASS}>
              {t('accompagnement.arnaques.retourEtapes')}
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
