'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import { formatWriteupDate } from '@/lib/date';

interface SearchBarProps {
  writeups: WriteupInfo[];
}

export default function SearchBar({ writeups }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    
    const searchTerms = query.toLowerCase().split(' ').filter(Boolean);
    
    return writeups.filter((writeup) => {
      const searchText = `${writeup.title} ${writeup.category} ${writeup.event} ${writeup.nickname || ''}`.toLowerCase();
      return searchTerms.every((term) => searchText.includes(term));
    }).slice(0, 8);
  }, [query, writeups]);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.length > 0);
          }}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder="Search writeups..."
          className="w-full md:w-80 border-4 border-black px-4 py-2 font-bold bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[4px_4px_0_0_#000] transition-all duration-100"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black font-bold"
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filteredResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1 }}
            className="absolute top-full left-0 right-0 md:w-96 mt-2 bg-white border-4 border-black shadow-[8px_8px_0_0_#000] z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2 border-b-4 border-black bg-zinc-100">
              <span className="text-sm font-bold">
                {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''}
              </span>
            </div>
            {filteredResults.map((writeup) => {
              const categoryColor = getCategoryColor(writeup.category);
              return (
                <Link
                  key={writeup.path}
                  href={`/writeups/${writeup.slug.join('/')}`}
                  onClick={() => setIsOpen(false)}
                  className="block p-3 border-b-2 border-zinc-200 hover:bg-[#DFE104] transition-colors last:border-b-0"
                >
                  <div className="flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm truncate">
                        {writeup.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-bold px-2 py-0.5 border-2 border-black ${categoryColor.bg} ${categoryColor.text}`}>
                          {writeup.category}
                        </span>
                        <span className="text-xs text-zinc-600">
                          {writeup.event}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-zinc-500">
                        <span>{formatWriteupDate(writeup.createdAt)}</span>
                        {writeup.nickname && (
                          <span>by {writeup.nickname}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && query && filteredResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1 }}
            className="absolute top-full left-0 right-0 md:w-96 mt-2 bg-white border-4 border-black shadow-[8px_8px_0_0_#000] z-50 p-4 text-center"
          >
            <p className="font-bold text-zinc-600">No writeups found</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
