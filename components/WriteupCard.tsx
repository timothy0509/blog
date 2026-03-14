import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';

interface WriteupCardProps {
  writeup: WriteupInfo;
}

export default function WriteupCard({ writeup }: WriteupCardProps) {
  const categoryColor = getCategoryColor(writeup.category);

  return (
    <article className="border-8 border-black p-6 bg-white shadow-[var(--shadow-brutal)] flex flex-col gap-4 hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[16px_16px_0_0_#000] transition-all">
      <div className="flex flex-wrap gap-2 border-b-4 border-black pb-4">
        <span className="font-bold bg-yellow-400 border-2 border-black px-2 py-1">
          {writeup.event}
        </span>
        <span className={`font-bold ${categoryColor.bg} ${categoryColor.text} border-2 border-black px-2 py-1 text-sm`}>
          {writeup.category}
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl font-[family-name:var(--font-impact)] uppercase leading-tight">
        <Link href={`/writeups/${writeup.slug.join('/')}`} className="hover:underline decoration-4 underline-offset-4">
          {writeup.title}
        </Link>
      </h2>
      <div className="flex justify-between items-center mt-auto pt-4">
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="bg-black text-white text-center py-2 px-4 font-bold uppercase hover:bg-yellow-400 hover:text-black border-4 border-transparent hover:border-black transition-colors"
        >
          Read &rarr;
        </Link>
      </div>
    </article>
  );
}