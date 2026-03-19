'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const categories = useMemo(
    () => [...new Set(writeups.map((w) => w.category))].sort(),
    [writeups]
  );

  const events = useMemo(
    () => [...new Set(writeups.map((w) => w.event))].sort(),
    [writeups]
  );

  const authors = useMemo(() => {
    const authorSet = new Set<string>();
    writeups.forEach((w) => {
      if (w.nickname) {
        authorSet.add(w.nickname);
      }
    });
    return [...authorSet].sort();
  }, [writeups]);

  const filteredWriteups = useMemo(
    () =>
      writeups.filter((w) => {
        if (selectedCategory && w.category !== selectedCategory) return false;
        if (selectedEvent && w.event !== selectedEvent) return false;
        if (selectedAuthor) {
          if (selectedAuthor === 'Unknown') {
            return !w.nickname;
          }
          return w.nickname === selectedAuthor;
        }
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = w.title.toLowerCase().includes(query);
          const matchesEvent = w.event.toLowerCase().includes(query);
          const matchesCategory = w.category.toLowerCase().includes(query);
          const matchesAuthor = w.nickname?.toLowerCase().includes(query);
          if (!matchesTitle && !matchesEvent && !matchesCategory && !matchesAuthor) {
            return false;
          }
        }
        return true;
      }),
    [writeups, selectedCategory, selectedEvent, selectedAuthor, searchQuery]
  );

  const handleClear = () => {
    setSelectedCategory(null);
    setSelectedEvent(null);
    setSelectedAuthor(null);
    setSearchQuery('');
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {filteredWriteups.length} writeup{filteredWriteups.length !== 1 ? 's' : ''} found
        {(selectedCategory || selectedEvent || selectedAuthor || searchQuery) && ' (filtered)'}.
      </div>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8 pb-6 border-b-[6px] border-black"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="text-display font-display uppercase leading-none mb-2 tracking-tight"
            >
              All Writeups
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="text-lg font-bold"
            >
              <motion.span
                key={filteredWriteups.length}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.1 }}
                className="bg-black text-white px-2 py-0.5"
              >
                {filteredWriteups.length}
              </motion.span>
              <span className="ml-2">writeup{filteredWriteups.length !== 1 ? 's' : ''}</span>
              <AnimatePresence>
                {(selectedCategory || selectedEvent || selectedAuthor || searchQuery) && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: 10 }}
                    transition={{ duration: 0.1 }}
                    className="ml-2 text-sm bg-[#DFE104] px-2 py-0.5 border-2 border-black"
                  >
                    (filtered)
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-[#DFE104] hover:bg-black hover:text-white transition-colors duration-100 shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
            aria-expanded={sidebarOpen}
            aria-controls="filter-sidebar"
          >
            Filters {sidebarOpen ? '▲' : '▼'}
          </motion.button>
        </div>
      </motion.header>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar
          categories={categories}
          events={events}
          authors={authors}
          selectedCategory={selectedCategory}
          selectedEvent={selectedEvent}
          selectedAuthor={selectedAuthor}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onEventChange={setSelectedEvent}
          onAuthorChange={setSelectedAuthor}
          onSearchChange={setSearchQuery}
          onClear={handleClear}
          isOpen={sidebarOpen}
        />

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {filteredWriteups.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.15 }}
                className="border-[6px] border-black p-8 bg-white shadow-[8px_8px_0_0_#000] text-center"
              >
                <motion.p
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                  className="text-xl font-bold mb-4"
                >
                  No writeups match your filters.
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClear}
                  className="border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-[#DFE104] hover:bg-black hover:text-white transition-colors duration-100 shadow-[4px_4px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
                >
                  Clear Filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial="initial"
                animate="animate"
                variants={{
                  initial: {},
                  animate: {
                    transition: {
                      staggerChildren: 0.06,
                    },
                  },
                }}
              >
                <AnimatePresence>
                  {filteredWriteups.map((w) => {
                    const color = getCategoryColor(w.category);
                    return (
                      <motion.div
                        key={w.path}
                        variants={{
                          initial: { opacity: 0, y: 20 },
                          animate: { opacity: 1, y: 0 },
                          exit: { opacity: 0, x: -20 },
                        }}
                        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <Link href={`/writeups/${w.slug.join('/')}`} className="block group mb-6">
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
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}