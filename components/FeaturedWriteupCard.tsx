import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';

interface FeaturedWriteupCardProps {
  writeup: WriteupInfo;
}

export default function FeaturedWriteupCard({ writeup }: FeaturedWriteupCardProps) {
  const categoryColor = getCategoryColor(writeup.category);

  return (
    <article className="border-[6px] border-black p-8 bg-white shadow-[12px_12px_0_0_#000] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[16px_16px_0_0_#000] hover:rotate-[-0.5deg] active:translate-x-[4px] active:translate-y-[4px] active:shadow-[4px_4px_0_0_#000] transition-all duration-150">
      <div className="flex flex-wrap gap-3 mb-4">
        <span className="bg-[#DFE104] border-2 border-black px-4 py-1 font-bold text-lg transform -rotate-1 uppercase">
          Featured
        </span>
        <span className="font-bold bg-yellow-400 border-2 border-black px-3 py-1 text-sm tracking-wide uppercase">
          {writeup.event}
        </span>
        <span className={`font-bold ${categoryColor.bg} ${categoryColor.text} border-2 border-black px-3 py-1 text-sm tracking-wide uppercase`}>
          {writeup.category}
        </span>
      </div>

      <h2 className="text-3xl md:text-4xl font-display uppercase leading-tight tracking-tight mb-6">
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="hover:underline decoration-[4px] underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
        >
          {writeup.title}
        </Link>
      </h2>

      <Link
        href={`/writeups/${writeup.slug.join('/')}`}
        className="inline-block bg-black text-white py-3 px-6 font-bold uppercase text-lg hover:bg-[#DFE104] hover:text-black border-4 border-transparent hover:border-black transition-colors duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:ring-offset-2"
      >
        Read Writeup &rarr;
      </Link>
    </article>
  );
}
