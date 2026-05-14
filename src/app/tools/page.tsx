import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { SectionHeader } from "@/components/shared/section-header";
import { ScrollRow } from "@/components/shared/scroll-arrows";
import { ToolCard } from "@/components/tools/tool-card";
import { BookOpen } from "lucide-react";

const toolColors = ["amber", "morado", "coral", "cyan", "teal", "orange"];
const toolLabels = ["WIZARD", "WIZARD", "RUTA", "QUIZ", "RUTA", "CALC"];

export default async function ToolsPage() {
  const supabase = await createClient();
  const { data: tools } = await supabase.from("tools").select("*").eq("is_published", true).order("created_at");

  const safe = tools ?? [];

  return (
    <>
      <Topbar />
      <main className="mx-auto max-w-[1440px] px-4 pt-24 pb-20 md:px-10">
        <SectionHeader title="Herramientas instantáneas" subtitle="Aplica lo aprendido en minutos · gratis" />
        {safe.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {safe.map((t, i) => (
              <ToolCard key={t.id} icon={BookOpen} title={t.title} subtitle={t.description} color={toolColors[i % toolColors.length]} label={toolLabels[i % toolLabels.length]} />
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center">
            <p className="text-[#A8AAAE]">No hay herramientas publicadas todavía.</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
