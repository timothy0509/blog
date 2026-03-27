export const config = {
  github: {
    owner: process.env.GITHUB_REPO_OWNER ?? 'timothy0509',
    repo: process.env.GITHUB_REPO_NAME ?? 'writeups',
    branch: process.env.GITHUB_REPO_BRANCH ?? 'main',
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
    name: process.env.NEXT_PUBLIC_SITE_NAME ?? 'SYJC CTF Writeups',
  },
} as const;