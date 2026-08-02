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
      className="fixed top-0 w-full z-50 bg-white border-b-[6px] border-black"
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
      className="hidden md:flex items-center gap-6"
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

export function AnimatedFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.footer
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
      className={`w-full bg-black text-white border-t-[6px] border-black ${className}`}
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
      className="flex-grow w-full pt-20"
    >
      {children}
    </motion.main>
  );
}
