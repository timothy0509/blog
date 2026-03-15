import { getWriteups } from '@/lib/github';
import WriteupsFilter from '@/components/WriteupsFilter';

export default async function WriteupsPage() {
  const writeups = await getWriteups();
  return <WriteupsFilter writeups={writeups} />;
}