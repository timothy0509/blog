'use client';

export default function ScrollToTop() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="bg-yellow-400 text-black px-3 py-2 font-bold border-2 border-white shadow-[4px_4px_0_0_#fff] hover:shadow-[2px_2px_0_0_#fff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      aria-label="Return to top"
    >
      ↑ TOP
    </button>
  );
}