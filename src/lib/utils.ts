import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge doit connaître les tokens du contrat (src/index.css), sinon il prend « text-body »
 * pour une couleur et le supprime à côté de « text-on-action ».
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'page-title', 'section-title', 'body', 'meta'],
      radius: ['inner', 'card', 'pill'],
      shadow: ['overlay'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
