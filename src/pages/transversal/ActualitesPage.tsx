import { Link, useParams } from 'react-router-dom';
import SEO from '../../components/wahhf/SEO';
import Section from '../../components/wahhf/Section';
import SectionHeader from '../../components/wahhf/SectionHeader';
import { ReadingColumn, TEXT_LINK_CLASS } from '../../components/wahhf/TextList';
import { CardLink, CardMedia, CardBody, CardMeta, CardTitle } from '../../components/wahhf/Card';
import { photoCaption, photoOrFallback } from '../../lib/photos';
import FieldAlbums from './FieldAlbums';
import PageHeader, { PageBreadcrumb, PageMeta, PageTitle, PageIntro } from '../../components/wahhf/PageHeader';
import { PrimaryButton } from '../../components/wahhf/Buttons';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';
import { DOMAINS_DATA, NewsArticle, imageSrcSet } from '../../services/api';
import { EXAMPLE_NEWS_SLUGS, PUBLISHED_NEWS, confirmedDate } from '../../lib/news';

/*
 * Actualités et article (groupe 7.3 : contrat validé, audit ACTU-01, ART-01 à ART-03, T-03, T-04, T-15, A11Y-10).
 * - Les trois articles actuels sont des exemples (dates « (TODO) », images générées, « A1 à B2 », temps de lecture
 *   inventés, T-03) : masqués, gardés dans NEWS_DATA (EXAMPLE_NEWS_SLUGS). Leur adresse affiche « Cet article est
 *   introuvable ». La page dit qu'aucun article n'est publié (contrat §11) et mène à l'album de l'Open Day (ACTU-01).
 * - Un article publié s'affiche en carte (image sans texte alternatif, son titre suffit, A11Y-10), sans temps de
 *   lecture ni date non confirmée.
 * - Article : colonne de lecture de 65 caractères, image comprise (ART-02 et T-15 : plus de carte) ; un seul bouton
 *   principal, le don en simple lien (ART-02) ; image prioritaire (fetchpriority, ART-03).
 * - Mouvement (contrat §10) : en-têtes révélés comme le hero ; cartes en apparitions groupées ; article : barre de
 *   lecture forêt (Layout, ReadingProgress) et image découverte du bas vers le haut (clip-path, ordinateur, .photo-rise).
 * - Retouches du 19/11 (« page vide, sans design ni animations ») : photo dans l'en-tête (découverte du bas vers le
 *   haut sur ordinateur) ; l'état vide et les albums dans une seule section ; la journée du 25 avril en mosaïque, puis
 *   les autres albums de la galerie en cartes (FieldAlbums).
 * Aperçu des articles d'exemple, pour vérifier la mise en page sans les publier : construire le site avec
 * VITE_APERCU_ACTUALITES=1 (jamais pour la mise en ligne).
 */

/** Articles publiés et dates confirmées : src/lib/news.ts (déplacés au lot 7.9, partagés avec la page Événements). */
export { EXAMPLE_NEWS_SLUGS };
const PUBLISHED = PUBLISHED_NEWS;

/** Domaine d'un article (sa rubrique), pour son action principale. */
const domainOf = (article: NewsArticle) => DOMAINS_DATA.find((d) => d.title === article.category);

/**
 * Photo de l'en-tête (retouches du 19/11) : un intervenant au pupitre le 25 avril (A41, catalogue : « Galerie,
 * Actualités »), légendée par son album.
 * L'ancienne carte de l'album (OpenDayCard, couverture A07) est remplacée par FieldAlbums, qui présente tous les albums.
 */
const HEADER_PHOTO = photoOrFallback('A41');

function Article({ article }: { article: NewsArticle }) {
  const date = confirmedDate(article.date);
  const domain = domainOf(article);
  const isMobility = domain?.slug === 'mobilite-langues';
  return (
    <>
      <SEO title={article.title} description={article.excerpt} />
      <PageHeader reveal>
        <PageBreadcrumb items={[{ label: 'Actualités', to: '/actualites' }, { label: article.title }]} />
        <PageMeta className="gap-x-4">
          <span>{article.category}</span>
          {date && <span>Publié le {date}</span>}
        </PageMeta>
        <PageTitle>{article.title}</PageTitle>
      </PageHeader>

      <Section>
        <div className="container-page">
          {/* data-reading-progress : la barre de lecture (Layout) ne s'affiche que sur un vrai article, et se remplit
              sur la hauteur du texte (pleine quand son dernier paragraphe atteint le bas de l'écran ; revue du groupe 7.3) */}
          <div data-reading-progress="">
            <ReadingColumn as="article" className="[&>figure]:mb-8">
              {/* Image principale : 16/10, rayon des cartes ; découverte du bas vers le haut à l'arrivée (ordinateur) */}
              <figure className="m-0">
                <img
                  src={article.image}
                  srcSet={imageSrcSet(article.image)}
                  sizes="(min-width: 768px) 38rem, calc(100vw - 2.5rem)"
                  alt={article.imageAlt ?? ''}
                  width={1200}
                  height={750}
                  fetchPriority="high"
                  className="photo-rise w-full aspect-[16/10] object-cover rounded-card bg-surface-section"
                />
              </figure>
              {article.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </ReadingColumn>
          </div>

          {/* Une seule action principale (ART-02) ; le don en lien, sous le texte, sans effet */}
          <div className="max-w-[65ch] mt-10 pt-8 border-t border-border-subtle flex flex-wrap items-center gap-x-6 gap-y-3">
            {isMobility ? (
              <>
                <PrimaryButton to="/candidater">Candidater</PrimaryButton>
                <Link to="/faire-un-don?affectation=mobilite-langues" className={TEXT_LINK_CLASS}>
                  Faire un don
                </Link>
              </>
            ) : (
              <PrimaryButton to={domain ? `/faire-un-don?affectation=${domain.slug}` : '/faire-un-don'}>Soutenir ce domaine</PrimaryButton>
            )}
            <Link to="/actualites" className={TEXT_LINK_CLASS}>
              Toutes les actualités
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

export function ActualitesPage() {
  const { slug } = useParams<{ slug?: string }>();

  if (slug) {
    const article = PUBLISHED.find((a) => a.slug === slug);
    // Article inconnu ou non publié : on le dit, au lieu d'afficher le premier article
    if (!article) {
      return (
        <NotFoundPage
          title="Cet article est introuvable"
          message="Il a peut-être été déplacé ou retiré, ou le lien a été mal copié. Voici les actualités publiées."
        >
          <NotFoundLinks
            heading="Toutes les actualités"
            links={[
              { to: '/actualites', label: 'Page Actualités' },
              ...PUBLISHED.map((a) => ({ to: `/actualites/${a.slug}`, label: a.title })),
              { to: '/galerie', label: 'Galerie photo et vidéo' },
            ]}
          />
        </NotFoundPage>
      );
    }
    return <Article article={article} />;
  }

  return (
    <>
      <SEO
        title="Actualités et actions de terrain"
        description="Les actualités de WAHHF Foundation, et en images la première journée portes ouvertes et le Boot Camp de Yaoundé."
      />
      <PageHeader
        reveal
        revealPhoto
        catalogPhoto={HEADER_PHOTO}
        photoCaption={HEADER_PHOTO ? photoCaption(HEADER_PHOTO) : undefined}
      >
        <PageTitle>Actualités et actions de terrain</PageTitle>
        <PageIntro>Les nouvelles de la fondation et de ses actions, au Cameroun et vers l’Europe.</PageIntro>
      </PageHeader>

      <Section tone="sauge">
        <div className="container-page space-y-14 lg:space-y-20">
          {PUBLISHED.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PUBLISHED.map((art) => {
                const date = confirmedDate(art.date);
                return (
                  <CardLink key={art.slug} to={`/actualites/${art.slug}`} surface="section">
                    <CardMedia
                      src={art.image}
                      srcSet={imageSrcSet(art.image)}
                      sizes="(min-width: 1024px) 22rem, (min-width: 768px) 45vw, 100vw"
                      alt=""
                      width={600}
                      height={375}
                    />
                    <CardBody>
                      <CardMeta>
                        <span>{art.category}</span>
                        {date && <span>{date}</span>}
                      </CardMeta>
                      <CardTitle as="h2">{art.title}</CardTitle>
                      <p className="text-body text-text-secondary">{art.excerpt}</p>
                    </CardBody>
                  </CardLink>
                );
              })}
            </div>
          ) : (
            // État vide (contrat §11) : on le dit, et on mène à la preuve qui existe (ACTU-01), juste dessous
            <div className="max-w-[65ch] space-y-3">
              <h2 className="text-section-title text-text">Aucun article publié pour le moment</h2>
              <p className="text-body text-text-secondary">
                En attendant, retrouvez en photos et en vidéos la première journée portes ouvertes de la fondation et le Boot
                Camp de Yaoundé.
              </p>
            </div>
          )}

          {/* EN IMAGES : les albums de la galerie (ACTU-01 ; retouches du 19/11). Pas « Sur le terrain », nom d'un autre
              album de la galerie (revue du groupe 7.3) */}
          <div className="space-y-8">
            <SectionHeader title="En images" />
            <FieldAlbums />
            <Link to="/galerie" className={TEXT_LINK_CLASS}>
              Voir toute la galerie
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

export default ActualitesPage;
