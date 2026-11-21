import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/wahhf/SEO';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import PageHeader, { PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { DonateButton, PrimaryButton } from '../../components/wahhf/Buttons';
import PresenceSection from '../../components/wahhf/PresenceSection';
import { TRANSPARENCY_DATA_PUBLISHED } from '../../config/transparency';
import Photo from '../../components/wahhf/Photo';
import { TEXT_LINK_CLASS } from '../../components/wahhf/TextList';
import type { CatalogPhoto } from '../../data/photos';
import { photoCaption, photoOrFallback } from '../../lib/photos';
import { registerBundle } from '../../i18n';
import notreImpactFr from '../../locales/notre-impact/fr.json';

/** Textes de la page (lot 7.10) : src/locales/notre-impact/ (espace de noms notreImpact). */
registerBundle('notreImpact', notreImpactFr, {
  en: () => import('../../locales/notre-impact/en.json'),
  de: () => import('../../locales/notre-impact/de.json'),
});

/*
 * Notre impact (groupe 7.3 : contrat validé, audit IMP-01, T-11, A11Y-09).
 * - IMP-01 : la page n'est pas renommée (proposition « Où nous agissons » à valider avec la cliente) ; un bouton
 *   « Faire un don » la termine. Introduction en phrase complète (revue du groupe 7.3).
 * - Chiffres clés masqués (contrat §7 et §12, T-11) : « 1 250+ (TODO) » est un exemple, « 10 régions couvertes » n'est
 *   étayé nulle part, et les gros compteurs animés sont un défaut rejeté. Ils sont gardés dans
 *   EXAMPLE_IMPACT_FIGURES_NOT_VALIDATED ; la section reviendra avec au moins deux résultats datés et sourcés, en texte
 *   fixe.
 * - La carte de présence garde ses régions et ses pays ; les lignes provisoires de son panneau sont masquées
 *   (PresenceSection hidePending). Un H2 la précède (A11Y-09 : plus de H1 suivi d'un H3).
 * - Mouvement (contrat §10) : en-tête révélé comme le hero ; la carte (cascade des régions, puis l'arc), déjà faite.
 * - Lien vers /transparence masqué tant qu'aucune donnée n'y est publiée (TRA-01, groupe 7.2).
 * - Retouches du 19/11 (votre demande : des images) : photo dans l'en-tête (la salle comble du 25 avril, A27 ; A30 en
 *   production tant que l'accord parental manque), découverte du bas vers le haut sur ordinateur ; sous la carte,
 *   « Nos actions, en images » : trois photos de trois albums (plantation, randonnée, journée du 25 avril), légendées
 *   par leur album, découvertes du bas vers le haut sur ordinateur, et le lien vers la galerie. Aucun chiffre ni lieu
 *   ajouté. Fonds alternés : brume, sauge, puis la fin de page.
 */

/** Chiffres d'exemple de l'ancienne page : jamais affichés (« 1 250+ » est marqué TODO, « 10 régions » non étayé). */
export const EXAMPLE_IMPACT_FIGURES_NOT_VALIDATED = [
  { end: 1250, suffix: '+', label: 'Jeunes et familles accompagnés (TODO)' },
  { end: 6, suffix: '', label: 'Domaines d’action structurés' },
  { end: 10, suffix: '', label: 'Régions du Cameroun couvertes' },
  { end: 10, suffix: '', label: 'Pays européens documentés gratuitement' },
];

/** En-tête : la salle comble (A27), sinon des participants de dos face au kakémono (A30). */
const HEADER_PHOTO = photoOrFallback('A27', 'A30');
/**
 * Trois moments, trois albums : la plantation (B13, sinon B24), l'arrivée au sommet de la randonnée (B75, sinon un
 * participant de dos en forêt, B85), l'hymne du 25 avril (A81, sinon une question au micro, A34).
 */
const FIELD_PHOTOS = [photoOrFallback('B13', 'B24'), photoOrFallback('B75', 'B85'), photoOrFallback('A81', 'A34')].filter(
  (photo): photo is CatalogPhoto => !!photo,
);

export function NotreImpactPage() {
  const { t } = useTranslation();
  return (
    <>
      <SEO title={t('notreImpact.seo.title')} description={t('notreImpact.seo.description')} />

      <PageHeader
        reveal
        revealPhoto
        catalogPhoto={HEADER_PHOTO}
        photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}
      >
        <PageTitle>{t('notreImpact.title')}</PageTitle>
        <PageIntro>{t('notreImpact.intro')}</PageIntro>
      </PageHeader>

      {/* Carte de présence : régions du Cameroun et pays européens, sans lignes provisoires */}
      <Section>
        <div className="container-page space-y-10">
          <SectionHeader title={t('home.presence.title')} subtitle={t('home.presence.subtitle')} />
          <PresenceSection hidePending />
        </div>
      </Section>

      {/* NOS ACTIONS, EN IMAGES (retouches du 19/11) : trois photos de trois albums, légendées par leur album */}
      {FIELD_PHOTOS.length > 0 && (
        <Section tone="sauge">
          <div className="container-page space-y-8">
            <SectionHeader title={t('notreImpact.field.title')} subtitle={t('notreImpact.field.subtitle')} />
            {/* Téléphone : la première en grand, les deux autres côte à côte ; ordinateur : trois colonnes (4:3) */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-6 lg:grid-cols-3">
              {FIELD_PHOTOS.map((photo, i) => (
                <figure key={photo.id} className={i === 0 ? 'col-span-2 lg:col-span-1' : undefined}>
                  <div data-reveal="clip" data-reveal-radius="1.25rem" className="aspect-[4/3] overflow-hidden rounded-card">
                    <Photo
                      photo={photo}
                      fit="cover"
                      radius="none"
                      sizes={i === 0 ? '(min-width: 1024px) 26rem, calc(100vw - 2.5rem)' : '(min-width: 1024px) 26rem, 50vw'}
                    />
                  </div>
                  <figcaption className="mt-2 text-meta text-text-secondary">{photoCaption(photo)}</figcaption>
                </figure>
              ))}
            </div>
            <Link to="/galerie" className={TEXT_LINK_CLASS}>
              {t('notreImpact.field.gallery')}
            </Link>
          </div>
        </Section>
      )}

      {/* Lien vers /transparence : masqué tant qu'aucune donnée n'y est publiée (TRA-01, groupe 7.2) */}
      {TRANSPARENCY_DATA_PUBLISHED && (
        <Section>
          <div className="container-page">
            <div className="max-w-[65ch] space-y-5">
              <SectionHeader title={t('notreImpact.transparency.title')} subtitle={t('notreImpact.transparency.subtitle')} />
              <PrimaryButton to="/transparence">{t('notreImpact.transparency.cta')}</PrimaryButton>
            </div>
          </div>
        </Section>
      )}

      {/* FIN DE PAGE : le don (IMP-01), sur le fond de la page, sans carte nuit au-dessus du footer */}
      <Section tone={TRANSPARENCY_DATA_PUBLISHED ? 'sauge' : 'brume'}>
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader title={t('notreImpact.support.title')} subtitle={t('notreImpact.support.subtitle')} />
            <DonateButton size="lg" />
          </div>
        </div>
      </Section>
    </>
  );
}

export default NotreImpactPage;
