'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="square"
      className="w-6 h-6"
      aria-hidden="true"
    >
      <motion.line
        x1="3"
        y1="6"
        x2="21"
        y2="6"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 6 : 0,
        }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.line
        x1="3"
        y1="12"
        x2="21"
        y2="12"
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0 : 1,
        }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      />
      <motion.line
        x1="3"
        y1="18"
        x2="21"
        y2="18"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -6 : 0,
        }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  );
}

function NavLink({
  href,
  children,
  isActive,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        border-2 border-black px-4 py-3 uppercase label-caps
        shadow-[4px_4px_0_0_#000] transition-all duration-100
        hover:translate-x-1 hover:translate-y-1 hover:shadow-none
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#DFE104] focus-visible:ring-offset-2
        min-h-[44px] flex items-center justify-center
        ${isActive ? 'bg-[#DFE104]' : 'bg-white hover:bg-[#fe00fe]'}
      `}
      aria-current={isActive ? 'page' : undefined}
    >
      {children}
    </Link>
  );
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="
        border-2 border-black px-4 py-3 uppercase label-caps
        shadow-[4px_4px_0_0_#000] transition-all duration-100
        bg-white hover:bg-[#06B6D4]
        hover:translate-x-1 hover:translate-y-1 hover:shadow-none
        focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-[#DFE104] focus-visible:ring-offset-2
        min-h-[44px] flex items-center justify-center
      "
    >
      {children}
    </a>
  );
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();

  const navLinks = [
    { href: '/', label: 'INDEX' },
    { href: '/writeups', label: 'WRITEUPS' },
    { href: 'https://github.com/timothy0509/writeups', label: 'GITHUB', external: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.nav
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: '-100%' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: '-100%' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="fixed top-0 left-0 h-full w-72 bg-white border-r-[6px] border-black z-50 md:hidden shadow-[8px_0_0_0_#000]"
            aria-label="Mobile navigation"
          >
            <div className="p-4 border-b-4 border-black bg-[#DFE104]">
              <button
                onClick={onClose}
                className="p-2 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]
                         hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all
                         focus-visible:outline-none focus-visible:ring-2
                         focus-visible:ring-[#DFE104] focus-visible:ring-offset-2
                         min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close navigation menu"
              >
                <HamburgerIcon isOpen={true} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-3">
              {navLinks.map((link) =>
                link.external ? (
                  <ExternalLink key={link.href} href={link.href}>
                    {link.label}
                  </ExternalLink>
                ) : (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    isActive={
                      link.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(link.href)
                    }
                    onClick={onClose}
                  >
                    {link.label}
                  </NavLink>
                )
              )}
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

export function MobileNavToggle({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 border-2 border-black bg-white shadow-[4px_4px_0_0_#000]
               hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all
               focus-visible:outline-none focus-visible:ring-2
               focus-visible:ring-[#DFE104] focus-visible:ring-offset-2
               min-w-[44px] min-h-[44px] flex items-center justify-center
               md:hidden"
      aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isOpen}
      aria-controls="mobile-navigation"
    >
      <HamburgerIcon isOpen={isOpen} />
    </button>
  );
}
