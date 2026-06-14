import React, { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  tr: {
    nav: {
      home: 'Ana Sayfa',
      about: 'Hakkımızda',
      practiceAreas: 'Çalışma Alanları',
      team: 'Ekibimiz',
      publications: 'Yayınlar',
      process: 'Süreç',
      references: 'Referanslar',
      contact: 'İletişim'
    },
    hero: {
      tagline: 'İstanbul • Türkiye',
      title: 'Werdy Hukuk Bürosu',
      subtitle: 'Güvenilir. Deneyimli. Çözüm Odaklı.',
      description: 'Ticari hukuk, tahkim ve kurumsal danışmanlık alanlarında yirmi yılı aşkın tecrübemizle müvekkillerimize güvenilir hukuki destek sunuyoruz.',
      cta: 'Danışmanlık Alın',
      ctaSecondary: 'Çalışma Alanları',
      scroll: 'Keşfetmek için kaydırın',
      badge: '2003\'ten beri',
      slogan: '— Yüksek kaliteli hizmetler sunan bir hukuk bürosu.'
    },
    about: {
      title: 'Hakkımızda',
      subtitle: 'Werdy Hukuk Bürosu',
      description: 'Werdy Hukuk Bürosu, 2003 yılında İstanbul\'da kurulmuş olup; ticaret hukuku, şirketler hukuku, gayrimenkul hukuku, iş hukuku ve tahkim alanlarında uzmanlaşmış bir hukuk bürosudur. Büromuz, ulusal ve uluslararası arenada faaliyet gösteren kurumsal ve bireysel müvekkillerine yüksek kaliteli hukuki danışmanlık hizmetleri sunmaktadır.',
      description2: 'Deneyimli avukat kadromuz, her müvekkilin ihtiyacına özel çözümler geliştirerek hukuki süreçleri etkin biçimde yönetmektedir.',
      experience: 'Yıllık Deneyim',
      clients: 'Kurumsal Müvekkil',
      cases: 'Tamamlanan Dava',
      countries: 'Çalışılan Ülke',
      values: [
        { title: 'Güvenilirlik', desc: 'Her müvekkilimize dürüst, şeffaf ve etik bir hizmet anlayışıyla yaklaşıyoruz.' },
        { title: 'Uzmanlık', desc: 'Alanlarında uzmanlaşmış avukatlarımız en güncel hukuki gelişmeleri takip eder.' },
        { title: 'Çözüm Odaklılık', desc: 'Karmaşık hukuki sorunlara pratik ve uygulanabilir çözümler üretiriz.' }
      ]
    },
    process: {
      title: 'Hukuki Süreç',
      subtitle: 'Nasıl Çalışıyoruz?',
      description: 'Müvekkillerimize şeffaf, adım adım ve öngörülebilir bir hukuki danışmanlık süreci sunuyoruz.',
      steps: [
        {
          number: '01',
          title: 'İlk Görüşme',
          desc: 'Hukuki durumunuzu ve ihtiyaçlarınızı anlamak için ücretsiz ilk değerlendirme görüşmesi yapıyoruz.',
          duration: 'Aynı gün – 24 saat'
        },
        {
          number: '02',
          title: 'Dosya Analizi',
          desc: 'Uzman avukatlarımız belgelerinizi ve hukuki durumunuzu detaylıca inceleyerek strateji belirler.',
          duration: '2 – 5 iş günü'
        },
        {
          number: '03',
          title: 'Strateji & Teklif',
          desc: 'Size özel hukuki strateji, süreç planı ve şeffaf maliyet bilgisi sunulur.',
          duration: '1 – 3 iş günü'
        },
        {
          number: '04',
          title: 'Süreç Yönetimi',
          desc: 'Hukuki süreç boyunca tüm işlemler takip edilir, müvekkil düzenli olarak bilgilendirilir.',
          duration: 'Süreç boyunca'
        },
        {
          number: '05',
          title: 'Sonuç & Raporlama',
          desc: 'Davanın sonuçlanmasının ardından detaylı sonuç raporu hazırlanır ve müvekkile teslim edilir.',
          duration: 'Kapanış aşaması'
        }
      ]
    },
    practiceAreas: {
      title: 'Çalışma Alanları',
      subtitle: 'Uzmanlık Alanlarımız',
      learnMore: 'Detaylı Bilgi',
      areas: [
        { id: 1, title: 'Ticaret Hukuku', description: 'Ticari sözleşmeler, alım-satım sözleşmeleri, distribütörlük ve acente sözleşmeleri, ticari uyuşmazlıkların çözümü, kefalet ve teminat hukuku.', icon: 'briefcase' },
        { id: 2, title: 'Şirketler Hukuku', description: 'Anonim ve limited şirket kuruluşları, genel kurul süreçleri, birleşme ve devralma (M&A), şirket yeniden yapılandırma, ortaklık anlaşmazlıkları.', icon: 'users' },
        { id: 3, title: 'Tahkim & Uyuşmazlık Çözümü', description: 'İstanbul Tahkim Merkezi (İSTAC), ICC ve ad hoc tahkim davaları; arabuluculuk, müzakere ve yargı dışı çözüm yöntemleri.', icon: 'scale' },
        { id: 4, title: 'Gayrimenkul & İnşaat Hukuku', description: 'Taşınmaz alım-satımı, kat mülkiyeti, kira sözleşmeleri, inşaat ve müteahhitlik sözleşmeleri, imar ve ruhsat uyuşmazlıkları.', icon: 'building' },
        { id: 5, title: 'İş & Sosyal Güvenlik Hukuku', description: 'Bireysel ve toplu iş sözleşmeleri, işçi alacakları, işe iade davaları, iş kazaları ve meslek hastalıkları, SGK uyuşmazlıkları.', icon: 'handshake' },
        { id: 6, title: 'Fikri Mülkiyet Hukuku', description: 'Marka tescili ve itiraz süreçleri, patent ve faydalı model başvuruları, telif hakkı ihlalleri, haksız rekabet ve ticari sır davaları.', icon: 'lightbulb' },
        { id: 7, title: 'Banka & Finans Hukuku', description: 'Kredi sözleşmeleri, finansal teminatlar, leasing ve faktoring işlemleri, banka uyuşmazlıkları ve düzenleyici uyum danışmanlığı.', icon: 'landmark' },
        { id: 8, title: 'İdare & Vergi Hukuku', description: 'İdari işlemlere itiraz, vergi cezaları ve uyuşmazlıkları, kamu ihale hukuku, lisans ve izin süreçleri.', icon: 'shield' },
        { id: 9, title: 'Miras & Aile Hukuku', description: 'Vasiyetname hazırlanması, miras taksim anlaşmaları, velayet ve nafaka davaları, aile şirketi hukuku.', icon: 'heart' },
        { id: 10, title: 'İcra & İflas Hukuku', description: 'İlamlı ve ilamsız icra takipleri, ihtiyati haciz ve tedbir kararları, iflas erteleme ve konkordato süreçleri.', icon: 'gavel' },
        { id: 11, title: 'Ceza Hukuku', description: 'Ticari suçlar, sahtecilik, dolandırıcılık, zimmet ve görevi kötüye kullanma davalarında kurumsal ve bireysel savunma.', icon: 'lock' },
        { id: 12, title: 'Enerji & Çevre Hukuku', description: 'Enerji lisansları, yenilenebilir enerji yatırımları, çevre mevzuatı uyumu, ÇED süreçleri ve enerji alım-satım sözleşmeleri.', icon: 'zap' }
      ]
    },
    team: {
      title: 'Ekibimiz',
      subtitle: 'Uzman Avukat Kadromuz',
      description: 'Werdy Hukuk Bürosu\'nun deneyimli avukat ekibi, her davada müvekkillerinin haklarını en etkin biçimde savunmaktadır.',
      viewProfile: 'Tüm Ekibi Görüntüle'
    },
    publications: {
      title: 'Yayınlar',
      subtitle: 'Güncel Hukuki Makaleler',
      description: 'Hukuk alanındaki güncel gelişmeler ve uzman değerlendirmelerimizi paylaşıyoruz.',
      readMore: 'Devamını Oku',
      viewAll: 'Tüm Yayınları Görüntüle'
    },
    contact: {
      title: 'İletişim',
      subtitle: 'Hukuki Danışmanlık Alın',
      description: 'Hukuki ihtiyaçlarınız için aşağıdaki formu doldurabilir veya doğrudan ulaşabilirsiniz.',
      form: {
        name: 'Adınız Soyadınız',
        email: 'E-posta Adresiniz',
        phone: 'Telefon Numaranız',
        subject: 'Konu',
        message: 'Mesajınız',
        submit: 'Mesaj Gönder',
        selectSubject: 'Konu seçiniz',
        subjects: ['Ticaret Hukuku', 'Tahkim', 'Gayrimenkul Hukuku', 'Şirketler Hukuku', 'İş Hukuku', 'Fikri Mülkiyet', 'Diğer']
      },
      info: {
        address: 'Adres',
        addressValue: 'Levent, Büyükdere Cad. No:185, 34394 Şişli / İstanbul',
        phone: 'Telefon',
        phoneValue: '+90 212 324 XX XX',
        email: 'E-posta',
        emailValue: 'info@werdyhukuk.com.tr'
      }
    },
    footer: {
      description: 'İstanbul merkezli Werdy Hukuk Bürosu, 2003\'ten bu yana ulusal ve uluslararası müvekkillerine güvenilir hukuki danışmanlık sunmaktadır.',
      quickLinks: 'Hızlı Bağlantılar',
      practiceAreas: 'Çalışma Alanları',
      contact: 'İletişim',
      rights: 'Tüm hakları saklıdır.',
      privacy: 'Gizlilik Politikası',
      terms: 'Kullanım Koşulları'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      practiceAreas: 'Practice Areas',
      team: 'Our Team',
      publications: 'Publications',
      process: 'Process',
      references: 'References',
      contact: 'Contact'
    },
    hero: {
      tagline: 'Istanbul • Turkey',
      title: 'Werdy Law Firm',
      subtitle: 'Reliable. Experienced. Solution-Oriented.',
      description: 'With over twenty years of experience in commercial law, arbitration and corporate advisory, we provide trusted legal support to our clients.',
      cta: 'Get Consultation',
      ctaSecondary: 'Practice Areas',
      scroll: 'Scroll to explore',
      badge: 'Since 2003',
      slogan: '— a law firm which provides a broad range of high quality services.'
    },
    about: {
      title: 'About Us',
      subtitle: 'Werdy Law Firm',
      description: 'Founded in Istanbul in 2003, Werdy Law Firm specializes in commercial law, corporate law, real estate law, employment law and arbitration. The firm provides high-quality legal advisory services to corporate and individual clients operating nationally and internationally.',
      description2: 'Our experienced team of attorneys develops tailored solutions for each client\'s needs and effectively manages legal processes.',
      experience: 'Years of Experience',
      clients: 'Corporate Clients',
      cases: 'Completed Cases',
      countries: 'Countries Served',
      values: [
        { title: 'Reliability', desc: 'We approach every client with an honest, transparent and ethical service philosophy.' },
        { title: 'Expertise', desc: 'Our specialized attorneys follow the latest legal developments in their fields.' },
        { title: 'Solution Focus', desc: 'We generate practical and applicable solutions to complex legal problems.' }
      ]
    },
    process: {
      title: 'Legal Process',
      subtitle: 'How We Work',
      description: 'We offer our clients a transparent, step-by-step and predictable legal advisory process.',
      steps: [
        { number: '01', title: 'Initial Consultation', desc: 'We conduct a free initial assessment meeting to understand your legal situation and needs.', duration: 'Same day – 24 hours' },
        { number: '02', title: 'File Analysis', desc: 'Our expert attorneys examine your documents and legal situation in detail to determine strategy.', duration: '2 – 5 business days' },
        { number: '03', title: 'Strategy & Proposal', desc: 'A tailored legal strategy, process plan and transparent cost information is presented to you.', duration: '1 – 3 business days' },
        { number: '04', title: 'Process Management', desc: 'All proceedings are monitored throughout the legal process and clients are regularly informed.', duration: 'Throughout process' },
        { number: '05', title: 'Result & Reporting', desc: 'After the case is concluded, a detailed outcome report is prepared and delivered to the client.', duration: 'Closing phase' }
      ]
    },
    practiceAreas: {
      title: 'Practice Areas',
      subtitle: 'Our Expertise',
      learnMore: 'Learn More',
      areas: [
        { id: 1, title: 'Commercial Law', description: 'Commercial contracts, sale agreements, distributorship and agency contracts, resolution of commercial disputes, surety and guarantee law.', icon: 'briefcase' },
        { id: 2, title: 'Corporate Law', description: 'Joint-stock and limited company formations, general assembly processes, mergers & acquisitions, corporate restructuring, partnership disputes.', icon: 'users' },
        { id: 3, title: 'Arbitration & Dispute Resolution', description: 'ISTAC, ICC and ad hoc arbitration proceedings; mediation, negotiation and alternative dispute resolution methods.', icon: 'scale' },
        { id: 4, title: 'Real Estate & Construction Law', description: 'Property transactions, condominium law, lease agreements, construction and contractor agreements, zoning and permit disputes.', icon: 'building' },
        { id: 5, title: 'Employment & Social Security Law', description: 'Individual and collective employment contracts, employee claims, reinstatement actions, workplace accidents and SGK disputes.', icon: 'handshake' },
        { id: 6, title: 'Intellectual Property Law', description: 'Trademark registration and opposition proceedings, patent and utility model applications, copyright infringement, unfair competition and trade secret litigation.', icon: 'lightbulb' },
        { id: 7, title: 'Banking & Finance Law', description: 'Loan agreements, financial collateral, leasing and factoring transactions, banking disputes and regulatory compliance advisory.', icon: 'landmark' },
        { id: 8, title: 'Administrative & Tax Law', description: 'Challenging administrative acts, tax penalties and disputes, public procurement law, licensing and permit procedures.', icon: 'shield' },
        { id: 9, title: 'Inheritance & Family Law', description: 'Will preparation, inheritance partition agreements, custody and alimony proceedings, family business law.', icon: 'heart' },
        { id: 10, title: 'Enforcement & Insolvency Law', description: 'Executory and non-executory enforcement proceedings, precautionary attachments, insolvency postponement and concordat processes.', icon: 'gavel' },
        { id: 11, title: 'Criminal Law', description: 'Corporate and individual defense in commercial crimes: fraud, forgery, embezzlement and abuse of authority cases.', icon: 'lock' },
        { id: 12, title: 'Energy & Environmental Law', description: 'Energy licenses, renewable energy investments, environmental legislation compliance, EIA processes and energy purchase agreements.', icon: 'zap' }
      ]
    },
    team: {
      title: 'Our Team',
      subtitle: 'Expert Attorney Staff',
      description: 'The experienced attorney team of Werdy Law Firm defends clients\' rights most effectively in every case.',
      viewProfile: 'View All Team'
    },
    publications: {
      title: 'Publications',
      subtitle: 'Latest Legal Articles',
      description: 'We share current developments in the legal field and our expert assessments.',
      readMore: 'Read More',
      viewAll: 'View All Publications'
    },
    contact: {
      title: 'Contact',
      subtitle: 'Get Legal Consultation',
      description: 'You can fill out the form below or reach us directly for your legal needs.',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        phone: 'Your Phone',
        subject: 'Subject',
        message: 'Your Message',
        submit: 'Send Message',
        selectSubject: 'Select a subject',
        subjects: ['Commercial Law', 'Arbitration', 'Real Estate Law', 'Corporate Law', 'Employment Law', 'Intellectual Property', 'Other']
      },
      info: {
        address: 'Address',
        addressValue: 'Levent, Büyükdere Cad. No:185, 34394 Şişli / Istanbul',
        phone: 'Phone',
        phoneValue: '+90 212 324 XX XX',
        email: 'Email',
        emailValue: 'info@werdylaw.com.tr'
      }
    },
    footer: {
      description: 'Istanbul-based Werdy Law Firm has been providing trusted legal advisory services to national and international clients since 2003.',
      quickLinks: 'Quick Links',
      practiceAreas: 'Practice Areas',
      contact: 'Contact',
      rights: 'All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use'
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('tr');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'tr' ? 'en' : 'tr');
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