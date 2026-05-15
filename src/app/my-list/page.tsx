import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { Bookmark } from "lucide-react";
import Link from "next/link";

export default function MyListPage() {
  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[800px] px-6 py-20 md:px-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-[#F04A8A]/10">
            <Bookmark className="h-10 w-10 text-[#F04A8A]" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">Mi lista</h1>
          <p className="mt-2 text-[#A8AAAE]">Tu lista está vacía</p>
          <p className="mt-1 text-sm text-[#A8AAAE]/60">Los cursos y videos que guardes aparecerán aquí.</p>
          <Link
            href="/courses"
            className="mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
          >
            Explorar cursos →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
