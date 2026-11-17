import { useState, useId, useRef, useEffect, FormEvent, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton, DonateButton } from '../../components/wahhf/Buttons';
import ChoiceTile from '../../components/wahhf/ChoiceTile';
import FormField, { FieldError, fieldErrorId, LABEL_CLASS, FIELD_CLASS, CHECK_LABEL_CLASS, CHECKBOX_CLASS } from '../../components/wahhf/FormField';
import { emailError, phoneError, requiredError, focusFirstError } from '../../lib/formValidation';
import { useFocusOnChange } from '../../lib/useFocusOnChange';
import { getLenis, headerOffset } from '../../lib/scroll';
import ContactHandoff from '../../components/wahhf/ContactHandoff';
import { buildDraft } from '../../lib/contactDraft';

/*
 * Page /agir (groupe 7.2 : contrat validé, audit AGIR-01 à AGIR-04, A11Y-02, A11Y-03, ETA-03).
 * - Trois voies en liste typographique (don, bénévolat, partenariat), qui apparaissent en groupe (RevealBatch), puis un
 *   seul formulaire d'engagement, en fin de page.
 * - L'adresse règle le formulaire (AGIR-02) : /agir#partenaire ouvre le parcours partenaire, /agir#benevole le parcours
 *   bénévole (liens du footer, de l'accueil et de /partenaires). Le choix se change aussi dans le formulaire.
 * - Parcours partenaire : champs propres (structure, type, pays, contact, nature du soutien envisagé).
 * - « Remplir le formulaire bénévole » et « Proposer un partenariat » (AGIR-03) : choisissent le parcours, font défiler
 *   jusqu'au formulaire (en-tête fixe compris ; défilement doux, immédiat en mouvement réduit) et placent le focus sur
 *   son titre, annoncé poliment.
 * - Contenu concret des voies (AGIR-04) : missions, durées, lieux, contact partenariats et délai de réponse ne sont pas
 *   fournis ; ils ne sont ni inventés ni affichés (docs/contenus-a-fournir.md, questions du groupe 7.2).
 * - Le site n'envoie rien encore : un message est préparé, que la personne envoie par WhatsApp ou par e-mail.
 */
type Role = 'benevole' | 'partenaire';
const ROLE_FROM_HASH: Record<string, Role> = { '#benevole': 'benevole', '#partenaire': 'partenaire' };
const FORM_TITLE: Record<Role, string> = { benevole: 'Proposer votre aide comme bénévole', partenaire: 'Proposer un partenariat' };

/** Types de structure (repris des textes du site : écoles, universités, centres de formation, ONG, entreprises, santé). */
const ORG_TYPES = [
  'École, université ou centre de formation',
  'ONG ou association',
  'Entreprise',
  'Établissement de santé',
  'Institution publique',
  'Autre',
] as const;
/** Ce qu'un partenaire peut envisager (AGIR-02) : des cases à cocher, sans engagement. */
const SUPPORT_KINDS = ['Financement d’un programme', 'Accueil de stagiaires ou d’étudiants', 'Expertise ou enseignement', 'Matériel ou équipement'] as const;

/**
 * Délai de réponse : non confirmé, donc masqué (groupe 7.2 ; docs/contenus-a-fournir.md). Le texte de l'ancienne page
 * reste ici ; placer le délai confirmé dans RESPONSE_DELAY pour l'afficher sous les boutons du message préparé.
 */
export const RESPONSE_DELAY_NOT_VALIDATED = 'Notre équipe prendra contact avec vous sous 7 à 14 jours ouvrés (TODO : confirmer délai).';
const RESPONSE_DELAY: string | null = null;

type AgirField = 'name' | 'org' | 'orgType' | 'country' | 'email' | 'phone' | 'details' | 'consent';
const FIELDS: Record<Role, readonly AgirField[]> = {
  benevole: ['name', 'email', 'phone', 'details', 'consent'],
  partenaire: ['org', 'orgType', 'country', 'name', 'email', 'phone', 'details', 'consent'],
};

function checkAgirField(key: AgirField, value: string | boolean, role: Role): string | undefined {
  switch (key) {
    case 'name':
      return requiredError(
        String(value),
        role === 'benevole' ? 'Saisissez votre prénom et votre nom.' : 'Saisissez le nom et la fonction de la personne à contacter.'
      );
    case 'org':
      return requiredError(String(value), 'Saisissez le nom de votre structure.');
    case 'orgType':
      return requiredError(String(value), 'Choisissez le type de votre structure.');
    case 'country':
      return requiredError(String(value), 'Indiquez le pays de votre structure, par exemple Allemagne ou Cameroun.');
    case 'email':
      return emailError(String(value));
    case 'phone':
      // Facultatif : vérifié seulement s'il est rempli
      return String(value).trim() ? phoneError(String(value)) : undefined;
    case 'details':
      return requiredError(
        String(value),
        role === 'benevole'
          ? 'Décrivez en quelques lignes vos compétences et vos disponibilités.'
          : 'Décrivez en quelques lignes votre projet de partenariat.'
      );
    case 'consent':
      return value ? undefined : 'Cochez cette case pour que nous puissions étudier votre proposition et vous répondre.';
  }
}

export function AgirPage() {
  // Parcours choisi par l'adresse (#partenaire, #benevole), puis dans la page
  const { hash } = useLocation();
  const [roleType, setRoleType] = useState<Role>(ROLE_FROM_HASH[hash] ?? 'benevole');
  const [prepared, setPrepared] = useState(false);
  useEffect(() => {
    const fromHash = ROLE_FROM_HASH[hash];
    if (!fromHash) return;
    setRoleType(fromHash);
    setPrepared(false);
  }, [hash]);
  // Lien vers /agir#partenaire cliqué depuis cette page (footer) : sur ordinateur, Lenis fait défiler jusqu'à l'ancre
  // sans changer l'adresse ; le parcours suit donc le lien lui-même (écouté en capture, comme Lenis).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      const fromLink = ROLE_FROM_HASH[url.hash];
      if (!fromLink || url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      setRoleType(fromLink);
      setPrepared(false);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  const [name, setName] = useState('');
  const [org, setOrg] = useState('');
  const [orgType, setOrgType] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [support, setSupport] = useState<string[]>([]);
  const [details, setDetails] = useState('');
  const [consent, setConsent] = useState(false);

  // Labels reliés aux champs (useId) ; erreurs précises sous chaque champ, focus sur la première
  const uid = useId();
  const fieldId = (key: AgirField) => `agir-${key}-${uid}`;
  const [errors, setErrors] = useState<Partial<Record<AgirField, string>>>({});
  const values: Record<AgirField, string | boolean> = { name, org, orgType, country, email, phone, details, consent };
  const recheck = (key: AgirField, value: string | boolean) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: checkAgirField(key, value, roleType) }));
  };
  const checkOnBlur = (key: AgirField, value: string) => {
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: checkAgirField(key, value, roleType) }));
  };

  // Message prêt ou retour au formulaire : défilement jusqu'au bloc, focus sur son titre (useFocusOnChange)
  const formBlockRef = useRef<HTMLDivElement>(null);
  const formTitleRef = useFocusOnChange<HTMLHeadingElement>(prepared, { scrollRef: formBlockRef });

  // Boutons des voies (AGIR-03) : parcours choisi, défilement doux jusqu'au formulaire, focus sur son titre
  const [formRequest, setFormRequest] = useState(0);
  const goToForm = (role: Role) => {
    setRoleType(role);
    setErrors({});
    setPrepared(false);
    setFormRequest((n) => n + 1);
  };
  useEffect(() => {
    if (!formRequest) return;
    const frame = requestAnimationFrame(() => {
      const block = formBlockRef.current;
      const title = formTitleRef.current;
      if (!block || !title) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      title.focus({ preventScroll: true });
      const lenis = getLenis();
      if (lenis) {
        lenis.resize();
        lenis.scrollTo(block, { immediate: reduced, force: true });
      } else {
        const top = block.getBoundingClientRect().top + window.scrollY - headerOffset();
        window.scrollTo({ top: Math.max(0, top), left: 0, behavior: (reduced ? 'instant' : 'smooth') as ScrollBehavior });
      }
    });
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formRequest]);

  const statusMessage = prepared
    ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.'
    : formRequest > 0
    ? `Formulaire : ${FORM_TITLE[roleType].toLowerCase()}.`
    : '';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const keys = FIELDS[roleType];
    const found: Partial<Record<AgirField, string>> = {};
    for (const key of keys) found[key] = checkAgirField(key, values[key], roleType);
    setErrors(found);
    if (focusFirstError(keys, found, fieldId)) return;
    setPrepared(true);
  };

  const draft =
    roleType === 'benevole'
      ? buildDraft(
          `Proposition de bénévolat — ${name.trim()}`,
          'Je souhaite devenir bénévole pour WAHHF Foundation. Voici ma proposition, saisie sur le site :',
          [
            ['Nom complet', name],
            ['E-mail', email],
            ['Téléphone / WhatsApp', phone],
            ['Compétences et disponibilités', details],
          ],
          'J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition d’engagement.'
        )
      : buildDraft(
          `Proposition de partenariat — ${org.trim()}`,
          'Je souhaite proposer un partenariat à WAHHF Foundation. Voici notre proposition, saisie sur le site :',
          [
            ['Structure', org],
            ['Type de structure', orgType],
            ['Pays', country],
            ['Contact (nom et fonction)', name],
            ['E-mail', email],
            ['Téléphone', phone],
            ['Soutien envisagé', support.join(', ')],
            ['Projet de partenariat', details],
          ],
          'J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition d’engagement.'
        );

  /** Champ texte relié à son label, vérifié à la sortie et pendant la correction. */
  const textField = (
    key: AgirField,
    label: ReactNode,
    value: string,
    set: (v: string) => void,
    input: { type?: string; autoComplete?: string; inputMode?: 'tel' | 'email' | 'text'; placeholder?: string; maxLength?: number },
    className?: string
  ) => (
    <FormField id={fieldId(key)} label={label} error={errors[key]} className={className}>
      {(a11y) => (
        <input
          {...a11y}
          type={input.type ?? 'text'}
          autoComplete={input.autoComplete}
          inputMode={input.inputMode}
          placeholder={input.placeholder}
          maxLength={input.maxLength ?? 100}
          value={value}
          onChange={(e) => {
            set(e.target.value);
            recheck(key, e.target.value);
          }}
          onBlur={(e) => checkOnBlur(key, e.target.value)}
          className={FIELD_CLASS}
        />
      )}
    </FormField>
  );

  return (
    <>
      <SEO
        title="Agir avec WAHHF Foundation — Don, Bénévolat, Partenariat"
        description="Rejoignez l'engagement de WAHHF Foundation : faire un don, devenir formateur ou bénévole, ou bâtir un partenariat institutionnel."
      />

      <PageHeader reveal>
        <PageTitle>Trois manières concrètes de soutenir la jeunesse</PageTitle>
        <PageIntro>
          Donner, partager vos compétences ou engager votre structure{' '}: voici comment agir avec WAHHF Foundation,
          au Cameroun comme en Europe.
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space space-y-16">
        {/* Trois voies en liste typographique (contrat §8, T-15) ; ancres #benevole et #partenaire. Apparition en groupe :
            en CSS juste après l'en-tête quand elles sont déjà à l'écran (.arrive-rise), sinon au défilement (RevealBatch). */}
        <TextList columns={3}>
          <TextListItem title="Faire un don" titleAs="h2" actions={<DonateButton />} className="arrive-rise [--arrive-delay:0.6s]">
            <p>Financez les cours d’allemand gratuits et les actions sociales de terrain.</p>
          </TextListItem>
          <TextListItem
            id="benevole"
            title="Devenir bénévole"
            titleAs="h2"
            className="arrive-rise [--arrive-delay:0.68s]"
            actions={<PrimaryButton onClick={() => goToForm('benevole')}>Remplir le formulaire bénévole</PrimaryButton>}
          >
            <p>Enseignants d’allemand, médecins, mentors ou coordinateurs locaux au Cameroun et en Europe.</p>
          </TextListItem>
          <TextListItem
            id="partenaire"
            title="Devenir partenaire"
            titleAs="h2"
            className="arrive-rise [--arrive-delay:0.76s]"
            actions={<PrimaryButton onClick={() => goToForm('partenaire')}>Proposer un partenariat</PrimaryButton>}
          >
            <p>Écoles, universités, ONG et entreprises souhaitant co-financer ou appuyer un programme.</p>
          </TextListItem>
        </TextList>

        {/* Formulaire d'engagement : un seul, réglé par le parcours choisi ; rien n'y apparaît au défilement */}
        <div ref={formBlockRef} id="formulaire-engagement" className="max-w-4xl">
          <p role="status" className="sr-only">
            {statusMessage}
          </p>
          {prepared ? (
            <ContactHandoff
              title={roleType === 'benevole' ? 'Dernière étape : envoyez votre proposition de bénévolat' : 'Dernière étape : envoyez votre proposition de partenariat'}
              draft={draft}
              titleRef={formTitleRef}
              onEdit={() => setPrepared(false)}
            >
              {RESPONSE_DELAY && <p className="text-body text-text max-w-[65ch]">{RESPONSE_DELAY}</p>}
            </ContactHandoff>
          ) : (
            <div className="rounded-card bg-surface-section p-6 sm:p-10 space-y-8">
              <SectionHeader titleRef={formTitleRef} title={FORM_TITLE[roleType]} />

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <fieldset>
                  <legend className={LABEL_CLASS}>Vous nous écrivez</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(['benevole', 'partenaire'] as const).map((role) => (
                      <ChoiceTile
                        key={role}
                        name="agir-parcours"
                        value={role}
                        checked={roleType === role}
                        onChange={() => {
                          setRoleType(role);
                          setErrors({});
                        }}
                        showCheck
                        className="p-4 text-left"
                      >
                        {role === 'benevole' ? 'Pour devenir bénévole' : 'Pour proposer un partenariat'}
                      </ChoiceTile>
                    ))}
                  </div>
                </fieldset>

                {roleType === 'benevole' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {textField('name', 'Nom complet *', name, setName, { autoComplete: 'name', placeholder: 'Ex. Marie Nguenang' })}
                    {textField('email', 'Adresse e-mail *', email, setEmail, { type: 'email', autoComplete: 'email', maxLength: 254 })}
                    {textField(
                      'phone',
                      'Téléphone / WhatsApp (facultatif)',
                      phone,
                      setPhone,
                      { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: 'Ex. +237 6...', maxLength: 30 },
                      'sm:col-span-2'
                    )}
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {textField('org', 'Nom de votre structure *', org, setOrg, { autoComplete: 'organization' })}
                      <FormField id={fieldId('orgType')} label="Type de structure *" error={errors.orgType}>
                        {(a11y) => (
                          <select
                            {...a11y}
                            value={orgType}
                            onChange={(e) => {
                              setOrgType(e.target.value);
                              recheck('orgType', e.target.value);
                            }}
                            className={FIELD_CLASS}
                          >
                            <option value="">Choisissez</option>
                            {ORG_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        )}
                      </FormField>
                      {textField('country', 'Pays *', country, setCountry, { autoComplete: 'country-name', placeholder: 'Ex. Allemagne' })}
                      {textField('name', 'Votre nom et votre fonction *', name, setName, { autoComplete: 'name', placeholder: 'Ex. Anna Weber, directrice' })}
                      {textField('email', 'Adresse e-mail *', email, setEmail, { type: 'email', autoComplete: 'email', maxLength: 254 })}
                      {textField('phone', 'Téléphone (facultatif)', phone, setPhone, {
                        type: 'tel',
                        autoComplete: 'tel',
                        inputMode: 'tel',
                        placeholder: 'Ex. +49 30...',
                        maxLength: 30,
                      })}
                    </div>

                    {/* Nature du soutien : cases à cocher natives, facultatives */}
                    <fieldset>
                      <legend className={LABEL_CLASS}>Ce que vous envisagez (facultatif)</legend>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                        {SUPPORT_KINDS.map((kind) => (
                          <label key={kind} className={CHECK_LABEL_CLASS}>
                            <input
                              type="checkbox"
                              checked={support.includes(kind)}
                              onChange={(e) =>
                                setSupport((prev) => (e.target.checked ? [...prev, kind] : prev.filter((k) => k !== kind)))
                              }
                              className={CHECKBOX_CLASS}
                            />
                            <span>{kind}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}

                <FormField
                  id={fieldId('details')}
                  label={roleType === 'benevole' ? 'Vos compétences et vos disponibilités *' : 'Votre projet de partenariat *'}
                  error={errors.details}
                >
                  {(a11y) => (
                    <textarea
                      {...a11y}
                      rows={4}
                      required
                      maxLength={2000}
                      placeholder={
                        roleType === 'benevole'
                          ? 'Ex. enseignante d’allemand, disponible le samedi, en ligne ou à Douala.'
                          : 'Quel programme souhaitez-vous soutenir, et comment ?'
                      }
                      value={details}
                      onChange={(e) => {
                        setDetails(e.target.value);
                        recheck('details', e.target.value);
                      }}
                      onBlur={(e) => checkOnBlur('details', e.target.value)}
                      className={FIELD_CLASS}
                    />
                  )}
                </FormField>

                {/* Consentement : la politique s'ouvre dans un nouvel onglet, la saisie n'est jamais perdue */}
                <div>
                  <label className={CHECK_LABEL_CLASS}>
                    <input
                      id={fieldId('consent')}
                      type="checkbox"
                      required
                      checked={consent}
                      onChange={(e) => {
                        setConsent(e.target.checked);
                        recheck('consent', e.target.checked);
                      }}
                      aria-invalid={errors.consent ? true : undefined}
                      aria-describedby={errors.consent ? fieldErrorId(fieldId('consent')) : undefined}
                      className={CHECKBOX_CLASS}
                    />
                    <span>
                      J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition
                      d’engagement, conformément à la{' '}
                      <Link to="/confidentialite" target="_blank" rel="noopener" className="text-link underline underline-offset-4">
                        politique de confidentialité
                        <span className="sr-only"> (nouvel onglet)</span>
                      </Link>
                      . *
                    </span>
                  </label>
                  <FieldError id={fieldErrorId(fieldId('consent'))} message={errors.consent} />
                </div>

                <PrimaryButton type="submit">Préparer l’envoi de ma proposition</PrimaryButton>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AgirPage;
