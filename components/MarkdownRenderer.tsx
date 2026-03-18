'use client';

import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import LanguageBadge from './LanguageBadge';
import { slugify } from '@/lib/headings';

interface MarkdownRendererProps {
  content: string;
}

function getLanguage(className: string | undefined): string | null {
  if (!className) return null;
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : null;
}

function extractTextFromChildren(children: unknown): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join('');
  }
  if (typeof children === 'object' && children !== null && 'props' in children) {
    const node = children as { props?: { children?: unknown } };
    return extractTextFromChildren(node.props?.children);
  }
  return '';
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-brutal max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeKatex]}
        components={{
          a: (props) => <a target="_blank" rel="noopener noreferrer" {...props} />,
          h2: ({ children, ...props }) => {
            const text = extractTextFromChildren(children);
            const id = slugify(text);
            return <h2 id={id} {...props}>{children}</h2>;
          },
          h3: ({ children, ...props }) => {
            const text = extractTextFromChildren(children);
            const id = slugify(text);
            return <h3 id={id} {...props}>{children}</h3>;
          },
          pre: ({ children, ...props }) => {
            const codeElement = children as React.ReactElement<{ className?: string; children?: unknown }>;
            const className = codeElement?.props?.className;
            const language = getLanguage(className);
            const codeContent = extractTextFromChildren(codeElement?.props?.children);

            return (
              <div className="code-block-wrapper">
                {language && <LanguageBadge language={language} code={codeContent} />}
                <pre {...props}>{children}</pre>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}