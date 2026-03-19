export default function WriteupsLoading() {
  return (
    <main id="main-content" className="flex-1 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="h-12 bg-[var(--brutal-zinc-200)] w-48 animate-pulse" />
        </header>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 shrink-0 order-2 lg:order-1">
            <div className="brutal-card p-5 animate-pulse">
              <div className="h-6 bg-[var(--brutal-zinc-200)] mb-4 w-20" />
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 bg-[var(--brutal-zinc-200)]" />
                ))}
              </div>
            </div>
          </aside>
          
          <div className="flex-1 order-1 lg:order-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
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
                  <div className="mt-4 pt-4 border-t-2 border-[var(--brutal-zinc-200)]">
                    <div className="h-4 bg-[var(--brutal-zinc-200)] w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}