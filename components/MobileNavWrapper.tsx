'use client';

import { useState } from 'react';
import MobileMenu from './MobileMenu';

export default function MobileNavWrapper() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden fixed top-4 right-4 z-30 border-4 border-black dark:border-white px-3 py-2 font-bold uppercase bg-yellow-400 hover:bg-yellow-300 press-button"
      >
        MENU
      </button>
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}