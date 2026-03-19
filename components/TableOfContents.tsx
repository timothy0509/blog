'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDownIcon } from '@/components/icons';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /^#{1,3}\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;
  
  while ((match = headingRegex.exec(content)) !== null) {
    const level = (match[0].match(/^#+/) || [''])[0].length;
    const text = match[1].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    headings.push({ id, text, level });
  }
  
  return headings;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const headings = extractHeadings(content);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0% -35% 0%' }
    );
    
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, [headings]);
  
  const scrollToHeading = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      setActiveId(id);
    }
  }, [prefersReducedMotion]);
  
  if (headings.length === 0) return null;
  
  return (
    <nav 
      className="border-4 border-black bg-white shadow-[4px_4px_0_0_#000]sticky top-24"
      aria-label="Table of Contents"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 font-bold uppercase text-sm border-b-4 border-black bg-[#DFE104] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[44px]"
        aria-expanded={isOpen}
        aria-controls="toc-content"
      >
        <span>Table of Contents</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
        >
          <ChevronDownIcon size={16} />
        </motion.span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id="toc-content"
            initial={prefersReducedMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            className="overflow-hidden"
          >
            <ul className="p-4 space-y-2 max-h-[50vh] overflow-y-auto">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={`
                      w-full text-left py-2 px-3 text-sm transition-colors duration-100
                      focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104]
                      min-h-[44px] flex items-center
                      ${heading.level === 2 ? 'pl-3' : heading.level === 3 ? 'pl-6' : 'pl-3'}
                      ${activeId === heading.id 
                        ? 'bg-[#DFE104] font-bold border-2 border-black' 
                        : 'hover:bg-zinc-100 border-2 border-transparent'
                      }
                    `}
                    aria-current={activeId === heading.id ? 'true' : undefined}
                  >
                    {heading.text}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}