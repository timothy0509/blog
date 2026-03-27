import { MetadataRoute } from 'next';
import { getWriteups } from '@/lib/github';
import { config } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const writeups = await getWriteups();

  const writeupUrls: MetadataRoute.Sitemap = writeups.map((w) => ({
    url: `${config.site.url}/writeups/${w.slug.join('/')}`,
    lastModified: new Date(w.lastModified),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: config.site.url,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${config.site.url}/writeups`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...writeupUrls,
  ];
}