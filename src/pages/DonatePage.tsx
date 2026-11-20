import { useEffect, useId, useRef, useState, FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { LABEL_CLASS, FIELD_CLASS, FieldError, fieldErrorId } from '../components/wahhf/FormField';
import PageHeader, { PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import { photoCaption, photoOrFallback } from '../lib/photos';

/** En-tête (lot 7.6) : des jeunes vus de dos, en t-shirts de la fondation ; aucun visage. */
const HEADER_PHOTO = photoOrFallback('A16');
import { DonateButton } from '../components/wahhf/Buttons';
import ChoiceTile from '../components/wahhf/ChoiceTile';
import ContactHandoff from '../components/wahhf/ContactHandoff';
import { DOMAINS_DATA } from '../services/api';
import { CONTACT } from '../config/contact';
import { buildDraft } from '../lib/contactDraft';
import { useFocusOnChange } from '../lib/useFocusOnChange';
import { cn } from '../lib/utils';

/*
 * Page /faire-un-don (groupe 7.2 : contrat validé, audit DON-01 à DON-08, ACT-02, TRA-01).
 * - Aucun vrai moyen de paiement n'est fourni (docs/contenus-a-fournir.md, demande D) : la page ne prétend jamais
 *   encaisser un don. Section « Comment donner aujourd'hui » : la personne choisit ce qu'elle soutient, la devise et le
 *   montant ; un message est préparé, qu'elle envoie par WhatsApp ou par e-mail ; la fondation lui indique comment
 *   régler son don. L'ancien formulaire (moyens « Simulé », note Stripe / Symfony, don mensuel, anonymat) est gardé,
 *   non rendu, dans src/pages/don/ArchivedDonationForm.tsx.
 * - Affectation (ACT-02) : « Là où le besoin est le plus urgent » et les 6 domaines de DOMAINS_DATA. Paramètre d'adresse
 *   ?affectation=<slug du domaine> (education, sante, entrepreneuriat, environnement, droits-inclusion,
 *   mobilite-langues) : l'affectation est présélectionnée ; une valeur inconnue est ignorée et retirée de l'adresse.
 *   L'adresse suit ensuite le choix fait dans le formulaire (remplacée, sans nouvelle entrée d'historique).
 * - Montant (DON-07) : en euros ou en francs CFA, au choix ; montants proposés, ou montant libre entre un minimum et un
 *   maximum écrits sous le champ ; conversion à la parité fixe (1 € = 655,957 FCFA) affichée à côté.
 * - Ligne d'impact (DON-05) : sous les montants, elle suit le montant et l'affectation. Elle ne décrit le programme que
 *   pour Mobilité & Langues, seul programme réel et vérifiable (contrat §1) ; pour les cinq autres domaines, elle nomme
 *   le domaine seulement : leurs programmes ne sont pas confirmés (audit T-13, ACT-03 ; question 117), ils restent dans
 *   DOMAIN_IMPACT_NOT_VALIDATED. Les montants d'exemple (« 25 € = manuels A1 »…) ne sont pas confirmés non plus : ils
 *   restent masqués (EXAMPLE_IMPACTS_NOT_VALIDATED) jusqu'à ce que la fondation donne de vrais coûts (questions 67 à 71).
 * - Précaution anti-arnaque (revue du groupe 7.2) : la fondation indique comment régler le don par WhatsApp ou par
 *   e-mail ; la page dit donc depuis quels canaux elle répond (src/config/contact.ts, les « seuls canaux officiels » de
 *   la page Arnaques) et de ne rien payer à un autre numéro (question 138).
 * - Un seul style d'option choisie (DON-06, ChoiceTile) ; le rouge reste au seul bouton de don.
 * - Mouvement (groupe 7.2, contrat §10) : en-tête révélé comme le hero ; choix d'une option en 150 ms ; ligne d'impact
 *   en fondu croisé de 0,3 s. Rien au défilement (formulaire). Tout est immédiat en mouvement réduit.
 */

/**
 * Programmes des cinq domaines autres que Mobilité & Langues, résumés de DOMAINS_DATA : NON CONFIRMÉS (audit T-13 et
 * ACT-03 : on ne sait pas s'ils sont réalisés, en cours ou prévus). Masqués de la ligne d'impact (revue du groupe 7.2)
 * jusqu'à la réponse à la question 117 de docs/contenus-a-fournir.md ; un domaine confirmé passe dans DOMAIN_IMPACT.
 */
export const DOMAIN_IMPACT_NOT_VALIDATED: Record<string, { for: string; what: string }> = {
  education: { for: 'l’éducation', what: 'kits scolaires et manuels, bibliothèques communautaires, mentorat et orientation des élèves' },
  sante: { for: 'la santé', what: 'consultations préventives, santé maternelle et infantile, eau potable et hygiène à l’école' },
  entrepreneuriat: {
    for: 'l’entrepreneuriat des jeunes',
    what: 'ateliers de gestion et de comptabilité, initiation aux outils numériques, mentorat des porteurs de projets',
  },
  environnement: { for: 'l’environnement', what: 'pépinières et reboisement, sensibilisation au tri, formation à l’agroécologie' },
  'droits-inclusion': {
    for: 'les droits et l’inclusion',
    what: 'autonomie des jeunes femmes, scolarisation des jeunes en situation de handicap, écoute et orientation sociale',
  },
};

/** Ce que finance un domaine dont le programme est réel et vérifiable (contrat §1 : Mobilité & Langues seulement). */
const DOMAIN_IMPACT: Record<string, { for: string; what: string }> = {
  'mobilite-langues': { for: 'la mobilité et les langues', what: 'cours d’allemand /anglais du niveau A1 au C1 et orientation vers 10 pays européens' },
};

const GENERAL = 'general';
/** Affectations proposées : la valeur est le slug du domaine (ACT-02), « general » pour le besoin le plus urgent. */
const ALLOCATIONS = [
  { id: GENERAL, label: 'Là où le besoin est le plus urgent' },
  ...DOMAINS_DATA.map((d) => ({ id: d.slug, label: d.title })),
];
const isAllocation = (v: string | null | undefined): v is string => !!v && ALLOCATIONS.some((a) => a.id === v);

/** Parité fixe euro – franc CFA (BEAC) : 1 € = 655,957 FCFA. */
const EUR_TO_XAF = 655.957;
type Currency = 'EUR' | 'XAF';
/**
 * Montants proposés et limites du montant libre, par devise (à valider : docs/design-contract.md, §13, groupe 7.2).
 * Au-delà du maximum, la personne est invitée à écrire directement à la fondation.
 */
const CURRENCIES: Record<Currency, { tile: string; presets: number[]; min: number; max: number; example: string }> = {
  EUR: { tile: 'Euros (€)', presets: [25, 50, 100, 250], min: 5, max: 10000, example: '75' },
  XAF: { tile: 'Francs CFA', presets: [5000, 10000, 25000, 50000], min: 3000, max: 6500000, example: '15 000' },
};

/**
 * Montants d'exemple de l'ancienne page, NON CONFIRMÉS (« exemple — TODO ») : masqués (groupe 7.2). Ils restent ici
 * jusqu'à ce que la fondation donne de vrais coûts (docs/contenus-a-fournir.md, questions 67 à 71). Un exemple confirmé
 * se place dans CONFIRMED_IMPACTS : la ligne d'impact l'ajoute dès que le montant choisi correspond.
 */
export const EXAMPLE_IMPACTS_NOT_VALIDATED = [
  { amount: 25, currency: 'EUR', text: 'Finance les manuels et supports d’exercices d’allemand /anglais A1 pour un jeune apprenant (exemple — TODO)' },
  { amount: 50, currency: 'EUR', text: 'Soutient un mois d’accompagnement linguistique et d’accès numérique pour un étudiant (exemple — TODO)' },
  { amount: 100, currency: 'EUR', text: 'Contribue à une journée de prévention sanitaire maternelle et infantile en zone rurale (exemple — TODO)' },
  { amount: 250, currency: 'EUR', text: 'Finance un parcours complet d’accompagnement linguistique et documentaire pour une cohorte (exemple — TODO)' },
] as const;
const CONFIRMED_IMPACTS: { amount: number; currency: Currency; text: string }[] = [];

const NBSP = ' ';
const formatNumber = (n: number, decimals = 0) =>
  new Intl.NumberFormat('fr-FR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);
/** « 50 € », « 7,62 € », « 15 000 FCFA » : chiffres groupés, espace insécable avant la devise. */
const formatAmount = (n: number, currency: Currency) =>
  currency === 'EUR' ? `${formatNumber(n, Number.isInteger(n) ? 0 : 2)}${NBSP}€` : `${formatNumber(n)}${NBSP}FCFA`;
/** Le même montant dans l'autre devise, arrondi (à l'euro près en centimes, au franc CFA près). */
const convertedAmount = (n: number, currency: Currency) =>
  currency === 'EUR' ? `${formatNumber(Math.round(n * EUR_TO_XAF))}${NBSP}FCFA` : `${formatNumber(n / EUR_TO_XAF, 2)}${NBSP}€`;

/** Montant libre saisi : chiffres, espaces de groupement ; décimales (virgule ou point) en euros seulement. */
function parseAmount(raw: string, currency: Currency): number | null {
  const cleaned = raw.replace(/[\s  ]/g, '').replace(/(€|eur|euros?|fcfa|xaf|f)$/i, '');
  if (!cleaned) return null;
  const re = currency === 'EUR' ? /^\d+([.,]\d{1,2})?$/ : /^\d+$/;
  if (!re.test(cleaned)) return Number.NaN;
  return Number(cleaned.replace(',', '.'));
}

function amountError(raw: string, currency: Currency): string | undefined {
  const c = CURRENCIES[currency];
  const value = parseAmount(raw, currency);
  if (value === null) return undefined;
  if (Number.isNaN(value)) return `Saisissez le montant en chiffres, par exemple ${c.example}.`;
  if (value < c.min) return `Le montant minimum est de ${formatAmount(c.min, currency)}.`;
  if (value > c.max)
    return `Pour un don de plus de ${formatAmount(c.max, currency)}, écrivez-nous directement par WhatsApp ou par e-mail (coordonnées en bas de page).`;
  return undefined;
}

/**
 * Ligne d'impact : le montant, sa conversion, puis l'affectation choisie ; le programme n'est décrit que s'il est
 * confirmé (DOMAIN_IMPACT), et l'exemple chiffré seulement s'il est confirmé (CONFIRMED_IMPACTS).
 */
function impactSentence(amount: number, currency: Currency, allocation: string): string {
  const money = `${formatAmount(amount, currency)} (environ ${convertedAmount(amount, currency)})`;
  const domain = DOMAIN_IMPACT[allocation];
  const title = allocation === GENERAL ? undefined : DOMAINS_DATA.find((d) => d.slug === allocation)?.title;
  let sentence = domain
    ? `${money} pour ${domain.for}${NBSP}: ${domain.what}.`
    : title
    ? `${money} pour le domaine «${NBSP}${title}${NBSP}».`
    : `${money}, là où le besoin est le plus urgent.`;
  const example = CONFIRMED_IMPACTS.find((e) => e.currency === currency && e.amount === amount);
  if (example) sentence += ` Par exemple${NBSP}: ${example.text}`;
  return sentence;
}

/**
 * Phrase qui change en fondu croisé (0,3 s) : l'ancienne s'efface pendant que la nouvelle apparaît, superposées dans
 * la même case de grille ; l'ancienne est retirée à la fin. Décorative pour les lecteurs d'écran : la même phrase est
 * annoncée par la zone aria-live voisine. Mouvement réduit : changement immédiat (index.css).
 */
function CrossfadeText({ text, className }: { text: string; className?: string }) {
  const [layers, setLayers] = useState({ current: text, previous: null as string | null, n: 0 });
  if (layers.current !== text) setLayers({ current: text, previous: layers.current, n: layers.n + 1 });
  useEffect(() => {
    if (layers.previous === null) return;
    const timer = window.setTimeout(() => setLayers((l) => ({ ...l, previous: null })), 300);
    return () => window.clearTimeout(timer);
  }, [layers.n, layers.previous]);
  return (
    <div aria-hidden="true" className={cn('grid', className)}>
      {layers.previous !== null && (
        <p key={`ancienne-${layers.n}`} className="[grid-area:1/1] crossfade-out">
          {layers.previous}
        </p>
      )}
      <p key={`phrase-${layers.n}`} className={cn('[grid-area:1/1]', layers.n > 0 && 'crossfade-in')}>
        {layers.current}
      </p>
    </div>
  );
}

/**
 * Précaution anti-arnaque (revue du groupe 7.2) : c'est la fondation qui indique comment régler le don, par WhatsApp ou
 * par e-mail. La page dit donc depuis quels canaux elle répond (src/config/contact.ts, les « seuls canaux officiels » de
 * la page Arnaques) et de ne rien payer à quelqu'un d'autre. Affichée avant l'envoi et à la dernière étape.
 */
function OfficialChannelsNote() {
  return (
    <p className="text-body text-text max-w-[65ch]">
      Pour votre sécurité, la fondation vous répond seulement par WhatsApp au{' '}
      <span className="whitespace-nowrap tabular-nums">{CONTACT.whatsappDisplay}</span> ou par e-mail depuis{' '}
      <span className="break-all">{CONTACT.email}</span>. Si quelqu’un vous écrit d’un autre numéro ou d’une autre
      adresse au sujet de votre don, ne payez rien et prévenez-nous.
    </p>
  );
}

export default function DonatePage() {
  // Affectation : lue dans l'adresse (?affectation=sante), qui suit ensuite le choix (ACT-02)
  const [searchParams, setSearchParams] = useSearchParams();
  const asked = searchParams.get('affectation');
  const allocation = isAllocation(asked) ? asked : GENERAL;
  const setAllocation = (next: string) =>
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next === GENERAL) params.delete('affectation');
        else params.set('affectation', next);
        return params;
      },
      { replace: true }
    );
  // Valeur inconnue ou « general » dans l'adresse : retirée (rien d'invalide n'est repris dans un lien partagé)
  useEffect(() => {
    if (asked !== null && (asked === GENERAL || !isAllocation(asked))) setAllocation(GENERAL);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asked]);

  const [currency, setCurrency] = useState<Currency>('EUR');
  const [presetIndex, setPresetIndex] = useState(1);
  const [custom, setCustom] = useState('');
  const [customError, setCustomError] = useState<string | undefined>();
  const [donorName, setDonorName] = useState('');
  // Message prêt à envoyer (WhatsApp ou e-mail) : aucun paiement ni enregistrement sur le site
  const [prepared, setPrepared] = useState(false);

  const c = CURRENCIES[currency];
  const customValue = parseAmount(custom, currency);
  const customValid = customValue !== null && !Number.isNaN(customValue) && !amountError(custom, currency);
  const amount = custom.trim() ? (customValid ? customValue : null) : c.presets[presetIndex];

  // Ligne d'impact : immédiate après un choix ; pendant la frappe d'un montant libre, mise à jour après une pause
  // (pas de fondu ni d'annonce à chaque chiffre)
  const impact =
    amount !== null
      ? impactSentence(amount, currency, allocation)
      : `Choisissez un montant, ou saisissez un montant entre ${formatAmount(c.min, currency)} et ${formatAmount(c.max, currency)}.`;
  const [shownImpact, setShownImpact] = useState(impact);
  const typing = useRef(false);
  useEffect(() => {
    if (!typing.current) {
      setShownImpact(impact);
      return;
    }
    const timer = window.setTimeout(() => setShownImpact(impact), 450);
    return () => window.clearTimeout(timer);
  }, [impact]);

  const uid = useId();
  const customId = `don-montant-${uid}`;
  const customHelpId = `${customId}-aide`;

  // Message prêt ou retour au formulaire : défilement en haut du bloc, focus sur le titre, annonce polie
  const formSectionRef = useRef<HTMLElement>(null);
  const titleRef = useFocusOnChange<HTMLHeadingElement>(prepared, { scrollRef: formSectionRef });

  const chooseCurrency = (next: Currency) => {
    typing.current = false;
    setCurrency(next);
    // Montant libre déjà saisi : gardé, relu dans la nouvelle devise (5000 tapé en euros pour 5 000 FCFA, DON-07)
    if (customError) setCustomError(amountError(custom, next));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const error = amountError(custom, currency);
    setCustomError(error);
    if (error || amount === null) {
      requestAnimationFrame(() => document.getElementById(customId)?.focus());
      return;
    }
    setPrepared(true);
  };

  const allocationLabel = ALLOCATIONS.find((a) => a.id === allocation)?.label ?? ALLOCATIONS[0].label;
  const amountLabel = amount !== null ? formatAmount(amount, currency) : '';
  const draft = buildDraft(
    `Don à WAHHF Foundation — ${amountLabel}${donorName.trim() ? ` — ${donorName.trim()}` : ''}`,
    'Je souhaite faire un don à WAHHF Foundation. Pouvez-vous m’indiquer comment le régler ?',
    [
      ['Montant', amount !== null ? `${amountLabel} (environ ${convertedAmount(amount, currency)})` : undefined],
      ['Affectation souhaitée', allocationLabel],
      ['Nom ou organisation', donorName],
    ]
  );

  return (
    <>
      <SEO
        title="Faire un don — Soutenir les cours d’allemand /anglais et nos actions au Cameroun"
        description="Soutenez WAHHF Foundation : vos dons financent les cours d'allemand /anglais (A1 à C1), l'accompagnement des jeunes vers l'Europe et nos actions d'éducation, de santé et d'environnement au Cameroun."
      />

      <PageHeader reveal catalogPhoto={HEADER_PHOTO} photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}>
        <PageTitle>Votre don finance des cours d’allemand /anglais et nos actions au Cameroun</PageTitle>
        <PageIntro>
          Les cours d’allemand /anglais (A1 à C1) et l’accompagnement vers l’Europe sont gratuits pour les jeunes{NBSP}: ils
          sont financés par nos partenaires et nos donateurs. Vos dons soutiennent aussi nos actions d’éducation, de santé et
          d’environnement.
        </PageIntro>
      </PageHeader>

      <section ref={formSectionRef} className="container-page section-space *:max-w-4xl">
        <p role="status" className="sr-only">
          {prepared ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.' : ''}
        </p>
        {prepared ? (
          <ContactHandoff
            title={`Dernière étape${NBSP}: envoyez votre message de don`}
            draft={draft}
            titleRef={titleRef}
            onEdit={() => setPrepared(false)}
            editLabel="Modifier mon don"
          >
            <p className="text-body text-text max-w-[65ch]">
              Votre message demande à la fondation comment régler votre don de {amountLabel}. Aucun paiement n’est
              demandé sur ce site.
            </p>
            <OfficialChannelsNote />
          </ContactHandoff>
        ) : (
          // Panneau de formulaire sur sauge (contrat §8) ; rien n'y apparaît au défilement (contrat §10)
          <div className="rounded-card bg-surface-section p-6 sm:p-10 space-y-8">
            <SectionHeader
              titleRef={titleRef}
              title="Comment donner aujourd’hui"
              subtitle={`Le paiement en ligne n’est pas encore ouvert sur ce site. Choisissez un montant${NBSP}: un message est préparé, vous l’envoyez par WhatsApp ou par e-mail, et la fondation vous indique comment régler votre don.`}
            />
            <OfficialChannelsNote />

            <form onSubmit={handleSubmit} noValidate className="space-y-7">
              {/* Affectation (ACT-02, DON-08) : libellés courts, le détail est dans la ligne d'impact */}
              <div>
                <label htmlFor="don-affectation" className={LABEL_CLASS}>
                  Votre don soutient
                </label>
                <select
                  id="don-affectation"
                  value={allocation}
                  onChange={(e) => {
                    typing.current = false;
                    setAllocation(e.target.value);
                  }}
                  className={cn(FIELD_CLASS, 'max-w-xl')}
                >
                  {ALLOCATIONS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Devise (DON-07) */}
              <fieldset>
                <legend className={LABEL_CLASS}>Devise</legend>
                <div className="grid grid-cols-2 gap-3 max-w-md">
                  {(Object.keys(CURRENCIES) as Currency[]).map((id) => (
                    <ChoiceTile
                      key={id}
                      name="don-devise"
                      value={id}
                      checked={currency === id}
                      onChange={() => chooseCurrency(id)}
                      className="choice-150 py-2.5 px-3 rounded-pill text-center"
                    >
                      {CURRENCIES[id].tile}
                    </ChoiceTile>
                  ))}
                </div>
              </fieldset>

              {/* Montant : montants proposés, ou montant libre avec ses limites */}
              <fieldset className="space-y-4">
                <legend className={LABEL_CLASS}>Montant</legend>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {c.presets.map((value, i) => (
                    <ChoiceTile
                      key={`${currency}-${value}`}
                      name="don-montant"
                      value={String(value)}
                      checked={!custom.trim() && presetIndex === i}
                      onChange={() => {
                        typing.current = false;
                        setPresetIndex(i);
                        setCustom('');
                        setCustomError(undefined);
                      }}
                      className="choice-150 py-3.5 px-3 text-center font-semibold tabular-nums"
                    >
                      {formatAmount(value, currency)}
                    </ChoiceTile>
                  ))}
                </div>

                <div>
                  <label htmlFor={customId} className={LABEL_CLASS}>
                    Autre montant, en {currency === 'EUR' ? 'euros' : 'francs CFA'}
                  </label>
                  <div className="relative max-w-xs">
                    <input
                      id={customId}
                      type="text"
                      inputMode={currency === 'EUR' ? 'decimal' : 'numeric'}
                      autoComplete="transaction-amount"
                      maxLength={12}
                      placeholder={`Ex. ${c.example}`}
                      value={custom}
                      onChange={(e) => {
                        typing.current = true;
                        setCustom(e.target.value);
                        if (customError) setCustomError(amountError(e.target.value, currency));
                      }}
                      onBlur={(e) => setCustomError(amountError(e.target.value, currency))}
                      aria-invalid={customError ? true : undefined}
                      aria-describedby={customError ? `${customHelpId} ${fieldErrorId(customId)}` : customHelpId}
                      className={cn(FIELD_CLASS, 'pr-20 tabular-nums')}
                    />
                    <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-body text-text-secondary">
                      {currency === 'EUR' ? '€' : 'FCFA'}
                    </span>
                  </div>
                  <p id={customHelpId} className="mt-2 text-meta text-text-secondary tabular-nums">
                    Entre {formatAmount(c.min, currency)} et {formatAmount(c.max, currency)}.
                  </p>
                  <FieldError id={fieldErrorId(customId)} message={customError} />
                </div>
              </fieldset>

              {/* Ligne d'impact (DON-05) : suit le montant et l'affectation ; fondu croisé de 0,3 s, annoncée poliment */}
              <div className="border-t border-border-subtle pt-5 space-y-1">
                <p className="text-meta font-semibold text-text">À quoi servira votre don</p>
                <CrossfadeText text={shownImpact} className="text-body text-text max-w-[65ch] tabular-nums" />
                <p aria-live="polite" className="sr-only">
                  {shownImpact}
                </p>
              </div>

              <div>
                <label htmlFor="don-nom" className={LABEL_CLASS}>
                  Votre nom, ou celui de votre organisation (facultatif)
                </label>
                <input
                  id="don-nom"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={cn(FIELD_CLASS, 'max-w-xl')}
                />
              </div>

              {/* Plus de case de consentement obligatoire (DON-04) : le site ne garde rien, une phrase d'information suffit.
                  La politique s'ouvre dans un nouvel onglet : montant, devise et nom saisis ne sont jamais perdus. */}
              <p className="text-meta text-text-secondary max-w-[65ch]">
                Ce site n’enregistre rien{NBSP}: le message part de votre propre messagerie. Voir notre{' '}
                <Link to="/confidentialite" target="_blank" rel="noopener" className="text-link underline underline-offset-4">
                  politique de confidentialité
                  <span className="sr-only"> (nouvel onglet)</span>
                </Link>
                .
              </p>

              <DonateButton type="submit" size="lg" className="w-full sm:w-auto">
                Préparer mon message
              </DonateButton>
            </form>
          </div>
        )}
      </section>
    </>
  );
}
