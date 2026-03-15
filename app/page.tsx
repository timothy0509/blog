import Link from 'next/link';
import { getWriteups } from '@/lib/github';
import WriteupCard from '@/components/WriteupCard';
import FeaturedWriteupCard from '@/components/FeaturedWriteupCard';
import { getFeaturedWriteup } from '@/lib/utils';

export default async function Home() {
  const writeups = await getWriteups();
  const featuredWriteup = getFeaturedWriteup(writeups);
  const featuredSlug = featuredWriteup?.slug.join('/');
  const recentWriteups = writeups
    .filter((w) => w.slug.join('/') !== featuredSlug)
    .slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12">
      <section className="mb-4">
        <h1 className="text-hero font-display uppercase leading-none mb-6 tracking-tight">
          <span className="inline-block">CTF</span>
          <span className="inline-block bg-black text-white px-3 py-1 transform rotate-1 ml-2 border-4 border-black">Writeups</span>
        </h1>
        <div className="text-xl md:text-2xl font-bold max-w-2xl border-l-8 border-[#DFE104] pl-4 py-2 bg-white/50">
          <p className="mb-2">Writeups from various CTF competitions.</p>
          <p><span className="text-[#EF4444]">Taming vulnerabilities</span>, one flag at a time.</p>
        </div>
      </section>

      {featuredWriteup && (
        <section>
          <div className="border-b-4 border-black pb-4 mb-6">
            <h2 className="text-h2 font-display uppercase tracking-tight">Featured</h2>
          </div>
          <FeaturedWriteupCard writeup={featuredWriteup} />
        </section>
      )}

      <section className="mb-8">
        <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-8">
          <div>
            <h2 className="text-h2 font-display uppercase tracking-tight">Recent Writeups</h2>
          </div>
          <Link 
            href="/writeups" 
            className="border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
          >
            View All&rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {recentWriteups.map((w) => (
            <WriteupCard key={w.path} writeup={w} />
          ))}
        </div>
      </section>

      <hr className="brutal-section-divider" />

      <section className="border-[6px] border-black p-8 bg-white shadow-[8px_8px_0_0_#000]">
        <h2 className="text-h1 font-display uppercase mb-6 border-b-4 border-black pb-4 tracking-tight">
          About
        </h2>
        <div className="text-lg font-bold space-y-4">
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
            <div className="flex flex-wrap gap-3">
              <span className="bg-[#DFE104] border-2 border-black px-3 py-1 text-sm font-bold uppercase">
                Web
              </span>
              <span className="bg-[#A855F7] text-white border-2 border-black px-3 py-1 text-sm font-bold uppercase">
                Crypto
              </span>
              <span className="bg-[#F97316] border-2 border-black px-3 py-1 text-sm font-bold uppercase">
                Reverse
              </span>
              <span className="bg-[#EF4444] text-white border-2 border-black px-3 py-1 text-sm font-bold uppercase">
                Pwn
              </span>
              <span className="bg-[#22C55E] border-2 border-black px-3 py-1 text-sm font-bold uppercase">
                Forensics
              </span>
              <span className="bg-[#06B6D4] border-2 border-black px-3 py-1 text-sm font-bold uppercase">
                Misc
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}