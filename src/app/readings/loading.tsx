import { Sidebar } from "@/components/layout/sidebar";
import { Skeleton } from "@/components/shared/skeleton";

export default function ReadingsLoading() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[800px] px-6 py-8 md:px-10">
        <div className="mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-1 h-4 w-64" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[16px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] space-y-3">
              <Skeleton className="h-10 w-10 rounded-[12px]" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
