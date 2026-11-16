import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowUp, Mail, MapPin, Phone, ShieldCheck, Heart } from 'lucide-react';
import { DOMAINS_DATA, WAHHF_LOGO_URL } from '../services/api';
import { scrollToTop } from '../lib/scroll';
import StaggerGroup from '../effects/StaggerGroup';

/**
 * Footer sombre vert profond (#0F3D2E), 5 colonnes :
 * (1) logo + une phrase + « Branche sociale du groupe IROKO » + réseaux sociaux
 * (2) Qui sommes-nous
 * (3) Nos actions (les 6 domaines)
 * (4) Agir et Faire un don
 * (5) Contact et adresse
 * Barre du bas : mentions légales, politique de confidentialité, transparence financière, © 2026, bouton rond « retour en haut ».
 */
export default function Footer() {
  const { t } = useTranslation();

  // Passe par Lenis quand il est actif (défilement fluide), sinon remontée instantanée.
  const handleBackToTop = () => {
    scrollToTop();
    // Clavier : le focus repart du haut de la page (lien « Aller au contenu », visible seulement au clavier)
    document.querySelector<HTMLElement>('a[href="#contenu"]')?.focus({ preventScroll: true });
  };

  return (
    <footer className="surface-green bg-[#0F3D2E] text-[#F5F1E8] border-t border-[#E8A317]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Colonnes : apparition douce et décalée, une seule fois */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#F5F1E8]/15">
          {/* Colonne 1 : Logo + une phrase + Branche sociale du groupe IROKO + Réseaux sociaux */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={WAHHF_LOGO_URL}
                alt="Logo WAHHF Foundation"
                width={52}
                height={52}
                loading="lazy"
                className="w-12 h-12 object-contain rounded-full bg-white p-1"
              />
              <div>
                <p className="font-serif font-normal text-xl text-[#F5F1E8]">WAHHF Foundation</p>
                <p className="text-xs text-[#E8A317] font-medium">We Are Here Help Foundation</p>
              </div>
            </Link>

            <p className="text-sm text-[#F5F1E8]/80 leading-relaxed">
              {t('footer.description')}
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#14523E] border border-[#E8A317]/40 text-xs font-semibold text-gold-on-green">
              <ShieldCheck className="w-4 h-4" />
              <span>{t('footer.irokoBadge')}</span>
            </div>

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
                  className="px-3 py-1.5 rounded-full bg-[#F5F1E8]/10 hover:bg-[#E8A317] hover:text-[#1B1B18] text-xs font-medium transition-colors"
                >
                  {soc.label}
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 : Qui sommes-nous */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A317]">
              {t('footer.colAbout')}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F1E8]/80">
              <li>
                <Link to="/qui-sommes-nous" className="hover:text-[#E8A317] transition-colors">
                  Notre histoire & mission
                </Link>
              </li>
              <li>
                <Link to="/qui-sommes-nous#gouvernance" className="hover:text-[#E8A317] transition-colors">
                  Équipe & Gouvernance
                </Link>
              </li>
              <li>
                <Link to="/notre-impact" className="hover:text-[#E8A317] transition-colors">
                  Notre impact & chiffres
                </Link>
              </li>
              <li>
                <Link to="/galerie" className="hover:text-[#E8A317] transition-colors">
                  Galerie photo & vidéo
                </Link>
              </li>
              <li>
                <Link to="/partenaires" className="hover:text-[#E8A317] transition-colors">
                  Partenaires & Groupe IROKO
                </Link>
              </li>
              <li>
                <Link to="/actualites" className="hover:text-[#E8A317] transition-colors">
                  Actualités & Terrain
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Nos actions (les 6 domaines) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A317]">
              {t('footer.colActions')}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F1E8]/80">
              {DOMAINS_DATA.map((dom) => (
                <li key={dom.id}>
                  <Link to={dom.link} className="hover:text-[#E8A317] transition-colors flex items-center gap-2">
                    <span className="text-xs text-[#E8A317] font-semibold">{dom.number}.</span>
                    <span>{dom.title}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/mobilite-langues/academie"
                  className="text-xs text-[#E8A317] underline underline-offset-4 hover:text-white"
                >
                  → Académie d’allemand A1–C1 (Gratuit)
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Agir et Faire un don */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A317]">
              {t('footer.colAct')}
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F5F1E8]/80">
              <li>
                <Link
                  to="/faire-un-don"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C8102E] hover:bg-[#a80d26] text-white text-xs font-semibold transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Faire un don</span>
                </Link>
              </li>
              <li>
                <Link to="/candidater" className="hover:text-[#E8A317] transition-colors">
                  Candidater à un programme
                </Link>
              </li>
              <li>
                <Link to="/agir#benevole" className="hover:text-[#E8A317] transition-colors">
                  Devenir bénévole
                </Link>
              </li>
              <li>
                <Link to="/agir#partenaire" className="hover:text-[#E8A317] transition-colors">
                  Devenir partenaire
                </Link>
              </li>
              <li>
                <Link to="/accompagnement/eviter-les-arnaques" className="hover:text-[#E8A317] transition-colors">
                  Prévention des arnaques
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 5 : Contact et adresse */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E8A317]">
              {t('footer.colContact')}
            </h3>
            <ul className="space-y-3 text-sm text-[#F5F1E8]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8A317] shrink-0 mt-1" />
                <span>
                  Cameroun (Douala / Yaoundé) & Coordination Allemagne <span className="text-xs text-[#E8A317]">(TODO : adresse exacte)</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8A317] shrink-0" />
                <a href="tel:+237693129205" className="hover:text-[#E8A317] transition-colors">
                  +237 693 12 92 05
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E8A317] shrink-0" />
                <a href="mailto:contact@wahhf-foundation.org" className="hover:text-[#E8A317] transition-colors break-all">
                  contact@wahhf-foundation.org
                </a>
              </li>
            </ul>
          </div>
        </StaggerGroup>

        {/* Barre du bas : mentions légales, confidentialité, transparence, © 2026, bouton rond retour en haut */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F1E8]/70">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
            <span>© 2026 WAHHF Foundation (We Are Here Help Foundation). {t('footer.rights')}</span>
            <Link to="/mentions-legales" className="hover:text-[#E8A317] transition-colors">
              {t('footer.legal')}
            </Link>
            <Link to="/confidentialite" className="hover:text-[#E8A317] transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/transparence" className="hover:text-[#E8A317] transition-colors">
              {t('footer.transparency')}
            </Link>
          </div>

          <button
            type="button"
            onClick={handleBackToTop}
            aria-label={t('footer.backToTop')}
            title={t('footer.backToTop')}
            className="w-11 h-11 rounded-full bg-[#14523E] hover:bg-[#E8A317] text-[#F5F1E8] hover:text-[#1B1B18] border border-[#E8A317]/40 flex items-center justify-center transition duration-300 cursor-pointer shrink-0"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
