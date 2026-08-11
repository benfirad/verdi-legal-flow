import React, { createContext, useContext, useEffect, useState } from 'react';

const LEGAL_AREAS = {
  tr: [
    ['Ticaret ve Şirketler Hukuku', 'Şirketlerin kuruluşundan günlük operasyonlarına ve kurumsal yönetim süreçlerine uzanan bütüncül danışmanlık.', 'briefcase'],
    ['Birleşme ve Devralmalar', 'Yerel ve sınır ötesi işlemlerde hukuki inceleme, sözleşme müzakeresi ve kapanış desteği.', 'handshake'],
    ['Uyuşmazlık Çözümü', 'Ticari uyuşmazlıklarda dava, tahkim ve alternatif çözüm yollarına yönelik stratejik temsil.', 'scale'],
    ['İş ve Sosyal Güvenlik Hukuku', 'İşverenler için sözleşme, yeniden yapılanma, uyum ve iş uyuşmazlıkları danışmanlığı.', 'users'],
    ['Gayrimenkul ve İnşaat', 'Proje geliştirme, kira, satın alma, imar ve inşaat sözleşmelerine ilişkin hukuki destek.', 'building'],
    ['Rekabet Hukuku', 'Birleşme kontrolü, rekabet uyumu, soruşturmalar ve dağıtım sistemleri konusunda danışmanlık.', 'gavel'],
    ['Bankacılık ve Finans', 'Finansman işlemleri, teminat yapıları ve düzenleyici konularda çözüm odaklı hukuki destek.', 'landmark'],
    ['Veri Koruma ve Teknoloji', 'KVKK, GDPR, dijital ürünler, veri ihlalleri ve teknoloji sözleşmeleri için uyum danışmanlığı.', 'shield'],
    ['Fikri Mülkiyet', 'Marka, tasarım, telif ve lisans haklarının korunması ve ticarileştirilmesi.', 'lightbulb'],
  ],
  en: [
    ['Corporate and Commercial', 'End-to-end counsel from incorporation and day-to-day operations to corporate governance.', 'briefcase'],
    ['Mergers and Acquisitions', 'Legal due diligence, transaction documents, negotiations and closing support for local and cross-border deals.', 'handshake'],
    ['Dispute Resolution', 'Strategic representation in litigation, arbitration and alternative dispute resolution.', 'scale'],
    ['Employment and Benefits', 'Contracts, restructuring, compliance and employment disputes advice for employers.', 'users'],
    ['Real Estate and Construction', 'Legal support for development, leasing, acquisitions, zoning and construction contracts.', 'building'],
    ['Competition Law', 'Merger control, compliance, investigations and distribution system advice.', 'gavel'],
    ['Banking and Finance', 'Solution-oriented support for financing transactions, security structures and regulatory matters.', 'landmark'],
    ['Data Protection and Technology', 'Compliance advice on data protection, digital products, breaches and technology agreements.', 'shield'],
    ['Intellectual Property', 'Protection and commercialisation of trademarks, designs, copyright and licensing rights.', 'lightbulb'],
  ],
};

const createAreas = (language) => LEGAL_AREAS[language].map(([title, description, icon], index) => ({
  id: index + 1,
  title,
  description,
  icon,
}));

const TRANSLATIONS = {
  tr: {
    nav: {
      home: 'Ana Sayfa', about: 'Hakkımızda', practiceAreas: 'Çalışma Alanları', team: 'Ekibimiz',
      publications: 'İçgörüler', process: 'Yaklaşımımız', references: 'Referanslar', contact: 'İletişim',
    },
    hero: {
      tagline: 'İstanbul • Türkiye', title: 'VERDİ HUKUK', subtitle: 'Netlik. Strateji. Güven.',
      description: 'İş dünyasının hukuki ihtiyaçlarına ticari bakış, disiplinler arası uzmanlık ve açık iletişimle yaklaşan bağımsız hukuk markası konsepti.',
      cta: 'Bize Ulaşın', ctaSecondary: 'Çalışma Alanları', scroll: 'Keşfetmek için kaydırın',
      badge: 'Bağımsız Marka Konsepti', slogan: '— Hukuki karmaşıklığı uygulanabilir stratejiye dönüştürür.',
    },
    about: {
      title: 'Hakkımızda', subtitle: 'Stratejik hukuk danışmanlığı',
      description: 'VERDİ HUKUK, şirketlerin yalnızca bugünkü sorunlarına değil, yarının kararlarına da hazırlıklı olmasını hedefleyen bir hukuk bürosu konseptidir. Hukuki doğruluk ile ticari gerçekliği aynı masada buluşturur.',
      description2: 'Her dosyada açık iletişim, ölçülü risk yönetimi ve uygulanabilir çözümler üretmeyi esas alır.',
      experience: 'Yıllık Birikim', clients: 'Kurumsal Müvekkil', cases: 'Çözümlenen Dosya', countries: 'Sınır Ötesi Ağ',
      values: [
        { title: 'Netlik', desc: 'Karmaşık hukuki konuları karar vericiler için anlaşılır ve uygulanabilir hale getiririz.' },
        { title: 'Strateji', desc: 'Her öneriyi müvekkilin ticari hedefleri, sektörü ve risk iştahıyla birlikte değerlendiririz.' },
        { title: 'Güven', desc: 'İlişkilerimizi şeffaf iletişim, özen ve uzun vadeli sorumluluk üzerine kurarız.' },
      ],
    },
    process: {
      title: 'Çalışma Sürecimiz', subtitle: 'Nasıl çalışıyoruz?',
      description: 'Her işi kapsamı, sorumluluğu ve sonraki adımları baştan görünür kılan şeffaf bir süreçle yönetiriz.',
      steps: [
        { number: '01', title: 'İlk Değerlendirme', desc: 'İhtiyacı, ticari hedefi ve kritik zaman çizelgesini birlikte netleştiririz.', duration: 'Başlangıç' },
        { number: '02', title: 'Kapsam ve Strateji', desc: 'Hukuki kapsamı, riskleri, alternatifleri ve çalışma planını ortaya koyarız.', duration: 'Planlama' },
        { number: '03', title: 'Uygulama', desc: 'Belge, müzakere, dava veya uyum çalışmalarını sorumlu ekiple yürütürüz.', duration: 'Yürütme' },
        { number: '04', title: 'Raporlama', desc: 'Gelişmeleri yalın, düzenli ve karar almaya elverişli biçimde paylaşırız.', duration: 'İletişim' },
        { number: '05', title: 'Sonuç ve Takip', desc: 'Çıktıları teslim eder, sonraki riskleri ve aksiyonları birlikte değerlendiririz.', duration: 'Kapanış' },
      ],
    },
    practiceAreas: { title: 'Çalışma Alanları', subtitle: 'Bütüncül hukuki destek', learnMore: 'Detaylı Bilgi', areas: createAreas('tr') },
    team: { title: 'Ekibimiz', subtitle: 'Deneyim ve bakış açısı', description: 'Farklı disiplinlerde çalışan avukat ve danışmanların ortak strateji etrafında buluştuğu temsili ekip.', viewProfile: 'Tüm Ekibi Görüntüle' },
    publications: { title: 'İçgörüler', subtitle: 'Güncel hukuki değerlendirmeler', description: 'İş dünyasını etkileyen düzenlemeler ve uyuşmazlık trendleri hakkında uygulamaya dönük değerlendirmeler.', readMore: 'Devamını Oku', viewAll: 'Tüm Yazıları Gör' },
    contact: {
      title: 'İletişim', subtitle: 'Konunuzu birlikte değerlendirelim',
      description: 'Kısa bir ön bilgi bırakın; uygun çalışma alanındaki ekibimiz temsilî iletişim akışı kapsamında size dönüş yapsın.',
      form: { name: 'Adınız Soyadınız', email: 'E-posta Adresiniz', phone: 'Telefon Numaranız', subject: 'Hukuki Konu', message: 'Kısa Açıklama', submit: 'Mesaj Gönder', selectSubject: 'Konu seçiniz', subjects: ['Ticaret ve Şirketler', 'Birleşme ve Devralmalar', 'Uyuşmazlık Çözümü', 'İş Hukuku', 'Gayrimenkul', 'Veri Koruma', 'Diğer'] },
      info: { address: 'Konum', addressValue: 'İstanbul, Türkiye', phone: 'Telefon', phoneValue: '+90 212 000 00 00', email: 'E-posta', emailValue: 'iletisim@verdi-hukuk.example' },
    },
    footer: { description: 'VERDİ HUKUK, stratejik hukuk danışmanlığı için hazırlanmış bağımsız bir marka konseptidir.', quickLinks: 'Hızlı Bağlantılar', practiceAreas: 'Çalışma Alanları', contact: 'İletişim', rights: 'Tüm hakları saklıdır.', privacy: 'Gizlilik Politikası', terms: 'Kullanım Koşulları' },
  },
  en: {
    nav: {
      home: 'Home', about: 'About', practiceAreas: 'Practice Areas', team: 'Our Team',
      publications: 'Insights', process: 'Our Approach', references: 'References', contact: 'Contact',
    },
    hero: {
      tagline: 'Istanbul • Türkiye', title: 'VERDİ LAW', subtitle: 'Clarity. Strategy. Trust.',
      description: 'An independent legal brand concept combining commercial insight, multidisciplinary expertise and clear communication.',
      cta: 'Contact Us', ctaSecondary: 'Practice Areas', scroll: 'Scroll to explore',
      badge: 'Independent Brand Concept', slogan: '— Turning legal complexity into practical strategy.',
    },
    about: {
      title: 'About', subtitle: 'Strategic legal counsel',
      description: 'VERDİ LAW is a law firm concept designed to prepare businesses not only for today’s issues, but also for tomorrow’s decisions. It brings legal precision and commercial reality to the same table.',
      description2: 'We prioritise clear communication, measured risk management and practical solutions in every matter.',
      experience: 'Years of Insight', clients: 'Corporate Clients', cases: 'Matters Resolved', countries: 'Cross-border Network',
      values: [
        { title: 'Clarity', desc: 'We make complex legal issues understandable and actionable for decision makers.' },
        { title: 'Strategy', desc: 'We assess every recommendation against the client’s commercial goals, sector and risk appetite.' },
        { title: 'Trust', desc: 'We build relationships on transparent communication, care and long-term responsibility.' },
      ],
    },
    process: {
      title: 'How We Work', subtitle: 'Our process',
      description: 'We manage every matter through a transparent process that makes scope, ownership and next steps visible from day one.',
      steps: [
        { number: '01', title: 'Initial Assessment', desc: 'We clarify the need, commercial objective and critical timeline together.', duration: 'Start' },
        { number: '02', title: 'Scope and Strategy', desc: 'We define legal scope, risks, alternatives and the work plan.', duration: 'Planning' },
        { number: '03', title: 'Execution', desc: 'The responsible team manages documentation, negotiation, disputes or compliance work.', duration: 'Delivery' },
        { number: '04', title: 'Reporting', desc: 'We communicate developments in a clear, regular and decision-ready format.', duration: 'Communication' },
        { number: '05', title: 'Outcome and Follow-up', desc: 'We deliver the outputs and review next risks and actions together.', duration: 'Close' },
      ],
    },
    practiceAreas: { title: 'Practice Areas', subtitle: 'Integrated legal support', learnMore: 'Learn More', areas: createAreas('en') },
    team: { title: 'Our Team', subtitle: 'Experience and perspective', description: 'An illustrative team of lawyers and advisers across disciplines, aligned around one strategy.', viewProfile: 'View the Team' },
    publications: { title: 'Insights', subtitle: 'Current legal perspectives', description: 'Practical analysis of regulations and dispute trends affecting business.', readMore: 'Read More', viewAll: 'View All Insights' },
    contact: {
      title: 'Contact', subtitle: 'Let us assess your matter together',
      description: 'Leave a short note and the relevant practice team will respond as part of this illustrative contact flow.',
      form: { name: 'Full Name', email: 'Email Address', phone: 'Phone Number', subject: 'Legal Matter', message: 'Brief Description', submit: 'Send Message', selectSubject: 'Select a matter', subjects: ['Corporate and Commercial', 'Mergers and Acquisitions', 'Dispute Resolution', 'Employment', 'Real Estate', 'Data Protection', 'Other'] },
      info: { address: 'Location', addressValue: 'Istanbul, Türkiye', phone: 'Phone', phoneValue: '+90 212 000 00 00', email: 'Email', emailValue: 'contact@verdi-hukuk.example' },
    },
    footer: { description: 'VERDİ LAW is an independent brand concept for strategic legal counsel.', quickLinks: 'Quick Links', practiceAreas: 'Practice Areas', contact: 'Contact', rights: 'All rights reserved.', privacy: 'Privacy Policy', terms: 'Terms of Use' },
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'tr');

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => setLanguage((current) => (current === 'tr' ? 'en' : 'tr'));
  const t = (keyPath, fallback = '') => {
    const result = keyPath.split('.').reduce((value, key) => value?.[key], TRANSLATIONS[language]);
    return result ?? (fallback || keyPath);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
}
