import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import PracticeAreaTree from '@/components/PracticeAreaTree';

export default function PracticeAreas() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="practice-areas" ref={ref} className="relative py-16 md:py-20 bg-slate_section overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-cobalt" />
            <span className="text-xs tracking-[0.3em] uppercase text-cobalt font-medium">{t('practiceAreas.title')}</span>
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-bone">
            {t('practiceAreas.subtitle')}
          </h2>
        </motion.div>

        {/* Skill Tree */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <PracticeAreaTree dark={true} />
        </motion.div>

        {/* View all */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href="/calisma-alanlari"
            className="inline-flex items-center gap-3 px-8 py-3 border border-border/40 text-bone/70 text-sm font-medium hover:border-cobalt/50 hover:text-bone transition-all rounded-sm"
          >
            {t('nav.practiceAreas')} <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}