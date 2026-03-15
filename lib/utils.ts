import { WriteupInfo } from './github';

export function getFeaturedWriteup(writeups: WriteupInfo[]): WriteupInfo | null {
  if (writeups.length === 0) return null;

  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const index = dayOfYear % writeups.length;
  return writeups[index];
}
