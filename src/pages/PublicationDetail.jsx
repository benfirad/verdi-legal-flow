import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

function renderContent(text) {
  return text.split('\n\n').map((block, i) => {
    if (block.startsWith('**') && block.endsWith('**')) {
      return <h3 key={i} className="font-fraunces text-xl font-bold text-bone mt-8 mb-3">{block.replace(/\*\*/g, '')}</h3>;
    }
    // inline bold
    const parts = block.split(/\*\*(.+?)\*\*/g);
    return (
      <p key={i} className="text-muted-foreground leading-relaxed mb-4 text-[15px]">
        {parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="text-bone font-semibold">{part}</strong> : part
        )}
      </p>
    );
  });
}

export default function PublicationDetail({ pub, onBack }) {
  const { language, t } = useLanguage();

  const formatDate = (d) =>
    new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(d));

  return (
    <div className="min-h-screen bg-ink text-foreground">
      <Navbar />

      {/* Hero image */}
      <div className="relative h-[50vh] overflow-hidden">
        <motion.img
          src={pub.image}
          alt={pub.title[language]}
          className="w-full h-full object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-20 relative z-10 pb-24">
        {/* Back */}
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-bone transition-colors mb-10 group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {language === 'tr' ? 'Tüm Yayınlar' : 'All Publications'}
        </motion.button>

        {/* Category */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-5"
        >
          <span className="text-[11px] px-3 py-1.5 bg-cobalt/15 text-cobalt border border-cobalt/20 rounded-sm font-medium tracking-wide">
            {pub.category[language]}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-fraunces text-3xl md:text-4xl lg:text-5xl font-bold text-bone leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {pub.title[language]}
        </motion.h1>

        {/* Meta */}
        <motion.div
          className="flex flex-wrap items-center gap-5 text-sm text-muted-foreground mb-10 pb-8 border-b border-border/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="flex items-center gap-2"><User className="w-4 h-4 text-cobalt" />{pub.author}</span>
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-cobalt" />{formatDate(pub.date)}</span>
          <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-cobalt" />{pub.readTime[language]}</span>
        </motion.div>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {renderContent(pub.content[language])}
        </motion.div>

        {/* Back button bottom */}
        <motion.button
          onClick={onBack}
          className="mt-12 flex items-center gap-2 px-6 py-3 border border-border/30 text-muted-foreground text-sm rounded-sm hover:border-cobalt/40 hover:text-bone transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <ArrowLeft className="w-4 h-4" />
          {language === 'tr' ? 'Tüm Yayınlara Dön' : 'Back to All Publications'}
        </motion.button>
      </div>

      <Footer />
    </div>
  );
}