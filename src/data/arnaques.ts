/**
 * Contenu de la page « Éviter les arnaques » (/accompagnement/eviter-les-arnaques), groupe 7.4 : audit ARN-01 à ARN-04.
 * Chaque puce porte son type (ARN-03) : « sign » (signe d'arnaque, icône d'alerte ambre), « practice » (bon réflexe,
 * coche), « promise » (engagement de la fondation, puce simple). Les textes reprennent ceux du guide d'origine
 * (THEMATIC_GUIDES['eviter-les-arnaques'], services/api.ts, gardé tel quel pour mémoire) et de l'avertissement ; aucun fait
 * nouveau sur la fondation, sauf ce que le brief demande d'écrire (« un don ne donne jamais accès à une place », ARN-02).
 * L'icône de chaque puce est lue dans son type par ArnaquesPage (revue du groupe 7.4) : un signe d'arnaque placé par
 * erreur parmi les bons réflexes garderait son triangle d'alerte, jamais la coche.
 * Espaces insécables (NB) après « et avant », avant « : » et « ! », dans « 100 % » (T-19, revue du groupe 7.4).
 */

const NB = '\u00a0';

export type ScamItemType = 'sign' | 'practice' | 'promise';

export interface ScamItem {
  type: ScamItemType;
  title?: string;
  text: string;
}

/** La check-list « 5 signes d'arnaque » (ARN-04). */
export const SCAM_SIGNS: ScamItem[] = [
  {
    type: 'sign',
    title: 'On vous promet un visa garanti',
    text: `Méfiez-vous de toute personne qui promet un visa «${NB}garanti à 100${NB}%${NB}» ou «${NB}rapide sans entretien à l’ambassade${NB}». Les décisions appartiennent aux autorités et aux établissements concernés.`,
  },
  {
    type: 'sign',
    title: 'On vous vend un contrat de travail ou de formation',
    text: `Un contrat de formation (Ausbildung) ou de travail en Europe ne s’achète jamais${NB}: ce sont les entreprises qui rémunèrent l’apprenti, jamais l’inverse.`,
  },
  {
    type: 'sign',
    title: 'On vous promet une admission sans diplôme ni langue',
    text: 'Les études et la formation professionnelle en Europe demandent un niveau de langue certifié et, pour les études, la reconnaissance officielle de vos diplômes.',
  },
  {
    type: 'sign',
    title: 'On vous demande de payer un particulier par transfert mobile',
    text: 'Aucune ambassade ni aucun consulat ne demande de paiement par transfert mobile informel à un particulier, et aucun membre de WAHHF Foundation ne vous demandera d’argent.',
  },
  {
    type: 'sign',
    title: 'Un profil utilise un logo officiel sur une messagerie',
    text: `Attention aux faux profils qui utilisent des logos officiels sur WhatsApp, Telegram ou Facebook${NB}: comparez le numéro avec nos seuls canaux officiels, en haut de cette page.`,
  },
];

/** Passage marqué du faux message : un signe d'arnaque, expliqué sous le message. */
export interface FakeMessageFlag {
  type: ScamItemType;
  flag: string;
  note: string;
}

/**
 * Exemple de faux message (ARN-04), écrit pour la page à partir des signes ci-dessus : chaque passage marqué est
 * expliqué. Il ne contient ni numéro, ni montant, ni nom de personne.
 */
export const FAKE_MESSAGE: Array<string | FakeMessageFlag> = [
  `Bonjour${NB}! `,
  {
    type: 'sign',
    flag: `Visa garanti à 100${NB}% pour l’Allemagne, sans entretien à l’ambassade.`,
    note: `Méfiez-vous de toute promesse de visa garanti ou sans entretien${NB}: les décisions appartiennent aux autorités et aux établissements concernés.`,
  },
  ' ',
  { type: 'sign', flag: 'Un contrat de travail vous attend déjà.', note: `Un contrat de travail ou de formation ne s’achète jamais${NB}: ce sont les entreprises qui recrutent et rémunèrent.` },
  ' Pour réserver votre place, ',
  { type: 'sign', flag: 'envoyez les frais de dossier par transfert mobile', note: 'Ni une ambassade, ni un consulat, ni WAHHF Foundation ne demandent de paiement à un particulier.' },
  ' à ce numéro. ',
  { type: 'sign', flag: 'L’équipe WAHHF Foundation', note: `Un nom ou un logo ne prouve rien${NB}: comparez le numéro avec nos seuls canaux officiels.` },
];

/** Ce que WAHHF Foundation ne fait jamais (ARN-02 : le don ne donne jamais accès à une place). */
export const SCAM_PROMISES: ScamItem[] = [
  {
    type: 'promise',
    title: 'Un don ne donne jamais accès à une place',
    text: 'Les dons financent les actions de la fondation. Faire un don ne réserve ni une place dans nos cours, ni un accompagnement.',
  },
  {
    type: 'promise',
    text: 'Aucun membre, bénévole ou partenaire de WAHHF ne vous demandera de frais de dossier, d’inscription ou de caution, ni de paiement par Mobile Money.',
  },
  { type: 'promise', text: 'Nous ne demandons aucun document d’identité (passeport, CNI) lors du premier contact en ligne.' },
  { type: 'promise', text: 'Nous ne vendons ni visa, ni billet d’avion, ni contrat de travail.' },
];

/** Les bons réflexes (ARN-03 : la coche seulement ici). */
export const SCAM_PRACTICES: ScamItem[] = [
  { type: 'practice', text: 'Vérifiez systématiquement les procédures sur le site officiel de l’ambassade du pays concerné.' },
  { type: 'practice', text: `Ne vous fiez jamais à des pages non officielles${NB}: consultez directement les portails institutionnels, cités dans chaque fiche pays.` },
  { type: 'practice', text: 'En cas de doute, interrompez immédiatement l’échange et signalez-le-nous, avec une capture d’écran du message.' },
];

/**
 * Adresse de signalement du guide d'origine, non confirmée par la fondation : masquée (question 33 de
 * docs/contenus-a-fournir.md). Tant qu'elle ne l'est pas, la page renvoie aux coordonnées de src/config/contact.ts.
 */
export const UNCONFIRMED_INTEGRITY_EMAIL = 'integrite@wahhf-foundation.org';
