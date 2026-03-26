import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import { Space_Grotesk } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import SiteHeader from '@/components/SiteHeader';
import { AnimatedFooter, AnimatedMain } from '@/components/animations/AnimatedLayout';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
});

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'SYJC CTF Writeups',
  description: "CTF writeups from Sing Yin Jockey Club - capturing flags together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased min-h-screen flex flex-col selection:bg-[#DFE104] selection:text-black noise-overlay ${geistMono.variable} ${spaceGrotesk.variable} ${displayFont.variable} font-sans`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <AnimatedMain>
          {children}
        </AnimatedMain>
        <AnimatedFooter>
          <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <span className="font-bold tracking-widest text-xs sm:text-sm text-white/90">
                  &copy; {new Date().getFullYear()} SYJC CTF
                </span>
                <div className="flex items-center gap-2">
                  <span className="bg-[#DFE104] text-black px-3 py-1 font-bold text-xs border-2 border-white/30 shadow-[3px_3px_0_0_rgba(255,255,255,0.2)]">
                    NO RIGHTS RESERVED
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-xs">flags captured</span>
                <span className="text-2xl">⚔️</span>
              </div>
            </div>
          </div>
        </AnimatedFooter>
      </body>
    </html>
  );
}