'use client';

import { useState } from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
  language?: string | null;
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  );
}

export default function CodeBlock({ children, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const codeElement = document.activeElement?.closest('.code-block-wrapper')?.querySelector('code');
    const code = codeElement?.textContent || '';
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-block-wrapper relative group">
      <div className="absolute top-0 left-0 right-0 h-8 bg-neutral-900 border-b-4 flex items-center justify-between px-3 z-10" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500 border-2 border-red-700" />
            <span className="w-3 h-3 rounded-full bg-yellow-500 border-2 border-yellow-700" />
            <span className="w-3 h-3 rounded-full bg-green-500 border-2 border-green-700" />
          </div>
          {language && (
            <span className="text-xs font-bold uppercase text-neutral-400 ml-2">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-neutral-800 flex items-center gap-1 text-xs font-bold uppercase text-yellow-400 border-2 border-neutral-600 hover:border-yellow-400 px-2 py-1 cursor-pointer"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <CheckIcon /> <span className="hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon /> <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>{children}
    </div>
  );
}