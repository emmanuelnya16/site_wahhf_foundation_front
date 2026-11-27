import { useLocalize } from '../../lib/localize';
import {
  SIM_ENGAGEMENTS,
  SIM_ETAPES,
  SIM_EXEMPLES,
  SIM_FAMILLES,
  SIM_FAQ,
  SIM_LIMITE,
  SIM_NON_PUBLICS,
  SIM_OFFRES,
  SIM_PUBLICS,
  type SimConfirme,
} from '../../data/simulation';

/** En développement, les éléments non confirmés s'affichent avec le badge « à confirmer » ; en ligne, jamais. */
export const SHOW_A_CONFIRMER = !import.meta.env.PROD;

/** Un élément s'affiche s'il est confirmé, s'il protège le visiteur (limites), ou en développement. */
export const affichables = <T extends SimConfirme>(items: readonly T[]): T[] =>
  items.filter((item) => item.confirme || item.protection || SHOW_A_CONFIRMER);

/** Le badge « à confirmer » : seulement en développement, sur un élément non confirmé. */
export const aConfirmer = (item: SimConfirme) => SHOW_A_CONFIRMER && !item.confirme;

/** Les données du programme dans la langue de la page (surcouches simulation.contenu.*), filtrées. */
export function useSimulation() {
  const { localized, localizedList } = useLocalize();
  const liste = <T extends SimConfirme>(items: readonly T[], cle: string) =>
    affichables(localizedList(items, `simulation.contenu.${cle}`, (item) => item.id));
  return {
    offres: liste(SIM_OFFRES, 'offres'),
    publics: liste(SIM_PUBLICS, 'publics'),
    nonPublics: liste(SIM_NON_PUBLICS, 'nonPublics'),
    exemples: liste(SIM_EXEMPLES, 'exemples'),
    etapes: liste(SIM_ETAPES, 'etapes'),
    familles: liste(SIM_FAMILLES, 'familles'),
    engagements: liste(SIM_ENGAGEMENTS, 'engagements'),
    limite: localized(SIM_LIMITE, 'simulation.contenu.limite'),
    faq: liste(SIM_FAQ, 'faq'),
  };
}
