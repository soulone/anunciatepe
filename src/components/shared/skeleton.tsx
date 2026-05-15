interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-[12px] bg-[#ffffff10] ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="min-w-[260px] max-w-[300px] flex-shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      <Skeleton className="aspect-video w-full rounded-none" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function SkeletonPoster() {
  return (
    <div className="min-w-[200px] max-w-[220px] flex-shrink-0 overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)]">
      <Skeleton className="aspect-[2/3] w-full rounded-none" />
      <div className="p-2.5">
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonRow({ count = 6 }: { count?: number }) {
  return (
    <div className="flex gap-3 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="card-green mb-8 overflow-hidden rounded-[24px] p-6 md:p-8">
      <Skeleton className="mb-3 h-6 w-40" />
      <Skeleton className="mb-2 h-8 w-3/4" />
      <Skeleton className="mb-2 h-4 w-1/2" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
