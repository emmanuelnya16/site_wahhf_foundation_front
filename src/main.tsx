import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './i18n';

// Safari iOS n'applique :active au toucher que si un écouteur touchstart existe : sans lui, l'état
// d'appui des boutons (contrat §8, visible au toucher) n'apparaîtrait pas. Écouteur passif, sans effet.
document.addEventListener('touchstart', () => {}, { passive: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
