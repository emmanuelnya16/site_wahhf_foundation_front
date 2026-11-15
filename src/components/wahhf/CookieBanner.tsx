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
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 rounded-[20px] bg-white dark:bg-[#132A21] border border-[#0F3D2E]/20 dark:border-[#F5F1E8]/20 p-5 shadow-xl text-[#1B1B18] dark:text-[#F5F1E8]"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#0F3D2E] dark:text-[#E8A317] shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs sm:text-sm">
          <p className="font-semibold">Respect de votre vie privée (RGPD)</p>
          <p className="text-[#1B1B18]/75 dark:text-[#F5F1E8]/75 leading-relaxed">
            WAHHF Foundation utilise uniquement des cookies techniques nécessaires au bon fonctionnement du site (choix de langue et de thème). Aucun traceur publicitaire n’est activé.{' '}
            <Link to="/confidentialite" className="underline text-[#0F3D2E] dark:text-[#E8A317]">
              Politique de confidentialité
            </Link>
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleChoice('essential')}
              className="px-4 py-2 rounded-full border border-[#0F3D2E]/30 dark:border-[#F5F1E8]/30 text-xs font-medium hover:bg-[#0F3D2E]/5 dark:hover:bg-[#F5F1E8]/10 transition-colors cursor-pointer"
            >
              Refuser le non-essentiel
            </button>
            <button
              type="button"
              onClick={() => handleChoice('all')}
              className="px-4 py-2 rounded-full bg-[#0F3D2E] text-[#F5F1E8] text-xs font-medium hover:bg-[#14523E] transition-colors cursor-pointer"
            >
              Accepter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
