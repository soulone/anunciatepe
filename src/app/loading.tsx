import { Sidebar } from "@/components/layout/sidebar";
import { SkeletonHero, SkeletonRow, SkeletonPoster } from "@/components/shared/skeleton";

export default function HomeLoading() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1200px] px-6 py-6 md:px-10 md:py-8">
        <SkeletonHero />

        <section className="mb-8">
          <div className="mb-4">
            <div className="h-5 w-48 animate-pulse rounded bg-white/5" />
            <div className="mt-1 h-4 w-32 animate-pulse rounded bg-white/5" />
          </div>
          <SkeletonRow count={6} />
        </section>

        <section className="mb-8">
          <div className="mb-4">
            <div className="h-5 w-48 animate-pulse rounded bg-white/5" />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
                <div className="aspect-[3/4] animate-pulse bg-zinc-100" />
                <div className="p-2 space-y-2">
                  <div className="h-3 w-3/4 animate-pulse rounded bg-zinc-100" />
                  <div className="h-2 w-1/2 animate-pulse rounded bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="mb-4">
            <div className="h-5 w-48 animate-pulse rounded bg-white/5" />
          </div>
          <SkeletonRow count={6} />
        </section>
      </main>
    </>
  );
}
