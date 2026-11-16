/**
 * Validation des formulaires : règles et messages précis (ce qu'il faut saisir, avec un exemple).
 * On valide à l'envoi ou au changement d'étape, et à la sortie d'un champ déjà rempli ; jamais pendant la frappe.
 */

export const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

/** Numéro international ou local : chiffres, espaces, +, points, tirets, parenthèses ; au moins 8 chiffres. */
export const isPhone = (value: string) =>
  /^\+?[\d\s().-]+$/.test(value.trim()) && value.replace(/\D/g, '').length >= 8;

export const MESSAGES = {
  emailEmpty: 'Saisissez votre adresse e-mail, par exemple nom@exemple.com.',
  emailInvalid: 'Adresse e-mail incomplète : elle doit ressembler à nom@exemple.com.',
  phoneEmpty: 'Saisissez votre numéro de téléphone ou WhatsApp, avec l’indicatif (ex. +237 6 90 00 00 00).',
  phoneInvalid: 'Numéro incomplet : indiquez l’indicatif du pays et au moins 8 chiffres (ex. +237 6 90 00 00 00).',
};

export function emailError(value: string): string | undefined {
  if (!value.trim()) return MESSAGES.emailEmpty;
  if (!isEmail(value)) return MESSAGES.emailInvalid;
  return undefined;
}

export function phoneError(value: string): string | undefined {
  if (!value.trim()) return MESSAGES.phoneEmpty;
  if (!isPhone(value)) return MESSAGES.phoneInvalid;
  return undefined;
}

export function requiredError(value: string, message: string): string | undefined {
  return value.trim() ? undefined : message;
}

/** Place le focus sur le premier champ en erreur (dans l'ordre donné) ; le navigateur le fait défiler à l'écran. */
export function focusFirstError<K extends string>(
  order: readonly K[],
  errors: Partial<Record<K, string>>,
  idOf: (key: K) => string
): boolean {
  const first = order.find((k) => errors[k]);
  if (!first) return false;
  requestAnimationFrame(() => document.getElementById(idOf(first))?.focus());
  return true;
}
