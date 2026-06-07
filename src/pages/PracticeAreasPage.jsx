import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';

export const PRACTICE_AREAS = [
  {
    id: 'banking',
    tr: {
      title: 'Bankacılık ve Finansal Hizmetler',
      lede: 'Türkiye’de bankacılık hukuku alanında öncü hukuk büroları arasında yer alıyoruz ve geniş bir finansman işlemleri yelpazesinde derin bir tecrübeye sahibiz.',
      services: [
        'Proje finansmanı ve teminat yapılandırması',
        'Sendikasyon kredileri ve refinansman işlemleri',
        'BDDK izinleri ve düzenleyici uyum',
        'Yapılandırılmış finansman ve sukuk işlemleri',
        'Banka birleşmeleri ve devralmaları',
      ],
    },
    en: {
      title: 'Banking & Financial Services',
      lede: 'Verdi is one of the leading law firms in banking law in Turkey, with extensive experience in a broad variety of financing transactions.',
      services: [
        'Project finance and collateral structuring',
        'Syndicated loans and refinancing transactions',
        'BRSA permissions and regulatory compliance',
        'Structured finance and sukuk transactions',
        'Bank mergers and acquisitions',
      ],
    },
  },
  {
    id: 'ma',
    tr: {
      title: 'Birleşme ve Devralmalar / Şirketler Hukuku',
      lede: 'Yerli ve yabancı müvekkillerimize birleşme, devralma ve kurumsal yapılanma süreçlerinde uçtan uca hukuki danışmanlık sunuyoruz.',
      services: [
        'Hukuki durum tespiti (due diligence)',
        'Hisse devir sözleşmesi (SPA) müzakereleri',
        'Pay sahipleri sözleşmeleri ve ortak girişim yapıları',
        'Şirket birleşmeleri, bölünmeleri ve tür değişiklikleri',
        'Kurumsal yönetim ve yönetim kurulu danışmanlığı',
      ],
    },
    en: {
      title: 'M&A & Corporate',
      lede: 'We provide end-to-end legal counsel to domestic and foreign clients in mergers, acquisitions and corporate restructuring transactions.',
      services: [
        'Legal due diligence',
        'Share purchase agreement (SPA) negotiations',
        'Shareholders’ agreements and joint venture structures',
        'Mergers, demergers and conversions',
        'Corporate governance and board advisory',
      ],
    },
  },
  {
    id: 'privatization',
    tr: {
      title: 'Özelleştirme',
      lede: 'Özelleştirme sürecinin farklı aşamalarında müvekkillerimizi düzenli olarak temsil ediyor; kamu varlığı devirlerinde stratejik danışmanlık sağlıyoruz.',
      services: [
        'Özelleştirme ihale süreçleri ve teklif hazırlığı',
        'Yatırım komitesi ve düzenleyici onaylar',
        'Devir sonrası entegrasyon ve yeniden yapılandırma',
        'KÖİ (kamu-özel ortaklığı) işlemleri',
      ],
    },
    en: {
      title: 'Privatization',
      lede: 'Verdi regularly represents clients at different stages of the privatization process and provides strategic counsel on public asset transfers.',
      services: [
        'Privatization tender processes and bid preparation',
        'Investment committee and regulatory approvals',
        'Post-transfer integration and restructuring',
        'Public-private partnership (PPP) transactions',
      ],
    },
  },
  {
    id: 'capital-markets',
    tr: {
      title: 'Sermaye Piyasaları',
      lede: 'Borç ve özsermaye finansmanlarında yatırım bankalarını, aracı kurumları ve ihraççıları temsil ediyor; SPK süreçlerini uçtan uca yürütüyoruz.',
      services: [
        'Halka arz ve izahname hazırlığı',
        'Tahvil, bono ve Eurobond ihraçları',
        'Yatırım fonu ve girişim sermayesi fonu kuruluşu',
        'SPK düzenlemelerine uyum ve kamuyu aydınlatma',
        'BİST kotasyonu ve sürekli yükümlülükler',
      ],
    },
    en: {
      title: 'Capital Markets',
      lede: 'We represent investment banks, underwriters and issuers in debt and equity financing and manage CMB processes end-to-end.',
      services: [
        'IPOs and prospectus preparation',
        'Bond, note and Eurobond issuances',
        'Investment fund and venture capital fund establishment',
        'CMB compliance and public disclosure',
        'BIST listing and ongoing obligations',
      ],
    },
  },
  {
    id: 'dispute',
    tr: {
      title: 'Uyuşmazlık Çözümü',
      lede: 'Müvekkillerimizi geniş bir ticari uyuşmazlık yelpazesinde temsil ediyor; yargı, tahkim ve alternatif çözüm yollarında stratejik destek sağlıyoruz.',
      services: [
        'Ticari ve kurumsal davalar',
        'Ulusal ve uluslararası tahkim (ISTAC, ICC, UNCITRAL)',
        'Arabuluculuk ve uzlaşma süreçleri',
        'İcra ve iflas takipleri',
        'İdari yargı ve düzenleyici uyuşmazlıklar',
      ],
    },
    en: {
      title: 'Dispute Resolution',
      lede: 'Verdi represents its clients in a variety of commercial disputes and provides strategic support in litigation, arbitration and alternative resolution.',
      services: [
        'Commercial and corporate litigation',
        'Domestic and international arbitration (ISTAC, ICC, UNCITRAL)',
        'Mediation and settlement procedures',
        'Enforcement and bankruptcy proceedings',
        'Administrative litigation and regulatory disputes',
      ],
    },
  },
  {
    id: 'competition',
    tr: {
      title: 'Rekabet Hukuku',
      lede: 'Çalışma alanlarımız rekabet hukukunun tüm yönlerini kapsıyor; Rekabet Kurulu nezdinde başvuru, soruşturma ve uyum programlarında destek sağlıyoruz.',
      services: [
        'Birleşme ve devralma izin başvuruları',
        'Kartel ve hâkim durum soruşturmaları',
        'Pişmanlık (leniency) başvuruları',
        'Rekabet uyum programları ve eğitim',
        'Dikey anlaşmalar ve dağıtım sistemleri',
      ],
    },
    en: {
      title: 'Competition',
      lede: 'Our practice encompasses the full range of antitrust and competition law advice, including TCA filings, investigations and compliance programs.',
      services: [
        'Merger and acquisition clearance filings',
        'Cartel and dominance investigations',
        'Leniency applications',
        'Competition compliance programs and training',
        'Vertical agreements and distribution systems',
      ],
    },
  },
  {
    id: 'foreign-investment',
    tr: {
      title: 'Yabancı Yatırım',
      lede: 'Yabancı müvekkillerimize Türkiye’deki yatırımlarının her aşamasında — kuruluştan çıkışa — kapsamlı hukuki danışmanlık sunuyoruz.',
      services: [
        'Türkiye’de şirket kuruluşu ve yabancı sermaye yapıları',
        'Yatırım teşvikleri ve sektörel izinler',
        'Sözleşme müzakereleri ve uyum',
        'Vergi yapılandırması (ortak müşavirler ile)',
        'Çalışma izinleri ve göçmenlik danışmanlığı',
      ],
    },
    en: {
      title: 'Foreign Investment',
      lede: 'We advise our foreign clients in all aspects of their investment in Turkey — from market entry to exit.',
      services: [
        'Company formation and foreign capital structures',
        'Investment incentives and sector-specific permits',
        'Contract negotiation and compliance',
        'Tax structuring (with affiliated advisors)',
        'Work permits and immigration advisory',
      ],
    },
  },
  {
    id: 'ip',
    tr: {
      title: 'Fikri Mülkiyet',
      lede: 'Fikri mülkiyet varlıklarının yaratılması, devralınması, lisanslanması ve Türkiye’de korunmasına ilişkin tüm süreçlerde destek sağlıyoruz.',
      services: [
        'Marka, patent ve tasarım tescili',
        'IP varlık devirleri ve lisans sözleşmeleri',
        'Marka ihlali ve haksız rekabet davaları',
        'Telif hakları ve dijital içerik koruma',
        'Ticari sır ve know-how yönetimi',
      ],
    },
    en: {
      title: 'Intellectual Property',
      lede: 'We assist with the creation, acquisition, divestiture, licensing and protection of IP assets in Turkey.',
      services: [
        'Trademark, patent and design registration',
        'IP asset transfers and licensing agreements',
        'Trademark infringement and unfair competition litigation',
        'Copyright and digital content protection',
        'Trade secret and know-how management',
      ],
    },
  },
  {
    id: 'it',
    tr: {
      title: 'Bilgi Teknolojileri ve İletişim',
      lede: 'Teknoloji ve iletişim sektörlerinin kendine özgü hukuki ihtiyaçlarına yönelik uzmanlık alanlarımızla danışmanlık sağlıyoruz.',
      services: [
        'KVKK ve GDPR uyum süreçleri',
        'Yazılım lisansı ve SaaS sözleşmeleri',
        'BTK düzenlemelerine uyum',
        'E-ticaret ve dijital ödeme hizmetleri',
        'Siber güvenlik ve veri ihlali yönetimi',
      ],
    },
    en: {
      title: 'IT & Communications',
      lede: 'We provide sector-specific legal counsel addressing the unique challenges of the technology and communications sectors.',
      services: [
        'KVKK and GDPR compliance',
        'Software licensing and SaaS agreements',
        'ICTA regulatory compliance',
        'E-commerce and digital payment services',
        'Cybersecurity and data breach management',
      ],
    },
  },
];

// Ortak başlık standartları (Home ile aynı)
const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#B08A4C]';
const SECTION_TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#0F1E1A] md:text-4xl';

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

  return (
    <div className="min-h-screen bg-[#F0EBE0] text-[#0F1E1A]">
      <Navbar />

      {/* Hero */}
      <section data-nav-theme="dark" className="relative overflow-hidden bg-[#072821] text-white">
        <img
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=2400&q=90"
          alt={language === 'tr' ? 'Hukuk kütüphanesi' : 'Law library'}
          className="absolute inset-0 h-full w-full object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/55" />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/30 to-ink/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 pt-40 pb-24">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#D9B97A]">
              {language === 'tr' ? 'Uzmanlık Alanlarımız' : 'Our Practice Areas'}
            </p>
            <h1 className="mt-6 font-fraunces text-3xl font-semibold leading-tight text-white md:text-4xl">
              {language === 'tr'
                ? 'Her sektör için derin uzmanlık.'
                : 'Deep expertise across every sector.'}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              {language === 'tr'
                ? 'Kurumsal müvekkillerimize, yabancı yatırımcılara ve bireylere geniş bir hukuki uzmanlık yelpazesinde sonuç odaklı çözümler sunuyoruz.'
                : 'We provide result-oriented solutions to corporate clients, foreign investors and individuals across a broad spectrum of legal expertise.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Content: sticky sidebar nav + detail blocks */}
      <section data-nav-theme="light" className="mx-auto max-w-7xl px-6 lg:px-8 py-20 grid gap-12 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <p className={`${EYEBROW_CLS} mb-6`}>
            {language === 'tr' ? 'Alanlar' : 'Areas'}
          </p>
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
                          ? 'border-[#B08A4C] text-[#0F1E1A] font-semibold opacity-100'
                          : 'border-transparent text-[#525A52] hover:text-[#0F1E1A] hover:border-[#D5D0BF] opacity-40 hover:opacity-80'
                      }`}
                    >
                      <span className="text-xs font-mono text-[#8A8D7E]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span>{area[language].title}</span>
                      <ChevronRight
                        className={`ml-auto h-3.5 w-3.5 transition ${
                          isActive ? 'translate-x-1 text-[#B08A4C]' : 'opacity-0 group-hover:opacity-100'
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
                className={`scroll-mt-32 border-b border-[#D5D0BF] py-14 first:pt-0 last:border-b-0 transition-all duration-500 origin-left ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-25 scale-[0.98]'
                }`}
              >
                <Reveal>
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-fraunces text-5xl font-semibold text-[#d4c4a3]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-fraunces text-3xl font-semibold leading-tight text-[#0F1E1A] md:text-4xl">
                      {content.title}
                    </h2>
                  </div>
                  <p className="text-lg leading-8 text-[#525A52] max-w-3xl">
                    {content.lede}
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <div className="mt-8">
                    <p className={`${EYEBROW_CLS} mb-5`}>
                      {language === 'tr' ? 'Hizmetlerimiz' : 'Services'}
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {content.services.map((s, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 border-l-2 border-[#D5D0BF] pl-4 py-2 text-[15px] text-[#3a3a3a] hover:border-[#B08A4C] transition-colors"
                        >
                          <span className="font-mono text-xs text-[#8A8D7E] mt-1.5 shrink-0">
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
                      className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-[#0F1E1A] text-xs"
                    >
                      {language === 'tr' ? 'Bu konuda danışın' : 'Get advice'}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </a>
                    <a
                      href="/ekibimiz"
                      className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B08A4C] hover:text-[#0F1E1A] transition"
                    >
                      {language === 'tr' ? 'İlgili ekip' : 'Related team'}
                    </a>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
