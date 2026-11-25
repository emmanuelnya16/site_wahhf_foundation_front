import type { CSSProperties } from 'react';

/** Les chiffres qui passent dans un rouleau avant de s'arrêter sur le bon : un tour complet, puis jusqu'à `chiffre` */
const bande = (chiffre: number) => Array.from({ length: 10 + chiffre + 1 }, (_, i) => i % 10);

/**
 * Compteur mécanique (décor) : chaque chiffre est un rouleau qui défile dans un masque, puis s'arrête. Sans animation,
 * le rouleau est posé sur le bon chiffre : c'est l'état par défaut, l'entrée le fait partir de zéro (accueil.css).
 * Le vrai chiffre est dans le texte, à côté (Chiffres.tsx). La bande est un contenu CSS : elle ne se lit, ne se copie et
 * ne se trouve pas par une recherche dans la page ; le caractère invisible donne sa largeur au rouleau.
 */
export default function Compteur({ texte }: { texte: string }) {
  let rang = 0;
  return (
    <span className="ac-compteur" aria-hidden="true">
      {Array.from(texte).map((c, i) => {
        if (!/\d/.test(c)) return <span key={i}>{c}</span>;
        const chiffres = bande(Number(c));
        return (
          <span key={i} className="ac-rouleau" style={{ '--pas': chiffres.length - 1, '--rouleau': rang++ } as CSSProperties}>
            <span className="ac-rouleau-largeur">{c}</span>
            <span className="ac-rouleau-bande" data-chiffres={chiffres.join('\n')} />
          </span>
        );
      })}
    </span>
  );
}
