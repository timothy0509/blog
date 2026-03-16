'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import WriteupCard from '@/components/WriteupCard';
import FeaturedWriteupCard from '@/components/FeaturedWriteupCard';
import { WriteupInfo } from '@/lib/github';

interface AuthorStats {
  author: string;
  count: number;
  percentage: number;
}

interface HomeClientProps {
  writeups: WriteupInfo[];
  featuredWriteup: WriteupInfo | null;
  recentWriteups: WriteupInfo[];
  authorStats: AuthorStats[];
}

export default function HomeClient({ featuredWriteup, recentWriteups, authorStats }: Omit<HomeClientProps, 'writeups'>) {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-hero font-display leading-none mb-6 tracking-tight"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0 }}
            className="inline-block text-slate-800"
          >
            CTF
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1rounded-lg ml-2 shadow-lg shadow-blue-500/20"
          >
            Writeups
          </motion.span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          className="text-xl md:text-2xl font-semibold max-w-2xl pl-4 py-2 border-l-4 border-blue-500 bg-white/50 backdrop-blur-sm rounded-r-lg"
        >
          <p className="mb-2 text-slate-700">Writeups from various CTF competitions.</p>
          <p><span className="text-blue-600 font-semibold">Capturing flags</span>, together as a team.</p>
        </motion.div>
      </motion.section>

      {featuredWriteup && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="mb-6"
          >
            <h2 className="text-h2 font-display tracking-tight text-slate-800">Featured</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mt-2"></div>
          </motion.div>
          <FeaturedWriteupCard writeup={featuredWriteup} />
        </motion.section>
      )}

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8"
      >
        <div className="flex justify-between items-end mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-h2 font-display tracking-tight text-slate-800">Recent Writeups</h2>
            <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full mt-2"></div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
          >
            <Link 
              href="/writeups" 
              className="glass-btn px-5 py-2.5 hover:bg-blue-500 hover:text-white uppercase tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              View All&rarr;
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            initial: {},
            animate: {
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.1,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {recentWriteups.map((w) => (
            <motion.div
              key={w.path}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <WriteupCard writeup={w} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.hr
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="section-divider origin-left"
      />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="glass-card p-8"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="text-h1 font-display mb-6 tracking-tight text-slate-800"
        >
          About
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
          className="text-lg space-y-4"
        >
          <p className="text-slate-700">
            SYJC (Sing Yin Jockey Club) is a CTF team from Hong Kong. We capture flags and document our findings together.
          </p>
          <p className="font-medium text-slate-600">
            Members: DXuwu, Timothy, member3, steve
          </p>
          <p className="text-slate-700">
            All writeups are sourced from our GitHub repository:{' '}
            <Link
              href="https://github.com/timothy0509/writeups"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
            >
              timothy0509/writeups
            </Link>
          </p>
          <div className="mt-6 pt-4 border-t border-slate-200/50">
            <h3 className="font-display tracking-tight mb-4 text-slate-700">Writeup Contributions</h3>
            <div className="space-y-3">
              {authorStats.map(({ author, count, percentage }) => (
                <div key={author} className="flex items-center gap-3">
                  <span className="font-semibold w-24 text-sm text-slate-600">{author}</span>
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-16 text-right text-slate-600">{percentage}%</span>
                  <span className="text-xs text-slate-500">({count})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200/50">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={{
                initial: {},
                animate: {
                  transition: {
                    staggerChildren: 0.04,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="flex flex-wrap gap-3"
            >
              {[
                { text: 'Web', className: 'bg-blue-500/90 text-white px-3 py-1.5 text-sm font-semibold uppercase rounded-full' },
                { text: 'Crypto', className: 'bg-purple-500/90 text-white px-3 py-1.5 text-sm font-semibold uppercase rounded-full' },
                { text: 'Reverse', className: 'bg-orange-500/90 text-white px-3 py-1.5 text-sm font-semibold uppercase rounded-full' },
                { text: 'Pwn', className: 'bg-red-500/90 text-white px-3 py-1.5 text-sm font-semibold uppercase rounded-full' },
                { text: 'Forensics', className: 'bg-green-500/90 text-white px-3 py-1.5 text-sm font-semibold uppercase rounded-full' },
                { text: 'Misc', className: 'bg-cyan-500/90 text-white px-3 py-1.5 text-sm font-semibold uppercase rounded-full' },
              ].map((tag) => (
                <motion.span
                  key={tag.text}
                  variants={{
                    initial: { opacity: 0, scale: 0.9 },
                    animate: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className={tag.className}
                >
                  {tag.text}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}