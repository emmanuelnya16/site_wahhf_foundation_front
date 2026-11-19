import { useState } from 'react';
import { Check } from 'lucide-react';
import PageHeader, { PageTitle, PageIntro } from '../components/wahhf/PageHeader';
import SEO from '../components/wahhf/SEO';
import Section from '../components/wahhf/Section';
import SectionHeader from '../components/wahhf/SectionHeader';
import GalleryGrid from '../components/wahhf/GalleryGrid';
import { fillLayout } from '../components/wahhf/galleryLayout';
import { DonateButton, SecondaryButton } from '../components/wahhf/Buttons';
import { AlbumId, albumPlaceDate, countLabel, GALLERY_ALBUMS, GALLERY_ITEMS } from '../data/gallery';
import { requestScrollRefresh } from '../lib/afterFirstDisplay';
import { cn } from '../lib/utils';

type Filter = 'tout' | AlbumId;

/** Albums non vides, avec leur mise en page sans trou (GAL-03), calculée une fois. */
const ALBUMS = GALLERY_ALBUMS.map((album) => {
  const items = GALLERY_ITEMS.filter((it) => it.album === album.id);
  return { album, items, layout: fillLayout(items, true) };
}).filter(({ items }) => items.length > 0);

/*
 * Galerie (groupe 7.3 : contrat validé, audit GAL-02, GAL-03, GAL-05, GAL-07, GAL-08, RESP-05, T-16).
 * - En-tête du lot 5 révélé à l'arrivée comme le hero.
 * - Puces de filtre de 44 px, sur plusieurs lignes au besoin (plus de rangée qui défile cachée, GAL-05), sans nombre ;
 *   l'option choisie a le style unique du site (contour 2 px et coche, contrat §11).
 * - Chaque album : son titre, le lieu et la date seulement s'ils sont confirmés, « 13 photos et 1 vidéo » (GAL-08),
 *   un court texte quand les faits sont établis (GAL-02 : l'Open Day, d'après ses photos et légendes).
 * - Grille sans trou : rangées complètes à chaque largeur (GAL-03, GalleryGrid fill).
 * - Fin de page : « Faire un don » et « Candidater au programme » (GAL-02), sur sauge, sans carte nuit.
 * - Mouvement (contrat §10) : vignettes en apparitions groupées ; la visionneuse s'ouvre depuis la vignette cliquée
 *   (transition partagée, View Transitions API ; ouverture simple sans l'API et en mouvement réduit), libellés exacts
 *   (GAL-07). Changer de filtre ne rejoue aucune apparition (les albums gardent leur clé).
 */
export default function GalleryPage() {
  const [filter, setFilter] = useState<Filter>('tout');
  const visible = filter === 'tout' ? ALBUMS : ALBUMS.filter(({ album }) => album.id === filter);

  const choose = (next: Filter) => {
    setFilter(next);
    // Les albums restants remontent : les apparitions recalculent leurs positions (si GSAP est chargé)
    requestAnimationFrame(requestScrollRefresh);
  };

  const chip = (active: boolean) =>
    cn(
      'inline-flex min-h-11 items-center gap-2 px-4 rounded-pill border text-body text-text cursor-pointer transition-colors duration-(--dur-fast) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
      active ? 'border-action [box-shadow:inset_0_0_0_1px_var(--action)] font-semibold' : 'border-border-input hover:border-action'
    );

  const options: { id: Filter; label: string }[] = [{ id: 'tout', label: 'Tous les albums' }, ...ALBUMS.map(({ album }) => ({ id: album.id, label: album.title }))];

  return (
    <>
      <SEO
        title="Galerie — La fondation en images"
        description="Photos et vidéos de WAHHF Foundation : First Open Day & Boot Camp à Yaoundé, rencontres de la communauté et actions sur le terrain."
      />

      <PageHeader reveal>
        <PageTitle>La fondation en images</PageTitle>
        <PageIntro>
          Retour en photos et en vidéos sur nos actions : la première journée portes ouvertes et le Boot Camp de Yaoundé, nos rencontres
          et le terrain.
        </PageIntro>
      </PageHeader>

      <Section>
        <div className="container-page space-y-14">
          <div role="group" aria-label="Filtrer par album" className="flex flex-wrap gap-2">
            {options.map((o) => (
              <button key={o.id} type="button" aria-pressed={filter === o.id} onClick={() => choose(o.id)} className={chip(filter === o.id)}>
                {filter === o.id && <Check aria-hidden="true" className="w-4 h-4 shrink-0 text-action" />}
                {o.label}
              </button>
            ))}
          </div>

          {visible.map(({ album, items, layout }) => {
            const placeDate = albumPlaceDate(album);
            return (
              // Clé = album (et non plus le filtre) : changer de filtre ne rejoue pas les apparitions
              <section key={album.id} id={album.id} aria-labelledby={`album-${album.id}`} className="space-y-6">
                <div className="max-w-[65ch] space-y-2">
                  <h2 id={`album-${album.id}`} className="text-section-title text-text">
                    {album.title}
                  </h2>
                  {placeDate && <p className="text-meta text-text-secondary">{placeDate}</p>}
                  <p className="text-meta text-text-secondary">{countLabel(items)}</p>
                  {album.story && <p className="pt-2 text-body text-text-secondary">{album.story}</p>}
                </div>
                <GalleryGrid items={items} featureFirst fill={layout} openFromThumb />
              </section>
            );
          })}
        </div>
      </Section>

      {/* FIN DE PAGE : deux actions (GAL-02), sur sauge, sans carte nuit au-dessus du footer */}
      <Section tone="sauge">
        <div className="container-page">
          <div className="max-w-[65ch] space-y-6">
            <SectionHeader
              title="Participer à la suite"
              subtitle="Un don soutient les actions de la fondation. Les jeunes peuvent candidater aux cours d’allemand et à l’orientation vers l’Europe."
            />
            <div className="flex flex-wrap items-center gap-3">
              <DonateButton size="lg" />
              <SecondaryButton to="/candidater" size="lg">
                Candidater au programme
              </SecondaryButton>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
