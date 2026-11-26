import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { JOURNEY_PANELS, JOURNEY_SECTION } from '../../data/journey';
import { useLocalize } from '../../lib/localize';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { photoOrFallback } from '../../lib/photos';
import { cn } from '../../lib/utils';
import Entree from './Entree';
import PanneauImage, { type PanneauImageData } from './PanneauImage';

/** Bureau : 1 024 px et plus, à la souris (comme l'accordéon de /). Ailleurs, les bandes s'empilent. */
const BUREAU = '(min-width: 1024px) and (pointer: fine)';
/** Intention de survol : la bande s'ouvre si la souris y reste 100 ms */
const INTENTION_MS = 100;
/** Les trois verbes du titre, dans l'ordre (« Apprendre, cultiver, grandir ») : les panneaux qu'ils nomment */
const VERBES = ['apprendre', 'cultiver', 'grandir'];
const pad2 = (n: number) => String(n).padStart(2, '0');

/**
 * 8. En images (lot 11.8) : variante, propre à /accueil, de « Apprendre, cultiver, grandir » de / (JourneySection et
 * ExpandingGallery, inchangés). Mêmes données (src/data/journey.ts), mêmes photos, mêmes traductions ; en plus, dans
 * les textes de /accueil : le surtitre et les titres courts du fil.
 * - Accessibilité de l'accordéon gardée : un bouton par panneau (aria-expanded), ouverture au survol (100 ms), au clic
 *   et au focus clavier ; flèches, Début et Fin passent d'un panneau à l'autre.
 * - Le verbe du titre qui nomme le panneau ouvert se surligne en soleil (Apprendre, Cultiver, Grandir).
 * - Le fil, sous les panneaux (ordinateur) ou à leur gauche (téléphone), relie les cinq étapes : décor.
 */
export default function AccueilEnImages() {
  const { t, localized, localizedList } = useLocalize();
  const section = localized(JOURNEY_SECTION, 'contenu.parcours.section');
  const panneaux = localizedList(JOURNEY_PANELS, 'contenu.parcours.panneaux', (p) => p.id).flatMap((p): PanneauImageData[] => {
    const photo = photoOrFallback(p.photoId, p.fallbackId);
    if (!photo) return [];
    return [
      {
        id: p.id,
        title: p.title,
        meta: p.meta,
        description: p.description,
        photo,
        album: { to: `/galerie?album=${p.album}`, label: t('home.journey.albumLink') },
        court: t(`accueil.images.courts.${p.id}`),
      },
    ];
  });

  const [ouvert, setOuvert] = useState(0);
  const bureau = useMediaQuery(BUREAU);
  const baseId = useId();
  const boutons = useRef<(HTMLButtonElement | null)[]>([]);
  const intention = useRef<number | undefined>(undefined);
  const annuler = () => window.clearTimeout(intention.current);
  useEffect(() => annuler, []);

  const onPointerEnter = (index: number) => (event: PointerEvent<HTMLLIElement>) => {
    if (!bureau || event.pointerType !== 'mouse') return;
    annuler();
    intention.current = window.setTimeout(() => setOuvert(index), INTENTION_MS);
  };
  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLButtonElement>) => {
    const dernier = panneaux.length - 1;
    const suivant =
      event.key === 'ArrowRight' || event.key === 'ArrowDown'
        ? Math.min(index + 1, dernier)
        : event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? Math.max(index - 1, 0)
          : event.key === 'Home'
            ? 0
            : event.key === 'End'
              ? dernier
              : null;
    if (suivant === null) return;
    event.preventDefault();
    setOuvert(suivant);
    boutons.current[suivant]?.focus();
  };

  // Le titre en trois verbes ; celui du panneau ouvert est surligné. Autre découpe : le titre tel quel.
  const verbes = section.title.split(', ');
  const surligne = VERBES.indexOf(panneaux[ouvert]?.id ?? '');
  const titre =
    verbes.length === VERBES.length
      ? verbes.map((verbe, i) => (
          <span key={VERBES[i]}>
            <span className={cn('ac-images-verbe', i === surligne && 'is-surligne')}>{verbe}</span>
            {i < verbes.length - 1 ? ', ' : ''}
          </span>
        ))
      : section.title;

  return (
    <section id="apprendre-cultiver-grandir" className="ac-images" aria-labelledby="ac-images-titre">
      <div className="container-page">
        <Entree className="ac-images-entete">
          <div>
            <p className="ac-surtitre ac-app">{t('accueil.images.surtitre')}</p>
            <h2 id="ac-images-titre" className="ac-h2">
              <span className="ac-ligne">
                <span>{titre}</span>
              </span>
            </h2>
          </div>
          <div className="ac-images-cote">
            <p className="ac-paragraphe ac-app" style={{ '--delai': '0.3s' } as CSSProperties}>
              {section.intro}
            </p>
            <div className="ac-images-liens ac-app" style={{ '--delai': '0.45s' } as CSSProperties}>
              <Link to="/galerie" className="ac-lien">
                <span>{section.link}</span>
                <ArrowRight aria-hidden="true" className="ac-fleche" />
              </Link>
              <p className="ac-images-compteur" aria-hidden="true">
                <b>{pad2(ouvert + 1)}</b> / {pad2(panneaux.length)}
              </p>
            </div>
          </div>
        </Entree>
        <Entree className="ac-images-corps">
          <ul className="ac-img" style={{ '--n': panneaux.length, '--k': ouvert } as CSSProperties}>
            {panneaux.map((panneau, index) => (
              <PanneauImage
                key={panneau.id}
                panneau={panneau}
                index={index}
                dernier={index === panneaux.length - 1}
                open={index === ouvert}
                after={index > ouvert}
                textId={`${baseId}-${panneau.id}`}
                buttonRef={(el) => {
                  boutons.current[index] = el;
                }}
                onOpen={() => {
                  annuler();
                  setOuvert(index);
                }}
                onFocusOpen={() => setOuvert(index)}
                onKeyDown={onKeyDown(index)}
                onPointerEnter={onPointerEnter(index)}
                onPointerLeave={annuler}
              />
            ))}
          </ul>
        </Entree>
      </div>
    </section>
  );
}
