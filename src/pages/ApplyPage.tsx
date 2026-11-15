import { useState, FormEvent } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import DisclaimerBanner from '../components/wahhf/DisclaimerBanner';
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!gdprConsent) return;
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

      <section className="pt-32 pb-14 bg-[#0F3D2E] text-[#F5F1E8]">
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

      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {confirmation ? (
          <div className="rounded-[24px] bg-white dark:bg-[#132A21] border-2 border-[#E8A317] p-8 sm:p-12 text-center space-y-6 shadow-md">
            <div className="w-16 h-16 rounded-full bg-[#0F3D2E] text-[#E8A317] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="inline-block px-4 py-1 rounded-full bg-[#0F3D2E]/10 dark:bg-[#E8A317]/20 text-xs font-semibold text-[#0F3D2E] dark:text-[#E8A317]">
              Référence : {confirmation.reference}
            </span>

            <h2 className="font-serif font-normal text-3xl sm:text-4xl text-[#1B1B18] dark:text-[#F5F1E8]">
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
              <div className="w-full h-2 rounded-full bg-[#F5F1E8] dark:bg-[#0F3D2E] overflow-hidden">
                <div
                  className="h-full w-full origin-left bg-gradient-to-r from-[#0F3D2E] to-[#E8A317] transition-transform duration-300"
                  style={{ transform: `scaleX(${step / 3})` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-5">
                  <SectionHeader
                    kicker="Étape 01 / 03"
                    title="Vos coordonnées de contact"
                    subtitle="Ces informations servent uniquement à vous recontacter gratuitement."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="apply-fullname"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      >
                        Nom complet (Prénom & Nom) *
                      </label>
                      <input
                        id="apply-fullname"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex. Marie Nguenang"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="apply-email"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      >
                        Adresse e-mail *
                      </label>
                      <input
                        id="apply-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="exemple@domaine.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="apply-phone"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      >
                        Téléphone / WhatsApp *
                      </label>
                      <input
                        id="apply-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ex. +237 6..."
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="apply-country"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      >
                        Pays de résidence actuel *
                      </label>
                      <input
                        id="apply-country"
                        type="text"
                        required
                        value={residenceCountry}
                        onChange={(e) => setResidenceCountry(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="apply-city"
                        className="block text-xs font-semibold uppercase tracking-wider mb-2"
                      >
                        Ville de résidence *
                      </label>
                      <input
                        id="apply-city"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ex. Douala, Yaoundé, Bafoussam, Garoua..."
                        className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (fullName && email && phone && city) setStep(2);
                      }}
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
                    kicker="Étape 02 / 03"
                    title="Votre souhait d’accompagnement"
                    subtitle="Précisez le volet qui vous intéresse ainsi que votre niveau linguistique actuel."
                  />

                  <div className="space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wider">
                      Que souhaitez-vous ? *
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'cours_allemand', label: 'Cours d’allemand (A1 à C1)' },
                        { id: 'accompagnement_europe', label: 'Accompagnement vers l’Europe' },
                        { id: 'les_deux', label: 'Les deux (Cours + Orientation)' },
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            setWishType(
                              opt.id as
                                | 'cours_allemand'
                                | 'accompagnement_europe'
                                | 'les_deux'
                            )
                          }
                          className={`p-4 rounded-2xl border text-left text-sm font-medium transition cursor-pointer ${
                            wishType === opt.id
                              ? 'bg-[#0F3D2E] text-[#E8A317] border-[#E8A317]'
                              : 'bg-[#F5F1E8] dark:bg-[#0F3D2E]/50 border-[#0F3D2E]/15'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

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
                      type="button"
                      onClick={() => setStep(3)}
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
                  <label className="flex items-start gap-3 cursor-pointer text-xs sm:text-sm text-[#1B1B18]/85 dark:text-[#F5F1E8]/85">
                    <input
                      type="checkbox"
                      required
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
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
                      disabled={submitting || !gdprConsent}
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
