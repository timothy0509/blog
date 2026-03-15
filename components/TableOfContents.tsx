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
    <div className="sticky top-4">
      <h3 className="border-4 border-black bg-white px-4 py-3 font-bold uppercase text-sm shadow-[4px_4px_0_0_#000]">
        Table of Contents
      </h3>
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
    </div>
  );
}