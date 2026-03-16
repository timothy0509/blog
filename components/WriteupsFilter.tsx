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
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8 pb-6 border-b border-slate-200/50"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="text-display font-displayleading-none mb-2 tracking-tight text-slate-800"
            >
              All Writeups
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
              className="text-lg font-semibold text-slate-600"
            >
              <motion.span
                key={filteredWriteups.length}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-800 text-white px-2.5 py-0.5 rounded-full"
              >
                {filteredWriteups.length}
              </motion.span>
              <span className="ml-2">writeup{filteredWriteups.length !== 1 ? 's' : ''}</span>
              <AnimatePresence>
                {(selectedCategory || selectedEvent) && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: 10 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 text-sm bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full"
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
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden glass-btn px-5 py-2.5 hover:bg-blue-500 hover:text-white uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
          selectedCategory={selectedCategory}
          selectedEvent={selectedEvent}
          onCategoryChange={setSelectedCategory}
          onEventChange={setSelectedEvent}
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
                transition={{ duration: 0.25 }}
                className="glass-card p-8 text-center"
              >
                <motion.p
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 0.4, times: [0, 0.5, 1] }}
                  className="text-xl font-semibold mb-4 text-slate-700"
                >
                  No writeups match your filters.
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClear}
                  className="glass-btn px-5 py-2.5 hover:bg-blue-500 hover:text-white uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      >
                        <Link href={`/writeups/${w.slug.join('/')}`} className="block group mb-6">
                          <article className="glass-card p-6group cursor-pointer">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="font-semibold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-3 py-1 text-xs uppercase tracking-wide rounded-full">
                                    {w.event}
                                  </span>
                                  <span className={`font-semibold ${color.bg} ${color.text} px-3 py-1 text-xs uppercase tracking-wide rounded-full`}>
                                    {w.category}
                                  </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-display group-hover:text-blue-600 tracking-tight text-slate-800 transition-colors duration-200">
                                  {w.title}
                                </h3>
                              </div>
                              <div className="flex items-center font-semibold text-base text-slate-600">
                                <span className="mr-2">Read</span>
                                <span className="text-xl">→</span>
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