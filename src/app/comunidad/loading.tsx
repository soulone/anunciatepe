import { Sidebar } from "@/components/layout/sidebar";

export default function Loading() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1440px] px-6 pt-8 md:px-10">
        <div className="mb-8 h-[200px] animate-pulse rounded-[24px] bg-[#17181B]" />
        <div className="mb-6 flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-28 animate-pulse rounded-full bg-[#17181B]" />
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-[320px] animate-pulse rounded-[16px] bg-[#17181B]" />
          ))}
        </div>
      </main>
    </>
  );
}
