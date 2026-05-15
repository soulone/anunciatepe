import { Sidebar } from "@/components/layout/sidebar";
import { SkeletonPoster, Skeleton } from "@/components/shared/skeleton";

export default function CoursesLoading() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
        <div className="mb-6">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="mt-1 h-4 w-64" />
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonPoster key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
