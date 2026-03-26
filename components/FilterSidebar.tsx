'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { getCategoryColor } from '@/lib/colors';

interface FilterSidebarProps {
  categories: string[];
  events: string[];
  authors: string[];
  selectedCategory: string | null;
  selectedEvent: string | null;
  selectedAuthor: string | null;
  searchQuery: string;
  onCategoryChange: (category: string | null) => void;
  onEventChange: (event: string | null) => void;
  onAuthorChange: (author: string | null) => void;
  onSearchChange: (query: string) => void;
  onClear: () => void;
  isOpen: boolean;
}

export default function FilterSidebar({
  categories,
  events,
  authors,
  selectedCategory,
  selectedEvent,
  selectedAuthor,
  searchQuery,
  onCategoryChange,
  onEventChange,
  onAuthorChange,
  onSearchChange,
  onClear,
  isOpen,
}: FilterSidebarProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.aside
      initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.1 }}
      className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-72 shrink-0 md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto px-2 md:pl-2 md:pr-8 pb-4`}
      id="filter-sidebar"
    >
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.05 }}
        className="mb-8"
      >
        <h3 className="font-bold text-base uppercase mb-4 border-b-4 border-black pb-2 tracking-wide">Search</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search writeups..."
            aria-label="Search writeups by title, event, category, or author"
            className="w-full border-4 border-black px-4 py-3 font-mono text-sm bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[4px_4px_0_0_#000] placeholder:text-gray-400 min-h-[44px] focus:shadow-[6px_6px_0_0_#000] focus:-translate-x-0.5 focus:-translate-y-0.5 transition-all duration-150"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors font-bold w-8 h-8 flex items-center justify-center hover:bg-[#DFE104]"
            >
              ×
            </button>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.15 }}
        className="mb-8"
      >
        <h3 className="font-bold text-base uppercase mb-4 border-b-4 border-black pb-2 tracking-wide">Categories</h3>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.03,
                delayChildren: prefersReducedMotion ? 0 : 0.2,
              },
            },
          }}
          className="flex flex-wrap md:flex-col gap-2"
        >
          {categories.map((cat) => {
            const color = getCategoryColor(cat);
            const isSelected = selectedCategory === cat;
            return (
              <motion.button
                key={cat}
                variants={{
                  initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, rotate: prefersReducedMotion ? 0 : -3 },
                  animate: { opacity: 1, scale: 1, rotate: 0 },
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onCategoryChange(isSelected ? null : cat)}
                aria-pressed={isSelected}
                whileHover={prefersReducedMotion ? {} : (!isSelected ? { x: -2, y: -2 } : {})}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className={`border-4 border-black px-3 py-3 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[44px] ${color.bg} ${color.text} ${
                  isSelected 
                    ? 'shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg] animate-pulse-brutal' 
                    : 'hover:shadow-[4px_4px_0_0_#000]'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.25 }}
        className="mb-8"
      >
        <h3 className="font-bold text-base uppercase mb-4 border-b-4 border-black pb-2 tracking-wide">Events</h3>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.02,
                delayChildren: prefersReducedMotion ? 0 : 0.3,
              },
            },
          }}
          className="flex flex-wrap md:flex-col gap-2"
        >
          {events.map((event) => {
            const isSelected = selectedEvent === event;
            return (
              <motion.button
                key={event}
                variants={{
                  initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onEventChange(isSelected ? null : event)}
                aria-pressed={isSelected}
                whileHover={prefersReducedMotion ? {} : (!isSelected ? { x: -2, y: -2 } : {})}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className={`border-4 border-black px-3 py-3 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[44px] ${
                  isSelected 
                    ? 'bg-[#DFE104] text-black shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]' 
                    : 'bg-white hover:bg-[#DFE104] hover:shadow-[4px_4px_0_0_#000]'
                }`}
              >
                {event}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.35 }}
        className="mb-8"
      >
        <h3 className="font-bold text-base uppercase mb-4 border-b-4 border-black pb-2 tracking-wide">Authors</h3>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: prefersReducedMotion ? 0 : 0.02,
                delayChildren: prefersReducedMotion ? 0 : 0.4,
              },
            },
          }}
          className="flex flex-wrap md:flex-col gap-2"
        >
          {authors.map((author) => {
            const isSelected = selectedAuthor === author;
            return (
              <motion.button
                key={author}
                variants={{
                  initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onAuthorChange(isSelected ? null : author)}
                aria-pressed={isSelected}
                whileHover={prefersReducedMotion ? {} : (!isSelected ? { x: -2, y: -2 } : {})}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                className={`border-4 border-black px-3 py-3 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[44px] ${
                  isSelected 
                    ? 'bg-[#1D3557] text-white shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]' 
                    : 'bg-white hover:bg-[#1D3557] hover:text-white hover:shadow-[4px_4px_0_0_#000]'
                }`}
              >
                {author}
              </motion.button>
            );
          })}
          <motion.button
            variants={{
              initial: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.9 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.1, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => onAuthorChange(selectedAuthor === 'Unknown' ? null : 'Unknown')}
            aria-pressed={selectedAuthor === 'Unknown'}
            whileHover={selectedAuthor !== 'Unknown' ? { x: -2, y: -2 } : {}}
            whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
            className={`border-4 border-black px-3 py-3 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[44px] border-dashed ${
              selectedAuthor === 'Unknown'
                ? 'bg-zinc-500 text-white shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]' 
                : 'bg-white hover:bg-zinc-500 hover:text-white hover:shadow-[4px_4px_0_0_#000]'
            }`}
          >
            Unknown
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {(selectedCategory || selectedEvent || selectedAuthor || searchQuery) && (
          <motion.button
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8, y: prefersReducedMotion ? 0 : 10 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1] }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            onClick={onClear}
            className="border-4 border-black px-4 py-3 font-bold uppercase text-xs bg-white hover:bg-black hover:text-white transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] min-h-[44px] w-full"
          >
            Clear Filters
          </motion.button>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}