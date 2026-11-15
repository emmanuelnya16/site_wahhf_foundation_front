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
