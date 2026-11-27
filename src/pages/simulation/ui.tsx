import type { MouseEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { SimConfirme } from '../../data/simulation';
import { followAnchorLink } from '../../lib/scroll';
import { aConfirmer } from './donnees';

/** Badge « à confirmer » (développement seulement) sur un fait que la fondation doit encore valider */
export function BadgeAConfirmer({ item }: { item: SimConfirme }) {
  const { t } = useTranslation();
  if (!aConfirmer(item)) return null;
  return <span className="sim-a-confirmer">{t('simulation.aConfirmer')}</span>;
}

/** En-tête de section : surtitre (Barlow), titre h2 (Jost), introduction facultative */
export function Tete({ id, cle, intro = false, children }: { id: string; cle: string; intro?: boolean; children?: ReactNode }) {
  const { t } = useTranslation();
  return (
    <div className="sim-tete">
      <p className="ac-surtitre">{t(`simulation.${cle}.surtitre`)}</p>
      <h2 id={id} className="ac-h2 sim-h2">
        {children ?? t(`simulation.${cle}.titre`)}
      </h2>
      {intro && <p className="ac-paragraphe">{t(`simulation.${cle}.intro`)}</p>}
    </div>
  );
}

/** Lien vers une ancre de la page : défilement (sous l'en-tête fixe) et focus sur la cible */
export function Ancre({ to, className, children }: { to: string; className?: string; children: ReactNode }) {
  return (
    <a href={`#${to}`} className={className} onClick={(event: MouseEvent<HTMLAnchorElement>) => followAnchorLink(event, to)}>
      {children}
    </a>
  );
}
