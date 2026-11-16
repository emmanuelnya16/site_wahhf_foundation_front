import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { ConsentChoice, getConsent, setConsent } from '../../lib/consent';

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
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-(--z-banner) rounded-[20px] bg-surface-raised border border-border-input p-5 shadow-xl text-text"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs sm:text-sm">
          <p className="font-semibold">Respect de votre vie privée (RGPD)</p>
          <p className="text-text-tertiary leading-relaxed">
            WAHHF Foundation utilise uniquement des cookies techniques nécessaires au bon fonctionnement du site (choix de langue et de thème). Aucun traceur publicitaire n’est activé.{' '}
            <Link to="/confidentialite" className="underline text-accent">
              Politique de confidentialité
            </Link>
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              className="px-4 py-2 rounded-pill border border-nuit/30 dark:border-creme/30 text-xs font-medium hover:bg-nuit/5 dark:hover:bg-creme/10 transition-colors cursor-pointer"
            >
              Refuser le non-essentiel
            </button>
            <button
              type="button"
              onClick={() => handleChoice('all')}
              className="px-4 py-2 rounded-pill bg-action text-on-action text-xs font-medium hover:bg-action-hover transition-colors cursor-pointer"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
