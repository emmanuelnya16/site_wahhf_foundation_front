import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  /**
   * Adresse canonique (audit NIV-01) : chemin de la page de référence, par exemple « /academie/b1 ». Posée en
   * <link rel="canonical"> avec l'origine du site ; retirée sur les pages qui n'en donnent pas.
   */
  canonical?: string;
}

export default function SEO({ title, description, canonical }: SEOProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      link?.remove();
      return;
    }
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = new URL(canonical, window.location.origin).href;
  }, [canonical, pathname]);

  useEffect(() => {
    const fullTitle = `${title} | WAHHF Foundation`;
    document.title = fullTitle;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', fullTitle);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }
  }, [title, description, pathname]);

  return null;
}
