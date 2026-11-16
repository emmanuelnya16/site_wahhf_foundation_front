import { useTranslation } from 'react-i18next';

/** Un résultat réel : une valeur, ce qu'elle compte, sa date et sa source (contrat §7, section 6 ; T-11). */
export interface HomeFigure {
  value: string;
  label: string;
  date: string;
  source: string;
}

/**
 * À remplir par la fondation (par exemple : participants au First Open Day du 25 avril 2026, inscrits par cohorte).
 * Tant qu'il y a moins de deux résultats datés et sourcés, la section n'est pas affichée : l'accueil compte 7 sections.
 */
export const HOME_FIGURES: HomeFigure[] = [];

/**
 * 6. Chiffres réels datés (nuit) : 2 à 4 résultats en texte fixe, chacun avec sa date et sa source. Plus de compteur
 * animé (Counter reste dans src/components/wahhf, utilisé par /notre-impact).
 */
export default function FiguresSection() {
  const { t } = useTranslation();
  if (HOME_FIGURES.length < 2) return null;
  return (
    <section id="chiffres" className="surface-green section-space bg-surface-inverse text-text-on-inverse">
      <div className="container-page space-y-10">
        <h2 className="text-section-title text-text-on-inverse">{t('home.stats.title')}</h2>
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_FIGURES.map((figure) => (
            <div key={figure.label} className="border-t border-border-subtle-on-inverse pt-5">
              <dt className="text-body text-text-secondary-on-inverse">{figure.label}</dt>
              <dd className="mt-2 text-page-title tabular-nums text-text-on-inverse">{figure.value}</dd>
              <dd className="mt-2 text-meta text-text-secondary-on-inverse">
                {figure.date} · {figure.source}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
