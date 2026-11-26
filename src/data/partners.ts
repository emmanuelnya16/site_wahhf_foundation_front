/**
 * Partenaires de WAHHF Foundation (lot 12) : section « Nos partenaires » de /accueil.
 * Le groupe IROKO (déjà cité sur le site), puis les trois partenaires dont la fondation a donné le logo le 26 novembre
 * 2026 (dossier logo_partenaire/), affichés en ligne à votre demande. Noms écrits comme sur leurs logos. Rien n'est
 * inventé : sans logo, la carte montre le nom en texte ; sans site confirmé, la carte n'est pas un lien ; sans pays
 * confirmé, rien n'est écrit.
 * Ajouter un partenaire : une ligne ici, avec confirme: false tant que la fondation n'a pas confirmé le partenariat et
 * l'accord pour l'afficher (en ligne, il n'apparaît qu'avec confirme: true ; en développement, toujours).
 * Logo : WebP de 160 px de haut (deux fois la taille affichée) dans public/logos-partenaires/, tiré du fichier fourni ; affiché
 * en niveaux de gris, en couleur au survol.
 * Question à la fondation : docs/contenus-a-fournir.md, question 212.
 */
export interface Partenaire {
  id: string;
  /** Nom tel que le partenaire l'écrit (non traduit) */
  nom: string;
  /** Chemin du logo dans public/ (« /logos-partenaires/iroko.webp »), ou null : le nom s'affiche en texte */
  logo: string | null;
  /** Site officiel, ou null tant qu'il n'est pas confirmé */
  lien: string | null;
  /** Pays, en français (traduit dans contenu.partenaires.<id>.pays), ou null */
  pays: string | null;
  /** true : partenariat et accord d'affichage confirmés par la fondation */
  confirme: boolean;
}

export const PARTENAIRES: Partenaire[] = [
  // Le groupe IROKO : cité partout sur le site comme soutien de la fondation. Site et pays à confirmer (question 212)
  { id: 'iroko', nom: 'IROKO Group', logo: '/logos-partenaires/iroko.webp', lien: null, pays: null, confirme: true },
  // Logos donnés le 26 novembre 2026. Nom complet, site et pays à confirmer ; logos de meilleure définition pour CRTV et
  // L'Eldorado (question 212)
  { id: 'crtv', nom: 'CRTV', logo: '/logos-partenaires/crtv.webp', lien: null, pays: null, confirme: true },
  { id: 'eldorado', nom: 'L’Eldorado Digital Academy', logo: '/logos-partenaires/eldorado.webp', lien: null, pays: null, confirme: true },
  { id: 'wahhf-bio-delices', nom: 'Wahhf bio délices', logo: '/logos-partenaires/wahhf-bio-delices.webp', lien: null, pays: null, confirme: true },
];

/** Les partenaires affichés : confirmés en ligne, tous en développement. */
export const partenairesAffiches = (): Partenaire[] => PARTENAIRES.filter((p) => p.confirme || import.meta.env.DEV);

/** À partir de ce nombre, les logos défilent sur deux rangées ; en dessous, une grille fixe centrée. */
export const SEUIL_BANDE = 6;
