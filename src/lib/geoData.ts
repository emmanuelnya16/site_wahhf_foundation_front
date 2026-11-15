/**
 * Fichiers géographiques de public/geo, téléchargés une seule fois par visite (promesse mémorisée),
 * partagés par la carte du Cameroun et la mini-carte Europe.
 * Ce module ne dépend d'aucune bibliothèque : la section peut lancer le téléchargement
 * en même temps que le code des cartes (chargé à la demande), sans alourdir l'accueil.
 */
const BASE = import.meta.env.BASE_URL;

export const GEO_URLS = {
  /** 10 régions du Cameroun (geoBoundaries CMR ADM1, CC BY 3.0) */
  cameroonRegions: `${BASE}geo/cameroun-regions.json`,
  /** Pays du monde (Natural Earth 1:110m via world-atlas 2.0.2) */
  world: `${BASE}geo/countries-110m.json`,
} as const;

const cache = new Map<string, Promise<unknown>>();

export function fetchGeo<T>(url: string): Promise<T> {
  let promise = cache.get(url) as Promise<T> | undefined;
  if (!promise) {
    promise = fetch(url).then((res) => {
      if (!res.ok) throw new Error(`Carte : ${url} (${res.status})`);
      return res.json() as Promise<T>;
    });
    // En cas d'échec, on oublie la promesse : un nouvel essai pourra retélécharger.
    promise.catch(() => cache.delete(url));
    cache.set(url, promise);
  }
  return promise;
}

/** Lance les deux téléchargements (appelé quand la section Présence approche de l'écran). */
export function prefetchPresenceGeo() {
  fetchGeo(GEO_URLS.cameroonRegions);
  fetchGeo(GEO_URLS.world);
}
