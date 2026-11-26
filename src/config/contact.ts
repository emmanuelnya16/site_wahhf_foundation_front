/**
 * Coordonnées de WAHHF Foundation : la seule source du site (audit CTC-03, groupe 7.2). Lues par la page Contact, les
 * mentions légales, le footer, la bulle WhatsApp et les messages préparés des formulaires (WhatsApp ou e-mail), en
 * attendant l'API Symfony : le site ne transmet encore aucun formulaire lui-même.
 *
 * Lot 12 (retours de la fondation, 26 novembre 2026) : le seul numéro officiel est le +49 1521 8956743 (téléphone et
 * WhatsApp), et la fondation a deux adresses, toujours affichées ensemble.
 */
export const CONTACT = {
  /** Numéro au format international, sans + ni espaces (wa.me, tel:). */
  whatsappNumber: '4915218956743',
  whatsappDisplay: '+49 1521 8956743',
  email: 'contact@wahhf-foundation.org',
  /** Les deux adresses postales, dans cet ordre, toujours affichées ensemble (non traduites : adresses postales). */
  address: ['Markt 25, 39288 Burg, Germany', 'Bépanda, BP 4048 Douala, Cameroon'],
} as const;
