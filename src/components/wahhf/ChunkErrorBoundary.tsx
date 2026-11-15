import { Component, ErrorInfo, ReactNode } from 'react';

interface ChunkErrorBoundaryProps {
  children: ReactNode;
  /** Variante d'affichage : page entière ou bloc (carte). */
  variant?: 'page' | 'block';
  /** Classes du bloc de repli (variante block), pour garder la hauteur réservée. */
  className?: string;
}

interface ChunkErrorBoundaryState {
  hasError: boolean;
}

/**
 * Filet de sécurité des parties chargées à la demande (pages, cartes) : si un fichier ne se
 * télécharge pas (connexion mobile instable), on affiche un message et un bouton « Réessayer »
 * au lieu d'une page blanche. Réessayer recharge la page (React.lazy garde l'échec en mémoire).
 */
export default class ChunkErrorBoundary extends Component<ChunkErrorBoundaryProps, ChunkErrorBoundaryState> {
  state: ChunkErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ChunkErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Chargement interrompu :', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;
    const { variant = 'block', className = '' } = this.props;
    const isPage = variant === 'page';
    return (
      <div
        role="alert"
        className={`flex flex-col items-center justify-center gap-4 text-center p-6 ${
          isPage ? 'min-h-[70vh] pt-32' : 'rounded-2xl border border-current/20'
        } ${className}`}
      >
        <p className={isPage ? 'font-serif text-2xl' : 'text-sm'}>
          {isPage
            ? 'Cette page n’a pas pu se charger. Vérifiez votre connexion.'
            : 'Le contenu n’a pas pu se charger.'}
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 rounded-full bg-[#0F3D2E] text-[#F5F1E8] text-sm font-semibold cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8A317]"
        >
          Réessayer
        </button>
      </div>
    );
  }
}
