import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // Développement : Vite prépare les dépendances (node_modules/.vite). S'il en découvre une nouvelle en cours de route
    // (une page chargée à la demande), il refait ce cache, et le navigateur, qui garde des modules liés à l'ancien,
    // reçoit des 504 « Outdated Optimize Dep » : React ne démarre plus, l'écran reste sur l'image de index.html.
    // Toutes les sources sont donc lues au démarrage (entries), et les dépendances des sections épinglées sont nommées
    // (include) : le cache est fait une fois, au lancement de `npm run dev`.
    optimizeDeps: {
      entries: ['index.html', 'src/**/*.{ts,tsx}'],
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-router-dom',
        'i18next',
        'react-i18next',
        'framer-motion',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        'lenis',
        'gsap',
        'gsap/ScrollTrigger',
        '@gsap/react',
        'gsap/DrawSVGPlugin',
        'gsap/MotionPathPlugin',
        'gsap/SplitText',
      ],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
