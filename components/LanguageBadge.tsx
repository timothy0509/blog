'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="absolute top-0 right-0 flex items-center gap-2 z-10">
      <span className="code-language-badge">
        {language}
      </span>
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          px-2 py-1 text-xs font-mono uppercase tracking-wide border border-white/20
          transition-colors duration-100 focus-visible:ring-2 focus-visible:ring-[#DFE104] focus-visible:outline-none
          ${copied 
            ? 'bg-green-500/20 text-green-400 border-green-400/50' 
            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
          }
        `}
        aria-label={copied ? 'Copied!' : `Copy ${language} code`}
        title={copied ? 'Copied!' : 'Click to copy'}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              ✓ Copied
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
            >
              Copy
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}