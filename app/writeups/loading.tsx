export default function WriteupsLoading() {
  return (
    <div className="flex flex-col w-full">
      <section className="w-full border-b-[6px] border-black">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-end justify-between gap-6 animate-pulse">
          <div className="flex flex-col gap-2">
            <div className="h-3 bg-[#e2e2e2] w-32" />
            <div className="h-12 bg-[#e2e2e2] w-48" />
          </div>
          <div className="flex gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border-l-4 border-[#e2e2e2] px-4">
                <div className="h-3 bg-[#e2e2e2] w-24 mb-2" />
                <div className="h-8 bg-[#e2e2e2] w-12" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto w-full px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <aside className="lg:col-span-3">
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0_0_#000] animate-pulse">
              <div className="h-4 bg-[#e2e2e2] mb-6 w-32" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-[#e2e2e2]" />
                ))}
              </div>
            </div>
          </aside>
          <div className="lg:col-span-9 flex flex-col gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white border-4 border-black p-8 shadow-[8px_8px_0_0_#000] animate-pulse"
              >
                <div className="h-4 bg-[#e2e2e2] w-40 mb-4" />
                <div className="h-8 bg-[#e2e2e2] w-3/4 mb-6" />
                <div className="h-4 bg-[#e2e2e2] w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
