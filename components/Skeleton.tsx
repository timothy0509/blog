export default function SkeletonCard() {
  return (
    <article className="skeleton-card p-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-2 pb-4 border-b-4 border-current" style={{ borderColor: 'var(--border)' }}>
        <div className="skeleton-text h-7 w-24 rounded-none" />
        <div className="skeleton-text h-7 w-20 rounded-none" />
      </div>
      <div className="skeleton-text h-8 w-3/4 rounded-none" />
      <div className="skeleton-text h-6 w-1/2 rounded-none" />
      <div className="flex justify-end pt-4">
        <div className="skeleton-text h-10 w-24 rounded-none" />
      </div>
    </article>
  );
}

export function SkeletonWriteupsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="md:col-span-2">
        <SkeletonCard />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonWriteupPage() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8">
      <header className="flex flex-col gap-4 pb-8 border-b-4" style={{ borderColor: 'var(--border)' }}>
        <div className="flex flex-wrap gap-2">
          <div className="skeleton-text h-7 w-32 rounded-none" />
          <div className="skeleton-text h-7 w-28 rounded-none" />
        </div>
        <div className="skeleton-text h-12 w-3/4 rounded-none" />
      </header>
      <div className="flex flex-col gap-6">
        <div className="skeleton-text h-6 w-full rounded-none" />
        <div className="skeleton-text h-6 w-full rounded-none" />
        <div className="skeleton-text h-6 w-5/6 rounded-none" />
        <div className="skeleton-text h-48 w-full rounded-none" />
        <div className="skeleton-text h-6 w-full rounded-none" />
        <div className="skeleton-text h-6 w-3/4 rounded-none" />
      </div>
    </div>
  );
}