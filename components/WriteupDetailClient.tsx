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
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6"
      >
        <Link
          href="/writeups"
          className="glass-btn px-5 py-2.5 hover:bg-blue-500 hover:text-white uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          ← Back to Writeups
        </Link>
      </motion.div>

      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
        className="border-b border-slate-200/50 pb-8 mb-8"
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
              initial: { opacity: 0, scale: 0.9},
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="font-semibold bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 px-4 py-2 text-base rounded-full shadow-md shadow-amber-500/20"
          >
            {event}
          </motion.span>
          <motion.span
            variants={{
              initial: { opacity: 0, scale: 0.9 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={`font-semibold ${categoryColor.bg} ${categoryColor.text} px-4 py-2 text-base rounded-full`}
          >
            {category}
          </motion.span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          className="text-display font-display leading-none mb-4 tracking-tight text-slate-800"
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
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-slate-800 text-white px-4 py-2 font-semibold text-base rounded-full"
          >
            {readingTime} min read
          </motion.div>
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-green-100 text-green-800 px-4 py-2 font-semibold text-base rounded-full"
          >
            <span className="text-green-600">⚑</span> FLAG DOCUMENTED
          </motion.div>
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 font-semibold text-base rounded-full border border-slate-200/50"
          >
            Created: {createdAt}
          </motion.div>
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
            }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="inline-block bg-white/80 backdrop-blur-sm px-4 py-2 font-semibold text-base rounded-full border border-slate-200/50"
          >
            Updated: {lastModified}
          </motion.div>
        </motion.div>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      >
        {children}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="mt-16 pt-8 border-t border-slate-200/50"
      >
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 font-semibold text-center text-lg shadow-lg shadow-blue-500/30 rounded-2xl"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
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
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
          >
            <Link 
              href="/writeups" 
              className="glass-btn px-6 py-4 hover:bg-blue-500 hover:text-white uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Browse More Writeups→
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </article>
  );
}