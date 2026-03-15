'use client';

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
    <aside className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 md:sticky md:top-24 md:h-fit pr-0 md:pr-6`}>
      <div className="mb-8">
        <h3 className="font-bold text-lg uppercase mb-4 border-b-4 border-black dark:border-white pb-2">Categories</h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          {categories.map((cat) => {
            const color = getCategoryColor(cat);
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(isSelected ? null : cat)}
                className={`border-4 border-black dark:border-white px-3 py-2 font-bold uppercase text-sm transition-all ${color.bg} ${color.text} ${isSelected ? 'shadow-[var(--shadow-brutal)] -translate-y-1 -translate-x-1' : 'hover:shadow-[var(--shadow-brutal)]'}`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-lg uppercase mb-4 border-b-4 border-black dark:border-white pb-2">Events</h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          {events.map((event) => {
            const isSelected = selectedEvent === event;
            return (
              <button
                key={event}
                onClick={() => onEventChange(isSelected ? null : event)}
                className={`border-4 border-black dark:border-white px-3 py-2 font-bold uppercase text-sm transition-all ${isSelected ? 'bg-yellow-400 shadow-[var(--shadow-brutal)] -translate-y-1 -translate-x-1' : 'bg-white dark:bg-black dark:text-white hover:bg-yellow-200 hover:shadow-[var(--shadow-brutal)]'}`}
              >
                {event}
              </button>
            );
          })}
        </div>
      </div>

      {(selectedCategory || selectedEvent) && (
        <button
          onClick={onClear}
          className="border-4 border-black dark:border-white px-4 py-2 font-bold uppercase text-sm bg-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
        >
          Clear Filters
        </button>
      )}
    </aside>
  );
}