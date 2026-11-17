import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { pageShownBefore } from '../../effects/PageTransition';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import { GERMAN_LEVELS_DATA, GermanLevelCourse } from '../../services/api';

/** Étapes du fil A1 → C1 : chaque niveau mène à sa page (contrat §6). */
export const levelSteps = GERMAN_LEVELS_DATA.map((lvl) => ({
  id: lvl.slug,
  label: lvl.level,
  sublabel: lvl.shortTitle,
  to: `/academie/${lvl.slug}`,
}));

/** « Allemand B1 : autonomie » : nom court d'un niveau, en casse de phrase (T-21). */
// Espaces insécables (T-19) : « Allemand B1 » et le deux-points restent sur la même ligne que ce qu'ils lient
export const levelName = (lvl: GermanLevelCourse) => `Allemand${NB}${lvl.level}${NB}: ${lvl.shortTitle.toLowerCase()}`;
const NB = '\u00a0';

/**
 * Arrivée sur la page depuis une autre page du site (pas au premier chargement) : focus sur son titre, pour que le
 * clavier et le lecteur d'écran repartent du haut de la nouvelle page (ACAD-02).
 */
export function useFocusTitleAfterNavigation() {
  const [afterNavigation] = useState(pageShownBefore);
  const { hash } = useLocation();
  useEffect(() => {
    // Adresse avec ancre (#test-niveau) : la page défile jusqu'à elle, le focus ne remonte pas au titre
    if (!afterNavigation || hash) return;
    const frame = requestAnimationFrame(() => {
      const h1 = document.querySelector<HTMLElement>('#contenu h1');
      if (!h1) return;
      h1.tabIndex = -1;
      h1.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

/** Fin de page : une seule action, sur le fond de la page, sans carte nuit (contrat §7, groupe 7.1). */
export function FinalAction({ to, label, tone = 'brume' }: { to: string; label: string; tone?: 'brume' | 'sauge' }) {
  return (
    <section className={`section-space ${tone === 'sauge' ? 'bg-surface-section' : 'bg-surface'}`}>
      <div className="container-page">
        <div className="max-w-[65ch] space-y-5">
          <SectionHeader
            title="Rejoindre la prochaine cohorte"
            subtitle="Un seul formulaire, 5 minutes environ ; aucun document d’identité ni paiement ne vous est demandé."
          />
          <PrimaryButton to={to} size="lg">
            {label}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
