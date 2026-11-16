import { useTranslation } from 'react-i18next';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { SecondaryButton } from '../../components/wahhf/Buttons';
import GalleryGrid from '../../components/wahhf/GalleryGrid';
import { galleryItem, GalleryItem, HOME_GALLERY_IDS } from '../../data/gallery';

/** 5 vraies photos du First Open Day & Boot Camp (Yaoundé, 25 avril 2026), légendées dans la visionneuse. */
const items = HOME_GALLERY_IDS.map(galleryItem).filter((item): item is GalleryItem => !!item);

/**
 * 3. Sur le terrain (contrat §7, section 3 ; décision du 16/11) : les vraies photos de l'Open Day et le lien vers la
 * galerie. Aucune image générée. Le film WAHHF s'ouvre depuis le hero ; la bande démo du groupe IROKO quitte l'accueil
 * (URL gardée dans config/heroVideo.ts, IROKO_SHOWREEL_URL).
 */
export default function FieldSection() {
  const { t } = useTranslation();
  return (
    <Section id="sur-le-terrain">
      <div className="container-page space-y-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader title={t('home.gallery.title')} subtitle={t('home.gallery.subtitle')} />
          <SecondaryButton to="/galerie" className="shrink-0">
            {t('home.gallery.link')}
          </SecondaryButton>
        </div>
        {/* 1 grande + 4 petites : 2 colonnes sur téléphone, 4 dès la tablette ; visionneuse au clic ; sans apparition décalée */}
        <GalleryGrid items={items} featureFirst cols="grid-cols-2 md:grid-cols-4" reveal={false} />
      </div>
    </Section>
  );
}
