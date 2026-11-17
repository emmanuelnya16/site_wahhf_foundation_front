import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { EUROPE_SUPPORTED_COUNTRIES } from '../../data/countries';
import { cn } from '../../lib/utils';

interface CountryListProps {
  activeCountrySlug: string | null;
  onHoverCountry: (slug: string | null) => void;
  /**
   * Groupe 7.4 (page Accompagnement) : « Hors UE » en couleur d'alerte (ambre, avec le triangle), comme le badge des
   * fiches pays. Par défaut (accueil, Notre impact) : encre douce, inchangé.
   */
  nonEuWarning?: boolean;
}

/**
 * Les 10 pays accompagnés en lignes de liste (ajout du 16/11 au §8) : code, nom, « Hors UE » le cas échéant, filet
 * entre les lignes ; chaque ligne est le lien vers la fiche. Plus de cadres, plus de « Pays #01 · Voir la fiche »
 * (liste §5 et §6). Le pays survolé ou lié à la mini-carte est souligné : un repère autre que la couleur.
 *
 * Îlot clair : la liste est posée dans le panneau blanc de la carte de présence (PresenceSection), qui reste blanc
 * dans les deux thèmes jusqu'à l'étape de l'accueil. Elle garde donc des couleurs fixes de la palette claire (encre,
 * encre douce, filet, forêt) au lieu des tokens sémantiques, qui passeraient en clair sur blanc en thème sombre.
 */
export default function CountryList({ activeCountrySlug, onHoverCountry, nonEuWarning = false }: CountryListProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-6">
      {EUROPE_SUPPORTED_COUNTRIES.map((country) => {
        const isHighlighted = activeCountrySlug === country.slug;
        return (
          <li key={country.slug} className="border-t border-border-subtle">
            <Link
              to={`/accompagnement/pays/${country.slug}`}
              aria-label={`${country.name}${!country.isEU ? ', Hors Union européenne' : ''} — Voir la fiche`}
              onMouseEnter={() => onHoverCountry(country.slug)}
              onMouseLeave={() => onHoverCountry(null)}
              onFocus={() => onHoverCountry(country.slug)}
              onBlur={() => onHoverCountry(null)}
              className={`flex min-h-11 items-center gap-3 py-2.5 transition-colors duration-(--dur-fast) ${
                isHighlighted ? 'text-link underline underline-offset-4 decoration-2' : 'text-text hover:text-link'
              }`}
            >
              <span aria-hidden="true" className="w-7 shrink-0 text-meta text-text-secondary tabular-nums">
                {country.code}
              </span>
              {/* Nom et « Hors UE » : le repère passe d'un bloc sous le nom quand la colonne est étroite (390 px) */}
              <span className="flex min-w-0 flex-wrap items-center gap-x-3">
                <span className="text-body">{country.name}</span>
                {!country.isEU && (
                  <span className={cn('inline-flex items-center gap-1 whitespace-nowrap text-meta', nonEuWarning ? 'font-semibold text-warning' : 'text-text-secondary')}>
                    {nonEuWarning && <AlertTriangle aria-hidden="true" className="w-4 h-4 shrink-0" />}
                    Hors UE
                  </span>
                )}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
