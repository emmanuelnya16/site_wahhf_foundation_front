import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { ConsentChoice, getConsent, setConsent } from '../../lib/consent';
import { PrimaryButton, SecondaryButton } from './Buttons';

/*
 * Bandeau cookies aux couleurs du contrat (décision du 16/11, début du lot 6) : ce qui flotte prend le fond
 * papier (canopée en sombre), le rayon des cartes et l'ombre unique (en sombre : bordure trait-nuit) ;
 * texte en 15 px au moins ; boutons du site (44 px). Textes inchangés.
 */

export default function CookieBanner() {
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
      aria-label="Gestion des cookies et de la vie privée"
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-(--z-banner) rounded-card bg-surface-raised shadow-overlay dark:border dark:border-border-input p-5 text-text"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck aria-hidden="true" className="w-5 h-5 text-link shrink-0 mt-0.5" />
        <div className="space-y-2">
          <p className="text-body font-bold text-text">Respect de votre vie privée (RGPD)</p>
          <p className="text-meta text-text-secondary">
            WAHHF Foundation utilise uniquement des cookies techniques nécessaires au bon fonctionnement du site (choix de langue et de thème). Aucun traceur publicitaire n’est activé.{' '}
            <Link to="/confidentialite" className="text-link underline underline-offset-4 decoration-1 hover:decoration-2">
              Politique de confidentialité
            </Link>
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <SecondaryButton size="sm" onClick={() => handleChoice('essential')}>
              Refuser le non-essentiel
            </SecondaryButton>
            <PrimaryButton size="sm" onClick={() => handleChoice('all')}>
              Accepter
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}
