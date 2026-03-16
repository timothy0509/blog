import { getWriteups, WriteupInfo } from '@/lib/github';
import { getFeaturedWriteup } from '@/lib/utils';
import HomeClient from '@/components/HomeClient';

function calculateAuthorStats(writeups: WriteupInfo[]) {
  const authorCounts: Record<string, number> = {};
  for (const w of writeups) {
    const author = w.nickname || 'Unknown';
    authorCounts[author] = (authorCounts[author] || 0) + 1;
  }
  const total = writeups.length;
  return Object.entries(authorCounts)
    .map(([author, count]) => ({
      author,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);
}

export default async function Home() {
  const writeups = await getWriteups();
  const featuredWriteup = getFeaturedWriteup(writeups);
  const featuredSlug = featuredWriteup?.slug.join('/');
  const recentWriteups = writeups
    .filter((w) => w.slug.join('/') !== featuredSlug)
    .slice(0, 6);
  const authorStats = calculateAuthorStats(writeups);

  return (
    <HomeClient 
      featuredWriteup={featuredWriteup} 
      recentWriteups={recentWriteups} 
      authorStats={authorStats}
    />
  );
}