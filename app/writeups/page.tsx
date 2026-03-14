import { getWriteups } from '@/lib/github';
import Header from '@/components/layout/Header';
import WriteupDirectory from '@/components/writeups/WriteupDirectory';

export default async function WriteupsPage() {
  const writeups = await getWriteups();

  return (
    <>
      <Header />
      <main className="max-w-5xl mx-auto px-6 py-16 w-full">
        <header className="mb-16 pb-8 border-b border-zinc-200">
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl font-bold tracking-tight mb-4">
            All Writeups
          </h1>
          <p className="text-lg text-zinc-500 max-w-2xl">
            Browse {writeups.length} writeups spanning various CTF events and security categories. Use the search to filter by title, event, or category.
          </p>
        </header>

        <WriteupDirectory initialWriteups={writeups} />
      </main>
    </>
  );
}