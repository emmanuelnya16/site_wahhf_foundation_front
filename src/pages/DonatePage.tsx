import { useState, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, CheckCircle2, Sparkles, Lock } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import ChoiceTile from '../components/wahhf/ChoiceTile';
import ContactHandoff from '../components/wahhf/ContactHandoff';
import { buildDraft } from '../lib/contactDraft';
import { useFocusOnChange } from '../lib/useFocusOnChange';

const SUGGESTED_AMOUNTS = [
  {
    amount: 25,
    impact: 'Finance les manuels et supports d’exercices d’allemand A1 pour un jeune apprenant (exemple — TODO)',
  },
  {
    amount: 50,
    impact: 'Soutient un mois d’accompagnement linguistique et d’accès numérique pour un étudiant (exemple — TODO)',
  },
  {
    amount: 100,
    impact: 'Contribue à une journée de prévention sanitaire maternelle et infantile en zone rurale (exemple — TODO)',
  },
  {
    amount: 250,
    impact: 'Finance un parcours complet d’accompagnement linguistique et documentaire pour une cohorte (exemple — TODO)',
  },
];

const ALLOCATION_LABELS = {
  academie_langues: 'Académie d’allemand A1–C1 & Orientation gratuite',
  materiel_pedagogique: 'Manuels scolaires, livres d’allemand & bibliothèques',
  sante_education: 'Actions de terrain : Éducation, Santé & Environnement au Cameroun',
  general: 'Fonds général WAHHF Foundation',
} as const;

const PAYMENT_LABELS = {
  card_sim: 'Carte / Virement SEPA',
  mobile_money_sim: 'Mobile Money Cameroun',
  bank_transfer_sim: 'RIB / Virement Fondation',
} as const;

export default function DonatePage() {
  const [frequency, setFrequency] = useState<'unique' | 'mensuel'>('unique');
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [allocation, setAllocation] = useState<
    'general' | 'academie_langues' | 'sante_education' | 'materiel_pedagogique'
  >('academie_langues');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<
    'mobile_money_sim' | 'card_sim' | 'bank_transfer_sim'
  >('card_sim');
  const [anonymous, setAnonymous] = useState(false);
  const [gdprConsent, setGdprConsent] = useState(false);
  // Intention de don prête à envoyer (WhatsApp ou e-mail) : aucun paiement ni enregistrement sur le site
  const [prepared, setPrepared] = useState(false);

  const effectiveAmount = customAmount ? Number(customAmount) || selectedAmount : selectedAmount;

  // Message prêt ou retour au formulaire : défilement en haut du bloc, focus sur le titre, annonce polie
  const formSectionRef = useRef<HTMLElement>(null);
  const resultTitleRef = useFocusOnChange<HTMLHeadingElement>(prepared, { scrollRef: formSectionRef });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!gdprConsent || effectiveAmount <= 0) return;
    setPrepared(true);
  };

  const draft = buildDraft(
    `Intention de don — ${donorName.trim()}`,
    'Je souhaite faire un don à WAHHF Foundation. Voici mon intention, saisie sur le site (aucun paiement n’a été effectué) :',
    [
      ['Montant', `${effectiveAmount} €`],
      ['Fréquence', frequency === 'mensuel' ? 'Don mensuel régulier' : 'Don ponctuel'],
      ['Affectation souhaitée', ALLOCATION_LABELS[allocation]],
      ['Moyen de règlement souhaité', PAYMENT_LABELS[paymentMethod]],
      ['Nom ou organisation', donorName],
      ['E-mail', donorEmail],
      ['Don anonyme publiquement', anonymous ? 'oui' : 'non'],
    ],
    'J’accepte le traitement confidentiel de mes informations pour la gestion de mon don (RGPD).'
  );

  return (
    <>
      <SEO
        title="Faire un don — Financer un parcours gratuit"
        description="Soutenez WAHHF Foundation : vos dons financent la gratuité des cours d'allemand (A1 à C1), l'accompagnement vers l'Europe et nos actions sociales au Cameroun."
      />

      <section className="surface-green pt-32 pb-16 bg-[#0F3D2E] text-[#F5F1E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8102E] text-white text-xs font-semibold uppercase tracking-widest">
            <Heart className="w-3.5 h-3.5 fill-current" />
            Soutenir WAHHF Foundation · Financer un parcours
          </span>
          <h1 className="font-serif font-normal text-[clamp(2.1rem,4.6vw,3.8rem)] leading-tight">
            Grâce à vos dons, chaque jeune est accompagné gratuitement
          </h1>
          <p className="text-base sm:text-xl text-[#F5F1E8]/85 max-w-3xl leading-relaxed">
            Le groupe IROKO soutient notre structure afin que vos dons aillent directement aux actions de terrain : cours d’allemand A1–C1, matériel pédagogique, santé communautaire et éducation.
          </p>
        </div>
      </section>

      <section ref={formSectionRef} className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <p role="status" className="sr-only">
          {prepared ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.' : ''}
        </p>
        {prepared ? (
          <div className="max-w-3xl mx-auto">
            <ContactHandoff
              title={`Dernière étape : envoyez votre intention de don (${effectiveAmount} €)`}
              draft={draft}
              titleRef={resultTitleRef}
              onEdit={() => setPrepared(false)}
              editLabel="Modifier mon don"
            >
              <p className="text-xs sm:text-sm text-[#1B1B18]/70 dark:text-[#F5F1E8]/70">
                Aucun paiement n’est effectué sur ce site et aucune donnée bancaire n’y est demandée.
              </p>
            </ContactHandoff>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Formulaire de don */}
            <div className="lg:col-span-7 rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/15 dark:border-[#F5F1E8]/15 p-7 sm:p-10 shadow-sm space-y-8">
              <SectionHeader
                titleRef={resultTitleRef}
                kicker="Financer un parcours"
                title="Choisissez votre contribution solidaire"
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fréquence : Ponctuel / Mensuel (boutons radio natifs) */}
                <fieldset>
                  <legend className="sr-only">Fréquence du don</legend>
                  <div className="grid grid-cols-2 gap-3 p-1.5 rounded-full bg-[#F5F1E8] dark:bg-[#0F3D2E]">
                    {[
                      { id: 'unique' as const, label: 'Don ponctuel' },
                      { id: 'mensuel' as const, label: 'Don mensuel régulier' },
                    ].map((f) => (
                      <ChoiceTile
                        key={f.id}
                        name="donate-frequency"
                        value={f.id}
                        checked={frequency === f.id}
                        onChange={() => setFrequency(f.id)}
                        className={`py-2.5 rounded-full text-sm font-semibold text-center transition ${
                          frequency === f.id
                            ? 'bg-[#0F3D2E] text-[#F5F1E8] dark:bg-[#E8A317] dark:text-[#1B1B18]'
                            : 'text-[#1B1B18]/70 dark:text-[#F5F1E8]/70'
                        }`}
                      >
                        {f.label}
                      </ChoiceTile>
                    ))}
                  </div>
                </fieldset>

                {/* Montants suggérés (boutons radio natifs) */}
                <fieldset>
                  <legend className="sr-only">Montant du don</legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {SUGGESTED_AMOUNTS.map((item) => {
                      const checked = !customAmount && selectedAmount === item.amount;
                      return (
                        <ChoiceTile
                          key={item.amount}
                          name="donate-amount"
                          value={String(item.amount)}
                          checked={checked}
                          onChange={() => {
                            setSelectedAmount(item.amount);
                            setCustomAmount('');
                          }}
                          className={`py-4 px-3 rounded-2xl border font-serif text-2xl text-center transition ${
                            checked
                              ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-sm'
                              : 'bg-[#F5F1E8] dark:bg-[#0F3D2E]/50 border-[#0F3D2E]/15 text-[#1B1B18] dark:text-[#F5F1E8]'
                          }`}
                        >
                          {item.amount} €
                        </ChoiceTile>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Montant libre */}
                <div>
                  <label
                    htmlFor="donate-custom"
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    Ou saisissez un montant libre (en € ou équivalent FCFA)
                  </label>
                  <input
                    id="donate-custom"
                    type="number"
                    min={5}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Autre montant (ex. 75)"
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 text-sm"
                  />
                </div>

                {/* Affectation du don */}
                <div>
                  <label
                    htmlFor="donate-allocation"
                    className="block text-xs font-semibold uppercase tracking-wider mb-2"
                  >
                    Affecter mon don en priorité à :
                  </label>
                  <select
                    id="donate-allocation"
                    value={allocation}
                    onChange={(e) =>
                      setAllocation(
                        e.target.value as
                          | 'general'
                          | 'academie_langues'
                          | 'sante_education'
                          | 'materiel_pedagogique'
                      )
                    }
                    className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 text-sm"
                  >
                    <option value="academie_langues">
                      Financer un parcours : Académie d’allemand A1–C1 & Orientation gratuite
                    </option>
                    <option value="materiel_pedagogique">
                      Manuels scolaires, livres d’allemand & bibliothèques
                    </option>
                    <option value="sante_education">
                      Actions de terrain : Éducation, Santé & Environnement au Cameroun
                    </option>
                    <option value="general">
                      Fonds général WAHHF Foundation (selon les besoins les plus urgents)
                    </option>
                  </select>
                </div>

                {/* Coordonnées du donateur */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="donor-name"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    >
                      Nom & Prénom (ou Organisation) *
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="donor-email"
                      className="block text-xs font-semibold uppercase tracking-wider mb-2"
                    >
                      E-mail (pour le reçu) *
                    </label>
                    <input
                      id="donor-email"
                      type="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#F5F1E8] dark:bg-[#0F3D2E] border border-[#0F3D2E]/20 text-sm"
                    />
                  </div>
                </div>

                {/* Mode de paiement simulé sans collecte de données bancaires */}
                <fieldset>
                  <legend className="text-xs font-semibold uppercase tracking-wider mb-2">
                    Moyen de règlement souhaité (Simulation sécurisée — aucune donnée bancaire collectée)
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    {[
                      { id: 'card_sim' as const, label: 'Carte / Virement SEPA (Simulé)' },
                      { id: 'mobile_money_sim' as const, label: 'Mobile Money Cameroun (Simulé)' },
                      { id: 'bank_transfer_sim' as const, label: 'RIB / Virement Fondation (Simulé)' },
                    ].map((m) => (
                      <ChoiceTile
                        key={m.id}
                        name="donate-payment"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        showCheck
                        className={`p-3 rounded-xl border text-left font-medium ${
                          paymentMethod === m.id
                            ? 'bg-[#0F3D2E] text-[#E8A317] border-[#E8A317]'
                            : 'bg-[#F5F1E8] dark:bg-[#0F3D2E]/40 border-[#0F3D2E]/15'
                        }`}
                      >
                        {m.label}
                      </ChoiceTile>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-2.5 pt-2">
                  <label className="flex items-center gap-2.5 text-xs sm:text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className="w-4 h-4 accent-[#0F3D2E]"
                    />
                    <span>Je souhaite que mon don reste anonyme publiquement</span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs sm:text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#0F3D2E]"
                    />
                    <span>
                      J’accepte le traitement confidentiel de mes informations pour la gestion de mon don (RGPD). Aucune donnée bancaire n’est enregistrée sur ce formulaire de démonstration. *
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#C8102E] hover:bg-[#a80d26] text-white font-semibold text-base shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  <span>
                    Préparer mon don {frequency === 'mensuel' ? 'mensuel' : ''} de {effectiveAmount} €
                  </span>
                </button>
              </form>
            </div>

            {/* Colonne d'impact & transparence */}
            <div className="lg:col-span-5 space-y-6">
              <div className="surface-green rounded-[24px] bg-[#0F3D2E] text-[#F5F1E8] p-7 sm:p-8 border border-[#E8A317]/35 space-y-5">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#E8A317]">
                  <Sparkles className="w-4 h-4" />
                  <span>Ce que votre don permet (Exemples — TODO)</span>
                </div>
                <h3 className="font-serif text-2xl text-[#F5F1E8]">
                  Financer un parcours d’autonomie
                </h3>
                <ul className="space-y-4 text-sm text-[#F5F1E8]/85">
                  {SUGGESTED_AMOUNTS.map((s) => (
                    <li
                      key={s.amount}
                      className="p-3.5 rounded-2xl bg-white/10 border border-white/10 flex items-start gap-3"
                    >
                      <span className="font-serif text-xl text-[#E8A317] font-semibold shrink-0">
                        {s.amount} €
                      </span>
                      <span className="text-xs sm:text-sm">{s.impact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/15 dark:border-[#F5F1E8]/15 p-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0F3D2E] dark:text-[#E8A317]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garantie de transparence</span>
                </div>
                <p className="text-sm text-[#1B1B18]/80 dark:text-[#F5F1E8]/80 leading-relaxed">
                  En tant que branche sociale du groupe IROKO, WAHHF Foundation publie ses engagements d’allocation des ressources sur sa page dédiée.
                </p>
                <div className="flex items-center gap-2 text-xs text-[#1B1B18]/65 dark:text-[#F5F1E8]/65">
                  <Lock className="w-4 h-4 text-[#E8A317]" />
                  <span>Formulaire prêt pour intégration Stripe / PayPal / Mobile Money via Symfony.</span>
                </div>
                <Link
                  to="/transparence"
                  className="inline-block text-xs font-semibold text-[#0F3D2E] dark:text-[#E8A317] underline underline-offset-4"
                >
                  Consulter notre page Transparence financière →
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
