'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import { formatWriteupDate } from '@/lib/date';

interface RelatedWriteupsProps {
  currentWriteup: WriteupInfo;
  allWriteups: WriteupInfo[];
  maxResults?: number;
}

export default function RelatedWriteups({
  currentWriteup,
  allWriteups,
  maxResults = 3,
}: RelatedWriteupsProps) {
  const related = allWriteups
    .filter((w) => w.path !== currentWriteup.path)
    .map((w) => {
      let score = 0;
      if (w.category === currentWriteup.category) score += 3;
      if (w.event === currentWriteup.event) score += 2;
      if (w.nickname && w.nickname === currentWriteup.nickname) score += 2;
      return { writeup: w, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((item) => item.writeup);

  if (related.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t-[6px] border-black">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="text-h2 font-display uppercase mb-6 tracking-tight"
      >
        Related Writeups
      </motion.h2>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-50px' }}
        variants={{
          initial: {},
          animate: {
            transition: {
              staggerChildren: 0.08,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {related.map((writeup) => {
          const categoryColor = getCategoryColor(writeup.category);
          return (
            <motion.div
              key={writeup.path}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <Link
                href={`/writeups/${writeup.slug.join('/')}`}
                className="block group h-full"
              >
                <article className="border-[6px] border-black p-5 bg-white shadow-[8px_8px_0_0_#000] h-full flex flex-col hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#000] hover:rotate-[-0.5deg] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_0_#000] transition-all duration-150">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="font-bold bg-[#DFE104] border-2 border-black px-2.5 py-1 text-xs uppercase tracking-wide">
                      {writeup.event}
                    </span>
                    <span
                      className={`font-bold border-2 border-black px-2.5 py-1 text-xs uppercase tracking-wide ${categoryColor.bg} ${categoryColor.text}`}
                    >
                      {writeup.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-display uppercase group-hover:underline decoration-[3px] underline-offset-4 tracking-tight mb-3 flex-grow">
                    {writeup.title}
                  </h3>

                  <div className="flex justify-between items-center pt-3 border-t-4 border-black">
                    <span className="text-sm font-medium text-zinc-600">
                      {formatWriteupDate(writeup.createdAt)}
                    </span>
                    {writeup.nickname && (
                      <span className="text-xs text-zinc-500">
                        by {writeup.nickname}
                      </span>
                    )}
                  </div>
                </article>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
