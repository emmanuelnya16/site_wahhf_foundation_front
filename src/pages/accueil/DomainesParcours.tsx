import { useEffect, useRef, useState, type RefObject } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HeartPulse } from 'lucide-react';
import Photo, { type PhotoLike } from '../../components/wahhf/Photo';
import { drawFil } from '../../components/principles/principlesFil';
import { photoOrFallback } from '../../lib/photos';
import { useLocalize } from '../../lib/localize';
import { cn } from '../../lib/utils';
import { DOMAINS_DATA } from '../../services/api';

/** Le grand coin de chaque carte : le même enchaînement que les Cinq principes, jusqu'à la carte de fin */
const LEAVES = ['tr', 'bl', 'tl', 'br', 'tr', 'bl', 'tl'] as const;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * La photo de chaque domaine (brief du lot 11.3) et son cadrage dans la bande de 11 rem : les visages restent entiers.
 * Santé : aucune photo publiable (question 197), une icône au trait à la place.
 */
const PHOTOS: Record<string, { id: string; cadrage: string }> = {
  education: { id: 'A98', cadrage: '50% 4%' },
  entrepreneuriat: { id: 'B23', cadrage: '50% 0%' },
  environnement: { id: 'B40', cadrage: '50% 58%' },
  'droits-inclusion': { id: 'A31', cadrage: '50% 20%' },
  'mobilite-langues': { id: 'A53', cadrage: '50% 40%' },
};

/** 800 px de large au plus : la carte en fait 480 */
function jusqua800(photo: PhotoLike): PhotoLike {
  const limite = (srcSet: string) =>
    srcSet
      .split(', ')
      .filter((source) => Number(source.split(' ')[1]?.replace('w', '')) <= 800)
      .join(', ');
  return { ...photo, sources: { ...photo.sources, avif: limite(photo.sources.avif), webp: limite(photo.sources.webp) } };
}

const VISUELS = new Map(
  Object.entries(PHOTOS).flatMap(([slug, { id, cadrage }]) => {
    const photo = photoOrFallback(id);
    return photo ? [[slug, { photo: jusqua800(photo), cadrage }] as const] : [];
  })
);

/** Vrai quand la section approche (une hauteur et demie d'écran) : le fil se dessine, et le mouvement se charge */
export function useApproche(ref: RefObject<HTMLElement | null>) {
  const [proche, setProche] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || proche) return;
    if (typeof IntersectionObserver === 'undefined') {
      setProche(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        setProche(true);
        observer.disconnect();
      },
      { rootMargin: '150% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, proche]);
  return proche;
}

/**
 * 4. Les 6 domaines (lot 11.3) : la mise en page, les formes et les classes des « Cinq principes » (src/components/
 * principles, qui ne changent pas), avec une photo en haut de chaque carte. Le fil est le leur (principlesFil.ts).
 * - Textes des cartes : le titre, la phrase et le lien de chaque domaine (DOMAINS_DATA), rien de plus ; l'introduction
 *   est celle des « Six piliers » de l'accueil.
 * - Une liste ordonnée de 6 articles (h3), puis la carte de fin. Compteur, consigne, fil et point : décor.
 * - Sans mouvement (et avant l'arrivée de GSAP) : une colonne, fil entièrement tracé. Le fil attend que la section
 *   approche : le mesurer plus tôt forcerait la mise en page de toute la page au chargement.
 * Styles propres : src/styles/accueil.css (.ac-domaines).
 */
export default function DomainesParcours() {
  const { t, lang, localizedList } = useLocalize();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const proche = useApproche(sectionRef);
  const domaines = localizedList(DOMAINS_DATA, 'contenu.domaines', (d) => d.id);
  const total = domaines.length;

  // Le fil de la colonne, d'après les cartes réelles, à chaque changement de taille (le parcours épinglé dessine le sien)
  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!proche || !section || !track) return;
    const draw = () => {
      if (!section.classList.contains('is-pinned')) drawFil(track, 'column');
    };
    if (typeof ResizeObserver === 'undefined') {
      draw();
      return;
    }
    const observer = new ResizeObserver(draw);
    observer.observe(track);
    return () => observer.disconnect();
  }, [lang, proche]);

  return (
    <section ref={sectionRef} id="domaines" aria-labelledby="ac-domaines-titre" className="principles ac-domaines section-space bg-surface">
      <div className="principles-pin">
        <div className="container-page principles-head">
          <div className="ac-domaines-tete">
            <p className="ac-surtitre">{t('accueil.domaines.surtitre')}</p>
            <h2 key={`t-${lang}`} id="ac-domaines-titre" className="principles-title ac-h2">
              {t('accueil.domaines.titre')}
            </h2>
            <p key={`i-${lang}`} className="principles-intro ac-paragraphe">
              {t('home.domains.subtitle')}
            </p>
          </div>
          <p className="principles-counter" aria-hidden="true">
            <span>{t('accueil.domaines.compteur')}</span>
            <span className="principles-counter-mask">
              <span className="principles-counter-roll">
                {domaines.map((d, i) => (
                  <span key={d.id}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>
            <span>/ {pad(total)}</span>
          </p>
        </div>

        <div className="principles-viewport container-page mt-10 lg:mt-14">
          <div ref={trackRef} className="principles-track">
            <svg className="principles-fil" aria-hidden="true" focusable="false">
              <path className="principles-fil-path" />
              <g className="principles-nodes" />
              <g className="principles-dot">
                <circle r="7" />
              </g>
            </svg>

            <ol className="principles-list">
              {domaines.map((d, i) => {
                const n = pad(i + 1);
                const visuel = VISUELS.get(d.slug);
                return (
                  <li key={d.id} className="principles-item" data-side={i % 2 ? 'end' : 'start'}>
                    <article
                      aria-labelledby={`domaine-${n}`}
                      className={cn('principle-card principle-notch', i < 5 ? `principle-card-${i + 1}` : 'ac-domaine-6', `principle-leaf-${LEAVES[i]}`)}
                    >
                      <div className="ac-domaine-photo">
                        {visuel ? (
                          <div className="ac-domaine-media">
                            <Photo photo={visuel.photo} sizes="30rem" fit="cover" radius="none" style={{ objectPosition: visuel.cadrage }} />
                          </div>
                        ) : (
                          <HeartPulse className="ac-domaine-icone" strokeWidth={1.25} aria-hidden="true" />
                        )}
                      </div>
                      <p className="principle-number" aria-hidden="true">
                        {n}
                      </p>
                      <p className="principle-rubric">{t('accueil.domaines.rubrique', { n })}</p>
                      <h3 key={`t-${lang}`} id={`domaine-${n}`} className="principle-title">
                        {d.title}
                      </h3>
                      <p key={`d-${lang}`} className="principle-desc">
                        {d.shortDesc}
                      </p>
                      <p className="principle-label">
                        <Link to={d.link} className="ac-domaine-lien" aria-label={t('accueil.domaines.lienDe', { titre: d.title })}>
                          <span>{t('accueil.domaines.lien')}</span>
                          <ArrowRight aria-hidden="true" focusable="false" className="ac-fleche" />
                        </Link>
                      </p>
                    </article>
                  </li>
                );
              })}
            </ol>

            {/* Carte de fin : hors de la liste (ce n'est pas un domaine) */}
            <div className="principles-item" data-side={total % 2 ? 'end' : 'start'}>
              <article aria-labelledby="domaines-fin" className={cn('principle-card principle-card-final principle-notch', `principle-leaf-${LEAVES[total]}`)}>
                <p className="principle-rubric">{t('accueil.domaines.fin.rubrique')}</p>
                <h3 id="domaines-fin" className="principle-title">
                  {t('accueil.domaines.fin.titre')}
                </h3>
                <Link to="/nos-actions" className="principle-action">
                  <span>{t('accueil.domaines.fin.lien')}</span>
                  <ArrowRight aria-hidden="true" focusable="false" className="ac-fleche" />
                </Link>
              </article>
            </div>
          </div>
        </div>

        <p className="principles-hint container-page text-meta text-text-secondary" aria-hidden="true">
          {t('accueil.domaines.consigne')}
        </p>
      </div>
    </section>
  );
}
