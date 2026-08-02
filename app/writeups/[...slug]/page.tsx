import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getWriteups, getWriteupBySlug, WriteupInfo } from '@/lib/github';
import { config } from '@/lib/config';
import WriteupContent from '@/components/WriteupContent';
import ReadingProgress from '@/components/ReadingProgress';
import WriteupDetailClient from '@/components/WriteupDetailClient';

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute) || 1;
}

function extractDescription(content: string): string | null {
  const lines = content.split('\n');
  const paragraphs: string[] = [];
  let current = '';

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#') || trimmed.startsWith('```') || trimmed.startsWith('|') || trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('>')) {
      if (current) {
        paragraphs.push(current.trim());
        current = '';
      }
      continue;
    }
    if (!trimmed) {
      if (current) {
        paragraphs.push(current.trim());
        current = '';
      }
      continue;
    }
    current = current ? `${current} ${trimmed}` : trimmed;
  }
  if (current) paragraphs.push(current.trim());

  const first = paragraphs.find((p) => p.length > 40);
  if (!first) return null;
  return first.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`]/g, '').slice(0, 280);
}

function getSameEventWriteups(current: WriteupInfo, all: WriteupInfo[]): WriteupInfo[] {
  const currentSlug = current.slug.join('/');
  return all
    .filter((w) => w.event === current.event && w.slug.join('/') !== currentSlug)
    .slice(0, 3);
}

function getNextWriteup(current: WriteupInfo, all: WriteupInfo[]): WriteupInfo | null {
  const currentSlug = current.slug.join('/');
  const idx = all.findIndex((w) => w.slug.join('/') === currentSlug);
  if (idx === -1) return null;
  if (idx + 1 < all.length) return all[idx + 1];
  if (idx > 0) return all[0];
  return null;
}

export const dynamicParams = true;

export async function generateStaticParams() {
  const writeups = await getWriteups();
  return writeups.map((writeup) => ({
    slug: writeup.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = slug.map((s) => decodeURIComponent(s));
  const detail = await getWriteupBySlug(decodedSlug);

  if (!detail) {
    return {
      title: 'Writeup Not Found',
    };
  }

  return {
    title: detail.title,
    description: `${detail.category} writeup from ${detail.event}${detail.nickname ? ` by ${detail.nickname}` : ''}`,
    openGraph: {
      title: detail.title,
      description: `${detail.category} - ${detail.event}`,
      type: 'article',
      publishedTime: detail.createdAt,
      modifiedTime: detail.lastModified,
      authors: detail.nickname ? [detail.nickname] : undefined,
      url: `${config.site.url}/writeups/${detail.slug.join('/')}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: detail.title,
      description: `${detail.category} - ${detail.event}`,
    },
  };
}

export default async function WriteupDetailPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const decodedSlug = slug.map((s) => decodeURIComponent(s));

  const detail = await getWriteupBySlug(decodedSlug);

  if (!detail) {
    notFound();
  }

  const writeups = await getWriteups();
  const readingTime = calculateReadingTime(detail.content);
  const description = extractDescription(detail.content);
  const pageUrl = `${config.site.url}/writeups/${detail.slug.map((s) => encodeURIComponent(s)).join('/')}`;
  const relatedSameEvent = getSameEventWriteups(detail, writeups);
  const nextWriteup = getNextWriteup(detail, writeups);

  return (
    <>
      <ReadingProgress />
      <WriteupDetailClient
        writeup={detail}
        description={description}
        readingTime={readingTime}
        pageUrl={pageUrl}
        relatedSameEvent={relatedSameEvent}
        nextWriteup={nextWriteup}
      >
        <WriteupContent content={detail.content} />
      </WriteupDetailClient>
    </>
  );
}
