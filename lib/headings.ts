export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function generateUniqueId(text: string, existingIds: Set<string>): string {
  let id = slugify(text);
  let counter = 1;
  const baseId = id;

  while (existingIds.has(id)) {
    id = `${baseId}-${counter}`;
    counter++;
  }

  existingIds.add(id);
  return id;
}

export function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];
  const existingIds = new Set<string>();
  const lines = content.split('\n');

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateUniqueId(text, existingIds);
      headings.push({ id, text, level });
    }
  }

  return headings;
}
