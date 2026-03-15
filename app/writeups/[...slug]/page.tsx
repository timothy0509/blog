import { notFound } from 'next/navigation';
import { getWriteups, getWriteupContent } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import Link from 'next/link';
import MarkdownRenderer from '@/components/MarkdownRenderer';

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute) || 1;
}

export const dynamicParams = true;
export const revalidate = 600;

export async function generateStaticParams() {
  const writeups = await getWriteups();
  return writeups.map((writeup) => ({
    slug: writeup.slug,
  }));
}

export default async function WriteupDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const decodedSlug = slug.map(s => decodeURIComponent(s));

  const writeups = await getWriteups();
  const targetWriteup = writeups.find(w =>
    w.slug.map(s => s.toLowerCase()).join('/') === decodedSlug.map(s => s.toLowerCase()).join('/')
  );

  if (!targetWriteup) {
    notFound();
  }

  const detail = await getWriteupContent(targetWriteup.path);
  if (!detail) {
    notFound();
  }

  const readingTime = calculateReadingTime(detail.content);
  const categoryColor = getCategoryColor(detail.category);

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/writeups"
          className="inline-block border-4 border-black dark:border-white px-4 py-2 font-bold uppercase bg-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[var(--shadow-brutal)] mb-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none"
        >
          &larr; BACK TO WRITEUPS
        </Link>
      </div>

      <header className="border-b-[8px] border-black dark:border-white pb-8 mb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="stamp-label bg-yellow-400">
            {detail.event}
          </span>
          <span className={`stamp-label ${categoryColor.bg} ${categoryColor.text}`}>
            {detail.category}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-impact)] uppercase leading-none mb-4">
          {detail.title}
        </h1>

        <div className="inline-block bg-black dark:bg-white text-white dark:text-black px-4 py-2 font-bold text-lg border-4 border-black dark:border-white transform -rotate-1">
          {readingTime} min read
        </div>
      </header>

      <MarkdownRenderer content={detail.content} />

      <div className="mt-16 pt-8 border-t-[8px] border-black dark:border-white flex justify-center">
        <div className="bg-black dark:bg-white text-white dark:text-black p-6 font-bold text-center text-xl max-w-lg border-4 border-white dark:border-black shadow-[8px_8px_0_0_#facc15]">
          FLAG CAPTURED
        </div>
      </div>
    </article>
  );
}