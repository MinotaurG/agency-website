export default function BlogLoading() {
  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-50 to-white">
        <div className="container">
          <div className="max-w-3xl">
            <div className="h-4 w-16 bg-muted rounded animate-pulse mb-3" />
            <div className="h-12 w-96 bg-muted rounded animate-pulse" />
            <div className="h-6 w-80 bg-muted rounded animate-pulse mt-4" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border overflow-hidden">
                <div className="aspect-[16/9] bg-muted animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-full bg-muted rounded animate-pulse" />
                  <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-1/2 bg-muted rounded animate-pulse mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
