'use client';

import { useState, useEffect, useRef } from 'react';
import MobileMenu from './MobileMenu';

export default function MobileNavWrapper() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.preventDefault();
        setMobileMenuOpen(false);
        if (menuButtonRef.current) {
          menuButtonRef.current.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <button
        ref={menuButtonRef}
        type="button"
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 right-4 z-30 border-4 border-black dark:border-white px-3 py-2 font-bold uppercase bg-yellow-400 hover:bg-yellow-300 press-button"
        aria-haspopup="dialog"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-menu"
      >
        MENU
      </button>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}