'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
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
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
        className="mb-4 relative"
      >
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#DFE104]/10 -z-10" aria-hidden="true" />
        <div className="absolute -top-2 -right-8 w-24 h-24 border-4 border-black/5 -z-10" aria-hidden="true" />
        
        <motion.h1
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-hero font-display uppercase leading-none mb-6 tracking-tight relative"
        >
          <motion.span
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20, skewX: prefersReducedMotion ? 0 : -5 }}
            animate={{ opacity: 1, y: 0, skewX: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0 }}
            className="inline-block"
          >
            CTF
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.8, rotate: prefersReducedMotion ? 0 : -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.1 }}
            className="inline-block bg-black text-white px-3 py-1 transform rotate-1 ml-2 border-4 border-black shadow-[4px_4px_0_0_#DFE104]"
          >
            Writeups
          </motion.span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.15 }}
          className="text-xl md:text-2xl font-bold max-w-2xl border-l-8 border-[#DFE104] pl-4 py-3 bg-white/80 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-pattern-diagonal opacity-30" aria-hidden="true" />
          <div className="relative">
            <p className="mb-2">Writeups from various CTF competitions.</p>
            <p><span className="text-[#E63946] font-bold">Capturing flags</span>, together as a team.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.25 }}
          className="flex flex-wrap gap-2 mt-4"
        >
          {['Web', 'Crypto', 'Reverse', 'Pwn', 'Forensics', 'Misc'].map((cat, i) => {
            const colors: Record<string, string> = {
              Web: 'bg-[#DFE104]',
              Crypto: 'bg-[#7B2CBF] text-white',
              Reverse: 'bg-[#F77F00]',
              Pwn: 'bg-[#E63946] text-white',
              Forensics: 'bg-[#06D6A0]',
              Misc: 'bg-[#00B4D8]',
            };
            return (
              <span
                key={cat}
                className={`${colors[cat]} border-2 border-black px-2 py-0.5 text-xs font-bold uppercase`}
              >
                {cat}
              </span>
            );
          })}
        </motion.div>
      </motion.section>

      {featuredWriteup && (
        <motion.section
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="border-b-4 border-black pb-4 mb-6 flex items-center gap-3"
          >
            <h2 className="text-h2 font-display uppercase tracking-tight">Featured</h2>
            <span className="bg-[#DFE104] border-2 border-black px-2 py-0.5 text-xs font-bold uppercase animate-pulse-brutal">
              Latest
            </span>
          </motion.div>
          <FeaturedWriteupCard writeup={featuredWriteup} />
        </motion.section>
      )}

      <motion.section
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8"
      >
        <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-h2 font-display uppercase tracking-tight">Recent Writeups</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.05 }}
          >
            <Link
              href="/writeups"
              className="border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 inline-flex items-center gap-2"
            >
              View All
              <span className="text-lg leading-none">&rarr;</span>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
        >
          {recentWriteups.map((w) => (
            <motion.div
              key={w.path}
              variants={itemVariants}
              transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <WriteupCard writeup={w} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.hr
        initial={{ opacity: 0, scaleX: prefersReducedMotion ? 1 : 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="brutal-section-divider origin-left"
      />

      <motion.section
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="border-[6px] border-black p-8 bg-white shadow-[8px_8px_0_0_#000] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-pattern-grid opacity-50 pointer-events-none" aria-hidden="true" />
        
        <motion.h2
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="text-h1 font-display uppercase mb-6 border-b-4 border-black pb-4 tracking-tight"
        >
          About
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.05 }}
          className="text-lg font-bold space-y-4 relative"
        >
          <p>
            SYJC (Sing Yin Jockey Club) is a CTF team from Hong Kong. We capture flags and document our findings together.
          </p>
          <p className="font-medium">
            Members: DXuwu, Timothy, member3, steve
          </p>
          <p>
            All writeups are sourced from our GitHub repository:{' '}
            <Link
              href="https://github.com/timothy0509/writeups"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black border-b-4 border-black hover:bg-[#DFE104] transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
            >
              timothy0509/writeups
            </Link>
          </p>
          
          <div className="mt-6 pt-4 border-t-2 border-black/20">
            <h3 className="font-display uppercase tracking-tight mb-4">Writeup Contributions</h3>
            <div className="space-y-3">
              {authorStats.map(({ author, count, percentage }) => (
                <div key={author} className="flex items-center gap-3">
                  <span className="font-bold w-24 text-sm">{author}</span>
                  <div className="flex-1 h-6 bg-zinc-100 border-2 border-black overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.4, 0, 0.2, 1], delay: prefersReducedMotion ? 0 : 0.1 }}
                      className="h-full bg-[#DFE104]"
                    />
                  </div>
                  <span className="text-sm font-mono w-16 text-right">{percentage}%</span>
                  <span className="text-xs text-zinc-500">({count})</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t-2 border-black/20">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: prefersReducedMotion ? 0 : 0.04,
                    delayChildren: prefersReducedMotion ? 0 : 0.2,
                  },
                },
              }}
              className="flex flex-wrap gap-3"
            >
              {[
                { text: 'Web', bg: 'bg-[#DFE104]' },
                { text: 'Crypto', bg: 'bg-[#7B2CBF] text-white' },
                { text: 'Reverse', bg: 'bg-[#F77F00]' },
                { text: 'Pwn', bg: 'bg-[#E63946] text-white' },
                { text: 'Forensics', bg: 'bg-[#06D6A0]' },
                { text: 'Misc', bg: 'bg-[#00B4D8]' },
              ].map((tag) => (
                <motion.span
                  key={tag.text}
                  variants={{
                    hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.8, rotate: prefersReducedMotion ? 0 : -5 },
                    visible: { opacity: 1, scale: 1, rotate: 0 },
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.12, ease: [0.4, 0, 0.2, 1] }}
                  className={`${tag.bg} border-2 border-black px-3 py-1 text-sm font-bold uppercase`}
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