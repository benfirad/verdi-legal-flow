import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { teamMembers } from '@/lib/teamData';
import { PRACTICE_AREAS } from './PracticeAreasPage';
import { Reveal, StaggerList, Enter, itemVariants, CARD_EASE } from '@/components/motion/Reveal';

// Tüm bölüm başlıkları için ortak standart — Hakkımızda bloğuyla aynı oran
const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6f3d]';
const SECTION_TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-4xl';
const SUB_TITLE_CLS = 'font-fraunces text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-4xl';

// (Reveal, StaggerList, itemVariants ortak modülden geliyor)

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <Reveal>
        <p className={EYEBROW_CLS}>{eyebrow}</p>
        <h2 className={SECTION_TITLE_CLS}>{title}</h2>
      </Reveal>
      {action && (
        <Reveal delay={0.1} from="right">
          {action}
        </Reveal>
      )}
    </div>
  );
}

export default function Home() {
  const { language, t } = useLanguage();
  const featuredTeam = teamMembers.filter((m) => m.position === 'partner');
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
    <div className="min-h-screen bg-[#f6f4ef] text-[#202020]">
      <Navbar />

      <main>
        {/* ── Hero (stack layer 1) ── */}
        <section id="home" data-nav-theme="dark" className="sticky top-0 z-10 min-h-[760px] overflow-hidden bg-[#05070b] text-white lg:h-screen lg:min-h-screen">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=90"
            alt={language === 'tr' ? 'Modern iş merkezi cephesi' : 'Modern business tower facade'}
            className="absolute inset-0 h-full w-full object-cover object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1840px] flex-col justify-end px-7 pb-0 pt-28 lg:min-h-screen lg:px-16">
            <div className="mb-24 grid w-full max-w-[1680px] gap-8 lg:mb-28 lg:ml-4 lg:grid-cols-[minmax(0,1180px)_260px] lg:items-end lg:gap-16">
              <Enter delay={0.3}>
                <p className="max-w-none text-xl font-normal leading-snug text-white/92 lg:text-[26px] xl:text-[28px]">
                  {language === 'tr'
                    ? 'Hukuki danışmanlık alanında Verdi, hizmetlerini derin hukuki deneyime ve farklı alanlarda tecrübeye sahip uzman avukat, danışman ve destek birimlerinden oluşan yetkin bir ekiple sunmaktadır.'
                    : 'Verdi provides legal services through a capable team of attorneys, consultants and support units with deep legal experience across distinct areas of practice.'}
                </p>
              </Enter>
              <Enter delay={0.55} from="right">
                <motion.a
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: CARD_EASE }}
                  href="/iletisim"
                  className="inline-flex h-16 w-full max-w-[220px] items-center justify-center justify-self-start border border-white/70 px-8 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#202020] lg:justify-self-end"
                >
                  {language === 'tr' ? 'İletişim' : 'Contact'}
                </motion.a>
              </Enter>
            </div>
          </div>
        </section>

        {/* ── Hakkımızda + Ortaklarımız (stack layer 2) ── */}
        <section id="about" data-nav-theme="light" className="sticky top-0 z-20 min-h-screen border-y border-[#ded8ca] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <p className={EYEBROW_CLS}>{t('about.title')}</p>
                <h2 className={`${SECTION_TITLE_CLS} max-w-md`}>
                  {language === 'tr' ? 'Stratejik hukuk danışmanlığı' : 'Strategic legal counsel'}
                </h2>
              </Reveal>
              <Reveal delay={0.15} from="right">
                <p className="max-w-3xl text-lg leading-8 text-[#5f5b52]">
                  {t('about.description')}
                </p>
              </Reveal>
            </div>

            <div className="mt-20 flex flex-col justify-between gap-6 border-t border-[#d8d0bf] pt-10 md:flex-row md:items-end">
              <Reveal>
                <h3 className={SUB_TITLE_CLS}>
                  {language === 'tr' ? 'Ekibimiz' : 'Our Team'}
                </h3>
              </Reveal>
              <Reveal delay={0.1} from="right">
                <a href="/ekibimiz" className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6d5b35]">
                  {language === 'tr' ? 'Tüm ekibi gör' : 'View entire team'}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>

            <StaggerList className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
              {featuredTeam.map((member) => {
                const title = language === 'tr' ? member.titleTr : member.titleEn;
                const initials = member.name.split(' ').map((n) => n[0]).slice(0, 2).join('');
                return (
                  <motion.article
                    key={member.id}
                    variants={itemVariants}
                    whileHover={{ y: -4, scale: 1.015 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="group"
                  >
                    <a href="/ekibimiz" className="block">
                      <div className="aspect-square overflow-hidden bg-[#e8e1d2]">
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale transition-all duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03] group-hover:grayscale-0"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-[#e8e1d2] font-fraunces text-5xl text-[#8b6f3d]">${initials}</div>`;
                          }}
                        />
                      </div>
                      <div className="border-b border-[#d8d0bf] py-5">
                        <h3 className="text-xl font-semibold text-[#202020]">{member.name}</h3>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6f3d]">
                          {title}
                        </p>
                      </div>
                    </a>
                  </motion.article>
                );
              })}
            </StaggerList>
          </div>
        </section>

        {/* ── Çalışma Alanları (stack layer 3) ── */}
        <section id="practice-areas" data-nav-theme="light" className="sticky top-0 z-30 min-h-screen bg-[#f6f4ef] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)]">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="mb-12 border-b border-[#d8d0bf] pb-8">
              <SectionHeader
                eyebrow={t('practiceAreas.title')}
                title={t('practiceAreas.subtitle')}
                action={
                  <a href="/calisma-alanlari" className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6d5b35]">
                    {language === 'tr' ? 'Tüm alanlar' : 'All practices'}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                }
              />
            </div>
            <div className="grid gap-12 lg:grid-cols-[280px_1fr] mt-12">
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
                                ? 'border-[#8b6f3d] text-[#1f1f1f] font-semibold opacity-100'
                                : 'border-transparent text-[#5f5b52] hover:text-[#1f1f1f] hover:border-[#d8d0bf] opacity-40 hover:opacity-80'
                            }`}
                          >
                            <span className="text-xs font-mono text-[#9a8c70]">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <span>{area[language].title}</span>
                            <ChevronRight
                              className={`ml-auto h-3.5 w-3.5 transition ${
                                isActive ? 'translate-x-1 text-[#8b6f3d]' : 'opacity-0 group-hover:opacity-100'
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
                      className={`scroll-mt-32 border-b border-[#d8d0bf] py-14 first:pt-0 last:border-b-0 transition-all duration-500 origin-left ${
                        isActive ? 'opacity-100 scale-100' : 'opacity-25 scale-[0.98]'
                      }`}
                    >
                      <Reveal>
                        <div className="flex items-baseline gap-4 mb-6">
                          <span className="font-fraunces text-5xl font-semibold text-[#d4c4a3]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <h2 className="font-fraunces text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-4xl">
                            {content.title}
                          </h2>
                        </div>
                        <p className="text-lg leading-8 text-[#5f5b52] max-w-3xl">
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
                                className="flex items-start gap-3 border-l-2 border-[#d8d0bf] pl-4 py-2 text-[15px] text-[#3a3a3a] hover:border-[#8b6f3d] transition-colors"
                              >
                                <span className="font-mono text-xs text-[#9a8c70] mt-1.5 shrink-0">
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
                            className="group inline-flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-[#1f1f1f] text-xs"
                          >
                            {language === 'tr' ? 'Bu konuda danışın' : 'Get advice'}
                            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                          </a>
                          <a
                            href="/ekibimiz"
                            className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6f3d] hover:text-[#1f1f1f] transition"
                          >
                            {language === 'tr' ? 'İlgili ekip' : 'Related team'}
                          </a>
                        </div>
                      </Reveal>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <div className="relative z-40">
        <Footer />
      </div>
    </div>
  );
}

// ── Çalışma Alanları — yatay scroll-driven carousel ──
function PracticeAreasCarousel({ language, t }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 9 kart × her biri viewport genişliği; toplam yatay yer değiştirme = (n-1) * 100vw
  const total = PRACTICE_AREAS.length;
  // İlk kart başlık panelinin yanında dursun: 100vw - başlık paneli (yaklaşık)
  // Kartlar sağdan sola kayar. Negatif x kullanıyoruz.
  const xPercent = useTransform(scrollYProgress, [0, 1], ['0%', `-${(total) * 100}%`]);

  return (
    <section
      ref={containerRef}
      data-nav-theme="light"
      className="relative bg-[#f6f4ef]"
      style={{ height: `${total * 80}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Üst başlık */}
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pt-24 pb-8">
          <SectionHeader
            eyebrow={t('practiceAreas.title')}
            title={t('practiceAreas.subtitle')}
            action={
              <a href="/calisma-alanlari" className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#6d5b35]">
                {language === 'tr' ? 'Tüm alanlar' : 'All practices'}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            }
          />
        </div>

        {/* Yatay kayan kartlar */}
        <div className="flex-1 flex items-center overflow-hidden">
          <motion.div
            style={{ x: xPercent }}
            className="flex gap-6 px-6 lg:px-8 will-change-transform"
          >
            {PRACTICE_AREAS.map((area, i) => {
              const content = area[language];
              return (
                <article
                  key={area.id}
                  className="relative shrink-0 w-[88vw] max-w-[720px] h-[60vh] max-h-[520px] bg-white border border-[#d8d0bf] p-10 md:p-12 flex flex-col"
                >
                  {/* Numara + gradient aksenti */}
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#8b6f3d] to-transparent" />
                  <div className="flex items-baseline gap-4 mb-6">
                    <span className="font-fraunces text-6xl font-semibold text-[#d4c4a3]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-mono text-[#9a8c70]">
                      / {String(total).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-fraunces text-2xl md:text-3xl font-semibold leading-tight text-[#1f1f1f]">
                    {content.title}
                  </h3>

                  <p className="mt-4 text-[15px] leading-7 text-[#5f5b52] line-clamp-4">
                    {content.lede}
                  </p>

                  {/* Hizmet özetleri */}
                  <ul className="mt-6 space-y-2 flex-1 overflow-hidden">
                    {content.services.slice(0, 3).map((s, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#3a3a3a]">
                        <span className="font-mono text-xs text-[#9a8c70] mt-1">
                          {String(j + 1).padStart(2, '0')}
                        </span>
                        <span className="truncate">{s}</span>
                      </li>
                    ))}
                    {content.services.length > 3 && (
                      <li className="text-xs text-[#9a8c70] pl-7">
                        +{content.services.length - 3} {language === 'tr' ? 'hizmet daha' : 'more services'}
                      </li>
                    )}
                  </ul>

                  {/* CTA */}
                  <a
                    href="/calisma-alanlari"
                    className="group mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#1f1f1f]"
                  >
                    {language === 'tr' ? 'Detayları gör' : 'See details'}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </a>
                </article>
              );
            })}

            {/* Son kart (CTA) */}
            <article className="relative shrink-0 w-[88vw] max-w-[720px] h-[60vh] max-h-[520px] bg-ink text-white p-10 md:p-12 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c8b68c]">
                  {language === 'tr' ? 'Tüm uzmanlık alanları' : 'All practice areas'}
                </p>
                <h3 className="mt-6 font-fraunces text-2xl md:text-3xl font-semibold leading-tight">
                  {language === 'tr'
                    ? `${total} farklı alanda derin uzmanlık.`
                    : `Deep expertise in ${total} distinct areas.`}
                </h3>
              </div>
              <a
                href="/calisma-alanlari"
                className="group inline-flex items-center gap-3 border border-white/40 px-6 py-4 text-sm font-semibold uppercase tracking-[0.18em] hover:bg-white hover:text-ink transition self-start"
              >
                {language === 'tr' ? 'Tümünü keşfet' : 'Explore all'}
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
            </article>
          </motion.div>
        </div>

        {/* Alt progress + ipucu */}
        <CarouselProgress scrollYProgress={scrollYProgress} total={total} language={language} />
      </div>
    </section>
  );
}

function CarouselProgress({ scrollYProgress, total, language }) {
  const widthPercent = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      const i = Math.min(total + 1, Math.max(1, Math.floor(v * (total + 1)) + 1));
      setCurrent(i);
    });
    return () => unsubscribe();
  }, [scrollYProgress, total]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8 pb-10">
      <div className="flex items-center gap-6">
        <div className="relative h-px flex-1 bg-[#d8d0bf]">
          <motion.div
            className="absolute left-0 top-0 h-full bg-[#8b6f3d]"
            style={{ width: widthPercent }}
          />
        </div>
        <span className="text-xs font-mono text-[#9a8c70] whitespace-nowrap">
          {String(current).padStart(2, '0')} / {String(total + 1).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.3em] text-[#9a8c70]">
        {language === 'tr' ? 'Aşağı kaydırın' : 'Scroll down'} →
      </p>
    </div>
  );
}
