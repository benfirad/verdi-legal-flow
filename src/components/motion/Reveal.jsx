import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Site geneli animasyon dili: YATAY SLIDE (sinematik) ──
// Öğeler yan taraftan kayarak ekrana girer.

export const CARD_EASE = [0.22, 1, 0.36, 1]; // ease-out-quart (snap)

const DEFAULT_OFFSET = 100; // px

function makeVariants(from = 'left', offset = DEFAULT_OFFSET) {
  const x = from === 'right' ? offset : from === 'left' ? -offset : 0;
  const y = from === 'bottom' ? offset : from === 'top' ? -offset : 0;
  return {
    hidden: { opacity: 0, x, y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.95, ease: CARD_EASE },
    },
  };
}

/**
 * Scroll'a girince yan taraftan slide reveal.
 * from: 'left' | 'right' | 'top' | 'bottom' (default 'left')
 * offset: kaç piksel uzaktan kaysın
 * delay: gecikme
 */
export function Reveal({
  children,
  delay = 0,
  from = 'left',
  offset = DEFAULT_OFFSET,
  className = '',
  as: Tag = motion.div,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const variants = makeVariants(from, offset);

  return (
    <Tag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay, duration: 0.95, ease: CARD_EASE }}
      className={className}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </Tag>
  );
}

/**
 * StaggerList içindeki çocuk motion.X öğeleri için varsayılan variant.
 * Soldan kayarak gelir.
 */
export const itemVariants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: CARD_EASE },
  },
};

/**
 * Çocuk öğeleri sırayla soldan kaydırarak açar.
 */
export function StaggerList({ children, className = '', stagger = 0.1 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * İlk yükleme animasyonu (scroll beklemeden).
 * Hero gibi bölümlerde kullanılır. Soldan kayar.
 */
export function Enter({ children, delay = 0, from = 'left', offset = 60, className = '' }) {
  const x = from === 'right' ? offset : from === 'left' ? -offset : 0;
  const y = from === 'bottom' ? offset : from === 'top' ? -offset : 0;

  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1, delay, ease: CARD_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
