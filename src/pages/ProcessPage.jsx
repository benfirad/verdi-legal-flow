import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Reveal, StaggerList, itemVariants } from '@/components/motion/Reveal';

export default function ProcessPage() {
  const { language, t } = useLanguage();
  const steps = t('process.steps');

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />
      <main>
        <section data-nav-theme="dark" className="bg-[#1A2530] text-white">
          <div className="mx-auto max-w-7xl px-6 pb-24 pt-40 lg:px-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#B8CCDA]">{t('process.subtitle')}</p>
              <h1 className="mt-6 max-w-4xl font-fraunces text-4xl font-semibold leading-tight md:text-6xl">{t('process.title')}</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">{t('process.description')}</p>
            </Reveal>
          </div>
        </section>

        <section data-nav-theme="light" className="py-24">
          <StaggerList className="mx-auto max-w-5xl px-6 lg:px-8" stagger={0.1}>
            {steps.map((step) => (
              <motion.article key={step.number} variants={itemVariants} className="group grid gap-6 border-t border-[#C8CFD3] py-9 md:grid-cols-[100px_1fr_180px] md:items-start">
                <span className="font-fraunces text-4xl font-semibold text-[#5A7A8C]">{step.number}</span>
                <div>
                  <h2 className="font-fraunces text-2xl font-semibold md:text-3xl">{step.title}</h2>
                  <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#4D5660]">{step.desc}</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#5A7A8C] md:justify-end">
                  <CheckCircle2 className="h-4 w-4" />{step.duration}
                </div>
              </motion.article>
            ))}
          </StaggerList>
        </section>

        <section data-nav-theme="light" className="border-t border-[#C8CFD3] bg-white px-6 py-20">
          <div className="mx-auto flex max-w-5xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#5A7A8C]">{language === 'tr' ? 'İlk adım' : 'The first step'}</p>
              <h2 className="mt-4 max-w-2xl font-fraunces text-3xl font-semibold">{language === 'tr' ? 'Konuyu ve önceliği birlikte netleştirelim.' : 'Let us clarify the matter and priority together.'}</h2>
            </div>
            <a href="/iletisim" className="group inline-flex items-center gap-3 bg-[#1A2530] px-7 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {language === 'tr' ? 'İletişime geçin' : 'Contact us'}<ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
