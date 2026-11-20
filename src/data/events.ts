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
  /** « 8 h 00 » */
  heure: string;
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
  reponse: string;
}

export interface Event {
  slug: string;
  /** Texte de la pastille du hero (à la place du libellé par défaut), et sa langue s'il n'est pas en français */
  pastille?: { texte: string; lang?: string };
  /** Statut saisi ; un événement « à venir » dont la fin est passée est traité comme passé (src/lib/events.ts) */
  statut: EventStatus;
  /** Titre (h1), écrit tel qu'il doit se lire */
  titre: string;
  /** Partie du titre soulignée d'un trait soleil (mot accent) ; doit figurer telle quelle dans le titre */
  motAccent: string;
  accroche: string;
  /** Début, ISO 8601 avec le décalage du fuseau Africa/Douala (+01:00, pas d'heure d'été) */
  date: string;
  /** Fin, même format */
  fin: string;
  fuseau: 'Africa/Douala';
  lieu: string;
  /** null tant qu'elle n'est pas confirmée */
  ville: string | null;
  pays: string;
  /** null : jamais affiché (seulement si le chiffre vient d'une vraie source) */
  placesRestantes: number | null;
  /** Adresse du formulaire d'inscription, ou null */
  lienInscription: string | null;
  photoHero: readonly string[];
  organisateurs: EventOrganizer[];
  pourquoi: EventCard[];
  deroule: EventStep[];
  activites: EventActivity[];
  tempsForts: EventCard[];
  /** Identifiants de src/data/team.ts */
  intervenants: string[];
  parents: { promesses: string[]; jamais: string[] };
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

const SHOW_DEMO = !import.meta.env.PROD || import.meta.env.VITE_APERCU_EVENEMENTS === '1';

export const EVENTS: Event[] = [...(SHOW_DEMO ? [DEMO] : []), JOURNEE_2026_04_25];
