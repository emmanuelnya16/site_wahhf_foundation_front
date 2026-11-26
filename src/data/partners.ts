/**
 * Partenaires de WAHHF Foundation (lot 12) : section « Nos partenaires » de /accueil.
 * Seuls les partenaires déjà cités sur le site y figurent ; aujourd'hui, le groupe IROKO, dont la fondation est la
 * branche sociale (Qui sommes-nous, Partenaires, accueil). Rien n'est inventé : sans logo fourni, la carte montre le nom
 * en texte ; sans site confirmé, la carte n'est pas un lien ; sans pays confirmé, rien n'est écrit.
 * Ajouter un partenaire : une ligne ici, avec confirme: false tant que la fondation n'a pas confirmé le partenariat et
 * l'accord pour l'afficher (en ligne, il n'apparaît qu'avec confirme: true ; en développement, toujours).
 * Logo : SVG ou PNG en double résolution dans public/partenaires/ (affiché en niveaux de gris, en couleur au survol).
 * Question à la fondation : docs/contenus-a-fournir.md, question 212.
 */
export interface Partenaire {
  id: string;
  /** Nom tel que le partenaire l'écrit (non traduit) */
  nom: string;
  /** Chemin du logo dans public/ (« /partenaires/iroko.svg »), ou null : le nom s'affiche en texte */
  logo: string | null;
  /** Site officiel, ou null tant qu'il n'est pas confirmé */
  lien: string | null;
  /** Pays, en français (traduit dans contenu.partenaires.<id>.pays), ou null */
  pays: string | null;
  /** true : partenariat et accord d'affichage confirmés par la fondation */
  confirme: boolean;
}

export const PARTENAIRES: Partenaire[] = [
  // Le groupe IROKO : cité partout sur le site comme soutien de la fondation. Logo, site et pays à fournir (question 212)
  { id: 'iroko', nom: 'IROKO Group', logo: null, lien: null, pays: null, confirme: true },
];

/** Les partenaires affichés : confirmés en ligne, tous en développement. */
export const partenairesAffiches = (): Partenaire[] => PARTENAIRES.filter((p) => p.confirme || import.meta.env.DEV);

/** À partir de ce nombre, les logos défilent sur deux rangées ; en dessous, une grille fixe centrée. */
export const SEUIL_BANDE = 6;
