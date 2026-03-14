import { getWriteupData, getSortedWriteupsData } from "@/lib/writeups";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const writeups = await getSortedWriteupsData();
  return writeups.map((w) => ({ slug: w.slug }));
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const postData = await getWriteupData(slug);

    return (
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-block border-4 border-black px-4 py-2 font-bold uppercase bg-white hover:bg-black hover:text-white shadow-[var(--shadow-brutal)] mb-8 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
          >
            &larr; BACK TO INDEX
          </Link>
          <div className="border-b-[12px] border-black pb-8 mb-8">
            <div className="flexflex-wrap gap-2 mb-4">
              <span className="font-bold bg-yellow-400 border-4 border-black px-3 py-1 text-xl transform -rotate-1">
                {postData.category}
              </span>
              <span className="font-bold bg-white border-4 border-black px-3 py-1 text-xl transform rotate-1">
                {postData.ctfName}
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-[family-name:var(--font-impact)] uppercase leading-none mb-6">
              {postData.title}
            </h1>
            <div className="inline-block bg-yellow-400 border-4 border-black px-3 py-1 font-bold text-xl transform -rotate-1">
              {postData.date}
            </div>
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-impact)] prose-headings:uppercase prose-h1:text-6xl prose-h2:text-4xl prose-h3:text-3xl prose-p:font-bold prose-p:text-xl prose-a:text-blue-700 prose-a:border-b-4 prose-a:border-blue-700 hover:prose-a:bg-blue-700 hover:prose-a:text-white prose-strong:bg-black prose-strong:text-white prose-strong:px-1 prose-ul:font-bold prose-li:text-lg prose-pre:border-4 prose-pre:border-black prose-pre:bg-gray-100 prose-pre:rounded-none prose-code:text-red-600 prose-code:bg-gray-200 prose-code:px-1"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }}
        />

        <div className="mt-16 pt-8 border-t-[12px] border-black flex justify-center">
          <div className="bg-black text-white p-6 font-bold text-center text-xl max-w-lg shadow-[8px_8px_0_0_#facc15] border-4 border-white">
            FLAG CAPTURED
          </div>
        </div>
      </article>
    );
  } catch (e) {
    notFound();
  }
}