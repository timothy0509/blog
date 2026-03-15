import type { TOCHeading } from '@/components/TableOfContents';

export function extractHeadings(content: string): TOCHeading[] {
  const headings: TOCHeading[] = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = h2Match[1].trim();
      headings.push({
        id: slugify(text),
        text,
        level: 2,
      });
      continue;
    }

    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      const text = h3Match[1].trim();
      headings.push({
        id: slugify(text),
        text,
        level: 3,
      });
    }
  }

  return headings;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}