import Link from 'next/link';
import { getWriteups } from '@/lib/github';
import WriteupCard from '@/components/WriteupCard';

export const revalidate = 600;

export default async function Home() {
  const writeups = await getWriteups();
  const recentWriteups = writeups.slice(0, 6);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12">
      <section className="mb-4">
        <h1 className="text-5xl md:text-8xl font-[family-name:var(--font-impact)] uppercase leading-none mb-6">
          CTF <span className="bg-black text-white px-2 py-1 transform inline-block rotate-2">Writeups</span>
        </h1>
        <p className="text-xl md:text-3xl font-bold max-w-2xl border-l-8 border-black pl-4">
          Writeups from various CTF competitions. Taming vulnerabilities, one flag at a time.
        </p>
      </section>

      <section className="mb-8">
        <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-impact)] uppercase">Recent Writeups</h2>
          </div>
          <Link href="/writeups" className="border-4 border-black px-4 py-2 font-bold uppercase bg-white hover:bg-black hover:text-white shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recentWriteups.map((w) => (
            <WriteupCard key={w.path} writeup={w} />
          ))}
        </div>
      </section>

      <section className="border-8 border-black p-8 bg-white shadow-[var(--shadow-brutal)]">
        <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-impact)] uppercase mb-6 border-b-4 border-black pb-4">
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
              className="text-black border-b-4 border-black hover:bg-yellow-400 transition-colors"
            >
              timothy0509/writeups
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}