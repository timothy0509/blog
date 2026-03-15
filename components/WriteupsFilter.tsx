'use client';

import { useState, useMemo } from 'react';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import FilterSidebar from './FilterSidebar';
import Link from 'next/link';

interface WriteupsFilterProps {
  writeups: WriteupInfo[];
}

export default function WriteupsFilter({ writeups }: WriteupsFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = useMemo(
    () => [...new Set(writeups.map((w) => w.category))].sort(),
    [writeups]
  );

  const events = useMemo(
    () => [...new Set(writeups.map((w) => w.event))].sort(),
    [writeups]
  );

  const filteredWriteups = useMemo(
    () =>
      writeups.filter((w) => {
        if (selectedCategory && w.category !== selectedCategory) return false;
        if (selectedEvent && w.event !== selectedEvent) return false;
        return true;
      }),
    [writeups, selectedCategory, selectedEvent]
  );

  const handleClear = () => {
    setSelectedCategory(null);
    setSelectedEvent(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8 pb-6 border-b-[6px] border-black">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-display font-display uppercase leading-none mb-2 tracking-tight">
              All Writeups
            </h1>
            <p className="text-lg font-bold">
              <span className="bg-black text-white px-2 py-0.5">{filteredWriteups.length}</span>
              <span className="ml-2">writeup{filteredWriteups.length !== 1 ? 's' : ''}</span>
              {(selectedCategory || selectedEvent) && (
                <span className="ml-2 text-sm bg-[#DFE104] px-2 py-0.5 border-2 border-black">(filtered)</span>
              )}
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-[#DFE104] hover:bg-black hover:text-white transition-colors duration-100 shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
            aria-expanded={sidebarOpen}
            aria-controls="filter-sidebar"
          >
            Filters {sidebarOpen ? '▲' : '▼'}
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar
          categories={categories}
          events={events}
          selectedCategory={selectedCategory}
          selectedEvent={selectedEvent}
          onCategoryChange={setSelectedCategory}
          onEventChange={setSelectedEvent}
          onClear={handleClear}
          isOpen={sidebarOpen}
        />

        <div className="flex-1">
          {filteredWriteups.length === 0 ? (
            <div className="border-[6px] border-black p-8 bg-white shadow-[8px_8px_0_0_#000] text-center">
              <p className="text-xl font-bold mb-4">No writeups match your filters.</p>
              <button
                onClick={handleClear}
                className="border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-[#DFE104] hover:bg-black hover:text-white transition-colors duration-100 shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredWriteups.map((w) => {
              const color = getCategoryColor(w.category);
              return (
                <Link href={`/writeups/${w.slug.join('/')}`} key={w.path} className="block group mb-6">
                  <article className="border-[6px] border-black p-5 bg-white shadow-[8px_8px_0_0_#000] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#000] hover:rotate-[-0.5deg] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_0_#000] transition-all duration-150">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-bold bg-[#DFE104] border-2 border-black px-2.5 py-1 text-xs uppercase tracking-wide">
                            {w.event}
                          </span>
                          <span className={`font-bold border-2 border-black px-2.5 py-1 text-xs uppercase tracking-wide ${color.bg} ${color.text}`}>
                            {w.category}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-display uppercase group-hover:underline decoration-[3px] underline-offset-4 tracking-tight">
                          {w.title}
                        </h3>
                      </div>
                      <div className="flex items-center font-bold text-base">
                        <span className="mr-2">Read</span>
                        <span className="text-xl">&rarr;</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}