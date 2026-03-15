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
    <aside className={`${isOpen ? 'block' : 'hidden'} md:block w-full md:w-72 shrink-0 md:sticky md:top-24 md:h-fit pr-0 md:pr-6`}>
      <div className="mb-8">
        <h3 className="font-bold text-base uppercase mb-4 border-b-4 border-black pb-2 tracking-wide">Categories</h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          {categories.map((cat) => {
            const color = getCategoryColor(cat);
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(isSelected ? null : cat)}
                aria-pressed={isSelected}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 ${color.bg} ${color.text} ${
                  isSelected 
                    ? 'shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]' 
                    : 'hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:-translate-x-0.5'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-base uppercase mb-4 border-b-4 border-black pb-2 tracking-wide">Events</h3>
        <div className="flex flex-wrap md:flex-col gap-2">
          {events.map((event) => {
            const isSelected = selectedEvent === event;
            return (
              <button
                key={event}
                onClick={() => onEventChange(isSelected ? null : event)}
                aria-pressed={isSelected}
                className={`border-4 border-black px-3 py-2 font-bold uppercase text-xs tracking-wide transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 ${
                  isSelected 
                    ? 'bg-[#DFE104] text-black shadow-[4px_4px_0_0_#000] -translate-y-1 -translate-x-1 rotate-[-1deg]' 
                    : 'bg-white hover:bg-[#DFE104] hover:shadow-[4px_4px_0_0_#000] hover:-translate-y-0.5 hover:-translate-x-0.5'
                }`}
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
          className="border-4 border-black px-4 py-2 font-bold uppercase text-xs bg-white hover:bg-black hover:text-white transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          Clear Filters
        </button>
      )}
    </aside>
  );
}