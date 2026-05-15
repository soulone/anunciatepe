import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { BookOpen, Clock } from "lucide-react";

export default async function ReadingDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: reading } = await supabase.from("readings").select("*").eq("slug", slug).single();

  if (!reading) notFound();

  return (
    <>
      <Sidebar />
      <main className="mx-auto max-w-[800px] px-6 py-8 md:px-10">
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#F26A2E]/10">
              <BookOpen className="h-6 w-6 text-[#F26A2E]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{reading.title}</h1>
              <div className="flex items-center gap-3 text-sm text-[#A8AAAE]">
                <span>Por {reading.author}</span>
                <span>&middot;</span>
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {reading.duration_min} min</span>
                <span>&middot;</span>
                <span>{reading.category}</span>
              </div>
            </div>
          </div>
          <p className="mt-4 leading-relaxed text-[#A8AAAE]">{reading.excerpt}</p>
          <p className="mt-4 text-sm text-[#A8AAAE]/60">Contenido completo próximamente</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
