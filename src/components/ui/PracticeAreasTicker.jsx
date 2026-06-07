import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

export default function PracticeAreasTicker() {
  const { t } = useLanguage();
  const areas = t('practiceAreas.areas');

  // Double the list for seamless loop
  const items = [...areas, ...areas];

  return (
    <div className="relative bg-cobalt/10 border-y border-cobalt/20 py-4 overflow-hidden">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-ink to-transparent z-10 pointer-events-none" />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-ink to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-0 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
          repeatType: 'loop'
        }}
      >
        {items.map((area, index) => (
          <div key={index} className="flex items-center shrink-0">
            <span className="text-xs md:text-sm tracking-widest uppercase text-bone/50 px-8">
              {area.title}
            </span>
            <span className="w-1 h-1 rounded-full bg-cobalt/60 shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}