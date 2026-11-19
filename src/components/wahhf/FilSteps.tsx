import { ElementType, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import StepNumber from './StepNumber';
import { cn } from '../../lib/utils';

/*
 * Étapes reliées par le fil (groupe 7.4, contrat §6 et §8 : page Accompagnement vers l'Europe).
 * Une vraie suite : chaque étape a son numéro (StepNumber) et le fil, trait de 1,5 px couleur du fil (forêt en clair,
 * feuille en sombre), relie les numéros de la première à la dernière étape. Le titre de chaque étape est le lien vers
 * son guide ; la description reste du texte courant. Le trait est décoratif (aria-hidden) : l'ordre est déjà dit par la
 * liste numérotée.
 * - Dans le HTML (téléphone, tactile, mouvement réduit, ou avant GSAP), le fil est tracé et tous les numéros allumés.
 * - Sur ordinateur, src/effects/motion/FilStepsScrub.tsx le dessine au défilement (repères data-fil-steps,
 *   data-fil-steps-seg, data-fil-steps-dot).
 * - `currentId` (fin des guides) : l'étape affichée a son numéro plein et « étape affichée » pour les lecteurs d'écran.
 * - `withFil={false}` (fin des guides) : les numéros sans le trait ; le fil reste propre à la page Accompagnement.
 *
 *   <FilSteps steps={[{ id: 'dossier', title: 'Préparer son dossier', to: '/accompagnement/preparer-son-dossier', desc: '…' }]} />
 */
export interface FilStep {
  id: string;
  title: ReactNode;
  to: string;
  desc?: ReactNode;
}

export default function FilSteps({
  steps,
  titleAs: Title = 'h3',
  currentId,
  withFil = true,
  className,
}: {
  steps: FilStep[];
  /** Niveau du titre de chaque étape : h3 par défaut (sous le h2 de la section). */
  titleAs?: ElementType;
  currentId?: string;
  withFil?: boolean;
  className?: string;
}) {
  return (
    <ol data-fil-steps={withFil ? '' : undefined} className={cn('max-w-[65ch]', className)}>
      {steps.map((step, i) => {
        const last = i === steps.length - 1;
        const current = step.id === currentId;
        return (
          <li key={step.id} className={cn('relative grid grid-cols-[2rem_1fr] gap-x-4', !last && (withFil ? 'pb-8' : 'pb-5'))}>
            {/* Trait vers l'étape suivante : du bas du numéro jusqu'au haut du suivant, à 6 px de chacun */}
            {withFil && !last && (
              <span
                aria-hidden="true"
                data-fil-steps-seg=""
                className="absolute left-[calc(1rem-0.75px)] top-[calc(2rem+6px)] bottom-[6px] w-[1.5px] bg-fil origin-top"
              />
            )}
            <span data-fil-steps-dot="" className="inline-flex">
              <StepNumber n={i + 1} className={cn(current && 'bg-fil text-surface')} />
            </span>
            <div className="space-y-2 pt-1">
              <Title className="text-body font-semibold text-text">
                {/* Cible de 44 px au moins (contrat §8, revue du groupe 7.4) : 11 px de marge intérieure en haut et en bas
                    du lien, qui reste en ligne ; la mise en page ne bouge pas, seule la zone d'appui s'agrandit */}
                <Link
                  to={step.to}
                  aria-current={current ? 'step' : undefined}
                  className={cn('py-[11px] text-link underline underline-offset-4 decoration-1 hover:decoration-2', current && 'decoration-2')}
                >
                  {step.title}
                  {current && <span className="sr-only"> (étape affichée)</span>}
                </Link>
              </Title>
              {step.desc && <div className="text-body text-text-secondary">{step.desc}</div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
