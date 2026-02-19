export default function GuidesLoading() {
  return (
    <div className="container py-16">
      <div className="mb-12 space-y-4">
        <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
        <div className="h-5 w-96 max-w-full animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/50 bg-card p-6 space-y-4">
            <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
            <div className="space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-muted" />
              <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
            </div>
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
