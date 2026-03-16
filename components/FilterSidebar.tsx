'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryColor } from '@/lib/colors';

interface FilterSidebarProps {
  categories: string[];
  events: string[];
  selectedCategory: string | null;
  selectedEvent: string | null;
  onCategoryChange: (category: string | null) => void;
  onEventChange: (event: string | null) => void;
  onClear: () => void;
  isOpen: boolean;
}

export default function FilterSidebar({
  categories,
  events,
  selectedCategory,
  selectedEvent,
  onCategoryChange,
  onEventChange,
  onClear,
  isOpen,
}: FilterSidebarProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-72 shrink-0 md:sticky md:top-24 md:h-fit pr-0 md:pr-6`}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
        className="glass-card p-5 mb-6"
      >
        <h3 className="font-semibold text-base uppercase mb-4 tracking-wide text-slate-700">Categories</h3>
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
                  initial: { opacity: 0, scale: 0.95 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onCategoryChange(isSelected ? null : cat)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { scale: 1.02 } : undefined}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 font-semibold uppercase text-xs tracking-wide rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${color.bg} ${color.text} ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 ring-offset-2 shadow-lg' 
                    : 'hover:shadow-md'
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
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
        className="glass-card p-5 mb-6"
      >
        <h3 className="font-semibold text-base uppercase mb-4 tracking-wide text-slate-700">Events</h3>
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
                  initial: { opacity: 0, scale: 0.95},
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onEventChange(isSelected ? null : event)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { scale: 1.02 } : undefined}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 font-semibold uppercase text-xs tracking-wide rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                  isSelected 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ring-2 ring-blue-500 ring-offset-2 shadow-lg' 
                    : 'bg-white/80 backdrop-blur-sm hover:bg-blue-500 hover:text-white'
                }`}
              >
                {event}
              </motion.button>
            );
          })}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {(selectedCategory || selectedEvent) && (
          <motion.button
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClear}
            className="glass-btn px-5 py-2.5 hover:bg-red-500 hover:text-white uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          >
            Clear Filters
          </motion.button>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}