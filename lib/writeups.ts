import { remark } from 'remark';
import html from 'remark-html';
import { fetchWriteupTree, fetchWriteupContent } from './github';

export interface WriteupData {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category: string;
  ctfName: string;
  contentHtml?: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function parseWriteupMetadata(content: string, path: string): {title: string; category: string; ctfName: string; excerpt: string } {
  const pathParts = path.split('/');
  const ctfName = pathParts[0] || 'Unknown CTF';
  const category = pathParts[1] || 'misc';
  
  const lines = content.split('\n');
  let title = '';
  let excerpt = '';
  
  const titleMatch = content.match(/^#\s+(.+?)\s*(?:-\s*Writeup)?$/m);
  if (titleMatch) {
    title = titleMatch[1].trim();
  }
  
  if (!title) {
    const fileName = pathParts[pathParts.length - 1] || '';
    title = fileName.replace(/\.md$/, '');
  }
  
  const challengeInfoMatch = content.match(/##\s*Challenge\s*Info[\s\S]*?(?=##|$)/i);
  if (challengeInfoMatch) {
    const infoSection = challengeInfoMatch[0];
    
    const titleLine = infoSection.match(/[-*]\s*\*?\*?Challenge\*?\*?:?\s*(.+?)$/im);
    if (titleLine) {
      title = titleLine[1].trim();
    }
    
    const descMatch = infoSection.match(/[-*]\s*\*?\*?Description\*?\*?:?\s*["']?(.+?)["']?\s*$/im);
    if (descMatch) {
      excerpt = descMatch[1].trim().replace(/["']/g, '');
    }
  }
  
  if (!title) {
    const fileName = pathParts[pathParts.length - 1] || 'Untitled';
    title = fileName.replace(/\.md$/, '');
  }
  
  return { title, category, ctfName, excerpt };
}

function generateSlug(ctfName: string, category: string, title: string): string {
  const ctfSlug = slugify(ctfName);
  const categorySlug = slugify(category);
  const titleSlug = slugify(title);
  return `${ctfSlug}/${categorySlug}/${titleSlug}`;
}

let writeupsCache: WriteupData[] | null = null;

export async function getSortedWriteupsData(): Promise<WriteupData[]> {
  if (writeupsCache) {
    return writeupsCache;
  }

  const paths = await fetchWriteupTree();
  const writeups: WriteupData[] = [];

  for (const path of paths) {
    try {
      const content = await fetchWriteupContent(path);
      const { title, category, ctfName, excerpt } = parseWriteupMetadata(content, path);
      const slug = generateSlug(ctfName, category, title);
      
      const dateMatch = content.match(/[-*]\s*\*?\*?Date\*?\*?:?\s*(.+?)\s*$/im);
      let date = dateMatch ? dateMatch[1].trim() : '';
      
      if (!date) {
        date = new Date().toISOString().split('T')[0];
      }

      writeups.push({
        slug,
        title,
        date,
        excerpt,
        category,
        ctfName,
      });
    } catch (error) {
      console.error(`Failed to process writeup ${path}:`, error);
    }
  }

  writeups.sort((a, b) => {
    if (a.date < b.date) return 1;
    if (a.date > b.date) return -1;
    return 0;
  });

  writeupsCache = writeups;
  return writeups;
}

export async function getWriteupData(slug: string): Promise<WriteupData> {
  const writeups = await getSortedWriteupsData();
  const writeup = writeups.find((w) => w.slug === slug);
  
  if (!writeup) {
    throw new Error(`Writeup not found: ${slug}`);
  }

  const paths = await fetchWriteupTree();
  let matchingPath: string | null = null;
  
  for (const path of paths) {
    const content = await fetchWriteupContent(path);
    const { title, category, ctfName } = parseWriteupMetadata(content, path);
    const pathSlug = generateSlug(ctfName, category, title);
    if (pathSlug === slug) {
      matchingPath = path;
      break;
    }
  }

  if (!matchingPath) {
    throw new Error(`Writeup content not found for slug: ${slug}`);
  }

  const content = await fetchWriteupContent(matchingPath);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...writeup,
    contentHtml,
  };
}