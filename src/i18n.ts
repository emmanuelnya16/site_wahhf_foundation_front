import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// Lot 7.9 : le détecteur de langue (i18next-browser-languagedetector) n'est plus chargé. Depuis le premier commit,
// lng: 'fr' l'empêchait de choisir la langue au chargement ; il ne faisait qu'écrire le choix FR / EN dans le
// navigateur, sans que rien ne le relise. Retiré du JS initial (environ 6 Ko), sans changement visible.
import frLocale from './locales/fr.json';
import enLocale from './locales/en.json';

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
  en: {
    translation: {
      ...enLocale,
      common: {
        operational: 'Active',
        upcoming: 'Upcoming',
        seeAll: 'See all',
        contactUs: 'Contact us',
        learnMore: 'Learn more',
        discoverFamily: 'Explore domain',
        close: 'Close',
      },
      group: {
        badge: 'FOUNDATION & VALUES',
        title: 'WAHHF Foundation',
        subtitle: 'Cameroonian-German social and philanthropic branch of the IROKO Group.',
      },
      structure: {
        badge: 'GOVERNANCE & ORGANIZATION',
        title: 'Our Governance',
        subtitle: 'A transparent structure backed by IROKO Group and overseen by an ethics committee.',
      },
      poles: {
        badge: 'OUR ACTION DOMAINS',
        title: 'Our 6 Action Domains',
        subtitle: 'Explore each pillar of our social and educational commitment.',
      },
      method: {
        badge: 'OUR FIELD APPROACH',
        title: 'Our Approach',
        subtitle: 'Five structured steps to support every beneficiary with dignity and transparency.',
        step1Title: '1. Listening & Assessment',
        step1Desc: 'Understanding the real needs of youth and communities.',
        step2Title: '2. Guidance & Co-construction',
        step2Desc: 'Building tailored pathways with local and educational partners.',
        step3Title: '3. Training & Support',
        step3Desc: 'Delivering language courses and field programs.',
        step4Title: '4. Follow-up & Empowerment',
        step4Desc: 'Long-term support completely free of charge.',
        step5Title: '5. Evaluation & Transparency',
        step5Desc: 'Measuring social impact and publishing annual reports.',
        guaranteesTitle: 'Our Ethical Commitments',
        g1Title: '100% Free for beneficiaries',
        g1Desc: 'Zero fees charged to applicants or supported families.',
        g2Title: 'Financial Transparency',
        g2Desc: 'Funded by IROKO Group and our committed donors.',
        g3Title: 'Human-Centered Support',
        g3Desc: 'Respect for dignity, attentive listening, and verified guidance.',
      },
      founders: {
        badge: 'LEADERSHIP & BOARD',
        title: 'Founders & Governance',
        subtitle: 'The leaders behind WAHHF Foundation’s social mission.',
        f1Name: 'Marrion Watio',
        f1Role: 'Co-Founder — IROKO Group & WAHHF Foundation',
        f1Bio: 'Committed to education, youth autonomy, and solidarity between Africa and Europe.',
        f2Name: 'NYA NANA Emmanuel',
        f2Role: 'Co-Founder — IROKO Group & WAHHF Foundation',
        f2Bio: 'Overseeing operational structure, transparency, and free program delivery.',
      },
      contact: {
        badge: 'CONTACT & SUPPORT',
        title: 'Contact Us',
        subtitle: 'Have a question about our programs, volunteering, or partnerships? Our team is here to help.',
      },
    },
  },
};

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
