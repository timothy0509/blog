'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

export function AnimatedHeader({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.header
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="border-b-[6px] border-black p-4 md:p-6 flex flex-col sm:flex-row justify-between sm:items-center bg-brutal-header gap-4"
    >
      {children}
    </motion.header>
  );
}

export function AnimatedNav({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.nav
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className="flex gap-3 font-bold text-sm sm:text-base"
      aria-label="Main navigation"
    >
      {children}
    </motion.nav>
  );
}

export function AnimatedLogo({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedFooter({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.footer
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="border-t-[6px] border-black p-4 md:p-6 bg-brutal-footer text-white uppercase text-sm flex flex-col sm:flex-row justify-between items-center gap-4"
    >
      {children}
    </motion.footer>
  );
}

export function AnimatedMain({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
      className="flex-grow w-full p-4 md:p-8 md:pt-12"
    >
      {children}
    </motion.main>
  );
}