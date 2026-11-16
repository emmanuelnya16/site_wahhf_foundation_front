import { ElementType, ReactNode, ComponentPropsWithoutRef } from 'react';
import { cn } from '../../lib/utils';

type ContainerProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

/**
 * Le seul conteneur de page (contrat §5) : contenu de 72 rem au plus, gouttière clamp(1.25rem, 4vw, 3rem),
 * centré. Tout part du même bord gauche, sur toutes les pages. Une colonne plus étroite (texte, formulaire)
 * se pose à l'intérieur, alignée à gauche, jamais centrée.
 * La classe utilitaire `container-page` (index.css) porte ces règles ; ce composant l'applique.
 */
export default function Container<T extends ElementType = 'div'>({ as, className, children, ...rest }: ContainerProps<T>) {
  const Tag = (as ?? 'div') as ElementType;
  return (
    <Tag className={cn('container-page', className)} {...rest}>
      {children}
    </Tag>
  );
}
