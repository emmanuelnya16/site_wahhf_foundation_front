import { useState, useId, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, MessageCircle, Phone, ShieldCheck } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { PrimaryButton } from '../components/wahhf/Buttons';
import ChoiceTile from '../components/wahhf/ChoiceTile';
import FormField, { FieldError, fieldErrorId } from '../components/wahhf/FormField';
import ContactHandoff from '../components/wahhf/ContactHandoff';
import { CONTACT } from '../config/contact';
import { buildDraft } from '../lib/contactDraft';
import { emailError, phoneError, requiredError, focusFirstError } from '../lib/formValidation';
import { useFocusOnChange } from '../lib/useFocusOnChange';

/** Motifs du message : ils donnent l'objet du message préparé. */
const MOTIFS = [
  { id: 'candidat', label: 'Je suis candidat (cours d’allemand, accompagnement)' },
  { id: 'benevole', label: 'Je souhaite devenir bénévole' },
  { id: 'partenaire', label: 'Partenaire ou institution' },
  { id: 'presse', label: 'Presse et médias' },
  { id: 'autre', label: 'Autre demande' },
] as const;
type Motif = (typeof MOTIFS)[number]['id'];

type ContactField = 'motif' | 'name' | 'email' | 'whatsapp' | 'message' | 'consent';
const CONTACT_FIELDS = ['motif', 'name', 'email', 'whatsapp', 'message', 'consent'] as const;
const INPUT_CLASS =
  'w-full px-4 py-3 rounded-inner bg-surface-inset border border-border-input aria-invalid:border-danger text-sm';

function checkContactField(key: ContactField, value: string | boolean): string | undefined {
  switch (key) {
    case 'motif':
      return value ? undefined : 'Choisissez le motif de votre message.';
    case 'name':
      return requiredError(String(value), 'Saisissez votre nom complet ou celui de votre structure.');
    case 'email':
      return emailError(String(value));
    case 'whatsapp':
      // Facultatif : vérifié seulement s'il est rempli
      return String(value).trim() ? phoneError(String(value)) : undefined;
    case 'message':
      return requiredError(String(value), 'Écrivez votre message en quelques lignes.');
    case 'consent':
      return value ? undefined : 'Cochez cette case pour que nous puissions lire votre message et vous répondre.';
  }
}

/**
 * Page /contact de WAHHF Foundation. Tant que l'API Symfony n'est pas branchée, le formulaire prépare
 * un message (WhatsApp ou e-mail) que la personne envoie elle-même : aucun faux envoi, rien de stocké.
 */
export default function ContactPage() {
  const [motif, setMotif] = useState<Motif | ''>('');
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
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: checkContactField(key, value) }));
  };
  const checkOnBlur = (key: ContactField, value: string) => {
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: checkContactField(key, value) }));
  };

  // Message prêt ou retour au formulaire : défilement jusqu'au bloc, focus sur son titre, annonce polie
  const formBlockRef = useRef<HTMLDivElement>(null);
  const titleRef = useFocusOnChange<HTMLHeadingElement>(prepared, { scrollRef: formBlockRef });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found: Partial<Record<ContactField, string>> = {};
    for (const key of CONTACT_FIELDS) found[key] = checkContactField(key, values[key]);
    setErrors(found);
    if (focusFirstError(CONTACT_FIELDS, found, fieldId)) return;
    setPrepared(true);
  };

  const motifLabel = MOTIFS.find((m) => m.id === motif)?.label;
  const draft = buildDraft(
    `Contact WAHHF — ${motifLabel ?? 'Message'} — ${name.trim()}`,
    'Je vous écris depuis le formulaire de contact du site :',
    [
      ['Motif', motifLabel],
      ['Nom', name],
      ['E-mail', email],
      ['WhatsApp', whatsapp],
      ['Message', message],
    ],
    'J’accepte que mes coordonnées soient traitées par WAHHF Foundation pour répondre à mon message (RGPD).'
  );

  return (
    <>
      <SEO
        title="Contact — Écrire à WAHHF Foundation"
        description="Contacter WAHHF Foundation par WhatsApp ou par e-mail : candidature, bénévolat, partenariat, presse ou toute autre demande."
      />

      <section className="surface-green pt-32 pb-16 bg-nuit text-creme">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-kicker text-or">Contact</span>
          <h1 className="font-serif font-normal text-[clamp(2.1rem,4.5vw,3.8rem)] leading-tight">
            Écrire à WAHHF Foundation
          </h1>
          <p className="text-base sm:text-lg text-creme/85 max-w-3xl leading-relaxed">
            Choisissez le motif de votre message et écrivez-nous. Vous pouvez aussi nous joindre directement par
            WhatsApp ou par e-mail.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div ref={formBlockRef} className="lg:col-span-7">
            <p role="status" className="sr-only">
              {prepared ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.' : ''}
            </p>
            {prepared ? (
              <ContactHandoff
                title="Dernière étape : envoyez votre message"
                draft={draft}
                titleRef={titleRef}
                onEdit={() => setPrepared(false)}
              />
            ) : (
              <div className="rounded-card bg-surface-raised border border-border p-7 sm:p-10 shadow-sm space-y-8">
                <SectionHeader
                  titleRef={titleRef}
                  reveal={false}
                  kicker="Formulaire de contact"
                  title="Votre message"
                />

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <fieldset>
                    <legend className="text-xs font-semibold uppercase tracking-wider mb-3">
                      Motif de votre message *
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {MOTIFS.map((m, i) => (
                        <ChoiceTile
                          key={m.id}
                          id={i === 0 ? fieldId('motif') : undefined}
                          name="contact-motif"
                          value={m.id}
                          checked={motif === m.id}
                          onChange={() => {
                            setMotif(m.id);
                            recheck('motif', m.id);
                          }}
                          invalid={!!errors.motif}
                          describedBy={errors.motif ? fieldErrorId(fieldId('motif')) : undefined}
                          showCheck
                          className={`p-4 rounded-2xl border text-left text-sm font-medium transition ${
                            motif === m.id
                              ? 'bg-nuit text-or border-or'
                              : 'bg-creme dark:bg-nuit/50 border-nuit/15'
                          }`}
                        >
                          {m.label}
                        </ChoiceTile>
                      ))}
                    </div>
                    <FieldError id={fieldErrorId(fieldId('motif'))} message={errors.motif} />
                  </fieldset>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField id={fieldId('name')} label="Nom complet / Structure *" error={errors.name}>
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
                      label="Numéro WhatsApp (facultatif)"
                      error={errors.whatsapp}
                      className="sm:col-span-2"
                    >
                      {(a11y) => (
                        <input
                          {...a11y}
                          type="tel"
                          autoComplete="tel"
                          inputMode="tel"
                          placeholder="Ex. +237 6..."
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

                  <FormField id={fieldId('message')} label="Votre message *" error={errors.message}>
                    {(a11y) => (
                      <textarea
                        {...a11y}
                        rows={5}
                        required
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

                  <div>
                    <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-v1-encre/85 dark:text-creme/85">
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
                        className="mt-1 w-4 h-4 accent-nuit"
                      />
                      <span>
                        J’accepte que mes coordonnées soient traitées par WAHHF Foundation pour répondre à mon
                        message, conformément à la{' '}
                        <Link to="/confidentialite" className="underline text-accent">
                          politique de confidentialité (RGPD)
                        </Link>
                        . *
                      </span>
                    </label>
                    <FieldError id={fieldErrorId(fieldId('consent'))} message={errors.consent} />
                  </div>

                  <PrimaryButton type="submit">Préparer l’envoi de mon message</PrimaryButton>
                </form>
              </div>
            )}
          </div>

          {/* Coordonnées directes */}
          <div className="lg:col-span-5 space-y-6">
            <div className="surface-green rounded-card bg-nuit text-creme p-7 sm:p-8 border border-or/35 space-y-5">
              <h2 className="font-serif font-normal text-2xl text-creme">Nous joindre directement</h2>
              {/* Lien externe : PrimaryButton ajoute ↗ et « (nouvel onglet) » pour les lecteurs d'écran */}
              <PrimaryButton
                href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent('Bonjour WAHHF Foundation, ')}`}
                onInverse
              >
                <span className="inline-flex items-center gap-2">
                  <MessageCircle aria-hidden="true" className="w-4 h-4 shrink-0" />
                  Écrire sur WhatsApp
                </span>
              </PrimaryButton>
              <ul className="space-y-3 text-sm text-creme/85">
                <li className="flex items-center gap-2.5">
                  <Phone aria-hidden="true" className="w-4 h-4 text-or shrink-0" />
                  <a href={`tel:+${CONTACT.whatsappNumber}`} className="hover:text-or transition-colors">
                    {CONTACT.whatsappDisplay}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail aria-hidden="true" className="w-4 h-4 text-or shrink-0" />
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-or transition-colors break-all">
                    {CONTACT.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin aria-hidden="true" className="w-4 h-4 text-or shrink-0 mt-1" />
                  <span>
                    Cameroun (Douala / Yaoundé) & Coordination Allemagne{' '}
                    <span className="text-xs text-or">(TODO : adresse exacte)</span>
                  </span>
                </li>
              </ul>
            </div>

            <div className="rounded-card bg-surface-raised border border-border p-7 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <ShieldCheck aria-hidden="true" className="w-4 h-4" />
                <span>Vigilance</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">
                Aucun collaborateur de WAHHF ne vous demandera d’argent par téléphone, e-mail ou WhatsApp pour traiter
                votre dossier.
              </p>
              <Link
                to="/accompagnement/eviter-les-arnaques"
                className="inline-block text-sm font-semibold text-accent underline underline-offset-4"
              >
                Reconnaître une fausse offre
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
