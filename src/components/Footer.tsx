import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { DOMAINS_DATA, WAHHF_LOGO_URL } from '../services/api';
import { CONTACT } from '../config/contact';
import { TRANSPARENCY_DATA_PUBLISHED } from '../config/transparency';
import { GOVERNANCE_PUBLISHED } from '../config/governance';
import { scrollToTop } from '../lib/scroll';
import { DonateButton } from './wahhf/Buttons';
import { cn } from '../lib/utils';

/*
 * Footer (contrat §8, ajout du 16/11) : fond nuit ; texte brume et brume douce en 15 px ; titres de colonne en 600,
 * sans or ; soleil réservé aux liens (au survol et à l'appui) ; contrôles cerclés du contour sur nuit.
 * Mise en page : le bloc de la marque sur sa rangée, puis 4 colonnes (Qui sommes-nous, Nos actions, Agir et faire un
 * don, Contact et adresse) ; barre du bas : © 2026, mentions légales, confidentialité, retour en haut ; le lien vers la
 * transparence revient quand ses données sont publiées (TRA-01, src/config/transparency.ts).
 * `surface-green` donne l'anneau de focus soleil et le liseré du bouton de don.
 * Coordonnées : celles de src/config/contact.ts, la seule source du site (CTC-03, groupe 7.2).
 */
const LINK =
  'transition-colors duration-(--dur-fast) underline-offset-4 hover:text-link-on-inverse hover:underline active:text-link-on-inverse';
const CONTROL =
  'inline-flex items-center justify-center rounded-pill border border-border-on-inverse text-text-on-inverse transition-colors duration-(--dur-fast) hover:bg-action-on-inverse hover:text-on-action-on-inverse hover:border-action-on-inverse active:bg-action-on-inverse active:text-on-action-on-inverse active:border-action-on-inverse active:transition-none [-webkit-tap-highlight-color:transparent]';
const HEADING = 'text-meta font-bold text-text-on-inverse';
const LIST = 'space-y-2.5 text-meta text-text-secondary-on-inverse';
const ICON = 'w-4 h-4 shrink-0 text-text-secondary-on-inverse';

export default function Footer() {
  const { t } = useTranslation();

  // Passe par Lenis quand il est actif (défilement fluide), sinon remontée instantanée.
  const handleBackToTop = () => {
    scrollToTop();
    // Clavier : le focus repart du haut de la page (lien « Aller au contenu », visible seulement au clavier)
    document.querySelector<HTMLElement>('a[href="#contenu"]')?.focus({ preventScroll: true });
  };

  return (
    <footer className="surface-green bg-surface-inverse text-text-on-inverse">
      {/* pb-28 : place réservée à la bulle WhatsApp, fixée en bas à droite, sous la barre du bas (RESP-03) */}
      <div className="container-page pt-16 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-border-subtle-on-inverse">
          {/* Bloc de la marque : logo, nom, une phrase, lien au groupe, réseaux sociaux */}
          <div className="md:col-span-2 lg:col-span-4 space-y-4 max-w-[65ch]">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={WAHHF_LOGO_URL}
                alt="Logo WAHHF Foundation"
                width={52}
                height={52}
                loading="lazy"
                className="w-12 h-12 object-contain rounded-pill bg-white p-1"
              />
              <div>
                <p className="text-body font-bold text-text-on-inverse">WAHHF Foundation</p>
                <p className="text-meta text-text-secondary-on-inverse">We Are Here Help Foundation</p>
              </div>
            </Link>

            <p className="text-meta text-text-secondary-on-inverse">{t('footer.description')}</p>

            <p className="text-meta text-text-secondary-on-inverse">{t('footer.irokoBadge')}</p>

            {/* Réseaux sociaux (Liens officiels à confirmer — TODO) */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              {[
                { label: 'LinkedIn', href: '#linkedin-todo' },
                { label: 'Facebook', href: '#facebook-todo' },
                { label: 'Instagram', href: '#instagram-todo' },
                { label: 'YouTube', href: '#youtube-todo' },
              ].map((soc) => (
                <a
                  key={soc.label}
                  href={soc.href}
                  aria-label={`${soc.label} WAHHF Foundation (TODO)`}
                  className={cn(CONTROL, 'min-h-11 px-4 text-meta')}
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Qui sommes-nous */}
          <div className="space-y-3">
            <h3 className={HEADING}>{t('footer.colAbout')}</h3>
            <ul className={LIST}>
              <li>
                <Link to="/qui-sommes-nous" className={LINK}>
                  Notre histoire & mission
                </Link>
              </li>
              {/* Groupe 7.3 (QSN-01) : masqué tant qu'aucun nom n'est publié ; lot 7.7 : vers l'organigramme */}
              {GOVERNANCE_PUBLISHED && (
                <li>
                  <Link to="/qui-sommes-nous#organigramme" className={LINK}>
                    Équipe & Gouvernance
                  </Link>
                </li>
              )}
              <li>
                <Link to="/notre-impact" className={LINK}>
                  Notre impact
                </Link>
              </li>
              <li>
                <Link to="/galerie" className={LINK}>
                  Galerie photo & vidéo
                </Link>
              </li>
              <li>
                <Link to="/partenaires" className={LINK}>
                  Partenaires & Groupe IROKO
                </Link>
              </li>
              <li>
                <Link to="/actualites" className={LINK}>
                  Actualités & Terrain
                </Link>
              </li>
            </ul>
          </div>

          {/* Nos actions (les 6 domaines) */}
          <div className="space-y-3">
            <h3 className={HEADING}>{t('footer.colActions')}</h3>
            <ul className={LIST}>
              {DOMAINS_DATA.map((dom) => (
                <li key={dom.id}>
                  <Link to={dom.link} className={LINK}>
                    {dom.title}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/mobilite-langues/academie"
                  className="text-link-on-inverse underline underline-offset-4 decoration-1 hover:decoration-2"
                >
                  Académie d’allemand A1–C1 (Gratuit)
                </Link>
              </li>
            </ul>
          </div>

          {/* Agir et faire un don */}
          <div className="space-y-3">
            <h3 className={HEADING}>{t('footer.colAct')}</h3>
            <ul className={LIST}>
              <li>
                <DonateButton size="sm" />
              </li>
              <li>
                <Link to="/candidater" className={LINK}>
                  Candidater à un programme
                </Link>
              </li>
              <li>
                <Link to="/agir#benevole" className={LINK}>
                  Devenir bénévole
                </Link>
              </li>
              <li>
                <Link to="/agir#partenaire" className={LINK}>
                  Devenir partenaire
                </Link>
              </li>
              <li>
                <Link to="/accompagnement/eviter-les-arnaques" className={LINK}>
                  Prévention des arnaques
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact et adresse */}
          <div className="space-y-3">
            <h3 className={HEADING}>{t('footer.colContact')}</h3>
            <ul className={cn(LIST, 'space-y-3')}>
              <li>
                <Link to="/contact" className={LINK}>
                  Formulaire de contact
                </Link>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className={cn(ICON, 'mt-1')} />
                <span>
                  {CONTACT.place} <span>(TODO : adresse exacte)</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden="true" className={ICON} />
                <a href={`tel:+${CONTACT.whatsappNumber}`} className={LINK}>
                  {CONTACT.whatsappDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden="true" className={ICON} />
                <a href={`mailto:${CONTACT.email}`} className={cn(LINK, 'break-all')}>
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas : © 2026, mentions légales, confidentialité, transparence, bouton rond retour en haut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-meta text-text-secondary-on-inverse">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
            <span>© 2026 WAHHF Foundation (We Are Here Help Foundation). {t('footer.rights')}</span>
            <Link to="/mentions-legales" className={LINK}>
              {t('footer.legal')}
            </Link>
            <Link to="/confidentialite" className={LINK}>
              {t('footer.privacy')}
            </Link>
            {TRANSPARENCY_DATA_PUBLISHED && (
              <Link to="/transparence" className={LINK}>
                {t('footer.transparency')}
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            aria-label={t('footer.backToTop')}
            title={t('footer.backToTop')}
            className={cn(CONTROL, 'w-11 h-11 shrink-0 cursor-pointer')}
          >
            <ArrowUp aria-hidden="true" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
