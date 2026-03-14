import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-[family-name:var(--font-playfair)] text-xl font-bold tracking-tight hover:text-zinc-600 transition-colors">
          Timothy
        </Link>
        <div className="flex items-center gap-8">
          <Link href="/writeups" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
            Writeups
          </Link>
          <a href="https://github.com/timothy0509/writeups" target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium">
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}