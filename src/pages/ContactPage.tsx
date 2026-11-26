import { useState, useId, useRef, useEffect, FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Trans } from 'react-i18next';
import type { TFunction } from 'i18next';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { registerBundle } from '../i18n';
import { useLocalize } from '../lib/localize';
import contactFr from '../locales/contact-page/fr.json';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import PageHeader, { PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import { photoCaption, photoOrFallback } from '../lib/photos';

/** En-tête (lot 7.6) : les participants devant l'Albatros Hotel, le 25 avril 2026. */
const HEADER_PHOTO = photoOrFallback('A07');
import { PrimaryButton } from '../components/wahhf/Buttons';
import ChoiceTile from '../components/wahhf/ChoiceTile';
import InfoBox from '../components/wahhf/InfoBox';
import FormField, { FieldError, fieldErrorId, LABEL_CLASS, FIELD_CLASS, CHECK_LABEL_CLASS, CHECKBOX_CLASS } from '../components/wahhf/FormField';
import ContactHandoff from '../components/wahhf/ContactHandoff';
import { CONTACT } from '../config/contact';
import { buildDraft } from '../lib/contactDraft';
import { emailError, phoneError, requiredError, focusFirstError } from '../lib/formValidation';
import { useFocusOnChange } from '../lib/useFocusOnChange';

/** Textes de la page (lot 7.10) : src/locales/contact-page (fr, en, de), espace de noms « contactPage ». */
registerBundle('contactPage', contactFr, {
  en: () => import('../locales/contact-page/en.json'),
  de: () => import('../locales/contact-page/de.json'),
});

/** Motifs du message : ils donnent l'objet du message préparé. Libellés : contactPage.motifs.<id>. */
const MOTIFS = ['candidat', 'benevole', 'partenaire', 'presse', 'parcours', 'autre'] as const;
type Motif = (typeof MOTIFS)[number];
/** Motif choisi d'avance par l'adresse (lot 11.5) : /contact?motif=parcours depuis « Raconter mon parcours » de /accueil */
const isMotif = (value: string | null): value is Motif => !!value && (MOTIFS as readonly string[]).includes(value);

type ContactField = 'motif' | 'name' | 'email' | 'whatsapp' | 'message' | 'consent';
const CONTACT_FIELDS = ['motif', 'name', 'email', 'whatsapp', 'message', 'consent'] as const;
const INPUT_CLASS = FIELD_CLASS;

function checkContactField(key: ContactField, value: string | boolean, t: TFunction): string | undefined {
  switch (key) {
    case 'motif':
      return value ? undefined : t('contactPage.errors.motif');
    case 'name':
      return requiredError(String(value), t('contactPage.errors.name'));
    case 'email':
      return emailError(String(value));
    case 'whatsapp':
      // Facultatif : vérifié seulement s'il est rempli
      return String(value).trim() ? phoneError(String(value)) : undefined;
    case 'message':
      return requiredError(String(value), t('contactPage.errors.message'));
    case 'consent':
      return value ? undefined : t('contactPage.errors.consent');
  }
}

/**
 * Page /contact de WAHHF Foundation (lot 2 ; groupe 7.2 : charte du contrat, audit CTC-01 à CTC-04).
 * - En-tête du lot 5, révélé à l'arrivée ; l'encadré « Vigilance » en alerte ambre juste sous le titre (décision du
 *   16 novembre 2026, §13) ; plus de carte nuit ni de police à empattements.
 * - Coordonnées lues dans src/config/contact.ts, la seule source du site (CTC-03) : celles du footer et de la bulle
 *   WhatsApp. L'adresse postale exacte n'est pas fournie : le lieu seul est affiché, sans « TODO ».
 * - Sur téléphone, les coordonnées directes viennent avant le formulaire : la page se termine par une seule action,
 *   « Préparer l'envoi de mon message ». Sur ordinateur, coordonnées à gauche, formulaire à droite (même ordre).
 * - Revue du groupe 7.2 : liens téléphone, e-mail et « Reconnaître une fausse offre » d'au moins 44 px de haut ; pas de
 *   bulle WhatsApp sur cette page (Layout.tsx), qui a déjà son bouton « Écrire sur WhatsApp ».
 * - Tant que l'API Symfony n'est pas branchée, le formulaire prépare un message (WhatsApp ou e-mail) que la personne
 *   envoie elle-même : aucun faux envoi, rien de stocké.
 * - Mouvement : seulement l'en-tête ; rien sur les champs.
 */
export default function ContactPage() {
  const { t, lang, localized } = useLocalize();
  // Lieu de la fondation dans la langue de la page (surcouche commune contenu.contact)
  const contact = localized(CONTACT, 'contenu.contact');
  const [searchParams] = useSearchParams();
  const [motif, setMotif] = useState<Motif | ''>(() => {
    const asked = searchParams.get('motif');
    return isMotif(asked) ? asked : '';
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [prepared, setPrepared] = useState(false);

  const uid = useId();
  const fieldId = (key: ContactField) => `contact-${key}-${uid}`;
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const values: Record<ContactField, string | boolean> = { motif, name, email, whatsapp, message, consent };
  const recheck = (key: ContactField, value: string | boolean) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: checkContactField(key, value, t) }));
  };
  const checkOnBlur = (key: ContactField, value: string) => {
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: checkContactField(key, value, t) }));
  };
  // Changement de langue : les erreurs déjà affichées passent dans la nouvelle langue
  useEffect(() => {
    setErrors((prev) => {
      const next: Partial<Record<ContactField, string>> = {};
      for (const key of Object.keys(prev) as ContactField[]) next[key] = prev[key] && checkContactField(key, values[key], t);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Message prêt ou retour au formulaire : défilement jusqu'au bloc, focus sur son titre, annonce polie
  const formBlockRef = useRef<HTMLDivElement>(null);
  const titleRef = useFocusOnChange<HTMLHeadingElement>(prepared, { scrollRef: formBlockRef });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found: Partial<Record<ContactField, string>> = {};
    for (const key of CONTACT_FIELDS) found[key] = checkContactField(key, values[key], t);
    setErrors(found);
    if (focusFirstError(CONTACT_FIELDS, found, fieldId)) return;
    setPrepared(true);
  };

  // Message préparé : libellés dans la langue de la page, réponses telles que saisies
  const motifLabel = motif ? t(`contactPage.motifs.${motif}`) : undefined;
  const draft = buildDraft(
    t('contactPage.draft.subject', { motif: motifLabel ?? t('contactPage.draft.noMotif'), name: name.trim() }),
    t('contactPage.draft.intro'),
    [
      [t('contactPage.draft.motif'), motifLabel],
      [t('contactPage.draft.name'), name],
      [t('contactPage.draft.email'), email],
      [t('contactPage.draft.whatsapp'), whatsapp],
      [t('contactPage.draft.message'), message],
    ],
    t('contactPage.draft.consent')
  );

  return (
    <>
      <SEO title={t('contactPage.seo.title')} description={t('contactPage.seo.description')} />

      <PageHeader
        reveal
        catalogPhoto={HEADER_PHOTO}
        photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}
        notice={
          // Alerte ambre (décision des groupes 7.1 et 7.2) : premier élément sous le titre, jamais repliée
          <InfoBox tone="warning" title={t('contactPage.vigilance.title')}>
            <p>{t('contactPage.vigilance.text')}</p>
            <p>
              <Link
                to="/accompagnement/eviter-les-arnaques"
                className="inline-flex min-h-11 items-center text-link underline underline-offset-4"
              >
                {t('contactPage.vigilance.link')}
              </Link>
            </p>
          </InfoBox>
        }
      >
        <PageTitle>{t('contactPage.header.title')}</PageTitle>
        <PageIntro>
          <Trans i18nKey="contactPage.header.intro" components={{ nb: <></> }} />
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-14">
          {/* Coordonnées directes : texte sur le fond de la page, sans carte (contrat §8, §12) */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-section-title text-text">{t('contactPage.direct.title')}</h2>
            {/* Lien externe : PrimaryButton ajoute ↗ et « (nouvel onglet) » pour les lecteurs d'écran */}
            <PrimaryButton href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(t('contactPage.direct.greeting'))}`}>
              <span className="inline-flex items-center gap-2">
                <MessageCircle aria-hidden="true" className="w-4 h-4 shrink-0" />
                {t('contactPage.direct.whatsapp')}
              </span>
            </PrimaryButton>
            {/* Liens d'au moins 44 px de haut (contrat §8, A11Y-07) : ce sont les actions directes sur téléphone */}
            <ul className="space-y-1 text-body text-text">
              <li className="flex items-center gap-3">
                <Phone aria-hidden="true" className="w-5 h-5 shrink-0 text-text-secondary" />
                <a
                  href={`tel:+${CONTACT.whatsappNumber}`}
                  className="inline-flex min-h-11 items-center text-link underline underline-offset-4 decoration-1 hover:decoration-2"
                >
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail aria-hidden="true" className="w-5 h-5 shrink-0 text-text-secondary" />
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex min-h-11 items-center text-link underline underline-offset-4 decoration-1 hover:decoration-2 break-all"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3 pt-2">
                <MapPin aria-hidden="true" className="w-5 h-5 mt-1 shrink-0 text-text-secondary" />
                <span>{contact.place}</span>
              </li>
            </ul>
          </div>

          <div ref={formBlockRef} className="lg:col-span-8">
            <p role="status" className="sr-only">
              {prepared ? t('contactPage.status.ready') : ''}
            </p>
            {prepared ? (
              <ContactHandoff
                title={t('contactPage.handoff.title')}
                draft={draft}
                titleRef={titleRef}
                onEdit={() => setPrepared(false)}
                editLabel={t('contactPage.handoff.edit')}
              />
            ) : (
              <div className="rounded-card bg-surface-section p-6 sm:p-10 space-y-8">
                <SectionHeader titleRef={titleRef} title={t('contactPage.form.title')} />

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <fieldset>
                    <legend className={LABEL_CLASS}>{t('contactPage.form.motifLegend')}</legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {MOTIFS.map((m, i) => (
                        <ChoiceTile
                          key={m}
                          id={i === 0 ? fieldId('motif') : undefined}
                          name="contact-motif"
                          value={m}
                          checked={motif === m}
                          onChange={() => {
                            setMotif(m);
                            recheck('motif', m);
                          }}
                          invalid={!!errors.motif}
                          describedBy={errors.motif ? fieldErrorId(fieldId('motif')) : undefined}
                          showCheck
                          className="p-4 text-left"
                        >
                          {t(`contactPage.motifs.${m}`)}
                        </ChoiceTile>
                      ))}
                    </div>
                    <FieldError id={fieldErrorId(fieldId('motif'))} message={errors.motif} />
                  </fieldset>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField id={fieldId('name')} label={t('contactPage.form.name')} error={errors.name}>
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="text"
                          required
                          autoComplete="name"
                          maxLength={100}
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            recheck('name', e.target.value);
                          }}
                          onBlur={(e) => checkOnBlur('name', e.target.value)}
                          className={INPUT_CLASS}
                        />
                      )}
                    </FormField>
                    <FormField id={fieldId('email')} label={t('contactPage.form.email')} error={errors.email}>
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="email"
                          required
                          autoComplete="email"
                          autoCapitalize="none"
                          spellCheck={false}
                          maxLength={254}
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
                    <FormField
                      id={fieldId('whatsapp')}
                      label={t('contactPage.form.whatsapp')}
                      error={errors.whatsapp}
                      className="sm:col-span-2"
                    >
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          maxLength={30}
                          placeholder={t('contactPage.form.whatsappPlaceholder')}
                          value={whatsapp}
                          onChange={(e) => {
                            setWhatsapp(e.target.value);
                            recheck('whatsapp', e.target.value);
                          }}
                          onBlur={(e) => checkOnBlur('whatsapp', e.target.value)}
                          className={INPUT_CLASS}
                        />
                      )}
                    </FormField>
                  </div>

                  <FormField id={fieldId('message')} label={t('contactPage.form.message')} error={errors.message}>
                    {(a11y) => (
                      <textarea
                        {...a11y}
                        rows={5}
                        required
                        maxLength={2000}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          recheck('message', e.target.value);
                        }}
                        onBlur={(e) => checkOnBlur('message', e.target.value)}
                        className={INPUT_CLASS}
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
                          i18nKey="contactPage.form.consent"
                          components={{
                            lien: <Link to="/confidentialite" target="_blank" rel="noopener" className="text-link underline underline-offset-4" />,
                            sr: <span className="sr-only" />,
                          }}
                        />
                      </span>
                    </label>
                    <FieldError id={fieldErrorId(fieldId('consent'))} message={errors.consent} />
                  </div>

                  <PrimaryButton type="submit">{t('contactPage.form.submit')}</PrimaryButton>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
