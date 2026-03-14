import { notFound } from 'next/navigation';
import { getWriteups, getWriteupContent } from '@/lib/github';
import WriteupContent from '@/components/writeups/WriteupContent';
import { calculateReadingTime } from '@/lib/utils';
import Link from 'next/link';
import Header from '@/components/layout/Header';

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

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto px-6 py-16 w-full">
        <header className="mb-12">
          <Link 
            href="/writeups" 
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-8 transition-colors font-medium group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">&larr;</span>
            <span className="uppercase tracking-widest text-xs">Back to Directory</span>
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-widest uppercase mb-6">
            <span className="bg-zinc-100 text-zinc-700 px-3 py-1.5 rounded-md">{detail.event}</span>
            <span className="text-zinc-300">/</span>
            <span className="bg-zinc-900 text-white px-3 py-1.5 rounded-md">{detail.category}</span>
          </div>
          
          <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4">
            {detail.title}
          </h1>
          
          <p className="text-zinc-500 text-sm">
            {readingTime} min read
          </p>
        </header>

        <div className="border-t border-zinc-200 pt-12">
          <WriteupContent content={detail.content} />
        </div>
      </div>
    </>
  );
}