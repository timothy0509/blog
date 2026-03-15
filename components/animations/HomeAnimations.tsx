'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroSectionProps {
  children: ReactNode;
}

export function HeroSection({ children }: HeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="mb-4"
    >
      {children}
    </motion.section>
  );
}

interface HeroTitleProps {
  children: ReactNode;
}

export function HeroTitle({ children }: HeroTitleProps) {
  return (
    <motion.h1
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="text-hero font-display uppercase leading-none mb-6 tracking-tight"
    >
      {children}
    </motion.h1>
  );
}

export function HeroTagline({ children }: HeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className="text-xl md:text-2xl font-bold max-w-2xl border-l-8 border-[#DFE104] pl-4 py-2 bg-white/50"
    >
      {children}
    </motion.div>
  );
}

interface AnimatedWordProps {
  children: ReactNode;
  delay?: number;
  isHighlight?: boolean;
}

export function AnimatedWord({ children, delay = 0, isHighlight = false }: AnimatedWordProps) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20, skewX: isHighlight ? 0 : -5 }}
      animate={{ opacity: 1, y: 0, skewX: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay }}
      className={isHighlight ? "inline-block bg-black text-white px-3 py-1 transform rotate-1 ml-2 border-4 border-black" : "inline-block"}
    >
      {children}
    </motion.span>
  );
}

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function SectionReveal({ children, className = '', delay = 0 }: SectionRevealProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

interface SectionHeaderProps {
  children: ReactNode;
}

export function SectionHeader({ children }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      className="border-b-4 border-black pb-4 mb-6"
    >
      {children}
    </motion.div>
  );
}

interface TagProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedTag({ children, delay = 0, className = '' }: TagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

interface TagsContainerProps {
  children: ReactNode;
}

export function TagsContainer({ children }: TagsContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.3,
          },
        },
      }}
      className="flex flex-wrap gap-3"
    >
      {children}
    </motion.div>
  );
}