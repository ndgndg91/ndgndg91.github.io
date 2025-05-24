import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogType?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOData> = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  ogImage = '/favicon.ico'
}) => {
  const location = useLocation();
  const currentUrl = `https://developer-playground.com${location.pathname}`;

  useEffect(() => {
    // 페이지 제목 설정
    document.title = title;

    // 기존 메타 태그 제거
    const existingMeta = document.querySelectorAll('meta[data-seo]');
    existingMeta.forEach(meta => meta.remove());

    // 새로운 메타 태그 추가
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { property: 'og:type', content: ogType },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: canonical || currentUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: 'Developer Playground | Giri\'s Place' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'ndgndg91' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
    ].filter(tag => tag.content); // 빈 컨텐츠 제거

    metaTags.forEach(({ name, property, content }) => {
      const meta = document.createElement('meta');
      if (name) meta.setAttribute('name', name);
      if (property) meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      meta.setAttribute('data-seo', 'true');
      document.head.appendChild(meta);
    });

    // Canonical URL 설정
    let canonicalLink = document.querySelector('link[rel=\"canonical\"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || currentUrl;

    // 구조화된 데이터 (JSON-LD) 추가
    const existingJsonLd = document.querySelector('script[type=\"application/ld+json\"][data-seo]');
    if (existingJsonLd) {
      existingJsonLd.remove();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": canonical || currentUrl,
      "isPartOf": {
        "@type": "WebSite",
        "name": "Developer Playground | Giri's Place",
        "url": "https://developer-playground.com"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-seo', 'true');
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

  }, [title, description, keywords, canonical, ogType, ogImage, currentUrl]);

  return null;
};

export default SEOHead;
