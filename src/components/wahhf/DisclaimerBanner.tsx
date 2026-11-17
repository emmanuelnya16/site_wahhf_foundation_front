import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InfoBox from './InfoBox';

interface DisclaimerBannerProps {
  compact?: boolean;
  className?: string;
}

/**
 * Avertissement anti-arnaque standard — obligatoire sur toutes les pages du domaine Mobilité & Langues,
 * Académie, Accompagnement et Candidater. C'est un encadré d'information (contrat §3.2 et §8), posé juste
 * sous le titre de la page : premier élément après lui, texte en taille courante, jamais replié.
 */
export default function DisclaimerBanner({ compact = false, className = '' }: DisclaimerBannerProps) {
  const { t } = useTranslation();

  return (
    <InfoBox title={t('disclaimer.title')} className={className}>
      <p>
        Nos cours et notre accompagnement sont gratuits. Nous ne vendons ni visa ni emploi et ne garantissons aucun résultat. Nous ne vous demandons jamais d’argent. Les décisions appartiennent aux autorités et aux établissements concernés. Vérifiez toujours les informations sur les sites officiels.
      </p>

      {!compact && (
        <p>
          <Link to="/accompagnement/eviter-les-arnaques" className="text-link underline underline-offset-4">
            Comment reconnaître une fausse offre et éviter les arnaques ?
          </Link>
        </p>
      )}
    </InfoBox>
  );
}
