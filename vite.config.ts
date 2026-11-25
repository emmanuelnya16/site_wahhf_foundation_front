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
    // Développement : ces plugins n'arrivent que dans des fichiers chargés à la demande (sections épinglées). Découverts en
    // cours de route, Vite refait son cache et répond 504 : la section restait sans animation. Préparés au démarrage.
    optimizeDeps: {
      include: ['gsap', 'gsap/ScrollTrigger', '@gsap/react', 'gsap/DrawSVGPlugin', 'gsap/MotionPathPlugin', 'gsap/SplitText'],
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
