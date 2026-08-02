'use client';

import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import { UserIcon, CalendarIcon, ArrowRightIcon, FolderIcon } from '@/components/icons';
import ShareButtons from '@/components/ShareButtons';

interface WriteupDetailClientProps {
  writeup: WriteupInfo;
  description: string | null;
  readingTime: number;
  pageUrl: string;
  relatedSameEvent: WriteupInfo[];
  nextWriteup: WriteupInfo | null;
  children: React.ReactNode;
}

function hashWriteupId(slug: string[]): string {
  const str = slug.join('/');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `0x${(Math.abs(hash) >>> 0).toString(16).toUpperCase().padStart(6, '0').slice(0, 6)}`;
}

function formatLongDate(dateString: string): string {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).toUpperCase();
}

export default function WriteupDetailClient({
  writeup,
  description,
  readingTime,
  pageUrl,
  relatedSameEvent,
  nextWriteup,
  children,
}: WriteupDetailClientProps) {
  const categoryColor = getCategoryColor(writeup.category);
  const writeupId = hashWriteupId(writeup.slug);
  const gutterLabel = `${writeup.event}_${writeup.category}`.replace(/\s+/g, '_').toUpperCase();
  const author = writeup.nickname || writeup.writer;

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-[6px] bg-black" />

      <div className="max-w-7xl mx-auto w-full px-6 flex flex-col md:flex-row">
        {/* Left gutter */}
        <div className="hidden lg:block w-20 flex-shrink-0 border-r-4 border-black pt-12">
          <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-4 sticky top-28">
            <span className="label-code uppercase tracking-tighter opacity-40">
              {gutterLabel}
            </span>
            <div className={`w-1 h-32 ${categoryColor.bar}`} />
            <span className="label-caps">WRITEUP_ID: {writeupId}</span>
          </div>
        </div>

        {/* Main article */}
        <article className="flex-grow pt-12 md:pr-12 pb-12 min-w-0">
          <div className="mb-6">
            <Link
              href="/writeups"
              className="inline-block border-2 border-black px-4 py-2 label-caps bg-white shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
              ← Back to Writeups
            </Link>
          </div>

          <header className="relative mb-12">
            <div className="absolute -top-6 -left-2 label-code text-[#DFE104] bg-black px-2 py-1 z-10 shadow-[4px_4px_0_0_#000]">
              {writeup.category.toUpperCase()} CHALLENGE
            </div>
            <h1 className="font-display text-display font-bold uppercase break-words leading-none mb-6 pt-4">
              {writeup.title}
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              {author && (
                <div className="bg-[#DFE104] border-2 border-black px-4 py-1 shadow-[4px_4px_0_0_#000] flex items-center gap-2">
                  <UserIcon size={18} />
                  <span className="label-caps">{author}</span>
                </div>
              )}
              <div className="bg-[#e2e2e2] border-2 border-black px-4 py-1 shadow-[4px_4px_0_0_#000] flex items-center gap-2">
                <CalendarIcon size={18} />
                <span className="label-caps">{formatLongDate(writeup.createdAt)}</span>
              </div>
              <div className="bg-black text-white border-2 border-black px-4 py-1 shadow-[4px_4px_0_0_#000] label-caps">
                {readingTime} MIN READ
              </div>
            </div>
            <div className="mt-6">
              <ShareButtons title={writeup.title} url={pageUrl} />
            </div>
          </header>

          {description && (
            <section className="mb-12">
              <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] relative">
                <div className="absolute top-0 right-0 p-2 opacity-10 select-none pointer-events-none" aria-hidden="true">
                  <span className="text-6xl font-mono">&gt;_</span>
                </div>
                <h2 className="label-caps text-[#484833] mb-2">DESCRIPTION</h2>
                <p className="text-lg font-medium italic">{description}</p>
              </div>
            </section>
          )}

          <div className="prose-content">{children}</div>
        </article>

        {/* Right sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0 pt-12 pb-12">
          <div className="sticky top-28 space-y-6">
            {relatedSameEvent.length > 0 && (
              <div className="bg-white border-4 border-black p-4 shadow-[8px_8px_0_0_#000]">
                <div className="flex items-center gap-2 mb-4">
                  <FolderIcon className="text-[#a900a9]" size={20} />
                  <h3 className="label-caps">SAME_CTF_LOGS</h3>
                </div>
                <div className="space-y-4">
                  {relatedSameEvent.map((w, i) => {
                    const color = getCategoryColor(w.category);
                    return (
                      <Link
                        key={w.path}
                        href={`/writeups/${w.slug.join('/')}`}
                        className={`block group/link ${
                          i < relatedSameEvent.length - 1
                            ? 'border-b-2 border-[#e2e2e2] pb-2'
                            : ''
                        } hover:border-black transition-colors`}
                      >
                        <span className="label-code block uppercase" style={{ color: color.hex }}>
                          {w.category.toUpperCase()}
                        </span>
                        <span className="text-lg font-bold uppercase group-hover/link:text-[#a900a9] transition-colors break-words">
                          {w.title}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {nextWriteup && (
              <div className="bg-black text-white p-4 border-4 border-black shadow-[8px_8px_0_0_#000] flex flex-col justify-between min-h-[200px] gap-6">
                <div>
                  <div className="label-caps text-[#DFE104] mb-2 flex items-center justify-between">
                    <span>NEXT_ARTICLE</span>
                    <ArrowRightIcon size={18} />
                  </div>
                  <h4 className="font-display text-2xl font-bold leading-tight uppercase break-words">
                    {nextWriteup.title}
                  </h4>
                </div>
                <Link
                  href={`/writeups/${nextWriteup.slug.join('/')}`}
                  className="w-full bg-[#DFE104] text-black label-caps py-3 border-2 border-black shadow-[4px_4px_0_0_#fff] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-center"
                >
                  READ NOW
                </Link>
              </div>
            )}

            <div className={`relative overflow-hidden border-4 border-black h-40 ${categoryColor.bar}`}>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4">
                <p className="label-caps text-white">{writeup.event}</p>
                <p className="label-code text-[#DFE104]">{writeup.category.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
