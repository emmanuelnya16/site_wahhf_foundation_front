import { DomainItem } from '../../services/api';
import { TextListItem } from './TextList';

interface DomainCardProps {
  domain: DomainItem;
}

/**
 * Domaine d'action en ligne de liste typographique (contrat §7 section 4 et §8) : le titre porte le lien,
 * la phrase suit, un filet sépare les domaines. Ni carte, ni numéro, ni étiquette « DOMAINE / 01 / 06 »,
 * ni « Découvrir ce domaine » (la ligne n'est pas une carte : le lien est sur le titre). Pas de photo dans la liste :
 * trois des six images sont générées (T-04) ; l'imagerie des domaines revient à l'étape de l'accueil.
 * Le nom du composant est gardé pour ses appels (accueil, /nos-actions) ; à poser dans un <TextList>.
 */
export default function DomainCard({ domain }: DomainCardProps) {
  return (
    <TextListItem title={domain.title} to={domain.link}>
      <p>{domain.shortDesc}</p>
    </TextListItem>
  );
}
