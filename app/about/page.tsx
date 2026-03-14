import Link from "next/link";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-block border-4 border-black px-4 py-2 font-bold uppercase bg-white hover:bg-black hover:text-white shadow-[var(--shadow-brutal)] mb-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          &larr; BACK TO INDEX
        </Link>
      </div>

      <article className="border-8 border-black p-8 bg-white shadow-[var(--shadow-brutal)]">
        <h1 className="text-5xl md:text-7xl font-[family-name:var(--font-impact)] uppercase leading-none mb-8">
          About
        </h1>

        <div className="space-y-6 text-lg font-bold">
          <section>
            <h2 className="text-3xl font-[family-name:var(--font-impact)] uppercase mb-4 border-b-4 border-black pb-2">
              Who am I?
            </h2>
            <p className="leading-relaxed">
              I&apos;m <span className="bg-black text-white px-2 py-1">Timothy</span>, a CTF player and security enthusiast. I participate in various Capture The Flag competitions, tackling challenges across multiple categories including web exploitation, binary exploitation (pwn), reverse engineering, and cryptography.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-[family-name:var(--font-impact)] uppercase mb-4 border-b-4 border-black pb-2">
              What is this?
            </h2>
            <p className="leading-relaxed">
              This site serves as my personal writeup archive. Every CTF challenge I solve gets documented here with detailed explanations of the exploitation process, thought methodology, and lessons learned.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-[family-name:var(--font-impact)] uppercase mb-4 border-b-4 border-black pb-2">
              Why writeups?
            </h2>
            <p className="leading-relaxed">
              Writing detailed solutions helps me solidify my understanding and gives back to the community that taught me so much. Whether you&apos;re a beginner looking to learn or an experienced player seeking alternative approaches, I hope these writeups provide value.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-[family-name:var(--font-impact)] uppercase mb-4 border-b-4 border-black pb-2">
              Source
            </h2>
            <p className="leading-relaxed">
              All writeups are sourced from my GitHub repository:{""}
              <Link
                href="https://github.com/timothy0509/writeups"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 border-b-4 border-blue-700 hover:bg-blue-700 hover:text-white transition-colors"
              >
                timothy0509/writeups
              </Link>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t-[12px] border-black flex justify-center">
          <div className="bg-black text-white p-6 font-bold text-center text-xl max-w-lg shadow-[8px_8px_0_0_#facc15] border-4 border-white">
            HAPPY HACKING
          </div>
        </div>
      </article>
    </div>
  );
}