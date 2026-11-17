import { ReactNode } from 'react';
import StepNumber from './StepNumber';
import { TextList, TextListItem } from './TextList';
import { cn } from '../../lib/utils';

/**
 * « Après votre candidature » (audit ACAD-06, groupe 7.1) : ce qui se passe une fois le formulaire rempli, en étapes
 * numérotées (une vraie suite : StepNumber y a droit, contrat §8). Seules des étapes déjà établies par le site sont
 * décrites ; délai de réponse, date limite et attribution des places restent à fournir par la fondation
 * (docs/contenus-a-fournir.md) et ne sont pas inventés.
 */
const STEPS: { title: string; text: string }[] = [
  {
    title: 'Vous envoyez votre demande',
    text: 'Le formulaire prépare un message avec vos réponses ; vous l’envoyez par WhatsApp ou par e-mail.',
  },
  {
    title: 'L’équipe étudie votre demande',
    text: 'Elle vous répond par WhatsApp ou par e-mail, aux coordonnées que vous avez données.',
  },
  {
    title: 'Votre niveau est confirmé',
    text: 'Un formateur confirme avec vous le groupe qui vous convient, à partir du test de niveau si vous l’avez passé.',
  },
  {
    title: 'Vous rejoignez une cohorte',
    text: 'En ligne ou en présentiel, selon les sessions ouvertes et les places disponibles.',
  },
];

export function AfterApplicationSteps({ headingLevel: H = 'h3', className }: { headingLevel?: 'h2' | 'h3'; className?: string }) {
  return (
    <div className={cn('space-y-5', className)}>
      <H className={H === 'h2' ? 'text-section-title text-text' : 'text-body font-semibold text-text'}>Après votre candidature</H>
      <ol className="space-y-5">
        {STEPS.map((step, i) => (
          <li key={step.title} data-reveal="" className="flex items-start gap-4">
            <StepNumber n={i + 1} decorative />
            <div className="space-y-1">
              <p className="text-body font-semibold text-text">
                <span className="sr-only">Étape {i + 1} : </span>
                {step.title}
              </p>
              <p className="text-body text-text-secondary max-w-[60ch]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-meta text-text-secondary max-w-[60ch]">
        Le délai de réponse, la date limite des candidatures et la façon dont les places sont attribuées seront indiqués
        ici dès que la fondation les aura confirmés.
      </p>
    </div>
  );
}

/** « Qui peut candidater » : faits déjà établis par le site (niveaux, formats, aucune pièce ni paiement demandés). */
export function WhoCanApply({ className, extra }: { className?: string; extra?: ReactNode }) {
  return (
    <div className={cn('space-y-5', className)}>
      <h3 className="text-body font-semibold text-text">Qui peut candidater</h3>
      <TextList columns={1}>
        <TextListItem title="Débutants comme confirmés">
          <p>Du niveau A1 (aucune base) au niveau C1. Le test de niveau en ligne vous aide à vous situer.</p>
        </TextListItem>
        <TextListItem title="Où que vous viviez">
          <p>Les cours en ligne sont accessibles partout ; des cohortes en présentiel sont prévues à Douala et à Yaoundé.</p>
        </TextListItem>
        <TextListItem title="Sans pièce d’identité ni paiement">
          <p>Aucun document d’identité ni aucun paiement ne vous sont demandés pour candidater.</p>
        </TextListItem>
      </TextList>
      {extra}
    </div>
  );
}
