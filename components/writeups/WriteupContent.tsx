"use client";

import MarkdownRenderer from '@/components/MarkdownRenderer';
import { motion } from 'framer-motion';

export default function WriteupContent({ content }: { content: string }) {
  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="prose prose-zinc max-w-none prose-lg
        prose-headings:font-[family-name:var(--font-playfair)] prose-headings:font-bold prose-headings:tracking-tight prose-headings:scroll-mt-20
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-200
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
        prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-2
        prose-p:leading-relaxed prose-p:text-zinc-700 prose-p:mb-6
        prose-a:underline prose-a:decoration-zinc-300 prose-a:underline-offset-4 hover:prose-a:decoration-zinc-900 prose-a:transition-colors prose-a:text-zinc-900
        prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-zinc-200
        prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-pre:shadow-lg prose-pre:rounded-xl prose-pre:overflow-x-auto
        prose-blockquote:border-l-zinc-300 prose-blockquote:bg-zinc-50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:text-zinc-600 prose-blockquote:font-serif prose-blockquote:not-italic prose-blockquote:my-6
        prose-img:rounded-xl prose-img:border prose-img:border-zinc-200 prose-img:shadow-sm
        prose-ul:my-6 prose-ol:my-6
        prose-li:my-1
        prose-hr:border-zinc-200 prose-hr:my-12
        prose-strong:font-semibold prose-strong:text-zinc-900
        prose-table:overflow-hidden prose-table:rounded-lg prose-table:border prose-table:border-zinc-200
        prose-th:bg-zinc-50 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-sm
        prose-td:p-3 prose-td:border-t prose-td:border-zinc-200
        markdown-content"
    >
      <MarkdownRenderer content={content} />
    </motion.article>
  );
}