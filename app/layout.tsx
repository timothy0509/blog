import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Timothy's CTF Writeups",
  description: "CTF writeups archive - capturing flags, one challenge at a time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col selection:bg-black selection:text-white font-mono">
        <header className="border-b-[6px] border-black p-4 md:p-8 flex flex-col sm:flex-row justify-between sm:items-center bg-yellow-400 gap-4">
          <Link href="/" className="font-[family-name:var(--font-impact)] text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter hover:bg-black hover:text-yellow-400 transition-none inline-block leading-none pb-2 border-4 border-transparent">
            TIMOTHY&apos;S CTF WRITEUPS
          </Link>
          <nav className="flex gap-4 font-bold text-lg">
            <Link href="/" className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              Index
            </Link>
            <Link href="/about" className="border-4 border-black px-4 py-2 hover:bg-black hover:text-white uppercase shadow-[var(--shadow-brutal)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all bg-white">
              About
            </Link>
          </nav>
        </header>
        <main className="flex-grow w-full p-4 md:p-8 md:pt-16">
          {children}
        </main>
        <footer className="border-t-[6px] border-black p-4 md:p-8 bg-black text-white uppercase text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-bold tracking-widest">&copy; {new Date().getFullYear()} Timothy&apos;s CTF Writeups</span>
          <span className="bg-red-600 text-black px-2 py-1 font-bold transform -rotate-2 border-2 border-white shadow-[4px_4px_0_0_#fff]">NO RIGHTS RESERVED</span>
        </footer>
      </body>
    </html>
  );
}