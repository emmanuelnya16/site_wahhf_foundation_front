/**
 * Page /transparence (groupe 7.2, audit TRA-01) : tant que la fondation n'a fourni aucune donnée financière ni
 * statutaire (forme juridique, numéro d'enregistrement, budget, part de chaque financeur, rapport annuel), la page reste
 * en ligne mais aucun lien n'y mène : ni le footer, ni la page Notre impact, ni la page Don.
 * Passer à true quand ces données sont publiées sur la page : les liens du footer et de Notre impact reviennent.
 * Questions correspondantes : docs/contenus-a-fournir.md (demande A, questions 88-89 et celles du groupe 7.2).
 */
export const TRANSPARENCY_DATA_PUBLISHED = false;
