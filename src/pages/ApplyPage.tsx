import { useState, useId, useRef, useEffect, FormEvent, Ref } from 'react';
import { useSearchParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Trans } from 'react-i18next';
import type { TFunction } from 'i18next';
import SEO from '../components/wahhf/SEO';
import { PrimaryButton, SecondaryButton } from '../components/wahhf/Buttons';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
import InfoBox from '../components/wahhf/InfoBox';
import { ProgressBar } from '../components/wahhf/StepNumber';
import ChoiceTile from '../components/wahhf/ChoiceTile';
import FormField, { FieldError, fieldErrorId, LABEL_CLASS, FIELD_CLASS, CHECK_LABEL_CLASS, CHECKBOX_CLASS } from '../components/wahhf/FormField';
import { AfterApplicationSteps, WhoCanApply } from '../components/wahhf/AfterApplication';
import { emailError, phoneError, requiredError, focusFirstError } from '../lib/formValidation';
import { useFocusOnChange } from '../lib/useFocusOnChange';
import ContactHandoff from '../components/wahhf/ContactHandoff';
import { COUNTRIES_DATA, COURSE_SESSIONS_DATA } from '../services/api';
import { formatKey, localizedSession, upcomingSessions } from '../lib/sessions';
import { buildDraft } from '../lib/contactDraft';
import { useLocalize } from '../lib/localize';
import '../locales/mobilite';

/**
 * Page /candidater (groupe 7.1 : contrat validé, audit CAND-01 à CAND-04, ACAD-01, ACAD-06, T-14).
 * Formulaire unique en 3 étapes : coordonnées ; souhait, pays, niveau et format ; message et consentement. Le site
 * n'envoie rien encore (API à venir) : un message WhatsApp ou e-mail est préparé avec les réponses.
 * - L'étape est dans l'adresse (?etape=2, ?etape=envoi) : le bouton retour du téléphone revient à l'étape précédente
 *   (CAND-02). Les réponses sont gardées en brouillon dans le navigateur (sessionStorage, effacé à la fermeture de
 *   l'onglet) et restaurées au retour, avec « Nous avons gardé vos réponses ».
 * - Paramètres vérifiés (CAND-04) : souhait, niveau, pays et session hors liste sont ignorés. Une session choisie sur
 *   l'Académie (?session=…) règle le niveau et le format et s'affiche en tête du formulaire (ACAD-01).
 * - Un seul indicateur d'étape : « Étape 2 sur 3 » et la barre de progression.
 * - Avant le formulaire : qui peut candidater, et ce qui se passe ensuite (ACAD-06).
 * - Mouvement (contrat §10, groupe 7.1) : en-tête révélé ; changement d'étape en fondu et glissement de 16 px (0,3 s),
 *   focus placé sur le titre de l'étape une fois l'animation finie ; barre qui avance en 0,3 s.
 * - Lot 7.10 : textes du paquet « mobilite » (mobilite.candidature.*) ; les valeurs du formulaire (souhait, format,
 *   niveau) restent les mêmes dans toutes les langues, seuls leurs libellés sont traduits. Le message préparé est
 *   rédigé dans la langue de la personne (libellés traduits, mêmes réponses).
 */
/** Souhaits (libellés : mobilite.candidature.souhaits.<id>). */
const WISHES = ['cours_allemand', 'accompagnement_europe', 'les_deux'] as const;
type Wish = (typeof WISHES)[number];
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'] as const;
/** Formats : valeurs du formulaire (libellés : mobilite.formatsChoix.<clé>, message : mobilite.formats.<clé>). */
const FORMATS = ['En ligne', 'Présentiel à Douala', 'Présentiel à Yaoundé'] as const;
/** Titres des étapes : affichés en h3 et annoncés à chaque changement (un seul libellé par étape, critique 7.1) ;
 *  textes : mobilite.candidature.etapes.<n>. */
const stepLabel = (t: TFunction, step: 1 | 2 | 3) => t(`mobilite.candidature.etapes.${step}`);

type ApplyField = 'fullName' | 'email' | 'phone' | 'residenceCountry' | 'city' | 'gdprConsent';
const STEP1_FIELDS = ['fullName', 'email', 'phone', 'residenceCountry', 'city'] as const;
const INPUT_CLASS = FIELD_CLASS;

function checkField(key: ApplyField, value: string | boolean, t: TFunction): string | undefined {
  switch (key) {
    case 'fullName':
      return requiredError(String(value), t('mobilite.candidature.erreurs.nom'));
    case 'email':
      return emailError(String(value));
    case 'phone':
      return phoneError(String(value));
    case 'residenceCountry':
      return requiredError(String(value), t('mobilite.candidature.erreurs.pays'));
    case 'city':
      return requiredError(String(value), t('mobilite.candidature.erreurs.ville'));
    case 'gdprConsent':
      return value ? undefined : t('mobilite.candidature.erreurs.accord');
  }
}

/** Brouillon gardé dans l'onglet (sessionStorage, dans un try/catch : navigation privée, stockage bloqué). */
const DRAFT_KEY = 'wahhf_candidature_brouillon';
type Draft = {
  fullName: string;
  email: string;
  phone: string;
  residenceCountry: string;
  city: string;
  wishType: Wish;
  targetCountry: string;
  currentGermanLevel: string;
  preferredFormat: string;
  message: string;
};
function readDraft(): Partial<Draft> | null {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? (JSON.parse(raw) as Partial<Draft>) : null;
  } catch {
    return null;
  }
}
/** Le brouillon contient-il une saisie de la personne (et pas seulement les valeurs par défaut) ? */
const hasTyped = (d: Partial<Draft> | null | undefined) =>
  !!d && [d.fullName, d.email, d.phone, d.city, d.message].some((v) => typeof v === 'string' && v.trim() !== '');

const isWish = (v: unknown): v is Wish => typeof v === 'string' && (WISHES as readonly string[]).includes(v);
const isLevel = (v: unknown): v is (typeof LEVELS)[number] => typeof v === 'string' && (LEVELS as readonly string[]).includes(v);
const isCountry = (v: unknown): v is string => typeof v === 'string' && COUNTRIES_DATA.some((c) => c.slug === v);
const isFormat = (v: unknown): v is string => typeof v === 'string' && (FORMATS as readonly string[]).includes(v);
/** Format d'une session de l'Académie, dans les valeurs du formulaire. */
const sessionFormat = (format: string) =>
  format.includes('Douala') ? 'Présentiel à Douala' : format.includes('Yaoundé') ? 'Présentiel à Yaoundé' : 'En ligne';

/** Titre d'une étape (h3 sous le h2 « Votre candidature », T-19), qui reçoit le focus au changement d'étape. */
function StepTitle({ title, text, titleRef }: { title: string; text: string; titleRef: Ref<HTMLHeadingElement> }) {
  return (
    <div className="space-y-2">
      <h3 ref={titleRef} tabIndex={-1} className="text-body font-semibold text-text">
        {title}
      </h3>
      <p className="text-body text-text-secondary max-w-[65ch]">{text}</p>
    </div>
  );
}

export default function ApplyPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, lang, localized } = useLocalize();
  /** Pays de résidence proposé d'avance : « Cameroun », « Cameroon » ou « Kamerun » selon la langue. */
  const defaultCountry = t('mobilite.candidature.paysDefaut');

  // Valeurs de départ : le brouillon gardé, puis les paramètres de l'adresse s'ils sont valides (CAND-04)
  const [initial] = useState(() => {
    const draft = readDraft();
    const wish = searchParams.get('souhait');
    const level = searchParams.get('niveau')?.toUpperCase();
    const country = searchParams.get('pays');
    const session = upcomingSessions(COURSE_SESSIONS_DATA).find((s) => s.id === searchParams.get('session'));
    return {
      restored: hasTyped(draft),
      fullName: draft?.fullName ?? '',
      email: draft?.email ?? '',
      phone: draft?.phone ?? '',
      residenceCountry: draft?.residenceCountry ?? defaultCountry,
      city: draft?.city ?? '',
      wishType: isWish(wish) ? wish : session ? 'cours_allemand' : isWish(draft?.wishType) ? draft.wishType : 'les_deux',
      targetCountry: isCountry(country) ? country : isCountry(draft?.targetCountry) ? draft.targetCountry : 'allemagne',
      currentGermanLevel: session ? session.level : isLevel(level) ? level : isLevel(draft?.currentGermanLevel) ? draft.currentGermanLevel : 'A1',
      preferredFormat: session ? sessionFormat(session.format) : isFormat(draft?.preferredFormat) ? draft.preferredFormat : 'En ligne',
      message: draft?.message ?? '',
    };
  });

  const [fullName, setFullName] = useState(initial.fullName);
  const [email, setEmail] = useState(initial.email);
  const [phone, setPhone] = useState(initial.phone);
  const [residenceCountry, setResidenceCountry] = useState(initial.residenceCountry);
  const [city, setCity] = useState(initial.city);
  const [wishType, setWishType] = useState<Wish>(initial.wishType);
  const [targetCountry, setTargetCountry] = useState(initial.targetCountry);
  const [currentGermanLevel, setCurrentGermanLevel] = useState<string>(initial.currentGermanLevel);
  const [preferredFormat, setPreferredFormat] = useState(initial.preferredFormat);
  const [message, setMessage] = useState(initial.message);
  const [gdprConsent, setGdprConsent] = useState(false);
  const [restored, setRestored] = useState(initial.restored);

  // Changement de langue : le pays proposé d'avance suit la langue, s'il n'a pas été modifié
  const shownDefaultCountry = useRef(defaultCountry);
  useEffect(() => {
    if (shownDefaultCountry.current === defaultCountry) return;
    setResidenceCountry((current) => (current === shownDefaultCountry.current ? defaultCountry : current));
    shownDefaultCountry.current = defaultCountry;
  }, [defaultCountry]);

  // Session choisie sur l'Académie (ACAD-01), affichée en tête du formulaire ; une session commencée est ignorée
  const session = upcomingSessions(COURSE_SESSIONS_DATA).find((s) => s.id === searchParams.get('session'));

  // Étape dans l'adresse (CAND-02) : 1, 2, 3, ou « envoi » (message prêt)
  const etape = searchParams.get('etape');
  const prepared = etape === 'envoi';
  const step: 1 | 2 | 3 = etape === '2' ? 2 : etape === '3' || prepared ? 3 : 1;
  const location = useLocation();
  const navigate = useNavigate();
  // Avancer : nouvelle entrée d'historique, marquée (le bouton retour du téléphone revient à l'étape d'avant)
  const goTo = (next: '2' | '3' | 'envoi' | null, replace = false) =>
    setSearchParams(
      (prev) => {
        const params = new URLSearchParams(prev);
        if (next) params.set('etape', next);
        else params.delete('etape');
        return params;
      },
      { replace, state: replace ? location.state : { candidatureStep: true } }
    );
  // Revenir (« Étape précédente », « Modifier mes réponses ») : on remonte l'historique si l'on y est arrivé en
  // avançant, sinon on remplace l'adresse ; jamais de boucle entre deux étapes avec le bouton retour
  const goBack = (to: '2' | '3' | null) => {
    if ((location.state as { candidatureStep?: boolean } | null)?.candidatureStep) navigate(-1);
    else goTo(to, true);
  };

  // Champs reliés à leur label par un id unique (useId) ; erreurs affichées sous chaque champ
  const uid = useId();
  const fieldId = (key: ApplyField) => `apply-${key}-${uid}`;
  const [errors, setErrors] = useState<Partial<Record<ApplyField, string>>>({});
  const values: Record<ApplyField, string | boolean> = { fullName, email, phone, residenceCountry, city, gdprConsent };
  const step1Valid = STEP1_FIELDS.every((key) => !checkField(key, values[key], t));

  // Changement de langue : les messages d'erreur affichés passent dans la nouvelle langue
  useEffect(() => {
    setErrors((prev) => {
      const shown = (Object.keys(prev) as ApplyField[]).filter((key) => prev[key]);
      if (!shown.length) return prev;
      const next = { ...prev };
      for (const key of shown) next[key] = checkField(key, values[key], t);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Adresse corrigée en une seule fois (deux appels à setSearchParams dans le même rendu s'écraseraient) :
  // - souhait, niveau et pays de l'adresse : appliqués à l'arrivée, puis retirés (un rechargement garde ensuite les
  //   choix faits dans le formulaire, gardés en brouillon) ;
  // - étape plus loin sans coordonnées valides (lien partagé, brouillon effacé) : retour à l'étape 1 ;
  // - message prêt sans la case d'accord cochée (rechargement, lien direct) : retour à l'étape 3 pour la cocher.
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    ['souhait', 'niveau', 'pays'].forEach((k) => params.delete(k));
    if (step > 1 && !step1Valid) params.delete('etape');
    else if (prepared && !gdprConsent) params.set('etape', '3');
    if (params.toString() !== searchParams.toString()) setSearchParams(params, { replace: true, state: location.state });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, prepared]);

  // Un autre niveau ou un autre format que ceux de la session choisie : la session n'est plus retenue
  useEffect(() => {
    if (!session) return;
    if (currentGermanLevel !== session.level || preferredFormat !== sessionFormat(session.format)) {
      setSearchParams(
        (prev) => {
          const params = new URLSearchParams(prev);
          params.delete('session');
          return params;
        },
        { replace: true, state: location.state }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGermanLevel, preferredFormat]);

  // Brouillon : enregistré à chaque modification (le consentement n'est jamais gardé)
  useEffect(() => {
    const draft: Draft = { fullName, email, phone, residenceCountry, city, wishType, targetCountry, currentGermanLevel, preferredFormat, message };
    try {
      // Rien de saisi : pas de brouillon (les valeurs par défaut ne sont pas des réponses)
      if (hasTyped(draft)) sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      else sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* stockage indisponible : le formulaire marche sans brouillon */
    }
  }, [fullName, email, phone, residenceCountry, city, wishType, targetCountry, currentGermanLevel, preferredFormat, message]);

  const clearDraft = () => {
    try {
      sessionStorage.removeItem(DRAFT_KEY);
    } catch {
      /* rien à faire */
    }
    setFullName('');
    setEmail('');
    setPhone('');
    setResidenceCountry(defaultCountry);
    setCity('');
    setMessage('');
    setErrors({});
    setRestored(false);
    goTo(null);
  };

  /** Vérifie les champs donnés ; en cas d'erreur, place le focus sur le premier champ fautif. */
  const validate = (keys: readonly ApplyField[]) => {
    const found: Partial<Record<ApplyField, string>> = {};
    for (const key of keys) found[key] = checkField(key, values[key], t);
    setErrors((prev) => ({ ...prev, ...found }));
    return !focusFirstError(keys, found, fieldId);
  };
  // Un message affiché suit la correction en direct ; un champ rempli est vérifié quand on le quitte.
  const recheck = (key: ApplyField, value: string | boolean) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: checkField(key, value, t) }));
  };
  const checkOnBlur = (key: ApplyField, value: string) => {
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: checkField(key, value, t) }));
  };

  // Après chaque étape ou envoi : défilement en haut du formulaire, puis focus sur le titre une fois l'entrée animée
  const formSectionRef = useRef<HTMLElement>(null);
  const stepTitleRef = useFocusOnChange<HTMLHeadingElement>(prepared ? 'message-pret' : step, {
    scrollRef: formSectionRef,
    afterMs: 300,
  });
  const statusMessage = prepared
    ? t('mobilite.candidature.statutPret')
    : t('mobilite.candidature.statutEtape', { step, label: stepLabel(t, step) });

  // Chaque étape est validée à l'envoi du formulaire (bouton ou touche Entrée)
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      if (validate(STEP1_FIELDS)) goTo('2');
      return;
    }
    if (step === 2) {
      goTo('3');
      return;
    }
    if (!validate(['gdprConsent'])) return;
    goTo('envoi');
  };

  // Message préparé avec les réponses : rien n'est envoyé par le site
  const countryName = (slug: string) => {
    const country = COUNTRIES_DATA.find((c) => c.slug === slug);
    return country && localized(country, `contenu.pays.${country.slug}`).name;
  };
  const targetCountryName = countryName(targetCountry);
  const m = (key: string) => t(`mobilite.candidature.message.${key}`);
  const draft = buildDraft(
    t('mobilite.candidature.message.objet', { name: fullName.trim() }),
    m('intro'),
    [
      [m('nom'), fullName],
      [m('email'), email],
      [m('telephone'), phone],
      [m('pays'), residenceCountry],
      [m('ville'), city],
      [m('souhait'), t(`mobilite.candidature.souhaits.${wishType}`)],
      [m('session'), session ? `${localizedSession(session, lang).title} (${session.id})` : undefined],
      [m('paysInteret'), wishType === 'cours_allemand' ? undefined : targetCountryName],
      [m('niveau'), currentGermanLevel],
      [m('format'), t(`mobilite.formats.${formatKey(preferredFormat)}`)],
      [m('message'), message],
    ],
    m('accord')
  );

  return (
    <>
      <SEO
        title={t('mobilite.candidature.seoTitle')}
        description={t('mobilite.candidature.seoDescription')}
        canonical="/candidater"
      />

      {/* En-tête : titre, avertissement complet juste dessous (T-14), vraie photo d'accompagnement de l'Open Day */}
      <PageHeader reveal photoId="open-day-accompagnement" notice={<DisclaimerBanner />}>
        <PageTitle>{t('mobilite.candidature.title')}</PageTitle>
        <PageIntro>{t('mobilite.candidature.intro')}</PageIntro>
      </PageHeader>

      {/* Avant le formulaire : qui peut candidater, et ce qui se passe ensuite (ACAD-06) */}
      <section className="container-page section-space pt-0! space-y-8">
        <SectionHeader title={t('mobilite.candidature.avant')} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          <WhoCanApply />
          <AfterApplicationSteps />
        </div>
      </section>

      <section ref={formSectionRef} className="container-page *:max-w-4xl pb-(--section-space)">
        {/* Annonce des changements d'étape et de l'envoi (toujours présente, lue poliment) */}
        <p role="status" className="sr-only">
          {statusMessage}
        </p>
        {prepared ? (
          <ContactHandoff
            title={t('mobilite.candidature.envoiTitle')}
            editLabel={t('mobilite.candidature.modifier')}
            draft={draft}
            titleRef={stepTitleRef}
            onEdit={() => goBack('3')}
          >
            <p className="text-body text-text max-w-[65ch]">{t('mobilite.candidature.rappel')}</p>
            <p className="text-meta text-text-secondary max-w-[65ch]">
              {t('mobilite.candidature.conservees')}{' '}
              <button type="button" onClick={clearDraft} className="text-link underline underline-offset-4 decoration-1 hover:decoration-2 cursor-pointer">
                {t('mobilite.candidature.effacer')}
              </button>{' '}
              {t('mobilite.candidature.effacerConseil')}
            </p>
          </ContactHandoff>
        ) : (
          // data-no-reveal : rien n'apparaît au défilement dans le formulaire (seulement ses changements d'étape)
          <div data-no-reveal="" className="rounded-card bg-surface-section p-6 sm:p-10 space-y-8">
            <SectionHeader title={t('mobilite.candidature.formTitle')} />

            {/* Réponses gardées dans l'onglet (CAND-02) */}
            {restored && (
              <InfoBox title={t('mobilite.candidature.garderTitle')}>
                <p>{t('mobilite.candidature.garderText')}</p>
                <p>
                  <button type="button" onClick={clearDraft} className="text-link underline underline-offset-4 decoration-1 hover:decoration-2 cursor-pointer">
                    {t('mobilite.candidature.garderEffacer')}
                  </button>
                </p>
              </InfoBox>
            )}

            {/* Session choisie sur l'Académie (ACAD-01) */}
            {session && (
              <InfoBox title={t('mobilite.candidature.sessionTitle')}>
                <p>
                  {t('mobilite.candidature.sessionText', {
                    level: session.level,
                    format: t(`mobilite.formatsPhrase.${formatKey(session.format)}`),
                    title: localizedSession(session, lang).title,
                  })}
                </p>
                <p>
                  <button
                    type="button"
                    onClick={() =>
                      setSearchParams((prev) => {
                        const params = new URLSearchParams(prev);
                        params.delete('session');
                        return params;
                      })
                    }
                    className="text-link underline underline-offset-4 decoration-1 hover:decoration-2 cursor-pointer"
                  >
                    {t('mobilite.candidature.sessionChanger')}
                  </button>
                  <span className="text-text-secondary"> {t('mobilite.candidature.sessionNote')}</span>
                </p>
              </InfoBox>
            )}

            {/* Un seul indicateur d'étape : la position en texte et la barre de progression */}
            <div className="space-y-3">
              <p className="text-meta font-bold text-text">{t('mobilite.candidature.position', { step })}</p>
              <ProgressBar value={step} max={3} />
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Nouvelle étape : fondu et glissement de 16 px en 0,3 s (.step-enter), rien en mouvement réduit */}
              <div key={step} className="step-enter">
                {step === 1 && (
                  <div className="space-y-5">
                    <StepTitle titleRef={stepTitleRef} title={stepLabel(t, 1)} text={t('mobilite.candidature.etape1Text')} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormField id={fieldId('fullName')} label={t('mobilite.candidature.nomLabel')} error={errors.fullName}>
                        {(a11y) => (
                          <input
                            {...a11y}
                            type="text"
                            required
                            autoComplete="name"
                            autoCapitalize="words"
                            maxLength={100}
                            placeholder={t('mobilite.candidature.nomExemple')}
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

                      <FormField id={fieldId('email')} label={t('mobilite.candidature.emailLabel')} error={errors.email}>
                        {(a11y) => (
                          <input
                            {...a11y}
                            type="email"
                            required
                            autoComplete="email"
                            autoCapitalize="none"
                            spellCheck={false}
                            maxLength={254}
                            placeholder={t('mobilite.candidature.emailExemple')}
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

                      <FormField id={fieldId('phone')} label={t('mobilite.candidature.telephoneLabel')} error={errors.phone}>
                        {(a11y) => (
                          <input
                            {...a11y}
                            type="tel"
                            required
                            autoComplete="tel"
                            inputMode="tel"
                            maxLength={30}
                            placeholder={t('mobilite.candidature.telephoneExemple')}
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

                      <FormField id={fieldId('residenceCountry')} label={t('mobilite.candidature.paysLabel')} error={errors.residenceCountry}>
                        {(a11y) => (
                          <input
                            {...a11y}
                            type="text"
                            required
                            autoComplete="country-name"
                            maxLength={100}
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

                      <FormField id={fieldId('city')} label={t('mobilite.candidature.villeLabel')} error={errors.city} className="sm:col-span-2">
                        {(a11y) => (
                          <input
                            {...a11y}
                            type="text"
                            required
                            autoComplete="address-level2"
                            maxLength={100}
                            placeholder={t('mobilite.candidature.villeExemple')}
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

                    <div className="pt-4 flex">
                      <PrimaryButton type="submit">{t('mobilite.candidature.versEtape2')}</PrimaryButton>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <StepTitle
                      titleRef={stepTitleRef}
                      title={stepLabel(t, 2)}
                      text={t('mobilite.candidature.etape2Text')}
                    />

                    <fieldset>
                      <legend className={LABEL_CLASS}>{t('mobilite.candidature.souhaitLegend')}</legend>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {WISHES.map((id) => (
                          <ChoiceTile
                            key={id}
                            name="apply-wish"
                            value={id}
                            checked={wishType === id}
                            onChange={() => setWishType(id)}
                            showCheck
                            className="p-4 text-left"
                          >
                            {t(`mobilite.candidature.souhaits.${id}`)}
                          </ChoiceTile>
                        ))}
                      </div>
                    </fieldset>

                    {(wishType === 'accompagnement_europe' || wishType === 'les_deux') && (
                      <div>
                        <label htmlFor="apply-target-country" className={LABEL_CLASS}>
                          {t('mobilite.candidature.paysInteretLabel')}
                        </label>
                        <select
                          id="apply-target-country"
                          value={targetCountry}
                          onChange={(e) => setTargetCountry(e.target.value)}
                          className={FIELD_CLASS}
                        >
                          {COUNTRIES_DATA.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {localized(c, `contenu.pays.${c.slug}`).name}
                              {!c.isEU ? ` ${t('mobilite.candidature.horsUE')}` : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="apply-german-level" className={LABEL_CLASS}>
                          {t('mobilite.candidature.niveauLabel')}
                        </label>
                        <select
                          id="apply-german-level"
                          value={currentGermanLevel}
                          onChange={(e) => setCurrentGermanLevel(e.target.value)}
                          className={FIELD_CLASS}
                        >
                          {LEVELS.map((l) => (
                            <option key={l} value={l}>
                              {t(`mobilite.candidature.niveaux.${l}`)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label htmlFor="apply-format" className={LABEL_CLASS}>
                          {t('mobilite.candidature.formatLabel')}
                        </label>
                        <select
                          id="apply-format"
                          value={preferredFormat}
                          onChange={(e) => setPreferredFormat(e.target.value)}
                          className={FIELD_CLASS}
                        >
                          {FORMATS.map((f) => (
                            <option key={f} value={f}>
                              {t(`mobilite.formatsChoix.${formatKey(f)}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <SecondaryButton onClick={() => goBack(null)}>{t('mobilite.candidature.precedente')}</SecondaryButton>
                      <PrimaryButton type="submit">{t('mobilite.candidature.versEtape3')}</PrimaryButton>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <StepTitle
                      titleRef={stepTitleRef}
                      title={stepLabel(t, 3)}
                      text={t('mobilite.candidature.etape3Text')}
                    />

                    <div>
                      <label htmlFor="apply-message" className={LABEL_CLASS}>
                        {t('mobilite.candidature.messageLabel')}
                      </label>
                      <textarea
                        id="apply-message"
                        rows={4}
                        maxLength={2000}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('mobilite.candidature.messageExemple')}
                        className={FIELD_CLASS}
                      />
                    </div>

                    {/* Rappel clair obligatoire : aucun document d'identité ni paiement demandé */}
                    <InfoBox>
                      <p>{t('mobilite.candidature.aucunDocument')}</p>
                    </InfoBox>

                    {/* Consentement : la politique s'ouvre dans un nouvel onglet, la saisie n'est jamais perdue (CAND-02) */}
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
                          <Trans
                            i18nKey="mobilite.candidature.accord"
                            components={{
                              lien: <Link to="/confidentialite" target="_blank" rel="noopener" className="text-link underline underline-offset-4" />,
                              nouvel: <span className="sr-only" />,
                            }}
                          />
                        </span>
                      </label>
                      <FieldError id={fieldErrorId(fieldId('gdprConsent'))} message={errors.gdprConsent} />
                    </div>

                    <div className="pt-4 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <SecondaryButton onClick={() => goBack('2')}>{t('mobilite.candidature.precedente')}</SecondaryButton>
                      <PrimaryButton type="submit">{t('mobilite.candidature.preparer')}</PrimaryButton>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
}
