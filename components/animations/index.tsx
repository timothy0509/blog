'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BrutalCardProps {
  children: ReactNode;
  className?: string;
}

export function BrutalCard({ children, className = '' }: BrutalCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ x: -4, y: -4, rotate: -0.5 }}
      whileTap={{ x: 2, y: 2, rotate: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.article>
  );
}

interface BrutalButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function BrutalButton({ 
  children, 
  className = '', 
  onClick,
  type = 'button'
}: BrutalButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 1, y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.08 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const words = text.split(' ');
  
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, x: -10, skewX: -5 }}
          animate={{ opacity: 1, x: 0, skewX: 0 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: i * 0.08 }}
          className="inline-block"
          style={{ marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

interface PopInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PopIn({ children, className = '', delay = 0 }: PopInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SlideInProps {
  children: ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
}

export function SlideIn({ 
  children, 
  className = '', 
  direction = 'up',
  delay = 0 
}: SlideInProps) {
  const directionMap = {
    left: { initial: { x: -40 }, animate: { x: 0 } },
    right: { initial: { x: 40 }, animate: { x: 0 } },
    up: { initial: { y: 30 }, animate: { y: 0 } },
    down: { initial: { y: -30 }, animate: { y: 0 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionMap[direction].initial }}
      animate={{ opacity: 1, ...directionMap[direction].animate }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}