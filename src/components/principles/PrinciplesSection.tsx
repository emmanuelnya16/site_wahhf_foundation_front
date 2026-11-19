import { lazy, RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useMediaQuery } from '../../lib/useMediaQuery';
import { AfterFirstDisplay } from '../../effects/DeferredMotion';
import { drawFil } from './principlesFil';
import i18n from '../../i18n';
import principlesFr from '../../locales/principles/fr.json';
import principlesEn from '../../locales/principles/en.json';

/*
 * Textes de la section, en français et en anglais, ajoutés à l'i18n du site quand la page se charge : ils ne pèsent
 * pas dans le JavaScript initial (lot 7.8, JS initial inchangé). Anglais : traduction proposée, à valider
 * (docs/contenus-a-fournir.md, question 151).
 */
i18n.addResourceBundle('fr', 'translation', { principles: principlesFr }, true, false);
i18n.addResourceBundle('en', 'translation', { principles: principlesEn }, true, false);

/** Le mouvement (GSAP, ScrollTrigger, DrawSVG, MotionPath, SplitText) : un fichier à part, chargé quand la section approche. */
const PrinciplesMotion = lazy(() => import('../../effects/motion/PrinciplesMotion'));

/** Un principe, tel que les fichiers de langue le décrivent (principles.items) */
interface Principle {
  title: string;
  desc: string;
  label: string;
}

/** Le grand coin de chaque carte, comme une feuille qui pousse : haut droit, bas gauche, haut gauche, bas droit, haut droit, puis bas gauche (carte finale). */
const LEAVES = ['tr', 'bl', 'tl', 'br', 'tr', 'bl'] as const;
const pad = (n: number) => String(n).padStart(2, '0');

/** Vrai dès que l'élément arrive à une demi-hauteur d'écran de la vue (IntersectionObserver, rootMargin 50 %). */
function useNear(ref: RefObject<HTMLElement | null>) {
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, near]);
  return near;
}

/**
 * « Cinq principes qui guident chaque projet » (Qui sommes-nous, lot 7.8 ; contrat §8, §9 et §10, exception de forme
 * réservée à cette section).
 * - Balisage : une liste ordonnée de 5 articles (h3), dans l'ordre de lecture ; le défilement horizontal de
 *   l'ordinateur n'est qu'un effet visuel. Puis une 6e carte, hors de la liste, qui mène à Nos actions : le seul élément
 *   focalisable de la section.
 * - Cartes en aplats pleins, identiques en clair et en sombre (tokens --principle-* de src/index.css) : grand numéro
 *   (décoratif, la rubrique le dit), rubrique « Principe 01 », titre, description d'environ 36 caractères par ligne,
 *   filet, étiquette. Coin feuille (un seul grand coin, qui change à chaque carte) et encoche, l'entrée du fil.
 * - Le fil (principlesFil.ts) relie les encoches ; ses nœuds sont visibles avant les cartes. Sans mouvement (et avant
 *   l'arrivée de GSAP) : une colonne, fil entièrement tracé. Compteur, consigne, fil, nœuds et point : aria-hidden.
 * - Mouvement (src/effects/motion/PrinciplesMotion.tsx, chargé quand la section approche, jamais en mouvement
 *   réduit) : parcours épinglé sur ordinateur, fil tracé au défilement et cartes par lots ailleurs.
 * - Tous les textes passent par l'i18n (clés principles.*, src/locales/principles/fr.json et en.json). Les éléments découpés en
 *   lignes portent la langue en clé : un changement de langue les remplace, puis le mouvement les redécoupe.
 */
export default function PrinciplesSection() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const items = t('principles.items', { returnObjects: true }) as Principle[];
  const count = items.length;
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const near = useNear(sectionRef);
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Le fil de la colonne, tracé d'après les cartes réelles, à chaque changement de taille (le parcours épinglé dessine le sien)
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const draw = () => {
      if (!section.classList.contains('is-pinned')) drawFil(track, 'column');
    };
    draw();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(draw);
    observer.observe(track);
    return () => observer.disconnect();
  }, [lang]);

  return (
    <section ref={sectionRef} id="approche" aria-labelledby="principes-titre" className="principles section-space bg-surface">
      <div className="principles-pin">
        <div className="container-page principles-head">
          <div className="max-w-3xl space-y-4">
            <h2 key={`t-${lang}`} id="principes-titre" className="principles-title text-section-title text-text">
              {t('principles.title')}
            </h2>
            <p key={`i-${lang}`} className="principles-intro text-body text-text-secondary max-w-[65ch]">
              {t('principles.intro')}
            </p>
          </div>
          {/* Compteur « Principe 01 / 05 » (parcours épinglé) : les chiffres roulent dans un masque */}
          <p className="principles-counter" aria-hidden="true">
            <span>{t('principles.counter')}</span>
            <span className="principles-counter-mask">
              <span className="principles-counter-roll">
                {items.map((_, i) => (
                  <span key={i}>{pad(i + 1)}</span>
                ))}
              </span>
            </span>
            <span>/ {pad(count)}</span>
          </p>
        </div>

        <div className="principles-viewport container-page mt-10 lg:mt-14">
          <div ref={trackRef} className="principles-track">
            {/* Le fil, ses nœuds (un par encoche) et le point : décoratifs */}
            <svg className="principles-fil" aria-hidden="true" focusable="false">
              <path className="principles-fil-path" />
              <g className="principles-nodes" />
              <g className="principles-dot">
                <circle r="7" />
              </g>
            </svg>

            <ol className="principles-list">
              {items.map((item, i) => {
                const n = pad(i + 1);
                return (
                  <li key={n} className="principles-item" data-side={i % 2 ? 'end' : 'start'}>
                    <article
                      aria-labelledby={`principe-${n}`}
                      className={cn('principle-card principle-notch', `principle-card-${i + 1}`, `principle-leaf-${LEAVES[i]}`)}
                    >
                      <p className="principle-number" aria-hidden="true">
                        {n}
                      </p>
                      <p className="principle-rubric">{t('principles.rubric', { n })}</p>
                      <h3 key={`t-${lang}`} id={`principe-${n}`} className="principle-title">
                        {item.title}
                      </h3>
                      <p key={`d-${lang}`} className="principle-desc">
                        {item.desc}
                      </p>
                      <p className="principle-label">{item.label}</p>
                    </article>
                  </li>
                );
              })}
            </ol>

            {/* 6e carte : hors de la liste (ce n'est pas un principe), la suite du parcours */}
            <div className="principles-item" data-side={count % 2 ? 'end' : 'start'}>
              <article aria-labelledby="principes-fin" className={cn('principle-card principle-card-final principle-notch', `principle-leaf-${LEAVES[count]}`)}>
                <p className="principle-rubric">{t('principles.final.rubric')}</p>
                <h3 id="principes-fin" className="principle-title">
                  {t('principles.final.title')}
                </h3>
                <Link to="/nos-actions" className="principle-action">
                  <span>{t('principles.final.cta')}</span>
                  <ArrowRight aria-hidden="true" focusable="false" className="h-5 w-5 shrink-0" />
                </Link>
              </article>
            </div>
          </div>
        </div>

        {/* Consigne (parcours épinglé) */}
        <p className="principles-hint container-page text-meta text-text-secondary" aria-hidden="true">
          {t('principles.hint')}
        </p>
      </div>

      {near && !reduce && (
        <AfterFirstDisplay>
          <PrinciplesMotion scope={sectionRef} lang={lang} />
        </AfterFirstDisplay>
      )}
    </section>
  );
}
