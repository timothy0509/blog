'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatedFooter } from '@/components/animations/AnimatedLayout';

const HOME_MARQUEE = 'Join the squad // Hack the system // Join the squad // Hack the system // Join the squad // Hack the system // Join the squad // Hack the system';
const DETAIL_MARQUEE = 'SYJC_RESEARCH // EXPLOIT_SUCCESS // FLAG_CAPTURED // 0xDEADBEEF // SYJC_RESEARCH // EXPLOIT_SUCCESS // FLAG_CAPTURED // 0xDEADBEEF //';

export default function SiteFooter() {
  const pathname = usePathname();
  const isDetail = pathname.startsWith('/writeups/') && pathname !== '/writeups';
  const isHome = pathname === '/';

  const showMarquee = isHome || isDetail;
  const marqueeText = isDetail ? DETAIL_MARQUEE : HOME_MARQUEE;
  const marqueeClass = isDetail
    ? 'bg-[#DFE104] text-black'
    : 'bg-[#fe00fe] text-[#500050]';

  return (
    <>
      {showMarquee && (
        <div className={`w-full py-6 border-t-4 border-black overflow-hidden ${marqueeClass}`}>
          <div className="flex whitespace-nowrap animate-marquee">
            <span className="font-display text-2xl md:text-[32px] font-bold uppercase mx-8">
              {marqueeText}
            </span>
            <span className="font-display text-2xl md:text-[32px] font-bold uppercase mx-8" aria-hidden="true">
              {marqueeText}
            </span>
          </div>
        </div>
      )}
      <AnimatedFooter>
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6 w-full">
          <div className="label-code uppercase tracking-widest">
            [ NO RIGHTS RESERVED ]
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/timothy0509/writeups"
              target="_blank"
              rel="noopener noreferrer"
              className="label-caps hover:text-[#DFE104] transition-colors underline decoration-2 underline-offset-4"
            >
              GITHUB REPO
            </a>
            <Link
              href="/writeups"
              className="label-caps hover:text-[#fe00fe] transition-colors underline decoration-2 underline-offset-4"
            >
              SYSTEM STATUS
            </Link>
          </div>
        </div>
      </AnimatedFooter>
    </>
  );
}
