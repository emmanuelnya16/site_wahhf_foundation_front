import { useState, useId, useRef, FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from '../components/wahhf/SEO';
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import InfoBox from '../components/wahhf/InfoBox';
import StepNumber, { ProgressBar } from '../components/wahhf/StepNumber';
import ChoiceTile from '../components/wahhf/ChoiceTile';
import FormField, { FieldError, fieldErrorId, LABEL_CLASS, FIELD_CLASS, CHECK_LABEL_CLASS, CHECKBOX_CLASS } from '../components/wahhf/FormField';
import { emailError, phoneError, requiredError, focusFirstError } from '../lib/formValidation';
import { useFocusOnChange } from '../lib/useFocusOnChange';
import ContactHandoff from '../components/wahhf/ContactHandoff';
import { COUNTRIES_DATA } from '../services/api';
import { buildDraft } from '../lib/contactDraft';

/**
 * Page /candidater :
 * Formulaire unique d'inscription et de demande d'accompagnement, découpé en étapes simples avec barre de progression :
 * 1. Identité et coordonnées (nom, e-mail, téléphone, pays et ville de résidence)
 * 2. Souhait : cours d'allemand / accompagnement vers l'Europe / les deux
 * 3. Pays d'intérêt parmi les 10 (si accompagnement)
 * 4. Niveau d'allemand actuel et format souhaité (en ligne / présentiel)
 * 5. Message libre
 * 6. Consentement RGPD + rappel clair : « Aucun document d'identité ni aucun paiement ne vous est demandé à cette étape. »
 * Pas encore d'envoi par le site (API Symfony à venir) : un message WhatsApp ou e-mail prérempli est préparé, avec le délai de réponse indicatif (marqué TODO).
 */
const WISH_LABELS = {
  cours_allemand: 'Cours d’allemand (A1 à C1)',
  accompagnement_europe: 'Accompagnement vers l’Europe',
  les_deux: 'Les deux (Cours + Orientation)',
} as const;

type ApplyField = 'fullName' | 'email' | 'phone' | 'residenceCountry' | 'city' | 'gdprConsent';
const STEP1_FIELDS = ['fullName', 'email', 'phone', 'residenceCountry', 'city'] as const;
const INPUT_CLASS = FIELD_CLASS;

function checkField(key: ApplyField, value: string | boolean): string | undefined {
  switch (key) {
    case 'fullName':
      return requiredError(String(value), 'Saisissez votre prénom et votre nom.');
    case 'email':
      return emailError(String(value));
    case 'phone':
      return phoneError(String(value));
    case 'residenceCountry':
      return requiredError(String(value), 'Indiquez votre pays de résidence, par exemple Cameroun.');
    case 'city':
      return requiredError(String(value), 'Indiquez votre ville de résidence, par exemple Douala.');
    case 'gdprConsent':
      return value ? undefined : 'Cochez cette case pour que nous puissions étudier votre candidature et vous recontacter.';
  }
}

export default function ApplyPage() {
  const [searchParams] = useSearchParams();

  const initialWish =
    (searchParams.get('souhait') as
      | 'cours_allemand'
      | 'accompagnement_europe'
      | 'les_deux') || 'les_deux';
  const initialLevel = searchParams.get('niveau') || 'A1 (Débutant)';
  const initialCountry = searchParams.get('pays') || 'allemagne';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  // Message prêt à envoyer (WhatsApp ou e-mail) : le site ne transmet pas encore la candidature lui-même
  const [prepared, setPrepared] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [residenceCountry, setResidenceCountry] = useState('Cameroun');
  const [city, setCity] = useState('');
  const [wishType, setWishType] = useState<
    'cours_allemand' | 'accompagnement_europe' | 'les_deux'
  >(initialWish);
  const [targetCountry, setTargetCountry] = useState(initialCountry);
  const [currentGermanLevel, setCurrentGermanLevel] = useState(initialLevel);
  const [preferredFormat, setPreferredFormat] = useState('En ligne');
  const [message, setMessage] = useState('');
  const [gdprConsent, setGdprConsent] = useState(false);

  // Champs reliés à leur label par un id unique (useId) ; erreurs affichées sous chaque champ
  const uid = useId();
  const fieldId = (key: ApplyField) => `apply-${key}-${uid}`;
  const [errors, setErrors] = useState<Partial<Record<ApplyField, string>>>({});
  const values: Record<ApplyField, string | boolean> = { fullName, email, phone, residenceCountry, city, gdprConsent };

  /** Vérifie les champs donnés ; en cas d'erreur, place le focus sur le premier champ fautif. */
  const validate = (keys: readonly ApplyField[]) => {
    const found: Partial<Record<ApplyField, string>> = {};
    for (const key of keys) found[key] = checkField(key, values[key]);
    setErrors((prev) => ({ ...prev, ...found }));
    return !focusFirstError(keys, found, fieldId);
  };
  // Un message affiché suit la correction en direct ; un champ rempli est vérifié quand on le quitte.
  const recheck = (key: ApplyField, value: string | boolean) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: checkField(key, value) }));
  };
  const checkOnBlur = (key: ApplyField, value: string) => {
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: checkField(key, value) }));
  };

  // Après chaque étape ou envoi : défilement en haut du formulaire, focus sur le titre, annonce polie
  const formSectionRef = useRef<HTMLElement>(null);
  const stepTitleRef = useFocusOnChange<HTMLHeadingElement>(prepared ? 'message-pret' : step, {
    scrollRef: formSectionRef,
  });
  const STEP_LABELS = { 1: 'Identité et coordonnées', 2: 'Souhait, pays et niveau d’allemand', 3: 'Projet et consentement' };
  const statusMessage = prepared
    ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.'
    : `Étape ${step} sur 3 : ${STEP_LABELS[step]}.`;

  // Chaque étape est validée à l'envoi du formulaire (bouton ou touche Entrée)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validate(STEP1_FIELDS)) setStep(2);
      return;
    }
    if (step === 2) {
      setStep(3);
      return;
    }
    if (!validate(['gdprConsent'])) return;
    setPrepared(true);
  };

  // Message préparé avec les réponses : rien n'est stocké ni envoyé par le site
  const targetCountryName = COUNTRIES_DATA.find((c) => c.slug === targetCountry)?.name;
  const draft = buildDraft(
    `Candidature WAHHF — ${fullName.trim()}`,
    'Je souhaite candidater à un parcours d’accompagnement de WAHHF Foundation. Voici mes réponses au formulaire du site :',
    [
      ['Nom complet', fullName],
      ['E-mail', email],
      ['Téléphone / WhatsApp', phone],
      ['Pays de résidence', residenceCountry],
      ['Ville', city],
      ['Souhait', WISH_LABELS[wishType]],
      ['Pays d’intérêt', wishType === 'cours_allemand' ? undefined : targetCountryName],
      ['Niveau d’allemand', currentGermanLevel],
      ['Format souhaité', preferredFormat],
      ['Message', message],
    ],
    'J’accepte que mes coordonnées soient traitées par WAHHF Foundation dans le seul but de répondre à ma demande d’accompagnement.'
  );

  return (
    <>
      <SEO
        title="Candidater gratuitement — Cours d'allemand & Accompagnement Europe"
        description="Formulaire unique et 100 % gratuit de demande d'accompagnement et d'inscription aux cours d'allemand WAHHF Foundation. Aucun document d'identité ni paiement demandé."
      />

      <PageHeader>
        <PageTitle>
          Candidater à un parcours d’accompagnement
        </PageTitle>
        <PageIntro>
          Formulaire unique pour rejoindre l’Académie de langue allemande (A1 à C1) et/ou bénéficier d’une orientation documentée vers l’Europe.
        </PageIntro>
      </PageHeader>

      <section className="container-page *:max-w-4xl">
        <DisclaimerBanner compact />
      </section>

      <section ref={formSectionRef} className="container-page *:max-w-4xl section-space">
        {/* Annonce des changements d'étape et de l'envoi (toujours présente, lue poliment) */}
        <p role="status" className="sr-only">
          {statusMessage}
        </p>
        {prepared ? (
          <ContactHandoff
            title="Dernière étape : envoyez votre candidature"
            draft={draft}
            titleRef={stepTitleRef}
            onEdit={() => setPrepared(false)}
          >
            <InfoBox>
              <p className="font-semibold text-info">
                Délai de réponse indicatif : sous 7 à 14 jours ouvrés (TODO : délai exact à confirmer par l’équipe WAHHF).
              </p>
              <p>
                Rappel : Aucun collaborateur de WAHHF ne vous demandera d’argent par téléphone, e-mail ou WhatsApp pour traiter votre dossier.
              </p>
            </InfoBox>
          </ContactHandoff>
        ) : (
          <div className="rounded-card bg-surface-section p-6 sm:p-10 space-y-8">
            {/* Barre de progression des 3 étapes */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-meta text-text-secondary">
                <span className="font-bold text-text">Étape {step} sur 3</span>
                {/* Intitulés en casse de phrase, sans « 1. » qui doublait « Étape 1 sur 3 » (liste §6, ApplyPage:204) */}
                <span>{step === 3 ? 'Projet et consentement RGPD' : STEP_LABELS[step]}</span>
              </div>
              <ProgressBar value={step} max={3} />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <StepNumber n={1} decorative className="mt-1" />
                    <SectionHeader
                      titleRef={stepTitleRef}
                      title="Vos coordonnées de contact"
                      subtitle="Ces informations servent uniquement à vous recontacter gratuitement."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField id={fieldId('fullName')} label="Nom complet (Prénom & Nom) *" error={errors.fullName}>
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="Ex. Marie Nguenang"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            recheck('fullName', e.target.value);
                          }}
                          onBlur={(e) => checkOnBlur('fullName', e.target.value)}
                          className={INPUT_CLASS}
                        />
                      )}
                    </FormField>

                    <FormField id={fieldId('email')} label="Adresse e-mail *" error={errors.email}>
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="email"
                          required
                          autoComplete="email"
                          placeholder="exemple@domaine.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            recheck('email', e.target.value);
                          }}
                          onBlur={(e) => checkOnBlur('email', e.target.value)}
                          className={INPUT_CLASS}
                        />
                      )}
                    </FormField>

                    <FormField id={fieldId('phone')} label="Téléphone / WhatsApp *" error={errors.phone}>
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="tel"
                          required
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="Ex. +237 6..."
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            recheck('phone', e.target.value);
                          }}
                          onBlur={(e) => checkOnBlur('phone', e.target.value)}
                          className={INPUT_CLASS}
                        />
                      )}
                    </FormField>

                    <FormField id={fieldId('residenceCountry')} label="Pays de résidence actuel *" error={errors.residenceCountry}>
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="text"
                          required
                          autoComplete="country-name"
                          value={residenceCountry}
                          onChange={(e) => {
                            setResidenceCountry(e.target.value);
                            recheck('residenceCountry', e.target.value);
                          }}
                          onBlur={(e) => checkOnBlur('residenceCountry', e.target.value)}
                          className={INPUT_CLASS}
                        />
                      )}
                    </FormField>

                    <FormField id={fieldId('city')} label="Ville de résidence *" error={errors.city} className="sm:col-span-2">
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="text"
                          required
                          autoComplete="address-level2"
                          placeholder="Ex. Douala, Yaoundé, Bafoussam, Garoua..."
                          value={city}
                          onChange={(e) => {
                            setCity(e.target.value);
                            recheck('city', e.target.value);
                          }}
                          onBlur={(e) => checkOnBlur('city', e.target.value)}
                          className={INPUT_CLASS}
                        />
                      )}
                    </FormField>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <PrimaryButton type="submit">Continuer vers l’étape 2</PrimaryButton>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <StepNumber n={2} decorative className="mt-1" />
                    <SectionHeader
                      titleRef={stepTitleRef}
                      title="Votre souhait d’accompagnement"
                      subtitle="Précisez le volet qui vous intéresse ainsi que votre niveau linguistique actuel."
                    />
                  </div>

                  <fieldset>
                    <legend className={LABEL_CLASS}>
                      Que souhaitez-vous ? *
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'cours_allemand' as const, label: 'Cours d’allemand (A1 à C1)' },
                        { id: 'accompagnement_europe' as const, label: 'Accompagnement vers l’Europe' },
                        { id: 'les_deux' as const, label: 'Les deux (Cours + Orientation)' },
                      ].map((opt) => (
                        <ChoiceTile
                          key={opt.id}
                          name="apply-wish"
                          value={opt.id}
                          checked={wishType === opt.id}
                          onChange={() => setWishType(opt.id)}
                          showCheck
                          className="p-4 rounded-2xl text-left font-medium"
                        >
                          {opt.label}
                        </ChoiceTile>
                      ))}
                    </div>
                  </fieldset>

                  {(wishType === 'accompagnement_europe' || wishType === 'les_deux') && (
                    <div>
                      <label
                        htmlFor="apply-target-country"
                        className={LABEL_CLASS}
                      >
                        Pays d’intérêt principal parmi les 10 pays accompagnés
                      </label>
                      <select
                        id="apply-target-country"
                        value={targetCountry}
                        onChange={(e) => setTargetCountry(e.target.value)}
                        className={FIELD_CLASS}
                      >
                        {COUNTRIES_DATA.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.flag} {c.name} {!c.isEU ? '(Hors Union européenne)' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="apply-german-level"
                        className={LABEL_CLASS}
                      >
                        Niveau d’allemand actuel / visé
                      </label>
                      <select
                        id="apply-german-level"
                        value={currentGermanLevel}
                        onChange={(e) => setCurrentGermanLevel(e.target.value)}
                        className={FIELD_CLASS}
                      >
                        <option value="A1">A1 — Débutant complet</option>
                        <option value="A2">A2 — Bases élémentaires</option>
                        <option value="B1">B1 — Niveau intermédiaire</option>
                        <option value="B2">B2 — Niveau avancé</option>
                        <option value="C1">C1 — Niveau académique</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="apply-format"
                        className={LABEL_CLASS}
                      >
                        Format souhaité
                      </label>
                      <select
                        id="apply-format"
                        value={preferredFormat}
                        onChange={(e) => setPreferredFormat(e.target.value)}
                        className={FIELD_CLASS}
                      >
                        <option value="En ligne">En ligne (accessible partout)</option>
                        <option value="Présentiel Douala (TODO)">
                          Présentiel — Douala (lieu à confirmer — TODO)
                        </option>
                        <option value="Présentiel Yaoundé (TODO)">
                          Présentiel — Yaoundé (lieu à confirmer — TODO)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                    <SecondaryButton onClick={() => setStep(1)}>Étape précédente</SecondaryButton>
                    <PrimaryButton type="submit">Continuer vers l’étape 3</PrimaryButton>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <StepNumber n={3} decorative className="mt-1" />
                    <SectionHeader
                      titleRef={stepTitleRef}
                      title="Votre motivation & validation"
                      subtitle="Présentez brièvement votre parcours et validez votre demande gratuite."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="apply-message"
                      className={LABEL_CLASS}
                    >
                      Message libre (études actuelles, objectifs, disponibilités)
                    </label>
                    <textarea
                      id="apply-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Expliquez en quelques lignes votre motivation et votre projet..."
                      className={FIELD_CLASS}
                    />
                  </div>

                  {/* Rappel clair obligatoire : aucun document d'identité ni paiement demandé */}
                  <InfoBox>
                    <p>
                      « Aucun document d’identité ni aucun paiement ne vous est demandé à cette étape. »
                    </p>
                  </InfoBox>

                  {/* Case consentement RGPD explicite */}
                  <div>
                    <label className={CHECK_LABEL_CLASS}>
                      <input
                        id={fieldId('gdprConsent')}
                        type="checkbox"
                        required
                        checked={gdprConsent}
                        onChange={(e) => {
                          setGdprConsent(e.target.checked);
                          recheck('gdprConsent', e.target.checked);
                        }}
                        aria-invalid={errors.gdprConsent ? true : undefined}
                        aria-describedby={errors.gdprConsent ? fieldErrorId(fieldId('gdprConsent')) : undefined}
                        className={CHECKBOX_CLASS}
                      />
                      <span>
                        J’accepte que mes coordonnées soient traitées de manière strictement confidentielle par WAHHF Foundation dans le seul but de répondre gratuitement à ma demande d’accompagnement, conformément à la{' '}
                        <Link to="/confidentialite" className="underline text-accent">
                          politique de confidentialité (RGPD)
                        </Link>
                        . *
                      </span>
                    </label>
                    <FieldError id={fieldErrorId(fieldId('gdprConsent'))} message={errors.gdprConsent} />
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
                    <SecondaryButton onClick={() => setStep(2)}>Étape précédente</SecondaryButton>

                    <PrimaryButton type="submit">Préparer l’envoi de ma candidature</PrimaryButton>
                  </div>
                </div>
              )}
            </form>
          </div>
        )}
      </section>
    </>
  );
}
