'use client';

import { motion } from 'framer-motion';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import Link from 'next/link';

interface RelatedWriteupsProps {
  currentWriteup: WriteupInfo;
  allWriteups: WriteupInfo[];
}

function getRelatedWriteups(current: WriteupInfo, all: WriteupInfo[]): WriteupInfo[] {
  const currentSlug = current.slug.join('/');
  const scored = all
    .filter(w => w.slug.join('/') !== currentSlug)
    .map(w => {
      const score = (w.category === current.category ? 3 : 0) +
                   (w.event === current.event ? 2 : 0) +
                   (w.nickname === current.nickname && w.nickname ? 1 : 0);
      return { writeup: w, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.writeup.createdAt).getTime() - new Date(a.writeup.createdAt).getTime();
    });

  return scored.slice(0, 3).map(s => s.writeup);
}

export default function RelatedWriteups({ currentWriteup, allWriteups }: RelatedWriteupsProps) {
  const relatedWriteups = getRelatedWriteups(currentWriteup, allWriteups);

  if (relatedWriteups.length === 0) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
      className="mt-12 mb-8"
    >
      <h2 className="font-display text-2xl uppercase mb-6 border-b-4 border-black pb-2 tracking-wide">
        Related Writeups
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedWriteups.map((w, index) => {
          const color = getCategoryColor(w.category);
          return (
            <motion.div
              key={w.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.1 + index * 0.05 }}
            >
              <Link href={`/writeups/${w.slug.join('/')}`} className="block group h-full">
                <article className="border-4 border-black p-4 bg-white shadow-[6px_6px_0_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_0_#000] hover:rotate-[-0.5deg] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_0_#000] transition-all duration-100 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`font-bold border-2 border-black px-2 py-0.5 text-xs uppercase tracking-wide ${color.bg} ${color.text}`}>
                      {w.category}
                    </span>
                    <span className="font-bold bg-[#DFE104] border-2 border-black px-2 py-0.5 text-xs uppercase tracking-wide">
                      {w.event}
                    </span>
                  </div>
                  <h3 className="font-display text-lg uppercase group-hover:underline decoration-2 underline-offset-2 tracking-tight flex-grow">
                    {w.title}
                  </h3>
                  {w.nickname && (
                    <div className="mt-2 text-sm font-medium text-gray-600">
                      by {w.nickname}
                    </div>
                  )}
                </article>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}