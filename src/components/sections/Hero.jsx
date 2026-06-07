import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import BrandLogo from '@/components/BrandLogo';



export default function Hero() {
  const { t } = useLanguage();

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-100">

      <img
        src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=85"
        alt=""
        className="absolute inset-0 z-0 w-full h-full object-cover"
      />

      {/* Animated grid lines */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"
            style={{ left: `${(i + 1) * 20}%` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </div>

      {/* Main content - bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="bg-slate-900/50 backdrop-blur-xl border-t border-white/10 px-5 lg:px-8 pt-8 pb-8">
          <div className="flex items-center justify-between gap-8">

            {/* Logo + Slogan */}
            <div className="flex items-center gap-8">
              <motion.div
                className="shrink-0"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <BrandLogo className="text-white" markClassName="h-16 w-16 text-3xl md:h-20 md:w-20" textClassName="[&>div:first-child]:text-4xl md:[&>div:first-child]:text-5xl" />
              </motion.div>
              <motion.p
                className="text-sm md:text-base text-white/50 leading-relaxed italic border-l border-white/20 pl-8"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {t('hero.slogan')}
              </motion.p>
            </div>

            {/* CTAs - right side */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 shrink-0 pb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.a
                href="/iletisim"
                className="flex items-center gap-3 px-7 py-4 bg-white text-slate-900 text-sm font-medium tracking-wide rounded-sm hover:bg-white/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                İletişim
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.button
                onClick={() => scrollTo('#practice-areas')}
                className="flex items-center gap-3 px-7 py-4 border border-white/20 text-white/70 text-sm font-medium tracking-wide rounded-sm hover:border-white/50 hover:text-white transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.ctaSecondary')}
              </motion.button>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-900/50 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
