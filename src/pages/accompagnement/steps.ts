/**
 * Les 5 étapes de l'accompagnement vers l'Europe (groupe 7.4, audit ACCO-01 et ACCO-02) : les 4 étapes et les 5 guides
 * de la page Accompagnement ne font plus qu'une seule suite, chaque étape menant à son guide.
 * - ACCO-01 : l'étape « Connaître les démarches officielles et éviter les arnaques » mène au guide des arnaques (elle
 *   menait au guide d'installation) ; l'installation devient la 5e et dernière étape.
 * - Lue par la page Accompagnement (FilSteps, avec le fil) et par la fin de chaque guide (étape affichée).
 * Titres et descriptions repris des anciennes étapes et des anciennes cartes de guides ; espaces insécables avant « : »
 * et dans « 100 % » (T-19, revue du groupe 7.4).
 */
export interface AccompanimentStep {
  /** Adresse du guide : /accompagnement/<slug> */
  slug: string;
  title: string;
  desc: string;
}

export const ACCOMPANIMENT_STEPS: AccompanimentStep[] = [
  {
    slug: 'comprendre-les-parcours',
    title: 'Comprendre les parcours (études, formation, travail)',
    desc: 'Distinguer avec clarté les conditions d’études universitaires, d’alternance professionnelle (Ausbildung) et de mobilité qualifiée selon votre profil réel.',
  },
  {
    slug: 'preparer-son-dossier',
    title: 'Préparer son dossier (CV, lettre, diplômes, équivalences)',
    desc: 'Rassembler des pièces 100 % authentiques, comprendre les procédures d’équivalence académique et rédiger un dossier lisible aux normes européennes.',
  },
  {
    slug: 'apprendre-la-langue',
    title: 'Apprendre la langue du pays',
    desc: 'Acquérir le niveau linguistique requis (notamment l’allemand de A1 à C1 avec l’Académie WAHHF) avant d’entamer les démarches.',
  },
  {
    slug: 'eviter-les-arnaques',
    title: 'Connaître les démarches officielles et éviter les arnaques',
    desc: 'Consulter exclusivement les portails gouvernementaux et consulaires officiels, et refuser tout intermédiaire payant.',
  },
  {
    slug: 's-installer',
    title: 'Préparer son arrivée et son intégration',
    desc: 'Se préparer aux réalités pratiques de la vie en Europe : logement, assurance et démarches d’arrivée.',
  },
];

/** Étapes au format de FilSteps (le titre mène au guide). */
export const filSteps = (withDesc = true) =>
  ACCOMPANIMENT_STEPS.map((s) => ({ id: s.slug, title: s.title, to: `/accompagnement/${s.slug}`, desc: withDesc ? s.desc : undefined }));
