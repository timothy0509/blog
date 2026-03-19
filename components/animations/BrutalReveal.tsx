'use client';

import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface BrutalRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function BrutalReveal({ children, className = '', delay = 0 }: BrutalRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}