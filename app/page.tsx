import Link from "next/link";
import { getSortedWriteupsData } from "@/lib/writeups";

export const revalidate = 3600;

export default async function Home() {
  const allPostsData = await getSortedWriteupsData();

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12">
      <section className="mb-12">
        <h1 className="text-5xl md:text-8xl font-[family-name:var(--font-impact)] uppercase leading-none mb-6">
          CTF <span className="bg-black text-white px-2 py-1 transform inline-block rotate-2">Writeups</span>
        </h1>
        <p className="text-xl md:text-3xl font-bold max-w-2xl border-l-8 border-black pl-4">
          Writeups from various CTF competitions. Taming vulnerabilities, one flag at a time.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allPostsData.map(({ slug, title, date, excerpt, category, ctfName }) => (
          <article
            key={slug}
            className="border-8 border-black p-6 bg-white shadow-[var(--shadow-brutal)] flex flex-col gap-4 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0_0_#000] transition-all"
          >
            <div className="flex flex-wrap gap-2 border-b-4 border-black pb-4">
              <span className="font-bold bg-yellow-400 border-2 border-black px-2 py-1">
                {category}
              </span>
              <span className="font-bold bg-white border-2 border-black px-2 py-1 text-sm">
                {ctfName}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-impact)] uppercase leading-tight mt-2">
              <Link href={`/posts/${slug}`} className="hover:underline decoration-8 underline-offset-4">
                {title}
              </Link>
            </h2>
            {excerpt && (
              <p className="text-lg font-bold flex-grow">
                {excerpt}
              </p>
            )}
            <div className="flex justify-between items-center mt-auto pt-4">
              <span className="font-bold text-gray-600">
                {date}
              </span>
              <Link
                href={`/posts/${slug}`}
                className="bg-black text-white text-center py-3 px-6 font-bold uppercase text-xl hover:bg-yellow-400 hover:text-black border-4 border-transparent hover:border-black transition-colors"
              >
                Read &rarr;
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}