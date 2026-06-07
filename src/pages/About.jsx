import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent } from 'framer-motion';
import { Users, Scale, Sparkles, Building2, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal, StaggerList, itemVariants } from '@/components/motion/Reveal';

// Tipografi standardı (Home/PracticeAreas ile aynı)
const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6f3d]';
const EYEBROW_DARK_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#c8b68c]';
const SECTION_TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-4xl';

const STATS = [
  { value: '20+', label: { tr: 'Yıllık Tecrübe', en: 'Years of Experience' } },
  { value: '300+', label: { tr: 'Kurumsal Müvekkil', en: 'Corporate Clients' } },
  { value: '1500+', label: { tr: 'Tamamlanan Dava', en: 'Completed Cases' } },
  { value: '15+', label: { tr: 'Ülkede Faaliyet', en: 'Countries Served' } },
];

const VALUES = [
  {
    icon: Users,
    title: { tr: 'Müvekkil Odaklılık', en: 'Client Focus' },
    desc: {
      tr: 'Müvekkillerimizin ihtiyaçlarını derinlemesine anlamak, menfaatlerini en iyi şekilde temsil etmek ve haklarını korumak temel önceliğimizdir. Her dosyaya özgü, hızlı ve nitelikli çözümler üretmek için çalışırız.',
      en: 'Understanding our clients’ needs in depth, representing their interests in the best possible way and protecting their rights is our primary priority. We work to produce case-specific, fast and high-quality solutions.',
    },
  },
  {
    icon: Scale,
    title: { tr: 'Profesyonel Hizmet Anlayışı', en: 'Professional Service' },
    desc: {
      tr: 'Mesleki etik kurallara, dürüstlük ve şeffaflık ilkelerine bağlı kalarak yüksek uzmanlık gerektiren çözümler sunar; müvekkil memnuniyetini en üst düzeyde tutmayı hedefleriz.',
      en: 'Adhering to professional ethics, honesty and transparency, we provide solutions requiring high expertise and aim to keep client satisfaction at the highest level.',
    },
  },
  {
    icon: Sparkles,
    title: { tr: 'Sürekli Gelişim ve Eğitim', en: 'Continuous Development' },
    desc: {
      tr: 'Hukukun dinamik yapısını, mevzuat değişikliklerini ve hukuk teknolojilerini yakından takip eder; dijital dönüşümü, akademik çalışmaları ve yeni hizmet alanlarının geliştirilmesini önemseriz.',
      en: 'We closely follow the dynamic structure of law, legislative changes and legal technologies; we value digital transformation, academic work and the development of new service areas.',
    },
  },
  {
    icon: Building2,
    title: { tr: 'Verimli ve Saygın İş Ortamı', en: 'Productive Workplace' },
    desc: {
      tr: 'Çalışanlarımıza verimli bir iş ortamı sunar, yetkinliklerini geliştirir; açık iletişim, mentorluk ve esnek çalışma olanaklarıyla kişisel ve kariyer gelişimini destekleriz.',
      en: 'We offer our employees a productive work environment, develop their competencies and support personal and career growth through open communication, mentorship and flexible working arrangements.',
    },
  },
  {
    icon: MessageSquare,
    title: { tr: 'İletişim ve Erişilebilirlik', en: 'Communication & Accessibility' },
    desc: {
      tr: 'Karmaşık hukuki konuları anlaşılır bir dille aktarmayı, geri bildirim mekanizmaları ve teknoloji aracılığıyla saygılı ve profesyonel iletişimi güçlendirmeyi taahhüt ederiz.',
      en: 'We are committed to explaining complex legal matters in clear language and strengthening respectful, professional communication through feedback mechanisms and technology.',
    },
  },
];

export default function About() {
  const { language } = useLanguage();

  return (
    <div className="bg-[#f6f4ef] text-[#202020] min-h-screen">
      <Navbar />

      {/* ── Tecrübe vurgusu (en üst, sola hizalı) ── */}
      <section data-nav-theme="light" className="bg-[#f6f4ef] border-b border-[#d8d0bf]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-28">
          <Reveal>
            <div className="grid items-end gap-8 md:grid-cols-[auto_1fr_auto] md:gap-12">
              <span className="block font-fraunces text-[140px] md:text-[200px] leading-[0.85] font-semibold text-[#1f1f1f]">
                20<span className="text-[#8b6f3d]">+</span>
              </span>
              <div className="md:pb-6">
                <p className="text-xs uppercase tracking-[0.35em] text-[#8b6f3d] font-semibold">
                  {language === 'tr' ? 'Yıllık Tecrübe' : 'Years of Experience'}
                </p>
                <p className="mt-4 max-w-md text-lg leading-8 text-[#5f5b52]">
                  {language === 'tr'
                    ? '2003’ten bu yana yerli ve uluslararası iş dünyasına kesintisiz hukuki danışmanlık veriyoruz.'
                    : 'Since 2003, we have been providing uninterrupted legal counsel to domestic and international business.'}
                </p>
              </div>
              {/* Sağ aksent */}
              <div className="hidden md:flex md:pb-6 items-center gap-3">
                <div className="h-px w-12 bg-[#8b6f3d]" />
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#8b6f3d] font-semibold whitespace-nowrap">
                  {language === 'tr' ? '2003 — Bugün' : '2003 — Today'}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Biz Kimiz + Kuruluşumuz ve Vizyonumuz ── */}
      <section data-nav-theme="light" className="bg-white border-b border-[#d8d0bf]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-14">
            {/* Biz Kimiz */}
            <Reveal>
              <p className={EYEBROW_CLS}>
                {language === 'tr' ? 'Biz Kimiz' : 'Who We Are'}
              </p>
              <h2 className={SECTION_TITLE_CLS}>
                {language === 'tr'
                  ? 'İstanbul merkezli, uluslararası ölçekte hizmet veren bir hukuk bürosu.'
                  : 'An Istanbul-based law firm serving on an international scale.'}
              </h2>
              <div className="mt-8 space-y-6 text-[17px] leading-8 text-[#5f5b52]">
                <p>
                  {language === 'tr'
                    ? 'Verdi Hukuk Bürosu, yabancı yatırımcılara ve Türk iş dünyasının kurumsal aktörlerine geniş bir uzmanlık yelpazesi içinde hukuki danışmanlık ve dava takip hizmeti sunan, deneyimli avukatlardan oluşan bir ekiptir.'
                    : 'Verdi Law Firm is a team of experienced attorneys providing legal advisory and dispute resolution services to foreign investors and Turkish corporate actors across a broad range of expertise.'}
                </p>
                <p>
                  {language === 'tr'
                    ? 'Şirketler hukuku, sermaye piyasaları, birleşme ve devralmalar, rekabet hukuku, bankacılık ve finans, vergi hukuku, gayrimenkul, proje geliştirme, enerji ve altyapı hukuku ile dava, tahkim ve idari uyuşmazlıklar başlıca çalışma alanlarımız arasında yer almaktadır.'
                    : 'Our principal practice areas include corporate law, capital markets, mergers and acquisitions, competition law, banking and finance, tax law, real estate, project development, energy and infrastructure law as well as litigation, arbitration and administrative disputes.'}
                </p>
              </div>
            </Reveal>

            <div className="border-t border-[#e4dccb]" />

            {/* Kuruluşumuz ve Vizyonumuz */}
            <Reveal delay={0.1} from="right">
              <p className={EYEBROW_CLS}>
                {language === 'tr' ? 'Kuruluşumuz ve Vizyonumuz' : 'Our Foundation and Vision'}
              </p>
              <h2 className={SECTION_TITLE_CLS}>
                {language === 'tr'
                  ? '2003 yılında, sonuç odaklı bir hukuk anlayışıyla kuruldu.'
                  : 'Founded in 2003 with a result-oriented approach to law.'}
              </h2>
              <div className="mt-8 space-y-6 text-[17px] leading-8 text-[#5f5b52]">
                <p>
                  {language === 'tr'
                    ? 'Verdi Hukuk Bürosu, kurucu ortağımız Av. Mehmet Verdi tarafından, yerli ve yabancı iş dünyasına uluslararası standartlarda sonuç odaklı, yaratıcı, yenilikçi, hızlı ve nitelikli hukuki çözümler sunma anlayışıyla kurulmuştur.'
                    : 'Verdi Law Firm was founded by our founding partner Att. Mehmet Verdi with the philosophy of delivering result-oriented, creative, innovative, rapid and high-quality legal solutions to domestic and foreign business communities according to international standards.'}
                </p>
                <p>
                  {language === 'tr'
                    ? 'Kuruluş ilkelerimiz; sektörde güven ve saygınlığı korumak, mesleki etik ve dürüstlükten ödün vermemek, üst düzey uzmanlık ve bilgi birikimine sahip olmak, çalışanlarımızın sürekli gelişimini desteklemek ve hukukun üstünlüğüne ve sosyal sorumluluğa bağlı kalmaktır.'
                    : 'Our founding principles are: maintaining trust and respect in the sector, upholding professional ethics and integrity, building high-level expertise and knowledge, supporting the continuous development of our employees, and remaining committed to the rule of law and social responsibility.'}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} from="right" className="lg:sticky lg:top-32">
            <figure className="relative">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=900&q=80"
                  alt="Verdi Hukuk Bürosu"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border border-[#8b6f3d]/30 pointer-events-none" />
              <figcaption className="absolute -top-4 -left-4 bg-[#8b6f3d] text-[#f6f4ef] px-5 py-3">
                <span className="font-fraunces text-2xl font-bold">2003</span>
                <p className="text-xs text-[#f6f4ef]/70 tracking-wider uppercase mt-0.5">
                  {language === 'tr' ? 'Kuruluş' : 'Founded'}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ── Tek Hedef ── */}
      <section data-nav-theme="light" className="bg-[#f6f4ef] border-b border-[#d8d0bf]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
          <Reveal>
            <p className={EYEBROW_CLS}>
              {language === 'tr' ? 'Tek Hedef' : 'One Objective'}
            </p>
            <h2 className={SECTION_TITLE_CLS}>
              {language === 'tr' ? 'Müvekkil odaklı çözümler.' : 'Client-centered solutions.'}
            </h2>
            <p className="mt-8 max-w-3xl mx-auto text-lg leading-8 text-[#5f5b52]">
              {language === 'tr'
                ? 'Her müvekkilimizin ticari hedeflerini, sektörel dinamiklerini ve risk eşiklerini bütünsel olarak değerlendirir; üretilen hukuki çözümün gerçek dünyada uygulanabilir, hızlı ve değer yaratan bir sonuç doğurmasını sağlarız.'
                : 'We assess each client’s commercial objectives, sector dynamics and risk thresholds holistically, ensuring that the legal solutions we produce are practical, swift and value-generating in the real world.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Değerlerimiz (interaktif showcase) ── */}
      <ValuesShowcase language={language} />
      {/* renk uyumu için aşağıdaki container'da bir border ayraç kalır */}

      <Footer />
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
      className="relative bg-white border-b border-[#d8d0bf]"
      style={{ height: `${VALUES.length * 90}vh` }}
    >
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full">
          <Reveal>
            <div className="mb-10 max-w-2xl">
              <p className={EYEBROW_CLS}>
                {language === 'tr' ? 'Değerlerimiz' : 'Our Values'}
              </p>
              <h2 className={SECTION_TITLE_CLS}>
                {language === 'tr'
                  ? 'Çalışma anlayışımızın temelini oluşturan ilkeler.'
                  : 'The principles that form the foundation of our practice.'}
              </h2>
            </div>
          </Reveal>

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
              <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#8b6f3d]/20 blur-[100px]" />

              <img
                src="/assets/verdilogo.png"
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
                    className="w-32 h-32 md:w-40 md:h-40 border border-[#c8b68c]/40 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center"
                  >
                    <ActiveIcon className="w-14 h-14 md:w-16 md:h-16 text-[#c8b68c]" strokeWidth={1.4} />
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
                    <span className="text-[#c8b68c]">/{String(VALUES.length).padStart(2, '0')}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Sağ: değişen yazı + scroll progress göstergesi */}
            <div className="flex flex-col">
              {/* Dikey progress + numaralı göstergeler */}
              <div className="mb-10 flex items-center gap-6">
                <div className="relative h-1 flex-1 bg-[#e4dccb] overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-[#8b6f3d]"
                    style={{ width: `${((active + 1) / VALUES.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <span className="text-xs font-mono text-[#9a8c70] whitespace-nowrap">
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
                    <p className={`${EYEBROW_CLS} mb-4`}>
                      {language === 'tr'
                        ? `Değer ${String(active + 1).padStart(2, '0')}`
                        : `Value ${String(active + 1).padStart(2, '0')}`}
                    </p>
                    <h3 className="font-fraunces text-3xl md:text-4xl font-semibold leading-tight text-[#1f1f1f]">
                      {current.title[language]}
                    </h3>
                    <p className="mt-6 text-[17px] leading-8 text-[#5f5b52]">
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
                        ? 'border-[#8b6f3d] text-[#1f1f1f] font-semibold'
                        : 'border-[#e4dccb] text-[#9a8c70]'
                    }`}
                  >
                    <span className="font-mono mr-1">{String(i + 1).padStart(2, '0')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-center text-[10px] uppercase tracking-[0.3em] text-[#9a8c70]">
            {language === 'tr' ? 'Aşağı kaydırın' : 'Scroll down'} ↓
          </p>
        </div>
      </div>
    </section>
  );
}
