import Link from 'next/link';
import { getWriteups } from '@/lib/github';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/layout/Header';

export default async function Home() {
  const writeups = await getWriteups();
  const recentWriteups = writeups.slice(0, 4);

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-16 w-full">
        {/* Hero Section */}
        <section className="mb-24 pt-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-widest uppercase text-zinc-400 mb-4">
              CTF Player & Security Researcher
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Exploring vulnerabilities.<br/>Documenting discoveries.
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl font-light leading-relaxed mb-8">
              A curated collection of CTF writeups, vulnerability research, and security insights by Timothy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/writeups" 
                className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                Browse Writeups
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="https://github.com/timothy0509/writeups" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-zinc-300 text-zinc-700 px-6 py-3 rounded-lg hover:border-zinc-900 hover:text-zinc-900 transition-colors font-medium text-sm uppercase tracking-wider"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Recent Writeups */}
        <section className="mb-24">
          <div className="flex justify-between items-end mb-10 border-b border-zinc-200 pb-4">
            <div>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold mb-2">Recent Writeups</h2>
              <p className="text-zinc-500 text-sm">Latest security research and challenge solutions</p>
            </div>
            <Link href="/writeups" className="text-sm font-medium hover:text-zinc-600 transition-colors flex items-center gap-1 group whitespace-nowrap">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentWriteups.map((w, i) => (
              <Link href={`/writeups/${w.slug.join('/')}`} key={i} className="group block">
                <article className="h-full bg-white border border-zinc-200 rounded-xl p-6 hover:border-zinc-400 hover:shadow-lg transition-all duration-200">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-widest uppercase mb-4">
                    <span className="bg-zinc-100 text-zinc-600 px-2.5 py-1 rounded">{w.event}</span>
                    <span className="text-zinc-300">•</span>
                    <span className="text-zinc-400">{w.category}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold group-hover:text-zinc-600 transition-colors leading-tight mb-3">
                    {w.title}
                  </h3>
                  <div className="flex items-center text-zinc-400 text-sm">
                    <span>Read writeup</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-zinc-50 rounded-2xl p-8 md:p-12">
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl font-bold mb-4">About Timothy</h2>
          <div className="text-lg text-zinc-600 leading-relaxed space-y-4 max-w-3xl">
            <p>
              I&apos;m a professional cybersecurity researcher and CTF player passionate about discovering vulnerabilities, reverse engineering complex systems, and participating in high-level Capture The Flag competitions.
            </p>
            <p>
              This blog serves as an archive of my writeups, detailed walkthroughs, and security findings. I believe in sharing knowledge to help others learn and grow in the security community.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}