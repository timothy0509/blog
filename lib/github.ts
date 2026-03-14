const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com';
const REPO_OWNER = 'timothy0509';
const REPO_NAME = 'writeups';

interface GitHubTreeItem {
  path: string;
  type: string;
  sha: string;
}

interface GitHubTreeResponse {
  tree: GitHubTreeItem[];
}

export async function fetchWriteupTree(): Promise<string[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/git/trees/main?recursive=1`,
    {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'timothy-blog/1.0',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub tree: ${response.status}`);
  }

  const data: GitHubTreeResponse = await response.json();
  
  return data.tree
    .filter((item) => item.type === 'blob' && item.path.endsWith('.md'))
    .map((item) => item.path);
}

export async function fetchWriteupContent(path: string): Promise<string> {
  const response = await fetch(
    `${GITHUB_RAW_BASE}/${REPO_OWNER}/${REPO_NAME}/main/${path}`,
    {
      headers: {
        'User-Agent': 'timothy-blog/1.0',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch writeup content: ${response.status}`);
  }

  return response.text();
}