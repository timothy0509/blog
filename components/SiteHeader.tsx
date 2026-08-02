'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import MobileNav, { MobileNavToggle } from './MobileNav';
import { UserIcon } from './icons';

function NavLink({
  href,
  children,
  isActive,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`label-caps px-4 py-2 border-2 transition-all uppercase min-h-[44px] flex items-center ${
        isActive
          ? 'bg-[#DFE104] text-black border-black'
          : 'border-transparent hover:border-black hover:bg-[#fe00fe] hover:text-black'
      }`}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  const isIndex = pathname === '/';
  const isWriteups = pathname.startsWith('/writeups');

  return (
    <>
      <motion.header
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="fixed top-0 w-full z-50 bg-white border-b-[6px] border-black"
      >
        <div className="h-20 max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Go to homepage"
          >
            <Image
              src="/syjc-logo.png"
              alt="SYJC"
              width={160}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
            <span className="font-display text-2xl md:text-[32px] font-bold uppercase tracking-tighter leading-none hidden sm:inline">
              SYJC CTF
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <MobileNavToggle
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />

            <nav
              className="hidden md:flex items-center gap-6"
              aria-label="Main navigation"
            >
              <NavLink href="/" isActive={isIndex}>
                Index
              </NavLink>
              <NavLink href="/writeups" isActive={isWriteups}>
                Writeups
              </NavLink>
              <a
                href="https://github.com/timothy0509/writeups"
                target="_blank"
                rel="noopener noreferrer"
                className="label-caps px-4 py-2 border-2 border-transparent hover:border-black hover:bg-[#06B6D4] transition-all uppercase min-h-[44px] flex items-center"
              >
                GitHub
              </a>
            </nav>

            <div
              className="hidden md:flex w-10 h-10 bg-[#616200] border-4 border-black items-center justify-center shadow-[4px_4px_0_0_#000]"
              aria-hidden="true"
            >
              <UserIcon className="text-white" size={20} />
            </div>
          </div>
        </div>
      </motion.header>

      <MobileNav isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
