// Généré par scripts/optimize-photos.mjs depuis scripts/team-portraits.json (npm run photos). Ne pas modifier à la main.
// Portraits de l'équipe recadrés en 4:5 autour du visage : public/photos/equipe/<slug>-<largeur>.avif | .webp | .jpg.
import type { PhotoSources } from './photos';

export interface TeamPortrait {
  slug: string;
  /** Dimensions du cadre 4:5, avant réduction */
  width: number;
  height: number;
  /** Largeur de la photo d'origine (pour savoir quand demander un portrait plus grand) */
  sourceWidth: number;
  dominantColor: string;
  sources: PhotoSources;
}

const set = (slug: string, widths: number[], format: string) =>
  widths.map((w) => `/photos/equipe/${slug}-${w}.${format} ${w}w`).join(', ');

function portrait(slug: string, width: number, height: number, sourceWidth: number, dominantColor: string, widths: number[], jpegWidth: number): TeamPortrait {
  return {
    slug, width, height, sourceWidth, dominantColor,
    sources: { avif: set(slug, widths, 'avif'), webp: set(slug, widths, 'webp'), jpeg: `/photos/equipe/${slug}-${jpegWidth}.jpg`, widths },
  };
}

export const TEAM_PORTRAITS: Record<string, TeamPortrait> = {
  'marrion-watio-notesse': portrait('marrion-watio-notesse', 715, 893, 931, '#b8b8b8', [320, 480, 640], 480),
  'christian-wilberg': portrait('christian-wilberg', 426, 532, 534, '#584828', [320, 426], 426),
  'personne-niveau-3': portrait('personne-niveau-3', 480, 600, 480, '#e8e8e8', [320, 480], 480),
  'wilfried': portrait('wilfried', 991, 1238, 1270, '#283868', [320, 480, 640], 480),
};
