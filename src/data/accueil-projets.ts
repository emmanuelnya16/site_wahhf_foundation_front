/**
 * Projets phares de la page Accueil (/accueil, section « Projet phare », lot 11.4).
 *
 * Règle des faits : en production, la section affiche le premier projet confirmé (confirme: true). Un projet non confirmé
 * sert d'exemple : il passe devant en développement, et ne s'affiche jamais en ligne (question 203).
 * Confirmer un projet : des faits validés par la fondation, des chiffres datés et sourcés, puis confirme: true.
 * Textes : le français ici, l'anglais et l'allemand dans src/locales/accueil (contenu.projets.<id>, mêmes champs).
 */
export interface JalonProjet {
  /** Valeur du panneau (« 10 », « A1 ») ; absente : le libellé seul */
  valeur?: string;
  libelle: string;
}

export interface ProjetPhare {
  id: string;
  confirme: boolean;
  surtitre: string;
  /** Nom du projet (première ligne du titre) */
  titre: string;
  /** Suite du titre, après le tiret ; un saut de ligne la coupe en deux */
  accroche: string;
  texte: string;
  /** 3 à 5 panneaux le long de la route, dans l'ordre */
  jalons: JalonProjet[];
  /** Ce qui avance sur la route */
  icone: 'clinique' | 'livre';
  /** Repères du catalogue : la photo, puis ses remplaçantes */
  photo: readonly string[];
  /** object-position de la photo dans le ticket */
  cadrage?: string;
  lienSoutenir: string;
  lienEnSavoirPlus: string;
}

export const PROJETS: ProjetPhare[] = [
  {
    // Exemple de la capture (docs/references/accueil/sections/5-projet-phare.png) : rien n'est confirmé (question 203)
    id: 'wahhf-on-wheel',
    confirme: false,
    surtitre: 'Projet phare',
    titre: 'WAHHF on Wheel',
    accroche: 'la santé au plus\nprès des villages',
    texte:
      'Notre clinique mobile parcourt les zones les plus reculées du Cameroun pour offrir des soins primaires gratuits : consultations, vaccinations, dépistages et sensibilisation à l’hygiène.',
    jalons: [
      { valeur: '10', libelle: 'villages visités chaque mois' },
      { valeur: '2 000+', libelle: 'patients pris en charge' },
      { valeur: '40', libelle: 'jeunes formés en santé communautaire' },
    ],
    icone: 'clinique',
    photo: ['B01'],
    cadrage: '40% 60%',
    lienSoutenir: '/faire-un-don?affectation=sante',
    lienEnSavoirPlus: '/nos-actions?domaine=sante',
  },
  {
    id: 'academie',
    confirme: true,
    surtitre: 'Projet phare',
    titre: 'L’Académie de langues',
    accroche: 'l’Europe se prépare ici',
    texte:
      'Un programme gratuit d’apprentissage de l’allemand et de l’anglais, du niveau A1 au niveau C1, avec des guides d’orientation vérifiés vers 10 pays européens.',
    // Les mêmes mots que la frise des niveaux du site (accueil, Académie)
    jalons: [
      { valeur: 'A1', libelle: 'Découverte' },
      { valeur: 'A2', libelle: 'Échanges courants' },
      { valeur: 'B1', libelle: 'Autonomie' },
      { valeur: 'B2', libelle: 'Indépendance' },
      { valeur: 'C1', libelle: 'Maîtrise' },
    ],
    icone: 'livre',
    photo: ['A61'],
    cadrage: '62% 50%',
    lienSoutenir: '/faire-un-don?affectation=mobilite-langues',
    lienEnSavoirPlus: '/mobilite-langues',
  },
];

/** Le projet affiché : le premier confirmé ; en développement, le premier de la liste, même s'il ne l'est pas */
export function projetPhare(): ProjetPhare | undefined {
  return PROJETS.find((p) => p.confirme || !import.meta.env.PROD);
}
