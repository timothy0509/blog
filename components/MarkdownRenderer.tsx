import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css'; // Adjust based on theme if needed
import { clsx } from 'clsx';
import { ReactNode } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

// Extract language from code element's className (e.g., "language-json" -> "json")
function getLanguageFromElement(children: ReactNode): string | null {
  if (!children || typeof children !== 'object') return null;
  
  // React element with props
  const element = children as { props?: { className?: string; children?: ReactNode } };
  if (element.props?.className) {
    const match = element.props.className.match(/language-(\w+)/);
    if (match) return match[1];
  }
  
  return null;
}

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={clsx("prose max-w-none", className)}>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          a: ({ node: _, ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
          pre: ({ children }) => {
            const language = getLanguageFromElement(children);
            return (
              <div className="code-block-wrapper">
                {language && (
                  <span className="code-language-badge">{language}</span>
                )}
                <pre>{children}</pre>
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