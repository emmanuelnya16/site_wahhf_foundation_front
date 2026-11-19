import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import Photo from '../../components/wahhf/Photo';
import { DOMAINS_DATA } from '../../services/api';
import { DOMAIN_PHOTO_IDS } from '../../config/domainPhotos';
import { useCatalogPhotos } from '../../lib/useCatalogPhoto';

const SPECS = DOMAINS_DATA.map((domain) => DOMAIN_PHOTO_IDS[domain.slug] ?? []);

/**
 * 4. Domaines (contrat §7, section 4 ; retouches du 19/11 : une photo pour chaque domaine) : les 6 domaines en liste,
 * titre-lien et une phrase, filet entre les lignes, sans carte ni numéro ni sur-titre. Chaque ligne commence par une
 * photo de la fondation, 4:3, rayon des vignettes (src/config/domainPhotos.ts, la même que sur Nos actions), décorative
 * (le titre dit le domaine). Le titre mène à son bloc sur /nos-actions (T-10) ; toute la ligne est cliquable (le lien
 * s'étend sur la ligne), mais un seul arrêt au clavier.
 * Les données des photos arrivent après le premier affichage (JavaScript initial inchangé) : le cadre est réservé dès le
 * départ, aucun décalage de mise en page.
 * Mouvement : les lignes apparaissent (fondu et montée, RevealBatch) ; pas de zoom au survol (contrat, annexe B, 12).
 */
export default function DomainsSection() {
  const { t } = useTranslation();
  const photos = useCatalogPhotos(SPECS);
  return (
    <Section tone="sauge" id="domaines">
      <div className="container-page space-y-10">
        <SectionHeader title={t('home.domains.title')} subtitle={t('home.domains.subtitle')} />
        <ul className="grid gap-x-10 md:grid-cols-2">
          {DOMAINS_DATA.map((domain, i) => {
            const photo = photos[i]?.photo;
            return (
              <li
                key={domain.id}
                data-reveal=""
                className="relative grid grid-cols-[7rem_minmax(0,1fr)] items-start gap-4 border-t border-border-subtle py-5 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:py-6 lg:grid-cols-[12rem_minmax(0,1fr)]"
              >
                {/* Cadre réservé (4:3) : la photo s'y pose une fois ses données chargées */}
                <div className="aspect-[4/3] overflow-hidden rounded-inner bg-surface-raised">
                  {photo && (
                    <Photo photo={photo} fit="cover" radius="none" decorative sizes="(min-width: 1024px) 12rem, (min-width: 640px) 10rem, 7rem" />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-body font-semibold text-text">
                    <Link
                      to={`/nos-actions#${domain.slug}`}
                      className="text-link underline underline-offset-4 decoration-1 hover:decoration-2 after:absolute after:inset-0 after:content-['']"
                    >
                      {domain.title}
                    </Link>
                  </h3>
                  <p className="text-body text-text-secondary">{domain.shortDesc}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
