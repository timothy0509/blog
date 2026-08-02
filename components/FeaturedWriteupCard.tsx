'use client';

import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';

interface FeaturedWriteupCardProps {
  writeup: WriteupInfo;
}

export default function FeaturedWriteupCard({ writeup }: FeaturedWriteupCardProps) {
  const categoryColor = getCategoryColor(writeup.category);
  const href = `/writeups/${writeup.slug.join('/')}`;
  const fileHint = writeup.slug[writeup.slug.length - 1] ?? writeup.title;

  return (
    <article className="bg-white border-[6px] border-black shadow-[12px_12px_0_0_#000] p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
      <div className={`w-full md:w-1/2 aspect-video overflow-hidden relative border-4 border-black ${categoryColor.bar}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
          <pre className="label-code text-white text-xs leading-relaxed select-none pointer-events-none">
{`$ cat ./${fileHint}
# ${writeup.category.toUpperCase()}
# ${writeup.event}
...`}
          </pre>
        </div>
        <div className="absolute bottom-4 left-4 label-code text-white">
          FILE: {fileHint}
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`${categoryColor.bg} ${categoryColor.text} border-2 border-black px-4 py-1 label-caps`}>
            {writeup.category}
          </span>
          <span className="label-code">{writeup.event}</span>
        </div>
        <h2 className="font-display text-2xl md:text-[32px] font-bold uppercase tracking-tight leading-none break-words">
          {writeup.title}
        </h2>
        {writeup.nickname && (
          <p className="text-sm text-[#484833]">
            written by {writeup.nickname}
          </p>
        )}
        <Link href={href} className="group relative inline-flex self-start">
          <span className="bg-[#DFE104] border-4 border-black px-8 py-3 label-caps z-10 transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
            Read Breakdown
          </span>
          <span
            className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
