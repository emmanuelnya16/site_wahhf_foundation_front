import { useTranslation } from 'react-i18next';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { TextList, TextListItem } from '../../components/wahhf/TextList';
import { DOMAINS_DATA, WAHHF_IMAGES, imageSrcSet } from '../../services/api';

/** Photos réelles (First Open Day & Boot Camp) : les 3 autres domaines sont illustrés par des images générées (T-04). */
const REAL_PHOTOS = new Set<string>([WAHHF_IMAGES.openDayAccompagnement, WAHHF_IMAGES.openDayMarcheSlogan, WAHHF_IMAGES.openDayVisioconference]);

/**
 * 4. Domaines (contrat §7, section 4) : les 6 domaines en liste typographique (titre-lien et une phrase, filet entre
 * les lignes), sans carte ni numéro ni sur-titre. Le titre mène à son bloc sur /nos-actions par une ancre
 * (/nos-actions#education…, T-10) : la page s'ouvre directement sur le bon domaine. Une vignette 16/10 à droite de
 * la phrase, seulement quand la photo est réelle (3 domaines sur 6) ; décorative (le titre dit le domaine).
 */
export default function DomainsSection() {
  const { t } = useTranslation();
  return (
    <Section tone="sauge" id="domaines">
      <div className="container-page space-y-10">
        <SectionHeader title={t('home.domains.title')} subtitle={t('home.domains.subtitle')} />
        <TextList columns={2}>
          {DOMAINS_DATA.map((domain) => {
            const photo = REAL_PHOTOS.has(domain.image) ? domain.image : null;
            return (
              <TextListItem key={domain.id} title={domain.title} to={`/nos-actions#${domain.slug}`}>
                <div className="flex items-start gap-4">
                  <p className="flex-1">{domain.shortDesc}</p>
                  {photo && (
                    <img
                      src={photo}
                      srcSet={imageSrcSet(photo)}
                      sizes="128px"
                      alt=""
                      width={128}
                      height={80}
                      loading="lazy"
                      decoding="async"
                      className="mt-1 h-15 w-24 shrink-0 rounded-inner object-cover sm:h-20 sm:w-32"
                    />
                  )}
                </div>
              </TextListItem>
            );
          })}
        </TextList>
      </div>
    </Section>
  );
}
