'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import MobileNav, { MobileNavToggle } from './MobileNav';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : -30 },
    visible: { opacity: 1, y: 0 },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : -20 },
    visible: { opacity: 1, x: 0 },
  };

  const navVariants = {
    hidden: { opacity: 0, x: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="border-b-[6px] border-black p-4 md:p-6 flex justify-between items-center bg-brutal-header"
      >
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1] }}
        >
          <Link
            href="/"
            className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter hover:bg-black hover:text-[#DFE104] transition-colors duration-100 inline-block leading-none pb-1 border-4 border-transparent bg-[#DFE104] px-2 hover:border-black"
            aria-label="Go to homepage"
          >
            <span className="inline-block">SYJC</span>
            <span className="inline-block ml-2">CTF</span>
            <span className="inline-block ml-2">WRITEUPS</span>
          </Link>
        </motion.div>

        <div className="flex items-center gap-3">
          <MobileNavToggle 
            isOpen={mobileMenuOpen} 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          />
          
          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: prefersReducedMotion ? 0 : 0.15, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="hidden md:flex gap-3 font-bold text-sm sm:text-base"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] transition-all duration-100 bg-white min-h-[44px] flex items-center"
            >
              INDEX
            </Link>
            <Link
              href="/writeups"
              className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] transition-all duration-100 bg-white min-h-[44px] flex items-center"
            >
              WRITEUPS
            </Link>
            <a
              href="https://github.com/timothy0509/writeups"
              target="_blank"
              rel="noopener noreferrer"
              className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] transition-all duration-100 bg-white min-h-[44px] flex items-center"
            >
              GITHUB
            </a>
          </motion.nav>
        </div>
      </motion.header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}