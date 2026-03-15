import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

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
  title: "Timothy's CTF Writeups",
  description: 'CTF writeups archive - capturing flags, one challenge at a time.',
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
        <header className="border-b-[6px] border-black p-4 md:p-6 flex flex-col sm:flex-row justify-between sm:items-center bg-brutal-header gap-4">
          <Link 
            href="/" 
            className="font-display text-3xl sm:text-5xl md:text-6xl uppercase tracking-tighter hover:bg-black hover:text-[#DFE104] transition-colors duration-100 inline-block leading-none pb-1 border-4 border-transparent bg-[#DFE104] px-2 hover:border-black"
            aria-label="Go to homepage"
          >
            <span className="inline-block">TIMOTHY&apos;S</span>
            <span className="inline-block ml-2">CTF</span>
            <span className="inline-block ml-2">WRITEUPS</span>
          </Link>
          <nav className="flex gap-3 font-bold text-sm sm:text-base" aria-label="Main navigation">
            <Link 
              href="/" 
              className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] transition-all duration-100 bg-white"
            >
              INDEX
            </Link>
            <Link 
              href="/writeups" 
              className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] transition-all duration-100 bg-white"
            >
              WRITEUPS
            </Link>
            <a 
              href="https://github.com/timothy0509/writeups" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] transition-all duration-100 bg-white"
            >
              GITHUB
            </a>
          </nav>
        </header>
        <main id="main-content" className="flex-grow w-full p-4 md:p-8 md:pt-12">
          {children}
        </main>
        <footer className="border-t-[6px] border-black p-4 md:p-6 bg-brutal-footer text-white uppercase text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-bold tracking-widest text-xs sm:text-sm">&copy; {new Date().getFullYear()} Timothy&apos;s CTF Writeups</span>
          <span className="bg-red-600 text-black px-3 py-1 font-bold transform -rotate-1 border-2 border-white shadow-[4px_4px_0_0_#222] text-xs sm:text-sm">
            NO RIGHTS RESERVED
          </span>
        </footer>
      </body>
    </html>
  );
}