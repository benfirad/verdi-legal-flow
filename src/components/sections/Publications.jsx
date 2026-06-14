import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, FileText } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { Button } from '@/components/ui/button';
import { publications } from '@/lib/publicationsData';

export default function Publications() {
  const { language, t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section 
      id="publications" 
      ref={ref}
      className="relative py-16 md:py-20 bg-slate_section overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div>
            <span className="text-sm tracking-[0.3em] uppercase text-cobalt font-medium">
              {t('publications.title')}
            </span>
            <h2 className="font-fraunces text-4xl md:text-5xl lg:text-6xl font-bold text-bone mt-4">
              {t('publications.subtitle')}
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              {t('publications.description')}
            </p>
          </div>
          <Button
            variant="outline"
            size="lg"
            className="border-bone/30 text-bone hover:bg-bone hover:text-ink group shrink-0"
          >
            {t('publications.viewAll')}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Publications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publications.map((pub, index) => (
            <motion.article
              key={pub.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15 }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg mb-6">
                <motion.img
                  src={pub.image}
                  alt={pub.title[language]}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/20 transition-colors duration-500" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-cobalt text-bone text-xs font-medium rounded-full">
                    {pub.category[language]}
                  </span>
                </div>

                {/* Read Indicator */}
                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-bone/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FileText className="w-5 h-5 text-bone" />
                </div>
              </div>

              {/* Content */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(pub.date)}</span>
              </div>

              <h3 className="font-fraunces text-xl md:text-2xl font-bold text-bone mb-3 group-hover:text-cobalt transition-colors">
                {pub.title[language]}
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-4">
                {pub.excerpt[language]}
              </p>

              <motion.span
                className="inline-flex items-center gap-2 text-cobalt font-medium"
                whileHover={{ x: 5 }}
              >
                {t('publications.readMore')}
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Decorative */}
      <div className="absolute top-0 left-1/4 w-px h-24 bg-gradient-to-b from-cobalt/30 to-transparent" />
      <div className="absolute bottom-0 right-1/4 w-px h-24 bg-gradient-to-t from-cobalt/30 to-transparent" />
    </section>
  );
}