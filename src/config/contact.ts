/**
 * Coordonnées de WAHHF Foundation : la seule source du site (audit CTC-03, groupe 7.2). Lues par la page Contact, le
 * footer, la bulle WhatsApp et les messages préparés des formulaires (WhatsApp ou e-mail), en attendant l'API Symfony :
 * le site ne transmet encore aucun formulaire lui-même.
 *
 * TODO : confirmer avant la mise en ligne que ce numéro et cette adresse sont réellement suivis, et donner l'adresse
 * postale exacte (docs/contenus-a-fournir.md, demande E et question 1).
 */
export const CONTACT = {
  /** Numéro WhatsApp au format international, sans + ni espaces (wa.me, tel:). */
  whatsappNumber: '237693129205',
  whatsappDisplay: '+237 693 12 92 05',
  email: 'contact@wahhf-foundation.org',
  /** Où se trouve la fondation, en attendant les adresses postales exactes. */
  place: 'Cameroun (Douala, Yaoundé) et coordination en Allemagne',
} as const;
