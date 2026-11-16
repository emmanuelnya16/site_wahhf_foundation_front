import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/wahhf/SEO';
import { PrimaryButton, SecondaryButton, DonateButton } from '../components/wahhf/Buttons';
import { useNoIndex } from '../lib/useNoIndex';
import { COUNTRIES_DATA } from '../services/api';

/** Liste de liens propre à un contexte (les 10 pays, les niveaux, les articles…). */
export function NotFoundLinks({ heading, links }: { heading: string; links: Array<{ to: string; label: string }> }) {
  return (
    <div className="space-y-4">
      <h2 className="font-serif font-normal text-2xl text-[#1B1B18] dark:text-[#F5F1E8]">{heading}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link
              to={l.to}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-white dark:bg-[#132A21] border border-[#0F3D2E]/15 dark:border-[#F5F1E8]/15 text-sm font-medium text-[#1B1B18] dark:text-[#F5F1E8] hover:border-[#E8A317] transition-colors"
            >
              <span>{l.label}</span>
              <ArrowUpRight aria-hidden="true" className="w-4 h-4 text-gold-text dark:text-[#E8A317] shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Les 10 pays accompagnés : le cas le plus fréquent d'un lien mal copié depuis WhatsApp. */
export const COUNTRY_LINKS = COUNTRIES_DATA.map((c) => ({
  to: `/accompagnement/pays/${c.slug}`,
  label: `${c.flag} ${c.name}${c.isEU ? '' : ' (hors Union européenne)'}`,
}));

/**
 * Page « introuvable » : adresse inconnue, ou paramètre inconnu (pays, niveau, article, guide).
 * Elle n'est jamais indexée (noindex) et dit clairement ce qui se passe, au lieu d'afficher un autre contenu.
 * Le statut HTTP 404 dépend de l'hébergement : voir public/.htaccess.
 */
export default function NotFoundPage({
  title = 'Cette page n’existe pas ou a changé d’adresse',
  message,
  children,
}: {
  title?: string;
  message?: ReactNode;
  /** Liens propres au contexte, affichés avant les liens généraux. */
  children?: ReactNode;
}) {
  useNoIndex();
  const { pathname } = useLocation();

  return (
    <>
      <SEO title="Page introuvable" description="Cette adresse ne correspond à aucune page du site WAHHF Foundation." />

      <section className="surface-green pt-32 pb-16 bg-[#0F3D2E] text-[#F5F1E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A317]">
            Page introuvable (erreur 404)
          </span>
          <h1 className="font-serif font-normal text-[clamp(2rem,4.5vw,3.5rem)] leading-tight">{title}</h1>
          <p className="text-base sm:text-lg text-[#F5F1E8]/85 leading-relaxed break-words">
            {message ?? (
              <>
                L’adresse « {pathname} » ne correspond à aucune page du site. Le lien a peut-être été mal copié ou
                la page a été déplacée.
              </>
            )}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-12">
        {children ?? <NotFoundLinks heading="Les 10 pays accompagnés" links={COUNTRY_LINKS} />}

        <div className="space-y-4">
          <h2 className="font-serif font-normal text-2xl text-[#1B1B18] dark:text-[#F5F1E8]">Où aller maintenant ?</h2>
          <div className="flex flex-wrap items-center gap-3">
            <PrimaryButton to="/candidater">Candidater gratuitement</PrimaryButton>
            <DonateButton />
            <SecondaryButton to="/">Retour à l’accueil</SecondaryButton>
          </div>
        </div>
      </section>
    </>
  );
}
