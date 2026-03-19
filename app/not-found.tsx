import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center p-8">
      <div className="brutal-card brutal-card-featured p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <span className="text-[10rem] md:text-[14rem] font-display font-bold leading-none block text-transparent" style={{ WebkitTextStroke: '4px var(--brutal-black)' }}>
            404
          </span>
          <span className="absolute inset-0 flex items-center justify-center text-[10rem] md:text-[14rem] font-display font-bold leading-none text-[var(--brutal-yellow)]">
            404
          </span>
        </div>
        
        <h1 className="text-h1 font-display uppercase mb-4">
          PAGE NOT FOUND
        </h1>
        
        <p className="text-lg mb-8 max-w-md mx-auto">
          The writeup you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="brutal-btn brutal-btn-accent"
          >
            GO HOME
          </Link>
          <Link 
            href="/writeups"
            className="brutal-btn"
          >
            BROWSE WRITEUPS
          </Link>
        </div>
      </div>
    </main>
  );
}