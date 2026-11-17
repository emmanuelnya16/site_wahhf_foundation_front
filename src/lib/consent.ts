/**
 * Consentement aux cookies et contenus tiers (bandeau CookieBanner).
 * Valeurs stockées : 'essential' (non-essentiel refusé) ou 'all' (accepté) ; absent = pas encore choisi.
 */
export type ConsentChoice = 'essential' | 'all';

export const CONSENT_STORAGE_KEY = 'wahhf_cookie_consent';
const CONSENT_EVENT = 'wahhf:consent';

export function getConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === 'essential' || value === 'all' ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // stockage indisponible : le choix vaut pour cette page seulement
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}

/** Prévient quand le visiteur fait (ou change) son choix, y compris depuis un autre onglet. */
export function onConsentChange(callback: (choice: ConsentChoice | null) => void): () => void {
  const onLocal = (e: Event) => callback((e as CustomEvent<ConsentChoice>).detail);
  const onStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_STORAGE_KEY) callback(getConsent());
  };
  window.addEventListener(CONSENT_EVENT, onLocal);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onLocal);
    window.removeEventListener('storage', onStorage);
  };
}

/*
 * Accord explicite pour la vidéo YouTube du hero (MEL-03, décision du 16/11) : YouTube reçoit l'adresse IP du
 * visiteur. Distinct du bandeau cookies, qui ne parle que des cookies techniques : seul le lien « Activer la vidéo »
 * du hero donne cet accord. Valeur stockée : '1' ; absente = pas d'accord (image fixe).
 */
export const VIDEO_CONSENT_KEY = 'wahhf_video_consent';
const VIDEO_CONSENT_EVENT = 'wahhf:video-consent';

export function getVideoConsent(): boolean {
  try {
    return localStorage.getItem(VIDEO_CONSENT_KEY) === '1';
  } catch {
    return false;
  }
}

export function setVideoConsent(granted: boolean) {
  try {
    if (granted) localStorage.setItem(VIDEO_CONSENT_KEY, '1');
    else localStorage.removeItem(VIDEO_CONSENT_KEY);
  } catch {
    // stockage indisponible : l'accord vaut pour cette page seulement
  }
  window.dispatchEvent(new CustomEvent<boolean>(VIDEO_CONSENT_EVENT, { detail: granted }));
}

/** Prévient quand l'accord vidéo change, y compris depuis un autre onglet. */
export function onVideoConsentChange(callback: (granted: boolean) => void): () => void {
  const onLocal = (e: Event) => callback((e as CustomEvent<boolean>).detail);
  const onStorage = (e: StorageEvent) => {
    if (e.key === VIDEO_CONSENT_KEY) callback(getVideoConsent());
  };
  window.addEventListener(VIDEO_CONSENT_EVENT, onLocal);
  window.addEventListener('storage', onStorage);
  return () => {
    window.removeEventListener(VIDEO_CONSENT_EVENT, onLocal);
    window.removeEventListener('storage', onStorage);
  };
}
