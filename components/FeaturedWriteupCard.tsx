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
      initial={{ opacity: 0, y: 30, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 1 }}
      whileHover={{ x: -4, y: -4, rotate: -0.5 }}
      whileTap={{ x: 2, y: 2 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="border-[6px] border-black p-8 bg-white shadow-[12px_12px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0_0_#000] transition-shadow duration-150"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        className="flex flex-wrap gap-3 mb-4"
      >
        <motion.span
          initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -1 }}
          transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          className="bg-[#DFE104] border-2 border-black px-4 py-1 font-bold text-lg transform -rotate-1 uppercase"
        >
          Featured
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          className="font-bold bg-yellow-400 border-2 border-black px-3 py-1 text-sm tracking-wide uppercase"
        >
          {writeup.event}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.25 }}
          className={`font-bold ${categoryColor.bg} ${categoryColor.text} border-2 border-black px-3 py-1 text-sm tracking-wide uppercase`}
        >
          {writeup.category}
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
        className="text-sm font-medium text-zinc-600 mb-4"
      >
        {formatWriteupDate(writeup.createdAt)}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.35 }}
        className="text-3xl md:text-4xl font-display uppercase leading-tight tracking-tight mb-6"
      >
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="hover:underline decoration-[4px] underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
        >
          {writeup.title}
        </Link>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
      >
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="inline-block bg-black text-white py-3 px-6 font-bold uppercase text-lg hover:bg-[#DFE104] hover:text-black border-4 border-transparent hover:border-black transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
        >
          Read Writeup &rarr;
        </Link>
      </motion.div>
    </motion.article>
  );
}