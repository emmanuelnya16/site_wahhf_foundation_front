import { ReactNode, Ref } from 'react';
import { Mail, MessageCircle } from 'lucide-react';
import { CONTACT } from '../../config/contact';
import { PrimaryButton, SecondaryButton } from './Buttons';
import { ContactDraft, mailtoHref, whatsappHref } from '../../lib/contactDraft';

/**
 * « Dernière étape » d'un formulaire tant que l'API Symfony n'est pas branchée : le site ne transmet rien.
 * La personne envoie elle-même le message préparé, par WhatsApp ou par e-mail. Aucun message de succès :
 * la fondation ne reçoit la demande qu'une fois ce message envoyé, et la page le dit.
 */
export default function ContactHandoff({
  title,
  draft,
  onEdit,
  editLabel = 'Modifier mes réponses',
  titleRef,
  children,
  compact = false,
  headingLevel = 'h2',
}: {
  title: string;
  draft: ContactDraft;
  onEdit: () => void;
  editLabel?: string;
  titleRef?: Ref<HTMLHeadingElement>;
  /** Informations propres au formulaire (rappel, délai de réponse…), affichées sous les boutons. */
  children?: ReactNode;
  /** Version courte, pour un petit encart (newsletter). */
  compact?: boolean;
  /** Niveau du titre selon la page (h2 par défaut, h3 dans une section déjà titrée). */
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  return (
    <div
      className={
        compact
          ? 'space-y-4'
          : // Encadré d'information (contrat §8 ; décision des groupes 7.1 et 7.2) : ni or, ni ombre, ni serif
            'rounded-inner border border-info/40 bg-info-bg p-5 sm:p-8 space-y-5 text-left text-text'
      }
    >
      <Heading
        ref={titleRef}
        tabIndex={-1}
        className={compact ? 'text-[1.375rem] font-semibold leading-tight text-text' : 'text-section-title text-text'}
      >
        {title}
      </Heading>
      <p className="text-body text-text max-w-[65ch]">
        Le site ne transmet pas encore les formulaires. Votre message est prêt avec vos réponses : envoyez-le
        par WhatsApp ou par e-mail. La fondation ne le reçoit qu’une fois que vous l’avez envoyé.
      </p>

      <div className="flex flex-wrap gap-3">
        {/* Lien externe : PrimaryButton ajoute ↗ et « (nouvel onglet) » pour les lecteurs d'écran. */}
        <PrimaryButton href={whatsappHref(draft)}>
          <span className="inline-flex items-center gap-2">
            <MessageCircle aria-hidden="true" className="w-4 h-4 shrink-0" />
            <span>Envoyer par WhatsApp</span>
          </span>
        </PrimaryButton>
        <SecondaryButton href={mailtoHref(draft)}>
          <span className="inline-flex items-center gap-2">
            <Mail aria-hidden="true" className="w-4 h-4 shrink-0" />
            <span>Envoyer par e-mail</span>
          </span>
        </SecondaryButton>
      </div>

      <p className="text-meta text-text-secondary max-w-[65ch]">
        Si aucune application ne s’ouvre, écrivez directement à{' '}
        <a href={`mailto:${CONTACT.email}`} className="text-link underline underline-offset-4 break-all">
          {CONTACT.email}
        </a>{' '}
        ou sur WhatsApp au {CONTACT.whatsappDisplay}, en copiant le message ci-dessous.
      </p>

      <details className="rounded-inner bg-surface-raised p-4 text-meta text-text">
        <summary className="cursor-pointer font-semibold min-h-11 flex items-center">Voir le message préparé</summary>
        <p className="mt-3 font-semibold">{draft.subject}</p>
        <p className="mt-2 whitespace-pre-wrap break-words text-text-secondary">{draft.body}</p>
      </details>

      {children}

      <SecondaryButton onClick={onEdit}>{editLabel}</SecondaryButton>
    </div>
  );
}
