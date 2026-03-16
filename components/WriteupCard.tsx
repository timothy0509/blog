'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import { formatWriteupDate } from '@/lib/date';

interface WriteupCardProps {
  writeup: WriteupInfo;
}

export default function WriteupCard({ writeup }: WriteupCardProps) {
  const categoryColor = getCategoryColor(writeup.category);

  return (
    <article className="group glass-card p-6 flex flex-col gap-4 cursor-pointer">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0 }}
        className="flex flex-wrap gap-2 pb-4 border-b border-slate-200/50"
      >
        <span className="font-semibold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-3 py-1 text-xs tracking-wide uppercase rounded-full">
          {writeup.event}
        </span>
        <span className={`font-semibold ${categoryColor.bg} ${categoryColor.text} px-3 py-1 text-xs tracking-wide uppercase rounded-full`}>
          {writeup.category}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        className="text-xl sm:text-2xl font-display leading-tight tracking-tight text-slate-800"
      >
        <Link 
          href={`/writeups/${writeup.slug.join('/')}`} 
          className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
        >
          {writeup.title}
        </Link>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        className="flex justify-between items-center mt-auto pt-4"
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-slate-600">
            {formatWriteupDate(writeup.createdAt)}
          </span>
          {writeup.nickname && (
            <span className="text-xs text-slate-500">
              written by {writeup.nickname}
            </span>
          )}
        </div>
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="bg-blue-500 text-white text-center py-2 px-5font-semibold text-sm hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full"
        >
          Read&rarr;
        </Link>
      </motion.div>
    </article>
  );
}