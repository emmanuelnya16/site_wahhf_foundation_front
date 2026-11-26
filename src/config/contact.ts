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

/**
 * Réseaux de la fondation (lot 12), dans l'ordre d'affichage : la seule source du site. Facebook : le profil personnel
 * demandé par la fondation (plus suivi que la page officielle) ; LinkedIn : le profil de la présidence.
 */
export const SOCIAL = [
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/share/1JM5AGP4ZT/' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/wahhf_foundation/' },
  { id: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com/@wahhf_foundation' },
  { id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@Wahhf-foundation' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/marrion-watio-074564190' },
  { id: 'snapchat', label: 'Snapchat', href: 'https://snapchat.com/t/JItfpHBd' },
  { id: 'whatsapp', label: 'WhatsApp', href: `https://wa.me/${CONTACT.whatsappNumber}` },
] as const;

export type SocialId = (typeof SOCIAL)[number]['id'];
