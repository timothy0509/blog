'use client';

import MarkdownRenderer from './MarkdownRenderer';

interface WriteupContentProps {
  content: string;
}

export default function WriteupContent({ content }: WriteupContentProps) {
  return <MarkdownRenderer content={content} />;
}