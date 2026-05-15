import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { Wrench, Construction } from "lucide-react";
import Link from "next/link";

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: tool } = await supabase.from("tools").select("*").eq("slug", slug).single();

  if (!tool) notFound();

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1000px] px-6 py-16 md:px-10">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-[#F26A2E]/10">
            <Construction className="h-10 w-10 text-[#F26A2E]" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-white">{tool.title}</h1>
          <p className="mt-2 text-[#A8AAAE]">{tool.description}</p>
          <div className="mt-8 rounded-[16px] bg-[#17181B] p-6">
            <p className="text-sm text-[#A8AAAE]">🚧 Esta herramienta estará disponible próximamente.</p>
          </div>
          <Link
            href="/tools"
            className="mt-8 inline-flex h-10 items-center gap-2 rounded-full bg-[#F5C53D] px-6 text-sm font-bold text-[#101012] transition-colors hover:bg-[#F5C53D]/90"
          >
            ← Volver a Apps
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
