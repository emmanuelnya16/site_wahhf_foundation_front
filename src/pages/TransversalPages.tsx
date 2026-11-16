import { Fragment, useState, useId, useRef, FormEvent } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Scale,
} from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import SectionHeader from '../components/wahhf/SectionHeader';
import { TextList, TextListItem, ReadingColumn } from '../components/wahhf/TextList';
import { CardLink, CardMedia, CardBody, CardMeta, CardTitle } from '../components/wahhf/Card';
import PageHeader, { PageMeta, PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import { PrimaryButton, SecondaryButton, DonateButton } from '../components/wahhf/Buttons';
import DomainCard from '../components/wahhf/DomainCard';
import Counter from '../components/wahhf/Counter';
import PresenceSection from '../components/wahhf/PresenceSection';
import FormField, { FieldError, fieldErrorId, FIELD_CLASS, CHECK_LABEL_CLASS, CHECKBOX_CLASS } from '../components/wahhf/FormField';
import { emailError, requiredError, focusFirstError } from '../lib/formValidation';
import { useFocusOnChange } from '../lib/useFocusOnChange';
import ContactHandoff from '../components/wahhf/ContactHandoff';
import { buildDraft } from '../lib/contactDraft';
import NotFoundPage, { NotFoundLinks } from './NotFoundPage';
import {
  DOMAINS_DATA,
  NEWS_DATA,
  TIMELINE_MILESTONES,
  WAHHF_LOGO_URL,
  imageSrcSet,
} from '../services/api';

/**
 * 1. PAGE /qui-sommes-nous
 * Histoire, mission, valeurs, équipe, gouvernance, et section dédiée « WAHHF, branche sociale du groupe IROKO ».
 */
export function QuiSommesNousPage() {
  return (
    <>
      <SEO
        title="Qui sommes-nous — Fondation camerouno-allemande & Branche sociale IROKO"
        description="Découvrez l'histoire, la mission, les valeurs, la gouvernance de WAHHF Foundation (We Are Here Help Foundation) et son lien avec le groupe IROKO."
      />

      <PageHeader>
        <PageTitle>
          Une fondation camerouno-allemande au service de la dignité humaine
        </PageTitle>
        <PageIntro>
          Née de la solidarité entre le Cameroun et l’Allemagne, WAHHF Foundation accompagne les jeunes et les communautés à travers 6 domaines d’action complémentaires.
        </PageIntro>
      </PageHeader>

      {/* Histoire, Mission & Valeurs */}
      <section className="container-page section-space space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-5">
            <SectionHeader
              title="Bâtir l’autonomie par l’éducation, la santé et l’accès gratuit au savoir"
            />
            <p className="text-body text-text">
              WAHHF Foundation (We Are Here Help Foundation) part d’une conviction simple : chaque jeune mérite d’accéder à l’éducation, aux soins de prévention, à l’apprentissage des langues et à une information vérifiée, sans que le manque de ressources financières ou les réseaux de désinformation ne brisent son avenir.
            </p>
            <p className="text-base text-text-secondary leading-relaxed">
              Nos équipes interviennent dans les 10 régions du Cameroun et coordonnent depuis l’Allemagne et le Cameroun un programme gratuit d’apprentissage de l’allemand (A1 à C1) et d’orientation vers 10 pays européens.
            </p>
          </div>

          <TextList columns={1} className="lg:col-span-5">
            {[
              {
                title: 'Dignité & Respect',
                desc: 'Chaque bénéficiaire est accueilli comme un acteur de son propre parcours, jamais comme un client.',
              },
              {
                title: 'Gratuité Totale',
                desc: 'Aucune contrepartie financière n’est jamais demandée aux jeunes et aux familles accompagnés.',
              },
              {
                title: 'Intégrité & Vérité',
                desc: 'Nous combattons les fausses promesses migratoires par une information rigoureuse et vérifiable.',
              },
            ].map((val) => (
              <TextListItem key={val.title} title={val.title}>
                <p>{val.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>

        {/* Section dédiée : WAHHF, branche sociale du groupe IROKO */}
        <div className="surface-green rounded-card bg-nuit text-text-on-inverse p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="text-section-title text-text-on-inverse">
              WAHHF Foundation, branche sociale du groupe IROKO
            </h2>
            <p className="text-body text-text-secondary-on-inverse">
              Le groupe multisectoriel camerouno-allemand <strong>IROKO</strong> a structuré WAHHF Foundation comme sa branche sociale et philanthropique indépendante à but non lucratif. Ce soutien structurel permet de couvrir les frais opérationnels et pédagogiques afin que les cours de langue allemande et les actions de terrain demeurent 100 % gratuits pour les bénéficiaires.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <PrimaryButton
                to="/partenaires"
                onInverse
              >
                Découvrir nos partenaires et financeurs
              </PrimaryButton>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-3">
            <img
              src={WAHHF_LOGO_URL}
              alt="Logo WAHHF Foundation"
              className="w-20 h-20 rounded-pill bg-white p-1.5 object-contain"
            />
                        <p className="text-body font-semibold text-text-on-inverse">WAHHF Foundation</p>
            {/* Rétabli : décision n° 11 de la liste du lot 5 annulée le 16/11 */}
            <p className="text-meta text-text-secondary-on-inverse">Branche sociale du groupe IROKO</p>
          </div>
        </div>

        {/* Gouvernance & Équipe (TODO) */}
        <div id="gouvernance" className="space-y-8">
          <SectionHeader
            kicker="Noms officiels à confirmer (TODO)"
            title="Une gouvernance collégiale entre le Cameroun et l’Allemagne"
            subtitle="Les membres du conseil et les responsables de pôles veillent au respect de l’éthique et de la gratuité."
          />

          <TextList columns={3}>
            {[
              {
                role: 'Direction & Conseil de Fondation (TODO)',
                desc: 'Supervision stratégique, conformité juridique camerouno-allemande et contrôle de l’intégrité des programmes.',
              },
              {
                role: 'Coordination Pédagogique & Langues (TODO)',
                desc: 'Enseignants d’allemand et conseillers d’orientation chargés des cohortes A1 à C1 et de la vérification des guides pays.',
              },
              {
                role: 'Coordination Terrain Cameroun (TODO)',
                desc: 'Relais régionaux pour les campagnes d’éducation, de santé préventive, d’agroécologie et d’inclusion.',
              },
            ].map((gov) => (
              <TextListItem key={gov.role} title={gov.role}>
                <p>{gov.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>
      </section>
    </>
  );
}

/**
 * 2. PAGE /partenaires
 * Présentation d'IROKO en tant que partenaire fondateur, autres partenaires et financeurs, comment devenir partenaire.
 */
export function PartenairesPage() {
  return (
    <>
      <SEO
        title="Partenaires et financeurs — Groupe IROKO & Réseau engagé"
        description="Découvrez le rôle du groupe IROKO en tant que partenaire fondateur de WAHHF Foundation ainsi que nos partenaires institutionnels et associatifs."
      />

      <PageHeader>
        <PageTitle>
          Un écosystème engagé pour garantir la gratuité de nos actions
        </PageTitle>
        <PageIntro>
          En premier lieu le groupe IROKO, accompagné de nos donateurs, professionnels bénévoles et institutions partenaires.
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space space-y-12">
        {/* Partenaire Fondateur : Groupe IROKO */}
        <div className="surface-green rounded-card bg-nuit text-text-on-inverse p-8 sm:p-12 space-y-5">
          <p className="text-meta text-text-secondary-on-inverse">Partenaire fondateur et mécène structurel</p>
          <h2 className="text-section-title text-text-on-inverse">
            Groupe IROKO — Holding & 10 Pôles d’Expertise
          </h2>
          <p className="text-body text-text-secondary-on-inverse max-w-[65ch]">
            WAHHF Foundation est la branche sociale du groupe IROKO. Par son mécénat financier, technologique et humain, le groupe IROKO finance durablement l’Académie de langues (allemand A1 à C1), les supports d’orientation vérifiés vers l’Europe ainsi que les déploiements solidaires dans les 10 régions du Cameroun.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <SecondaryButton to="/qui-sommes-nous" onInverse>
              En savoir plus sur notre gouvernance
            </SecondaryButton>
          </div>
        </div>

        {/* Autres partenaires (TODO : logos et accords officiels à valider) */}
        <div className="space-y-6">
          <SectionHeader
            kicker="Liste officielle à confirmer (TODO)"
            title="Catégories de partenaires & soutiens"
            subtitle="Conformément à notre éthique, aucun nom ou logo d’institution tierce n’est affiché sans accord écrit préalable."
          />

          <TextList columns={3}>
            {[
              {
                title: 'Établissements scolaires & éducatifs (TODO)',
                desc: 'Écoles et centres communautaires accueillant nos bibliothèques, distributions de kits et ateliers linguistiques.',
              },
              {
                title: 'Professionnels de santé bénévoles (TODO)',
                desc: 'Médecins, infirmiers et sages-femmes mobilisés lors des campagnes gratuites de prévention sanitaire.',
              },
              {
                title: 'Donateurs individuels & Mécènes',
                desc: 'Citoyens et philanthropes au Cameroun, en Allemagne et en Europe finançant les parcours des jeunes.',
              },
            ].map((p) => (
              <TextListItem key={p.title} title={p.title}>
                <p>{p.desc}</p>
              </TextListItem>
            ))}
          </TextList>
        </div>

        {/* Appel à devenir partenaire */}
        <div className="rounded-card bg-surface-section p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-body font-semibold text-text">Comment devenir partenaire de WAHHF Foundation ?</h3>
            <p className="text-sm text-text-tertiary">
              Vous représentez une université, un centre de formation, une ONG, un établissement médical ou une entreprise engagée ? Construisons ensemble un programme à impact mesurable.
            </p>
          </div>
          <PrimaryButton to="/agir#partenaire">Proposer un partenariat</PrimaryButton>
        </div>
      </section>
    </>
  );
}

/**
 * 3. PAGE /nos-actions
 * Vue d'ensemble détaillée des 6 domaines d'action.
 */
export function NosActionsPage() {
  const [searchParams] = useSearchParams();
  const activeSlug = searchParams.get('domaine');

  return (
    <>
      <SEO
        title="Nos 6 domaines d'action — Éducation, Santé, Entrepreneuriat, Environnement, Droits, Mobilité"
        description="Découvrez les 6 domaines d'intervention de WAHHF Foundation au Cameroun et vers l'Europe."
      />

      <PageHeader>
        <PageTitle>
          Agir sur tous les leviers de l’autonomie humaine
        </PageTitle>
        <PageIntro>
          Éducation, Santé, Entrepreneuriat des jeunes, Environnement, Droits et inclusion, et Mobilité & Langues.
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space space-y-16">
        <TextList columns={3}>
          {DOMAINS_DATA.map((d) => (
            <DomainCard key={d.id} domain={d} />
          ))}
        </TextList>

        {/* Détail des programmes par domaine */}
        <div className="space-y-8">
          <SectionHeader
            title="Le détail de nos interventions par domaine"
          />

          {/* Blocs non cliquables : plus de carte (T-15) ; le domaine demandé (?domaine=) est posé dans un encart sauge. */}
          <div>
            {DOMAINS_DATA.map((dom) => {
              const isHighlighted = activeSlug === dom.slug;
              return (
                <div
                  key={dom.id}
                  id={dom.slug}
                  className={
                    isHighlighted
                      ? 'rounded-card bg-surface-section p-6 sm:p-8 my-4'
                      : 'border-t border-border-subtle py-8'
                  }
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-[65ch]">
                      <h3 className="text-body font-semibold text-text">{dom.title}</h3>
                      <p className="text-body text-text-secondary">
                        {dom.fullDesc}
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-body text-text marker:text-text-secondary">
                        {dom.programs.map((prog) => (
                          <li key={prog}>{prog}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="shrink-0">
                      {dom.slug === 'mobilite-langues' ? (
                        <PrimaryButton to="/mobilite-langues">
                          Accéder au hub Mobilité & Langues
                        </PrimaryButton>
                      ) : (
                        <PrimaryButton to="/agir">Soutenir ce domaine</PrimaryButton>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * 4. PAGE /notre-impact
 * Chiffres clés, carte des 10 régions & 10 pays, et frise.
 */
export function NotreImpactPage() {
  return (
    <>
      <SEO
        title="Notre impact — Résultats, présence dans 10 régions & transparence"
        description="Mesurez l'impact des programmes éducatifs, sanitaires et linguistiques de WAHHF Foundation au Cameroun et vers l'Europe."
      />

      <PageHeader>
        <PageTitle>
          Un impact concret, mesuré avec humilité et transparence
        </PageTitle>
        <PageIntro>
          Chiffres clés d’accompagnement (marqués TODO à consolider), couverture des 10 régions du Cameroun et passerelles vers 10 pays européens.
        </PageIntro>
      </PageHeader>

      <section className="container-page section-space space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { end: 1250, suffix: '+', label: 'Jeunes et familles accompagnés (TODO)' },
            { end: 6, suffix: '', label: 'Domaines d’action structurés' },
            { end: 10, suffix: '', label: 'Régions du Cameroun couvertes' },
            { end: 10, suffix: '', label: 'Pays européens documentés gratuitement' },
          ].map((item, i) => (
            <div key={i} className="border-t border-border-subtle pt-5 space-y-2">
              <p className="text-page-title text-accent tabular-nums">
                <Counter end={item.end} suffix={item.suffix} />
              </p>
              <p className="text-body text-text">{item.label}</p>
            </div>
          ))}
        </div>

        <PresenceSection />

        <div className="surface-green rounded-card bg-nuit text-text-on-inverse p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-section-title text-text-on-inverse">
              Consulter nos engagements de transparence financière
            </h2>
            <p className="text-body text-text-secondary-on-inverse">
              Découvrez comment les ressources du groupe IROKO et les dons sont affectés aux missions sociales.
            </p>
          </div>
          <PrimaryButton
            to="/transparence"
            onInverse
            className="shrink-0"
          >
            Voir la page Transparence
          </PrimaryButton>
        </div>
      </section>
    </>
  );
}

/**
 * 5. PAGES /actualites et /actualites/:slug
 */
export function ActualitesPage() {
  const { slug } = useParams<{ slug?: string }>();

  if (slug) {
    const article = NEWS_DATA.find((a) => a.slug === slug);
    // Article inconnu : on le dit, au lieu d'afficher le premier article
    if (!article) {
      return (
        <NotFoundPage
          title="Cet article est introuvable"
          message="Il a peut-être été déplacé ou retiré, ou le lien a été mal copié. Voici les actualités publiées."
        >
          <NotFoundLinks
            heading="Toutes les actualités"
            links={[{ to: '/actualites', label: 'Page Actualités' }, ...NEWS_DATA.map((a) => ({ to: `/actualites/${a.slug}`, label: a.title }))]}
          />
        </NotFoundPage>
      );
    }
    return (
      <>
        <SEO title={article.title} description={article.excerpt} />
        <PageHeader>
          <PageMeta>
          <Link to="/actualites">
            Retour à toutes les actualités
          </Link>
          </PageMeta>
          <PageMeta className="gap-x-3">
            <span className="px-3 py-0.5 rounded-pill border border-border-input text-text">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
          </PageMeta>
          <PageTitle>
            {article.title}
          </PageTitle>
        </PageHeader>

        <section className="container-page section-space space-y-8">
          <div className="max-w-[65ch] rounded-card overflow-hidden aspect-[16/9] bg-surface-section">
            <img
              src={article.image}
              srcSet={imageSrcSet(article.image)}
              sizes="(min-width: 768px) 600px, calc(100vw - 2.5rem)"
              alt={article.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>

          <ReadingColumn as="article">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </ReadingColumn>

          <div className="flex flex-wrap justify-between items-center gap-4 pt-4">
            <PrimaryButton to="/candidater">Candidater au programme gratuit</PrimaryButton>
            <DonateButton />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Actualités & Actions de terrain"
        description="Suivez les dernières actualités de WAHHF Foundation : ouvertures des sessions d'allemand gratuites, campagnes de santé et reboisement."
      />
      <PageHeader>
        <PageTitle>
          Actualités & Actions de terrain
        </PageTitle>
      </PageHeader>

      <section className="container-page section-space grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS_DATA.map((art) => (
          <CardLink key={art.slug} to={`/actualites/${art.slug}`}>
            <CardMedia
              src={art.image}
              srcSet={imageSrcSet(art.image)}
              sizes="(min-width: 768px) 33vw, 100vw"
              alt={art.title}
              width={600}
              height={375}
            />
            <CardBody>
              <CardMeta>
                <span>{art.category}</span>
                <span>{art.date}</span>
              </CardMeta>
              <CardTitle as="h2">{art.title}</CardTitle>
              <p className="text-body text-text-secondary">{art.excerpt}</p>
            </CardBody>
          </CardLink>
        ))}
      </section>
    </>
  );
}

/**
 * 6. PAGE /agir
 * Faire un don, Devenir bénévole, Devenir partenaire + formulaire d'engagement RGPD.
 */
type AgirField = 'name' | 'email' | 'details' | 'consent';
const AGIR_FIELDS = ['name', 'email', 'details', 'consent'] as const;
const AGIR_INPUT_CLASS = FIELD_CLASS;

function checkAgirField(key: AgirField, value: string | boolean): string | undefined {
  switch (key) {
    case 'name':
      return requiredError(String(value), 'Saisissez votre nom complet ou le nom de votre structure.');
    case 'email':
      return emailError(String(value));
    case 'details':
      return requiredError(
        String(value),
        'Décrivez en quelques lignes vos compétences, vos disponibilités ou votre projet de partenariat.'
      );
    case 'consent':
      return value ? undefined : 'Cochez cette case pour que nous puissions étudier votre proposition et vous répondre.';
  }
}

export function AgirPage() {
  const [roleType, setRoleType] = useState<'benevole' | 'partenaire'>('benevole');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [details, setDetails] = useState('');
  const [consent, setConsent] = useState(false);
  // Message prêt à envoyer (WhatsApp ou e-mail) : le site ne transmet pas encore la proposition lui-même
  const [prepared, setPrepared] = useState(false);

  // Labels reliés aux champs (useId) ; erreurs précises sous chaque champ, focus sur la première
  const uid = useId();
  const fieldId = (key: AgirField) => `agir-${key}-${uid}`;
  const [errors, setErrors] = useState<Partial<Record<AgirField, string>>>({});
  const values: Record<AgirField, string | boolean> = { name, email, details, consent };
  const recheck = (key: AgirField, value: string | boolean) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: checkAgirField(key, value) }));
  };
  const checkOnBlur = (key: AgirField, value: string) => {
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: checkAgirField(key, value) }));
  };

  // Choix du rôle ou envoi : défilement jusqu'au formulaire, focus sur son titre, annonce polie.
  // (Un nouveau clic sur le même rôle ramène aussi au formulaire, d'où le compteur.)
  const formBlockRef = useRef<HTMLDivElement>(null);
  const [roleRequest, setRoleRequest] = useState(0);
  const formTitleRef = useFocusOnChange<HTMLHeadingElement>(prepared ? 'message-pret' : `${roleType}-${roleRequest}`, {
    scrollRef: formBlockRef,
  });
  const chooseRole = (role: 'benevole' | 'partenaire') => {
    setRoleType(role);
    setRoleRequest((n) => n + 1);
    setPrepared(false);
  };
  const statusMessage = prepared
    ? 'Votre message est prêt : envoyez-le par WhatsApp ou par e-mail.'
    : roleRequest > 0
    ? `Formulaire : ${roleType === 'benevole' ? 'devenir bénévole' : 'devenir partenaire'}.`
    : '';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found: Partial<Record<AgirField, string>> = {};
    for (const key of AGIR_FIELDS) found[key] = checkAgirField(key, values[key]);
    setErrors(found);
    if (focusFirstError(AGIR_FIELDS, found, fieldId)) return;
    setPrepared(true);
  };

  const draft = buildDraft(
    roleType === 'benevole' ? `Proposition de bénévolat — ${name.trim()}` : `Proposition de partenariat — ${name.trim()}`,
    roleType === 'benevole'
      ? 'Je souhaite devenir bénévole pour WAHHF Foundation. Voici ma proposition, saisie sur le site :'
      : 'Je souhaite proposer un partenariat à WAHHF Foundation. Voici ma proposition, saisie sur le site :',
    [
      ['Nom complet / Structure', name],
      ['E-mail', email],
      ['Message', details],
    ],
    'J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition d’engagement (RGPD).'
  );

  return (
    <>
      <SEO
        title="Agir avec WAHHF Foundation — Don, Bénévolat, Partenariat"
        description="Rejoignez l'engagement de WAHHF Foundation : faire un don, devenir formateur ou bénévole, ou bâtir un partenariat institutionnel."
      />

      <PageHeader>
        <PageTitle>
          Trois manières concrètes de soutenir la jeunesse
        </PageTitle>
      </PageHeader>

      <section className="container-page section-space space-y-16">
        {/* Trois voies en liste typographique (contrat §8, T-15) : titre, phrase, action ; ancres #benevole et #partenaire gardées */}
        <TextList columns={3}>
          <TextListItem title="Faire un don" titleAs="h2" actions={<DonateButton />}>
            <p>Financez les cours d’allemand gratuits et les actions sociales de terrain.</p>
          </TextListItem>
          <TextListItem id="benevole" title="Devenir bénévole" titleAs="h2" actions={<PrimaryButton onClick={() => chooseRole('benevole')}>Remplir le formulaire bénévole</PrimaryButton>}>
            <p>Enseignants d’allemand, médecins, mentors ou coordinateurs locaux au Cameroun et en Europe.</p>
          </TextListItem>
          <TextListItem id="partenaire" title="Devenir partenaire" titleAs="h2" actions={<PrimaryButton onClick={() => chooseRole('partenaire')}>Proposer un partenariat</PrimaryButton>}>
            <p>Écoles, universités, ONG et entreprises souhaitant co-financer ou appuyer un programme.</p>
          </TextListItem>
        </TextList>

        {/* Formulaire Bénévole / Partenaire */}
        <div ref={formBlockRef} className="rounded-card bg-surface-section p-7 sm:p-10 max-w-3xl">
          <p role="status" className="sr-only">
            {statusMessage}
          </p>
          {prepared ? (
            <ContactHandoff
              compact
              headingLevel="h3"
              title={roleType === 'benevole' ? 'Dernière étape : envoyez votre proposition de bénévolat' : 'Dernière étape : envoyez votre proposition de partenariat'}
              draft={draft}
              titleRef={formTitleRef}
              onEdit={() => setPrepared(false)}
            >
              <p className="text-sm text-text-tertiary">
                Notre équipe prendra contact avec vous sous 7 à 14 jours ouvrés (TODO : confirmer délai).
              </p>
            </ContactHandoff>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h3 ref={formTitleRef} tabIndex={-1} className="font-serif text-2xl">
                Formulaire : {roleType === 'benevole' ? 'Devenir bénévole' : 'Devenir partenaire'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id={fieldId('name')}
                  label="Nom complet / Structure *"
                  error={errors.name}
                >
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
                      className={AGIR_INPUT_CLASS}
                    />
                  )}
                </FormField>
                <FormField
                  id={fieldId('email')}
                  label="E-mail *"
                  error={errors.email}
                >
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
                      className={AGIR_INPUT_CLASS}
                    />
                  )}
                </FormField>
              </div>

              <FormField
                id={fieldId('details')}
                label="Votre message (compétences, disponibilités ou projet de partenariat) *"
                error={errors.details}
              >
                {(a11y) => (
                  <textarea
                    {...a11y}
                    rows={4}
                    required
                    value={details}
                    onChange={(e) => {
                      setDetails(e.target.value);
                      recheck('details', e.target.value);
                    }}
                    onBlur={(e) => checkOnBlur('details', e.target.value)}
                    className={AGIR_INPUT_CLASS}
                  />
                )}
              </FormField>

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
                    J’accepte que mes données soient traitées par WAHHF Foundation pour étudier ma proposition d’engagement (RGPD). *
                  </span>
                </label>
                <FieldError id={fieldErrorId(fieldId('consent'))} message={errors.consent} />
              </div>

              <PrimaryButton type="submit">Préparer l’envoi de ma proposition</PrimaryButton>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

/**
 * 7. PAGES LÉGALES & TRANSPARENCE (/mentions-legales, /confidentialite, /transparence)
 */
export function LegalTransparencyPage({
  type,
}: {
  type: 'mentions' | 'confidentialite' | 'transparence';
}) {
  const content = {
    mentions: {
      title: 'Mentions légales',
      kicker: 'Informations statutaires (TODO : compléter numéros d’enregistrement)',
      icon: Scale,
      blocks: [
        {
          h: 'Éditeur du site',
          p: 'WAHHF Foundation (We Are Here Help Foundation), fondation camerouno-allemande à but non lucratif, branche sociale du groupe IROKO. Siège et antennes : Cameroun & Allemagne (TODO : adresses postales et numéros d’enregistrement officiels à compléter).',
        },
        {
          h: 'Caractère non commercial du site',
          p: 'Ce site a une vocation exclusivement informative, éducative et philanthropique. Aucun service payant, ni visa, ni contrat de travail n’y est commercialisé.',
        },
      ],
    },
    confidentialite: {
      title: 'Politique de confidentialité & Protection des données (RGPD)',
      blocks: [
        {
          h: 'Collecte minimale et transparente',
          p: 'Les données saisies dans nos formulaires (Candidater, Agir, Newsletter) sont strictement limitées au suivi pédagogique et associatif de votre demande. Nous ne demandons jamais de copie de passeport ou de pièce d’identité lors du premier contact en ligne.',
        },
        {
          h: 'Absence de revente et droits des utilisateurs',
          p: 'Vos informations ne sont jamais vendues ni cédées à des tiers commerciaux. Conformément au RGPD, vous pouvez demander l’accès, la rectification ou la suppression de vos données à tout moment en écrivant à contact@wahhf-foundation.org (TODO : confirmer adresse DPO).',
        },
        {
          // TODO : texte à valider par la fondation
          h: 'Vidéo de la page d’accueil (YouTube)',
          p: 'Sur ordinateur, la page d’accueil peut afficher en arrière-plan une vidéo hébergée par YouTube (Google), en mode « confidentialité renforcée » (youtube-nocookie.com), muette et sans publicité ciblée. Elle n’est chargée qu’après l’affichage de la page, et jamais si vous avez refusé les cookies non essentiels. Lors de sa lecture, YouTube reçoit votre adresse IP et peut enregistrer des informations techniques sur votre appareil. Vous pouvez à tout moment la mettre en pause depuis la page, ou refuser les cookies non essentiels pour qu’elle ne soit plus chargée.',
        },
      ],
    },
    transparence: {
      title: 'Transparence financière & Origine des ressources',
      blocks: [
        {
          h: 'Financement de la gratuité des programmes',
          p: 'Les programmes de WAHHF Foundation (dont l’Académie de langue allemande A1 à C1 et l’accompagnement vers l’Europe) sont financés par la dotation du groupe IROKO et par les dons volontaires des mécènes et donateurs.',
        },
        {
          h: 'Publication des rapports annuels (TODO)',
          p: 'Les rapports d’activité et bilans financiers certifiés seront publiés sur cette page à chaque clôture d’exercice (TODO : insérer lien PDF du rapport annuel dès validation).',
        },
      ],
    },
  }[type];

  return (
    <>
      <SEO title={content.title} description={content.blocks[0].p} />
      <PageHeader>
        {'kicker' in content && (
          <PageMeta>
            <content.icon aria-hidden="true" className="w-4 h-4" />
            <span>{content.kicker}</span>
          </PageMeta>
        )}
        <PageTitle>{content.title}</PageTitle>
      </PageHeader>

      {/* Colonne de lecture de 65 caractères (contrat §8) : un paragraphe n'est jamais une carte */}
      <section className="container-page section-space">
        <ReadingColumn as="article">
          {content.blocks.map((b) => (
            <Fragment key={b.h}>
              <h2>{b.h}</h2>
              <p>{b.p}</p>
            </Fragment>
          ))}
        </ReadingColumn>
      </section>
    </>
  );
}
