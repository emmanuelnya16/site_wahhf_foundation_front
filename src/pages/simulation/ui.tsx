import type { MouseEvent, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import type { SimConfirme } from '../../data/simulation';
import { followAnchorLink } from '../../lib/scroll';
import { aConfirmer } from './donnees';
import Lignes from '../accueil/Lignes';

/** Badge « à confirmer » (développement seulement) sur un fait que la fondation doit encore valider */
export function BadgeAConfirmer({ item }: { item: SimConfirme }) {
  const { t } = useTranslation();
  if (!aConfirmer(item)) return null;
  return <span className="sim-a-confirmer">{t('simulation.aConfirmer')}</span>;
}

/** Titre en lignes voulues (tableau dans les textes ; une chaîne seule fait une ligne) */
export function useLignes(cle: string): string[] {
  const { t } = useTranslation();
  const valeur = t(cle, { returnObjects: true }) as string | string[];
  return Array.isArray(valeur) ? valeur : [valeur];
}

/**
 * En-tête de section : surtitre (Barlow), titre h2 (Jost) ligne par ligne, introduction facultative. Dans une Entree,
 * le surtitre arrive, puis les lignes du titre montent sous leur masque, puis l'introduction (simulation.css).
 */
export function Tete({ id, cle, intro = false, children }: { id: string; cle: string; intro?: boolean; children?: ReactNode }) {
  const { t } = useTranslation();
  const lignes = useLignes(`simulation.${cle}.titre`);
  return (
    <div className="sim-tete">
      <p className="ac-surtitre">{t(`simulation.${cle}.surtitre`)}</p>
      <h2 id={id} className="ac-h2 sim-h2">
        {children ?? <Lignes lignes={lignes} />}
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
