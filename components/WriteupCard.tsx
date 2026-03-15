import Link from 'next/link';
import { WriteupInfo } from '@/lib/github';
import { getCategoryColor } from '@/lib/colors';

interface WriteupCardProps {
  writeup: WriteupInfo;
  featured?: boolean;
}

export default function WriteupCard({ writeup, featured = false }: WriteupCardProps) {
  const categoryColor = getCategoryColor(writeup.category);

  return (
    <article className={`brutal-card p-6 flex flex-col gap-4 graphic-corner ${featured ? 'featured-writeup' : ''}`} aria-labelledby={`writeup-${writeup.slug.join('-')}`}>
      <div className="flex flex-wrap gap-2 border-b-4 border-black dark:border-white pb-4">
        <span className="stamp-label bg-yellow-400">
          {writeup.event}
        </span>
        <span className={`stamp-label ${categoryColor.bg} ${categoryColor.text}`}>
          {writeup.category}
        </span>
      </div>
      <h2 id={`writeup-${writeup.slug.join('-')}`} className="text-2xl md:text-3xl font-[family-name:var(--font-display)] uppercase leading-tight font-bold">
        <Link href={`/writeups/${writeup.slug.join('/')}`} className="hover:underline decoration-4 underline-offset-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400">
          {writeup.title}
        </Link>
      </h2>
      <div className="flex justify-between items-center mt-auto pt-4">
        <Link
          href={`/writeups/${writeup.slug.join('/')}`}
          className="bg-black text-white text-center py-2 px-4 font-bold uppercase hover:bg-yellow-400 hover:text-black border-4 border-transparent hover:border-black transition-colors dark:bg-white dark:text-black dark:hover:bg-yellow-400 press-button cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400 dark:focus-visible:ring-yellow-400"
          aria-label={`Read writeup: ${writeup.title}`}
        >
          Read &rarr;
        </Link>
      </div>
    </article>
  );
}