import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function ProcessRoadmap() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [activeStep, setActiveStep] = useState(null);

  const steps = t('process.steps');

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%']);

  return (
    <section ref={ref} className="relative py-24 md:py-36 bg-ink overflow-hidden">

      {/* Faint bg grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-cobalt" />
            <span className="text-xs tracking-[0.3em] uppercase text-cobalt font-medium">{t('process.title')}</span>
            <div className="w-8 h-px bg-cobalt" />
          </div>
          <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-bone mb-6">
            {t('process.subtitle')}
          </h2>
          <p className="text-base md:text-lg text-steel max-w-2xl mx-auto">
            {t('process.description')}
          </p>
        </motion.div>

        {/* Roadmap */}
        <div className="relative">

          {/* Desktop: vertical center line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/20 z-0">
            <motion.div
              className="w-full bg-gradient-to-b from-cobalt to-cobalt/20"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;
              const isActive = activeStep === index;

              return (
                <div
                  key={index}
                  className={`relative md:grid md:grid-cols-2 md:gap-12 md:mb-16 ${isLeft ? '' : 'md:direction-rtl'}`}
                >
                  {/* Content card */}
                  <motion.div
                    className={`${isLeft ? 'md:col-start-1 md:text-right md:pr-16' : 'md:col-start-2 md:text-left md:pl-16'} mb-4 md:mb-0`}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => setActiveStep(isActive ? null : index)}
                  >
                    <motion.div
                      className={`group relative p-6 md:p-8 rounded-sm border cursor-pointer transition-all duration-500 ${
                        isActive
                          ? 'bg-cobalt border-cobalt'
                          : 'bg-card/40 border-border/30 hover:border-cobalt/50 hover:bg-card/70'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {/* Step number */}
                      <div className={`inline-flex items-center gap-2 mb-4 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                        <span className={`font-fraunces text-4xl font-bold ${isActive ? 'text-bone/40' : 'text-border/40'}`}>
                          {step.number}
                        </span>
                      </div>

                      <h3 className={`font-fraunces text-xl md:text-2xl font-bold mb-3 ${isActive ? 'text-bone' : 'text-bone/90'}`}>
                        {step.title}
                      </h3>

                      <p className={`text-sm leading-relaxed mb-4 ${isActive ? 'text-bone/80' : 'text-muted-foreground'}`}>
                        {step.desc}
                      </p>

                      {/* Duration badge */}
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs ${
                        isActive ? 'bg-bone/10 text-bone/70' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Clock className="w-3 h-3" />
                        {step.duration}
                      </div>

                      {/* Arrow indicator */}
                      <div className={`absolute top-4 right-4 transition-transform ${isActive ? 'rotate-90' : ''}`}>
                        <ChevronRight className={`w-4 h-4 ${isActive ? 'text-bone/50' : 'text-muted-foreground/50'}`} />
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Center dot (desktop) */}
                  <motion.div
                    className={`hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 z-10 items-center justify-center`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.15, type: 'spring', stiffness: 200 }}
                  >
                    <motion.div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                        isActive ? 'bg-cobalt border-cobalt' : 'bg-ink border-cobalt/50'
                      }`}
                      whileHover={{ scale: 1.3 }}
                    >
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-bone' : 'bg-cobalt'}`} />
                    </motion.div>
                  </motion.div>

                  {/* Mobile: line connector */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center my-3">
                      <motion.div
                        className="w-px h-8 bg-cobalt/30"
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ delay: 0.3 + index * 0.15 }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-3 px-8 py-4 bg-cobalt text-bone text-sm font-medium tracking-wide rounded-sm hover:bg-cobalt/90 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {t('hero.cta')}
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}