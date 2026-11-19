import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

/** Un principe, tel que les fichiers de langue le décrivent (principles.items) */
interface Principle {
  title: string;
  desc: string;
  label: string;
}

/** Le grand coin de chaque carte, comme une feuille qui pousse : haut droit, bas gauche, haut gauche, bas droit, haut droit, puis bas gauche (carte finale). */
const LEAVES = ['tr', 'bl', 'tl', 'br', 'tr', 'bl'] as const;
const pad = (n: number) => String(n).padStart(2, '0');

/**
 * « Cinq principes qui guident chaque projet » (Qui sommes-nous, lot 7.8 ; contrat §8 et §9, exception de forme
 * réservée à cette section).
 * - Balisage : une liste ordonnée de 5 articles (h3), dans l'ordre de lecture ; puis une 6e carte, hors de la liste,
 *   qui mène à Nos actions (le seul élément focalisable de la section).
 * - Cartes en aplats pleins, identiques en clair et en sombre (tokens --principle-* de src/index.css) : grand numéro
 *   (décoratif, la rubrique le dit), rubrique « Principe 01 », titre, description d'environ 36 caractères par ligne,
 *   filet, étiquette. Coin feuille (un seul grand coin, qui change à chaque carte) et encoche, l'entrée du fil.
 * - Tous les textes viennent des fichiers de langue (principles.*), en français et en anglais.
 * - Sans mouvement, la section est une colonne de cartes (en alternance à gauche et à droite sur tablette).
 */
export default function PrinciplesSection() {
  const { t } = useTranslation();
  const items = t('principles.items', { returnObjects: true }) as Principle[];
  const count = items.length;

  return (
    <section id="approche" aria-labelledby="principes-titre" className="principles section-space bg-surface">
      <div className="principles-pin">
        <div className="container-page principles-stage">
          <header className="principles-head max-w-3xl space-y-4">
            <h2 id="principes-titre" className="text-section-title text-text">
              {t('principles.title')}
            </h2>
            <p className="text-body text-text-secondary max-w-[65ch]">{t('principles.intro')}</p>
          </header>

          <div className="principles-viewport mt-10 lg:mt-14">
            <div className="principles-track">
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
                        <h3 id={`principe-${n}`} className="principle-title">
                          {item.title}
                        </h3>
                        <p className="principle-desc">{item.desc}</p>
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
        </div>
      </div>
    </section>
  );
}
