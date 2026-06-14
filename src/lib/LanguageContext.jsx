import React, { createContext, useContext, useState, useEffect } from 'react';

const TRANSLATIONS = {
  tr: {
    nav: {
      home: 'Zirve 2026',
      about: 'Hakkında',
      practiceAreas: 'Program',
      team: 'Konuşmacılar',
      publications: 'Haberler',
      process: 'Akış',
      references: 'Ortaklar',
      contact: 'Kayıt & İletişim'
    },
    hero: {
      tagline: 'İstanbul • Türkiye',
      title: 'Redmono Creative Summit 2026',
      subtitle: 'Yaratıcılık. Tasarım. Gelecek.',
      description: 'Tasarım, yapay zeka ve dijital marka dünyasının öncülerinin buluştuğu, Redmono Creative Agency tarafından düzenlenen İstanbul\'un en ilham verici yaratıcılık zirvesi.',
      cta: 'Kayıt Olun',
      ctaSecondary: 'Zirve Programı',
      scroll: 'Keşfetmek için kaydırın',
      badge: 'Redmono Design Event',
      slogan: '— Tasarım ve yaratıcılığın sınırlarını yeniden tanımlayan zirve.'
    },
    about: {
      title: 'Zirve Hakkında',
      subtitle: 'Redmono Creative Summit 2026',
      description: 'Redmono Creative Summit, 2026 yılında İstanbul Kadıköy\'de düzenlenen; yaratıcı endüstriler, kullanıcı deneyimi, marka tasarımı, yapay zekalı sanat ve gelecek teknolojileri alanlarında küresel öncüleri bir araya getiren prestijli bir etkinliktir. Katılımcılarına ilham verici oturumlar, atölye çalışmaları ve zengin networking fırsatları sunar.',
      description2: 'Kendi alanlarında çığır açan uzman konuşmacı kadromuz, geleceğin tasarım trendlerini ve dijital dönüşüm süreçlerini masaya yatırıyor.',
      experience: 'Seçkin Oturum',
      clients: 'Yaratıcı Katılımcı',
      cases: 'Öncü Konuşmacı',
      countries: 'Uluslararası Ortak',
      values: [
        { title: 'Yaratıcılık', desc: 'Sınırları zorlayan tasarım fikirleri ve vizyoner sunumlar.' },
        { title: 'Etkileşim', desc: 'Akranlar ve sektör profesyonelleri ile interaktif atölyeler.' },
        { title: 'Gelecek', desc: 'Yapay zeka ve dijital marka trendlerinin geleceğine bakış.' }
      ]
    },
    process: {
      title: 'Zirve Akışı',
      subtitle: 'Nasıl Katılabilirsiniz?',
      description: 'Katılımcılarımıza şeffaf, adım adım ve verimli bir zirve deneyimi sunuyoruz.',
      steps: [
        {
          number: '01',
          title: 'Kayıt ve Bilet',
          desc: 'İletişim formundan veya doğrudan bize ulaşarak zirve biletinizi alın ve atölye seçimlerini yapın.',
          duration: 'Kayıt Süreci'
        },
        {
          number: '02',
          title: 'Atölye Seçimi',
          desc: 'Zirve günü katılmak istediğiniz yaratıcı ve teknik atölyeler için ön rezervasyonunuzu tamamlayın.',
          duration: 'Etkinlik Öncesi'
        },
        {
          number: '03',
          title: 'Zirve Günü',
          desc: 'Açılış konuşmaları, paneller ve uygulamalı atölyelerle dolu yaratıcı maratona katılın.',
          duration: '15-16 Ekim 2026'
        },
        {
          number: '04',
          title: 'Networking & Parti',
          desc: 'Sektörün lider ajansları, markaları ve kreatif ekipleriyle tanışma fırsatını kaçırmayın.',
          duration: 'Zirve Kapanışı'
        },
        {
          number: '05',
          title: 'Dijital Raporlar',
          desc: 'Tüm oturum kayıtlarına, atölye notlarına ve zirve sunumlarına dijital arşivimizden erişin.',
          duration: 'Etkinlik Sonrası'
        }
      ]
    },
    practiceAreas: {
      title: 'Zirve Programı',
      subtitle: 'Etkinlik Konuları',
      learnMore: 'Detaylı Bilgi',
      areas: [
        { id: 1, title: 'Kullanıcı Deneyimi (UX/UI)', description: 'Modern web ve mobil arayüz tasarımlarında kullanıcı odaklı deneyim analizi, estetik ve kullanılabilirlik prensipleri.', icon: 'briefcase' },
        { id: 2, title: 'Marka Kimliği & Branding', description: 'Dijital çağda akılda kalıcı kurumsal kimlik inşası, logo tasarımı ve tutarlı marka dili oluşturma stratejileri.', icon: 'users' },
        { id: 3, title: 'Yapay Zeka & Sanat', description: 'Generative AI araçlarının tasarım süreçlerine entegrasyonu, yapay zekalı sanatın geleceği ve telif tartışmaları.', icon: 'scale' },
        { id: 4, title: 'Web3 & Gelecek Teknolojileri', description: 'Merkeziyetsiz web mimarisi, interaktif 3D deneyimler ve geleceğin dijital evrenlerinde marka konumlandırma.', icon: 'building' },
        { id: 5, title: 'Yaratıcı Liderlik', description: 'Tasarım ekiplerini yönetmek, inovasyon kültürünü beslemek ve ajans dünyasında kreatif liderlik vizyonu.', icon: 'handshake' },
        { id: 6, title: 'Kreatif Strateji', description: 'Hedef kitle analiziyle desteklenmiş, ölçülebilir ve yaratıcı dijital pazarlama kampanyalarının kurgulanması.', icon: 'lightbulb' },
        { id: 7, title: 'Motion & Hareketli Grafik', description: 'Video prodüksiyonu, animasyon, sinematik anlatım ve dijital ekranlarda dikkat çeken dinamik grafikler.', icon: 'landmark' },
        { id: 8, title: 'Yazılım & Teknolojik Arayüzler', description: 'Modern frontend frameworkleri, etkileşimli mikro-animasyonlar ve tasarım-yazılım köprüsünün kurulması.', icon: 'shield' },
        { id: 9, title: 'İçerik Stratejisi', description: 'Sosyal medya içerik planlaması, kopya yazımı, hikaye anlatıcılığı ve dijital platformlarda ses getiren metinler.', icon: 'heart' },
        { id: 10, title: 'Reklam & Dijital PR', description: 'Medya ilişkileri, viral pazarlama teknikleri, yaratıcı PR kampanyaları ve marka bilinirliği yönetimi.', icon: 'gavel' },
        { id: 11, title: 'Tasarım Kültürü & Etik', description: 'Erişilebilirlik (A11y), yeşil tasarım, etik tasarım standartları ve sürdürülebilir kullanıcı deneyimi.', icon: 'lock' },
        { id: 12, title: 'Girişimcilik & Startup Tasarımı', description: 'Startuplar için MVP tasarımları, pitch deck hazırlama, yatırımcı sunumları ve hızlı büyüme tasarımları.', icon: 'zap' }
      ]
    },
    team: {
      title: 'Konuşmacılar',
      subtitle: 'Yaratıcı Konuşmacı Kadromuz',
      description: 'Redmono Summit 2026\'da alanında devrim yaratan yerli ve yabancı 14 seçkin konuşmacı ve moderatör bizlerle.',
      viewProfile: 'Tüm Konuşmacıları Görüntüle'
    },
    publications: {
      title: 'Haberler',
      subtitle: 'Zirveden Son Duyurular',
      description: 'Redmono Creative Summit 2026 hakkında son güncellemeler, duyurular ve yaratıcı makaleler.',
      readMore: 'Devamını Oku',
      viewAll: 'Tüm Haberleri Görüntüle'
    },
    contact: {
      title: 'Kayıt Olun',
      subtitle: 'Bize Ulaşın & Yerinizi Ayırtın',
      description: 'Zirveye kayıt yaptırmak, sponsor olmak veya detaylı bilgi almak için formu doldurabilirsiniz.',
      form: {
        name: 'Adınız Soyadınız',
        email: 'E-posta Adresiniz',
        phone: 'Telefon Numaranız',
        subject: 'İlgi Alanınız',
        message: 'Sorunuz veya Mesajınız',
        submit: 'Mesaj Gönder',
        selectSubject: 'Konu seçiniz',
        subjects: ['UX/UI Tasarım', 'Marka Kimliği', 'Yapay Zeka', 'Web3', 'Sponsorluk', 'Gönüllü Katılım', 'Diğer']
      },
      info: {
        address: 'Zirve Adresi',
        addressValue: 'Caferağa Mah. Moda Cad. No:82, 34710 Kadıköy / İstanbul',
        phone: 'İletişim',
        phoneValue: '+90 212 900 00 00',
        email: 'E-posta',
        emailValue: 'info@redmono.com'
      }
    },
    footer: {
      description: 'İstanbul merkezli Redmono Creative Summit, 2026 yılında ulusal ve uluslararası kreatif toplulukları bir araya getiren yenilikçi bir zirvedir.',
      quickLinks: 'Hızlı Bağlantılar',
      practiceAreas: 'Zirve Konuları',
      contact: 'İletişim',
      rights: 'Tüm hakları saklıdır. Redmono Creative Agency 2026 — redmono.com',
      privacy: 'Gizlilik Politikası',
      terms: 'Kullanım Koşulları'
    }
  },
  en: {
    nav: {
      home: 'Summit 2026',
      about: 'About',
      practiceAreas: 'Schedule',
      team: 'Speakers',
      publications: 'News',
      process: 'Timeline',
      references: 'Partners',
      contact: 'Register & Contact'
    },
    hero: {
      tagline: 'Istanbul • Turkey',
      title: 'Redmono Creative Summit 2026',
      subtitle: 'Creativity. Design. Future.',
      description: 'The most inspiring creativity summit in Istanbul, organized by Redmono Creative Agency, bringing together pioneers of design, AI, and digital branding.',
      cta: 'Register Now',
      ctaSecondary: 'Summit Schedule',
      scroll: 'Scroll to explore',
      badge: 'Redmono Design Event',
      slogan: '— A summit redefining the boundaries of design and creativity.'
    },
    about: {
      title: 'About the Summit',
      subtitle: 'Redmono Creative Summit 2026',
      description: 'Redmono Creative Summit is a prestigious event held in Kadikoy, Istanbul in 2026, bringing together global pioneers in creative industries, user experience, brand design, AI-driven art, and future technologies. It offers inspiring sessions, workshops, and rich networking opportunities.',
      description2: 'Our lineup of expert speakers, who are breaking ground in their fields, will dissect future design trends and digital transformation processes.',
      experience: 'Featured Sessions',
      clients: 'Creative Attendees',
      cases: 'Keynote Speakers',
      countries: 'Global Partners',
      values: [
        { title: 'Creativity', desc: 'Boundary-pushing design concepts and visionary presentations.' },
        { title: 'Interaction', desc: 'Interactive workshops with peers and industry professionals.' },
        { title: 'Future', desc: 'A look into the future of AI and digital brand trends.' }
      ]
    },
    process: {
      title: 'Summit Timeline',
      subtitle: 'How to Participate?',
      description: 'We provide our participants with a transparent, step-by-step, and efficient summit experience.',
      steps: [
        {
          number: '01',
          title: 'Ticket Registration',
          desc: 'Get your summit ticket and select your workshops by filling out the contact form or reaching us directly.',
          duration: 'Registration'
        },
        {
          number: '02',
          title: 'Workshop Selection',
          desc: 'Pre-book your spot for the creative and technical workshops you wish to attend on the summit day.',
          duration: 'Pre-Event'
        },
        {
          number: '03',
          title: 'Summit Day',
          desc: 'Join the creative marathon packed with keynotes, panels, and hands-on workshops.',
          duration: 'October 15-16, 2026'
        },
        {
          number: '04',
          title: 'Networking & Party',
          desc: 'Don’t miss the chance to meet leading agencies, brands, and creative teams in the industry.',
          duration: 'Summit Wrap-Up'
        },
        {
          number: '05',
          title: 'Digital Reports',
          desc: 'Access all session recordings, workshop notes, and summit presentations from our digital archive.',
          duration: 'Post-Event'
        }
      ]
    },
    practiceAreas: {
      title: 'Summit Schedule',
      subtitle: 'Event Topics',
      learnMore: 'Read Details',
      areas: [
        { id: 1, title: 'User Experience (UX/UI)', description: 'User-oriented experience analysis, aesthetics, and usability principles in modern web and mobile interface designs.', icon: 'briefcase' },
        { id: 2, title: 'Brand Identity & Branding', description: 'Building memorable corporate identities, logo design, and consistent brand language strategies in the digital age.', icon: 'users' },
        { id: 3, title: 'AI & Art', description: 'Integration of Generative AI tools into design processes, the future of AI-driven art, and copyright discussions.', icon: 'scale' },
        { id: 4, title: 'Web3 & Future Tech', description: 'Decentralized web architecture, interactive 3D experiences, and brand positioning in future digital universes.', icon: 'building' },
        { id: 5, title: 'Creative Leadership', description: 'Managing design teams, nurturing innovation culture, and creative leadership vision in the agency world.', icon: 'handshake' },
        { id: 6, title: 'Creative Strategy', description: 'Building measurable and creative digital marketing campaigns supported by target audience analysis.', icon: 'lightbulb' },
        { id: 7, title: 'Motion & Motion Graphics', description: 'Video production, animation, cinematic storytelling, and dynamic graphics that grab attention on digital screens.', icon: 'landmark' },
        { id: 8, title: 'Software & Tech Interfaces', description: 'Modern frontend frameworks, interactive micro-animations, and building the design-to-development bridge.', icon: 'shield' },
        { id: 9, title: 'Content Strategy', description: 'Social media content planning, copywriting, storytelling, and copy that makes a difference on digital platforms.', icon: 'heart' },
        { id: 10, title: 'Advertising & Digital PR', description: 'Media relations, viral marketing techniques, creative PR campaigns, and brand awareness management.', icon: 'gavel' },
        { id: 11, title: 'Design Culture & Ethics', description: 'Accessibility (A11y), green design, ethical design standards, and sustainable user experience.', icon: 'lock' },
        { id: 12, title: 'Entrepreneurship & Startup Design', description: 'MVP designs for startups, pitch deck preparation, investor presentations, and fast-growth designs.', icon: 'zap' }
      ]
    },
    team: {
      title: 'Speakers',
      subtitle: 'Our Creative Speakers Lineup',
      description: 'Meet our 14 distinguished keynote speakers and moderators redefining their fields at Redmono Summit 2026.',
      viewProfile: 'View All Speakers'
    },
    publications: {
      title: 'News',
      subtitle: 'Latest Announcements',
      description: 'Get the latest updates, announcements, and creative articles about Redmono Creative Summit 2026.',
      readMore: 'Read Article',
      viewAll: 'View All News'
    },
    contact: {
      title: 'Register Now',
      subtitle: 'Get in Touch & Book Your Spot',
      description: 'You can fill out the form to register, become a sponsor, or ask for details about the summit.',
      form: {
        name: 'Your Name',
        email: 'Your Email',
        phone: 'Your Phone',
        subject: 'Interest Area',
        message: 'Your Message',
        submit: 'Send Message',
        selectSubject: 'Select topic',
        subjects: ['UX/UI Design', 'Branding', 'Artificial Intelligence', 'Web3', 'Sponsorship', 'Volunteering', 'Other']
      },
      info: {
        address: 'Summit Location',
        addressValue: 'Caferaga Mah. Moda Cad. No:82, 34710 Kadikoy / Istanbul',
        phone: 'Contact',
        phoneValue: '+90 212 900 00 00',
        email: 'Email',
        emailValue: 'info@redmono.com'
      }
    },
    footer: {
      description: 'Based in Istanbul, Redmono Creative Summit is an innovative event bringing together national and international creative communities in 2026.',
      quickLinks: 'Quick Links',
      practiceAreas: 'Summit Topics',
      contact: 'Contact',
      rights: 'All rights reserved. Redmono Creative Agency 2026 — redmono.com',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use'
    }
  }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'tr';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'tr' ? 'en' : 'tr'));
  };

  const t = (keyPath, fallback = '') => {
    const keys = keyPath.split('.');
    let result = TRANSLATIONS[language];
    
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return fallback || keyPath;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}