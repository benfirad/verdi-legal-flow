import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';



export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = t('about.values');

  return (
    <section id="about" ref={ref} className="relative py-16 md:py-20 bg-bone overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-30 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-l from-ink/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Top: Text + Image */}
        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-cobalt" />
              <span className="text-xs tracking-[0.3em] uppercase text-cobalt font-medium">{t('about.title')}</span>
            </div>

            <h2 className="font-fraunces text-4xl md:text-5xl font-bold text-ink mb-8 leading-tight">
              {t('about.subtitle')}
            </h2>

            <p className="text-base md:text-lg text-ink/65 leading-relaxed mb-6">
              {t('about.description')}
            </p>
            <p className="text-base text-ink/55 leading-relaxed mb-10">
              {t('about.description2')}
            </p>

            {/* Values */}
            <div className="space-y-5">
              {values.map((v, i) => (
                <motion.div
                  key={i}
                  className="flex gap-4 group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-cobalt shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-ink text-sm">{v.title}</p>
                    <p className="text-ink/55 text-sm mt-1">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image with overlay */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80"
                alt="Verdi Hukuk Bürosu"
                className="w-full h-full object-cover grayscale"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-ink/80 backdrop-blur-sm border border-bone/10 rounded-sm">
                <p className="font-fraunces text-lg text-bone mb-1">"Hukukta güven, her şeyden önce gelir."</p>
                <p className="text-xs text-bone/50">— Verdi Hukuk Bürosu, 2003</p>
              </div>
            </div>

            {/* Decorative corner */}
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-cobalt/30 rounded-tr-sm" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-cobalt/30 rounded-bl-sm" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}