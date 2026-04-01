'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCategoryColor } from '@/lib/colors';

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  badge?: number;
  delay?: number;
}

function CollapsibleSection({
  title,
  children,
  defaultExpanded = true,
  badge,
  delay = 0,
}: CollapsibleSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay }}
      className="mb-10"
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between font-bold text-base uppercase mb-4 border-b-4 border-black pb-2 tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-2">
          {title}
          {badge !== undefined && badge > 0 && (
            <span className="text-sm bg-black text-white px-2 py-0.5">{badge}</span>
          )}
        </span>
        <motion.span
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-lg"
          aria-hidden="true"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: 'hidden' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc' | 'event';

interface DateRange {
  field: 'createdAt' | 'lastModified';
  start: string | null;
  end: string | null;
}

interface FilterSidebarProps {
  categories: string[];
  events: string[];
  authors: string[];
  selectedCategories: Set<string>;
  selectedEvents: Set<string>;
  selectedAuthors: Set<string>;
  searchQuery: string;
  sortOption: SortOption;
  dateRange: DateRange;
  onCategoryToggle: (category: string) => void;
  onEventToggle: (event: string) => void;
  onAuthorToggle: (author: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (option: SortOption) => void;
  onDateRangeChange: (range: DateRange) => void;
  onClear: () => void;
  isOpen: boolean;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
  { value: 'event', label: 'Event' },
];

export default function FilterSidebar({
  categories,
  events,
  authors,
  selectedCategories,
  selectedEvents,
  selectedAuthors,
  searchQuery,
  sortOption,
  dateRange,
  onCategoryToggle,
  onEventToggle,
  onAuthorToggle,
  onSearchChange,
  onSortChange,
  onDateRangeChange,
  onClear,
  isOpen,
}: FilterSidebarProps) {
  const hasFilters =
    selectedCategories.size > 0 ||
    selectedEvents.size > 0 ||
    selectedAuthors.size > 0 ||
    searchQuery ||
    dateRange.start ||
    dateRange.end;

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
      className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-80 shrink-0 md:sticky md:top-24 md:max-h-[calc(100vh-8rem)] md:overflow-y-auto px-3 md:pl-3 md:pr-6 pb-6`}
    >
      <CollapsibleSection title="Search" defaultExpanded={true} delay={0.05}>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search writeups..."
            aria-label="Search writeups by title, event, category, or author"
            className="w-full border-4 border-black px-4 py-3 font-mono text-sm bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[4px_4px_0_0_#000] placeholder:text-gray-400 min-h-[44px]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors font-bold"
            >
              ×
            </button>
          )}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Sort By" defaultExpanded={true} delay={0.1}>
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.02,
                delayChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-2 gap-2"
        >
          {SORT_OPTIONS.map((opt) => {
            const isSelected = sortOption === opt.value;
            return (
              <motion.button
                key={opt.value}
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onSortChange(opt.value)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { x: -2, y: -2 } : undefined}
                whileTap={{ scale: 0.95 }}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[44px] ${
                  isSelected
                    ? 'bg-[#DFE104] text-black shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]'
                    : 'bg-white hover:bg-[#DFE104] hover:shadow-[4px_4px_0_0_#000]'
                }`}
              >
                {opt.label}
              </motion.button>
            );
          })}
        </motion.div>
      </CollapsibleSection>

      <CollapsibleSection title="Date Range" defaultExpanded={false} delay={0.15}>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold block mb-2 uppercase tracking-wide">Filter By</label>
            <select
              value={dateRange.field}
              onChange={(e) =>
                onDateRangeChange({
                  ...dateRange,
                  field: e.target.value as 'createdAt' | 'lastModified',
                })
              }
              aria-label="Date field to filter by"
              className="w-full border-4 border-black px-3 py-2 text-sm font-bold bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[2px_2px_0_0_#000]"
            >
              <option value="createdAt">Created Date</option>
              <option value="lastModified">Modified Date</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold block mb-2 uppercase tracking-wide">From</label>
              <input
                type="date"
                value={dateRange.start ?? ''}
                onChange={(e) =>
                  onDateRangeChange({
                    ...dateRange,
                    start: e.target.value || null,
                  })
                }
                aria-label="Start date"
                className="w-full border-4 border-black px-2 py-2 font-mono text-xs bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[2px_2px_0_0_#000]"
              />
            </div>
            <div>
              <label className="text-xs font-bold block mb-2 uppercase tracking-wide">To</label>
              <input
                type="date"
                value={dateRange.end ?? ''}
                onChange={(e) =>
                  onDateRangeChange({
                    ...dateRange,
                    end: e.target.value || null,
                  })
                }
                aria-label="End date"
                className="w-full border-4 border-black px-2 py-2 font-mono text-xs bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[2px_2px_0_0_#000]"
              />
            </div>
          </div>
          {(dateRange.start || dateRange.end) && (
            <button
              onClick={() => onDateRangeChange({ ...dateRange, start: null, end: null })}
              className="text-xs font-bold underline hover:no-underline self-start"
            >
              Clear dates
            </button>
          )}
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Categories"
        defaultExpanded={false}
        badge={selectedCategories.size}
        delay={0.2}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.02,
                delayChildren: 0.05,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-2"
        >
          {categories.map((cat) => {
            const color = getCategoryColor(cat);
            const isSelected = selectedCategories.has(cat);
            return (
              <motion.button
                key={cat}
                variants={{
                  initial: { opacity: 0, scale: 0.9, rotate: -3 },
                  animate: { opacity: 1, scale: 1, rotate: 0 },
                }}
                transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onCategoryToggle(cat)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { x: -2, y: -2 } : undefined}
                whileTap={{ scale: 0.95 }}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[40px] ${color.bg} ${color.text} ${
                  isSelected
                    ? 'shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg] ring-2 ring-black ring-offset-2'
                    : 'hover:shadow-[4px_4px_0_0_#000]'
                }`}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Events"
        defaultExpanded={false}
        badge={selectedEvents.size}
        delay={0.25}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.02,
                delayChildren: 0.05,
              },
            },
          }}
          className="flex flex-col gap-2"
        >
          {events.map((event) => {
            const isSelected = selectedEvents.has(event);
            return (
              <motion.button
                key={event}
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onEventToggle(event)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { x: -2, y: -2 } : undefined}
                whileTap={{ scale: 0.95 }}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[40px] text-left ${
                  isSelected
                    ? 'bg-[#DFE104] text-black shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg] ring-2 ring-black ring-offset-2'
                    : 'bg-white hover:bg-[#DFE104] hover:shadow-[4px_4px_0_0_#000]'
                }`}
              >
                {event}
              </motion.button>
            );
          })}
        </motion.div>
      </CollapsibleSection>

      <CollapsibleSection
        title="Authors"
        defaultExpanded={false}
        badge={selectedAuthors.size}
        delay={0.3}
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.02,
                delayChildren: 0.05,
              },
            },
          }}
          className="flex flex-col gap-2"
        >
          {authors.map((author) => {
            const isSelected = selectedAuthors.has(author);
            return (
              <motion.button
                key={author}
                variants={{
                  initial: { opacity: 0, scale: 0.9 },
                  animate: { opacity: 1, scale: 1 },
                }}
                transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
                onClick={() => onAuthorToggle(author)}
                aria-pressed={isSelected}
                whileHover={!isSelected ? { x: -2, y: -2 } : undefined}
                whileTap={{ scale: 0.95 }}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[40px] text-left ${
                  isSelected
                    ? 'bg-blue-500 text-white shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg] ring-2 ring-black ring-offset-2'
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
            onClick={() => onAuthorToggle('Unknown')}
            aria-pressed={selectedAuthors.has('Unknown')}
            whileHover={!selectedAuthors.has('Unknown') ? { x: -2, y: -2 } : undefined}
            whileTap={{ scale: 0.95 }}
            className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 min-h-[40px] text-left border-dashed ${
              selectedAuthors.has('Unknown')
                ? 'bg-gray-500 text-white shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg] ring-2 ring-black ring-offset-2'
                : 'bg-white hover:bg-gray-500 hover:text-white hover:shadow-[4px_4px_0_0_#000]'
            }`}
          >
            Unknown
          </motion.button>
        </motion.div>
      </CollapsibleSection>

      <AnimatePresence>
        {hasFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClear}
            className="w-full border-4 border-black px-4 py-3 font-bold uppercase text-xs bg-white hover:bg-black hover:text-white transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] min-h-[44px] mt-4"
          >
            Clear Filters
          </motion.button>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}
