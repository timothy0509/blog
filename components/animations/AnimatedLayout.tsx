'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function AnimatedHeader({ children }: { children: ReactNode }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="glass-nav border-b border-slate-200/50 p-4 md:p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4"
    >
      {children}
    </motion.header>
  );
}

export function AnimatedNav({ children }: { children: ReactNode }) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className="flex gap-3 font-semibold text-sm sm:text-base"
      aria-label="Main navigation"
    >
      {children}
    </motion.nav>
  );
}

export function AnimatedLogo({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedFooter({ children }: { children: ReactNode }) {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="glass-nav border-t border-slate-200/50 p-4 md:p-6 text-sm flex flex-col sm:flex-row justify-between items-center gap-4"
    >
      {children}
    </motion.footer>
  );
}

export function AnimatedMain({ children }: { children: ReactNode }) {
  return (
    <motion.main
      id="main-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="flex-grow w-full p-4 md:p-8 md:pt-12"
    >
      {children}
    </motion.main>
  );
}