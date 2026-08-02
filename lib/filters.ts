export type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc' | 'event';

export interface DateRange {
  field: 'createdAt' | 'lastModified';
  start: string | null;
  end: string | null;
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
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

export function categoryLabel(cat: string) {
  return CATEGORY_LABELS[cat.toLowerCase()] ?? cat.toUpperCase();
}

export interface FilterControlsProps {
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
}
