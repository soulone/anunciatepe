import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { Wrench } from "lucide-react";

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: tool } = await supabase.from("tools").select("*").eq("slug", slug).single();

  if (!tool) notFound();

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[1000px] px-6 py-8 md:px-10">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F26A2E]/10">
              <Wrench className="h-6 w-6 text-[#F26A2E]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{tool.title}</h1>
              <p className="text-sm text-[#A8AAAE] capitalize">{tool.type}</p>
            </div>
          </div>
          <p className="mt-4 text-[#A8AAAE]">{tool.description}</p>
        </div>
        <div className="flex h-64 w-full items-center justify-center rounded-[24px] bg-[#17181B]">
          <p className="text-[#A8AAAE]">Herramienta interactiva: {tool.title}</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
