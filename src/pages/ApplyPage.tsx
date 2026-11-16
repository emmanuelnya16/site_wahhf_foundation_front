import { useState, useId, useRef, FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import ChoiceTile from '../components/wahhf/ChoiceTile';
import FormField, { FieldError, fieldErrorId } from '../components/wahhf/FormField';
import { emailError, phoneError, requiredError, focusFirstError } from '../lib/formValidation';
import { useFocusOnChange } from '../lib/useFocusOnChange';
import { COUNTRIES_DATA, submitApplication } from '../services/api';

/**
 * Page /candidater :
 * Formulaire unique d'inscription et de demande d'accompagnement, découpé en étapes simples avec barre de progression :
 * 1. Identité et coordonnées (nom, e-mail, téléphone, pays et ville de résidence)
 * 2. Souhait : cours d'allemand / accompagnement vers l'Europe / les deux
 * 3. Pays d'intérêt parmi les 10 (si accompagnement)
 * 4. Niveau d'allemand actuel et format souhaité (en ligne / présentiel)
 * 5. Message libre
 * 6. Consentement RGPD + rappel clair : « Aucun document d'identité ni aucun paiement ne vous est demandé à cette étape. »
 * Confirmation chaleureuse à l'envoi avec délai de réponse indicatif (marqué TODO).
 */
type ApplyField = 'fullName' | 'email' | 'phone' | 'residenceCountry' | 'city' | 'gdprConsent';
const STEP1_FIELDS = ['fullName', 'email', 'phone', 'residenceCountry', 'city'] as const;
const INPUT_CLASS =
  'w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 aria-invalid:border-danger text-sm';

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
  const [submitting, setSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    reference: string;
    responseDelayNote: string;
  } | null>(null);

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
  const stepTitleRef = useFocusOnChange<HTMLHeadingElement>(confirmation ? 'confirmation' : step, {
    scrollRef: formSectionRef,
  });
  const STEP_LABELS = { 1: 'Identité et coordonnées', 2: 'Souhait, pays et niveau d’allemand', 3: 'Projet et consentement' };
  const statusMessage = confirmation ? 'Envoi terminé.' : `Étape ${step} sur 3 : ${STEP_LABELS[step]}.`;

  // Chaque étape est validée à l'envoi du formulaire (bouton ou touche Entrée)
  const handleSubmit = async (e: FormEvent) => {
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
    setSubmitting(true);
    const res = await submitApplication({
      fullName,
      email,
      phone,
      residenceCountry,
      city,
      wishType,
      targetCountry,
      currentGermanLevel,
      preferredFormat,
      message,
      gdprConsent,
    });
    setSubmitting(false);
    setConfirmation(res);
  };

  return (
    <>
      <SEO
        title="Candidater gratuitement — Cours d'allemand & Accompagnement Europe"
        description="Formulaire unique et 100 % gratuit de demande d'accompagnement et d'inscription aux cours d'allemand WAHHF Foundation. Aucun document d'identité ni paiement demandé."
      />

      <section className="surface-green pt-32 pb-14 bg-[#0F3D2E] text-[#F5F1E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E8A317]/20 text-gold-on-green text-xs font-semibold uppercase tracking-widest">
            <CheckCircle2 className="w-4 h-4" />
            100 % Gratuit · Financé par IROKO et nos donateurs
          </span>
          <h1 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-tight">
            Candidater à un parcours d’accompagnement
          </h1>
          <p className="text-base sm:text-lg text-[#F5F1E8]/85">
            Formulaire unique pour rejoindre l’Académie de langue allemande (A1 à C1) et/ou bénéficier d’une orientation documentée vers l’Europe.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <DisclaimerBanner compact />
      </section>

      <section ref={formSectionRef} className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Annonce des changements d'étape et de l'envoi (toujours présente, lue poliment) */}
        <p role="status" className="sr-only">
          {statusMessage}
        </p>
        {confirmation ? (
          <div className="rounded-[24px] bg-white dark:bg-[#132A21] border-2 border-[#E8A317] p-8 sm:p-12 text-center space-y-6 shadow-md">
            <div className="w-16 h-16 rounded-full bg-[#0F3D2E] text-[#E8A317] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="inline-block px-4 py-1 rounded-full bg-[#0F3D2E]/10 dark:bg-[#E8A317]/20 text-xs font-semibold text-[#0F3D2E] dark:text-[#E8A317]">
              Référence : {confirmation.reference}
            </span>

            <h2 ref={stepTitleRef} tabIndex={-1} className="font-serif font-normal text-3xl sm:text-4xl text-[#1B1B18] dark:text-[#F5F1E8]">
              Merci {fullName}, votre candidature est bien enregistrée
            </h2>

            <p className="text-base text-[#1B1B18]/80 dark:text-[#F5F1E8]/80 max-w-2xl mx-auto leading-relaxed">
              Toute l’équipe de WAHHF Foundation vous remercie pour votre confiance. Votre demande sera étudiée avec bienveillance par nos coordinateurs pédagogiques.
            </p>

            <div className="rounded-2xl bg-[#F5F1E8] dark:bg-[#0F3D2E] p-5 max-w-xl mx-auto text-sm text-[#1B1B18] dark:text-[#F5F1E8]">
              <p className="font-semibold text-[#0F3D2E] dark:text-[#E8A317] mb-1">
                {confirmation.responseDelayNote}
              </p>
              <p className="text-xs opacity-80">
                Rappel : Aucun collaborateur de WAHHF ne vous demandera d’argent par téléphone, e-mail ou WhatsApp pour traiter votre dossier.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/mobilite-langues"
                className="px-6 py-3 rounded-full bg-[#0F3D2E] text-[#F5F1E8] text-sm font-semibold"
              >
                Retour au hub Mobilité & Langues
              </Link>
              <Link
                to="/"
                className="px-6 py-3 rounded-full border border-[#0F3D2E]/30 dark:border-[#F5F1E8]/30 text-sm font-medium"
              >
                Retour à l’accueil
              </Link>
            </div>
          </div>
        ) : (
          <div className="rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/15 dark:border-[#F5F1E8]/15 p-6 sm:p-10 shadow-sm space-y-8">
            {/* Barre de progression des 3 étapes */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#0F3D2E] dark:text-[#E8A317]">
                <span>Étape {step} sur 3</span>
                <span>
                  {step === 1
                    ? '1. Identité & Coordonnées'
                    : step === 2
                    ? '2. Souhait, Pays & Niveau d’allemand'
                    : '3. Projet & Consentement RGPD'}
                </span>
              </div>
              <div aria-hidden="true" className="w-full h-2 rounded-full bg-[#F5F1E8] dark:bg-[#0F3D2E] overflow-hidden">
                <div
                  className="h-full w-full origin-left bg-gradient-to-r from-[#0F3D2E] to-[#E8A317] transition-transform duration-300"
                  style={{ transform: `scaleX(${step / 3})` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {step === 1 && (
                <div className="space-y-5">
                  <SectionHeader
                    titleRef={stepTitleRef}
                    reveal={false}
                    kicker="Étape 01 / 03"
                    title="Vos coordonnées de contact"
                    subtitle="Ces informations servent uniquement à vous recontacter gratuitement."
                  />

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
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0F3D2E] text-[#F5F1E8] text-sm font-semibold cursor-pointer"
                    >
                      <span>Continuer vers l’étape 2</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <SectionHeader
                    titleRef={stepTitleRef}
                    reveal={false}
                    kicker="Étape 02 / 03"
                    title="Votre souhait d’accompagnement"
                    subtitle="Précisez le volet qui vous intéresse ainsi que votre niveau linguistique actuel."
                  />

                  <fieldset>
                    <legend className="text-xs font-semibold uppercase tracking-wider mb-3">
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
                          className={`p-4 rounded-2xl border text-left text-sm font-medium transition ${
                            wishType === opt.id
                              ? 'bg-[#0F3D2E] text-[#E8A317] border-[#E8A317]'
                              : 'bg-[#F5F1E8] dark:bg-[#0F3D2E]/50 border-[#0F3D2E]/15'
                          }`}
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
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      >
                        Pays d’intérêt principal parmi les 10 pays accompagnés
                      </label>
                      <select
                        id="apply-target-country"
                        value={targetCountry}
                        onChange={(e) => setTargetCountry(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
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
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      >
                        Niveau d’allemand actuel / visé
                      </label>
                      <select
                        id="apply-german-level"
                        value={currentGermanLevel}
                        onChange={(e) => setCurrentGermanLevel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
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
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      >
                        Format souhaité
                      </label>
                      <select
                        id="apply-format"
                        value={preferredFormat}
                        onChange={(e) => setPreferredFormat(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
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

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0F3D2E]/25 text-sm cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Étape précédente</span>
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0F3D2E] text-[#F5F1E8] text-sm font-semibold cursor-pointer"
                    >
                      <span>Continuer vers l’étape 3</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <SectionHeader
                    titleRef={stepTitleRef}
                    reveal={false}
                    kicker="Étape 03 / 03"
                    title="Votre motivation & validation"
                    subtitle="Présentez brièvement votre parcours et validez votre demande gratuite."
                  />

                  <div>
                    <label
                      htmlFor="apply-message"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    >
                      Message libre (études actuelles, objectifs, disponibilités)
                    </label>
                    <textarea
                      id="apply-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Expliquez en quelques lignes votre motivation et votre projet..."
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
                    />
                  </div>

                  {/* Rappel clair obligatoire : aucun document d'identité ni paiement demandé */}
                  <div className="rounded-2xl bg-[#0F3D2E]/8 dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#E8A317]/40 p-5 flex items-start gap-3.5">
                    <ShieldCheck className="w-6 h-6 text-[#0F3D2E] dark:text-[#E8A317] shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-[#1B1B18] dark:text-[#F5F1E8]">
                      « Aucun document d’identité ni aucun paiement ne vous est demandé à cette étape. »
                    </p>
                  </div>

                  {/* Case consentement RGPD explicite */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-[#1B1B18]/85 dark:text-[#F5F1E8]/85">
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
                        className="mt-1 w-4 h-4 accent-[#0F3D2E]"
                      />
                      <span>
                        J’accepte que mes coordonnées soient traitées de manière strictement confidentielle par WAHHF Foundation dans le seul but de répondre gratuitement à ma demande d’accompagnement, conformément à la{' '}
                        <Link to="/confidentialite" className="underline text-[#0F3D2E] dark:text-[#E8A317]">
                          politique de confidentialité (RGPD)
                        </Link>
                        . *
                      </span>
                    </label>
                    <FieldError id={fieldErrorId(fieldId('gdprConsent'))} message={errors.gdprConsent} />
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0F3D2E]/25 text-sm cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Étape précédente</span>
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3.5 rounded-full bg-[#0F3D2E] hover:bg-[#14523E] text-[#F5F1E8] text-sm sm:text-base font-semibold disabled:opacity-50 cursor-pointer"
                    >
                      {submitting
                        ? 'Enregistrement en cours...'
                        : 'Envoyer ma candidature gratuite'}
                    </button>
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
