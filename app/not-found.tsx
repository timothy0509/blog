import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 flex items-center justify-center p-8 min-h-[60vh]">
      <div className="bg-white border-4 border-black shadow-[12px_12px_0_0_#fe00fe] p-8 md:p-12 max-w-2xl w-full text-center">
        <div className="relative mb-8">
          <span
            className="text-[8rem] md:text-[12rem] font-display font-bold leading-none block text-transparent"
            style={{ WebkitTextStroke: '4px #000', textShadow: '8px 8px 0 #fe00fe' }}
          >
            404
          </span>
        </div>

        <h1 className="font-display text-h1 uppercase mb-4 tracking-tight">
          PAGE NOT FOUND
        </h1>

        <p className="text-lg mb-8 max-w-md mx-auto text-[#484833]">
          The writeup you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="brutal-btn brutal-btn-accent">
            GO HOME
          </Link>
          <Link href="/writeups" className="brutal-btn">
            BROWSE WRITEUPS
          </Link>
        </div>
      </div>
    </div>
  );
}
