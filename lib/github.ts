import matter from 'gray-matter';

const REPO_OWNER = 'timothy0509';
const REPO_NAME = 'writeups';
const BRANCH = 'main';

export interface WriteupInfo {
  slug: string[]; // e.g. ["poly 2026", "web", "React2XSS"]
  event: string;
  category: string;
  title: string;
  path: string;
}

export interface WriteupDetail extends WriteupInfo {
  content: string;
  frontmatter: Record<string, unknown>;
}

export async function getWriteups(): Promise<WriteupInfo[]> {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/${BRANCH}?recursive=1`;
  const res = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
    headers: {
      // Add GitHub token if rate-limited, but we'll assume unauthenticated works for now
      Accept: 'application/vnd.github.v3+json',
    },
  });

  if (!res.ok) {
    console.error('Failed to fetch GitHub tree', res.statusText);
    return [];
  }

  const data = await res.json();
  const writeups: WriteupInfo[] = [];

  for (const item of data.tree) {
    if (item.type === 'blob' && item.path.endsWith('.md')) {
      const parts = item.path.split('/');
      // Expected structure: "event/category/challenge.md"
      if (parts.length >= 3) {
        const event = parts[0];
        const category = parts[1];
        const titleWithExt = parts[parts.length - 1];
        const title = titleWithExt.replace(/\.md$/, '');
        const slug = parts.map((p: string) => p.replace(/\.md$/, ''));

        writeups.push({
          slug,
          event,
          category,
          title,
          path: item.path,
        });
      }
    }
  }

  return writeups;
}

export async function getWriteupContent(filePath: string): Promise<WriteupDetail | null> {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${encodeURI(filePath)}`;
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return null;
  }

  const text = await res.text();
  const { data: frontmatter, content } = matter(text);

  const parts = filePath.split('/');
  const event = parts[0];
  const category = parts[1];
  const title = parts[parts.length - 1].replace(/\.md$/, '');
  const slug = parts.map(p => p.replace(/\.md$/, ''));

  return {
    slug,
    event,
    category,
    title,
    path: filePath,
    content,
    frontmatter,
  };
}
