/**
 * Coordonnées vers lesquelles les formulaires préparent un message (WhatsApp ou e-mail),
 * en attendant l'API Symfony : le site ne transmet encore aucun formulaire lui-même.
 *
 * Reprises du footer et de la bulle WhatsApp.
 * TODO : confirmer avant la mise en ligne que ce numéro et cette adresse sont réellement suivis.
 */
export const CONTACT = {
  /** Numéro WhatsApp au format international, sans + ni espaces (wa.me). */
  whatsappNumber: '237693129205',
  whatsappDisplay: '+237 693 12 92 05',
  email: 'contact@wahhf-foundation.org',
} as const;
