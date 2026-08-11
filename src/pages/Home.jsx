import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { teamMembers } from '@/lib/teamData';
import { PRACTICE_AREAS } from './PracticeAreasPage';
import { Reveal, StaggerList, Enter, itemVariants, CARD_EASE } from '@/components/motion/Reveal';
import { BRAND } from '@/lib/brand';

// Tüm bölüm başlıkları için ortak standart — Hakkımızda bloğuyla aynı oran
const EYEBROW_CLS = 'text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7A8C]';
const SECTION_TITLE_CLS = 'mt-6 font-fraunces text-3xl font-semibold leading-tight text-[#1A2530] md:text-4xl';
const SUB_TITLE_CLS = 'font-fraunces text-3xl font-semibold leading-tight text-[#1A2530] md:text-4xl';

// (Reveal, StaggerList, itemVariants ortak modülden geliyor)

function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <Reveal>
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

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />

      <main>
        {/* ── Hero (stack layer 1) ── */}
        <section id="home" data-nav-theme="dark" className="relative z-10 min-h-[680px] overflow-hidden bg-[#1A2530] text-white lg:sticky lg:top-0 lg:h-screen lg:min-h-screen">
          <img
            src="/assets/hero_architecture.png"
            alt={language === 'tr' ? 'Modern kurumsal mimari' : 'Modern corporate architecture'}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/40 to-black/70" />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent" />

          <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1840px] flex-col justify-end px-6 pb-0 pt-28 lg:min-h-screen lg:px-16">
            <div className="mb-16 grid w-full max-w-[1680px] gap-6 lg:mb-28 lg:ml-4 lg:grid-cols-[minmax(0,1180px)_260px] lg:items-end lg:gap-16">
              <Enter delay={0.3}>
                <div>
                  <span className="mb-5 inline-flex border border-white/35 bg-black/15 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/75 backdrop-blur-sm">
                    {BRAND.conceptLabel[language]}
                  </span>
                  <h1 className="max-w-none text-[19px] font-normal leading-snug text-white/92 sm:text-xl lg:text-[26px] xl:text-[28px]">
                    {language === 'tr'
                      ? 'VERDİ HUKUK; ticari hedefleri, hukuki riskleri ve insan unsurunu aynı stratejik çerçevede değerlendirerek müvekkillerine açık, çevik ve sonuç odaklı danışmanlık sunar.'
                      : 'VERDİ LAW brings commercial goals, legal risk and the human dimension into one strategic framework to deliver clear, agile and outcome-focused counsel.'}
                  </h1>
                </div>
              </Enter>
              <Enter delay={0.55} from="right">
                <motion.a
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: CARD_EASE }}
                  href="/iletisim"
                  className="inline-flex h-16 w-full max-w-[220px] items-center justify-center justify-self-start border border-white/70 px-8 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-[#1A2530] lg:justify-self-end"
                >
                  {language === 'tr' ? 'İletişim' : 'Contact'}
                </motion.a>
              </Enter>
            </div>
          </div>
        </section>

        {/* ── Hakkımızda + Ortaklarımız (stack layer 2) ── */}
        <section id="about" data-nav-theme="light" className="relative z-20 border-y border-[#CDD3D8] bg-white shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)] lg:sticky lg:top-0 lg:min-h-screen">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <h2 className={`${SECTION_TITLE_CLS} max-w-md`}>
                  {language === 'tr' ? 'Stratejik hukuk danışmanlığı' : 'Strategic legal counsel'}
                </h2>
              </Reveal>
              <Reveal delay={0.15} from="right">
                <p className="max-w-3xl text-base leading-7 text-[#4D5660] sm:text-lg sm:leading-8">
                  {t('about.description')}
                </p>
              </Reveal>
            </div>

            <div className="mt-12 flex flex-col justify-between gap-5 border-t border-[#C8CFD3] pt-8 md:mt-20 md:flex-row md:items-end md:pt-10">
              <Reveal>
                <h3 className={SUB_TITLE_CLS}>
                  {language === 'tr' ? 'Ekibimiz' : 'Our Team'}
                </h3>
              </Reveal>
              <Reveal delay={0.1} from="right">
                <a href="/ekibimiz" className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#3F5C72]">
                  {language === 'tr' ? 'Tüm ekibi gör' : 'View entire team'}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>

            <StaggerList className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-4 lg:gap-8" stagger={0.1}>
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
                      <div className="aspect-square overflow-hidden bg-[#C8CFD3]">
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement.innerHTML = `<div class="flex h-full w-full items-center justify-center bg-[#C8CFD3] font-fraunces text-5xl text-[#5A7A8C]">${initials}</div>`;
                          }}
                        />
                      </div>
                      <div className="border-b border-[#C8CFD3] py-3 sm:py-5">
                        <h3 className="text-sm font-semibold leading-tight text-[#1A2530] sm:text-xl">{member.name}</h3>
                        <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.13em] text-[#5A7A8C] sm:mt-2 sm:text-xs sm:tracking-[0.18em]">
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

        {/* ── Uzmanlık Alanları (stack layer 3) — magazine grid ── */}
        <section id="practice-areas" data-nav-theme="light" className="relative z-30 bg-[#E8ECEF] shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.25)] lg:sticky lg:top-0 lg:min-h-screen">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
            {/* Başlık satırı (eyebrow yok) */}
            <div className="mb-12 flex flex-col justify-between gap-6 border-b border-[#C8CFD3] pb-8 md:flex-row md:items-end">
              <Reveal>
                <h2 className={`${SECTION_TITLE_CLS} max-w-2xl`}>
                  {language === 'tr'
                    ? 'Dokuz alanda, derin uzmanlık.'
                    : 'Deep expertise across nine practice areas.'}
                </h2>
              </Reveal>
              <Reveal delay={0.1} from="right">
                <a
                  href="/calisma-alanlari"
                  className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#3F5C72]"
                >
                  {language === 'tr' ? 'Tüm alanlar' : 'All practices'}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </a>
              </Reveal>
            </div>

            {/* Magazine grid — 3 sütun, hover'da brushed indigo ile renklenir */}
            <StaggerList className="grid grid-cols-2 gap-px border border-[#C8CFD3] bg-[#C8CFD3] lg:grid-cols-3" stagger={0.06}>
              {PRACTICE_AREAS.map((area, i) => {
                const content = area[language];
                return (
                  <motion.a
                    key={area.id}
                    variants={itemVariants}
                    whileHover={{ y: -2 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                    href={`/calisma-alanlari#${area.id}`}
                    className="group relative flex min-h-[185px] flex-col justify-between gap-5 overflow-hidden bg-white p-5 transition-colors duration-500 hover:bg-[#1A2530] sm:min-h-[230px] sm:p-8 md:p-10 lg:min-h-[260px] lg:gap-8"
                  >
                    {/* Üst: numara + ok */}
                    <div className="flex items-center justify-between">
                      <span className="font-fraunces text-2xl font-semibold text-[#5A7A8C] transition-colors group-hover:text-[#B8CCDA] sm:text-3xl">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <ArrowRight className="h-5 w-5 text-[#A8B0B5] transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[#B8CCDA]" />
                    </div>

                    {/* Alt: başlık + tease */}
                    <div>
                      <h3 className="font-fraunces text-base font-semibold leading-tight text-[#1A2530] transition-colors group-hover:text-white sm:text-xl lg:text-2xl">
                        {content.title}
                      </h3>
                      <p className="mt-2 hidden text-sm leading-6 text-[#4D5660] transition-colors group-hover:text-white/70 sm:line-clamp-2">
                        {content.lede}
                      </p>
                    </div>

                    {/* Hover'da beliren ince çizgi */}
                    <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-[#B8CCDA] transition-transform duration-500 group-hover:scale-x-100" />
                  </motion.a>
                );
              })}
            </StaggerList>
          </div>
        </section>
      </main>

      <div className="relative z-40">
        <Footer />
      </div>
    </div>
  );
}
