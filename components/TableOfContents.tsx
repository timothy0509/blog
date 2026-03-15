'use client';

import { useEffect, useState } from 'react';

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
      setIsOpen(false);
    }
  };

  if (headings.length ===0) return null;

  return (
    <div className="sticky top-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full border-4 border-black bg-white px-4 py-3 font-bold uppercase text-sm text-left shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none"
        aria-expanded={isOpen}
        aria-controls="toc-content"
      >
        <span className="flex items-center justify-between">
          <span>Table of Contents</span>
          <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
        </span>
      </button>

      {isOpen && (
        <nav
          id="toc-content"
          className="border-4 border-black border-t-0 bg-white"
          role="navigation"
          aria-label="Table of contents"
        >
          <ul className="py-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                    activeId === heading.id
                      ? 'bg-[#DFE104] font-bold'
                      : 'hover:bg-zinc-100'
                  } ${
                    heading.level === 3 ? 'pl-8' : ''
                  }`}
                >
                  {heading.text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}