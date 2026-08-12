import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Compass, MessageSquare, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal, StaggerList, itemVariants } from '@/components/motion/Reveal';
import { BRAND } from '@/lib/brand';

const VALUES = [
  {
    icon: Compass,
    title: { tr: 'Stratejik Bakış', en: 'Strategic Perspective' },
    desc: { tr: 'Hukuki seçeneği, kararın ticari ve operasyonel sonuçlarıyla birlikte değerlendiririz.', en: 'We assess legal options alongside the commercial and operational impact of each decision.' },
  },
  {
    icon: MessageSquare,
    title: { tr: 'Açık İletişim', en: 'Clear Communication' },
    desc: { tr: 'Karmaşık konuları sade, zamanında ve karar almaya elverişli biçimde aktarırız.', en: 'We communicate complex matters clearly, promptly and in a decision-ready format.' },
  },
  {
    icon: ShieldCheck,
    title: { tr: 'Ölçülü Risk', en: 'Measured Risk' },
    desc: { tr: 'Riski sıfırlama iddiası yerine, doğru riskin bilinçli biçimde yönetilmesini hedefleriz.', en: 'Rather than promise zero risk, we help clients understand and manage the right risks.' },
  },
  {
    icon: Building2,
    title: { tr: 'Sektörel Derinlik', en: 'Sector Depth' },
    desc: { tr: 'Hukuki bilgiyi sektör dinamikleri ve kurumun çalışma biçimiyle birleştiririz.', en: 'We combine legal knowledge with sector dynamics and the way each organisation operates.' },
  },
];

export default function About() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />
      <main>
        <section data-nav-theme="light" className="bg-[#E8ECEF] border-b border-[#C8CFD3]">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8">
            <Reveal>
              <span className="inline-flex border border-[#5A7A8C]/35 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#5A7A8C]">
                {BRAND.conceptLabel[language]}
              </span>
              <h1 className="mt-7 max-w-5xl font-fraunces text-4xl font-semibold leading-[1.08] md:text-6xl">
                {language === 'tr' ? 'Hukuki doğruluğu, ticari sağduyuyla birleştiren bir çalışma kültürü.' : 'A working culture where legal precision meets commercial judgement.'}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-[#4D5660]">{t('about.description')}</p>
            </Reveal>
          </div>
        </section>

        <section data-nav-theme="light" className="bg-white border-b border-[#C8CFD3]">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7A8C]">
                {language === 'tr' ? 'Yaklaşımımız' : 'Our Approach'}
              </p>
              <h2 className="mt-6 font-fraunces text-3xl font-semibold leading-tight md:text-4xl">
                {language === 'tr' ? 'Dosyanın ötesini görürüz.' : 'We look beyond the matter.'}
              </h2>
              <div className="mt-8 space-y-6 text-[17px] leading-8 text-[#4D5660]">
                <p>{t('about.description2')}</p>
                <p>
                  {language === 'tr'
                    ? 'Bir sözleşmenin müzakere gücünü, bir uyuşmazlığın itibar etkisini ve bir yatırım kararının sonraki adımlarını aynı çerçevede değerlendiririz. Böylece hukuki görüş, yalnızca doğru değil; kullanılabilir olur.'
                    : 'We consider a contract’s negotiating leverage, a dispute’s reputational impact and an investment decision’s next steps within the same frame. Legal advice becomes not only correct, but usable.'}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15} from="right">
              <figure className="relative">
                <img src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1000&q=85" alt={language === 'tr' ? 'Hukuk ve adalet temalı mimari detay' : 'Architectural detail representing law and justice'} className="aspect-[4/5] w-full object-cover grayscale" />
                <div className="absolute -bottom-5 -left-5 bg-[#1A2530] px-6 py-5 text-white">
                  <p className="font-fraunces text-2xl font-semibold">DACH</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#B8CCDA]">{BRAND.conceptLabel[language]}</p>
                </div>
              </figure>
            </Reveal>
          </div>
        </section>

        <section data-nav-theme="light" className="bg-[#E8ECEF] py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#5A7A8C]">{language === 'tr' ? 'Değerlerimiz' : 'Our Values'}</p>
              <h2 className="mt-6 max-w-2xl font-fraunces text-3xl font-semibold leading-tight md:text-4xl">
                {language === 'tr' ? 'Her ilişkide aynı dört ilke.' : 'Four principles in every relationship.'}
              </h2>
            </Reveal>
            <StaggerList className="mt-12 grid gap-px border border-[#C8CFD3] bg-[#C8CFD3] md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
              {VALUES.map(({ icon: Icon, title, desc }, index) => (
                <motion.article key={title.tr} variants={itemVariants} className="bg-white p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="h-7 w-7 text-[#5A7A8C]" strokeWidth={1.5} />
                    <span className="font-mono text-xs text-[#A8B0B5]">0{index + 1}</span>
                  </div>
                  <h3 className="mt-10 font-fraunces text-2xl font-semibold">{title[language]}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#4D5660]">{desc[language]}</p>
                </motion.article>
              ))}
            </StaggerList>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
