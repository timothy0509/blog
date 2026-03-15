'use client';

import { useEffect, useState } from 'react';

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function TableOfContents({ headings, isCollapsed, onToggle }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

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
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="w-72">
      {/* Header with integrated toggle */}
      <div className="border-4 border-black bg-white shadow-[4px_4px_0_0_#000] flex items-stretch">
        <h3 className="flex-1 px-4 py-3 font-bold uppercase text-sm">
          Table of Contents
        </h3>
        <button
          onClick={onToggle}
          className="border-l-4 border-black px-3 font-bold text-sm hover:bg-black hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none"
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? 'Show table of contents' : 'Hide table of contents'}
          title={isCollapsed ? 'Show TOC' : 'Hide TOC'}
        >
          {isCollapsed ? '◀' : '▶'}
        </button>
      </div>

      {/* Content - only shown when not collapsed */}
      {!isCollapsed && (
        <nav
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