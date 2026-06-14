import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';

export const PRACTICE_AREAS = [
  {
    id: 'ux',
    image: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=900&q=80',
    tr: {
      title: 'Kullanıcı Deneyimi (UX/UI)',
      lede: 'Modern dijital arayüzlerde estetik, kullanılabilirlik ve kullanıcı davranış modellerini inceleyen kapsamlı oturumlar ve atölyeler.',
      services: [
        'Kullanıcı odaklı tasarım prensipleri ve araştırma',
        'Figma ile ileri düzey prototipleme ve tasarım sistemleri',
        'Mikro-animasyonlar ve etkileşimli arayüz tasarımı',
        'Erişilebilirlik (A11y) ve W3C tasarım standartları',
        'Kullanılabilirlik testleri ve kullanıcı geri bildirim analizi',
      ],
    },
    en: {
      title: 'User Experience (UX/UI)',
      lede: 'Comprehensive sessions and workshops examining aesthetics, usability, and user behavior models in modern digital interfaces.',
      services: [
        'User-centered design principles and research',
        'Advanced prototyping and design systems with Figma',
        'Micro-animations and interactive interface design',
        'Accessibility (A11y) and W3C design standards',
        'Usability testing and user feedback analysis',
      ],
    },
  },
  {
    id: 'branding',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
    tr: {
      title: 'Marka Kimliği & Branding',
      lede: 'Dijital dünyada güçlü, tutarlı ve akılda kalıcı marka kimlikleri inşa etmek üzerine stratejiler ve yaratıcı vaka analizleri.',
      services: [
        'Yaratıcı logo tasarımı ve kurumsal kimlik inşası',
        'Tipografi seçimi ve renk teorisi pratikleri',
        'Marka sesi, tonu ve hikaye anlatıcılığı (storytelling)',
        'Dijital PR, sosyal medya ve viral pazarlama teknikleri',
        'Modern marka konumlandırma ve rakip analizleri',
      ],
    },
    en: {
      title: 'Brand Identity & Branding',
      lede: 'Strategies and creative case studies on building strong, consistent, and memorable brand identities in the digital world.',
      services: [
        'Creative logo design and corporate identity building',
        'Typography choices and color theory practices',
        'Brand voice, tone, and storytelling',
        'Digital PR, social media, and viral marketing techniques',
        'Modern brand positioning and competitor analyses',
      ],
    },
  },
  {
    id: 'ai',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    tr: {
      title: 'Yapay Zeka & Sanat',
      lede: 'Üretken yapay zeka araçlarının yaratıcı süreçleri nasıl dönüştürdüğünü, etik sınırları ve geleceğin sanatını tartışıyoruz.',
      services: [
        'Midjourney, Stable Diffusion ve DALL-E uygulamaları',
        'Yapay zeka destekli tasarım araçları ve otomasyon',
        'Prompt mühendisliği ve dijital sanat teknikleri',
        'Yapay zekalı içerik üretiminde etik ve telif hakları',
        'Tasarımcı ve AI ortaklığında yeni nesil hibrid sanat',
      ],
    },
    en: {
      title: 'AI & Art',
      lede: 'Discussing how generative AI tools transform creative processes, ethical boundaries, and the future of art.',
      services: [
        'Midjourney, Stable Diffusion, and DALL-E applications',
        'AI-supported design tools and automation',
        'Prompt engineering and digital art techniques',
        'Ethics and copyright in AI content generation',
        'Next-generation hybrid art of designer and AI partnership',
      ],
    },
  },
  {
    id: 'web3',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=900&q=80',
    tr: {
      title: 'Web3 & Gelecek Teknolojileri',
      lede: 'Merkeziyetsiz web, metaverse, 3D arayüzler ve geleceğin dijital dünyasını şekillendiren yenilikçi teknolojiler.',
      services: [
        'Web3 UX/UI standartları ve cüzdan entegrasyonları',
        'Blender ve Spline ile interaktif 3D tasarım',
        'Spatial design (mekansal tasarım) ve AR/VR deneyimleri',
        'NFT ve dijital koleksiyonlarda topluluk tasarımı',
        'Giyilebilir teknolojiler ve yeni nesil ekranlar',
      ],
    },
    en: {
      title: 'Web3 & Future Tech',
      lede: 'Decentralized web, metaverse, 3D interfaces, and innovative technologies shaping the future digital world.',
      services: [
        'Web3 UX/UI standards and wallet integrations',
        'Interactive 3D design with Blender and Spline',
        'Spatial design and AR/VR experiences',
        'Community design in NFTs and digital collectibles',
        'Wearable technologies and next-generation screens',
      ],
    },
  },
  {
    id: 'leadership',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=900&q=80',
    tr: {
      title: 'Yaratıcı Liderlik',
      lede: 'Tasarım ekiplerini yönetmek, yaratıcı kültürü beslemek ve kreatif ajans dünyasında vizyoner liderlik modelleri.',
      services: [
        'Kreatif ajans yönetimi ve iş geliştirme',
        'Tasarım ekiplerinde açık iletişim ve mentorluk',
        'Ajans-müşteri ilişkileri ve beklenti yönetimi',
        'Yaratıcı blokajları aşma ve inovasyon kültürü',
        'Tasarım odaklı düşünme (design thinking) metodolojileri',
      ],
    },
    en: {
      title: 'Creative Leadership',
      lede: 'Managing design teams, nurturing a creative culture, and visionary leadership models in the creative agency world.',
      services: [
        'Creative agency management and business development',
        'Open communication and mentorship in design teams',
        'Agency-client relations and expectation management',
        'Overcoming creative blocks and building a culture of innovation',
        'Design thinking methodologies',
      ],
    },
  },
  {
    id: 'strategy',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=900&q=80',
    tr: {
      title: 'Kreatif Strateji',
      lede: 'Kreatif fikirleri veriyle besleyerek ölçülebilir, etkileyici ve hedef odaklı dijital kampanyalara dönüştürme yöntemleri.',
      services: [
        'Hedef kitle analizi ve kullanıcı yolculuğu (user journey)',
        'Veri odaklı yaratıcı kampanya tasarımı',
        'Performans pazarlaması ve kreatif optimizasyon',
        'İçerik pazarlama stratejisi ve kanal planlaması',
        'Dönüşüm oranı optimizasyonu (CRO) ve büyüme tasarımı',
      ],
    },
    en: {
      title: 'Creative Strategy',
      lede: 'Methods to back creative ideas with data to transform them into measurable, impactful, and goal-oriented digital campaigns.',
      services: [
        'Target audience analysis and user journey mapping',
        'Data-driven creative campaign design',
        'Performance marketing and creative optimization',
        'Content marketing strategy and channel planning',
        'Conversion rate optimization (CRO) and growth design',
      ],
    },
  },
  {
    id: 'motion',
    image: 'https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?w=900&q=80',
    tr: {
      title: 'Motion & Hareketli Grafik',
      lede: 'Dijital ekranlar için dinamik animasyonlar, 3D hareketli grafikler ve video prodüksiyonunda sinematik anlatım.',
      services: [
        'After Effects ve Cinema 4D ile motion tasarım',
        'Sosyal medya için mikro-animasyonlar',
        'Video kurgu ve sinematik renk düzenleme (grading)',
        'Açıklayıcı video (explainer) ve animasyon prodüksiyonu',
        'Karakter tasarımı ve 2D/3D rigleme teknikleri',
      ],
    },
    en: {
      title: 'Motion & Motion Graphics',
      lede: 'Dynamic animations for digital screens, 3D motion graphics, and cinematic storytelling in video production.',
      services: [
        'Motion design with After Effects and Cinema 4D',
        'Micro-interactions and UI animations for screens',
        'Video editing and cinematic color grading',
        'Explainer video and animation production',
        'Character design and 2D/3D rigging techniques',
      ],
    },
  },
  {
    id: 'dev',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80',
    tr: {
      title: 'Yazılım & Teknolojik Arayüzler',
      lede: 'Tasarım ile yazılım arasındaki köprüyü kuran modern frontend teknolojileri, mikro-animasyonlar ve etkileşimli kodlama.',
      services: [
        'Framer Motion ve CSS animasyonları ile kodlama',
        'Tasarım sistemlerinin koda aktarılması (design tokens)',
        'Modern frontend frameworkleri ve bileşen kütüphaneleri',
        'Etkileşimli web grafikler ve WebGL/Three.js giriş',
        'Performans optimizasyonu ve kod tabanlı arayüz testi',
      ],
    },
    en: {
      title: 'Software & Tech Interfaces',
      lede: 'Modern frontend technologies, micro-animations, and interactive coding establishing the design-to-development bridge.',
      services: [
        'Coding with Framer Motion and CSS animations',
        'Translating design systems into code (design tokens)',
        'Modern frontend frameworks and component libraries',
        'Interactive web graphics and introduction to WebGL/Three.js',
        'Performance optimization and code-based interface testing',
      ],
    },
  },
  {
    id: 'content',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
    tr: {
      title: 'İçerik Stratejisi',
      lede: 'Markaların dijital dünyadaki sesini şekillendiren içerik planlama, kreatif metin yazarlığı ve hikaye anlatımı.',
      services: [
        'Kreatif metin yazarlığı (copywriting)',
        'Arama motoru uyumlu (SEO) içerik stratejisi',
        'Sosyal medya içerik planlaması ve ses tonu',
        'E-bülten pazarlaması ve abonelik stratejileri',
        'Dijital yayıncılık ve marka dergisi tasarımı',
      ],
    },
    en: {
      title: 'Content Strategy',
      lede: 'Content planning, creative copywriting, and storytelling shaping the voice of brands in the digital world.',
      services: [
        'Creative copywriting (copywriting)',
        'Search engine optimized (SEO) content strategy',
        'Social media content planning and tone of voice',
        'E-newsletter marketing and subscription strategies',
        'Digital publishing and brand magazine design',
      ],
    },
  },
];

// Ortak başlık standartları (Home ile aynı)
const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7A8C]';
const SECTION_TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#1A2530] md:text-4xl';

export default function PracticeAreasPage() {
  const { language } = useLanguage();
  const [activeId, setActiveId] = useState(PRACTICE_AREAS[0].id);

  // Scroll spy — hangi bölüm görünür ise sidebar'da işaretle
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    PRACTICE_AREAS.forEach((a) => {
      const el = document.getElementById(a.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // URL'deki #hash varsa o bölüme kaydır (SPA route change'lerinde tarayıcı bunu otomatik yapmıyor)
  useEffect(() => {
    const tryScroll = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return false;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveId(id);
        return true;
      }
      return false;
    };
    // İlk denemede element henüz mount olmamış olabilir; birkaç frame bekle
    const r1 = requestAnimationFrame(() => {
      if (!tryScroll()) {
        const r2 = requestAnimationFrame(tryScroll);
        return () => cancelAnimationFrame(r2);
      }
    });
    // Hash değişimini de dinle (aynı sayfada başka karta tıklanırsa)
    const onHashChange = () => tryScroll();
    window.addEventListener('hashchange', onHashChange);
    return () => {
      cancelAnimationFrame(r1);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />

      {/* Hero */}
      <section data-nav-theme="dark" className="relative overflow-hidden bg-[#1A2530] text-white">
        <img
          src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=2400&q=90"
          alt={language === 'tr' ? 'Zirve Programı' : 'Summit Schedule'}
          className="absolute inset-0 h-full w-full object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/55" />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/30 to-ink/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-40 pb-24">
          <Reveal>
            <h1 className="mt-6 font-fraunces text-3xl font-semibold leading-tight text-white md:text-4xl">
              {language === 'tr'
                ? 'Her alanda derinlemesine oturumlar.'
                : 'In-depth sessions across all creative domains.'}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              {language === 'tr'
                ? 'UX/UI tasarımdan yapay zekaya, marka stratejilerinden yazılıma uzanan 9 farklı yaratıcı odak alanında zengin program akışı sunuyoruz.'
                : 'We offer a rich schedule of sessions across 9 creative domains, from UX/UI design to AI, branding, and software development.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content: sticky sidebar nav + detail blocks */}
      <section data-nav-theme="light" className="relative z-20 bg-[#E8ECEF] border-t border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 grid gap-12 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <nav>
            <ul className="space-y-1">
              {PRACTICE_AREAS.map((area, i) => {
                const isActive = activeId === area.id;
                return (
                  <li key={area.id}>
                    <a
                      href={`#${area.id}`}
                      className={`group flex items-center gap-3 border-l-2 py-2.5 pl-4 text-sm transition-all duration-300 ${
                        isActive
                          ? 'border-[#5A7A8C] text-[#1A2530] font-semibold opacity-100'
                          : 'border-transparent text-[#4D5660] hover:text-[#1A2530] hover:border-[#C8CFD3] opacity-40 hover:opacity-80'
                      }`}
                    >
                      <span className="text-xs font-mono text-[#A8B0B5]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{area[language].title}</span>
                      <ChevronRight
                        className={`ml-auto h-3.5 w-3.5 transition ${
                          isActive ? 'translate-x-1 text-[#5A7A8C]' : 'opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Detail blocks */}
        <div>
          {PRACTICE_AREAS.map((area, i) => {
            const content = area[language];
            const isActive = activeId === area.id;
            return (
              <article
                key={area.id}
                id={area.id}
                className={`scroll-mt-32 border-b border-[#C8CFD3] py-14 first:pt-0 last:border-b-0 transition-all duration-500 origin-left ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-25 scale-[0.98]'
                }`}
              >
                {/* Two-column: text left, image right */}
                <div className="grid gap-10 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] items-start">
                  <div>
                    <Reveal>
                      <div className="flex items-baseline gap-4 mb-6">
                        <span className="font-fraunces text-5xl font-semibold text-[#d4c4a3]">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h2 className="font-fraunces text-3xl font-semibold leading-tight text-[#1A2530] md:text-4xl">
                          {content.title}
                        </h2>
                      </div>
                      <p className="text-lg leading-8 text-[#4D5660]">
                        {content.lede}
                      </p>
                    </Reveal>

                    <Reveal delay={0.1}>
                      <div className="mt-8">
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {content.services.map((s, j) => (
                            <li
                              key={j}
                              className="flex items-start gap-3 border-l-2 border-[#C8CFD3] pl-4 py-2 text-[15px] text-[#3a3a3a] hover:border-[#5A7A8C] transition-colors"
                            >
                              <span className="font-mono text-xs text-[#A8B0B5] mt-1.5 shrink-0">
                                {String(j + 1).padStart(2, '0')}
                              </span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Reveal>

                    <Reveal delay={0.2}>
                      <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
                        <a
                          href="/iletisim"
                          className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-[#1A2530] text-xs"
                        >
                          {language === 'tr' ? 'Bu konuda danışın' : 'Get advice'}
                          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                        </a>
                        <a
                          href="/ekibimiz"
                          className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5A7A8C] hover:text-[#1A2530] transition"
                        >
                          {language === 'tr' ? 'İlgili ekip' : 'Related team'}
                        </a>
                      </div>
                    </Reveal>
                  </div>

                  {/* Area image */}
                  {area.image && (
                    <Reveal delay={0.15}>
                      <div className="relative overflow-hidden rounded-2xl shadow-xl hidden lg:block">
                        <img
                          src={area.image}
                          alt={content.title}
                          className="w-full h-64 xl:h-72 object-cover object-center transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2530]/40 via-transparent to-transparent" />
                      </div>
                    </Reveal>
                  )}
                </div>
              </article>
            );
          })}
        </div>
        </div>
      </section>

      <div className="relative z-30">
        <Footer />
      </div>
    </div>
  );
}
