import Link from 'next/link';
import { WriteupDetail } from '@/lib/github';
import { ArrowLeft } from 'lucide-react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export default function Theme2Detail({ detail }: { detail: WriteupDetail }) {
  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-[family-name:var(--font-dm-sans)] selection:bg-zinc-900 selection:text-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <header className="mb-20">
          <Link href="/2/writeups" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-900 mb-12 transition-colors uppercase tracking-widest font-medium">
            <ArrowLeft className="w-4 h-4" /> Directory
          </Link>
          
          <div className="flex items-center gap-3 text-sm font-medium tracking-wide uppercase text-zinc-500 mb-6">
            <span>{detail.event}</span>
            <span>&mdash;</span>
            <span>{detail.category}</span>
          </div>
          
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold leading-tight mb-8">
            {detail.title}
          </h1>
        </header>

        <main className="prose prose-zinc max-w-none prose-lg
          prose-headings:font-[family-name:var(--font-playfair)] prose-headings:font-bold prose-headings:tracking-tight
          prose-p:leading-relaxed prose-p:text-zinc-700
          prose-a:underline prose-a:decoration-zinc-300 prose-a:underline-offset-4 hover:prose-a:decoration-zinc-900 prose-a:transition-colors
          prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-medium prose-code:font-[family-name:var(--font-geist-mono)] prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 prose-pre:text-zinc-100 prose-pre:shadow-lg prose-pre:rounded-xl
          prose-blockquote:border-l-zinc-300 prose-blockquote:text-zinc-500 prose-blockquote:font-serif prose-blockquote:italic
          prose-img:rounded-2xl
          markdown-content">
          <MarkdownRenderer content={detail.content} />
        </main>
      </div>
    </div>
  );
}