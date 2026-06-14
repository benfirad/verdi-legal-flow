import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import { Users, Sparkles, Building2, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal, StaggerList, itemVariants } from '@/components/motion/Reveal';

// Tipografi standardı (Home/PracticeAreas ile aynı)
const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7A8C]';
const EYEBROW_DARK_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#B8CCDA]';
const SECTION_TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#1A2530] md:text-4xl';

const STATS = [
  { value: '12+', label: { tr: 'Seçkin Oturum', en: 'Featured Sessions' } },
  { value: '450+', label: { tr: 'Kreatif Katılımcı', en: 'Creative Attendees' } },
  { value: '1950+', label: { tr: 'Öncü Konuşmacı', en: 'Keynote Speakers' } },
  { value: '22+', label: { tr: 'Uluslararası Ortak', en: 'Global Partners' } },
];

const VALUES = [
  {
    icon: Users,
    title: { tr: 'Yaratıcı Topluluk', en: 'Creative Community' },
    desc: {
      tr: 'Yaratıcı endüstrilerin her alanından profesyonelleri bir araya getirerek güçlü ve esnek bir paylaşım ekosistemi oluşturuyoruz.',
      en: 'By bringing together professionals from all fields of creative industries, we create a strong and flexible sharing ecosystem.',
    },
  },
  {
    icon: Sparkles,
    title: { tr: 'Yenilikçi Yaklaşım', en: 'Innovative Approach' },
    desc: {
      tr: 'Tasarım trendleri, yapay zekalı sanat ve gelecek teknolojilerinde en yeni akımları takip ediyor ve katılımcılarımızla paylaşıyoruz.',
      en: 'We follow the latest trends in design, AI art, and future technologies, sharing them with our attendees.',
    },
  },
  {
    icon: MessageSquare,
    title: { tr: 'Etkileşimli Atölyeler', en: 'Interactive Workshops' },
    desc: {
      tr: 'Sadece teorik sunumlar değil, uzman eğitmenler eşliğinde uygulamalı ve pratik öğrenme deneyimleri sunuyoruz.',
      en: 'Not just theoretical presentations, we offer hands-on and practical learning experiences guided by expert instructors.',
    },
  },
  {
    icon: Building2,
    title: { tr: 'Sürdürülebilir Tasarım', en: 'Sustainable Design' },
    desc: {
      tr: 'Çevre dostu, erişilebilir (A11y) ve etik tasarım prensiplerini destekleyerek geleceğin dijital dünyasını daha yaşanabilir kılmayı hedefliyoruz.',
      en: 'We aim to make the future digital world more livable by supporting eco-friendly, accessible (A11y), and ethical design principles.',
    },
  },
  {
    icon: Sparkles,
    title: { tr: 'Geniş İş Ortaklıkları', en: 'Broad Partnerships' },
    desc: {
      tr: 'Sektörün lider ajansları, teknoloji devleri ve bağımsız tasarımcılar ile ortaklıklar kurarak ekosistemi zenginleştiriyoruz.',
      en: 'We enrich the ecosystem by establishing partnerships with leading agencies, tech giants, and independent designers.',
    },
  },
];

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#E8ECEF] text-[#1A2530] min-h-screen">
      <Navbar />

      {/* ── Tecrübe vurgusu (en üst, sola hizalı) ── */}
      <section data-nav-theme="light" className="sticky top-0 z-10 bg-[#E8ECEF] border-b border-[#C8CFD3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-28">
          <Reveal>
            <div className="grid items-end gap-8 md:grid-cols-[auto_1fr_auto] md:gap-12">
              <span className="block font-fraunces text-[140px] md:text-[200px] leading-[0.85] font-semibold text-[#1A2530]">
                12<span className="text-[#5A7A8C]">+</span>
              </span>
              <div className="md:pb-6">
                <p className="mt-4 max-w-md text-lg leading-8 text-[#4D5660]">
                  {language === 'tr'
                    ? 'Yaratıcı zihinleri bir araya getiren zirvemiz, tasarım ve geleceğin teknolojilerinde ilham verici bir deneyim sunuyor.'
                    : 'Bringing creative minds together, our summit offers an inspiring experience in design and future technologies.'}
                </p>
              </div>
              {/* Sağ aksent */}
              <div className="hidden md:flex md:pb-6 items-center gap-3">
                <div className="h-px w-12 bg-[#5A7A8C]" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Biz Kimiz + Kuruluşumuz ve Vizyonumuz (stack layer 2) ── */}
      <section data-nav-theme="light" className="relative z-20 bg-white border-b border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.15)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-14">
            {/* Biz Kimiz */}
            <Reveal>
              <h2 className={SECTION_TITLE_CLS}>
                {language === 'tr'
                  ? 'İstanbul merkezli, uluslararası kreatif ve teknolojik toplulukları buluşturan yenilikçi bir zirve.'
                  : 'An Istanbul-based innovative summit bringing together global creative and tech communities.'}
              </h2>
              <div className="mt-8 space-y-6 text-[17px] leading-8 text-[#4D5660]">
                <p>
                  {language === 'tr'
                    ? 'Redmono Creative Summit, tasarımcılar, yazılımcılar, sanatçılar ve marka stratejistleri için en yeni trendlerin paylaşıldığı benzersiz bir buluşma noktasıdır.'
                    : 'Redmono Creative Summit is a unique meeting point where the latest trends are shared for designers, developers, artists, and brand strategists.'}
                </p>
                <p>
                  {language === 'tr'
                    ? 'UX/UI Tasarım, Marka Kimliği, Yapay Zeka & Sanat, Web3 ve Yaratıcı Liderlik gibi başlıklar altında zengin içerik ve uygulamalı atölye çalışmaları sunuyoruz.'
                    : 'We offer rich content and hands-on workshops under tracks like UX/UI Design, Brand Identity, AI & Art, Web3, and Creative Leadership.'}
                </p>
              </div>
            </Reveal>

            <div className="border-t border-[#D6DCE0]" />

            {/* Kuruluşumuz ve Vizyonumuz */}
            <Reveal delay={0.1} from="right">
              <h2 className={SECTION_TITLE_CLS}>
                {language === 'tr'
                  ? 'Tasarım ve yaratıcılığın sınırlarını zorlamak amacıyla yola çıktık.'
                  : 'We set out to push the boundaries of design and creativity.'}
              </h2>
              <div className="mt-8 space-y-6 text-[17px] leading-8 text-[#4D5660]">
                <p>
                  {language === 'tr'
                    ? 'Zirvemiz, Redmono Creative Agency tarafından, yaratıcı dünyayı geleceğin teknolojileriyle birleştirmek ve ortak bir sinerji alanı oluşturmak üzere kurgulanmıştır.'
                    : 'Our summit is designed by Redmono Creative Agency to combine the creative world with future technologies and establish a shared synergy.'}
                </p>
                <p>
                  {language === 'tr'
                    ? 'Temel ilkelerimiz; etik tasarım standartlarını yaygınlaştırmak, kapsayıcılık ve erişilebilirliği gözetmek, genç yetenekleri desteklemek ve dijital ekosistemi büyütmektir.'
                    : 'Our core principles are: promoting ethical design standards, observing exclusivity and accessibility, supporting young talents, and growing the digital ecosystem.'}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} from="right" className="lg:sticky lg:top-32">
            <figure className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=900&q=85"
                  alt="Redmono Creative Summit"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border border-[#5A7A8C]/30 pointer-events-none" />
              <figcaption className="absolute -top-4 -left-4 bg-[#5A7A8C] text-[#E8ECEF] px-5 py-3">
                <span className="font-fraunces text-2xl font-bold">Est.</span>
                <p className="text-xs text-[#E8ECEF]/70 tracking-wider uppercase mt-0.5">
                  {language === 'tr' ? 'Kuruluş' : 'Founded'}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── Tek Hedef (stack layer 3) ── */}
      <section data-nav-theme="light" className="relative z-30 bg-[#E8ECEF] border-b border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.15)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
          <Reveal>
            <h2 className={SECTION_TITLE_CLS}>
              {language === 'tr' ? 'Yaratıcı ve gelecek odaklı vizyon.' : 'Creative and future-oriented vision.'}
            </h2>
            <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-[#4D5660]">
              {language === 'tr'
                ? 'Katılımcılarımızın ve konuşmacılarımızın vizyoner fikirlerini destekliyor, zirve boyunca sürecek etkileşimlerle yeni iş birliklerine kapı açıyoruz.'
                : 'We support the visionary ideas of our attendees and speakers, opening doors to new collaborations through interactions throughout the summit.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Değerlerimiz (interaktif showcase) ── */}
      <ValuesShowcase language={language} />
      {/* renk uyumu için aşağıdaki container'da bir border ayraç kalır */}

      <div className="relative z-50">
        <Footer />
      </div>
    </div>
  );
}

// ── Değerlerimiz — scroll ile aktifleşen showcase ──
function ValuesShowcase({ language }) {
  const containerRef = useRef(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(VALUES.length - 1, Math.max(0, Math.floor(latest * VALUES.length)));
    setActive(idx);
  });

  const current = VALUES[active];
  const ActiveIcon = current.icon;

  return (
    <section
      ref={containerRef}
      data-nav-theme="light"
      className="relative z-40 bg-white border-b border-[#C8CFD3] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.15)]"
      style={{ height: `${VALUES.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full">
          <div className="mb-10 max-w-2xl">
            <WordReveal
              text={
                language === 'tr'
                  ? 'Çalışma anlayışımızın temelini oluşturan ilkeler.'
                  : 'The principles that form the foundation of our practice.'
              }
              className="font-fraunces text-3xl font-semibold leading-tight text-[#1A2530] md:text-4xl"
            />
          </div>

          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] items-stretch">
            {/* Sol: animasyonlu ikon paneli */}
            <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[420px] overflow-hidden bg-ink">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                  backgroundImage:
                    'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
              <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cobalt/30 blur-[100px]" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#5A7A8C]/20 blur-[100px]" />

              <img
                src="/assets/werdylogo.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 m-auto w-2/3 object-contain brightness-0 invert opacity-[0.07]"
              />

              <div className="relative z-10 h-full w-full flex flex-col items-center justify-center p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.85, rotate: 8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-32 h-32 md:w-40 md:h-40 border border-[#B8CCDA]/40 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center"
                  >
                    <ActiveIcon className="w-14 h-14 md:w-16 md:h-16 text-[#B8CCDA]" strokeWidth={1.4} />
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={`num-${active}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="mt-8 font-fraunces text-4xl md:text-5xl font-semibold text-white"
                  >
                    {String(active + 1).padStart(2, '0')}
                    <span className="text-[#B8CCDA]">/{String(VALUES.length).padStart(2, '0')}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Sağ: değişen yazı + scroll progress göstergesi */}
            <div className="flex flex-col">
              {/* Dikey progress + numaralı göstergeler */}
              <div className="mb-10 flex items-center gap-6">
                <div className="relative h-1 flex-1 bg-[#D6DCE0] overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#5A7A8C]"
                    style={{ width: `${((active + 1) / VALUES.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-xs font-mono text-[#A8B0B5] whitespace-nowrap">
                  {String(active + 1).padStart(2, '0')} / {String(VALUES.length).padStart(2, '0')}
                </span>
              </div>

              {/* İçerik (geçişli) */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${active}`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3 className="font-fraunces text-3xl md:text-4xl font-semibold leading-tight text-[#1A2530]">
                      {current.title[language]}
                    </h3>
                    <p className="mt-6 text-[17px] leading-8 text-[#4D5660]">
                      {current.desc[language]}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Tüm değerlerin küçük listesi */}
              <ul className="mt-10 grid grid-cols-5 gap-1">
                {VALUES.map((v, i) => (
                  <li
                    key={i}
                    className={`text-[10px] uppercase tracking-[0.15em] py-3 border-t-2 transition-colors ${
                      active === i
                        ? 'border-[#5A7A8C] text-[#1A2530] font-semibold'
                        : 'border-[#D6DCE0] text-[#A8B0B5]'
                    }`}
                  >
                    <span className="font-mono mr-1">{String(i + 1).padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] text-[#A8B0B5]">
            {language === 'tr' ? 'Aşağı kaydırın' : 'Scroll down'} ↓
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Kelime-kelime dramatik reveal ──
function WordReveal({ text, className = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const words = text.split(' ');

  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0, rotateX: -45 }}
            animate={inView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
            transition={{
              duration: 0.85,
              delay: i * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ transformOrigin: '0% 100%' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}
