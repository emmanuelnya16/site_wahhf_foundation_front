import { Link } from 'react-router-dom';
import { useLocalize } from '../lib/localize';
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { DOMAINS_DATA, WAHHF_LOGO_URL } from '../services/api';
import { CONTACT } from '../config/contact';
import { TRANSPARENCY_DATA_PUBLISHED } from '../config/transparency';
import { GOVERNANCE_PUBLISHED } from '../config/governance';
import { scrollToTop } from '../lib/scroll';
import { DonateButton } from './wahhf/Buttons';
import SocialLinks from './wahhf/SocialLinks';
import { cn } from '../lib/utils';

/*
 * Footer (contrat §8, ajout du 16/11) : fond nuit ; texte brume et brume douce en 15 px ; titres de colonne en 600,
 * sans or ; soleil réservé aux liens (au survol et à l'appui) ; contrôles cerclés du contour sur nuit.
 * Mise en page : le bloc de la marque sur sa rangée, puis 4 colonnes (Qui sommes-nous, Nos actions, Agir et faire un
 * don, Contact et adresse) ; barre du bas : © 2026, mentions légales, confidentialité, retour en haut ; le lien vers la
 * transparence revient quand ses données sont publiées (TRA-01, src/config/transparency.ts).
 * `surface-green` donne l'anneau de focus soleil et le liseré du bouton de don.
 * Coordonnées : celles de src/config/contact.ts, la seule source du site (CTC-03, groupe 7.2) ; lot 12 : le numéro
 * officiel et les deux adresses, toujours ensemble (bloc « Adresses »).
 */
const LINK =
  'transition-colors duration-(--dur-fast) underline-offset-4 hover:text-link-on-inverse hover:underline active:text-link-on-inverse';
const CONTROL =
  'inline-flex items-center justify-center rounded-pill border border-border-on-inverse text-text-on-inverse transition-colors duration-(--dur-fast) hover:bg-action-on-inverse hover:text-on-action-on-inverse hover:border-action-on-inverse active:bg-action-on-inverse active:text-on-action-on-inverse active:border-action-on-inverse active:transition-none [-webkit-tap-highlight-color:transparent]';
const HEADING = 'text-meta font-bold text-text-on-inverse';
/** Liens légaux de la barre du bas : 16 px, cible de 44 px (lot 12) */
const LEGAL = 'inline-flex min-h-11 items-center text-base';
const LIST = 'space-y-2.5 text-meta text-text-secondary-on-inverse';
const ICON = 'w-4 h-4 shrink-0 text-text-secondary-on-inverse';

export default function Footer() {
  const { t, localizedList } = useLocalize();
  const domains = localizedList(DOMAINS_DATA, 'contenu.domaines', (d) => d.id);

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
                alt={t('ui.logoAlt')}
                width={52}
                height={52}
                loading="lazy"
                className="w-12 h-12 object-contain rounded-pill bg-white p-1"
              />
              <p className="text-body font-bold text-text-on-inverse">WAHHF Foundation</p>
            </Link>

            <p className="text-meta text-text-secondary-on-inverse">{t('footer.description')}</p>

            <p className="text-meta text-text-secondary-on-inverse">{t('footer.irokoBadge')}</p>

            {/* Réseaux de la fondation (lot 12) : icônes, adresses dans src/config/contact.ts (SOCIAL) */}
            <SocialLinks className="pt-2" />
          </div>

          {/* Qui sommes-nous */}
          <div className="space-y-3">
            <h3 className={HEADING}>{t('footer.colAbout')}</h3>
            <ul className={LIST}>
              <li>
                <Link to="/qui-sommes-nous" className={LINK}>
                  {t('footer.story')}
                </Link>
              </li>
              {/* Groupe 7.3 (QSN-01) : masqué tant qu'aucun nom n'est publié ; lot 7.7 : vers l'organigramme */}
              {GOVERNANCE_PUBLISHED && (
                <li>
                  <Link to="/qui-sommes-nous#organigramme" className={LINK}>
                    {t('footer.team')}
                  </Link>
                </li>
              )}
              <li>
                <Link to="/notre-impact" className={LINK}>
                  {t('nav.impact')}
                </Link>
              </li>
              <li>
                <Link to="/galerie" className={LINK}>
                  {t('footer.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/partenaires" className={LINK}>
                  {t('footer.partners')}
                </Link>
              </li>
              <li>
                <Link to="/actualites" className={LINK}>
                  {t('footer.news')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Nos actions (les 6 domaines) */}
          <div className="space-y-3">
            <h3 className={HEADING}>{t('footer.colActions')}</h3>
            <ul className={LIST}>
              {domains.map((dom) => (
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
                  {t('footer.academy')}
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
                  {t('footer.apply')}
                </Link>
              </li>
              <li>
                <Link to="/agir#benevole" className={LINK}>
                  {t('footer.volunteer')}
                </Link>
              </li>
              <li>
                <Link to="/agir#partenaire" className={LINK}>
                  {t('footer.partner')}
                </Link>
              </li>
              <li>
                <Link to="/accompagnement/eviter-les-arnaques" className={LINK}>
                  {t('footer.scams')}
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
                  {t('footer.contactForm')}
                </Link>
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
              {/* Les deux adresses, toujours ensemble, une par ligne (lot 12) */}
              <li className="pt-1">
                <p className="font-semibold text-text-on-inverse">{t('footer.addresses')}</p>
                <address className="mt-2 space-y-2 not-italic">
                  {CONTACT.address.map((ligne) => (
                    <span key={ligne} className="flex items-start gap-2.5">
                      <MapPin aria-hidden="true" className={cn(ICON, 'mt-1')} />
                      <span>{ligne}</span>
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Barre du bas : © 2026, mentions légales, confidentialité, transparence, bouton rond retour en haut. Lot 12 :
            les liens légaux en 16 px, sur 44 px de haut, sur toutes les pages qui ont ce pied de page */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-meta text-text-secondary-on-inverse">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-1">
            <span>© 2026 WAHHF Foundation. {t('footer.rights')}</span>
            <Link to="/mentions-legales" className={cn(LINK, LEGAL)}>
              {t('footer.legal')}
            </Link>
            <Link to="/confidentialite" className={cn(LINK, LEGAL)}>
              {t('footer.privacy')}
            </Link>
            {TRANSPARENCY_DATA_PUBLISHED && (
              <Link to="/transparence" className={cn(LINK, LEGAL)}>
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
