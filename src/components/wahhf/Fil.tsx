import { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/utils';

/*
 * Le fil (contrat §6, signature) : un trait de 1,5 px couleur du fil (forêt en clair, feuille en sombre et sur nuit)
 * qui relie toujours un départ à une arrivée. Départ, arrivée et étape affichée sont des points pleins de 8 px ;
 * les autres étapes sont des cercles. Le dessin est décoratif (aria-hidden) : le sens est toujours écrit en texte,
 * et chaque libellé reste lisible (et cliquable s'il a un lien). Lot 7 (§10) : drawOnce le dessine une fois en CSS
 * (hero de l'accueil, fiches pays), jamais en mouvement réduit ; la frise A1 → C1 se dessine au défilement sur
 * ordinateur (src/effects/motion/FilScrub.tsx, qui lit les attributs data-fil-*).
 *
 *   <Fil start={{ id: 'cameroun', label: 'Cameroun' }} end={{ id: 'allemagne', label: 'Allemagne' }} />
 *   <Fil orientation="auto" steps={niveaux} end={{ id: 'europe', label: 'Europe' }} currentId="b1" />
 */
export interface FilPoint {
  id: string;
  label: ReactNode;
  /** Intitulé court sous le libellé (niveaux de la frise). */
  sublabel?: ReactNode;
  /** Lien interne porté par le libellé. */
  to?: string;
  onClick?: () => void;
}

interface FilProps {
  start?: FilPoint;
  steps?: FilPoint[];
  end: FilPoint;
  /** Étape affichée : point plein, libellé en 600, « niveau affiché » pour les lecteurs d'écran. */
  currentId?: string;
  currentLabel?: string;
  /** auto : vertical sous 1 024 px, horizontal au-delà. */
  orientation?: 'horizontal' | 'vertical' | 'auto';
  drawOnce?: boolean;
  /** Groupe 7.1 (pages de niveau, résultat du test) : le trait se dessine une fois, à l'arrivée, du départ jusqu'à
   *  ce point (id), segment après segment ; la suite reste tracée. CSS ; tout en place en mouvement réduit. */
  drawTo?: string;
  /** Le niveau affiché s'allume (point qui grandit, libellé qui s'éclaire) quand il le devient, après le tracé. */
  lightCurrent?: boolean;
  onInverse?: boolean;
  /** Posé sur une image ou une vidéo voilée de nuit (hero de l'accueil) : trait et points soleil, libellés brume
   *  (décision du 16/11 : le feuille du fil sur nuit ne resterait pas lisible sur la vidéo). */
  onMedia?: boolean;
  className?: string;
}

type Node = FilPoint & { filled: boolean; current: boolean };

/** Tracé jusqu'à un point : délai de chaque segment (horizontal : 0,3 s chacun, 1,5 s au plus jusqu'au C1). La frise
 *  verticale (téléphone) ne se dessine pas : les demi-traits gardent la classe, sans animation sous 1 024 px. */
const H_STEP = 0.3;
const V_STEP = 0.22;
const DRAW_START = 0.25;
const delay = (s: number) => ({ '--fil-d': `${s.toFixed(2)}s` }) as CSSProperties;

function Dot({ filled, onInverse }: { filled: boolean; onInverse: boolean }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" focusable="false" className="shrink-0">
      {filled ? (
        <circle cx="4" cy="4" r="4" className={onInverse ? 'fill-fil-on-inverse' : 'fill-fil'} />
      ) : (
        <circle cx="4" cy="4" r="3.25" fill="none" strokeWidth={1.5} className={onInverse ? 'stroke-fil-on-inverse' : 'stroke-fil'} />
      )}
    </svg>
  );
}

function Label({ node, onInverse, currentLabel }: { node: Node; onInverse: boolean; currentLabel: string }) {
  const tone = onInverse ? 'text-text-on-inverse' : 'text-text';
  const link = onInverse ? 'text-link-on-inverse' : 'text-link';
  const main = node.to ? (
    <Link
      to={node.to}
      onClick={node.onClick}
      className={cn('underline underline-offset-4 decoration-1 hover:decoration-2', link, node.current && 'font-semibold decoration-2')}
    >
      {node.label}
      {node.current && <span className="sr-only"> ({currentLabel})</span>}
    </Link>
  ) : (
    <span className={cn(tone, node.current && 'font-semibold')}>
      {node.label}
      {node.current && <span className="sr-only"> ({currentLabel})</span>}
    </span>
  );
  return (
    <>
      {main}
      {node.sublabel && (
        <span className={cn('text-text-secondary', onInverse && 'text-text-secondary-on-inverse', node.current && 'font-semibold')}>
          {node.sublabel}
        </span>
      )}
    </>
  );
}

type DrawProps = { drawIndex: number; lightCurrent: boolean };

function Horizontal({ nodes, onInverse, drawOnce, currentLabel, className, drawIndex, lightCurrent }: { nodes: Node[]; onInverse: boolean; drawOnce: boolean; currentLabel: string; className?: string } & DrawProps) {
  const litDelay = delay(DRAW_START + Math.max(0, drawIndex) * H_STEP);
  const line = onInverse ? 'bg-fil-on-inverse' : 'bg-fil';
  return (
    <ol data-fil="horizontal" className={cn('flex text-body', className)}>
      {nodes.map((n, i) => {
        const last = i === nodes.length - 1;
        return (
          <li key={n.id} className={cn('flex flex-col gap-2', !last && 'flex-1 min-w-0')}>
            <div className="flex items-center" aria-hidden="true">
              <span data-fil-dot="" className={cn('inline-flex', lightCurrent && n.current && 'fil-lit')} style={lightCurrent && n.current ? litDelay : undefined}>
                <Dot filled={n.filled} onInverse={onInverse} />
              </span>
              {!last && (
                <span
                  data-fil-seg=""
                  style={i < drawIndex ? delay(DRAW_START + i * H_STEP) : undefined}
                  className={cn(
                    i < drawIndex && 'fil-draw-to-x',
                    'h-[1.5px] flex-1 min-w-6',
                    line,
                    // Tracé unique : 1,2 s, power3.inOut ; délai --fil-draw-delay (0,2 s par défaut, plus long dans le hero)
                    drawOnce && 'origin-left motion-safe:animate-[fil-draw_1.2s_var(--ease-power3-inout)_var(--fil-draw-delay,0.2s)_both]',
                  )}
                />
              )}
            </div>
            <div
              data-fil-label=""
              className={cn('flex flex-col pr-3 text-balance', lightCurrent && n.current && 'fil-lit-label')}
              style={lightCurrent && n.current ? litDelay : undefined}
            >
              <Label node={n} onInverse={onInverse} currentLabel={currentLabel} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Vertical({ nodes, onInverse, currentLabel, className, drawIndex, lightCurrent }: { nodes: Node[]; onInverse: boolean; currentLabel: string; className?: string } & DrawProps) {
  // Traits en CSS (1,5 px) : un SVG sans hauteur explicite prendrait 150 px par défaut.
  // Tracé jusqu'au point drawIndex : demi-trait bas du point i (rang 2i), puis demi-trait haut du point i + 1 (2i + 1).
  const seg = (cls: string, rank?: number) => (
    <span
      className={cn('w-[1.5px]', onInverse ? 'bg-fil-on-inverse' : 'bg-fil', rank !== undefined && 'fil-draw-to-y', cls)}
      style={rank !== undefined ? delay(DRAW_START + rank * V_STEP) : undefined}
    />
  );
  const litDelay = delay(DRAW_START + Math.max(0, 2 * drawIndex) * V_STEP);
  return (
    <ol className={cn('flex flex-col text-body', className)}>
      {nodes.map((n, i) => {
        const first = i === 0;
        const last = i === nodes.length - 1;
        return (
          <li key={n.id} className="grid grid-cols-[8px_1fr] gap-x-3">
            {/* Trait continu : moitié haute (sauf le premier), point, moitié basse (sauf le dernier). 44 px de haut au moins. */}
            <div className="flex flex-col items-center" aria-hidden="true">
              {first ? <span className="h-[18px]" /> : seg('h-[18px]', i <= drawIndex ? 2 * i - 1 : undefined)}
              <span className={cn('inline-flex', lightCurrent && n.current && 'fil-lit')} style={lightCurrent && n.current ? litDelay : undefined}>
                <Dot filled={n.filled} onInverse={onInverse} />
              </span>
              {!last && seg('flex-1 min-h-[18px]', i < drawIndex ? 2 * i : undefined)}
            </div>
            <div
              className={cn('flex min-h-11 flex-wrap items-center gap-x-3 py-2', lightCurrent && n.current && 'fil-lit-label')}
              style={lightCurrent && n.current ? litDelay : undefined}
            >
              <Label node={n} onInverse={onInverse} currentLabel={currentLabel} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function Fil({
  start,
  steps = [],
  end,
  currentId,
  currentLabel = 'niveau affiché',
  orientation = 'horizontal',
  drawOnce = false,
  drawTo,
  lightCurrent = false,
  onInverse: onInverseProp = false,
  onMedia = false,
  className: classNameProp,
}: FilProps) {
  const onInverse = onInverseProp || onMedia;
  // Variante « média » : les utilitaires du fil sur nuit lisent --fil-on-inverse, remplacé ici par soleil.
  const className = cn(classNameProp, onMedia && '[--fil-on-inverse:var(--color-soleil)]');
  const nodes: Node[] = [
    ...(start ? [{ ...start, filled: true, current: false }] : []),
    ...steps.map((s) => ({ ...s, filled: s.id === currentId, current: s.id === currentId })),
    { ...end, filled: true, current: false },
  ];
  const draw: DrawProps = { drawIndex: drawTo ? nodes.findIndex((n) => n.id === drawTo) : -1, lightCurrent };
  if (orientation === 'vertical') return <Vertical nodes={nodes} onInverse={onInverse} currentLabel={currentLabel} className={className} {...draw} />;
  if (orientation === 'horizontal')
    return <Horizontal nodes={nodes} onInverse={onInverse} drawOnce={drawOnce} currentLabel={currentLabel} className={className} {...draw} />;
  return (
    <div className={className}>
      <Vertical nodes={nodes} onInverse={onInverse} currentLabel={currentLabel} className="lg:hidden" {...draw} />
      <Horizontal nodes={nodes} onInverse={onInverse} drawOnce={drawOnce} currentLabel={currentLabel} className="hidden lg:flex" {...draw} />
    </div>
  );
}
