'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import { formatWriteupDate } from '@/lib/date';

interface FeaturedWriteupCardProps {
  writeup: WriteupInfo;
}

export default function FeaturedWriteupCard({ writeup }: FeaturedWriteupCardProps) {
  const categoryColor = getCategoryColor(writeup.category);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 30, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 1 }}
      whileHover={prefersReducedMotion ? {} : { x: -4, y: -4, rotate: -0.5 }}
      whileTap={prefersReducedMotion ? {} : { x: 2, y: 2 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="border-[6px] border-black p-8 bg-white shadow-[12px_12px_0_0_#000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0_0_#000] transition-shadow duration-150 relative overflow-hidden"
    >
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#DFE104]/20 border-[6px] border-black/10 transform rotate-12 pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-black/5 transform -rotate-6 pointer-events-none" aria-hidden="true" />
      
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.1 }}
        className="flex flex-wrap gap-3 mb-4"
      >
        <motion.span
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8, rotate: prefersReducedMotion ? 0 : -3 }}
          animate={{ opacity: 1, scale: 1, rotate: -1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.15 }}
          className="bg-[#DFE104] border-2 border-black px-4 py-1 font-bold text-lg transform -rotate-1 uppercase shadow-[4px_4px_0_0_#000]"
        >
          Featured
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.2 }}
          className="font-bold bg-[#DFE104] border-2 border-black px-3 py-1 text-sm tracking-wide uppercase shadow-[4px_4px_0_0_#000]/50"
        >
          {writeup.event}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8, rotate: prefersReducedMotion ? 0 : 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.25 }}
          className={`font-bold ${categoryColor.bg} ${categoryColor.text} border-2 border-black px-3 py-1 text-sm tracking-wide uppercase shadow-[4px_4px_0_0_#000]/50`}
        >
          {writeup.category}
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.3 }}
        className="flex flex-col gap-1 mb-4"
      >
        <span className="text-sm font-medium text-zinc-600">
          {formatWriteupDate(writeup.createdAt)}
        </span>
        {writeup.nickname && (
          <span className="text-xs text-zinc-500">
            by {writeup.nickname}
          </span>
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.35 }}
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
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.4 }}
      >
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="inline-flex items-center gap-2 bg-black text-white py-3 px-6 font-bold uppercase text-lg hover:bg-[#DFE104] hover:text-black border-4 border-transparent hover:border-black transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 shadow-[4px_4px_0_0_#000] hover:shadow-[6px_6px_0_0_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000]"
        >
          Read Writeup
          <span className="text-xl leading-none">&rarr;</span>
        </Link>
      </motion.div>
    </motion.article>
  );
}