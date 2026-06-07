import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ── Site genelinde ortak animasyon dili ──
// Kart-stack tasarımına uygun: belirgin yukarı kayma + hafif scale + smooth snap

export const CARD_EASE = [0.22, 1, 0.36, 1]; // ease-out-quart (snappy)

const cardVariants = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.85, ease: CARD_EASE },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: CARD_EASE },
  },
};

/**
 * Tek bir öğeyi scroll'da kart gibi açar.
 * delay: gecikme (s); className ile dış sarmalayıcıya class verilebilir.
 */
export function Reveal({ children, delay = 0, className = '', as: Tag = motion.div }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <Tag
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay, duration: 0.85, ease: CARD_EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/**
 * Çocuk motion.X öğelerini sırayla kart gibi açar.
 * stagger: çocuklar arası gecikme (s).
 */
export function StaggerList({ children, className = '', stagger = 0.12 }) {
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
 * Birinci yükleme için (hero gibi, scroll beklemeden).
 */
export function Enter({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.95, delay, ease: CARD_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
