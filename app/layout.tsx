import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import { Space_Grotesk } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import Link from 'next/link';
import { AnimatedHeader, AnimatedNav, AnimatedLogo, AnimatedFooter, AnimatedMain } from '@/components/animations/AnimatedLayout';

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
      <body className={`antialiased min-h-screen flex flex-col selection:bg-blue-500 selection:text-white ${geistMono.variable} ${spaceGrotesk.variable} ${displayFont.variable} font-sans`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <AnimatedHeader>
          <AnimatedLogo>
            <Link 
              href="/" 
              className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter hover:text-blue-600 transition-colors duration-200 inline-block leading-none pb-1 bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent"
              aria-label="Go to homepage"
            >
              <span className="inline-block">SYJC</span>
              <span className="inline-block ml-2">CTF</span>
              <span className="inline-block ml-2">WRITEUPS</span>
            </Link>
          </AnimatedLogo>
          <AnimatedNav>
            <Link 
              href="/" 
              className="glass-btn px-5 py-2.5 hover:bg-blue-500 hover:text-white uppercase tracking-wide transition-all duration-200"
            >
              Index
            </Link>
            <Link 
              href="/writeups" 
              className="glass-btn px-5 py-2.5 hover:bg-blue-500 hover:text-white uppercase tracking-wide transition-all duration-200"
            >
              Writeups
            </Link>
            <a 
              href="https://github.com/timothy0509/writeups" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-btn px-5 py-2.5 hover:bg-blue-500 hover:text-white uppercase tracking-wide transition-all duration-200"
            >
              GitHub
            </a>
          </AnimatedNav>
        </AnimatedHeader>
        <AnimatedMain>
          {children}
        </AnimatedMain>
        <AnimatedFooter>
          <span className="font-semibold tracking-wide text-sm text-slate-600">&copy; {new Date().getFullYear()} SYJC CTF Writeups</span>
          <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-1.5 font-semibold rounded-full text-sm shadow-lg shadow-blue-500/20">
            NO RIGHTS RESERVED
          </span>
        </AnimatedFooter>
      </body>
    </html>
  );
}