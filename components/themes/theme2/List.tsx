import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';

export default function Theme2List({ writeups }: { writeups: WriteupInfo[] }) {
  // Sort alphabetically or however, we will group by event
  const events = Array.from(new Set(writeups.map(w => w.event)));

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-[family-name:var(--font-dm-sans)] selection:bg-zinc-900 selection:text-white">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <header className="mb-24 flex items-center justify-between">
          <Link href="/2" className="font-[family-name:var(--font-playfair)] text-2xl font-bold hover:opacity-70 transition-opacity">
            Timothy.
          </Link>
          <span className="text-sm text-zinc-400 font-medium uppercase tracking-widest">Index</span>
        </header>

        <main className="space-y-24">
          {events.map(event => {
            const eventWriteups = writeups.filter(w => w.event === event);
            return (
              <section key={event}>
                <h2 className="text-4xl font-[family-name:var(--font-playfair)] font-bold mb-12 border-b border-zinc-200 pb-6">
                  {event}
                </h2>
                <div className="space-y-6">
                  {eventWriteups.map(w => (
                    <Link href={`/2/writeups/${w.slug.join('/')}`} key={w.path} className="group block">
                      <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-zinc-100 group-hover:border-zinc-300 transition-colors">
                        <h3 className="text-lg font-medium group-hover:text-zinc-600 transition-colors">
                          {w.title}
                        </h3>
                        <span className="text-sm text-zinc-400 uppercase tracking-wide mt-2 md:mt-0">
                          {w.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </main>
      </div>
    </div>
  );
}