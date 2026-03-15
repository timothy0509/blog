'use client';

import { useState } from 'react';

interface LanguageBadgeProps {
  language: string;
  code: string;
}

export default function LanguageBadge({ language, code }: LanguageBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="code-language-badge cursor-pointer hover:bg-zinc-700 hover:text-white transition-colors px-2 py-1 -mr-1 -mt-1 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none"
      aria-label={copied ? 'Copied!' : `Copy ${language} code`}
      title={copied ? 'Copied!' : 'Click to copy'}
    >
      {copied ? '✓ Copied!' : language}
    </button>
  );
}