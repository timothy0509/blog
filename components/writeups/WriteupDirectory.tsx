"use client";

import { useState } from 'react';
import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';

export default function WriteupDirectory({ initialWriteups }: { initialWriteups: WriteupInfo[] }) {
  const [search, setSearch] = useState('');

  const filteredWriteups = initialWriteups.filter(w => {
    const term = search.toLowerCase();
    return (
      w.title.toLowerCase().includes(term) ||
      w.event.toLowerCase().includes(term) ||
      w.category.toLowerCase().includes(term)
    );
  });

  const events = Array.from(new Set(filteredWriteups.map(w => w.event)));

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-12 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
        <input 
          type="text"
          placeholder="Search writeups..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white border border-zinc-200 rounded-xl pl-12 pr-4 py-3.5 text-base focus:outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-all shadow-sm"
        />
      </div>

      {/* Writeups List */}
      <div className="space-y-16">
        <AnimatePresence mode="wait">
          {events.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16 text-zinc-500"
            >
              No writeups found matching &quot;{search}&quot;.
            </motion.div>
          ) : (
            events.map(event => {
              const eventWriteups = filteredWriteups.filter(w => w.event === event);
              return (
                <motion.section 
                  key={event}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-zinc-900">
                      {event}
                    </h2>
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider bg-zinc-100 px-2 py-1 rounded">
                      {eventWriteups.length} writeup{eventWriteups.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {eventWriteups.map((w, index) => (
                      <motion.div
                        key={w.path}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link href={`/writeups/${w.slug.join('/')}`} className="group block">
                          <article className="bg-white border border-zinc-200 rounded-xl p-5 hover:border-zinc-400 hover:shadow-md transition-all duration-200">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-xs font-bold tracking-widest uppercase bg-zinc-900 text-white px-2.5 py-1 rounded">
                                    {w.category}
                                  </span>
                                </div>
                                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-semibold group-hover:text-zinc-600 transition-colors truncate">
                                  {w.title}
                                </h3>
                              </div>
                              <div className="flex items-center text-zinc-400 text-sm shrink-0">
                                <span className="mr-2">Read</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </article>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}