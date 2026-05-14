import { createClient } from "@/lib/supabase/server";
import { Topbar } from "@/components/layout/topbar";
import { Footer } from "@/components/layout/footer";
import { StatsBar } from "@/components/community/stats-bar";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Users, Heart, MessageCircle, Share2 } from "lucide-react";

export default async function CommunityPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .in("status", ["active", "funded"])
    .order("raised_amount", { ascending: false });

  const safe = projects ?? [];

  return (
    <>
      <Topbar />
      <main>
        <div className="mx-auto max-w-[1440px] px-4 pt-24 pb-10 md:px-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Comunidad</h1>
            <p className="mt-2 text-[#A8AAAE]">Proyectos de kapitalistas como tú. Apoya, comparte y crece.</p>
          </div>

          <div className="flex gap-2 border-b border-[rgba(255,255,255,0.06)] pb-4">
            {["Proyectos", "Foro", "Eventos", "Top colaboradores"].map((tab) => (
              <button key={tab} className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${tab === "Proyectos" ? "bg-[#F5C53D] text-[#101012]" : "text-[#A8AAAE] hover:bg-white/10 hover:text-white"}`}>
                {tab}
              </button>
            ))}
          </div>

          {safe.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {safe.map((p) => {
                const progress = p.goal_amount > 0 ? Math.round((p.raised_amount / p.goal_amount) * 100) : 0;
                return (
                  <div key={p.id} className="overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200">
                      <div className="flex h-full w-full items-center justify-center">
                        <Users className="h-10 w-10 text-zinc-300" />
                      </div>
                      <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                        {p.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-[#101012]">{p.title}</h3>
                          <p className="text-xs text-[#6B6F72]">{p.description?.slice(0, 80)}...</p>
                        </div>
                        <button className="h-8 w-8 text-[#6B6F72] hover:text-[#F04A8A]">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium text-[#101012]">S/ {p.raised_amount}</span>
                          <span className="text-[#6B6F72]">S/ {p.goal_amount}</span>
                        </div>
                        <ProgressBar value={progress} />
                        <div className="mt-1 flex justify-between text-xs text-[#6B6F72]">
                          <span>{p.backers_count} backers</span>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3">
                        <button className="flex-1 rounded-full bg-[#F26A2E] py-2 text-xs font-bold text-white transition-colors hover:bg-[#F26A2E]/90">
                          Apoyar proyecto
                        </button>
                        <button className="h-9 w-9 rounded-xl text-[#6B6F72] transition-colors hover:bg-white/10 hover:text-[#101012]">
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-12 text-center">
              <p className="text-[#A8AAAE]">No hay proyectos activos todavía.</p>
            </div>
          )}
        </div>
        <StatsBar />
      </main>
      <Footer />
    </>
  );
}
