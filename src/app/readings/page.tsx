import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

function ReadingCard({ title, category, duration_min, excerpt, id }: any) {
  return (
    <div key={id} className="group min-w-[300px] max-w-[340px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[16px] bg-white p-5 shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#F26A2E]/10">
          <BookOpen className="h-5 w-5 text-[#F26A2E]" />
        </div>
        <div className="flex items-center gap-1 text-xs text-[#6B6F72]">
          <Clock className="h-3 w-3" />{duration_min ?? "—"} min
        </div>
      </div>
      <h3 className="mt-3 text-sm font-semibold leading-snug text-[#101012]">{title}</h3>
      <p className="mt-1 text-xs text-[#6B6F72]">{category}</p>
      <p className="mt-2 text-xs leading-relaxed text-[#6B6F72]/80 line-clamp-2">{excerpt}</p>
      <div className="mt-4 flex items-center gap-1 text-xs font-medium text-[#F26A2E] opacity-0 transition-opacity group-hover:opacity-100">
        Leer más <ArrowRight className="h-3 w-3" />
      </div>
    </div>
  );
}

export default async function ReadingsPage() {
  const supabase = await createClient();
  const { data: readings } = await supabase.from("readings").select("*").eq("is_published", true).order("created_at", { ascending: false });

  const safe = readings ?? [];

  return (
    <>
      <Topbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <SectionHeader title="Lecturas" subtitle="Artículos y guías para kapitalistas" />
        {safe.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {safe.map((r) => (
              <ReadingCard key={r.id} {...r} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-[#A8AAAE]">No hay lecturas publicadas todavía.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
