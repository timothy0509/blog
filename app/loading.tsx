export default function Loading() {
  return (
    <div className="flex-1">
      <div className="h-48 md:h-64 bg-[#DFE104] border-b-[6px] border-black animate-pulse" />
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white border-4 border-black shadow-[12px_12px_0_0_#000] p-8 md:p-12 animate-pulse">
          <div className="h-8 bg-[#e2e2e2] mb-6 w-1/3" />
          <div className="space-y-4">
            <div className="h-4 bg-[#e2e2e2] w-3/4" />
            <div className="h-4 bg-[#e2e2e2] w-1/2" />
            <div className="h-4 bg-[#e2e2e2] w-5/6" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16 pb-16">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white border-4 border-black shadow-magenta p-8 animate-pulse">
              <div className="h-2 bg-[#e2e2e2] mb-6 -mx-8 -mt-8" />
              <div className="h-6 bg-[#e2e2e2] mb-4 w-3/4" />
              <div className="h-4 bg-[#e2e2e2] w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
