export default function BlogLoading() {
  return (
    <div className="container py-16">
      <div className="mb-12 space-y-4">
        <div className="h-10 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-5 w-80 max-w-full animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border/50 bg-card overflow-hidden">
            <div className="h-48 animate-pulse bg-muted" />
            <div className="p-6 space-y-3">
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-muted" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
