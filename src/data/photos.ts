// Généré par scripts/optimize-photos.mjs depuis docs/photos-catalogue.md (npm run photos). Ne pas modifier à la main :
// corriger le catalogue, puis relancer le script.
// Fichiers : public/photos/<album>/<slug>-<largeur>.avif | .webp, et un .jpg de 800 px au plus.

export type PhotoAlbumId = 'journee-2026-04-25' | 'terrain-agricole' | 'nkongsamba' | 'mont-et-lac' | 'randonnee-jeunesse';

/** 'pending' : mineurs identifiables, ou à vérifier ; la photo n'est publiée qu'après l'accord écrit des parents (GAL-01). */
export type PhotoConsent = 'ok' | 'pending';

export interface PhotoAlbum {
  id: PhotoAlbumId;
  title: string;
  /** Ce qui reste à confirmer (lieu, date, nom de l'événement), ou null */
  note: string | null;
}

export interface PhotoSources {
  /** srcset AVIF puis WebP (largeurs réelles, jamais agrandies) */
  avif: string;
  webp: string;
  /** JPEG de repli, 800 px au plus */
  jpeg: string;
  /** Largeurs disponibles, de la plus petite à la plus grande */
  widths: number[];
}

export interface CatalogPhoto {
  /** Repère du catalogue (A27, B04…) */
  id: string;
  album: PhotoAlbumId;
  slug: string;
  alt: string;
  /** Dimensions réelles, rotation EXIF appliquée */
  width: number;
  height: number;
  /** object-position du catalogue */
  focus: string;
  /** Fond pendant le chargement */
  dominantColor: string;
  consent: PhotoConsent;
  sources: PhotoSources;
}

export const PHOTO_ALBUMS: PhotoAlbum[] = [
  { id: 'journee-2026-04-25', title: 'Journée du 25 avril 2026 — Albatros Hotel', note: 'Nom exact de l\'événement à confirmer (la banderole indique : Albatros Hotel, 25 avril 2026, 8 h–21 h).' },
  { id: 'terrain-agricole', title: 'Visite de terrain dans une plantation', note: 'Lieu et date à confirmer.' },
  { id: 'nkongsamba', title: 'Sortie à Nkongsamba', note: 'Date et contexte à confirmer.' },
  { id: 'mont-et-lac', title: 'Sortie au mont et au lac', note: 'Lieu à confirmer (lac de cratère).' },
  { id: 'randonnee-jeunesse', title: 'Randonnée avec les jeunes', note: 'Lieu et date à confirmer.' },
];

function photo(
  id: string,
  album: PhotoAlbumId,
  slug: string,
  alt: string,
  width: number,
  height: number,
  focus: string,
  dominantColor: string,
  consent: PhotoConsent,
  widths: number[],
  jpegWidth: number,
): CatalogPhoto {
  const base = `/photos/${album}/${slug}`;
  const set = (format: string) => widths.map((w) => `${base}-${w}.${format} ${w}w`).join(', ');
  return {
    id, album, slug, alt, width, height, focus, dominantColor, consent,
    sources: { avif: set('avif'), webp: set('webp'), jpeg: `${base}-${jpegWidth}.jpg`, widths },
  };
}

/** Les 89 photos du catalogue, dans son ordre. */
export const PHOTOS: CatalogPhoto[] = [
  photo('A02', 'journee-2026-04-25', 'journee-2026-04-25-banderole', 'Banderole de la WAHHF Foundation sur la façade de l\'Albatros Hotel : « Bâtir l\'Afrique qui nourrit, soigne et instruit sa jeunesse »', 1600, 1066, 'center', '#080808', 'ok', [480, 800, 1200, 1600], 800),
  photo('A07', 'journee-2026-04-25', 'journee-2026-04-25-accueil-devant-hotel', 'Participants rassemblés devant l\'Albatros Hotel avant le début de la journée', 1600, 1066, 'center 70%', '#080808', 'ok', [480, 800, 1200, 1600], 800),
  photo('A12', 'journee-2026-04-25', 'journee-2026-04-25-membre-equipe-kakemono', 'Un membre de l\'équipe pose à côté du kakémono de la fondation', 1066, 1600, '60% 40%', '#d8d8d8', 'ok', [480, 800, 1066], 800),
  photo('A13', 'journee-2026-04-25', 'journee-2026-04-25-kakemono-orange', 'Kakémono orange de la fondation : « Showing hope, harvesting change »', 1066, 1600, 'center', '#080808', 'ok', [480, 800, 1066], 800),
  photo('A14', 'journee-2026-04-25', 'journee-2026-04-25-kakemono-domaines', 'Kakémono de la fondation présentant ses domaines d\'action', 1066, 1600, 'center', '#b8b8b8', 'ok', [480, 800, 1066], 800),
  photo('A16', 'journee-2026-04-25', 'journee-2026-04-25-jeunes-de-dos-tshirts', 'Jeunes participants vus de dos, en t-shirts « Bâtir l\'Afrique qui nourrit, soigne et instruit sa jeunesse »', 1600, 1066, 'center 60%', '#a8b8a8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A17', 'journee-2026-04-25', 'journee-2026-04-25-salle-vue-du-fond', 'Salle de conférence vue depuis le fond, participants assis face à l\'écran', 1600, 1066, 'center', '#b8b8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A18', 'journee-2026-04-25', 'journee-2026-04-25-inscriptions', 'Accueil et inscription des participants près du kakémono', 1600, 1066, 'center', '#a8a8a8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A22', 'journee-2026-04-25', 'journee-2026-04-25-preparation-technique', 'Préparation des ordinateurs avant les présentations', 1600, 1066, 'center', '#b8b8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A23', 'journee-2026-04-25', 'journee-2026-04-25-salle-verticale', 'Salle remplie, kakémono de la fondation au fond', 1066, 1600, 'center', '#b8b8b8', 'pending', [480, 800, 1066], 800),
  photo('A26', 'journee-2026-04-25', 'journee-2026-04-25-salle-installation', 'Vue d\'ensemble de la salle pendant l\'installation', 1600, 1066, 'center', '#b8b8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A27', 'journee-2026-04-25', 'journee-2026-04-25-salle-comble', 'Salle comble pendant une présentation, kakémonos de la fondation de chaque côté de l\'écran', 1600, 1066, 'center 55%', '#c8c8c8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A29', 'journee-2026-04-25', 'journee-2026-04-25-logo-projete', 'Logo de la fondation projeté sur l\'écran de la salle', 1066, 1600, 'center 30%', '#9898a8', 'pending', [480, 800, 1066], 800),
  photo('A30', 'journee-2026-04-25', 'journee-2026-04-25-public-de-dos', 'Participants de dos face au kakémono de la fondation', 1600, 1066, 'center', '#a8a8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A31', 'journee-2026-04-25', 'journee-2026-04-25-parents-aines', 'Parents et aînés assis au premier rang', 1600, 1066, 'center', '#b8b8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A33', 'journee-2026-04-25', 'journee-2026-04-25-jeunes-attentives', 'Jeunes participantes attentives pendant une présentation', 1600, 1066, 'center', '#b8b8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A34', 'journee-2026-04-25', 'journee-2026-04-25-question-au-micro', 'Un participant prend la parole au micro pendant les échanges', 1600, 1066, '65% 40%', '#b8b8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A36', 'journee-2026-04-25', 'journee-2026-04-25-jeunes-debout', 'Jeunes participants debout dans la salle', 1600, 1066, 'center', '#a8a8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A37', 'journee-2026-04-25', 'journee-2026-04-25-jeune-homme-ecoute', 'Un jeune homme écoute une présentation', 1600, 1066, 'center 40%', '#a8a8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A38', 'journee-2026-04-25', 'journee-2026-04-25-jeune-polo-fondation', 'Jeune participant en polo de la fondation', 1066, 1600, 'center 35%', '#989898', 'pending', [480, 800, 1066], 800),
  photo('A41', 'journee-2026-04-25', 'journee-2026-04-25-intervenant-polo-rose', 'Intervenant en polo rose au pupitre, micro en main', 1600, 1066, 'center 40%', '#b8b8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A42', 'journee-2026-04-25', 'journee-2026-04-25-intervenant-assis', 'Intervenant assis à la table technique', 931, 894, 'center 40%', '#b8b8b8', 'ok', [480, 800, 931], 800),
  photo('A44', 'journee-2026-04-25', 'journee-2026-04-25-deux-intervenants', 'Deux intervenants au pupitre', 1600, 1066, 'center 40%', '#b8b8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A45', 'journee-2026-04-25', 'journee-2026-04-25-intervenant-veste-bleue', 'Intervenant en veste bleue, micro en main', 1066, 1600, 'center 30%', '#c8c8c8', 'ok', [480, 800, 1066], 800),
  photo('A46', 'journee-2026-04-25', 'journee-2026-04-25-presentation-kakemono', 'Intervenant présentant devant l\'écran et le kakémono', 1600, 1066, 'center', '#c8c8c8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A48', 'journee-2026-04-25', 'journee-2026-04-25-photos-terrain-projetees', 'Projection de photos de terrain pendant une présentation', 1600, 1066, 'center 40%', '#888888', 'pending', [480, 800, 1200, 1600], 800),
  photo('A51', 'journee-2026-04-25', 'journee-2026-04-25-presentation-salle', 'Présentation devant la salle, photos d\'actions projetées', 1600, 1066, 'center', '#a8a8a8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A53', 'journee-2026-04-25', 'journee-2026-04-25-etudes-allemagne', 'Présentation « Der Hochschulvergleich » sur les études en Allemagne', 1600, 1066, '35% 40%', '#b8b8c8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A56', 'journee-2026-04-25', 'journee-2026-04-25-presentation-verticale', 'Intervenant présentant face au public', 1066, 1600, 'center', '#a8a8a8', 'pending', [480, 800, 1066], 800),
  photo('A57', 'journee-2026-04-25', 'journee-2026-04-25-projection-photos-verticale', 'Photos d\'actions projetées devant le public', 1066, 1600, 'center', '#b8b8b8', 'pending', [480, 800, 1066], 800),
  photo('A59', 'journee-2026-04-25', 'journee-2026-04-25-diapo-fondation', 'Intervenant devant la diapositive de présentation de la fondation', 1600, 1066, 'center', '#080808', 'pending', [480, 800, 1200, 1600], 800),
  photo('A60', 'journee-2026-04-25', 'journee-2026-04-25-diapo-domaines', 'Diapositive présentant les domaines d\'action de la fondation', 1600, 1066, 'center 30%', '#c8d8e8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A61', 'journee-2026-04-25', 'journee-2026-04-25-pupitre-lumiere', 'Intervenant au pupitre dans une salle baignée de lumière', 1600, 1066, 'center', '#a8a8a8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A63', 'journee-2026-04-25', 'journee-2026-04-25-pictogrammes-domaines', 'Intervenant devant les pictogrammes Éducation, Santé et Moyens de subsistance', 1600, 1066, '35% center', '#a8a8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A66', 'journee-2026-04-25', 'journee-2026-04-25-cinq-domaines', 'Intervenant présentant les domaines d\'action de la fondation', 1600, 1066, 'center', '#b8b8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A68', 'journee-2026-04-25', 'journee-2026-04-25-intervenant-scene', 'Intervenant sur la scène, devant le kakémono', 1066, 1600, 'center 30%', '#c8d8e8', 'ok', [480, 800, 1066], 800),
  photo('A71', 'journee-2026-04-25', 'journee-2026-04-25-portrait-intervenant', 'Portrait d\'un intervenant pendant sa présentation', 1066, 1600, 'center 25%', '#a8b8b8', 'ok', [480, 800, 1066], 800),
  photo('A74', 'journee-2026-04-25', 'journee-2026-04-25-intervenant-geste', 'Intervenant s\'adressant à la salle, bras ouverts', 1600, 1066, 'center 40%', '#d8d8d8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A77', 'journee-2026-04-25', 'journee-2026-04-25-intervenant-micro', 'Intervenant parlant au micro', 1066, 1600, 'center 25%', '#c8c8c8', 'ok', [480, 800, 1066], 800),
  photo('A80', 'journee-2026-04-25', 'journee-2026-04-25-public-debout', 'Le public debout dans la salle', 1600, 1066, 'center', '#a8b8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A81', 'journee-2026-04-25', 'journee-2026-04-25-hymne-scene', 'Les jeunes chantent l\'hymne de la WAHHF Foundation sur scène', 1600, 1066, 'center 40%', '#c8c8d8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A83', 'journee-2026-04-25', 'journee-2026-04-25-hymne-depuis-public', 'L\'hymne de la fondation vu depuis le public', 1600, 1066, 'center 40%', '#080808', 'pending', [480, 800, 1200, 1600], 800),
  photo('A85', 'journee-2026-04-25', 'journee-2026-04-25-hymne-bras-leves', 'Chant de l\'hymne de la fondation, bras levés', 1600, 1066, 'center 40%', '#080808', 'pending', [480, 800, 1200, 1600], 800),
  photo('A87', 'journee-2026-04-25', 'journee-2026-04-25-hymne-vue-large', 'Vue large de la scène pendant l\'hymne', 1600, 1066, 'center', '#c8c8d8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A88', 'journee-2026-04-25', 'journee-2026-04-25-trois-aines', 'Trois aînés assis, attentifs', 1600, 1066, 'center 40%', '#b8c8c8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A89', 'journee-2026-04-25', 'journee-2026-04-25-jeunes-sourires', 'Jeunes participantes souriantes', 1600, 1066, 'center', '#a8a8a8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A90', 'journee-2026-04-25', 'journee-2026-04-25-participante-polo-rose', 'Participante en polo rose de la fondation', 1600, 1066, 'center 35%', '#080808', 'pending', [480, 800, 1200, 1600], 800),
  photo('A92', 'journee-2026-04-25', 'journee-2026-04-25-jeunes-ecoutent', 'Jeunes participantes à l\'écoute', 1600, 1066, 'center', '#b8b8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A95', 'journee-2026-04-25', 'journee-2026-04-25-jeune-reflechit', 'Jeune participant pensif', 1600, 1066, 'center', '#b8b8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A97', 'journee-2026-04-25', 'journee-2026-04-25-trois-jeunes', 'Trois jeunes participants', 1600, 1066, 'center', '#b8b8b8', 'pending', [480, 800, 1200, 1600], 800),
  photo('A98', 'journee-2026-04-25', 'journee-2026-04-25-prise-de-notes', 'Un participant prend des notes', 1600, 1066, 'center', '#b8b8c8', 'ok', [480, 800, 1200, 1600], 800),
  photo('A99', 'journee-2026-04-25', 'journee-2026-04-25-polo-rose-bras-croises', 'Membre de la fondation en polo rose, bras croisés', 1600, 1066, 'center 35%', '#b8b8b8', 'ok', [480, 800, 1200, 1600], 800),
  photo('B03', 'terrain-agricole', 'terrain-agricole-groupe-avant-depart', 'Groupe en gilets réfléchissants avant le départ', 1080, 607, 'center 40%', '#d8a888', 'pending', [480, 800, 1080], 800),
  photo('B04', 'terrain-agricole', 'terrain-agricole-explication-plantation', 'Jeunes en gilets orange écoutant un encadrant dans une plantation d\'ananas', 1080, 607, 'center 45%', '#a8c8d8', 'pending', [480, 800, 1080], 800),
  photo('B06', 'terrain-agricole', 'terrain-agricole-deux-encadrants', 'Deux encadrants échangent au bord d\'un champ', 1080, 607, 'center 40%', '#282818', 'ok', [480, 800, 1080], 800),
  photo('B10', 'terrain-agricole', 'terrain-agricole-groupe-champ', 'Groupe en gilets réfléchissants au milieu d\'un champ d\'ananas', 1080, 607, 'center 60%', '#68a8d8', 'pending', [480, 800, 1080], 800),
  photo('B13', 'terrain-agricole', 'terrain-agricole-groupe-disperse', 'Le groupe se répartit dans la plantation', 1080, 607, 'center 60%', '#a8c8d8', 'pending', [480, 800, 1080], 800),
  photo('B16', 'terrain-agricole', 'terrain-agricole-observation-plants', 'Participants observant les plants d\'ananas', 1080, 607, 'center 60%', '#c8d8e8', 'pending', [480, 800, 1080], 800),
  photo('B17', 'terrain-agricole', 'terrain-agricole-groupe-aligne-champ', 'Le groupe de la visite au milieu de la plantation, sous un grand ciel', 1080, 607, 'center 60%', '#c8d8e8', 'pending', [480, 800, 1080], 800),
  photo('B20', 'terrain-agricole', 'terrain-agricole-groupe-vue-large', 'Vue large du groupe dans la plantation', 1080, 607, 'center 60%', '#c8d8e8', 'pending', [480, 800, 1080], 800),
  photo('B21', 'terrain-agricole', 'terrain-agricole-encadrant-accroupi', 'Un encadrant accroupi examine un plant', 1080, 607, 'center 60%', '#c8d8e8', 'pending', [480, 800, 1080], 800),
  photo('B23', 'terrain-agricole', 'terrain-agricole-discussion-terrain', 'Deux encadrants en discussion près des hautes herbes', 1080, 607, 'center 40%', '#685838', 'ok', [480, 800, 1080], 800),
  photo('B24', 'terrain-agricole', 'terrain-agricole-echange-terrain', 'Encadrants échangeant sur le terrain', 1080, 607, 'center 40%', '#b8c8d8', 'ok', [480, 800, 1080], 800),
  photo('B26', 'terrain-agricole', 'terrain-agricole-photo-de-groupe', 'Photo de groupe des participants en gilets réfléchissants', 1080, 607, 'center 50%', '#181818', 'pending', [480, 800, 1080], 800),
  photo('B27', 'terrain-agricole', 'terrain-agricole-ecoute-terrain', 'Jeunes en gilets écoutant une explication sur le terrain', 1080, 607, 'center', '#c8d8e8', 'pending', [480, 800, 1080], 800),
  photo('B01', 'nkongsamba', 'nkongsamba-route-en-travaux', 'Route en terre détrempée en travaux', 1080, 607, 'center', '#181818', 'ok', [480, 800, 1080], 800),
  photo('B02', 'nkongsamba', 'nkongsamba-chantier-route', 'Pelleteuse sur un chantier de route, collines en arrière-plan', 1080, 607, 'center', '#68a8f8', 'ok', [480, 800, 1080], 800),
  photo('B09', 'nkongsamba', 'nkongsamba-pelleteuse', 'Pelleteuse en travaux sur une route', 1080, 607, 'center', '#68a8f8', 'ok', [480, 800, 1080], 800),
  photo('B51', 'nkongsamba', 'nkongsamba-arche-groupe', 'Participants sous l\'arche « I love my town Nkongsamba 1er – Ville propre »', 1080, 607, 'center 60%', '#384818', 'pending', [480, 800, 1080], 800),
  photo('B53', 'nkongsamba', 'nkongsamba-arche-trois', 'Trois participants posent sous l\'arche de Nkongsamba', 1080, 607, 'center 60%', '#b8c8c8', 'pending', [480, 800, 1080], 800),
  photo('B56', 'nkongsamba', 'nkongsamba-arche-seul', 'Un participant pose sous l\'arche de Nkongsamba', 1080, 607, 'center 60%', '#d8d8d8', 'pending', [480, 800, 1080], 800),
  photo('B30', 'mont-et-lac', 'mont-et-lac-a-cheval', 'Un membre de l\'équipe à cheval sur les pentes verdoyantes', 810, 1080, 'center 50%', '#080808', 'ok', [480, 800], 800),
  photo('B35', 'mont-et-lac', 'mont-et-lac-cheval-bras-ouverts', 'Deux membres de l\'équipe posent à côté d\'un cheval, bras ouverts', 810, 1080, 'center 50%', '#080808', 'ok', [480, 800], 800),
  photo('B40', 'mont-et-lac', 'mont-et-lac-lac-de-cratere', 'Vue sur un lac de cratère entouré de collines', 810, 1080, 'center 55%', '#c8d8e8', 'ok', [480, 800], 800),
  photo('B41', 'mont-et-lac', 'mont-et-lac-bord-du-lac', 'Membre de l\'équipe au bord d\'un lac de cratère', 810, 1080, 'center 40%', '#283838', 'ok', [480, 800], 800),
  photo('B44', 'mont-et-lac', 'mont-et-lac-contemple-le-lac', 'Membre de l\'équipe contemplant le lac', 810, 1080, 'center 40%', '#587868', 'ok', [480, 800], 800),
  photo('B60', 'randonnee-jeunesse', 'randonnee-jeunesse-sentier-foret', 'Une jeune participante sur un sentier en forêt', 1080, 607, 'center 60%', '#c8a888', 'pending', [480, 800, 1080], 800),
  photo('B62', 'randonnee-jeunesse', 'randonnee-jeunesse-rocher-sommet', 'Deux participantes sur un rocher au sommet', 1080, 607, 'center', '#e8a888', 'pending', [480, 800, 1080], 800),
  photo('B63', 'randonnee-jeunesse', 'randonnee-jeunesse-echauffement', 'Échauffement collectif avant la randonnée', 1080, 607, 'center', '#c8d8e8', 'pending', [480, 800, 1080], 800),
  photo('B65', 'randonnee-jeunesse', 'randonnee-jeunesse-echauffement-2', 'Échauffement en cercle sous les arbres', 1080, 607, 'center', '#a87858', 'pending', [480, 800, 1080], 800),
  photo('B68', 'randonnee-jeunesse', 'randonnee-jeunesse-pause-rocher', 'Pause des participants sur la roche', 1080, 607, 'center', '#786858', 'pending', [480, 800, 1080], 800),
  photo('B69', 'randonnee-jeunesse', 'randonnee-jeunesse-etirements', 'Étirements au sommet', 1080, 607, 'center', '#d8a888', 'pending', [480, 800, 1080], 800),
  photo('B73', 'randonnee-jeunesse', 'randonnee-jeunesse-vue-sur-la-ville', 'Un jeune contemple la ville depuis le sommet', 1080, 607, 'center', '#d8e8e8', 'pending', [480, 800, 1080], 800),
  photo('B75', 'randonnee-jeunesse', 'randonnee-jeunesse-arrivee-sommet', 'Le groupe célèbre l\'arrivée au sommet, bras levés', 1080, 607, 'center 45%', '#c8d8d8', 'pending', [480, 800, 1080], 800),
  photo('B77', 'randonnee-jeunesse', 'randonnee-jeunesse-groupe-sommet', 'Photo de groupe au sommet, la ville en contrebas', 1080, 607, 'center 45%', '#b8c8d8', 'pending', [480, 800, 1080], 800),
  photo('B80', 'randonnee-jeunesse', 'randonnee-jeunesse-arbre-sentier', 'Un jeune s\'appuie à un arbre sur le sentier', 1080, 607, 'center', '#384828', 'pending', [480, 800, 1080], 800),
  photo('B82', 'randonnee-jeunesse', 'randonnee-jeunesse-file-en-foret', 'Le groupe progresse en file sur un sentier forestier', 1080, 607, 'center', '#384828', 'pending', [480, 800, 1080], 800),
  photo('B84', 'randonnee-jeunesse', 'randonnee-jeunesse-sommet-vue-large', 'Le groupe au sommet, vue sur la ville', 1080, 607, 'center 45%', '#b8c8d8', 'pending', [480, 800, 1080], 800),
  photo('B85', 'randonnee-jeunesse', 'randonnee-jeunesse-chasuble-de-dos', 'Participant de dos en chasuble verte dans la forêt', 1080, 607, 'center', '#88e868', 'ok', [480, 800, 1080], 800),
];

/** Remplaçantes d'une photo en attente d'accord, quand la page n'en donne pas de publiable (table du catalogue). */
export const PHOTO_FALLBACKS: Record<string, readonly string[]> = {
  A16: ['A31'],
  A85: ['A44'],
  A88: ['A34'],
};
