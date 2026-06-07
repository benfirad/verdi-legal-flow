import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PublicationDetail from '@/pages/PublicationDetail';
import { publications } from '@/lib/publicationsData';

function PublicationCard({ pub, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const { language } = useLanguage();

  const formatDate = (d) =>
    new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(d));

  const isFeatured = index === 0;

  if (isFeatured) {
    return (
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group col-span-full cursor-pointer mb-2"
        onClick={() => onClick(pub)}
      >
        <div className="grid md:grid-cols-2 border border-border/20 hover:border-cobalt/30 rounded-sm overflow-hidden transition-all duration-500">
          <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
            <motion.img
              src={pub.image}
              alt={pub.title[language]}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.7 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/60" />
          </div>
          <div className="p-8 md:p-12 bg-card flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[11px] px-3 py-1.5 bg-cobalt/15 text-cobalt border border-cobalt/20 rounded-sm font-medium tracking-wide">
                {pub.category[language]}
              </span>
              <span className="text-xs text-muted-foreground">{language === 'tr' ? 'Öne Çıkan' : 'Featured'}</span>
            </div>
            <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-steel leading-snug mb-4 group-hover:text-bone transition-colors duration-300">
              {pub.title[language]}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm md:text-base">
              {pub.excerpt[language]}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(pub.date)}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{pub.readTime[language]}</span>
            </div>
            <div className="flex items-center gap-2 text-cobalt text-sm font-medium">
              {language === 'tr' ? 'Devamını Oku' : 'Read More'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer border border-border/20 hover:border-cobalt/30 rounded-sm overflow-hidden transition-all duration-500 bg-card flex flex-col"
      onClick={() => onClick(pub)}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <motion.img
          src={pub.image}
          alt={pub.title[language]}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
          whileHover={{ scale: 1.04 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition-colors duration-500" />
        <span className="absolute top-3 left-3 text-[11px] px-2.5 py-1 bg-ink/70 backdrop-blur-sm text-steel border border-border/30 rounded-sm">
          {pub.category[language]}
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{formatDate(pub.date)}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{pub.readTime[language]}</span>
        </div>
        <h3 className="font-fraunces text-lg font-bold text-steel leading-snug mb-3 group-hover:text-bone transition-colors duration-300 flex-1">
          {pub.title[language]}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
          {pub.excerpt[language]}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-border/20">
          <span className="text-xs text-muted-foreground">{pub.author}</span>
          <span className="flex items-center gap-1 text-cobalt text-xs font-medium">
            {language === 'tr' ? 'Oku' : 'Read'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function PublicationsPage() {
  const { language, t } = useLanguage();
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  const categories = ['all', ...Array.from(new Set(publications.map(p => p.category[language])))];

  const filtered = publications.filter(p => {
    const matchCat = activeCategory === 'all' || p.category[language] === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || p.title[language].toLowerCase().includes(q) || p.excerpt[language].toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (selected) return <PublicationDetail pub={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="min-h-screen bg-ink text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 px-6 lg:px-8 max-w-7xl mx-auto">
        <div ref={headerRef}>
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="w-8 h-px bg-cobalt" />
            <span className="text-xs tracking-[0.35em] uppercase text-cobalt font-medium">
              {t('publications.title')}
            </span>
          </motion.div>
          <motion.h1
            className="font-fraunces text-5xl md:text-7xl font-bold text-bone mb-4 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {t('publications.subtitle')}
          </motion.h1>
          <motion.p
            className="text-steel text-lg max-w-xl"
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {t('publications.description')}
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-4 py-2 rounded-sm border transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-cobalt text-bone border-cobalt'
                    : 'bg-transparent text-muted-foreground border-border/30 hover:border-cobalt/40 hover:text-bone'
                }`}
              >
                {cat === 'all' ? (language === 'tr' ? 'Tümü' : 'All') : cat}
              </button>
            ))}
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={language === 'tr' ? 'Ara...' : 'Search...'}
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-card border border-border/30 text-sm text-foreground placeholder:text-muted-foreground rounded-sm focus:outline-none focus:border-cobalt/50 w-52 transition-all"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto pb-28">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            {language === 'tr' ? 'Sonuç bulunamadı.' : 'No results found.'}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((pub, i) => (
              <PublicationCard key={pub.id} pub={pub} index={i} onClick={setSelected} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}