import type { PhotoAlbumId } from './photos';

/**
 * Événements de la fondation (lot 7.9) : pages /evenements et /evenements/:slug (src/pages/events/).
 *
 * Règles de contenu (src/lib/events.ts) :
 * - un texte qui contient « TODO » est provisoire : il s'affiche en développement (et dans l'aperçu
 *   VITE_APERCU_EVENEMENTS=1), jamais sur le site en ligne ;
 * - une section ne s'affiche que si elle a au moins un élément confirmé ; une fiche sans programme n'a pas de section
 *   programme vide ;
 * - les photos sont des repères du catalogue (docs/photos-catalogue.md), dans l'ordre de préférence : la première
 *   publiable est prise (photoOrFallback), les suivantes remplacent une photo qui attend l'accord des parents.
 * Questions à la fondation : docs/contenus-a-fournir.md, questions 156 et suivantes.
 */

export type EventStatus = 'a-venir' | 'passe';

/** Icônes disponibles pour les cartes (associées à lucide-react dans src/pages/events/ui.tsx) */
export type EventIcon =
  | 'emploi'
  | 'boussole'
  | 'pays'
  | 'alerte'
  | 'gratuit'
  | 'reseau'
  | 'professeur'
  | 'voyage'
  | 'logiciel'
  | 'startup'
  | 'hopital'
  | 'subvention'
  | 'transfert'
  | 'ecoute'
  | 'parcours'
  | 'partenaires'
  | 'temoignages'
  | 'presentation'
  | 'echange'
  | 'atelier'
  | 'rencontre'
  | 'education'
  | 'sante'
  | 'langues'
  | 'communaute';

/** Carte à icône : « Pourquoi venir », « Le programme en un coup d'œil » */
export interface EventCard {
  icon: EventIcon;
  titre: string;
  texte: string;
}

/** Un temps du déroulé de la journée */
export interface EventStep {
  /** « 8 h 00 » ; absent pour une étape de parcours (Road to Europe) */
  heure?: string;
  titre: string;
  texte: string;
  lien?: { libelle: string; to: string };
}

/** Domaines de la fondation (clés de nav.domains dans src/locales/*.json) */
export type EventDomain = 'education' | 'health' | 'entrepreneurship' | 'environment' | 'rights' | 'mobility';

/**
 * Une activité (cartes couleur, 4 ou 6) : titre, et au choix un texte, une étiquette libre ou un domaine (étiquette =
 * nom du domaine, lien vers sa page). Photo du catalogue, ou aucune : la carte montre alors une grande icône sur aplat.
 */
export interface EventActivity {
  icon: EventIcon;
  titre: string;
  /** Facultatif : sans texte, la carte n'a pas de paragraphe */
  texte?: string;
  etiquette?: string;
  domaine?: EventDomain;
  /** Repères du catalogue, par ordre de préférence ; [] : variante sans photo (grande icône sur aplat) */
  photo: readonly string[];
  /** Lien de la carte (rond flèche) ; par défaut, la page du domaine */
  to?: string;
}

export interface EventOrganizer {
  nom: string;
  /** Logo (adresse d'image), ou null : le nom s'écrit en texte */
  logo: string | null;
  url?: string;
}

export interface EventFaq {
  question: string;
  /** Peut contenir {{quandOu}}, {{prix}} : remplacés par les faits, ou par « annoncé très bientôt » (src/lib/events.ts) */
  reponse: string;
}

/** Textes propres à une section (surtitre, titre, phrase, boutons) ; à défaut, ceux de src/locales/events/*.json */
export interface EventSectionText {
  surtitre?: string;
  /** \n : retour à la ligne voulu (titres sur 2 ou 3 lignes, comme la référence) */
  titre?: string;
  intro?: string;
  action?: string;
  action2?: string;
  /** Libellé du panneau lieu (hero) */
  etiquette?: string;
}
export type EventSectionKey = 'hero' | 'compte' | 'pourquoi' | 'route' | 'voies' | 'programme' | 'partenaires' | 'parents' | 'faq' | 'blog' | 'final';

/** Carte « Sponsors et partenaires » */
export interface EventSupportCard {
  ton: 'soleil' | 'nuit';
  surtitre: string;
  titre: string;
  texte: string;
  to: string;
}

/** Carte « À lire avant de partir » : complète les actualités publiées (moins de 3) avec les guides du site */
export interface EventGuideCard {
  icon: EventIcon;
  surtitre: string;
  titre: string;
  texte: string;
  lien: string;
  to: string;
}

export interface Event {
  slug: string;
  /** Nom court de l'événement (liste, titre de l'onglet) ; à défaut, le titre */
  nom?: string;
  /** Texte de la pastille du hero (à la place du libellé par défaut), et sa langue s'il n'est pas en français */
  pastille?: { texte: string; lang?: string };
  /** Statut saisi ; un événement « à venir » dont la fin est passée est traité comme passé (src/lib/events.ts) */
  statut: EventStatus;
  /** Titre (h1), écrit tel qu'il doit se lire */
  titre: string;
  /** Partie du titre soulignée d'un trait soleil (mot accent) ; doit figurer telle quelle dans le titre (\n : ligne) */
  motAccent: string;
  accroche: string;
  /** Début, ISO 8601 avec le décalage du fuseau Africa/Douala (+01:00, pas d'heure d'été) ; null : « annoncée très bientôt » */
  date: string | null;
  /** Fin, même format ; null si inconnue */
  fin: string | null;
  fuseau: 'Africa/Douala';
  /** Nom de la salle ; null : inconnu */
  lieu: string | null;
  /** null tant qu'elle n'est pas confirmée */
  ville: string | null;
  pays: string;
  /** null : jamais affiché (seulement si le chiffre vient d'une vraie source) */
  placesRestantes: number | null;
  /** Adresse du formulaire d'inscription, ou null */
  lienInscription: string | null;
  /** Prix (« Gratuit », « 5 000 FCFA ») ; null : « annoncé très bientôt » */
  prix?: string | null;
  /** Textes propres aux sections */
  sections?: Partial<Record<EventSectionKey, EventSectionText>>;
  /** Mots du bandeau, chacun dans sa langue ; à défaut, les six domaines en allemand */
  bandeau?: { mot: string; lang: string }[];
  /** Cartes « Sponsors et partenaires » ; à défaut, celles de l'i18n (Agir) */
  soutien?: EventSupportCard[];
  /** « À lire avant de partir » : guides qui complètent les actualités publiées */
  blog?: EventGuideCard[];
  photoHero: readonly string[];
  organisateurs: EventOrganizer[];
  pourquoi: EventCard[];
  deroule: EventStep[];
  activites: EventActivity[];
  tempsForts: EventCard[];
  /** Identifiants de src/data/team.ts */
  intervenants: string[];
  /** Listes des parents ; titrePromesses / titreJamais remplacent les intitulés par défaut de l'i18n */
  parents: { promesses: string[]; jamais: string[]; titrePromesses?: string; titreJamais?: string };
  photoParents: readonly string[];
  faq: EventFaq[];
  photoFinale: readonly string[];
  /** Album de la galerie (src/data/photos.ts), ou null */
  galerieAlbum: PhotoAlbumId | null;
  /** Événement de démonstration (développement seulement) */
  demo?: boolean;
}

/**
 * Journée du 25 avril 2026 à l'Albatros Hotel. Faits sûrs : ceux de la banderole (photo A02) : WAHHF Foundation,
 * « Sowing hope harvesting change », « Bâtir l'Afrique qui nourrit, soigne et instruit sa jeunesse », Albatros Hotel,
 * 25 avril 2026, 8 h à 21 h ; ses « Activités » (six) et ses « Points forts » (quatre), publiés le 20 novembre 2026 à
 * la demande de la fondation (phrases des points forts fournies par elle). Le reste (déroulé, temps forts, parents,
 * FAQ) attend ses réponses (TODO) et reste masqué en ligne.
 */
const JOURNEE_2026_04_25: Event = {
  slug: 'journee-2026-04-25',
  statut: 'passe',
  pastille: { texte: 'Sowing hope, harvesting change', lang: 'en' },
  titre: 'Journée du 25 avril 2026 à l’Albatros Hotel',
  motAccent: '25 avril 2026',
  accroche: 'Bâtir l’Afrique qui nourrit, soigne et instruit sa jeunesse.',
  date: '2026-04-25T08:00:00+01:00',
  fin: '2026-04-25T21:00:00+01:00',
  fuseau: 'Africa/Douala',
  lieu: 'Albatros Hotel',
  ville: null, // TODO (fondation) : ville de l'Albatros Hotel
  pays: 'Cameroun',
  placesRestantes: null,
  lienInscription: null,
  // A27 (salle comble) attend l'accord des parents ; en ligne : A68 (intervenant sur scène, portrait), puis A30
  photoHero: ['A27', 'A68', 'A30'],
  organisateurs: [
    { nom: 'WAHHF Foundation', logo: 'wahhf' },
    { nom: 'Partenaire de la journée (TODO)', logo: null },
  ],
  // « Points forts » de la banderole ; phrases fournies par la fondation (20 novembre 2026)
  pourquoi: [
    { icon: 'gratuit', titre: 'Gratuit', texte: 'L’entrée et les formations sont gratuites.' },
    { icon: 'reseau', titre: 'Networking professionnel', texte: 'Rencontrer des professionnels et élargir son réseau.' },
    { icon: 'professeur', titre: 'Un professeur venu d’Allemagne', texte: 'Un professeur d’Allemagne présent sur place.' },
    { icon: 'voyage', titre: 'Accompagnement voyage', texte: 'Un accompagnement pour préparer un projet de voyage.' },
  ],
  deroule: [
    { heure: '8 h 00', titre: 'Accueil des participants (TODO)', texte: 'Ouverture des portes à 8 h (banderole) ; déroulé à confirmer (TODO).' },
    { heure: '9 h 00 (TODO)', titre: 'Présentation de la fondation (TODO)', texte: 'Les six domaines d’action présentés au public (TODO).', lien: { libelle: 'Nos actions', to: '/nos-actions' } },
    { heure: '11 h 00 (TODO)', titre: 'Études et formation en Europe (TODO)', texte: 'Présentation sur les études en Allemagne (TODO).', lien: { libelle: 'Mobilité & Langues', to: '/mobilite-langues' } },
    { heure: '14 h 00 (TODO)', titre: 'Échanges avec le public (TODO)', texte: 'Questions de la salle au micro (TODO).' },
    { heure: '21 h 00', titre: 'Clôture (TODO)', texte: 'Fin de la journée à 21 h (banderole) ; contenu à confirmer (TODO).' },
  ],
  // « Activités » de la banderole : titre et domaine seulement (étiquette et lien), aucune description.
  // Photos : A17 (attend l'accord des parents ; en ligne, A30), A22, A41, A53 ; hôpitaux et subvention sans photo.
  activites: [
    { icon: 'education', titre: 'Formations gratuites', domaine: 'education', photo: ['A17', 'A30'] },
    { icon: 'logiciel', titre: 'Logiciels gratuits', domaine: 'education', photo: ['A22'] },
    { icon: 'startup', titre: 'Accompagnement des startups', domaine: 'entrepreneurship', photo: ['A41'] },
    { icon: 'hopital', titre: 'Équipement des hôpitaux', domaine: 'health', photo: [] },
    { icon: 'subvention', titre: 'Subvention du meilleur projet', domaine: 'entrepreneurship', photo: [] },
    { icon: 'transfert', titre: 'Transfert technologique Allemagne–Cameroun', domaine: 'mobility', photo: ['A53'] },
  ],
  tempsForts: [
    { icon: 'presentation', titre: 'Comprendre (TODO)', texte: 'Premier temps fort de la journée : à fournir (TODO).' },
    { icon: 'echange', titre: 'Échanger (TODO)', texte: 'Deuxième temps fort : à fournir (TODO).' },
    { icon: 'atelier', titre: 'Pratiquer (TODO)', texte: 'Troisième temps fort : à fournir (TODO).' },
    { icon: 'rencontre', titre: 'Rencontrer (TODO)', texte: 'Quatrième temps fort : à fournir (TODO).' },
  ],
  intervenants: [], // TODO (fondation) : qui a pris la parole le 25 avril
  parents: {
    promesses: [
      'Une autorisation écrite des parents pour chaque mineur (TODO : à faire valider par la fondation)',
      'Des jeunes encadrés par l’équipe de la fondation pendant toute la journée (TODO : à faire valider)',
      'Une entrée gratuite, ou un prix clair annoncé à l’avance (TODO : à faire valider)',
    ],
    jamais: [
      'Une promesse de visa (TODO : à faire valider)',
      'Une promesse d’emploi (TODO : à faire valider)',
      'Des frais cachés ou payés à un intermédiaire (TODO : à faire valider)',
    ],
  },
  photoParents: ['A88', 'A31'],
  faq: [
    { question: 'Où et quand la journée a-t-elle eu lieu ? (TODO)', reponse: 'À l’Albatros Hotel, le 25 avril 2026, de 8 h à 21 h (banderole). Ville à confirmer (TODO).' },
    { question: 'À qui s’adressait la journée ? (TODO)', reponse: 'Réponse à fournir par la fondation (TODO).' },
    { question: 'L’entrée était-elle payante ? (TODO)', reponse: 'Réponse à fournir par la fondation (TODO).' },
    { question: 'Les mineurs pouvaient-ils venir seuls ? (TODO)', reponse: 'Réponse à fournir par la fondation (TODO).' },
    { question: 'Une prochaine édition est-elle prévue ? (TODO)', reponse: 'Réponse à fournir par la fondation (TODO).' },
    { question: 'Comment proposer un partenariat ? (TODO)', reponse: 'Par la page Agir, rubrique partenaire (TODO : à confirmer).' },
  ],
  // B26 (votre brief) vient de l'album « Terrain agricole » et attend l'accord des parents ; en ligne : A61
  photoFinale: ['B26', 'A61'],
  galerieAlbum: 'journee-2026-04-25',
};

/** Date de l'événement de démonstration : dans 60 jours, à 9 h (heure de Douala) */
function demoDate(days: number, hour: number) {
  const day = new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10);
  return `${day}T${String(hour).padStart(2, '0')}:00:00+01:00`;
}

/**
 * Événement « à venir » de démonstration : seulement en développement et dans l'aperçu (VITE_APERCU_EVENEMENTS=1),
 * pour tester le compte à rebours, les places restantes et le bouton d'inscription. Jamais en ligne.
 */
const DEMO: Event = {
  ...JOURNEE_2026_04_25,
  slug: 'exemple-a-venir',
  statut: 'a-venir',
  pastille: undefined,
  titre: 'Prochaine journée de la fondation (TODO)',
  motAccent: 'journée',
  accroche: 'Événement d’exemple pour tester la page : textes, date et lieu à remplacer (TODO).',
  date: demoDate(60, 9),
  fin: demoDate(60, 18),
  ville: 'Yaoundé (TODO)',
  placesRestantes: 42,
  lienInscription: '/candidater',
  intervenants: ['marrion-watio-notesse', 'christian-wilberg', 'christian-toralf-weber', 'wilfried'],
  galerieAlbum: null,
  demo: true,
};

const SHOW_DEMO = import.meta.env.DEV;

/** Typographie française du site (contrat §4.1) : apostrophe ’ et espace insécable avant : ; ! ? » et après « */
const fr = (text: string) =>
  text.replace(/'/g, '’').replace(/ ([:;!?»])/g, '\u00a0$1').replace(/« /g, '«\u00a0');
function frAll<T>(value: T): T {
  if (typeof value === 'string') return fr(value) as T;
  if (Array.isArray(value)) return value.map(frAll) as T;
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'to' || k === 'lang' || k === 'icon' || k === 'ton' ? v : frAll(v)])) as T;
  return value;
}

/**
 * Faits de Road to Europe (brief du 21 novembre 2026), à remplir par la fondation. null : la page affiche « annoncé(e)
 * très bientôt » à la place, jamais un faux chiffre.
 * - date / fin : ISO 8601 avec +01:00 (heure de Douala), par exemple '2027-01-16T08:00:00+01:00'
 * - ville : 'Yaoundé' ; salle : nom de la salle ; prix : 'Gratuit' ou '5 000 FCFA'
 * - placesRestantes : un nombre tenu à jour, ou null pour ne pas l'afficher
 * - inscription : adresse du formulaire, lien WhatsApp ou '/candidater'
 */
export const ROAD_TO_EUROPE_FAITS = {
  date: null as string | null,
  fin: null as string | null,
  ville: null as string | null,
  salle: null as string | null,
  prix: null as string | null,
  placesRestantes: null as number | null,
  inscription: null as string | null,
};

/**
 * Road to Europe (brief du 21 novembre 2026) : le même rendez-vous que la référence, vers les 10 pays du site.
 * Textes français fournis par la fondation, mot pour mot ; anglais et allemand proposés dans src/locales/events/en.json et de.json (contenu).
 */
const ROAD_TO_EUROPE: Event = frAll({
  slug: 'road-to-europe',
  nom: 'Road to Europe',
  statut: 'a-venir',
  pastille: { texte: 'Le rendez-vous qui lance votre projet européen' },
  titre: "Votre route vers\nl'Europe\ncommence ici.",
  motAccent: "l'Europe",
  accroche: "Études, formation, emploi qualifié : en une journée, comprenez les voies légales vers 10 pays d'Europe, rencontrez ceux qui forment et accompagnent, et repartez avec un plan clair.",
  date: ROAD_TO_EUROPE_FAITS.date,
  fin: ROAD_TO_EUROPE_FAITS.fin,
  fuseau: 'Africa/Douala',
  lieu: ROAD_TO_EUROPE_FAITS.salle,
  ville: ROAD_TO_EUROPE_FAITS.ville,
  pays: 'Cameroun',
  placesRestantes: ROAD_TO_EUROPE_FAITS.placesRestantes,
  lienInscription: ROAD_TO_EUROPE_FAITS.inscription,
  prix: ROAD_TO_EUROPE_FAITS.prix,
  // B73 (jeune au sommet) attend l'accord des parents ; en ligne, B85
  photoHero: ['B73', 'B85'],
  organisateurs: [{ nom: 'WAHHF Foundation', logo: 'wahhf' }],
  sections: {
    hero: { action: 'Réserver ma place', action2: 'Voir le programme', etiquette: 'La conférence a lieu à' },
    compte: { titre: 'Le compte à rebours a commencé' },
    pourquoi: {
      surtitre: 'Pourquoi venir',
      titre: 'Une journée pour changer de trajectoire.',
      intro: "Beaucoup de jeunes perdent du temps et de l'argent faute d'informations fiables. Road to Europe vous donne les bonnes cartes, au bon moment.",
    },
    route: {
      surtitre: 'Votre route',
      titre: "Cinq étapes jusqu'en Europe.",
      intro: "Le chemin demande des efforts, mais il est balisé. À Road to Europe, chaque étape est expliquée par des personnes qui l'ont vécue.",
    },
    voies: {
      surtitre: "Les voies vers l'Europe",
      titre: "Quatre voies légales vers l'Europe.",
      intro: "Chaque voie a ses conditions, ses délais et ses chances, et elles changent d'un pays à l'autre. Découvrez celle qui vous ressemble.",
    },
    programme: {
      surtitre: "Le programme en un coup d'œil",
      titre: 'Une journée, quatre temps forts.',
      intro: 'Comprendre, échanger, pratiquer, rencontrer : vous repartez avec des réponses claires et des contacts utiles.',
      action: 'Programme complet',
      action2: 'Les intervenants',
    },
    partenaires: {
      surtitre: 'Sponsors et partenaires',
      titre: "Faites partie de l'aventure.",
      intro: 'Entreprises, écoles, institutions et médias : rejoignez Road to Europe et rencontrez une jeunesse motivée.',
    },
    parents: {
      surtitre: 'Pour les parents',
      titre: 'Votre confiance compte.\nVoici nos\nengagements.',
      intro: "Road to Europe est organisé par WAHHF Foundation, une fondation identifiée et joignable, qui accompagne des jeunes dans leur projet vers l'Europe.",
    },
    faq: {
      surtitre: 'Vos questions',
      titre: 'Des réponses claires.',
      intro: "Les questions que l'on nous pose le plus souvent.",
      action: 'Nous écrire',
    },
    blog: { surtitre: 'Le blog', titre: 'À lire avant de partir.' },
    final: {
      titre: "Prenez la bonne route\nvers l'Europe.",
      intro: 'Ne laissez pas votre projet attendre : réservez votre place et repartez{{deVille}} avec un plan.',
      action: 'Réserver ma place',
      action2: 'Nous écrire',
    },
  },
  bandeau: [
    { mot: 'Deutschland', lang: 'de' },
    { mot: 'Lëtzebuerg', lang: 'lb' },
    { mot: 'Slovenija', lang: 'sl' },
    { mot: 'Italia', lang: 'it' },
    { mot: 'Ελλάδα', lang: 'el' },
    { mot: 'Portugal', lang: 'pt' },
    { mot: 'España', lang: 'es' },
    { mot: 'Danmark', lang: 'da' },
    { mot: 'Polska', lang: 'pl' },
    { mot: 'Shqipëria', lang: 'sq' },
  ],
  pourquoi: [
    { icon: 'ecoute', titre: 'Des conseils honnêtes, pas des promesses', texte: "Des intervenants qui connaissent l'Europe de l'intérieur vous disent ce qui marche, ce que ça coûte et ce qui prend du temps." },
    { icon: 'parcours', titre: 'Les bonnes démarches, étape par étape', texte: 'Langue, reconnaissance des diplômes, dossier, visa : vous repartez avec une feuille de route pour le pays qui vous correspond.' },
    { icon: 'partenaires', titre: 'Des partenaires qui forment et accompagnent', texte: "Écoles de langue, établissements, structures d'accompagnement : rencontrez-les en personne et posez vos questions." },
    { icon: 'temoignages', titre: 'Ceux qui sont partis témoignent', texte: 'Des jeunes déjà installés en Europe racontent leur parcours : les erreurs à éviter, les portes qui s’ouvrent.' },
  ],
  deroule: [
    { titre: 'Choisir son pays et sa voie', texte: 'Études, formation ou emploi, parmi 10 pays : trouvez la combinaison qui correspond à votre profil, à votre niveau et à votre budget.', lien: { libelle: 'Voir les 10 pays', to: '/mobilite-langues/accompagnement#pays' } },
    { titre: 'Apprendre la langue', texte: 'Allemand, italien, portugais, polonais… ou anglais selon le cursus : le niveau de langue ouvre ou ferme les portes. Visez le bon certificat.', lien: { libelle: 'Mobilité & Langues', to: '/mobilite-langues' } },
    { titre: 'Préparer son dossier', texte: 'Diplômes reconnus, traductions officielles, CV et lettre au format du pays : un dossier complet fait gagner des mois.', lien: { libelle: 'Accompagnement', to: '/mobilite-langues/accompagnement' } },
    { titre: 'Obtenir son visa', texte: "Rendez-vous à l'ambassade, pièces justificatives, entretien : préparez chaque détail et évitez les pièges.", lien: { libelle: 'Éviter les arnaques', to: '/accompagnement/eviter-les-arnaques' } },
    { titre: "Partir et s'installer", texte: 'Logement, inscription, assurance, premiers mois : arriver préparé change tout.', lien: { libelle: 'Candidater', to: '/candidater' } },
  ],
  // Liens des cartes (ronds flèche) : le guide des parcours, et l'accompagnement pour la 4e voie
  activites: [
    { icon: 'education', titre: 'Études', texte: 'Des universités publiques reconnues dans 10 pays, avec des cursus parfois en anglais et une admission à préparer tôt.', etiquette: 'Universités publiques', photo: ['A53'], to: '/accompagnement/comprendre-les-parcours' },
    { icon: 'atelier', titre: 'Formation professionnelle', texte: "Apprendre un métier en alternance, comme l'Ausbildung en Allemagne, dans les soins, l'artisanat, l'hôtellerie ou l'industrie.", etiquette: 'Formation en alternance', photo: ['A22'], to: '/accompagnement/comprendre-les-parcours' },
    { icon: 'emploi', titre: 'Emploi qualifié', texte: 'Votre diplôme ou votre expérience reconnus dans le pays choisi, pour travailler dans votre métier.', etiquette: 'Diplôme reconnu', photo: ['A41'], to: '/accompagnement/comprendre-les-parcours' },
    { icon: 'boussole', titre: 'Être accompagné', texte: 'La fondation vous aide à choisir le pays, préparer la langue et monter un dossier complet, sans intermédiaire inconnu.', etiquette: 'Accompagnement WAHHF', photo: ['A12'], to: '/mobilite-langues/accompagnement' },
  ],
  tempsForts: [
    { icon: 'presentation', titre: 'Comprendre', texte: 'Les voies légales vers les 10 pays, leurs conditions et leurs délais, expliqués simplement.' },
    { icon: 'echange', titre: 'Échanger', texte: 'Tables rondes avec des formateurs, des établissements et des jeunes déjà partis.' },
    { icon: 'atelier', titre: 'Pratiquer', texte: 'Ateliers : dossier, CV au format européen, visa, langue.' },
    { icon: 'partenaires', titre: 'Rencontrer', texte: 'Écoles, établissements et partenaires à leurs stands.' },
  ],
  intervenants: [],
  soutien: [
    { ton: 'soleil', surtitre: 'Pour les entreprises', titre: 'Devenir sponsor', texte: "Soutenez l'événement et gagnez en visibilité auprès de jeunes motivés.", to: '/agir#partenaire' },
    { ton: 'nuit', surtitre: 'Pour les écoles, institutions, médias', titre: 'Devenir partenaire', texte: 'Formez, informez et accompagnez avec nous.', to: '/agir#partenaire' },
  ],
  parents: {
    titrePromesses: 'Ce que nous promettons',
    titreJamais: 'Ce que nous ne promettrons jamais',
    promesses: [
      'Des informations vérifiées, avec leurs sources officielles',
      'Des organisateurs et des partenaires identifiés',
      'Des prix clairs, payés uniquement par les canaux officiels de la fondation',
    ],
    jamais: [
      'Un visa « garanti »',
      'Une admission ou un emploi sans démarches ni niveau de langue',
      'Des frais cachés, ou payés à un intermédiaire inconnu',
    ],
  },
  // A31 (parents et aînés au premier rang) ; A88 en remplacement
  photoParents: ['A31', 'A88'],
  faq: [
    { question: 'Quand et où a lieu Road to Europe ?', reponse: "{{quandOu}} Le lieu exact et l'heure d'ouverture sont annoncés dès qu'ils sont confirmés." },
    { question: "À qui s'adresse l'événement ?", reponse: "Aux jeunes qui préparent un projet d'études, de formation ou de travail en Europe, et à leurs parents. Aucun niveau de langue n'est exigé pour venir." },
    { question: "Combien coûte l'entrée et comment s'inscrire ?", reponse: "{{prix}} L'inscription se fait uniquement par les canaux officiels de la fondation. Ne payez jamais une place à un intermédiaire inconnu." },
    { question: 'Venir à Road to Europe me garantit-il un visa, une admission ou un emploi ?', reponse: 'Non. Les visas sont décidés par les ambassades, les admissions par les établissements et les embauches par les employeurs. Nous vous montrons les bonnes démarches et les bons contacts.' },
    { question: 'Quel niveau de langue faut-il pour partir ?', reponse: 'Cela dépend du pays et de la voie : chaque fiche pays du site indique les langues et les niveaux demandés.' },
    { question: "Mon entreprise peut-elle soutenir l'événement ?", reponse: 'Oui. Écrivez-nous depuis la page Agir ou le formulaire de contact.' },
  ],
  // Guides du site, en complément des actualités publiées (aucune aujourd'hui)
  blog: [
    { icon: 'pays', surtitre: 'Fiches pays', titre: 'Les 10 pays, un par un', texte: 'Langues demandées, études, formation et travail : ce qu’il faut savoir avant de choisir son pays.', lien: 'Voir les fiches pays', to: '/mobilite-langues/accompagnement#pays' },
    { icon: 'langues', surtitre: 'Mobilité & Langues', titre: 'Apprendre la langue du pays', texte: 'Les cours de langue de la fondation, du niveau A1 au niveau C1, et l’orientation vers l’Europe.', lien: 'Découvrir Mobilité & Langues', to: '/mobilite-langues' },
    { icon: 'alerte', surtitre: 'Éviter les arnaques', titre: 'Les signes qui doivent alerter', texte: 'Faux recruteurs, visas « garantis », frais cachés : comment les reconnaître avant de payer qui que ce soit.', lien: 'Lire le guide', to: '/accompagnement/eviter-les-arnaques' },
  ],
  photoFinale: ['A45', 'A99'],
  galerieAlbum: null,
});

export const EVENTS: Event[] = [ROAD_TO_EUROPE, ...(SHOW_DEMO ? [DEMO] : []), JOURNEE_2026_04_25];
