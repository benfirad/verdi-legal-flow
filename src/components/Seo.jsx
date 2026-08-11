import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BRAND, IS_LIVE, SITE_URL } from '@/lib/brand';

const ROUTE_META = {
  '/': {
    tr: ['VERDİ HUKUK | Stratejik Hukuk Danışmanlığı Konsepti', 'Ticaret, şirketler, uyuşmazlık çözümü, iş ve gayrimenkul hukuku odağında tasarlanan VERDİ HUKUK marka konsepti.'],
    en: ['VERDİ LAW | Strategic Legal Counsel Concept', 'VERDİ LAW is a brand concept focused on corporate, commercial, dispute resolution, employment and real estate law.'],
  },
  '/hakkimizda': {
    tr: ['Hakkımızda | VERDİ HUKUK', 'VERDİ HUKUK yaklaşımı, değerleri ve stratejik hukuk danışmanlığı vizyonu.'],
    en: ['About | VERDİ LAW', 'The approach, values and strategic legal counsel vision behind the VERDİ LAW concept.'],
  },
  '/calisma-alanlari': {
    tr: ['Çalışma Alanları | VERDİ HUKUK', 'Şirketler, ticaret, birleşme ve devralmalar, uyuşmazlık çözümü, iş, gayrimenkul ve veri koruma hukuku.'],
    en: ['Practice Areas | VERDİ LAW', 'Corporate, commercial, M&A, dispute resolution, employment, real estate and data protection law.'],
  },
  '/ekibimiz': {
    tr: ['Ekibimiz | VERDİ HUKUK', 'Farklı sektörlerde deneyimli avukat ve hukuk danışmanlarından oluşan temsili VERDİ HUKUK ekibi.'],
    en: ['Our Team | VERDİ LAW', 'The illustrative VERDİ LAW team of lawyers and legal advisers experienced across industries.'],
  },
  '/makaleler': {
    tr: ['Hukuki İçgörüler | VERDİ HUKUK', 'İş dünyasını etkileyen güncel hukuki gelişmeler ve uygulamaya dönük değerlendirmeler.'],
    en: ['Legal Insights | VERDİ LAW', 'Practical analysis of current legal developments affecting businesses.'],
  },
  '/yayinlar': {
    tr: ['Hukuki İçgörüler | VERDİ HUKUK', 'İş dünyasını etkileyen güncel hukuki gelişmeler ve uygulamaya dönük değerlendirmeler.'],
    en: ['Legal Insights | VERDİ LAW', 'Practical analysis of current legal developments affecting businesses.'],
  },
  '/surec': {
    tr: ['Çalışma Sürecimiz | VERDİ HUKUK', 'İlk değerlendirmeden sonuç ve takibe uzanan şeffaf hukuk danışmanlığı süreci.'],
    en: ['How We Work | VERDİ LAW', 'A transparent legal advisory process from initial assessment to delivery and follow-up.'],
  },
  '/kariyer': {
    tr: ['Kariyer | VERDİ HUKUK', 'VERDİ HUKUK konsept ekibinde kariyer ve staj olanakları.'],
    en: ['Careers | VERDİ LAW', 'Career and internship opportunities within the VERDİ LAW concept team.'],
  },
  '/iletisim': {
    tr: ['İletişim | VERDİ HUKUK', 'VERDİ HUKUK konsepti hakkında bilgi almak için iletişim formunu kullanın.'],
    en: ['Contact | VERDİ LAW', 'Use the contact form to learn more about the VERDİ LAW concept.'],
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
    const socialImageUrl = new URL('/verdi-og-ai.png', SITE_URL || window.location.origin).toString();

    document.documentElement.lang = language === 'tr' ? 'tr' : 'en';
    document.title = title;
    upsertMeta('meta[name="description"]', { name: 'description', content: description });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: IS_LIVE ? 'index, follow, max-image-preview:large' : 'noindex, nofollow' });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: language === 'tr' ? 'tr_TR' : 'en_GB' });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: socialImageUrl });
    upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
    upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
    upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: `${BRAND.name} — ${BRAND.conceptLabel[language]}` });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: socialImageUrl });

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

    let structuredData = document.getElementById('verdi-structured-data');
    if (!structuredData) {
      structuredData = document.createElement('script');
      structuredData.id = 'verdi-structured-data';
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
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      ...(BRAND.concept ? { creativeWorkStatus: 'Concept' } : {}),
    });
  }, [language, location.pathname]);

  return null;
}
