'use client';

import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';

interface WriteupCardProps {
  writeup: WriteupInfo;
}

export default function WriteupCard({ writeup }: WriteupCardProps) {
  const categoryColor = getCategoryColor(writeup.category);
  const href = `/writeups/${writeup.slug.join('/')}`;

  return (
    <article className="group bg-white border-4 border-black shadow-magenta hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all flex flex-col">
      <div className={`h-2 ${categoryColor.bar} border-b-4 border-black`} />
      <div className="p-8 flex flex-col gap-4 flex-grow">
        <div className="flex justify-between items-start gap-3">
          <span className="label-code text-[#484833] uppercase truncate">
            {writeup.event}
          </span>
          <span className={`${categoryColor.bg} ${categoryColor.text} px-2 py-0.5 label-caps border-2 border-black shrink-0`}>
            {writeup.category}
          </span>
        </div>
        <h4 className="font-display text-2xl md:text-[32px] font-bold uppercase leading-none tracking-tight break-words">
          <Link
            href={href}
            className="hover:underline decoration-2 underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
          >
            {writeup.title}
          </Link>
        </h4>
        {writeup.nickname && (
          <p className="text-sm text-[#484833]">
            by {writeup.nickname}
          </p>
        )}
      </div>
      <div className="p-4 border-t-4 border-black bg-[#f3f3f3] flex justify-end">
        <Link
          href={href}
          className="label-caps underline decoration-2 underline-offset-4 hover:text-[#a900a9] transition-colors"
        >
          VIEW_SOURCE
        </Link>
      </div>
    </article>
  );
}
