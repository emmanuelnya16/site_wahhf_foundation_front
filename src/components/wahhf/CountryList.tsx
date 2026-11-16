import { Link } from 'react-router-dom';
import { EUROPE_SUPPORTED_COUNTRIES } from '../../data/countries';

interface CountryListProps {
  activeCountrySlug: string | null;
  onHoverCountry: (slug: string | null) => void;
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
export default function CountryList({ activeCountrySlug, onHoverCountry }: CountryListProps) {
  return (
    <ul className="grid grid-cols-2 gap-x-6">
      {EUROPE_SUPPORTED_COUNTRIES.map((country) => {
        const isHighlighted = activeCountrySlug === country.slug;
        return (
          <li key={country.slug} className="border-t border-filet">
            <Link
              to={`/accompagnement/pays/${country.slug}`}
              aria-label={`${country.nameFr}${!country.isEU ? ', Hors Union européenne' : ''} — Voir la fiche`}
              onMouseEnter={() => onHoverCountry(country.slug)}
              onMouseLeave={() => onHoverCountry(null)}
              onFocus={() => onHoverCountry(country.slug)}
              onBlur={() => onHoverCountry(null)}
              className={`flex min-h-11 items-center gap-3 py-2.5 transition-colors duration-(--dur-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foret ${
                isHighlighted ? 'text-foret underline underline-offset-4 decoration-2' : 'text-encre hover:text-foret'
              }`}
            >
              <span aria-hidden="true" className="w-7 shrink-0 text-meta text-encre-douce tabular-nums">
                {country.code}
              </span>
              <span className="text-body min-w-0">{country.nameFr}</span>
              {!country.isEU && <span className="text-meta text-encre-douce">Hors UE</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
