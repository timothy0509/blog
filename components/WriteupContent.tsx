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
  const [isCollapsed, setIsCollapsed] = useState(false);

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

      {/* Desktop collapse toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex fixed top-20 right-4 z-40 items-center gap-1 border-4 border-black px-3 py-2 font-bold uppercase text-xs bg-white shadow-[4px_4px_0_0_#000] hover:bg-black hover:text-white hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none"
        aria-expanded={!isCollapsed}
        aria-label={isCollapsed ? 'Show table of contents' : 'Hide table of contents'}
      >
        {isCollapsed ? '◀' : '▶'}
        <span className="hidden xl:inline">{isCollapsed ? ' Show TOC' : ' Hide TOC'}</span>
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-16 right-0 w-72 h-[calc(100vh-4rem)] overflow-y-auto bg-white border-l-4 border-black p-4 z-30
          transition-transform duration-200 ease-in-out
          lg:block
          ${isCollapsed ? 'lg:translate-x-full' : 'lg:translate-x-0'}
          ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        `}
        aria-label="Table of contents sidebar"
      >
        <TableOfContents headings={headings} />
      </aside>

      {/* Content */}
      <div className={`transition-all duration-200 ${isCollapsed ? 'lg:pr-0' : 'lg:pr-80'}`}>
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}