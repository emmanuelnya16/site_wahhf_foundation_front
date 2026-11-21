import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';
import { ConsentChoice, getConsent, setConsent } from '../../lib/consent';
import { PrimaryButton, SecondaryButton } from './Buttons';

/*
 * Bandeau cookies aux couleurs du contrat (décision du 16/11, début du lot 6) : ce qui flotte prend le fond
 * papier (canopée en sombre), le rayon des cartes et l'ombre unique (en sombre : bordure trait-nuit) ;
 * texte en 15 px au moins ; boutons du site (44 px). Textes inchangés.
 */

export default function CookieBanner() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  // Le choix est diffusé (événement) : la vidéo du hero, contenu tiers, se retire aussitôt en cas de refus
  const handleChoice = (choice: ConsentChoice) => {
    setConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={t('ui.cookies.label')}
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-(--z-banner) rounded-card bg-surface-raised shadow-overlay dark:border dark:border-border-input p-5 text-text"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck aria-hidden="true" className="w-5 h-5 text-link shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-body font-bold text-text">{t('ui.cookies.title')}</p>
          <p className="text-meta text-text-secondary">
            {t('ui.cookies.text')}{' '}
            <Link to="/confidentialite" className="text-link underline underline-offset-4 decoration-1 hover:decoration-2">
              {t('ui.cookies.privacy')}
            </Link>
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <SecondaryButton size="sm" onClick={() => handleChoice('essential')}>
              {t('ui.cookies.refuse')}
            </SecondaryButton>
            <PrimaryButton size="sm" onClick={() => handleChoice('all')}>
              {t('ui.cookies.accept')}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
