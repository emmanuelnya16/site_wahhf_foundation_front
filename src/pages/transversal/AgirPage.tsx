import { useState, useId, useRef, FormEvent } from 'react';
import SEO from '../../components/wahhf/SEO';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle } from '../../components/wahhf/PageHeader';
import { PrimaryButton, DonateButton } from '../../components/wahhf/Buttons';
import FormField, { FieldError, fieldErrorId, FIELD_CLASS, CHECK_LABEL_CLASS, CHECKBOX_CLASS } from '../../components/wahhf/FormField';
import { emailError, requiredError, focusFirstError } from '../../lib/formValidation';
import { useFocusOnChange } from '../../lib/useFocusOnChange';
import ContactHandoff from '../../components/wahhf/ContactHandoff';
import { buildDraft } from '../../lib/contactDraft';

/**
 * 6. PAGE /agir
 * Faire un don, Devenir bénévole, Devenir partenaire + formulaire d'engagement RGPD.
 */
type AgirField = 'name' | 'email' | 'details' | 'consent';
const AGIR_FIELDS = ['name', 'email', 'details', 'consent'] as const;
const AGIR_INPUT_CLASS = FIELD_CLASS;

function checkAgirField(key: AgirField, value: string | boolean): string | undefined {
  switch (key) {
    case 'name':
      return requiredError(String(value), 'Saisissez votre nom complet ou le nom de votre structure.');
    case 'email':
      return emailError(String(value));
    case 'details':
      return requiredError(
        String(value),
        'Décrivez en quelques lignes vos compétences, vos disponibilités ou votre projet de partenariat.'
      );
    case 'consent':
      return value ? undefined : 'Cochez cette case pour que nous puissions étudier votre proposition et vous répondre.';
  }
}

export function AgirPage() {
  const [roleType, setRoleType] = useState<'benevole' | 'partenaire'>('benevole');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [consent, setConsent] = useState(false);
  // Message prêt à envoyer (WhatsApp ou e-mail) : le site ne transmet pas encore la proposition lui-même
  const [prepared, setPrepared] = useState(false);

  // Labels reliés aux champs (useId) ; erreurs précises sous chaque champ, focus sur la première
  const uid = useId();
  const fieldId = (key: AgirField) => `agir-${key}-${uid}`;
  const [errors, setErrors] = useState<Partial<Record<AgirField, string>>>({});
  const values: Record<AgirField, string | boolean> = { name, email, details, consent };
  const recheck = (key: AgirField, value: string | boolean) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: checkAgirField(key, value) }));
  };
  const checkOnBlur = (key: AgirField, value: string) => {
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: checkAgirField(key, value) }));
  };

  // Choix du rôle ou envoi : défilement jusqu'au formulaire, focus sur son titre, annonce polie.
  // (Un nouveau clic sur le même rôle ramène aussi au formulaire, d'où le compteur.)
  const formBlockRef = useRef<HTMLDivElement>(null);
  const [roleRequest, setRoleRequest] = useState(0);
  const formTitleRef = useFocusOnChange<HTMLHeadingElement>(prepared ? 'message-pret' : `${roleType}-${roleRequest}`, {
    scrollRef: formBlockRef,
  });
  const chooseRole = (role: 'benevole' | 'partenaire') => {
    setRoleType(role);
    setRoleRequest((n) => n + 1);
    setPrepared(false);
  };
  const statusMessage = prepared
    ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.'
    : roleRequest > 0
    ? `Formulaire : ${roleType === 'benevole' ? 'devenir bénévole' : 'devenir partenaire'}.`
    : '';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found: Partial<Record<AgirField, string>> = {};
    for (const key of AGIR_FIELDS) found[key] = checkAgirField(key, values[key]);
    setErrors(found);
    if (focusFirstError(AGIR_FIELDS, found, fieldId)) return;
    setPrepared(true);
  };

  const draft = buildDraft(
    roleType === 'benevole' ? `Proposition de bénévolat — ${name.trim()}` : `Proposition de partenariat — ${name.trim()}`,
    roleType === 'benevole'
      ? 'Je souhaite devenir bénévole pour WAHHF Foundation. Voici ma proposition, saisie sur le site :'
      : 'Je souhaite proposer un partenariat à WAHHF Foundation. Voici ma proposition, saisie sur le site :',
    [
      ['Nom complet / Structure', name],
      ['E-mail', email],
      ['Message', details],
    ],
    'J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition d’engagement (RGPD).'
  );

  return (
    <>
      <SEO
        title="Agir avec WAHHF Foundation — Don, Bénévolat, Partenariat"
        description="Rejoignez l'engagement de WAHHF Foundation : faire un don, devenir formateur ou bénévole, ou bâtir un partenariat institutionnel."
      />

      <PageHeader>
        <PageTitle>
          Trois manières concrètes de soutenir la jeunesse
        </PageTitle>
      </PageHeader>

      <section className="container-page section-space space-y-16">
        {/* Trois voies en liste typographique (contrat §8, T-15) : titre, phrase, action ; ancres #benevole et #partenaire gardées */}
        <TextList columns={3}>
          <TextListItem title="Faire un don" titleAs="h2" actions={<DonateButton />}>
            <p>Financez les cours d’allemand gratuits et les actions sociales de terrain.</p>
          </TextListItem>
          <TextListItem id="benevole" title="Devenir bénévole" titleAs="h2" actions={<PrimaryButton onClick={() => chooseRole('benevole')}>Remplir le formulaire bénévole</PrimaryButton>}>
            <p>Enseignants d’allemand, médecins, mentors ou coordinateurs locaux au Cameroun et en Europe.</p>
          </TextListItem>
          <TextListItem id="partenaire" title="Devenir partenaire" titleAs="h2" actions={<PrimaryButton onClick={() => chooseRole('partenaire')}>Proposer un partenariat</PrimaryButton>}>
            <p>Écoles, universités, ONG et entreprises souhaitant co-financer ou appuyer un programme.</p>
          </TextListItem>
        </TextList>

        {/* Formulaire Bénévole / Partenaire */}
        <div ref={formBlockRef} className="rounded-card bg-surface-section p-7 sm:p-10 max-w-3xl">
          <p role="status" className="sr-only">
            {statusMessage}
          </p>
          {prepared ? (
            <ContactHandoff
              compact
              headingLevel="h3"
              title={roleType === 'benevole' ? 'Dernière étape : envoyez votre proposition de bénévolat' : 'Dernière étape : envoyez votre proposition de partenariat'}
              draft={draft}
              titleRef={formTitleRef}
              onEdit={() => setPrepared(false)}
            >
              <p className="text-sm text-text-tertiary">
                Notre équipe prendra contact avec vous sous 7 à 14 jours ouvrés (TODO : confirmer délai).
              </p>
            </ContactHandoff>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h3 ref={formTitleRef} tabIndex={-1} className="font-serif text-2xl">
                Formulaire : {roleType === 'benevole' ? 'Devenir bénévole' : 'Devenir partenaire'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id={fieldId('name')}
                  label="Nom complet / Structure *"
                  error={errors.name}
                >
                  {(a11y) => (
                    <input
                      {...a11y}
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        recheck('name', e.target.value);
                      }}
                      onBlur={(e) => checkOnBlur('name', e.target.value)}
                      className={AGIR_INPUT_CLASS}
                    />
                  )}
                </FormField>
                <FormField
                  id={fieldId('email')}
                  label="E-mail *"
                  error={errors.email}
                >
                  {(a11y) => (
                    <input
                      {...a11y}
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        recheck('email', e.target.value);
                      }}
                      onBlur={(e) => checkOnBlur('email', e.target.value)}
                      className={AGIR_INPUT_CLASS}
                    />
                  )}
                </FormField>
              </div>

              <FormField
                id={fieldId('details')}
                label="Votre message (compétences, disponibilités ou projet de partenariat) *"
                error={errors.details}
              >
                {(a11y) => (
                  <textarea
                    {...a11y}
                    rows={4}
                    required
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                      recheck('details', e.target.value);
                    }}
                    onBlur={(e) => checkOnBlur('details', e.target.value)}
                    className={AGIR_INPUT_CLASS}
                  />
                )}
              </FormField>

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
                    J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition d’engagement (RGPD). *
                  </span>
                </label>
                <FieldError id={fieldErrorId(fieldId('consent'))} message={errors.consent} />
              </div>

              <PrimaryButton type="submit">Préparer l’envoi de ma proposition</PrimaryButton>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

export default AgirPage;
