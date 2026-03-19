export default function Loading() {
  return (
    <main className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="brutal-card p-6 sm:p-8 animate-pulse">
          <div className="h-10 bg-[var(--brutal-zinc-200)] mb-6 w-1/3" />
          <div className="space-y-4">
            <div className="h-4 bg-[var(--brutal-zinc-200)] w-3/4" />
            <div className="h-4 bg-[var(--brutal-zinc-200)] w-1/2" />
            <div className="h-4 bg-[var(--brutal-zinc-200)] w-5/6" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="brutal-card p-5 animate-pulse">
              <div className="h-6 bg-[var(--brutal-zinc-200)] mb-4 w-3/4" />
              <div className="flex gap-2 mb-4">
                <div className="h-5 bg-[var(--brutal-zinc-200)] w-20" />
                <div className="h-5 bg-[var(--brutal-zinc-200)] w-24" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-[var(--brutal-zinc-200)] w-full" />
                <div className="h-3 bg-[var(--brutal-zinc-200)] w-4/5" />
                <div className="h-3 bg-[var(--brutal-zinc-200)] w-3/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}