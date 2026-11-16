import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { EUROPE_SUPPORTED_COUNTRIES } from '../../data/countries';

interface CountryListProps {
  activeCountrySlug: string | null;
  onHoverCountry: (slug: string | null) => void;
}

export default function CountryList({
  activeCountrySlug,
  onHoverCountry,
}: CountryListProps) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {EUROPE_SUPPORTED_COUNTRIES.map((country) => {
        const isHighlighted = activeCountrySlug === country.slug;

        return (
          <Link
            key={country.slug}
            to={`/accompagnement/pays/${country.slug}`}
            aria-label={`${country.nameFr}, Pays #${country.order}${
              !country.isEU ? ', Hors Union européenne' : ''
            } — Voir la fiche`}
            onMouseEnter={() => onHoverCountry(country.slug)}
            onMouseLeave={() => onHoverCountry(null)}
            onFocus={() => onHoverCountry(country.slug)}
            onBlur={() => onHoverCountry(null)}
            className={`group flex items-center justify-between gap-1 p-2.5 sm:p-3 rounded-2xl border transition-colors duration-(--dur-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foret ${
              isHighlighted
                ? 'bg-action text-on-action border-or shadow-xs'
                : 'bg-creme/65 hover:bg-creme border-foret/12 text-encre'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-pill text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                  isHighlighted
                    ? 'bg-or text-encre'
                    : 'bg-foret/10 text-foret'
                }`}
              >
                {country.code}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`font-medium text-xs sm:text-sm truncate ${
                      isHighlighted ? 'text-creme' : 'text-encre'
                    }`}
                  >
                    {country.nameFr}
                  </span>
                  {!country.isEU && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] rounded font-semibold shrink-0 ${
                        isHighlighted
                          ? 'bg-or text-encre'
                          : 'bg-or/30 text-encre'
                      }`}
                    >
                      Hors UE
                    </span>
                  )}
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] leading-snug ${
                    isHighlighted ? 'text-or' : 'text-encre/65'
                  }`}
                >
                  Pays #{country.order} · Voir la fiche
                </p>
              </div>
            </div>

            <ArrowUpRight
              className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isHighlighted ? 'text-or' : 'text-foret'
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
