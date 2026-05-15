import { Sidebar } from "@/components/layout/sidebar";
import { Skeleton, SkeletonPoster } from "@/components/shared/skeleton";

export default function ToolsLoading() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
        <div className="mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-1 h-4 w-64" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonPoster key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
