'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="brutal-card p-8 md:p-12 max-w-2xl w-full text-center" style={{ borderColor: 'var(--brutal-red)' }}>
        <div className="mb-8">
          <span className="text-8xl md:text-10xl font-display font-bold leading-none block" style={{ color: 'var(--brutal-red)' }}>
            !
          </span>
        </div>
        
        <h1 className="text-h1 font-display uppercase mb-4">
          SOMETHING WENT WRONG
        </h1>
        
        <p className="text-lg mb-8 max-w-md mx-auto">
          An error occurred while loading this page. Please try again.
        </p>
        
        {error.digest && (
          <p className="text-sm text-[var(--brutal-zinc-500)] mb-4 font-mono">
            Error ID: {error.digest}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={reset}
            className="brutal-btn brutal-btn-accent"
          >
            TRY AGAIN
          </button>
          <Link 
            href="/"
            className="brutal-btn"
          >
            GO HOME
          </Link>
        </div>
      </div>
    </main>
  );
}