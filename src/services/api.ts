// Couche d'accès aux données — Prête à être connectée à une API Symfony (REST / API Platform)
// Toutes les valeurs d'exemple à valider par l'équipe WAHHF portent un marqueur explicite [TODO]

export const WAHHF_LOGO_URL = '/assets/aistudio/LogoWAHHF.c09000774835c3abb59a__1__a1f28366.png';

// Photos importées par Vite (copiées et hachées dans dist/) en WebP, trois largeurs chacune.
// Les JPEG d'origine restent dans src/assets/images comme sources, mais ne sont plus livrés.
import hero1376 from '../assets/images/hero-1376.webp';
import hero1024 from '../assets/images/hero-1024.webp';
import hero640 from '../assets/images/hero-640.webp';
import education1200 from '../assets/images/education-1200.webp';
import education800 from '../assets/images/education-800.webp';
import education480 from '../assets/images/education-480.webp';
import health1200 from '../assets/images/health-1200.webp';
import health800 from '../assets/images/health-800.webp';
import health480 from '../assets/images/health-480.webp';
import entrepreneurship1200 from '../assets/images/entrepreneurship-1200.webp';
import entrepreneurship800 from '../assets/images/entrepreneurship-800.webp';
import entrepreneurship480 from '../assets/images/entrepreneurship-480.webp';
import environment1200 from '../assets/images/environment-1200.webp';
import environment800 from '../assets/images/environment-800.webp';
import environment480 from '../assets/images/environment-480.webp';
import { galleryPhoto } from '../data/gallery';

// Vraies photos WAHHF (First Open Day & Boot Camp, Yaoundé), utilisées là où le sujet correspond.
const openDayAccompagnement = galleryPhoto('open-day-accompagnement');
const openDayMarcheSlogan = galleryPhoto('open-day-marche-slogan');
const openDayVisioconference = galleryPhoto('open-day-visioconference');

export const WAHHF_IMAGES = {
  hero: hero1376,
  education: education1200,
  health: health1200,
  entrepreneurship: entrepreneurship1200,
  environment: environment1200,
  /** Encadrant guidant une participante sur ordinateur (domaine Éducation) */
  openDayAccompagnement: openDayAccompagnement.src,
  /** Marche avec le slogan sur les t-shirts (domaine Droits et inclusion) */
  openDayMarcheSlogan: openDayMarcheSlogan.src,
  /** Intervention en visioconférence (domaine Mobilité & Langues) */
  openDayVisioconference: openDayVisioconference.src,
};

/** srcset de chaque photo, indexé par son URL principale (celle de WAHHF_IMAGES). */
const WAHHF_SRCSET: Record<string, string> = {
  [hero1376]: `${hero640} 640w, ${hero1024} 1024w, ${hero1376} 1376w`,
  [education1200]: `${education480} 480w, ${education800} 800w, ${education1200} 1200w`,
  [health1200]: `${health480} 480w, ${health800} 800w, ${health1200} 1200w`,
  [entrepreneurship1200]: `${entrepreneurship480} 480w, ${entrepreneurship800} 800w, ${entrepreneurship1200} 1200w`,
  [environment1200]: `${environment480} 480w, ${environment800} 800w, ${environment1200} 1200w`,
  [openDayAccompagnement.src]: openDayAccompagnement.srcSet,
  [openDayMarcheSlogan.src]: openDayMarcheSlogan.srcSet,
  [openDayVisioconference.src]: openDayVisioconference.srcSet,
};

/** Renvoie le srcset d'une photo WAHHF, ou undefined pour toute autre image (logo, URL externe). */
export function imageSrcSet(src: string): string | undefined {
  return WAHHF_SRCSET[src];
}

export interface DomainItem {
  id: string;
  number: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  link: string;
  programs: string[];
}

export interface GermanLevelCourse {
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  slug: string;
  title: string;
  /** Intitulé court affiché dans le fil des niveaux (contrat §6). */
  shortTitle: string;
  subtitle: string;
  duration: string;
  hours: string;
  prerequisites: string;
  nextSession: string;
  objectives: string[];
  canDo: string[];
  examTarget: string;
}

export interface CourseSession {
  id: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  title: string;
  format: 'En ligne' | 'Présentiel (Douala — à confirmer)' | 'Présentiel (Yaoundé — à confirmer)';
  days: string;
  duration: string;
  startDate: string;
  seatsAvailable: number;
  costLabel: 'Gratuit';
}

export interface CountryGuide {
  slug: string;
  name: string;
  flag: string;
  isEU: boolean;
  euNote?: string;
  languages: string[];
  summary: string;
  pathways: {
    studies: string;
    training: string;
    work: string;
  };
  steps: string[];
  officialLinks: { label: string; url: string; todoNote: string }[];
}

export interface PlacementQuestion {
  id: number;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  question: string;
  options: string[];
  correctIndex: number;
}

export interface NewsArticle {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content: string[];
  image: string;
  readTime: string;
}

export interface ApplicationPayload {
  fullName: string;
  email: string;
  phone: string;
  residenceCountry: string;
  city: string;
  wishType: 'cours_allemand' | 'accompagnement_europe' | 'les_deux';
  targetCountry: string;
  currentGermanLevel: string;
  preferredFormat: string;
  message: string;
  gdprConsent: boolean;
}

export interface DonationPayload {
  amount: number;
  frequency: 'unique' | 'mensuel';
  allocation: 'general' | 'academie_langues' | 'sante_education' | 'materiel_pedagogique';
  donorName: string;
  donorEmail: string;
  paymentMethod: 'mobile_money_sim' | 'card_sim' | 'bank_transfer_sim';
  anonymous: boolean;
  gdprConsent: boolean;
}

export const DOMAINS_DATA: DomainItem[] = [
  {
    id: 'education',
    number: '01',
    slug: 'education',
    title: 'Éducation',
    shortDesc: 'Soutien scolaire, réhabilitation de salles de classe, bourses d’études et bibliothèques communautaires.',
    fullDesc: 'Nous œuvrons pour que chaque enfant et chaque jeune dispose des fournitures, de l’encadrement pédagogique et d’un cadre d’apprentissage digne.',
    image: WAHHF_IMAGES.openDayAccompagnement,
    link: '/nos-actions?domaine=education',
    programs: [
      'Kits scolaires et manuels pour les élèves en zone rurale',
      'Bibliothèques communautaires et espaces de lecture',
      'Mentorat académique et orientation post-baccalauréat',
    ],
  },
  {
    id: 'sante',
    number: '02',
    slug: 'sante',
    title: 'Santé',
    shortDesc: 'Campagnes de prévention, santé maternelle et infantile, accès aux soins de base et sensibilisation.',
    fullDesc: 'En lien avec les centres de santé locaux, nos équipes bénévoles organisent des journées de dépistage gratuit, d’éducation sanitaire et de soutien aux mères.',
    image: WAHHF_IMAGES.health,
    link: '/nos-actions?domaine=sante',
    programs: [
      'Consultations préventives et sensibilisation communautaire',
      'Accompagnement de la santé maternelle et infantile',
      'Accès à l’eau potable et à l’hygiène en milieu scolaire',
    ],
  },
  {
    id: 'entrepreneuriat',
    number: '03',
    slug: 'entrepreneuriat',
    title: 'Entrepreneuriat des jeunes',
    shortDesc: 'Incubation solidaire, littératie numérique, gestion de micro-projets et mentorat par des professionnels.',
    fullDesc: 'Accompagner les jeunes porteurs d’initiatives locales pour structurer des activités génératrices de revenus durables et éthiques.',
    image: WAHHF_IMAGES.entrepreneurship,
    link: '/nos-actions?domaine=entrepreneuriat',
    programs: [
      'Ateliers gratuits de gestion et de comptabilité simplifiée',
      'Initiation aux outils numériques et à la bureautique',
      'Mise en réseau avec les experts solidaires du groupe IROKO',
    ],
  },
  {
    id: 'environnement',
    number: '04',
    slug: 'environnement',
    title: 'Environnement',
    shortDesc: 'Reboisement communautaire, agroécologie, gestion des déchets et éducation climatique des jeunes.',
    fullDesc: 'Protéger les écosystèmes locaux et transmettre aux jeunes générations les gestes d’une agriculture durable et respectueuse des sols.',
    image: WAHHF_IMAGES.environment,
    link: '/nos-actions?domaine=environnement',
    programs: [
      'Pépinières villageoises et campagnes de reboisement',
      'Sensibilisation au tri et à l’assainissement urbain',
      'Formation aux pratiques agroécologiques durables',
    ],
  },
  {
    id: 'droits-inclusion',
    number: '05',
    slug: 'droits-inclusion',
    title: 'Droits et inclusion',
    shortDesc: 'Promotion de l’égalité des chances, inclusion des personnes vulnérables et accès à l’information civique.',
    fullDesc: 'Défendre la dignité humaine en luttant contre toutes les formes d’exclusion sociale, économique ou liée au handicap.',
    image: WAHHF_IMAGES.openDayMarcheSlogan,
    link: '/nos-actions?domaine=droits-inclusion',
    programs: [
      'Autonomisation des jeunes femmes et leadership communautaire',
      'Soutien à la scolarisation des jeunes en situation de handicap',
      'Permanences d’écoute et d’orientation sociale gratuite',
    ],
  },
  {
    id: 'mobilite-langues',
    number: '06',
    slug: 'mobilite-langues',
    title: 'Mobilité & Langues',
    shortDesc: 'Académie d’allemand gratuite (A1 à C1) et accompagnement transparent vers 10 pays européens.',
    fullDesc: 'Un programme 100 % gratuit, financé par IROKO et nos donateurs, pour apprendre l’allemand et préparer un projet d’études, de formation ou de mobilité en toute sécurité.',
    image: WAHHF_IMAGES.openDayVisioconference,
    link: '/mobilite-langues',
    programs: [
      'Accompagnement des cours de langue allemande du niveau A1 au C1',
      'Orientation documentée vers 10 pays européens',
      'Prévention active contre les arnaques et fausses promesses de visa',
    ],
  },
];

export const GERMAN_LEVELS_DATA: GermanLevelCourse[] = [
  {
    level: 'A1',
    slug: 'a1',
    title: 'Niveau A1 — Découverte & Bases',
    shortTitle: 'Découverte',
    subtitle: 'Comprendre et utiliser des expressions familières et quotidiennes.',
    duration: '10 à 12 semaines (indicatif — TODO)',
    hours: '80 heures d’accompagnement',
    prerequisites: 'Aucun prérequis en allemand. Ouvert aux grands débutants.',
    nextSession: 'Septembre 2026 (TODO : confirmer date)',
    objectives: [
      'Maîtriser l’alphabet, la prononciation et les structures de phrase simples',
      'Se présenter, poser des questions simples sur l’environnement immédiat',
      'Acquérir le vocabulaire de la vie quotidienne (famille, logement, achats, horaires)',
    ],
    canDo: [
      'Se présenter et présenter quelqu’un en allemand',
      'Remplir un formulaire simple avec ses coordonnées personnelles',
      'Comprendre des annonces courtes et des indications simples',
    ],
    examTarget: 'Préparation au Goethe-Zertifikat A1 : Start Deutsch 1 / telc Deutsch A1 (TODO : à vérifier)',
  },
  {
    level: 'A2',
    slug: 'a2',
    title: 'Niveau A2 — Survie & Échanges Courants',
    shortTitle: 'Échanges courants',
    subtitle: 'Communiquer lors de tâches simples et habituelles du quotidien.',
    duration: '10 à 12 semaines (indicatif — TODO)',
    hours: '90 heures d’accompagnement',
    prerequisites: 'Avoir validé le niveau A1 ou réussi le test d’orientation gratuit.',
    nextSession: 'Octobre 2026 (TODO : confirmer date)',
    objectives: [
      'Exprimer son parcours scolaire, son environnement et ses besoins directs',
      'Maîtriser le passé composé (Perfekt), les verbes de modalité et les subordonnées de base',
      'Lire des courriels courts, des offres d’information et des documents usuels',
    ],
    canDo: [
      'Décrire sa formation et ses expériences de façon simple',
      'Échanger sur des sujets familiers (santé, travail, déplacements)',
      'Rédiger des messages courts et structurés',
    ],
    examTarget: 'Préparation au Goethe-Zertifikat A2 / telc Deutsch A2 (TODO : à vérifier)',
  },
  {
    level: 'B1',
    slug: 'b1',
    title: 'Niveau B1 — Seuil d’Autonomie',
    shortTitle: 'Autonomie',
    subtitle: 'Être autonome dans la plupart des situations de voyage, d’études ou de formation.',
    duration: '12 à 14 semaines (indicatif — TODO)',
    hours: '120 heures d’accompagnement',
    prerequisites: 'Avoir validé le niveau A2.',
    nextSession: 'Octobre 2026 (TODO : confirmer date)',
    objectives: [
      'Comprendre les points essentiels d’une discussion claire sur le travail, l’école ou les loisirs',
      'Raconter un événement, expliquer un projet d’études ou de formation professionnelle (Ausbildung)',
      'Rédiger une lettre de motivation et un curriculum vitae aux normes germanophones',
    ],
    canDo: [
      'Participer sans préparation à une conversation sur des sujets familiers',
      'Défendre brièvement une opinion ou expliquer un choix de parcours',
      'Se débrouiller dans les démarches administratives courantes en langue allemande',
    ],
    examTarget: 'Préparation au Goethe-Zertifikat B1 / telc Deutsch B1 (TODO : à vérifier)',
  },
  {
    level: 'B2',
    slug: 'b2',
    title: 'Niveau B2 — Indépendance & Fluidité',
    shortTitle: 'Indépendance',
    subtitle: 'Communiquer avec spontanéité et comprendre des textes complexes.',
    duration: '14 à 16 semaines (indicatif — TODO)',
    hours: '140 heures d’accompagnement',
    prerequisites: 'Avoir validé le niveau B1.',
    nextSession: 'Novembre 2026 (TODO : confirmer date)',
    objectives: [
      'Comprendre le contenu essentiel de sujets concrets ou abstraits dans un texte complexe',
      'Participer à des discussions techniques dans son domaine de spécialité',
      'S’exprimer de façon claire, détaillée et nuancée à l’oral comme à l’écrit',
    ],
    canDo: [
      'Suivre des cours préparatoires ou une formation professionnelle exigeante en allemand',
      'Argumenter de manière structurée lors d’un entretien académique ou professionnel',
      'Rédiger des synthèses et des courriers formels précis',
    ],
    examTarget: 'Préparation au Goethe-Zertifikat B2 / telc Deutsch B2 (TODO : à vérifier)',
  },
  {
    level: 'C1',
    slug: 'c1',
    title: 'Niveau C1 — Maîtrise Académique & Professionnelle',
    shortTitle: 'Maîtrise',
    subtitle: 'Utiliser la langue de façon souple et efficace dans la vie universitaire et sociale.',
    duration: '16 semaines (indicatif — TODO)',
    hours: '160 heures d’accompagnement',
    prerequisites: 'Avoir validé le niveau B2.',
    nextSession: 'Janvier 2027 (TODO : confirmer date)',
    objectives: [
      'Comprendre une grande gamme de textes longs et exigeants et saisir les significations implicites',
      'S’exprimer spontanément et couramment sans chercher ses mots de façon apparente',
      'Maîtriser la méthodologie d’écriture scientifique et académique universitaire',
    ],
    canDo: [
      'Suivre un cursus universitaire complet en langue allemande',
      'Présenter des exposés complexes et répondre à des questions pointues',
      'Rédiger des textes structurés sur des sujets académiques complexes',
    ],
    examTarget: 'Préparation au TestDaF / Goethe-Zertifikat C1 / telc Deutsch C1 Hochschule (TODO : à vérifier)',
  },
];

export const COURSE_SESSIONS_DATA: CourseSession[] = [
  {
    id: 'sess-a1-online',
    level: 'A1',
    title: 'Allemand A1 — Fondations & Communication Quotidienne',
    format: 'En ligne',
    days: 'Lundi, Mercredi, Vendredi (18h00 – 20h00)',
    duration: '12 semaines',
    startDate: '14 Septembre 2026 (TODO)',
    seatsAvailable: 24,
    costLabel: 'Gratuit',
  },
  {
    id: 'sess-a1-dla',
    level: 'A1',
    title: 'Allemand A1 — Cohorte Présentiel Douala',
    format: 'Présentiel (Douala — à confirmer)',
    days: 'Mardi, Jeudi (16h00 – 18h30) & Samedi matin',
    duration: '12 semaines',
    startDate: '21 Septembre 2026 (TODO)',
    seatsAvailable: 18,
    costLabel: 'Gratuit',
  },
  {
    id: 'sess-a2-online',
    level: 'A2',
    title: 'Allemand A2 — Consolidation & Autonomie Quotidienne',
    format: 'En ligne',
    days: 'Mardi, Jeudi (18h30 – 20h30) & Samedi (10h00 – 12h00)',
    duration: '12 semaines',
    startDate: '05 Octobre 2026 (TODO)',
    seatsAvailable: 20,
    costLabel: 'Gratuit',
  },
  {
    id: 'sess-b1-online',
    level: 'B1',
    title: 'Allemand B1 — Parcours Études & Formation (Ausbildung)',
    format: 'En ligne',
    days: 'Lundi, Mercredi, Vendredi (18h30 – 21h00)',
    duration: '14 semaines',
    startDate: '12 Octobre 2026 (TODO)',
    seatsAvailable: 20,
    costLabel: 'Gratuit',
  },
  {
    id: 'sess-b1-yde',
    level: 'B1',
    title: 'Allemand B1 — Atelier Intensif Yaoundé',
    format: 'Présentiel (Yaoundé — à confirmer)',
    days: 'Mercredi, Vendredi (16h00 – 18h30) & Samedi',
    duration: '14 semaines',
    startDate: '19 Octobre 2026 (TODO)',
    seatsAvailable: 15,
    costLabel: 'Gratuit',
  },
  {
    id: 'sess-b2-online',
    level: 'B2',
    title: 'Allemand B2 — Expression Avancée & Dossiers Techniques',
    format: 'En ligne',
    days: 'Mardi, Jeudi (18h30 – 21h00) & Samedi (14h00 – 16h30)',
    duration: '15 semaines',
    startDate: '02 Novembre 2026 (TODO)',
    seatsAvailable: 16,
    costLabel: 'Gratuit',
  },
  {
    id: 'sess-c1-online',
    level: 'C1',
    title: 'Allemand C1 — Préparation Universitaire & TestDaF',
    format: 'En ligne',
    days: 'Lundi, Jeudi (19h00 – 21h30) & Samedi (09h00 – 12h00)',
    duration: '16 semaines',
    startDate: '11 Janvier 2027 (TODO)',
    seatsAvailable: 14,
    costLabel: 'Gratuit',
  },
];

export const COUNTRIES_DATA: CountryGuide[] = [
  {
    slug: 'allemagne',
    name: 'Allemagne',
    flag: '🇩🇪',
    isEU: true,
    languages: ['Allemand (langue officielle)', 'Anglais (certains cursus internationaux)'],
    summary: 'Pays partenaire historique de la fondation, l’Allemagne propose des voies structurées pour les études universitaires, la formation professionnelle duale (Ausbildung) et la mobilité qualifiée.',
    pathways: {
      studies: 'Admission universitaire (Studienkolleg, Bachelor, Master) soumise à la reconnaissance du diplôme (Anabin / uni-assist), à un niveau d’allemand B2/C1 (ou anglais selon cursus) et à la preuve de ressources financières réglementaires.',
      training: 'Formation professionnelle duale (Ausbildung) alliant école théorique et apprentissage en entreprise, généralement accessible à partir du niveau B1/B2 d’allemand.',
      work: 'Mobilité professionnelle encadrée par la loi sur l’immigration qualifiée (Fachkräfteeinwanderungsgesetz) avec reconnaissance des diplômes.',
    },
    steps: [
      'Apprentissage et certification officielle de la langue allemande (B1 à C1 selon le projet)',
      'Vérification de l’équivalence des diplômes et constitution du dossier académique ou professionnel',
      'Candidature auprès de l’établissement d’enseignement ou de formation',
      'Demande de rendez-vous et dépôt officiel du dossier auprès de l’Ambassade d’Allemagne compétente',
    ],
    officialLinks: [
      { label: 'Make it in Germany (Portail officiel du gouvernement fédéral)', url: 'https://www.make-it-in-germany.com', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'DAAD — Office allemand d’échanges universitaires', url: 'https://www.daad.de', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'Ambassade d’Allemagne au Cameroun (Yaoundé)', url: 'https://jaunde.diplo.de', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'luxembourg',
    name: 'Luxembourg',
    flag: '🇱🇺',
    isEU: true,
    languages: ['Français', 'Allemand', 'Luxembourgeois', 'Anglais'],
    summary: 'Au cœur de l’Europe, le Grand-Duché de Luxembourg offre un environnement multilingue (français, allemand, anglais) pour les études supérieures et la recherche.',
    pathways: {
      studies: 'Cursus bilingues ou trilingues à l’Université du Luxembourg, soumis aux conditions d’admission académiques et aux procédures d’autorisation de séjour étudiant.',
      training: 'Formations continues et stages académiques encadrés par les conventions universitaires.',
      work: 'Autorisation de séjour pour travailleur salarié délivrée par la Direction de l’immigration avant l’entrée sur le territoire.',
    },
    steps: [
      'Identification du programme multilingue (français/allemand/anglais)',
      'Dépôt du dossier d’admission universitaire dans les délais officiels',
      'Demande d’autorisation temporaire de séjour (ATS) auprès du ministère compétent',
      'Démarches consulaires officielles et préparation à l’installation',
    ],
    officialLinks: [
      { label: 'Guichet.lu — Portail administratif du Grand-Duché de Luxembourg', url: 'https://guichet.public.lu', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'Université du Luxembourg', url: 'https://www.uni.lu', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'slovenie',
    name: 'Slovénie',
    flag: '🇸🇮',
    isEU: true,
    languages: ['Slovène', 'Anglais (programmes internationaux)'],
    summary: 'Pays d’Europe centrale membre de l’Union européenne, reconnu pour ses universités publiques (Ljubljana, Maribor, Primorska) et sa qualité de vie étudiante.',
    pathways: {
      studies: 'Portail national eVŠ pour les candidatures aux universités slovènes en licence, master et doctorat.',
      training: 'Échanges académiques, écoles d’été et stages techniques.',
      work: 'Permis unique de séjour et de travail géré par les unités administratives slovènes.',
    },
    steps: [
      'Choix du programme via le portail académique national eVŠ',
      'Procédure de reconnaissance des diplômes antérieurs',
      'Constitution du dossier de permis de séjour temporaire pour études',
      'Validation consulaire auprès de la représentation diplomatique compétente',
    ],
    officialLinks: [
      { label: 'Study in Slovenia — Portail officiel', url: 'https://studyinslovenia.si', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'Portail gouvernemental gov.si (Immigration)', url: 'https://www.gov.si', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'italie',
    name: 'Italie',
    flag: '🇮🇹',
    isEU: true,
    languages: ['Italien', 'Anglais (cursus internationaux)'],
    summary: 'Dotée d’une longue tradition universitaire et de programmes de bourses régionales (DSU), l’Italie accueille chaque année des étudiants internationaux.',
    pathways: {
      studies: 'Pré-inscription obligatoire sur la plateforme officielle Universitaly, déclaration de valeur (Dichiarazione di Valore) ou attestation CIMEA.',
      training: 'Formations techniques supérieures (ITS) et écoles spécialisées.',
      work: 'Dispositifs réglementés par les décrets annuels de flux (Decreto Flussi).',
    },
    steps: [
      'Préparation linguistique (italien ou anglais) et sélection de l’université',
      'Pré-inscription sur le portail officiel Universitaly',
      'Préparation des pièces justificatives académiques et financières',
      'Dépôt de la demande de visa d’études auprès des services consulaires italiens',
    ],
    officialLinks: [
      { label: 'Universitaly — Portail officiel du Ministère italien', url: 'https://www.universitaly.it', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'Visto per l’Italia — Ministère des Affaires Étrangères', url: 'https://vistoperitalia.esteri.it', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'grece',
    name: 'Grèce',
    flag: '🇬🇷',
    isEU: true,
    languages: ['Grec moderne', 'Anglais (programmes internationaux)'],
    summary: 'Carrefour méditerranéen membre de l’UE, la Grèce développe des programmes universitaires anglophones et des filières en sciences, ingénierie et études maritimes.',
    pathways: {
      studies: 'Cursus universitaires publics et programmes internationaux encadrés par Study in Greece.',
      training: 'Formations professionnelles dans les secteurs du tourisme, du transport maritime et de l’énergie.',
      work: 'Autorisations de séjour et de travail selon les accords et besoins sectoriels réglementaires.',
    },
    steps: [
      'Orientation académique et vérification des prérequis linguistiques',
      'Dossier d’admission auprès de l’établissement hellénique',
      'Légalisation / apostille des documents académiques',
      'Procédure consulaire officielle auprès de l’Ambassade de Grèce compétente',
    ],
    officialLinks: [
      { label: 'Study in Greece — Portail officiel', url: 'https://studyingreece.edu.gr', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'Ministère grec de la Migration et de l’Asile', url: 'https://migration.gov.gr', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    isEU: true,
    languages: ['Portugais', 'Anglais'],
    summary: 'Le Portugal propose un réseau d’universités et d’instituts polytechniques reconnus en Europe, avec un accueil structuré pour les étudiants internationaux.',
    pathways: {
      studies: 'Candidature sous le statut d’étudiant international (Estatuto do Estudante Internacional) dans les universités et instituts polytechniques.',
      training: 'Cursos Técnicos Superiores Profissionais (CTeSP) axés sur la pratique.',
      work: 'Visa de travail ou de recherche d’emploi encadré par l’AIMA et les services consulaires portugais.',
    },
    steps: [
      'Apprentissage des bases du portugais ou certification d’anglais',
      'Candidature directe auprès de l’université ou de l’institut polytechnique',
      'Obtention de la lettre d’acceptation officielle',
      'Demande de visa national d’études (D4) via le portail officiel des visas portugais',
    ],
    officialLinks: [
      { label: 'Study & Research in Portugal — Portail officiel', url: 'https://www.study-research.pt', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'Portail des Visas — Ministère des Affaires Étrangères du Portugal', url: 'https://vistos.mne.gov.pt', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'espagne',
    name: 'Espagne',
    flag: '🇪🇸',
    isEU: true,
    languages: ['Espagnol (Castillan)', 'Anglais'],
    summary: 'L’Espagne dispose d’un vaste réseau d’universités publiques et de centres de formation professionnelle supérieure (Formación Profesional de Grado Superior).',
    pathways: {
      studies: 'Admission universitaire via l’homologation du diplôme ou l’accréditation UNEDasiss.',
      training: 'Cycles de formation professionnelle supérieure (FP) très recherchés dans les secteurs techniques et sanitaires.',
      work: 'Procédures d’autorisation initiale de résidence et de travail salarié.',
    },
    steps: [
      'Démarche d’homologation ou d’accréditation académique (UNEDasiss)',
      'Pré-inscription auprès de la communauté autonome ou de l’université choisie',
      'Constitution du dossier consulaire complet (assurance, ressources, hébergement)',
      'Dépôt auprès du Consulat d’Espagne compétent',
    ],
    officialLinks: [
      { label: 'SEPIE — étudier en Espagne (Ministère des Universités)', url: 'https://sepie.es', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'Portail de l’Immigration — Gouvernement d’Espagne', url: 'https://extranjeros.inclusion.gob.es', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'danemark',
    name: 'Danemark',
    flag: '🇩🇰',
    isEU: true,
    languages: ['Danois', 'Anglais (très répandu à l’université)'],
    summary: 'Réputé pour sa pédagogie collaborative et ses cursus en ingénierie, énergies renouvelables et sciences de la vie enseignés en anglais.',
    pathways: {
      studies: 'Programmes de Bachelor et Master enseignés en anglais, coordonnés via le portail officiel Study in Denmark.',
      training: 'Stages académiques et programmes de recherche appliquée.',
      work: 'Dispositifs encadrés par l’Agence danoise pour le recrutement international et l’intégration (SIRI).',
    },
    steps: [
      'Validation d’un niveau élevé d’anglais (IELTS / TOEFL) et des prérequis académiques',
      'Candidature via le portail national Optagelse.dk ou directement auprès de l’université',
      'Ouverture du dossier ST1 avec l’établissement d’accueil',
      'Demande de permis de séjour auprès de l’agence officielle SIRI (nyidanmark.dk)',
    ],
    officialLinks: [
      { label: 'Study in Denmark — Portail officiel du Ministère', url: 'https://studyindenmark.dk', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'New to Denmark (nyidanmark.dk) — Portail officiel SIRI', url: 'https://www.nyidanmark.dk', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'pologne',
    name: 'Pologne',
    flag: '🇵🇱',
    isEU: true,
    languages: ['Polonais', 'Anglais (nombreux cursus internationaux)'],
    summary: 'Pôle académique et technologique majeur d’Europe centrale, la Pologne propose des cursus universitaires en anglais et en polonais dans les sciences, la médecine et l’informatique.',
    pathways: {
      studies: 'Candidature aux universités publiques et écoles polytechniques, encadrée par l’agence nationale NAWA.',
      training: 'Années préparatoires linguistiques et écoles techniques.',
      work: 'Autorisation de travail délivrée par la Voïvodie compétente avant la demande de visa national.',
    },
    steps: [
      'Sélection d’un établissement accrédité sur le portail gouvernemental Study in Poland',
      'Vérification et apostille/légalisation du diplôme de fin d’études secondaires ou supérieures',
      'Obtention de l’attestation officielle d’admission ministérielle',
      'Enregistrement consulaire via le système officiel e-Konsulat',
    ],
    officialLinks: [
      { label: 'Study in Poland — Agence Nationale NAWA', url: 'https://study.gov.pl', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'Office des Étrangers de Pologne (Urząd do Spraw Cudzoziemców)', url: 'https://www.gov.pl/web/udsc', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
  {
    slug: 'albanie',
    name: 'Albanie',
    flag: '🇦🇱',
    isEU: false,
    euNote: 'Information essentielle : L’Albanie n’est PAS membre de l’Union européenne (elle possède le statut de pays candidat). Elle ne fait pas non plus partie de l’espace Schengen. Les visas et titres de séjour albanais ne permettent pas de circuler ou de travailler dans l’Union européenne.',
    languages: ['Albanais', 'Anglais / Italien (dans certains cursus universitaires)'],
    summary: 'Située dans les Balkans occidentaux, l’Albanie développe des filières universitaires accessibles et des programmes d’échanges régionaux, tout en relevant d’un cadre juridique national distinct de l’Union européenne.',
    pathways: {
      studies: 'Inscriptions dans les universités publiques et privées accréditées à Tirana et dans les principales villes du pays.',
      training: 'Formations professionnelles en développement territorial, tourisme et technologies.',
      work: 'Permis unique demandé en ligne via le portail gouvernemental e-Albania.',
    },
    steps: [
      'Prendre connaissance du statut non-membre de l’UE de l’Albanie',
      'Obtenir une admission auprès d’un établissement accrédité par l’agence ASCAL',
      'Déposer la demande de visa de type D en ligne sur le portail officiel e-Visa de la République d’Albanie',
      'Effectuer la demande de permis de séjour sur e-Albania après l’arrivée légale',
    ],
    officialLinks: [
      { label: 'e-Visa Albania — Système officiel de visa en ligne', url: 'https://e-visa.al', todoNote: 'TODO : vérifier lien officiel' },
      { label: 'e-Albania — Portail officiel des services publics', url: 'https://e-albania.al', todoNote: 'TODO : vérifier lien officiel' },
    ],
  },
];

export const PLACEMENT_QUESTIONS: PlacementQuestion[] = [
  { id: 1, level: 'A1', question: 'Wie ______ Sie? — Ich heiße Marie.', options: ['heißen', 'heißt', 'heiße', 'sein'], correctIndex: 0 },
  { id: 2, level: 'A1', question: 'Woher kommst du? — Ich komme ______ Kamerun.', options: ['in', 'aus', 'nach', 'von'], correctIndex: 1 },
  { id: 3, level: 'A1', question: 'Ich trinke gern Wasser, aber mein Bruder ______ lieber Tee.', options: ['trinken', 'trinkst', 'trinkt', 'trinke'], correctIndex: 2 },
  { id: 4, level: 'A1', question: 'Am Montag habe ich ______ Zeit.', options: ['kein', 'keine', 'keinen', 'nicht'], correctIndex: 1 },
  { id: 5, level: 'A2', question: 'Gestern ______ ich meine Großmutter in Douala besucht.', options: ['bin', 'habe', 'hatte', 'werde'], correctIndex: 1 },
  { id: 6, level: 'A2', question: 'Ich lerne Deutsch, ______ ich in Deutschland studieren möchte.', options: ['denn', 'weil', 'aber', 'oder'], correctIndex: 1 },
  { id: 7, level: 'A2', question: 'Können Sie mir bitte sagen, wann der Zug ______?', options: ['abfährt', 'fährt ab', 'abfahren', 'abgefahren'], correctIndex: 0 },
  { id: 8, level: 'A2', question: 'Das Buch liegt auf ______ Tisch.', options: ['den', 'dem', 'der', 'das'], correctIndex: 1 },
  { id: 9, level: 'B1', question: 'Obwohl es stark geregnet hat, ______ wir pünktlich angekommen.', options: ['haben', 'sind', 'wurden', 'hatten'], correctIndex: 1 },
  { id: 10, level: 'B1', question: 'Wenn ich mehr Zeit hätte, ______ ich noch eine weitere Sprache lernen.', options: ['werde', 'würde', 'will', 'wollte'], correctIndex: 1 },
  { id: 11, level: 'B1', question: 'Er interessiert sich sehr ______ erneuerbare Energien.', options: ['auf', 'über', 'für', 'mit'], correctIndex: 2 },
  { id: 12, level: 'B1', question: 'Das ist die Studentin, ______ Projekt gestern ausgezeichnet wurde.', options: ['die', 'deren', 'dessen', 'denen'], correctIndex: 1 },
  { id: 13, level: 'B2', question: 'Die Unterlagen müssen bis spätestens Freitag ______ werden.', options: ['einreichen', 'eingereicht', 'einzureichen', 'reichte ein'], correctIndex: 1 },
  { id: 14, level: 'B2', question: 'Je intensiver man sich vorbereitet, ______ sicherer fühlt man sich im Gespräch.', options: ['umso', 'als', 'wie', 'damit'], correctIndex: 0 },
  { id: 15, level: 'B2', question: 'Aufgrund ______ schlechten Wetters wurde die Veranstaltung verschoben.', options: ['dem', 'des', 'der', 'den'], correctIndex: 1 },
  { id: 16, level: 'B2', question: 'Er tat so, als ob er von der Änderung nichts ______ hätte.', options: ['wissen', 'gewusst', 'wusste', 'weiß'], correctIndex: 1 },
  { id: 17, level: 'C1', question: 'Die Studie gelangt zu dem ______, dass frühzeitige Förderung entscheidend ist.', options: ['Schluss', 'Ende', 'Ziel', 'Punkt'], correctIndex: 0 },
  { id: 18, level: 'C1', question: 'Der Referent berichtete, die Ergebnisse ______ bereits unabhängig geprüft worden.', options: ['sind', 'seien', 'wären', 'würden'], correctIndex: 1 },
  { id: 19, level: 'C1', question: 'Ungeachtet ______ bestehenden Herausforderungen verlief das Projekt erfolgreich.', options: ['die', 'den', 'der', 'des'], correctIndex: 2 },
  { id: 20, level: 'C1', question: 'Diese Maßnahme bedarf ______ sorgfältigen Abwägung aller Faktoren.', options: ['eine', 'einer', 'einem', 'einen'], correctIndex: 1 },
];

export const THEMATIC_GUIDES: Record<string, {
  slug: string;
  title: string;
  subtitle: string;
  sections: { heading: string; body: string; bullets?: string[] }[];
}> = {
  'comprendre-les-parcours': {
    slug: 'comprendre-les-parcours',
    title: 'Comprendre les parcours vers l’Europe',
    subtitle: 'Distinguer clairement les études universitaires, la formation professionnelle et la mobilité liée au travail.',
    sections: [
      {
        heading: 'Les études supérieures (Bachelor, Master, Doctorat)',
        body: 'Le parcours académique s’adresse aux titulaires du baccalauréat ou d’un diplôme universitaire souhaitant poursuivre une formation théorique et de recherche dans une université publique ou privée accréditée.',
        bullets: [
          'Nécessite la reconnaissance officielle du diplôme de fin d’études secondaires ou supérieures',
          'Exige un niveau de langue certifié (souvent B2 ou C1 dans la langue d’enseignement)',
          'Implique la justification de ressources financières bloquées ou d’une bourse officielle selon la réglementation du pays d’accueil',
        ],
      },
      {
        heading: 'La formation professionnelle (ex. Ausbildung en Allemagne)',
        body: 'La formation professionnelle en alternance combine des cours dans une école professionnelle et une pratique rémunérée en entreprise pendant 2 à 3 ans.',
        bullets: [
          'Excellente maîtrise de la langue du pays indispensable (minimum B1 solide ou B2)',
          'Candidature directe auprès des entreprises formatrices sans frais d’intermédiaire',
          'Contrat de formation officiel requis avant toute démarche consulaire',
        ],
      },
      {
        heading: 'La mobilité professionnelle qualifiée',
        body: 'Destinée aux professionnels disposant déjà d’un diplôme supérieur ou technique reconnu et d’une expérience vérifiable.',
        bullets: [
          'Procédure préalable d’équivalence ou de reconnaissance des qualifications professionnelles',
          'Respect strict des règles nationales des ministères du travail et de l’immigration',
        ],
      },
    ],
  },
  'preparer-son-dossier': {
    slug: 'preparer-son-dossier',
    title: 'Préparer son dossier avec rigueur',
    subtitle: 'Les bonnes pratiques documentaires pour constituer un dossier authentique, lisible et conforme.',
    sections: [
      {
        heading: 'Authenticité absolue des documents',
        body: 'Tout document falsifié ou inexact entraîne un refus immédiat et des interdictions durables auprès des autorités consulaires. WAHHF sensibilise chaque candidat à l’importance d’un dossier 100 % authentique.',
        bullets: [
          'Rassembler les relevés de notes et diplômes originaux',
          'Effectuer les démarches de légalisation ou d’authentification uniquement auprès des administrations officielles',
          'Faire traduire ses pièces par des traducteurs assermentés reconnus',
        ],
      },
      {
        heading: 'Curriculum Vitae et lettre de motivation',
        body: 'Chaque pays européen possède ses propres codes de présentation (par exemple le format tabulaire clair en Allemagne ou le format Europass).',
        bullets: [
          'Mettre en valeur son parcours réel avec honnêteté et clarté',
          'Expliquer la cohérence entre ses études passées et le projet visé',
          'Faire relire ses textes lors des ateliers gratuits d’accompagnement WAHHF',
        ],
      },
    ],
  },
  'apprendre-la-langue': {
    slug: 'apprendre-la-langue',
    title: 'Apprendre la langue du pays : la clé de l’autonomie',
    subtitle: 'Pourquoi la maîtrise linguistique précède toujours les démarches administratives.',
    sections: [
      {
        heading: 'La langue protège et rend autonome',
        body: 'Partir sans maîtriser la langue du pays d’accueil expose à l’isolement, à l’échec académique et à la précarité. C’est pourquoi WAHHF place l’apprentissage linguistique au tout premier rang.',
        bullets: [
          'Pratique régulière de la compréhension orale, de l’expression écrite et du dialogue',
          'Progression structurée selon le Cadre européen commun de référence pour les langues (A1 à C1)',
          'Préparation méthodique aux examens officiels reconnus internationalement',
        ],
      },
    ],
  },
  's-installer': {
    slug: 's-installer',
    title: 'Préparer son arrivée et son intégration',
    subtitle: 'Se préparer aux réalités pratiques, culturelles et administratives de la vie en Europe.',
    sections: [
      {
        heading: 'Les premières démarches à l’arrivée',
        body: 'Une installation réussie se prépare plusieurs mois avant le départ : logement étudiant, assurance maladie, inscription municipale et ouverture de compte.',
        bullets: [
          'Anticiper la recherche de logement via les résidences universitaires officielles (ex. Studierendenwerk)',
          'Comprendre le fonctionnement de l’enregistrement de domicile (Anmeldung) et de l’assurance santé obligatoire',
          'Connaître ses droits et ses devoirs d’étudiant ou d’apprenti',
        ],
      },
    ],
  },
  'eviter-les-arnaques': {
    slug: 'eviter-les-arnaques',
    title: 'Éviter les arnaques et les fausses promesses',
    subtitle: 'Comment reconnaître une offre frauduleuse, protéger vos proches et vérifier chaque information.',
    sections: [
      {
        heading: 'Comment reconnaître une fausse offre ?',
        body: 'De nombreux réseaux malveillants sur les réseaux sociaux et messageries exploitent l’espoir des jeunes en promettant des « visas garantis », des « contrats de travail achetés » ou des « admissions sans diplôme ni langue ».',
        bullets: [
          'Méfiez-vous de toute personne qui promet un visa « garanti à 100 % » ou « rapide sans entretien à l’ambassade »',
          'Un contrat de formation (Ausbildung) ou de travail en Europe ne s’achète JAMAIS : ce sont les entreprises qui rémunèrent l’apprenti, jamais l’inverse',
          'Aucune ambassade ni aucun consulat ne demande de paiement par transfert mobile informel à un particulier',
          'Attention aux faux profils utilisant des logos officiels sur WhatsApp, Telegram ou Facebook',
        ],
      },
      {
        heading: 'Rappel fondamental : WAHHF ne demande jamais d’argent',
        body: 'WAHHF Foundation est une fondation à but non lucratif financée par le groupe IROKO et ses donateurs. L’intégralité de notre accompagnement et de nos cours d’allemand est 100 % gratuite.',
        bullets: [
          'Aucun membre, bénévole ou partenaire de WAHHF ne vous demandera jamais de frais de dossier, d’inscription ou de caution',
          'Nous ne demandons aucun document d’identité (passeport, CNI) lors du premier contact en ligne',
          'Nous ne vendons ni visa, ni billet d’avion, ni contrat de travail',
        ],
      },
      {
        heading: 'Comment signaler une tentative de fraude ?',
        body: 'Si une personne prétend agir au nom de WAHHF Foundation ou d’IROKO en vous réclamant de l’argent, interrompez immédiatement tout échange et signalez-le-nous.',
        bullets: [
          'Envoyez une capture d’écran du message suspect à : integrite@wahhf-foundation.org (TODO : confirmer adresse e-mail officielle)',
          'Vérifiez systématiquement les procédures sur le site officiel de l’ambassade du pays concerné',
        ],
      },
    ],
  },
};

export const NEWS_DATA: NewsArticle[] = [
  {
    slug: 'ouverture-inscriptions-academie-allemand-2026',
    title: 'Ouverture des candidatures pour la nouvelle cohorte gratuite d’allemand (A1 à B2)',
    date: '12 Mai 2026 (TODO)',
    category: 'Mobilité & Langues',
    readTime: '3 min de lecture',
    image: WAHHF_IMAGES.education,
    excerpt: 'Grâce au soutien du groupe IROKO et de nos donateurs, de nouvelles sessions gratuites d’accompagnement linguistique ouvrent en ligne et au Cameroun.',
    content: [
      'WAHHF Foundation annonce l’ouverture des candidatures pour sa prochaine session d’accompagnement des cours de langue allemande, accessible gratuitement du niveau A1 au niveau B2.',
      'Ce dispositif solidaire s’adresse à toute personne motivée souhaitant construire un projet d’études ou de formation professionnelle avec sérieux et méthode.',
      'Pour rejoindre une cohorte, nous invitons les candidats à passer d’abord le test d’orientation gratuit en ligne puis à remplir le formulaire unique de candidature.',
    ],
  },
  {
    slug: 'campagne-sante-prevention-communautaire',
    title: 'Journées de prévention sanitaire et d’écoute auprès des familles rurales',
    date: '28 Avril 2026 (TODO)',
    category: 'Santé',
    readTime: '4 min de lecture',
    image: WAHHF_IMAGES.health,
    excerpt: 'Retour sur notre déploiement mobile de sensibilisation sanitaire, de dépistage gratuit et d’accompagnement maternel.',
    content: [
      'En partenariat avec les professionnels de santé locaux, les bénévoles de WAHHF Foundation ont mené une campagne de prévention axée sur la santé maternelle et infantile.',
      'Au-delà des consultations d’orientation, ces rencontres permettent d’informer durablement les familles sur la prévention nutritionnelle et l’hygiène de l’eau.',
    ],
  },
  {
    slug: 'reboisement-jeunesse-engagement-ecologique',
    title: 'Les jeunes volontaires s’engagent pour le reboisement et l’agroécologie',
    date: '10 Avril 2026 (TODO)',
    category: 'Environnement',
    readTime: '3 min de lecture',
    image: WAHHF_IMAGES.environment,
    excerpt: 'Mise en terre de jeunes plants d’essences locales et ateliers pratiques de préservation des sols avec les écoles partenaires.',
    content: [
      'Parce que la protection de l’environnement est indissociable du bien-être des communautés, WAHHF associe les élèves et étudiants à la création de pépinières locales.',
      'Chaque arbre planté fait l’objet d’un suivi par un groupe d’élèves, alliant responsabilité écologique et apprentissage agronomique.',
    ],
  },
];

export const TIMELINE_MILESTONES = [
  {
    year: '2021 (TODO)',
    title: 'Genèse de l’initiative solidaire',
    desc: 'Premières actions d’entraide éducative et de soutien matériel aux élèves entre le Cameroun et la diaspora en Allemagne.',
  },
  {
    year: '2023 (TODO)',
    title: 'Structuration de WAHHF Foundation',
    desc: 'Organisation des programmes autour des cinq premiers piliers : Éducation, Santé, Entrepreneuriat, Environnement et Droits & Inclusion.',
  },
  {
    year: '2025 (TODO)',
    title: 'Adossement comme branche sociale du groupe IROKO',
    desc: 'Le groupe IROKO s’engage structurellement à financer le fonctionnement de la fondation pour garantir la gratuité totale pour les bénéficiaires.',
  },
  {
    year: '2026',
    title: 'Lancement du 6e domaine : Mobilité & Langues',
    desc: 'Ouverture de l’Académie d’allemand gratuite (A1 à C1) et publication des guides d’orientation vérifiés vers 10 pays européens.',
  },
];

export const CAMEROON_REGIONS = [
  { id: 'littoral', name: 'Littoral (Douala)', hub: 'Antenne principale & Cours', x: 34, y: 74 },
  { id: 'centre', name: 'Centre (Yaoundé)', hub: 'Coordination & Santé', x: 52, y: 72 },
  { id: 'ouest', name: 'Ouest (Bafoussam)', hub: 'Éducation & Agroécologie', x: 36, y: 63 },
  { id: 'sud-ouest', name: 'Sud-Ouest (Buea)', hub: 'Jeunesse & Inclusion', x: 24, y: 71 },
  { id: 'nord-ouest', name: 'Nord-Ouest (Bamenda)', hub: 'Soutien scolaire', x: 33, y: 55 },
  { id: 'sud', name: 'Sud (Ebolowa)', hub: 'Environnement & Forêts', x: 48, y: 86 },
  { id: 'est', name: 'Est (Bertoua)', hub: 'Santé communautaire', x: 74, y: 73 },
  { id: 'adamaoua', name: 'Adamaoua (Ngaoundéré)', hub: 'Éducation & Eau', x: 58, y: 47 },
  { id: 'nord', name: 'Nord (Garoua)', hub: 'Agroécologie & Jeunes', x: 58, y: 29 },
  { id: 'extreme-nord', name: 'Extrême-Nord (Maroua)', hub: 'Solidarité & Écoles', x: 64, y: 14 },
];

// Fonctions d'accès aux données (Simulées avec Promesses pour futur branchement Symfony)
export async function getDomains(): Promise<DomainItem[]> {
  return Promise.resolve(DOMAINS_DATA);
}

export async function getCourses(): Promise<GermanLevelCourse[]> {
  return Promise.resolve(GERMAN_LEVELS_DATA);
}

export async function getCourseByLevel(levelSlug: string): Promise<GermanLevelCourse | undefined> {
  return Promise.resolve(
    GERMAN_LEVELS_DATA.find((c) => c.slug.toLowerCase() === levelSlug.toLowerCase())
  );
}

export async function getSessions(filters?: { level?: string; format?: string }): Promise<CourseSession[]> {
  let result = [...COURSE_SESSIONS_DATA];
  if (filters?.level && filters.level !== 'ALL') {
    result = result.filter((s) => s.level === filters.level);
  }
  if (filters?.format && filters.format !== 'ALL') {
    result = result.filter((s) => s.format.toLowerCase().includes(filters.format.toLowerCase()));
  }
  return Promise.resolve(result);
}

export async function getCountries(): Promise<CountryGuide[]> {
  return Promise.resolve(COUNTRIES_DATA);
}

export async function getCountryBySlug(slug: string): Promise<CountryGuide | undefined> {
  return Promise.resolve(COUNTRIES_DATA.find((c) => c.slug === slug));
}

export async function getPlacementQuestions(): Promise<PlacementQuestion[]> {
  return Promise.resolve(PLACEMENT_QUESTIONS);
}

export async function getNews(): Promise<NewsArticle[]> {
  return Promise.resolve(NEWS_DATA);
}

export async function getArticleBySlug(slug: string): Promise<NewsArticle | undefined> {
  return Promise.resolve(NEWS_DATA.find((a) => a.slug === slug));
}

/**
 * Envois des formulaires : PAS ENCORE BRANCHÉS (API Symfony à venir).
 * En attendant, les pages préparent un message WhatsApp ou e-mail que la personne envoie elle-même
 * (src/components/wahhf/ContactHandoff.tsx) ; ces fonctions ne sont plus appelées.
 * Elles échouent volontairement : jamais de succès simulé, de référence inventée ni de donnée stockée
 * dans le navigateur. Au branchement : vrai appel réseau, confirmation seulement sur réponse 2xx,
 * référence créée par le serveur, et côté page un état « envoi en cours » avec try/catch/finally (ETA-01, ETA-02).
 */
const FORMS_NOT_CONNECTED = 'Envoi en ligne pas encore disponible : l’API Symfony n’est pas branchée.';

export async function submitApplication(_payload: ApplicationPayload): Promise<{ reference: string; responseDelayNote: string }> {
  throw new Error(FORMS_NOT_CONNECTED);
}

export async function submitDonation(_payload: DonationPayload): Promise<{ receiptRef: string }> {
  throw new Error(FORMS_NOT_CONNECTED);
}

export async function submitContactOrAction(_payload: Record<string, unknown>): Promise<{ ok: boolean }> {
  throw new Error(FORMS_NOT_CONNECTED);
}

export async function subscribeNewsletter(_email: string): Promise<{ ok: boolean }> {
  throw new Error(FORMS_NOT_CONNECTED);
}
