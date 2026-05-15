import { Sidebar } from "@/components/layout/sidebar";

export default function Loading() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-10">
        <div className="mb-6 h-5 w-48 animate-pulse rounded bg-[#17181B]" />
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="aspect-video w-full animate-pulse rounded-[16px] bg-[#17181B]" />
            <div className="mt-6 space-y-3">
              <div className="h-8 w-3/4 animate-pulse rounded bg-[#17181B]" />
              <div className="h-4 w-full animate-pulse rounded bg-[#17181B]" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-[#17181B]" />
            </div>
          </div>
          <div className="h-[400px] animate-pulse rounded-[16px] bg-[#17181B]" />
        </div>
      </main>
    </>
  );
}
