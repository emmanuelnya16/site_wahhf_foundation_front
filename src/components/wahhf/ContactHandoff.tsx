import { ReactNode, Ref } from 'react';
import { ArrowLeft, Mail, MessageCircle } from 'lucide-react';
import { CONTACT } from '../../config/contact';
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
          : 'rounded-[24px] bg-white dark:bg-[#132A21] border-2 border-[#E8A317] p-7 sm:p-10 space-y-6 shadow-md text-left'
      }
    >
      <Heading
        ref={titleRef}
        tabIndex={-1}
        className={`font-serif font-normal text-[#1B1B18] dark:text-[#F5F1E8] ${compact ? 'text-xl' : 'text-2xl sm:text-3xl'}`}
      >
        {title}
      </Heading>
      <p className="text-sm sm:text-base text-[#1B1B18]/80 dark:text-[#F5F1E8]/80 leading-relaxed">
        Le site ne transmet pas encore les formulaires. Votre message est prêt avec vos réponses : envoyez-le
        par WhatsApp ou par e-mail. La fondation ne le reçoit qu’une fois que vous l’avez envoyé.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={whatsappHref(draft)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0F3D2E] hover:bg-[#14523E] text-[#F5F1E8] text-sm font-semibold transition-colors"
        >
          <MessageCircle aria-hidden="true" className="w-4 h-4" />
          <span>Envoyer par WhatsApp</span>
          <span className="sr-only">(nouvel onglet)</span>
        </a>
        <a
          href={mailtoHref(draft)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0F3D2E]/35 dark:border-[#F5F1E8]/30 text-[#0F3D2E] dark:text-[#F5F1E8] text-sm font-semibold hover:border-[#E8A317] transition-colors"
        >
          <Mail aria-hidden="true" className="w-4 h-4" />
          <span>Envoyer par e-mail</span>
        </a>
      </div>

      <p className="text-xs sm:text-sm text-[#1B1B18]/70 dark:text-[#F5F1E8]/70">
        Si aucune application ne s’ouvre, écrivez directement à{' '}
        <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-2 text-[#0F3D2E] dark:text-[#E8A317] break-all">
          {CONTACT.email}
        </a>{' '}
        ou sur WhatsApp au {CONTACT.whatsappDisplay}, en copiant le message ci-dessous.
      </p>

      <details className="rounded-2xl bg-[#F5F1E8] dark:bg-[#0F3D2E] p-4 text-sm text-[#1B1B18] dark:text-[#F5F1E8]">
        <summary className="cursor-pointer font-semibold">Voir le message préparé</summary>
        <p className="mt-3 font-semibold">{draft.subject}</p>
        <p className="mt-2 whitespace-pre-wrap break-words text-xs sm:text-sm opacity-90">{draft.body}</p>
      </details>

      {children}

      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#0F3D2E]/25 dark:border-[#F5F1E8]/25 text-sm cursor-pointer"
      >
        <ArrowLeft aria-hidden="true" className="w-4 h-4" />
        <span>{editLabel}</span>
      </button>
    </div>
  );
}
