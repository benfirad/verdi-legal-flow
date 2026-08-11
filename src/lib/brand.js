export const BRAND = {
  name: 'VERDİ HUKUK',
  shortName: 'VERDİ',
  legalName: 'Verdi Hukuk Bürosu',
  englishName: 'Verdi Law Office',
  email: 'iletisim@verdi-hukuk.example',
  phone: '+90 212 000 00 00',
  address: 'İstanbul, Türkiye',
  concept: true,
  conceptLabel: {
    tr: 'Bağımsız marka konsepti',
    en: 'Independent brand concept',
  },
  conceptNotice: {
    tr: 'VERDİ HUKUK, marka ve dijital deneyim sunumu amacıyla hazırlanmış bağımsız bir konsept çalışmadır. Sayfadaki kişi ve iletişim bilgileri temsilidir; hukuki hizmet teklifi niteliği taşımaz.',
    en: 'VERDİ HUKUK is an independent brand and digital experience concept. People and contact details shown are illustrative and do not constitute an offer of legal services.',
  },
};

export const SITE_URL = import.meta.env.VITE_SITE_URL || '';
export const IS_LIVE = import.meta.env.VITE_SITE_STATUS === 'live';
