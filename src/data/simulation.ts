/**
 * Programme Simulation (lot 13) : simulation numérique solidaire et gratuite, page /simulation.
 * Le français est ici ; l'anglais et l'allemand sont des surcouches (src/locales/simulation/en.json et de.json,
 * simulation.contenu.<liste>.<id>, mêmes champs).
 *
 * confirme : false sur tout élément qui contient une promesse chiffrée ou un fait que la fondation doit valider. En
 * ligne, un élément non confirmé ne s'affiche pas ; en développement, il s'affiche avec le badge « à confirmer ».
 * protection : true pour un texte qui protège le visiteur (les limites des résultats) : il s'affiche en ligne même non
 * confirmé, avec le badge en développement.
 * Questions à la fondation : docs/contenus-a-fournir.md, bloc « Programme Simulation ».
 */

export interface SimConfirme {
  id: string;
  confirme: boolean;
  protection?: boolean;
}

/** Ce que nous offrons : 4 cartes numérotées ; durées et volumes seulement s'ils sont confirmés */
export interface SimOffre extends SimConfirme {
  titre: string;
  texte: string;
  /** Ce que vous recevez, en une ligne */
  recu: string;
}

export interface SimPublic extends SimConfirme {
  texte: string;
}

export type SimIcone = 'hangar' | 'chassis' | 'sechoir' | 'classe' | 'reservoir';

/** Exemples de demandes possibles : jamais présentés comme des projets réalisés */
export interface SimExemple extends SimConfirme {
  icone: SimIcone;
  titre: string;
  besoin: string;
  type: string;
}

export interface SimEtape extends SimConfirme {
  titre: string;
  texte: string;
}

export interface SimFamille extends SimConfirme {
  titre: string;
  texte: string;
  analyses: string[];
}

export interface SimEngagement extends SimConfirme {
  titre: string;
  texte: string;
}

export interface SimQuestion extends SimConfirme {
  question: string;
  reponse: string;
}

export const SIM_OFFRES: SimOffre[] = [
  {
    id: 'prediagnostic',
    titre: 'Pré-diagnostic',
    texte: 'Un échange pour comprendre votre besoin.',
    recu: 'Vous recevez un avis clair sur ce qu’une simulation peut vous apporter.',
    confirme: true,
  },
  {
    id: 'etude',
    titre: 'Étude de simulation simple',
    texte: 'Un calcul ciblé sur la question qui compte pour vous.',
    recu: 'Vous recevez un rapport simplifié, avec ses conclusions.',
    confirme: true,
  },
  {
    id: 'conseil',
    titre: 'Conseil de conception',
    texte: 'Matériaux, formes, pistes d’amélioration.',
    recu: 'Vous recevez des recommandations concrètes pour votre pièce ou votre ouvrage.',
    confirme: true,
  },
  {
    id: 'atelier',
    titre: 'Atelier d’initiation',
    texte: 'Pour vos équipes, vos élèves ou vos étudiants.',
    recu: 'Vous recevez une séance pour découvrir la simulation numérique.',
    confirme: true,
  },
];

/** Le programme s'adresse à… (structures basées au Cameroun) */
export const SIM_PUBLICS: SimPublic[] = [
  { id: 'tpe', texte: 'TPE et PME', confirme: true },
  { id: 'artisans', texte: 'Artisans', confirme: true },
  { id: 'startups', texte: 'Startups et porteurs de projets de jeunes', confirme: true },
  { id: 'ecoles', texte: 'Écoles et universités', confirme: true },
  { id: 'associations', texte: 'Associations et collectivités', confirme: true },
];

/** Ce programme n'est pas fait pour… (orientés vers IROKO Engineer) */
export const SIM_NON_PUBLICS: SimPublic[] = [
  { id: 'grandes', texte: 'Les grandes entreprises', confirme: true },
  { id: 'certifiees', texte: 'Les études qui doivent être certifiées ou signées par un ingénieur agréé', confirme: true },
  { id: 'urgents', texte: 'Les projets urgents', confirme: true },
];

export const SIM_EXEMPLES: SimExemple[] = [
  {
    id: 'hangar',
    icone: 'hangar',
    titre: 'Charpente d’un hangar agricole',
    besoin: 'Vérifier qu’une charpente, en métal ou en bois, tient au vent et au poids de la toiture.',
    type: 'Structures · statique',
    confirme: true,
  },
  {
    id: 'chassis',
    icone: 'chassis',
    titre: 'Châssis d’une machine de transformation',
    besoin: 'Une presse à huile ou un broyeur de manioc : contrôler le châssis qui reprend les efforts et les vibrations.',
    type: 'Structures · fatigue et vibrations',
    confirme: true,
  },
  {
    id: 'sechoir',
    icone: 'sechoir',
    titre: 'Séchoir solaire',
    besoin: 'Faire circuler l’air chaud de façon régulière, pour sécher les produits sans les abîmer.',
    type: 'Fluides et thermique',
    confirme: true,
  },
  {
    id: 'classe',
    icone: 'classe',
    titre: 'Ventilation naturelle d’une salle de classe',
    besoin: 'Rafraîchir une salle sans climatisation, en plaçant mieux les ouvertures.',
    type: 'Fluides · ventilation',
    confirme: true,
  },
  {
    id: 'reservoir',
    icone: 'reservoir',
    titre: 'Réservoir d’eau surélevé',
    besoin: 'Vérifier le support d’un réservoir plein, sous son propre poids et sous le vent.',
    type: 'Structures · statique et flambage',
    confirme: true,
  },
];

export const SIM_ETAPES: SimEtape[] = [
  { id: 'besoin', titre: 'Vous décrivez votre besoin', texte: 'Avec le formulaire de cette page : votre projet, et vos plans ou vos photos si vous en avez.', confirme: true },
  { id: 'eligibilite', titre: 'Nous étudions l’éligibilité', texte: 'Nous vérifions que votre projet entre dans le programme et qu’une simulation peut vous aider.', confirme: true },
  { id: 'cadrage', titre: 'Échange de cadrage', texte: 'En visio, par téléphone ou sur WhatsApp, pour préciser la question et les données.', confirme: true },
  { id: 'simulation', titre: 'Simulation', texte: 'Nous modélisons votre pièce ou votre ouvrage, puis nous faisons le calcul.', confirme: true },
  { id: 'restitution', titre: 'Restitution', texte: 'Un rapport simplifié, et un échange pour expliquer les résultats et les suites possibles.', confirme: true },
];

export const SIM_FAMILLES: SimFamille[] = [
  {
    id: 'structures',
    titre: 'Structures et résistance',
    texte: 'Savoir si une pièce ou un ouvrage tient, et où il travaille le plus.',
    analyses: ['Statique', 'Flambage', 'Fatigue', 'Vibrations'],
    confirme: true,
  },
  {
    id: 'fluides',
    titre: 'Fluides et thermique',
    texte: 'Comprendre comment l’air, l’eau ou la chaleur circulent.',
    analyses: ['Écoulements', 'Ventilation', 'Échanges de chaleur'],
    confirme: true,
  },
  {
    id: 'conception',
    titre: 'Conception et optimisation',
    texte: 'Choisir la meilleure forme avant de fabriquer.',
    analyses: ['Comparer des variantes', 'Alléger une pièce'],
    confirme: true,
  },
];

export const SIM_ENGAGEMENTS: SimEngagement[] = [
  {
    id: 'gratuit',
    titre: 'Gratuit et sans contrepartie',
    texte: 'Aucun paiement, à aucune étape. Si quelqu’un vous demande de l’argent pour ce programme, ne payez pas et prévenez-nous.',
    confirme: true,
  },
  {
    id: 'confidentialite',
    titre: 'Confidentialité',
    texte: 'Vos plans ne servent qu’à votre étude. Un accord de confidentialité peut être signé avant leur envoi.',
    confirme: true,
  },
  {
    id: 'fichiers',
    titre: 'Vos fichiers restent les vôtres',
    texte: 'Vos plans, vos modèles et vos données vous appartiennent, avant comme après l’étude.',
    confirme: true,
  },
  {
    id: 'selection',
    titre: 'Un nombre de projets limité',
    texte: 'Les projets sont choisis selon leur utilité locale.',
    confirme: true,
  },
];

/** Les limites des résultats : à faire valider par la fondation, mais toujours affichées (c'est une protection) */
export const SIM_LIMITE: SimEngagement = {
  id: 'limite',
  titre: 'Nos limites',
  texte:
    'Nos résultats sont indicatifs et pédagogiques. Ils ne remplacent pas une note de calcul certifiée : pour un ouvrage ou un équipement, faites-les valider par un ingénieur agréé.',
  confirme: false,
  protection: true,
};

export const SIM_FAQ: SimQuestion[] = [
  {
    id: 'gratuit',
    question: 'Est-ce vraiment gratuit ?',
    reponse:
      'Oui. Vous ne payez rien, à aucune étape. La fondation est la branche sociale du groupe IROKO, qui couvre ses frais de fonctionnement.',
    confirme: true,
  },
  {
    id: 'qui',
    question: 'Qui réalise les simulations ?',
    reponse: 'Nos ingénieurs, avec de jeunes ingénieurs et des étudiants qu’ils encadrent.',
    confirme: true,
  },
  {
    id: 'beneficiaires',
    question: 'Qui peut en bénéficier ?',
    reponse:
      'Les petites structures basées au Cameroun : TPE et PME, artisans, startups et porteurs de projets de jeunes, écoles et universités, associations et collectivités.',
    confirme: true,
  },
  {
    id: 'fichiers',
    question: 'Quels fichiers envoyer ?',
    reponse:
      'Ce que vous avez : plans, croquis, photos ou fichiers de CAO (PDF, JPG, PNG, STEP, IGES, DWG, DXF, ou un ZIP), 10 Mo au total. Une description précise suffit pour commencer.',
    confirme: true,
  },
  {
    id: 'confidentialite',
    question: 'Mes plans restent-ils confidentiels ?',
    reponse:
      'Oui. Ils ne servent qu’à votre étude. Vous pouvez demander un accord de confidentialité avant de les envoyer : cochez la case du formulaire.',
    confirme: true,
  },
  {
    id: 'delai',
    question: 'Combien de temps cela prend-il ?',
    reponse: 'Cela dépend du projet et du nombre de demandes en cours. Le délai vous est indiqué après l’échange de cadrage.',
    confirme: true,
  },
  {
    id: 'certifies',
    question: 'Les résultats sont-ils certifiés ?',
    reponse:
      'Non. Ils sont indicatifs et pédagogiques, et ne remplacent pas une note de calcul certifiée. Pour un ouvrage ou un équipement, faites-les valider par un ingénieur agréé, ou adressez-vous à IROKO Engineer.',
    confirme: false,
    protection: true,
  },
  {
    id: 'refus',
    question: 'Que faire si mon projet n’est pas retenu ?',
    reponse:
      'Nous vous le disons, avec une piste quand c’est possible : une ressource, une formation, ou IROKO Engineer pour une étude complète.',
    confirme: true,
  },
];

/** Statuts proposés dans le formulaire */
export const SIM_STATUTS = ['tpe', 'artisan', 'startup', 'ecole', 'association', 'collectivite', 'autre'] as const;
export type SimStatut = (typeof SIM_STATUTS)[number];

/** Types de besoin proposés dans le formulaire */
export const SIM_BESOINS = ['structure', 'fluides', 'conception', 'inconnu'] as const;
export type SimBesoin = (typeof SIM_BESOINS)[number];

/** Fichiers acceptés (extensions) et poids total maximal */
export const SIM_FICHIERS_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'step', 'stp', 'iges', 'igs', 'dwg', 'dxf', 'zip'] as const;
export const SIM_FICHIERS_MAX_OCTETS = 10 * 1024 * 1024;
/** Description : au moins 50 caractères */
export const SIM_DESCRIPTION_MIN = 50;
