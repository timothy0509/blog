import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { ArrowRight } from 'lucide-react';

export default function Theme2Landing({ writeups }: { writeups: WriteupInfo[] }) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-[family-name:var(--font-dm-sans)] selection:bg-zinc-900 selection:text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <header className="mb-24">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Security Research &<br/>CTF Writeups.
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl font-light leading-relaxed">
            Documented methodologies, vulnerability research, and comprehensive challenge solutions by Timothy.
          </p>
        </header>

        <main>
          <div className="flex justify-between items-end mb-12 border-b border-zinc-200 pb-4">
            <h2 className="text-sm font-semibold tracking-widest uppercase text-zinc-400">Selected Works</h2>
            <Link href="/2/writeups" className="text-sm font-medium hover:text-zinc-600 transition-colors flex items-center gap-1 group">
              View Directory <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {writeups.map((w, i) => (
              <article key={i} className="group cursor-pointer">
                <Link href={`/2/writeups/${w.slug.join('/')}`}>
                  <div className="space-y-4">
                    <div className="text-xs font-medium tracking-wide uppercase text-zinc-500 flex gap-2">
                      <span>{w.event}</span>
                      <span>&mdash;</span>
                      <span>{w.category}</span>
                    </div>
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold group-hover:text-zinc-600 transition-colors leading-tight">
                      {w.title}
                    </h3>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}