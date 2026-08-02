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
    <div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
      <div className="bg-white border-4 border-[#EF4444] shadow-[12px_12px_0_0_#000] p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="mb-8">
          <span className="text-8xl font-display font-bold leading-none block text-[#EF4444]">
            !
          </span>
        </div>

        <h1 className="font-display text-h1 uppercase mb-4 tracking-tight">
          SOMETHING WENT WRONG
        </h1>

        <p className="text-lg mb-8 max-w-md mx-auto text-[#484833]">
          An error occurred while loading this page. Please try again.
        </p>

        {error.digest && (
          <p className="text-sm text-[#71717A] mb-4 label-code">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={reset} className="brutal-btn brutal-btn-accent">
            TRY AGAIN
          </button>
          <Link href="/" className="brutal-btn">
            GO HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
