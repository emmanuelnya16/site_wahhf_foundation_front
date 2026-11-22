import { Fragment, type ReactNode } from 'react';

/**
 * Texte traduit avec quelques mots balisés (« écrivez à <mail>{{email}}</mail> », « <b>non membre</b> ») rendu en
 * éléments React. Lot 7.10 : remplace le composant Trans de react-i18next dans les composants du premier affichage
 * (accueil), où il ajoutait environ 3,5 Ko gzip au JS initial. Balises simples, non imbriquées ; une balise inconnue
 * garde son texte sans balise.
 */
export function richText(text: string, tags: Record<string, (children: string) => ReactNode>): ReactNode {
  const out: ReactNode[] = [];
  const re = /<(\w+)>([\s\S]*?)<\/\1>/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const render = tags[match[1]];
    out.push(<Fragment key={match.index}>{render ? render(match[2]) : match[2]}</Fragment>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
