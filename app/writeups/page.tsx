import { getWriteups } from '@/lib/github';
import WriteupsFilter from '@/components/WriteupsFilter';

export const revalidate = 600;

export default async function WriteupsPage() {
  const writeups = await getWriteups();
  return <WriteupsFilter writeups={writeups} />;
}