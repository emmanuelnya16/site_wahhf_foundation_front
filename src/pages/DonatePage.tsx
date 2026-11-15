import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShieldCheck, CheckCircle2, Sparkles, Lock } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { submitDonation } from '../services/api';

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
  const [receiptRef, setReceiptRef] = useState<string | null>(null);

  const effectiveAmount = customAmount ? Number(customAmount) || selectedAmount : selectedAmount;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!gdprConsent || effectiveAmount <= 0) return;
    const res = await submitDonation({
      amount: effectiveAmount,
      frequency,
      allocation,
      donorName,
      donorEmail,
      paymentMethod,
      anonymous,
      gdprConsent,
    });
    setReceiptRef(res.receiptRef);
  };

  return (
    <>
      <SEO
        title="Faire un don — Financer un parcours gratuit"
        description="Soutenez WAHHF Foundation : vos dons financent la gratuité des cours d'allemand (A1 à C1), l'accompagnement vers l'Europe et nos actions sociales au Cameroun."
      />

      <section className="pt-32 pb-16 bg-[#0F3D2E] text-[#F5F1E8]">
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

      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {receiptRef ? (
          <div className="rounded-[24px] bg-white dark:bg-[#132A21] border-2 border-[#E8A317] p-8 sm:p-12 text-center space-y-6 max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#C8102E] text-white flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <span className="inline-block px-4 py-1 rounded-full bg-[#0F3D2E]/10 dark:bg-[#E8A317]/20 text-xs font-semibold">
              Intention de don simulée · Référence : {receiptRef}
            </span>
            <h2 className="font-serif font-normal text-3xl sm:text-4xl">
              Merci infiniment pour votre générosité ({effectiveAmount} €)
            </h2>
            <p className="text-base text-[#1B1B18]/80 dark:text-[#F5F1E8]/80 max-w-xl mx-auto">
              Votre intention de don ({frequency === 'mensuel' ? 'mensuel' : 'ponctuel'}) a bien été enregistrée en mode démonstration sécurisée (aucune donnée bancaire collectée). Dès le raccordement du prestataire de paiement officiel Symfony, vous recevrez votre reçu par e-mail.
            </p>
            <div className="pt-4">
              <Link
                to="/"
                className="px-7 py-3 rounded-full bg-[#0F3D2E] text-[#F5F1E8] text-sm font-semibold"
              >
                Retour à l’accueil
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Formulaire de don */}
            <div className="lg:col-span-7 rounded-[24px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/15 dark:border-[#F5F1E8]/15 p-7 sm:p-10 shadow-sm space-y-8">
              <SectionHeader
                kicker="Financer un parcours"
                title="Choisissez votre contribution solidaire"
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fréquence : Ponctuel / Mensuel */}
                <div className="grid grid-cols-2 gap-3 p-1.5 rounded-full bg-[#F5F1E8] dark:bg-[#0F3D2E]">
                  <button
                    type="button"
                    onClick={() => setFrequency('unique')}
                    className={`py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                      frequency === 'unique'
                        ? 'bg-[#0F3D2E] text-[#F5F1E8] dark:bg-[#E8A317] dark:text-[#1B1B18]'
                        : 'text-[#1B1B18]/70 dark:text-[#F5F1E8]/70'
                    }`}
                  >
                    Don ponctuel
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('mensuel')}
                    className={`py-2.5 rounded-full text-sm font-semibold transition cursor-pointer ${
                      frequency === 'mensuel'
                        ? 'bg-[#0F3D2E] text-[#F5F1E8] dark:bg-[#E8A317] dark:text-[#1B1B18]'
                        : 'text-[#1B1B18]/70 dark:text-[#F5F1E8]/70'
                    }`}
                  >
                    Don mensuel régulier
                  </button>
                </div>

                {/* Montants suggérés */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {SUGGESTED_AMOUNTS.map((item) => (
                    <button
                      key={item.amount}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(item.amount);
                        setCustomAmount('');
                      }}
                      className={`py-4 px-3 rounded-2xl border font-serif text-2xl transition cursor-pointer ${
                        !customAmount && selectedAmount === item.amount
                          ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-sm'
                          : 'bg-[#F5F1E8] dark:bg-[#0F3D2E]/50 border-[#0F3D2E]/15 text-[#1B1B18] dark:text-[#F5F1E8]'
                      }`}
                    >
                      {item.amount} €
                    </button>
                  ))}
                </div>

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
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider">
                    Moyen de règlement souhaité (Simulation sécurisée — aucune donnée bancaire collectée)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    {[
                      { id: 'card_sim', label: 'Carte / Virement SEPA (Simulé)' },
                      { id: 'mobile_money_sim', label: 'Mobile Money Cameroun (Simulé)' },
                      { id: 'bank_transfer_sim', label: 'RIB / Virement Fondation (Simulé)' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          setPaymentMethod(
                            m.id as 'mobile_money_sim' | 'card_sim' | 'bank_transfer_sim'
                          )
                        }
                        className={`p-3 rounded-xl border text-left font-medium cursor-pointer ${
                          paymentMethod === m.id
                            ? 'bg-[#0F3D2E] text-[#E8A317] border-[#E8A317]'
                            : 'bg-[#F5F1E8] dark:bg-[#0F3D2E]/40 border-[#0F3D2E]/15'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

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
                    Faire un don {frequency === 'mensuel' ? 'mensuel' : ''} de {effectiveAmount} €
                  </span>
                </button>
              </form>
            </div>

            {/* Colonne d'impact & transparence */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-[24px] bg-[#0F3D2E] text-[#F5F1E8] p-7 sm:p-8 border border-[#E8A317]/35 space-y-5">
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
