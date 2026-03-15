'use client';

import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import TableOfContents, { type TOCHeading } from './TableOfContents';

interface WriteupContentProps {
  content: string;
  headings: TOCHeading[];
}

export default function WriteupContent({ content, headings }: WriteupContentProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) {
    return <MarkdownRenderer content={content} />;
  }

  return (
    <div className="relative">
      {/* Content */}
      <MarkdownRenderer content={content} />

      {/* Mobile toggle - bottom right */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 border-4 border-black px-4 py-3 font-bold uppercase text-sm bg-[#DFE104] shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none"
        aria-expanded={isOpen}
        aria-label="Toggle table of contents"
      >
        {isOpen ? 'Close' : 'Contents'}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Desktop TOC - sticky position below header */}
      <div className="hidden lg:block">
        <div className="sticky float-right -mr-80 top-20 w-72 z-30">
          <div className="sticky top-20">
            {/* Toggle button - always visible */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-full flex items-center justify-between border-4 border-black px-4 py-3 font-bold uppercase text-sm bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] transition-all duration-100 mb-2"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Hide table of contents' : 'Show table of contents'}
            >
              <span>Table of Contents</span>
              <span>{isOpen ? '−' : '+'}</span>
            </button>

            {/* TOC Panel */}
            {isOpen && (
              <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] max-h-[calc(100vh-12rem)] overflow-y-auto">
                <TableOfContents headings={headings} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile TOC - slide from right */}
      <div
        className={`
          lg:hidden fixed z-40
          top-24 right-0 w-72 h-[calc(100vh-6rem)]
          bg-white border-4 border-black border-r-0 shadow-[8px_8px_0_0_#000]
          transition-transform duration-200
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="h-full overflow-y-auto">
          <TableOfContents headings={headings} />
        </div>
      </div>
    </div>
  );
}