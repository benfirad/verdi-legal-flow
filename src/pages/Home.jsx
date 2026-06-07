import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { teamMembers } from '@/lib/teamData';

// Tüm bölüm başlıkları için ortak standart — Hakkımızda bloğuyla aynı oran
const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#8b6f3d]';
const SECTION_TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-4xl';
const SUB_TITLE_CLS = 'font-fraunces text-3xl font-semibold leading-tight text-[#1f1f1f] md:text-4xl';

// Scroll-tetikli reveal animasyonu
function Reveal({ children, delay = 0, y = 24, className = '', as: Tag = motion.div }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}

// Liste/Grid içinde sıralı stagger için
function StaggerList({ children, className = '', stagger = 0.08 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <Reveal>
        <p className={EYEBROW_CLS}>{eyebrow}</p>
        <h2 className={SECTION_TITLE_CLS}>{title}</h2>
      </Reveal>
      {action && (
        <Reveal delay={0.1} y={12}>
          {action}
        </Reveal>
      )}
    </div>
  );
}

export default function Home() {
  const { language, t } = useLanguage();
  const areas = t('practiceAreas.areas').slice(0, 8);
  const featuredTeam = teamMembers.filter((m) => m.position === 'partner');

  return (
    <div className="min-h-screen bg-[#f6f4ef] text-[#202020]">
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section id="home" data-nav-theme="dark" className="relative min-h-[760px] overflow-hidden bg-[#05070b] text-white lg:min-h-screen">
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
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-none text-xl font-normal leading-snug text-white/92 lg:text-[26px] xl:text-[28px]"
              >
                {language === 'tr'
                  ? 'Hukuki danışmanlık alanında Verdi, hizmetlerini derin hukuki deneyime ve farklı alanlarda tecrübeye sahip uzman avukat, danışman ve destek birimlerinden oluşan yetkin bir ekiple sunmaktadır.'
                  : 'Verdi provides legal services through a capable team of attorneys, consultants and support units with deep legal experience across distinct areas of practice.'}
              </motion.p>
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/iletisim"
                className="inline-flex h-16 w-full max-w-[220px] items-center justify-center justify-self-start border border-white/70 px-8 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[#202020] lg:justify-self-end"
              >
                {language === 'tr' ? 'İletişim' : 'Contact'}
              </motion.a>
            </div>
          </div>
        </section>

        {/* ── Hakkımızda + Ortaklarımız ── */}
        <section id="about" data-nav-theme="light" className="border-y border-[#ded8ca] bg-white">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <p className={EYEBROW_CLS}>{t('about.title')}</p>
                <h2 className={`${SECTION_TITLE_CLS} max-w-md`}>
                  {language === 'tr' ? 'Stratejik hukuk danışmanlığı' : 'Strategic legal counsel'}
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="max-w-3xl text-lg leading-8 text-[#5f5b52]">
                  {t('about.description')}
                </p>
              </Reveal>
            </div>

            <div className="mt-20 flex flex-col justify-between gap-6 border-t border-[#d8d0bf] pt-10 md:flex-row md:items-end">
              <Reveal>
                <h3 className={SUB_TITLE_CLS}>
                  {language === 'tr' ? 'Ortaklarımız' : 'Our Partners'}
                </h3>
              </Reveal>
              <Reveal delay={0.1} y={12}>
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
                  <motion.article key={member.id} variants={itemVariants} className="group">
                    <a href="/ekibimiz" className="block">
                      <div className="aspect-square overflow-hidden bg-[#e8e1d2]">
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
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

        {/* ── Çalışma Alanları ── */}
        <section id="practice-areas" data-nav-theme="light" className="bg-[#f6f4ef]">
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

            <StaggerList className="grid border-t border-[#d8d0bf] md:grid-cols-2" stagger={0.06}>
              {areas.map((area, index) => (
                <motion.a
                  key={area.id}
                  variants={itemVariants}
                  href="/calisma-alanlari"
                  className="group flex min-h-28 items-center justify-between gap-6 border-b border-[#d8d0bf] px-0 py-7 transition hover:bg-white md:px-6"
                >
                  <div>
                    <span className="text-xs text-[#9a8c70]">{String(index + 1).padStart(2, '0')}</span>
                    <h3 className="mt-2 font-fraunces text-2xl text-[#202020]">{area.title}</h3>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-[#9a8c70] transition group-hover:translate-x-1 group-hover:text-[#202020]" />
                </motion.a>
              ))}
            </StaggerList>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
