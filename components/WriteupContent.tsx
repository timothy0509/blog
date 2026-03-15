'use client';

import { useState } from 'react';
import MarkdownRenderer from './MarkdownRenderer';
import TableOfContents, { type TOCHeading } from './TableOfContents';

interface WriteupContentProps {
  content: string;
  headings: TOCHeading[];
}

export default function WriteupContent({ content, headings }: WriteupContentProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (headings.length === 0) {
    return <MarkdownRenderer content={content} />;
  }

  return (
    <div className="relative">
      {/* Mobile toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-40 border-4 border-black px-4 py-3 font-bold uppercase text-sm bg-[#DFE104] shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none"
        aria-expanded={isSidebarOpen}
        aria-label="Toggle table of contents"
      >
        {isSidebarOpen ? 'Close' : 'Contents'}
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Desktop TOC - sticky, starts in flow, sticks to top-right */}
      <aside
        className="hidden lg:block sticky top-20 float-right -mr-80 w-72 z-30"
        aria-label="Table of contents sidebar"
      >
        <TableOfContents headings={headings} />
      </aside>

      {/* Mobile TOC sidebar */}
      <aside
        className={`
          lg:hidden fixed top-16 right-0 w-72 h-[calc(100vh-4rem)] overflow-y-auto bg-white border-l-4 border-black p-4 z-30
          transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        aria-label="Table of contents sidebar"
      >
        <div className="mb-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="w-full border-4 border-black px-4 py-3 font-bold uppercase text-sm bg-white shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white transition-colors"
          >
            Close ✕
          </button>
        </div>
        <TableOfContents headings={headings} />
      </aside>

      {/* Content */}
      <div>
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}