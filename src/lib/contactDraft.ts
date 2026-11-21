import i18n from '../i18n';
import { CONTACT } from '../config/contact';

/** Message préparé à partir d'un formulaire : objet (e-mail) et corps (e-mail et WhatsApp). */
export interface ContactDraft {
  subject: string;
  body: string;
}

/**
 * Corps du message : une introduction, puis une ligne « Libellé : valeur » par réponse renseignée.
 * Rien n'est stocké : le texte n'existe que dans la page et dans le lien ouvert par la personne.
 */
export function buildDraft(subject: string, intro: string, rows: Array<[string, string | undefined]>, outro?: string): ContactDraft {
  // Lot 7.10 : formule d'accueil et ponctuation de la langue (« Libellé : valeur » en français, « Label: value » sinon)
  const lines = rows
    .filter(([, value]) => value && value.trim())
    .map(([label, value]) => i18n.t('ui.draft.row', { label, value: value!.trim() }));
  const body = [i18n.t('ui.draft.greeting'), '', intro, '', ...lines, ...(outro ? ['', outro] : [])].join('\n');
  return { subject, body };
}

/** Lien WhatsApp (wa.me) qui ouvre une conversation avec le message déjà écrit. */
export function whatsappHref(draft: ContactDraft): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(`${draft.subject}\n\n${draft.body}`)}`;
}

/** Lien mailto : ouvre la messagerie avec l'objet et le corps déjà remplis. */
export function mailtoHref(draft: ContactDraft): string {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
}
