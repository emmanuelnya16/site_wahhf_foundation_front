import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { DomainItem, imageSrcSet } from '../../services/api';

interface DomainCardProps {
  key?: string | number;
  domain: DomainItem;
  total?: string;
}

/**
 * Carte domaine d'action : coins très arrondis (24 px), photo en haut avec ratio réservé,
 * étiquette « DOMAINE / 01 / 06 », titre, deux lignes, flèche, et grand numéro en filigrane (01, 02...)
 * très pâle derrière le texte.
 */
export default function DomainCard({ domain, total = '06' }: DomainCardProps) {
  return (
    <Link
      to={domain.link}
      className="group relative flex flex-col rounded-card overflow-hidden bg-surface-raised border border-border-subtle shadow-[0_10px_30px_-12px_rgba(15,61,46,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(15,61,46,0.2)] transition-[translate,color,background-color,border-color,box-shadow] duration-(--dur-fast) hover:-translate-y-1.5 h-full"
    >
      {/* Photo en haut avec ratio réservé 16:10 et lazy loading */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-foret/10">
        <img
          src={domain.image}
          srcSet={imageSrcSet(domain.image)}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 84vw"
          alt={domain.title}
          loading="lazy"
          decoding="async"
          width={640}
          height={400}
          className="w-full h-full object-cover transition-transform duration-(--dur-screen) ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foret/65 via-transparent to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-block px-3.5 py-1.5 rounded-pill bg-foret/90 backdrop-blur-sm text-gold-on-green text-[11px] font-semibold uppercase tracking-[0.18em] border border-or/30">
            DOMAINE / {domain.number} / {total}
          </span>
        </div>
      </div>

      {/* Corps de la carte avec grand numéro en filigrane très pâle derrière le texte */}
      <div className="relative flex-1 flex flex-col justify-between p-6 sm:p-7 overflow-hidden">
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute -bottom-4 right-4 font-serif font-normal text-[6.5rem] leading-none text-foret/[0.055] dark:text-creme/[0.05] transition-transform duration-(--dur-fast) group-hover:scale-105"
        >
          {domain.number}
        </span>

        <div className="relative z-10">
          <h3 className="font-serif font-normal text-2xl text-text group-hover:text-accent transition-colors mb-2.5">
            {domain.title}
          </h3>
          <p className="text-sm sm:text-base text-text-tertiary line-clamp-2 leading-relaxed">
            {domain.shortDesc}
          </p>
        </div>

        <div className="relative z-10 pt-5 mt-5 border-t border-border-subtle flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-accent">
            {domain.slug === 'mobilite-langues' ? 'Découvrir le hub dédié' : 'Découvrir ce domaine'}
          </span>
          <span className="w-9 h-9 rounded-pill bg-surface-inset text-accent group-hover:bg-or group-hover:text-encre flex items-center justify-center transition duration-(--dur-fast) group-hover:rotate-45">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
