import './i18n';
// Le bouton pause et le prochain événement viennent des pages Événements : leurs textes aussi
import '../events/i18n';
import '../../styles/accueil.css';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import { useLoopControl } from '../events/motion';
import { cn } from '../../lib/utils';
import Hero from './Hero';

/**
 * Nouvelle page « Accueil » (/accueil), lot 11.1 : construite à côté de l'accueil actuel (/), qui ne change pas.
 * Elle se remplit section par section, dans l'ordre ci-dessous (lots 11.2 à 11.6).
 */
export default function AccueilPage() {
  const { t } = useTranslation();
  const title = t('accueil.seo.title');
  const root = useRef<HTMLDivElement>(null);
  const loops = useLoopControl(root);

  // Titre exact du brief (« … | WAHHF Foundation ») : <SEO> ajoute le nom développé, il est repris ici après elle
  useEffect(() => {
    document.title = `${title} | WAHHF Foundation`;
  }, [title]);

  return (
    <div ref={root} className={cn('ac', loops.paused && 'ev-pause')}>
      <SEO title={title} description={t('accueil.seo.description')} />
      <Hero paused={loops.paused} onTogglePause={loops.toggle} />
      {/* 2. Qui sommes-nous en bref (à venir) */}
      {/* 3. Les chiffres (à venir) */}
      {/* 4. Les 6 domaines : design et animation des « Cinq principes », une photo par domaine (à venir) */}
      {/* 5. Projet phare (à venir) */}
      {/* 6. Des parcours qui inspirent (à venir) */}
      {/* 7. Les 10 régions : section existante de Notre impact (à venir) */}
      {/* 8. Apprendre, cultiver, grandir : section existante (à venir) */}
      {/* 9. Quelques événements (à venir) */}
    </div>
  );
}
