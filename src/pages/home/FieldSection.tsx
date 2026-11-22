import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { localizedGallery, photoAlt } from '../../lib/photoText';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import GalleryGrid from '../../components/wahhf/GalleryGrid';
import ScrollExpand from '../../effects/ScrollExpand';
import { galleryItem, GalleryItem, HOME_GALLERY_IDS } from '../../data/gallery';
import { FIELD_EXPAND } from '../../config/fieldMedia';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { useCatalogPhoto } from '../../lib/useCatalogPhoto';

/** La photo qui s'ouvre en plein écran, puis les 4 autres vraies photos du First Open Day & Boot Camp. */
const expandPhoto = galleryItem(FIELD_EXPAND.photoId);
const items = HOME_GALLERY_IDS.filter((id) => id !== FIELD_EXPAND.photoId)
  .map(galleryItem)
  .filter((item): item is GalleryItem => !!item);

/**
 * 3. Sur le terrain (contrat §7, section 3 ; décision du 16/11 ; lot 7.6 : B17 quand elle est publiable, avec la légende
 * de son album) : les vraies photos de l’Open Day et le lien vers la
 * galerie. Aucune image générée. Le film WAHHF s'ouvre depuis le hero ; la bande démo du groupe IROKO quitte l'accueil
 * (URL gardée dans config/heroVideo.ts, IROKO_SHOWREEL_URL).
 * Mouvement (contrat §10, moment 3, lot 7) : le titre apparaît ; la photo de la marche dans Yaoundé s'ouvre en plein
 * écran au défilement sur ordinateur (ScrollExpand), puis la légende « Yaoundé, 25 avril 2026 » et le lien vers la
 * galerie ; ailleurs, photo normale en fondu, légende et lien dessous. Les 4 autres photos apparaissent ensuite.
 */
export default function FieldSection() {
  const { t } = useTranslation();
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const loop = FIELD_EXPAND.loop;
  // Lot 7.6 : B17 si elle est publiable (données chargées après le premier affichage), sinon la photo de la marche
  const { photo: fieldPhoto, caption: fieldCaption } = useCatalogPhoto(FIELD_EXPAND.catalogPhotoId);

  const media =
    loop.mp4 || loop.webm ? (
      <video
        data-expand-media=""
        poster={fieldPhoto ? fieldPhoto.sources.jpeg : expandPhoto?.kind === 'photo' ? expandPhoto.src : undefined}
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        {loop.webm && <source src={loop.webm} type="video/webm" />}
        {loop.mp4 && <source src={loop.mp4} type="video/mp4" />}
      </video>
    ) : fieldPhoto || expandPhoto?.kind === 'photo' ? (
      // Une seule <img> quel que soit le choix (la scène animée la garde) : sources AVIF et WebP pour la photo du catalogue
      <picture className="contents">
        {fieldPhoto && <source type="image/avif" srcSet={fieldPhoto.sources.avif} sizes="(min-width: 1024px) 72rem, 100vw" />}
        {fieldPhoto && <source type="image/webp" srcSet={fieldPhoto.sources.webp} sizes="(min-width: 1024px) 72rem, 100vw" />}
        <img
          data-expand-media=""
          src={fieldPhoto ? fieldPhoto.sources.jpeg : expandPhoto?.kind === 'photo' ? expandPhoto.src : undefined}
          srcSet={fieldPhoto ? undefined : expandPhoto?.kind === 'photo' ? expandPhoto.srcSet : undefined}
          sizes="100vw"
          width={fieldPhoto ? fieldPhoto.width : expandPhoto?.w}
          height={fieldPhoto ? fieldPhoto.height : expandPhoto?.h}
          alt={fieldPhoto ? photoAlt(fieldPhoto) : expandPhoto && localizedGallery(expandPhoto).alt}
          loading="lazy"
          decoding="async"
          style={fieldPhoto ? { objectPosition: fieldPhoto.focus, backgroundColor: fieldPhoto.dominantColor } : undefined}
        />
      </picture>
    ) : null;

  return (
    <Section id="sur-le-terrain">
      <div className="container-page">
        <SectionHeader title={t('home.gallery.title')} subtitle={t('home.gallery.subtitle')} revealTitle />
      </div>

      {media && (
        <ScrollExpand
          className="mt-10"
          fit={FIELD_EXPAND.fit}
          media={media}
          caption={
            <>
              <p className="text-body font-semibold">{fieldPhoto && fieldCaption ? fieldCaption : t('home.gallery.expandCaption')}</p>
              <Link
                to="/galerie"
                className="inline-flex min-h-11 items-center text-body underline underline-offset-4 decoration-1 hover:decoration-2"
              >
                {t('home.gallery.link')}
              </Link>
            </>
          }
        />
      )}

      {/* 4 photos : 2 colonnes sur téléphone, 4 dès la tablette ; visionneuse au clic ; apparition au défilement */}
      <div className="container-page mt-10">
        <GalleryGrid items={items} cols="grid-cols-2 md:grid-cols-4" />
      </div>
    </Section>
  );
}
