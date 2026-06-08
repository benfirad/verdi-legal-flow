import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Search, X, BookOpen, Tag } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PublicationDetail from '@/pages/PublicationDetail';
import { publications } from '@/lib/publicationsData';

/* ─── Küçük kart bileşeni ───────────────────────────────────────────── */
function ArticleCard({ pub, index, onClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { language } = useLanguage();

  const formatDate = (d) =>
    new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(d));

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(pub)}
      className="group cursor-pointer bg-white/60 backdrop-blur-sm border border-[#C8CFD3]/60 rounded-2xl overflow-hidden hover:border-[#5A7A8C]/40 hover:shadow-[0_12px_40px_rgba(26,37,48,0.12)] transition-all duration-500 flex flex-col"
    >
      {/* Görsel */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={pub.image}
          alt={pub.title[language]}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A2530]/50 via-transparent to-transparent" />
        {/* Kategori rozeti */}
        <span className="absolute top-3 left-3 text-[11px] px-3 py-1.5 bg-[#1A2530]/75 backdrop-blur-sm text-white/90 rounded-full font-medium tracking-wide border border-white/10">
          {pub.category[language]}
        </span>
      </div>

      {/* İçerik */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-[#5A7A8C] mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {formatDate(pub.date)}
          </span>
          <span className="w-0.5 h-3 bg-[#C8CFD3] rounded-full" />
          <span className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {pub.readTime[language]}
          </span>
        </div>

        <h3 className="font-fraunces text-lg font-semibold text-[#1A2530] leading-snug mb-3 flex-1 group-hover:text-[#5A7A8C] transition-colors duration-300">
          {pub.title[language]}
        </h3>

        <p className="text-[#4D5660] text-sm leading-relaxed mb-5 line-clamp-2">
          {pub.excerpt[language]}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-[#C8CFD3]/50">
          <span className="text-xs text-[#5A7A8C] font-medium">{pub.author}</span>
          <span className="flex items-center gap-1.5 text-[#1A2530] text-xs font-semibold uppercase tracking-[0.15em] group-hover:gap-2.5 transition-all duration-300">
            {language === 'tr' ? 'Oku' : 'Read'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Büyük öne çıkan kart ──────────────────────────────────────────── */
function FeaturedCard({ pub, onClick }) {
  const { language } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const formatDate = (d) =>
    new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    }).format(new Date(d));

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onClick(pub)}
      className="group cursor-pointer col-span-full bg-white/60 backdrop-blur-sm border border-[#C8CFD3]/60 rounded-2xl overflow-hidden hover:border-[#5A7A8C]/40 hover:shadow-[0_20px_60px_rgba(26,37,48,0.14)] transition-all duration-500"
    >
      <div className="grid md:grid-cols-[1fr_45%]">
        {/* Sol: görsel */}
        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
          <img
            src={pub.image}
            alt={pub.title[language]}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1A2530]/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A2530]/50 via-transparent to-transparent md:hidden" />
          {/* Öne çıkan rozeti */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[11px] px-3 py-1.5 bg-[#d4c4a3] text-[#1A2530] rounded-full font-semibold tracking-wide">
              {language === 'tr' ? '★ Öne Çıkan' : '★ Featured'}
            </span>
          </div>
        </div>

        {/* Sağ: içerik */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-white/40">
          <span className="inline-block text-[11px] px-3 py-1.5 bg-[#5A7A8C]/10 text-[#5A7A8C] border border-[#5A7A8C]/20 rounded-full font-medium tracking-wide mb-5 self-start">
            {pub.category[language]}
          </span>

          <h2 className="font-fraunces text-2xl md:text-3xl font-bold text-[#1A2530] leading-snug mb-4 group-hover:text-[#5A7A8C] transition-colors duration-300">
            {pub.title[language]}
          </h2>

          <p className="text-[#4D5660] leading-relaxed mb-6 text-sm md:text-base line-clamp-3">
            {pub.excerpt[language]}
          </p>

          <div className="flex items-center gap-4 text-xs text-[#5A7A8C] mb-6">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{formatDate(pub.date)}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{pub.readTime[language]}</span>
          </div>

          <div className="flex items-center justify-between pt-5 border-t border-[#C8CFD3]/50">
            <span className="text-sm text-[#5A7A8C] font-medium">{pub.author}</span>
            <span className="flex items-center gap-2 text-[#1A2530] text-xs font-semibold uppercase tracking-[0.18em] group-hover:gap-3 transition-all duration-300">
              {language === 'tr' ? 'Devamını Oku' : 'Read More'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Ana sayfa ─────────────────────────────────────────────────────── */
export default function PublicationsPage() {
  const { language } = useLanguage();
  const [selected, setSelected]         = useState(null);
  const [search, setSearch]             = useState('');
  const [debouncedSearch, setDebounced] = useState('');
  const [activeCategory, setCategory]   = useState('all');
  const [searchFocused, setFocused]     = useState(false);
  const inputRef = useRef(null);

  // Arama debounce (300 ms)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  // Klavye kısayolu: "/" tuşu arama barını odaklar
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const categories = ['all', ...Array.from(new Set(publications.map(p => p.category[language])))];

  const filtered = publications.filter(p => {
    const matchCat = activeCategory === 'all' || p.category[language] === activeCategory;
    const q = debouncedSearch.toLowerCase().trim();
    const matchSearch =
      !q ||
      p.title[language].toLowerCase().includes(q) ||
      p.excerpt[language].toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      p.category[language].toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  const clearSearch = useCallback(() => { setSearch(''); inputRef.current?.focus(); }, []);

  if (selected) return <PublicationDetail pub={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="min-h-screen bg-[#E8ECEF] text-[#1A2530]">
      <Navbar />

      {/* ── Hero / Arama Bölümü ────────────────────────────────────── */}
      <section data-nav-theme="dark" className="relative overflow-hidden bg-[#1A2530] text-white pt-36 pb-28 px-6 lg:px-8">
        {/* Arka plan doku */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        {/* Gradient blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#5A7A8C]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <BookOpen className="w-4 h-4 text-[#d4c4a3]" />
            <span className="text-xs tracking-[0.35em] uppercase text-[#d4c4a3] font-medium">
              {language === 'tr' ? 'Makaleler & Yayınlar' : 'Articles & Publications'}
            </span>
          </motion.div>

          <motion.h1
            className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {language === 'tr' ? 'Hukuki Bakış Açımız.' : 'Our Legal Perspective.'}
          </motion.h1>

          <motion.p
            className="text-white/60 text-lg mb-12 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            {language === 'tr'
              ? 'Güncel hukuki gelişmeler, içtihat analizleri ve sektöre özel rehberler.'
              : 'Current legal developments, case law analyses, and sector-specific guides.'}
          </motion.p>

          {/* ── Premium Arama Barı ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className={`relative flex items-center gap-4 bg-white/[0.07] border rounded-2xl px-5 py-4 transition-all duration-300 ${
                searchFocused
                  ? 'border-[#d4c4a3]/70 bg-white/[0.1] shadow-[0_0_0_4px_rgba(212,196,163,0.1)]'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {/* Arama ikonu */}
              <Search className={`w-5 h-5 shrink-0 transition-colors duration-200 ${searchFocused ? 'text-[#d4c4a3]' : 'text-white/40'}`} />

              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={language === 'tr' ? 'Makale, konu veya yazar ara...' : 'Search articles, topics or authors...'}
                className="flex-1 bg-transparent text-white placeholder:text-white/35 text-base focus:outline-none"
              />

              {/* Temizle butonu */}
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.15 }}
                    onClick={clearSearch}
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>

              {/* Klavye kısayolu ipucu */}
              {!search && !searchFocused && (
                <kbd className="hidden sm:flex items-center gap-1 text-[11px] text-white/25 border border-white/10 rounded px-2 py-0.5 font-mono shrink-0">
                  /
                </kbd>
              )}
            </div>

            {/* Sonuç sayısı */}
            <AnimatePresence>
              {debouncedSearch && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="mt-3 text-xs text-white/45 pl-1"
                >
                  {filtered.length > 0
                    ? (language === 'tr'
                        ? `"${debouncedSearch}" için ${filtered.length} sonuç bulundu`
                        : `${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${debouncedSearch}"`)
                    : (language === 'tr' ? 'Sonuç bulunamadı' : 'No results found')}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── Kategori Filtreleri ────────────────────────────────────── */}
      <div data-nav-theme="light" className="sticky top-0 z-20 bg-[#E8ECEF]/90 backdrop-blur-md border-b border-[#C8CFD3]/60 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3.5 flex items-center gap-3 overflow-x-auto scrollbar-none">
          <Tag className="w-3.5 h-3.5 text-[#5A7A8C] shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap text-xs font-semibold px-4 py-1.5 rounded-full border transition-all duration-200 shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#1A2530] text-white border-[#1A2530]'
                  : 'bg-transparent text-[#4D5660] border-[#C8CFD3] hover:border-[#5A7A8C] hover:text-[#1A2530]'
              }`}
            >
              {cat === 'all' ? (language === 'tr' ? 'Tümü' : 'All') : cat}
            </button>
          ))}

          {/* Sağ: toplam */}
          <span className="ml-auto text-xs text-[#5A7A8C] shrink-0 font-medium">
            {filtered.length} {language === 'tr' ? 'makale' : 'article'}{filtered.length !== 1 && language === 'en' ? 's' : ''}
          </span>
        </div>
      </div>

      {/* ── Makale Grid ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 py-16 pb-28">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24"
            >
              <Search className="w-12 h-12 text-[#C8CFD3] mx-auto mb-4" />
              <p className="text-[#5A7A8C] text-lg font-medium mb-2">
                {language === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}
              </p>
              <p className="text-[#A8B0B5] text-sm">
                {language === 'tr'
                  ? 'Farklı bir arama terimi veya kategori deneyin.'
                  : 'Try a different search term or category.'}
              </p>
              <button
                onClick={() => { setSearch(''); setCategory('all'); }}
                className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-[#5A7A8C] hover:text-[#1A2530] transition-colors"
              >
                {language === 'tr' ? 'Filtreleri temizle' : 'Clear filters'}
              </button>
            </motion.div>
          ) : (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Öne çıkan — sadece filtre yokken ve arama yokken göster */}
              {!debouncedSearch && activeCategory === 'all' && featured && (
                <div className="mb-8">
                  <FeaturedCard pub={featured} onClick={setSelected} />
                </div>
              )}

              {/* Normal grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {((!debouncedSearch && activeCategory === 'all') ? rest : filtered).map((pub, i) => (
                  <ArticleCard key={pub.id} pub={pub} index={i} onClick={setSelected} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}