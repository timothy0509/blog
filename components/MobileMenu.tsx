'use client';

import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useEffect, useRef } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  const navItems = [
    { href: '/', label: 'INDEX' },
    { href: '/writeups', label: 'WRITEUPS' },
    { href: 'https://github.com/timothy0509/writeups', label: 'GITHUB', external: true },
  ];

  useEffect(() => {
    if (isOpen) {
      if (document && document.activeElement instanceof HTMLElement) {
        previouslyFocusedElementRef.current = document.activeElement;
      }

      const panel = panelRef.current;
      if (panel) {
        const focusableSelectors =
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusable = panel.querySelector<HTMLElement>(focusableSelectors);

        window.requestAnimationFrame(() => {
          (focusable || panel).focus();
        });
      }
    } else if (previouslyFocusedElementRef.current) {
      previouslyFocusedElementRef.current.focus();
      previouslyFocusedElementRef.current = null;
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const focusableSelectors =
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusableElements = Array.from(
      panel.querySelectorAll<HTMLElement>(focusableSelectors),
    ).filter((el) => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    const isShift = event.shiftKey;
    const current = document.activeElement as HTMLElement | null;

    if (!isShift && current === lastElement) {
      event.preventDefault();
      firstElement.focus();
    } else if (isShift && current === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/80 z-40 transition-opacity duration-150 ease-out md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={`fixed top-0 right-0 h-full w-72 bg-[var(--bg)] border-l-8 border-black dark:border-white z-50 transform transition-transform duration-150 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="border-4 border-black dark:border-white px-4 py-3 font-bold uppercase bg-yellow-400 hover:bg-yellow-300 mb-8 cursor-pointer min-h-[44px] focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
            aria-label="Close menu"
          >
            CLOSE [X]
          </button>
          <nav className="flex flex-col gap-4" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <div
                key={item.href}
                className="transform transition-all duration-150 ease-out"
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="border-4 border-black dark:border-white px-4 py-4 font-bold uppercase bg-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none cursor-pointer block text-center min-h-[48px] focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="border-4 border-black dark:border-white px-4 py-4 font-bold uppercase bg-white dark:bg-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none cursor-pointer block text-center min-h-[48px] focus:outline-none focus-visible:ring-4 focus-visible:ring-yellow-400"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div
              className="mt-4 pt-4 border-t-4 border-black dark:border-white"
              style={{
                transitionDelay: isOpen ? `${navItems.length * 50}ms` : '0ms',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
              }}
            >
              <div className="font-bold uppercase text-sm mb-3">Theme</div>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}