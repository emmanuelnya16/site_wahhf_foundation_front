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
            className={`group flex items-center justify-between gap-1 p-2.5 sm:p-3 rounded-2xl border transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F3D2E] ${
              isHighlighted
                ? 'bg-[#0F3D2E] text-[#F5F1E8] border-[#E8A317] shadow-xs'
                : 'bg-[#F5F1E8]/65 hover:bg-[#F5F1E8] border-[#0F3D2E]/12 text-[#1B1B18]'
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-[11px] font-bold flex items-center justify-center shrink-0 transition-colors ${
                  isHighlighted
                    ? 'bg-[#E8A317] text-[#1B1B18]'
                    : 'bg-[#0F3D2E]/10 text-[#0F3D2E]'
                }`}
              >
                {country.code}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className={`font-medium text-xs sm:text-sm truncate ${
                      isHighlighted ? 'text-[#F5F1E8]' : 'text-[#1B1B18]'
                    }`}
                  >
                    {country.nameFr}
                  </span>
                  {!country.isEU && (
                    <span
                      className={`px-1.5 py-0.5 text-[9px] sm:text-[10px] rounded font-semibold shrink-0 ${
                        isHighlighted
                          ? 'bg-[#E8A317] text-[#1B1B18]'
                          : 'bg-[#E8A317]/30 text-[#1B1B18]'
                      }`}
                    >
                      Hors UE
                    </span>
                  )}
                </div>
                <p
                  className={`text-[10px] sm:text-[11px] leading-snug ${
                    isHighlighted ? 'text-[#E8A317]' : 'text-[#1B1B18]/65'
                  }`}
                >
                  Pays #{country.order} · Voir la fiche
                </p>
              </div>
            </div>

            <ArrowUpRight
              className={`w-4 h-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                isHighlighted ? 'text-[#E8A317]' : 'text-[#0F3D2E]'
              }`}
            />
          </Link>
        );
      })}
    </div>
  );
}
