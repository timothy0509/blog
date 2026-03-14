import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

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
      <body className="antialiased min-h-screen flex flex-col selection:bg-black selection:text-white font-mono noise-overlay">
        <header className="border-b-[6px] border-black p-4 md:p-8 flex flex-col sm:flex-row justify-between sm:items-center bg-brutal-header gap-4">
          <Link href="/" className="font-[family-name:var(--font-impact)] text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter hover:bg-black hover:text-yellow-400 transition-none inline-block leading-none pb-2 border-4 border-transparent bg-yellow-400 px-2">
            TIMOTHY&apos;S CTF WRITEUPS
          </Link>
          <nav className="flex gap-4 font-bold text-lg">
            <Link href="/" className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all bg-white">
              INDEX
            </Link>
            <Link href="/writeups" className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all bg-white">
              WRITEUPS
            </Link>
            <a href="https://github.com/timothy0509/writeups" target="_blank" rel="noopener noreferrer" className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all bg-white">
              GITHUB
            </a>
          </nav>
        </header>
        <main className="flex-grow w-full p-4 md:p-8 md:pt-16">
          {children}
        </main>
        <footer className="border-t-[6px] border-black p-4 md:p-8 bg-brutal-footer text-white uppercase text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-bold tracking-widest">&copy; {new Date().getFullYear()} Timothy&apos;s CTF Writeups</span>
          <span className="bg-red-600 text-black px-2 py-1 font-bold transform -rotate-2 border-2 border-white shadow-[4px_4px_0_0_#fff]">NO RIGHTS RESERVED</span>
        </footer>
      </body>
    </html>
  );
}