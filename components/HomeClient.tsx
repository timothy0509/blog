'use client';

import { WriteupInfo } from '@/lib/github';
import WriteupCard from '@/components/WriteupCard';
import FeaturedWriteupCard from '@/components/FeaturedWriteupCard';

interface AuthorStats {
  author: string;
  count: number;
  percentage: number;
}

interface HomeClientProps {
  featuredWriteup: WriteupInfo | null;
  recentWriteups: WriteupInfo[];
  authorStats: AuthorStats[];
  totalWriteups: number;
  contributorCount: number;
}

const PIE_COLORS = [
  '#EF4444',
  '#A855F7',
  '#06B6D4',
  '#DFE104',
  '#F97316',
  '#22C55E',
];

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const getArcPath = (startAngle: number, endAngle: number, radius: number, cx: number, cy: number) => {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
};

function PieChart({ data }: { data: AuthorStats[] }) {
  const radius = 80;
  const cx = 100;
  const cy = 100;

  const slices = data.reduce<
    { author: string; count: number; percentage: number; startAngle: number; endAngle: number; color: string }[]
  >((acc, item, index) => {
    const angleSize = (item.percentage / 100) * 360;
    const startAngle = acc.length > 0 ? acc[acc.length - 1].endAngle : 0;
    const endAngle = startAngle + angleSize;

    acc.push({
      author: item.author,
      count: item.count,
      percentage: item.percentage,
      startAngle,
      endAngle,
      color: PIE_COLORS[index % PIE_COLORS.length],
    });

    return acc;
  }, []);

  return (
    <div className="relative w-full max-w-sm mx-auto flex flex-col items-center">
      <div className="relative w-72 h-72 flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 200 200" aria-label={`Contribution chart for ${data.length} authors`}>
          {slices.map((slice) => (
            <path
              key={slice.author}
              d={getArcPath(slice.startAngle, slice.endAngle, radius, cx, cy)}
              fill={slice.color}
              stroke="#1b1b1b"
              strokeWidth="3"
            />
          ))}
          <circle cx="100" cy="100" r="40" fill="#1b1b1b" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="label-caps text-white">TOTAL</span>
          <span className="font-display text-2xl font-bold text-white">100%</span>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-4 bg-black p-4 border-2 border-white max-w-md">
        {slices.map((slice) => (
          <div key={slice.author} className="flex items-center gap-2">
            <div className="w-3 h-3" style={{ backgroundColor: slice.color }} />
            <span className="label-code text-white uppercase">
              {slice.author} ({slice.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatAccessLogDate() {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function HomeClient({
  featuredWriteup,
  recentWriteups,
  authorStats,
  totalWriteups,
  contributorCount,
}: HomeClientProps) {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative px-6 py-24 md:py-32 overflow-hidden border-b-[6px] border-black bg-[#DFE104]">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col gap-4">
            <span className="label-code bg-black text-[#f9f9f9] px-4 py-1 self-start uppercase tracking-[0.2em]">
              ACCESS_LOG: {formatAccessLogDate()}
            </span>
            <h1 className="font-display text-hero font-bold uppercase leading-[0.85] text-hero-shadow max-w-4xl break-words">
              CTF
              <br />
              WRITEUPS
            </h1>
            <p className="text-lg font-medium text-black max-w-xl mt-4 border-l-4 border-black pl-6">
              Documenting the exploitation of arbitrary code execution, cryptographic failures, and misconfigured environments. Raw, technical, and unfiltered.
            </p>
          </div>
        </div>
        <div className="absolute top-10 right-6 hidden lg:block opacity-20 label-code pointer-events-none select-none">
          <pre>{`$ nmap -sV -T4 10.0.2.15
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http
443/tcp open  https
8080/tcp open  http-proxy`}</pre>
        </div>
        <div className="absolute bottom-0 right-0 w-1/3 h-full bg-dot-grid opacity-10 pointer-events-none" />
      </section>

      {/* Featured */}
      {featuredWriteup && (
        <section className="px-6 -mt-16 relative z-20">
          <div className="max-w-7xl mx-auto">
            <FeaturedWriteupCard writeup={featuredWriteup} />
          </div>
        </section>
      )}

      {/* Recent Deployments */}
      <section className="px-6 py-24 max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12 border-b-4 border-black pb-4">
          <h3 className="label-caps tracking-widest flex items-center gap-2">
            <span className="w-3 h-3 bg-[#fe00fe]" aria-hidden="true" />
            Recent Deployments
          </h3>
          <div className="label-code text-[#484833] uppercase hidden md:block">
            Items: {String(recentWriteups.length).padStart(2, '0')} / Total: {totalWriteups}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {recentWriteups.map((w) => (
            <WriteupCard key={w.path} writeup={w} />
          ))}
        </div>
      </section>

      {/* Who is SYJC */}
      <section className="bg-black text-[#f9f9f9] py-24 px-6 border-t-[6px] border-black relative">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2 flex flex-col gap-8">
            <h2 className="font-display text-hero font-bold uppercase tracking-tighter text-[#DFE104]">
              WHO IS SYJC?
            </h2>
            <div className="text-lg font-medium space-y-6 max-w-lg">
              <p>
                We are a high-performance CTF team based in Hong Kong, specializing in binary exploitation and low-level system research.
              </p>
              <p>
                Our members come from diverse backgrounds—ranging from software security engineers to hardware enthusiasts—all united by the thrill of breaking complex systems and finding elegant solutions.
              </p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <div className="border-2 border-white p-4 flex flex-col">
                <span className="font-display text-3xl font-bold leading-none">{totalWriteups}+</span>
                <span className="label-caps text-[#DFE104] mt-2">WRITEUPS PUBLISHED</span>
              </div>
              <div className="border-2 border-white p-4 flex flex-col">
                <span className="font-display text-3xl font-bold leading-none">{contributorCount}+</span>
                <span className="label-caps text-[#DFE104] mt-2">CONTRIBUTORS</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            {authorStats.length > 0 && <PieChart data={authorStats} />}
          </div>
        </div>
      </section>
    </div>
  );
}
