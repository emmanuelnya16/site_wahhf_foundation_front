import { lazy, Suspense, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { JOURNEY_PANELS, JOURNEY_SECTION } from '../../data/journey';
import { useLocalize } from '../../lib/localize';
import { useAfterFirstDisplay } from '../../lib/afterFirstDisplay';

const JourneyGallery = lazy(() => import('./JourneyGallery'));

/** Cadre vide de l'accordéon, aux mêmes dimensions (mêmes classes) : la page ne bouge pas quand les photos arrivent. */
function GalleryPlaceholder() {
  return (
    <ul className="xg" aria-hidden="true" style={{ '--xg-n': JOURNEY_PANELS.length } as CSSProperties}>
      {JOURNEY_PANELS.map((panel, index) => (
        <li
          key={panel.id}
          className="xg-panel"
          data-open={index === 0 || undefined}
          style={{ '--i': index, '--after': index > 0 ? 1 : 0 } as CSSProperties}
        >
          <div className="xg-frame" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Accueil, après « Domaines » et avant la carte de présence (lot 7.6, décision du 19/11) : « Apprendre, cultiver,
 * grandir », un parcours en 5 photos dans un accordéon, sur une bande nuit pleine largeur.
 * - En-tête aligné à gauche : titre, une phrase, lien vers la galerie ; apparition des titres de l'accueil
 *   (RevealBatch : fondu et montée).
 * - L'accordéon (photos et données) est chargé après le premier affichage, dans un fichier à part : rien de lourd dans
 *   le JavaScript initial, et un cadre de même taille l'attend (aucun décalage).
 */
export default function JourneySection() {
  const { localized } = useLocalize();
  const section = localized(JOURNEY_SECTION, 'contenu.parcours.section');
  const ready = useAfterFirstDisplay();
  return (
    <section id="apprendre-cultiver-grandir" aria-labelledby="apprendre-cultiver-grandir-titre" className="section-space bg-surface-inverse">
      <div className="container-page">
        <div className="max-w-[65ch]">
          <h2 id="apprendre-cultiver-grandir-titre" data-reveal className="text-section-title text-text-on-inverse">
            {section.title}
          </h2>
          <p data-reveal className="mt-4 text-body text-text-on-inverse/80">
            {section.intro}
          </p>
          <p data-reveal className="mt-3">
            <Link
              to="/galerie"
              className="inline-flex min-h-11 items-center gap-2 text-body text-link-on-inverse underline underline-offset-4 decoration-1 hover:decoration-2"
            >
              {section.link}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </p>
        </div>
        <div className="mt-10">
          {ready ? (
            <Suspense fallback={<GalleryPlaceholder />}>
              <JourneyGallery />
            </Suspense>
          ) : (
            <GalleryPlaceholder />
          )}
        </div>
      </div>
    </section>
  );
}
