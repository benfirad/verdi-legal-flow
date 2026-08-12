import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BRAND, IS_LIVE, SITE_URL } from '@/lib/brand';

const ROUTE_META = {
  '/': {
    tr: ['DACH HUKUK | Stratejik Hukuk Danışmanlığı Konsepti', 'Ticaret, şirketler, uyuşmazlık çözümü, iş ve gayrimenkul hukuku odağında tasarlanan DACH HUKUK marka konsepti.'],
    en: ['DACH LAW | Strategic Legal Counsel Concept', 'DACH LAW is a brand concept focused on corporate, commercial, dispute resolution, employment and real estate law.'],
  },
  '/hakkimizda': {
    tr: ['Hakkımızda | DACH HUKUK', 'DACH HUKUK yaklaşımı, değerleri ve stratejik hukuk danışmanlığı vizyonu.'],
    en: ['About | DACH LAW', 'The approach, values and strategic legal counsel vision behind the DACH LAW concept.'],
  },
  '/calisma-alanlari': {
    tr: ['Çalışma Alanları | DACH HUKUK', 'Şirketler, ticaret, birleşme ve devralmalar, uyuşmazlık çözümü, iş, gayrimenkul ve veri koruma hukuku.'],
    en: ['Practice Areas | DACH LAW', 'Corporate, commercial, M&A, dispute resolution, employment, real estate and data protection law.'],
  },
  '/ekibimiz': {
    tr: ['Ekibimiz | DACH HUKUK', 'Farklı sektörlerde deneyimli avukat ve hukuk danışmanlarından oluşan temsili DACH HUKUK ekibi.'],
    en: ['Our Team | DACH LAW', 'The illustrative DACH LAW team of lawyers and legal advisers experienced across industries.'],
  },
  '/makaleler': {
    tr: ['Hukuki İçgörüler | DACH HUKUK', 'İş dünyasını etkileyen güncel hukuki gelişmeler ve uygulamaya dönük değerlendirmeler.'],
    en: ['Legal Insights | DACH LAW', 'Practical analysis of current legal developments affecting businesses.'],
  },
  '/yayinlar': {
    tr: ['Hukuki İçgörüler | DACH HUKUK', 'İş dünyasını etkileyen güncel hukuki gelişmeler ve uygulamaya dönük değerlendirmeler.'],
    en: ['Legal Insights | DACH LAW', 'Practical analysis of current legal developments affecting businesses.'],
  },
  '/surec': {
    tr: ['Çalışma Sürecimiz | DACH HUKUK', 'İlk değerlendirmeden sonuç ve takibe uzanan şeffaf hukuk danışmanlığı süreci.'],
    en: ['How We Work | DACH LAW', 'A transparent legal advisory process from initial assessment to delivery and follow-up.'],
  },
  '/kariyer': {
    tr: ['Kariyer | DACH HUKUK', 'DACH HUKUK konsept ekibinde kariyer ve staj olanakları.'],
    en: ['Careers | DACH LAW', 'Career and internship opportunities within the DACH LAW concept team.'],
  },
  '/iletisim': {
    tr: ['İletişim | DACH HUKUK', 'DACH HUKUK konsepti hakkında bilgi almak için iletişim formunu kullanın.'],
    en: ['Contact | DACH LAW', 'Use the contact form to learn more about the DACH LAW concept.'],
  },
};

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export default function Seo({ language }) {
  const location = useLocation();

  useEffect(() => {
    const meta = ROUTE_META[location.pathname] || ROUTE_META['/'];
    const [title, description] = meta[language] || meta.tr;
    const canonicalUrl = SITE_URL ? new URL(location.pathname, SITE_URL).toString() : '';
    const socialImageUrl = new URL('/dach-og-ai.png', SITE_URL || window.location.origin).toString();

    document.documentElement.lang = language === 'tr' ? 'tr' : 'en';
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="keywords"]', {
      name: 'keywords',
      content: language === 'tr'
        ? 'DACH Hukuk, hukuk bürosu konsepti, şirketler hukuku, ticaret hukuku, uyuşmazlık çözümü, İstanbul'
        : 'DACH Law, law firm concept, corporate law, commercial law, dispute resolution, Istanbul',
    });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: IS_LIVE ? 'index, follow, max-image-preview:large' : 'noindex, nofollow' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: BRAND.name });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: language === 'tr' ? 'tr_TR' : 'en_GB' });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: socialImageUrl });
    upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: `${BRAND.name} — ${BRAND.conceptLabel[language]}` });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: socialImageUrl });
    upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: `${BRAND.name} — ${BRAND.conceptLabel[language]}` });

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalUrl;
      upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    } else {
      canonical?.remove();
    }

    let structuredData = document.getElementById('dach-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'dach-structured-data';
      structuredData.type = 'application/ld+json';
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': BRAND.concept ? 'CreativeWork' : 'LegalService',
      name: BRAND.legalName,
      alternateName: BRAND.englishName,
      description,
      inLanguage: language === 'tr' ? 'tr-TR' : 'en',
      image: socialImageUrl,
      logo: new URL('/dach-mark.png', SITE_URL || window.location.origin).toString(),
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(BRAND.concept ? { creativeWorkStatus: 'Concept' } : {}),
    });
  }, [language, location.pathname]);

  return null;
}
