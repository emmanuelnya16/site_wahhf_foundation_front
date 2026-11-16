import { useState, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { LABEL_CLASS, FIELD_CLASS, CHECK_LABEL_CLASS, CHECKBOX_CLASS } from '../components/wahhf/FormField';
import { TextList, TextListItem } from '../components/wahhf/TextList';
import PageHeader, { PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import { DonateButton } from '../components/wahhf/Buttons';
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

      <PageHeader>
        <PageTitle>
          Grâce à vos dons, chaque jeune est accompagné gratuitement
        </PageTitle>
        <PageIntro>
          Le groupe IROKO soutient notre structure afin que vos dons aillent directement aux actions de terrain : cours d’allemand A1–C1, matériel pédagogique, santé communautaire et éducation.
        </PageIntro>
      </PageHeader>

      <section ref={formSectionRef} className="container-page section-space">
        <p role="status" className="sr-only">
          {prepared ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.' : ''}
        </p>
        {prepared ? (
          <div className="max-w-3xl">
            <ContactHandoff
              title={`Dernière étape : envoyez votre intention de don (${effectiveAmount} €)`}
              draft={draft}
              titleRef={resultTitleRef}
              onEdit={() => setPrepared(false)}
              editLabel="Modifier mon don"
            >
              <p className="text-xs sm:text-sm text-v1-encre/70 dark:text-creme/70">
                Aucun paiement n’est effectué sur ce site et aucune donnée bancaire n’y est demandée.
              </p>
            </ContactHandoff>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Formulaire de don */}
            <div className="lg:col-span-7 rounded-card bg-surface-section p-7 sm:p-10 space-y-8">
              <SectionHeader
                titleRef={resultTitleRef}
                title="Choisissez votre contribution solidaire"
              />

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fréquence : Ponctuel / Mensuel (boutons radio natifs) */}
                <fieldset>
                  <legend className="sr-only">Fréquence du don</legend>
                  <div className="grid grid-cols-2 gap-3">
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
                        className="py-2.5 px-3 rounded-pill font-semibold text-center"
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
                          className="py-4 px-3 rounded-2xl font-serif text-2xl text-center"
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
                    className={LABEL_CLASS}
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
                    className={FIELD_CLASS}
                  />
                </div>

                {/* Affectation du don */}
                <div>
                  <label
                    htmlFor="donate-allocation"
                    className={LABEL_CLASS}
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
                    className={FIELD_CLASS}
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
                      className={LABEL_CLASS}
                    >
                      Nom & Prénom (ou Organisation) *
                    </label>
                    <input
                      id="donor-name"
                      type="text"
                      autoComplete="name"
                      required
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className={FIELD_CLASS}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="donor-email"
                      className={LABEL_CLASS}
                    >
                      E-mail (pour le reçu) *
                    </label>
                    <input
                      id="donor-email"
                      type="email"
                      autoComplete="email"
                      required
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                {/* Mode de paiement simulé sans collecte de données bancaires */}
                <fieldset>
                  <legend className={LABEL_CLASS}>
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
                        className="p-3 rounded-inner text-left font-medium"
                      >
                        {m.label}
                      </ChoiceTile>
                    ))}
                  </div>
                </fieldset>

                <div className="space-y-2.5 pt-2">
                  <label className={CHECK_LABEL_CLASS}>
                    <input
                      type="checkbox"
                      checked={anonymous}
                      onChange={(e) => setAnonymous(e.target.checked)}
                      className={CHECKBOX_CLASS}
                    />
                    <span>Je souhaite que mon don reste anonyme publiquement</span>
                  </label>

                  <label className={CHECK_LABEL_CLASS}>
                    <input
                      type="checkbox"
                      required
                      checked={gdprConsent}
                      onChange={(e) => setGdprConsent(e.target.checked)}
                      className={CHECKBOX_CLASS}
                    />
                    <span>
                      J’accepte le traitement confidentiel de mes informations pour la gestion de mon don (RGPD). Aucune donnée bancaire n’est enregistrée sur ce formulaire de démonstration. *
                    </span>
                  </label>
                </div>

                <DonateButton type="submit" size="lg" className="w-full">
                  Préparer mon don {frequency === 'mensuel' ? 'mensuel' : ''} de {effectiveAmount} €
                </DonateButton>
              </form>
            </div>

            {/* Colonne d'impact & transparence */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                {/* Bloc d'impact en liste typographique (ajout du 16/11 au §8) : montant, phrase, filet ; ni nuit ni or */}
                <p className="text-meta text-text-secondary">Ce que votre don permet (exemples — TODO)</p>
                <h3 className="text-body font-semibold text-text">Financer un parcours d’autonomie</h3>
                <TextList columns={1}>
                  {SUGGESTED_AMOUNTS.map((s) => (
                    <TextListItem key={s.amount} title={<span className="tabular-nums">{s.amount} €</span>} titleAs="p">
                      <p>{s.impact}</p>
                    </TextListItem>
                  ))}
                </TextList>
              </div>

              <div className="rounded-card bg-surface-raised border border-border p-7 space-y-4">
                <div className="flex items-center gap-2 text-meta font-semibold text-accent">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Garantie de transparence</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  En tant que branche sociale du groupe IROKO, WAHHF Foundation publie ses engagements d’allocation des ressources sur sa page dédiée.
                </p>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Lock className="w-4 h-4 text-or" />
                  <span>Formulaire prêt pour intégration Stripe / PayPal / Mobile Money via Symfony.</span>
                </div>
                <Link
                  to="/transparence"
                  className="inline-block text-xs font-semibold text-accent underline underline-offset-4"
                >
                  Consulter notre page Transparence financière
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
