import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import GalleryGrid from '../../components/wahhf/GalleryGrid';
import ScrollExpand from '../../effects/ScrollExpand';
import { galleryItem, GalleryItem, HOME_GALLERY_IDS } from '../../data/gallery';
import { FIELD_EXPAND } from '../../config/fieldMedia';
import { useMediaQuery } from '../../lib/useMediaQuery';

/** La photo qui s'ouvre en plein écran, puis les 4 autres vraies photos du First Open Day & Boot Camp. */
const expandPhoto = galleryItem(FIELD_EXPAND.photoId);
const items = HOME_GALLERY_IDS.filter((id) => id !== FIELD_EXPAND.photoId)
  .map(galleryItem)
  .filter((item): item is GalleryItem => !!item);

/**
 * 3. Sur le terrain (contrat §7, section 3 ; décision du 16/11) : les vraies photos de l'Open Day et le lien vers la
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

  const media =
    loop.mp4 || loop.webm ? (
      <video
        data-expand-media=""
        poster={expandPhoto?.kind === 'photo' ? expandPhoto.src : undefined}
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
    ) : expandPhoto?.kind === 'photo' ? (
      <img
        data-expand-media=""
        src={expandPhoto.src}
        srcSet={expandPhoto.srcSet}
        sizes="100vw"
        width={expandPhoto.w}
        height={expandPhoto.h}
        alt={expandPhoto.alt}
        loading="lazy"
        decoding="async"
      />
    ) : null;

  return (
    <Section id="sur-le-terrain">
      <div className="container-page">
        <SectionHeader title={t('home.gallery.title')} subtitle={t('home.gallery.subtitle')} revealTitle />
      </div>

      {media && (
        <ScrollExpand
          className="mt-10"
          media={media}
          caption={
            <>
              <p className="text-body font-semibold">{t('home.gallery.expandCaption')}</p>
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
