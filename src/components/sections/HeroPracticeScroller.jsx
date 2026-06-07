import React from 'react';
import { motion } from 'framer-motion';

export default function HeroPracticeScroller({ areas, onScrollTo }) {
  return (
    <motion.div
      className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col"
      style={{ height: '340px', width: '210px' }}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.8 }}
    >
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none rounded-t-sm" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none rounded-b-sm" />

      {/* Scrollable list - user scrolls manually */}
      <div className="overflow-y-auto h-full flex flex-col gap-1.5 pr-1 scrollbar-hide">
        {areas.map((area, i) => (
          <button
            key={i}
            onClick={onScrollTo}
            className="flex items-center gap-3 px-3 py-2.5 bg-bone/5 backdrop-blur-sm border border-bone/10 rounded-sm hover:border-cobalt/50 hover:bg-cobalt/10 transition-all text-left group shrink-0"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cobalt shrink-0 group-hover:scale-125 transition-transform" />
            <span className="text-[11px] text-bone/65 whitespace-nowrap group-hover:text-bone transition-colors leading-tight">
              {area.title}
            </span>
          </button>
        ))}
      </div>
    </motion.div>
  );
}