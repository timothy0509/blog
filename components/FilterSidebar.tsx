'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryColor } from '@/lib/colors';

interface FilterSidebarProps {
  categories: string[];
  events: string[];
  authors: string[];
  selectedCategory: string | null;
  selectedEvent: string | null;
  selectedAuthor: string | null;
  onCategoryChange: (category: string | null) => void;
  onEventChange: (event: string | null) => void;
  onAuthorChange: (author: string | null) => void;
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
  onCategoryChange,
  onEventChange,
  onAuthorChange,
  onClear,
  isOpen,
}: FilterSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-72 shrink-0 md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto pr-0 md:pr-6 pb-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
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
                staggerChildren: 0.03,
                delayChildren: 0.2,
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
                  initial: { opacity: 0, scale: 0.9, rotate: -3 },
                  animate: { opacity: 1, scale: 1, rotate: 0 },
                }}
                transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onCategoryChange(isSelected ? null : cat)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { x: -2, y: -2 } : undefined}
                whileTap={{ scale: 0.95 }}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 ${color.bg} ${color.text} ${
                  isSelected 
                    ? 'shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]' 
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
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
                staggerChildren: 0.02,
                delayChildren: 0.3,
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
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onEventChange(isSelected ? null : event)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { x: -2, y: -2 } : undefined}
                whileTap={{ scale: 0.95 }}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 ${
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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
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
                staggerChildren: 0.02,
                delayChildren: 0.4,
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
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onAuthorChange(isSelected ? null : author)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { x: -2, y: -2 } : undefined}
                whileTap={{ scale: 0.95 }}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 ${
                  isSelected 
                    ? 'bg-blue-500 text-white shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]' 
                    : 'bg-white hover:bg-blue-500 hover:text-white hover:shadow-[4px_4px_0_0_#000]'
                }`}
              >
                {author}
              </motion.button>
            );
          })}
          <motion.button
            variants={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
            onClick={() => onAuthorChange(selectedAuthor === 'Unknown' ? null : 'Unknown')}
            aria-pressed={selectedAuthor === 'Unknown'}
            whileHover={selectedAuthor !== 'Unknown' ? { x: -2, y: -2 } : undefined}
            whileTap={{ scale: 0.95 }}
            className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 border-dashed ${
              selectedAuthor === 'Unknown'
                ? 'bg-gray-500 text-white shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]' 
                : 'bg-white hover:bg-gray-500 hover:text-white hover:shadow-[4px_4px_0_0_#000]'
            }`}
          >
            Unknown
          </motion.button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {(selectedCategory || selectedEvent || selectedAuthor) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClear}
            className="border-4 border-black px-4 py-2 font-bold uppercase text-xs bg-white hover:bg-black hover:text-white transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000]"
          >
            Clear Filters
          </motion.button>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}