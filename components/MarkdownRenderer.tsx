import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

interface MarkdownRendererProps {
  content: string;
}

function getLanguage(className: string | undefined): string | null {
  if (!className) return null;
  const match = className.match(/language-(\w+)/);
  return match ? match[1] : null;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-brutal max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          a: (props) => <a target="_blank" rel="noopener noreferrer" {...props} />,
          pre: ({ children, ...props }) => {
            const codeElement = children as React.ReactElement<{ className?: string }>;
            const className = codeElement?.props?.className;
            const language = getLanguage(className);

            return (
              <div className="code-block-wrapper">
                {language && <span className="code-language-badge">{language}</span>}
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