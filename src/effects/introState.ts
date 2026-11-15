import { useSyncExternalStore } from 'react';

/**
 * Signal « l'intro est terminée » : le rideau de chargement le libère à sa sortie,
 * et le titre du hero attend ce signal pour se dévoiler. Sans rideau, il est vrai d'emblée.
 */
let introDone = true;
const listeners = new Set<() => void>();

export function setIntroDone(value: boolean) {
  if (introDone === value) return;
  introDone = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => introDone, () => true);
}
