'use client';

import { useState } from 'react';
import { getCategoryColor } from '@/lib/colors';

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
  onSelectAllCategories: () => void;
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

const CATEGORY_LABELS: Record<string, string> = {
  web: 'WEB EXPLOITATION',
  crypto: 'CRYPTOGRAPHY',
  pwn: 'PWN / BINARY',
  reverse: 'REVERSE ENG',
  rev: 'REVERSE ENG',
  forensics: 'FORENSICS',
  misc: 'MISC',
};

function categoryLabel(cat: string) {
  return CATEGORY_LABELS[cat.toLowerCase()] ?? cat.toUpperCase();
}

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
  onSelectAllCategories,
  onEventToggle,
  onAuthorToggle,
  onSearchChange,
  onSortChange,
  onDateRangeChange,
  onClear,
  isOpen,
}: FilterSidebarProps) {
  const [moreOpen, setMoreOpen] = useState(false);
  const allSelected = selectedCategories.size === 0;
  const hasFilters =
    selectedCategories.size > 0 ||
    selectedEvents.size > 0 ||
    selectedAuthors.size > 0 ||
    searchQuery ||
    dateRange.start ||
    dateRange.end;

  return (
    <aside
      id="filter-sidebar"
      className={`${isOpen ? 'block' : 'hidden'} lg:block lg:col-span-3 sticky top-28 flex flex-col gap-6`}
    >
      <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000]">
        <div className="flex items-center gap-2 mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#616200" strokeWidth="2" aria-hidden="true">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          <h2 className="label-caps">Category Filters</h2>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Category filters">
          <button
            type="button"
            onClick={onSelectAllCategories}
            aria-pressed={allSelected}
            className={`w-full text-left label-caps px-4 py-3 border-2 border-black transition-all min-h-[44px] ${
              allSelected
                ? 'bg-[#DFE104] shadow-[4px_4px_0_0_#000]'
                : 'bg-white hover:bg-[#DFE104]'
            }`}
          >
            ALL CHALLENGES
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
                className={`w-full text-left label-caps px-4 py-3 border-2 border-black transition-all min-h-[44px] ${
                  isSelected
                    ? `${color.bg} ${color.text} shadow-[4px_4px_0_0_#000]`
                    : 'bg-white hover:bg-[#f3f3f3]'
                }`}
              >
                {categoryLabel(cat)}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-black text-white p-6 shadow-[8px_8px_0_0_#000]">
        <h3 className="label-code mb-2 uppercase opacity-70">Search_Terminal</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="TYPE_QUERY_HERE..."
            aria-label="Search writeups"
            className="w-full bg-transparent border-b-2 border-white label-code py-2 focus:outline-none focus:border-[#DFE104] transition-colors placeholder:opacity-50"
          />
          <span className="absolute right-0 bottom-2 label-code opacity-60" aria-hidden="true">
            {'[>]'}
          </span>
        </div>
      </div>

      <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
        <button
          type="button"
          onClick={() => setMoreOpen(!moreOpen)}
          className="w-full flex items-center justify-between label-caps px-6 py-4 border-b-4 border-black hover:bg-[#f3f3f3] transition-colors"
          aria-expanded={moreOpen}
        >
          More Filters
          <span aria-hidden="true">{moreOpen ? '▲' : '▼'}</span>
        </button>
        {moreOpen && (
          <div className="p-6 flex flex-col gap-6">
            <div>
              <label className="label-caps block mb-3">Sort By</label>
              <div className="grid grid-cols-2 gap-2">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => onSortChange(opt.value)}
                    aria-pressed={sortOption === opt.value}
                    className={`border-2 border-black px-2 py-2 label-caps text-[10px] min-h-[40px] ${
                      sortOption === opt.value
                        ? 'bg-[#DFE104] shadow-[2px_2px_0_0_#000]'
                        : 'bg-white hover:bg-[#DFE104]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-caps block mb-3">Date Range</label>
              <select
                value={dateRange.field}
                onChange={(e) =>
                  onDateRangeChange({
                    ...dateRange,
                    field: e.target.value as 'createdAt' | 'lastModified',
                  })
                }
                className="w-full border-2 border-black px-3 py-2 text-sm font-bold bg-white mb-3"
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
                  className="w-full border-2 border-black px-2 py-2 font-mono text-xs bg-white"
                />
                <input
                  type="date"
                  value={dateRange.end ?? ''}
                  onChange={(e) =>
                    onDateRangeChange({ ...dateRange, end: e.target.value || null })
                  }
                  aria-label="End date"
                  className="w-full border-2 border-black px-2 py-2 font-mono text-xs bg-white"
                />
              </div>
            </div>

            <div>
              <label className="label-caps block mb-3">Events</label>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                {events.map((event) => (
                  <button
                    key={event}
                    type="button"
                    onClick={() => onEventToggle(event)}
                    aria-pressed={selectedEvents.has(event)}
                    className={`border-2 border-black px-3 py-2 label-caps text-[10px] text-left min-h-[40px] ${
                      selectedEvents.has(event)
                        ? 'bg-[#DFE104] shadow-[2px_2px_0_0_#000]'
                        : 'bg-white hover:bg-[#DFE104]'
                    }`}
                  >
                    {event}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="label-caps block mb-3">Authors</label>
              <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                {authors.map((author) => (
                  <button
                    key={author}
                    type="button"
                    onClick={() => onAuthorToggle(author)}
                    aria-pressed={selectedAuthors.has(author)}
                    className={`border-2 border-black px-3 py-2 label-caps text-[10px] text-left min-h-[40px] ${
                      selectedAuthors.has(author)
                        ? 'bg-[#06B6D4] shadow-[2px_2px_0_0_#000]'
                        : 'bg-white hover:bg-[#06B6D4]'
                    }`}
                  >
                    {author}
                  </button>
                ))}
              </div>
            </div>

            {hasFilters && (
              <button
                type="button"
                onClick={onClear}
                className="w-full border-2 border-black px-4 py-3 label-caps bg-white hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0_0_#000]"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
