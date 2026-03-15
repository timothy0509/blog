'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import WriteupCard from '@/components/WriteupCard';
import FeaturedWriteupCard from '@/components/FeaturedWriteupCard';
import { WriteupInfo } from '@/lib/github';

interface HomeClientProps {
  writeups: WriteupInfo[];
  featuredWriteup: WriteupInfo | null;
  recentWriteups: WriteupInfo[];
}

export default function HomeClient({ featuredWriteup, recentWriteups }: Omit<HomeClientProps, 'writeups'>) {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="mb-4"
      >
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-hero font-display uppercase leading-none mb-6 tracking-tight"
        >
          <motion.span
            initial={{ opacity: 0, y: 20, skewX: -5 }}
            animate={{ opacity: 1, y: 0, skewX: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0 }}
            className="inline-block"
          >
            CTF
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="inline-block bg-black text-white px-3 py-1 transform rotate-1 ml-2 border-4 border-black"
          >
            Writeups
          </motion.span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
          className="text-xl md:text-2xl font-bold max-w-2xl border-l-8 border-[#DFE104] pl-4 py-2 bg-white/50"
        >
          <p className="mb-2">Writeups from various CTF competitions.</p>
          <p><span className="text-[#EF4444]">Taming vulnerabilities</span>, one flag at a time.</p>
        </motion.div>
      </motion.section>

      {featuredWriteup && (
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="border-b-4 border-black pb-4 mb-6"
          >
            <h2 className="text-h2 font-display uppercase tracking-tight">Featured</h2>
          </motion.div>
          <FeaturedWriteupCard writeup={featuredWriteup} />
        </motion.section>
      )}

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="mb-8"
      >
        <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <h2 className="text-h2 font-display uppercase tracking-tight">Recent Writeups</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
          >
            <Link 
              href="/writeups" 
              className="border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
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
                initial: { opacity: 0, y: 30 },
                animate: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            >
              <WriteupCard writeup={w} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.hr
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="brutal-section-divider origin-left"
      />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="border-[6px] border-black p-8 bg-white shadow-[8px_8px_0_0_#000]"
      >
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          className="text-h1 font-display uppercase mb-6 border-b-4 border-black pb-4 tracking-tight"
        >
          About
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
          className="text-lg font-bold space-y-4"
        >
          <p>
            I&apos;m a CTF player and security enthusiast capturing flags and documenting vulnerabilities. This site serves as my personal writeup archive.
          </p>
          <p>
            All writeups are sourced from my GitHub repository:{' '}
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
                { text: 'Web', className: 'bg-[#DFE104] border-2 border-black px-3 py-1 text-sm font-bold uppercase' },
                { text: 'Crypto', className: 'bg-[#A855F7] text-white border-2 border-black px-3 py-1 text-sm font-bold uppercase' },
                { text: 'Reverse', className: 'bg-[#F97316] border-2 border-black px-3 py-1 text-sm font-bold uppercase' },
                { text: 'Pwn', className: 'bg-[#EF4444] text-white border-2 border-black px-3 py-1 text-sm font-bold uppercase' },
                { text: 'Forensics', className: 'bg-[#22C55E] border-2 border-black px-3 py-1 text-sm font-bold uppercase' },
                { text: 'Misc', className: 'bg-[#06B6D4] border-2 border-black px-3 py-1 text-sm font-bold uppercase' },
              ].map((tag) => (
                <motion.span
                  key={tag.text}
                  variants={{
                    initial: { opacity: 0, scale: 0.8, rotate: -5 },
                    animate: { opacity: 1, scale: 1, rotate: 0 },
                  }}
                  transition={{ duration: 0.12, ease: [0.4, 0, 0.2, 1] }}
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