import { useState, useId, useRef, useEffect, FormEvent, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trans } from 'react-i18next';
import type { TFunction } from 'i18next';
import { registerBundle } from '../../i18n';
import { useLocalize } from '../../lib/localize';
import agirFr from '../../locales/agir/fr.json';
import SEO from '../../components/wahhf/SEO';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { photoCaption, photoOrFallback } from '../../lib/photos';

/** En-tête (lot 7.6, catalogue : « Rejoindre / bénévolat ») : la photo de groupe de la visite de terrain ; rien tant qu'elle attend l'accord parental. */
const HEADER_PHOTO = photoOrFallback('B26');
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
 * - Textes (lot 7.10) : src/locales/agir (fr, en, de), espace de noms « agir ».
 */
registerBundle('agir', agirFr, {
  en: () => import('../../locales/agir/en.json'),
  de: () => import('../../locales/agir/de.json'),
});

type Role = 'benevole' | 'partenaire';
const ROLE_FROM_HASH: Record<string, Role> = { '#benevole': 'benevole', '#partenaire': 'partenaire' };

/**
 * Types de structure (repris des textes du site : écoles, universités, centres de formation, ONG, entreprises, santé).
 * La valeur est un identifiant ; le libellé est dans agir.orgTypes.<id>.
 */
const ORG_TYPES = ['ecole', 'ong', 'entreprise', 'sante', 'public', 'autre'] as const;
/** Ce qu'un partenaire peut envisager (AGIR-02) : des cases à cocher, sans engagement. Libellés : agir.support.<id>. */
const SUPPORT_KINDS = ['financement', 'stagiaires', 'expertise', 'materiel'] as const;

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

function checkAgirField(key: AgirField, value: string | boolean, role: Role, t: TFunction): string | undefined {
  switch (key) {
    case 'name':
      return requiredError(String(value), t(`agir.errors.name.${role}`));
    case 'org':
      return requiredError(String(value), t('agir.errors.org'));
    case 'orgType':
      return requiredError(String(value), t('agir.errors.orgType'));
    case 'country':
      return requiredError(String(value), t('agir.errors.country'));
    case 'email':
      return emailError(String(value));
    case 'phone':
      // Facultatif : vérifié seulement s'il est rempli
      return String(value).trim() ? phoneError(String(value)) : undefined;
    case 'details':
      return requiredError(String(value), t(`agir.errors.details.${role}`));
    case 'consent':
      return value ? undefined : t('agir.errors.consent');
  }
}

export function AgirPage() {
  const { t, lang } = useLocalize();
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
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: checkAgirField(key, value, roleType, t) }));
  };
  const checkOnBlur = (key: AgirField, value: string) => {
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: checkAgirField(key, value, roleType, t) }));
  };
  // Changement de langue : les erreurs déjà affichées passent dans la nouvelle langue
  useEffect(() => {
    setErrors((prev) => {
      const next: Partial<Record<AgirField, string>> = {};
      for (const key of Object.keys(prev) as AgirField[]) next[key] = prev[key] && checkAgirField(key, values[key], roleType, t);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

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

  const statusMessage = prepared ? t('agir.status.ready') : formRequest > 0 ? t(`agir.status.form.${roleType}`) : '';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const keys = FIELDS[roleType];
    const found: Partial<Record<AgirField, string>> = {};
    for (const key of keys) found[key] = checkAgirField(key, values[key], roleType, t);
    setErrors(found);
    if (focusFirstError(keys, found, fieldId)) return;
    setPrepared(true);
  };

  // Message préparé : libellés dans la langue de la page, réponses telles que saisies
  const draft =
    roleType === 'benevole'
      ? buildDraft(
          t('agir.draft.benevole.subject', { name: name.trim() }),
          t('agir.draft.benevole.intro'),
          [
            [t('agir.draft.benevole.name'), name],
            [t('agir.draft.benevole.email'), email],
            [t('agir.draft.benevole.phone'), phone],
            [t('agir.draft.benevole.details'), details],
          ],
          t('agir.draft.consent')
        )
      : buildDraft(
          t('agir.draft.partenaire.subject', { org: org.trim() }),
          t('agir.draft.partenaire.intro'),
          [
            [t('agir.draft.partenaire.org'), org],
            [t('agir.draft.partenaire.orgType'), orgType ? t(`agir.orgTypes.${orgType}`) : ''],
            [t('agir.draft.partenaire.country'), country],
            [t('agir.draft.partenaire.name'), name],
            [t('agir.draft.partenaire.email'), email],
            [t('agir.draft.partenaire.phone'), phone],
            [t('agir.draft.partenaire.support'), support.map((kind) => t(`agir.support.${kind}`)).join(', ')],
            [t('agir.draft.partenaire.details'), details],
          ],
          t('agir.draft.consent')
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
      <SEO title={t('agir.seo.title')} description={t('agir.seo.description')} />

      <PageHeader reveal catalogPhoto={HEADER_PHOTO} photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}>
        <PageTitle>{t('agir.header.title')}</PageTitle>
        <PageIntro>
          <Trans i18nKey="agir.header.intro" components={{ nb: <></> }} />
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space space-y-16">
        {/* Trois voies en liste typographique (contrat §8, T-15) ; ancres #benevole et #partenaire. Apparition en groupe :
            en CSS juste après l'en-tête quand elles sont déjà à l'écran (.arrive-rise), sinon au défilement (RevealBatch). */}
        <TextList columns={3}>
          <TextListItem title={t('agir.ways.donate.title')} titleAs="h2" actions={<DonateButton />} className="arrive-rise [--arrive-delay:0.6s]">
            <p>{t('agir.ways.donate.text')}</p>
          </TextListItem>
          <TextListItem
            id="benevole"
            title={t('agir.ways.volunteer.title')}
            titleAs="h2"
            className="arrive-rise [--arrive-delay:0.68s]"
            actions={<PrimaryButton onClick={() => goToForm('benevole')}>{t('agir.ways.volunteer.action')}</PrimaryButton>}
          >
            <p>{t('agir.ways.volunteer.text')}</p>
          </TextListItem>
          <TextListItem
            id="partenaire"
            title={t('agir.ways.partner.title')}
            titleAs="h2"
            className="arrive-rise [--arrive-delay:0.76s]"
            actions={<PrimaryButton onClick={() => goToForm('partenaire')}>{t('agir.ways.partner.action')}</PrimaryButton>}
          >
            <p>{t('agir.ways.partner.text')}</p>
          </TextListItem>
        </TextList>

        {/* Formulaire d'engagement : un seul, réglé par le parcours choisi ; rien n'y apparaît au défilement */}
        <div ref={formBlockRef} id="formulaire-engagement" className="max-w-4xl">
          <p role="status" className="sr-only">
            {statusMessage}
          </p>
          {prepared ? (
            <ContactHandoff
              title={t(`agir.handoff.title.${roleType}`)}
              draft={draft}
              titleRef={formTitleRef}
              onEdit={() => setPrepared(false)}
              editLabel={t('agir.handoff.edit')}
            >
              {RESPONSE_DELAY && <p className="text-body text-text max-w-[65ch]">{RESPONSE_DELAY}</p>}
            </ContactHandoff>
          ) : (
            <div className="rounded-card bg-surface-section p-6 sm:p-10 space-y-8">
              <SectionHeader titleRef={formTitleRef} title={t(`agir.form.title.${roleType}`)} />

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <fieldset>
                  <legend className={LABEL_CLASS}>{t('agir.form.role.legend')}</legend>
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
                        {t(`agir.form.role.${role}`)}
                      </ChoiceTile>
                    ))}
                  </div>
                </fieldset>

                {roleType === 'benevole' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {textField('name', t('agir.form.name.benevole'), name, setName, {
                      autoComplete: 'name',
                      placeholder: t('agir.form.namePlaceholder.benevole'),
                    })}
                    {textField('email', t('agir.form.email'), email, setEmail, { type: 'email', autoComplete: 'email', maxLength: 254 })}
                    {textField(
                      'phone',
                      t('agir.form.phone.benevole'),
                      phone,
                      setPhone,
                      { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: t('agir.form.phonePlaceholder.benevole'), maxLength: 30 },
                      'sm:col-span-2'
                    )}
                  </div>
                ) : (
                  <div className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {textField('org', t('agir.form.org'), org, setOrg, { autoComplete: 'organization' })}
                      <FormField id={fieldId('orgType')} label={t('agir.form.orgType')} error={errors.orgType}>
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
                            <option value="">{t('agir.form.orgTypeChoose')}</option>
                            {ORG_TYPES.map((type) => (
                              <option key={type} value={type}>
                                {t(`agir.orgTypes.${type}`)}
                              </option>
                            ))}
                          </select>
                        )}
                      </FormField>
                      {textField('country', t('agir.form.country'), country, setCountry, {
                        autoComplete: 'country-name',
                        placeholder: t('agir.form.countryPlaceholder'),
                      })}
                      {textField('name', t('agir.form.name.partenaire'), name, setName, {
                        autoComplete: 'name',
                        placeholder: t('agir.form.namePlaceholder.partenaire'),
                      })}
                      {textField('email', t('agir.form.email'), email, setEmail, { type: 'email', autoComplete: 'email', maxLength: 254 })}
                      {textField('phone', t('agir.form.phone.partenaire'), phone, setPhone, {
                        type: 'tel',
                        autoComplete: 'tel',
                        inputMode: 'tel',
                        placeholder: t('agir.form.phonePlaceholder.partenaire'),
                        maxLength: 30,
                      })}
                    </div>

                    {/* Nature du soutien : cases à cocher natives, facultatives */}
                    <fieldset>
                      <legend className={LABEL_CLASS}>{t('agir.form.supportLegend')}</legend>
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
                            <span>{t(`agir.support.${kind}`)}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                )}

                <FormField id={fieldId('details')} label={t(`agir.form.details.${roleType}`)} error={errors.details}>
                  {(a11y) => (
                    <textarea
                      {...a11y}
                      rows={4}
                      required
                      maxLength={2000}
                      placeholder={t(`agir.form.detailsPlaceholder.${roleType}`)}
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
                      <Trans
                        i18nKey="agir.form.consent"
                        components={{
                          lien: <Link to="/confidentialite" target="_blank" rel="noopener" className="text-link underline underline-offset-4" />,
                          sr: <span className="sr-only" />,
                        }}
                      />
                    </span>
                  </label>
                  <FieldError id={fieldErrorId(fieldId('consent'))} message={errors.consent} />
                </div>

                <PrimaryButton type="submit">{t('agir.form.submit')}</PrimaryButton>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AgirPage;
