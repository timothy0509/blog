import matter from 'gray-matter';
import { config } from './config';
import { WriteupsIndexSchema, type WriteupInfo } from './schemas';
import { FetchError } from './errors';

const FETCH_TIMEOUT_MS = 10000;

export type { WriteupInfo };

export interface WriteupDetail extends WriteupInfo {
  content: string;
  frontmatter: Record<string, unknown>;
}

async function fetchWithTimeout(url: string): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      next: { tags: ['writeups-data'], revalidate: 3600 },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new FetchError(`Request timeout after ${FETCH_TIMEOUT_MS}ms`, 0, url);
    }
    throw error;
  }
}

let writeupsCache: WriteupInfo[] | null = null;

export async function getWriteups(): Promise<WriteupInfo[]> {
  if (writeupsCache) {
    return writeupsCache;
  }

  const url = `https://raw.githubusercontent.com/${config.github.owner}/${config.github.repo}/${config.github.branch}/index.json`;
  const res = await fetchWithTimeout(url);

  if (!res.ok) {
    console.error('Failed to fetch writeups index', res.statusText);
    return [];
  }

  try {
    const rawData = await res.json();
    const validated = WriteupsIndexSchema.parse(rawData);
    writeupsCache = validated.writeups;
    return writeupsCache;
  } catch (error) {
    console.error('Failed to validate writeups index', error);
    return [];
  }
}

export async function getWriteupContent(
  filePath: string,
  metadata?: WriteupInfo
): Promise<WriteupDetail | null> {
  const writeupInfo = metadata ?? (await getWriteups()).find((w) => w.path === filePath);

  const url = `https://raw.githubusercontent.com/${config.github.owner}/${config.github.repo}/${config.github.branch}/${encodeURI(filePath)}`;
  const res = await fetchWithTimeout(url);

  if (!res.ok) {
    console.error('Failed to fetch writeup content', res.statusText);
    return null;
  }

  const text = await res.text();
  const { data: frontmatter, content } = matter(text);

  const parts = filePath.split('/');
  const event = parts[0] ?? '';
  const category = parts[1] ?? '';
  const title = parts[parts.length - 1]?.replace(/\.md$/, '') ?? '';
  const slug = parts.map((p) => p.replace(/\.md$/, ''));

  return {
    slug,
    event,
    category,
    title,
    path: filePath,
    createdAt: writeupInfo?.createdAt ?? '',
    lastModified: writeupInfo?.lastModified ?? '',
    nickname: writeupInfo?.nickname,
    writer: writeupInfo?.writer,
    content,
    frontmatter,
  };
}

export async function getWriteupBySlug(slug: string[]): Promise<WriteupDetail | null> {
  const writeups = await getWriteups();
  const normalizedSlug = slug.map((s) => s.toLowerCase());
  const writeupInfo = writeups.find(
    (w) => w.slug.map((s) => s.toLowerCase()).join('/') === normalizedSlug.join('/')
  );

  if (!writeupInfo) {
    return null;
  }

  return getWriteupContent(writeupInfo.path, writeupInfo);
}

export function clearWriteupsCache(): void {
  writeupsCache = null;
}