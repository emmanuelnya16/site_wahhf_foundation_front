import { Link, useParams } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import SEO from '../../components/wahhf/SEO';
import { ReadingColumn } from '../../components/wahhf/TextList';
import { CardLink, CardMedia, CardBody, CardMeta, CardTitle } from '../../components/wahhf/Card';
import PageHeader, { PageMeta, PageTitle } from '../../components/wahhf/PageHeader';
import { PrimaryButton, DonateButton } from '../../components/wahhf/Buttons';
import NotFoundPage, { NotFoundLinks } from '../NotFoundPage';
import { NEWS_DATA, imageSrcSet } from '../../services/api';

/**
 * 5. PAGES /actualites et /actualites/:slug
 */
export function ActualitesPage() {
  const { slug } = useParams<{ slug?: string }>();

  if (slug) {
    const article = NEWS_DATA.find((a) => a.slug === slug);
    // Article inconnu : on le dit, au lieu d'afficher le premier article
    if (!article) {
      return (
        <NotFoundPage
          title="Cet article est introuvable"
          message="Il a peut-être été déplacé ou retiré, ou le lien a été mal copié. Voici les actualités publiées."
        >
          <NotFoundLinks
            heading="Toutes les actualités"
            links={[{ to: '/actualites', label: 'Page Actualités' }, ...NEWS_DATA.map((a) => ({ to: `/actualites/${a.slug}`, label: a.title }))]}
          />
        </NotFoundPage>
      );
    }
    return (
      <>
        <SEO title={article.title} description={article.excerpt} />
        <PageHeader>
          <PageMeta>
          <Link to="/actualites">
            Retour à toutes les actualités
          </Link>
          </PageMeta>
          <PageMeta className="gap-x-3">
            <span className="px-3 py-0.5 rounded-pill border border-border-input text-text">
              {article.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {article.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
          </PageMeta>
          <PageTitle>
            {article.title}
          </PageTitle>
        </PageHeader>

        <section className="container-page section-space space-y-8">
          <div className="max-w-[65ch] rounded-card overflow-hidden aspect-[16/9] bg-surface-section">
            <img
              src={article.image}
              srcSet={imageSrcSet(article.image)}
              sizes="(min-width: 768px) 600px, calc(100vw - 2.5rem)"
              alt={article.title}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>

          <ReadingColumn as="article">
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </ReadingColumn>

          <div className="flex flex-wrap justify-between items-center gap-4 pt-4">
            <PrimaryButton to="/candidater">Candidater au programme gratuit</PrimaryButton>
            <DonateButton />
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Actualités & Actions de terrain"
        description="Suivez les dernières actualités de WAHHF Foundation : ouvertures des sessions d'allemand gratuites, campagnes de santé et reboisement."
      />
      <PageHeader>
        <PageTitle>
          Actualités & Actions de terrain
        </PageTitle>
      </PageHeader>

      <section className="container-page section-space grid grid-cols-1 md:grid-cols-3 gap-6">
        {NEWS_DATA.map((art) => (
          <CardLink key={art.slug} to={`/actualites/${art.slug}`}>
            <CardMedia
              src={art.image}
              srcSet={imageSrcSet(art.image)}
              sizes="(min-width: 768px) 33vw, 100vw"
              alt={art.title}
              width={600}
              height={375}
            />
            <CardBody>
              <CardMeta>
                <span>{art.category}</span>
                <span>{art.date}</span>
              </CardMeta>
              <CardTitle as="h2">{art.title}</CardTitle>
              <p className="text-body text-text-secondary">{art.excerpt}</p>
            </CardBody>
          </CardLink>
        ))}
      </section>
    </>
  );
}

export default ActualitesPage;
