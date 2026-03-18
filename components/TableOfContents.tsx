'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Heading } from '@/lib/headings';

interface TableOfContentsProps {
  headings: Heading[];
}

function getInitialReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialReducedMotion);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean) as HTMLElement[];

    if (headingElements.length === 0) return;

    const observerCallback: IntersectionObserverCallback = (entries) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        setActiveId(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-15% 0px -70% 0px',
      threshold: 0,
    });

    headingElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      setActiveId(id);
      setIsExpanded(false);
    }
  };

  if (headings.length < 3) {
    return null;
  }

  const animationProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
      };

  return (
    <nav
      aria-label="Table of contents"
      className="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start"
    >
      {/* Mobile Toggle */}
      <motion.button
        initial={prefersReducedMotion ? {} : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full lg:hidden border-4 border-black px-4 py-3 font-bold uppercase text-sm bg-[#DFE104] hover:bg-black hover:text-white transition-colors duration-150 shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 flex items-center justify-between"
        aria-expanded={isExpanded}
        aria-controls="toc-content"
      >
        <span>Table of Contents</span>
        <span className="text-lg" aria-hidden="true">
          {isExpanded ? '▲' : '▼'}
        </span>
      </motion.button>

      {/* ToC Content */}
      <AnimatePresence initial={false}>
        <motion.div
          id="toc-content"
          initial={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={prefersReducedMotion ? {} : { opacity: 0, height: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className={`
            ${isExpanded ? 'block' : 'hidden'}
            lg:block
            border-[6px] border-black bg-white shadow-[8px_8px_0_0_#000] p-4
            lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto
          `}
        >
            <h2 className="font-display uppercase text-lg font-bold mb-4 border-b-4 border-black pb-2 tracking-tight">
              Contents
            </h2>

            <ul className="space-y-1" role="list">
              {headings.map((heading, index) => (
                <motion.li
                  key={heading.id}
                  {...animationProps}
                  transition={
                    prefersReducedMotion
                      ? {}
                      : {
                          duration: 0.15,
                          delay: index * 0.03,
                          ease: [0.4, 0, 0.2, 1],
                        }
                  }
                  className={heading.level === 3 ? 'ml-4' : ''}
                >
                  <button
                    onClick={() => handleClick(heading.id)}
                    className={`
                      text-left w-full font-bold text-sm py-2 px-3
                      transition-all duration-150
                      focus:outline-none focus-visible:ring-4 focus-visible:ring-[#DFE104] focus-visible:ring-offset-0
                      hover:translate-x-[-2px]
                      ${
                        activeId === heading.id
                          ? 'bg-[#DFE104]/10 border-l-4 border-[#DFE104] text-black'
                          : 'border-l-4 border-transparent text-zinc-600 hover:text-black'
                      }
                      ${
                        activeId === heading.id
                          ? 'underline decoration-[3px] underline-offset-4'
                          : ''
                      }
                    `}
                    aria-current={activeId === heading.id ? 'true' : undefined}
                  >
                    {heading.text}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
      </AnimatePresence>
    </nav>
  );
}
