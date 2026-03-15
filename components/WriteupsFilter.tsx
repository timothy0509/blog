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
      <header className="mb-8 pb-6 border-b-[6px] border-black dark:border-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-impact)] uppercase leading-none mb-2">
              All Writeups
            </h1>
            <p className="text-xl font-bold">
              {filteredWriteups.length} writeup{filteredWriteups.length !== 1 ? 's' : ''}
              {(selectedCategory || selectedEvent) && ' (filtered)'}
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden border-4 border-black dark:border-white px-4 py-2 font-bold uppercase bg-yellow-400"
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
            <div className="brutal-card p-8 text-center">
              <p className="text-xl font-bold">No writeups match your filters.</p>
              <button
                onClick={handleClear}
                className="mt-4 border-4 border-black dark:border-white px-4 py-2 font-bold uppercase bg-yellow-400 hover:bg-yellow-300"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredWriteups.map((w) => {
              const color = getCategoryColor(w.category);
              return (
                <Link href={`/writeups/${w.slug.join('/')}`} key={w.path} className="block group mb-6">
                  <article className="brutal-card p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="stamp-label bg-yellow-400">
                            {w.event}
                          </span>
                          <span className={`stamp-label ${color.bg} ${color.text}`}>
                            {w.category}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-[family-name:var(--font-impact)] uppercase group-hover:underline decoration-4 underline-offset-4">
                          {w.title}
                        </h3>
                      </div>
                      <div className="flex items-center font-bold text-lg">
                        <span className="mr-2">Read</span>
                        <span className="text-2xl">&rarr;</span>
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