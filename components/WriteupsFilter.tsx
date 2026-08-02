'use client';

import { useState, useMemo } from 'react';
import { WriteupInfo } from '@/lib/github';
import FilterSidebar from './FilterSidebar';
import MobileFilterSheet from './MobileFilterSheet';
import WriteupListCard from './WriteupListCard';
import type { SortOption, DateRange } from '@/lib/filters';

interface WriteupsFilterProps {
  writeups: WriteupInfo[];
}

export default function WriteupsFilter({ writeups }: WriteupsFilterProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [selectedEvents, setSelectedEvents] = useState<Set<string>>(new Set());
  const [selectedAuthors, setSelectedAuthors] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [dateRange, setDateRange] = useState<DateRange>({
    field: 'createdAt',
    start: null,
    end: null,
  });

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
      if (w.nickname) authorSet.add(w.nickname);
    });
    return [...authorSet].sort();
  }, [writeups]);

  const contributorCount = useMemo(() => {
    return new Set(writeups.map((w) => w.nickname || w.writer || 'Unknown')).size;
  }, [writeups]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const selectAllCategories = () => {
    setSelectedCategories(new Set());
  };

  const toggleEvent = (event: string) => {
    setSelectedEvents((prev) => {
      const next = new Set(prev);
      if (next.has(event)) next.delete(event);
      else next.add(event);
      return next;
    });
  };

  const toggleAuthor = (author: string) => {
    setSelectedAuthors((prev) => {
      const next = new Set(prev);
      if (next.has(author)) next.delete(author);
      else next.add(author);
      return next;
    });
  };

  const filteredWriteups = useMemo(() => {
    const result = writeups.filter((w) => {
      if (selectedCategories.size > 0 && !selectedCategories.has(w.category)) return false;
      if (selectedEvents.size > 0 && !selectedEvents.has(w.event)) return false;
      if (selectedAuthors.size > 0) {
        const authorKey = w.nickname ?? 'Unknown';
        if (!selectedAuthors.has(authorKey)) return false;
      }
      if (dateRange.start) {
        const dateValue = dateRange.field === 'createdAt' ? w.createdAt : w.lastModified;
        if (dateValue < dateRange.start) return false;
      }
      if (dateRange.end) {
        const dateValue = dateRange.field === 'createdAt' ? w.createdAt : w.lastModified;
        if (dateValue > dateRange.end) return false;
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
    });

    return result.sort((a, b) => {
      switch (sortOption) {
        case 'newest':
          return b.createdAt.localeCompare(a.createdAt);
        case 'oldest':
          return a.createdAt.localeCompare(b.createdAt);
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'event':
          return a.event.localeCompare(b.event);
        default:
          return 0;
      }
    });
  }, [
    writeups,
    selectedCategories,
    selectedEvents,
    selectedAuthors,
    dateRange,
    searchQuery,
    sortOption,
  ]);

  const handleClear = () => {
    setSelectedCategories(new Set());
    setSelectedEvents(new Set());
    setSelectedAuthors(new Set());
    setSearchQuery('');
    setDateRange({ field: 'createdAt', start: null, end: null });
  };

  const hasFilters =
    selectedCategories.size > 0 ||
    selectedEvents.size > 0 ||
    selectedAuthors.size > 0 ||
    searchQuery ||
    dateRange.start ||
    dateRange.end;

  const activeFilterCount =
    selectedCategories.size +
    selectedEvents.size +
    selectedAuthors.size +
    (searchQuery ? 1 : 0) +
    (dateRange.start || dateRange.end ? 1 : 0);

  const filterProps = {
    categories,
    events,
    authors,
    selectedCategories,
    selectedEvents,
    selectedAuthors,
    searchQuery,
    sortOption,
    dateRange,
    onCategoryToggle: toggleCategory,
    onSelectAllCategories: selectAllCategories,
    onEventToggle: toggleEvent,
    onAuthorToggle: toggleAuthor,
    onSearchChange: setSearchQuery,
    onSortChange: setSortOption,
    onDateRangeChange: setDateRange,
    onClear: handleClear,
  };

  return (
    <div className="flex flex-col w-full">
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {filteredWriteups.length} writeup{filteredWriteups.length !== 1 ? 's' : ''} found
        {hasFilters ? ' (filtered)' : ''}.
      </div>

      <section className="w-full border-b-[6px] border-black">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <span className="label-caps text-[#484833] tracking-widest">
              Database Archives
            </span>
            <h1 className="font-display text-display font-bold uppercase leading-none">
              Writeups
            </h1>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-2 md:pb-0">
            <div className="flex flex-col border-l-4 border-[#616200] px-4">
              <span className="label-code text-[#484833]">TOTAL_ENTRIES</span>
              <span className="font-display text-2xl md:text-[32px] font-bold">
                {writeups.length}
              </span>
            </div>
            <div className="flex flex-col border-l-4 border-[#06B6D4] px-4">
              <span className="label-code text-[#484833]">CONTRIBUTORS</span>
              <span className="font-display text-2xl md:text-[32px] font-bold">
                {contributorCount}
              </span>
            </div>
            <div className="flex flex-col border-l-4 border-[#fe00fe] px-4">
              <span className="label-code text-[#484833]">SHOWING</span>
              <span className="font-display text-2xl md:text-[32px] font-bold">
                {filteredWriteups.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto w-full px-6 py-8 lg:py-12">
        {/* Mobile: compact search + open sheet */}
        <div className="lg:hidden mb-6 flex gap-3">
          <div className="flex-1 bg-black text-white px-4 py-3 border-2 border-black min-w-0">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              aria-label="Search writeups"
              className="w-full bg-transparent label-code text-sm focus:outline-none placeholder:opacity-50"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="relative shrink-0 border-2 border-black px-4 py-3 label-caps bg-[#DFE104] shadow-[4px_4px_0_0_#000] min-h-[48px]"
            aria-haspopup="dialog"
            aria-expanded={mobileFiltersOpen}
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-[#DFE104] label-code text-[10px] min-w-[20px] h-5 px-1 flex items-center justify-center border border-[#DFE104]">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <FilterSidebar {...filterProps} />

          <div className="lg:col-span-9 flex flex-col gap-6">
            {filteredWriteups.length === 0 ? (
              <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0_0_#000] text-center">
                <p className="text-xl font-bold mb-4">No writeups match your filters.</p>
                <button
                  type="button"
                  onClick={handleClear}
                  className="border-2 border-black px-4 py-2 label-caps bg-[#DFE104] shadow-[4px_4px_0_0_#000]"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredWriteups.map((w) => (
                <WriteupListCard key={w.path} writeup={w} />
              ))
            )}
          </div>
        </div>
      </div>

      <MobileFilterSheet
        {...filterProps}
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        resultCount={filteredWriteups.length}
      />
    </div>
  );
}
