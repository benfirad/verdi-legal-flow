export const BRAND = {
  name: 'DACH HUKUK',
  shortName: 'DACH',
  legalName: 'DACH Hukuk Bürosu',
  englishName: 'DACH Law Office',
  email: 'iletisim@dach-hukuk.example',
  phone: '+90 212 000 00 00',
  address: 'İstanbul, Türkiye',
  concept: true,
  conceptLabel: {
    tr: 'Bağımsız marka konsepti',
    en: 'Independent brand concept',
  },
  conceptNotice: {
    tr: 'DACH HUKUK, marka ve dijital deneyim sunumu amacıyla hazırlanmış bağımsız bir konsept çalışmadır. Kişiler, yapay zekâ ile üretilen portreler ve iletişim bilgileri temsilidir; hukuki hizmet teklifi niteliği taşımaz.',
    en: 'DACH LAW is an independent brand and digital experience concept. People, AI-generated portraits and contact details are illustrative and do not constitute an offer of legal services.',
  },
};

export const SITE_URL = import.meta.env.VITE_SITE_URL || '';
export const IS_LIVE = import.meta.env.VITE_SITE_STATUS === 'live';
