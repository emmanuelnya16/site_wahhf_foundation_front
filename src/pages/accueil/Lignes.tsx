import type { CSSProperties } from 'react';
import { richText } from '../../lib/richText';

/**
 * Titre sur des lignes voulues : chaque ligne monte sous son masque (src/styles/accueil.css). <accent> souligne un mot
 * d'un trait soleil. L'espace final sépare les lignes pour les lecteurs d'écran. Clé par rang : au changement de langue,
 * le texte change sur place, sans rejouer l'entrée.
 */
export default function Lignes({ lignes }: { lignes: string[] }) {
  return (
    <>
      {lignes.map((ligne, i) => (
        <span key={i} className="ac-ligne" style={{ '--rang': i } as CSSProperties}>
          <span>{richText(ligne, { accent: (mot) => <span className="ac-accent">{mot}</span> })} </span>
        </span>
      ))}
    </>
  );
}
