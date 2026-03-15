import type { Metadata } from 'next';
import { Geist_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import ThemeProvider from '@/components/ThemeProvider';
import ThemeToggle from '@/components/ThemeToggle';
import MobileNavWrapper from '@/components/MobileNavWrapper';
import ScrollToTop from '@/components/ScrollToTop';

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

const spaceGrotesk = Space_Grotesk({
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
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased min-h-screen flex flex-col selection:bg-black selection:text-white noise-overlay ${geistMono.variable} ${spaceGrotesk.variable} font-mono`}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ThemeProvider>
          <header className="border-b-[6px] border-black dark:border-white p-4 md:p-6 flex justify-between items-center bg-brutal-header gap-4">
            <Link href="/" className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tighter hover:bg-black hover:text-yellow-400 transition-none inline-block leading-none pb-1 border-4 border-transparent bg-yellow-400 px-2 font-bold">
              TIMOTHY&apos;S CTF WRITEUPS
            </Link>
            <nav className="hidden md:flex gap-3 font-bold text-sm lg:text-base items-center" aria-label="Main navigation">
              <Link href="/" className="border-4 border-black dark:border-white px-3 lg:px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black uppercase shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none bg-white dark:bg-black dark:text-white cursor-pointer">
                INDEX
              </Link>
              <Link href="/writeups" className="border-4 border-black dark:border-white px-3 lg:px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black uppercase shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none bg-white dark:bg-black dark:text-white cursor-pointer">
                WRITEUPS
              </Link>
              <a href="https://github.com/timothy0509/writeups" target="_blank" rel="noopener noreferrer" className="border-4 border-black dark:border-white px-3 lg:px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black uppercase shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none press-button transition-none bg-white dark:bg-black dark:text-white cursor-pointer">
                GITHUB
              </a>
              <ThemeToggle />
            </nav>
          </header>
          <MobileNavWrapper />
          <main id="main-content" className="flex-grow w-full p-4 md:p-8 md:pt-16">
            {children}
          </main>
          <footer className="border-t-[6px] border-black dark:border-white p-4 md:p-8 bg-brutal-footer text-white uppercase text-sm flex flex-col sm:flex-row justify-between items-center gap-4 relative">
            <span className="font-bold tracking-widest">&copy; {new Date().getFullYear()} Timothy&apos;s CTF Writeups</span>
            <div className="flex items-center gap-4">
              <ScrollToTop />
              <span className="bg-red-600 text-black px-2 py-1 font-bold transform -rotate-2 border-2 border-white shadow-[4px_4px_0_0_#fff]">NO RIGHTS RESERVED</span>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}