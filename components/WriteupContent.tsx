'use client';

import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import TableOfContents, { type TOCHeading } from './TableOfContents';

interface WriteupContentProps {
  content: string;
  headings: TOCHeading[];
}

export default function WriteupContent({ content, headings }: WriteupContentProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopOpen, setIsDesktopOpen] = useState(true);

  if (headings.length === 0) {
    return <MarkdownRenderer content={content} />;
  }

  return (
    <div className="relative">
      {/* Content - original layout, no changes */}
      <MarkdownRenderer content={content} />

      {/* Mobile toggle button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 border-4 border-black px-4 py-3 font-bold uppercase text-sm bg-[#DFE104] shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none"
        aria-expanded={isMobileOpen}
        aria-label="Toggle table of contents"
      >
        {isMobileOpen ? 'Close' : 'Contents'}
      </button>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* TOC - Fixed position on the right, layered on top */}
      <div
        className={`
          fixed z-40 transition-all duration-200
          /* Mobile: slide from right, full height */
          top-16 right-0 w-72 h-[calc(100vh-4rem)]
          lg:top-20 lg:h-auto lg:max-h-[calc(100vh-6rem)]
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          ${isDesktopOpen ? 'lg:opacity-100 lg:visible' : 'lg:opacity-0 lg:invisible lg:translate-x-4'}
        `}
      >
        <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000] h-full overflow-hidden flex flex-col">
          {/* Header with toggle */}
          <div className="flex items-center justify-between border-b-4 border-black bg-white flex-shrink-0">
            <h3 className="px-4 py-3 font-bold uppercase text-sm flex-1">
              Table of Contents
            </h3>
            <button
              onClick={() => setIsDesktopOpen(!isDesktopOpen)}
              className="hidden lg:flex px-4 py-3 border-l-4 border-black hover:bg-black hover:text-white transition-colors font-bold"
              aria-label={isDesktopOpen ? 'Hide table of contents' : 'Show table of contents'}
              title={isDesktopOpen ? 'Hide' : 'Show'}
            >
              {isDesktopOpen ? '−' : '+'}
            </button>
          </div>

          {/* TOC content */}
          <div className="flex-1 overflow-y-auto">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </div>

      {/* Desktop show button - appears when TOC is hidden */}
      <button
        onClick={() => setIsDesktopOpen(true)}
        className={`
          hidden lg:flex fixed right-4 top-20 z-40 items-center gap-2 border-4 border-black px-3 py-2 font-bold uppercase text-xs bg-[#DFE104] shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none
          ${isDesktopOpen ? 'lg:opacity-0 lg:invisible' : 'lg:opacity-100 lg:visible'}
        `}
        aria-label="Show table of contents"
      >
        <span>TOC</span>
        <span>+</span>
      </button>
    </div>
  );
}