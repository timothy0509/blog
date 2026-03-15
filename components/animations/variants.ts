'use client';

import type { Transition } from 'framer-motion';

const snappyEasing: [number, number, number, number] = [0.4, 0, 0.2, 1];

export const brutalTransitions: Record<string, Transition> = {
  snappy: { duration: 0.15, ease: snappyEasing },
  instant: { duration: 0.08 },
  spring: { type: 'spring', stiffness: 400, damping: 25 },
  bouncy: { type: 'spring', stiffness: 300, damping: 15 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const slideInRight = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const glitchText = {
  initial: { opacity: 0, x: -5, skewX: -3 },
  animate: { opacity: 1, x: 0, skewX: 0 },
  exit: { opacity: 0, x: 5, skewX: 3 },
};

export const brutalPop = {
  initial: { opacity: 0, scale: 0.8, rotate: -3 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.9, rotate: 2 },
};

export const cardHover = {
  rest: { scale: 1, rotate: 0, boxShadow: '8px 8px 0 0 #000' },
  hover: { scale: 1.02, rotate: -0.5, boxShadow: '12px 12px 0 0 #000' },
  tap: { scale: 0.98, rotate: 0.5, boxShadow: '4px 4px 0 0 #000' },
};

export const featuredCardHover = {
  rest: { scale: 1, rotate: 1, boxShadow: '12px 12px 0 0 #000' },
  hover: { scale: 1.02, rotate: -0.5, boxShadow: '16px 16px 0 0 #000' },
  tap: { scale: 0.98, rotate: 2, boxShadow: '6px 6px 0 0 #000' },
};

export const buttonHover = {
  rest: { scale: 1, x: 0, y: 0 },
  hover: { scale: 1.02, x: 1, y: -1 },
  tap: { scale: 0.98, x: 1, y: 1 },
};

export const badgePop = {
  initial: { opacity: 0, scale: 0, rotate: -15 },
  animate: { opacity: 1, scale: 1, rotate: 0 },
  exit: { opacity: 0, scale: 0.8, rotate: 15 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export const heroText = {
  initial: { opacity: 0, y: 40, skewX: -5 },
  animate: { opacity: 1, y: 0, skewX: 0 },
};

export const sectionReveal = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0 },
};