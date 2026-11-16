import { ShieldAlert, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface DisclaimerBannerProps {
  compact?: boolean;
  className?: string;
}

/**
 * Composant d'avertissement standard réutilisable — obligatoire sur toutes les pages
 * du domaine Mobilité & Langues, Académie, Accompagnement et Candidater.
 */
export default function DisclaimerBanner({ compact = false, className = '' }: DisclaimerBannerProps) {
  const { t } = useTranslation();

  return (
    <aside
      aria-label={t('disclaimer.title')}
      className={`surface-green rounded-card border border-or/45 bg-nuit text-creme p-5 sm:p-7 shadow-sm ${className}`}
    >
      <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-5">
        <div className="w-11 h-11 rounded-2xl bg-or/20 border border-or/40 flex items-center justify-center shrink-0 text-or">
          <ShieldAlert className="w-6 h-6" />
        </div>

        <div className="flex-1 space-y-2.5">
          <p className="text-sm sm:text-base leading-relaxed text-creme/95 font-normal">
            « Nos cours et notre accompagnement sont gratuits. Nous ne vendons ni visa ni emploi et ne garantissons aucun résultat. Nous ne vous demandons jamais d’argent. Les décisions appartiennent aux autorités et aux établissements concernés. Vérifiez toujours les informations sur les sites officiels. »
          </p>

          {!compact && (
            <div className="pt-1 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-or">
              <Link
                to="/accompagnement/eviter-les-arnaques"
                className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-white transition-colors"
              >
                <Info className="w-4 h-4" />
                Comment reconnaître une fausse offre et éviter les arnaques ?
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
