import matter from 'gray-matter';

const REPO_OWNER = 'timothy0509';
const REPO_NAME = 'writeups';
const BRANCH = 'main';

export interface WriteupInfo {
  slug: string[];
  event: string;
  category: string;
  title: string;
  path: string;
  createdAt: string;
  lastModified: string;
  nickname: string;
}

export interface WriteupDetail extends WriteupInfo {
  content: string;
  frontmatter: Record<string, unknown>;
}

export async function getWriteups(): Promise<WriteupInfo[]> {
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/index.json`;
  const res = await fetch(url, {
    next: { tags: ['writeups-data'], revalidate: 3600 },
  });

  if (!res.ok) {
    console.error('Failed to fetch writeups index', res.statusText);
    return [];
  }

  const data = await res.json();
  return data.writeups || [];
}

export async function getWriteupContent(filePath: string): Promise<WriteupDetail | null> {
  // Fetch dates from index
  const writeups = await getWriteups();
  const writeupInfo = writeups.find(w => w.path === filePath);
  
  const url = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${encodeURI(filePath)}`;
  const res = await fetch(url, {
    next: { tags: ['writeups-data'], revalidate: 3600 },
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
    createdAt: writeupInfo?.createdAt || '',
    lastModified: writeupInfo?.lastModified || '',
    nickname: writeupInfo?.nickname || '',
    content,
    frontmatter,
  };
}