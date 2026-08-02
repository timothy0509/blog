'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { getCategoryColor } from '@/lib/colors';
import {
  SORT_OPTIONS,
  categoryLabel,
  type FilterControlsProps,
} from '@/lib/filters';
import { CloseIcon } from '@/components/icons';

interface MobileFilterSheetProps extends FilterControlsProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
}

/** Full-screen filter sheet for mobile — separate from the desktop sticky rail. */
export default function MobileFilterSheet({
  isOpen,
  onClose,
  resultCount,
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
  onSelectAllCategories,
  onEventToggle,
  onAuthorToggle,
  onSearchChange,
  onSortChange,
  onDateRangeChange,
  onClear,
}: MobileFilterSheetProps) {
  const prefersReducedMotion = useReducedMotion();
  const allSelected = selectedCategories.size === 0;
  const hasFilters =
    selectedCategories.size > 0 ||
    selectedEvents.size > 0 ||
    selectedAuthors.size > 0 ||
    searchQuery ||
    dateRange.start ||
    dateRange.end;

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            className="fixed inset-0 bg-black/60 z-50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filter-title"
            initial={prefersReducedMotion ? { opacity: 0 } : { y: '100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 z-50 lg:hidden flex flex-col bg-[#f9f9f9] border-t-[6px] border-black"
          >
            <header className="shrink-0 flex items-center justify-between gap-4 px-4 py-4 border-b-4 border-black bg-[#DFE104]">
              <h2 id="mobile-filter-title" className="label-caps text-base">
                Filters
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="border-2 border-black bg-white p-2 shadow-[4px_4px_0_0_#000] min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close filters"
              >
                <CloseIcon size={20} />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 flex flex-col gap-5">
              <div className="bg-black text-white p-4 border-2 border-black">
                <h3 className="label-code mb-2 uppercase opacity-70">Search_Terminal</h3>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="TYPE_QUERY_HERE..."
                  aria-label="Search writeups"
                  autoFocus
                  className="w-full bg-transparent border-b-2 border-white label-code py-2 focus:outline-none focus:border-[#DFE104] placeholder:opacity-50"
                />
              </div>

              <section>
                <h3 className="label-caps mb-3">Category</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onSelectAllCategories}
                    aria-pressed={allSelected}
                    className={`label-caps px-3 py-3 border-2 border-black text-left min-h-[48px] text-[11px] ${
                      allSelected
                        ? 'bg-[#DFE104] shadow-[3px_3px_0_0_#000]'
                        : 'bg-white'
                    }`}
                  >
                    ALL
                  </button>
                  {categories.map((cat) => {
                    const color = getCategoryColor(cat);
                    const isSelected = selectedCategories.has(cat);
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => onCategoryToggle(cat)}
                        aria-pressed={isSelected}
                        className={`label-caps px-3 py-3 border-2 border-black text-left min-h-[48px] text-[11px] ${
                          isSelected
                            ? `${color.bg} ${color.text} shadow-[3px_3px_0_0_#000]`
                            : 'bg-white'
                        }`}
                      >
                        {categoryLabel(cat)}
                      </button>
                    );
                  })}
                </div>
              </section>

              <section>
                <h3 className="label-caps mb-3">Sort By</h3>
                <div className="grid grid-cols-2 gap-2">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onSortChange(opt.value)}
                      aria-pressed={sortOption === opt.value}
                      className={`border-2 border-black px-3 py-3 label-caps text-[11px] min-h-[44px] ${
                        sortOption === opt.value
                          ? 'bg-[#DFE104] shadow-[3px_3px_0_0_#000]'
                          : 'bg-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="label-caps mb-3">Date Range</h3>
                <select
                  value={dateRange.field}
                  onChange={(e) =>
                    onDateRangeChange({
                      ...dateRange,
                      field: e.target.value as 'createdAt' | 'lastModified',
                    })
                  }
                  className="w-full border-2 border-black px-3 py-3 text-sm font-bold bg-white mb-2 min-h-[44px]"
                  aria-label="Date field"
                >
                  <option value="createdAt">Created</option>
                  <option value="lastModified">Modified</option>
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={dateRange.start ?? ''}
                    onChange={(e) =>
                      onDateRangeChange({ ...dateRange, start: e.target.value || null })
                    }
                    aria-label="Start date"
                    className="w-full border-2 border-black px-2 py-3 font-mono text-xs bg-white min-h-[44px]"
                  />
                  <input
                    type="date"
                    value={dateRange.end ?? ''}
                    onChange={(e) =>
                      onDateRangeChange({ ...dateRange, end: e.target.value || null })
                    }
                    aria-label="End date"
                    className="w-full border-2 border-black px-2 py-3 font-mono text-xs bg-white min-h-[44px]"
                  />
                </div>
              </section>

              <section>
                <h3 className="label-caps mb-3">Events</h3>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto border-2 border-black bg-white p-2">
                  {events.map((event) => (
                    <button
                      key={event}
                      type="button"
                      onClick={() => onEventToggle(event)}
                      aria-pressed={selectedEvents.has(event)}
                      className={`border-2 border-black px-3 py-2 label-caps text-[11px] text-left min-h-[44px] ${
                        selectedEvents.has(event)
                          ? 'bg-[#DFE104] shadow-[2px_2px_0_0_#000]'
                          : 'bg-white'
                      }`}
                    >
                      {event}
                    </button>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="label-caps mb-3">Authors</h3>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto border-2 border-black bg-white p-2">
                  {authors.map((author) => (
                    <button
                      key={author}
                      type="button"
                      onClick={() => onAuthorToggle(author)}
                      aria-pressed={selectedAuthors.has(author)}
                      className={`border-2 border-black px-3 py-2 label-caps text-[11px] text-left min-h-[44px] ${
                        selectedAuthors.has(author)
                          ? 'bg-[#06B6D4] shadow-[2px_2px_0_0_#000]'
                          : 'bg-white'
                      }`}
                    >
                      {author}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            <footer className="shrink-0 border-t-4 border-black bg-white p-4 flex gap-3 safe-area-pb">
              {hasFilters && (
                <button
                  type="button"
                  onClick={onClear}
                  className="flex-1 border-2 border-black px-4 py-3 label-caps bg-white min-h-[48px]"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex-[2] border-2 border-black px-4 py-3 label-caps bg-[#DFE104] shadow-[4px_4px_0_0_#000] min-h-[48px]"
              >
                Show {resultCount} Result{resultCount !== 1 ? 's' : ''}
              </button>
            </footer>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
