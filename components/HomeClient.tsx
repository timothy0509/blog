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

const PIE_COLORS = [
  '#DFE104',
  '#A855F7',
  '#06B6D4',
  '#F97316',
  '#EF4444',
  '#22C55E',
];

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = (angle - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
};

const getArcPath = (startAngle: number, endAngle: number, radius: number, cx: number, cy: number) => {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
};

interface PieChartProps {
  data: AuthorStats[];
}

function PieChart({ data }: PieChartProps) {
  const radius = 80;
  const cx = 100;
  const cy = 100;
  
  const slices = data.reduce<{ author: string; count: number; percentage: number; startAngle: number; endAngle: number; color: string }[]>((acc, item, index) => {
    const angleSize = (item.percentage / 100) * 360;
    const startAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : 0;
    const endAngle = startAngle + angleSize;
    
    acc.push({
      author: item.author,
      count: item.count,
      percentage: item.percentage,
      startAngle,
      endAngle,
      color: PIE_COLORS[index % PIE_COLORS.length]
    });
    
    return acc;
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
      <div className="border-[6px] border-black bg-white shadow-[8px_8px_0_0_#000] p-4">
        <svg width="200" height="200" viewBox="0 0 200 200" aria-label={`Pie chart showing writeup contributions by ${data.length} authors`}>
          {slices.map((slice) => (
            <path
              key={slice.author}
              d={getArcPath(slice.startAngle, slice.endAngle, radius, cx, cy)}
              fill={slice.color}
              stroke="black"
              strokeWidth="4"
            />
          ))}
        </svg>
      </div>
      <div className="flex flex-col gap-3">
        {slices.map((slice) => (
          <div key={slice.author} className="flex items-center gap-3">
            <div 
              className="w-4 h-4 border-2 border-black flex-shrink-0" 
              style={{ backgroundColor: slice.color }}
            />
            <span className="font-bold text-sm">{slice.author}</span>
            <span className="text-sm font-mono">{slice.percentage}%</span>
            <span className="text-xs text-zinc-500">({slice.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HomeClient({ featuredWriteup, recentWriteups, authorStats }: Omit<HomeClientProps, 'writeups'>) {
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
          <p><span className="text-[#EF4444]">Capturing flags</span>, together as a team.</p>
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
            <PieChart data={authorStats} />
          </div>
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
