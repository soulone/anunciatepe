import { Sidebar } from "@/components/layout/sidebar";
import { Skeleton, SkeletonCard } from "@/components/shared/skeleton";

export default function LivesLoading() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
        <div className="mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-1 h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[16px] bg-[#17181B]">
              <Skeleton className="aspect-video w-full rounded-none" />
              <div className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
