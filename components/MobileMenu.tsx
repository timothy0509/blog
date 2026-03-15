'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 z-40 transition-opacity duration-200 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[var(--bg)] border-l-8 border-black dark:border-white z-50 transform transition-transform duration-200 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="border-4 border-black dark:border-white px-4 py-2 font-bold uppercase bg-yellow-400 hover:bg-yellow-300 mb-8"
          >
            CLOSE [X]
          </button>
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={onClose}
              className="border-4 border-black dark:border-white px-4 py-3 font-bold uppercase bg-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none"
            >
              INDEX
            </Link>
            <Link
              href="/writeups"
              onClick={onClose}
              className="border-4 border-black dark:border-white px-4 py-3 font-bold uppercase bg-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none"
            >
              WRITEUPS
            </Link>
            <a
              href="https://github.com/timothy0509/writeups"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="border-4 border-black dark:border-white px-4 py-3 font-bold uppercase bg-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none"
            >
              GITHUB
            </a>
            <div className="mt-4 pt-4 border-t-4 border-black dark:border-white">
              <div className="font-bold uppercase text-sm mb-2">Theme</div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}