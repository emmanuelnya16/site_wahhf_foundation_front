import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// Lot 7.9 : le détecteur de langue (i18next-browser-languagedetector) n'est plus chargé. Depuis le premier commit,
// lng: 'fr' l'empêchait de choisir la langue au chargement ; il ne faisait qu'écrire le choix FR / EN dans le
// navigateur, sans que rien ne le relise. Retiré du JS initial (environ 6 Ko), sans changement visible.
import frLocale from './locales/fr.json';

const resources = {
  fr: {
    translation: {
      ...frLocale,
      common: {
        operational: 'Actif',
        upcoming: 'En déploiement',
        seeAll: 'Tout découvrir',
        contactUs: 'Nous contacter',
        learnMore: 'En savoir plus',
        discoverFamily: 'Découvrir le domaine',
        close: 'Fermer',
      },
      group: {
        badge: 'FONDATION & VALEURS',
        title: 'WAHHF Foundation',
        subtitle: 'Branche sociale et philanthropique camerouno-allemande du groupe IROKO.',
      },
      structure: {
        badge: 'GOUVERNANCE & ORGANISATION',
        title: 'Notre Gouvernance',
        subtitle: 'Une structure transparente adossée au groupe IROKO et contrôlée par un comité éthique.',
      },
      poles: {
        badge: 'NOS DOMAINES D’INTERVENTION',
        title: 'Nos 6 Domaines d’Action',
        subtitle: 'Découvrez chaque volet de notre engagement social et éducatif.',
      },
      method: {
        badge: 'NOTRE APPROCHE DE TERRAIN',
        title: 'Notre Approche',
        subtitle: 'Cinq étapes structurées pour accompagner chaque bénéficiaire avec dignité et transparence.',
        step1Title: '1. Écoute & Diagnostic',
        step1Desc: 'Comprendre les besoins réels des jeunes et des communautés.',
        step2Title: '2. Orientation & Co-construction',
        step2Desc: 'Bâtir un parcours adapté avec les acteurs locaux et éducatifs.',
        step3Title: '3. Formation & Accompagnement',
        step3Desc: 'Déployer les cours de langue et les programmes sur le terrain.',
        step4Title: '4. Suivi & Autonomisation',
        step4Desc: 'Accompagner les démarches dans la durée en toute gratuité.',
        step5Title: '5. Évaluation & Transparence',
        step5Desc: 'Mesurer l’impact social et publier nos bilans annuels.',
        guaranteesTitle: 'Nos Engagements Éthiques',
        g1Title: '100 % Gratuit pour les bénéficiaires',
        g1Desc: 'Aucun frais demandé aux candidats ou aux familles accompagnées.',
        g2Title: 'Transparence des Fonds',
        g2Desc: 'Financement assuré par le groupe IROKO et nos donateurs engagés.',
        g3Title: 'Accompagnement Humain',
        g3Desc: 'Respect de la dignité, écoute bienveillante et orientation vérifiée.',
      },
      founders: {
        badge: 'DIRECTION & CONSEIL',
        title: 'Fondateurs & Gouvernance',
        subtitle: 'Les visages qui portent l’engagement social de WAHHF Foundation.',
        f1Name: 'Marrion Watio',
        f1Role: 'Co-fondateur — Groupe IROKO & WAHHF Foundation',
        f1Bio: 'Engagé pour l’éducation, l’autonomie des jeunes et la solidarité entre l’Afrique et l’Europe.',
        f2Name: 'NYA NANA Emmanuel',
        f2Role: 'Co-fondateur — Groupe IROKO & WAHHF Foundation',
        f2Bio: 'Garant de la structuration opérationnelle, de la transparence et du déploiement des programmes gratuits.',
      },
      contact: {
        badge: 'CONTACT & ÉCOUTE',
        title: 'Nous Contacter',
        subtitle: 'Une question sur nos actions, le bénévolat ou le mécénat ? Notre équipe vous répond avec attention.',
      },
    },
  },

};

/**
 * Langues du site (lot 7.10) : le français est dans le chargement initial ; l'anglais et l'allemand arrivent à la
 * demande, quand on les choisit (ou au démarrage, si le visiteur les avait choisis). Le choix est mémorisé
 * (localStorage, clé wahhf_langue) et met à jour <html lang>. Pas d'URL par langue pour l'instant (voir le compte rendu
 * du lot 7.10).
 */
export const LANGUAGES = ['fr', 'en', 'de'] as const;
export type Language = (typeof LANGUAGES)[number];
const STORAGE_KEY = 'wahhf_langue';

const LOADERS: Record<Exclude<Language, 'fr'>, () => Promise<Record<string, unknown>>> = {
  en: () => Promise.all([import('./locales/en.json'), import('./locales/legacy-en')]).then(([main, legacy]) => ({ ...main.default, ...legacy.default })),
  de: () => import('./locales/de.json').then((m) => m.default),
};
const loaded = new Set<Language>(['fr']);

/** Charge les textes d'une langue (une seule fois). */
export async function loadLanguage(lng: Language) {
  if (loaded.has(lng)) return;
  const resources = await LOADERS[lng as Exclude<Language, 'fr'>]();
  i18n.addResourceBundle(lng, 'translation', resources, true, false);
  loaded.add(lng);
}

export const isLanguage = (value: unknown): value is Language => LANGUAGES.includes(value as Language);

/** Change de langue : charge ses textes, l'applique, la mémorise. */
export async function setLanguage(lng: Language) {
  await loadLanguage(lng);
  await i18n.changeLanguage(lng);
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // stockage indisponible (navigation privée) : le choix vaut pour la visite
  }
}

/** Au démarrage : la langue mémorisée, chargée avant le premier rendu (le français ne demande rien). */
export async function initLanguage() {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    stored = null;
  }
  if (isLanguage(stored) && stored !== 'fr') {
    try {
      await setLanguage(stored);
    } catch {
      // fichier de langue introuvable (hors ligne) : on reste en français
    }
  }
}

i18n.on('languageChanged', (lng) => {
  if (typeof document !== 'undefined') document.documentElement.lang = lng;
});

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
