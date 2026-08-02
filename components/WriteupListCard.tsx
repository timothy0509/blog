'use client';

import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';
import { ArrowRightIcon } from '@/components/icons';

interface WriteupListCardProps {
  writeup: WriteupInfo;
}

function formatIsoDate(dateString: string): string {
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toISOString().slice(0, 10);
}

export default function WriteupListCard({ writeup }: WriteupListCardProps) {
  const color = getCategoryColor(writeup.category);
  const href = `/writeups/${writeup.slug.join('/')}`;
  const author = writeup.nickname || writeup.writer;

  return (
    <Link href={href} className="block group">
      <article className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0_0_#000] hover:shadow-[12px_12px_0_0_#616200] transition-all cursor-pointer">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`${color.bg} ${color.text} label-code text-[10px] px-2 py-0.5 border-2 border-black uppercase`}>
                {writeup.category}
              </span>
              <span className="label-code text-[#484833] uppercase tracking-tighter truncate">
                {writeup.event}
              </span>
            </div>
            <h3 className="font-display text-2xl md:text-[32px] font-bold uppercase leading-tight group-hover:text-[#616200] transition-colors break-words">
              {writeup.title}
            </h3>
          </div>
          <div className="flex flex-col md:items-end gap-1 shrink-0">
            <span className="label-code opacity-60">{formatIsoDate(writeup.createdAt)}</span>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t-2 border-[#e2e2e2] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 ${color.bar}`} aria-hidden="true" />
            <span className="label-caps uppercase">
              Author:{' '}
              <span className="text-[#a900a9] font-bold">
                {author || 'Unknown'}
              </span>
            </span>
          </div>
          <ArrowRightIcon
            className="group-hover:translate-x-2 transition-transform"
            size={24}
          />
        </div>
      </article>
    </Link>
  );
}
