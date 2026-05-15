import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Footer } from "@/components/layout/footer";
import { StatsBar } from "@/components/community/stats-bar";
import { SectionHeader } from "@/components/shared/section-header";
import { ProgressBar } from "@/components/shared/progress-bar";
import { Users, Heart, Share2, TrendingUp, Target, DollarSign, Shield } from "lucide-react";

export default async function CommunityPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .in("status", ["active", "funded"])
    .order("raised_amount", { ascending: false });

  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact", head: true });
  const { count: totalProjects } = await supabase.from("projects").select("*", { count: "exact", head: true });

  const safe = projects ?? [];

  return (
    <>
      <Sidebar />
      <main>
        {/* Hero comunidad */}
        <div className="mx-auto max-w-[1440px] px-6 pt-8 md:px-10">
          <div className="mb-8 rounded-[24px] bg-gradient-to-br from-[#1F3A2E] to-[#0E0E10] p-6 md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#C4E27A]/20 px-3 py-1 text-xs font-medium text-[#C4E27A]">
                  <span className="h-2 w-2 rounded-full bg-[#C4E27A]" />
                  Comunidad Kapitalizando
                </div>
                <h1 className="text-3xl font-bold text-white md:text-4xl">
                  Juntos crecemos más
                </h1>
                <p className="mt-2 max-w-xl text-[#A8AAAE]">
                  Apoya proyectos de kapitalistas como tú. Cada contribución fortalece nuestra red.
                </p>
              </div>
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C4E27A]">{totalUsers ?? 0}</p>
                  <p className="text-xs text-[#A8AAAE]">Kapitalistas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C4E27A]">{totalProjects ?? 0}</p>
                  <p className="text-xs text-[#A8AAAE]">Proyectos</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#C4E27A]">S/ {safe.reduce((s: number, p: any) => s + Number(p.raised_amount ?? 0), 0).toLocaleString()}</p>
                  <p className="text-xs text-[#A8AAAE]">Recaudado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {["Proyectos", "Foro", "Eventos"].map((tab) => (
              <button
                key={tab}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  tab === "Proyectos"
                    ? "bg-[#F5C53D] text-[#101012]"
                    : "text-[#A8AAAE] hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab === "Proyectos" ? "📋" : tab === "Foro" ? "💬" : "📅"} {tab}
              </button>
            ))}
          </div>

          {safe.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {safe.map((p: any) => {
                const progress = p.goal_amount > 0 ? Math.round((p.raised_amount / p.goal_amount) * 100) : 0;
                return (
                  <div key={p.id} className="group overflow-hidden rounded-[16px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 hover:scale-[1.02]">
                    <div className="relative aspect-video bg-gradient-to-br from-zinc-100 to-zinc-200">
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80">
                          {p.category === "Negocio" ? <TrendingUp className="h-6 w-6 text-[#F26A2E]" /> :
                           p.category === "Emprendimiento" ? <Target className="h-6 w-6 text-[#F04A8A]" /> :
                           p.category === "Ambiente" ? <Shield className="h-6 w-6 text-[#C4E27A]" /> :
                           <DollarSign className="h-6 w-6 text-[#F5C53D]" />}
                        </div>
                      </div>
                      <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-[#101012] shadow-sm">
                        {p.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#101012] truncate">{p.title}</h3>
                          <p className="mt-0.5 text-xs text-[#6B6F72] line-clamp-2">{p.description}</p>
                        </div>
                        <button className="ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-[#6B6F72] transition-colors hover:bg-red-50 hover:text-red-400">
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm">
                          <span className="font-semibold text-[#F26A2E]">S/ {Number(p.raised_amount).toLocaleString()}</span>
                          <span className="text-[#6B6F72]">meta S/ {Number(p.goal_amount).toLocaleString()}</span>
                        </div>
                        <ProgressBar value={progress} className="mt-1.5 [&>div]:bg-[#F26A2E]" />
                        <div className="mt-1 flex justify-between text-xs text-[#6B6F72]">
                          <span>{p.backers_count} backers · {progress}%</span>
                          {p.deadline && (
                            <span>{Math.max(0, Math.ceil((new Date(p.deadline).getTime() - Date.now()) / 86400000))} días restantes</span>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="w-full rounded-full bg-[#F26A2E] py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#F26A2E]/90">
                          Apoyar este proyecto
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mt-8 flex flex-col items-center justify-center rounded-[24px] bg-[#17181B] p-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5C53D]/10">
                <Users className="h-8 w-8 text-[#F5C53D]" />
              </div>
              <h2 className="mt-4 text-lg font-semibold text-white">No hay proyectos activos</h2>
              <p className="mt-2 text-sm text-[#A8AAAE]">Sé el primero en iniciar un proyecto comunitario.</p>
            </div>
          )}

          {/* Secciones placeholder */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[16px] bg-[#17181B] p-5 opacity-60">
              <h3 className="font-semibold text-white">💬 Foro</h3>
              <p className="mt-1 text-sm text-[#A8AAAE]">Próximamente — espacio de discusión para kapitalistas.</p>
            </div>
            <div className="rounded-[16px] bg-[#17181B] p-5 opacity-60">
              <h3 className="font-semibold text-white">📅 Eventos</h3>
              <p className="mt-1 text-sm text-[#A8AAAE]">Próximamente — encuentros y talleres presenciales.</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <StatsBar />
        </div>
      </main>
      <Footer />
    </>
  );
}
