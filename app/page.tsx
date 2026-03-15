import { getWriteups } from '@/lib/github';
import { getFeaturedWriteup } from '@/lib/utils';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  const writeups = await getWriteups();
  const featuredWriteup = getFeaturedWriteup(writeups);
  const featuredSlug = featuredWriteup?.slug.join('/');
  const recentWriteups = writeups
    .filter((w) => w.slug.join('/') !== featuredSlug)
    .slice(0, 6);

  return (
    <HomeClient 
      featuredWriteup={featuredWriteup} 
      recentWriteups={recentWriteups} 
    />
  );
}