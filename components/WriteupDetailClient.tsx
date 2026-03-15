'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface WriteupDetailClientProps {
  event: string;
  category: string;
  categoryColor: { bg: string; text: string };
  title: string;
  readingTime: number;
  createdAt: string;
  lastModified: string;
  children: React.ReactNode;
}

export default function WriteupDetailClient({
  event,
  category,
  categoryColor,
  title,
  readingTime,
  createdAt,
  lastModified,
  children,
}: WriteupDetailClientProps) {
  return (
    <article className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6"
      >
        <Link
          href="/writeups"
          className="inline-block border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
        >
          &larr; Back to Writeups
        </Link>
      </motion.div>

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        className="border-b-[6px] border-black pb-8 mb-8"
      >
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="flex flex-wrap gap-3 mb-6"
        >
          <motion.span
            variants={{
              initial: { opacity: 0, scale: 0.8, rotate: -10 },
              animate: { opacity: 1, scale: 1, rotate: -1 },
            }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
            className="font-bold bg-[#DFE104] border-4 border-black px-4 py-2 text-base transform -rotate-1 shadow-[4px_4px_0_0_#000]"
          >
            {event}
          </motion.span>
          <motion.span
            variants={{
              initial: { opacity: 0, scale: 0.8, rotate: 10 },
              animate: { opacity: 1, scale: 1, rotate: 1 },
            }}
            transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
            className={`font-bold ${categoryColor.bg} ${categoryColor.text} border-4 border-black px-4 py-2 text-base transform rotate-1 shadow-[4px_4px_0_0_#000]`}
          >
            {category}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          className="text-display font-display uppercase leading-none mb-4 tracking-tight"
        >
          {title}
        </motion.h1>

        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.25,
              },
            },
          }}
          className="flex flex-wrap items-center gap-3"
        >
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-black text-white px-4 py-2 font-bold text-base border-4 border-black transform -rotate-1"
          >
            {readingTime} min read
          </motion.div>
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-white border-4 border-black px-4 py-2 font-bold text-base transform rotate-1 shadow-[4px_4px_0_0_#DFE104]"
          >
            <span className="text-[#EF4444]">⚑</span> FLAG DOCUMENTED
          </motion.div>
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-zinc-100 border-4 border-black px-4 py-2 font-bold text-base transform -rotate-1"
          >
            Created: {createdAt}
          </motion.div>
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-zinc-100 border-4 border-black px-4 py-2 font-bold text-base transform rotate-1"
          >
            Updated: {lastModified}
          </motion.div>
        </motion.div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      >
        {children}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="mt-16 pt-8 border-t-[6px] border-black"
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-black text-white p-6 font-bold text-center text-lg shadow-[8px_8px_0_0_#DFE104] border-4 border-[#DFE104] max-w-lg transform -rotate-1"
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-2xl block mb-2"
            >
              ⚑
            </motion.span>
            FLAG CAPTURED
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <Link 
              href="/writeups" 
              className="border-4 border-black px-6 py-4 font-bold uppercase bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 transform rotate-1"
            >
              Browse More Writeups&rarr;
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </article>
  );
}