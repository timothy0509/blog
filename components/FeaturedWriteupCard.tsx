'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import { formatWriteupDate } from '@/lib/date';

interface FeaturedWriteupCardProps {
  writeup: WriteupInfo;
}

export default function FeaturedWriteupCard({ writeup }: FeaturedWriteupCardProps) {
  const categoryColor = getCategoryColor(writeup.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="glass-card p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-4"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-4 py-1.5 font-semibold text-sm tracking-wide uppercase rounded-full"
        >
          Featured
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="font-semibold bg-white/80 backdrop-blur-sm px-3 py-1.5 text-sm tracking-wide uppercase rounded-full border border-slate-200/50"
        >
          {writeup.event}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
          className={`font-semibold ${categoryColor.bg} ${categoryColor.text} px-3 py-1.5 text-sm tracking-wide uppercase rounded-full`}
        >
          {writeup.category}
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        className="flex flex-col gap-1 mb-4"
      >
        <span className="text-sm font-medium text-slate-600">
          {formatWriteupDate(writeup.createdAt)}
        </span>
        {writeup.nickname && (
          <span className="text-xs text-slate-500">
            written by {writeup.nickname}
          </span>
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
        className="text-3xl md:text-4xl font-display leading-tight tracking-tight mb-6 text-slate-800"
      >
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="hover:text-blue-600 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
        >
          {writeup.title}
        </Link>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
      >
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 font-semibold text-base hover:from-blue-600 hover:to-blue-700 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-full shadow-lg shadow-blue-500/20"
        >
          Read Writeup &rarr;
        </Link>
      </motion.div>
    </motion.article>
  );
}