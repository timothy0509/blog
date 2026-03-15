import { notFound } from 'next/navigation';
import { getWriteups, getWriteupContent } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import { formatWriteupDate } from '@/lib/date';
import { extractHeadings } from '@/lib/toc';
import Link from 'next/link';
import WriteupContent from '@/components/WriteupContent';
import ReadingProgress from '@/components/ReadingProgress';
import ShareButtons from '@/components/ShareButtons';

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute) || 1;
}

export const dynamicParams = true;

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
  const headings = extractHeadings(detail.content);
  const pageUrl = `https://ctf.btimothy0509.com/writeups/${detail.slug.map(s => encodeURIComponent(s)).join('/')}`;

  return (
    <>
      <ReadingProgress />
      <article className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/writeups"
            className="inline-block border-4 border-black px-4 py-2 font-bold uppercase text-sm bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
          >
            &larr; Back to Writeups
          </Link>
        </div>

        <header className="border-b-[6px] border-black pb-8 mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="font-bold bg-[#DFE104] border-4 border-black px-4 py-2 text-base transform -rotate-1 shadow-[4px_4px_0_0_#000]">
              {detail.event}
            </span>
            <span className={`font-bold ${categoryColor.bg} ${categoryColor.text} border-4 border-black px-4 py-2 text-base transform rotate-1 shadow-[4px_4px_0_0_#000]`}>
              {detail.category}
            </span>
          </div>

          <h1 className="text-display font-display uppercase leading-none mb-4 tracking-tight">
            {detail.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="inline-block bg-black text-white px-4 py-2 font-bold text-base border-4 border-black transform -rotate-1">
              {readingTime} min read
            </div>
            <div className="inline-block bg-white border-4 border-black px-4 py-2 font-bold text-base transform rotate-1 shadow-[4px_4px_0_0_#DFE104]">
              <span className="text-[#EF4444]">⚑</span> FLAG DOCUMENTED
            </div>
            <div className="inline-block bg-zinc-100 border-4 border-black px-4 py-2 font-bold text-base transform -rotate-1">
              Created: {formatWriteupDate(detail.createdAt)}
            </div>
            <div className="inline-block bg-zinc-100 border-4 border-black px-4 py-2 font-bold text-base transform rotate-1">
              Updated: {formatWriteupDate(detail.lastModified)}
            </div>
          </div>

          <ShareButtons title={detail.title} url={pageUrl} />
        </header>

        <WriteupContent content={detail.content} headings={headings} />

        <div className="mt-16 pt-8 border-t-[6px] border-black">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div className="bg-black text-white p-6 font-bold text-center text-lg shadow-[8px_8px_0_0_#DFE104] border-4 border-[#DFE104] max-w-lg transform -rotate-1">
              <span className="text-2xl block mb-2">⚑</span>
              FLAG CAPTURED
            </div>
            <Link 
              href="/writeups" 
              className="border-4 border-black px-6 py-4 font-bold uppercase bg-white hover:bg-black hover:text-white shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2 transform rotate-1"
            >
              Browse More Writeups&rarr;
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}