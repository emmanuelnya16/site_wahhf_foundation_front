import { ReactNode } from 'react';
import StepNumber from './StepNumber';
import { TextList, TextListItem } from './TextList';
import { cn } from '../../lib/utils';
import { useLocalize } from '../../lib/localize';
import '../../locales/mobilite';

/**
 * « Après votre candidature » (audit ACAD-06, groupe 7.1) : ce qui se passe une fois le formulaire rempli, en étapes
 * numérotées (une vraie suite : StepNumber y a droit, contrat §8). Seules des étapes déjà établies par le site sont
 * décrites. Délai de réponse, date limite, critères et attribution des places restent à fournir par la fondation
 * (docs/contenus-a-fournir.md, questions 90 à 95) : ils ne sont ni inventés ni annoncés « à venir » (textes
 * provisoires masqués, groupe 7.1) ; ajouter ici une étape ou une phrase dès qu'ils sont fournis.
 * Lot 7.10 : textes du paquet « mobilite » (mobilite.apres.etapes.<id>), dans la langue de l'interface.
 */
const STEPS = ['envoi', 'etude', 'niveau', 'cohorte'] as const;

export function AfterApplicationSteps({ headingLevel: H = 'h3', className }: { headingLevel?: 'h2' | 'h3'; className?: string }) {
  const { t } = useLocalize();
  return (
    <div className={cn('space-y-5', className)}>
      <H className={H === 'h2' ? 'text-section-title text-text' : 'text-body font-semibold text-text'}>{t('mobilite.apres.title')}</H>
      <ol className="space-y-5">
        {STEPS.map((id, i) => (
          <li key={id} data-reveal="" className="flex items-start gap-4">
            <StepNumber n={i + 1} decorative />
            <div className="space-y-1">
              <p className="text-body font-semibold text-text">
                <span className="sr-only">{t('mobilite.apres.etape', { n: i + 1 })} </span>
                {t(`mobilite.apres.etapes.${id}.title`)}
              </p>
              <p className="text-body text-text-secondary max-w-[60ch]">{t(`mobilite.apres.etapes.${id}.text`)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** « Qui peut candidater » : faits déjà établis par le site (niveaux, formats, aucune pièce ni paiement demandés). */
const WHO = ['niveaux', 'lieu', 'pieces'] as const;

export function WhoCanApply({ className, extra }: { className?: string; extra?: ReactNode }) {
  const { t } = useLocalize();
  return (
    <div className={cn('space-y-5', className)}>
      <h3 className="text-body font-semibold text-text">{t('mobilite.apres.quiTitle')}</h3>
      <TextList columns={1}>
        {WHO.map((id) => (
          <TextListItem key={id} titleAs="h4" title={t(`mobilite.apres.qui.${id}.title`)}>
            <p>{t(`mobilite.apres.qui.${id}.text`)}</p>
          </TextListItem>
        ))}
      </TextList>
      {extra}
    </div>
  );
}
