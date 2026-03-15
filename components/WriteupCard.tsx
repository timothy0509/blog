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
    <article className="group border-[6px] border-black p-5 bg-white shadow-[8px_8px_0_0_#000] flex flex-col gap-4 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_0_#000] hover:rotate-[-0.5deg] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0_0_#000] transition-all duration-150">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0 }}
        className="flex flex-wrap gap-2 border-b-4 border-black pb-4"
      >
        <span className="font-bold bg-[#DFE104] border-2 border-black px-2.5 py-1 text-xs tracking-wide uppercase">
          {writeup.event}
        </span>
        <span className={`font-bold ${categoryColor.bg} ${categoryColor.text} border-2 border-black px-2.5 py-1 text-xs tracking-wide uppercase`}>
          {writeup.category}
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        className="text-xl sm:text-2xl font-display uppercase leading-tight tracking-tight"
      >
        <Link 
          href={`/writeups/${writeup.slug.join('/')}`} 
          className="hover:underline decoration-[3px] underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
        >
          {writeup.title}
        </Link>
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
        className="flex justify-between items-center mt-auto pt-4"
      >
        <span className="text-sm font-medium text-zinc-600">
          {formatWriteupDate(writeup.createdAt)}
        </span>
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="bg-black text-white text-center py-2 px-4 font-bold uppercase text-sm hover:bg-[#DFE104] hover:text-black border-4 border-transparent hover:border-black transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
        >
          Read&rarr;
        </Link>
      </motion.div>
    </article>
  );
}