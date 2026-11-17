// Les 10 pays européens d'orientation de WAHHF Foundation : la seule source du site (audit PAYS-05, groupe 7.4).
// Lue par la mini-carte et la liste des pays (accueil, Notre impact, Accompagnement), les fiches pays, la page
// Accompagnement, Candidater (choix du pays), la recherche de l'en-tête, Mobilité & Langues et la page « introuvable ».
// Coordonnées réelles [longitude, latitude] utilisées pour la projection d3-geo et l'arc depuis le Cameroun.
// Avant le groupe 7.4, les mêmes pays étaient décrits deux fois (ici pour la carte, dans services/api.ts pour les fiches).

export interface OfficialLink {
  label: string;
  url: string;
  /**
   * Date (AAAA-MM-JJ) à laquelle la fondation a vérifié ce lien (audit PAYS-01) : la fiche affiche alors « Lien vérifié
   * le … ». Absente : rien n'est affiché. Questions 34 à 54 de docs/contenus-a-fournir.md.
   */
  verifiedOn?: string;
}

export interface EuropeCountry {
  /** Ordre d'affichage (liste, carte, tabulation) */
  order: string;
  slug: string;
  /** Code du pays, affiché en typographie à la place du drapeau (T-22) */
  code: string;
  /** Drapeau en emoji : gardé pour la recherche de l'en-tête et Mobilité & Langues ; il s'affiche en lettres sous Windows */
  flag: string;
  /** Nom en français */
  name: string;
  /** « vers l’Allemagne », « vers le Luxembourg » (audit PAYS-03) */
  towards: string;
  /** « en Allemagne », « au Luxembourg » (audit PAYS-03) */
  inside: string;
  /** Nom correspondant dans Natural Earth (world-atlas countries-110m.json) */
  neName: string;
  /** Coordonnées [longitude, latitude] du centre pour l'arc et le marqueur/infobulle */
  coordinates: [number, number];
  isEU: boolean;
  /** Précision juridique affichée en alerte sur la fiche d'un pays hors Union européenne */
  euNote?: string;
  languages: string[];
  summary: string;
  pathways: {
    studies: string;
    training: string;
    work: string;
  };
  steps: string[];
  officialLinks: OfficialLink[];
}

/** Ancien nom du type (mini-carte, liste des pays) */
export type SupportedEuropeCountry = EuropeCountry;

export const EUROPE_COUNTRIES: EuropeCountry[] = [
  {
    order: '01',
    slug: 'allemagne',
    code: 'DE',
    flag: '🇩🇪',
    name: 'Allemagne',
    towards: 'vers l’Allemagne',
    inside: 'en Allemagne',
    neName: 'Germany',
    coordinates: [10.4515, 51.1657],
    isEU: true,
    languages: ['Allemand (langue officielle)', 'Anglais (certains cursus internationaux)'],
    // « Pays partenaire historique de la fondation » : retiré tant que la fondation ne l'a pas confirmé
    // (docs/contenus-a-fournir.md). Ancien début : « Pays partenaire historique de la fondation, l’Allemagne propose… »
    summary: 'L’Allemagne propose des voies structurées pour les études universitaires, la formation professionnelle duale (Ausbildung) et la mobilité qualifiée.',
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
      { label: 'Make it in Germany (Portail officiel du gouvernement fédéral)', url: 'https://www.make-it-in-germany.com' },
      { label: 'DAAD — Office allemand d’échanges universitaires', url: 'https://www.daad.de' },
      { label: 'Ambassade d’Allemagne au Cameroun (Yaoundé)', url: 'https://jaunde.diplo.de' },
    ],
  },
  {
    order: '02',
    slug: 'luxembourg',
    code: 'LU',
    flag: '🇱🇺',
    name: 'Luxembourg',
    towards: 'vers le Luxembourg',
    inside: 'au Luxembourg',
    neName: 'Luxembourg',
    coordinates: [6.1296, 49.8153],
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
      { label: 'Guichet.lu — Portail administratif du Grand-Duché de Luxembourg', url: 'https://guichet.public.lu' },
      { label: 'Université du Luxembourg', url: 'https://www.uni.lu' },
    ],
  },
  {
    order: '03',
    slug: 'slovenie',
    code: 'SI',
    flag: '🇸🇮',
    name: 'Slovénie',
    towards: 'vers la Slovénie',
    inside: 'en Slovénie',
    neName: 'Slovenia',
    coordinates: [14.9955, 46.1512],
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
      { label: 'Study in Slovenia — Portail officiel', url: 'https://studyinslovenia.si' },
      { label: 'Portail gouvernemental gov.si (Immigration)', url: 'https://www.gov.si' },
    ],
  },
  {
    order: '04',
    slug: 'italie',
    code: 'IT',
    flag: '🇮🇹',
    name: 'Italie',
    towards: 'vers l’Italie',
    inside: 'en Italie',
    neName: 'Italy',
    coordinates: [12.5674, 42.5],
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
      { label: 'Universitaly — Portail officiel du Ministère italien', url: 'https://www.universitaly.it' },
      { label: 'Visto per l’Italia — Ministère des Affaires Étrangères', url: 'https://vistoperitalia.esteri.it' },
    ],
  },
  {
    order: '05',
    slug: 'grece',
    code: 'GR',
    flag: '🇬🇷',
    name: 'Grèce',
    towards: 'vers la Grèce',
    inside: 'en Grèce',
    neName: 'Greece',
    coordinates: [21.8243, 39.0742],
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
      { label: 'Study in Greece — Portail officiel', url: 'https://studyingreece.edu.gr' },
      { label: 'Ministère grec de la Migration et de l’Asile', url: 'https://migration.gov.gr' },
    ],
  },
  {
    order: '06',
    slug: 'portugal',
    code: 'PT',
    flag: '🇵🇹',
    name: 'Portugal',
    towards: 'vers le Portugal',
    inside: 'au Portugal',
    neName: 'Portugal',
    coordinates: [-8.2245, 39.3999],
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
      { label: 'Study & Research in Portugal — Portail officiel', url: 'https://www.study-research.pt' },
      { label: 'Portail des Visas — Ministère des Affaires Étrangères du Portugal', url: 'https://vistos.mne.gov.pt' },
    ],
  },
  {
    order: '07',
    slug: 'espagne',
    code: 'ES',
    flag: '🇪🇸',
    name: 'Espagne',
    towards: 'vers l’Espagne',
    inside: 'en Espagne',
    neName: 'Spain',
    coordinates: [-3.7492, 40.4637],
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
      { label: 'SEPIE — étudier en Espagne (Ministère des Universités)', url: 'https://sepie.es' },
      { label: 'Portail de l’Immigration — Gouvernement d’Espagne', url: 'https://extranjeros.inclusion.gob.es' },
    ],
  },
  {
    order: '08',
    slug: 'danemark',
    code: 'DK',
    flag: '🇩🇰',
    name: 'Danemark',
    towards: 'vers le Danemark',
    inside: 'au Danemark',
    neName: 'Denmark',
    coordinates: [9.5018, 56.2639],
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
      { label: 'Study in Denmark — Portail officiel du Ministère', url: 'https://studyindenmark.dk' },
      { label: 'New to Denmark (nyidanmark.dk) — Portail officiel SIRI', url: 'https://www.nyidanmark.dk' },
    ],
  },
  {
    order: '09',
    slug: 'pologne',
    code: 'PL',
    flag: '🇵🇱',
    name: 'Pologne',
    towards: 'vers la Pologne',
    inside: 'en Pologne',
    neName: 'Poland',
    coordinates: [19.1451, 51.9194],
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
      { label: 'Study in Poland — Agence Nationale NAWA', url: 'https://study.gov.pl' },
      { label: 'Office des Étrangers de Pologne (Urząd do Spraw Cudzoziemców)', url: 'https://www.gov.pl/web/udsc' },
    ],
  },
  {
    order: '10',
    slug: 'albanie',
    code: 'AL',
    flag: '🇦🇱',
    name: 'Albanie',
    towards: 'vers l’Albanie',
    inside: 'en Albanie',
    neName: 'Albania',
    coordinates: [20.1683, 41.1533],
    isEU: false,
    euNote: 'L’Albanie n’est pas membre de l’Union européenne (elle possède le statut de pays candidat). Elle ne fait pas non plus partie de l’espace Schengen. Les visas et titres de séjour albanais ne permettent pas de circuler ou de travailler dans l’Union européenne.',
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
      { label: 'e-Visa Albania — Système officiel de visa en ligne', url: 'https://e-visa.al' },
      { label: 'e-Albania — Portail officiel des services publics', url: 'https://e-albania.al' },
    ],
  },
];

/** Ancien nom de la liste (mini-carte, liste des pays) : la même liste */
export const EUROPE_SUPPORTED_COUNTRIES = EUROPE_COUNTRIES;

/**
 * Cadrage de la mini-carte : du Portugal à la Pologne (ouest–est), du Danemark à la Grèce (nord–sud).
 * La projection est ajustée sur l'emprise réelle de ces 4 pays (noms Natural Earth).
 */
export const EUROPE_FRAME_NE_NAMES = ['Portugal', 'Poland', 'Denmark', 'Greece'];
